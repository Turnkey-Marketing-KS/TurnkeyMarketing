#!/usr/bin/env python3
"""Generate the editorial, website-aligned Turnkey social creative set (v2).

This version intentionally avoids stock photography and generated 3D artwork.
It uses typography, diagrams, real client proof artifacts, and the visual system
already established on the Turnkey website.
"""

from __future__ import annotations

import csv
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "social-creatives" / "turnkey-30-v2"
SIZE = 1080

NAVY = "#232E66"
NAVY_DEEP = "#1A2352"
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
SCRIPT_PATH = "/System/Library/Fonts/Supplemental/SignPainter.ttc"


def font(size: int, weight: str = "regular") -> ImageFont.FreeTypeFont:
    index = {"regular": 0, "bold": 1, "medium": 10, "light": 7}[weight]
    return ImageFont.truetype(FONT_PATH, size, index=index)


def script_font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(SCRIPT_PATH, size)


def asset(relative: str) -> Path:
    return ROOT / relative


def brand_logo(width: int, white: bool = False) -> Image.Image:
    with Image.open(asset("public/turnkey-logo.png")) as raw:
        logo = raw.convert("RGBA")
    ratio = width / logo.width
    logo = logo.resize((width, round(logo.height * ratio)), Image.Resampling.LANCZOS)
    cleaned = []
    for red, green, blue, alpha in logo.getdata():
        cleaned.append(round(max(255 - red, 255 - green, 255 - blue) * alpha / 255))
    mask = Image.new("L", logo.size)
    mask.putdata(cleaned)
    logo.putalpha(mask)
    if white:
        white_logo = Image.new("RGBA", logo.size, WHITE)
        white_logo.putalpha(mask)
        return white_logo
    return logo


def add_logo(canvas: Image.Image, x: int = 72, y: int = 60, width: int = 240, white: bool = False) -> None:
    canvas.alpha_composite(brand_logo(width, white), (x, y))


def paper(background: str, seed: int) -> Image.Image:
    base = Image.new("RGB", (SIZE, SIZE), background)
    rng = random.Random(seed)
    grain = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    pixels = grain.load()
    for _ in range(13000):
        x = rng.randrange(SIZE)
        y = rng.randrange(SIZE)
        shade = rng.choice((0, 255))
        pixels[x, y] = (shade, shade, shade, rng.randrange(2, 9))
    return Image.alpha_composite(base.convert("RGBA"), grain)


def wrap(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    output: list[str] = []
    for paragraph in text.split("\n"):
        words = paragraph.split()
        line = ""
        for word in words:
            trial = word if not line else f"{line} {word}"
            if draw.textbbox((0, 0), trial, font=f)[2] <= max_width:
                line = trial
            else:
                if line:
                    output.append(line)
                line = word
        if line:
            output.append(line)
    return output


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


def draw_text_box(
    draw: ImageDraw.ImageDraw,
    text: str,
    box: tuple[int, int, int, int],
    color: str,
    start: int,
    minimum: int,
    weight: str = "bold",
    spacing_ratio: float = 0.08,
) -> int:
    x1, y1, x2, y2 = box
    f, lines, spacing = fit_text(draw, text, x2 - x1, y2 - y1, start, minimum, weight, spacing_ratio)
    block = "\n".join(lines)
    draw.multiline_text((x1, y1), block, font=f, fill=color, spacing=spacing)
    bounds = draw.multiline_textbbox((x1, y1), block, font=f, spacing=spacing)
    return bounds[3]


def pill(draw: ImageDraw.ImageDraw, text: str, x: int, y: int, fill: str, color: str) -> int:
    label = text.upper()
    f = font(18, "bold")
    width = draw.textbbox((0, 0), label, font=f)[2] + 34
    draw.rounded_rectangle((x, y, x + width, y + 38), radius=19, fill=fill)
    draw.text((x + 17, y + 20), label, font=f, fill=color, anchor="lm")
    return width


def header(canvas: Image.Image, index: int, series: str, dark: bool = False) -> None:
    draw = ImageDraw.Draw(canvas)
    add_logo(canvas, white=dark)
    color = "#D8DCEE" if dark else MUTED
    draw.text((1008, 82), f"{series.upper()}  /  {index:02d}", font=font(17, "medium"), fill=color, anchor="rs")


def footer(draw: ImageDraw.ImageDraw, dark: bool = False, note: str = "TURNKEYMARKETING.US") -> None:
    color = "#D8DCEE" if dark else NAVY
    draw.line((72, 1000, 1008, 1000), fill=(255, 255, 255, 34) if dark else HAIRLINE, width=2)
    draw.text((72, 1032), note, font=font(17, "bold"), fill=color, anchor="lm")
    draw.ellipse((992, 1024, 1008, 1040), fill=GREEN)


def add_shadowed_card(
    canvas: Image.Image,
    box: tuple[int, int, int, int],
    radius: int = 28,
    fill: str = WHITE,
    shadow_alpha: int = 38,
) -> None:
    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    x1, y1, x2, y2 = box
    sd.rounded_rectangle((x1, y1 + 14, x2, y2 + 14), radius=radius, fill=(20, 22, 28, shadow_alpha))
    shadow = shadow.filter(ImageFilter.GaussianBlur(20))
    canvas.alpha_composite(shadow)
    ImageDraw.Draw(canvas).rounded_rectangle(box, radius=radius, fill=fill, outline=HAIRLINE, width=2)


def contain_image(source: Path, size: tuple[int, int], background: str = WHITE) -> Image.Image:
    with Image.open(source) as raw:
        image = ImageOps.exif_transpose(raw).convert("RGB")
    image.thumbnail(size, Image.Resampling.LANCZOS)
    result = Image.new("RGB", size, background)
    result.paste(image, ((size[0] - image.width) // 2, (size[1] - image.height) // 2))
    return result.convert("RGBA")


def marker_underline(draw: ImageDraw.ImageDraw, x1: int, y: int, x2: int, color: str) -> None:
    points = [(x1, y), (x1 + (x2 - x1) * 0.22, y + 5), (x1 + (x2 - x1) * 0.55, y - 2), (x2, y + 4)]
    draw.line(points, fill=color, width=12, joint="curve")


def draw_type(item: dict, index: int) -> Image.Image:
    bg = item.get("bg", CREAM)
    dark = bg in {NAVY, NAVY_DEEP, CHARCOAL}
    canvas = paper(bg, index)
    draw = ImageDraw.Draw(canvas)
    header(canvas, index, item["series"], dark)
    primary = WHITE if dark else CHARCOAL
    secondary = "#C9CDE1" if dark else MUTED
    accent = item.get("accent", BLUE)
    pill(draw, item["eyebrow"], 72, 198, accent, NAVY_DEEP if accent == GREEN else WHITE)
    y = draw_text_box(draw, item["title"], (72, 278, 1008, 742), primary, item.get("size", 108), 56)
    body_bottom = y
    if item.get("body"):
        body_y = min(y + 38, 818)
        body_bottom = draw_text_box(draw, item["body"], (72, body_y, 780, 914), secondary, 30, 23, "regular", 0.14)
    if item.get("note"):
        note_y = min(max(y + 34, body_bottom + 28), 902)
        draw.text((76, note_y), item["note"], font=script_font(38), fill=accent)
        marker_underline(draw, 74, min(note_y + 50, 954), 390, accent)
    # Cropped registration number gives the system an editorial/poster feel.
    draw.text((1014, 936), f"{index:02d}", font=font(200, "bold"), fill=item.get("ghost", BLUE_SOFT if not dark else "#2A356F"), anchor="rs")
    footer(draw, dark)
    return canvas


def draw_list(item: dict, index: int) -> Image.Image:
    bg = item.get("bg", CREAM)
    dark = bg in {NAVY, NAVY_DEEP, CHARCOAL}
    canvas = paper(bg, index)
    draw = ImageDraw.Draw(canvas)
    header(canvas, index, item["series"], dark)
    accent = item.get("accent", BLUE)
    primary = WHITE if dark else CHARCOAL
    muted = "#C9CDE1" if dark else MUTED
    pill(draw, item["eyebrow"], 72, 178, accent, NAVY_DEEP if accent == GREEN else WHITE)
    title_bottom = draw_text_box(draw, item["title"], (72, 250, 1008, 486), primary, 78, 48)
    start_y = max(532, title_bottom + 36)
    items = item["items"]
    row_height = min(112, int((946 - start_y) / len(items)))
    for i, text in enumerate(items):
        y = start_y + i * row_height
        draw.rounded_rectangle((72, y, 1008, y + row_height - 18), radius=22, fill=(255, 255, 255, 22) if dark else WHITE, outline=(255, 255, 255, 35) if dark else HAIRLINE, width=2)
        draw.ellipse((96, y + 25, 136, y + 65), fill=accent)
        draw.text((116, y + 46), "✓", font=font(24, "bold"), fill=NAVY_DEEP if accent == GREEN else WHITE, anchor="mm")
        draw.text((160, y + 46), text, font=font(29, "medium"), fill=primary, anchor="lm")
        draw.text((970, y + 46), f"0{i + 1}", font=font(18, "medium"), fill=muted, anchor="rm")
    footer(draw, dark)
    return canvas


def draw_stat(item: dict, index: int) -> Image.Image:
    canvas = paper(item.get("bg", CREAM), index)
    draw = ImageDraw.Draw(canvas)
    header(canvas, index, item["series"], False)
    accent = item.get("accent", BLUE)
    pill(draw, item["eyebrow"], 72, 192, accent, NAVY_DEEP if accent == GREEN else WHITE)
    draw.text((68, 286), item["metric"], font=font(item.get("metric_size", 212), "bold"), fill=NAVY)
    title_y = 520
    draw_text_box(draw, item["title"], (76, title_y, 732, 714), CHARCOAL, 64, 42)
    if item.get("body"):
        draw_text_box(draw, item["body"], (76, 742, 700, 914), MUTED, 28, 23, "regular", 0.15)
    # Website-inspired mini dashboard on the right.
    add_shadowed_card(canvas, (754, 294, 1008, 922), 32)
    draw = ImageDraw.Draw(canvas)
    draw.text((788, 342), item.get("chart_title", "MOMENTUM"), font=font(17, "bold"), fill=MUTED)
    values = item.get("values", [24, 34, 46, 55, 66, 78, 90, 100])
    for i, value in enumerate(values):
        x = 790 + i * 24
        top = 824 - round(value * 3.55)
        draw.rounded_rectangle((x, top, x + 13, 824), radius=6, fill=NAVY if i % 2 == 0 else accent)
    draw.line((788, 842, 974, 842), fill=HAIRLINE, width=2)
    draw.text((788, 880), "clear signal", font=script_font(31), fill=accent)
    footer(draw)
    return canvas


def draw_quote(item: dict, index: int) -> Image.Image:
    bg = item.get("bg", CREAM)
    dark = bg in {NAVY, NAVY_DEEP, CHARCOAL}
    canvas = paper(bg, index)
    draw = ImageDraw.Draw(canvas)
    header(canvas, index, "owner note", dark)
    primary = WHITE if dark else CHARCOAL
    muted = "#C9CDE1" if dark else MUTED
    accent = item.get("accent", GREEN)
    draw.text((64, 194), "“", font=font(210, "bold"), fill=accent)
    draw_text_box(draw, item["title"], (72, 354, 994, 794), primary, item.get("size", 78), 46, "medium", 0.13)
    draw.line((72, 856, 188, 856), fill=accent, width=10)
    draw.text((72, 898), item["person"].upper(), font=font(23, "bold"), fill=primary)
    draw.text((72, 936), item["shop"], font=font(22, "regular"), fill=muted)
    draw.text((1004, 864), "actual words from a shop owner", font=script_font(31), fill=accent, anchor="ra")
    footer(draw, dark)
    return canvas


def draw_proof(item: dict, index: int) -> Image.Image:
    canvas = paper(CREAM, index)
    draw = ImageDraw.Draw(canvas)
    header(canvas, index, "client file")
    accent = item.get("accent", BLUE)
    pill(draw, "REAL CLIENT RESULT", 72, 186, accent, NAVY_DEEP if accent == GREEN else WHITE)
    draw.text((72, 266), item["metric"], font=font(item.get("metric_size", 142), "bold"), fill=NAVY)
    draw_text_box(draw, item["title"], (72, 430, 524, 650), CHARCOAL, 54, 36)
    draw_text_box(draw, "Client-specific result. Results vary.", (72, 690, 500, 760), MUTED, 23, 20, "regular")

    box = (560, 188, 1008, 790)
    add_shadowed_card(canvas, box, 30, WHITE, 48)
    screenshot = contain_image(asset(item["asset"]), (400, 500), WHITE)
    canvas.alpha_composite(screenshot, (584, 236))
    draw = ImageDraw.Draw(canvas)
    # Tape and handwritten annotation make the real artifact feel intentionally presented.
    tape = Image.new("RGBA", (144, 42), (147, 200, 69, 105))
    tape = tape.rotate(-4, expand=True, resample=Image.Resampling.BICUBIC)
    canvas.alpha_composite(tape, (708, 170))
    draw = ImageDraw.Draw(canvas)
    draw.text((994, 830), item.get("note", "proof, not a promise"), font=script_font(34), fill=accent, anchor="ra")
    marker_underline(draw, 694, 858, 996, accent)
    footer(draw)
    return canvas


def draw_service(item: dict, index: int) -> Image.Image:
    bg = item.get("bg", CREAM)
    dark = bg in {NAVY, NAVY_DEEP, CHARCOAL}
    canvas = paper(bg, index)
    draw = ImageDraw.Draw(canvas)
    header(canvas, index, "service map", dark)
    accent = item.get("accent", BLUE)
    primary = WHITE if dark else CHARCOAL
    muted = "#C9CDE1" if dark else MUTED
    pill(draw, "WHAT TURNKEY OWNS", 72, 182, accent, NAVY_DEEP if accent == GREEN else WHITE)
    title_bottom = draw_text_box(draw, item["title"], (72, 260, 1008, 474), primary, 78, 48)
    if item.get("body"):
        draw_text_box(draw, item["body"], (72, title_bottom + 20, 900, 600), muted, 28, 23, "regular", 0.14)
    labels = item["items"]
    y = 708
    left = 92
    right = 988
    segment = (right - left) / (len(labels) - 1)
    draw.line((left, y, right, y), fill=(255, 255, 255, 65) if dark else HAIRLINE, width=8)
    for i, label in enumerate(labels):
        x = round(left + i * segment)
        draw.ellipse((x - 25, y - 25, x + 25, y + 25), fill=accent, outline=WHITE if dark else CREAM, width=7)
        f, lines, spacing = fit_text(draw, label, 190, 100, 24, 18, "medium", 0.1)
        draw.multiline_text((x, y + 52), "\n".join(lines), font=f, fill=primary, spacing=spacing, anchor="ma", align="center")
        draw.text((x, y - 52), f"0{i + 1}", font=font(17, "medium"), fill=muted, anchor="mm")
    draw.rounded_rectangle((72, 900, 1008, 958), radius=29, fill=WHITE, outline=HAIRLINE, width=2)
    draw.text((100, 930), item.get("footer_note", "ONE PLAN • ONE TEAM • CLEAR NEXT MOVES"), font=font(20, "bold"), fill=NAVY, anchor="lm")
    footer(draw, dark)
    return canvas


def draw_flow(item: dict, index: int) -> Image.Image:
    bg = item.get("bg", CREAM)
    dark = bg in {NAVY, NAVY_DEEP, CHARCOAL}
    canvas = paper(bg, index)
    draw = ImageDraw.Draw(canvas)
    header(canvas, index, item["series"], dark)
    accent = item.get("accent", GREEN)
    primary = WHITE if dark else CHARCOAL
    muted = "#C9CDE1" if dark else MUTED
    pill(draw, item["eyebrow"], 72, 182, accent, NAVY_DEEP if accent == GREEN else WHITE)
    title_bottom = draw_text_box(draw, item["title"], (72, 258, 1008, 510), primary, 78, 48)
    if item.get("body"):
        draw_text_box(draw, item["body"], (72, title_bottom + 22, 870, 610), muted, 27, 22, "regular")
    steps = item["items"]
    y = 742
    card_w = int((884 - 30 * (len(steps) - 1)) / len(steps))
    x = 72
    for i, step in enumerate(steps):
        fill = WHITE
        outline = HAIRLINE
        draw.rounded_rectangle((x, y - 74, x + card_w, y + 74), radius=24, fill=fill, outline=outline, width=2)
        draw.text((x + 20, y - 43), f"0{i + 1}", font=font(16, "bold"), fill=accent)
        f, lines, spacing = fit_text(draw, step, card_w - 40, 76, 24, 18, "medium")
        draw.multiline_text((x + 20, y - 5), "\n".join(lines), font=f, fill=CHARCOAL, spacing=spacing)
        if i < len(steps) - 1:
            arrow_x = x + card_w + 6
            draw.line((arrow_x, y, arrow_x + 18, y), fill=accent, width=5)
            draw.polygon([(arrow_x + 18, y), (arrow_x + 8, y - 8), (arrow_x + 8, y + 8)], fill=accent)
        x += card_w + 30
    footer(draw, dark)
    return canvas


def draw_compare(item: dict, index: int) -> Image.Image:
    canvas = paper(CREAM, index)
    draw = ImageDraw.Draw(canvas)
    header(canvas, index, item["series"])
    pill(draw, item["eyebrow"], 72, 182, BLUE, WHITE)
    draw_text_box(draw, item["title"], (72, 258, 1008, 472), CHARCOAL, 76, 48)
    left = (72, 558, 520, 914)
    right = (560, 558, 1008, 914)
    draw.rounded_rectangle(left, radius=30, fill=OFF_WHITE, outline=HAIRLINE, width=2)
    draw.rounded_rectangle(right, radius=30, fill=NAVY, outline=NAVY, width=2)
    draw.text((106, 606), item["left_label"].upper(), font=font(18, "bold"), fill=MUTED)
    draw.text((594, 606), item["right_label"].upper(), font=font(18, "bold"), fill=GREEN)
    draw_text_box(draw, item["left"], (106, 670, 486, 844), MUTED, 58, 38)
    draw_text_box(draw, item["right"], (594, 670, 974, 844), WHITE, 58, 38)
    draw.line((106, 860, 472, 650), fill="#C8C9CC", width=10)
    marker_underline(draw, 594, 858, 944, GREEN)
    footer(draw)
    return canvas


CREATIVES = [
    dict(kind="type", series="brand note", eyebrow="AUTO REPAIR MARKETING", title="Marketing that knows your auto repair shop.", body="No generalist-agency translation required.", note="specific beats generic", accent=BLUE, bg=CREAM, size=102),
    dict(kind="type", series="shop growth", eyebrow="THE POINT", title="More calls.\nMore cars.\nMore revenue.", body="Less marketing left sitting on the owner's desk.", accent=GREEN, bg=NAVY_DEEP, ghost="#2B356B", size=112),
    dict(kind="stat", series="shop math", eyebrow="TRUSTED NATIONWIDE", metric="300+", title="auto repair shops served across the U.S.", body="Built from one industry's real operating context.", accent=GREEN, values=[18, 27, 36, 48, 61, 73, 88, 100]),
    dict(kind="stat", series="shop math", eyebrow="ONE INDUSTRY", metric="13+", title="years focused on auto repair marketing.", body="Fewer guesses. Faster pattern recognition. Better next moves.", accent=BLUE, values=[12, 24, 35, 49, 63, 77, 89, 100]),
    dict(kind="service", title="Your marketing department. Without the payroll.", body="Strategy and execution belong in the same room.", items=["Strategy", "Creative", "Execution", "Reporting"], accent=GREEN, bg=NAVY_DEEP, footer_note="VIP MARKETING MANAGER • ONE ACCOUNTABLE TEAM"),
    dict(kind="quote", title="They take care of everything.", person="Len Pritchett", shop="RPM Automotive • Prairie Du Chien, WI", accent=GREEN, bg=CREAM, size=92),
    dict(kind="quote", title="One of the best investments I have made in my company.", person="Jason Smith", shop="M&M Car Care Center • Northwest Indiana", accent=GREEN, bg=NAVY_DEEP, size=76),
    dict(kind="quote", title="We got to $300,000/month within one year at a brand new shop.", person="Steve Killian", shop="Killian Auto Pros • Greenville, SC", accent=GREEN, bg=NAVY, size=70),
    dict(kind="proof", metric="130%", title="year-over-year revenue growth.", asset="public/site-media/proof/torque-european-growth.png", accent=BLUE, note="the report behind the result"),
    dict(kind="proof", metric="500+", title="cars — plus $300k revenue after onboarding.", asset="public/site-media/proof/auto-medics-growth.png", accent=GREEN, note="real shop. real numbers."),
    dict(kind="proof", metric="$200k+", metric_size=116, title="monthly revenue crossed for the first time.", asset="public/site-media/proof/sports-car-shop-growth.png", accent=GREEN, note="a first worth measuring"),
    dict(kind="proof", metric="15-20", metric_size=122, title="reviews per month — up from 1-2.", asset="public/site-media/proof/chris-matthews-reviews.png", accent=BLUE, note="consistency compounds"),
    dict(kind="service", title="VIP Marketing Manager", body="A complete outside marketing department with one point of accountability.", items=["Plan", "Creative", "Coordination", "Report"], accent=GREEN, bg=NAVY_DEEP),
    dict(kind="service", title="DirectTrack Marketing", body="A data-driven lane for targeted new-customer growth.", items=["Target", "Reach", "Track", "Improve"], accent=BLUE, bg=CREAM),
    dict(kind="service", title="Direct Mail", body="A campaign system — not a one-off print job.", items=["List", "Offer", "Timing", "Report"], accent=GREEN, bg=CREAM),
    dict(kind="service", title="Social Media Marketing", body="A steady rhythm across the places customers already look.", items=["Facebook", "Instagram", "Google Profile", "Reviews"], accent=BLUE, bg=CREAM),
    dict(kind="service", title="Retention Marketing", body="Protect the money already spent earning the customer.", items=["Newsletter", "Thank-you", "CRM", "Return visit"], accent=GREEN, bg=NAVY),
    dict(kind="service", title="Digital Marketing", body="Keep the core visibility pieces connected.", items=["Reviews", "Google Profile", "Website", "Vendors"], accent=BLUE, bg=CREAM),
    dict(kind="flow", series="campaign map", eyebrow="WHEN THE BAYS SLOW", title="Boost Days", body="A focused demand push when timing matters.", items=["Strategy", "Email + text", "Social", "Call review"], accent=GREEN, bg=NAVY_DEEP),
    dict(kind="service", title="Marketing Consulting", body="Experienced direction without another vendor to manage.", items=["Review", "Start", "Stop", "Next move"], accent=BLUE, bg=CREAM),
    dict(kind="list", series="decision filter", eyebrow="CLEAR NEXT MOVES", title="A useful report answers four questions.", items=["What do we keep?", "What do we fix?", "What stops getting funded?", "What runs next?"], accent=BLUE, bg=CREAM),
    dict(kind="type", series="shop reality", eyebrow="DEMAND + CAPACITY", title="Empty bays are expensive.", body="Build demand before the schedule needs rescuing.", note="plan before the gap", accent=GREEN, bg=NAVY, ghost="#2D3873", size=112),
    dict(kind="compare", series="reporting", eyebrow="MEASURE WHAT MATTERS", title="Follow the metric all the way to the shop.", left_label="Vanity", left="Clicks", right_label="Outcome", right="Booked cars"),
    dict(kind="list", series="local visibility", eyebrow="YOUR DIGITAL FRONT DOOR", title="A stronger Google profile looks cared for.", items=["Current shop information", "Recent, useful photos", "Consistent review activity", "Clear local relevance"], accent=BLUE, bg=CREAM),
    dict(kind="type", series="channel truth", eyebrow="DIRECT MAIL", title="Direct mail isn't dead. Bad targeting is.", body="The list, offer, timing, and follow-up are the strategy.", accent=GREEN, bg=CREAM, size=94),
    dict(kind="flow", series="customer rhythm", eyebrow="RETENTION", title="Retention protects what acquisition costs.", body="The first visit should not be the end of the conversation.", items=["First visit", "Thank-you", "Newsletter", "Next visit"], accent=GREEN, bg=NAVY),
    dict(kind="list", series="reporting", eyebrow="HONEST NUMBERS", title="Track what helps the owner decide.", items=["Calls", "Booked appointments", "Repair-order quality", "Car count + revenue"], accent=BLUE, bg=CREAM),
    dict(kind="flow", series="strategy", eyebrow="SHOP-SPECIFIC PLAN", title="Make the next move obvious.", body="The plan should fit the shop — not the other way around.", items=["Market", "Capacity", "Goals", "Customer mix"], accent=BLUE, bg=CREAM),
    dict(kind="service", title="We'll take it from here.", body="You run the shop. Turnkey owns the moving pieces.", items=["Plan", "Vendors", "Campaigns", "Reporting"], accent=GREEN, bg=NAVY_DEEP, footer_note="LESS CHASING • MORE CLARITY • ONE TEAM"),
    dict(kind="type", series="next step", eyebrow="READY FOR A CLEARER PLAN?", title="Get marketing off your plate.", body="Book a consultation at turnkeymarketing.us", note="we'll take it from here", accent=GREEN, bg=NAVY_DEEP, ghost="#2B356B", size=102),
]


RENDERERS = {
    "type": draw_type,
    "list": draw_list,
    "stat": draw_stat,
    "quote": draw_quote,
    "proof": draw_proof,
    "service": draw_service,
    "flow": draw_flow,
    "compare": draw_compare,
}


def create_contact_sheet(files: list[Path]) -> None:
    thumb = 260
    label_h = 40
    cols = 5
    rows = math.ceil(len(files) / cols)
    sheet = Image.new("RGB", (cols * thumb, rows * (thumb + label_h)), OFF_WHITE)
    draw = ImageDraw.Draw(sheet)
    for i, file in enumerate(files):
        with Image.open(file) as raw:
            tile = raw.convert("RGB").resize((thumb, thumb), Image.Resampling.LANCZOS)
        x = (i % cols) * thumb
        y = (i // cols) * (thumb + label_h)
        sheet.paste(tile, (x, y))
        draw.rectangle((x, y + thumb, x + thumb, y + thumb + label_h), fill=WHITE)
        draw.text((x + 12, y + thumb + 21), f"{i + 1:02d}  {file.stem[3:27]}", font=font(15, "bold"), fill=NAVY, anchor="lm")
    sheet.save(OUT / "turnkey-30-v2-contact-sheet.jpg", quality=92, optimize=True)


def slug(text: str) -> str:
    clean = "".join(character.lower() if character.isalnum() else "-" for character in text)
    return "-".join(part for part in clean.split("-") if part)[:70]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    old_captions = []
    old_csv = ROOT / "public" / "social-creatives" / "turnkey-30" / "captions-and-sources.csv"
    if old_csv.exists():
        with old_csv.open(newline="", encoding="utf-8") as handle:
            old_captions = list(csv.DictReader(handle))
    files: list[Path] = []
    rows: list[dict[str, str]] = []
    for index, item in enumerate(CREATIVES, start=1):
        output = OUT / f"{index:02d}-{slug(item['title'])}.png"
        rendered = RENDERERS[item["kind"]](item, index).convert("RGB")
        rendered.save(output, "PNG", optimize=True)
        files.append(output)
        previous = old_captions[index - 1] if index <= len(old_captions) else {}
        rows.append(
            {
                "post": str(index),
                "filename": output.name,
                "design_family": item["kind"],
                "on_image_copy": item["title"],
                "caption": previous.get("caption", ""),
                "cta": previous.get("cta", "Learn more at turnkeymarketing.us"),
                "source_asset": item.get("asset", "Turnkey brand typography and original diagrams"),
                "format": "1080x1080 PNG",
            }
        )
    with (OUT / "captions-and-sources.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    create_contact_sheet(files)
    print(f"Generated {len(files)} editorial creatives in {OUT}")


if __name__ == "__main__":
    main()
