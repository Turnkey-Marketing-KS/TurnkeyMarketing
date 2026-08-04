# Turnkey Marketing Social Campaign — V4

V4 is the imagegen-led redesign of the 30-post Turnkey Marketing campaign. Image generation was used for the complete creative compositions, not only for background photography.

## Deliverables

- `feed-4x5/` — 30 platform-ready `1080 × 1350` RGB PNGs
- `generated-raw/` — 30 direct built-in imagegen masters in their native high-resolution portrait dimensions
- `turnkey-30-v4-contact-sheet.jpg` — contact sheet of the final 4:5 campaign
- `content-calendar-and-captions.csv` — ten-week publishing plan, captions, CTAs, channels, and file mapping
- `pilots/` — the three initial imagegen direction studies

Strategy, art direction, and the final prompt set are documented in:

- `../../../docs/social/turnkey-social-imagegen-direction-v4.md`

The feed exports can be regenerated from the saved imagegen masters with:

```bash
python3 scripts/finalize-social-creatives-v4.py
```

## Method

OpenAI's built-in imagegen created each underlying composition, including photographic treatment, collage, typography staging, texture, and visual metaphor. The finalization script only creates platform-safe crops, the contact sheet, and the publishing calendar. No CLI/API image-generation fallback was used.

The V1, V2, and V3 folders remain unchanged for comparison.
