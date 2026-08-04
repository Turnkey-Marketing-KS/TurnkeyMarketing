# Turnkey Marketing Social Campaign — V3

This folder contains the research-led redesign of Turnkey Marketing's 30-post social campaign. The campaign is designed as a ten-week publishing system at three posts per week, with short on-image hooks and captions carrying the supporting detail.

## Deliverables

- 30 portrait social creatives (`1080 × 1350`, RGB PNG)
- `turnkey-30-v3-contact-sheet.jpg` — overview of the complete campaign
- `content-calendar-and-captions.csv` — publish-ready captions and metadata
- `supporting-images/` — four generic documentary images generated for this campaign

The campaign strategy and source plan live in:

- `../../../docs/social/turnkey-social-design-profile-v3.md`
- `../../../docs/social/turnkey-social-plan-v3.csv`

## Design system

The visual direction is **independent-shop documentary × modern editorial field guide**. It combines authentic Turnkey photography, real proof points, restrained typography, tactile working-note details, and a small number of generated documentary scenes. Each post has one communication job, one focal point, and minimal on-image copy.

The feed rotates among documentary photography, editorial statements, proof cards, working notes, and service stories so the campaign feels cohesive without looking templated.

## Generated-image disclosure

The four images in `supporting-images/` are AI-generated, generic scenes created specifically as supporting campaign imagery: an empty service bay, a service advisor on the phone, direct-mail planning materials, and an owner reviewing a report. They do not depict Turnkey clients, employees, customer results, or real performance data.

## Regenerating the exports

From the project root, run:

```bash
python3 scripts/generate-social-creatives-v3.py
```

The earlier V1 and V2 campaign folders are preserved unchanged for comparison.
