# Apartado 05 — ANÁLISIS INDIVIDUAL DE TODAS LAS CARTAS

### Puerta A05 — inventario de efectos para análisis del estado (20-11-2026)

Para cada carta y cada efecto diferenciado, registrar bajo su identidad existente `card_id` + CID confirmado y fuente: **dónde se activa** (mano/campo/GY/destierro/Extra), condición o procedimiento de Invocación, si inicia cadena, coste, objetivo, ventana/fase, resolución, uso una vez por carta/nombre/turno, estado de la carta después, restricciones y rol real (incluida handtrap/respuesta situacional). Separar el **procedimiento** de Invocación Especial de un monstruo de un supuesto efecto activado de otra carta; por ejemplo, una condición «controlar una carta de nombre X» no se convierte automáticamente en «activar X para revivir».

Anotar por efecto `VERIFICADO_DOCUMENTAL`, `OPERADOR_PENDIENTE`, `REGLA_EJECUTABLE_PROBADA` o `IDENTIDAD_PENDIENTE`. Una ficha con imagen y explicación pero sin operador soportado **no cuenta como efecto calculable**. No generar una Invocación Normal genérica de handtraps como propuesta estratégica: su utilidad se analiza en la ventana y recursos donde actúa, salvo línea concreta respaldada por A08/A09 y reglas ejecutables.

**Aceptación A05→A07:** comprobar por cada carta la correspondencia entre nombre oficial/alias permitido, CID, slot real, copias y efecto; mantener denominadores separados «fichas documentadas» / «efectos con especificación» / «efectos ejecutables probados». Las imágenes no son evidencia de un efecto y el motor no extrae reglas de texto libre.


Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_05`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

## Instrucción editorial específica

### Entregable A05 — fichas con fotografía, efecto y propósito que alimenten la guía

Para **todas las identidades**, añadir al `record.cards` (cuando el paquete estructurado esté disponible) una fotografía A04, nombre, ID/CID, `slots`, **qué hace**, coste y condición de activación, resolución, `once per turn` cuando esté acreditado, función concreta de esa carta **en esta lista**, qué buscar/invocar/enviar/equipar, qué recurso obtiene o gasta, qué impide su uso y a qué motor A06 o paso A09 contribuye. La carta que no tiene ruta debe explicar su papel autónomo, nunca recibir un combo inventado.

Proporcionar dos niveles simultáneos: **tarjeta del jugador** (foto, zona/copias, acción real y utilidad en menos de un minuto) y **detalle desplegable** (texto de efecto, fuente, limitaciones, ambigüedades y estado). No usar un dictamen editorial extenso como primera frase ni reutilizar el mismo texto en 39 cartas. Conservar `source_aliases` únicamente como nombres verdaderamente equivalentes y no como coincidencias vagas que vinculen fotos incorrectas.

**Prueba de aceptación A05:** `identidades con ficha + foto correcta / identidades totales` y trazabilidad completa `card_id→CID→imagen→efecto→motor`; comprobar al menos un ejemplo que se vea en pantalla y otro que permanezca explícitamente pendiente.

**Mínimo de cierre por identidad A05:** registrar ID/CID o identidad documental sin confirmar, nombre y copias por zona, texto/efecto contrastado o fuente pendiente, requisito/coste/ventana/límite, función concreta en esta lista, recurso obtenido/consumido, riesgo y vínculo A06. Si no tiene jugada o combo acreditado, justificar `SIN_JUGADA_IDENTIFICADA`/`SIN_COMBO_IDENTIFICADO` y no crear un ID ficticio. Una ficha con campos sin evidencia queda PARCIAL aunque tenga fotografía y texto extenso; declarar cobertura como identidades completas/identidades confirmadas por zona.

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


## Puerta obligatoria de checklist por deck — A05 (revisión 21-11-2026)

Este módulo se aplica **únicamente al deck identificado por `deck_id` + formato + inventario aprobado**, sin trasladar evidencia ni estado de otros decks. Se mantiene **una sola lista canónica por deck** dentro del archivo `DECK_*_CONTENIDO_CURADO.md` ya existente, bajo `CONTROL_DE_TAREAS_A01_A10` (o sección equivalente existente); no crear documentos/JSON de seguimiento por fase ni archivos de prueba por carta. Cada ejecución o reanálisis actualiza esa lista y devuelve el estado **de todas las tareas A01–A10A** para ese deck, incluyendo tareas terminadas con evidencia y pendientes concretas. A10B se muestra aparte como opcional; nunca se ejecuta implícitamente.

**Checklist A05 — obligatorio, chequeable y con evidencia:**
- [ ] **A05-T01** — Fichar todas las identidades y todos los efectos separados, incluidos continuos y procedimientos. Evidencia: `PENDIENTE`.
- [ ] **A05-T02** — Registrar origen, ventana, condición, coste, objetivo, resultado, restricciones, frecuencia y rol táctico. Evidencia: `PENDIENTE`.
- [ ] **A05-T03** — Vincular cada efecto a CID, fuente, zonas, recursos y evidencias A07 sin código de calculadora. Evidencia: `PENDIENTE`.

**Regla de cierre:** `[x]` únicamente si el entregable está realmente completo, con CID/IDs, fuente y prueba documental/estructural correspondientes; `[ ]` significa pendiente y debe enumerar el motivo, elemento afectado y acción necesaria. `NO_APLICA` solo con justificación verificable. No declarar una tarea o apartado `COMPLETA` si alguna de sus obligaciones está parcial o sin verificar. Si no hay medios para completar un ítem, mantener el apartado **ABIERTO/BLOQUEADO**, sin presentar un falso cierre. A01–A10A son **obligatorios** para la entrega normal; A10B **no bloquea** A10A ni la importación de guía. La evidencia de una guía no certifica calculadora. Al finalizar cualquier módulo, presentar siempre recuento de tareas cerradas, checklist del apartado y lista íntegra pendiente A01–A10A; si A10B fue solicitado, reportarlo por separado.

**Datos transversales de carta reutilizables:** A05–A09 documentan exhaustivamente todas las cartas y sus efectos (identidad, CID, zonas, procedimiento versus activación, condiciones, disparador, timing, coste, target, elección, resolución, restricciones, respuesta, once-per-name/turn, cadenas, estado antes/después, recursos, sinergias y evidencia oficial), útiles para guía, análisis físico y eventual calculadora. **Preparar estos datos no significa ejecutar, compilar, sincronizar ni probar la calculadora**: eso queda exclusivamente en A10B. El único paquete estructurado del deck sigue siendo `datos/stationx-deck.json` cuando corresponda; Markdown/HTML son representaciones, imágenes recursos.


## Checklist obligatorio por deck A05 — control de entrega

Para cada `deck_id` y formato, completar y marcar en `CONTROL_DE_TAREAS_A01_A10` del **único** `DECK_*_CONTENIDO_CURADO.md` existente, nunca en informes ni ficheros adicionales:
- [ ] **A05-T1** Todas las cartas con foto/CID y ficha propia; evidencia por ID/fuente: pendiente hasta verificar.
- [ ] **A05-T2** Todos los efectos, incluso continuos y procedimientos, separados; evidencia por ID/fuente: pendiente hasta verificar.
- [ ] **A05-T3** Por efecto: activación, zona, disparador, coste, objetivos, ventana, resolución, HOPT, respuesta y recursos; evidencia por ID/fuente: pendiente hasta verificar.
- [ ] **A05-T4** Función de cada carta en este deck y enlaces A06/A09; evidencia por ID/fuente: pendiente hasta verificar.

Cada `[x]` exige resultado terminado y comprobado. No marcar `COMPLETA` con tarea parcial, omitida o sin evidencia. Si no se puede completar, registrar `[ ] BLOQUEADA` con causa y siguiente acción, sin falsear la conclusión. Cada ejecución y reanálisis devuelve **listado completo A01–A10A de ese deck**, tareas acabadas, pendientes, evidencias y totales; A10B se informa aparte únicamente si se solicitó. Mantener trazabilidad de datos exhaustivos de cada carta para guía, vista visual y posterior análisis físico. Ni A05 ni A07 ejecutan o compilan el motor: **implementación, importación de reglas, pruebas de efectos y calculadora son exclusivamente A10B opcional**.
