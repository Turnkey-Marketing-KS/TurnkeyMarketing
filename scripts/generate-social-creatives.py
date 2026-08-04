#!/usr/bin/env python3
"""Generate Turnkey Marketing's 30-post social creative set.

The layouts are intentionally rendered from approved project assets rather than
AI-redrawing photos or the logo. This keeps names, claims, and brand marks exact.
"""

from __future__ import annotations

import csv
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "social-creatives" / "turnkey-30"
SIZE = 1080

NAVY = "#232E66"
NAVY_DEEP = "#171E49"
BLUE = "#3F8CCB"
GREEN = "#93C845"
CREAM = "#FBFAF6"
OFF_WHITE = "#F4F2ED"
CHARCOAL = "#14161C"
MUTED = "#626779"
WHITE = "#FFFFFF"

FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REGULAR, size)


def path(relative: str) -> Path:
    return ROOT / relative


def cover(source: Path, size: tuple[int, int], center: tuple[float, float] = (0.5, 0.5)) -> Image.Image:
    with Image.open(source) as raw:
        image = ImageOps.exif_transpose(raw).convert("RGB")
    return ImageOps.fit(image, size, method=Image.Resampling.LANCZOS, centering=center)


def rounded_image(
    source: Path,
    size: tuple[int, int],
    radius: int = 42,
    center: tuple[float, float] = (0.5, 0.5),
) -> Image.Image:
    image = cover(source, size, center).convert("RGBA")
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    image.putalpha(mask)
    return image


def brand_logo(width: int, white: bool = False) -> Image.Image:
    with Image.open(path("public/turnkey-logo.png")) as raw:
        logo = raw.convert("RGBA")
    ratio = width / logo.width
    logo = logo.resize((width, round(logo.height * ratio)), Image.Resampling.LANCZOS)
    # The supplied logo has a mostly opaque white canvas. Convert pixels that are
    # visually white into transparency so the mark can sit cleanly on any layout.
    cleaned_alpha = []
    for red, green, blue, source_alpha in logo.getdata():
        distance_from_white = max(255 - red, 255 - green, 255 - blue)
        cleaned_alpha.append(round(distance_from_white * source_alpha / 255))
    alpha_mask = Image.new("L", logo.size)
    alpha_mask.putdata(cleaned_alpha)
    logo.putalpha(alpha_mask)
    if white:
        alpha = logo.getchannel("A")
        white_layer = Image.new("RGBA", logo.size, WHITE)
        white_layer.putalpha(alpha)
        logo = white_layer
    return logo


def add_logo(canvas: Image.Image, xy: tuple[int, int], width: int = 320, white: bool = False) -> None:
    logo = brand_logo(width, white)
    canvas.alpha_composite(logo, xy)


def add_url(draw: ImageDraw.ImageDraw, color: str, y: int = 1008) -> None:
    draw.text((72, y), "TURNKEYMARKETING.US", font=font(22, True), fill=color, anchor="ls")
    draw.ellipse((984, y - 18, 1000, y - 2), fill=GREEN)


def wrap(draw: ImageDraw.ImageDraw, text: str, text_font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = word if not current else f"{current} {word}"
        if draw.textbbox((0, 0), trial, font=text_font)[2] <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def fit_lines(
    draw: ImageDraw.ImageDraw,
    text: str,
    max_width: int,
    max_height: int,
    start_size: int,
    min_size: int = 36,
    bold: bool = True,
    spacing_ratio: float = 0.12,
) -> tuple[ImageFont.FreeTypeFont, list[str], int]:
    for size in range(start_size, min_size - 1, -2):
        text_font = font(size, bold)
        lines = wrap(draw, text, text_font, max_width)
        spacing = max(8, round(size * spacing_ratio))
        bbox = draw.multiline_textbbox((0, 0), "\n".join(lines), font=text_font, spacing=spacing)
        if bbox[3] - bbox[1] <= max_height:
            return text_font, lines, spacing
    text_font = font(min_size, bold)
    return text_font, wrap(draw, text, text_font, max_width), max(8, round(min_size * spacing_ratio))


def headline(
    draw: ImageDraw.ImageDraw,
    text: str,
    box: tuple[int, int, int, int],
    color: str,
    start_size: int = 92,
    min_size: int = 44,
    anchor: str = "la",
) -> int:
    x1, y1, x2, y2 = box
    text_font, lines, spacing = fit_lines(draw, text, x2 - x1, y2 - y1, start_size, min_size)
    block = "\n".join(lines)
    draw.multiline_text((x1, y1), block, font=text_font, fill=color, spacing=spacing, anchor=anchor)
    bbox = draw.multiline_textbbox((x1, y1), block, font=text_font, spacing=spacing, anchor=anchor)
    return bbox[3]


def pill(draw: ImageDraw.ImageDraw, text: str, xy: tuple[int, int], fill: str, color: str) -> None:
    x, y = xy
    f = font(22, True)
    bbox = draw.textbbox((0, 0), text.upper(), font=f)
    w = bbox[2] - bbox[0] + 34
    draw.rounded_rectangle((x, y, x + w, y + 42), radius=21, fill=fill)
    draw.text((x + 17, y + 21), text.upper(), font=f, fill=color, anchor="lm")


def gradient_overlay(image: Image.Image, top_alpha: int, bottom_alpha: int, color: str = NAVY_DEEP) -> Image.Image:
    base = image.convert("RGBA")
    rgb = tuple(int(color[i : i + 2], 16) for i in (1, 3, 5))
    overlay = Image.new("RGBA", base.size)
    pixels = overlay.load()
    h = base.height
    for y in range(h):
        t = y / max(1, h - 1)
        alpha = round(top_alpha + (bottom_alpha - top_alpha) * t)
        for x in range(base.width):
            pixels[x, y] = (*rgb, alpha)
    return Image.alpha_composite(base, overlay)


def photo_statement(item: dict) -> Image.Image:
    photo = cover(path(item["asset"]), (SIZE, SIZE), item.get("center", (0.5, 0.5)))
    photo = ImageEnhance.Contrast(photo).enhance(1.04)
    canvas = gradient_overlay(photo, item.get("top_alpha", 30), item.get("bottom_alpha", 225))
    draw = ImageDraw.Draw(canvas)
    add_logo(canvas, (70, 64), 300, white=True)
    pill(draw, item["eyebrow"], (72, 602), GREEN, NAVY_DEEP)
    y = headline(draw, item["title"], (72, 674, 986, 916), WHITE, start_size=item.get("size", 88))
    if item.get("sub"):
        draw.text((74, min(y + 24, 940)), item["sub"], font=font(28), fill="#E8EAF6")
    add_url(draw, WHITE)
    return canvas


def split_card(item: dict) -> Image.Image:
    canvas = Image.new("RGBA", (SIZE, SIZE), item.get("bg", CREAM))
    draw = ImageDraw.Draw(canvas)
    image = rounded_image(path(item["asset"]), (936, 474), 48, item.get("center", (0.5, 0.5)))
    canvas.alpha_composite(image, (72, 72))
    accent = item.get("accent", BLUE)
    pill(draw, item["eyebrow"], (72, 590), accent, WHITE)
    y = headline(draw, item["title"], (72, 654, 1004, 874), CHARCOAL, start_size=item.get("size", 76), min_size=42)
    if item.get("sub"):
        subfont, lines, spacing = fit_lines(draw, item["sub"], 900, 88, 29, 24, False)
        draw.multiline_text((74, min(y + 22, 915)), "\n".join(lines), font=subfont, fill=MUTED, spacing=spacing)
    add_url(draw, NAVY)
    add_logo(canvas, (710, 994), 298, white=False)
    return canvas


def service_card(item: dict) -> Image.Image:
    canvas = Image.new("RGBA", (SIZE, SIZE), CREAM)
    draw = ImageDraw.Draw(canvas)
    image = cover(path(item["asset"]), (SIZE, 570), item.get("center", (0.5, 0.5))).convert("RGBA")
    canvas.alpha_composite(image, (0, 0))
    draw.rectangle((0, 520, SIZE, 1080), fill=CREAM)
    draw.rounded_rectangle((72, 484, 316, 536), radius=26, fill=item.get("accent", BLUE))
    draw.text((194, 510), "SERVICE SPOTLIGHT", font=font(22, True), fill=WHITE, anchor="mm")
    y = headline(draw, item["title"], (72, 576, 1000, 734), NAVY, start_size=74, min_size=46)
    bodyfont, lines, spacing = fit_lines(draw, item["sub"], 900, 160, 31, 25, False)
    draw.multiline_text((74, y + 26), "\n".join(lines), font=bodyfont, fill=CHARCOAL, spacing=spacing)
    add_url(draw, NAVY)
    add_logo(canvas, (710, 994), 298, white=False)
    return canvas


def quote_card(item: dict) -> Image.Image:
    canvas = Image.new("RGBA", (SIZE, SIZE), NAVY_DEEP)
    draw = ImageDraw.Draw(canvas)
    portrait = rounded_image(path(item["asset"]), (380, 936), 44, item.get("center", (0.5, 0.34)))
    canvas.alpha_composite(portrait, (628, 72))
    add_logo(canvas, (72, 64), 310, white=True)
    draw.text((70, 326), "“", font=font(160, True), fill=GREEN)
    quote_font, lines, spacing = fit_lines(draw, item["title"], 494, 410, 66, 42, True, 0.18)
    draw.multiline_text((74, 450), "\n".join(lines), font=quote_font, fill=WHITE, spacing=spacing)
    draw.rectangle((72, 844, 126, 852), fill=GREEN)
    draw.text((72, 884), item["person"], font=font(26, True), fill=WHITE)
    draw.text((72, 920), item["shop"], font=font(24), fill="#C9CDE1")
    add_url(draw, WHITE)
    return canvas


def metric_card(item: dict) -> Image.Image:
    canvas = Image.new("RGBA", (SIZE, SIZE), item.get("bg", OFF_WHITE))
    draw = ImageDraw.Draw(canvas)
    accent = item.get("accent", GREEN)
    draw.rounded_rectangle((590, 72, 1008, 1008), radius=50, fill=NAVY)
    if item.get("asset"):
        image = rounded_image(path(item["asset"]), (370, 354), 34, item.get("center", (0.5, 0.5)))
        canvas.alpha_composite(image, (614, 96))
    add_logo(canvas, (72, 64), 340)
    pill(draw, item["eyebrow"], (72, 278), accent, NAVY_DEEP if accent == GREEN else WHITE)
    draw.text((72, 406), item["metric"], font=font(item.get("metric_size", 146), True), fill=NAVY)
    y = headline(draw, item["title"], (72, 580, 534, 824), CHARCOAL, start_size=item.get("size", 54), min_size=38)
    if item.get("sub"):
        f, lines, spacing = fit_lines(draw, item["sub"], 462, 120, 26, 22, False)
        draw.multiline_text((74, y + 20), "\n".join(lines), font=f, fill=MUTED, spacing=spacing)

    values = item.get("values", [26, 36, 45, 54, 69, 78, 91, 100])
    chart_x, chart_y, chart_w, chart_h = 630, 534, 338, 260
    points = []
    for idx, value in enumerate(values):
        px = chart_x + idx * chart_w / (len(values) - 1)
        py = chart_y + chart_h - value * chart_h / 110
        points.append((px, py))
    draw.line(points, fill=accent, width=12, joint="curve")
    for px, py in points:
        draw.ellipse((px - 10, py - 10, px + 10, py + 10), fill=accent)
    draw.text((630, 850), item.get("chart_label", "MEASURABLE MOMENTUM"), font=font(21, True), fill="#DDE1F2")
    draw.text((630, 894), "Clear reporting.\nClear next moves.", font=font(31, True), fill=WHITE, spacing=10)
    add_url(draw, NAVY)
    return canvas


def editorial_card(item: dict) -> Image.Image:
    bg = item.get("bg", CREAM)
    canvas = Image.new("RGBA", (SIZE, SIZE), bg)
    draw = ImageDraw.Draw(canvas)
    accent = item.get("accent", GREEN)
    dark = bg in {NAVY, NAVY_DEEP, CHARCOAL}
    primary = WHITE if dark else CHARCOAL
    secondary = "#DCE0F0" if dark else MUTED
    logo_white = dark
    add_logo(canvas, (72, 64), 320, white=logo_white)

    # Oversized target/routing motif unique to this family.
    motif_x, motif_y = 842, 268
    for radius, alpha in [(184, 55), (128, 90), (72, 150)]:
        layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
        ld = ImageDraw.Draw(layer)
        rgb = tuple(int(accent[i : i + 2], 16) for i in (1, 3, 5))
        ld.ellipse((motif_x - radius, motif_y - radius, motif_x + radius, motif_y + radius), outline=(*rgb, alpha), width=18)
        canvas.alpha_composite(layer)
    draw.ellipse((motif_x - 23, motif_y - 23, motif_x + 23, motif_y + 23), fill=accent)
    pill(draw, item["eyebrow"], (72, 310), accent, NAVY_DEEP if accent == GREEN else WHITE)
    y = headline(draw, item["title"], (72, 392, 980, 770), primary, start_size=item.get("size", 88), min_size=48)
    if item.get("sub"):
        f, lines, spacing = fit_lines(draw, item["sub"], 850, 130, 30, 24, False)
        draw.multiline_text((74, y + 34), "\n".join(lines), font=f, fill=secondary, spacing=spacing)
    if item.get("cta"):
        cta = item["cta"].upper()
        f = font(23, True)
        w = draw.textbbox((0, 0), cta, font=f)[2] + 56
        draw.rounded_rectangle((72, 900, 72 + w, 958), radius=29, fill=accent)
        draw.text((100, 929), cta, font=f, fill=NAVY_DEEP if accent == GREEN else WHITE, anchor="lm")
    add_url(draw, WHITE if dark else NAVY)
    return canvas


CREATIVES = [
    dict(template="photo", slug="marketing-that-knows-auto-repair", eyebrow="AUTO REPAIR MARKETING", title="Marketing that knows your auto repair shop.", sub="Strategy, execution, and reporting under one roof.", asset="public/site-media/hero-thunderbird-shop.webp", center=(0.52, 0.5), size=82),
    dict(template="photo", slug="more-calls-more-cars-more-revenue", eyebrow="THE TURNKEY OUTCOME", title="More calls. More cars. More revenue.", sub="Without adding marketing to your to-do list.", asset="public/site-media/pearson-auto-repair-shop.webp", center=(0.45, 0.45), size=90),
    dict(template="metric", slug="300-shops-served", eyebrow="BUILT FOR SHOP OWNERS", metric="300+", title="auto repair shops served across the U.S.", sub="One industry. A proven playbook. Shop-specific strategy.", asset="public/site-media/thunderbird-team.webp", accent=GREEN, values=[18, 26, 37, 48, 61, 76, 90, 100]),
    dict(template="metric", slug="13-years-one-industry", eyebrow="AUTO REPAIR ONLY", metric="13+", title="years focused on one industry.", sub="Deep context means fewer guesses and faster next moves.", asset="public/site-media/team-turnkey-2025.webp", accent=BLUE, values=[15, 27, 42, 50, 63, 72, 88, 100]),
    dict(template="editorial", slug="outside-marketing-department", eyebrow="VIP MARKETING MANAGER", title="Your marketing department. Without the payroll.", sub="One accountable team for strategy, creative, execution, and reporting.", cta="See the full-service approach", bg=NAVY_DEEP, accent=GREEN, size=82),
    dict(template="quote", slug="testimonial-len-pritchett", title="They take care of everything.", person="LEN PRITCHETT", shop="RPM Automotive • Prairie Du Chien, WI", asset="public/images/clients/len-pritchett.jpeg", center=(0.5, 0.36)),
    dict(template="quote", slug="testimonial-jason-smith", title="One of the best investments I have made in my company.", person="JASON SMITH", shop="M&M Car Care Center • Northwest Indiana", asset="public/images/clients/jason-smith.jpg", center=(0.48, 0.24)),
    dict(template="quote", slug="testimonial-steve-killian", title="We got to $300,000/month within one year at a brand new shop.", person="STEVE KILLIAN", shop="Killian Auto Pros • Greenville, SC", asset="public/images/clients/steve-killian.jpeg", center=(0.5, 0.28)),
    dict(template="metric", slug="torque-european-growth", eyebrow="CLIENT RESULT", metric="130%", metric_size=132, title="year-over-year revenue growth.", sub="A coordinated marketing push tied to measurable growth. Client results vary.", asset="public/site-media/proof/torque-european-growth.png", center=(0.5, 0.42), accent=BLUE, values=[30, 38, 47, 58, 70, 82, 93, 100]),
    dict(template="metric", slug="auto-medics-growth", eyebrow="CLIENT RESULT", metric="500+", metric_size=126, title="cars — plus $300k revenue after onboarding.", sub="A client-specific milestone. Client results vary.", asset="public/site-media/proof/auto-medics-growth.png", center=(0.5, 0.3), accent=GREEN, values=[28, 39, 45, 58, 66, 78, 90, 100]),
    dict(template="metric", slug="sports-car-shop-growth", eyebrow="CLIENT RESULT", metric="$200k+", metric_size=106, title="monthly revenue crossed for the first time.", sub="A client-specific milestone. Client results vary.", asset="public/site-media/proof/sports-car-shop-growth.png", center=(0.5, 0.3), accent=GREEN, values=[35, 41, 46, 57, 68, 81, 91, 100]),
    dict(template="metric", slug="review-growth", eyebrow="REPUTATION RESULT", metric="15-20", metric_size=116, title="reviews per month — up from 1-2.", sub="Chris Matthews Automotive. Client results vary.", asset="public/site-media/proof/chris-matthews-reviews.png", center=(0.5, 0.52), accent=BLUE, values=[10, 11, 13, 33, 49, 68, 87, 100]),
    dict(template="service", slug="service-vip-marketing-manager", title="VIP Marketing Manager", sub="Your outside marketing department — strategy, creative, coordination, reporting, and one accountable team.", asset="public/images/services/vip-marketing-manager-hero.jpg", accent=NAVY),
    dict(template="service", slug="service-directtrack-marketing", title="DirectTrack Marketing", sub="Precision-targeted acquisition campaigns with transparent ROI tracking and monthly reporting.", asset="public/images/services/directtrack-marketing-hero.jpg", accent=BLUE),
    dict(template="service", slug="service-direct-mail", title="Direct Mail", sub="Design, list strategy, timing, offers, order verification, and reporting — managed together.", asset="public/images/services/direct-mail-mailbox.png", accent=GREEN),
    dict(template="service", slug="service-social-media", title="Social Media Marketing", sub="Consistent Facebook, Instagram, and Google Business Profile content with review follow-through.", asset="public/images/services/social-media-marketing-hero.jpg", accent=BLUE),
    dict(template="service", slug="service-retention-marketing", title="Retention Marketing", sub="Newsletters, thank-you notes, and CRM follow-up that keep customers connected after the first visit.", asset="public/images/services/retention-marketing-hero.jpg", accent=GREEN),
    dict(template="service", slug="service-digital-marketing", title="Digital Marketing", sub="Google reviews, Business Profile optimization, website audits, and vendor coordination.", asset="public/images/services/digital-marketing-hero.jpg", accent=BLUE),
    dict(template="service", slug="service-boost-days", title="Boost Days", sub="A focused email, text, social, and strategy push when slow spots or open bays need support.", asset="public/images/services/boost-days-hero.jpg", accent=GREEN),
    dict(template="service", slug="service-marketing-consulting", title="Marketing Consulting", sub="Experienced direction on what to change, start, stop, or keep — without another vendor to manage.", asset="public/images/services/marketing-consulting-hero.jpg", accent=NAVY),
    dict(template="split", slug="keep-fix-stop-run-next", eyebrow="CLEAR NEXT MOVES", title="Know what to keep, fix, stop funding, and run next.", sub="Good reporting should make decisions easier — not add another dashboard to decode.", asset="public/site-media/marketing-plan.webp", center=(0.5, 0.54), accent=BLUE, size=66),
    dict(template="photo", slug="empty-bays-are-expensive", eyebrow="DEMAND + CAPACITY", title="Empty bays are expensive.", sub="Build demand before the schedule needs rescuing.", asset="public/site-media/pearson-auto-repair-bays.webp", center=(0.52, 0.48), size=96),
    dict(template="editorial", slug="booked-cars-not-clicks", eyebrow="MEASURE WHAT MATTERS", title="Clicks don't pay the bills. Booked cars do.", sub="Connect spend to calls, appointments, car count, and revenue.", bg=NAVY, accent=GREEN, size=88),
    dict(template="split", slug="google-business-profile", eyebrow="LOCAL VISIBILITY", title="Your Google Business Profile is your digital front door.", sub="Keep the profile, photos, reviews, and local signals working together.", asset="public/images/services/digital-marketing-hero.jpg", center=(0.54, 0.5), accent=BLUE, size=66),
    dict(template="split", slug="direct-mail-targeting", eyebrow="DIRECT MAIL", title="Direct mail isn't dead. Bad targeting is.", sub="The right list, offer, timing, and follow-up still earn attention in a crowded market.", asset="public/images/resources/direct-mail-still-works-v2.jpg", center=(0.5, 0.62), accent=GREEN, size=72),
    dict(template="split", slug="retention-protects-acquisition", eyebrow="RETENTION", title="Retention protects what acquisition costs.", sub="Keep known customers connected with a steady newsletter, thank-you, and CRM rhythm.", asset="public/images/services/retention-marketing-hero.jpg", center=(0.5, 0.5), accent=GREEN, size=70),
    dict(template="editorial", slug="track-the-right-metrics", eyebrow="HONEST REPORTING", title="Track calls, booked appointments, and revenue.", sub="Vanity metrics are easy. Useful accountability is better.", bg=CREAM, accent=BLUE, size=88),
    dict(template="split", slug="marketing-plan-next-move", eyebrow="SHOP-SPECIFIC STRATEGY", title="A marketing plan should make the next move obvious.", sub="Match the plan to your market, capacity, goals, and customer mix.", asset="public/images/resources/auto-repair-marketing-plan-v2.jpg", center=(0.5, 0.5), accent=NAVY, size=70),
    dict(template="photo", slug="well-take-it-from-here", eyebrow="ONE ACCOUNTABLE TEAM", title="We'll take it from here.", sub="You run the shop. Turnkey owns the moving pieces.", asset="public/site-media/team-turnkey-2025.webp", center=(0.5, 0.45), size=102, top_alpha=10, bottom_alpha=235),
    dict(template="editorial", slug="book-a-consultation", eyebrow="READY FOR A CLEARER PLAN?", title="Get marketing off your plate.", sub="Book a consultation and find out what Turnkey should own next.", cta="Book a consultation", bg=NAVY_DEEP, accent=GREEN, size=94),
]


CAPTIONS = [
    "Auto repair marketing works better when the people running it understand the shop. Turnkey connects strategy, execution, and reporting so your next move is clear.",
    "The goal is not more marketing activity. It is more of the right calls, more booked cars, and more revenue — with a team that owns the work.",
    "More than 300 auto repair shops have trusted Turnkey with their marketing. Every market is different; the playbook should still be built for the realities of a repair shop.",
    "For 13+ years, Turnkey has focused on auto repair. That context helps us ask better questions, spot problems faster, and build plans shop owners can actually use.",
    "VIP Marketing Manager brings strategy, creative, execution, vendor coordination, and reporting together under one accountable team.",
    "‘They take care of everything.’ That is the standard: fewer loose ends, fewer vendors to chase, and a clear plan someone owns.",
    "Marketing should feel like an investment you can defend — not another line item you hope is working.",
    "A new location needs more than awareness. It needs coordinated demand, follow-through, and a plan that can adapt as the shop ramps.",
    "A measurable growth story from Torque European: 130% year-over-year revenue growth. Every shop and market is different; client results vary.",
    "Auto Medics crossed 500 cars and $300k in revenue after onboarding. A strong result tied to coordinated execution. Client results vary.",
    "The Sports Car Shop crossed $200k in monthly revenue for the first time after onboarding. Client results vary.",
    "Chris Matthews Automotive moved from 1-2 reviews a month to 15-20. Reputation growth gets easier when the process becomes consistent. Client results vary.",
    "Need the strategy and the execution? VIP Marketing Manager gives your shop an outside marketing department without building one in-house.",
    "DirectTrack combines precision targeting with transparent ROI reporting so new-customer acquisition is easier to evaluate.",
    "Direct mail is strongest when design, list strategy, timing, offers, and follow-up are planned as one campaign — not separate print jobs.",
    "Consistency matters. Turnkey keeps Facebook, Instagram, and Google Business Profile content moving while supporting comments and reviews.",
    "Acquisition gets the first visit. Retention earns the next one. Build a steady rhythm across newsletters, thank-you messages, and CRM follow-up.",
    "Local visibility is a system: reviews, Google Business Profile, your website, and your vendors all need to reinforce one another.",
    "When the schedule needs support, a focused campaign can move faster than a long rebuild. Boost Days coordinate the message across the channels that matter.",
    "Sometimes you do not need another vendor. You need an experienced set of eyes on what to change, start, stop, or keep.",
    "A useful marketing report should answer four questions: What do we keep? What do we fix? What do we stop funding? What do we run next?",
    "Do not wait for empty bays to start thinking about demand. Strong marketing gives the shop more control over timing and customer mix.",
    "Clicks can be useful, but they are not the finish line. Track the path from spend to calls, booked appointments, car count, and revenue.",
    "For many customers, your Google Business Profile is the first impression of the shop. Treat it like a front door: current, credible, and easy to trust.",
    "Direct mail still works when the list, offer, timing, and follow-up are precise. The channel is not the strategy — the plan is.",
    "You already paid to earn the customer. Retention marketing helps protect that investment and gives people a reason to return.",
    "A report full of impressions can still hide the truth. Useful reporting follows calls, booked appointments, repair-order quality, and revenue.",
    "The best plan is not the biggest one. It is the plan that fits your market, current capacity, goals, and ideal customer mix.",
    "Shop owners should not have to become full-time marketing managers. Turnkey owns the moving pieces so you can stay focused on the shop.",
    "Ready for a clearer marketing plan and one team to own the execution? Book a consultation at turnkeymarketing.us.",
]


def render(item: dict) -> Image.Image:
    return {
        "photo": photo_statement,
        "split": split_card,
        "service": service_card,
        "quote": quote_card,
        "metric": metric_card,
        "editorial": editorial_card,
    }[item["template"]](item)


def create_contact_sheet(files: list[Path]) -> None:
    thumb = 260
    label = 42
    cols = 5
    rows = math.ceil(len(files) / cols)
    sheet = Image.new("RGB", (cols * thumb, rows * (thumb + label)), OFF_WHITE)
    draw = ImageDraw.Draw(sheet)
    for index, file in enumerate(files):
        with Image.open(file) as raw:
            image = raw.convert("RGB").resize((thumb, thumb), Image.Resampling.LANCZOS)
        x = (index % cols) * thumb
        y = (index // cols) * (thumb + label)
        sheet.paste(image, (x, y))
        draw.rectangle((x, y + thumb, x + thumb, y + thumb + label), fill=WHITE)
        draw.text((x + 12, y + thumb + 21), f"{index + 1:02d}  {file.stem[3:28]}", font=font(16, True), fill=NAVY, anchor="lm")
    sheet.save(OUT / "turnkey-30-contact-sheet.jpg", quality=91, optimize=True)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    if len(CREATIVES) != len(CAPTIONS):
        raise ValueError("Creative and caption counts must match")
    rendered: list[Path] = []
    rows: list[dict[str, str]] = []
    for index, (item, caption) in enumerate(zip(CREATIVES, CAPTIONS), start=1):
        output = OUT / f"{index:02d}-{item['slug']}.png"
        image = render(item).convert("RGB")
        image.save(output, format="PNG", optimize=True)
        rendered.append(output)
        rows.append(
            {
                "post": str(index),
                "filename": output.name,
                "pillar": item.get("eyebrow", "SERVICE SPOTLIGHT"),
                "on_image_copy": item["title"],
                "caption": caption,
                "cta": "Learn more at turnkeymarketing.us" if index != 30 else "Book a consultation at turnkeymarketing.us",
                "source_asset": item.get("asset", "Brand shapes and typography"),
                "format": "1080x1080 PNG",
            }
        )
    with (OUT / "captions-and-sources.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    create_contact_sheet(rendered)
    print(f"Generated {len(rendered)} creatives in {OUT}")


if __name__ == "__main__":
    main()
