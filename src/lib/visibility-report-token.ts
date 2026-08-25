import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

const TOKEN_VERSION = "v1";
const IV_BYTES = 12;
const REPORT_TOKEN_TTL_MS = 15 * 60 * 1000;

type ReportTokenPayload = {
  issuedAt: number;
  report: Record<string, unknown>;
};

const getKey = (secret: string) => {
  if (typeof secret !== "string" || secret.length < 32) {
    throw new Error("AI_VISIBILITY_SCAN_REPORT_SECRET must be at least 32 characters.");
  }

  return createHash("sha256").update(secret, "utf8").digest();
};

export const sealVisibilityReport = (
  report: Record<string, unknown>,
  secret: string,
  now = Date.now(),
) => {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv("aes-256-gcm", getKey(secret), iv);
  const plaintext = Buffer.from(
    JSON.stringify({ issuedAt: now, report } satisfies ReportTokenPayload),
  );
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return [
    TOKEN_VERSION,
    iv.toString("base64url"),
    authTag.toString("base64url"),
    ciphertext.toString("base64url"),
  ].join(".");
};

export const openVisibilityReport = (
  token: string,
  secret: string,
  now = Date.now(),
): Record<string, unknown> => {
  const [version, encodedIv, encodedAuthTag, encodedCiphertext, ...extra] = token.split(".");
  if (
    version !== TOKEN_VERSION ||
    !encodedIv ||
    !encodedAuthTag ||
    !encodedCiphertext ||
    extra.length > 0
  ) {
    throw new Error("Invalid report token.");
  }

  const iv = Buffer.from(encodedIv, "base64url");
  const authTag = Buffer.from(encodedAuthTag, "base64url");
  const ciphertext = Buffer.from(encodedCiphertext, "base64url");
  if (iv.length !== IV_BYTES || authTag.length !== 16 || ciphertext.length === 0) {
    throw new Error("Invalid report token.");
  }

  const decipher = createDecipheriv("aes-256-gcm", getKey(secret), iv);
  decipher.setAuthTag(authTag);
  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  const payload = JSON.parse(plaintext.toString("utf8")) as Partial<ReportTokenPayload>;

  if (
    !Number.isFinite(payload.issuedAt) ||
    !payload.report ||
    typeof payload.report !== "object" ||
    Array.isArray(payload.report) ||
    payload.issuedAt! > now + 60_000 ||
    now - payload.issuedAt! > REPORT_TOKEN_TTL_MS
  ) {
    throw new Error("Expired or invalid report token.");
  }

  return payload.report;
};
