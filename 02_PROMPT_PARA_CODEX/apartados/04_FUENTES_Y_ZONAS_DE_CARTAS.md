# Apartado 04 — FUENTES Y ZONAS DE CARTAS

### Precondición A04 — selección expresa y deck realmente cargado

**NO ejecutar este apartado sin asignación expresa del usuario de un `deck_id` concreto.** Antes de realizar cualquier tarea, comprobar mediante el gate `scripts/analysis-eligibility.cjs` que el deck seleccionado coincide con el registro real y tiene **Main y Extra físicamente cargados con cantidades positivas**. **Side y Reserva son opcionales** y jamás deben completarse por suposición. En ausencia de selección o cualquiera de esas dos zonas, registrar `BLOQUEADO_POR_INVENTARIO_O_AUTORIZACION`, indicar exactamente qué falta y **no analizar parcialmente, ni continuar con otros decks**. Verificar formatos/IDs/slots y no aceptar listas de otro deck. Las comprobaciones de infraestructura/CI no representan una asignación del usuario ni autorizan reejecutar A01–A10A en mazos existentes.


**Autorización acotada A04:** el usuario ha asignado expresamente A04 del Kashtira Pure 665 después de completar A01–A03 con Side=0. La puerta permite `stageId='A04'` y `authorizedSideOmissionForA04=true` solo para certificar imágenes, procedencia, calidad real y zonas, manteniendo **Main 42, Extra 15, Side 0, Reserva 19** y todos los `card_id`/CID originales. No traslada Reserva, no incorpora banlist, no inicia A05–A10A. Imágenes decodificables de resolución baja se identifican como **miniaturas**, sin declararlas HD.

**Regla vigente de elegibilidad para todo A01–A10A (23-11-2026):** Main y Extra cargados con cantidades positivas son el mínimo universal; Side y Reserva son opcionales. Conservar la identidad, zona y cantidad real de cada carta, incluso cuando Side esté vacío. Las excepciones históricas de Kashtira para Side=0 se conservan como trazabilidad, pero ya no son permisos necesarios ni bloquean otros decks. Banlist fuera de alcance salvo solicitud expresa. El análisis se ejecuta únicamente para los decks expresamente asignados por el usuario.


## Entrega estandarizada A04 — semántica compartida y criterios de aceptación

Una imagen aporta identidad visual, no efectos ni legalidad. Entregar referencias reutilizables por CID para la ficha, el editor y las guías, separadas del estado físico real que observará A10B.

Se usa la única especificación causal del prompt maestro: IDs estables, fuentes verificables y ausencia de supuestos ocultos. Al cerrar este apartado se actualiza el checklist real del deck y se devuelve el estado completo A01–A10A, más A10B solo si se solicitó; `[x]` no admite parciales.

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


## Checklist obligatorio por deck A04 — control de entrega

Para cada `deck_id` y formato, ejecutar y marcar en la sección `CONTROL_DE_TAREAS_A01_A10` del **único** `DECK_*_CONTENIDO_CURADO.md` existente. No generar archivos de seguimiento separados. El siguiente es un **modelo de tareas** (no declara ya terminados los decks existentes):
- [ ] **A04-T1** Acreditar CID, fuente oficial, formato y foto auténtica de todas las identidades del inventario; adjuntar evidencia por CID/ID, fuente y control verificado, o bloqueo con causa y siguiente acción.
- [ ] **A04-T2** Validar ruta de imagen, calidad y correspondencia física con el card_id/slot, sin importar imágenes ajenas; adjuntar evidencia por CID/ID, fuente y control verificado, o bloqueo con causa y siguiente acción.
- [ ] **A04-T3** Registrar el mapa de zonas y posiciones que compartirá A05/A07/A09/A10A y declarar FOTO_PENDIENTE sin falsificar prueba; adjuntar evidencia por CID/ID, fuente y control verificado, o bloqueo con causa y siguiente acción.

Una tarea sólo se marca `[x]` si se ha completado y verificado íntegramente. No se permite `COMPLETA` con obligaciones parciales, faltantes o sin evidencia. Un impedimento se registra `[ ] BLOQUEADA` con motivo y siguiente acción; nunca se rellena una casilla sin pruebas. Tras ejecutar este prompt, devolver siempre **todas las tareas A01–A10A del deck**, con identificadores, estado, evidencia, recuento de terminadas y pendientes; A10B se informa por separado y sólo si fue solicitado. Las revisiones reabren exclusivamente tareas cuya evidencia haya cambiado.

La documentación causal completa de cada carta debe servir al visor, a las guías y al futuro motor: CID, texto, zonas, ventanas, condiciones, costes, objetivos, cadenas, resolución, restricciones y usos por nombre/turno. Prepararla **no activa** ejecución, compilación ni pruebas de calculadora; todo eso pertenece sólo a **A10B opcional**. A01–A10A son obligatorios, incluida la guía visual.
