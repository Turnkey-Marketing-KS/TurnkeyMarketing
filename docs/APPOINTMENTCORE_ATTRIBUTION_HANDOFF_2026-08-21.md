# AppointmentCore Attribution Handoff — August 21, 2026

> **Superseded historical handoff.** Do not use this document to implement or modify the current booking and attribution setup. It describes an earlier design that conflicts with the current funnel boundaries. The canonical reference is [`BOOKING_ATTRIBUTION_SOURCE_OF_TRUTH.md`](./BOOKING_ATTRIBUTION_SOURCE_OF_TRUTH.md).

## Purpose

This document gives the website-project agent the exact state of the main-website → /contact → AppointmentCore → n8n → GoHighLevel attribution work.

The Google Ads landing page is a separate funnel: `/lp/auto-repair-marketing` uses the GHL calendar `6tmXrJxmo6AUsMP2ja9d` and sends booked visitors to `/google-ads-call-booked`. That paid landing-page funnel must use GHL attribution and must not use the AppointmentCore collector, AppointmentCore hidden fields, or AppointmentCore booking events.

The customer experience remains a **single AppointmentCore form**. Do not add a separate form before the calendar.

## Current production status

### Live now

- AppointmentCore booking page `108424` (`New Marketing Consultation`) has 17 hidden, optional attribution fields.
- AppointmentCore URL field mappings populate those hidden fields from `tk_` query parameters.
- The live n8n workflow `O6bVgwYN1xSJD89A` (`AppointmentCore → GHL — Booking Capture`) now:
  - maps all 17 attribution fields into GHL;
  - classifies Google paid traffic from GCLID, GBRAID, WBRAID, or Google paid UTMs;
  - sets paid bookings' GHL source to `Google Ads`;
  - sets blank Lead Source to `Google`;
  - adds `source - google ads` and `appointmentcore-booked` tags;
  - preserves existing first-touch values;
  - leaves normal non-paid AppointmentCore bookings on the existing path.
- The n8n workflow remained active after the update.

### Not live yet

- Website commit `00de3a8` (`Add AppointmentCore attribution tracking`) exists locally on `main` but has **not been pushed to `origin/main`**.
- Therefore, the production website does not yet have the complete v2 attribution collector.
- A direct production check showed the existing site passes raw `gclid` and UTM parameters into the AppointmentCore iframe, but does not yet add the required canonical `tk_` fields and stable `tk_tracking_session_id`.
- Pushing `00de3a8` to `origin/main` is expected to trigger the production website deployment. Do not push until Kyle explicitly authorizes that production deployment.

## Website changes in commit `00de3a8`

The commit deliberately contains only attribution-related changes. Other unfinished design work in the dirty worktree was not staged or committed.

Files in the commit:

- `src/lib/booking-tracking.mjs`
  - Captures GCLID, GBRAID, WBRAID, FBCLID, MSCLKID, and five UTMs.
  - Captures first/latest landing pages and external referrers.
  - Creates and preserves a stable `tk_` tracking session ID.
  - Captures first/latest touch timestamps.
  - Captures best-effort GA4 client and session IDs.
  - Migrates legacy v1 session attribution safely.
  - Uses an in-memory fallback if sessionStorage is blocked.
  - Removes PII-like query keys and email/phone-shaped values.
  - Decorates internal `/contact` links with safe `tk_` parameters.
  - Decorates the existing AppointmentCore iframe with raw campaign parameters plus canonical `tk_`, first-touch, and latest-touch fields.
  - Does not add a customer-facing form.
  - Does not count calendar loads or CTA clicks as completed bookings.
- `src/layouts/BaseLayout.astro`
  - Initializes attribution tracking sitewide.
- `src/pages/booking-confirmed.astro`
  - Emits deduplicated `appointment_booked` and `generate_lead` events.
  - Emits the paid Google Ads booked-call conversion only for verified Google paid attribution.
- `src/pages/google-ads-call-booked.astro`
  - Adds the common booking-event tracking while retaining the page's existing Ads conversion behavior.
- `src/pages/lp/auto-repair-marketing-backup.astro`
  - Removes the unrelated second native form so the flow remains single-form.
- `scripts/booking-tracking.test.mjs`
  - Focused attribution and conversion tests.
- `package.json`
  - Adds `test:tracking`.

## AppointmentCore URL mappings

The following mappings are live:

| URL parameter | AppointmentCore hidden field |
|---|---|
| `tk_gclid` | Attribution Test — GCLID |
| `tk_utm_campaign` | Attribution Test — UTM Campaign |
| `tk_tracking_session_id` | Attribution Test — Tracking Session ID |
| `tk_utm_source` | Attribution — UTM Source |
| `tk_utm_medium` | Attribution — UTM Medium |
| `tk_utm_term` | Attribution — UTM Term |
| `tk_utm_content` | Attribution — UTM Content |
| `tk_gbraid` | Attribution — GBRAID |
| `tk_wbraid` | Attribution — WBRAID |
| `tk_first_landing_page` | Attribution — First Landing Page |
| `tk_latest_landing_page` | Attribution — Latest Landing Page |
| `tk_first_referrer` | Attribution — First Referrer |
| `tk_latest_referrer` | Attribution — Latest Referrer |
| `tk_first_touch_at` | Attribution — First Touch At |
| `tk_latest_touch_at` | Attribution — Latest Touch At |
| `tk_ga_client_id` | Attribution — GA Client ID |
| `tk_ga_session_id` | Attribution — GA Session ID |

All fields are hidden from the public form, optional, and hidden from customer emails.

## Verification evidence

- Focused website tests: **19/19 passed**.
- Website production build: **passed**, 32 pages generated.
- Controlled AppointmentCore booking:
  - Customer-facing time: September 29, 2026, 3:45–4:15 PM CDT.
  - AppointmentCore admin displays September 29, 2026, 4:45–5:15 PM because of its account display timezone.
  - Test name: `Attribution Test Full`.
- Original n8n execution: `25680` — success.
- Post-update replay execution: `25683` — success.
- GHL verification:
  - source equals `Google Ads`;
  - `source - google ads` tag present;
  - `appointmentcore-booked` tag present;
  - all 17 expected attribution fields matched exactly;
  - zero attribution mismatches.

The replay used the same controlled booking and was idempotent; it did not create another AppointmentCore appointment.

## Safe next steps

1. Confirm the local website branch contains commit `00de3a8` and is one commit ahead of `origin/main`.
2. Preserve every unrelated modified or untracked design file in the current worktree.
3. Obtain Kyle's explicit approval to push `00de3a8` to `origin/main` and trigger production deployment.
4. Push the commit and monitor the connected Vercel deployment until it succeeds.
5. After deployment, open a temporary browser tab with a synthetic paid URL, for example:

   ```text
   https://www.turnkeyautomarketing.com/?gclid=CODEX-PROD-CHECK&utm_source=google&utm_medium=cpc&utm_campaign=codex_prod_check
   ```

6. Follow a normal internal `Book a Call` link to `/contact` without completing a booking.
7. Inspect the AppointmentCore iframe URL and confirm it contains at least:
   - `tk_gclid=CODEX-PROD-CHECK`
   - `tk_utm_source=google`
   - `tk_utm_medium=cpc`
   - `tk_utm_campaign=codex_prod_check`
   - a non-empty `tk_tracking_session_id` beginning with `tk_`
8. Close the test tab afterward so its session attribution cannot contaminate later browsing.
9. Do not create another completed appointment merely to verify the website deployment. The late-September end-to-end booking has already passed.

## Important safeguards

- Do not add a pre-calendar identity form.
- Do not expose attribution fields on the AppointmentCore form or in customer emails.
- Do not count calendar views, CTA clicks, or phone-link clicks as completed bookings.
- Do not overwrite unrelated uncommitted website work.
- Do not delete the late-September controlled appointment unless Kyle asks.
- Do not modify n8n workflow `O6bVgwYN1xSJD89A` again without Kyle's explicit approval.
- Do not push `main` or trigger production deployment without Kyle's explicit approval.
