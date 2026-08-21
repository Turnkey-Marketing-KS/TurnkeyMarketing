import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  ATTRIBUTION_STORAGE_KEY,
  buildAnonymousAttributionPayload,
  buildBookingEventParams,
  decorateUrlWithAttribution,
  initializeAttributionTracking,
  isGooglePaidAttribution,
  mergeAttribution,
  parseStoredAttribution,
  sanitizeUrlForAttribution,
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

test("decorates AppointmentCore with correlation fields and preserves provider parameters", () => {
  const attribution = mergeAttribution({
    href: "https://www.turnkeyautomarketing.com/?gclid=click-1&utm_source=google&utm_medium=cpc&utm_campaign=shops",
    referrer: "https://www.google.com/",
    now: FIRST_TIME,
    trackingSessionId: TRACKING_ID,
  });
  attribution.ga_client_id = "12345.67890";
  attribution.ga_session_id = "1760000000";

  const decorated = new URL(
    decorateUrlWithAttribution(
      "https://go.appointmentcore.com/book/7uUZaGNRL6?d=Slots&e=1&email=owner%40shop.com",
      attribution,
    ),
  );

  assert.equal(decorated.searchParams.get("d"), "Slots");
  assert.equal(decorated.searchParams.get("e"), "1");
  assert.equal(decorated.searchParams.get("email"), null);
  assert.equal(decorated.searchParams.get("gclid"), "click-1");
  assert.equal(decorated.searchParams.get("tk_gclid"), "click-1");
  assert.equal(decorated.searchParams.get("tk_first_gclid"), "click-1");
  assert.equal(decorated.searchParams.get("tk_latest_gclid"), "click-1");
  assert.equal(decorated.searchParams.get("tk_tracking_session_id"), TRACKING_ID);
  assert.equal(decorated.searchParams.get("tk_ga_client_id"), "12345.67890");
  assert.equal(decorated.searchParams.get("tk_ga_session_id"), "1760000000");
  assert.equal(decorated.searchParams.get("tk_first_touch_at"), FIRST_TIME);
  assert.equal(decorated.searchParams.get("tk_latest_touch_at"), FIRST_TIME);
});

test("initialization decorates internal contact links and the existing iframe without firing conversion", () => {
  const link = createElement("href", "/contact#book");
  const frame = createElement("src", "https://go.appointmentcore.com/book/7uUZaGNRL6?d=Slots&e=1");
  const trackingWindow = createTrackingWindow(
    "https://www.turnkeyautomarketing.com/?gclid=click-1&utm_source=google&utm_medium=cpc&utm_campaign=shops",
    { links: [link], frames: [frame] },
  );

  const attribution = initializeAttributionTracking(trackingWindow);
  const contactUrl = new URL(link.getAttribute("href"), trackingWindow.location.href);
  const frameUrl = new URL(frame.getAttribute("src"));

  assert.equal(contactUrl.searchParams.get("gclid"), null);
  assert.equal(contactUrl.searchParams.get("tk_gclid"), "click-1");
  assert.equal(contactUrl.searchParams.get("tk_tracking_session_id"), TRACKING_ID);
  assert.equal(contactUrl.hash, "#book");
  assert.equal(frameUrl.searchParams.get("gclid"), "click-1");
  assert.equal(frameUrl.searchParams.get("tk_tracking_session_id"), TRACKING_ID);
  assert.equal(attribution.tracking_session_id, TRACKING_ID);
  assert.deepEqual(trackingWindow.dataLayer, []);
});

test("silently stores anonymous attribution without adding a second customer form", () => {
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
  assert.equal(requests.length, 1);
  assert.match(requests[0].url, /\/api\/attribution\/appointmentcore\/handoff$/);
  assert.equal(requests[0].options.headers["X-Turnkey-Attribution-Version"], "2");
  const payload = JSON.parse(requests[0].options.body).attribution;
  assert.equal(payload.tracking_session_id, attribution.tracking_session_id);
  assert.equal(payload.gclid, "click-1");
  assert.equal(
    payload.first_landing_page.startsWith("https://www.turnkeyautomarketing.com/"),
    true,
  );
  assert.doesNotMatch(JSON.stringify(payload), /owner%40shop|owner@shop|email=/i);
  assert.equal(trackingWindow.document.querySelectorAll("form").length, 0);
});

test("anonymous payload includes only sanitized attribution fields", () => {
  const payload = buildAnonymousAttributionPayload({
    tracking_session_id: TRACKING_ID,
    first_touch_at: FIRST_TIME,
    latest_touch_at: LATEST_TIME,
    first_landing_page: "/?gclid=click-1&email=owner%40shop.com",
    latest_landing_page: "/contact?phone=9134270674",
    first_touch: { gclid: "click-1", utm_source: "google" },
    latest_touch: { gclid: "click-1", utm_source: "google" },
  });
  assert.equal(payload.gclid, "click-1");
  assert.equal(payload.first_landing_page, "https://www.turnkeyautomarketing.com/?gclid=click-1");
  assert.equal(payload.latest_landing_page, "https://www.turnkeyautomarketing.com/contact");
  assert.doesNotMatch(JSON.stringify(payload), /owner|9134270674|email=|phone=/i);
});

test("contact and iframe decoration is idempotent and keeps #book plus existing parameters", () => {
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
  const frameOnce = decorateUrlWithAttribution(
    "https://go.appointmentcore.com/book/7uUZaGNRL6?d=Slots&e=1",
    attribution,
  );
  const frameTwice = decorateUrlWithAttribution(frameOnce, attribution);

  assert.equal(contactTwice, contactOnce);
  assert.equal(frameTwice, frameOnce);
  assert.equal(new URL(contactTwice).searchParams.get("view"), "calendar");
  assert.equal(new URL(contactTwice).hash, "#book");
  assert.equal(new URL(frameTwice).searchParams.get("d"), "Slots");
  assert.equal(new URL(frameTwice).searchParams.get("e"), "1");
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

test("session storage keeps the same tracking ID and imports tk_ pass-through if storage is unavailable", () => {
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

  const decorated = decorateUrlWithAttribution("/contact#book", first, firstWindow.location.href, {
    includeRaw: false,
  });
  const imported = mergeAttribution({
    href: decorated,
    referrer: "https://www.turnkeyautomarketing.com/",
    now: LATEST_TIME,
  });
  assert.equal(imported.tracking_session_id, first.tracking_session_id);
  assert.equal(imported.first_touch.gclid, "click-1");
  assert.equal(imported.latest_touch.gclid, "click-1");
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

test("booking confirmation preserves event semantics, dedupe, and paid-only conversion", () => {
  const paidWindow = createTrackingWindow(
    "https://www.turnkeyautomarketing.com/booking-confirmed?gclid=paid-click&utm_source=google&utm_medium=cpc&utm_campaign=shops",
  );
  assert.equal(trackAppointmentBooked(paidWindow, "/booking-confirmed"), true);
  assert.deepEqual(
    paidWindow.dataLayer.map((event) => event.event),
    ["appointment_booked", "generate_lead", "conversion"],
  );
  assert.equal(paidWindow.dataLayer[0].tracking_session_id, TRACKING_ID);
  assert.equal(paidWindow.dataLayer[0].gclid, "paid-click");
  assert.equal(trackAppointmentBooked(paidWindow, "/booking-confirmed"), false);
  assert.equal(paidWindow.dataLayer.length, 3);

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

test("public page sources expose one AppointmentCore calendar and no competing native form", () => {
  const workspaceRoot = path.resolve(import.meta.dirname, "..");
  const contactSource = readFileSync(path.join(workspaceRoot, "src/pages/contact.astro"), "utf8");
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

  assert.equal((contactSource.match(/<iframe\b/gi) || []).length, 1);
  assert.match(
    contactSource,
    /go\.appointmentcore\.com\/frontend\/js\/app\/booking-link-embed-helper\.js/,
  );
  assert.equal(nativeForms.length, 0, `Unexpected native forms: ${nativeForms.join(", ")}`);
});

test("invalid persisted attribution is ignored", () => {
  assert.deepEqual(parseStoredAttribution("not-json"), {});
});
