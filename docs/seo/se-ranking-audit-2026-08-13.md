# SE Ranking report audit - August 13, 2026

Source: `httpsturnkeyautomarketing.com-Project-Report_2026_08_13.pdf`, covering August 7-13, 2026.

## Executive read

This is a seven-day keyword position report, not a complete SEO audit. It does not include crawl errors, index coverage, backlinks, search demand, conversions, ranking URLs, or Google Search Console data. It is useful for prioritizing content, but it cannot establish root cause by itself.

The report tracks 133 phrases on U.S. desktop and U.S. mobile, for 266 keyword/search-engine combinations. The project is early in organic visibility:

- 47 tracked keyword/search-engine combinations appeared in the top 100 (18%).
- 34 appeared in the top 30, down 8 from the prior report.
- None appeared in the top 10 or top 3 on the final day.
- Average tracked position was 87, down 2 positions.
- AI mention presence was 0%; AI link presence was 20% on the final day.

The daily tables show substantial volatility. Several terms moved between the teens, lower positions, and out of the top 100 within one week. Treat individual daily losses as signals to investigate, not proof of a penalty or permanent decline.

## The week's most important movement

The headline stats hide the single biggest event in this report: the site's only page-one position was lost.

- `outsourced marketing director auto repair` held position 8 on both desktop and mobile on August 7. It finished at 16 desktop and 22 mobile. That is the entire "top 10: 0, down 2" figure on page one of the report.
- `auto repair marketing director` fell from 14 to 22 on both engines.
- `outsourced marketing for auto repair shops` fell from 26 to 39 desktop and 41 mobile, which is why it occupies two of the five slots in the report's drop table.

The whole outsourced-department and marketing-director cluster moved together. That pattern points at page selection rather than at individual page quality, and it matches the split documented in the improvement plan: `/results` was ranking for `auto repair marketing director` while `/services/vip-marketing-manager` ranked for the outsourced-director phrasing. Before this pass, `/results` contained no internal link to any service page, so Google had no signal that VIP was the intended destination for that intent.

Two other terms behaved the same way at page two: `auto repair marketing services` (18 to out of tracked range) and `car repair marketing agency` (about 20 to out of range) are the other entries in the drop table. Both are agency/company variants, and both reappear at similar positions on other days. That is instability in which URL Google selects, not a ranking collapse.

## Reframing the 18% figure

The 18% "keywords in SERPs" number is not a fair measure of this site. Of the 133 tracked phrases, roughly 100 never appeared in the top 100 on any day of the week, and nearly all of them are SEO, PPC, Google Ads, Facebook ads, website design, lead generation, and branding terms for services Turnkey has not confirmed it sells standalone. The tracker weights those exactly like the terms that matter.

Among the phrases that map to a real Turnkey service or resource, coverage is much better than the headline suggests — most sit between positions 11 and 30. The site's actual problem is not absence from the index. It is that nothing has enough page-level depth, internal linking, or authority to clear the page-one threshold. That argues for deepening existing pages and consolidating intent, not for publishing more pages.

## Report interpretation cautions

- The chart label "Out of index" means the tracker did not find a ranking in its tracked result depth. It does not prove that a page is excluded from Google's index.
- A displayed position of 100 in the drop summary can represent a term that fell beyond the tracked top 100, not a verified rank of exactly 100.
- The same phrase can appear twice in the drop list because desktop and mobile are separate search engines in this project.
- The 0% visibility score is a rank-tracker visibility calculation dominated by the absence of top-10 positions. It does not mean the site received literally zero organic impressions or clicks.
- The report provides neither search volume nor a ranking URL, so it weights low-demand phrases like valuable phrases and cannot reveal which site page Google selected.

## Best near-term opportunities

| Intent cluster | Final observed positions | Why it matters | Recommended target |
| --- | --- | --- | --- |
| Auto repair marketing plan | 11 desktop / 12 mobile | Closest non-brand term to page one | `/resources/auto-repair-marketing-plan` |
| Auto repair marketing consultant | 13 desktop / 16 mobile | Strong commercial intent and an existing matching service | `/services/marketing-consulting` |
| Auto repair marketing company/agency | roughly 18-25 across variants | Core commercial category with page-two visibility | `/` and `/services`, with distinct roles |
| Auto repair shop direct mail | 14 desktop / 15 mobile | Existing service with consistent visibility | `/services/direct-mail` |
| Auto repair marketing strategy | 27 desktop / 39 mobile | Relevant informational topic but more distant and volatile | Marketing-plan resource and consulting page |

## Large gaps that should not be filled with unsupported pages

The report tracks many terms for services Turnkey does not currently claim to provide independently: Google Ads management, website design, broad technical SEO, PPC, lead generation, and Facebook ads. Those terms are mostly outside the top 100. Publishing thin service pages for them would create scope and trust problems. Confirm the actual offer, deliverables, proof, and ownership before adding any standalone page.

## Changes completed from this audit

1. Expanded the auto repair marketing plan resource from a short two-section article into a seven-step guide covering goals, baseline, audience, channels, calendar, measurement, and monthly decisions.
2. Added updated article metadata, dates, related resources, and a descriptive link to marketing consulting.
3. Strengthened the marketing consulting page around the observed consultant and plan intent without changing the service boundary.
4. Added a contextual internal link from marketing consulting back to the plan guide.
5. Fixed the contact page's missing H1, the only failure in the local SEO validator.
6. Updated sitemap modification dates for the pages changed in this pass.

## Changes completed in the second pass

Plan items 4 and 5 (direct-mail cluster and consultant/director cannibalization).

1. Rewrote `/resources/direct-mail-for-repair-shops` from two short sections into a six-part campaign guide covering the list, offer, timing and drop schedule, response tracking, and follow-up, with its own SEO title and description and an updated date.
2. Added a descriptive link from that guide to `/services/direct-mail`, and related links to the marketing-plan guide, ideal-customer profile, and marketing-mistakes posts.
3. Added the reciprocal link from `/services/direct-mail` to the guide. The hardcoded consulting-only link in `src/pages/services/[slug].astro` is now a `supportingResources` map, so the service-to-resource pairing is data rather than a chain of slug conditionals.
4. Retitled `/services/direct-mail` to cover postcard-marketing phrasing, which is tracked separately at positions 32-35 and was absent from the page's metadata.
5. Retitled `/services/vip-marketing-manager` from "VIP Marketing Management" to "Outsourced Marketing Department for Auto Repair Shops" and rewrote its description around marketing-director language, matching the intent that lost page one this week.
6. Added a "What produced these results" section to `/results` linking to VIP and consulting with descriptive anchors. This is the direct fix for the director-cluster split: `/results` previously had no service links at all.
7. Removed an unused `serviceTitle` variable in the service template that computed a page title never rendered.
8. Updated sitemap dates for `/results`, `/services/direct-mail`, `/services/vip-marketing-manager`, and the direct-mail resource.

## Next measurement cycle

- Recheck rankings after Google has had time to crawl and process the changes; do not judge the work on next-day movement.
- Use Google Search Console to compare impressions, clicks, average position, and ranking URL for the plan, consultant, agency/company, and direct-mail clusters.
- Confirm that `/`, `/services`, and `/services/marketing-consulting` are not swapping positions for the same query. If they are, narrow the homepage to the company category, the services hub to the service lineup, and consulting to consultant intent.
- Request indexing for the updated plan and consulting URLs after deployment and confirm the sitemap was fetched successfully.
- Keep a dated annotation for this deployment so ranking changes can be compared with the correct release.
