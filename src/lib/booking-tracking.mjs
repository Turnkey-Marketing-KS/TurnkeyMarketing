export const ATTRIBUTION_STORAGE_KEY = "turnkey_attribution_v2";
export const LEGACY_ATTRIBUTION_STORAGE_KEYS = ["turnkey_attribution_v1"];
export const BOOKING_EVENT_STORAGE_KEY = "turnkey_appointment_booked_sent_at";
export const MAIN_WEBSITE_GHL_BOOKING_EVENT_STORAGE_KEY = "turnkey_main_website_ghl_booking_sent";
export const MAIN_WEBSITE_GHL_CALENDAR_ID = "wDWczTxA5kEbkEWoqzLC";
export const MAIN_WEBSITE_GHL_BOOKING_URL = `https://api.leadconnectorhq.com/widget/booking/${MAIN_WEBSITE_GHL_CALENDAR_ID}`;

export const ATTRIBUTION_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
];

const CLICK_ID_KEYS = new Set(["gclid", "gbraid", "wbraid", "fbclid", "msclkid"]);
const MAX_ATTRIBUTION_VALUE_LENGTH = 500;
const MAX_CAMPAIGN_VALUE_LENGTH = 200;
const BOOKING_EVENT_DEDUPE_WINDOW_MS = 30 * 60 * 1000;
const DEFAULT_SITE_ORIGIN = "https://www.turnkeyautomarketing.com";
const GA4_MEASUREMENT_ID = "G-XJZ35N9FWG";
const APPOINTMENTCORE_CALENDAR_VIEW_FLAG = "__tkAppointmentCoreCalendarViewed";
const MAIN_WEBSITE_GHL_CALENDAR_VIEW_FLAG = "__tkMainWebsiteGhlCalendarViewed";
const PII_QUERY_KEY_PATTERN =
  /(?:^|[_-])(?:e-?mail|phone|mobile|tel|telephone|name|first_?name|last_?name|full_?name|address|street|city|state|zip|postal(?:_?code)?|dob|birth(?:day|date)?|ssn|message|details)(?:$|[_-])/i;
const EMAIL_VALUE_PATTERN = /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/i;
const PHONE_VALUE_PATTERN = /(?:\+?\d[\s().-]*){7,}/;

function cleanValue(value, maxLength = MAX_ATTRIBUTION_VALUE_LENGTH) {
  if (typeof value !== "string" && typeof value !== "number") return "";
  return String(value).trim().slice(0, maxLength);
}

function containsPii(value) {
  const cleaned = cleanValue(value);
  return EMAIL_VALUE_PATTERN.test(cleaned) || PHONE_VALUE_PATTERN.test(cleaned);
}

function cleanCampaignValue(key, value) {
  const cleaned = cleanValue(value, MAX_CAMPAIGN_VALUE_LENGTH);
  if (!cleaned || EMAIL_VALUE_PATTERN.test(cleaned)) return "";

  if (CLICK_ID_KEYS.has(key)) {
    return /^[a-z0-9._~-]+$/i.test(cleaned) ? cleaned : "";
  }

  return PHONE_VALUE_PATTERN.test(cleaned) ? "" : cleaned;
}

function cleanIdentifier(value, { requireTkPrefix = false } = {}) {
  const cleaned = cleanValue(value, 160);
  if (!cleaned || EMAIL_VALUE_PATTERN.test(cleaned)) return "";
  if (requireTkPrefix && !cleaned.startsWith("tk_")) return "";
  return /^[a-z0-9._~-]+$/i.test(cleaned) ? cleaned : "";
}

function cleanTimestamp(value) {
  const cleaned = cleanValue(value, 40);
  if (!cleaned || Number.isNaN(Date.parse(cleaned))) return "";
  return new Date(cleaned).toISOString();
}

function cleanTouch(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const cleaned = {};
  ATTRIBUTION_PARAM_KEYS.forEach((key) => {
    const item = cleanCampaignValue(key, value[key]);
    if (item) cleaned[key] = item;
  });
  return cleaned;
}

function hasValues(value) {
  return value && typeof value === "object" && Object.keys(value).length > 0;
}

function safeUrl(value, baseHref = DEFAULT_SITE_ORIGIN) {
  try {
    const url = new URL(value, baseHref);
    return ["http:", "https:"].includes(url.protocol) ? url : null;
  } catch (_) {
    return null;
  }
}

function pathContainsPii(pathname) {
  try {
    return pathname
      .split("/")
      .some((segment) => segment && containsPii(decodeURIComponent(segment)));
  } catch (_) {
    return true;
  }
}

export function sanitizeUrlForAttribution(
  href,
  { baseHref = DEFAULT_SITE_ORIGIN, relative = false } = {},
) {
  if (!cleanValue(href)) return "";
  const url = safeUrl(href, baseHref);
  if (!url || pathContainsPii(url.pathname)) return relative ? "/" : "";

  const sanitized = new URL(url.origin + url.pathname);
  ATTRIBUTION_PARAM_KEYS.forEach((key) => {
    const value = cleanCampaignValue(key, url.searchParams.get(key) || "");
    if (value) sanitized.searchParams.set(key, value);
  });

  if (relative) return `${sanitized.pathname}${sanitized.search}` || "/";
  return sanitized.toString();
}

function stripPiiQueryParams(url) {
  [...url.searchParams.entries()].forEach(([key, value]) => {
    if (
      PII_QUERY_KEY_PATTERN.test(key) ||
      EMAIL_VALUE_PATTERN.test(value) ||
      (!ATTRIBUTION_PARAM_KEYS.includes(key) &&
        !key.startsWith("tk_") &&
        PHONE_VALUE_PATTERN.test(value))
    ) {
      url.searchParams.delete(key);
    }
  });
  return url;
}

function getFlatTouch(value) {
  const touch = {};
  ATTRIBUTION_PARAM_KEYS.forEach((key) => {
    const item = cleanCampaignValue(key, value?.[key]);
    if (item) touch[key] = item;
  });
  return touch;
}

function normalizeStoredAttribution(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const legacyTouch = getFlatTouch(value);
  const firstTouch = cleanTouch(value.first_touch);
  const latestTouch = cleanTouch(value.latest_touch);
  const normalizedFirstTouch = hasValues(firstTouch) ? firstTouch : legacyTouch;
  const normalizedLatestTouch = hasValues(latestTouch) ? latestTouch : legacyTouch;
  const firstLandingPage = sanitizeUrlForAttribution(
    value.first_landing_page || value.landing_page || "",
    { relative: true },
  );
  const latestLandingPage = sanitizeUrlForAttribution(
    value.latest_landing_page || value.landing_page || "",
    { relative: true },
  );
  const firstReferrer = sanitizeUrlForAttribution(
    value.first_referrer || value.landing_referrer || "",
  );
  const latestReferrer = sanitizeUrlForAttribution(
    value.latest_referrer || value.landing_referrer || "",
  );
  const normalized = {
    version: 2,
    first_touch: normalizedFirstTouch,
    latest_touch: normalizedLatestTouch,
  };

  const scalarValues = {
    tracking_session_id: cleanIdentifier(value.tracking_session_id, {
      requireTkPrefix: true,
    }),
    ga_client_id: cleanIdentifier(value.ga_client_id),
    ga_session_id: cleanIdentifier(value.ga_session_id),
    first_touch_at: cleanTimestamp(value.first_touch_at),
    latest_touch_at: cleanTimestamp(value.latest_touch_at),
    first_landing_page: firstLandingPage,
    latest_landing_page: latestLandingPage,
    first_referrer: firstReferrer,
    latest_referrer: latestReferrer,
  };
  Object.entries(scalarValues).forEach(([key, item]) => {
    if (item) normalized[key] = item;
  });

  Object.assign(normalized, normalizedLatestTouch);
  if (firstLandingPage) normalized.landing_page = firstLandingPage;
  if (firstReferrer) normalized.landing_referrer = firstReferrer;
  return normalized;
}

export function parseStoredAttribution(rawValue) {
  if (!rawValue) return {};
  try {
    return normalizeStoredAttribution(JSON.parse(rawValue));
  } catch (_) {
    return {};
  }
}

export function createTrackingSessionId(cryptoApi = globalThis.crypto) {
  try {
    if (typeof cryptoApi?.randomUUID === "function") {
      return `tk_${cryptoApi.randomUUID().replaceAll("-", "").toLowerCase()}`;
    }
    if (typeof cryptoApi?.getRandomValues === "function") {
      const bytes = cryptoApi.getRandomValues(new Uint8Array(16));
      return `tk_${[...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
    }
  } catch (_) {}

  return `tk_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 18)}`;
}

function extractIncomingTouch(url, prefix = "") {
  const touch = {};
  ATTRIBUTION_PARAM_KEYS.forEach((key) => {
    const value = cleanCampaignValue(key, url.searchParams.get(`${prefix}${key}`) || "");
    if (value) touch[key] = value;
  });
  return touch;
}

function extractPassThrough(url) {
  const firstTouch = extractIncomingTouch(url, "tk_first_");
  const latestTouch = extractIncomingTouch(url, "tk_latest_");
  const canonicalTouch = extractIncomingTouch(url, "tk_");
  const passThrough = {
    first_touch: firstTouch,
    latest_touch: hasValues(latestTouch) ? latestTouch : canonicalTouch,
  };

  [
    "tracking_session_id",
    "ga_client_id",
    "ga_session_id",
    "first_touch_at",
    "latest_touch_at",
    "first_landing_page",
    "latest_landing_page",
    "first_referrer",
    "latest_referrer",
  ].forEach((key) => {
    const value = url.searchParams.get(`tk_${key}`);
    if (value) passThrough[key] = value;
  });

  return normalizeStoredAttribution(passThrough);
}

function isExternalReferrer(referrer, currentUrl) {
  const referrerUrl = safeUrl(referrer);
  return Boolean(referrerUrl && referrerUrl.origin !== currentUrl.origin);
}

function copyIfMissing(target, source, keys) {
  keys.forEach((key) => {
    if (!target[key] && source[key]) target[key] = source[key];
  });
}

export function mergeAttribution({
  href,
  referrer = "",
  existing = {},
  now = new Date().toISOString(),
  trackingSessionId = "",
}) {
  const url = safeUrl(href, DEFAULT_SITE_ORIGIN) || new URL(DEFAULT_SITE_ORIGIN);
  const stored = normalizeStoredAttribution(existing);
  const passThrough = extractPassThrough(url);
  const incomingTouch = extractIncomingTouch(url);
  const capturedAt = cleanTimestamp(now) || new Date().toISOString();
  const landingPage = sanitizeUrlForAttribution(url.toString(), { relative: true });
  const externalReferrer = isExternalReferrer(referrer, url)
    ? sanitizeUrlForAttribution(referrer)
    : "";
  const merged = normalizeStoredAttribution(stored);

  copyIfMissing(merged, passThrough, [
    "tracking_session_id",
    "ga_client_id",
    "ga_session_id",
    "first_touch_at",
    "latest_touch_at",
    "first_landing_page",
    "latest_landing_page",
    "first_referrer",
    "latest_referrer",
  ]);
  if (!hasValues(merged.first_touch) && hasValues(passThrough.first_touch)) {
    merged.first_touch = passThrough.first_touch;
  }
  if (!hasValues(merged.latest_touch) && hasValues(passThrough.latest_touch)) {
    merged.latest_touch = passThrough.latest_touch;
  }

  if (!merged.tracking_session_id) {
    merged.tracking_session_id =
      cleanIdentifier(trackingSessionId, { requireTkPrefix: true }) || createTrackingSessionId();
  }

  const isFirstTouch = !merged.first_landing_page;
  if (isFirstTouch) {
    merged.first_touch = hasValues(merged.first_touch)
      ? merged.first_touch
      : hasValues(incomingTouch)
        ? incomingTouch
        : {};
    merged.latest_touch = hasValues(merged.latest_touch)
      ? merged.latest_touch
      : { ...merged.first_touch };
    merged.first_landing_page = landingPage || "/";
    merged.latest_landing_page = merged.latest_landing_page || merged.first_landing_page;
    merged.first_touch_at = merged.first_touch_at || capturedAt;
    merged.latest_touch_at = merged.latest_touch_at || merged.first_touch_at;
    if (externalReferrer) {
      merged.first_referrer = merged.first_referrer || externalReferrer;
      merged.latest_referrer = merged.latest_referrer || externalReferrer;
    }
  } else if (
    (hasValues(incomingTouch) &&
      (JSON.stringify(incomingTouch) !== JSON.stringify(merged.latest_touch) ||
        landingPage !== merged.latest_landing_page)) ||
    (!hasValues(incomingTouch) &&
      externalReferrer &&
      (externalReferrer !== merged.latest_referrer || landingPage !== merged.latest_landing_page))
  ) {
    merged.latest_touch = incomingTouch;
    merged.latest_landing_page = landingPage || "/";
    merged.latest_touch_at = capturedAt;
    if (externalReferrer) merged.latest_referrer = externalReferrer;
  }

  merged.first_touch_at = merged.first_touch_at || capturedAt;
  merged.latest_touch_at = merged.latest_touch_at || merged.first_touch_at;
  merged.latest_landing_page = merged.latest_landing_page || merged.first_landing_page || "/";

  ATTRIBUTION_PARAM_KEYS.forEach((key) => delete merged[key]);
  Object.assign(merged, merged.latest_touch);
  merged.landing_page = merged.first_landing_page;
  if (merged.first_referrer) merged.landing_referrer = merged.first_referrer;
  else delete merged.landing_referrer;
  merged.version = 2;
  return normalizeStoredAttribution(merged);
}

function addAttributionParam(params, key, value) {
  const cleaned = cleanValue(value);
  if (cleaned) params.set(key, cleaned);
}

export function buildAttributionQueryParams(attribution, { includeRaw = true } = {}) {
  const cleaned = normalizeStoredAttribution(attribution);
  const params = new URLSearchParams();

  ATTRIBUTION_PARAM_KEYS.forEach((key) => {
    const currentValue = cleanCampaignValue(key, cleaned.latest_touch?.[key] || cleaned[key]);
    const firstValue = cleanCampaignValue(key, cleaned.first_touch?.[key]);
    const latestValue = cleanCampaignValue(key, cleaned.latest_touch?.[key]);
    if (includeRaw && currentValue) addAttributionParam(params, key, currentValue);
    if (currentValue) addAttributionParam(params, `tk_${key}`, currentValue);
    if (firstValue) addAttributionParam(params, `tk_first_${key}`, firstValue);
    if (latestValue) addAttributionParam(params, `tk_latest_${key}`, latestValue);
  });

  [
    "tracking_session_id",
    "ga_client_id",
    "ga_session_id",
    "first_touch_at",
    "latest_touch_at",
    "first_landing_page",
    "latest_landing_page",
    "first_referrer",
    "latest_referrer",
  ].forEach((key) => addAttributionParam(params, `tk_${key}`, cleaned[key]));
  return params;
}

export function decorateUrlWithAttribution(
  href,
  attribution,
  baseHref,
  { includeRaw = true } = {},
) {
  const url = safeUrl(href, baseHref || DEFAULT_SITE_ORIGIN);
  if (!url) return href;
  const siteUrl = safeUrl(baseHref || DEFAULT_SITE_ORIGIN, DEFAULT_SITE_ORIGIN);
  if (!siteUrl || url.origin !== siteUrl.origin) return href;

  stripPiiQueryParams(url);
  buildAttributionQueryParams(attribution, { includeRaw }).forEach((value, key) => {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value);
  });
  return url.toString();
}

export function decorateGhlCalendarUrlWithAttribution(
  href,
  attribution,
  expectedCalendarId = MAIN_WEBSITE_GHL_CALENDAR_ID,
) {
  const url = safeUrl(href, MAIN_WEBSITE_GHL_BOOKING_URL);
  const cleanedCalendarId = cleanIdentifier(expectedCalendarId);
  if (
    !url ||
    url.protocol !== "https:" ||
    url.hostname !== "api.leadconnectorhq.com" ||
    url.pathname !== `/widget/booking/${cleanedCalendarId}`
  ) {
    return href;
  }

  stripPiiQueryParams(url);
  const params = buildAttributionQueryParams(attribution);
  const gaClientId = params.get("tk_ga_client_id");
  const gaSessionId = params.get("tk_ga_session_id");
  params.delete("tk_ga_client_id");
  params.delete("tk_ga_session_id");
  if (gaClientId) params.set("tk_ga4_client_id", gaClientId);
  if (gaSessionId) params.set("tk_ga4_session_id", gaSessionId);
  params.forEach((value, key) => url.searchParams.set(key, value));
  return url.toString();
}

function appendEventAttribution(params, attribution) {
  const cleaned = normalizeStoredAttribution(attribution);
  ATTRIBUTION_PARAM_KEYS.forEach((key) => {
    if (cleaned.latest_touch?.[key]) params[key] = cleaned.latest_touch[key];
    if (cleaned.first_touch?.[key]) params[`first_${key}`] = cleaned.first_touch[key];
    if (cleaned.latest_touch?.[key]) params[`latest_${key}`] = cleaned.latest_touch[key];
  });
  [
    "tracking_session_id",
    "ga_client_id",
    "ga_session_id",
    "first_touch_at",
    "latest_touch_at",
    "first_landing_page",
    "latest_landing_page",
    "first_referrer",
    "latest_referrer",
  ].forEach((key) => {
    if (cleaned[key]) params[key] = cleaned[key];
  });
  if (cleaned.first_landing_page) params.landing_page = cleaned.first_landing_page;
  if (cleaned.first_referrer) params.landing_referrer = cleaned.first_referrer;
}

export function buildBookingEventParams(
  attribution,
  confirmationPath,
  { bookingProvider = "appointmentcore", bookingFunnel = "main_website" } = {},
) {
  const params = {
    appointment_type: "30_minute_marketing_consultation",
    booking_provider: bookingProvider,
    booking_funnel: bookingFunnel,
    lead_source: "appointment_booking",
    confirmation_path: cleanValue(confirmationPath) || "/booking-confirmed",
  };
  appendEventAttribution(params, attribution);
  return params;
}

export function isGooglePaidAttribution(attribution) {
  const cleaned = normalizeStoredAttribution(attribution);
  const touches = [cleaned.latest_touch, cleaned.first_touch, cleaned];
  return touches.some((touch) => {
    if (!touch || typeof touch !== "object") return false;
    if (touch.gclid || touch.gbraid || touch.wbraid) return true;
    const source = (touch.utm_source || "").toLowerCase();
    const medium = (touch.utm_medium || "").toLowerCase();
    return source === "google" && ["cpc", "ppc", "paid", "paid_search"].includes(medium);
  });
}

function readStoredAttribution(targetWindow) {
  for (const key of [ATTRIBUTION_STORAGE_KEY, ...LEGACY_ATTRIBUTION_STORAGE_KEYS]) {
    try {
      const parsed = parseStoredAttribution(targetWindow.sessionStorage.getItem(key));
      if (hasValues(parsed)) return parsed;
    } catch (_) {}
  }
  return normalizeStoredAttribution(targetWindow.tkAttribution);
}

function persistAttribution(targetWindow, attribution) {
  try {
    targetWindow.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  } catch (_) {}
}

function readGaClientIdFromCookie(cookieValue) {
  const gaCookie = cleanValue(cookieValue)
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("_ga="));
  if (!gaCookie) return "";
  const parts = gaCookie.slice(4).split(".");
  if (parts.length < 4) return "";
  return cleanIdentifier(parts.slice(-2).join("."));
}

function enrichWithGaIdentifiers(targetWindow, attribution) {
  const cookieClientId = readGaClientIdFromCookie(targetWindow.document.cookie || "");
  if (!attribution.ga_client_id && cookieClientId) attribution.ga_client_id = cookieClientId;
  if (typeof targetWindow.gtag !== "function") return;

  let pendingCallbacks = 2;
  let refreshTimer;
  const finishEnrichment = () => {
    if (targetWindow.__tkAttributionEnrichmentFinished) return;
    targetWindow.__tkAttributionEnrichmentFinished = true;
    if (refreshTimer) {
      const clearTimer = targetWindow.clearTimeout || globalThis.clearTimeout;
      clearTimer(refreshTimer);
      refreshTimer = undefined;
    }
    persistAttribution(targetWindow, attribution);
    targetWindow.tkAttribution = attribution;
  };
  const setTimer = targetWindow.setTimeout || globalThis.setTimeout;
  refreshTimer = setTimer(finishEnrichment, 250);

  [
    ["client_id", "ga_client_id"],
    ["session_id", "ga_session_id"],
  ].forEach(([gaField, attributionField]) => {
    try {
      targetWindow.gtag("get", GA4_MEASUREMENT_ID, gaField, (value) => {
        const cleaned = cleanIdentifier(value);
        if (cleaned) attribution[attributionField] = cleaned;
        pendingCallbacks -= 1;
        if (pendingCallbacks === 0) finishEnrichment();
      });
    } catch (_) {
      pendingCallbacks -= 1;
      if (pendingCallbacks === 0) finishEnrichment();
    }
  });
}

export function initializeAttributionTracking(targetWindow) {
  const attribution = mergeAttribution({
    href: targetWindow.location.href,
    referrer: targetWindow.document.referrer,
    existing: readStoredAttribution(targetWindow),
    trackingSessionId: createTrackingSessionId(targetWindow.crypto),
  });
  enrichWithGaIdentifiers(targetWindow, attribution);
  persistAttribution(targetWindow, attribution);
  targetWindow.tkAttribution = attribution;
  trackAppointmentCoreCalendarViewed(targetWindow);
  return attribution;
}

function dispatchAnalyticsEvent(targetWindow, eventName, params) {
  if (typeof targetWindow.gtag === "function") {
    targetWindow.gtag("event", eventName, params);
    return;
  }
  targetWindow.dataLayer = targetWindow.dataLayer || [];
  targetWindow.dataLayer.push({ event: eventName, ...params });
}

export function trackAppointmentCoreCalendarViewed(targetWindow) {
  if (targetWindow[APPOINTMENTCORE_CALENDAR_VIEW_FLAG]) return false;

  const currentUrl = safeUrl(targetWindow.location?.href, DEFAULT_SITE_ORIGIN);
  if (currentUrl?.pathname !== "/contact") return false;

  const appointmentCoreFrames = targetWindow.document.querySelectorAll(
    'iframe[src*="appointmentcore.com/book/"]',
  );
  if (!appointmentCoreFrames.length) return false;

  targetWindow[APPOINTMENTCORE_CALENDAR_VIEW_FLAG] = true;
  dispatchAnalyticsEvent(targetWindow, "appointmentcore_calendar_viewed", {
    booking_provider: "appointmentcore",
    booking_funnel: "main_website",
  });
  return true;
}

export function trackMainWebsiteGhlCalendarViewed(targetWindow) {
  if (targetWindow[MAIN_WEBSITE_GHL_CALENDAR_VIEW_FLAG]) return false;

  const currentUrl = safeUrl(targetWindow.location?.href, DEFAULT_SITE_ORIGIN);
  if (currentUrl?.pathname !== "/contact") return false;

  const calendarFrames = targetWindow.document.querySelectorAll(
    'iframe[data-tk-booking-provider="ghl_calendar"]',
  );
  const hasMainWebsiteCalendar = [...calendarFrames].some((frame) => {
    const source = frame.getAttribute("data-src") || frame.getAttribute("src") || "";
    return source.includes(`/widget/booking/${MAIN_WEBSITE_GHL_CALENDAR_ID}`);
  });
  if (!hasMainWebsiteCalendar) return false;

  targetWindow[MAIN_WEBSITE_GHL_CALENDAR_VIEW_FLAG] = true;
  dispatchAnalyticsEvent(targetWindow, "booking_calendar_viewed", {
    booking_provider: "ghl_calendar",
    booking_funnel: "main_website",
  });
  return true;
}

function wasRecentlyTracked(targetWindow, now, storageKey) {
  try {
    const trackedAt = Number(targetWindow.sessionStorage.getItem(storageKey) || 0);
    return trackedAt > 0 && now - trackedAt < BOOKING_EVENT_DEDUPE_WINDOW_MS;
  } catch (_) {
    return false;
  }
}

function trackConfirmedBooking(
  targetWindow,
  confirmationPath,
  { bookingProvider, bookingFunnel, storageKey },
) {
  const now = Date.now();
  if (wasRecentlyTracked(targetWindow, now, storageKey)) return false;

  const attribution = initializeAttributionTracking(targetWindow);
  const eventParams = buildBookingEventParams(attribution, confirmationPath, {
    bookingProvider,
    bookingFunnel,
  });
  try {
    targetWindow.sessionStorage.setItem(storageKey, String(now));
  } catch (_) {}

  dispatchAnalyticsEvent(targetWindow, "appointment_booked", eventParams);
  dispatchAnalyticsEvent(targetWindow, "generate_lead", eventParams);
  if (typeof targetWindow.fbq === "function") {
    targetWindow.fbq("track", "Lead", {
      content_name: "Strategy Call",
      booking_provider: bookingProvider,
      lead_source: "appointment_booking",
    });
  }
  return true;
}

export function trackAppointmentBooked(targetWindow, confirmationPath) {
  return trackConfirmedBooking(targetWindow, confirmationPath, {
    bookingProvider: "appointmentcore",
    bookingFunnel: "main_website",
    storageKey: BOOKING_EVENT_STORAGE_KEY,
  });
}

export function trackMainWebsiteGhlBooking(
  targetWindow,
  confirmationPath = "/website-call-booked",
) {
  return trackConfirmedBooking(targetWindow, confirmationPath, {
    bookingProvider: "ghl_calendar",
    bookingFunnel: "main_website",
    storageKey: MAIN_WEBSITE_GHL_BOOKING_EVENT_STORAGE_KEY,
  });
}
