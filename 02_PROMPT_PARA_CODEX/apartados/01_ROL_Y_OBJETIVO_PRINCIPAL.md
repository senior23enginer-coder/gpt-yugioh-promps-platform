# Apartado 01 — ROL Y OBJETIVO PRINCIPAL

### Precondición A01 — selección expresa y deck realmente cargado

**NO ejecutar este apartado sin asignación expresa del usuario de un `deck_id` concreto.** Antes de realizar cualquier tarea, comprobar mediante el gate `scripts/analysis-eligibility.cjs` que el deck seleccionado coincide con el registro real y tiene **Main, Extra y Side físicamente cargados con cantidades positivas**. **Reserva es opcional** y jamás debe completarse por suposición. En ausencia de selección o cualquiera de esas tres zonas, registrar `BLOQUEADO_POR_INVENTARIO_O_AUTORIZACION`, indicar exactamente qué falta y **no analizar parcialmente, ni continuar con otros decks**. Verificar formatos/IDs/slots y no aceptar listas de otro deck. Las comprobaciones de infraestructura/CI no representan una asignación del usuario ni autorizan reejecutar A01–A10A en mazos existentes.


## Entrega estandarizada A01 — semántica compartida y criterios de aceptación

Produce perfil utilizable tanto en ficha como en guía y analizador: entradas = inventario real y fuentes; salidas = perfil, condiciones de victoria, restricciones, roles por CID y enlaces estables. No confundir deseo estratégico con acción legal.

Se usa la única especificación causal del prompt maestro: IDs estables, fuentes verificables y ausencia de supuestos ocultos. Al cerrar este apartado se actualiza el checklist real del deck y se devuelve el estado completo A01–A10A, más A10B solo si se solicitó; `[x]` no admite parciales.

**Contrato de presentación Station X — prevención de entregas incompletas (19-11-2026)**: redactar por separado (1) **Estilo breve**: una frase de máximo 190 caracteres que diga motor, plan y forma de victoria sin promesas no verificadas; (2) **Resumen para ficha**: máximo 250 caracteres con starter, extensión, recurso y principal condición; (3) **Tipo de estrategia** concreto, por ejemplo «Combo de Cementerio y Fusión». Conservar el análisis completo bajo `Cómo se juega`, incluso si tiene dictamen editorial, pero **no duplicarlo** como etiqueta de estilo. Prohibido rellenar con «Consultar el plan de juego» u otras frases de relleno. No copiar mensajes globales como «Catálogo completo» ni detalles de clasificación al deck.

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_01`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

## Instrucción editorial específica

### Método obligatorio de diagnóstico estratégico A01 (sin ejecutar A05–A09)

1. **Fuente y formato primero.** Comprobar la identidad asignada y el inventario real de Main, Extra y Side; mantener Reserva opcional y Skill Rush como entidad separada y no robable. Usar los CIDs, cantidades y cartas realmente disponibles, más fuentes oficiales de identidad/efectos y reglas pertinentes del formato `tcg_advanced`, `goat` o `rush_duel`. No importar mecánicas de otro formato ni utilizar listas de prohibidas/limitadas para decidir el análisis. La documentación de un deck distinto —incluido Kashtira— solo sirve como ejemplo de presentación, jamás como fuente de jugadas.
2. **Reconocer los motores sin presuponerlos por el nombre.** Identificar el plan principal y los secundarios o autónomos, con sus cartas por CID, entrada viable, recursos utilizados (mano, Campo, Cementerio, destierro, Extra o Skill válida), resultado estratégico pretendido y puntos de dependencia. Diferenciar motor, soporte genérico, carta situacional y alternativa hipotética de Reserva. El arquetipo de una carta no prueba que forme parte del motor de esta lista.
3. **Clasificar por comportamiento observable.** Justificar la categoría `Combo`, `Control`, `Midrange`, `Stun`, `Aggro`, `OTK` o `Híbrido` cuando proceda: Combo = encadenamiento de recursos para desarrollar un resultado; Control = intercambio/negación y ventaja prolongada; Midrange = presión y recursos sostenibles; Stun = restricciones al desarrollo; Aggro = presión de batalla temprana; OTK = línea de daño letal **condicionada y demostrada**, nunca garantizada por la etiqueta. Si coexisten planes, elegir uno predominante, describir qué activa el secundario y qué conflictos o bloqueos existen. No asignar categorías solo porque una carta o el nombre del deck sugiera el estilo.
4. **Explicar la decisión del jugador.** Diferenciar de forma breve el plan al jugar primero, segundo y en juego medio/tardío, su forma de obtener ventaja o cerrar partida y los riesgos que realmente pueden cambiar la decisión. Las condiciones de victoria son **objetivos posibles**; no afirmar victoria, OTK, tablero final, combo de una carta o resistencia a interrupciones sin secuencia y estado acreditados en A07/A09.
5. **Evidencia y grado de certeza.** Para cada afirmación decisiva aportar CID existente, zona/cantidad relevante, fuente identificable, condición o restricción y grado de evidencia `DOCUMENTADO_CON_FUENTE`, `CONDICIONAL` o `SIN_EVIDENCIA`. Si falta texto, copia, efecto o regla esencial para definir el plan, dejar la afirmación y la tarea implicada `PARCIAL` con causa exacta, sin rellenar con lenguaje persuasivo.

**Frontera entre apartados:** A01 define **qué es este deck, qué recursos pretende transformar, cómo decide el jugador y qué busca conseguir**. A05 analiza individualmente efectos y cartas; A06 acredita relaciones de motores y Extra; A07 verifica legalidad; A08 explora candidatos; A09 documenta secuencias y estados; A10A presenta guías y campos finales; A10B es opcional para motor/calculadora. A01 puede referir evidencia de esos apartados si ya existe, pero **no los ejecuta por adelantado ni duplica fichas, cadenas, pruebas o combos**.

### Trazabilidad progresiva A01-T3 sin IDs ficticios

En `APARTADO_01` del único `DECK_*_CONTENIDO_CURADO.md`, registrar para cada propósito/condición de victoria una fila con: `proposito_id` estable dentro de A01, función y prioridad del objetivo, `deck_id`/formato, CIDs de cartas realmente cargadas y su zona, fuente, condición decisiva, riesgo, estado de evidencia y vínculos **existentes** a `effect_id` A05/A07, `motor_id` A06 o `route_id` A08/A09 cuando se hayan documentado. La fila se crea para enseñar el propósito, **no constituye un nuevo combo** ni exige añadir campos al JSON de Station X.

Cuando la investigación posterior aún no exista, escribir `PENDIENTE_DE_ENLACE_A05_A09` con la etapa responsable y siguiente verificación, **sin inventar `effect_id`, `route_id` ni una secuencia**. A01-T3 puede cerrarse si los propósitos, identidades físicas, fuentes y limitaciones **que fundamentan el perfil actual** están acreditados y se deja explícita la ausencia de enlaces futuros; no puede cerrarse si una afirmación central depende de un efecto o recurso sin evidencia. Cuando A05–A09 aporten o invaliden hallazgos, reconciliar solo la fila y el campo de perfil afectados, conservando IDs estables y sin volver a ejecutar globalmente otros decks.

### Puerta de aceptación A01 — contenido, consistencia y portabilidad

- **Seis campos obligatorios:** `Arquetipo`, `Tipo de estrategia`, `Estilo breve`, `Resumen para ficha`, `Cómo se juega` y `Qué vigilar`, todos en español, no vacíos y específicos del inventario/estrategia. `Estilo breve` tiene máximo **190 caracteres** y `Resumen para ficha` máximo **250 caracteres**; contar caracteres del valor final, no de su título. El arquetipo no incluye versión, fecha ni dictamen editorial. `Tipo de estrategia` se justifica por motor, no por coincidencia de nombres.
- **Sin contenido de relleno o resultado ficticio:** rechazar «Catálogo completo», «Consultar el plan», estadísticas, notas de auditoría y términos genéricos en la presentación principal; distinguir intención estratégica de legalidad demostrada. `Cómo se juega` conserva explicaciones completas, alternativas, recursos, fase/turno, recuperación y límites. `Qué vigilar` nombra restricciones reales y sus CIDs o referencias cuando proceda.
- **Paridad de fuente:** contrastar campo por campo los seis valores de `APARTADO_01` con `record.profile` en `datos/stationx-deck.json` **cuando exista el paquete estructurado base**; no publicar un texto correcto solo en Markdown mientras el JSON conserva placeholders. Si hay archivo editorial exportado de Station X, comparar también su perfil **sin sobrescribir las ediciones nativas**; una versión pública antigua se informa como `PENDIENTE_DE_SINCRONIZACION_O_IMPORTACION`, no se declara actualizada por un commit. La ausencia del paquete base se reporta como `NO_IMPORTABLE_TODAVIA`.
- **Puerta de cierre por tarea:** A01-T1 exige diagnóstico con fuentes y CIDs; A01-T2 exige los seis campos validados, longitudes, claridad y coherencia; A01-T3 exige la matriz de propósitos, fuentes, condicionantes y vínculos progresivos sin inventos. Ningún `[x]` se deduce solo del encabezado o de una fotografía. Si falla un control, registrar `[ ] BLOQUEADA` con causa y siguiente acción en `CONTROL_DE_TAREAS_A01_A10`; A01 no puede declararse `COMPLETA` con alguna de sus tres tareas abierta.
- **Regresión documental sin análisis masivo:** probar las reglas del contrato sobre datos sintéticos o, cuando el usuario asigne un deck, exclusivamente ese deck. Una revisión del prompt o de su validador no autoriza ejecutar A01 ni reabrir A01–A10A sobre Memento, Crystron u otros decks.

### Entregable A01 — identidad jugable que el jugador verá en Station X

El punto de referencia es **la calidad de lectura de Kashtira Pure**, no sus cartas, combos o metajuego. Al finalizar A01 deben existir simultáneamente los siguientes valores en el documento del deck **y en el `record.profile` de `datos/stationx-deck.json`** (si se dispone del paquete base):
- `Arquetipo`: nombre limpio, sin fecha, «estudio individual», versión ni dictamen.
- `Tipo de estrategia`: clasificación **específica** que explica cómo juega esta lista.
- `Estilo breve`: una oración de hasta 190 caracteres, sin rótulos de auditoría ni frases como «Consultar el plan».
- `Resumen para ficha`: hasta 250 caracteres que expliquen acceso inicial, motor, recurso y resultado/condición.
- `Cómo se juega`: descripción pedagógica completa, con plan primero/segundo, medio/tardío, ganancia de recursos y límites; en sección expandible, no como resumen de portada.
- `Qué vigilar`: uno o más riesgos propios de la lista. Vincular con las unidades A06/A07 que se desarrollarán.

**Prueba de aceptación A01:** al leer solo Arquetipo, Estilo y Resumen, una persona distingue este deck de otro. No insertar estadísticas globales, «Catálogo completo», rankings o supuestos de victoria en esos campos. Si falta una evidencia, usar estado PARCIAL y registrar la fuente necesaria; no rellenar con texto genérico.

Actúa en A01 como **analista estratégico de Yu-Gi-Oh! y entrenador de decisiones**: explica la identidad competitiva de una lista concreta con lenguaje claro, fuentes y límites. Entrega al resto de prompts el marco de juego y sus objetivos, sin afirmar aquí análisis exhaustivos de cartas, secuencias de combos, campos finales o pruebas de calculadora que corresponden a A05–A10B. Evitar relleno, generalidades, duplicaciones, afirmaciones sin evidencia y cualquier trabajo no solicitado.


## Checklist obligatorio por deck A01 — control de entrega

Para cada `deck_id` y formato, ejecutar y marcar en la sección `CONTROL_DE_TAREAS_A01_A10` del **único** `DECK_*_CONTENIDO_CURADO.md` existente. No generar archivos de seguimiento separados. El siguiente es un **modelo de tareas** (no declara ya terminados los decks existentes):
- [ ] **A01-T1** Diagnosticar por inventario y formato el arquetipo, motor principal/secundarios, clasificación estratégica justificada (Combo/Control/Midrange/Stun/Aggro/OTK/Híbrido), recursos, condiciones de victoria condicionales y riesgos, con CID, fuente y evidencia; si falta un requisito central, bloqueo con causa y siguiente acción.
- [ ] **A01-T2** Redactar y validar los seis campos de `record.profile` y su equivalente documental: arquetipo limpio, tipo específico, Estilo breve ≤190, Resumen para ficha ≤250, Cómo se juega y Qué vigilar; sin relleno, con condiciones reales, y paridad con el paquete estructurado disponible o bloqueo documentado.
- [ ] **A01-T3** Registrar por propósito evidencia CID/zona/fuente/condición/riesgo y vínculos a `effect_id`/`motor_id`/`route_id` solo si existen; usar `PENDIENTE_DE_ENLACE_A05_A09` para enlaces futuros sin fabricar IDs, registrar siguiente verificación y reabrir solo la afirmación afectada cuando cambie su evidencia.

Una tarea sólo se marca `[x]` si se ha completado y verificado íntegramente. No se permite `COMPLETA` con obligaciones parciales, faltantes o sin evidencia. Un impedimento se registra `[ ] BLOQUEADA` con motivo y siguiente acción; nunca se rellena una casilla sin pruebas. Tras ejecutar este prompt, devolver siempre **todas las tareas A01–A10A del deck**, con identificadores, estado, evidencia, recuento de terminadas y pendientes; A10B se informa por separado y sólo si fue solicitado. Las revisiones reabren exclusivamente tareas cuya evidencia haya cambiado.

La documentación causal completa de cada carta debe servir al visor, a las guías y al futuro motor: CID, texto, zonas, ventanas, condiciones, costes, objetivos, cadenas, resolución, restricciones y usos por nombre/turno. Prepararla **no activa** ejecución, compilación ni pruebas de calculadora; todo eso pertenece sólo a **A10B opcional**. A01–A10A son obligatorios, incluida la guía visual.
