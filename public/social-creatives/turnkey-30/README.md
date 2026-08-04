# Turnkey Marketing — 30 Social Creatives

Thirty ready-to-publish, square social graphics created from the existing Turnkey Marketing brand and photography library.

## Deliverables

- `01-*.png` through `30-*.png`: 1080 × 1080 RGB PNG creatives
- `turnkey-30-contact-sheet.jpg`: one-page visual index of the full set
- `captions-and-sources.csv`: post copy, CTA, content pillar, and source-asset path for every creative

## Content mix

- Brand positioning and calls to action
- Client testimonials and proof points
- Eight service spotlights
- Shop-owner education and marketing guidance
- Team and trust-building content

## Brand system used

- Navy `#232E66`
- Key blue `#3F8CCB`
- Green `#93C845`
- Cream `#FBFAF6`
- Charcoal `#14161C`

The supplied Turnkey logo is used without redrawing it. Client-result posts include a results-vary qualifier in the creative and caption.

## Regenerating the set

Run from the project root:

```bash
python3 scripts/generate-social-creatives.py
```

The renderer uses the source assets listed in `captions-and-sources.csv` and rewrites the 30 PNGs plus the contact sheet.
