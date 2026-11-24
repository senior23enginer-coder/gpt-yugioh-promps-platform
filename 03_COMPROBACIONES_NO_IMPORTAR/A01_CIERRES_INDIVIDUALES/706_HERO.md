# A01 — cierre individual HERO (706)

> **ESTADO VIGENTE: A01 REABIERTO — revisión funcional 2.** Los checks históricos inferiores conservan su valor de prueba técnica anterior, no certifican el nuevo estándar. Revalidar T1–T5 individualmente: diagnóstico, ocho lecciones prácticas, evidencia por lección, revisión semántica y lectura completa en navegador real. No cerrar por longitud, paridad o importación.

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

## Revisión funcional 2 — ocho lecciones propuestas

Redacción individual basada en inventario y aperturas/resultados del paquete real, con condiciones y alternativas. No se modifica ningún efecto ni ruta; enlaces oficiales para cotejo. El nuevo cierre queda pendiente de la aplicación del contrato, verificación semántica completa y prueba real de interfaz.

- first: cartas [Héroe Elemental Avian](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20460&ope=2), [Héroe Elemental Burstinatrix](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20459&ope=2), [Fusión](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2), [Héroe Elemental de la Llama Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20453&ope=2), [Héroe Elemental del Estallido Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20454&ope=2); rutas fuente `706:A09:AVIAN:BURST01A`, `706:A09:AVIAN:BURST01B`.
- second: cartas [Héroe Elemental Sparkman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20457&ope=2), [Héroe Elemental Avian](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20460&ope=2), [Héroe Elemental Burstinatrix](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20459&ope=2), [Fusión](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2), [Héroe Elemental Voltic Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=21316&ope=2), [Héroe Elemental del Estallido Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20454&ope=2), [Héroe Elemental Heliosfera](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=21501&ope=2); rutas fuente `706:A09:VOLTIC:SECOND01A`, `706:A09:VOLTIC:SECOND01B`, `706:A09:VOLTIC:SECOND01C`.
- mid: cartas [Héroe Elemental Voltic Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=21316&ope=2), [Héroe Elemental Sparkman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20457&ope=2), [Héroe Elemental Avian](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20460&ope=2), [Héroe Elemental Burstinatrix](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20459&ope=2), [Héroe Elemental de la Llama Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20453&ope=2), [Héroe Elemental del Estallido Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20454&ope=2), [Héroe Elemental Heliosfera](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=21501&ope=2); rutas fuente `706:A09:VOLTIC:SECOND01A`, `706:A09:VOLTIC:SECOND01B`, `706:A09:VOLTIC:SECOND01C`.
- late: cartas [Héroe Elemental Avian](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20460&ope=2), [Héroe Elemental Burstinatrix](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20459&ope=2), [Héroe Elemental Sparkman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20457&ope=2), [Fusión](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2), [Héroe Elemental de la Llama Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20453&ope=2), [Héroe Elemental Shining Flare Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20610&ope=2); rutas fuente `706:A09:SHINING:DOUBLE01`.
- weak_hand: cartas [Héroe Elemental Avian](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20460&ope=2), [Héroe Elemental Burstinatrix](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20459&ope=2), [Fusión](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2), [Héroe Elemental de la Llama Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20453&ope=2), [Héroe Elemental del Estallido Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20454&ope=2), [Agujero Trampa](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15913&ope=2); rutas fuente `706:A09:AVIAN:BURST01A`, `706:A09:AVIAN:BURST01B`, `706:A09:V11:TRIPLE_NORMAL:HELIOSPHERE`.
- disruption: cartas [Héroe Elemental Avian](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20460&ope=2), [Héroe Elemental Sparkman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20457&ope=2), [Héroe Elemental Burstinatrix](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20459&ope=2), [Fusión](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2), [Héroe Elemental Voltic Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=21316&ope=2); rutas fuente `706:A09:VOLTIC:SECOND01B`, `706:A09:SHINING:DOUBLE01`.
- win_condition: cartas [Héroe Elemental de la Llama Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20453&ope=2), [Héroe Elemental del Estallido Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20454&ope=2), [Héroe Elemental Shining Flare Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20610&ope=2), [Héroe Elemental Heliosfera](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=21501&ope=2); rutas fuente `706:A09:AVIAN:BURST01A`, `706:A09:AVIAN:BURST01B`, `706:A09:SHINING:DOUBLE01`, `706:A09:V11:TRIPLE_NORMAL:HELIOSPHERE`.
- common_errors: cartas [Fusión](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2), [Héroe Elemental Voltic Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=21316&ope=2), [Héroe Elemental de la Llama Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20453&ope=2), [Héroe Elemental del Estallido Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20454&ope=2), [Héroe Elemental Heliosfera](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=21501&ope=2), [Héroe Elemental Shining Flare Wingman](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20610&ope=2); rutas fuente `706:A09:VOLTIC:SECOND01A`, `706:A09:VOLTIC:SECOND01B`, `706:A09:VOLTIC:SECOND01C`, `706:A09:SHINING:DOUBLE01`.

<!-- A01_ESTRATEGIA_REVISADA -->
```json
{
  "schema": "station-x-player-strategy/1",
  "sections": [
    {
      "id": "first",
      "title": "Primero: Wingman con dos materiales",
      "objective": "Preparar una Fusión estable y escoger el Wingman cuyo efecto sirva en la posición actual.",
      "situation": "Avian, Burstinatrix y Fusión en mano; dos zonas libres y ambos destinos en Extra.",
      "card_cids": [
        20460,
        20459,
        16934,
        20453,
        20454
      ],
      "actions": [
        "Invoca normalmente Avian y Burstinatrix boca arriba usando las reglas Rush.",
        "Activa Fusión con esos dos materiales; elige Llama Wingman o Estallido Wingman, no ambos.",
        "Si escoges Estallido, valora su aumento de ATK pagando el envío de la carta superior conforme al efecto."
      ],
      "expected_result": "Un Wingman de 2100 ATK base; Estallido puede aumentar la fuerza de un Guerrero propio según su efecto.",
      "resources_to_keep": "Los materiales o una segunda Fusión para un turno posterior.",
      "alternative": "Si no puedes reunir los dos nombres, conserva Fusión y prepara una defensa en vez de anunciar el jefe.",
      "related_route_ids": [
        "706:A09:AVIAN:BURST01A",
        "706:A09:AVIAN:BURST01B"
      ]
    },
    {
      "id": "second",
      "title": "Segundo: Voltic y una segunda Fusión",
      "objective": "Construir dos amenazas escogiendo un segundo destino según el Campo rival.",
      "situation": "Sparkman, Avian, Burstinatrix y Fusión en mano; tres zonas libres; Skill local HERO RUSH RISING habilitada.",
      "card_cids": [
        20457,
        20460,
        20459,
        16934,
        21316,
        20454,
        21501
      ],
      "actions": [
        "Invoca los tres Normales y fusiona Sparkman con Avian para Voltic Wingman.",
        "Usa la Skill enviando Burstinatrix; aplica la reducción de 600 a Voltic y recupera Fusión según el procedimiento.",
        "Utiliza el efecto de Voltic con los materiales de Cementerio devueltos al Deck para escoger Estallido, Llama o Heliosfera según corresponda."
      ],
      "expected_result": "Voltic de 1400 ATK temporal y una segunda Fusión elegida; Heliosfera puede robar y destruir solo si su condición se cumple.",
      "resources_to_keep": "La Fusión recuperada y los nombres reciclados en Deck.",
      "alternative": "Si la Skill no está disponible, realiza solo la Fusión cuyos materiales tengas en Campo.",
      "related_route_ids": [
        "706:A09:VOLTIC:SECOND01A",
        "706:A09:VOLTIC:SECOND01B",
        "706:A09:VOLTIC:SECOND01C"
      ]
    },
    {
      "id": "mid",
      "title": "Juego medio: administrar el Cementerio de Voltic",
      "objective": "Seleccionar el segundo destino sin perder los nombres necesarios para próximas Fusiones.",
      "situation": "Voltic en Campo y los Héroes Normales necesarios en Cementerio por la apertura anterior.",
      "card_cids": [
        21316,
        20457,
        20460,
        20459,
        20453,
        20454,
        21501
      ],
      "actions": [
        "Recuenta los nombres de Cementerio antes de aplicar el efecto de Voltic.",
        "Si necesitas dos materiales, elige Llama o Estallido conforme al Campo rival.",
        "Si eliges Heliosfera, utiliza los tres nombres; verifica al menos diez cartas en Deck para el robo documentado."
      ],
      "expected_result": "Una segunda Fusión y reciclaje de los materiales usados, sin sumar otros destinos a la misma activación.",
      "resources_to_keep": "La Fusión de mano y los nombres que siguen disponibles después de reciclar.",
      "alternative": "Si no hay tres nombres para Heliosfera, considera el Wingman de dos materiales que sí puedas reunir.",
      "related_route_ids": [
        "706:A09:VOLTIC:SECOND01A",
        "706:A09:VOLTIC:SECOND01B",
        "706:A09:VOLTIC:SECOND01C"
      ]
    },
    {
      "id": "late",
      "title": "Juego tardío: Shining Flare con dos Fusiones",
      "objective": "Convertir Flame Wingman y Sparkman en un jefe de presión con ATK dependiente del Cementerio.",
      "situation": "Avian, Burstinatrix, Sparkman y dos Fusiones disponibles; destinos Llama y Shining Flare en Extra.",
      "card_cids": [
        20460,
        20459,
        20457,
        16934,
        20453,
        20610
      ],
      "actions": [
        "Invoca los tres Héroes Normales y usa la primera Fusión para Llama Wingman.",
        "Usa la segunda Fusión con Llama Wingman y Sparkman que permanecen boca arriba.",
        "Cuenta los Guerreros de Cementerio para calcular el ATK real de Shining Flare."
      ],
      "expected_result": "Shining Flare de 3700 ATK en el ejemplo con cuatro Guerreros en Cementerio, sin daño por la mera Invocación.",
      "resources_to_keep": "Una segunda Fusión antes de gastar la primera si pretendes completar esta línea.",
      "alternative": "Si solo tienes una Fusión, conserva el Wingman obtenido y Sparkman si sigue en Campo.",
      "related_route_ids": [
        "706:A09:SHINING:DOUBLE01"
      ]
    },
    {
      "id": "weak_hand",
      "title": "Mano débil: dos Héroes antes de la tercera pieza",
      "objective": "Construir un Wingman simple sin exigir la mano de cuatro cartas de Voltic.",
      "situation": "Avian y Burstinatrix con Fusión, o una mano a la que todavía le falta uno de estos nombres.",
      "card_cids": [
        20460,
        20459,
        16934,
        20453,
        20454,
        15913
      ],
      "actions": [
        "Con la pareja completa, usa la Fusión simple de Llama o Estallido.",
        "Si solo tienes un material, conserva Fusión para cuando puedas colocar ambos nombres.",
        "Prepara una defensa disponible si la mano no reúne una pareja válida."
      ],
      "expected_result": "Un Wingman legal o recursos conservados; no se supone una segunda Fusión.",
      "resources_to_keep": "Fusión y el nombre que falte para la pareja de materiales.",
      "alternative": "Si después reúnes los tres Normales, valora Heliosfera con sus requisitos.",
      "related_route_ids": [
        "706:A09:AVIAN:BURST01A",
        "706:A09:AVIAN:BURST01B",
        "706:A09:V11:TRIPLE_NORMAL:HELIOSPHERE"
      ]
    },
    {
      "id": "disruption",
      "title": "Interrupción: no fusionar desde zonas equivocadas",
      "objective": "Evitar perder la Magia o declarar una Fusión cuando un material fue retirado.",
      "situation": "Un Héroe deja el Campo antes de Fusión o la Skill no puede recuperar la Magia.",
      "card_cids": [
        20460,
        20457,
        20459,
        16934,
        21316
      ],
      "actions": [
        "Comprueba qué Héroes siguen boca arriba antes de activar Fusión.",
        "Si Voltic ya está en Campo, verifica los nombres que realmente están en Cementerio para su efecto específico.",
        "Si no se completa la recuperación de Fusión por Skill, no la cuentes de nuevo en mano."
      ],
      "expected_result": "Solo el jefe que haya sido Invocado legalmente; el resto queda condicionado a los recursos sobrevivientes.",
      "resources_to_keep": "Un material y Fusión que todavía no se hayan gastado.",
      "alternative": "Si no puedes reconstruir la pareja, conserva Voltic o el Wingman existente y defiende el siguiente turno.",
      "related_route_ids": [
        "706:A09:VOLTIC:SECOND01B",
        "706:A09:SHINING:DOUBLE01"
      ]
    },
    {
      "id": "win_condition",
      "title": "Ganar: daño de batalla o retirada de apoyo",
      "objective": "Elegir la Fusión que permita superar la defensa rival y calcular el daño real.",
      "situation": "Puedes acceder a Llama, Estallido, Shining Flare o Heliosfera con sus materiales; LP rivales conocidos.",
      "card_cids": [
        20453,
        20454,
        20610,
        21501
      ],
      "actions": [
        "Llama y Shining Flare solo aportan el daño correspondiente cuando destruyen un monstruo en batalla y se cumple su efecto.",
        "Estallido puede mejorar el ATK de un Guerrero y retirar una Magia o Trampa si existe un objetivo.",
        "Con Heliosfera, no cuentes la destrucción hasta comprobar que la carta robada es monstruo y el efecto resuelve."
      ],
      "expected_result": "Presión por batalla o retirada condicionada; el duelo termina solo si el daño efectivo alcanza los LP rivales.",
      "resources_to_keep": "Una Fusión o material para reconstruir si no puedes cerrar.",
      "alternative": "Si el rival conserva una defensa que impide el ataque, elige Estallido o Heliosfera cuando sus efectos sean utilizables.",
      "related_route_ids": [
        "706:A09:AVIAN:BURST01A",
        "706:A09:AVIAN:BURST01B",
        "706:A09:SHINING:DOUBLE01",
        "706:A09:V11:TRIPLE_NORMAL:HELIOSPHERE"
      ]
    },
    {
      "id": "common_errors",
      "title": "Errores: Skill y destinos de Fusión excluyentes",
      "objective": "Mantener las zonas correctas y no prometer varias Fusiones desde los mismos materiales.",
      "situation": "Vas a usar Fusión, Voltic Wingman o HERO RUSH RISING.",
      "card_cids": [
        16934,
        21316,
        20453,
        20454,
        21501,
        20610
      ],
      "actions": [
        "La Magia Fusión usa los monstruos boca arriba del Campo; el efecto de Voltic tiene su propio procedimiento de Cementerio.",
        "La Skill es externa a la mano y tiene requisitos; la reducción de 600 no es un aumento de ATK.",
        "Las variantes Llama, Estallido y Heliosfera de Voltic son alternativas, no tres jefes simultáneos."
      ],
      "expected_result": "Materiales, ATK y número de Fusiones acordes con los efectos realmente resueltos.",
      "resources_to_keep": "Los nombres exactos de material y la Magia cuando la ruta exige dos copias.",
      "alternative": "Si no está habilitada la Skill local, usa la Fusión simple o doble que puedas reunir sin ella.",
      "related_route_ids": [
        "706:A09:VOLTIC:SECOND01A",
        "706:A09:VOLTIC:SECOND01B",
        "706:A09:VOLTIC:SECOND01C",
        "706:A09:SHINING:DOUBLE01"
      ]
    }
  ]
}
```
