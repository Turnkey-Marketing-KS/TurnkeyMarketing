import assert from "node:assert/strict";
import test from "node:test";
import { normalizeVisibilityReport } from "../src/lib/visibility-report.ts";

const baseReport = {
  score: 28,
  verdict: "AI visibility is limited for brake searches.",
  gap: "Nearby brake shops appeared, but this shop did not.",
  understood: ["Identity found", "Location found", "Services unclear"],
  shopsAhead: 0,
  shopsCompared: 9,
  competitor: "Nearby alternatives had clearer brake service signals.",
  cta: "Clarify brake services across public profiles.",
};

test("a shop absent from recommendations is not converted into position one", () => {
  const report = normalizeVisibilityReport({ ...baseReport, shopAppeared: false }, "Smith Auto");

  assert.equal(report.shopAppeared, false);
  assert.equal(report.shopsAhead, 0);
  assert.equal(report.shopsCompared, 9);
  assert.equal(report.score, 28);
});

test("an absent shop cannot receive a healthy recommendation-visibility score", () => {
  const report = normalizeVisibilityReport(
    { ...baseReport, shopAppeared: false, score: 84 },
    "Smith Auto",
  );

  assert.equal(report.score, 39);
});

test("a shop that appeared retains its evidence-based recommendation position", () => {
  const report = normalizeVisibilityReport(
    { ...baseReport, shopAppeared: true, shopsAhead: 2, shopsCompared: 6, score: 68 },
    "Smith Auto",
  );

  assert.equal(report.shopAppeared, true);
  assert.equal(report.shopsAhead + 1, 3);
  assert.equal(report.shopsCompared, 6);
  assert.equal(report.score, 68);
});

test("an appeared shop cannot retain an absent-range score", () => {
  const report = normalizeVisibilityReport(
    { ...baseReport, shopAppeared: true, shopsAhead: 0, shopsCompared: 4, score: 28 },
    "Smith Auto",
  );

  assert.equal(report.score, 40);
});

test("invalid counts are normalized without manufacturing an ahead count", () => {
  const report = normalizeVisibilityReport(
    { ...baseReport, shopAppeared: false, shopsAhead: 7, shopsCompared: 0 },
    "Smith Auto",
  );

  assert.equal(report.shopsAhead, 0);
  assert.equal(report.shopsCompared, 1);
});
