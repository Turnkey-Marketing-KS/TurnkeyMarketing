#!/usr/bin/env python3
"""Generate the flat spot illustrations for the test landing page.

Same drawing language as scripts/generate-shopfront-illustration.py: flat brand-colour
blocks, dark hand-outlined edges, cream ground. Each file is a 260x200 SVG.

Usage: python3 scripts/generate-lp-spot-illustrations.py
"""

from pathlib import Path

W, H = 260, 200
CREAM = "#F4F2ED"
CREAM_SHADE = "#E6E1D4"
GLASS_WARM = "#F1ECE1"
TAN = "#E0D2BB"
TAN_DEEP = "#C7B497"
NAVY = "#232E66"
KEY = "#3F8CCB"
KEY_SOFT = "#9CC4E2"
GREEN = "#93C845"
GREEN_DEEP = "#5E8F2A"
INK = "#1E2330"
WHITE = "#FFFFFF"


def svg(body: str, label: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" '
        f'role="img" aria-label="{label}">\n'
        f'  <g stroke-linecap="round" stroke-linejoin="round">\n{body}\n  </g>\n</svg>\n'
    )


def r(x, y, w, h, fill, rx=6, sw=3.4, stroke=INK, opacity=None):
    op = f' opacity="{opacity}"' if opacity is not None else ""
    st = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
    return f'    <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"{st}{op} />'


def c(cx, cy, rad, fill, sw=3.4, stroke=INK):
    st = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
    return f'    <circle cx="{cx}" cy="{cy}" r="{rad}" fill="{fill}"{st} />'


def p(d, fill="none", stroke=INK, sw=3.4):
    st = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
    return f'    <path d="{d}" fill="{fill}"{st} />'


def ln(x1, y1, x2, y2, stroke=INK, sw=3.4, opacity=None):
    op = f' opacity="{opacity}"' if opacity is not None else ""
    return (
        f'    <line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" '
        f'stroke-width="{sw}" stroke-linecap="round"{op} />'
    )


def ground(fill=TAN):
    return "\n".join([r(0, 168, W, 32, fill, rx=0, stroke=None), ln(0, 168, W, 168, INK, 3)])


# ------------------------------------------------------------------ direct mail
mail = "\n".join([
    ground(),
    # postcard behind
    r(58, 40, 116, 78, GLASS_WARM, rx=6),
    r(70, 52, 52, 30, KEY_SOFT, rx=3, sw=2.6),
    ln(70, 96, 160, 96, INK, 2.6),
    ln(70, 106, 132, 106, INK, 2.6),
    r(140, 52, 24, 24, GREEN, rx=3, sw=2.6),
    # envelope in front
    r(34, 92, 150, 76, CREAM, rx=6),
    p("M 34 100 L 109 146 L 184 100", stroke=INK),
    # offer tag
    r(186, 66, 54, 54, GREEN, rx=8),
    c(200, 80, 5, CREAM, sw=2.4),
    ln(196, 108, 230, 76, INK, 2.8),
]) 

# ------------------------------------------------------------------ phone calls
calls = "\n".join([
    ground(CREAM_SHADE),
    r(88, 44, 84, 124, KEY, rx=18),
    r(98, 58, 64, 84, GLASS_WARM, rx=8, sw=2.6),
    c(130, 154, 8, CREAM, sw=2.6),
    p("M 112 78 C 112 70 118 66 126 68 L 134 84 L 126 92 C 132 106 140 112 148 116 "
      "L 154 108 L 168 118 C 168 126 162 132 154 130", GREEN, INK, 3),
    p("M 190 62 C 208 82 208 118 190 138", stroke=NAVY, sw=4),
    p("M 208 44 C 234 76 234 124 208 156", stroke=NAVY, sw=4),
    p("M 70 62 C 52 82 52 118 70 138", stroke=NAVY, sw=4),
])

# ------------------------------------------------------------------ local search
search = "\n".join([
    ground(),
    r(24, 40, 176, 114, CREAM, rx=10),
    ln(24, 66, 200, 66, INK, 3),
    c(38, 53, 4, GREEN, sw=0, stroke=None),
    c(52, 53, 4, KEY, sw=0, stroke=None),
    r(40, 82, 62, 10, KEY_SOFT, rx=5, sw=2.4),
    r(40, 102, 44, 10, TAN_DEEP, rx=5, sw=2.4),
    r(40, 122, 54, 10, CREAM_SHADE, rx=5, sw=2.4),
    p("M 152 74 C 172 74 186 90 186 108 C 186 128 160 150 152 158 "
      "C 144 150 118 128 118 108 C 118 90 132 74 152 74 Z", GREEN),
    c(152, 106, 12, CREAM, sw=2.8),
    c(212, 118, 22, GLASS_WARM),
    ln(228, 134, 244, 152, INK, 5),
])

# --------------------------------------------------------------------- reporting
report = "\n".join([
    ground(CREAM_SHADE),
    r(30, 34, 200, 120, CREAM, rx=10),
    r(46, 116, 30, 24, KEY_SOFT, rx=3, sw=2.8),
    r(88, 92, 30, 48, KEY, rx=3, sw=2.8),
    r(130, 70, 30, 70, NAVY, rx=3, sw=2.8),
    r(172, 50, 30, 90, GREEN, rx=3, sw=2.8),
    ln(40, 142, 216, 142, INK, 3),
    p("M 50 84 L 96 66 L 138 48 L 190 30", stroke=GREEN_DEEP, sw=3.4),
    c(190, 30, 7, TAN_DEEP, sw=2.8),
])

files = {
    "spot-direct-mail.svg": (mail, "Flat illustration of a mailer and mailbox"),
    "spot-phone-calls.svg": (calls, "Flat illustration of a ringing phone"),
    "spot-local-search.svg": (search, "Flat illustration of a local search result with a map pin"),
    "spot-reporting.svg": (report, "Flat illustration of a monthly marketing report chart"),
}

out_dir = Path(__file__).resolve().parent.parent / "public" / "lp" / "assets"
out_dir.mkdir(parents=True, exist_ok=True)
for name, (body, label) in files.items():
    (out_dir / name).write_text(svg(body, label), encoding="utf-8")
    print(f"wrote {out_dir / name}")
