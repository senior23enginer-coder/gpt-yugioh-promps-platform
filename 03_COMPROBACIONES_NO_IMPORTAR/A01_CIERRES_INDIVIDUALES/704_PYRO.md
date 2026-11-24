# A01 — cierre individual Pyro (704)

> **ESTADO VIGENTE: A01 REABIERTO — revisión funcional 2.** Los checks históricos inferiores conservan su valor de prueba técnica anterior, no certifican el nuevo estándar. Revalidar T1–T5 individualmente: diagnóstico, ocho lecciones prácticas, evidencia por lección, revisión semántica y lectura completa en navegador real. No cerrar por longitud, paridad o importación.

23-11-2026. Rush Duel, Skill Alchemy Blaze registrada en reglas locales. Main 30 / Extra 5 / Side 0 / Reserva 0; 17 identidades, tres rutas. No se añade Side ni Extra. Skill separada del inventario físico; no se evalúa banlist.

Fuentes exactas: Markdown `e21199e8709be27a6ecba01fee7151b7b67a22e5`, JSON `2966c0da5b33ba9e909e495329c342101a46616c`. Referencia de Skill del expediente: https://www.duellinksmeta.com/skills/Alchemy%20Blaze.

## T1 y T3 — diagnóstico y propósitos

Combo/Midrange Piro/FUEGO mediante materiales nombrados y Fusión Rush. El plan principal reúne Cromatográfagas y Superasistente Ember para Arquero; Salamandra Quimicalizada y Superasistente para Salamandra Alquimicalizada. Orden Secreta, Hiperasistente Ember y Gobernante de las Llamas aportan extensiones distintas. Alchemy Blaze es una Skill local condicional desde el turno 2, no una carta del Main ni una invocación garantizada. Victoria por presión de combate o retirada de retaguardia, sin daño garantizado. Riesgos: materiales nombrados no disponibles, falta de zona, destrucción de M/T propias, Skill no elegible y recursos del GY agotados.

| Propósito | CID, zona y fuente de identidad | Condición y riesgo | Ruta documental existente |
|---|---|---|---|
| Fusión de presión | [18583](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18583&ope=2), [17963](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17963&ope=2), [16934](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2), [17212](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17212&ope=2) Main; [19990](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19990&ope=2) Extra | Orden Secreta extiende Normal Nivel 7; Fusión usa materiales boca arriba del propio Campo. Arquero requiere devolver Normal Piro Nivel 7 del GY a la cima del Deck para su presión de ATK. No asumir combate ni daño. | `704:A09:ALCHEMY:ARCHER01` |
| Fusión de control | [17868](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17868&ope=2), [17963](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17963&ope=2), [16934](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2) Main; [18614](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18614&ope=2) Extra | Salamandra Alquimicalizada destruye M/T de ambos campos en la ventana de su Invocación Especial; la reducción de ATK depende de Magias efectivamente destruidas. No asumir limpieza selectiva ni afectar monstruos por destrucción. | `704:A09:ALCHEMY:SALAMANDRA02` |
| Extensión y penetración | [19291](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19291&ope=2), [17868](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17868&ope=2), [15204](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15204&ope=2) Main | Hiperasistente necesita monstruo rival y enviarse desde Campo para traer Piro Nivel 7+ de mano. El aumento de ATK requiere Superasistente en GY. Atraviesa concede penetración; no asegura ataque legal ni daño. | `704:A09:V11:HYPER:CHEMICALIZED:PIERCE` |
| Consistencia por Skill | Skill Alchemy Blaze; [18583](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18583&ope=2), [17868](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17868&ope=2), [17963](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17963&ope=2) Main | Turno 2+, revelación elegible y todos los monstruos del Deck Piro/FUEGO DEF ≥100 conforme al expediente. Selección de dos cartas y envío posterior de una de mano; no tratar la Skill como robo aleatorio. | `704:A09:ALCHEMY:ARCHER01`, `704:A09:ALCHEMY:SALAMANDRA02` |
| Presencia y remoción | [17285](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17285&ope=2), [17926](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17926&ope=2), [16171](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16171&ope=2) Main | Germalewe es Normal; Gobernante cuenta por dos Tributos solo para la Invocación por Sacrificio compatible, no para Fusión. Fuego Ardiente necesita dos Piros boca arriba y M/T rival elegible para retirada. | PENDIENTE_DE_ENLACE_A05_A09 |
| Defensa y recursos | [18646](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18646&ope=2), [15913](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15913&ope=2), [16372](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16372&ope=2) Main | Gelatina y Agujero Trampa tienen ventanas diferentes; comprobar Nivel del atacante o ATK de monstruo Invocado Normalmente. No convertir Olla de la Codicia en búsqueda determinista. | PENDIENTE_DE_ENLACE_A05_A09 |

CID, zonas, rutas y Skill cotejados contra el expediente versionado; enlaces Rushdb de identidad/texto y referencia de Skill del expediente. No se afirma nueva auditoría exhaustiva de reglas ni simulación de las rutas. No crear effect_id/motor_id inexistentes.

## Checklist
- [x] T1: diagnóstico específico del formato, Skill, motores, riesgos y condición de victoria.
- [x] T2: seis campos del perfil, cuatro cartas destacadas y cuatro fases.
- [x] T3: matriz de propósitos, CID, zonas, fuentes, condiciones y rutas existentes o pendiente explícito.
- [x] T4: [CI #45275755236](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45275755236) PASS, estilo 179/190, resumen 244/250, paridad de seis campos.
- [x] T5: misma CI, job 138046988317, commit Platform `47c7552b61e446ec932d72fdbb7291cd95317967`: ISOLATED_PASS importación/exportación/reimportación, 17 fotos, tres rutas, ocho rechazos y cantidades conservadas. Presentación a 390 y 1280 px PASS. Job finalizado exitosamente.

Resultado: **5/5 acreditadas en entorno aislado**. Cero importaciones en producción; no iniciar A02.

## Revisión funcional 2 — ocho lecciones propuestas

Redacción individual basada en inventario y aperturas/resultados del paquete real, con condiciones y alternativas. No se modifica ningún efecto ni ruta; enlaces oficiales para cotejo. El nuevo cierre queda pendiente de la aplicación del contrato, verificación semántica completa y prueba real de interfaz.

- first: cartas [Cromatográfagas](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18583&ope=2), [Superasistente Ember](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17963&ope=2), [Fusión](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2), [Amparo del Protector Estelar](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19700&ope=2), [Gelatina Defensiva](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18646&ope=2); rutas fuente sin ruta autónoma acreditada; preparación condicional.
- second: cartas [Cromatográfagas](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18583&ope=2), [Orden Secreta](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17212&ope=2), [Superasistente Ember](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17963&ope=2), [Fusión](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2), [Arquero Ígneo Supergráfagas](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19990&ope=2); rutas fuente `704:A09:ALCHEMY:ARCHER01`.
- mid: cartas [Salamandra Quimicalizada](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17868&ope=2), [Hiperasistente Ember](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19291&ope=2), [Superasistente Ember](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17963&ope=2), [Fusión](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2), [Salamandra Alquimicalizada](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18614&ope=2), [¡Atraviesa!](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15204&ope=2); rutas fuente `704:A09:ALCHEMY:SALAMANDRA02`.
- late: cartas [Hiperasistente Ember](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19291&ope=2), [Salamandra Quimicalizada](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17868&ope=2), [¡Atraviesa!](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15204&ope=2), [Superasistente Ember](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17963&ope=2); rutas fuente `704:A09:V11:HYPER:CHEMICALIZED:PIERCE`.
- weak_hand: cartas [Hiperasistente Ember](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19291&ope=2), [Salamandra Quimicalizada](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17868&ope=2), [¡Atraviesa!](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15204&ope=2), [Fusión](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2); rutas fuente `704:A09:V11:HYPER:CHEMICALIZED:PIERCE`.
- disruption: cartas [Hiperasistente Ember](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19291&ope=2), [Cromatográfagas](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18583&ope=2), [Superasistente Ember](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17963&ope=2), [Fusión](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2), [Orden Secreta](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17212&ope=2); rutas fuente `704:A09:ALCHEMY:ARCHER01`, `704:A09:ALCHEMY:SALAMANDRA02`.
- win_condition: cartas [Arquero Ígneo Supergráfagas](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19990&ope=2), [Salamandra Alquimicalizada](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18614&ope=2), [Salamandra Quimicalizada](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17868&ope=2), [¡Atraviesa!](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15204&ope=2); rutas fuente `704:A09:ALCHEMY:ARCHER01`, `704:A09:ALCHEMY:SALAMANDRA02`.
- common_errors: cartas [Cromatográfagas](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18583&ope=2), [Hiperasistente Ember](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19291&ope=2), [Superasistente Ember](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17963&ope=2), [Fusión](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16934&ope=2), [Salamandra Alquimicalizada](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18614&ope=2); rutas fuente `704:A09:ALCHEMY:ARCHER01`, `704:A09:ALCHEMY:SALAMANDRA02`, `704:A09:V11:HYPER:CHEMICALIZED:PIERCE`.

<!-- A01_ESTRATEGIA_REVISADA -->
```json
{
  "schema": "station-x-player-strategy/1",
  "sections": [
    {
      "id": "first",
      "title": "Primero: preparar materiales sin Skill anticipada",
      "objective": "Organizar una Fusión futura sin activar Alchemy Blaze antes del turno permitido.",
      "situation": "Primer turno del duelo, Fusión en mano y materiales Piro accesibles; Alchemy Blaze aún no está disponible. Comprueba si puedes reunir Cromatográfagas + Superasistente Ember o Salamandra Quimicalizada + Superasistente Ember boca arriba.",
      "card_cids": [
        18583,
        17963,
        16934,
        17868,
        19990,
        18614,
        18646,
        19291
      ],
      "actions": [
        "Elige la pareja de materiales de acuerdo con el destino que conservas en Extra: Cromatográfagas + Superasistente para Arquero, o Salamandra Quimicalizada + Superasistente para Salamandra Alquimicalizada.",
        "Si no reúnes la pareja legal, conserva Fusión y utiliza una defensa disponible como Gelatina Defensiva en su ventana correspondiente.",
        "Reserva Alchemy Blaze hasta turno 2 o posterior y revisa los requisitos de construcción, revelación y cartas disponibles en Deck."
      ],
      "expected_result": "Preparación defensiva y recursos para el próximo turno. No hay una apertura autónoma de primer turno certificada en las tres rutas actuales.",
      "resources_to_keep": "Fusión y los nombres de material que no puedas recuperar inmediatamente.",
      "alternative": "Conserva Hiperasistente para un turno con monstruo rival, cuando pueda desarrollar Salamandra Quimicalizada sin Skill.",
      "related_route_ids": []
    },
    {
      "id": "second",
      "title": "Segundo: Arquero con Orden Secreta",
      "objective": "Convertir Cromatográfagas en una amenaza de ataque mediante una Fusión concreta.",
      "situation": "Turno 2 o posterior, Cromatográfagas y Orden Secreta en mano; Skill disponible; Superasistente y Fusión en Deck.",
      "card_cids": [
        18583,
        17212,
        17963,
        16934,
        19990
      ],
      "actions": [
        "Aplica Alchemy Blaze únicamente si la Skill local está habilitada, el turno y la construcción son válidos y su resolución coloca Cromatográfagas en Cementerio y permite disponer de Superasistente y Fusión. Comprueba esos resultados antes de continuar.",
        "Usa Orden Secreta sobre Cromatográfagas en Cementerio; Invoca también Superasistente desde mano.",
        "Activa Fusión con Cromatográfagas y Superasistente boca arriba para Invocar Arquero Ígneo Supergráfagas. Aplica su aumento de ATK solo si se cumplen sus condiciones; 5500 corresponde al escenario enlazado."
      ],
      "expected_result": "Arquero con 5500 ATK durante ese turno en la apertura documentada, no daño automático.",
      "resources_to_keep": "Superasistente y Fusión disponibles en Deck antes de usar la Skill.",
      "alternative": "Si Orden Secreta o un material falla, no anuncies Arquero; considera una salida Piro independiente.",
      "related_route_ids": [
        "704:A09:ALCHEMY:ARCHER01"
      ]
    },
    {
      "id": "mid",
      "title": "Juego medio: retirar las Magias y Trampas",
      "objective": "Usar Salamandra Alquimicalizada para limpiar el Campo cuando compense perder las propias Magias y Trampas.",
      "situation": "Salamandra Quimicalizada, Hiperasistente y una carta para el descarte de Skill; turno permitido y monstruo rival.",
      "card_cids": [
        17868,
        19291,
        17963,
        16934,
        18614,
        15204
      ],
      "actions": [
        "Aplica Alchemy Blaze revelando Salamandra y completa los recursos exigidos.",
        "Invoca Hiperasistente con un monstruo rival presente. Envía Hiperasistente boca arriba al Cementerio como coste y desarrolla Salamandra Quimicalizada únicamente si su efecto resuelve.",
        "Invoca Superasistente y fusiona los dos nombres correctos; evalúa las Magias y Trampas que serán destruidas."
      ],
      "expected_result": "Salamandra Alquimicalizada de 3000 ATK; reducción temporal según las Magias realmente destruidas.",
      "resources_to_keep": "Una zona disponible para Superasistente y Fusión hasta que ambos materiales estén boca arriba.",
      "alternative": "Si perder tus propias defensas es perjudicial, conserva la Fusión para otro momento.",
      "related_route_ids": [
        "704:A09:ALCHEMY:SALAMANDRA02"
      ]
    },
    {
      "id": "late",
      "title": "Juego tardío: presión sin consumir la Skill",
      "objective": "Aprovechar Salamandra Quimicalizada con penetración cuando no hay una Fusión completa.",
      "situation": "Hiperasistente y ¡Atraviesa! disponibles, Salamandra accesible; rival con monstruo en Defensa elegible.",
      "card_cids": [
        19291,
        17868,
        15204,
        17963
      ],
      "actions": [
        "Invoca Hiperasistente y usa su efecto legal para desarrollar Salamandra Quimicalizada.",
        "No sumes 800 ATK si Superasistente no está en Cementerio.",
        "Activa ¡Atraviesa! sobre Salamandra y calcula el daño contra la DEF real."
      ],
      "expected_result": "Salamandra con penetración hasta el final del turno, sin prometer un daño determinado.",
      "resources_to_keep": "La Skill y Fusión si todavía no fueron necesarias.",
      "alternative": "Si no existe un combate favorable, conserva Salamandra y la Magia para una oportunidad posterior.",
      "related_route_ids": [
        "704:A09:V11:HYPER:CHEMICALIZED:PIERCE"
      ]
    },
    {
      "id": "weak_hand",
      "title": "Mano débil: una salida de Hiperasistente",
      "objective": "Desarrollar un monstruo útil aunque no hayas reunido la pareja de Fusión.",
      "situation": "Hiperasistente en mano y una Salamandra accesible mediante su efecto; existe el requisito rival.",
      "card_cids": [
        19291,
        17868,
        15204,
        16934
      ],
      "actions": [
        "Invoca Hiperasistente y comprueba su condición antes de enviarlo al Cementerio.",
        "Si resuelve, desarrolla Salamandra; usa ¡Atraviesa! únicamente si mejora un combate real.",
        "Conserva Fusión si Superasistente no está disponible en Campo."
      ],
      "expected_result": "Una amenaza Piro que puede combatir sin depender de Alchemy Blaze.",
      "resources_to_keep": "Fusión y la Skill aún no usada para reconstruir.",
      "alternative": "Si el efecto de Hiperasistente no es viable, usa la defensa disponible en vez de gastar materiales inexistentes.",
      "related_route_ids": [
        "704:A09:V11:HYPER:CHEMICALIZED:PIERCE"
      ]
    },
    {
      "id": "disruption",
      "title": "Interrupción: rescatar la línea de Fusión",
      "objective": "Evitar activar Fusión después de que un material deje de estar disponible.",
      "situation": "Una respuesta rival retira Hiperasistente, Cromatográfagas o Superasistente antes de la Fusión.",
      "card_cids": [
        19291,
        18583,
        17963,
        16934,
        17212
      ],
      "actions": [
        "Comprueba si el material fue enviado como coste o retirado por el efecto rival.",
        "Si Orden Secreta sigue disponible y Cromatográfagas está en una zona elegible, evalúa su Invocación antes de usar Fusión.",
        "Solo activa Fusión cuando ambos materiales expresos sigan boca arriba en tu Campo."
      ],
      "expected_result": "Una Fusión únicamente si se reconstruye la pareja; en caso contrario se preserva la Magia.",
      "resources_to_keep": "La carta de recuperación que todavía no se haya usado y una defensa para el siguiente turno.",
      "alternative": "Si no recuperas el segundo material, conserva la amenaza Piro que sí esté en Campo.",
      "related_route_ids": [
        "704:A09:ALCHEMY:ARCHER01",
        "704:A09:ALCHEMY:SALAMANDRA02"
      ]
    },
    {
      "id": "win_condition",
      "title": "Ganar: escoger el jefe según el obstáculo",
      "objective": "Convertir una Fusión en daño efectivo según el Campo, en vez de declarar un OTK por su ATK.",
      "situation": "Puedes desarrollar Arquero o Salamandra; conoces las defensas y los LP del adversario.",
      "card_cids": [
        19990,
        18614,
        17868,
        15204
      ],
      "actions": [
        "Elige Arquero cuando el ataque temporal de 5500 permita superar las amenazas del escenario.",
        "Elige Salamandra Alquimicalizada cuando retirar Magias y Trampas sea más importante que aumentar el ATK.",
        "Recalcula la fuerza de los monstruos tras la resolución y solo entonces declara los ataques."
      ],
      "expected_result": "Daño de batalla calculado o Campo rival debilitado; ninguna Fusión garantiza victoria por sí sola.",
      "resources_to_keep": "Una defensa o siguiente material si los LP del rival no llegan a cero.",
      "alternative": "Si no puedes cerrar, mantén el jefe que mejor sostenga el próximo turno.",
      "related_route_ids": [
        "704:A09:ALCHEMY:ARCHER01",
        "704:A09:ALCHEMY:SALAMANDRA02"
      ]
    },
    {
      "id": "common_errors",
      "title": "Errores: materiales y límites de Alchemy Blaze",
      "objective": "Respetar requisitos Rush y no confundir una Skill local con una carta de la mano.",
      "situation": "Vas a usar Alchemy Blaze, Hiperasistente, Fusión o la reducción de Salamandra.",
      "card_cids": [
        18583,
        19291,
        17963,
        16934,
        18614
      ],
      "actions": [
        "Comprueba turno 2+, revelación y composición Piro/FUEGO con DEF requerida antes de utilizar la Skill.",
        "Fusión requiere los nombres correctos boca arriba en Campo; las múltiples Normales Rush no eliminan ese requisito.",
        "La destrucción de Salamandra alcanza las Magias y Trampas propias y rivales; no sumes una reducción por cartas no destruidas."
      ],
      "expected_result": "Uso de Skill y Fusiones acorde con su construcción, costes y estado real.",
      "resources_to_keep": "Los materiales de Fusión y los espacios de monstruo necesarios.",
      "alternative": "Si la Skill local no está habilitada, utiliza las rutas independientes de Hiperasistente y la Fusión que puedas reunir.",
      "related_route_ids": [
        "704:A09:ALCHEMY:ARCHER01",
        "704:A09:ALCHEMY:SALAMANDRA02",
        "704:A09:V11:HYPER:CHEMICALIZED:PIERCE"
      ]
    }
  ]
}
```

## Revisión técnica y pedagógica individual — 23-11-2026, revisión 3

El primer turno se identifica como preparación, no como combo certificado con Skill. Se exigen nombres concretos para cada Fusión y se hace explícito que las rutas Alchemy Blaze dependen de una Skill local. La ruta de Arquero debe cotejar la transición de revelación a Cementerio, búsqueda de Superasistente/Fusión y efecto del jefe con la fuente local original; no se inventa el paso ausente. Se conserva A01 abierto para esos puntos.

Se han leído las ocho lecciones. T2: ajuste de acciones y condiciones realizado en esta acta; T1/T3: contraste contra fuentes del expediente y rutas concretas, sin afirmar cotejo exhaustivo de todos los efectos; T4/T5: abiertos hasta reconciliar el JSON/Markdown, comprobar semántica restante y ejecutar las pruebas de la nueva revisión. No se ejecuta A02–A10 ni se aplica banlist.
