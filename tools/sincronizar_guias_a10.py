#!/usr/bin/env python3
"""Comprueba o sincroniza las guías A10 compartidas y sus copias por deck.

Sin argumentos comprueba, sin escribir. Con --sync copia la versión compartida
a los decks que ya contienen ese mismo nombre de archivo. Nunca crea guías
en decks que no las tenían ni borra contenidos.
"""

import argparse
import hashlib
from pathlib import Path
import shutil
import sys


REPO = Path(__file__).resolve().parents[1]
IMPORTABLE = REPO / "01_INFORMACION_PARA_IMPORTAR"
SHARED = IMPORTABLE / "guias_a10"
DECKS = IMPORTABLE / "decks"


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--sync", action="store_true", help="Copiar desde guias_a10 a los mirrors existentes")
    args = parser.parse_args()

    pairs = []
    errors = []
    for local in sorted(DECKS.glob("*/guias/*.md")):
        canonical = SHARED / local.name
        if canonical.is_file():
            pairs.append((canonical, local))
        else:
            # Una guía exclusiva del deck no se considera duplicado ni se toca.
            print(f"EXCLUSIVA {local.relative_to(REPO)}")

    for canonical, local in pairs:
        if digest(canonical) == digest(local):
            continue
        if args.sync:
            shutil.copyfile(canonical, local)
            print(f"SINCRONIZADA {local.relative_to(REPO)}")
        else:
            errors.append((canonical, local))
            print(f"DIFERENCIA {local.relative_to(REPO)} (fuente: {canonical.relative_to(REPO)})")

    group_count = len({a.name for a, _ in pairs})
    print(f"Grupos compartidos: {group_count}; copias locales: {len(pairs)}; diferencias: {len(errors)}")
    if not pairs:
        print("ERROR: no se encontraron copias locales; verificar la estructura del repositorio", file=sys.stderr)
        return 2
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
