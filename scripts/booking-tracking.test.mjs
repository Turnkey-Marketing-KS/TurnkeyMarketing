import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  ATTRIBUTION_STORAGE_KEY,
  buildBookingEventParams,
  decorateUrlWithAttribution,
  initializeAttributionTracking,
  isGooglePaidAttribution,
  mergeAttribution,
  parseStoredAttribution,
  sanitizeUrlForAttribution,
  trackAppointmentCoreCalendarViewed,
  trackAppointmentBooked,
} from "../src/lib/booking-tracking.mjs";

const FIRST_TIME = "2026-08-20T15:00:00.000Z";
const LATEST_TIME = "2026-08-20T16:30:00.000Z";
const TRACKING_ID = "tk_0123456789abcdef0123456789abcdef";

function createStorage(values = new Map()) {
  return {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
    values,
  };
}

function createElement(attribute, value) {
  const attributes = new Map([[attribute, value]]);
  return {
    get src() {
      return attributes.get("src") || "";
    },
    getAttribute: (name) => attributes.get(name) || null,
    setAttribute: (name, nextValue) => attributes.set(name, nextValue),
  };
}

function createTrackingWindow(
  href,
  {
    referrer = "https://www.google.com/",
    storage = createStorage(),
    links = [],
    frames = [],
    cookie = "",
    gtag,
    fetch,
  } = {},
) {
  return {
    location: { href, origin: new URL(href).origin },
    document: {
      referrer,
      cookie,
      querySelectorAll: (selector) => {
        if (selector === 'a[href^="/contact"]') return links;
        if (selector === 'iframe[src*="appointmentcore.com/book/"]') return frames;
        return [];
      },
    },
    sessionStorage: storage,
    crypto: { randomUUID: () => "01234567-89ab-cdef-0123-456789abcdef" },
    dataLayer: [],
    gtag,
    fetch,
  };
}

test("captures click IDs, UTMs, first/latest context, timestamps, and a stable tk_ ID", () => {
  const attribution = mergeAttribution({
    href: "https://www.turnkeyautomarketing.com/?gclid=google-click&gbraid=gbraid-click&wbraid=wbraid-click&utm_source=google&utm_medium=cpc&utm_campaign=shops&utm_term=repair&utm_content=headline&email=owner%40shop.com",
    referrer: "https://www.google.com/search?q=auto+repair&email=owner%40shop.com",
    now: FIRST_TIME,
    trackingSessionId: TRACKING_ID,
  });

  assert.equal(attribution.tracking_session_id, TRACKING_ID);
  assert.equal(attribution.gclid, "google-click");
  assert.equal(attribution.gbraid, "gbraid-click");
  assert.equal(attribution.wbraid, "wbraid-click");
  assert.deepEqual(attribution.first_touch, attribution.latest_touch);
  assert.equal(attribution.first_touch_at, FIRST_TIME);
  assert.equal(attribution.latest_touch_at, FIRST_TIME);
  assert.equal(
    attribution.first_landing_page,
    "/?utm_source=google&utm_medium=cpc&utm_campaign=shops&utm_content=headline&utm_term=repair&gclid=google-click&gbraid=gbraid-click&wbraid=wbraid-click",
  );
  assert.equal(attribution.latest_landing_page, attribution.first_landing_page);
  assert.equal(attribution.first_referrer, "https://www.google.com/search");
  assert.equal(attribution.latest_referrer, attribution.first_referrer);
  assert.doesNotMatch(JSON.stringify(attribution), /owner%40shop|owner@shop|email=/i);
});

test("preserves first touch while a later campaign replaces the latest touch", () => {
  const first = mergeAttribution({
    href: "https://www.turnkeyautomarketing.com/?gclid=first-click&utm_source=google&utm_medium=cpc&utm_campaign=first",
    referrer: "https://www.google.com/",
    now: FIRST_TIME,
    trackingSessionId: TRACKING_ID,
  });
  const latest = mergeAttribution({
    href: "https://www.turnkeyautomarketing.com/services?utm_source=newsletter&utm_medium=email&utm_campaign=followup",
    referrer: "https://mail.example.com/inbox",
    existing: first,
    now: LATEST_TIME,
  });

  assert.equal(latest.tracking_session_id, TRACKING_ID);
  assert.equal(latest.first_touch.gclid, "first-click");
  assert.equal(latest.first_touch.utm_campaign, "first");
  assert.equal(latest.latest_touch.utm_campaign, "followup");
  assert.equal(latest.latest_touch.utm_source, "newsletter");
  assert.equal(latest.gclid, undefined);
  assert.equal(latest.utm_campaign, "followup");
  assert.equal(latest.first_landing_page.includes("utm_campaign=first"), true);
  assert.equal(latest.latest_landing_page.includes("utm_campaign=followup"), true);
  assert.equal(latest.first_touch_at, FIRST_TIME);
  assert.equal(latest.latest_touch_at, LATEST_TIME);
});

test("internal navigation preserves the current touch, landing context, timestamp, and ID", () => {
  const first = mergeAttribution({
    href: "https://www.turnkeyautomarketing.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp",
    referrer: "https://www.google.com/",
    now: FIRST_TIME,
    trackingSessionId: TRACKING_ID,
  });
  const navigated = mergeAttribution({
    href: "https://www.turnkeyautomarketing.com/contact#book",
    referrer: "https://www.turnkeyautomarketing.com/",
    existing: first,
    now: LATEST_TIME,
  });

  assert.deepEqual(navigated, first);
});

test("safely migrates the legacy flat sessionStorage record", () => {
  const legacy = parseStoredAttribution(
    JSON.stringify({
      gclid: "legacy-click",
      utm_source: "google",
      utm_campaign: "legacy",
      landing_page: "/?utm_campaign=legacy&email=owner%40shop.com",
      landing_referrer: "https://www.google.com/?email=owner%40shop.com",
    }),
  );
  const migrated = mergeAttribution({
    href: "https://www.turnkeyautomarketing.com/contact#book",
    referrer: "https://www.turnkeyautomarketing.com/",
    existing: legacy,
    now: FIRST_TIME,
    trackingSessionId: TRACKING_ID,
  });

  assert.equal(migrated.version, 2);
  assert.equal(migrated.tracking_session_id, TRACKING_ID);
  assert.equal(migrated.first_touch.gclid, "legacy-click");
  assert.equal(migrated.latest_touch.gclid, "legacy-click");
  assert.equal(migrated.first_landing_page, "/?utm_campaign=legacy");
  assert.equal(migrated.latest_landing_page, "/?utm_campaign=legacy");
  assert.equal(migrated.first_touch_at, FIRST_TIME);
  assert.equal(migrated.latest_touch_at, FIRST_TIME);
  assert.doesNotMatch(JSON.stringify(migrated), /owner|email=/i);
});

test("never decorates the cross-origin AppointmentCore URL", () => {
  const attribution = mergeAttribution({
    href: "https://www.turnkeyautomarketing.com/?gclid=click-1&utm_source=google&utm_medium=cpc&utm_campaign=shops",
    referrer: "https://www.google.com/",
    now: FIRST_TIME,
    trackingSessionId: TRACKING_ID,
  });
  attribution.ga_client_id = "12345.67890";
  attribution.ga_session_id = "1760000000";

  const appointmentCoreUrl = "https://go.appointmentcore.com/book/7uUZaGNRL6?d=Slots&e=1";
  const decorated = decorateUrlWithAttribution(
    appointmentCoreUrl,
    attribution,
    "https://www.turnkeyautomarketing.com/",
  );

  assert.equal(decorated, appointmentCoreUrl);
});

test("initialization leaves internal links and the existing iframe unchanged", () => {
  const link = createElement("href", "/contact#book");
  const frame = createElement("src", "https://go.appointmentcore.com/book/7uUZaGNRL6?d=Slots&e=1");
  const trackingWindow = createTrackingWindow(
    "https://www.turnkeyautomarketing.com/?gclid=click-1&utm_source=google&utm_medium=cpc&utm_campaign=shops",
    { links: [link], frames: [frame] },
  );

  const attribution = initializeAttributionTracking(trackingWindow);
  assert.equal(link.getAttribute("href"), "/contact#book");
  assert.equal(
    frame.getAttribute("src"),
    "https://go.appointmentcore.com/book/7uUZaGNRL6?d=Slots&e=1",
  );
  assert.equal(attribution.tracking_session_id, TRACKING_ID);
  assert.deepEqual(trackingWindow.dataLayer, []);
});

test("initialization stores attribution first-party and makes no network request", () => {
  const requests = [];
  const trackingWindow = createTrackingWindow(
    "https://www.turnkeyautomarketing.com/?gclid=click-1&utm_source=google&utm_medium=cpc&utm_campaign=shops&email=owner%40shop.com",
    {
      fetch: (url, options) => {
        requests.push({ url, options });
        return Promise.resolve({ ok: true });
      },
    },
  );

  const attribution = initializeAttributionTracking(trackingWindow);
  assert.equal(requests.length, 0);
  assert.equal(
    JSON.parse(trackingWindow.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)).tracking_session_id,
    attribution.tracking_session_id,
  );
  assert.doesNotMatch(JSON.stringify(attribution), /owner%40shop|owner@shop|email=/i);
  assert.equal(trackingWindow.document.querySelectorAll("form").length, 0);
});

test("same-origin URL decoration is idempotent and cross-origin URLs are untouched", () => {
  const attribution = mergeAttribution({
    href: "https://www.turnkeyautomarketing.com/?gclid=click-1&utm_campaign=shops",
    referrer: "https://www.google.com/",
    now: FIRST_TIME,
    trackingSessionId: TRACKING_ID,
  });
  const contactOnce = decorateUrlWithAttribution(
    "/contact?view=calendar#book",
    attribution,
    "https://www.turnkeyautomarketing.com/",
    { includeRaw: false },
  );
  const contactTwice = decorateUrlWithAttribution(contactOnce, attribution, undefined, {
    includeRaw: false,
  });
  const frameUrl = "https://go.appointmentcore.com/book/7uUZaGNRL6?d=Slots&e=1";
  const frameOnce = decorateUrlWithAttribution(
    frameUrl,
    attribution,
    "https://www.turnkeyautomarketing.com/",
  );

  assert.equal(contactTwice, contactOnce);
  assert.equal(frameOnce, frameUrl);
  assert.equal(new URL(contactTwice).searchParams.get("view"), "calendar");
  assert.equal(new URL(contactTwice).hash, "#book");
});

test("missing values do not create empty, undefined, or null URL parameters", () => {
  const decorated = new URL(
    decorateUrlWithAttribution(
      "https://go.appointmentcore.com/book/7uUZaGNRL6?d=Slots&e=1#calendar",
      {},
    ),
  );

  assert.equal(decorated.searchParams.get("d"), "Slots");
  assert.equal(decorated.searchParams.get("e"), "1");
  assert.equal(decorated.hash, "#calendar");
  assert.equal(decorated.toString().includes("undefined"), false);
  assert.equal(decorated.toString().includes("null"), false);
  assert.equal([...decorated.searchParams.values()].includes(""), false);
});

test("same-origin session storage keeps attribution and the same tracking ID", () => {
  const storage = createStorage();
  const firstWindow = createTrackingWindow("https://www.turnkeyautomarketing.com/?gclid=click-1", {
    storage,
  });
  const first = initializeAttributionTracking(firstWindow);
  assert.ok(storage.getItem(ATTRIBUTION_STORAGE_KEY));

  const nextWindow = createTrackingWindow("https://www.turnkeyautomarketing.com/contact#book", {
    referrer: "https://www.turnkeyautomarketing.com/",
    storage,
  });
  const next = initializeAttributionTracking(nextWindow);
  assert.equal(next.tracking_session_id, first.tracking_session_id);

  assert.equal(next.first_touch.gclid, "click-1");
  assert.equal(next.latest_touch.gclid, "click-1");
});

test("blocked sessionStorage is safe and the in-memory tk_ ID remains stable", () => {
  const blockedStorage = {
    getItem: () => {
      throw new Error("storage blocked");
    },
    setItem: () => {
      throw new Error("storage blocked");
    },
  };
  const trackingWindow = createTrackingWindow(
    "https://www.turnkeyautomarketing.com/?wbraid=click-1&utm_campaign=shops",
    { storage: blockedStorage },
  );

  const first = initializeAttributionTracking(trackingWindow);
  trackingWindow.location.href = "https://www.turnkeyautomarketing.com/contact#book";
  trackingWindow.document.referrer = "https://www.turnkeyautomarketing.com/";
  const next = initializeAttributionTracking(trackingWindow);

  assert.equal(next.tracking_session_id, first.tracking_session_id);
  assert.equal(next.first_touch.wbraid, "click-1");
  assert.equal(next.latest_touch.wbraid, "click-1");
});

test("captures GA4 identifiers only when available through first-party cookie or gtag", () => {
  const trackingWindow = createTrackingWindow("https://www.turnkeyautomarketing.com/", {
    cookie: "consent=yes; _ga=GA1.1.123456789.1760000000",
    gtag: (command, measurementId, field, callback) => {
      assert.equal(command, "get");
      assert.equal(measurementId, "G-XJZ35N9FWG");
      callback(field === "client_id" ? "123456789.1760000000" : "1760000000");
    },
  });

  const attribution = initializeAttributionTracking(trackingWindow);
  assert.equal(attribution.ga_client_id, "123456789.1760000000");
  assert.equal(attribution.ga_session_id, "1760000000");
});

test("repeat initialization never makes an attribution network request", () => {
  const requests = [];
  const trackingWindow = createTrackingWindow(
    "https://www.turnkeyautomarketing.com/?gclid=click-1&utm_source=google&utm_medium=cpc",
    {
      fetch: (url, options) => {
        requests.push({ url, options });
        return Promise.resolve({ ok: true });
      },
      gtag: (_command, _measurementId, field, callback) => {
        callback(field === "client_id" ? "123456789.1760000000" : "1760000000");
      },
    },
  );

  initializeAttributionTracking(trackingWindow);
  initializeAttributionTracking(trackingWindow);
  assert.equal(requests.length, 0);
});

test("contact records one low-cardinality AppointmentCore calendar view per page load", () => {
  const storage = createStorage();
  const frame = createElement("src", "https://go.appointmentcore.com/book/7uUZaGNRL6?d=Slots&e=1");
  const contactWindow = createTrackingWindow("https://www.turnkeyautomarketing.com/contact#book", {
    referrer: "https://www.turnkeyautomarketing.com/",
    storage,
    frames: [frame],
  });

  initializeAttributionTracking(contactWindow);
  initializeAttributionTracking(contactWindow);

  assert.deepEqual(contactWindow.dataLayer, [
    {
      event: "appointmentcore_calendar_viewed",
      booking_provider: "appointmentcore",
      booking_funnel: "main_website",
    },
  ]);
  assert.equal(trackAppointmentCoreCalendarViewed(contactWindow), false);

  const reloadedWindow = createTrackingWindow("https://www.turnkeyautomarketing.com/contact#book", {
    referrer: "https://www.turnkeyautomarketing.com/",
    storage,
    frames: [createElement("src", "https://go.appointmentcore.com/book/7uUZaGNRL6?d=Slots&e=1")],
  });
  initializeAttributionTracking(reloadedWindow);
  assert.equal(reloadedWindow.dataLayer.length, 1);
});

test("a consultation CTA alone does not emit calendar or booked events", () => {
  const consultationLink = createElement("href", "/contact#book");
  const trackingWindow = createTrackingWindow("https://www.turnkeyautomarketing.com/", {
    links: [consultationLink],
  });

  initializeAttributionTracking(trackingWindow);

  assert.deepEqual(trackingWindow.dataLayer, []);
  assert.equal(consultationLink.getAttribute("href"), "/contact#book");
});

test("a paid first touch remains eligible after a later direct return", () => {
  const paid = mergeAttribution({
    href: "https://www.turnkeyautomarketing.com/?gclid=paid-click&utm_source=google&utm_medium=cpc",
    referrer: "https://www.google.com/",
    now: FIRST_TIME,
    trackingSessionId: TRACKING_ID,
  });
  const returnedDirect = mergeAttribution({
    href: "https://www.turnkeyautomarketing.com/contact",
    referrer: "",
    existing: paid,
    now: LATEST_TIME,
  });

  assert.equal(isGooglePaidAttribution(returnedDirect), true);
});

test("missing or malformed GA identifiers are ignored without breaking attribution", () => {
  const trackingWindow = createTrackingWindow(
    "https://www.turnkeyautomarketing.com/?gbraid=click-1",
    {
      cookie: "_ga=malformed; _ga_XJZ35N9FWG=also-malformed",
      gtag: (_command, _measurementId, field, callback) => {
        callback(field === "client_id" ? "owner@example.com" : "not a valid id");
      },
    },
  );

  const attribution = initializeAttributionTracking(trackingWindow);
  assert.equal(attribution.gbraid, "click-1");
  assert.equal(attribution.ga_client_id, undefined);
  assert.equal(attribution.ga_session_id, undefined);
});

test("sanitizes PII from landing/referrer context and pass-through payloads", () => {
  assert.equal(
    sanitizeUrlForAttribution(
      "https://www.turnkeyautomarketing.com/contact?utm_campaign=shops&name=Kyle&phone=9134270674&email=kyle%40example.com",
      { relative: true },
    ),
    "/contact?utm_campaign=shops",
  );
  assert.equal(
    sanitizeUrlForAttribution(
      "https://example.com/path?utm_content=owner%40shop.com&email=x%40y.com",
    ),
    "https://example.com/path",
  );

  const decorated = new URL(
    decorateUrlWithAttribution(
      "/contact?name=Kyle&phone=9134270674&email=kyle%40example.com#book",
      { utm_campaign: "owner@example.com", tracking_session_id: TRACKING_ID },
    ),
  );
  assert.equal(decorated.searchParams.get("name"), null);
  assert.equal(decorated.searchParams.get("phone"), null);
  assert.equal(decorated.searchParams.get("email"), null);
  assert.equal(decorated.searchParams.get("utm_campaign"), null);
  assert.equal(decorated.searchParams.get("tk_tracking_session_id"), TRACKING_ID);
});

test("booking confirmation preserves event semantics and dedupe without Ads conversion", () => {
  const paidWindow = createTrackingWindow(
    "https://www.turnkeyautomarketing.com/booking-confirmed?gclid=paid-click&utm_source=google&utm_medium=cpc&utm_campaign=shops",
  );
  assert.equal(trackAppointmentBooked(paidWindow, "/booking-confirmed"), true);
  assert.deepEqual(
    paidWindow.dataLayer.map((event) => event.event),
    ["appointment_booked", "generate_lead"],
  );
  assert.equal(paidWindow.dataLayer[0].tracking_session_id, TRACKING_ID);
  assert.equal(paidWindow.dataLayer[0].gclid, "paid-click");
  assert.equal(paidWindow.dataLayer[0].booking_provider, "appointmentcore");
  assert.equal(paidWindow.dataLayer[0].booking_funnel, "main_website");
  assert.equal(trackAppointmentBooked(paidWindow, "/booking-confirmed"), false);
  assert.equal(paidWindow.dataLayer.length, 2);

  const organicWindow = createTrackingWindow(
    "https://www.turnkeyautomarketing.com/booking-confirmed?utm_source=google&utm_medium=organic&utm_campaign=gbp",
  );
  trackAppointmentBooked(organicWindow, "/booking-confirmed");
  assert.deepEqual(
    organicWindow.dataLayer.map((event) => event.event),
    ["appointment_booked", "generate_lead"],
  );
  assert.equal(isGooglePaidAttribution(organicWindow.tkAttribution), false);
});

test("booking confirmation retains paid attribution without emitting Ads conversion", () => {
  const storage = createStorage();
  const landingWindow = createTrackingWindow(
    "https://www.turnkeyautomarketing.com/?gclid=session-paid-click&utm_source=google&utm_medium=cpc&utm_campaign=shops",
    { storage },
  );
  const landingAttribution = initializeAttributionTracking(landingWindow);
  const confirmationWindow = createTrackingWindow(
    "https://www.turnkeyautomarketing.com/booking-confirmed",
    {
      referrer: "https://go.appointmentcore.com/",
      storage,
    },
  );

  trackAppointmentBooked(confirmationWindow, "/booking-confirmed");

  assert.equal(
    confirmationWindow.dataLayer.filter((event) => event.event === "appointment_booked").length,
    1,
  );
  assert.equal(
    confirmationWindow.dataLayer.filter((event) => event.event === "generate_lead").length,
    1,
  );
  assert.equal(
    confirmationWindow.dataLayer.filter((event) => event.event === "conversion").length,
    0,
  );
  assert.equal(confirmationWindow.dataLayer[0].tracking_session_id, TRACKING_ID);
  assert.equal(
    confirmationWindow.dataLayer[0].tracking_session_id,
    landingAttribution.tracking_session_id,
  );
  assert.equal(confirmationWindow.dataLayer[0].first_gclid, "session-paid-click");
});

test("AppointmentCore confirmation cannot emit Google Ads conversion under paid attribution", () => {
  const paidWindow = createTrackingWindow(
    "https://www.turnkeyautomarketing.com/booking-confirmed?gclid=paid-click&utm_source=google&utm_medium=cpc",
  );

  trackAppointmentBooked(paidWindow, "/booking-confirmed", {
    trackGoogleAdsConversion: true,
  });

  assert.deepEqual(
    paidWindow.dataLayer.map((event) => event.event),
    ["appointment_booked", "generate_lead"],
  );
  assert.equal(
    paidWindow.dataLayer.some((event) => event.send_to === "AW-18358810922/8Oy4CJqVtuMcEKrylLJE"),
    false,
  );
});

test("booking events retain legacy landing aliases and the new first/latest contract", () => {
  const attribution = mergeAttribution({
    href: "https://www.turnkeyautomarketing.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp",
    referrer: "https://www.google.com/",
    now: FIRST_TIME,
    trackingSessionId: TRACKING_ID,
  });
  const params = buildBookingEventParams(attribution, "/booking-confirmed");

  assert.equal(params.landing_page, attribution.first_landing_page);
  assert.equal(params.landing_referrer, attribution.first_referrer);
  assert.equal(params.first_landing_page, attribution.first_landing_page);
  assert.equal(params.latest_landing_page, attribution.latest_landing_page);
  assert.equal(params.first_touch_at, FIRST_TIME);
  assert.equal(params.latest_touch_at, FIRST_TIME);
});

test("public page sources keep the two booking funnels scoped correctly", () => {
  const workspaceRoot = path.resolve(import.meta.dirname, "..");
  const baseLayoutSource = readFileSync(
    path.join(workspaceRoot, "src/layouts/BaseLayout.astro"),
    "utf8",
  );
  const contactSource = readFileSync(path.join(workspaceRoot, "src/pages/contact.astro"), "utf8");
  const paidLandingSource = readFileSync(
    path.join(workspaceRoot, "public/lp/auto-repair-marketing/index.html"),
    "utf8",
  );
  const paidBookingPageSource = readFileSync(
    path.join(workspaceRoot, "src/pages/lp/auto-repair-marketing/book.astro"),
    "utf8",
  );
  const paidBookingControllerSource = readFileSync(
    path.join(workspaceRoot, "public/lp/ghl-booking.js"),
    "utf8",
  );
  const paidAttributionSource = readFileSync(
    path.join(workspaceRoot, "public/lp/ghl-attribution.js"),
    "utf8",
  );
  const paidConfirmationSource = readFileSync(
    path.join(workspaceRoot, "src/pages/google-ads-call-booked.astro"),
    "utf8",
  );
  const bookingConfirmationSource = readFileSync(
    path.join(workspaceRoot, "src/pages/booking-confirmed.astro"),
    "utf8",
  );
  const trackingSource = readFileSync(
    path.join(workspaceRoot, "src/lib/booking-tracking.mjs"),
    "utf8",
  );
  const visibilityScanPath = path.join(workspaceRoot, "src/pages/ai-visibility-scan.astro");
  const visibilityScanSource = readFileSync(visibilityScanPath, "utf8");
  const servicesSource = readFileSync(path.join(workspaceRoot, "src/lib/services.ts"), "utf8");
  const sourceRoots = [
    path.join(workspaceRoot, "src/pages"),
    path.join(workspaceRoot, "public/lp"),
  ];
  const pageFiles = sourceRoots.flatMap((root) =>
    readdirSync(root, { recursive: true })
      .filter((file) => /\.(?:astro|html)$/.test(file))
      .map((file) => path.join(root, file)),
  );
  const nativeForms = pageFiles.flatMap((file) => {
    const matches = readFileSync(file, "utf8").match(/<form\b/gi) || [];
    return matches.map(() => file);
  });
  const unexpectedNativeForms = nativeForms.filter((file) => file !== visibilityScanPath);
  const appointmentBookedPageFiles = pageFiles
    .filter((file) => /trackAppointmentBooked/.test(readFileSync(file, "utf8")))
    .map((file) => path.relative(path.join(workspaceRoot, "src/pages"), file));

  assert.equal((contactSource.match(/<iframe\b/gi) || []).length, 1);
  assert.match(
    contactSource,
    /go\.appointmentcore\.com\/frontend\/js\/app\/booking-link-embed-helper\.js/,
  );
  assert.match(contactSource, /src=\{APPOINTMENTCORE_BOOKING_URL\}/);
  assert.match(servicesSource, /https:\/\/go\.appointmentcore\.com\/book\/7uUZaGNRL6\?d=Slots&e=1/);
  assert.doesNotMatch(
    trackingSource,
    /turnkey-internal-automations|appointmentcore\/handoff|fetch\s*\(/,
  );
  assert.doesNotMatch(trackingSource, /custom_map|custom_dimension|dimension\d+/i);
  assert.match(paidLandingSource, /href="\/lp\/auto-repair-marketing\/book"/);
  assert.match(paidLandingSource, /\/lp\/ghl-attribution\.js/);
  assert.doesNotMatch(paidLandingSource, /\/lp\/ghl-booking\.js/);
  assert.doesNotMatch(paidLandingSource, /<iframe\b/i);
  assert.match(
    paidBookingPageSource,
    /leadconnectorhq\.com\/widget\/booking\/6tmXrJxmo6AUsMP2ja9d/,
  );
  assert.match(paidBookingPageSource, /attributionFunnel="google_ads"/);
  assert.match(paidBookingPageSource, /minimalChrome/);
  assert.match(paidBookingPageSource, /\/lp\/ghl-attribution\.js/);
  assert.match(paidBookingPageSource, /\/lp\/ghl-booking\.js/);
  assert.ok(
    (paidBookingPageSource.match(/data-tk-booking-provider="ghl_calendar"/g) || []).length,
    "The GHL iframe or fallback link must be marked for attribution decoration",
  );
  assert.match(paidBookingPageSource, /data-src=\{bookingUrl\}/);
  assert.match(paidBookingPageSource, /scrolling="yes"/);
  assert.match(paidBookingPageSource, /height: max\(1000px, calc\(100vh - 190px\)\)/);
  assert.doesNotMatch(paidBookingPageSource, /link\.msgsndr\.com\/js\/form_embed\.js/);
  assert.match(paidBookingPageSource, /Open the Booking Calendar/);
  assert.doesNotMatch(paidBookingPageSource, /target="_blank"/);
  assert.match(paidAttributionSource, /hasAttribute\("data-src"\) \? "data-src" : "src"/);
  assert.match(paidBookingControllerSource, /READY_TIMEOUT_MS = 4000/);
  assert.match(
    paidBookingControllerSource,
    /window\.addEventListener\("message", onProviderMessage\)/,
  );
  assert.match(paidBookingControllerSource, /event\.source !== iframe\.contentWindow/);
  assert.match(paidBookingControllerSource, /leadconnectorhq\.com/);
  assert.match(paidBookingControllerSource, /highlevel\.setHeight/);
  assert.match(paidBookingControllerSource, /iframe\.addEventListener\("error", markFailed/);
  assert.match(paidBookingControllerSource, /track\("ghl_calendar_viewed"/);
  assert.match(paidBookingControllerSource, /booking_funnel: "google_ads_landing_page"/);
  assert.match(paidBookingControllerSource, /window\.location\.assign\(destination\)/);
  assert.doesNotMatch(baseLayoutSource, /G-1468YCTQJ3/);
  assert.doesNotMatch(paidLandingSource, /G-1468YCTQJ3/);
  assert.doesNotMatch(paidBookingPageSource, /G-1468YCTQJ3/);
  assert.equal((baseLayoutSource.match(/gtag\/js\?id=G-XJZ35N9FWG/g) || []).length, 1);
  assert.equal((baseLayoutSource.match(/gtag\("config", "G-XJZ35N9FWG"\)/g) || []).length, 1);
  assert.equal((paidLandingSource.match(/gtag\/js\?id=G-XJZ35N9FWG/g) || []).length, 1);
  assert.equal((paidLandingSource.match(/gtag\("config", "G-XJZ35N9FWG"\)/g) || []).length, 1);
  assert.doesNotMatch(paidLandingSource, /appointmentcore\.com\/book\//i);
  assert.doesNotMatch(paidBookingPageSource, /appointmentcore\.com\/book\//i);
  assert.match(paidConfirmationSource, /attributionFunnel="google_ads"/);
  assert.doesNotMatch(paidConfirmationSource, /trackAppointmentBooked/);
  assert.match(paidConfirmationSource, /booking_provider: "ghl_calendar"/);
  assert.match(paidConfirmationSource, /send_to:\s*"AW-18358810922\/8Oy4CJqVtuMcEKrylLJE"/);
  assert.doesNotMatch(trackingSource, /AW-18358810922\/8Oy4CJqVtuMcEKrylLJE/);
  assert.doesNotMatch(bookingConfirmationSource, /send_to|trackGoogleAdsConversion/);
  assert.match(
    bookingConfirmationSource,
    /trackAppointmentBooked\(window, "\/booking-confirmed"\)/,
  );
  assert.deepEqual(appointmentBookedPageFiles, ["booking-confirmed.astro"]);
  assert.match(baseLayoutSource, /target\.dataset\.trackEvent/);
  assert.equal((visibilityScanSource.match(/<form\b/gi) || []).length, 2);
  assert.match(visibilityScanSource, /<form id="scan-form"/);
  assert.match(visibilityScanSource, /<form id="report-gate-form"/);
  assert.equal(
    unexpectedNativeForms.length,
    0,
    `Unexpected native forms: ${unexpectedNativeForms.join(", ")}`,
  );
});

test("invalid persisted attribution is ignored", () => {
  assert.deepEqual(parseStoredAttribution("not-json"), {});
});
