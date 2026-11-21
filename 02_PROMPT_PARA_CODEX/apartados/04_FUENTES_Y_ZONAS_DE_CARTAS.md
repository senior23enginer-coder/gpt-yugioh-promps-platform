# Apartado 04 — FUENTES Y ZONAS DE CARTAS

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_04`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

**Autocontención del ZIP por deck:** al preparar una entrega incremental, copiar a la **carpeta individual del deck** solo las imágenes, guías y datos que sus fichas realmente citen. Mantener referencias relativas internas verificables, cotejar el CID y evitar rutas absolutas, enlaces a otros decks o dependencias del ZIP completo. No copiar todas las imágenes generales por comodidad, no inventar archivos faltantes y no enviar instrucciones de control editorial en `01_INFORMACION_PARA_IMPORTAR`. Si falta un recurso necesario, dejar el A04 local en pendiente antes de declarar importable ese deck.

## Instrucción editorial específica

### Entregable A04 — biblioteca fotográfica real y mapa de zonas

Para **cada identidad** del inventario, registrar foto oficial/local por CID o `FOTO_PENDIENTE`; comprobar que el archivo abre, pertenece a la carta y vive dentro de la carpeta individual. Los campos `record.cards[*].image` y `full_image` apuntan a recursos locales permitidos que el importador de Station X pueda resolver, no a enlaces temporales de repositorios externos. No copiar fotos de Kashtira u otro deck por parecido del nombre. Definir el mapa de disponibilidad: Main (mano/Deck), Extra (procedimiento y materiales), Side (solo tras sustitución), Reserva (no jugable todavía), Skill Rush (recurso no robable).

Crear inventario de **zona de origen y destino** para futuras secuencias A09: mano, monstruos, magia/trampa, zona de campo, Cementerio, destierro, Extra y materiales Xyz cuando correspondan, con estado conocido/pendiente. Las imágenes no prueban por sí mismas que una carta empiece en mano ni que termine en campo. No presentar automáticamente todas las `hand_photos` como mano inicial.

**Prueba de aceptación A04:** 100 % de referencias de imágenes existentes y decodificables para las cartas marcadas `FOTO_OK`, vínculo exacto CID↔foto y separación estricta de zonas y disponibilidad. Si faltan fotos, el A04 o la cobertura visual queda PARCIAL; no falsificar un archivo para completar el ZIP.

- **Main Deck:** cartas activamente disponibles y cantidades reales.
- **Extra Deck:** monstruos de invocación permitida; un Extra vacío es válido si así consta.
- **Side Deck:** cartas que pueden incorporarse legalmente **entre duelos**, mediante un plan de sustitución concreto, no durante la partida principal por asumirlas disponibles.
- **Reserva:** propuestas o alternativas futuras, fuera del Main/Extra/Side actuales. Nunca simular una carta de Reserva como disponible sin cambio expresamente aprobado.
- **Skill/Habilidad Rush:** una entidad aparte, no robable, que no cuenta en Main/Extra/Side/Reserva, materiales ni probabilidades de mano. Para el flujo personalizado de los decks Rush de Miguel se requiere Skill recibida para declarar completo ese aspecto; Extra=0 no bloquea.

El inventario **vivo** de Station X es prioritario para cotejar ID real, formato y versión, pero **no sustituye automáticamente** las cartas y cantidades de la lista física aprobada por Miguel. Si difieren, registrar ambas fuentes y las diferencias por zona/cantidad, bloquear cambios de inventario y consultar al propietario; el catálogo histórico no es lectura de producción.


## Puerta obligatoria de checklist por deck — A04 (revisión 21-11-2026)

Este módulo se aplica **únicamente al deck identificado por `deck_id` + formato + inventario aprobado**, sin trasladar evidencia ni estado de otros decks. Se mantiene **una sola lista canónica por deck** dentro del archivo `DECK_*_CONTENIDO_CURADO.md` ya existente, bajo `CONTROL_DE_TAREAS_A01_A10` (o sección equivalente existente); no crear documentos/JSON de seguimiento por fase ni archivos de prueba por carta. Cada ejecución o reanálisis actualiza esa lista y devuelve el estado **de todas las tareas A01–A10A** para ese deck, incluyendo tareas terminadas con evidencia y pendientes concretas. A10B se muestra aparte como opcional; nunca se ejecuta implícitamente.

**Checklist A04 — obligatorio, chequeable y con evidencia:**
- [ ] **A04-T01** — Confirmar identidad y fuente de cada imagen mediante CID. Evidencia: `PENDIENTE`.
- [ ] **A04-T02** — Comprobar que las referencias de imágenes existen. Evidencia: `PENDIENTE`.
- [ ] **A04-T03** — Marcar únicamente fotos ausentes como pendiente, sin sustituciones. Evidencia: `PENDIENTE`.

**Regla de cierre:** `[x]` únicamente si el entregable está realmente completo, con CID/IDs, fuente y prueba documental/estructural correspondientes; `[ ]` significa pendiente y debe enumerar el motivo, elemento afectado y acción necesaria. `NO_APLICA` solo con justificación verificable. No declarar una tarea o apartado `COMPLETA` si alguna de sus obligaciones está parcial o sin verificar. Si no hay medios para completar un ítem, mantener el apartado **ABIERTO/BLOQUEADO**, sin presentar un falso cierre. A01–A10A son **obligatorios** para la entrega normal; A10B **no bloquea** A10A ni la importación de guía. La evidencia de una guía no certifica calculadora. Al finalizar cualquier módulo, presentar siempre recuento de tareas cerradas, checklist del apartado y lista íntegra pendiente A01–A10A; si A10B fue solicitado, reportarlo por separado.

**Datos transversales de carta reutilizables:** A05–A09 documentan exhaustivamente todas las cartas y sus efectos (identidad, CID, zonas, procedimiento versus activación, condiciones, disparador, timing, coste, target, elección, resolución, restricciones, respuesta, once-per-name/turn, cadenas, estado antes/después, recursos, sinergias y evidencia oficial), útiles para guía, análisis físico y eventual calculadora. **Preparar estos datos no significa ejecutar, compilar, sincronizar ni probar la calculadora**: eso queda exclusivamente en A10B. El único paquete estructurado del deck sigue siendo `datos/stationx-deck.json` cuando corresponda; Markdown/HTML son representaciones, imágenes recursos.


## Checklist obligatorio por deck A04 — control de entrega

Para cada `deck_id` y formato, ejecutar y marcar en la sección `CONTROL_DE_TAREAS_A01_A10` del **único** `DECK_*_CONTENIDO_CURADO.md` existente. No generar archivos de seguimiento separados. El siguiente es un **modelo de tareas** (no declara ya terminados los decks existentes):
- [ ] **A04-T1** Imagen correcta para cada CID; evidencia por carta/ruta, fuente e ID: pendiente hasta comprobar.
- [ ] **A04-T2** Fuentes y enlace local comprobados; evidencia por carta/ruta, fuente e ID: pendiente hasta comprobar.
- [ ] **A04-T3** Ausencias identificadas sin fotografías inventadas; evidencia por carta/ruta, fuente e ID: pendiente hasta comprobar.

Una tarea sólo se marca `[x]` si se ha completado y verificado íntegramente. No se permite `COMPLETA` con obligaciones parciales, faltantes o sin evidencia. Un impedimento se registra `[ ] BLOQUEADA` con motivo y siguiente acción; nunca se rellena una casilla sin pruebas. Tras ejecutar este prompt, devolver siempre **todas las tareas A01–A10A del deck**, con identificadores, estado, evidencia, recuento de terminadas y pendientes; A10B se informa por separado y sólo si fue solicitado. Las revisiones reabren exclusivamente tareas cuya evidencia haya cambiado.

La documentación causal completa de cada carta debe servir al visor, a las guías y al futuro motor: CID, texto, zonas, ventanas, condiciones, costes, objetivos, cadenas, resolución, restricciones y usos por nombre/turno. Prepararla **no activa** ejecución, compilación ni pruebas de calculadora; todo eso pertenece sólo a **A10B opcional**. A01–A10A son obligatorios, incluida la guía visual.
