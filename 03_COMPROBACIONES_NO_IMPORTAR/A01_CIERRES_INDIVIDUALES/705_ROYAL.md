# A01 — cierre individual Royal (705)

> **ESTADO VIGENTE: A01 REABIERTO — revisión funcional 2.** Los checks históricos inferiores conservan su valor de prueba técnica anterior, no certifican el nuevo estándar. Revalidar T1–T5 individualmente: diagnóstico, ocho lecciones prácticas, evidencia por lección, revisión semántica y lectura completa en navegador real. No cerrar por longitud, paridad o importación.

23-11-2026. Rush Duel, Royal Rebel's con Skill local Hard Rock Overture. Main 30 / Extra 0 / Side 0 / Reserva 0; 16 identidades, seis rutas. El Extra y Side no son obligatorios para admitir Rush Duel. Skill separada del inventario físico; no se cambia ninguna carta ni se evalúa banlist.

Fuentes exactas: Markdown `98a58cc42f80f724d2b6b38dc83e0dc62768547c`, JSON `dd6deee37457743b07f21588a6f4e082ef90d800`. Referencia de Skill en expediente: https://www.duellinksmeta.com/skills/Hard%20Rock%20Overture.

## T1 y T3 — diagnóstico y matriz de propósitos

Combo/Midrange de Demonios LUZ por Invocación por Sacrificio. Heavy Metal responde a monstruos boca arriba, Progrock retira M/T y cartas colocadas, Death Doom exige dos Demonios de Nivel 7 o mayor como Tributos. Hard Rock Overture prepara cuerpos según sus requisitos, no sustituye la Invocación por Sacrificio. Phaser recupera cuerpos de Nivel alto cuando ya se controla otro Demonio elegible. Canjear y Monstruo Reencarnado convierten mano/GY en recursos, sin garantizar robos. Victoria por presión de combate tras remoción válida; vigilar costes, niveles, tipo de Tributo, zonas, ventanas y restricciones de Skill.

| Propósito | CID, zona y fuente | Condición y riesgo | Ruta existente |
|---|---|---|---|
| Limpieza de monstruos | [16331](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16331&ope=2), [15441](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [19761](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19761&ope=2) Main | Death Doom requiere dos Demonios Nivel 7+ como Tributos y ventana del turno de su Invocación por Sacrificio. No atribuir efecto al colocarlo por Skill; el daño depende de monstruos realmente destruidos. | `705:A09:OVERTURE:DEATHDOOM01` |
| Presión y retirada selectiva | [15441](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [16331](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16331&ope=2) Main | Heavy Metal debe haber sido Invocado por Sacrificio usando al menos un Nivel 5+; su objetivo corresponde al menor Nivel entre monstruos rivales boca arriba elegibles Nivel 8 o menos. No escoger cualquier monstruo arbitrariamente. | `705:A09:OVERTURE:HEAVY01` |
| Retirada de retaguardia | [19761](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19761&ope=2), [15441](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2) Main | Progrock requiere Sacrificio con Nivel 5+ y M/T elegible; la segunda destrucción depende de resolución y carta boca abajo existente. La restricción posterior de ataque se limita a Demonios. | `705:A09:OVERTURE:PROGROCK01` |
| Daño por penetración | [16344](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16344&ope=2) Main | Kheiron necesita monstruo rival, carta superior del Deck disponible y Demonio propio Nivel 5+ elegible; la penetración solo causa daño si hay batalla y DEF inferior. | `705:A09:OVERTURE:KHEIRON01` |
| Recurrencia sin Skill | [16330](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16330&ope=2), [15441](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [16331](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16331&ope=2) Main | Phaser exige Demonio propio Nivel 7+ y envía su propio cuerpo para revivir otro Demonio Nivel 7+ en Defensa. Dos cuerpos reales pueden habilitar Death Doom, si se conservan. | `705:A09:V11:PHASER:REVIVE:DEATHDOOM` |
| Filtrado y recuperación | [17721](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17721&ope=2), [16330](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16330&ope=2), [15441](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2) Main | Canjear exige Nivel 8 de mano para robar dos cartas desconocidas. Phaser puede recuperar el cuerpo bajo condiciones; Heavy Metal revivido no cumple su efecto de Sacrificio. | `705:A09:TRADEIN:PHASER01` |

La Skill Hard Rock Overture requiere las condiciones de Demonios/LUZ, Nivel 7/8 y ventana del expediente local. Se respetan sus restricciones de ataque; no es una carta física. CID, zonas, fuentes y route_id cotejados contra el registro versionado. No se afirma una auditoría exhaustiva nueva de reglas ni simulación de rutas. No se fabrican effect_id/motor_id.

## Checklist
- [x] T1: diagnóstico, estrategia, Skill, motores, riesgos y condición de victoria.
- [x] T2: seis campos, cuatro cartas destacadas y cuatro fases.
- [x] T3: matriz de propósitos con CID, zona, fuente, condición, riesgo y rutas existentes.
- [x] T4: [CI #45275755236](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45275755236) PASS, estilo 165/190, resumen 245/250, paridad de seis campos.
- [x] T5: misma CI, job 138046988317, commit Platform `47c7552b61e446ec932d72fdbb7291cd95317967`: ISOLATED_PASS de importación/exportación/reimportación con 16 fotos, seis rutas, ocho rechazos e inventario conservado. Presentación 390 y 1280 px PASS; job exitoso.

Resultado: **5/5 acreditadas en entorno aislado**. Cero importaciones en producción. No iniciar A02.

## Revisión funcional 2 — ocho lecciones propuestas

Redacción individual basada en inventario y aperturas/resultados del paquete real, con condiciones y alternativas. No se modifica ningún efecto ni ruta; enlaces oficiales para cotejo. El nuevo cierre queda pendiente de la aplicación del contrato, verificación semántica completa y prueba real de interfaz.

- first: cartas [Metal Maldito del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16331&ope=2), [Heavy Metal del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [Progrock del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19761&ope=2), [Phaser del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16330&ope=2), [Gelatina Defensiva](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18646&ope=2); rutas fuente sin ruta autónoma acreditada; preparación condicional.
- second: cartas [Metal Maldito del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16331&ope=2), [Heavy Metal del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [Progrock del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19761&ope=2); rutas fuente `705:A09:OVERTURE:DEATHDOOM01`, `705:A09:OVERTURE:HEAVY01`, `705:A09:OVERTURE:PROGROCK01`.
- mid: cartas [Canjear](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17721&ope=2), [Heavy Metal del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [Phaser del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16330&ope=2), [Metal Maldito del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16331&ope=2); rutas fuente `705:A09:TRADEIN:PHASER01`.
- late: cartas [Heavy Metal del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [Phaser del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16330&ope=2), [Metal Maldito del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16331&ope=2); rutas fuente `705:A09:V11:PHASER:REVIVE:DEATHDOOM`.
- weak_hand: cartas [Phaser del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16330&ope=2), [Canjear](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17721&ope=2), [Heavy Metal del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [Gelatina Defensiva](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18646&ope=2), [Agujero Trampa](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15913&ope=2); rutas fuente `705:A09:TRADEIN:PHASER01`.
- disruption: cartas [Metal Maldito del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16331&ope=2), [Heavy Metal del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [Progrock del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19761&ope=2), [Phaser del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16330&ope=2); rutas fuente `705:A09:V11:PHASER:REVIVE:DEATHDOOM`, `705:A09:OVERTURE:DEATHDOOM01`.
- win_condition: cartas [Heavy Metal del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [Kheiron el Caballero Estelar](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16344&ope=2), [Progrock del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19761&ope=2), [Metal Maldito del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16331&ope=2); rutas fuente `705:A09:OVERTURE:HEAVY01`, `705:A09:OVERTURE:KHEIRON01`, `705:A09:OVERTURE:PROGROCK01`.
- common_errors: cartas [Phaser del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16330&ope=2), [Metal Maldito del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16331&ope=2), [Heavy Metal del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [Progrock del Rebelde Real](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19761&ope=2), [Canjear](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17721&ope=2); rutas fuente `705:A09:OVERTURE:DEATHDOOM01`, `705:A09:OVERTURE:HEAVY01`, `705:A09:OVERTURE:PROGROCK01`, `705:A09:TRADEIN:PHASER01`.

<!-- A01_ESTRATEGIA_REVISADA -->
```json
{
  "schema": "station-x-player-strategy/1",
  "sections": [
    {
      "id": "first",
      "title": "Primero: reservar el jefe y sus Tributos",
      "objective": "Preparar un siguiente turno con los Demonios necesarios sin asumir la recuperación de Skill antes del turno dos.",
      "situation": "Primer turno del duelo: identifica Metal Maldito, Heavy Metal y Progrock en mano; comprueba si tienes defensas como Gelatina Defensiva o Agujero Trampa. La recuperación de Hard Rock Overture usada en las rutas exige turno 2+.",
      "card_cids": [
        16331,
        15441,
        19761,
        16330,
        18646,
        15913
      ],
      "actions": [
        "Elige qué Demonio de Nivel 8 quieres conservar como jefe y qué dos servirían como Tributos en una apertura posterior.",
        "Si no tienes dos monstruos que puedas Sacrificar legalmente, conserva el jefe en mano y Coloca las defensas que realmente tengas; actívalas solo al cumplirse su requisito.",
        "No gastes la Skill esperando recuperar al jefe en turno uno. Guarda la apertura de tres Demonios para cuando su recuperación sea válida."
      ],
      "expected_result": "Una preparación defensiva para el siguiente turno, no un campo final de jefe acreditado desde turno uno con las rutas existentes.",
      "resources_to_keep": "Los tres Demonios de la apertura y Phaser si se puede emplear después.",
      "alternative": "Si no dispones de la Skill, reúne cuerpos mediante las cartas de tu lista y no asumas Invocaciones gratuitas.",
      "related_route_ids": []
    },
    {
      "id": "second",
      "title": "Segundo: elegir entre Death Doom, Heavy y Progrock",
      "objective": "Retirar la amenaza relevante con un único jefe de Nivel 8, según el Campo rival.",
      "situation": "Turno 2+, Skill habilitada y los tres Rebelde Real de Nivel 8 en mano; rival con objetivos elegibles.",
      "card_cids": [
        16331,
        15441,
        19761
      ],
      "actions": [
        "Escoge Death Doom si necesitas destruir monstruos boca arriba elegibles; Heavy Metal para destruir el objetivo de menor Nivel aplicable y ganar ATK.",
        "Escoge Progrock si el problema es una Magia o Trampa y una carta boca abajo susceptible a su efecto.",
        "Envía el jefe elegido al Cementerio mediante Hard Rock Overture; coloca los otros dos Demonios de mano en Defensa boca arriba, recupera el jefe a mano por la opción de turno 2+ y Sacrifícalos para su Invocación Normal por Sacrificio."
      ],
      "expected_result": "Un solo jefe Invocado por Sacrificio y la retirada que su efecto haya resuelto.",
      "resources_to_keep": "La posibilidad de mantener el jefe en Campo para el siguiente turno.",
      "alternative": "Si falta la tercera carta o el objetivo no cumple la condición, no uses esta apertura como si estuviera completa.",
      "related_route_ids": [
        "705:A09:OVERTURE:DEATHDOOM01",
        "705:A09:OVERTURE:HEAVY01",
        "705:A09:OVERTURE:PROGROCK01"
      ]
    },
    {
      "id": "mid",
      "title": "Juego medio: Canjear y Phaser",
      "objective": "Convertir un Nivel 8 de mano en dos robos y recuperar un cuerpo de Cementerio.",
      "situation": "Ya controlas Death Doom, tienes Canjear, Heavy Metal y Phaser en mano y queda espacio para la recuperación.",
      "card_cids": [
        17721,
        15441,
        16330,
        16331
      ],
      "actions": [
        "Activa Canjear enviando Heavy Metal al Cementerio y roba dos cartas de identidad desconocida.",
        "Invoca normalmente Phaser y verifica que Death Doom sigue boca arriba.",
        "Envía Phaser al Cementerio mediante su efecto y recupera Heavy Metal en Defensa."
      ],
      "expected_result": "Death Doom y Heavy Metal en Campo, más dos cartas robadas; Heavy no fue Invocado por Sacrificio.",
      "resources_to_keep": "El jefe de Nivel alto en Campo y las cartas robadas que realmente sean útiles.",
      "alternative": "Si Death Doom desaparece antes del efecto, verifica que aún controlas un Demonio válido; si no, conserva Phaser.",
      "related_route_ids": [
        "705:A09:TRADEIN:PHASER01"
      ]
    },
    {
      "id": "late",
      "title": "Juego tardío: reconstruir Death Doom sin Skill",
      "objective": "Usar Phaser y los Demonios acumulados para un nuevo jefe de limpieza.",
      "situation": "Una copia de Heavy Metal en Campo, otra en Cementerio, Phaser y Death Doom disponibles.",
      "card_cids": [
        15441,
        16330,
        16331
      ],
      "actions": [
        "Invoca Phaser en una zona libre y aplica su efecto con el Demonio de Nivel alto presente.",
        "Recupera la segunda copia de Heavy Metal desde Cementerio en Defensa.",
        "Sacrifica ambos Heavy para Invocar a Death Doom y resuelve su efecto contra objetivos elegibles."
      ],
      "expected_result": "Death Doom de 2500 ATK y monstruos rivales destruidos si el efecto y las condiciones lo permiten.",
      "resources_to_keep": "Una copia de Phaser o recursos de recuperación para otro turno.",
      "alternative": "Si solo reúnes un Heavy, mantén el cuerpo en lugar de declarar una Invocación que exige dos Tributos.",
      "related_route_ids": [
        "705:A09:V11:PHASER:REVIVE:DEATHDOOM"
      ]
    },
    {
      "id": "weak_hand",
      "title": "Mano débil: no gastar Phaser antes del jefe",
      "objective": "Conservar la recuperación cuando falta el Demonio de Nivel alto que la habilita.",
      "situation": "Phaser o Canjear disponibles, pero todavía no hay un Demonio Nivel 7+ boca arriba.",
      "card_cids": [
        16330,
        17721,
        15441,
        18646,
        15913
      ],
      "actions": [
        "Si tienes Canjear y un monstruo de Nivel 8 elegible, envíalo de mano al Cementerio como requisito y roba dos cartas. Decide con las cartas que realmente obtuviste.",
        "Reserva Phaser hasta controlar un Demonio de Nivel 7 o superior y tener un objetivo en Cementerio.",
        "Utiliza una defensa disponible si aún no puedes reunir los dos Tributos."
      ],
      "expected_result": "Mano reorganizada o defensa del turno; no se obtiene una recuperación ilegal de Phaser.",
      "resources_to_keep": "Phaser y el jefe que pueda habilitar su efecto después.",
      "alternative": "Si no puedes pagar Canjear, conserva el Nivel alto para la apertura futura con Skill.",
      "related_route_ids": [
        "705:A09:TRADEIN:PHASER01"
      ]
    },
    {
      "id": "disruption",
      "title": "Interrupción: comprobar qué jefe permanece",
      "objective": "Reaccionar a la retirada de un material sin tratar la colocación por Skill como Invocación por Sacrificio.",
      "situation": "El rival retira un Demonio antes de la Invocación del jefe o impide una recuperación.",
      "card_cids": [
        16331,
        15441,
        19761,
        16330
      ],
      "actions": [
        "Recuenta los Demonios boca arriba que realmente quedan para Sacrificar.",
        "Si falta un Tributo y controlas un jefe de Nivel 7+, verifica si Phaser puede recuperar otro Demonio elegible.",
        "Si no consigues ambos materiales, conserva el jefe de mano y evita declarar su efecto de Invocación por Sacrificio."
      ],
      "expected_result": "Jefe solo si se reúnen los materiales requeridos; si no, una posición que preserva recursos.",
      "resources_to_keep": "Phaser y el monstruo recuperable que aún está en Cementerio.",
      "alternative": "Si no queda Demonio de Nivel alto en Campo, no uses Phaser contando un requisito perdido.",
      "related_route_ids": [
        "705:A09:V11:PHASER:REVIVE:DEATHDOOM",
        "705:A09:OVERTURE:DEATHDOOM01"
      ]
    },
    {
      "id": "win_condition",
      "title": "Ganar: elegir ataque aumentado o penetración",
      "objective": "Aprovechar la defensa rival y el ATK temporal sin inventar ataques directos adicionales.",
      "situation": "Skill permitida con los materiales correspondientes; rival con monstruo boca arriba de ATK conocido o defensor de DEF conocida.",
      "card_cids": [
        15441,
        16344,
        19761,
        16331
      ],
      "actions": [
        "Con Heavy, identifica al objetivo de menor Nivel aplicable y calcula su aumento de ATK solo si resuelve.",
        "Con Kheiron, paga el envío de la carta superior y aplica la penetración al Demonio elegido si existe el requisito.",
        "Si Kheiron tiene 2300 ATK y combate contra un defensor de 500 DEF, la perforación del escenario produce 1800 LP. Respeta también el límite de un ataque directo por monstruo de Nivel original 7+ impuesto por la Skill."
      ],
      "expected_result": "Heavy alcanza 4100 en el ejemplo de objetivo de 1600 ATK; Kheiron inflige 1800 contra DEF 500 en el caso documentado.",
      "resources_to_keep": "Un jefe que pueda permanecer en Campo si no consigues cerrar los LP rivales.",
      "alternative": "Si los objetivos no favorecen el ataque, elige la limpieza de Death Doom o Progrock.",
      "related_route_ids": [
        "705:A09:OVERTURE:HEAVY01",
        "705:A09:OVERTURE:KHEIRON01",
        "705:A09:OVERTURE:PROGROCK01"
      ]
    },
    {
      "id": "common_errors",
      "title": "Errores: Sacrificio y Skill no son lo mismo",
      "objective": "Evitar aplicar efectos de jefes a monstruos colocados o recuperados sin su Invocación exigida.",
      "situation": "Se usa Hard Rock Overture, Canjear o Phaser con Rebelde Real.",
      "card_cids": [
        16330,
        16331,
        15441,
        19761,
        17721
      ],
      "actions": [
        "La Skill coloca los materiales en Defensa; eso no equivale a Invocarlos por Sacrificio.",
        "Heavy Metal recuperado por Phaser no obtiene por ello su efecto de Invocación por Sacrificio.",
        "No sumes Death Doom, Heavy y Progrock como tres jefes desde la misma mano: son destinos alternativos de los dos Tributos."
      ],
      "expected_result": "Un estado de Campo coherente, sin retiradas ni ataques atribuidos al jefe incorrecto.",
      "resources_to_keep": "Los dos Tributos efectivos y el objetivo que requiere el jefe elegido.",
      "alternative": "Si no puedes Invocar por Sacrificio, utiliza el cuerpo recuperado como material futuro o defensa.",
      "related_route_ids": [
        "705:A09:OVERTURE:DEATHDOOM01",
        "705:A09:OVERTURE:HEAVY01",
        "705:A09:OVERTURE:PROGROCK01",
        "705:A09:TRADEIN:PHASER01"
      ]
    }
  ]
}
```

## Revisión técnica y pedagógica individual — 23-11-2026, revisión 3

Se separó la preparación del primer turno de las tres líneas de turno 2 con Hard Rock Overture, se nombraron las defensas y los dos Tributos. En la fase de mano débil, Canjear exige el Nivel 8 y Phaser necesita un Demonio de Nivel 7+ en Campo. La Skill local y una apertura autónoma de turno uno siguen requiriendo evidencia antes de T4.

Se han leído las ocho lecciones. T2: ajuste de acciones y condiciones realizado en esta acta; T1/T3: contraste contra fuentes del expediente y rutas concretas, sin afirmar cotejo exhaustivo de todos los efectos; T4/T5: abiertos hasta reconciliar el JSON/Markdown, comprobar semántica restante y ejecutar las pruebas de la nueva revisión. No se ejecuta A02–A10 ni se aplica banlist.
