# Agent brief: AI search, AEO, voice, entities, and structured data

## Opportunity and guardrail

The export reports zero search volume for the dedicated AI/AEO terms, but AI Overviews appear across many SERPs. Treat this as a technical-quality and original-research incubator. Do not promise that schema, FAQs, or special formatting guarantees inclusion in AI answers.

An untracked image named `public/images/resources/ai-search-auto-repair-shop.jpg` already exists in the working tree. Treat it as user-owned. Verify provenance, dimensions, relevance, and approval before referencing or modifying it.

## Proposed ownership

- First priority: improve core service/resource entity clarity and answer quality.
- Research-led guide, conditional: `/resources/ai-search-auto-repair-marketing`
- Technical guide, conditional: `/resources/auto-repair-structured-data`

## Phase 0 — baseline research

1. Create a fixed test set of high-value questions across services, pricing/fit, local visibility, marketing planning, retention, and direct mail.
2. Record Google AI Overview presence, cited domains, Turnkey mentions/citations, answer accuracy, date, locale, and logged-in state.
3. Audit Organization, WebSite, Service, Article, FAQ, Breadcrumb, image, author, publisher, dates, and entity consistency in rendered HTML.
4. Audit visible answers: can a reader quickly find a concise, accurate response backed by specific detail?
5. Baseline Search Console queries containing AI/voice/answer terminology.

Exit gate: a research memo with repeatable methodology and evidence of a content gap.

## Phase 1 — improve core entities and answers

- Keep one canonical organization identity and consistent name, address, phone, service area, founder, and sameAs links.
- Expand `knowsAbout` only for genuinely documented expertise.
- Ensure visible service names/descriptions match Service schema.
- Ensure Article dates/authorship match visible content.
- Add concise answer-first passages only where they improve readers’ comprehension.
- Add FAQ schema only to visible FAQs; do not mass-add questions for markup.
- Strengthen primary-source citations, named expertise, specific processes, and approved proof.

Do not add unsupported `Review`, `AggregateRating`, `Person`, or location entities.

## Phase 2 — research-led guide decision

Build `/resources/ai-search-auto-repair-marketing` only if the research produces original, useful findings.

- SEO title: `AI Search for Auto Repair Shops: What to Optimize`
- Description: `Understand how clear entities, useful answers, local signals, structured data, proof, and reputable mentions support visibility in AI-assisted search.`

Required sections: what AI search is/is not; benchmark method; entity clarity; answer quality; local/review signals; structured data limits; content provenance; measurement; test checklist. Date every platform-specific statement.

## Phase 3 — distribution and citations

Publish methodology and repeatable test results, then seek discussion by credible automotive/marketing communities. Do not manufacture mentions or use mass AI content.

## Phase 4 — quarterly review

Repeat the fixed test set quarterly. Track citations/mentions, branded searches, Search Console emergence, qualified inquiries, and factual changes. Update or remove obsolete platform advice.

## Acceptance criteria

- Baseline is reproducible and dated.
- Structured data matches visible content exactly.
- No guarantee or unsupported AEO claim appears.
- The guide launches only with original findings.
- Any existing user-owned asset is preserved and used only after approval.
- Metadata, schema, H1, sitemap, images, links, tracking, and responsive QA pass.
- `pnpm build`, `pnpm lint`, and `pnpm seo:check` pass.
