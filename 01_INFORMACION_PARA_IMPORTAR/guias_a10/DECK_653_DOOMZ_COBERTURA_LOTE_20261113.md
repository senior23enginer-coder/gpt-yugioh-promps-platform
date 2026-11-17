# DoomZ 653 — 22 casos de cobertura, revisión inicial por CID

**Control:** inventario 40 Main / 15 Extra / 9 Side. Las 8 rutas previas se preservan. Este estudio **no** es una certificación ni una importación. Las rutas nuevas requieren campos iniciales reproducibles y verificación en editor antes de sumar al contador de producción.

## A. Main: ocho casos

| CID | Carta / función | Escenario concreto y secuencia mínima | Resultado y riesgo |
|---:|---|---|---|
| 9279 | Droll & Lock Bird · 2x | Rival ya añadió una carta desde Main Deck a mano fuera de Draw Phase → enviar Droll de mano al GY → durante el resto del turno ninguno de los jugadores añade del Main Deck a mano | Bloquea búsquedas **posteriores**, no la primera; también limita búsquedas propias si se juega en turno propio |
| 12950 | Ash Blossom · 3x | Rival activa efecto que incluye buscar, Invocar desde Deck o enviar desde Deck al GY → descartar Ash como coste en CL2 → negar ese efecto si resuelve | No destruye automáticamente la carta rival ni devuelve costes; misma regla descrita para Elfnote |
| 17119 | Therion “King” Regulus · 1x | Si hay monstruo Máquina en GY, seleccionarlo desde mano con Regulus, Invocar Regulus Especial y equiparle ese objetivo → puede enviar al GY una carta Therion de mano/campo para negar una activación rival | Sin Máquina disponible en GY no es apertura; comprobar que DoomZ tenga Máquina real en GY y qué efecto de equipar se obtiene |
| 13631 | Infinite Impermanence · 3x | Rival controla monstruo de Efecto boca arriba → activar Impermanence (de mano solo si no controlas cartas, o Colocada según reglas) → negar efectos de ese monstruo hasta fin del turno | Si fue activada Colocada, efectos de otras Magias/Trampas en esa columna quedan negados por el turno; no niega todo un arquetipo |
| 20500 | Mulcharmy Fuwalos · 3x | Sin cartas propias en campo → descartar Fuwalos → robas una por evento de Invocación Especial rival desde Deck/Extra | No roba por GY o mano; End Phase puede exigir devolución aleatoria de excedentes |
| 22565 | Prohibited Power Patron Portal - Terminus · 3x | Activar Mágica Normal → enviar Power Patron desde Deck o Extra al GY → opcionalmente buscar Hada OSCURIDAD disponible | Enviar del Extra no lo Invoca; ataque restringido a Power Patron el resto del turno; otro efecto en GY destierra rival boca abajo al combatir |
| 22519 | **Vidolium**, no “Vidrium” por CID oficial · 1x | Colocar en Zona Péndulo y destruirse para Invocar Power Patron desde mano/GY; al añadirse al Extra boca arriba, buscar Power Patron | El CID 22519 corresponde oficialmente a *Vidolium the Unstable Power Patron of Unity*. Corregir alias/identidad antes de integrar, sin crear dos cartas |
| 21840 | DoomZ Destruction · 1x | Controlas Xyz DoomZ → Colocas la Trampa, esperas ventana legal → seleccionas Xyz DoomZ y equipas Destruction | Mientras equipada limita añadir del Main Deck rival por medios distintos del robo; si la Trampa se destruye por efecto, puede equipar DoomZ del Deck a monstruo boca arriba |

### Interacción desarrollada: Destruction sobre un Xyz DoomZ

**Inicio:** ya controlas un monstruo Xyz DoomZ legalmente Invocado y DoomZ Destruction está Colocada desde un turno anterior o fue Colocada mediante una habilitación legal para activarla ahora. No se afirma que la propia Trampa genere el Xyz.

1. En ventana de Trampa, activar Destruction seleccionando al Xyz DoomZ propio. Si lo retiran antes de resolver, no se supone que se equipe.
2. Si resuelve, la Trampa pasa a estar equipada al Xyz. El rival no puede añadir cartas desde Main Deck a mano excepto robándolas mientras se mantenga el efecto pertinente.
3. Si Destruction equipada es destruida por efecto, puede activarse su efecto adicional para equipar un monstruo DoomZ del Deck a un monstruo boca arriba. **No** se activa simplemente por enviarse como coste o por dejar de ser objetivo válido sin destrucción por efecto.

**Resultado:** Xyz DoomZ equipado + restricción de búsquedas. **Vulnerabilidad:** retirar el Xyz o la Trampa; no atribuir negación retrospectiva a una búsqueda que ya resolvió. Fuente oficial: https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21840&ope=2 .

## B. Extra: siete accesos

| CID | Objetivo | Material oficial / condición crítica | Dictamen documental |
|---:|---|---|---|
| 14958 | Number F0: Utopic Draco Future | Normalmente requiere pasar por Utopic Future (o procedimiento escrito equivalente) | **No iniciar en Draco Future**: primero demostrar F0 de origen y transferir material correctamente |
| 16002 | Springans Merrymaker | Xyz Rango 4 con requisitos de Nivel 4; sus efectos ligados a Springans no convierten por sí solos niveles | Acceso por dos cuerpos Nivel 4 pendiente de obtener; puede ser escalón a Sargas si el procedimiento de Sargas lo permite |
| 18190 | Gigantic “Champion” Sargas | Procedimiento alternativo mediante Xyz Springans de Rango 4 cuando corresponda | **Continuación**: después de Invocar Merrymaker legalmente, comprobar si Sargas puede superponerse; no partir de Merrymaker ya en campo para acreditar apertura |
| 21453 | Number F0: Utopic Future Zexal | Requisitos particulares del F0 correspondiente; revisar el nombre exacto y procedimiento oficial | No confundir con Utopic Draco Future; acceso pendiente de materiales concretos |
| 19886 | Varudras | Xyz Rango 10, 2+ monstruos Nivel 10 | **No ofrecer como ruta jugable TCG Advanced**: ficha oficial marcada Forbidden. Mantener referencia histórica sin eliminar carta |
| 11413 | Number F0: Utopic Future | Dos Xyz del **mismo Rango**, salvo monstruos “Number” según texto | No basta con dos monstruos Nivel 4; primero Invocar dos Xyz elegibles con materiales propios y zonas |
| 14920 | Gagagaga Magician | Xyz Rango 4 desde dos monstruos Nivel 4 | Acceso condicional desde dos Nivel 4 reproducibles; requiere confirmar efecto y uso como enlace al paquete F0 |

### Secuencia condicional: Merrymaker → Sargas

1. **Estado exigido:** dos monstruos Nivel 4 válidos en campo y Merrymaker disponible en Extra, sin bloqueo de Xyz. Si no existe una secuencia de la mano actual que coloque ambos, se trata de continuación, no apertura.
2. Superponer dos Nivel 4 para Invocar Springans Merrymaker Rango 4. Registrar ambos materiales Xyz debajo de Merrymaker.
3. Con Merrymaker boca arriba, si se cumplen los requisitos textuales de Sargas, superponer Gigantic “Champion” Sargas desde Extra usando Merrymaker como material. Transferir correctamente los materiales según procedimiento.
4. Resolver solo los efectos disparados en sus ventanas legales. No atribuir búsqueda, destrucción ni robo automático a un Xyz solo por haber sido Invocado; detallar los recursos y el efecto real al integrar.

**Interrupción:** si el rival retira Merrymaker antes de la superposición, se corta el acceso a Sargas. Si impide la primera Xyz, no se supone un segundo cuerpo de reemplazo. **Pendiente:** certificar ruta de obtención de los dos Nivel 4 con cartas DoomZ exactas.

### Cadena F0: impedimento demostrado

Draco Future no aparece de manera independiente desde monstruos del Main. Debe existir un Xyz permitido por su texto y, para la ruta estándar, F0 Utopic Future ya Invocado. F0 exige Xyz previos del mismo Rango que cumplan su exclusión de “Number”. Se necesitan **cuerpos y dos Invocaciones Xyz anteriores**, no dos niveles que sumen 8. Hasta acreditar ambos Xyz, no declarar acceso a Draco Future.

## C. Side: siete planes alternativos

Cada fila es una **propuesta por separado**; mantener 40 Main y las 9 cartas de Side registradas, sin ejecutar reemplazos automáticamente.

| CID Side | Copias | Cuándo entra y qué busca | Salida propuesta de igual cantidad | Pérdida estratégica / límites |
|---:|---:|---|---|---|
| 11708 Ghost Ogre | 2 | Rival depende de monstruos o permanentes boca arriba que activan efecto | 2 Fuwalos (20500) | Pierdes robo contra Deck/Extra; Ogre **destruye**, no niega automáticamente |
| 15296 Triple Tactics Talent | 1 | Juegas segundo y rival activó efecto de monstruo en tu Main Phase | 1 Fuwalos (20500) | Pierdes robo proactivo; Talent no es Mágica Rápida |
| 14564 Number 60: Dugares | 1 | Necesitas juego medio con dos Nivel 4 y elección entre robo, reanimación o presión | 1 carta de Extra **a decidir tras verificar las quince** | Es intercambio Extra, no Main; los efectos de Dugares omiten fases futuras y no garantizan extensión |
| 13619 Called by the Grave | 1 | Rival usa hand traps de monstruo y hay objetivo en Cementerio | 1 Fuwalos (20500) | Depende de objetivo válido en GY; restricciones y duración de negación precisas |
| 14876 Lightning Storm | 2 | Juegas segundo con campo sin cartas boca arriba propias y necesitas limpieza | 2 Infinite Impermanence (13631) | Menos negación puntual; Storm requiere condición de campo y elegir modo correcto |
| 14741 Nibiru, the Primal Being | 1 | Rival llega a cinco o más Invocaciones de monstruos durante turno | 1 Ash Blossom (12950) | Menos respuesta temprana; Nibiru tributa monstruos boca arriba y genera Ficha con estadísticas según materiales |
| 19184 Super Starslayer TY-PHON | 1 | Rival ya Invocó dos o más desde Extra este turno; necesitas salida de Xyz alternativa | 1 carta de Extra **a decidir tras verificar las quince** | Puede impedir tus propias Invocaciones Especiales restantes; no se incorpora al Main |

**Nota Side Extra:** sin cotejar valor de los quince destinos actuales contra los dos candidatos, **no inventar cuál Extra sale**. Esas dos filas son propuestas estratégicas incompletas y no planes de cambio de lista terminados. Las otras cinco tienen entradas/salidas condicionales, no aplicadas.

## Identidad, legalidad y fuente

1. El CID **22519** se identificó en la ficha oficial como **Vidolium the Unstable Power Patron of Unity**. La etiqueta “Vidrium” del inventario DoomZ debe tratarse como una discrepancia a resolver, no como dos cartas distintas.
2. Varudras (CID 19886) figura como **Forbidden** en la base oficial consultada. No alterar silenciosamente el inventario, pero tampoco convertirla en ruta TCG Advanced activa.
3. No inferir legalidad TCG de una ficha solo porque exista en la biblioteca; la verificación de restricciones de cada formato se hace al integrar y probar la ruta.

Fuentes oficiales por CID: https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21840&ope=2 ; https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22519&ope=2 ; https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19886&ope=2 ; https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11413&ope=2 ; https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=14958&ope=2 ; https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=16002&ope=2 ; https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18190&ope=2 ; https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=14564&ope=2 . Los demás efectos se verifican contra su ficha CID antes de certificar rutas.

**Estado de los 22 casos:** ocho Main descritos, siete Extra clasificados (accesos completos pendientes), siete Side planteados (dos intercambios de Extra aún sin carta de salida). Ninguno importado, publicado o certificado; conservar la referencia histórica de Varudras y los registros de revisión.
