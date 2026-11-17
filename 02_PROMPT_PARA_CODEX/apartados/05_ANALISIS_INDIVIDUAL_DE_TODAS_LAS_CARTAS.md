# Apartado 05 — ANÁLISIS INDIVIDUAL DE TODAS LAS CARTAS

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** abrir únicamente el archivo del deck solicitado en `01_INFORMACION_PARA_IMPORTAR/decks/` y sus salidas previas pertinentes. Consultar las instrucciones generales vigentes de `02_PROMPT_PARA_CODEX/00_PROMPT_UNICO_STATION_X_V31.md` y las reglas contextuales de `02_PROMPT_PARA_CODEX/REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md` cuando correspondan; no ejecutar el orquestador para corregir este apartado.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_05`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

## Instrucción editorial específica

**Contrato de ficha útil V58:** en la plataforma el usuario debe comprender
en menos de un minuto **qué hace esta carta en SU deck**, su coste o requisito,
cuándo conviene usarla, qué motor o carta recibe su efecto, qué consecuencia
produce y qué riesgo evita. Usar foto real, nombre, zona y copias. La función
de una carta debe enlazar una explicación causal A06 y, si existe, una ruta
A09, sin copiar el combo ni repetir párrafos genéricos sobre ir primero o
segundo. Si no hay una relación demostrada, indicarlo sin inventarla.
Fuentes, CID, análisis extenso y limitaciones técnicas se muestran solo en
detalle contextual. Para exclusiones editoriales, aplicar la política vigente del orquestador, sin requerir una matriz externa.

Para cada carta realmente disponible estudiar: nombre y copias; efecto y requisitos; coste; restricciones de uso; función principal y secundaria; cuándo es buena primero/segundo/turnos posteriores; sinergias y dependencias; qué combos habilita; riesgos, protección, recuperación y potencial de brick; utilidad actual y cambios únicamente sugeridos.

**Trazabilidad obligatoria A05 → A06 → A08 → A09:** cada identidad registrada de Main, Extra, Side y Reserva debe tener una ficha A05 identificable, con zona y copias verificadas, roles reales y justificación de uso. La **única matriz canónica por carta** se conserva dentro de `APARTADO_06` del archivo `01_INFORMACION_PARA_IMPORTAR/decks/DECK_<...>/DECK_*_CONTENIDO_CURADO.md`; A05 aporta a esa fila su ID, función, evidencia, limitaciones y enlace. Si no se ha encontrado una jugada o combo A08/A09, escribir `SIN_JUGADA_IDENTIFICADA` o `SIN_COMBO_IDENTIFICADO` según corresponda, con razón o investigación pendiente: **no inventar rutas, no declarar sinergia cero por ausencia de combo ni fabricar una tarea de prueba de mesa**. Side únicamente se evalúa en un plan de sustitución entre duelos; Reserva permanece hipotética. La ficha A05 no duplica la matriz ni las secuencias A09.

Etiquetar roles combinables: starter, searcher, extender, enabler, engine, handtrap, negación, protección, removal, board breaker, finisher, recuperación, carta dependiente y recurso de largo plazo. Si una carta no entra en rutas útiles, explicar por qué; no forzarla.
