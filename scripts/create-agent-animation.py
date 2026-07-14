from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/assets/agent-core-transparent-v2.png"
OUTPUT = ROOT / "public/assets/agent-core-loop-v2.gif"
WEBP_OUTPUT = ROOT / "public/assets/agent-core-loop-v2.webp"
POSTER = ROOT / "public/assets/agent-core-poster-v2.png"

SIZE = 900
FPS = 16
FRAMES = 96


def background() -> Image.Image:
    canvas = Image.new("RGB", (SIZE, SIZE), "#f8faff")
    px = canvas.load()
    for y in range(SIZE):
        for x in range(SIZE):
            dx = (x - SIZE * 0.54) / SIZE
            dy = (y - SIZE * 0.46) / SIZE
            glow = max(0.0, 1.0 - math.sqrt(dx * dx + dy * dy) * 2.1)
            px[x, y] = (
                int(248 - glow * 8),
                int(250 - glow * 5),
                int(255),
            )
    return canvas


BASE = background()


def make_transparent_frame(subject: Image.Image, index: int) -> Image.Image:
    phase = 2 * math.pi * index / FRAMES
    canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas, "RGBA")

    cx, cy = SIZE // 2, int(SIZE * 0.49)
    for radius, alpha in ((330, 45), (276, 34), (220, 24)):
        box = (cx - radius, cy - radius * 0.72, cx + radius, cy + radius * 0.72)
        draw.ellipse(box, outline=(103, 145, 235, alpha), width=2)

    for offset, radius in ((0.0, 330), (2.1, 276), (4.2, 220)):
        a = phase + offset
        x = cx + math.cos(a) * radius
        y = cy + math.sin(a) * radius * 0.72
        r = 8 if radius == 330 else 6
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(55, 143, 245, 220))

    scale = 0.86 + 0.008 * math.sin(phase)
    target = max(1, int(SIZE * scale))
    art = subject.resize((target, target), Image.Resampling.LANCZOS)
    angle = 1.6 * math.sin(phase)
    art = art.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    y_float = int(-11 * math.sin(phase))

    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow, "RGBA")
    shadow_draw.ellipse(
        (SIZE * 0.27, SIZE * 0.76, SIZE * 0.73, SIZE * 0.84),
        fill=(49, 104, 225, 48),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    canvas = Image.alpha_composite(canvas, shadow)

    x = (SIZE - art.width) // 2
    y = int(SIZE * 0.035) + y_float
    canvas.alpha_composite(art, (x, y))
    return canvas


def make_frame(subject: Image.Image, index: int) -> Image.Image:
    transparent = make_transparent_frame(subject, index)
    return Image.alpha_composite(BASE.convert("RGBA"), transparent).convert("RGB")


def main() -> None:
    subject = Image.open(SOURCE).convert("RGBA")
    transparent_frames = [make_transparent_frame(subject, index) for index in range(FRAMES)]
    frames = [make_frame(subject, index) for index in range(FRAMES)]
    frames[0].save(POSTER, optimize=True)
    transparent_frames[0].save(
        WEBP_OUTPUT,
        save_all=True,
        append_images=transparent_frames[1:],
        duration=round(1000 / FPS),
        loop=0,
        lossless=False,
        quality=84,
        method=4,
    )
    frames[0].save(
        OUTPUT,
        save_all=True,
        append_images=frames[1:],
        duration=round(1000 / FPS),
        loop=0,
        optimize=True,
        disposal=2,
    )


if __name__ == "__main__":
    main()
