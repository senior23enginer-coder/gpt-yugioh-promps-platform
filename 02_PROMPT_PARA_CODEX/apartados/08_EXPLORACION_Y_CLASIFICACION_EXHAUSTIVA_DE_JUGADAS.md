# Apartado 08 — EXPLORACIÓN Y CLASIFICACIÓN EXHAUSTIVA DE JUGADAS

**Contrato de experiencia A06–A10 (07-11-2026):** A08 alimenta el **mismo selector de rutas por objetivo** en «Aprende el deck», no una pestaña ajena a la guía. Etiquetar claramente `INTERACCIÓN BÁSICA`, `STARTER`, `EXTENSIÓN`, `COMBO COMPLETO` y `CONTINUACIÓN`; no inflar el número de combos con búsquedas, «Rocket + Reload» ni ramas que dependen de una apertura padre. Cada opción debe decir «con qué inicio», «para qué sirve» y «a qué resultado verificable conduce», y enlazar a una sola ficha A09/A10 si existe.

**Refuerzo v57 de cobertura A08:** exponer en el **recorrido unificado** todas las prefichas elementales A08 del deck, con fotos de las piezas iniciales, propósito, requisitos, categoría real y estado de comprobación. Añadir explorador secundario de **roles de cada carta Main/Extra** extraído de A05/A08 para que buscadores, handtraps, extensores y apoyos no desaparezcan del aprendizaje al carecer de una ruta A09 propia. No confundir «rol de una carta» con «interacción ejecutable»: si su secuencia o ventana no ha sido demostrada, indicar qué falta y no inventar foto de un endboard. Los enlaces A08→A09 por coincidencia de cartas son **solo sugerencias de estudio**, requieren confirmar los recursos exactos y jamás equivalen a una relación certificada. Conservar clasificación y pendientes originales sin elevarlos por la presentación.

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** abrir únicamente el archivo del deck solicitado en `01_INFORMACION_PARA_IMPORTAR/decks/` y sus salidas previas pertinentes. Consultar las instrucciones generales vigentes de `02_PROMPT_PARA_CODEX/00_PROMPT_UNICO_STATION_X_V31.md` y las reglas contextuales de `02_PROMPT_PARA_CODEX/REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md` cuando correspondan; no ejecutar el orquestador para corregir este apartado.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_08`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

## Instrucción editorial específica

**Registro mínimo A08:** `jugada_id`, categoría, cartas y copias participantes, zona/fase y estado inicial, condición habilitante, acción y utilidad concreta, resultado y evidencia, `combo_id` padre o referencia cuando exista, estado y próxima comprobación. La coincidencia de cartas con A09 no basta: vincular únicamente tras comprobar la cadena causal y los recursos exactos. Variantes del mismo plan conservan ID padre y un identificador de variante estable; registrar una familia independiente solo si existe apertura propia y desenlace táctico sustancialmente distinto, no por cambiar la redacción.

**Método vigente:** este apartado descubre y clasifica las familias de rutas. Las secuencias causales verificables se desarrollan únicamente en el apartado 09 y sus fotografías y guías en el 10. No confundir exploración con ruta certificada.

Explorar sistemáticamente combinaciones funcionales de 1, 2, 3 y 4+ cartas, todos los starters, buscadores, extensores, mano/campo/GY/destierro, cada objetivo alcanzable del Extra, efectos en turno rival, líneas primero/segundo, control, daño, ruptura de campo, recursos bajos, bricks, medio/tardío y respuestas a interrupciones.

**Enlace obligatorio con la matriz canónica A06:** por cada `jugada_id` A08 registrar IDs de **todas las cartas que realmente participan**, papel en esa jugada, zona, cantidad, precondición y resultado. Cruzar la participación contra la fila de esa carta en la **única matriz `APARTADO_06`** del documento de deck, sin copiar la matriz a A08. Registrar rutas Main/Extra reales, opciones Side solamente **tras cambios exactos entre duelos A23** y opciones de Reserva como **hipótesis no disponibles**. Cotejar que cada starter, material, coste y objetivo existe con las copias indicadas; una coincidencia de nombres o CIDs no prueba un enlace causal. Marcar `SIN_JUGADA_IDENTIFICADA` cuando la investigación no encuentre una interacción útil, pero conservar roles autónomos A05/A06 y el motivo concreto. La investigación y el cruce constituyen tareas de IA; no exigir al usuario simulaciones físicas para cerrar un hallazgo documental.

**Clasificar sin mezclar:**

1. **Interacción básica:** busca, envía, descarta, roba o prepara algo, sin objetivo y campo completos. Ejemplo: **Volcanic Rocket → Blaze Accelerator Reload** por sí sola es preparación, **NO combo**.
2. **Starter/apertura:** recursos mínimos que ponen en marcha el motor pero pueden necesitar continuación.
3. **Extensión:** agrega materiales o transforma un estado previo; mencionar a qué combo conecta y qué consume.
4. **Combo completo:** secuencia legal y reproducible con condiciones iniciales, objetivo táctico específico, pasos sin saltos, recursos y **tablero final exacto**. Debe tener la guía visual del apartado 10.
5. **Plan o decisión táctica:** elección según amenaza, turno o estado; no presentarla como combo automático.
6. **Ruta incompleta/no ejecutable:** conservar la idea y su motivo, pero NO incluirla en el recuento de combos completos.

Agrupar aperturas equivalentes que alcanzan el mismo resultado en una **familia**, con variantes A1/A2... solo si cambian recursos, secuencia, exposición o calidad del resultado. Conservar identificadores previos únicamente como referencias históricas. **No fijar número de combos** ni afirmar haber encontrado matemáticamente todas las secuencias posibles sin procedimiento que lo demuestre.

**Check por jugada, no por título de apartado (V58):** cada registro A08
requiere ID, categoría, cartas, zonas, condición, resultado, referencia y
estado propio. Una interacción `[X]` no se promueve a `COMBO_COMPLETO`.
Las candidatas `[~]` o `[ ]` se pueden conservar **como borradores privados
identificados** si existe persistencia autorizada, pero no se publican ni
contabilizan como combos certificados. Codex filtra unidad por unidad;
nunca importa automáticamente un apartado entero.
