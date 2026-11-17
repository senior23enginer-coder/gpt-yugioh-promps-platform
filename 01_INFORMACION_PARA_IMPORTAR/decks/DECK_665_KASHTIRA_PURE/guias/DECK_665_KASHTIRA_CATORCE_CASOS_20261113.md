# Kashtira Pure 665 — catorce casos de cobertura

**Inventario:** Main 42, Extra 15, Side 0, Reserva 19. Conservar las **15 rutas** ya existentes (incluidos los tres suplementos solicitados) y las condiciones de Theosis, Birth, Arise-Heart, Unicorn y Fenrir. No copiar de nuevo una ruta con ID distinto para inflar números.

## 11 cartas Main: decisiones y uso

| CID | Carta | Escenario y efecto útil | Restricción/decisión que no se debe omitir |
|---:|---|---|---|
| 18152 | Scareclaw Kashtira | Desde mano se puede Invocar Especial desterrando Kashtira/Scareclaw de mano/GY según texto; puede atacar en Defensa y sus batallas interactúan con efectos de monstruos rivales | Registrar exactamente qué carta se destierra y de qué zona; no asumir que revive la carta desterrada |
| 18153 | Tearlaments Kashtira | Invocación Especial mediante destierro de Kashtira/Tearlaments de mano/GY; al Invocarse o enviarse al GY por efecto, puede enviar cartas desde la cima del Deck al GY según texto | Enviar del Deck al GY no es descartar de mano; con Dimension Shifter activo esas cartas pueden acabar desterradas |
| 14740 | Dimension Shifter | Si tu GY está vacío, enviarlo de mano al GY como coste; durante los siguientes dos turnos, cartas que irían al GY se destierran | No activarlo con GY propio no vacío; no atribuir simultáneamente efectos «enviado al GY» de Tearlaments |
| 5537 | Terraforming | Mágica Normal busca Mágica de Campo en Deck, por ejemplo Pressured Planet Wraitsoth si disponible | No pone campo directamente ni lo activa; la disponibilidad/limitación TCG se verifica antes de sugerir cambios |
| 5432 | Book of Moon | Mágica Rápida para poner monstruo boca arriba en Defensa boca abajo | Puede cortar un objetivo boca arriba, pero no niega retrospectivamente un efecto ya activado; Xyz/Link tienen restricciones de posición según sus reglas |
| 4342 | Dark Hole | Destruye monstruos en campo | No selecciona objetivos; puede destruir propios Kashtira, no es retirada unilateral |
| 15756 | Pot of Prosperity | En tu Main Phase destierra del Extra 3 o 6 **boca abajo como coste**, excava igual cantidad de cartas del Deck y añade una elegida; resto se coloca debajo del Deck según texto | No Invoca, envía al GY ni activa efectos del Extra desterrado boca abajo; limita daño/robo durante turno según texto |
| 12464 | Cosmic Cyclone | Paga 1000 LP, selecciona una Mágica/Trampa en campo y la destierra | No es destrucción ni negación automática; coste se paga aunque respuesta rival niegue su efecto |
| 9352 | Forbidden Lance | Mágica Rápida: selecciona monstruo boca arriba, pierde 800 ATK y queda no afectado por efectos de otras Magias/Trampas durante turno | Puede proteger ante ciertas cartas; no protege de efectos de monstruo y no restituye ATK original inmediatamente |
| 15296 | Triple Tactics Talent | En Main Phase propia, si rival activó efecto de monstruo durante ese turno, escoger una acción legal de robo, control o perturbación | No es respuesta de Cadena rápida al efecto rival; la elección de control requiere monstruo objetivo válido |
| 13631 | Infinite Impermanence | Negar efectos de monstruo rival boca arriba; desde mano solo si no controlas cartas | Colocada añade negación de columna de Mágicas/Trampas durante turno; no niega una familia completa de monstruos |

### Ejemplo: Book of Moon ante un Xyz rival

**Entrada:** Book of Moon en mano; rival controla Xyz boca arriba que puede ponerse en Defensa; ventana legal de Mágica Rápida.

1. Activar Book of Moon, seleccionando el Xyz rival.
2. Si resuelve, el Xyz cambia a Defensa boca abajo; sus materiales permanecen asociados según reglas de Xyz.
3. No afirmar que sus efectos previamente activados han sido negados. Revisar si el efecto que se resuelve requiere que siga boca arriba.

**Resultado:** Xyz boca abajo, sin retirada de materiales por la mera acción. **Interrupción:** una negación de la Mágica impide el cambio y no consume materiales Xyz.

### Ejemplo: Prosperity como decisión de recursos

**Entrada:** Pot of Prosperity en mano, Extra con al menos seis cartas disponibles, Main Phase propia, sin restricciones que impidan la activación.

1. Elegir 3 o 6 cartas del Extra para desterrarlas **boca abajo como coste**; registrar CIDs reales seleccionados, no elegir después de conocer las cartas excavadas.
2. Si resuelve, excavar igual número de cartas del Deck, añadir exactamente una a mano y colocar las restantes abajo del Deck en el orden elegido.
3. Actualizar el Extra disponible: ninguna carta desterrada por ese coste puede seguir representada como destino de una ruta posterior.

**Interrupción:** negar la Mágica no restituye las cartas del Extra ya desterradas; no se garantiza la carta añadida.

## Tres casos Extra: un uso como material no demuestra acceso

| CID | Carta | Diagnóstico | Siguiente prueba concreta |
|---:|---|---|---|
| 17804 | Donner, Dagger Fur Hire | La ruta `665:A09:DONNER:FENRIR:UNICORN:GODDESS12` **parte con Donner ya presente**; usarla para Underworld Goddess no prueba su Invocación | Probar campo de dos monstruos de tipos distintos que puedan formar Link-2 según el texto de Donner, antes del bloqueo Xyz de Theosis; registrar materiales/campo posterior |
| 15366 | Fossil Warrior Skull Knight | Su envío al GY y efecto de GY pueden dar utilidad sin Invocación | Requiere método de Fusión legítimo con materiales especificados; si no existe Fossil Fusion/procedimiento compatible en lista, marcar acceso bloqueado y uso de GY por separado |
| 15882 | Fossil Machine Skull Wagon | La utilidad desde GY no es acceso al campo desde Extra | Requiere materiales y método de Fusión correspondientes; no crear un combo desde Prosperity ni desde una carta ya en GY |

### Decisión crítica: Theosis y Donner

Una vez aplicada la restricción de Kashtiratheosis a Invocaciones del Extra, una ruta Link a Donner no se ofrece por defecto. Si se pretende Donner, realizar su Invocación **antes** de activar el efecto que impone solo Xyz, con dos cuerpos disponibles y materiales que cumplan su requisito. Fenrir + Unicorn como cuerpos no equivalen automáticamente a una Link-2 válida si no se cumplen los tipos exigidos por el texto de Donner. No afirmar que la ruta Goddess12 resolvió ese acceso por comenzar con Donner en campo.

## Estado

- Once Main investigados con función/condición y ejemplos de respuesta.
- Tres Extra diagnosticados: Donner acceso no demostrado; las dos Fusiones Fósil con bloqueo de procedimiento pendiente de cerrar contra lista y fuentes oficiales.
- **No** se validan 14 combos nuevos; no se modifican 15 rutas previas ni la lista física.
- Cualquier propuesta de agregar Fusion Spell o cambiar materiales pertenece a «Práctica y mejora» y requiere aprobación separada.

Fuentes para cotejo: fichas Konami/Neuron por CID, comenzando con https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17804&ope=2 y https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15756&ope=2 .
