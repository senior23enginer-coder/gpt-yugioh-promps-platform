# Apartado 23 — SIDE DECK Y RESERVA

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** abrir únicamente el archivo del deck solicitado en `01_INFORMACION_PARA_IMPORTAR/decks/` y sus salidas previas pertinentes. Consultar las instrucciones generales vigentes de `02_PROMPT_PARA_CODEX/00_PROMPT_UNICO_STATION_X_V31.md` y las reglas contextuales de `02_PROMPT_PARA_CODEX/REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md` cuando correspondan; no ejecutar el orquestador para corregir este apartado.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_23`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

## Instrucción editorial específica

**Vínculo con guías:** las alternativas de Side o Reserva que cambien una ruta requieren variante **expresamente condicional** según los apartados 09 (ficha causal) y 10 (guía visual) vigentes; nunca aparecerán como mano o campo de un deck actual sin incorporación aprobada.

Proponer planes entre duelos: enfrentamiento objetivo, cartas exactas que salen/entran, cantidad, razón y efectos sobre combos primero/segundo. Si Side está vacío, declararlo sin rellenarlo. La Reserva se analiza como alternativa hipotética, sin modificar el Side vigente; cualquier incorporación real exige decisión de Miguel.

**Cruce obligatorio con A06/A08/A09:** las filas de Side y Reserva de la **única matriz de trazabilidad** en `APARTADO_06` indican uso, sinergia, IDs de jugadas/combos y disponibilidad. Una variante Side debe referir `plan_side_id`, cartas y cantidades que entran/salen, estado resultante y `jugada_id`/`combo_id` condicionales contrastados con el deck tras el cambio; no heredar la disponibilidad del Main anterior. Una alternativa de Reserva conserva estado `HIPOTETICA_NO_DISPONIBLE` hasta aprobación y no se contabiliza como combo del deck vigente. Mantener la matriz en A06, las fichas causales en A09 y el plan específico aquí, sin crear otro archivo.
