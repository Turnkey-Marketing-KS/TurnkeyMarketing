# Turnkey Marketing — Editorial Social Creative Set (v2)

This is a non-destructive redesign of the original 30-post set. The original files remain in `../turnkey-30/`.

## Creative direction

The v2 system is intentionally closer to the Turnkey website:

- Strong editorial typography and generous whitespace
- Website-native navy, key blue, green, cream, and hairline borders
- Rounded cards, pills, compact labels, and restrained dashboard motifs
- Real client proof screenshots presented as source artifacts
- Simple service maps and decision frameworks instead of generated 3D imagery
- Light paper grain and handwritten annotations for a more human, working-document feel
- No stock photography and no AI-generated scene or object imagery

## Deliverables

- `01-*.png` through `30-*.png`: 1080 × 1080 RGB PNG creatives
- `turnkey-30-v2-contact-sheet.jpg`: visual index of the complete set
- `captions-and-sources.csv`: captions, CTAs, design family, and source provenance

## Content families

- Brand notes
- Shop math
- Owner notes
- Client files
- Service maps
- Campaign maps
- Decision filters
- Reporting frameworks

## Regenerate

From the project root:

```bash
python3 scripts/generate-social-creatives-v2.py
```

The generator uses Turnkey's supplied logo and the real client proof files already stored in the website project.
