export const AI_VISIBILITY_SCAN_MODEL = "gpt-5.6-luna";
export const AI_VISIBILITY_SCAN_REASONING_EFFORT = "medium" as const;

export type RawVisibilitySignals = {
  identityConfirmed?: unknown;
  locationConfirmed?: unknown;
  websiteFound?: unknown;
  serviceConfirmed?: unknown;
  reputationConfirmed?: unknown;
};

export type RawRecommendationCheck = {
  query?: unknown;
  appeared?: unknown;
  alternativesShown?: unknown;
  finding?: unknown;
};

export type RawVisibilityReport = {
  matchConfidence?: unknown;
  confidenceNote?: unknown;
  verdict?: unknown;
  gap?: unknown;
  understood?: unknown;
  signals?: RawVisibilitySignals;
  recommendationChecks?: unknown;
  competitor?: unknown;
  cta?: unknown;
};

export type RecommendationCheck = {
  query: string;
  appeared: boolean;
  alternativesShown: number;
  finding: string;
};

export type VisibilityReport = {
  shopName: string;
  score: number | null;
  foundationScore: number;
  recommendationScore: number;
  matchConfidence: "high" | "medium" | "low";
  confidenceNote: string;
  verdict: string;
  gap: string;
  understood: string[];
  recommendationChecks: RecommendationCheck[];
  checksAppeared: number;
  competitor: string;
  cta: string;
};

export const cleanVisibilityText = (value: unknown, maxLength: number) => {
  const withoutControlCharacters = Array.from(String(value ?? ""))
    .map((character) => {
      const code = character.charCodeAt(0);
      return code >= 32 && code !== 127 ? character : " ";
    })
    .join("");
  const cleaned = withoutControlCharacters
    .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/gi, "$1")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/\s*\([^)]*\b(?:\.com|\.net|\.org|\.co|\.io)\b[^)]*\)/gi, "")
    .replace(/【[^】]+】/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
  return cleaned.length > maxLength ? `${cleaned.slice(0, maxLength - 1).trim()}…` : cleaned;
};

export const normalizeScanField = (value: unknown, maxLength: number) =>
  cleanVisibilityText(value, maxLength).replace(/[<>]/g, "").trim();

const toNonNegativeInteger = (value: unknown) => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.trunc(number)) : 0;
};

const normalizeRecommendationChecks = (value: unknown): RecommendationCheck[] =>
  Array.isArray(value)
    ? value.slice(0, 3).map((item) => {
        const check = (item && typeof item === "object" ? item : {}) as RawRecommendationCheck;
        return {
          query: cleanVisibilityText(check.query, 100),
          appeared: check.appeared === true,
          alternativesShown: Math.min(5, toNonNegativeInteger(check.alternativesShown)),
          finding: cleanVisibilityText(check.finding, 160),
        };
      })
    : [];

export const normalizeVisibilityReport = (
  raw: RawVisibilityReport,
  shopName: string,
): VisibilityReport => {
  const matchConfidence =
    raw.matchConfidence === "high" || raw.matchConfidence === "medium"
      ? raw.matchConfidence
      : "low";
  const signals = raw.signals && typeof raw.signals === "object" ? raw.signals : {};
  const foundationScore =
    (signals.identityConfirmed === true ? 8 : 0) +
    (signals.locationConfirmed === true ? 6 : 0) +
    (signals.websiteFound === true ? 8 : 0) +
    (signals.serviceConfirmed === true ? 10 : 0) +
    (signals.reputationConfirmed === true ? 8 : 0);
  const recommendationChecks = normalizeRecommendationChecks(raw.recommendationChecks).map(
    (check) => (matchConfidence === "low" ? { ...check, appeared: false } : check),
  );
  const checksAppeared = recommendationChecks.filter((check) => check.appeared).length;
  const recommendationScore = recommendationChecks.length
    ? Math.round((checksAppeared / recommendationChecks.length) * 60)
    : 0;

  return {
    shopName: normalizeScanField(shopName, 120),
    score: matchConfidence === "low" ? null : foundationScore + recommendationScore,
    foundationScore,
    recommendationScore,
    matchConfidence,
    confidenceNote: cleanVisibilityText(raw.confidenceNote, 160),
    verdict: cleanVisibilityText(raw.verdict, 140),
    gap: cleanVisibilityText(raw.gap, 220),
    understood: Array.isArray(raw.understood)
      ? raw.understood.slice(0, 3).map((item) => cleanVisibilityText(item, 140))
      : [],
    recommendationChecks,
    checksAppeared,
    competitor: cleanVisibilityText(raw.competitor, 180),
    cta: cleanVisibilityText(raw.cta, 180),
  };
};
