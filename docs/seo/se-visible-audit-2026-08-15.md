# SE Visible AI visibility audit — August 15, 2026

Project audited: `https://hometownkc.agency/`  
Primary brand: Hometown Marketing Agency  
SE Visible project ID: `01a00250-f665-72d4-b215-933c1269b48d`  
Completed check: August 14, 2026 (result collection continued into August 15)  
Region: United States  

## Executive read

Hometown has a small but genuine foothold in AI answers. The primary brand appeared in 3 of 80 returned model-run records and in 3 of the 77 responses used by SE Visible's aggregate metrics. Those appearances came from ChatGPT twice and Google AI Overview once. The strongest result was position 1 for the high-intent prompt about affordable custom websites starting around $800.

The site itself performs better as a source than the brand performs as a recommendation. `hometownkc.agency` was cited in eight answers, with nine URL citation occurrences across three pages, but only three of those answers named Hometown. That is the clearest current opportunity: convert existing source authority into explicit brand attribution and recommendations.

The dashboard data is materially affected by entity-resolution errors. SE Visible assigns Hometown's own domain to the tracked competitor entity `web design`, reports that none of Hometown's cited pages mention the primary brand, and splits related Hometown and competitor names into several independent entities. Fix the project configuration before using its competitor ranks or source mention-rate fields for executive reporting.

There is only one completed check date, so this audit is a baseline, not a trend analysis.

## Data inventory

| Dataset | Retrieved |
| --- | ---: |
| Projects | 1 |
| Topics with prompts | 5 |
| Prompts | 20 |
| AI engines | 4 |
| Model-run records | 80 |
| Responses in aggregate metric denominator | 77 |
| Detected brand entities | 183 |
| Brand mentions across response parsing | 496 |
| Cited source domains | 391 |
| Cited source URLs in source inventory | 638 |
| URL citation occurrences in detailed results | 833 |
| Unique URLs in detailed results | 652 |

The project runs daily with one answer per prompt per model. It tracks ChatGPT, Google AI Mode, Google Gemini, and Google AI Overview in the U.S.

The SE Visible Core trial began August 14 and ends August 24, 2026. It does not auto-renew. Current limits are fully used: 1/1 project, 20/20 prompts, and 1/1 user seat.

## Primary-brand baseline

SE Visible's official aggregate row for Hometown Marketing Agency reports:

| Metric | Value |
| --- | ---: |
| Visibility score | 2 |
| Overall brand rank | 39 |
| Brand mentions | 3 |
| Average position when mentioned | 7.0 |
| Share of voice | 1% |
| Sentiment score | 14 |
| Positive percentage | 14.29% |
| Neutral percentage | 85.71% |
| Negative percentage | 0% |

The three primary-brand result rows were two neutral responses and one positive response. There were no negative Hometown responses.

## Performance by AI engine

| Engine | Runs | Hometown mentions | Answers with citations | Unique cited URLs | Avg. URLs per run |
| --- | ---: | ---: | ---: | ---: | ---: |
| ChatGPT | 20 | 2 | 20 | 227 | 16.15 |
| Google AI Mode | 20 | 0 | 19 | 352 | 19.15 |
| Google AI Overview | 20 | 1 | 19 | 111 | 6.35 |
| Google Gemini | 20 | 0 | 0 | 0 | 0 |

ChatGPT is currently the main discovery channel. It supplied two of the three brand appearances and eight of the site's nine URL citation occurrences. Google AI Overview supplied the strongest single recommendation. Gemini and AI Mode did not mention or cite Hometown in this baseline.

One Google AI Overview result was an empty response. The API still returned 80 result records, while aggregate metrics use a denominator of 77. One missing/empty answer is directly observable; the remaining two-response difference is not explained by the returned data.

## The three winning prompts

| Prompt | Engine | Position | Sentiment | Hometown citation |
| --- | --- | ---: | --- | --- |
| Which small business marketing consultants offer affordable custom website design starting around $800? | Google AI Overview | 1 | Neutral | `/pricing` |
| Which digital marketing agencies specialize in affordable websites and SEO packages? | ChatGPT | 8 | Positive | `/locations/overland-park-ks` |
| How can a local marketing agency help improve my website design and SEO? | ChatGPT | 12 | Neutral | `/locations/overland-park-ks` |

The raw provider payloads confirm all three parsed mentions. The $800 offer is the clearest differentiator: it produced Hometown's only first-place result and its only Google AI Overview mention.

## Topic performance

| Topic | Prompts | Mentions | Visibility | Avg. position | Topic SOV |
| --- | ---: | ---: | ---: | ---: | ---: |
| Small Business Marketing Consultant | 4 | 1 | 6 | 1 | 1% |
| Digital Marketing Agency | 4 | 1 | 4 | 8 | 1% |
| Web Design Services | 4 | 1 | 1 | 12 | 1% |
| Search Engine Optimization Services | 4 | 0 | 0 | 0 | 0% |
| Online Advertising Services | 4 | 0 | 0 | 0 | 0% |

Seventeen prompts returned no primary-brand mention. Hometown is entirely absent from the SEO and online-advertising topic groups. Broad informational prompts tend to surface platforms such as Google, Google Business Profile, Google Ads, Facebook, and Yelp rather than agencies; those prompts are useful for market context but dilute a 20-prompt scorecard intended to measure buying-stage brand visibility.

## Owned-domain citation performance

Three Hometown pages appeared in the source inventory:

| Page | Answers citing it | Prompt reach | Coverage |
| --- | ---: | ---: | ---: |
| Homepage | 3 | 3 | 3.9% |
| `/pricing` | 3 | 2 | 3.9% |
| `/locations/overland-park-ks` | 3 | 3 | 3.9% |

Across detailed results, these pages generated nine citation occurrences in eight answers:

- ChatGPT: eight citation occurrences across seven answers.
- Google AI Overview: one citation occurrence in one answer.
- Google AI Mode: none.
- Google Gemini: none.

Only three of the eight citing answers also named Hometown. Five answers used Hometown content without converting it into a brand mention. This source-to-brand attribution gap is more actionable than the raw rank alone.

## Competitor and entity landscape

The cleanest agency-level leaders in the official brand table are:

| Brand entity | Visibility | Mentions | Avg. position | Rank |
| --- | ---: | ---: | ---: | ---: |
| Lifted Logic | 14 | 19 | 5.7 | 4 |
| KC Web Specialists, LLC | 13 | 12 | 2.8 | 5 |
| KC Web Specialists | 11 | 11 | 5.5 | 6 |
| KC Web Specialists, LLC. | 7 | 7 | 4.1 | 10 |
| Demand Stack | 5 | 6 | 5.0 | 14 |
| Demand Stack Web Design | 5 | 7 | 6.3 | 15 |
| Hometown Marketing Agency | 2 | 3 | 7.0 | 39 |

These are not clean, deduplicated competitor totals. KC Web Specialists and Demand Stack are each split into multiple entities. Thrive is similarly divided between `Thrive Internet Marketing Agency` and `Thrive Agency`. The rank table should not be used as a true company-level leaderboard until aliases are consolidated.

## Measurement defects to fix first

### 1. Hometown's own domain is assigned to a competitor entity

Every Hometown source row is associated with brand ID `270111`, the manually tracked competitor named `web design` with domain `https://kcwebdesigner.com`. It is not associated with the primary Hometown brand ID `23820681`.

This explains why the source inventory reports:

- `my_brand_mentions = 0` for all three Hometown pages;
- a 0% own-brand source mention rate;
- a competitor attached to `hometownkc.agency`.

Those fields conflict with the raw response data and the visible Hometown page titles. Treat them as invalid until SE Visible remaps the domain.

### 2. Hometown aliases are empty

The primary brand currently has no aliases. The detector separately created `Hometown Marketing` and `HomeTown` entities. The exact alias `Hometown Marketing` should be reviewed and added. Avoid adding the overly broad `HomeTown` alias unless every detected instance is verified as this company.

### 3. Competitor configuration is not entity-safe

The tracked competitor names are `Thrive`, `web design`, `Moss Marketing`, `KC Marketing`, and `KC Web`. The generic `web design` label is especially error-prone. None of the manually tracked competitor IDs received a direct row in the aggregate brand metrics, while alternate detected entities did. Track full, exact business names and domains, then add their validated variants as aliases.

### 4. API datasets have denominator and normalization differences

- Result detail returned 80 records; aggregate brand and source metrics use 77 responses.
- Detailed answers contain 652 unique URL strings; the normalized source inventory contains 638 URL rows.
- The source parser says no Hometown page mentions the brand, while the raw provider responses explicitly mention Hometown three times.

These differences do not invalidate the raw answer evidence, but they do mean executive dashboards should include a data-quality note.

## Source landscape

The most frequently cited domains were:

| Domain | AI answers | Prompt reach | Coverage | Pages |
| --- | ---: | ---: | ---: | ---: |
| expertise.com | 14 | 12 | 18.2% | 12 |
| kcwebspecialists.com | 14 | 11 | 18.2% | 15 |
| thriveagency.com | 13 | 10 | 16.9% | 9 |
| reddit.com | 11 | 9 | 14.3% | 11 |
| youtube.com | 10 | 8 | 13.0% | 22 |
| clutch.co | 10 | 7 | 13.0% | 7 |
| konza-digital.com | 10 | 10 | 13.0% | 8 |
| liftedlogic.com | 8 | 7 | 10.4% | 13 |
| hometownkc.agency | 8 | 7 | 10.4% | 3 |
| demandstack.io | 8 | 6 | 10.4% | 2 |

Hometown is already tied for eighth by answer coverage despite having only three cited pages. The gap is less about getting crawled and more about being named and recommended when those pages are used.

## Highest-priority third-party opportunities

SE Visible's gap scoring puts these pages at the top because they are repeatedly cited and mention competitors but not Hometown:

| Source page | Gap score | AI answers | Coverage |
| --- | ---: | ---: | ---: |
| Thrive Kansas City digital marketing agency page | 14 | 7 | 9.1% |
| Expertise: Overland Park SEO agencies | 14 | 7 | 9.1% |
| KC Web Specialists: Overland Park web design/SEO | 12 | 6 | 7.8% |
| Clutch: Kansas City digital marketing agencies | 10 | 5 | 6.5% |
| Expertise: Overland Park digital marketing agencies | 8 | 8 | 10.4% |
| Expertise: Overland Park PPC agencies | 8 | 4 | 5.2% |
| Overland Park Chamber member page for KC Web Specialists | 8 | 4 | 5.2% |

Competitor-owned pages are useful for content benchmarking but are not realistic outreach targets. The actionable earned-media targets are Expertise, Clutch, Semrush's agency directory, local chambers, credible local business directories, and independent roundups that already appear in this source graph.

## Prioritized action plan

### P0 — repair measurement before making scorecard decisions

1. Ask SE Visible support to remap `hometownkc.agency` from brand ID `270111` to the primary Hometown brand.
2. Add the validated alias `Hometown Marketing` to the primary brand. Review `Hometown KC` only if it is used publicly. Do not use a broad `HomeTown` alias without checking its occurrences.
3. Replace generic competitor titles with exact legal/market-facing names and correct domains.
4. Consolidate KC Web Specialists, Demand Stack, and Thrive variants through aliases.
5. Preserve this baseline, then compare the first clean check after the remapping rather than comparing dirty and clean scores as if they were equivalent.

### P1 — reinforce the pages already earning citations

1. Keep the $800 website offer explicit and stable on `/pricing`; it is the only proven first-place AI recommendation hook.
2. Make the connection between that offer and the full brand name unmistakable in the page title, H1, opening copy, organization markup, and offer/service structured data.
3. Strengthen `/locations/overland-park-ks` with specific local proof, named services, process details, testimonials or case evidence, FAQs, and consistent Hometown entity references.
4. Improve the homepage's brand-to-service statements. It is cited in three answers but did not generate a brand mention in any of them.
5. Make the three cited pages link clearly to relevant Kansas City/Overland Park web-design, SEO, paid-media, and consulting service pages.

### P1 — close the third-party authority gap

1. Audit and improve Hometown's listings on Expertise, Clutch, Semrush's agency directory, and relevant Kansas City/Overland Park chambers.
2. Seek inclusion in the specific category pages already cited by multiple engines, using accurate service, location, pricing, and proof information.
3. Build a consistent public entity profile: exact name, domain, location, service categories, logo, description, and social profiles across every listing.
4. Prioritize independent local/business sources over competitor-owned pages.

### P2 — broaden demand coverage without losing the proven offer

1. Create or deepen buyer-focused pages for Kansas City digital marketing agency, web design, SEO, online advertising, and small-business marketing consulting intents.
2. Publish decision-useful evidence: exact scopes, starting prices, inclusions/exclusions, timelines, local examples, and measurable outcomes.
3. Build content around the source patterns AI engines favor: local comparisons, service-cost guides, selection criteria, and location-specific service pages.
4. Keep the $800 angle prominent while demonstrating that Hometown also offers ongoing SEO and advertising. The current AI footprint over-associates the brand with affordable websites and barely associates it with SEO or paid media.

### P2 — improve the 20-prompt measurement set

Because the trial is capped at 20 prompts, every slot should answer a useful business question. Keep a blend of:

- direct recommendation prompts;
- service-plus-location prompts;
- price/value prompts;
- comparison and selection prompts;
- a smaller number of informational prompts for category context.

Several current prompts ask generally how SEO or advertising works. Those naturally rank Google products and generic tools, not agencies. Replace the least decision-oriented prompts after exporting this baseline.

## What not to conclude

- A visibility score of 2 does not mean the domain has no AI authority; the domain is already cited in eight answers.
- A 0% source mention rate is not credible in this snapshot because the domain-to-brand mapping is wrong.
- Rank 39 is not a clean company-level market rank because competitor and Hometown entities are split.
- One check cannot show improvement, decline, or seasonality.
- SE Visible data is a sampled prompt/model dataset, not a census of all AI answers.

## Repository scope note

This workspace builds `www.turnkeyautomarketing.com`, while the SE Visible project audits `hometownkc.agency`. No site implementation changes were made from this report. Apply the recommendations in the Hometown site's actual codebase or CMS after correcting the SE Visible entity configuration.

## API coverage used

The audit used read-only calls for subscription details, project details, tracked and mentioned brands, brand metrics, prompt/topic metrics, all prompt result lists, all 80 result-detail records, source domains, source URLs, and the three raw provider dumps containing Hometown mentions. The API key was not written into the report or exposed in command output.

Official reference:

- https://seranking.com/api/se-visible/
- https://seranking.com/api/se-visible/projects/
- https://seranking.com/api/se-visible/brands/
- https://seranking.com/api/se-visible/prompts/
- https://seranking.com/api/se-visible/sources/
