# Apartado 08 — EXPLORACIÓN Y CLASIFICACIÓN EXHAUSTIVA DE JUGADAS

### Puerta A08 — no confundir posibilidad, utilidad y ejecución (20-11-2026)

Además de `INTERACCIÓN BÁSICA`, `STARTER`, `EXTENSIÓN`, `COMBO COMPLETO` y `CONTINUACIÓN`, cada candidato registra tres **atributos independientes**: `LEGALIDAD_DOCUMENTAL` (contrastada/condicional/pendiente), `UTILIDAD_CONTEXTO` (motor/recuperación/ruptura/respuesta/solo procedimiento sin objetivo) y `SOPORTE_CALCULADORA` (regla probada/operador pendiente/no aplicable). No convertir «puede Invocarse Normalmente» en una recomendación: para recomendar debe existir efecto, dependencia o resultado táctico verificable en ese estado.

Para cada preficha declarar cartas/zonas/recursos actuales que habilitan y **que bloquean** la ruta, si consume Normal, si deja vulnerabilidad, y qué cambiaría si el rival tiene la respuesta conocida. Si la línea requiere una condición en GY/campo o una carta de nombre concreto, no sustituirla por similitud textual. Las rutas documentadas sin reglas ejecutables permanecen visibles como **referencia condicional**, nunca como alternativas calculadas desde el tablero.

**Aceptación adicional:** comparar, en al menos un estado por motor, qué línea se habilita al cumplir el requisito y cuál desaparece al retirarlo; verificar que una handtrap situacional no figure como «desarrollo de campo» por simple presencia en mano.


**Contrato de experiencia A06–A10 (07-11-2026):** A08 alimenta el **mismo selector de rutas por objetivo** en «Aprende el deck», no una pestaña ajena a la guía. Etiquetar claramente `INTERACCIÓN BÁSICA`, `STARTER`, `EXTENSIÓN`, `COMBO COMPLETO` y `CONTINUACIÓN`; no inflar el número de combos con búsquedas, «Rocket + Reload» ni ramas que dependen de una apertura padre. Cada opción debe decir «con qué inicio», «para qué sirve» y «a qué resultado verificable conduce», y enlazar a una sola ficha A09/A10 si existe.

**Refuerzo v57 de cobertura A08:** exponer en el **recorrido unificado** todas las prefichas elementales A08 del deck, con fotos de las piezas iniciales, propósito, requisitos, categoría real y estado de comprobación. Añadir explorador secundario de **roles de cada carta Main/Extra** extraído de A05/A08 para que buscadores, handtraps, extensores y apoyos no desaparezcan del aprendizaje al carecer de una ruta A09 propia. No confundir «rol de una carta» con «interacción ejecutable»: si su secuencia o ventana no ha sido demostrada, indicar qué falta y no inventar foto de un endboard. Los enlaces A08→A09 por coincidencia de cartas son **solo sugerencias de estudio**, requieren confirmar los recursos exactos y jamás equivalen a una relación certificada. Conservar clasificación y pendientes originales sin elevarlos por la presentación.

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_08`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

## Instrucción editorial específica

### Entregable A08 — catálogo visual de rutas que lleva a resultados reales

Cada candidato conserva un `jugada_id`, tipo (starter, interacción básica, extensión, continuación, combo completo o decisión), **mano mínima o estado inicial probado** con IDs/CIDs, fotos de esas piezas (no de objetivos futuros), objetivo tangible, requisitos, coste relevante, resultado estimado y `combo_id` A09 cuando exista. Agrupar variantes por familia y exponer un selector de rutas por propósito, al modo de Kashtira, **sin elevar un buscador aislado a combo completo**. La lista de resultados debe incluir campo/meta observable cuando esté verificado o `DOCUMENTADA_SIN_CAMPO_ESPACIAL` si la exploración no logra identificar zonas.

Antes de pasar a A09 producir una tabla de traspaso: `jugada_id → ruta padre/variante → cartas y fotos confirmadas → estado inicial → pasos todavía necesarios → resultado/limitación → regla A07 pendiente`. Cada familia tiene al menos un desenlace ilustrable o una explicación explícita de por qué no puede presentarse como secuencia validada.

**Prueba de aceptación A08:** todos los candidatos clasificados individualmente, sin rutas duplicadas por cambios de nombre y sin fotografías de cartas no disponibles. El número de rutas completas jamás se determina con una cuota artificial ni se compara mecánicamente con las de Kashtira.

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


## Puerta obligatoria de checklist por deck — A08 (revisión 21-11-2026)

Este módulo se aplica **únicamente al deck identificado por `deck_id` + formato + inventario aprobado**, sin trasladar evidencia ni estado de otros decks. Se mantiene **una sola lista canónica por deck** dentro del archivo `DECK_*_CONTENIDO_CURADO.md` ya existente, bajo `CONTROL_DE_TAREAS_A01_A10` (o sección equivalente existente); no crear documentos/JSON de seguimiento por fase ni archivos de prueba por carta. Cada ejecución o reanálisis actualiza esa lista y devuelve el estado **de todas las tareas A01–A10A** para ese deck, incluyendo tareas terminadas con evidencia y pendientes concretas. A10B se muestra aparte como opcional; nunca se ejecuta implícitamente.

**Checklist A08 — obligatorio, chequeable y con evidencia:**
- [ ] **A08-T01** — Enumerar jugadas, decisiones, matchups, interrupciones y bricks de cada carta. Evidencia: `PENDIENTE`.
- [ ] **A08-T02** — Justificar viabilidad con recursos y restricciones documentados. Evidencia: `PENDIENTE`.
- [ ] **A08-T03** — Vincular cada alternativa a una ruta A09 o explicar SIN_JUGADA_ACREDITADA. Evidencia: `PENDIENTE`.

**Regla de cierre:** `[x]` únicamente si el entregable está realmente completo, con CID/IDs, fuente y prueba documental/estructural correspondientes; `[ ]` significa pendiente y debe enumerar el motivo, elemento afectado y acción necesaria. `NO_APLICA` solo con justificación verificable. No declarar una tarea o apartado `COMPLETA` si alguna de sus obligaciones está parcial o sin verificar. Si no hay medios para completar un ítem, mantener el apartado **ABIERTO/BLOQUEADO**, sin presentar un falso cierre. A01–A10A son **obligatorios** para la entrega normal; A10B **no bloquea** A10A ni la importación de guía. La evidencia de una guía no certifica calculadora. Al finalizar cualquier módulo, presentar siempre recuento de tareas cerradas, checklist del apartado y lista íntegra pendiente A01–A10A; si A10B fue solicitado, reportarlo por separado.

**Datos transversales de carta reutilizables:** A05–A09 documentan exhaustivamente todas las cartas y sus efectos (identidad, CID, zonas, procedimiento versus activación, condiciones, disparador, timing, coste, target, elección, resolución, restricciones, respuesta, once-per-name/turn, cadenas, estado antes/después, recursos, sinergias y evidencia oficial), útiles para guía, análisis físico y eventual calculadora. **Preparar estos datos no significa ejecutar, compilar, sincronizar ni probar la calculadora**: eso queda exclusivamente en A10B. El único paquete estructurado del deck sigue siendo `datos/stationx-deck.json` cuando corresponda; Markdown/HTML son representaciones, imágenes recursos.
