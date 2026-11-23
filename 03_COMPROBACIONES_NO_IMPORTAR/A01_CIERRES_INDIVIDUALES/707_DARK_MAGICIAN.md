# A01 — cierre individual Dark Magician (707)

23-11-2026. Rush Duel, Dark Magician con Skill local Illusion of Execution. Main 30 / Extra 7 / Side 0 / Reserva 0; 20 identidades (17 Main, 3 Extra) y nueve registros de ruta. Skill separada del inventario físico. No modificar cartas ni evaluar banlist.

Fuentes exactas: Markdown `1ed2a283889a4703f87f10535a3d5fc7471ee4b1`; JSON `3cb6c1b835972c88aa8e1c313a9041e5b2b7fb4e`. Skill del expediente: https://www.duellinksmeta.com/skills/Illusion%20of%20Execution.

## T1 y T3 — diagnóstico y propósitos

Control/Midrange de Lanzadores de Conjuros OSCURIDAD. Mago Oscuro y Hechicero Eliminador Oscuro habilitan Mil Cuchillos o Ataque Mágico Oscuro con el nombre requerido en Campo. Mago Oscuro Sabio, Piedra y Orden Secreta ofrecen acceso y recuperación de cuerpos; Chica Maga Oscura y Ráfaga aportan presión de combate. Illusion of Execution es una Skill local condicionada, una vez por Duelo desde turno 2, no una carta física ni búsqueda garantizada. La condición de victoria es control de mesa e intercambio favorable seguido de daño real. Riesgos: pérdida de la única copia de Mago Oscuro, Mágicas sin requisito nominal, recursos del GY y resultados de excavación. Las siete cartas Extra Gaia se conservan, pero ninguna tiene acceso demostrado con el Main actual: no hay Curse of Dragon ni materiales Guerrero elegibles ni Fusión en Main.

| Propósito | CID, zona y fuente | Condición y riesgo | Ruta existente |
|---|---|---|---|
| Acceso a Mago Oscuro mediante Skill | [15410](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15410&ope=2), [19597](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19597&ope=2), [16371](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16371&ope=2) Main | Skill exige turno 2+, monstruo Nivel 5+ revelable y composición compatible. Excava tres; no garantiza una Mágica. Sabio necesita pago y Mago Oscuro disponible en GY. | `707:A09:ILLUSION:SAGE01`, `707:A09:ILLUSION:SAGE:KNIVES02` |
| Acceso directo sin Skill | [15410](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15410&ope=2), [17212](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17212&ope=2) Main | Orden Secreta requiere Normal Nivel 7 en mano/GY; el aumento de ATK y protección temporal no implican daño automático. | `707:A09:SECRETORDER:DM01`, `707:A09:SECRETORDER:DM:KNIVES02` |
| Nombre temporal y remoción | [19773](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19773&ope=2), [20305](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20305&ope=2), [15450](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15450&ope=2), [15451](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15451&ope=2) Main | Invocar Hechicero Eliminador con Tributos legales y resolver su efecto de cambio de nombre. Mil Cuchillos elimina un monstruo; Ataque Mágico Oscuro elimina M/T rivales. Nombre impreso vuelve tras el turno. | `707:A09:EXECUTOR:KNIVES01`, `707:A09:EXECUTOR:DARKMAGIC01`, `707:A09:V11:EXECUTOR:RENAME:DARK_MAGIC_ATTACK` |
| Extensión y recuperación | [19598](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19598&ope=2), [15410](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15410&ope=2), [16371](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16371&ope=2) Main | Piedra usa Lanzadores OSCURIDAD con estadísticas requeridas en mano/GY y zonas reales. Chica Maga gana ATK por Magos Oscuros en GY, no por uno solo en Campo. | `707:A09:JEWEL:PAIR01`, `707:A09:JEWEL:PAIR:KNIVES03` |
| Presión y defensa | [17209](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17209&ope=2), [20151](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20151&ope=2), [18685](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18685&ope=2) Main | Ráfaga aumenta ATK bajo requisitos de Nivel/Atributo/Tipo; Brillo Sombrío depende de ventana y coste. Maga Legendaria excava, no garantiza el Normal elegido. No asumir batalla ni robo específico. | PENDIENTE_DE_ENLACE_A05_A09 |
| Extra sin acceso demostrado | [19995](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19995&ope=2), [18298](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18298&ope=2), [19323](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19323&ope=2) Extra | Gaia Rápido requiere Guerrero DEF2100 + Curse of Dragon; las otras dos Fusiones requieren Gaia the Fierce Knight + Curse of Dragon. El Main no contiene los materiales y la Skill no los crea. Conservar 3+3+1 copias sin inventar acceso. | EXTRA_SIN_ACCESO_DEMOSTRADO |

CID, zonas, referencias y route_id cotejados contra registro versionado. No se atribuye una auditoría oficial exhaustiva nueva ni replay. Se conservan las fuentes del expediente y las rutas con condiciones. No se fabrican identificadores de efectos/motores.

## Checklist
- [x] T1: diagnóstico, motores, riesgos y Skill, con Extra sin acceso demostrado.
- [x] T2: seis campos de perfil, cuatro cartas destacadas y cuatro fases.
- [x] T3: matriz por propósito con CID, zonas, fuentes, condiciones, riesgos y rutas o bloqueo explícito.
- [x] T4: [CI #45275755236](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45275755236) PASS, estilo 150/190, resumen 226/250, paridad de seis campos.
- [x] T5: misma CI, job 138046988317, commit Platform `47c7552b61e446ec932d72fdbb7291cd95317967`: ISOLATED_PASS de importación/exportación/reimportación, 20 fotografías, nueve registros de ruta, ocho rechazos e inventario conservado. Presentación a 390 y 1280 px PASS; job finalizado exitosamente.

Resultado: **5/5 acreditadas en entorno aislado**. Cero importaciones en producción. No iniciar A02.
