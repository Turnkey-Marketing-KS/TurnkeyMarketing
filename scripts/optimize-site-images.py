#!/usr/bin/env python3
"""Create appropriately sized WebP assets for live site imagery."""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

from PIL import Image, ImageCms, ImageOps


ROOT = Path(__file__).resolve().parents[1]

SERVICE_HEROES = [
    "boost-days-hero-v2",
    "digital-marketing-hero-v2",
    "directtrack-marketing-hero-v2",
    "marketing-consulting-hero-v2",
    "retention-marketing-hero-v2",
    "social-media-marketing-hero-v2",
]


def srgb_image(opened: Image.Image) -> Image.Image:
    """Return an orientation-corrected RGB image in the sRGB color space."""
    image = ImageOps.exif_transpose(opened)
    embedded_profile = image.info.get("icc_profile")
    if embedded_profile:
        source_profile = ImageCms.ImageCmsProfile(BytesIO(embedded_profile))
        destination_profile = ImageCms.createProfile("sRGB")
        return ImageCms.profileToProfile(
            image,
            source_profile,
            destination_profile,
            outputMode="RGB",
        )
    return image.convert("RGB")


def resize_to_width(image: Image.Image, width: int) -> Image.Image:
    height = round(image.height * width / image.width)
    return image.resize((width, height), Image.Resampling.LANCZOS)


def convert(source: Path, destination: Path, width: int, quality: int) -> None:
    if not source.exists():
        if destination.exists():
            print(f"Already optimized: {destination.relative_to(ROOT)}")
            return
        raise FileNotFoundError(source)

    with Image.open(source) as opened:
        image = resize_to_width(srgb_image(opened), width)

    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(
        destination,
        "WEBP",
        quality=quality,
        method=6,
        icc_profile=ImageCms.ImageCmsProfile(ImageCms.createProfile("sRGB")).tobytes(),
    )
    print(
        f"Created {destination.relative_to(ROOT)} "
        f"({image.width}x{image.height}, {destination.stat().st_size:,} bytes)"
    )


def main() -> None:
    services = ROOT / "public" / "images" / "services"
    for stem in SERVICE_HEROES:
        convert(services / f"{stem}.png", services / f"{stem}.webp", 1200, 82)

    convert(
        services / "direct-mail-mailbox.png",
        services / "direct-mail-mailbox.webp",
        1200,
        82,
    )

    logos = ROOT / "public" / "images" / "results" / "shop-logos"
    convert(
        logos / "ssa-european-auto-repair.jpg",
        logos / "ssa-european-auto-repair.webp",
        300,
        84,
    )


if __name__ == "__main__":
    main()
