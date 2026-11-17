# STATION X — Contexto funcional ampliado para los 11 decks

Este documento **complementa**, sin sustituir, las fichas individuales A05/A06, las **105 rutas A09/A10 actuales** (78 originales + 27 ampliaciones hasta V13) y las decisiones ya corregidas. Sus indicadores son descriptivos de relaciones de juego y **no** representan probabilidad de ganar, estabilidad de mano ni legalidad de combos. No modificar inventarios ni atribuir una interacción ausente del texto de las cartas.

## 1. Etiquetas visibles de sinergia por carta

- **Sinergia directa:** existe una operación comprobable entre A y B (buscar, invocar, añadir, recuperar, equipar, enviar, facilitar material bajo condiciones exactas). Mostrar nombre de ambas cartas, operación y condición.
- **Sinergia indirecta:** comparten un recurso aprovechable de forma real; explicar la mediación y sus restricciones.
- **Sinergia condicional:** la interacción existe solo si se cumple una condición adicional observable (zona, turno, nivel, monstruo rival, material, Skill). No utilizar esta etiqueta sin describir la condición.
- **Función independiente:** defensa, interrupción, respuesta o utilidad que no necesita conectarse al motor principal. Es útil por sí misma.
- **Sin sinergia demostrada:** tras analizar el inventario, no se puede demostrar una relación específica. No significa inútil ni invita automáticamente a retirarla.
- **Conflicto funcional:** efecto o restricción que impide, debilita o consume recursos de otra línea. Mostrar ambas cartas y el conflicto.

Las etiquetas son información de juego para el jugador, no estados editoriales de revisión. Se permite que una carta tenga más de una etiqueta, pero «sin sinergia demostrada» no puede coexistir con una relación directa demostrada respecto al mismo conjunto de cartas.

## 2. Indicadores de sinergia calculables

### Cobertura de sinergias por identidad

`Cobertura (%) = 100 × identidades con al menos una relación directa o indirecta demostrada / identidades elegibles del conjunto evaluado`.

### Cobertura ponderada por copias

`Cobertura ponderada (%) = 100 × suma de copias elegibles de identidades con sinergia demostrada / suma de copias elegibles`.

Publicar los dos indicadores claramente diferenciados. Calcular por separado **Main**, **Extra** y **Main + Extra**. Side y Reserva no participan en el denominador de una partida sin intercambio; mostrar sus métricas separadas si corresponde. Una Skill Rush es recurso externo, no una copia robable y no entra en estos denominadores.

Una carta autónoma sin conexión demostrada puede reducir la cobertura de sinergia sin reducir su utilidad competitiva. No etiquetar estos porcentajes como «porcentaje de poder», «win rate», «consistencia», «integración» o probabilidad. Mostrar siempre el numerador, denominador, fecha/fuente de la evaluación y un aviso cuando una relación esté sin cotejar: **no contar inferencias editoriales como sinergias demostradas**. Si no se conoce el número de relaciones verificadas, mostrar «Sin datos suficientes para calcular» y no un porcentaje inventado.

## 3. Qué debe enseñar la ficha de cada carta

1. **En pocas palabras:** qué hace y por qué se incluye en ese deck.
2. **Cómo se usa:** fase, situación de la mano/campo, requisito, coste, objetivo, operación y resultado.
3. **Primero / segundo:** contexto concreto; si no tiene función en uno de los casos, indicarlo.
4. **Relaciones demostradas:** carta vinculada, mecanismo, efecto que habilita y restricciones.
5. **Uso como recurso:** distinguir descarte como coste, descarte por efecto, envío, destrucción, destierro, material Xyz/Fusión/Sincro/Link y tributo.
6. **Cuándo conservarla o evitarla:** situación en que conviene reservarla y choque funcional específico, sin inventar probabilidad.
7. **Ante una interrupción:** consecuencia realmente deducible del texto; alternativa solo si el inventario permite ejecutarla.
8. **Jugadas relacionadas:** enlaces por propósito humano, nunca enlaces a combos inexistentes.

## 4. Propósito competitivo de cada jugada

Cada ruta documentada tiene una **clase mecánica** (interacción básica, starter, extensión, combo, continuación) y, de forma independiente, un **propósito competitivo primario** más propósitos secundarios sustentados en el endboard.

- **Ofensivo:** crea amenazas y presión de combate; no asegura OTK si no están demostrados los ataques y el daño.
- **Defensivo:** proporciona protección, resistencia o recursos para sobrevivir; especificar qué protege.
- **Negadores:** deja una negación realmente disponible; indicar qué se niega, coste, ventana y límite.
- **Control:** controla zonas, destierro, acceso a recursos o restricciones; especificar objeto y duración.
- **Romper campo:** elimina, devuelve, usa como material o neutraliza una amenaza rival concreta.
- **Recuperación:** reconstruye recursos después de una interrupción o pérdida previa demostrada.
- **Extensión:** añade cuerpos, materiales o acceso a otra jugada; señalar la ruta siguiente.
- **Finalización:** presenta daño o condición de victoria alcanzable bajo los supuestos explícitos.
- **Preparación de recursos:** realiza búsqueda, reciclaje o habilitación sin ser por sí sola un combo completo.

No forzar una categoría si el deck no puede cumplirla. Un nombre de jefe no constituye por sí solo prueba del propósito.

## 5. Contrato de cada lección por propósito

Título: «[cartas iniciales] → [campo/resultado] — [propósito]».

- **Cuándo elegirla:** ir primero/segundo, amenaza rival a responder o estado recuperable.
- **Entrada:** mano mínima real, campo y zonas previas, Deck/Extra disponibles, Skill y condiciones del rival.
- **Pasos numerados:** carta y efecto exacto, coste, objetivo, cadena, resolución, recurso consumido y restricciones persistentes.
- **Campo final:** monstruos, M/T, materiales, GY/destierro, mano restante, LP y efectos realmente disponibles.
- **Qué consigue:** ventaja concreta y duración; no confundir presencia de un monstruo con negación o protección inexistente.
- **Vulnerabilidades:** punto de interrupción; mostrar qué recurso se pierde y una rama alternativa demostrada, o reconocer que no existe.
- **Variantes:** agrupar rutas que compartan propósito y campo final, sin duplicar combos por sustitución irrelevante de material.
- **Legalidad:** contrastar cada paso con fuente oficial TCG o Rush y la Skill vigente. Si no puede verificarse, no presentarla como secuencia certificada.

## 6. Cobertura por deck que debe investigarse

| ID | Deck | Prioridad de análisis funcional |
|---|---|---|
| 650 | Elfnote | Aperturas y extensiones, salidas legales de Extra, interacciones defensivas y recuperación |
| 653 | DoomZ | Acceso real a jefes del Extra, materiales, efectos de control y rutas ante interrupción |
| 656 | Tearlaments | Envíos a GY, disparos por efecto frente a coste, Fusiones legales, secuencias de reconstrucción |
| 665 | Kashtira Pure | Presión Rank 7, control de zonas, Fenrir/Ogre/Unicorn, Shangri-Ira/Arise-Heart y ruptura de campo |
| 670 | Infernoble | Equipamientos, condiciones de Sincro/Enlace, recursos consumidos, protección y negaciones efectivas |
| 684 | Cyber Dragon Pure | Contacto/Fusión/Xyz, condiciones de Cyber Dragon, ruptura de campo, daño y restricciones Cyberdark |
| 687 | Volcanic | Separar interacciones básicas de combos, envíos y descartes, daño, Emperor y destinos del Extra |
| 704 | Pyro Rush | Skill Alchemy Blaze, Fusiones realmente alcanzables y líneas con Main; ampliar primero su baja cobertura |
| 705 | Royal Rebel Rush | Tributos y jefes, efectos de Skill, campos ofensivos/recuperación; no inventar Extra (no tiene) |
| 706 | HERO Rush | Skill, Fusion Materials reales, presión ofensiva, protección y alternativas ante interrupción |
| 707 | Dark Magician Rush | Skill Illusion of Execution, requisitos de Fusiones, control de recursos y reconstrucción |

**Criterio de terminación:** para cada carta del Main y destino Extra, decidir justificadamente si tiene una interacción enseñable con la lista vigente; registrar una ruta solo cuando existe una línea legal completa. Esto no equivale a exigir un combo individual por carta. Las rutas previamente corregidas permanecen intactas hasta demostración específica de error.

## 7. CONTEXTO INCORPORADO: optimización por carta y porcentaje por deck

**Orden de Miguel:** cubrir los 11 decks y TODAS las cartas de Main, Extra, Side y Reserva, y explicar qué conservar, qué quitar, qué agregar o aumentar de copias, qué reducir y qué alternativas merecen pruebas. No limitar la respuesta a etiquetas genéricas. Un jugador debe poder escoger una carta del Extra, conocer una mano concreta que permita llegar a ella **cuando exista una ruta**, qué problema resuelve, materiales consumidos y un campo final visual. Si no existe ruta fiable, mostrar ese vacío sin simular un combo.

**Archivo ejecutado:** `OPTIMIZACION_SINERGIA_Y_COPIAS_11_DECKS.md`, que incorpora:

1. Fórmula auditable de **cobertura de relaciones documentadas** por deck y global: 171 identidades Main etiquetadas directa/indirecta de 216 (79,2 %). Sobre 370 identidades incluyendo Extra/Side/Reserva: 171 (46,2 %). De Main, 40 directas y 131 indirectas. El denominador cuenta identidades, NO copias ni manos. Es un porcentaje descriptivo de análisis, no una estadística de victoria o consistencia real.
2. Matriz exhaustiva de 370 identidades, que conserva nombre, zona, copias, label funcional (incluye «sin sinergia demostrada» o «sin acceso Extra demostrado»), alternativa/propuesta y vínculo A09 si existe.
3. Once propuestas **de construcción** con el Main equilibrado en su número de cartas, y cuatro propuestas específicas para reemplazar destinos del Extra. Cada propuesta revela cartas actuales, copia objetivo y razón con relación al motor/propósito. Nunca modifica el inventario aprobado automáticamente.
4. Diferencia entre **antisinergia intrínseca** (efectos y restricciones) y **prohibición de torneo**: la evaluación general de banlist no forma parte del contenido de las tarjetas de combos. Las rutas previamente clasificadas como referencias históricas se conservan separadas del selector de jugadas habilitadas; la incidencia exacta se consulta en el control interno de la carpeta 03, no mediante un aviso reglamentario extenso en el visor. Solo al recomendar un cambio de cartas se permite la advertencia específica no vinculante acordada con Miguel.
5. Una guía con foto y pasos tampoco acredita legalidad: de **101 rutas**, 14 usan piezas prohibidas TCG, 2 solo las mencionan negativamente (no se bloquean por esa mención), **66** figuran en revisión general TCG y 19 Rush/Skill en revisión. **Veintiuna** rutas añadidas tienen cotejo individual bajo estado inicial: Big Eye → ZEUS, Cyber Dragon → Heosvarog/Eternity/S:P, DoomZ Drastrius → ZEUS, **Volcanic I:P + Emperador → Unicornio**, **Volcanic Shell → Enlacekuriboh**, **Infernoble Ogier+Renaud → S:P**, **Infernoble Ogier+Renaud → Anima → S:P**, **Tearlaments Fenrir+Reinoheart → S:P** y **Tearlaments Fenrir+Reinoheart+Scheiren → I:P → S:P**. La primera de Volcanic es continuación de un tablero, **no certifica las dos aperturas que podrían generarlo**; exige carta de mano para descartar. La segunda **es una interacción básica, no combo largo**, consume Normal + 500 LP y su reducción de ATK no niega el ataque. La primera Infernoble no destierra al Invocar a S:P; la segunda requiere rival elegible **en zona apuntada por Anima** y sí emplea material de Enlace para S:P. En Tearlaments, Reinoheart/Scheiren usados como materiales Link **no** disparan envíos al GY por efecto; la primera ruta a S:P no habilita primer destierro y la segunda sí al usar I:P como material. **V9 incorpora además Genius Cyber (`684:A09:CYBER:CORE:CLOCKWORK:GENIUS12`) que niega su propia Clockwork Night junto con carta rival, y S:P Volcanic (`687:A09:IP:EMPEROR:SP_DEFENSA16`) desde I:P+Emperador como alternativa a Unicornio sin descarte; ambas con cotejo individual acotado.** **V10 suma tres destinos excluyentes de Elfnote desde Lucina+Power Patron**: June Pride 10 con cambio de Nivel +3, Arcanite 7 con 2 contadores, y Dawn Dragster 7 **solo histórica/no ejecutable en TCG por prohibición de 19/10/2026**. **V11 añade dos rutas Cyber**: Core+Night→Clockwork Knight (envía Night como COSTE y no activa otra Night ese turno) y Cyber Dragon+Horn con Night ya boca arriba→Barricadeborg (dos nombres distintos; protección contra destrucción por efectos, no negación). **V12 agrega tres accesos comprobados puntualmente**: Cyber Dragon+Core→Azalea (si hay ≤3 Mágicas GY Azalea se envía al GY después de destruir), Jormungardr desde mano+Cyber Dragon original desde Deck→Vimana Máquina con 2 materiales (restricción Máquinas; negar activación de efecto de monstruo desacoplando ambos), y Trooper+Rocket+Shell ya en campo→Princesa Prometea que revive Rocket (bloqueo FUEGO). No son tres tableros simultáneos. Ningún label sustituye una revisión individual.

**Interfaz:** los porcentajes pertenecen a «Cartas y sinergias» y las acciones de mejora se muestran como sugerencias reversibles, con distinción inventario actual vs sugerido. «Aprende jugadas» organiza por propósito (ofensivo, defensivo, negación, romper campo, control, recuperación) y debe advertir si una ruta dejó de estar permitida. Ni un cambio de cantidad ni una imagen implican que se haya ejecutado o importado una nueva jugada.

**V13 — contexto adicional de motores de respuesta y eliminación:** cuatro destinos nuevos del Extra, descritos en `guias_a10/DECK_665_670_687_TYPHON_GODDESS_GUIA_V13.md`: Renaud→TY-PHON en Infernoble y Shell→TY-PHON en Volcanic requieren que el rival haya Invocado 2+ monstruos del Extra en este/turno anterior, y bloquean nuevas Invocaciones Normal/Especial después de TY-PHON. Kashtira Donner Link2 + Fenrir + Unicorn + 1 monstruo enemigo de Efecto no-Link → Diosa Link5 solo desde ese campo **ya montado**, sin bloqueo de Theosis. Volcanic I:P Link2 + Trooper + Rocket + 1 Efecto no-Link rival → Diosa en Main propia **por Enlace normal**, sin activar el rápido de I:P; I:P usada como material aun confiere protección contra destrucción por efectos rivales. **105 rutas documentales: 14 uso de prohibida TCG, 2 negativas, 70 revisión TCG y 19 revisión Rush/Skill**. **64/98 Extra** con ruta y **34 sin ruta**. Etiquetas de sinergia permanecen **171/216 Main**, sin falsear porcentaje de consistencia o victoria.
