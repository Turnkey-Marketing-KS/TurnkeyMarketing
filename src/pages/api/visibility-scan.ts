import type { APIRoute } from "astro";
import { sealVisibilityReport } from "@/lib/visibility-report-token";
import { normalizeVisibilityReport, type RawVisibilityReport } from "@/lib/visibility-report";

type ScanRequest = { shopName?: string; location?: string; specialty?: string };
type OpenAIContent = { type?: string; text?: string };
type OpenAIOutputItem = { content?: OpenAIContent[] };
type OpenAIResponsePayload = { output_text?: string; output?: OpenAIOutputItem[] };

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

Write like an experienced auto repair marketing advisor speaking directly to a busy shop owner. Use everyday shop language such as drivers, calls, appointments, repairs, website, and reviews. Every sentence should quickly answer, "What does this mean for my shop?"

Avoid marketing and AI jargon. Do not use words such as visibility, signals, evidence, entity, optimization, query, SERP, schema, ranking factors, or citations in the returned fields. Do not sound technical, dramatic, or salesy.

Make every field short, direct, and easy to scan:
- verdict: say whether AI mentioned the shop and what that means, 18 words maximum
- gap: name the one unclear or missing item most likely to cost the shop calls, 28 words maximum
- understood: exactly three concrete facts AI could find about the shop, each 16 words maximum
- shopAppeared: true only when the scanned shop itself appeared as a recommendation for the requested work in a response reviewed; finding its website or business details alone does not count
- shopsAhead: if shopAppeared is true, how many distinct nearby shops were recommended before this shop; otherwise return 0
- shopsCompared: total distinct shops compared in the scan, including this shop; it must be at least shopsAhead plus one
- competitor: explain in ordinary language why other nearby shops were easier to mention or choose, 24 words maximum
- cta: begin with an action verb and tell the owner the first thing to fix, 22 words maximum

Only count a shop as ahead when the same response actually placed or recommended it before the scanned shop. Never infer a #1 position from zero shopsAhead. When the scanned shop is absent from recommendations, shopAppeared must be false.

Keep the score consistent with recommendation visibility: 0–39 when the shop did not appear, 40–59 for weak or inconsistent visibility, 60–79 for solid visibility, and 80–100 only for strong repeated visibility.

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
              shopAppeared: { type: "boolean" },
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
              "shopAppeared",
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
    const parsed = JSON.parse(outputText) as RawVisibilityReport;
    const report = normalizeVisibilityReport(parsed, shopName);

    return Response.json({
      ready: true,
      shopName: report.shopName,
      reportToken: sealVisibilityReport(report, reportSecret),
    });
  } catch {
    return Response.json({ error: "The scan returned an invalid result." }, { status: 502 });
  }
};
