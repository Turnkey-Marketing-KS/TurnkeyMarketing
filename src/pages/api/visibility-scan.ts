import type { APIRoute } from "astro";
import { sealVisibilityReport } from "@/lib/visibility-report-token";

type ScanRequest = { shopName?: string; location?: string; specialty?: string };
type OpenAIContent = { type?: string; text?: string };
type OpenAIOutputItem = { content?: OpenAIContent[] };
type OpenAIResponsePayload = { output_text?: string; output?: OpenAIOutputItem[] };

const cleanScanText = (value: unknown, maxLength: number) => {
  const cleaned = String(value ?? "")
    .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/gi, "$1")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/\s*\([^)]*\b(?:\.com|\.net|\.org|\.co|\.io)\b[^)]*\)/gi, "")
    .replace(/【[^】]+】/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
  return cleaned.length > maxLength ? `${cleaned.slice(0, maxLength - 1).trim()}…` : cleaned;
};

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: ScanRequest;
  try {
    const payload = await request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error();
    body = payload as ScanRequest;
  } catch {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const { shopName, location, specialty } = body;
  if (
    typeof shopName !== "string" ||
    typeof location !== "string" ||
    !shopName.trim() ||
    !location.trim()
  ) {
    return Response.json({ error: "Shop name and location are required." }, { status: 400 });
  }
  if (specialty !== undefined && typeof specialty !== "string") {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const reportSecret = import.meta.env.AI_VISIBILITY_SCAN_REPORT_SECRET;
  if (!reportSecret) {
    return Response.json(
      { error: "The scan is temporarily unavailable. Please try again soon." },
      { status: 503 },
    );
  }

  const apiKey = import.meta.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "The scan is not connected yet. Add OPENAI_API_KEY to the server environment." },
      { status: 503 },
    );
  }

  const input = `You are generating a cautious AI visibility snapshot for an auto repair shop. Use web search to inspect public information only.
Shop: ${shopName.trim()}
Location: ${location.trim()}
Desired work (optional): ${specialty?.trim() || "not provided"}

Search for the shop and nearby alternatives, then return only evidence-supported findings. Never invent competitors, rankings, specialties, reviews, or problems. If evidence is weak, say so plainly. The score is directional, not an official ranking.

Write for a busy shop owner. Make every field short, decisive, and easy to scan:
- verdict: one plain-language sentence, 18 words maximum
- gap: one plain-language sentence, 28 words maximum
- understood: exactly three short findings, each 16 words maximum
- shopsAhead: how many distinct nearby shops were recommended or presented before this shop in the AI responses reviewed
- shopsCompared: total distinct shops compared in the scan, including this shop; it must be at least shopsAhead plus one
- competitor: one short sentence explaining why shops ahead were easier to recommend, 24 words maximum
- cta: one short sentence based on the score, 22 words maximum

Only count a shop as ahead when the responses reviewed actually placed or recommended it before the scanned shop. Do not count every nearby competitor automatically.

Do not include URLs, domains, citations, markdown links, brackets, source names, street addresses, phone numbers, or implementation instructions in any field. Do not provide a DIY marketing plan.`;

  const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: import.meta.env.OPENAI_MODEL || "gpt-5.6-luna",
      reasoning: { effort: import.meta.env.OPENAI_REASONING_EFFORT || "low" },
      tools: [{ type: "web_search" }],
      input,
      text: {
        format: {
          type: "json_schema",
          name: "visibility_snapshot",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              score: { type: "integer", minimum: 0, maximum: 100 },
              verdict: { type: "string", maxLength: 140 },
              gap: { type: "string", maxLength: 220 },
              understood: {
                type: "array",
                items: { type: "string", maxLength: 140 },
                minItems: 3,
                maxItems: 3,
              },
              shopsAhead: { type: "integer", minimum: 0 },
              shopsCompared: { type: "integer", minimum: 1 },
              competitor: { type: "string", maxLength: 180 },
              cta: { type: "string", maxLength: 180 },
            },
            required: [
              "score",
              "verdict",
              "gap",
              "understood",
              "shopsAhead",
              "shopsCompared",
              "competitor",
              "cta",
            ],
          },
        },
      },
    }),
  });

  if (!openaiResponse.ok)
    return Response.json(
      { error: "The scan provider could not complete the request." },
      { status: 502 },
    );
  const raw = (await openaiResponse.json()) as OpenAIResponsePayload;
  const outputText =
    raw.output_text ||
    raw.output?.flatMap((item) => item.content || []).find((item) => item.type === "output_text")
      ?.text;
  if (!outputText)
    return Response.json({ error: "The scan returned no readable result." }, { status: 502 });

  try {
    const parsed = JSON.parse(outputText);
    const shopsAhead = Math.max(0, Number(parsed.shopsAhead) || 0);
    const shopsCompared = Math.max(shopsAhead + 1, Number(parsed.shopsCompared) || 0);
    const report = {
      shopName: shopName.trim(),
      score: Math.max(0, Math.min(100, Number(parsed.score) || 0)),
      verdict: cleanScanText(parsed.verdict, 140),
      gap: cleanScanText(parsed.gap, 220),
      understood: Array.isArray(parsed.understood)
        ? parsed.understood.slice(0, 3).map((item: unknown) => cleanScanText(item, 140))
        : [],
      shopsAhead,
      shopsCompared,
      competitor: cleanScanText(parsed.competitor, 180),
      cta: cleanScanText(parsed.cta, 180),
    };

    return Response.json({
      ready: true,
      shopName: report.shopName,
      reportToken: sealVisibilityReport(report, reportSecret),
    });
  } catch {
    return Response.json({ error: "The scan returned an invalid result." }, { status: 502 });
  }
};
