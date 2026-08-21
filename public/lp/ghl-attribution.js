(function () {
  "use strict";

  var STORAGE_KEY = "turnkey_attribution_v2";
  var SESSION_KEY = "turnkey_ghl_tracking_session_id";
  var CAMPAIGN_KEYS = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

  function clean(value, max) {
    if (typeof value !== "string") return "";
    var result = value.trim().replace(/[<>]/g, "").slice(0, max || 500);
    return !result || /@|\+?\d[\d(). -]{7,}\d/.test(result) ? "" : result;
  }

  function cleanId(value) {
    var result = clean(value, 160);
    return /^[A-Za-z0-9._:-]+$/.test(result) ? result : "";
  }

  function safeUrl(value) {
    try {
      var url = new URL(value, window.location.href);
      Array.from(url.searchParams.keys()).forEach(function (key) {
        if (/email|phone|name|address|message|comment|token|password/i.test(key)) url.searchParams.delete(key);
      });
      Array.from(url.searchParams.entries()).forEach(function (entry) {
        if (/@|\+?\d[\d(). -]{7,}\d/.test(entry[1])) url.searchParams.delete(entry[0]);
      });
      return url.toString();
    } catch (_) { return ""; }
  }

  function getSessionId() {
    try {
      var stored = cleanId(sessionStorage.getItem(SESSION_KEY));
      if (stored && stored.indexOf("tk_") === 0) return stored;
    } catch (_) {}
    var random = "";
    try {
      if (window.crypto && typeof window.crypto.randomUUID === "function") random = window.crypto.randomUUID();
    } catch (_) {}
    if (!random) random = Math.random().toString(36).slice(2) + Date.now().toString(36);
    var value = "tk_" + random.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 120);
    try { sessionStorage.setItem(SESSION_KEY, value); } catch (_) {}
    return value;
  }

  function read() {
    try {
      var value = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
      return value && typeof value === "object" ? value : {};
    } catch (_) { return {}; }
  }

  function write(value) {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch (_) {}
  }

  function touchFromUrl(url) {
    var touch = {};
    CAMPAIGN_KEYS.forEach(function (key) {
      var value = clean(url.searchParams.get(key) || "");
      if (value) touch[key] = value;
    });
    return touch;
  }

  function hasCampaign(touch) {
    return CAMPAIGN_KEYS.some(function (key) { return !!touch[key]; });
  }

  function externalReferrer() {
    try {
      var value = document.referrer ? new URL(document.referrer) : null;
      return value && value.origin !== window.location.origin ? safeUrl(value.toString()) : "";
    } catch (_) { return ""; }
  }

  function capture() {
    var attribution = read();
    var url = new URL(window.location.href);
    var touch = touchFromUrl(url);
    var referrer = externalReferrer();
    var timestamp = new Date().toISOString();
    if (!attribution.tracking_session_id) attribution.tracking_session_id = getSessionId();
    if (!attribution.first_touch_at) {
      attribution.first_touch_at = timestamp;
      attribution.first_touch = touch;
      attribution.first_landing_page = safeUrl(window.location.href);
      attribution.first_referrer = referrer;
    }
    var campaignChanged = hasCampaign(touch) && JSON.stringify(touch) !== JSON.stringify(attribution.latest_touch || {});
    var referrerChanged = !!referrer && referrer !== attribution.latest_referrer;
    if (!attribution.latest_touch_at || campaignChanged || referrerChanged) {
      attribution.latest_touch_at = timestamp;
      attribution.latest_touch = touch;
      attribution.latest_landing_page = safeUrl(window.location.href);
      attribution.latest_referrer = referrer;
    }
    CAMPAIGN_KEYS.forEach(function (key) {
      var value = touch[key] || (attribution.latest_touch || {})[key] || (attribution.first_touch || {})[key];
      if (value) attribution[key] = clean(value);
    });
    write(attribution);
    return attribution;
  }

  function decorate(attribution) {
    document.querySelectorAll('[data-tk-booking-provider="ghl_calendar"]').forEach(function (element) {
      var attribute = element.tagName === "A" ? "href" : "src";
      var raw = element.getAttribute(attribute);
      if (!raw) return;
      try {
        var url = new URL(raw, window.location.href);
        var latest = attribution.latest_touch || {};
        var first = attribution.first_touch || {};
        CAMPAIGN_KEYS.forEach(function (key) {
          var canonical = latest[key] || first[key];
          if (canonical) url.searchParams.set("tk_" + key, canonical);
          if (latest[key]) url.searchParams.set(key, latest[key]);
          if (first[key]) url.searchParams.set("tk_first_" + key, first[key]);
          if (latest[key]) url.searchParams.set("tk_latest_" + key, latest[key]);
        });
        {
          var fields = {
            tk_tracking_session_id: attribution.tracking_session_id,
            tk_first_touch_at: attribution.first_touch_at,
            tk_latest_touch_at: attribution.latest_touch_at,
            tk_first_landing_page: attribution.first_landing_page,
            tk_latest_landing_page: attribution.latest_landing_page,
            tk_first_referrer: attribution.first_referrer,
            tk_latest_referrer: attribution.latest_referrer,
            tk_ga4_client_id: attribution.ga4_client_id,
            tk_ga4_session_id: attribution.ga4_session_id,
          };
          Object.keys(fields).forEach(function (key) { if (fields[key]) url.searchParams.set(key, fields[key]); });
        }
        element.setAttribute(attribute, url.toString());
      } catch (_) {}
    });
  }

  function getGa(field, attribution) {
    if (typeof window.gtag !== "function") return;
    try {
      window.gtag("get", "G-XJZ35N9FWG", field, function (value) {
        var cleaned = cleanId(value);
        if (cleaned) {
          attribution[field === "client_id" ? "ga4_client_id" : "ga4_session_id"] = cleaned;
          write(attribution);
          decorate(attribution);
        }
      });
    } catch (_) {}
  }

  var attribution = capture();
  decorate(attribution);
  getGa("client_id", attribution);
  getGa("session_id", attribution);
  if (typeof MutationObserver === "function") {
    new MutationObserver(function () { decorate(attribution); }).observe(document.documentElement, { childList: true, subtree: true });
  }
})();
