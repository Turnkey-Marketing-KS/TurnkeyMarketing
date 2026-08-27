# Website Booking and Attribution — Source of Truth

**Last updated:** 2026-08-27 (America/Chicago)
**Website repository:** `Turnkey-Marketing-KS/TurnkeyMarketing`  
**Implemented on GitHub `main`:** commit `565e1ea3012395c425a8775a2353377c514125b4`  
**Purpose:** This is the handoff document for anyone changing the Turnkey website, booking pages, analytics, or conversion tracking.

## The one rule to remember

Turnkey has **two separate booking funnels**. They must remain separate.

| Funnel | Entry point | Booking system | Confirmation page | Google Ads conversion? |
|---|---|---|---|---:|
| Main website | Homepage, service pages, other normal site CTAs -> `/contact` | AppointmentCore | `/booking-confirmed` | **No** |
| Paid Google Ads landing page | `/lp/auto-repair-marketing` | Existing GHL calendar/form | `/google-ads-call-booked` | **Yes** |

Do not add a form before either calendar. A visitor should fill out only the form belonging to the booking system they are using.

## Funnel 1: Main website and AppointmentCore

### Visitor flow

1. A visitor arrives on a normal Turnkey website page.
2. The website records sanitized, first-party session attribution.
3. A normal booking CTA takes the visitor to `/contact`.
4. `/contact` displays the existing AppointmentCore calendar in an iframe.
5. After a successful booking, AppointmentCore must redirect to `/booking-confirmed`.
6. `/booking-confirmed` sends the confirmed-booking events to GA4.

### Current AppointmentCore calendar

- Booking URL: `https://go.appointmentcore.com/book/7uUZaGNRL6?d=Slots&e=1`
- Website page: `src/pages/contact.astro`
- Confirmation page: `src/pages/booking-confirmed.astro`
- Attribution and event code: `src/lib/booking-tracking.mjs`
- Sitewide initialization: `src/layouts/BaseLayout.astro`

The AppointmentCore iframe URL must remain clean. Do not append GCLIDs, UTMs, email addresses, phone numbers, or internal tracking IDs to its cross-origin URL.

### First-party source information recorded

The website stores a sanitized record in `sessionStorage` under `turnkey_attribution_v2`:

- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term`
- `gclid`, `gbraid`, `wbraid`, `fbclid`, and `msclkid` when present
- first and latest landing pages
- first and latest external referrers
- first and latest touch timestamps
- stable anonymous `tk_` session identifier
- best-effort GA4 client and session identifiers

This record is browser-session attribution only. It does not ask the visitor for information, does not send PII, does not POST to the internal automations project, and does not create a GHL contact before the person books.

### AppointmentCore GA4 events

| Event | When it fires | Required parameters | Completed conversion? |
|---|---|---|---:|
| `consultation_cta_click` | Existing main-site booking CTA is clicked | Existing placement value | No |
| `appointmentcore_calendar_viewed` | `/contact` loads and contains the AppointmentCore iframe | `booking_provider=appointmentcore`, `booking_funnel=main_website` | No |
| `appointment_booked` | AppointmentCore reaches `/booking-confirmed` | `booking_provider=appointmentcore`, `booking_funnel=main_website`, retained attribution | **Yes** |
| `generate_lead` | Same confirmed booking; retained for compatibility | Same booking metadata | No |

`appointment_booked` and `generate_lead` have a 30-minute browser deduplication guard. Refreshing or returning to the confirmation page during that window should not create a second event.

### AppointmentCore conversion boundary

The AppointmentCore funnel must **never** send the Google Ads conversion label:

`AW-18358810922/8Oy4CJqVtuMcEKrylLJE`

Even if a main-site visitor has a GCLID or paid attribution, reaching `/booking-confirmed` is measured in GA4 only. Do not add Google Ads conversion code to that page.

## Funnel 2: Google Ads landing page and GHL

### Visitor flow

1. A paid-search visitor lands directly on `/lp/auto-repair-marketing`.
2. The standalone landing page captures and sanitizes available click IDs, UTMs, landing page, referrer, and session identifiers.
3. The existing GHL iframe URL is decorated before the booking widget uses it.
4. The visitor completes the existing GHL calendar/form—there is no AppointmentCore step.
5. The GHL calendar redirects a successful booking to `/google-ads-call-booked`.
6. That confirmation page sends the Google Ads booked-consultation conversion.

### Current GHL calendar

- Landing page: `public/lp/auto-repair-marketing/index.html`
- Attribution helper: `public/lp/ghl-attribution.js`
- Booking readiness/fallback helper: `public/lp/ghl-booking.js`
- Calendar ID: `6tmXrJxmo6AUsMP2ja9d`
- Calendar name at last audit: `Schedule A Strategy Call`
- GHL widget URL: `https://api.leadconnectorhq.com/widget/booking/6tmXrJxmo6AUsMP2ja9d`
- Confirmation page: `src/pages/google-ads-call-booked.astro`

The iframe and external fallback must retain `data-tk-booking-provider="ghl_calendar"`; the attribution helper uses that marker to find and decorate the correct booking URLs. The iframe's attributed URL is staged in `data-src` and assigned to `src` by `ghl-booking.js` when the booking section approaches the viewport or a consultation CTA is clicked.

Do not restore `https://link.msgsndr.com/js/form_embed.js` on this page without retesting its reveal handshake. As of 2026-08-26, that script hid the calendar and waited for a provider-specific `fetch-query-params` message that the current GHL booking widget did not send. `ghl-booking.js` instead reveals the iframe only after a message from the expected LeadConnector iframe confirms that its application code is running; a bare iframe `load` event is not treated as readiness because browsers can fire it for an unreachable or failed frame. The helper switches to a prominent, same-tab, fully attributed fallback after four seconds if the provider signal does not arrive. The fallback remains available even after a successful inline load because the parent page cannot inspect later failures inside a cross-origin calendar application.

### GHL landing-page view event

The paid landing page sends `ghl_calendar_viewed` with `booking_provider=ghl_calendar` and `booking_funnel=google_ads_landing_page` only when either:

- the successfully loaded inline calendar actually intersects the viewport; or
- the visitor chooses the attributed external calendar fallback.

The fallback click is not another `consultation_cta_click`, and the ordinary consultation CTA is not counted as a lead. The parent page cannot reliably send `booking_form_start` from the cross-origin GHL UI unless GHL exposes a stable provider message for the contact-details step. Do not infer form start from a CTA click, iframe load, resize, or elapsed time.

### GHL confirmation events

`/google-ads-call-booked` sends:

- GA4 event `google_ads_call_booked`
- Google Ads conversion `AW-18358810922/8Oy4CJqVtuMcEKrylLJE`

The Google Ads conversion action is `Google Ads – Consultation Booked`. The confirmation page uses a session-level deduplication flag named `turnkey_google_ads_call_booked_sent`.

This is the **only** website booking funnel allowed to send that Google Ads conversion label.

The current `google_ads_call_booked` event uses `booking_provider=ghl_calendar` and `funnel=google_ads_landing_page`. If reporting is later standardized on the GA4 custom parameter `booking_funnel`, make that a deliberate, tested change rather than silently renaming it.

## Canonical GA4 configuration

- Account: `Turnkey Marketing Agency` (`402633879`)
- Property: `Turnkey Website` (`547562252`)
- Web stream: `Turnkey Website` (`15346679735`)
- Canonical measurement ID: `G-XJZ35N9FWG`

Two event-scoped custom dimensions were created:

1. `Booking Provider` -> `booking_provider`
2. `Booking Funnel` -> `booking_funnel`

Do not register GCLIDs, click IDs, appointment IDs, anonymous session IDs, or timestamps as GA4 custom dimensions. They are too high-cardinality for useful GA4 reporting.

The duplicate page-level measurement ID `G-1468YCTQJ3` was removed from the website implementation because it is not part of the canonical Turnkey GA4 property. Do not re-add it unless its ownership and a clear business reason are first documented.

## Files that control the setup

| File | Responsibility |
|---|---|
| `src/layouts/BaseLayout.astro` | Canonical GA4/Ads tags and main-site attribution initialization |
| `src/lib/booking-tracking.mjs` | Main-site first-party attribution and AppointmentCore GA4 events |
| `scripts/booking-tracking.test.mjs` | Automated regression tests for main-site attribution and funnel isolation |
| `src/pages/contact.astro` | Existing AppointmentCore iframe |
| `src/pages/booking-confirmed.astro` | AppointmentCore confirmed-booking GA4 event |
| `public/lp/auto-repair-marketing/index.html` | Standalone Google Ads landing page and GHL iframe |
| `public/lp/ghl-attribution.js` | GHL-only landing-page attribution capture and iframe decoration |
| `public/lp/ghl-booking.js` | GHL iframe start/readiness state, four-second failure fallback, and calendar-view tracking |
| `src/pages/google-ads-call-booked.astro` | GHL confirmation and the sole booked-consultation Google Ads conversion |

## Guardrails for future website work

Before merging any booking or analytics change, verify all of the following:

- The main website still uses AppointmentCore, and the Google Ads LP still uses GHL.
- No visitor is forced to complete a new pre-calendar form.
- `/contact` still contains the AppointmentCore iframe and its embed helper.
- The AppointmentCore iframe URL has not been decorated with attribution or PII.
- `/booking-confirmed` sends GA4 booking events but no Google Ads conversion.
- `/lp/auto-repair-marketing` still loads `/lp/ghl-attribution.js`.
- `/lp/auto-repair-marketing` still loads `/lp/ghl-booking.js` and does not load GHL's handshake-dependent `form_embed.js`.
- The GHL iframe still has `data-tk-booking-provider="ghl_calendar"`.
- `/google-ads-call-booked` remains the only booking page that sends `8Oy4CJqVtuMcEKrylLJE`.
- Only canonical GA4 ID `G-XJZ35N9FWG` is configured for Turnkey reporting.
- No email address, phone number, name, or other PII is sent in analytics event parameters or tracking URLs.
- `npm run test:booking-tracking` passes.
- The production Astro build passes.

## Google Ads call-number replacement on the paid landing page

The canonical business number in page markup is `(913) 427-0674`, including every matching `tel:+19134270674` link. The Google Ads call conversion configuration also declares that number as `phone_conversion_number` for conversion action `AW-18358810922/PAbVCOamquMcEKrylLJE`.

Eligible ad sessions can replace the visible number and matching `tel:` destination with a Google forwarding number. During the 2026-08-26 production audit, Chrome displayed `(913) 374-4351` and linked it to `tel:+19133744351`; a fresh session without replacement can continue to show `(913) 427-0674`. This difference is intentional dynamic-number insertion. If the Google call-conversion tag or canonical number changes, verify both the displayed number and `tel:` destination together.

## Production verification checklist

After a deployment:

1. Open a normal website page with test UTMs and navigate to `/contact` in the same browser tab.
2. Confirm Tag Assistant or GA4 DebugView receives one `appointmentcore_calendar_viewed` event with the correct provider and funnel.
3. Confirm the AppointmentCore iframe URL is unchanged and contains no tracking or identity parameters.
4. Complete a controlled AppointmentCore booking and confirm it reaches `/booking-confirmed`.
5. Confirm GA4 receives exactly one `appointment_booked` and one compatibility `generate_lead` event.
6. Confirm no request for Google Ads label `8Oy4CJqVtuMcEKrylLJE` occurs on the AppointmentCore confirmation.
7. Separately test the Google Ads LP and GHL calendar flow.
8. Confirm `/google-ads-call-booked` sends one `google_ads_call_booked` event and one Google Ads conversion.
9. Refresh each confirmation page and confirm the browser deduplication guards prevent duplicate events.

Use a late-September appointment if a real test booking is required, and remove or clearly label the test appointment afterward.

## Known limitation

The main website cannot read the contents of the cross-origin AppointmentCore iframe. A completed AppointmentCore booking can only be confirmed client-side when AppointmentCore redirects to `/booking-confirmed` (or if AppointmentCore later provides a supported completion message or exact shared booking identifier).

GA4 can reliably report the website session's acquisition source and the confirmed booking event in the same browser session. It does not, by itself, guarantee that AppointmentCore's later GHL contact record contains every attribution field. That would require an exact AppointmentCore-to-GHL identifier or native integration and is intentionally outside the current friction-free website implementation.

## Change control

Treat commit `565e1ea3012395c425a8775a2353377c514125b4` as the baseline for this setup. If a future change alters a booking provider, confirmation URL, conversion label, GA4 measurement ID, or event name, update this document in the same pull request.
