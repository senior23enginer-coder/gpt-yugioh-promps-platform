# Canonical prompt and deck-delivery repository

This repository versions the contents formerly kept under the platform's `torneos_yugioh/context/gpt/`. Application implementation belongs in the separate `platform-yugioh-md` repository, whose `gpt` directory stays empty except for its Git marker.

Read the existing main prompt and the relevant modular section before editing a deck or instructions. Preserve the 36 modular prompts and the three base documents. Keep original deck identities, card quantities, zones, Skills, route IDs and evidence states. Follow the current owner instructions excluding forbidden/limited card lists and requiring only indispensable importable files.

Do not delete, rename or merge protected prompts. Integrate updates in existing canonical deck documents; avoid per-version auxiliary files. Put internal tracking only in the existing single record under `03_COMPROBACIONES_NO_IMPORTAR/`. That folder is private editorial support and is not imported as player content.

Do not copy application credentials, operational databases or store code here. Do not publish to the website merely because a Git commit or push was requested. A deck ZIP must contain the selected deck's own self-contained folder, with Kashtira as a structural reference rather than a source of other decks' cards or rules.
