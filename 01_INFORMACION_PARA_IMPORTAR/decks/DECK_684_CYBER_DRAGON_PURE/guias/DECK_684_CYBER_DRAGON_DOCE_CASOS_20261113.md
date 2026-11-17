# Cyber Dragon Pure 684 — doce casos del Main (análisis incremental)

**Inventario:** 42 Main / 15 Extra / Side 0 / Reserva 24. **Biblioteca previa:** 16 rutas. No cambiar lista ni convertir Reserva en Side. Se documenta el uso individual de cada CID; una función independiente no se cuenta como combo adicional.

| CID | Carta | Uso específico y escenario | Coste/ventana, bloqueo o resultado |
|---:|---|---|---|
| 21164 | Cyberdark Wurm | Tienes otro Máquina “Cyber” en campo/GY; Wurm en mano/GY → envía un “Cyber Dragon” desde mano o Deck al GY → Invoca Wurm Especial → opcionalmente recupera Mágica/Trampa “Cyber” de GY | **Una vez por Duelo**. En campo/GY su nombre pasa a Cyber Dragon; no inventar una segunda utilización ni otra carta distinta |
| 6663 | Cyber Phoenix | Invocar Normalmente o mantenerlo boca arriba en ATK para proteger determinadas Máquinas propias de efectos que seleccionan como objetivo; al destruirse por batalla, robo según condición | No es negación universal de Monstruos/Trampas. Verificar posición y objetivos elegibles antes de dibujar protección |
| 17119 | Therion “King” Regulus | Con Máquina elegible en GY, seleccionarla para Especial desde mano y equiparla; su efecto puede negar una activación enviando Therion elegible de mano/campo al GY | Sin Máquina en GY la apertura no existe; cuerpo equipado no implica que se Invocó la Máquina equipada |
| 12950 | Ash Blossom | Rival activa un efecto que incluye buscar/Invocar/enviar desde Deck; descarta Ash y niega **el efecto** si resuelve | No recupera el descarte ni destruye siempre carta rival |
| 13587 | Ghost Belle | Rival activa efecto que incluye regresar cartas desde GY, Invocar desde GY o desterrar cartas del GY; descarta Belle para negar **la activación** | No niega cualquier efecto activado en Cementerio |
| 20205 | Disablaster the Negation Fortress | Monstruo Máquina Péndulo con efectos propios; estudiar su presencia/condiciones como carta de respuesta sin tratarlo como máquina genérica | Requiere estado preciso de sus Zonas y activaciones; no atribuir negación universal sin condiciones |
| 16301 | Cybernetic Horizon | Enviar dos monstruos Dragon/Máquina “Cyber” de **Atributos distintos**, uno de mano y otro de Deck, al GY; buscar otro Cyber de Deck; después enviar Fusión Máquina Cyber del Extra al GY | No es descarte; bloquea Invocaciones Especiales desde Extra que no sean Máquina durante el turno. Enviar Fusión del Extra no la Invoca |
| 5129 | Limiter Removal | Durante turno elegible, duplicar ATK actual de Máquinas propias boca arriba | Al final del turno destruye monstruos a los que se aplicó; no elimina automáticamente el coste de otras cartas ni se conserva indefinidamente |
| 16297 | Cyber Eternal | Seleccionar una Fusión Máquina Cyber en GY; devolverla al Extra o Invocarla Especialmente según efecto, ignorando condiciones escritas | La regla general de Invocación correcta previa sigue importando para revivir monstruos del Extra; su efecto de GY puede sustituir destrucción de Fusión Máquina Cyber propia |
| 4909 | Mystical Space Typhoon | Mágica Rápida: seleccionar una Mágica/Trampa en campo y destruirla al resolver | **Destruye, no niega** automáticamente el efecto ya activado; considerar cadenas y permanentes que necesitan estar boca arriba |
| 13631 | Infinite Impermanence | Negar efectos de monstruo boca arriba rival hasta fin de turno; desde mano únicamente sin cartas propias controladas | Si se activó Colocada, también afecta efectos de Magias/Trampas en la columna de esa carta durante el turno |
| 13787 | Cybernetic Overflow | Con Ciber Dragones en mano/campo/GY de Niveles distintos, desterrarlos para destruir cartas del rival hasta cantidad elegible | No usar dos del mismo Nivel para dos destrucciones; cuenta monstruos «Cyber Dragon» y sus niveles según condición real |

## Ejemplo desarrollado A: Cyberdark Wurm como extensor

**Mano:** Cyberdark Wurm. **GY propio:** otro monstruo Máquina “Cyber” comprobado, por ejemplo Cyber Dragon original. **Deck:** un “Cyber Dragon” elegible que pueda enviarse. **Campo:** zona libre. **Turno:** Main Phase propia; efecto Wurm no utilizado en el Duelo.

1. Activar Wurm desde mano, acreditando otra Máquina “Cyber” en campo/GY.
2. Enviar del Deck un monstruo “Cyber Dragon” al GY como pide Wurm. No es Invocación ni descarte.
3. Si resuelve, Invocar Wurm de mano a campo.
4. Solo si hay una Mágica/Trampa “Cyber” en GY elegible, elegir añadirla a la mano; de lo contrario la recuperación opcional no ocurre.

**Campo final:** Wurm en campo (su nombre es Cyber Dragon allí), dos recursos GY identificados según el estado y recuperación opcional. **Bloqueo:** si no hay Máquina Cyber previa en GY/campo, no presentar esta ruta como apertura de Wurm solo. **Interrupción:** si el efecto se niega, no presuponer su Invocación ni recuperar otra Mágica; respetar **una vez por Duelo**.

## Ejemplo desarrollado B: Cybernetic Horizon + Cyber Eternal no es Invocación automática

**Inicio:** Horizon en mano; un monstruo Dragon/Máquina Cyber en mano y otro en Deck con Atributos diferentes; Fusion Máquina Cyber en Extra; objetivo Cyber buscable en Deck. No existe bloqueo ajeno.

1. Activar Horizon, enviar las dos cartas de Atributos distintos desde las zonas especificadas al GY.
2. Si resuelve, buscar Cyber elegible y después enviar Fusión Máquina Cyber del Extra al GY. El destino del Extra **no fue Invocado Correctamente** solo por ese envío.
3. Cyber Eternal desde mano puede tener como objetivo una Fusión Máquina Cyber en GY, pero **no afirmar que la puede revivir si nunca fue Invocada correctamente**. Si el estado solo permite devolverla al Extra, usar ese modo legal; si no hay modo válido, detenerse.

**Riesgo:** la restricción Extra solo Máquina de Horizon afecta el resto del turno; no ramificar hacia un Link no Máquina. La secuencia no deja un monstruo Fusion automáticamente en campo.

## Ejemplo desarrollado C: Overflow en turno rival

**Estado:** Cybernetic Overflow Colocada desde el turno anterior; tres monstruos «Cyber Dragon» elegibles con **niveles distintos** en mano/campo/GY; adversario controla al menos una carta destruible.

1. En ventana legal activar Overflow y seleccionar cartas rivales según el número de niveles distintos que puedas aportar.
2. Desterrar las cartas Cyber Dragon necesarias desde las zonas permitidas; no enviar al GY ni desacoplar materiales Xyz por error.
3. Resolver destrucción de las cartas rivales. Si la Trampa activada es negada, no afirmar destrucción garantizada; verificar el momento del destierro según su texto.

**Resultado:** retirada de cartas si resuelve, con recursos Cyber consumidos. **No** inferir que la carta niega todos los efectos de las cartas destruidas.

## Fuentes y estado

Fichas oficiales principales: https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21164&ope=2 ; https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=16301&ope=2 ; https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=16297&ope=2 ; https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13787&ope=2 ; para los demás CIDs, mismo patrón `card_search.action?cid=<CID>&ope=2` en Neuron/TCG.

**Doce casos investigados documentalmente; no doce rutas nuevas probadas.** Cotejar condiciones de Phoenix, Disablaster, Regulus y Overflow con texto exacto y revisar cada transición antes de marcar legalidad. Las rutas preexistentes permanecen intactas.
