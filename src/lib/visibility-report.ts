export type RawVisibilityReport = {
  score?: unknown;
  verdict?: unknown;
  gap?: unknown;
  understood?: unknown;
  shopAppeared?: unknown;
  shopsAhead?: unknown;
  shopsCompared?: unknown;
  competitor?: unknown;
  cta?: unknown;
};

export type VisibilityReport = {
  shopName: string;
  score: number;
  verdict: string;
  gap: string;
  understood: string[];
  shopAppeared: boolean;
  shopsAhead: number;
  shopsCompared: number;
  competitor: string;
  cta: string;
};

export const cleanVisibilityText = (value: unknown, maxLength: number) => {
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

const toNonNegativeInteger = (value: unknown) => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.trunc(number)) : 0;
};

export const normalizeVisibilityReport = (
  raw: RawVisibilityReport,
  shopName: string,
): VisibilityReport => {
  const shopAppeared = raw.shopAppeared === true;
  const shopsAhead = shopAppeared ? toNonNegativeInteger(raw.shopsAhead) : 0;
  const shopsCompared = Math.max(1, shopsAhead + 1, toNonNegativeInteger(raw.shopsCompared));
  const rawScore = Math.max(0, Math.min(100, toNonNegativeInteger(raw.score)));

  // Being findable is not the same as being recommended. Keep the score on
  // the same side of the report's primary recommendation boundary.
  const score = shopAppeared ? Math.max(rawScore, 40) : Math.min(rawScore, 39);

  return {
    shopName: shopName.trim(),
    score,
    verdict: cleanVisibilityText(raw.verdict, 140),
    gap: cleanVisibilityText(raw.gap, 220),
    understood: Array.isArray(raw.understood)
      ? raw.understood.slice(0, 3).map((item) => cleanVisibilityText(item, 140))
      : [],
    shopAppeared,
    shopsAhead,
    shopsCompared,
    competitor: cleanVisibilityText(raw.competitor, 180),
    cta: cleanVisibilityText(raw.cta, 180),
  };
};
