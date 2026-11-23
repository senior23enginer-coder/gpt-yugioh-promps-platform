# A01 — cierre individual HERO (706)

23-11-2026. Rush Duel, Elemental HERO con Skill local Hero Rush Rising. Main 30 / Extra 8 / Side 0 / Reserva 0; 17 identidades, nueve registros de ruta. No se modifica inventario ni se evalúa banlist. Skill independiente de Main.

Fuentes exactas: Markdown `30141ff34c5ec1752724cc4bad7db0aad262987e`; JSON `a7ef30e412d75f076dba960c8b2c5966950b17a7`. Referencia de Skill del expediente: https://www.duellinksmeta.com/skills/Hero%20Rush%20Rising.

## T1 y T3 — diagnóstico y propósitos

Combo/Midrange de Guerreros con Fusiones de materiales nombrados. Avian, Burstinatrix y Sparkman son Normales, no iniciadores con efectos propios. Argen excava cuatro cartas; Inicio Reinicio, Descenso de Héroe y Circulación Elemental administran materiales y recursos. Fusión Rush exige materiales boca arriba de Campo propio; Voltic permite una segunda Fusión mediante su propio efecto con materiales del GY. Hero Rush Rising recupera Fusión si cumple sus requisitos y paga una carta de Campo; no sustituye el procedimiento. La victoria depende de presión y efectos de batalla o remoción resueltos. Riesgos: materiales faltantes, excavación no determinista, zonas limitadas, consumo de Fusión, ventanas de Voltic y cartas restantes del Deck.

| Propósito | CID, zona y fuente | Condición y riesgo | Ruta existente |
|---|---|---|---|
| Primera Fusión de combate | [20460](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20460&ope=2), [20459](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20459&ope=2), [16934](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2) Main; [20453](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20453&ope=2) Extra | Avian y Burstinatrix deben estar boca arriba; Flame Wingman solo causa daño de efecto cuando destruye en batalla y envía al GY. No es daño inmediato de Invocación. | `706:A09:AVIAN:BURST01A` |
| Remoción de M/T | [20454](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20454&ope=2) Extra; Avian/Burstinatrix/Fusión Main | Burst Wingman es una alternativa con los mismos materiales, no una segunda Fusión simultánea. Requiere enviar la carta superior del Deck para su aumento de ATK y la retirada opcional de M/T. | `706:A09:AVIAN:BURST01B` |
| Continuación Voltic | [20457](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20457&ope=2), [20460](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20460&ope=2), [20459](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20459&ope=2) Main; [21316](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=21316&ope=2) Extra | Voltic usa Sparkman+Avian. Su efecto habilita Fusión de Guerrero Nivel 6–8 mediante devolución de materiales del GY al Deck, durante la Main del turno de su Invocación Especial. Skill y tercer HERO requieren recursos reales. Tres ramas mutuamente excluyentes. | `706:A09:VOLTIC:SECOND01A`, `706:A09:VOLTIC:SECOND01B`, `706:A09:VOLTIC:SECOND01C` |
| Fusión de cierre | [20457](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20457&ope=2), [16934](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2) Main; [20453](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20453&ope=2), [20610](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20610&ope=2) Extra | Shining Flare exige Flame Wingman y Sparkman como materiales. La apertura documentada usa dos Fusión y cinco cartas; calcular ATK por Guerreros reales del GY y no atribuir daño al invocarlo. | `706:A09:SHINING:DOUBLE01` |
| Triple material y robo | Avian/Sparkman/Burstinatrix Main; [21501](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=21501&ope=2) Extra | Heliosfera necesita los tres nombres y su efecto exige diez cartas o más en Deck. Solo si se roba monstruo se abre la destrucción opcional. No garantizar el robo ni la eliminación. | `706:A09:V11:TRIPLE_NORMAL:HELIOSPHERE` |
| Consistencia y recuperación | [20461](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20461&ope=2), [16929](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16929&ope=2), [20665](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20665&ope=2), [20465](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20465&ope=2) Main; Skill Hero Rush Rising | Argen añade únicamente Normales nombrados efectivamente excavados; Inicio Reinicio necesita Normal elegible del GY; Descenso limita suma de Niveles a siete y atacantes a Guerreros. Skill exige composición del Deck/Extra y pago real de Campo. No asumir Normal o Fusión gratis. | PENDIENTE_DE_ENLACE_A05_A09 |

CID, zonas, fuentes y route_id cotejados con el registro versionado. Las fuentes son referencias del expediente; no se declara nueva auditoría exhaustiva de efectos ni replay. Los nueve registros incluyen familias agrupadas, no nueve combos independientes. No se fabrican effect_id/motor_id.

## Checklist
- [x] T1: diagnóstico, motores, Skill, riesgos y condición de victoria.
- [x] T2: seis campos del perfil, cuatro cartas destacadas y cuatro fases.
- [x] T3: matriz por propósito con CID, zona, fuente, condición, riesgo y rutas existentes o pendientes.
- [x] T4: [CI #45275755236](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45275755236) PASS, estilo 171/190, resumen 248/250, paridad de seis campos.
- [x] T5: misma CI, job 138046988317, commit Platform `47c7552b61e446ec932d72fdbb7291cd95317967`: ISOLATED_PASS de importación/exportación/reimportación, 17 fotografías, nueve registros de ruta, ocho rechazos e inventario preservado. Presentación 390 y 1280 px PASS; job exitoso.

Resultado: **5/5 acreditadas en entorno aislado**. Cero importaciones en producción; no iniciar A02.
