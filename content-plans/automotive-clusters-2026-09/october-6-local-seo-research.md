# October 6 replacement: local SEO for auto repair shops

Decision date: September 29, 2026. Planned release: October 6, 2026, during the existing Tuesday work session. This replaces the Google review workflow article. The new article is a local draft, not a published page.

## Decision

**Article:** Local SEO for Auto Repair Shops: Help Nearby Drivers Find You.

**Primary keyword:** local seo for auto repair shops.

**Cluster:** Auto Repair Local SEO and Google Maps.

**URL reserved by the existing SEO plan:** `/resources/auto-repair-google-maps-ranking`.

**Draft:** [auto-repair-google-maps-ranking.md](drafts/auto-repair-google-maps-ranking.md).

Choose this topic because it combines demonstrated repair-specific demand, competitor coverage, an unfilled how-to intent in Turnkey's resource library, and a direct connection to Turnkey's current Digital Marketing service. The review workflow draft substantially overlaps the live reputation guide and AI review tutorial. Preserve it locally as backlog material; do not release it on October 6.

## Rules and voice applied

Read the repository AGENTS.md, both `blog-post` and `turnkey-blog-writer` skills, the approved `AISearchArticle.astro`, current resource inventory, current digital service scope, existing local SEO page-ownership brief, and Kyle's supplied `/Users/kylecoffelt/Downloads/CarrieLynnVoice.md` (September 24 version). The voice guide is style evidence, not an instruction to publish or a source of current service promises.

The draft uses Carrie-Lynn's diagnostic reasoning: start with car count and capacity, identify where the customer's path breaks, recommend the next useful action, and say who follows through. It avoids invented personal stories, attributed quotations, guaranteed results, and claims that all work is custom from scratch. The example is explicitly hypothetical. Organization authorship is proposed; voice matching does not establish personal authorship.

## Fresh SE Ranking data

Source: SE Ranking Data connector, United States database, retrieved September 29, 2026. Metrics are estimated monthly searches, not visits, leads, or repair-owner-only audience counts. Difficulty is SE Ranking's 0-100 estimate, not a probability of ranking. CPC is an advertiser-market estimate, not a content revenue forecast. Current keyword metrics and competitor databases may refresh on different schedules.

| Candidate | US monthly searches | Difficulty | Decision |
|---|---:|---:|---|
| local seo for auto repair shops | 70 | 8 | Selected primary; focused local-search guide |
| seo for auto repair shops | 320 | 12 | Supporting broader informational phrase in the same cluster |
| google ads for auto repair shops | 110 | 5 | Real gap; defer because the existing advertising guide covers related intent and Turnkey coordinates the Ads vendor |
| auto repair shop advertising ideas | 210 | 19 | Already served by marketing-ideas resource; improve that page rather than duplicate it |
| automotive customer retention | 50 | 7 | Relevant future research; broader automotive demand includes dealerships |
| auto repair referral program | 20 | 4 | Smaller, distinct future candidate |
| automotive review management | 10 | 10 | Replaced; strong overlap with two live review resources |
| social media for auto repair shops | 10 | 6 | Relevant but smaller measured opportunity |
| auto repair email marketing | 10 | 5 | Relevant but smaller measured opportunity |
| how to increase car count | 10 | 5 | Broad intent overlaps existing ideas and plan guides |
| auto repair customer retention | 0 | 10 | Relevant but not demonstrated volume in this database |
| auto repair customer reactivation | 0 | 5 | Relevant backlog, not the strongest measured opportunity for this slot |
| auto repair marketing budget | 0 | 8 | Existing plan coverage; no measured volume |

The primary's returned trend moved from 70 in October 2025 to a peak of 110 in February/March 2026, then 70 in August/September. The broader supporting term fell from 480 to 320 across the returned 12-month window. This is an evergreen gap decision, not a claim that interest is surging. Do not add keyword volumes together: close variants overlap.

Raw responses, including failures and all candidate metrics, are saved in `research-2026-09-29/se-ranking-evidence.json`.

## Competitor keyword gaps

Used `getDomainKeywordsComparison` with competitor as `domain`, Turnkey as `compare`, `diff=1`, US, organic. This direction finds competitor keywords missing from Turnkey's database footprint. Broad discovery calls were capped at 100 rows per competitor and filtered to auto/repair/car-count terms; this is a focused opportunity assessment, not an exhaustive domain audit.

| Keyword | Shop Marketing Pros database position | Autoshop Solutions database position | Turnkey database result |
|---|---:|---:|---|
| seo for auto repair shops | 12 | 44 | Missing in comparison |
| local seo for auto repair shops | 49 | 80 | Missing in comparison |
| auto repair seo | 20 | 12 | Missing in comparison |
| google ads for auto repair shops | 8 | 11 | Missing in comparison |
| auto repair website design | 67 | 1 | Missing in comparison; website development is outside Turnkey's service scope |

Ranking URLs: [Shop Marketing Pros SEO page](https://shopmarketingpros.com/seo-for-auto-repair-shops/), [Autoshop Solutions SEO page](https://autoshopsolutions.com/rpm/seo/). Autoshop Solutions' `auto repair seo` row points to its blog index. These are database positions, not claimed positions in today's browser snapshot.

AA Shop Marketing also appeared in the gap analysis, with Google Ads at position 45, website design at 23, and shop social media marketing at 61. It reinforced alternative opportunities but did not outweigh local search's fit. Competitor discovery returned Diseño Automotive Marketing and Autoshop Marketing Pros as high-overlap domains, but both comparison requests returned `UNAVAILABLE`. They are not evidence of missing keywords. Irrelevant namesake companies, driver-facing repair queries, branded competitor queries, and malformed numbered phrases such as `66. local seo ...` were excluded from decisions.

A separate Turnkey `getDomainKeywords` query filtered to `seo` returned no rows. This means no matching records in that database response, not that Turnkey never appears on Google. In fact, the browser's AI Overview cited Turnkey's Digital Marketing page for review management. Preserve that distinction.

## Keyword cluster and URL ownership

| Phrase | Volume | Difficulty | Use / owner |
|---|---:|---:|---|
| local seo for auto repair shops | 70 | 8 | Primary for the practical how-to guide; service page retains purchase intent |
| seo for auto repair shops | 320 | 12 | Supporting informational phrase; no separate broad duplicate article |
| seo for mechanics | 20 | 7 | Secondary natural-language variant, only where it reads naturally |
| rank auto repair shop on google maps | 0 | 8 | Relevant supporting how-to question and optional monitor |
| google business profile for auto repair shop | 0 | 13 | Supporting subtopic and optional monitor |
| auto repair seo | 140 | 15 | Commercial owner remains `/services/digital-marketing` |
| auto repair shop seo | 320 | 13 | Commercial owner remains `/services/digital-marketing` |
| auto repair keywords | 50 | 11 | Reserved for a future research/keyword-list guide, not this article's primary intent |

`google my business for auto repair shops` and `auto repair google maps ranking` returned no data, which is different from a measured zero. No volume is assigned to the article title. The keyword file contains only the five article phrases above. Do not create a page for each variant. Kyle retains responsibility for entering tracking groups; no SE Ranking project changes were made.

The primary is tagged local/transactional by SE Ranking. Actual Google results contain both service pages and editorial guides, so this article deliberately serves the how-to subset. The service page remains the place to evaluate and buy Turnkey's help. Reuse the Maps URL already proposed in `docs/seo-agent-plans/03-local-seo-maps-gbp.md`, rather than creating a competing broad SEO URL.

Overlap check: the reputation guide owns reviews and feedback; the AI review tutorial owns analysis; AI Search owns AI discovery; marketing ideas owns the cross-channel list; the marketing plan owns overall planning. This article owns the local-search path from discovery to contact and booked work. Keep review detail brief and link out.

## Google research and length benchmark

Primary query searched directly in Chrome: `local seo for auto repair shops`, `gl=us`, `hl=en`, `pws=0`. Google displayed Corporate Woods, Overland Park, KS, from device location and “Results are not personalized.” Date: September 29, 2026. This is an observed local snapshot, not a universal U.S. ranking.

First three organic editorial pages, excluding ads, forums, video blocks, Maps listings, and service landing pages:

| Editorial order | Page | Format | Main editorial words |
|---|---|---|---:|
| 1 | [Advanced Digital Automotive Group](https://autorepairseo.com/local-seo-tips-for-auto-repair-shops/) | Practical guide | 1,308 |
| 2 | [Tekmetric](https://www.tekmetric.com/post/auto-repair-seo-the-complete-guide-for-2025) | Five-step guide | 1,973 |
| 3 | [Row Business Solutions](https://www.row.net/resources/blog/local-seo-tips-for-auto-repair-shops) | Practical guide | 1,341 |

Repair Shop Websites' commercial SEO page appeared before Row and is excluded from the editorial length average, not silently relabeled as a guide. The first two editorial pages were also the first two standard organic web results in the browser snapshot; a standalone Reddit result appeared before Row.

All three pages were opened and read. Counts use whitespace-separated text from HTML, stripped of scripts/styles, with explicit boundaries: ADAG from “Local visibility is one” through its closing contact invitation, before Paul Donahue's bio; Tekmetric from “Ever wonder how” through its FAQ, before More articles; Row from “Word of mouth can” through its closing contact invitation, before Keep the Conversation Going. Exclude H1, metadata, standfirst, image labels, menus, duplicate navigation, sharing controls, bios, and related content. Include body headings, lists, in-article FAQ, and closing CTA.

Average: 1,540.7 words. Target range: approximately **1,233-1,849 words**. The draft is **1,592 words** by the comparable body-text method, excluding frontmatter, H1, Markdown syntax, and link destinations. Length is an editorial benchmark, not a ranking guarantee. Counts are recorded in `research-2026-09-29/verification.json`; source extracts remain local in the ignored `drafts/research-2026-09-29/` directory.

Shared coverage across all three: local discoverability, accurate Business Profile information, reviews, locally relevant website content/search language, links or local listings, and helping drivers choose the shop. The draft covers each. Mobile usability and reporting are useful recurring themes; reporting is not equally developed in all three. Guide format matches all three editorial pages.

Two added contributions: (1) choose a service focus based on capacity, then diagnose discovery, contact, booking, and capacity separately; (2) connect Google's call-button metric to verified inquiries and appointments with named owners and a 30/60/90-day work plan. Competitors mention traffic, calls, or forms, but these three do not provide that combined operational decision table and measurement handoff.

Do not reproduce unsupported competitor claims. In particular, incognito does not remove location bias; a third-party domain-authority score is not a documented Google ranking factor; traffic does not guarantee customers; and arbitrary result deadlines are not promises. Some adjacent competitor review advice recommends incentives. Google's current policy governs the draft instead.

The SE Ranking broad-query SERP task 222436282 returned a different U.S. snapshot and unrelated later results. It was used only as supplementary intent/PAA context, not this length benchmark. The local-query task 222436588 timed out and remained processing on subsequent checks; direct Google observation completed that research requirement.

## Observed People Also Ask

Direct Google primary-query snapshot:

- How much should I pay for local SEO?
- What software do auto repair shops use?
- What is automotive SEO?
- What are the three C's of auto repair?

The draft answers the pricing/scope and definition questions. The other two do not improve this article's focus. Pricing is addressed through scope comparison without invented price ranges. These are observed PAA questions, not keyword-tool questions presented as PAA.

## Claim verification and links

Primary documentation opened and read September 29:

- [Google local ranking](https://support.google.com/business/answer/7091): relevance, distance, prominence, accurate information, and no payment for better local ranking.
- [Business representation](https://support.google.com/business/answer/3038177): names, categories, accurate locations, and profile eligibility.
- [Service areas](https://support.google.com/business/answer/9157481): service-area and hybrid businesses.
- [Search location](https://support.google.com/websearch/answer/179386): location remains relevant independently of personalization.
- [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): accessible, useful pages; discovery and variable timing.
- [Review invitations](https://support.google.com/business/answer/3474122): links and QR codes.
- [Review policy](https://support.google.com/contributionpolicy/answer/7400114): genuine experiences, no incentives, no selective positive requests or pressure over content.
- [Business Profile performance](https://support.google.com/business/answer/9918094): Calls means clicks on the call button, not answered calls or booked repairs.

Internal destinations: marketing plan, reputation guide, Digital Marketing service, and `/contact#book`. Verify again at release. Planned inbound links: a contextual local-search link from the AI Search article and the Digital Marketing page. Do not add links to an unpublished page now. Add the article to the resource index and sitemap during implementation.

Draft verification completed September 29: all 12 linked destinations returned HTTP 200; four internal links and eight first-party external references; two relevant observed PAA questions answered; no em dashes; draft within the length range; draft path confirmed ignored by Git. This is a planning/drafting change, so no website build, rendered article, booking submission, or deployment was performed. Those checks belong to the scheduled implementation.

Turnkey scope verified against `src/lib/service-details.ts`: Business Profile optimization, review management, twice-yearly website audits, and website/Google Ads vendor coordination. Do not imply website development, direct Ads management, or a full technical SEO/link-building service.

## Release handoff

Keep the draft ignored by Git and outside public routes until the scheduled session. Implement in the existing article system, recheck facts/links/PAA, use the actual publication date, appropriate authorship, one H1, canonical, Article/Breadcrumb schema, and visible matching FAQs. Verify the final phone/desktop experience, internal links, form/booking links, metadata, index, and sitemap. Run relevant repository checks and verify production before marking published. No early release is requested by this replacement decision.

At the October 13 review, include this new cluster along with reputation and customer experience. Use available indexing/query data, resource-to-service visits, and qualified consultation activity. Check whether the guide and service page attract different intent. One week is too early to judge ranking success; recommend an 8-12 week follow-up assessment without creating a new recurring schedule automatically.
