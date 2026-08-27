(function () {
  "use strict";

  var READY_TIMEOUT_MS = 4000;
  var VIEWED_SESSION_KEY = "turnkey_ghl_calendar_viewed";

  function track(eventName, params) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params || {});
      } else {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
      }
    } catch (_) {}
  }

  function hasTrackedView() {
    try {
      return sessionStorage.getItem(VIEWED_SESSION_KEY) === "true";
    } catch (_) {
      return false;
    }
  }

  function rememberTrackedView() {
    try {
      sessionStorage.setItem(VIEWED_SESSION_KEY, "true");
    } catch (_) {}
  }

  function init() {
    var sheet = document.querySelector(".sheet[data-booking-state]");
    var iframe = sheet
      ? sheet.querySelector('iframe[data-tk-booking-provider="ghl_calendar"]')
      : null;
    var status = sheet ? sheet.querySelector("[data-booking-status]") : null;
    var statusRow = status ? status.closest(".booking-status") : null;
    var fallback = sheet ? sheet.querySelector('a[data-tk-booking-provider="ghl_calendar"]') : null;
    var fallbackCopy = sheet ? sheet.querySelector("[data-booking-fallback-copy]") : null;
    if (!sheet || !iframe || !fallback) return;

    var started = false;
    var ready = false;
    var readyTimer = null;
    var viewObserver = null;

    function isLeadConnectorOrigin(origin) {
      try {
        var hostname = new URL(origin).hostname;
        return hostname === "leadconnectorhq.com" || hostname.endsWith(".leadconnectorhq.com");
      } catch (_) {
        return false;
      }
    }

    function isProviderReadyMessage(data) {
      if (typeof data === "string") {
        return data.indexOf("[iFrameSizer]") === 0 || data.indexOf("[iFrameSizerChild]") === 0;
      }
      if (!Array.isArray(data)) return false;
      return ["highlevel.setHeight", "iframeLoaded", "fetch-query-params"].indexOf(data[0]) !== -1;
    }

    function trackInlineView() {
      if (!ready || hasTrackedView()) return;
      rememberTrackedView();
      track("ghl_calendar_viewed", {
        booking_provider: "ghl_calendar",
        booking_funnel: "google_ads_landing_page",
        placement: "inline_calendar",
      });
    }

    function observeVisibleCalendar() {
      if (typeof window.IntersectionObserver !== "function") {
        trackInlineView();
        return;
      }
      viewObserver = new IntersectionObserver(
        function (entries) {
          if (
            entries.some(function (entry) {
              return entry.isIntersecting && entry.intersectionRatio > 0.1;
            })
          ) {
            trackInlineView();
            viewObserver.disconnect();
          }
        },
        { threshold: [0.1] },
      );
      viewObserver.observe(iframe);
    }

    function markReady() {
      if (ready) return;
      ready = true;
      if (readyTimer) window.clearTimeout(readyTimer);
      window.removeEventListener("message", onProviderMessage);
      sheet.dataset.bookingState = "ready";
      iframe.hidden = false;
      iframe.setAttribute("aria-busy", "false");
      if (statusRow) statusRow.hidden = true;
      if (fallbackCopy)
        fallbackCopy.textContent =
          "Prefer a separate page? The same attributed calendar is available here.";
      window.requestAnimationFrame(observeVisibleCalendar);
    }

    function onProviderMessage(event) {
      if (event.source !== iframe.contentWindow) return;
      if (!isLeadConnectorOrigin(event.origin)) return;
      if (!isProviderReadyMessage(event.data)) return;
      markReady();
    }

    function markFailed() {
      if (ready) return;
      sheet.dataset.bookingState = "failed";
      iframe.hidden = true;
      iframe.setAttribute("aria-busy", "false");
      if (status) status.textContent = "The embedded calendar is taking longer than expected.";
      if (fallbackCopy)
        fallbackCopy.textContent =
          "Continue in the full booking calendar. Your ad attribution will be preserved.";
    }

    function start() {
      if (started) return;
      started = true;
      sheet.dataset.bookingState = "loading";
      window.addEventListener("message", onProviderMessage);
      iframe.addEventListener(
        "load",
        function () {
          if (status && !ready) status.textContent = "Confirming the booking calendar is ready…";
        },
        { once: true },
      );
      iframe.addEventListener("error", markFailed, { once: true });
      readyTimer = window.setTimeout(markFailed, READY_TIMEOUT_MS);
      var source = iframe.getAttribute("data-src");
      if (source) iframe.setAttribute("src", source);
      else markFailed();
    }

    fallback.addEventListener("click", function (event) {
      event.preventDefault();
      var destination = fallback.href;
      var navigated = false;
      function navigate() {
        if (navigated) return;
        navigated = true;
        window.location.assign(destination);
      }
      track("ghl_calendar_viewed", {
        booking_provider: "ghl_calendar",
        booking_funnel: "google_ads_landing_page",
        placement: "calendar_fallback",
        transport_type: "beacon",
        event_callback: navigate,
        event_timeout: 500,
      });
      window.setTimeout(navigate, 550);
    });

    if (typeof window.IntersectionObserver === "function") {
      var preloadObserver = new IntersectionObserver(
        function (entries) {
          if (
            entries.some(function (entry) {
              return entry.isIntersecting;
            })
          ) {
            start();
            preloadObserver.disconnect();
          }
        },
        { rootMargin: "1000px 0px" },
      );
      preloadObserver.observe(sheet);
    }

    window.turnkeyGhlBooking = { start: start };
    if (window.location.hash === "#start") start();
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
