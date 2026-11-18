# Apartado 07 — MECÁNICAS Y REGLAS POR FORMATO

Módulo de trabajo independiente del proyecto Station X. Revisión de alcance visual y editorial (2026-11-05).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_07`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

## Instrucción editorial específica

**Contrato de validación A07:** cada `regla_id` se comprueba en contexto de formato, versión, carta, zona, fase y límite aplicable; el módulo auxiliar 11 documenta la cadena específica de una ruta A09 y devuelve su evidencia al mismo ID, sin segundo expediente. Si falta texto oficial o la Skill local exacta, el caso queda PARCIAL/CONDICIONAL con fuente o duda concreta, y las rutas dependientes no pasan a CERTIFICADA. Una comprobación de regla no equivale a simulación física.

**Contrato UI único A06–A10:** A07 no exige una pestaña de reglas. Cada `regla_id` se muestra junto a la **acción o carta concreta** a la que afecta (`Ver por qué se puede hacer`, `Coste y restricciones`, `Qué ocurre en cadena`); el reglamento exhaustivo queda desplegable por contexto. La regla crítica que invalida una jugada se muestra siempre de forma breve **antes de ejecutarla**. No eliminar comprobaciones ni copiar la misma explicación en cinco tarjetas.

Revisar únicamente las mecánicas que la lista usa: Normal, Especial, Sacrificio, Fusión, Sincronía, Xyz, Enlace, Péndulo, Ritual y otras pertinentes. Verificar materiales, niveles, tipos, nombres, zona, cadenas, ventanas, restricciones y uso previo de efectos.

**Rush personalizado:** considerar la Skill en todos los planes, y sus requisitos impresos; no suponer activación una vez por turno/duelo si la adaptación física no la documenta. La Skill no está en mano. No importar automáticamente reglas del TCG a Rush; si el Extra es 0, no inventar Fusiones. Las cuatro Skills Rush históricas se nombran en los archivos de `01_INFORMACION_PARA_IMPORTAR/decks/` correspondientes, pero su texto exacto requiere verificación antes de proponer una jugada.

## Propósito y límites

Explicar **qué puede hacer el jugador con las cartas de esta lista concreta, bajo qué requisitos y restricciones**, como referencia de reglas aplicada al deck; no copiar un reglamento enciclopédico. A05 describe cada carta; A06 explica vínculos; A07 interpreta su legalidad; A08 clasifica posibilidades; A09–A13 desarrollan secuencias y respuestas. Evitar duplicar aquí fichas A05, mapas A06, líneas A09, tableros A10, análisis extensos de cadenas A11, interrupciones A12 o planes A14–A16.

## Información obligatoria por deck

1. **Formato e identidad:** TCG, GOAT o Rush Duel según `deck_id` y versión; indicar reglas pertinentes, sin extrapolar mecánicas de otro formato.
2. **Mecánicas realmente utilizadas:** Invocación Normal, Especial y por Sacrificio; Fusión, Sincronía, Xyz, Enlace, Péndulo, Ritual y otras solo si existen en la lista y el formato las permite. No añadir categorías que el deck no emplea.
3. **Requisitos de invocación:** materiales exactos, nombre escrito, tipos, atributos, niveles, número de piezas, zonas y procedimiento aplicable. Distinguir condición de invocación de efecto activado.
4. **Activación de efectos:** carta y efecto por ID A05, zona, fase/turno, velocidad o ventana cuando corresponda, condición, si inicia cadena cuando el formato la admite y quién puede responder.
5. **Costes y restricciones:** qué debe pagarse al activar, límites por turno/duelo/ejemplar/nombre según texto, restricciones de invocación, usos previos y efectos incompatibles. No tratar costes como efectos ni supuestos como prohibiciones.
6. **Cadenas y resolución:** explicación breve de activación, orden de cadena/resolución y condiciones al resolver, solo donde el formato lo requiera; vincular análisis detallados al A11, sin duplicarlos. En Rush no atribuir automáticamente el sistema de cadenas del TCG.
7. **Zonas y posiciones pertinentes:** campo, Cementerio, destierro, zonas de Extra y Péndulo cuando correspondan, posición de batalla y ubicación/estado de los materiales.
8. **Interacciones reglamentarias particulares:** ejemplos concretos de cartas del inventario que produzcan dudas, con pregunta, decisión, fundamento, límites y estado de verificación; no inventar escenarios como hechos ocurridos.
9. **Extra Deck:** acceso solo a monstruos registrados y sus requisitos; explicar restricciones de zona/procedimiento, sin confundir «potencial» con «invocación comprobada»; Extra=0 confirmado implica `NO_APLICA` justificado.
10. **Skill Rush Duel personalizada:** presentar entidad independiente y no robable, sus requisitos de construcción/activación, coste, efecto, duración y límites impresos; comprobar el texto gráfico o fuente de la adaptación antes de afirmar una jugada. No contar Skill en Main, Extra, mano o materiales.

## Ficha canónica mínima de cada regla aplicada

Registrar en `APARTADO_07` por caso: `regla_id` estable, `deck_id`, formato, versión, categoría/mecánica, IDs de cartas A05 implicadas, zona/posición, situación inicial, requisitos y costes, ventana/fase, restricción, explicación de resolución, conclusión y motivo, evidencia o fuente exacta y estado individual (`[X] CHEQUEADO`, `[~] PARCIAL`, `[ ] PENDIENTE` o `NO_APLICA` justificado). Una misma regla compartida por varias cartas puede referenciarse sin duplicar bloques de texto.

No afirmar que una consulta quedó verificada solo porque conoce la regla general: confrontar nombre/efecto impreso, formato de juego y estado inicial. Si una interacción depende del rival o de una traducción incierta, dejar la conclusión condicional o pendiente. Las cartas de Side no forman parte de la partida hasta una sustitución entre duelos y Reserva es hipótesis de cambios futuros.

## Presentación contextual V58 — «Ver por qué funciona esta acción»

No crear un panel principal de «Mecánicas y reglas». El jugador abre la regla
desde **la carta, motor o paso donde importa**. Los cuatro tipos siguientes
son filtros o categorías técnicas internas de ese mismo detalle contextual,
no pestañas ni destinos de navegación:

1. **Mecánicas del deck:** selector o tarjetas de las mecánicas realmente usadas, con resumen, cartas participantes e imágenes auténticas o `FOTO_PENDIENTE`.
2. **Requisitos y restricciones:** fichas por carta/mecánica con materiales, condiciones, costes, límites de uso y zonas; permitir inspeccionar la carta relacionada.
3. **Activación y resolución:** momento de activación, condiciones, respuesta y resolución; remitir al A11 si existe explicación de cadena detallada.
4. **Casos reglamentarios del deck:** preguntas prácticas con respuesta fundada y estado comprobado; incluir requisitos del Extra y Skill Rush cuando correspondan.

El jugador selecciona una mecánica para ver las cartas de su deck que la emplean y, después, una carta/caso para consultar sus condiciones. Si una ficha está relacionada con una sinergia A06 o combo A09 certificado, enlazarla por ID sin replicar el material ajeno. No generar una pantalla para cada número del prompt; adaptar la presentación a la UI real de Station X.

## Diferencias obligatorias por formato

- **TCG:** aplicar invocaciones, zonas, ventanas y cadenas del formato que correspondan a las cartas; no suponer que el deck utiliza todas las mecánicas disponibles en el TCG.
- **GOAT:** usar el entorno temporal/reglamentario definido para ese deck; no atribuirle Sincronía, Xyz, Enlace u otras mecánicas posteriores. Comprobar terminología y reglas de época antes de publicar conclusiones.
- **Rush Duel:** usar reglas propias de Invocación Normal, Sacrificio, Fusión cuando proceda, estructura de turnos y resolución. No importar sin revisión las cadenas, velocidades y zonas del TCG. Las Skills personalizadas solo se rigen por los requisitos y límites que consten en la adaptación documentada; no asumir frecuencia adicional ni aplicar Skill como carta robada.

## Filtro de publicación y criterio de cierre

A07 es `CONTEXTUAL` conforme al orquestador vigente. Las fichas `[~]`
pueden conservarse como **borrador privado** con advertencia y evidencia
pendiente, pero solo reglas individuales `[X] CHEQUEADO`, ligadas a carta,
paso, formato y versión correctos, pueden publicarse con autorización de
Miguel. No publicar preguntas sin resolver ni reglas inferidas como hechos;
un apartado editorialmente completo no verifica automáticamente cada caso.

Antes de marcar A07 como completo: revisar todas las mecánicas que aparecen en el inventario real (incluidas Skill y Extra cuando corresponda); vincular reglas a IDs de carta, separar costes/condiciones/efectos, comprobar ventanas y materiales, documentar `NO_APLICA` con causa, distinguir casos comprobados de pendientes y dejar referencias a A06/A08–A13 sin duplicaciones.

## Contrato de efectos para el motor local — 18-11-2026

La salida A07 comprende reglas humanas y, cuando exista evidencia suficiente, una representación estructurada. El bloque se integra **en la ficha canónica existente**, no en un archivo nuevo:

```json
{"schema":"station-x-calculator/1","deck_id":0,"format":"tcg_advanced","rules":[]}
```

Este es un **esqueleto ilustrativo**: sustituir el ID por el confirmado. `rules: []` significa cero efectos aportados, nunca un deck terminado. Formatos admitidos: `tcg_advanced`, `goat`, `rush_duel`. No mezclar contratos entre formatos.

Cada objeto de `rules` exige:

- `version: 1`, `id` estable, `deckId` confirmado, `format`, `scope: "single-effect"`, `label` comprensible y `source` con URL oficial de la carta.
- `actor`: selector con `side` (`self`/`opponent`), `zones`, CID exacto, `faceUp` y `notNegated` cuando correspondan. Identificar por CID y ranura nativa; nunca por parecido del nombre.
- `guards`: condiciones completas. `kind: "state"` admite `active`, `phase`, `turn`, `normalAvailable` y una lista `values`; `kind: "count"` exige `selector`, `min` y `max`; `kind: "flag"` exige `flag` y `value` booleano.
- `select`: lista de objetivos/materiales seleccionados antes de resolver, cada uno con `ref` único y `selector`. No seleccionar al resolver un objetivo que el efecto exige declarar al activar.
- `costs` y `resolve`: listas separadas y ordenadas. Un coste ya pagado no se revierte al negar el efecto. Resolver de forma atómica solo los operadores implementados.
- `oncePerTurn` y `activation` booleanos; `tags` de ventana (`addFromDeck`, `summonFromDeck`, `sendFromDeck`, `monsterEffect`) sustentadas por el texto; `assumptions` explícitos.

Operadores actuales: `move` (`ref`, `to`, `position`), `take` (`side`, `cid`, `from` Deck/Extra, `to`, `position`), `payLP` (`amount`), `normal` (`available: false`) y `flag` (`flag`, `value`). Bloqueos disponibles: `specialBlocked`, `noExtra`, `xyzOnly`, `graveyardBlocked`, `effectsNegated`, `noDeckToHand`. Zonas: `hand`, `deck`, `extra`, `graveyard`, `banished`, `field`, `m1`–`m5`, `s1`–`s5`, `emz1`/`emz2` según formato; selectores agrupados `monsters`/`field-all`. Posiciones: `attack`, `defense`, `set`.

**Estos operadores no bastan para todos los efectos.** No representar una Fusión, Sincronía, Skill, coste variable, selección oculta, condición continua, ficha, liberación de zona o cadena compleja como simples movimientos si faltan sus requisitos y resolución. Marcar `OPERADOR_PENDIENTE`, explicar la operación necesaria y pedir su implementación con pruebas. El caso de uso del motor debe rechazar condiciones u operaciones desconocidas, sin ejecutar JavaScript procedente de documentos.

Para cada efecto: caso que resuelve, caso sin requisitos, coste insuficiente, uso repetido, negación, cambio de zona/objetivo y formato incompatible. Comparar zonas, copias, materiales, LP, usos, restricciones y recursos antes/después. Una validación de esquema acredita formato de datos, **no legalidad integral**. El resumen por deck separa efectos documentados, estructurados, implementados y probados.
