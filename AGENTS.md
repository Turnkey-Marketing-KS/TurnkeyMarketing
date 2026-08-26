# Turnkey Launchpad repository instructions

## Booking and attribution source of truth

Before changing booking pages, calendar embeds, analytics, attribution, conversion events, or related tests, read `docs/BOOKING_ATTRIBUTION_SOURCE_OF_TRUTH.md` in full.

Its funnel separation and conversion boundaries are repository invariants:

- Main website CTAs use AppointmentCore through `/contact`, finish at `/booking-confirmed`, and send GA4 booking events only.
- `/lp/auto-repair-marketing` uses the GHL calendar, finishes at `/google-ads-call-booked`, and is the only booking funnel allowed to send the booked-consultation Google Ads conversion.
- Do not add a form before either calendar, decorate the cross-origin AppointmentCore iframe, send PII in analytics or tracking URLs, or reintroduce a non-canonical GA4 measurement ID.

If a booking provider, confirmation URL, event name, conversion label, GA4 measurement ID, or attribution behavior changes, update the source-of-truth document in the same change.

## New page design standard

The homepage at `src/pages/index.astro` is the canonical visual and formatting reference for every new public-facing marketing, service, resource, results, campaign, and landing page.

New pages must feel like part of the homepage design system. Reuse its visual language and shared utilities rather than introducing a separate template, generic article layout, or isolated set of colors and components. Match the system, not the homepage's exact section order.

### Required page structure

- Use `BaseLayout` and provide a unique title, meta description, canonical path, and appropriate structured data.
- Use exactly one visible `h1`. Build the heading hierarchy in order with meaningful `h2` and `h3` elements.
- Start with a strong hero using an eyebrow, a `display-1` or `page-title` heading, concise supporting copy, and a primary action when the page has commercial intent.
- Wrap primary content in `container-page`; do not create competing page-width containers.
- Use responsive section spacing consistent with the homepage, normally `py-14 md:py-20`, `md:py-24`, or the closest existing section pattern.
- Build a deliberate section rhythm using white, `var(--off-white)`, navy, charcoal, or an approved brand gradient. Avoid long runs of visually identical sections.
- End commercial and campaign pages with a clear consultation CTA using the shared `CONSULTATION_URL` and existing tracking attributes.

### Required visual language

- Reuse `eyebrow`, `display-1`, `display-2`, `display-3`, `page-title`, `btn-primary`, `btn-ghost`, `motion-card`, and `card-float` before inventing new utilities.
- Use the existing brand tokens from `src/styles.css`, including `--navy`, `--navy-deep`, `--key-blue`, `--green`, `--charcoal`, `--off-white`, and `--hairline`.
- Use the homepage's rounded geometry: approximately 20–36px radii for cards, media, proof blocks, and feature panels; use pill shapes for primary buttons and small labels.
- Do not use neutral light-gray fills for standalone cards or comparison panels. Use a crisp white surface with a deliberate border or shadow, an approved brand-tinted surface, or a dark brand panel instead. Off-white section bands may still be used when they create intentional page rhythm.
- Do not use translucent or very low-opacity fills as card, callout, badge, or comparison-panel backgrounds. Choose an intentional solid brand color, crisp white, or a clearly defined brand gradient with readable contrast. Reserve opacity effects for non-content decoration such as ambient glows.
- In constrained article columns, do not combine oversized display type with narrow character-width caps. Keep primary section headings to one or two intentional lines at desktop widths, using a controlled break and responsive type scale when needed.
- Use visible numeric step markers only when exact order or dependency is essential. Do not stack multiple `01 / 02 / 03` design systems on one page; use descriptive category labels, icons, path markers, or directional layout for unordered concepts and supporting frameworks.
- Prefer strong editorial hierarchy, short line lengths, balanced headings, generous whitespace, and clear contrast over dense grids or dashboard-like layouts.
- Use existing Lucide icons and approved images from `src/lib/site-media.ts` where possible. Every meaningful image needs accurate alt text, explicit dimensions, and an appropriate loading strategy.
- Motion must be subtle, use the shared motion classes/timings, and respect reduced-motion preferences. Do not add animation that delays reading or interaction.

### Content and conversion pattern

- Lead with the shop owner's problem or desired outcome, then explain the solution, process, proof, and next action.
- Write automotive marketing copy for a busy independent shop owner, not an AI engineer or marketing specialist. Use plain language, connect ideas to calls, appointments, repair work, reviews, capacity, and revenue, and remove technical jargon that does not help the owner make a decision.
- Include useful proof, specifics, or examples instead of unsupported marketing claims.
- Add descriptive contextual links to the page's owning service and related resources.
- Keep calls to action specific and consistent with the page's intent; do not place competing primary actions in the same section.
- Preserve existing event-tracking conventions on consultation, service, phone, and campaign links.

### Responsive and accessibility requirements

- Design mobile-first and verify the page at narrow mobile, tablet, and desktop widths.
- Avoid fixed widths that overflow; use the homepage's responsive grids and max-width patterns.
- Maintain visible keyboard focus, sufficient color contrast, semantic landmarks, descriptive links, and accessible controls.
- Do not hide essential content or actions behind hover-only behavior.

### Exceptions

Legal, confirmation, error, and other utility pages may use a simpler layout, but they must still use `BaseLayout`, `container-page`, shared typography, brand tokens, and accessible responsive spacing.

### Completion checklist for every new page

Before considering a new page complete:

1. Compare it visually with the homepage at mobile and desktop widths.
2. Run the production build, ESLint, and `scripts/seo-check.mjs`.
3. Confirm one visible H1, valid metadata, canonical URL, sitemap inclusion when indexable, and intentional internal links.
4. Confirm images have dimensions, alt text, and sensible loading behavior.
5. Confirm CTA and analytics attributes match existing site conventions.
