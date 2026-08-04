#!/usr/bin/env python3
"""Create platform-ready 4:5 exports and campaign handoff files for V4."""

from __future__ import annotations

import csv
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps


ROOT = Path(__file__).resolve().parents[1]
CAMPAIGN = ROOT / "social-creatives" / "turnkey-30-v4"
RAW = CAMPAIGN / "generated-raw"
FEED = CAMPAIGN / "feed-4x5"
SOURCE_CALENDAR = ROOT / "social-creatives" / "turnkey-30-v3" / "content-calendar-and-captions.csv"

POSTS = [
    ("01-marketing-that-knows-your-shop.png", "Marketing that knows your shop.", 0.00),
    ("02-is-the-marketing-still-on-you.png", "Is the marketing still on you?", 0.05),
    ("03-300-shops-one-industry.png", "300+ shops. One industry.", 0.00),
    ("04-the-team-behind-the-plan.png", "The team behind the plan.", 0.05),
    ("05-shop-owners-deserve-a-plan.png", "Shop owners deserve a plan.", 0.05),
    ("06-they-take-care-of-everything.png", "They take care of everything.", 0.05),
    ("07-one-of-my-best-investments.png", "One of my best investments.", 0.05),
    ("08-300k-month-year-one.png", "$300K/month. Year one.", 0.00),
    ("09-130-percent-yoy-growth.png", "130% YoY growth.", 0.00),
    ("10-500-cars-300k.png", "500+ cars. $300K.", 0.00),
    ("11-first-200k-month.png", "First $200K month.", 0.00),
    ("12-reviews-per-month.png", "1–2 to 15–20 reviews.", 0.00),
    ("13-clicks-arent-booked-cars.png", "Clicks aren't booked cars.", 0.00),
    ("14-empty-bays-are-expensive.png", "Empty bays are expensive.", 0.00),
    ("15-the-phone-call-is-marketing.png", "The phone call is marketing.", 0.60),
    ("16-direct-mail-still-works.png", "Direct mail still works.", 0.25),
    ("17-keep-the-customers-you-earned.png", "Keep the customers you earned.", 0.00),
    ("18-track-what-matters.png", "Track what matters.", 0.00),
    ("19-calls-cars-revenue.png", "Calls. Cars. Revenue.", 0.00),
    ("20-market-to-the-right-car.png", "Market to the right car.", 0.00),
    ("21-make-the-next-move-obvious.png", "Make the next move obvious.", 1.00),
    ("22-your-outside-marketing-department.png", "Your outside marketing department.", 0.30),
    ("23-targeted-tracked-transparent.png", "Targeted. Tracked. Transparent.", 0.40),
    ("24-mail-with-a-plan.png", "Mail with a plan.", 0.30),
    ("25-consistency-beats-random-posting.png", "Consistency beats random posting.", 0.40),
    ("26-bring-them-back.png", "Bring them back.", 0.20),
    ("27-connect-the-moving-pieces.png", "Connect the moving pieces.", 0.40),
    ("28-need-a-boost.png", "Need a boost?", 0.20),
    ("29-make-the-decision-clear.png", "Make the decision clear.", 0.35),
    ("30-get-marketing-off-your-plate.png", "Get marketing off your plate.", 0.30),
]


def feed_crop(source: Path, destination: Path, anchor: float) -> None:
    with Image.open(source) as opened:
        image = opened.convert("RGB")
    target_w, target_h = 1080, 1350
    scale = target_w / image.width
    resized = image.resize((target_w, round(image.height * scale)), Image.Resampling.LANCZOS)
    excess = max(0, resized.height - target_h)
    top = round(excess * anchor)
    top = min(max(0, top), excess)
    crop = resized.crop((0, top, target_w, top + target_h))
    crop.save(destination, "PNG", optimize=True)


def make_contact_sheet(files: list[Path], destination: Path) -> None:
    thumb_w, thumb_h = 216, 270
    label_h = 28
    cols = 5
    rows = (len(files) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * thumb_w, rows * (thumb_h + label_h)), "#ece8df")
    draw = ImageDraw.Draw(sheet)
    for index, path in enumerate(files):
        with Image.open(path) as opened:
            tile = ImageOps.fit(opened.convert("RGB"), (thumb_w, thumb_h), Image.Resampling.LANCZOS)
        x = (index % cols) * thumb_w
        y = (index // cols) * (thumb_h + label_h)
        sheet.paste(tile, (x, y))
        draw.rectangle((x, y + thumb_h, x + thumb_w, y + thumb_h + label_h), fill="#0d1938")
        draw.text((x + 8, y + thumb_h + 7), f"{index + 1:02d}", fill="white")
    sheet.save(destination, "JPEG", quality=94, optimize=True)


def write_calendar() -> None:
    with SOURCE_CALENDAR.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))
        fields = list(rows[0])
    fields += ["creative_method", "raw_master"]
    for index, row in enumerate(rows):
        filename, hook, _ = POSTS[index]
        row["filename"] = filename
        row["on_image_hook"] = hook
        row["visual_family"] = "Imagegen editorial campaign"
        row["format"] = "1080x1350 RGB PNG"
        row["creative_method"] = "Built-in imagegen composition; platform crop only"
        row["raw_master"] = f"generated-raw/{filename}"
    destination = CAMPAIGN / "content-calendar-and-captions.csv"
    with destination.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    FEED.mkdir(parents=True, exist_ok=True)
    outputs: list[Path] = []
    for filename, _, anchor in POSTS:
        source = RAW / filename
        if not source.exists():
            raise FileNotFoundError(source)
        destination = FEED / filename
        feed_crop(source, destination, anchor)
        outputs.append(destination)
    make_contact_sheet(outputs, CAMPAIGN / "turnkey-30-v4-contact-sheet.jpg")
    write_calendar()
    print(f"Created {len(outputs)} feed exports in {FEED}")


if __name__ == "__main__":
    main()
