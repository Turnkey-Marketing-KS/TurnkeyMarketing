# Turnkey shared case-study program

This workflow turns an approved client result into three coordinated assets:

1. A full Turnkey case study under `/results/[slug]`.
2. A genuinely shorter shop article linking to the Turnkey study.
3. A vendor-specific article, when a named vendor materially participated, linking to the same Turnkey study.

Nothing in this workflow grants permission to publish or contact a participant. The typed inventory in `src/lib/case-studies.ts` is the source of truth for evidence and approval status. Review-only drafts belong in `outputs/case-study-partner-kits/` and must not be imported into public pages, the Results hub, or the sitemap.

## Publication gate

A case study may move to `approved` only after all of the following are recorded:

- The shop agrees to participate and approves its public name, logo, quote, metrics, dates, and final copy.
- The underlying report supports each before/after figure and uses the same reporting basis throughout.
- The work performed is documented; service links only name services actually involved.
- Every named vendor confirms its role, organization name, URL, and permission to be named.
- The shop and each vendor separately approve their shortened version and followed link to the canonical Turnkey result.
- Projections, averages, one-time results, and attribution limits remain clearly labeled.

If any item is missing, keep the record at `evidence-gap`, `interview-needed`, `ready-for-internal-review`, or `participant-review`.

## Intake questions

Ask the shop:

- What business condition started this work? Record the actual baseline and reporting period.
- What did Turnkey perform, and which other vendors or internal team members participated?
- When did the work begin, and what dates are being compared?
- Which outcome report should be treated as the source of truth?
- What changed operationally during the same period—staff, bays, pricing, hours, ownership, or location?
- What is the shop owner willing to say in a publishable quote?
- May Turnkey publish the shop name, logo, quote, figures, and full story?
- Will the shop publish the shortened version with a followed link to the full Turnkey study?

Ask each vendor:

- What exact work did the vendor perform, and during what dates?
- Which campaign report supports its contribution?
- Does the vendor approve its name, role, logo, URL, and shortened article?
- Where will the vendor publish the shortened version and followed link?

## Full case-study template

Use the homepage visual system when this becomes a public page. The page should include exactly one visible H1 and use `BaseLayout`, `container-page`, homepage typography/utilities, approved brand tokens, responsive section spacing, and a final tracked consultation CTA.

1. Eyebrow: `Client case study`
2. H1: outcome-led, specific, and accurately qualified
3. Dek: shop, timeframe, and high-level work without sole-cause language
4. Starting condition: business context and baseline figures
5. Work performed: concrete actions plus descriptive links to relevant Turnkey services
6. Timeframe: exact dates and changes in service scope
7. Measured outcome: before, after, change, reporting basis, and comparison period in accessible text
8. Client quote: approved wording and attribution
9. Vendor involvement: exact documented role and organization link
10. Caveat: client-specific outcome and material outside factors
11. Related service/resource links and consultation CTA

Recommended structured data is `Article` plus `BreadcrumbList`, with the shop as `about` and approved vendors as `mentions`. Do not use review or rating schema for a client quote.

## Short partner-copy template

Each version should be 150–300 words, locally framed, and materially shorter than the Turnkey page. Include:

- A participant-specific title.
- One-sentence starting condition.
- The participant's documented role.
- One or two accurately labeled outcomes.
- A descriptive followed link such as `See the full [shop] marketing case study`.
- The canonical Turnkey URL and an approved image/alt-text suggestion.
- A disclosure if placement or participation was compensated.

Do not copy the full Turnkey case study onto another domain. Do not ask a vendor to claim work it did not perform.

## Recommended production order

1. ASAP Auto Repair: strongest evidence-complete internal draft; collect report and participant approvals.
2. Pro Automotive Services + Townsquare: strongest shop/vendor pilot; collect baseline, dates, quote, report, and both approvals.
3. Killian Auto Pros: confirm work performed and the 2026 average/YTD label.
4. Dempster's Quality Car Care: collect quote, report, and named vendor details.
5. Certified Auto Repair or SSA European Auto Repair: use only with explicit projection labeling.
