import type { APIRoute } from "astro";
import { openVisibilityReport } from "@/lib/visibility-report-token";

type UnlockRequest = { email?: unknown; reportToken?: unknown };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_REQUEST_BYTES = 32_768;

const normalizeEmail = (value: unknown) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return Response.json({ error: "Please run the scan again and retry." }, { status: 413 });
  }

  let body: UnlockRequest;
  try {
    const payload = await request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error();
    body = payload as UnlockRequest;
  } catch {
    return Response.json({ error: "Please check your email and try again." }, { status: 400 });
  }

  const email = normalizeEmail(body.email);
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email) || /[\r\n]/.test(email)) {
    return Response.json(
      { error: "Enter a valid business email to view your report." },
      { status: 400 },
    );
  }
  if (typeof body.reportToken !== "string" || body.reportToken.length > 24_000) {
    return Response.json(
      { error: "Your report has expired. Please run a new scan." },
      { status: 400 },
    );
  }

  const reportSecret = import.meta.env.AI_VISIBILITY_SCAN_REPORT_SECRET;
  const leadEndpoint = import.meta.env.AI_VISIBILITY_SCAN_LEAD_ENDPOINT;
  const leadSecret = import.meta.env.AI_VISIBILITY_SCAN_SHARED_SECRET;
  if (!reportSecret || !leadEndpoint || !leadSecret) {
    return Response.json(
      { error: "Your report is ready, but access is temporarily unavailable. Please try again." },
      { status: 503 },
    );
  }

  let report: Record<string, unknown>;
  try {
    report = openVisibilityReport(body.reportToken, reportSecret);
  } catch {
    return Response.json(
      { error: "Your report has expired. Please run a new scan." },
      { status: 400 },
    );
  }

  const shopName = typeof report.shopName === "string" ? report.shopName.trim() : "";
  if (!shopName) {
    return Response.json(
      { error: "Your report has expired. Please run a new scan." },
      { status: 400 },
    );
  }

  try {
    const leadResponse = await fetch(leadEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: request.headers.get("origin") || new URL(request.url).origin,
        "X-Turnkey-Visibility-Scan-Version": "1",
        "X-Turnkey-Visibility-Scan-Secret": leadSecret,
      },
      body: JSON.stringify({ email, companyName: shopName }),
    });

    if (!leadResponse.ok) {
      const status = leadResponse.status === 400 ? 400 : leadResponse.status === 502 ? 502 : 503;
      const error =
        status === 400
          ? "Enter a valid business email to view your report."
          : "Your report is ready, but we couldn't unlock it yet. Please try again.";
      return Response.json({ error }, { status });
    }
  } catch {
    return Response.json(
      { error: "Your report is ready, but we couldn't unlock it yet. Please try again." },
      { status: 502 },
    );
  }

  return Response.json(report);
};
