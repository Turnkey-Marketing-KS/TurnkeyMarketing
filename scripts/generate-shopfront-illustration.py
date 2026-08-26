#!/usr/bin/env python3
"""Generate the flat editorial shopfront illustration used by the test landing page hero.

Outputs a wide band SVG plus a narrow crop for mobile. The illustration is drawn in the
Turnkey brand palette from src/styles.css (navy, key blue, green, cream, off-white) in a
flat, hand-outlined editorial style: one long storefront, lit service bays, a car at the
curb, and generous sky above for the headline.

Usage: python3 scripts/generate-shopfront-illustration.py
"""

from pathlib import Path

W, H = 2000, 620

SKY = "#6FAEDB"
CREAM = "#F4F2ED"
CREAM_SHADE = "#E6E1D4"
GLASS = "#E2EAF3"
GLASS_WARM = "#F1ECE1"
TAN = "#E0D2BB"
TAN_DEEP = "#C7B497"
NAVY = "#232E66"
NAVY_DEEP = "#1A2352"
KEY = "#3F8CCB"
KEY_SOFT = "#9CC4E2"
GREEN = "#93C845"
GREEN_DEEP = "#5E8F2A"
ASPHALT = "#171B24"
INK = "#1E2330"
WHITE = "#FFFFFF"

# Building / ground geometry
B_X0, B_X1 = 110, 1890
B_TOP = 70
CURB = 438          # building base + sidewalk top
ASPHALT_TOP = 472
WIN_TOP, WIN_BOT = 196, 400
WIN_X0, WIN_X1 = 246, 1662
BAY_W, MULLION = 196, 12
BAYS = 6
FLOOR = 372

parts: list[str] = []


def add(markup: str) -> None:
    parts.append("  " + markup)


def rect(x, y, w, h, fill, stroke=None, sw=3, rx=None, opacity=None):
    attrs = f'x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"'
    if rx is not None:
        attrs += f' rx="{rx}"'
    if stroke:
        attrs += f' stroke="{stroke}" stroke-width="{sw}"'
    if opacity is not None:
        attrs += f' opacity="{opacity}"'
    return f"<rect {attrs} />"


def line(x1, y1, x2, y2, stroke=INK, sw=3, cap="round", opacity=None):
    attrs = f'x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="{cap}"'
    if opacity is not None:
        attrs += f' opacity="{opacity}"'
    return f"<line {attrs} />"


def circle(cx, cy, r, fill, stroke=None, sw=3):
    attrs = f'cx="{cx}" cy="{cy}" r="{r}" fill="{fill}"'
    if stroke:
        attrs += f' stroke="{stroke}" stroke-width="{sw}"'
    return f"<circle {attrs} />"


def path(d, fill="none", stroke=None, sw=3, join="round", cap="round", opacity=None):
    attrs = f'd="{d}" fill="{fill}"'
    if stroke:
        attrs += f' stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="{join}" stroke-linecap="{cap}"'
    if opacity is not None:
        attrs += f' opacity="{opacity}"'
    return f"<path {attrs} />"


def bay_x(index: int) -> int:
    return WIN_X0 + index * (BAY_W + MULLION)


# ---------------------------------------------------------------- interior kit
def tool_chest(x, base, w=54, h=96, body=GREEN, drawers=4):
    out = [rect(x, base - h, w, h, body, INK, 2.5, rx=4)]
    for i in range(drawers):
        y = base - h + 12 + i * ((h - 18) / drawers)
        out.append(line(x + 7, y, x + w - 7, y, INK, 2, opacity=0.55))
    out.append(rect(x + 6, base - h - 7, w - 12, 7, TAN_DEEP, INK, 2.5, rx=2))
    return out


def framed_art(x, y, w, h, fill=GLASS_WARM, motif=None):
    out = [rect(x, y, w, h, fill, INK, 2.5, rx=3)]
    if motif == "circle":
        out.append(circle(x + w / 2, y + h / 2, min(w, h) * 0.24, GREEN))
    elif motif == "bars":
        out.append(rect(x + 8, y + h * 0.45, w * 0.34, h * 0.32, KEY))
        out.append(rect(x + 8 + w * 0.42, y + h * 0.3, w * 0.3, h * 0.47, TAN_DEEP))
    elif motif == "wide":
        out.append(rect(x + 9, y + 9, w - 18, h - 18, KEY_SOFT))
        out.append(circle(x + w * 0.32, y + h * 0.5, 7, WHITE))
        out.append(circle(x + w * 0.62, y + h * 0.5, 7, WHITE))
    return out


def person(x, base, coat=NAVY, height=104):
    head_r = 13
    body_top = base - height + head_r * 2
    return [
        circle(x, body_top - head_r - 2, head_r, coat),
        path(
            f"M {x - 20} {base} L {x - 20} {body_top + 12} "
            f"C {x - 20} {body_top - 6} {x - 10} {body_top - 12} {x} {body_top - 12} "
            f"C {x + 10} {body_top - 12} {x + 20} {body_top - 6} {x + 20} {body_top + 12} "
            f"L {x + 20} {base} Z",
            coat,
        ),
    ]


def counter(x, base, w, h=44, top_fill=TAN_DEEP, body=CREAM_SHADE):
    return [
        rect(x, base - h, w, h, body, INK, 2.5, rx=3),
        rect(x - 4, base - h - 8, w + 8, 8, top_fill, INK, 2.5, rx=3),
    ]


def lift_post(x, base, h=150, fill=KEY):
    return [
        rect(x, base - h, 20, h, fill, INK, 2.5, rx=4),
        rect(x - 18, base - h, 56, 16, fill, INK, 2.5, rx=4),
        rect(x - 26, base - 10, 72, 12, NAVY, INK, 2.5, rx=4),
    ]


def shelving(x, base, w=110, h=132):
    out = [rect(x, base - h, w, h, CREAM_SHADE, INK, 2.5, rx=3)]
    for i in (1, 2):
        y = base - h + i * (h / 3)
        out.append(line(x, y, x + w, y, INK, 2.5))
    boxes = [(GREEN, 0), (KEY, 1), (TAN_DEEP, 2), (NAVY, 0)]
    for i, (fill, row) in enumerate(boxes):
        bx = x + 10 + (i % 2) * (w / 2)
        by = base - h + row * (h / 3) + (h / 3) - 30
        out.append(rect(bx, by, w / 2 - 18, 22, fill, INK, 2, rx=2))
    return out


def tire_machine(x, base, h=160):
    return [
        rect(x, base - h, 34, h, KEY, INK, 2.5, rx=6),
        rect(x - 16, base - h - 4, 66, 22, NAVY, INK, 2.5, rx=6),
        circle(x + 17, base - h + 54, 15, CREAM, INK, 2.5),
        rect(x - 12, base - 14, 58, 14, NAVY, INK, 2.5, rx=4),
    ]


def bay_interior(index: int) -> list[str]:
    x = bay_x(index)
    out: list[str] = []
    # ceiling light bars
    for lx in (x + 26, x + 116):
        out.append(rect(lx, WIN_TOP + 20, 58, 9, WHITE, None, rx=4, opacity=0.85))
    # back wall / floor split
    out.append(rect(x, FLOOR, BAY_W, WIN_BOT - FLOOR, GLASS_WARM))
    out.append(line(x, FLOOR, x + BAY_W, FLOOR, INK, 2, opacity=0.35))

    if index == 0:
        out += framed_art(x + 14, WIN_TOP + 52, 44, 54, motif="bars")
        out += tool_chest(x + 74, FLOOR, body=TAN_DEEP, drawers=5)
        out += framed_art(x + 140, WIN_TOP + 46, 40, 34, motif="wide")
        out += counter(x + 138, FLOOR, 52, 34)
    elif index == 1:
        out += framed_art(x + 16, WIN_TOP + 44, 46, 40, motif="wide")
        out += counter(x + 12, FLOOR, 86, 40)
        out += tool_chest(x + 112, FLOOR, w=48, h=82, body=GREEN)
        out += person(x + 84, FLOOR, NAVY, 110)
        out += lift_post(x + 168, FLOOR, 148, KEY)
    elif index == 2:
        out += framed_art(x + 22, WIN_TOP + 40, 96, 44, motif="wide")
        out += shelving(x + 74, FLOOR, 108, 130)
        out += tool_chest(x + 16, FLOOR, w=44, h=70, body=KEY, drawers=3)
    elif index == 3:
        out += framed_art(x + 62, WIN_TOP + 34, 66, 74, motif="circle")
        out += framed_art(x + 18, WIN_TOP + 96, 34, 30, motif="bars")
        out += counter(x + 20, FLOOR, 70, 36)
        out += tool_chest(x + 132, FLOOR, w=46, h=60, body=TAN_DEEP, drawers=3)
    elif index == 4:
        out += tire_machine(x + 24, FLOOR, 156)
        out += counter(x + 92, FLOOR, 92, 44, top_fill=TAN_DEEP, body=GREEN)
        out += framed_art(x + 108, WIN_TOP + 44, 40, 34, motif="bars")
        out.append(rect(x + 100, FLOOR - 70, 34, 24, TAN_DEEP, INK, 2, rx=3))
    else:
        for i in range(3):
            out.append(rect(x + 16 + i * 34, WIN_TOP + 40, 26, 34, GLASS_WARM, INK, 2, rx=2))
        out += framed_art(x + 128, WIN_TOP + 44, 44, 38, motif="bars")
        out += counter(x + 16, FLOOR, 78, 40)
        out += person(x + 148, FLOOR, NAVY_DEEP, 118)
    return out


# ------------------------------------------------------------------- the scene
def build_scene() -> list[str]:
    add(rect(0, 0, W, CURB, SKY))

    # sidewalk + asphalt
    add(rect(0, CURB, W, ASPHALT_TOP - CURB, TAN))
    add(rect(0, ASPHALT_TOP, W, H - ASPHALT_TOP, ASPHALT))
    add(line(0, ASPHALT_TOP, W, ASPHALT_TOP, "#0F131A", 3, cap="butt", opacity=0.5))

    # building shell
    add(rect(B_X0, B_TOP, B_X1 - B_X0, CURB - B_TOP, CREAM, INK, 3, rx=4))
    add(rect(B_X0, B_TOP, B_X1 - B_X0, 12, CREAM_SHADE, None, rx=4, opacity=0.9))
    add(rect(1804, 128, 30, 15, CREAM_SHADE, INK, 2.5, rx=3))

    # glazing
    add(f'<g clip-path="url(#winClip)">')
    add(rect(WIN_X0, WIN_TOP, WIN_X1 - WIN_X0, WIN_BOT - WIN_TOP, GLASS))
    for i in range(BAYS):
        for markup in bay_interior(i):
            add(markup)
    # door unit interior
    dx = bay_x(BAYS)
    add(rect(dx, WIN_TOP, WIN_X1 - dx, WIN_BOT - WIN_TOP, GLASS))
    add(rect(dx + 12, WIN_TOP + 22, 60, 9, WHITE, None, rx=4, opacity=0.85))
    add(rect(dx, FLOOR, WIN_X1 - dx, WIN_BOT - FLOOR, GLASS_WARM))
    for markup in framed_art(dx + 16, WIN_TOP + 46, 34, 30, motif="bars"):
        add(markup)
    for markup in counter(dx + 92, FLOOR, 62, 40, body=CREAM_SHADE):
        add(markup)
    add(rect(dx + 104, FLOOR - 74, 42, 30, NAVY, INK, 2.5, rx=3))
    add(rect(dx + 120, FLOOR - 44, 10, 8, NAVY, None, rx=2))
    for markup in [
        rect(dx + 26, FLOOR - 44, 30, 8, TAN_DEEP, INK, 2.5, rx=3),
        rect(dx + 34, FLOOR - 36, 14, 36, TAN_DEEP, INK, 2.5, rx=3),
    ]:
        add(markup)
    # warm interior wash and soft glass reflections
    add(rect(WIN_X0, WIN_TOP, WIN_X1 - WIN_X0, WIN_BOT - WIN_TOP, GLASS_WARM, None, opacity=0.28))
    for i in range(BAYS + 1):
        gx = bay_x(i)
        add(path(
            f"M {gx + 18} {WIN_BOT} L {gx + 74} {WIN_TOP} L {gx + 100} {WIN_TOP} L {gx + 44} {WIN_BOT} Z",
            WHITE, None, opacity=0.16,
        ))
    add("</g>")

    # window frames drawn over the interiors
    add(rect(WIN_X0 - 4, WIN_TOP - 4, WIN_X1 - WIN_X0 + 8, WIN_BOT - WIN_TOP + 8, "none", INK, 4, rx=3))
    for i in range(BAYS):
        x = bay_x(i)
        add(rect(x, WIN_TOP, BAY_W, WIN_BOT - WIN_TOP, "none", INK, 3))
        add(line(x + BAY_W, WIN_TOP, x + BAY_W, WIN_BOT, CREAM, MULLION, cap="butt"))
        add(line(x + BAY_W, WIN_TOP, x + BAY_W, WIN_BOT, INK, 2.5, cap="butt"))
    # doors
    dx = bay_x(BAYS)
    add(rect(dx, WIN_TOP, WIN_X1 - dx, WIN_BOT - WIN_TOP, "none", INK, 3))
    leaf = (WIN_X1 - dx - 14) / 2
    add(rect(dx + 4, WIN_TOP + 6, leaf, WIN_BOT - WIN_TOP - 12, "none", INK, 3, rx=2))
    add(rect(dx + 10 + leaf, WIN_TOP + 6, leaf, WIN_BOT - WIN_TOP - 12, "none", INK, 3, rx=2))
    add(line(dx + 4 + leaf - 12, WIN_TOP + 108, dx + 4 + leaf - 12, WIN_TOP + 140, INK, 4))
    add(line(dx + 22 + leaf, WIN_TOP + 108, dx + 22 + leaf, WIN_TOP + 140, INK, 4))

    # potted plants
    add(rect(132, 386, 58, 52, TAN_DEEP, INK, 3, rx=4))
    add(path("M 161 388 L 161 296", stroke=GREEN_DEEP, sw=24, cap="round"))
    add(path("M 161 348 C 136 346 130 328 133 306", stroke=GREEN_DEEP, sw=17, cap="round"))
    add(path("M 161 334 C 186 332 192 314 189 294", stroke=GREEN_DEEP, sw=17, cap="round"))
    add(rect(1806, 388, 62, 50, TAN_DEEP, INK, 3, rx=4))
    for dx2, dy2 in ((-22, 284), (-8, 268), (8, 272), (24, 292)):
        add(path(f"M 1837 388 C {1837 + dx2 * 0.4} 352 {1837 + dx2} {dy2 + 24} {1837 + dx2 * 1.2} {dy2}", stroke=GREEN_DEEP, sw=10))

    # the car at the curb
    body = (
        "M 786 448 L 786 406 C 786 396 792 390 802 388 L 872 376 "
        "L 906 348 C 912 342 920 340 930 340 L 1062 340 "
        "C 1072 340 1080 344 1084 352 L 1104 382 L 1176 392 "
        "C 1190 394 1198 402 1198 414 L 1198 448 Z"
    )
    add('<ellipse cx="992" cy="478" rx="228" ry="12" fill="#0F131A" opacity="0.45" />')
    add(path(body, GREEN, INK, 3.5))
    add(path("M 916 378 L 938 352 L 984 352 L 984 380 Z", GREEN_DEEP, INK, 2.5))
    add(path("M 998 380 L 998 352 L 1056 352 L 1076 380 Z", GREEN_DEEP, INK, 2.5))
    add(line(990, 352, 990, 448, INK, 2.5))
    add(rect(962, 392, 26, 7, CREAM, INK, 2.5, rx=3))
    add(rect(788, 400, 22, 14, GLASS_WARM, INK, 2.5, rx=4))
    add(rect(1178, 402, 20, 14, TAN_DEEP, INK, 2.5, rx=4))
    add(line(820, 424, 1166, 424, INK, 2.5, opacity=0.45))
    for cx in (866, 1122):
        add(circle(cx, 444, 36, ASPHALT, INK, 3))
        add(circle(cx, 444, 15, CREAM, INK, 2.5))
    return parts


svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Illustration of a long independent auto repair shop with lit service bays and a car parked at the curb">
  <defs>
    <clipPath id="winClip">
      <rect x="{WIN_X0}" y="{WIN_TOP}" width="{WIN_X1 - WIN_X0}" height="{WIN_BOT - WIN_TOP}" />
    </clipPath>
  </defs>
{chr(10).join(build_scene())}
</svg>
"""

out_dir = Path(__file__).resolve().parent.parent / "public" / "lp" / "assets"
out_dir.mkdir(parents=True, exist_ok=True)
(out_dir / "shopfront-band.svg").write_text(svg, encoding="utf-8")

# Narrow crop for phones: centre on the door, the car, and the right-hand plant.
mobile = svg.replace(
    f'viewBox="0 0 {W} {H}" width="{W}" height="{H}"',
    'viewBox="700 0 1000 620" width="1000" height="620"',
    1,
)
(out_dir / "shopfront-band-mobile.svg").write_text(mobile, encoding="utf-8")
print(f"wrote {out_dir/'shopfront-band.svg'}")
print(f"wrote {out_dir/'shopfront-band-mobile.svg'}")
