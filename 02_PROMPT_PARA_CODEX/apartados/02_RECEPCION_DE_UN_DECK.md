# Apartado 02 — RECEPCIÓN DE UN DECK

### Puerta A02 — identidad y contrato importable para calculadora (20-11-2026)

Registrar el formato real del inventario y de la plataforma como valor técnico sin traducir; nunca intercambiar TCG, OCG, GOAT o Rush ni heredar reglas de un formato distinto. Conservar `deck_id`, IDs nativos de filas, `slots` Main/Extra/Side/Reserva/Skill, cantidades, `inventory_sha256` auténtico cuando exista y carpeta histórica. Los estudios existentes con paquete portátil deben conservar la vinculación `deck-slots-v1` real, sin inventar IDs.

Antes de A05, declarar el tipo de transferencia: `DOCUMENTAL_LEGACY`, `ESTRUCTURADA_IMPORTABLE` o `ESTRUCTURADA_PENDIENTE_DE_BASE`. La presencia de `datos/stationx-deck.json` solo prueba estructura potencial, no reglas de calculadora. Preparar en la misma carpeta una ruta de entrega para `record.cards`, `record.routes` y, **si está probada**, `record.calculator`; nunca un archivo auxiliar de reglas desconectado del ZIP nativo.

**Aceptación adicional:** importador y exportador deben reconocer un único deck, IDs, formato e inventario sin pérdidas. Si la huella o el formato no coinciden, bloquear la actualización estructurada y conservar el análisis documental; no intentar corregirlo forzando IDs ni contenido.


Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_02`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

## Instrucción editorial específica

### Entregable A02 — una carpeta y una identidad reutilizables por toda la cadena

Antes de analizar cartas, resolver inequívocamente `deck_id` real, formato, carpeta histórica exacta y nombre visible del deck. Registrar procedencia del inventario, fecha, equipo si existe, edición y estado de aprobación **sin convertir ese control en contenido de la ficha pública**. Para deck nuevo: crear en Station X desde TXT y **exportar Data** para obtener el paquete nativo; para existente: usar su ZIP exportado o su paquete portátil previamente vinculado a IDs de fila auténticos. Jamás generar un hash `inventory_sha256` ficticio.

Producir el mismo árbol individual `DECK_*/datos/stationx-deck.json`, `DECK_*_CONTENIDO_CURADO.md`, `imagenes/` y `guias/` según uso real. En A02 decidir y fijar la carpeta que **no cambiará** durante A03–A10. El JSON estructurado `station-x-deck-package/1` conserva `record.schema=station-x-curated-v62`. Debe mantener `content_mode=structured` cuando la IA edite fichas, rutas o recursos visuales. El Markdown y HTML complementan: no reemplazan un `record` interactivo.

**Prueba de aceptación A02:** ZIP con una sola carpeta, sin prompts, un solo deck, esquema identificado, coincidencia de ID/formato y archivo de origen; todas las etapas siguientes utilizan esa misma carpeta y el mismo `deck_id`.

Identificar nombre, deck_id, equipo, formato, versión, fecha y cantidades de Main, Extra, Side, Reserva y Skill cuando aplique. Diferenciar **deck encontrado en el catálogo**, **inventario transcrito**, **inventario aprobado**, **estudio iniciado** y **estudio terminado**.

**Entrada de una ejecución:** primero distinguir entre alta de deck nuevo y selección de uno existente. Una vez identificada la ficha correcta, interpretar los A01–A10 solicitados: selección explícita de uno o varios apartados = solo esos; ausencia de límite o petición general de análisis = A01–A10 por defecto; continuación desde Axx = Axx hasta A10 salvo límite expreso. Normalizar siempre en orden ascendente. Ejemplo A01, A03 y A05: concluir A01 con evidencia y cierre verificable antes de iniciar A03; concluir A03 antes de A05. No exigir nueva selección ni confirmación entre apartados; un bloqueo real detiene la secuencia y conserva su punto de reanudación conforme al apartado 12 del maestro. No añadir otros decks ni considerar las dependencias consultadas como apartados terminados.

Si el deck es nuevo, buscar su ID real antes de asociarlo. Si hay nombres similares, híbridos, formatos distintos o más de una coincidencia, pedir decisión al propietario **solo sobre esa identidad**. Los **16 decks actuales** están documentados en `01_INFORMACION_PARA_IMPORTAR/decks/`; las cinco carpetas `NUEVO_12` a `NUEVO_16` mantienen nombres documentales históricos, pero sus IDs reales **671, 677, 660, 673 y 699**, respectivamente, ya constan confirmados en el registro único. Contrastar con el registro vivo antes de una escritura autorizada.

**Alta incremental obligatoria:** para un deck que se agregue en adelante, crear su **única carpeta** `01_INFORMACION_PARA_IMPORTAR/decks/DECK_<ID_REAL_O_REFERENCIA>_<NOMBRE_CORTO>/`. Dentro irá `DECK_<...>_CONTENIDO_CURADO.md`, con la **configuración completa** (ID, formato, Main/Extra/Side/Reserva/Skill, cantidades), su control propio **A01–A10** y la matriz A06; incluir subcarpetas `imagenes/`, `guias/` y `datos/` solamente cuando existan archivos realmente utilizados. No producir un segundo archivo de configuración ni mezclar cartas de otro deck. Al solicitar entrega, empaquetar **solo esa carpeta** con su ruta relativa, sin el maestro ni otros decks. Seguir el contrato del apartado 13 del orquestador; no importar nada automáticamente.


## Puerta obligatoria de checklist por deck — A02 (revisión 21-11-2026)

Este módulo se aplica **únicamente al deck identificado por `deck_id` + formato + inventario aprobado**, sin trasladar evidencia ni estado de otros decks. Se mantiene **una sola lista canónica por deck** dentro del archivo `DECK_*_CONTENIDO_CURADO.md` ya existente, bajo `CONTROL_DE_TAREAS_A01_A10` (o sección equivalente existente); no crear documentos/JSON de seguimiento por fase ni archivos de prueba por carta. Cada ejecución o reanálisis actualiza esa lista y devuelve el estado **de todas las tareas A01–A10A** para ese deck, incluyendo tareas terminadas con evidencia y pendientes concretas. A10B se muestra aparte como opcional; nunca se ejecuta implícitamente.

**Checklist A02 — obligatorio, chequeable y con evidencia:**
- [ ] **A02-T01** — Confirmar deck_id, formato y carpeta canónica sin inventar IDs. Evidencia: `PENDIENTE`.
- [ ] **A02-T02** — Verificar procedencia de ZIP/paquete y contrato de importación. Evidencia: `PENDIENTE`.
- [ ] **A02-T03** — Vincular salida al único registro existente del deck. Evidencia: `PENDIENTE`.

**Regla de cierre:** `[x]` únicamente si el entregable está realmente completo, con CID/IDs, fuente y prueba documental/estructural correspondientes; `[ ]` significa pendiente y debe enumerar el motivo, elemento afectado y acción necesaria. `NO_APLICA` solo con justificación verificable. No declarar una tarea o apartado `COMPLETA` si alguna de sus obligaciones está parcial o sin verificar. Si no hay medios para completar un ítem, mantener el apartado **ABIERTO/BLOQUEADO**, sin presentar un falso cierre. A01–A10A son **obligatorios** para la entrega normal; A10B **no bloquea** A10A ni la importación de guía. La evidencia de una guía no certifica calculadora. Al finalizar cualquier módulo, presentar siempre recuento de tareas cerradas, checklist del apartado y lista íntegra pendiente A01–A10A; si A10B fue solicitado, reportarlo por separado.

**Datos transversales de carta reutilizables:** A05–A09 documentan exhaustivamente todas las cartas y sus efectos (identidad, CID, zonas, procedimiento versus activación, condiciones, disparador, timing, coste, target, elección, resolución, restricciones, respuesta, once-per-name/turn, cadenas, estado antes/después, recursos, sinergias y evidencia oficial), útiles para guía, análisis físico y eventual calculadora. **Preparar estos datos no significa ejecutar, compilar, sincronizar ni probar la calculadora**: eso queda exclusivamente en A10B. El único paquete estructurado del deck sigue siendo `datos/stationx-deck.json` cuando corresponda; Markdown/HTML son representaciones, imágenes recursos.


## Checklist obligatorio por deck A02 — control de entrega

Para cada `deck_id` y formato, ejecutar y marcar en la sección `CONTROL_DE_TAREAS_A01_A10` del **único** `DECK_*_CONTENIDO_CURADO.md` existente. No generar archivos de seguimiento separados. El siguiente es un **modelo de tareas** (no declara ya terminados los decks existentes):
- [ ] **A02-T1** Deck ID y formato reales; evidencia por carta/ruta, fuente e ID: pendiente hasta comprobar.
- [ ] **A02-T2** Contrato nativo e identidad del paquete verificables; evidencia por carta/ruta, fuente e ID: pendiente hasta comprobar.
- [ ] **A02-T3** Carpeta y procedencia conservadas; evidencia por carta/ruta, fuente e ID: pendiente hasta comprobar.

Una tarea sólo se marca `[x]` si se ha completado y verificado íntegramente. No se permite `COMPLETA` con obligaciones parciales, faltantes o sin evidencia. Un impedimento se registra `[ ] BLOQUEADA` con motivo y siguiente acción; nunca se rellena una casilla sin pruebas. Tras ejecutar este prompt, devolver siempre **todas las tareas A01–A10A del deck**, con identificadores, estado, evidencia, recuento de terminadas y pendientes; A10B se informa por separado y sólo si fue solicitado. Las revisiones reabren exclusivamente tareas cuya evidencia haya cambiado.

La documentación causal completa de cada carta debe servir al visor, a las guías y al futuro motor: CID, texto, zonas, ventanas, condiciones, costes, objetivos, cadenas, resolución, restricciones y usos por nombre/turno. Prepararla **no activa** ejecución, compilación ni pruebas de calculadora; todo eso pertenece sólo a **A10B opcional**. A01–A10A son obligatorios, incluida la guía visual.
