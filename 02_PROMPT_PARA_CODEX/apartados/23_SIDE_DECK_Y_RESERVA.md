# Apartado 23 — SIDE DECK Y RESERVA

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida auxiliar:** aplicar los criterios de este módulo al A06/A08/A09, únicamente cuando proceda, mediante referencias a la ficha canónica y al registro central permitido. Este módulo no crea sección persistida APARTADO_23, porcentaje ni estado de avance independiente; documentar en el eje A01–A10 correspondiente la evidencia y el pendiente sin duplicar contenido.

## Instrucción editorial específica

**Configuración condicional identificable:** cada plan Side tiene `plan_side_id`, `deck_id`, rival/formato, estado inicial por zona, lista exacta de salidas y entradas con cantidades, estado posterior y rutas A08/A09 habilitadas o invalidadas. Conservar el inventario original; varios planes son alternativas mutuamente excluyentes, no una suma de cartas disponibles. La Reserva solo genera propuesta `HIPOTETICA_NO_DISPONIBLE` hasta aprobación expresa, nunca un Side implícito.

**Vínculo con guías:** las alternativas de Side o Reserva que cambien una ruta requieren variante **expresamente condicional** según los apartados 09 (ficha causal) y 10 (guía visual) vigentes; nunca aparecerán como mano o campo de un deck actual sin incorporación aprobada.

Proponer planes entre duelos: enfrentamiento objetivo, cartas exactas que salen/entran, cantidad, razón y efectos sobre combos primero/segundo. Si Side está vacío, declararlo sin rellenarlo. La Reserva se analiza como alternativa hipotética, sin modificar el Side vigente; cualquier incorporación real exige decisión de Miguel.

**Cruce obligatorio con A06/A08/A09:** las filas de Side y Reserva de la **única matriz de trazabilidad** en `APARTADO_06` indican uso, sinergia, IDs de jugadas/combos y disponibilidad. Una variante Side debe referir `plan_side_id`, cartas y cantidades que entran/salen, estado resultante y `jugada_id`/`combo_id` condicionales contrastados con el deck tras el cambio; no heredar la disponibilidad del Main anterior. Una alternativa de Reserva conserva estado `HIPOTETICA_NO_DISPONIBLE` hasta aprobación y no se contabiliza como combo del deck vigente. Mantener la matriz en A06, las fichas causales en A09 y el plan específico aquí, sin crear otro archivo.
