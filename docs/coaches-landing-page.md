# ATI coaches landing page

Route: `/lp/coaches`. The page puts the existing GHL calendar directly after a short introduction. The Schedule a Conversation button jumps to that calendar. A direct calendar link remains available if the embed fails, with a no-JavaScript fallback.

## Calendar configuration

Change `COACHES_CALENDAR_URL` in `src/lib/coaches-tracking.mjs` when a dedicated calendar is ready. Currently it uses `MAIN_WEBSITE_GHL_BOOKING_URL`, matching `/contact`. A different GHL calendar ID is supported. A different provider requires reviewing its attribution and ready-message contract.

## Analytics and consent

The page uses BaseLayout's existing GA4 property, Meta pixel and attribution helper. No consent manager or analytics-consent gate was found in the repository. Existing behavior is retained; no new tracking tag or consent system is installed.

For this route only, GA4's automatic page view is disabled and replaced with one explicitly attributed `page_view`. Meta keeps its existing single PageView. No second Meta custom page-view event is sent.

GA4 events:

- `page_view`: once per page load.
- `schedule_click`: `cta_location` is `hero` or `calendar_fallback`. Supports keyboard, primary click, and middle click.
- `scheduler_open`: once per page load, after a recognized GHL ready/height message from the exact iframe window and origin, and the calendar intersects the viewport. It means the inline scheduler is visible and ready, not a completed booking. An outbound fallback click does not count as an open.

Events include `page_id=ati_coaches`, `originating_page=ati_coaches`, and the existing sanitized campaign, first/latest landing and referrer context. They never read booking form fields or forward provider payloads. URLs are sanitized using the existing helper before being included in page events. Existing sitewide third-party tag behavior is unchanged.

## Attribution handoff

The embedded calendar and direct fallback receive the existing sanitized raw UTM/click-ID parameters and `tk_*` attribution fields. The separate `tk_originating_page=ati_coaches` marker identifies the booking page without relabeling acquisition. Incoming newsletter, organic, paid, referral, and direct sources remain distinct. The existing GHL Source field mapping continues to describe acquisition.

GHL documents UTMs as attribution inputs: https://help.gohighlevel.com/support/solutions/articles/48001219997-understanding-attribution-source

Passing a custom query key does not prove it is saved in GHL. Account-side persistence of `tk_*` custom fields has not been verified by this work.

## Remaining setup for verified bookings

No new completed-booking or lead conversion event is emitted by this page. Do not use a CTA click, iframe load, ready message, or an unverified thank-you page visit as a completed booking.

1. Map `tk_originating_page` and the existing `tk_*` attribution fields to supported hidden calendar/form fields in GHL. Preserve the booking's page marker on the appointment/workflow record, not only on a mutable contact field.
2. Configure an authenticated appointment-created webhook or provider-verified completion callback. Validate the calendar and actual appointment, deduplicate by appointment ID, and forward only non-PII attribution to the existing conversion pipeline. Do not create a second conversion alongside an existing GHL workflow.
3. Verify a controlled end-to-end booking with an approved test contact. Confirm UTMs, originating page, and a single conversion in GA4. A public confirmation URL alone is insufficient proof.
4. Register `page_id`, `originating_page`, and `cta_location` as GA4 custom dimensions if needed for reporting.

The existing site's confirmation routes remain unchanged and should not be treated as verified coach-booking attribution without this setup.

## Verification

- Production build passes.
- 31 tracking tests pass in the isolated commit contents, including campaign handoff, direct traffic, PII query removal, CTA location, duplicate initialization, and rejected foreign/spoofed scheduler messages.
- Headless Chrome at 1440px and 390px: live calendar rendered with no horizontal page overflow; mobile date and time selection reached the booking details form.
- Browser dataLayer: one page view, one scheduler open, and one click per interaction. Analytics network delivery was blocked during testing to avoid polluting reporting; GA4 ingestion was not verified.
- Regular calendar ID and decorated embed/fallback URLs verified. No live booking submitted. The regular calendar retains its existing owner-oriented form (including required shop name); coach-specific field wording requires a GHL account change.
- Browser CLI was unavailable, so verification used the bundled Playwright library with installed Chrome.

Design revision: removed supporting content sections and repeated closing CTA. The supplied soft blue photograph is used as the page background with a navy overlay and white text. The embedded GHL calendar retains its provider-controlled styling.
