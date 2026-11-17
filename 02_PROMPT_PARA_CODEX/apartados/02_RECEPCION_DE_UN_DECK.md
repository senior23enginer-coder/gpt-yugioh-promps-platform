# Apartado 02 — RECEPCIÓN DE UN DECK

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** abrir únicamente el archivo o subcarpeta del deck solicitado en `01_INFORMACION_PARA_IMPORTAR/decks/` y sus salidas previas pertinentes. Consultar las instrucciones generales vigentes de `02_PROMPT_PARA_CODEX/00_PROMPT_UNICO_STATION_X_V31.md` y las reglas contextuales de `02_PROMPT_PARA_CODEX/REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md` cuando correspondan; no ejecutar el orquestador para corregir este apartado.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_02`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

## Instrucción editorial específica

Identificar nombre, deck_id, equipo, formato, versión, fecha y cantidades de Main, Extra, Side, Reserva y Skill cuando aplique. Diferenciar **deck encontrado en el catálogo**, **inventario transcrito**, **inventario aprobado**, **estudio iniciado** y **estudio terminado**.

Si el deck es nuevo, buscar su ID real antes de asociarlo. Si hay nombres similares, híbridos, formatos distintos o más de una coincidencia, pedir decisión al propietario **solo sobre esa identidad**. Los **16 decks actuales** están documentados en `01_INFORMACION_PARA_IMPORTAR/decks/`; las cinco carpetas `NUEVO_12` a `NUEVO_16` mantienen nombres documentales históricos, pero sus IDs reales **671, 677, 660, 673 y 699**, respectivamente, ya constan confirmados en el registro único. Contrastar con el registro vivo antes de una escritura autorizada.

**Alta incremental obligatoria:** para un deck que se agregue en adelante, crear su **única carpeta** `01_INFORMACION_PARA_IMPORTAR/decks/DECK_<ID_REAL_O_REFERENCIA>_<NOMBRE_CORTO>/`. Dentro irá `DECK_<...>_CONTENIDO_CURADO.md`, con la **configuración completa** (ID, formato, Main/Extra/Side/Reserva/Skill, cantidades), su control propio **A01–A10** y la matriz A06; incluir subcarpetas `imagenes/`, `guias/` y `datos/` solamente cuando existan archivos realmente utilizados. No producir un segundo archivo de configuración ni mezclar cartas de otro deck. Al solicitar entrega, empaquetar **solo esa carpeta** con su ruta relativa, sin el maestro ni los otros doce decks. Seguir el contrato del apartado 13 del orquestador; no importar nada automáticamente.
