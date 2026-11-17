# Canonical prompt and deck-delivery repository

Work and commit on `base`. Keep `main`, `develop` and `test` at their clean initial baseline; do not put prompt/delivery changes on those branches or merge into them unless Miguel explicitly requests it. Finish each authorized change with its commit on `base` and report whether the push actually succeeded.

This independent repository is the canonical home of prompts, research and source deliveries. Application implementation belongs in the separate `platform-yugioh-md` repository, which must not contain a `gpt` directory or marker. Active tools in that application resolve this sibling repository by default or accept `YGO_PROMPTS_ROOT`.

Read the existing main prompt and the relevant modular section before editing a deck or instructions. Preserve the 36 modular prompts and the three base documents. Keep original deck identities, card quantities, zones, Skills, route IDs and evidence states. Follow the current owner instructions excluding forbidden/limited card lists and requiring only indispensable importable files.

Do not delete, rename or merge protected prompts. Integrate updates in existing canonical deck documents; avoid per-version auxiliary files. Put internal tracking only in the existing single record under `03_COMPROBACIONES_NO_IMPORTAR/`. That folder is private editorial support and is not imported as player content.

Do not copy application credentials, operational databases or store code here. Do not publish to the website merely because a Git commit or push was requested. A deck ZIP must contain the selected deck's own self-contained folder, with Kashtira as a structural reference rather than a source of other decks' cards or rules.
