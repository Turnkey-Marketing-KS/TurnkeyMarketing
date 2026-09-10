import test from "node:test";
import assert from "node:assert/strict";
import { mergeAttribution, MAIN_WEBSITE_GHL_BOOKING_URL } from "../src/lib/booking-tracking.mjs";
import {
  coachesCalendarUrl,
  coachesEventParams,
  initializeCoachesTracking,
} from "../src/lib/coaches-tracking.mjs";

test("calendar handoff preserves campaign and separates booking origin", () => {
  const href =
    "https://www.turnkeyautomarketing.com/lp/coaches?utm_source=newsletter&utm_medium=email&utm_campaign=fall&email=private@example.com";
  const attribution = mergeAttribution({
    href,
    referrer: "https://example.org/coaches?name=Private",
  });
  const destination = new URL(coachesCalendarUrl(attribution));
  assert.equal(destination.origin + destination.pathname, MAIN_WEBSITE_GHL_BOOKING_URL);
  assert.equal(destination.searchParams.get("utm_source"), "newsletter");
  assert.equal(destination.searchParams.get("utm_medium"), "email");
  assert.equal(destination.searchParams.get("tk_originating_page"), "ati_coaches");
  assert.equal(destination.searchParams.get("source"), "Email");
  assert.ok(!destination.href.includes("private"));
  const params = coachesEventParams(
    attribution,
    href,
    "https://example.org/?email=private@example.com",
  );
  assert.equal(params.page_id, "ati_coaches");
  assert.ok(!JSON.stringify(params).includes("private"));
  assert.equal(params.first_referrer, "https://example.org/coaches");
});

test("direct traffic does not become ATI acquisition", () => {
  const attribution = mergeAttribution({ href: "https://www.turnkeyautomarketing.com/lp/coaches" });
  const url = new URL(coachesCalendarUrl(attribution));
  assert.equal(url.searchParams.has("utm_source"), false);
  assert.equal(url.searchParams.get("source"), "Website — Direct / unattributed");
});

test("initialization and clicks emit no booking conversions and do not duplicate listeners", () => {
  const events = [],
    listeners = {};
  const link = {
    href: "https://www.turnkeyautomarketing.com/lp/coaches#schedule",
    dataset: { coachesCta: "hero" },
    hasAttribute: () => false,
    addEventListener: (name, fn) => {
      listeners[name] = fn;
    },
  };
  const win = {
    location: { href: "https://www.turnkeyautomarketing.com/lp/coaches" },
    document: { referrer: "", querySelector: () => null, querySelectorAll: () => [link] },
    gtag: (...args) => events.push(args),
  };
  initializeCoachesTracking(win);
  initializeCoachesTracking(win);
  listeners.click();
  assert.deepEqual(
    events.map((event) => event[1]),
    ["page_view", "schedule_click"],
  );
  assert.equal(events[1][2].cta_location, "hero");
  assert.ok(link.href.endsWith("#schedule"));
});

test("scheduler opens require a visible provider frame and trusted message; no booking signal is invented", async () => {
  const { observeCoachesCalendar } = await import("../src/lib/coaches-tracking.mjs");
  let message, visibility;
  const events = [];
  const frame = { dataset: { src: MAIN_WEBSITE_GHL_BOOKING_URL }, contentWindow: {}, style: {} };
  const win = {
    document: {
      querySelector: (selector) => (selector === "[data-coaches-calendar]" ? frame : {}),
    },
    IntersectionObserver: class {
      constructor(callback) {
        visibility = callback;
      }
      observe() {}
    },
    setTimeout: () => 1,
    clearTimeout: () => {},
    addEventListener: (_, callback) => {
      message = callback;
    },
  };
  observeCoachesCalendar(win, (event) => events.push(event));
  const signal = {
    source: frame.contentWindow,
    origin: "https://api.leadconnectorhq.com",
    data: ["iframeLoaded"],
  };
  message({ ...signal, origin: "https://untrusted.example" });
  message({ ...signal, source: {} });
  visibility([{ isIntersecting: true }]);
  assert.deepEqual(events, []);
  message(signal);
  message(signal);
  message({ ...signal, data: ["bookingComplete"] });
  assert.deepEqual(events, ["scheduler_open"]);
});
