#!/usr/bin/env python3
"""Render Turnkey Marketing's strategy-led 30-post social campaign (v3)."""

from __future__ import annotations

import csv
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "social-creatives" / "turnkey-30-v3"
W, H = 1080, 1350

NAVY = "#232E66"
DEEP = "#1A2352"
BLUE = "#3F8CCB"
BLUE_SOFT = "#DFEAF5"
GREEN = "#93C845"
CREAM = "#FBFAF6"
OFF_WHITE = "#F4F2ED"
CHARCOAL = "#14161C"
MUTED = "#5B6070"
HAIRLINE = "#E7E5DF"
WHITE = "#FFFFFF"

FONT_PATH = "/System/Library/Fonts/HelveticaNeue.ttc"


def font(size: int, weight: str = "regular") -> ImageFont.FreeTypeFont:
    index = {"regular": 0, "bold": 1, "medium": 10, "light": 7}[weight]
    return ImageFont.truetype(FONT_PATH, size, index=index)


def source(relative: str) -> Path:
    return ROOT / relative


def paper(color: str, seed: int) -> Image.Image:
    canvas = Image.new("RGBA", (W, H), color)
    rng = random.Random(seed)
    grain = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pixels = grain.load()
    for _ in range(11000):
        x, y = rng.randrange(W), rng.randrange(H)
        shade = rng.choice((0, 255))
        pixels[x, y] = (shade, shade, shade, rng.randrange(2, 8))
    return Image.alpha_composite(canvas, grain)


def clean_logo(width: int, white: bool = False) -> Image.Image:
    with Image.open(source("public/turnkey-logo.png")) as raw:
        logo = raw.convert("RGBA")
    ratio = width / logo.width
    logo = logo.resize((width, round(logo.height * ratio)), Image.Resampling.LANCZOS)
    alpha_values = []
    for red, green, blue, alpha in logo.getdata():
        alpha_values.append(round(max(255 - red, 255 - green, 255 - blue) * alpha / 255))
    alpha_mask = Image.new("L", logo.size)
    alpha_mask.putdata(alpha_values)
    logo.putalpha(alpha_mask)
    if white:
        result = Image.new("RGBA", logo.size, WHITE)
        result.putalpha(alpha_mask)
        return result
    return logo


def add_logo(canvas: Image.Image, x: int, y: int, width: int = 220, white: bool = False) -> None:
    canvas.alpha_composite(clean_logo(width, white), (x, y))


def cover(path: Path, size: tuple[int, int], center: tuple[float, float] = (0.5, 0.5)) -> Image.Image:
    with Image.open(path) as raw:
        image = ImageOps.exif_transpose(raw).convert("RGB")
    return ImageOps.fit(image, size, method=Image.Resampling.LANCZOS, centering=center).convert("RGBA")


def rounded_photo(path: Path, size: tuple[int, int], radius: int, center: tuple[float, float]) -> Image.Image:
    image = cover(path, size, center)
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    image.putalpha(mask)
    return image


def contain(path: Path, size: tuple[int, int], background: str = WHITE) -> Image.Image:
    with Image.open(path) as raw:
        image = ImageOps.exif_transpose(raw).convert("RGB")
    image.thumbnail(size, Image.Resampling.LANCZOS)
    frame = Image.new("RGBA", size, background)
    frame.paste(image, ((size[0] - image.width) // 2, (size[1] - image.height) // 2))
    return frame


def wrap(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    result: list[str] = []
    for paragraph in text.split("\n"):
        line = ""
        for word in paragraph.split():
            candidate = word if not line else f"{line} {word}"
            if draw.textbbox((0, 0), candidate, font=f)[2] <= max_width:
                line = candidate
            else:
                if line:
                    result.append(line)
                line = word
        if line:
            result.append(line)
    return result


def fit_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    width: int,
    height: int,
    start: int,
    minimum: int,
    weight: str = "bold",
    spacing_ratio: float = 0.08,
) -> tuple[ImageFont.FreeTypeFont, list[str], int]:
    for size in range(start, minimum - 1, -2):
        f = font(size, weight)
        lines = wrap(draw, text, f, width)
        spacing = max(8, round(size * spacing_ratio))
        box = draw.multiline_textbbox((0, 0), "\n".join(lines), font=f, spacing=spacing)
        if box[3] - box[1] <= height:
            return f, lines, spacing
    f = font(minimum, weight)
    return f, wrap(draw, text, f, width), max(8, round(minimum * spacing_ratio))


def text_box(
    draw: ImageDraw.ImageDraw,
    text: str,
    box: tuple[int, int, int, int],
    color: str,
    start: int,
    minimum: int,
    weight: str = "bold",
    align: str = "left",
) -> int:
    x1, y1, x2, y2 = box
    f, lines, spacing = fit_text(draw, text, x2 - x1, y2 - y1, start, minimum, weight)
    value = "\n".join(lines)
    draw.multiline_text((x1, y1), value, font=f, fill=color, spacing=spacing, align=align)
    return draw.multiline_textbbox((x1, y1), value, font=f, spacing=spacing)[3]


def pill(draw: ImageDraw.ImageDraw, label: str, x: int, y: int, fill: str, color: str) -> int:
    f = font(18, "bold")
    label = label.upper()
    width = draw.textbbox((0, 0), label, font=f)[2] + 34
    draw.rounded_rectangle((x, y, x + width, y + 38), radius=19, fill=fill)
    draw.text((x + 17, y + 20), label, font=f, fill=color, anchor="lm")
    return width


def tiny_footer(draw: ImageDraw.ImageDraw, dark: bool, post: int) -> None:
    color = "#D8DCEE" if dark else NAVY
    draw.text((72, 1302), "TURNKEYMARKETING.US", font=font(17, "bold"), fill=color, anchor="lm")
    draw.text((970, 1302), f"{post:02d} / 30", font=font(16, "medium"), fill=color, anchor="rm")
    draw.ellipse((990, 1294, 1006, 1310), fill=GREEN)


def gradient_photo(image: Image.Image, top_alpha: int = 5, bottom_alpha: int = 210) -> Image.Image:
    base = image.convert("RGBA")
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    height = base.height
    for y in range(height):
        t = y / max(1, height - 1)
        alpha = round(top_alpha + (bottom_alpha - top_alpha) * t)
        draw.line((0, y, base.width, y), fill=(15, 20, 52, alpha))
    return Image.alpha_composite(base, overlay)


def add_shadow(canvas: Image.Image, box: tuple[int, int, int, int], radius: int = 32) -> None:
    x1, y1, x2, y2 = box
    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((x1, y1 + 14, x2, y2 + 14), radius=radius, fill=(20, 22, 28, 45))
    canvas.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(20)))


def photo_band(item: dict, post: int) -> Image.Image:
    bg = item.get("bg", CREAM)
    canvas = paper(bg, post)
    photo_h = item.get("photo_h", 880)
    photo = cover(source(item["asset"]), (W, photo_h), item.get("center", (0.5, 0.5)))
    photo = ImageEnhance.Contrast(photo.convert("RGB")).enhance(1.03).convert("RGBA")
    canvas.alpha_composite(photo, (0, 0))
    draw = ImageDraw.Draw(canvas)
    add_logo(canvas, 72, 58, 218, white=item.get("logo_white", False))
    pill(draw, item["label"], 72, photo_h + 54, item.get("accent", BLUE), DEEP if item.get("accent", BLUE) == GREEN else WHITE)
    text_box(draw, item["hook"], (72, photo_h + 124, 1008, 1246), item.get("text", CHARCOAL), item.get("size", 78), 48)
    tiny_footer(draw, False, post)
    return canvas


def photo_overlay(item: dict, post: int) -> Image.Image:
    image = cover(source(item["asset"]), (W, H), item.get("center", (0.5, 0.5)))
    canvas = gradient_photo(image, item.get("top_alpha", 5), item.get("bottom_alpha", 220))
    draw = ImageDraw.Draw(canvas)
    add_logo(canvas, 72, 58, 218, white=True)
    y = item.get("title_y", 950)
    pill(draw, item["label"], 72, y - 66, item.get("accent", GREEN), DEEP if item.get("accent", GREEN) == GREEN else WHITE)
    text_box(draw, item["hook"], (72, y, 1008, 1228), WHITE, item.get("size", 82), 48)
    tiny_footer(draw, True, post)
    return canvas


def portrait_split(item: dict, post: int) -> Image.Image:
    bg = item.get("bg", CREAM)
    canvas = paper(bg, post)
    draw = ImageDraw.Draw(canvas)
    add_logo(canvas, 72, 58, 218)
    photo_box = (500, 176, 1008, 1196)
    add_shadow(canvas, photo_box, 34)
    portrait = rounded_photo(source(item["asset"]), (508, 1020), 34, item.get("center", (0.5, 0.35)))
    canvas.alpha_composite(portrait, (500, 176))
    draw = ImageDraw.Draw(canvas)
    pill(draw, item["label"], 72, 214, item.get("accent", BLUE), DEEP if item.get("accent", BLUE) == GREEN else WHITE)
    text_box(draw, item["hook"], (72, 298, 458, 878), CHARCOAL, item.get("size", 68), 42)
    if item.get("name"):
        draw.line((72, 986, 152, 986), fill=item.get("accent", GREEN), width=9)
        draw.text((72, 1026), item["name"].upper(), font=font(22, "bold"), fill=NAVY)
        draw.text((72, 1064), item.get("shop", ""), font=font(20), fill=MUTED)
    tiny_footer(draw, False, post)
    return canvas


def quote_card(item: dict, post: int) -> Image.Image:
    dark = item.get("dark", False)
    bg = DEEP if dark else CREAM
    canvas = paper(bg, post)
    draw = ImageDraw.Draw(canvas)
    if item.get("asset"):
        portrait = rounded_photo(source(item["asset"]), (420, 760), 34, item.get("center", (0.5, 0.25)))
        canvas.alpha_composite(portrait, (588, 182))
    add_logo(canvas, 72, 58, 218, white=dark)
    accent = item.get("accent", GREEN)
    draw.text((58, 188), "“", font=font(180, "bold"), fill=accent)
    primary = WHITE if dark else CHARCOAL
    muted = "#C9CDE1" if dark else MUTED
    width = 474 if item.get("asset") else 900
    text_box(draw, item["hook"], (72, 372, 72 + width, 924), primary, item.get("size", 74), 44, "medium")
    draw.line((72, 1050, 152, 1050), fill=accent, width=9)
    draw.text((72, 1092), item["name"].upper(), font=font(22, "bold"), fill=primary)
    draw.text((72, 1132), item.get("shop", ""), font=font(20), fill=muted)
    tiny_footer(draw, dark, post)
    return canvas


def statement(item: dict, post: int) -> Image.Image:
    bg = item.get("bg", CREAM)
    dark = bg in {NAVY, DEEP, CHARCOAL}
    canvas = paper(bg, post)
    draw = ImageDraw.Draw(canvas)
    add_logo(canvas, 72, 58, 218, white=dark)
    accent = item.get("accent", BLUE)
    pill(draw, item["label"], 72, 242, accent, DEEP if accent == GREEN else WHITE)
    primary = WHITE if dark else CHARCOAL
    y = text_box(draw, item["hook"], (72, 338, 1008, 1000), primary, item.get("size", 104), 56)
    if item.get("gesture") == "progress":
        draw.line((74, min(y + 58, 1120), 830, min(y + 58, 1120)), fill=BLUE_SOFT if not dark else "#39457E", width=18)
        draw.line((74, min(y + 58, 1120), 624, min(y + 58, 1120)), fill=GREEN, width=18)
        draw.polygon([(624, min(y + 58, 1120) - 13), (650, min(y + 58, 1120)), (624, min(y + 58, 1120) + 13)], fill=GREEN)
    elif item.get("gesture") == "return":
        for radius in (58, 92, 126):
            draw.arc((806 - radius, 986 - radius, 806 + radius, 986 + radius), 30, 320, fill=GREEN, width=14)
        draw.polygon([(916, 922), (944, 936), (920, 956)], fill=GREEN)
    tiny_footer(draw, dark, post)
    return canvas


def proof_card(item: dict, post: int) -> Image.Image:
    bg = item.get("bg", CREAM)
    dark = bg in {NAVY, DEEP}
    canvas = paper(bg, post)
    draw = ImageDraw.Draw(canvas)
    add_logo(canvas, 72, 58, 218, white=dark)
    primary = WHITE if dark else CHARCOAL
    muted = "#CAD0E4" if dark else MUTED
    accent = item.get("accent", GREEN)
    pill(draw, "CLIENT RESULT", 72, 198, accent, DEEP if accent == GREEN else WHITE)
    draw.text((68, 292), item["metric"], font=font(item.get("metric_size", 166), "bold"), fill=WHITE if dark else NAVY)
    text_box(draw, item["hook"], (72, 492, 560, 714), primary, 54, 36)
    draw.text((72, 752), "Client-specific result. Results vary.", font=font(20), fill=muted)
    box = (590, 230, 1008, 1048)
    add_shadow(canvas, box, 32)
    draw.rounded_rectangle(box, radius=32, fill=WHITE, outline=HAIRLINE, width=2)
    artifact = contain(source(item["asset"]), (370, 680), WHITE)
    canvas.alpha_composite(artifact, (614, 296))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((72, 1062, 1008, 1192), radius=28, fill=WHITE if dark else OFF_WHITE, outline=HAIRLINE, width=2)
    draw.text((104, 1128), item.get("note", "REAL REPORT • REAL CLIENT"), font=font(22, "bold"), fill=NAVY if dark else primary, anchor="lm")
    tiny_footer(draw, dark, post)
    return canvas


def working_note(item: dict, post: int) -> Image.Image:
    canvas = paper(CREAM, post)
    draw = ImageDraw.Draw(canvas)
    add_logo(canvas, 72, 58, 218)
    pill(draw, item["label"], 72, 178, item.get("accent", BLUE), DEEP if item.get("accent", BLUE) == GREEN else WHITE)
    text_box(draw, item["hook"], (72, 254, 1008, 472), CHARCOAL, item.get("size", 80), 48)
    box = (72, 548, 1008, 1168)
    add_shadow(canvas, box, 32)
    if item.get("asset"):
        photo = rounded_photo(source(item["asset"]), (936, 620), 32, item.get("center", (0.5, 0.5)))
        canvas.alpha_composite(photo, (72, 548))
        draw = ImageDraw.Draw(canvas)
        draw.rounded_rectangle((100, 1080, 612, 1138), radius=29, fill=CREAM)
        draw.text((126, 1110), item.get("note", "THE PLAN IS THE DIFFERENCE"), font=font(20, "bold"), fill=NAVY, anchor="lm")
    else:
        draw.rounded_rectangle(box, radius=32, fill=WHITE, outline=HAIRLINE, width=2)
        items = item["items"]
        x_positions = [142, 384, 626, 868][: len(items)]
        line_y = 840
        draw.line((x_positions[0], line_y, x_positions[-1], line_y), fill=HAIRLINE, width=10)
        for idx, (x, label) in enumerate(zip(x_positions, items), start=1):
            draw.ellipse((x - 28, line_y - 28, x + 28, line_y + 28), fill=item.get("accent", BLUE), outline=WHITE, width=6)
            draw.text((x, line_y - 62), f"0{idx}", font=font(17, "medium"), fill=MUTED, anchor="mm")
            f, lines, spacing = fit_text(draw, label, 188, 100, 25, 18, "medium")
            draw.multiline_text((x, line_y + 52), "\n".join(lines), font=f, fill=CHARCOAL, spacing=spacing, anchor="ma", align="center")
        draw.text((108, 1102), item.get("note", "ONE SYSTEM. CLEAR NEXT MOVE."), font=font(20, "bold"), fill=NAVY)
    tiny_footer(draw, False, post)
    return canvas


def compare_card(item: dict, post: int) -> Image.Image:
    canvas = paper(CREAM, post)
    draw = ImageDraw.Draw(canvas)
    add_logo(canvas, 72, 58, 218)
    pill(draw, item["label"], 72, 210, BLUE, WHITE)
    text_box(draw, item["hook"], (72, 304, 1008, 600), CHARCOAL, 88, 52)
    draw.rounded_rectangle((72, 720, 496, 1080), radius=32, fill=OFF_WHITE, outline=HAIRLINE, width=2)
    draw.rounded_rectangle((536, 720, 1008, 1080), radius=32, fill=NAVY)
    draw.text((106, 778), "ACTIVITY", font=font(18, "bold"), fill=MUTED)
    draw.text((570, 778), "OUTCOME", font=font(18, "bold"), fill=GREEN)
    draw.text((106, 900), "Clicks", font=font(72, "bold"), fill="#9A9DA6")
    draw.line((104, 948, 442, 832), fill="#C6C7CA", width=10)
    draw.text((570, 900), "Booked cars", font=font(60, "bold"), fill=WHITE)
    draw.line((570, 982, 908, 982), fill=GREEN, width=14)
    tiny_footer(draw, False, post)
    return canvas


def decision_card(item: dict, post: int) -> Image.Image:
    canvas = paper(item.get("bg", CREAM), post)
    draw = ImageDraw.Draw(canvas)
    add_logo(canvas, 72, 58, 218)
    pill(draw, item["label"], 72, 210, BLUE, WHITE)
    text_box(draw, item["hook"], (72, 304, 1008, 560), CHARCOAL, 84, 52)
    words = item["items"]
    colors = ["#CBD2D9", BLUE, "#6BB4DD", GREEN]
    y = 710
    for idx, (word, color) in enumerate(zip(words, colors)):
        x1 = 72 + idx * 234
        x2 = x1 + 210
        draw.rounded_rectangle((x1, y, x2, y + 230), radius=30, fill=color)
        draw.text((x1 + 26, y + 38), f"0{idx + 1}", font=font(17, "bold"), fill=DEEP)
        f, lines, spacing = fit_text(draw, word, 164, 112, 34, 24, "bold")
        draw.multiline_text((x1 + 26, y + 100), "\n".join(lines), font=f, fill=DEEP, spacing=spacing)
    tiny_footer(draw, False, post)
    return canvas


CREATIVES = [
    dict(kind="photo_band", hook="Marketing that knows your shop.", label="AUTO REPAIR ONLY", asset="public/site-media/hero-thunderbird-shop.webp", center=(0.54, 0.5), accent=BLUE, logo_white=True, size=74),
    dict(kind="photo_overlay", hook="Is the marketing still on you?", label="SHOP-OWNER REALITY", asset="public/site-media/mikes-auto-works.webp", center=(0.5, 0.5), accent=GREEN, size=76, title_y=944),
    dict(kind="statement", hook="More cars. Less chaos.", label="THE OUTCOME", accent=GREEN, bg=CREAM, gesture="progress", size=112),
    dict(kind="photo_band", hook="The team behind the plan.", label="MEET TURNKEY", asset="public/site-media/team-turnkey-2025.webp", center=(0.5, 0.46), accent=GREEN, logo_white=False, size=82),
    dict(kind="portrait_split", hook="Shop owners deserve a plan.", label="FOUNDER NOTE", asset="public/site-media/founder-carrie-lynn.webp", center=(0.5, 0.3), accent=BLUE, bg=BLUE_SOFT, size=64),
    dict(kind="quote", hook="They take care of everything.", label="OWNER STORY", asset="public/images/clients/len-pritchett.jpeg", center=(0.5, 0.28), name="Len Pritchett", shop="RPM Automotive • Wisconsin", accent=GREEN, dark=False, size=66),
    dict(kind="quote", hook="One of my best investments.", label="OWNER STORY", asset="public/images/clients/jason-smith.jpg", center=(0.5, 0.18), name="Jason Smith", shop="M&M Car Care Center • Indiana", accent=GREEN, dark=True, size=62),
    dict(kind="quote", hook="$300k/month. One year.", label="OWNER STORY", asset="public/images/clients/steve-killian.jpeg", center=(0.5, 0.28), name="Steve Killian", shop="Killian Auto Pros • South Carolina", accent=GREEN, dark=True, size=62),
    dict(kind="proof", metric="130%", hook="YoY revenue growth.", asset="public/site-media/proof/torque-european-growth.png", accent=BLUE, bg=CREAM, note="TORQUE EUROPEAN • REAL REPORT"),
    dict(kind="proof", metric="500+", hook="cars — plus $300k.", asset="public/site-media/proof/auto-medics-growth.png", accent=GREEN, bg=NAVY, note="AUTO MEDICS • CAR COUNT + REVENUE"),
    dict(kind="proof", metric="$200k+", metric_size=136, hook="First month across the line.", asset="public/site-media/proof/sports-car-shop-growth.png", accent=GREEN, bg=CREAM, note="SPORTS CAR SHOP • REVENUE MILESTONE"),
    dict(kind="proof", metric="1–2 TO\n15–20", metric_size=92, hook="reviews per month.", asset="public/site-media/proof/chris-matthews-reviews.png", accent=BLUE, bg=BLUE_SOFT, note="CHRIS MATTHEWS AUTOMOTIVE • REVIEW GROWTH"),
    dict(kind="compare", hook="Clicks aren't booked cars.", label="MEASURE WHAT MATTERS"),
    dict(kind="photo_overlay", hook="Empty bays are expensive.", label="DEMAND + CAPACITY", asset="social-creatives/turnkey-30-v3/supporting-images/empty-service-bay.png", center=(0.5, 0.48), accent=GREEN, size=84, title_y=972),
    dict(kind="portrait_split", hook="The phone call is marketing.", label="CALL HANDLING", asset="social-creatives/turnkey-30-v3/supporting-images/service-advisor-phone.png", center=(0.56, 0.47), accent=BLUE, bg=CREAM, size=62),
    dict(kind="working", hook="Direct mail still works.", label="CHANNEL TRUTH", asset="social-creatives/turnkey-30-v3/supporting-images/direct-mail-planning.png", center=(0.5, 0.58), accent=GREEN, note="LIST • OFFER • TIMING • FOLLOW-UP"),
    dict(kind="photo_band", hook="Keep the customers you earned.", label="RETENTION", asset="public/site-media/pearson-auto-repair-shop.webp", center=(0.44, 0.45), accent=GREEN, logo_white=True, size=72),
    dict(kind="portrait_split", hook="Track what matters.", label="HONEST REPORTING", asset="social-creatives/turnkey-30-v3/supporting-images/owner-reviewing-report.png", center=(0.54, 0.5), accent=BLUE, bg=OFF_WHITE, size=72),
    dict(kind="working", hook="Calls. Cars. Revenue.", label="THE REPORTING LINE", items=["Calls", "Booked", "Cars", "Revenue"], accent=GREEN, note="FOLLOW THE METRIC TO THE SHOP"),
    dict(kind="photo_band", hook="Market to the right car.", label="CUSTOMER MIX", asset="public/site-media/mm-shop.webp", center=(0.56, 0.5), accent=BLUE, logo_white=True, size=76),
    dict(kind="working", hook="Make the next move obvious.", label="THE PLAN", asset="public/site-media/marketing-plan.webp", center=(0.5, 0.5), accent=BLUE, note="MARKET • CAPACITY • GOALS • CUSTOMER MIX", size=72),
    dict(kind="photo_band", hook="Your outside marketing department.", label="VIP MARKETING MANAGER", asset="public/site-media/team-turnkey-2025.webp", center=(0.5, 0.44), accent=GREEN, logo_white=False, size=66),
    dict(kind="working", hook="Targeted. Tracked. Transparent.", label="DIRECTTRACK", items=["Target", "Reach", "Track", "Improve"], accent=BLUE, note="A CLEAR ACQUISITION LANE", size=72),
    dict(kind="working", hook="Mail with a plan.", label="DIRECT MAIL", asset="social-creatives/turnkey-30-v3/supporting-images/direct-mail-planning.png", center=(0.5, 0.66), accent=GREEN, note="MANAGED AS A CAMPAIGN • NOT A PRINT JOB", size=84),
    dict(kind="photo_band", hook="Consistency beats random posting.", label="SOCIAL MEDIA", asset="public/images/team/20230303-turnkeyvisionexpo0048.jpg", center=(0.52, 0.5), accent=BLUE, logo_white=False, size=68),
    dict(kind="statement", hook="Bring them back.", label="RETENTION", accent=GREEN, bg=NAVY, gesture="return", size=118),
    dict(kind="working", hook="Connect the moving pieces.", label="DIGITAL MARKETING", items=["Reviews", "Google Profile", "Website", "Vendors"], accent=BLUE, note="ONE ACCOUNTABLE PLAN", size=74),
    dict(kind="photo_overlay", hook="Need a boost?", label="BOOST DAYS", asset="public/site-media/pearson-auto-repair-bays.webp", center=(0.5, 0.5), accent=GREEN, size=102, title_y=986),
    dict(kind="decision", hook="Make the decision clear.", label="REPORTING", items=["Keep", "Fix", "Stop", "Run next"]),
    dict(kind="photo_overlay", hook="Get marketing off your plate.", label="BOOK A CONSULTATION", asset="public/site-media/team-turnkey-2025.webp", center=(0.5, 0.48), accent=GREEN, size=76, title_y=944, bottom_alpha=236),
]


CAPTIONS = [
    "Auto repair marketing works differently when the team running it understands the shop. Turnkey connects strategy, execution, and reporting so the next move is clear — and the owner is not translating between five vendors.",
    "If every postcard, ad, report, and slow week still ends up on your desk, you do not really have a marketing department yet. You have more tasks. What is the first marketing responsibility you would hand off?",
    "The goal is not more activity. It is more of the right cars, a steadier schedule, and fewer loose ends for the owner to manage. Save this as the filter for the next marketing idea that lands in your inbox.",
    "Behind every campaign is a team coordinating strategy, copy, creative, reporting, and the follow-through that keeps work moving. You run the shop. We will take it from here.",
    "Shop owners deserve a marketing plan they can understand and defend. That means knowing what is working, what needs attention, and what should happen next — without learning an agency's language first.",
    "‘They take care of everything.’ That is the standard: fewer vendors to chase, fewer approvals floating around, and one team responsible for moving the plan forward.",
    "Marketing should be an investment you can evaluate, not a recurring invoice you hope is helping. Jason Smith called Turnkey one of the best investments he has made in his company.",
    "A new location needs more than awareness. It needs coordinated demand, follow-through, and a plan that adapts as the shop ramps. Steve Killian's reported result is client-specific; results vary.",
    "Torque European recorded 130% year-over-year revenue growth. The useful question is not only what the number became — it is which coordinated decisions helped move it. Client results vary.",
    "Auto Medics crossed 500 cars and $300k in revenue after onboarding. Car count and revenue belong in the same conversation because volume without quality is not the goal. Client results vary.",
    "The Sports Car Shop crossed $200k in monthly revenue for the first time after onboarding. Milestones matter when the reporting makes the work behind them visible. Client results vary.",
    "Chris Matthews Automotive moved from 1–2 reviews a month to 15–20. Reputation growth becomes more dependable when the process is consistent instead of occasional. Client results vary.",
    "Clicks can tell you that someone noticed an ad. They cannot tell you whether the phone was answered well, the appointment was booked, or the right car reached the bay. Follow the metric all the way to the shop.",
    "Do not wait for empty bays to start thinking about demand. A steady marketing plan gives the shop more control over timing, customer mix, and the pressure of a slow week.",
    "The phone call is part of marketing. Offer fit, advisor language, availability, and follow-up all affect whether paid demand becomes a booked car. Share this with the person who answers your phones.",
    "Direct mail still works when the list, offer, timing, and follow-up are treated as one campaign. The channel is not the strategy. The plan is.",
    "You already paid to earn the customer. Retention protects that investment with a steady rhythm of newsletters, thank-you messages, reminders, and relevant reasons to return.",
    "A useful report helps the owner decide. Start with calls, booked appointments, repair-order quality, car count, returning customers, and revenue — then ask what should change next.",
    "Good reporting connects the steps: demand creates calls, call handling creates appointments, appointments create cars, and the right cars create defensible revenue. Where does your current report stop?",
    "More volume is not automatically better marketing. The plan should attract the customers, vehicles, and work that fit the shop's capabilities and long-term goals.",
    "A marketing plan should make the next move obvious. It should account for the market, available capacity, business goals, and the customer mix the shop actually wants.",
    "VIP Marketing Manager gives the shop an outside marketing department: strategy, creative, execution, coordination, and reporting under one accountable team.",
    "DirectTrack creates a clear acquisition lane: target the right audience, reach them across relevant channels, track the response, and improve the next campaign with real reporting.",
    "Managed direct mail is more than sending a postcard. Turnkey coordinates the design, list, offer, timing, verification, and reporting as one campaign.",
    "Random posting creates random expectations. A useful social presence needs a repeatable rhythm, recognizable point of view, and content that earns attention before it asks for action.",
    "Acquisition earns the first visit. Retention earns the next one. Keep the relationship active after the repair instead of starting from zero every time the schedule needs support.",
    "Reviews, Google Business Profile, the website, and outside vendors should reinforce one another. Turnkey helps connect those moving pieces into one accountable digital plan.",
    "When timing matters, a focused campaign can move faster than a full rebuild. Boost Days coordinate strategy, email, text, social, and call review around a specific demand need.",
    "A useful marketing conversation ends with four decisions: what to keep, what to fix, what to stop funding, and what to run next. Which one is hardest to answer right now?",
    "Ready for a clearer plan and one team to own the execution? Book a consultation at turnkeymarketing.us and find out what Turnkey should take off your plate next.",
]


RENDERERS = {
    "photo_band": photo_band,
    "photo_overlay": photo_overlay,
    "portrait_split": portrait_split,
    "quote": quote_card,
    "statement": statement,
    "proof": proof_card,
    "working": working_note,
    "compare": compare_card,
    "decision": decision_card,
}


def slug(value: str) -> str:
    clean = "".join(character.lower() if character.isalnum() else "-" for character in value)
    return "-".join(part for part in clean.split("-") if part)[:68]


def contact_sheet(files: list[Path]) -> None:
    thumb_w, thumb_h, label_h = 216, 270, 36
    cols = 5
    rows = math.ceil(len(files) / cols)
    sheet = Image.new("RGB", (cols * thumb_w, rows * (thumb_h + label_h)), OFF_WHITE)
    draw = ImageDraw.Draw(sheet)
    for index, file in enumerate(files):
        with Image.open(file) as raw:
            tile = raw.convert("RGB").resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        x = (index % cols) * thumb_w
        y = (index // cols) * (thumb_h + label_h)
        sheet.paste(tile, (x, y))
        draw.rectangle((x, y + thumb_h, x + thumb_w, y + thumb_h + label_h), fill=WHITE)
        draw.text((x + 10, y + thumb_h + 19), f"{index + 1:02d}  {file.stem[3:24]}", font=font(13, "bold"), fill=NAVY, anchor="lm")
    sheet.save(OUT / "turnkey-30-v3-contact-sheet.jpg", quality=92, optimize=True)


def main() -> None:
    if len(CREATIVES) != 30 or len(CAPTIONS) != 30:
        raise ValueError("V3 requires exactly 30 creatives and 30 captions")
    OUT.mkdir(parents=True, exist_ok=True)
    files: list[Path] = []
    rows: list[dict[str, str]] = []
    plan_file = ROOT / "docs" / "social" / "turnkey-social-plan-v3.csv"
    with plan_file.open(newline="", encoding="utf-8") as handle:
        plan_rows = list(csv.DictReader(handle))
    for post, (item, caption, plan) in enumerate(zip(CREATIVES, CAPTIONS, plan_rows), start=1):
        filename = f"{post:02d}-{slug(item['hook'])}.png"
        output = OUT / filename
        image = RENDERERS[item["kind"]](item, post).convert("RGB")
        image.save(output, "PNG", optimize=True)
        files.append(output)
        rows.append(
            {
                "post": str(post),
                "week": plan["week"],
                "publish_date": plan["publish_date"],
                "pillar": plan["pillar"],
                "funnel_stage": plan["funnel_stage"],
                "filename": filename,
                "visual_family": plan["visual_family"],
                "on_image_hook": item["hook"],
                "caption": caption,
                "cta": plan["cta"],
                "primary_channels": plan["primary_channels"],
                "source_asset": item.get("asset", "Turnkey original typography and diagrams"),
                "format": "1080x1350 PNG",
            }
        )
    with (OUT / "content-calendar-and-captions.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    contact_sheet(files)
    print(f"Generated {len(files)} V3 campaign creatives in {OUT}")


if __name__ == "__main__":
    main()
