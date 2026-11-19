# Apartado 05 — ANÁLISIS INDIVIDUAL DE TODAS LAS CARTAS

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_05`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

## Instrucción editorial específica

### Entregable A05 — fichas con fotografía, efecto y propósito que alimenten la guía

Para **todas las identidades**, añadir al \`record.cards\` (cuando el paquete estructurado esté disponible) una fotografía A04, nombre, ID/CID, \`slots\`, **qué hace**, coste y condición de activación, resolución, \`once per turn\` cuando esté acreditado, función concreta de esa carta **en esta lista**, qué buscar/invocar/enviar/equipar, qué recurso obtiene o gasta, qué impide su uso y a qué motor A06 o paso A09 contribuye. La carta que no tiene ruta debe explicar su papel autónomo, nunca recibir un combo inventado.

Proporcionar dos niveles simultáneos: **tarjeta del jugador** (foto, zona/copias, acción real y utilidad en menos de un minuto) y **detalle desplegable** (texto de efecto, fuente, limitaciones, ambigüedades y estado). No usar un dictamen editorial extenso como primera frase ni reutilizar el mismo texto en 39 cartas. Conservar \`source_aliases\` únicamente como nombres verdaderamente equivalentes y no como coincidencias vagas que vinculen fotos incorrectas.

**Prueba de aceptación A05:** \`identidades con ficha + foto correcta / identidades totales\` y trazabilidad completa \`card_id→CID→imagen→efecto→motor\`; comprobar al menos un ejemplo que se vea en pantalla y otro que permanezca explícitamente pendiente.

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
