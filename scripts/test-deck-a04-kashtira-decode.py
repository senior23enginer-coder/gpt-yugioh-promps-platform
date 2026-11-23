#!/usr/bin/env python3
"""Decode the real Kashtira 665 images end to end (not only JPEG signatures).
Read-only CI: no network, no image manipulation, no text/HD false claims.
"""
import io
import json
import sys
from pathlib import Path
from PIL import Image, UnidentifiedImageError

ROOT = Path("01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE").resolve()


def main() -> None:
    if len(sys.argv) != 2 or Path(sys.argv[1]).resolve() != ROOT:
        raise ValueError("KASHTIRA_665_ONLY")
    original = ROOT / "datos/stationx-deck.json"
    p = json.loads(original.read_text(encoding="utf-8"))
    assert p["deck_id"] == 665
    physical = {str(c["cid"]) for c in p["record"]["cards"]}
    assert len(physical) == 38
    tcg = sorted((ROOT / "imagenes/tcg").glob("*.jpg"))
    infos = sorted((ROOT / "imagenes/infografias").glob("*.webp"))
    examples = sorted((ROOT / "imagenes/ejemplos_combos_kashtira").glob("*.webp"))
    assert (len(tcg), len(infos), len(examples)) == (44, 15, 4)
    all_images = tcg + infos + examples
    sizes = {}
    for file in all_images:
        raw = file.read_bytes()
        assert len(raw) > 10_000, f"IMAGE_TOO_SMALL:{file.name}"
        with Image.open(io.BytesIO(raw)) as im:
            expected = "JPEG" if file.suffix.lower() == ".jpg" else "WEBP"
            assert im.format == expected, f"FORMAT_MISMATCH:{file.name}"
            im.verify()  # Validate image container and checksums.
        with Image.open(io.BytesIO(raw)) as im:
            im.load()  # Force the entire pixel data to decode.
            assert im.width > 0 and im.height > 0, f"ZERO_DIMENSIONS:{file.name}"
            if file.suffix.lower() == ".jpg":
                assert im.mode == "RGB", f"JPG_COLOR_MODE:{file.name}"
                assert (im.width, im.height) == (268, 391), f"THUMBNAIL_DIMENSION_CHANGED:{file.name}"
            elif file.parent.name == "infografias":
                assert im.width == 1540, f"INFOGRAPHIC_WIDTH_CHANGED:{file.name}"
            else:
                assert 592 <= im.width <= 800 and im.height >= 1348, f"EXAMPLE_DIMENSIONS_CHANGED:{file.name}"
            sizes[file.name] = [im.width, im.height]
    assert {f.stem for f in tcg if f.stem in physical} == physical
    assert len([f for f in tcg if f.stem not in physical]) == 6
    # Negative proof that incomplete JPEG bytes do not decode.
    first = tcg[0].read_bytes()
    try:
        with Image.open(io.BytesIO(first[:20])) as broken:
            broken.load()
        raise AssertionError("BROKEN_JPEG_WAS_ACCEPTED")
    except (UnidentifiedImageError, OSError):
        pass
    print(json.dumps({
        "ok": True, "deck_id": 665,
        "fully_decoded_jpeg": len(tcg),
        "fully_decoded_webp": len(infos) + len(examples),
        "physical_cid_images": len(physical),
        "reference_only_jpg": 6,
        "thumbnail": {"width": 268, "height": 391, "high_definition": False},
        "invalid_image_files": 0,
        "internet_requested": False, "modified_images": False,
        "sample": dict(list(sizes.items())[:2]),
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
