# Kashtira Pure 665 — A01: preadmisión y evidencias existentes

**Corte:** 22-11-2026. **Alcance:** exclusivamente Kashtira Pure (Station X `deck_id=665`, TCG Advanced). Este registro **NO ejecuta A01 como análisis autorizado**, porque su admisión está bloqueada por Side Deck vacío. No cambia cartas, copias, zonas, guías ni estado de la plataforma.

## Puerta obligatoria (P00)

| Control | Evidencia | Dictamen |
|---|---|---|
| Identidad | Documento canónico Kashtira Pure y registro histórico Station X 665 | `ID_COTEJADO` |
| Main | **42** copias en la fuente del deck y el registro histórico | `CARGADO` |
| Extra | **15** copias | `CARGADO` |
| Side | **0** copias | **`BLOQUEO_REQUIRED_SIDE_NOT_LOADED`** |
| Reserva | **19** copias | `RESERVA_NO_ES_SIDE` |
| Paquete de importación GPT | Falta `DECK_665_KASHTIRA_PURE/datos/stationx-deck.json` en la rama `base` | `A02_REQUIERE_CONCILIACION` |
| Cobertura documental | 38 identidades fichadas, 38 fotos con CID, ~16 rutas históricas registradas en Station X | `DOCUMENTADA_NO_CERTIFICADA` |

**Fuentes versionadas:**
- [Documento de Kashtira Pure](../01_INFORMACION_PARA_IMPORTAR/decks/DECK_665_KASHTIRA_PURE/DECK_665_KASHTIRA_PURE_CONTENIDO_CURADO.md), secciones «IDENTIDAD BÁSICA», «PERFIL BREVE» y «Estado de ejecución por apartado».
- [Paquete histórico Station X 665](https://github.com/senior23enginer-coder/platform-yugioh-md/blob/base/torneos_yugioh/assets/editorial/20261117-folder-delivery-v40/665.json). Es una versión histórica, **no** prueba del contenido de base de datos en vivo.
- [Regla de admisión](../scripts/analysis-eligibility.cjs): `REQUIRED_SIDE_NOT_LOADED` si Side=0.
- [Contrato vigente de 35 tareas](../02_PROMPT_PARA_CODEX/contrato_tareas_a01_a10.json).

## A01 — contrato T1/T2/T3 (no se declaran completas)

- [ ] **A01-T1 — Identidad, estrategia y condiciones de victoria del deck.** Ya existe un perfil histórico: control del campo con destierro, Xyz Rango 7, Wraitsoth/Fenrir/Unicorn, Riseheart/Teosis/Nacimiento, Shangri-Ira/Arise-Heart. **Falta** verificar sus condiciones, riesgos y relaciones con las cartas físicas y rutas A09 por CID. **No evaluar banlist ni límites competitivos por copias**, porque el usuario no lo solicitó.
- [ ] **A01-T2 — Ficha breve y resumen de usuario.** Hay un texto de presentación histórico. **Falta** contrastarlo con requisitos mecánicos, coste y efecto, y luego sincronizarlo con `record.profile` en el paquete nativo del deck. No insertar un perfil inventado en producción.
- [ ] **A01-T3 — Propósitos con trazabilidad.** Hay referencias documentales y 16 rutas en el registro histórico. **Falta** enlazar cada propósito con `cid`, `card_id`, `effect_id` y `route_id` de un paquete aprobado, y cerrar los casos `SIN_REGLA_PORTATIL_ACREDITADA_A01` o `SIN_RUTA_A09_ACREDITADA` sin inventar identificadores.

**Estado de A01: `BLOQUEADA_POR_PRECONDICION` (0/3 tareas certificadas del nuevo contrato).**

## Reanudación sin cambios implícitos

1. Cargar y aprobar explícitamente el **Side real**. Las 19 cartas de Reserva continúan como Reserva hasta que el usuario autorice operaciones específicas.
2. Cotejar el inventario Main/Extra/Side/Reserva con el registro de Station X y generar el paquete estructurado del deck 665, conservando exactamente CIDs, slots y `route_id` que estén acreditados.
3. Ejecutar la puerta `analysis-eligibility.cjs --deck-id=665 --user-assigned` sobre el paquete válido; la puerta debe indicar `eligible=true`.
4. **Solo entonces** realizar la auditoría A01-T1→T2→T3, con evidencia independiente y CI, sin implicar que A05/A07/A09/A10A estén certificados.

**Exclusiones:** no A10B, no nuevos combos, no pruebas de calculadora ni replays, no alteraciones de Memento/Crystron, no merge o despliegue. Este precheck no equivale a la publicación o importación de Kashtira 665.

## Regla explícita del análisis — sin banlist

La banlist y los límites de copias por torneo quedan **FUERA DEL ALCANCE** por instrucción del usuario y por el contrato vigente del prompt A03: «No evaluar banlist si no se pidió». El valor técnico `tcg_advanced` identifica la mecánica del formato; **no** autoriza una auditoría de prohibidas o limitadas, ni altera las cartas, el análisis de jugadas o los objetivos del deck.

**Único bloqueo de admisión registrado:** falta un Side físico cargado para pasar el preflight de `analysis-eligibility.cjs`. Este bloqueo es independiente de la banlist, que no debe consultarse ni utilizarse como criterio para A01–A10A.
