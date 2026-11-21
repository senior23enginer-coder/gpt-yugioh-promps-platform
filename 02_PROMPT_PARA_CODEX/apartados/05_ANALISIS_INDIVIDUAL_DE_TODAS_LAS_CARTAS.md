# Apartado 05 — ANÁLISIS INDIVIDUAL DE TODAS LAS CARTAS

## Entrega estandarizada A05 — semántica causal y pruebas lógicas de papel

A05 crea la matriz íntegra de carta/efecto de la que dependerán todos los consumidores. Una carta con tres efectos exige tres fichas semánticas separadas; ninguna regla de la calculadora se crea aquí. Los casos lógicos indican estado de entrada, causa y resultado esperado, incluyendo negaciones y situaciones sin requisito. Mantener denominadores separados: fichas, efectos, casos y ejecutables A10B.

Seguir el contrato transversal del maestro, conservar el mismo `deck_id/card_id/cid/effect_id/route_id` entre etapas y almacenar la evidencia en el deck existente. Toda tarea se cierra sólo con evidencia; al finalizar informar el checklist completo A01–A10A y A10B únicamente si fue solicitado.

### Puerta A05 — inventario de efectos para análisis del estado (20-11-2026)

Para cada carta y cada efecto diferenciado, registrar bajo su identidad existente `card_id` + CID confirmado y fuente: **dónde se activa** (mano/campo/GY/destierro/Extra), condición o procedimiento de Invocación, si inicia cadena, coste, objetivo, ventana/fase, resolución, uso una vez por carta/nombre/turno, estado de la carta después, restricciones y rol real (incluida handtrap/respuesta situacional). Separar el **procedimiento** de Invocación Especial de un monstruo de un supuesto efecto activado de otra carta; por ejemplo, una condición «controlar una carta de nombre X» no se convierte automáticamente en «activar X para revivir».

Anotar por efecto `DOCUMENTADO_CON_FUENTE`, `CASO_LOGICO_VERIFICADO`, `OPERADOR_NO_SOPORTADO` o `IDENTIDAD_PENDIENTE`. Sólo A10B, con pruebas de motor, puede asignar `EJECUTABLE_PROBADO_A10B`. Una ficha con imagen y explicación pero sin operador soportado **no cuenta como efecto calculable**. No generar una Invocación Normal genérica de handtraps como propuesta estratégica: su utilidad se analiza en la ventana y recursos donde actúa, salvo línea concreta respaldada por A08/A09 y reglas ejecutables.

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


## Checklist obligatorio por deck A05 — control de entrega

Para cada `deck_id` y formato, completar y marcar en `CONTROL_DE_TAREAS_A01_A10` del **único** `DECK_*_CONTENIDO_CURADO.md` existente, nunca en informes ni ficheros adicionales:
- [ ] **A05-T1** Fichar 100 % de identidades Main/Extra/Side/Reserva y Skills: CID/slot, foto, fuente y función específica en este deck; evidencia por CID/effect_id/case_id/source o causa exacta del bloqueo.
- [ ] **A05-T2** Inventariar TODOS los efectos por efecto_id estable: activado/disparo/continuo/reemplazo/procedimiento/Skill o NO_EFFECT justificado; evidencia por CID/effect_id/case_id/source o causa exacta del bloqueo.
- [ ] **A05-T3** Registrar por cada efecto actor, zona, condición, ventana, trigger, coste, selección, cadena, resolución, OPT/HOPT, recursos, negaciones y restricciones con fuente; evidencia por CID/effect_id/case_id/source o causa exacta del bloqueo.
- [ ] **A05-T4** Crear matriz inicial de casos de papel por efecto y enlaces a A06/A07/A09; contar identidades y efectos con especificación completa, nunca confundir con ejecutables; evidencia por CID/effect_id/case_id/source o causa exacta del bloqueo.

Cada `[x]` exige resultado terminado y comprobado. No marcar `COMPLETA` con tarea parcial, omitida o sin evidencia. Si no se puede completar, registrar `[ ] BLOQUEADA` con causa y siguiente acción, sin falsear la conclusión. Cada ejecución y reanálisis devuelve **listado completo A01–A10A de ese deck**, tareas acabadas, pendientes, evidencias y totales; A10B se informa aparte únicamente si se solicitó. Mantener trazabilidad de datos exhaustivos de cada carta para guía, vista visual y posterior análisis físico. Ni A05 ni A07 ejecutan o compilan el motor: **implementación, importación de reglas, pruebas de efectos y calculadora son exclusivamente A10B opcional**.
