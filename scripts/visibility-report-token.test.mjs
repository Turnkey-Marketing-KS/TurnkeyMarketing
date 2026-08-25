import assert from "node:assert/strict";
import test from "node:test";
import { openVisibilityReport, sealVisibilityReport } from "../src/lib/visibility-report-token.ts";

const secret = "a-local-test-secret-that-is-longer-than-thirty-two-characters";
const now = Date.UTC(2026, 7, 25, 12, 0, 0);
const report = { shopName: "Smith Auto Care", score: 72, verdict: "Strong local signal." };

test("report tokens round-trip without exposing report content", () => {
  const token = sealVisibilityReport(report, secret, now);
  assert.doesNotMatch(token, /Smith Auto Care|Strong local signal/);
  assert.deepEqual(openVisibilityReport(token, secret, now + 1_000), report);
});

test("tampered report tokens are rejected", () => {
  const token = sealVisibilityReport(report, secret, now);
  const tampered = `${token.slice(0, -1)}${token.endsWith("a") ? "b" : "a"}`;
  assert.throws(() => openVisibilityReport(tampered, secret, now + 1_000));
});

test("report tokens expire after fifteen minutes", () => {
  const token = sealVisibilityReport(report, secret, now);
  assert.throws(() => openVisibilityReport(token, secret, now + 15 * 60 * 1_000 + 1));
});
