#!/usr/bin/env python3
"""Refresh only the 39 CID-matched Crystron/Horus 677 pictures using genuine full images.

Never changes card data, quantities, or routes. Source is English TCG artwork
from YGOPRODeck; original Spanish thumbnails remain recoverable in Git history.
One card metadata lookup and one full image GET per CID, with simple throttling.
"""
from __future__ import annotations
import argparse
from io import BytesIO
from pathlib import Path
import hashlib
import json
import os
import re
import shutil
import sys
import tempfile
import time
import urllib.error
import urllib.request
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DECK = ROOT / "01_INFORMACION_PARA_IMPORTAR/decks/DECK_NUEVO_13_CRISTRON_HORUS"
PACKAGE = DECK / "datos/stationx-deck.json"
PROVENANCE = DECK / "datos/A04_HD_IMAGE_PROVENANCE.json"
REQUIRED = {"main": 40, "extra": 15, "side": 15, "reserve": 0}
AGENT = "Station-X-Deck-677-CID-Photo-Audit/1.0"
API = "https://db.ygoprodeck.com/api/v7/cardinfo.php?konami_id={}&misc=yes"
HOST = "https://images.ygoprodeck.com/images/cards/"
WIDTH, HEIGHT = 600, 850

def get(url: str, *, max_bytes: int) -> bytes:
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": AGENT, "Accept": "*/*"})
            with urllib.request.urlopen(req, timeout=30) as response:
                assert response.status == 200, f"HTTP {response.status}: {url}"
                body = response.read(max_bytes + 1)
                assert len(body) <= max_bytes, "Oversized remote response"
                return body
        except (OSError, urllib.error.URLError) as exc:
            if attempt == 3:
                raise RuntimeError(f"Remote source unavailable: {url}") from exc
            time.sleep(2 ** attempt)
    raise AssertionError("Unreachable")

def photo_card(cid: int, name: str) -> tuple[bytes, dict]:
    raw = get(API.format(cid), max_bytes=200_000)
    data = json.loads(raw)
    matches = [c for c in data.get("data", []) if any(
        inf.get("konami_id") == cid for inf in c.get("misc_info", []))]
    assert len(matches) == 1, f"CID {cid}: no unique Konami-ID match"
    card = matches[0]
    img = card.get("card_images", [None])[0]
    assert img and isinstance(img.get("id"), int), f"CID {cid}: no original-art ID"
    url = img.get("image_url", "")
    assert url == f"{HOST}{img['id']}.jpg", f"CID {cid}: unsafe / alternate image URL"
    payload = get(url, max_bytes=2_500_000)
    with Image.open(BytesIO(payload)) as image:
        assert image.format == "JPEG", f"CID {cid}: not a genuine JPEG card image"
        w, h = image.size
        assert w >= WIDTH and h >= HEIGHT, f"CID {cid}: insufficient HD image {w}x{h}"
        assert abs(w / h - 0.686) < 0.05, f"CID {cid}: unexpected artwork proportions"
        image.verify()
    assert len(payload) >= 40_000, f"CID {cid}: placeholder-length image"
    return payload, {"cid": cid, "display_name_es": name, "source_name_en": card["name"],
                     "konami_id": cid, "ygoprodeck_card_id": card["id"], "url": url,
                     "source_language": "en", "dimensions": [w, h],
                     "source_sha256": hashlib.sha256(payload).hexdigest()}

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--deck-id", type=int, required=True)
    parser.add_argument("--user-assigned", action="store_true")
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    assert args.deck_id == 677 and args.user_assigned, "Explicit Crystron 677 assignment required"
    assert os.environ.get("GITHUB_REF") == "refs/heads/analysis/crystron-677-a01-a10a-20261121", "Protected branch-only photo migration"
    assert os.environ.get("GITHUB_ACTIONS") == "true", "Run on dedicated GitHub CI runner"
    data = json.loads(PACKAGE.read_text(encoding="utf8"))
    rec = data["record"]
    assert data["schema"] == "station-x-deck-package/1"
    assert data["deck_id"] == rec["deck_id"] == 677 and rec["format"] == "tcg_advanced"
    assert len(rec["cards"]) == 39
    totals = dict.fromkeys(REQUIRED, 0)
    rows = []
    existing = []
    for c in rec["cards"]:
        cid = c["cid"]
        assert isinstance(cid, int) and cid > 0 and not any(x["cid"] == cid for x in existing)
        assert any(src.startswith("https://www.db.yugioh-card.com/yugiohdb/") and f"cid={cid}" in src
                   for src in c["sources"]), f"CID {cid}: official source not linked"
        original = DECK.parent / c["full_image"]
        assert original.is_file() and original.parent == DECK / "imagenes"
        assert re.fullmatch(str(cid) + r"\.(?:jpg|png)", original.name)
        for slot in c["slots"]:
            totals[slot["section"]] += slot["quantity"]
            rows.append([slot["card_id"], slot["section"], slot["quantity"]])
        existing.append({"cid": cid, "name": c["name"], "path": original})
    assert totals == REQUIRED, f"Unexpected deck inventory change {totals}"
    assert len(rows) == 40 and len({x[0] for x in rows}) == 40
    declared = sorted([[x["id"], x["section"], x["quantity"]] for x in data["inventory"]])
    assert declared == sorted(rows), "Inventory package was changed"
    assert args.apply, "Use --apply only after explicit user assignment"

    reports = []
    with tempfile.TemporaryDirectory(prefix="stationx-crystron-hd-") as directory:
        working = Path(directory)
        for card in existing:
            cid, original = card["cid"], card["path"]
            binary, meta = photo_card(cid, card["name"])
            with Image.open(BytesIO(binary)) as image:
                dst = working / original.name
                if original.suffix == ".png":
                    image.save(dst, format="PNG", optimize=True)
                else:
                    dst.write_bytes(binary)
            with Image.open(dst) as finished:
                assert finished.size[0] >= WIDTH and finished.size[1] >= HEIGHT
                assert finished.format == ("PNG" if original.suffix == ".png" else "JPEG")
                finished.verify()
            meta["original_path"] = str(original.relative_to(ROOT)).replace(os.sep, "/")
            meta["previous_sha256"] = hashlib.sha256(original.read_bytes()).hexdigest()
            meta["saved_sha256"] = hashlib.sha256(dst.read_bytes()).hexdigest()
            meta["saved_bytes"] = dst.stat().st_size
            reports.append(meta)
            # Sequential requests only; avoid overwhelming YGOPRODeck service.
            time.sleep(0.40)
        assert len(reports) == 39
        for meta in reports:
            name = Path(meta["original_path"]).name
            shutil.copyfile(working / name, DECK / "imagenes" / name)
    manifest = {"schema": "station-x-card-photo-provenance/1", "deck_id": 677,
       "format": rec["format"], "photo_count": len(reports),
       "policy": "authentic YGOPRODeck English-language high-resolution images; no generated text, no inventory changes",
       "original_spanish_assets": "recoverable from Git history before this commit",
       "official_rules_text": "Konami Neuron sources in record.cards; card art language is English",
       "images": sorted(reports, key=lambda x: x["cid"])}
    PROVENANCE.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf8")
    print(json.dumps({"ok": True, "deck_id": 677, "updated": len(reports),
        "min_width": min(x["dimensions"][0] for x in reports),
        "min_height": min(x["dimensions"][1] for x in reports),
        "language": "English TCG image print; Spanish documentation retained",
        "cards_unchanged": True, "inventories_unchanged": True}, ensure_ascii=False))
if __name__ == "__main__":
    main()
