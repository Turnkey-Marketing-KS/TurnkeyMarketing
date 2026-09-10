import {
  MAIN_WEBSITE_GHL_BOOKING_URL,
  decorateGhlCalendarUrlWithAttribution,
  buildBookingEventParams,
  sanitizeUrlForAttribution,
} from "./booking-tracking.mjs";

export const COACHES_PAGE_ID = "ati_coaches";
// Replace this URL when a dedicated coach calendar is available.
export const COACHES_CALENDAR_URL = MAIN_WEBSITE_GHL_BOOKING_URL;

export function coachesCalendarUrl(attribution, href = COACHES_CALENDAR_URL) {
  const calendar = new URL(href);
  const calendarId = calendar.pathname.split("/").pop();
  const decorated = new URL(decorateGhlCalendarUrlWithAttribution(href, attribution, calendarId));
  // Independent of acquisition UTMs. Requires a mapped hidden field in GHL.
  decorated.searchParams.set("tk_originating_page", COACHES_PAGE_ID);
  return decorated.toString();
}

export function coachesEventParams(attribution, href, referrer) {
  const params = buildBookingEventParams(attribution, "/lp/coaches");
  delete params.appointment_type;
  delete params.lead_source;
  delete params.confirmation_path;
  return {
    ...params,
    page_id: COACHES_PAGE_ID,
    originating_page: COACHES_PAGE_ID,
    page_location: sanitizeUrlForAttribution(href),
    page_referrer: sanitizeUrlForAttribution(referrer),
  };
}

export function initializeCoachesTracking(targetWindow) {
  if (targetWindow.__tkCoachesTracking) return;
  targetWindow.__tkCoachesTracking = true;
  const params = () =>
    coachesEventParams(
      targetWindow.tkAttribution,
      targetWindow.location.href,
      targetWindow.document.referrer,
    );
  const track = (name, extra = {}) => {
    // One GA event through the existing tag and consent state, no second pixel.
    targetWindow.gtag?.("event", name, { ...params(), ...extra, transport_type: "beacon" });
  };
  track("page_view");
  observeCoachesCalendar(targetWindow, track);
  targetWindow.document.querySelectorAll("[data-coaches-cta]").forEach((link) => {
    const base = link.href;
    const refresh = () => {
      if (link.hasAttribute("data-calendar-link"))
        link.href = coachesCalendarUrl(targetWindow.tkAttribution, base);
    };
    refresh();
    link.addEventListener("pointerdown", refresh);
    link.addEventListener("click", () => {
      refresh();
      track("schedule_click", { cta_location: link.dataset.coachesCta });
    });
    link.addEventListener("auxclick", (event) => {
      if (event.button === 1) {
        refresh();
        track("schedule_click", { cta_location: link.dataset.coachesCta });
      }
    });
  });
}

// A load event alone can also mean an error document. Require a message from
// the actual provider frame, plus viewport visibility, before counting an open.
export function observeCoachesCalendar(targetWindow, track) {
  const frame = targetWindow.document.querySelector("[data-coaches-calendar]");
  if (!frame) return;
  const status = targetWindow.document.querySelector("[data-calendar-status]");
  let ready = false;
  let visible = false;
  let sent = false;
  const opened = () => {
    if (!ready || !visible || sent) return;
    sent = true;
    track("scheduler_open", { cta_location: "inline_calendar" });
  };
  const observer = new targetWindow.IntersectionObserver(
    (entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      opened();
    },
    { threshold: 0.1 },
  );
  observer.observe(frame);
  const destination = coachesCalendarUrl(targetWindow.tkAttribution, frame.dataset.src);
  const providerOrigin = new URL(destination).origin;
  const timer = targetWindow.setTimeout(() => {
    if (!ready && status)
      status.textContent = "Taking longer than expected? You can open the full calendar below.";
  }, 12000);
  targetWindow.addEventListener("message", (event) => {
    if (event.source !== frame.contentWindow || event.origin !== providerOrigin) return;
    const data = event.data;
    const knownMessage =
      Array.isArray(data) && ["highlevel.setHeight", "iframeLoaded"].includes(data[0]);
    const sizerMessage = typeof data === "string" && data.startsWith("[iFrameSizer]");
    if (!knownMessage && !sizerMessage) return;
    ready = true;
    targetWindow.clearTimeout(timer);
    if (status) status.hidden = true;
    // GHL supplies the content height as the second array item.
    if (Array.isArray(data) && data[0] === "highlevel.setHeight") {
      const height = Number(data[1]);
      if (Number.isFinite(height) && height >= 400 && height <= 3000)
        frame.style.height = `${height}px`;
    }
    opened();
  });
  frame.src = destination;
}
