# Apartado 03 — VALIDACIÓN DEL INVENTARIO, IDENTIDAD Y COMPATIBILIDAD MECÁNICA

## Entrega estandarizada A03 — semántica compartida y criterios de aceptación

El inventario es la fuente de cardinalidad de todo el checklist: ninguna carta (incluido Side/Reserva) se omite del estudio, aunque Side/Reserva no entren automáticamente en el duelo. No evaluar banlist si no se pidió; no inventar recursos.

Se usa la única especificación causal del prompt maestro: IDs estables, fuentes verificables y ausencia de supuestos ocultos. Al cerrar este apartado se actualiza el checklist real del deck y se devuelve el estado completo A01–A10A, más A10B solo si se solicitó; `[x]` no admite parciales.

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_03`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

**Paquete incremental por deck:** el inventario confirmado Main/Extra/Side/Reserva y Skill, con cantidades por zona, debe quedar **dentro de la ficha `DECK_*_CONTENIDO_CURADO.md` del deck solicitado**, en su carpeta individual tanto si el deck ya existía como si es nuevo. Verificar que no haya cartas de otro deck ni se introduzcan cartas del Side/Reserva como disponibles por defecto. Si Miguel pide analizar un único deck, incluir **solo su carpeta** bajo `01_INFORMACION_PARA_IMPORTAR/decks/`; no volver a comprimir el maestro salvo petición expresa, ni duplicar el inventario en otro archivo de configuración. Las **16 fichas actuales** están organizadas por deck; comprobar que cada referencia relativa resuelva dentro de su carpeta o a los recursos compartidos.

## Instrucción editorial específica

### Entregable A03 — integridad que proteja todas las fotografías y combos posteriores

Crear un inventario canónico **por fila nativa**, con `card_id` (ID de fila Station X), CID cuando se conozca, nombre oficial/documental, `section` y `quantity`. Cotejar los totales Main/Extra/Side/Reserva con la aprobación del usuario y verificar que cada ID de fila pertenezca a este único deck. Si un mismo nombre está en dos zonas, conservar **dos filas**: no perder cantidades por deduplicarlo por CID. Las Skills siguen como entidades separadas.

Cruzar cada `record.cards[*].slots[*]` con el inventario actual: las filas deben coincidir en ID, sección y cantidad. **No modificar** Main/Extra/Side/Reserva desde A01–A10. Registrar ambigüedad de CID o carta no identificada como `IDENTIDAD_PENDIENTE`: ninguna IA puede escoger una fotografía «parecida». Todos los pasos A09 y todas las imágenes A10 tienen que resolver a un ID/CID de este inventario o quedar marcados como recurso externo/condicional debidamente justificado.

**Prueba de aceptación A03:** cero filas inventadas, cero IDs duplicados, zonas y copias conservadas, conteo auditable y lista de CIDs sin identificar; el paquete debe ser rechazado cuando no coincidan las filas reales de Station X.

Transcribir exactamente cartas, nombres y copias; detectar imágenes ambiguas, entradas duplicadas por error y piezas no identificadas. Separar datos **confirmados**, **recibidos sin confirmar** y **faltantes**. No inventar una carta ni tratar un vacío sin constancia como prueba de que el usuario decidió dejarlo vacío.

Validar **compatibilidad mecánica del formato, identidad y requisitos reales de invocación**. Aplicar la exclusión transversal de la sección 1 del orquestador también a recomendaciones de altas, bajas y cantidades, sin excepciones. Evaluar las cartas recibidas por sus efectos, costes, materiales, zonas y condiciones reales; conservar sus cantidades y no agregar advertencias procedentes de listas de construcción.

Se puede comenzar un **estudio provisional** con inventario recibido. No presentar como definitivo un inventario pendiente de aprobación. La falta de certeza reglamentaria tampoco impide conservar trabajo documental etiquetado como pendiente.


## Checklist obligatorio por deck A03 — control de entrega

Para cada `deck_id` y formato, ejecutar y marcar en la sección `CONTROL_DE_TAREAS_A01_A10` del **único** `DECK_*_CONTENIDO_CURADO.md` existente. No generar archivos de seguimiento separados. El siguiente es un **modelo de tareas** (no declara ya terminados los decks existentes):
- [ ] **A03-T1** Cotejar el 100 % de Main, Extra, Side, Reserva y Skill por zona, cantidad y copia física real; adjuntar evidencia por CID/ID, fuente y control verificado, o bloqueo con causa y siguiente acción.
- [ ] **A03-T2** Comprobar correspondencia unívoca card_id↔CID↔nombre oficial, sin duplicados o alias inseguros; adjuntar evidencia por CID/ID, fuente y control verificado, o bloqueo con causa y siguiente acción.
- [ ] **A03-T3** Congelar la lista aprobada y producir denominadores de identidades, copias, efectos y rutas para los reportes posteriores; adjuntar evidencia por CID/ID, fuente y control verificado, o bloqueo con causa y siguiente acción.

Una tarea sólo se marca `[x]` si se ha completado y verificado íntegramente. No se permite `COMPLETA` con obligaciones parciales, faltantes o sin evidencia. Un impedimento se registra `[ ] BLOQUEADA` con motivo y siguiente acción; nunca se rellena una casilla sin pruebas. Tras ejecutar este prompt, devolver siempre **todas las tareas A01–A10A del deck**, con identificadores, estado, evidencia, recuento de terminadas y pendientes; A10B se informa por separado y sólo si fue solicitado. Las revisiones reabren exclusivamente tareas cuya evidencia haya cambiado.

La documentación causal completa de cada carta debe servir al visor, a las guías y al futuro motor: CID, texto, zonas, ventanas, condiciones, costes, objetivos, cadenas, resolución, restricciones y usos por nombre/turno. Prepararla **no activa** ejecución, compilación ni pruebas de calculadora; todo eso pertenece sólo a **A10B opcional**. A01–A10A son obligatorios, incluida la guía visual.
