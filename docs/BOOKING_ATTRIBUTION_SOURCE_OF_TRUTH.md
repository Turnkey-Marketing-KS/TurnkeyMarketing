# Website Booking and Attribution — Source of Truth

**Last updated:** 2026-08-27 (America/Chicago)

**Website repository:** `Turnkey-Marketing-KS/TurnkeyMarketing`

**Original baseline on GitHub `main`:** commit `565e1ea3012395c425a8775a2353377c514125b4`

**Cutover status:** website implementation prepared; production deployment, GHL redirect update, CRM lifecycle workflows, and a controlled lifecycle test are still pending

**Purpose:** This is the handoff document for anyone changing the Turnkey website, booking pages, analytics, or conversion tracking.

## The one rule to remember

Turnkey has separate booking funnels. Their attribution and conversion senders must remain isolated.

| Funnel                       | Entry point                                                     | Booking system                      | Confirmation page         | Google Ads booked-consultation conversion? |
| ---------------------------- | --------------------------------------------------------------- | ----------------------------------- | ------------------------- | -----------------------------------------: |
| Main website                 | Normal site CTAs -> `/contact`                                  | GHL calendar `wDWczTxA5kEbkEWoqzLC` | `/website-call-booked`    |                                     **No** |
| Legacy AppointmentCore       | Old direct links, printed QR codes, and retained legacy embeds  | AppointmentCore                     | `/booking-confirmed`      |                                     **No** |
| Paid Google Ads landing page | `/lp/auto-repair-marketing` -> `/lp/auto-repair-marketing/book` | GHL calendar `6tmXrJxmo6AUsMP2ja9d` | `/google-ads-call-booked` |                                    **Yes** |

Do not add a form before any calendar. A visitor should fill out only the identity form belonging to the booking system they are using.

## Funnel 1: Main website and dedicated GHL calendar

### Visitor flow

1. A visitor arrives on a normal Turnkey website page.
2. The website records sanitized, first-party session attribution.
3. A normal booking CTA takes the visitor to `/contact`.
4. `/contact` decorates and displays the dedicated main-site GHL calendar.
5. After a successful booking, GHL must redirect to `/website-call-booked`.
6. `/website-call-booked` sends the confirmed-booking events to GA4 only.

### Main-site GHL calendar

- Calendar name: `Book Your Strategy Call`
- Calendar ID: `wDWczTxA5kEbkEWoqzLC`
- Widget URL: `https://api.leadconnectorhq.com/widget/booking/wDWczTxA5kEbkEWoqzLC`
- Website page: `src/pages/contact.astro`
- Confirmation page: `src/pages/website-call-booked.astro`
- Attribution and event code: `src/lib/booking-tracking.mjs`
- Sitewide initialization: `src/layouts/BaseLayout.astro`

The iframe and its same-tab fallback link use `data-tk-booking-provider="ghl_calendar"`. The main-site decorator accepts only the exact LeadConnector host, booking path, and main-site calendar ID. It preserves actual visitor attribution and never forces the traffic source to Google Ads.

### First-party attribution and GHL handoff

The website stores a sanitized record in `sessionStorage` under `turnkey_attribution_v2`:

- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term`
- `gclid`, `gbraid`, `wbraid`, `fbclid`, and `msclkid` when present
- first and latest landing pages
- first and latest external referrers
- first and latest touch timestamps
- stable anonymous `tk_` session identifier
- best-effort GA4 client and session identifiers

The allowlisted values are added to the main-site GHL iframe and fallback URLs so GHL can retain the same anonymous acquisition context. Names, email addresses, phone numbers, shop names, and other PII are rejected from tracking URLs and analytics parameters. This browser-side handoff does not create a GHL contact before the visitor completes the calendar's own form.

### Main-site GHL analytics

| Event                     | When it fires                                           | Required parameters                                                                  | Completed conversion? |
| ------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------: |
| `consultation_cta_click`  | Existing main-site booking CTA is clicked               | Existing placement value                                                             |                    No |
| `booking_calendar_viewed` | The main-site GHL calendar is initialized on `/contact` | `booking_provider=ghl_calendar`, `booking_funnel=main_website`                       |                    No |
| `appointment_booked`      | GHL reaches `/website-call-booked`                      | `booking_provider=ghl_calendar`, `booking_funnel=main_website`, retained attribution |               **Yes** |
| `generate_lead`           | Same confirmed booking; retained for compatibility      | Same booking metadata                                                                |                    No |

`appointment_booked` and `generate_lead` share a 30-minute browser deduplication guard named `turnkey_main_website_ghl_booking_sent`. Refreshing or returning to the page inside that window must not create another event.

### Main-site conversion boundary

The main-site GHL funnel must never send the Google Ads booked-consultation conversion label:

`AW-18358810922/8Oy4CJqVtuMcEKrylLJE`

This remains true when the main-site visitor has a GCLID or other paid attribution. Acquisition metadata does not authorize a conversion sender.

## Legacy AppointmentCore transition path

AppointmentCore remains available temporarily for old direct links, printed QR codes, and retained legacy embeds such as the AI visibility scan flow.

- Legacy booking URL: `https://go.appointmentcore.com/book/7uUZaGNRL6?d=Slots&e=1`
- Legacy URL constant: `src/lib/services.ts`
- Legacy confirmation page: `src/pages/booking-confirmed.astro`
- Legacy confirmation provider: `appointmentcore`
- Legacy confirmation funnel: `main_website`
- Legacy deduplication key: `turnkey_appointment_booked_sent_at`

The AppointmentCore URL must remain clean. Do not append GCLIDs, UTMs, identity fields, or internal tracking IDs to it. `/booking-confirmed` continues sending `appointment_booked` and compatibility `generate_lead` to GA4 with `booking_provider=appointmentcore`; it never sends the Google Ads booked-consultation conversion.

Do not globally relabel `/booking-confirmed` as GHL. Do not delete AppointmentCore, its confirmation code, or its historical tracking data until the legacy transition is explicitly closed.

## Funnel 2: Google Ads landing page and dedicated GHL calendar

### Visitor flow

1. A paid-search visitor lands directly on `/lp/auto-repair-marketing`.
2. The standalone page captures and sanitizes available click IDs, UTMs, landing page, referrer, and session identifiers.
3. A consultation CTA takes the visitor to `/lp/auto-repair-marketing/book`.
4. The booking page decorates the existing paid-funnel GHL iframe URL.
5. The visitor completes the existing GHL calendar/form.
6. GHL redirects a successful booking to `/google-ads-call-booked`.
7. That page sends the paid funnel's GA4 and Google Ads conversions.

### Paid-funnel GHL calendar

- Calendar ID: `6tmXrJxmo6AUsMP2ja9d`
- Calendar name at last audit: `Schedule A Strategy Call`
- Widget URL: `https://api.leadconnectorhq.com/widget/booking/6tmXrJxmo6AUsMP2ja9d`
- Landing page: `public/lp/auto-repair-marketing/index.html`
- Booking page: `src/pages/lp/auto-repair-marketing/book.astro`
- Attribution helper: `public/lp/ghl-attribution.js`
- Booking readiness/fallback helper: `public/lp/ghl-booking.js`
- Confirmation page: `src/pages/google-ads-call-booked.astro`

The paid landing page and calendar ID remain unchanged. Its iframe and fallback retain `data-tk-booking-provider="ghl_calendar"`; the attributed URL is staged in `data-src` and loaded by `ghl-booking.js` near the viewport.

Do not restore `https://link.msgsndr.com/js/form_embed.js` without retesting its reveal handshake. As of 2026-08-26, it hid the calendar while waiting for a provider message the widget did not send. The current helper instead waits for a trusted LeadConnector message and offers a prominent, attributed, same-tab fallback after four seconds.

### Paid-funnel events and conversion sender

The paid booking page sends `ghl_calendar_viewed` with `booking_provider=ghl_calendar` and `booking_funnel=google_ads_landing_page` only when the loaded inline calendar intersects the viewport or the visitor chooses the fallback.

`/google-ads-call-booked` sends:

- GA4 event `google_ads_call_booked`
- Google Ads conversion `AW-18358810922/8Oy4CJqVtuMcEKrylLJE`

The page uses the session-level key `turnkey_google_ads_call_booked_sent`. It is the only website booking funnel authorized to send that conversion label. Its current GA4 event uses `booking_provider=ghl_calendar` and `funnel=google_ads_landing_page`; standardizing that legacy parameter requires a separate deliberate change.

## Canonical GA4 configuration

- Account: `Turnkey Marketing Agency` (`402633879`)
- Property: `Turnkey Website` (`547562252`)
- Web stream: `Turnkey Website` (`15346679735`)
- Canonical measurement ID: `G-XJZ35N9FWG`

Event-scoped custom dimensions:

1. `Booking Provider` -> `booking_provider`
2. `Booking Funnel` -> `booking_funnel`

Do not register click IDs, appointment IDs, anonymous session IDs, or timestamps as GA4 custom dimensions. Do not reintroduce retired measurement ID `G-1468YCTQJ3` unless its ownership and business purpose are documented first.

## Files that control the setup

| File                                            | Responsibility                                                                                    |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `src/layouts/BaseLayout.astro`                  | Canonical GA4/Ads tags and main-site attribution initialization                                   |
| `src/lib/booking-tracking.mjs`                  | Main-site attribution, GHL URL decoration, view events, and provider-specific confirmation events |
| `scripts/booking-tracking.test.mjs`             | Attribution, deduplication, PII, and funnel-isolation regression tests                            |
| `src/pages/contact.astro`                       | Dedicated main-site GHL iframe and fallback                                                       |
| `src/pages/website-call-booked.astro`           | Main-site GHL confirmed-booking GA4 events                                                        |
| `src/pages/booking-confirmed.astro`             | Legacy AppointmentCore confirmed-booking GA4 events                                               |
| `src/lib/services.ts`                           | Retained legacy AppointmentCore URL used by transitional flows                                    |
| `public/lp/auto-repair-marketing/index.html`    | Standalone Google Ads landing page and paid-session attribution capture                           |
| `src/pages/lp/auto-repair-marketing/book.astro` | Paid-funnel GHL booking page                                                                      |
| `public/lp/ghl-attribution.js`                  | Paid-funnel GHL attribution capture and URL decoration                                            |
| `public/lp/ghl-booking.js`                      | Paid-funnel iframe readiness, fallback, and calendar-view tracking                                |
| `src/pages/google-ads-call-booked.astro`        | Sole booked-consultation Google Ads conversion sender                                             |

## Guardrails for future website work

- `/contact` must use main-site GHL calendar `wDWczTxA5kEbkEWoqzLC`, not the paid calendar.
- The main-site GHL calendar must redirect to `/website-call-booked` after the website change is deployed.
- `/website-call-booked` must report `booking_provider=ghl_calendar` and `booking_funnel=main_website` and never send `8Oy4CJqVtuMcEKrylLJE`.
- `/booking-confirmed` must remain the legacy AppointmentCore route and report `booking_provider=appointmentcore`.
- AppointmentCore URLs must remain undecorated.
- `/lp/auto-repair-marketing/book` must retain calendar `6tmXrJxmo6AUsMP2ja9d`, the paid helpers, and `/google-ads-call-booked`.
- `/google-ads-call-booked` must remain the only booking page that sends `8Oy4CJqVtuMcEKrylLJE`.
- No funnel may add a form before its calendar or send PII through analytics or tracking URLs.
- Only GA4 ID `G-XJZ35N9FWG` is canonical; `G-1468YCTQJ3` must remain absent.
- CRM opportunity, tag, and status workflows are a separate launch-readiness item. Do not claim the operational migration is complete until those workflows and a controlled lifecycle test pass.
- Run the booking tests, production build, ESLint, and SEO check before merging.

## Google Ads call-number replacement on the paid landing page

The canonical business number in page markup is `(913) 427-0674`, including every matching `tel:+19134270674` link. The Google Ads call conversion configuration also declares that number for action `AW-18358810922/PAbVCOamquMcEKrylLJE`.

Eligible ad sessions can replace the visible number and matching `tel:` destination with a Google forwarding number. During the 2026-08-26 production audit, Chrome displayed `(913) 374-4351` and linked it to `tel:+19133744351`; a fresh session without replacement can continue to show `(913) 427-0674`. Verify the displayed number and `tel:` destination together if this configuration changes.

## Deployment and production verification

Do not change the GHL redirect before the website route is deployed. The required main-site calendar redirect is:

`https://www.turnkeyautomarketing.com/website-call-booked`

After deployment:

1. Open a normal site page with test UTMs and navigate to `/contact` in the same tab.
2. Confirm the iframe uses calendar `wDWczTxA5kEbkEWoqzLC`, works at mobile and desktop widths, and receives only sanitized attribution parameters.
3. Confirm GA4 receives one `booking_calendar_viewed` with `booking_provider=ghl_calendar` and `booking_funnel=main_website`.
4. Confirm the fallback opens the same attributed main-site calendar.
5. Complete one explicitly approved controlled booking and confirm it reaches `/website-call-booked`.
6. Confirm GA4 receives exactly one `appointment_booked` and one `generate_lead`, even after refresh/back navigation inside 30 minutes.
7. Confirm no request for `8Oy4CJqVtuMcEKrylLJE` occurs, including in a main-site session with a GCLID.
8. Separately verify the paid landing-page flow still uses calendar `6tmXrJxmo6AUsMP2ja9d` and that `/google-ads-call-booked` sends its existing GA4 event and one Google Ads conversion.
9. Verify an approved legacy AppointmentCore booking still reaches `/booking-confirmed` and reports `booking_provider=appointmentcore`.
10. After the separate CRM workflows exist, test booking, Zoom, email/SMS, Google Calendar blocking, reschedule, cancellation, contact deduplication, opportunity, tags, and status handling.

Use a clearly identified test contact and a late-September appointment when a real booking is approved. Remove or clearly label the test appointment afterward.

## Known limitations

The website cannot inspect either cross-origin booking application. It cannot reliably infer form start, completion, reschedule, cancellation, or later in-widget failure without a supported provider message or redirect. Confirmed main-site bookings are measured when GHL redirects the browser to `/website-call-booked`; legacy AppointmentCore bookings are measured at `/booking-confirmed`.

GA4 can connect the browser session's acquisition context to the confirmation event. GHL field mapping and later CRM lifecycle automation still require separate configuration and a controlled end-to-end test.

## Rollback

Restore the prior AppointmentCore iframe and embed helper on `/contact`, restore `appointmentcore_calendar_viewed` for that page, and route successful main-site bookings back to `/booking-confirmed`. Do not change the paid landing-page calendar, delete either GHL calendar, delete AppointmentCore, or remove historical tracking data. The new `/website-call-booked` page may remain deployed but unused during rollback.

## Change control

Treat commit `565e1ea3012395c425a8775a2353377c514125b4` as the original baseline. Any future change to a booking provider, calendar ID, confirmation URL, event name, conversion label, GA4 measurement ID, or attribution behavior must update this document in the same change.
