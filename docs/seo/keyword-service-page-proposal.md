# Keyword-named service page proposal

## Recommended offering decisions

The current site supports one clear standalone candidate and four offers that need a business decision before they become separate pages.

| Proposed URL | Current evidence | Recommendation before publishing |
|---|---|---|
| `/services/seo` | Digital Marketing includes Google review management, Google Business Profile optimization, semi-annual website audits, and vendor coordination. | Potential standalone offer if Turnkey will sell this local-visibility package separately. Position it specifically as local SEO; do not imply technical SEO, content programs, or link building without confirming those deliverables. |
| `/services/google-ads` | Digital Marketing says Turnkey coordinates a client's Google Ads vendor. DirectTrack runs email, streaming, display, and geofencing, not search ads. | Do not publish as a standalone service unless Turnkey confirms it directly manages Google Ads. If the offer remains vendor coordination, keep it as a section of Digital Marketing. |
| `/services/google-business-profile` | Digital Marketing includes profile optimization; Social Media Marketing includes ongoing GBP posts. | Viable as a standalone page only if profile setup/optimization and ongoing management can be purchased independently. Otherwise, create a substantial section on Digital Marketing and link to it with descriptive anchor text. |
| `/services/websites` | Digital Marketing includes semi-annual website audits and website-vendor coordination. Its FAQ explicitly says, “This isn't website building.” | Do not use a `/websites` service URL unless Turnkey begins offering website design or development. For the current offer, a narrower future resource or service section about website audits would be more accurate. |
| `/services/reputation-management` | Digital Marketing manages Google reviews; Social Media Marketing includes comment and review responses, including negative reviews. | Potential standalone offer if Turnkey sells the full ask, monitoring, and response process independently. Define which team owns each deliverable so this page does not overlap both existing services. |

## URL and title-tag plan

Use the proposed URLs only for confirmed standalone offers. Suggested title tags are intentionally distinct and under 65 characters:

- `/services/seo` — `Local SEO for Auto Repair Shops | Turnkey Marketing`
- `/services/google-ads` — `Google Ads for Auto Repair Shops | Turnkey Marketing`
- `/services/google-business-profile` — `Google Business Profile for Auto Repair Shops | Turnkey`
- `/services/websites` — `Auto Repair Shop Websites | Turnkey Marketing`
- `/services/reputation-management` — `Reputation Management for Auto Repair Shops | Turnkey`

If an offering is only a component, do not create a thin service page merely to claim the keyword. Keep the existing service URL, add a clearly headed section, and link directly to that section.

## Reuse and split plan

The reusable source material is concentrated in `src/lib/service-details.ts`:

- Local SEO: reuse the Digital Marketing hero premise, local-visibility pains, GBP optimization, review management, website audit, three-step process, and GBP FAQ. Rewrite the package boundary so the new page has a distinct purpose.
- Google Ads: the only reusable material is vendor coordination and the DirectTrack explanation that search captures existing demand. New standalone-service copy would be required.
- Google Business Profile: split profile optimization from Digital Marketing and GBP posting from Social Media Marketing. State whether the service includes setup, categories, services, photos, posts, review work, and reporting.
- Websites: reuse only the semi-annual audit and vendor-coordination language. Nearly all page content would be new, and the current “not website building” promise would need to change only if the actual offer changes.
- Reputation management: combine the review ask-and-respond process from Digital Marketing with comment and negative-review response from Social Media Marketing. Clarify the handoff between those teams first.

## Internal linking and cannibalization

`/services/digital-marketing` is currently the broad page for Google, reviews, profile work, website audits, and ads coordination. Publishing several close variants without narrowing it would make the pages compete for the same searches.

If standalone pages are approved, keep Digital Marketing as the overview and coordination service. Give each new page one narrow intent and link between them using descriptive anchors such as “local SEO,” “Google Business Profile management,” and “reputation management.” Update the services hub, relevant FAQs, and related-service modules to link to the most specific page. Avoid repeating the same hero promise, title wording, description, FAQ answers, and testimonial across siblings. If the offers are not standalone, strengthen unique sections on Digital Marketing instead of adding URLs.

## Human-supplied copy and proof required

For every approved page, a Turnkey subject-matter owner needs to provide:

1. Confirmation that the service is sold independently, who it is for, what it excludes, and how it relates to Digital Marketing, Social Media Marketing, and DirectTrack.
2. The exact deliverables, service cadence, onboarding steps, reporting method, client responsibilities, vendor responsibilities, and any minimum term or pricing language that may be published.
3. Three truthful hero proof points or stats with definitions and timeframes. If no publishable numbers exist, approve non-numeric proof points instead.
4. One real, approved client testimonial for that specific service, including the client's name, shop, and permission to publish.
5. Three owner pains, the delivery process, positioning copy, and four approved FAQ answers covering scope, timing, measurement, and common objections.
6. Any verified case-study evidence, screenshots, or before/after results that can support the page without reusing proof in a misleading context.

No page should be drafted from assumptions about service scope or filled with invented performance claims.
