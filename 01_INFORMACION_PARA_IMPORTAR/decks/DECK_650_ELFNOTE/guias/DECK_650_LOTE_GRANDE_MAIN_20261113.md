# Elfnote 650 — ampliación Main: escenarios individuales y motores

**Ámbito:** 8 casos nuevos del Main + 2 respuestas ya documentadas en `DELTA_ELFNOTE_LOTE_01.json`. La guía no modifica cartas/copias y no sustituye ninguna de las nueve rutas anteriores. Los escenarios se formulan con un estado inicial explícito; ninguno garantiza victoria, apertura universal ni disponibilidad de recursos ocultos. Las fotos originales referidas existen en `imagenes/tcg/`.

## 1. Medius the Pure — puente a Power Patron

- **Caso:** `650:COBERTURA:MAIN:21419` · CID 21419 · 2 copias registradas en Main (verificar de nuevo el inventario nativo al importar).
- **Propósito:** acceder a Power Patron sin suponer que ya estaba en la mano.
- **Estado de entrada:** Medius en mano; Invocación Normal disponible; un Elfnote Power Patron (CID 22119) en Deck; campo propio vacío.
- **Paso 1.** Invoca Normalmente Medius en zona principal libre (mano → campo). Consume la Normal.
- **Paso 2.** Activa su efecto desencadenado por la Invocación (CL1); elige añadir Power Patron del Deck a la mano. No se requiere su Invocación en este paso.
- **Paso 3.** Si resuelve, Medius permanece en campo y Power Patron pasa a mano. **No afirmar que se puede Invocar Normalmente Power Patron:** la Normal ya se gastó. Su acceso al campo necesita otro mecanismo acreditado.
- **Rama separada, continuación:** si Medius está en GY y hay un monstruo en mano o boca arriba en campo que pueda devolverse al Deck, activa su efecto: devuelve ese monstruo y luego Invoca Medius desde GY; queda marcado para desterrarse al salir del campo. La devolución es parte del efecto, no una carta que se descarte como coste; si no puede devolver, no se acredita la Invocación.
- **Interrupción:** si Ash Blossom niega el efecto de incorporación desde el Deck, Medius queda en campo pero Power Patron no se añade. No inventar otra Normal ni un buscador adicional.
- **Campo final mínimo:** Medius boca arriba; Power Patron en mano solo si búsqueda resolvió. La ruta termina ahí.
- **Fuente:** https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21419&ope=2&request_locale=en
- **Estado:** escenario documental respaldado; pendiente replay y validación de la transición en editor/calculador.

## 2. Fydraulis Harmonia — respuesta a un monstruo rival

- **Caso:** `650:COBERTURA:MAIN:22533` · CID 22533.
- **Propósito:** convertir una activación de monstruo rival en presencia de un Cantante; opcionalmente enviar un Sincro del Extra al GY y destruir un monstruo según el número mostrado.
- **Entrada:** Harmonia en mano; rival controla un monstruo que activa efecto; Extra propio contiene cinco monstruos Sincro distintos elegibles para revelar. **No se necesita controlar Elfnote**, pero sí tener realmente las cartas reveladas disponibles.
- **Paso 1.** Rival activa efecto de un monstruo que controla (CL1). No sirve una Mágica/Trampa ni un monstruo del Cementerio que el rival ya no controla.
- **Paso 2.** Encadena Harmonia (CL2), revela Harmonia en mano y hasta cinco Sincros del Extra. Con cinco Sincros más Harmonia se muestran seis cartas; no se retiran del Extra simplemente por revelarse.
- **Paso 3.** Al resolver, aplica en orden las acciones correspondientes a 2+, 4+ y 6 cartas mostradas: Invoca Harmonia de mano; envía al GY uno de los Sincros revelados; destruye un monstruo que controle el rival. **No niega automáticamente CL1.**
- **Restricción:** los efectos de monstruos Invocados del Extra que no sean Sincro quedan restringidos hasta el final del siguiente turno propio, según la carta. No prometer activación de una Link/Fusión posterior.
- **Ramas:** si solo se muestran 2 o 3, no se envía Sincro ni se destruye; con 4 o 5 se envía uno pero no se destruye. Si CL2 es negado, no se presuponen sus acciones y el coste de revelar no inventa una carta enviada al GY.
- **Campo final con seis mostradas y resolución completa:** Harmonia Invocada, un Sincro revelado en GY, un monstruo rival destruido, sin afirmación de que el efecto rival haya sido negado.
- **Fuente:** https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22533&ope=2&request_locale=en
- **Estado:** respuesta condicional; la selección de Sincros concretos y el uso posterior del Sincro enviado exigen cotejo del estado actual del Extra.

## 3. Vidolium — uso Péndulo demostrado, no Invocación ficticia del monstruo

- **Caso:** `650:COBERTURA:MAIN:22519` · CID 22519.
- **Propósito:** recuperar un Power Patron desde mano/GY mediante el efecto de la Zona Péndulo.
- **Entrada:** Vidolium en mano; Zona Péndulo libre; Power Patron elegible en mano o GY; sin efecto de Vidolium usado este turno.
- **Paso 1.** Activa Vidolium como Mágica Péndulo de mano a Zona Péndulo.
- **Paso 2.** Activa su efecto Péndulo de destruirse para Invocar un monstruo Power Patron desde mano o GY; Vidolium se destruye y va al Extra boca arriba si corresponde a su condición de carta Péndulo en campo.
- **Paso 3.** Se Invoca el Power Patron elegido. **Rama desencadenada independiente:** si Vidolium quedó boca arriba en Extra, podrá activar su búsqueda de una carta Power Patron del Deck, respetando ventanas, cadenas y uso por turno.
- **Límite decisivo:** Vidolium como monstruo no se Invoca Normalmente. Su Invocación Especial exige devolver al Extra exactamente un monstruo Fusión, uno Sincro y uno Xyz de campo boca arriba y/o GY; este escenario no acredita disponer de los tres. No transformarlo en un combo de Nivel 12.
- **Interrupción:** negar la Invocación o la búsqueda posterior no restituye automáticamente Vidolium a la Zona Péndulo.
- **Resultado:** un Power Patron recuperado si se resolvió la primera opción; Vidolium en Extra boca arriba según estado; posible búsqueda separada.
- **Fuente:** https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22519&ope=2&request_locale=en
- **Estado:** acceso Péndulo documentado; acceso como monstruo no demostrado con esta apertura.

## 4. Bystial Magnamhut — presión sobre Cementerio LUZ/OSCURIDAD

- **Caso:** `650:COBERTURA:MAIN:17762` · CID 17762.
- **Propósito:** retirar un monstruo LUZ/OSCURIDAD del GY rival o propio y establecer un cuerpo Dragón, sin confundirlo con una negación.
- **Entrada:** Magnamhut en mano; existe un monstruo LUZ u OSCURIDAD en un Cementerio; zona propia libre. Para usarlo en turno rival, rival debe controlar un monstruo.
- **Paso 1.** Activa el Efecto Rápido de Magnamhut, seleccionando un monstruo LUZ/OSCURIDAD en alguno de los GY como objetivo.
- **Paso 2.** Si el objetivo sigue siendo válido, destiérralo e Invoca Magnamhut desde mano. Es retiro del Cementerio, **no** negación del efecto de ese objetivo.
- **Paso 3.** Si Magnamhut fue Invocado Especialmente, activa su búsqueda diferida; en End Phase añade del Deck/GY un Dragón legal (no Magnamhut). Si no hay destino elegible, no afirmar ventaja garantizada.
- **Interrupción:** si retiran el objetivo antes de la resolución, no presumir la Invocación; si niegan Magnamhut, tampoco inventar la búsqueda.
- **Resultado:** Magnamhut en campo y el objetivo desterrado si el efecto resuelve; búsqueda condicional en End Phase.
- **Fuente:** https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17762&ope=2&request_locale=en
- **Estado:** respuesta genérica contra GY, no motor Elfnote.

## 5. Nervedo — una ruta de Fusión condicionada por el Extra real

- **Caso:** `650:COBERTURA:MAIN:22520` · CID 22520.
- **Propósito:** utilizar su efecto propio para llevar a Nerva al campo como Fusión, si Nerva existe en el Extra del deck.
- **Entrada:** Nervedo como monstruo boca arriba bajo control propio; al menos tres cartas en Deck susceptibles de desterrarse boca abajo; Nerva the Power Patron of Creation en el Extra y procedimiento habilitado.
- **Paso 1.** Activa efecto de Nervedo. Destierra boca abajo las tres cartas superiores del Deck como coste.
- **Paso 2.** Al resolver, destruye Nervedo; si se destruye según el efecto, Invoca Nerva desde Extra tratándolo como Invocación por Fusión.
- **Paso 3.** Si Nervedo termina boca arriba en el Extra y su efecto correspondiente puede activarse, evalúa Invocar desde Deck o Extra boca arriba un Power Patron/Artmage elegible. **No usar una carta que no esté en el inventario.**
- **Interrupción:** una negación después del coste no devuelve las tres cartas desterradas. Si Nerva no está en Extra, detener el caso como bloqueo de materiales/destino, no dibujar una Fusión inexistente.
- **Resultado:** condicional a la presencia de Nerva y a la resolución; esta guía no certifica una apertura desde mano.
- **Fuente:** https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22520&ope=2&request_locale=en
- **Estado:** procedimiento documentado, **bloqueado como ruta ejecutable de Nerva en este inventario**: no aparece una identidad de Nerva en el Extra de Elfnote entregado. No insertar Nerva ni sustituirla sin autorización. Su uso como Péndulo y posibles interacciones Artmage requieren un escenario distinto.

## 6. Mulcharmy Fuwalos — cobertura de Invocaciones desde Deck/Extra

- **Caso:** `650:COBERTURA:MAIN:20500` · CID 20500.
- **Propósito:** obtener recursos cuando el rival insiste en Invocar Especialmente desde Deck o Extra.
- **Entrada:** Fuwalos en mano; no controlas cartas; efecto disponible en este turno. Es una interacción de turno de rival habitual, pero su texto no exige que sea turno rival.
- **Paso 1.** Descarta Fuwalos de mano al GY como coste y aplica su efecto durante el turno.
- **Paso 2.** Por cada evento de Invocación Especial del rival desde Deck y/o Extra, roba exactamente una carta; no una por cada monstruo del mismo evento.
- **Paso 3.** En End Phase comprueba el límite «cartas en mano = cartas que controla rival +6». Si se supera, devuelve al Deck al azar la diferencia, una sola vez según el efecto.
- **Interrupción / límite:** si el rival solo Invoca desde Cementerio o mano, no robas por esos eventos. Una activación negada no garantiza futuras cartas robadas. Respetar el límite de otros efectos Mulcharmy durante el turno.
- **Resultado:** Fuwalos en GY y robo variable según eventos reales, sin inventar cantidad fija ni win rate.
- **Fuente:** https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=20500&ope=2&request_locale=en
- **Estado:** respuesta documental situacional.

## 7. Mulcharmy Purulia — cobertura de Invocaciones desde mano

- **Caso:** `650:COBERTURA:MAIN:20206` · CID 20206.
- **Propósito:** penalizar al rival que Invoca Normal o Especialmente desde su mano.
- **Entrada:** Purulia en mano; no controlas cartas; efecto no usado.
- **Paso 1.** Descarta Purulia de mano para activar su Efecto Rápido.
- **Paso 2.** Cada vez que el rival realiza una Invocación Normal o Especial desde la mano, roba una carta por evento, no por monstruo. Las Invocaciones desde Extra o Cementerio no generan robo por esta carta.
- **Paso 3.** En End Phase aplica la comprobación y devolución aleatoria al Deck si tu mano supera las cartas que controla el rival +6.
- **Interrupción:** si el rival pasa sin Invocar desde mano, no hay robo. No combinar libremente varios Mulcharmy sin respetar sus límites de activación.
- **Resultado:** Purulia en GY; número de robos condicionado a eventos reales.
- **Fuente:** https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=20206&ope=2&request_locale=en
- **Estado:** respuesta documental situacional.

## 8. Prohibited Power Patron Portal - Terminus — enviar y buscar

- **Caso:** `650:COBERTURA:MAIN:22565` · CID 22565.
- **Propósito:** enviar un Power Patron del Deck/Extra al GY y opcionalmente obtener un Hada OSCURIDAD; ruta de recursos, no una Invocación del Extra.
- **Entrada:** Terminus en mano, un Power Patron real en Deck o Extra que pueda ser enviado al GY, zona Mágica/Trampa libre. Para búsqueda opcional, un Hada OSCURIDAD disponible en Deck (por ejemplo Medius si permanece allí).
- **Paso 1.** Activa Terminus (Mágica Normal) en la Main Phase propia.
- **Paso 2.** Envía un Power Patron del Deck/Extra al GY como parte de la resolución. Si es del Extra, **no** ha sido Invocado ni enviado como material.
- **Paso 3.** Puedes añadir un Hada OSCURIDAD del Deck a mano. Desde ese momento no puedes declarar ataques con monstruos que no sean Power Patron durante el resto del turno.
- **Rama posterior de batalla:** si Terminus está en GY al inicio del Damage Step y un Power Patron propio combate un monstruo rival, destierra Terminus del GY para desterrar boca abajo al monstruo rival. No equivale a negar efectos.
- **Interrupción:** si la activación de la Mágica es negada, no hay envío ni búsqueda acreditados; si el envío no es posible, no continuar a la búsqueda por suposición.
- **Resultado:** Power Patron seleccionado en GY, posible Medius en mano, Terminus en GY una vez resuelta; ataque restringido.
- **Fuente:** https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22565&ope=2&request_locale=en
- **Estado:** escenario documental; elegir envío concreto exige comprobar copias, efecto al llegar a GY y acceso posterior.

## Notas de integración para Codex

- Cada caso debe convertirse a nodos nativos de mano/estado inicial, acciones numeradas, decisiones de interrupción y resultado. Los nombres CID son referencias internas; mostrar nombres humanos en UI.
- Las fotos de esta ampliación son los archivos originales `imagenes/tcg/{cid}.jpg` para las cartas ejecutoras. No reutilizar una foto como prueba de una acción que no hizo esa carta.
- Estos ocho escenarios **no** son ocho combos completos de motor ni prueban los accesos del Extra. Priorizar la ampliación de Medius, Nervedo y Vidolium una vez contrastado el inventario en tiempo de integración.
- Mantener separados los estados: fuente consultada, escenario redactado, legalidad revisada, editor importado, replay probado, publicado. Aquí solo se ha completado investigación documental de los efectos descritos.
