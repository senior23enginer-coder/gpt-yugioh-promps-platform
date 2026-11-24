# A01 — cierre individual Dark Magician (707)

> **ESTADO VIGENTE: A01 REABIERTO — revisión funcional 2.** Los checks históricos inferiores conservan su valor de prueba técnica anterior, no certifican el nuevo estándar. Revalidar T1–T5 individualmente: diagnóstico, ocho lecciones prácticas, evidencia por lección, revisión semántica y lectura completa en navegador real. No cerrar por longitud, paridad o importación.

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

## Revisión funcional 2 — ocho lecciones propuestas

Redacción individual basada en inventario y aperturas/resultados del paquete real, con condiciones y alternativas. No se modifica ningún efecto ni ruta; enlaces oficiales para cotejo. El nuevo cierre queda pendiente de la aplicación del contrato, verificación semántica completa y prueba real de interfaz.

- first: cartas [Mago Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15410&ope=2), [Orden Secreta](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17212&ope=2), [Piedra de los Magos Oscuros](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19598&ope=2), [Chica Maga Oscura](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16371&ope=2); rutas fuente `707:A09:SECRETORDER:DM01`, `707:A09:JEWEL:PAIR01`.
- second: cartas [Mago Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15410&ope=2), [Orden Secreta](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17212&ope=2), [Mil Cuchillos](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15450&ope=2), [Ataque Mágico Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15451&ope=2); rutas fuente `707:A09:SECRETORDER:DM01`, `707:A09:SECRETORDER:DM:KNIVES02`.
- mid: cartas [Chica Maga Oscura](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16371&ope=2), [Mago Oscuro Sabio](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19597&ope=2), [Mago Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15410&ope=2), [Mil Cuchillos](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15450&ope=2), [Ataque Mágico Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15451&ope=2); rutas fuente `707:A09:ILLUSION:SAGE01`, `707:A09:ILLUSION:SAGE:KNIVES02`.
- late: cartas [Mago Oscuro Sabio](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19597&ope=2), [Lily Aniquiladora](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=20305&ope=2), [Hechicero Eliminador Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19773&ope=2), [Mil Cuchillos](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15450&ope=2), [Ataque Mágico Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15451&ope=2); rutas fuente `707:A09:EXECUTOR:KNIVES01`, `707:A09:EXECUTOR:DARKMAGIC01`.
- weak_hand: cartas [Mil Cuchillos](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15450&ope=2), [Ataque Mágico Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15451&ope=2), [Mago Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15410&ope=2), [Hechicero Eliminador Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19773&ope=2), [Piedra de los Magos Oscuros](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19598&ope=2), [Mago Oscuro Sabio](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19597&ope=2); rutas fuente `707:A09:ILLUSION:SAGE:KNIVES02`, `707:A09:JEWEL:PAIR01`.
- disruption: cartas [Orden Secreta](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17212&ope=2), [Mago Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15410&ope=2), [Mil Cuchillos](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15450&ope=2), [Mago Oscuro Sabio](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19597&ope=2), [Hechicero Eliminador Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19773&ope=2); rutas fuente `707:A09:SECRETORDER:DM:KNIVES02`, `707:A09:ILLUSION:SAGE:KNIVES02`.
- win_condition: cartas [Mago Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15410&ope=2), [Chica Maga Oscura](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16371&ope=2), [Orden Secreta](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17212&ope=2), [Piedra de los Magos Oscuros](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19598&ope=2), [Mil Cuchillos](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15450&ope=2), [Ataque Mágico Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15451&ope=2); rutas fuente `707:A09:JEWEL:PAIR:KNIVES03`, `707:A09:SECRETORDER:DM01`.
- common_errors: cartas [Mago Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15410&ope=2), [Hechicero Eliminador Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19773&ope=2), [Mil Cuchillos](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15450&ope=2), [Ataque Mágico Oscuro](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15451&ope=2), [Gaia el Campeón Dragón Rápido](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19995&ope=2), [Gaia el Campeón Dragón](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=18298&ope=2), [Gaia, el Conquistador de Campeones](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19323&ope=2); rutas fuente `707:A09:ILLUSION:SAGE01`, `707:A09:EXECUTOR:DARKMAGIC01`, `707:A09:SECRETORDER:DM01`.

<!-- A01_ESTRATEGIA_REVISADA -->
```json
{
  "schema": "station-x-player-strategy/1",
  "sections": [
    {
      "id": "first",
      "title": "Primero: preparar el nombre de Mago Oscuro",
      "objective": "Establecer presión con el monstruo correcto sin activar la Skill antes del turno permitido.",
      "situation": "Mago Oscuro y Orden Secreta disponibles, o Piedra con Mago Oscuro y Chica Maga Oscura en mano.",
      "card_cids": [
        15410,
        17212,
        19598,
        16371,
        15450,
        15451,
        19773
      ],
      "actions": [
        "Con Orden Secreta y Mago Oscuro Normal de Nivel 7 en mano, activa la Magia para Invocarlo Especialmente; gana 700 ATK y protección contra destrucción por Trampas rivales durante ese turno.",
        "Con Piedra de los Magos Oscuros, Mago Oscuro y Chica Maga Oscura en mano, activa Piedra para Invocar ambos en dos zonas libres. No se aplican Sacrificios.",
        "Guarda Mil Cuchillos y Ataque Mágico Oscuro si no hay una amenaza elegible. Ambas exigen controlar un monstruo que tenga el nombre Mago Oscuro."
      ],
      "expected_result": "Mago Oscuro disponible para las Magias de nombre o ambos Magos con Piedra; no se activa Illusion of Execution antes del turno 2.",
      "resources_to_keep": "La Skill para una ocasión posterior y las Magias de retirada.",
      "alternative": "Si Mago Oscuro no está accesible, prepara cuerpos para Hechicero Eliminador o reserva la defensa disponible.",
      "related_route_ids": [
        "707:A09:SECRETORDER:DM01",
        "707:A09:JEWEL:PAIR01"
      ]
    },
    {
      "id": "second",
      "title": "Segundo: retirar monstruos o Magias y Trampas",
      "objective": "Seleccionar la Magia de limpieza según el obstáculo real del adversario.",
      "situation": "Mago Oscuro y Orden Secreta en mano; Mil Cuchillos o Ataque Mágico Oscuro según el objetivo.",
      "card_cids": [
        15410,
        17212,
        15450,
        15451
      ],
      "actions": [
        "Activa Orden Secreta para Invocar Mago Oscuro y comprueba el aumento de 700 ATK de ese turno.",
        "Si necesitas eliminar un monstruo elegible, usa Mil Cuchillos con Mago Oscuro boca arriba.",
        "Si necesitas limpiar Magias y Trampas rivales, utiliza Ataque Mágico Oscuro en lugar de presumir la otra Magia."
      ],
      "expected_result": "Mago Oscuro de 3200 ATK temporal y la retirada que haya resuelto; la Normal permanece disponible.",
      "resources_to_keep": "Una Magia de retirada para otro turno si no es necesaria ahora.",
      "alternative": "Si falta Mago Oscuro, considera la línea de Hechicero Eliminador con dos materiales.",
      "related_route_ids": [
        "707:A09:SECRETORDER:DM01",
        "707:A09:SECRETORDER:DM:KNIVES02"
      ]
    },
    {
      "id": "mid",
      "title": "Juego medio: Sabio e Illusion of Execution",
      "objective": "Recuperar acceso a Mago Oscuro desde Cementerio sin inventar las cartas excavadas.",
      "situation": "Turno 2+, Skill local sin usar, Chica Maga Oscura y Sabio en mano, Mago Oscuro en Deck y al menos tres cartas para excavar.",
      "card_cids": [
        16371,
        19597,
        15410,
        15450,
        15451
      ],
      "actions": [
        "Desde turno 2, con la Skill local Illusion of Execution habilitada y sin usar, revela Chica Maga Oscura y excava tres cartas. Puedes añadir una Magia excavada; las demás van al Cementerio.",
        "Si Mago Oscuro no fue enviado por la excavación, aplica la opción de enviarlo desde Deck al Cementerio.",
        "Invoca Sabio, envía Chica Maga Oscura según su efecto, roba una carta desconocida e Invoca Mago Oscuro desde Cementerio."
      ],
      "expected_result": "Mago Oscuro y Sabio en Campo; la Magia excavada y el robo dependen de las cartas reales.",
      "resources_to_keep": "La Magia de retirada adecuada que permanezca en mano.",
      "alternative": "Si ya usaste la Skill o no cumples su construcción local, considera Orden Secreta o el jefe de Sacrificio.",
      "related_route_ids": [
        "707:A09:ILLUSION:SAGE01",
        "707:A09:ILLUSION:SAGE:KNIVES02"
      ]
    },
    {
      "id": "late",
      "title": "Juego tardío: usar el nombre temporal del Hechicero",
      "objective": "Sustituir el acceso al único Mago Oscuro LEGEND cuando no esté disponible.",
      "situation": "Sabio, Lily Aniquiladora, Hechicero Eliminador y la Magia de retirada apropiada en mano.",
      "card_cids": [
        19597,
        20305,
        19773,
        15450,
        15451
      ],
      "actions": [
        "Invoca normalmente Sabio y Lily sin gastar sus efectos opcionales.",
        "Sacrifica Sabio y Lily para la Invocación Normal por Sacrificio de Hechicero Eliminador de Nivel 7 (2500 ATK). Activa su efecto enviando la carta superior del Deck al Cementerio como requisito; su nombre pasa a Mago Oscuro hasta fin de turno.",
        "Una vez tenga el nombre temporal Mago Oscuro, utiliza la Magia de retirada que corresponda al Campo rival."
      ],
      "expected_result": "Hechicero de 2500 ATK, tratado como Mago Oscuro hasta final del turno, y la retirada elegida si resuelve.",
      "resources_to_keep": "Una forma de acceso futuro al nombre correcto cuando termine el cambio de nombre.",
      "alternative": "Si no puedes cambiar el nombre, conserva la Magia y utiliza el Hechicero como atacante.",
      "related_route_ids": [
        "707:A09:EXECUTOR:KNIVES01",
        "707:A09:EXECUTOR:DARKMAGIC01"
      ]
    },
    {
      "id": "weak_hand",
      "title": "Mano débil: conservar la pareja correcta",
      "objective": "No gastar las Magias de nombre antes de disponer de su habilitador.",
      "situation": "Tienes Mil Cuchillos o Ataque Mágico Oscuro, pero no controlas Mago Oscuro ni al Hechicero con nombre cambiado.",
      "card_cids": [
        15450,
        15451,
        15410,
        19773,
        19598,
        19597
      ],
      "actions": [
        "Comprueba si Orden Secreta o Piedra pueden poner un Mago Oscuro real en Campo con la mano actual.",
        "Si tienes Sabio y los requisitos de Skill, reserva la carta de Nivel alto para la recuperación documentada.",
        "Si ninguna vía existe, conserva la Magia de retirada y prepara los Lanzadores de Conjuros disponibles."
      ],
      "expected_result": "Un acceso legal al nombre correcto si se reúnen las piezas; en caso contrario una defensa de recursos.",
      "resources_to_keep": "Mil Cuchillos o Ataque Mágico Oscuro hasta que el nombre esté disponible.",
      "alternative": "Si falta una pieza del acceso, no atribuyas un Mago Oscuro al resultado de una excavación desconocida.",
      "related_route_ids": [
        "707:A09:ILLUSION:SAGE:KNIVES02",
        "707:A09:JEWEL:PAIR01"
      ]
    },
    {
      "id": "disruption",
      "title": "Interrupción: verificar el nombre tras la respuesta",
      "objective": "Evitar activar una Magia de nombre después de perder su condición de activación.",
      "situation": "Orden Secreta fue negada o el rival retiró el objetivo de Mil Cuchillos.",
      "card_cids": [
        17212,
        15410,
        15450,
        19597,
        19773
      ],
      "actions": [
        "Si Orden Secreta no Invocó Mago Oscuro, no declares Mil Cuchillos desde esa mano mínima.",
        "Si Sabio ya dejó a Mago Oscuro en Campo, comprueba si el nombre sigue disponible antes de activar otra Magia.",
        "Si el objetivo de Mil Cuchillos deja de ser válido, no lo cuentes como destruido; conserva los cuerpos que realmente sobrevivan."
      ],
      "expected_result": "Una retirada solo si la Magia resuelve con su estado real; la posición propia depende de la interrupción.",
      "resources_to_keep": "La Normal y un acceso al nombre que no se hayan gastado.",
      "alternative": "Si ya no controlas el nombre requerido, recurre al Hechicero con materiales reales o espera otro turno.",
      "related_route_ids": [
        "707:A09:SECRETORDER:DM:KNIVES02",
        "707:A09:ILLUSION:SAGE:KNIVES02"
      ]
    },
    {
      "id": "win_condition",
      "title": "Ganar: limpiar antes de atacar con los Magos",
      "objective": "Convertir las Magias de nombre en ataques reales con los monstruos que permanezcan en Campo.",
      "situation": "Puedes usar Orden Secreta o Piedra; rival con defensas identificadas y LP conocidos.",
      "card_cids": [
        15410,
        16371,
        17212,
        19598,
        15450,
        15451
      ],
      "actions": [
        "Si Piedra permite los dos Magos, establece ambos cuerpos sin contar una bonificación inexistente de Chica Maga.",
        "Elige Mil Cuchillos para el monstruo que bloquea el ataque o Ataque Mágico Oscuro para las Magias y Trampas.",
        "Con Orden Secreta, Mago Oscuro tiene 3200 ATK ese turno. Con Piedra, Mago Oscuro tiene 2500 y Chica Maga 2000 ATK en el ejemplo de Cementerio vacío; calcula los cambios reales y el daño."
      ],
      "expected_result": "Presión de Mago Oscuro y, cuando procede, Chica Maga Oscura; victoria solo con daño efectivo suficiente.",
      "resources_to_keep": "Un acceso al nombre y una Magia de retirada si la partida continúa.",
      "alternative": "Si el daño no alcanza, mantén el monstruo que habilita la siguiente Magia.",
      "related_route_ids": [
        "707:A09:JEWEL:PAIR:KNIVES03",
        "707:A09:SECRETORDER:DM01"
      ]
    },
    {
      "id": "common_errors",
      "title": "Errores: nombre, Skill y Extra sin acceso",
      "objective": "No tratar el cambio temporal de nombre como permanente ni inventar rutas a Gaia.",
      "situation": "Vas a usar Illusion of Execution, Hechicero Eliminador, Orden Secreta o una Fusión del Extra.",
      "card_cids": [
        15410,
        19773,
        15450,
        15451,
        19995,
        18298,
        19323
      ],
      "actions": [
        "La Skill local requiere turno 2+, construcción y revelación válidas; no asegura que aparezca una Magia al excavar.",
        "El Hechicero recupera su nombre impreso al final del turno; no habilita automáticamente Mil Cuchillos al turno siguiente.",
        "Los materiales de las Fusiones Gaia no tienen una ruta demostrada con el Main registrado; no las declares disponibles por estar en Extra."
      ],
      "expected_result": "Acceso al nombre y Magias de retirada conforme a su requisito real, sin atribuir una Fusión no demostrada.",
      "resources_to_keep": "La única copia de Mago Oscuro y los recursos que permiten su acceso.",
      "alternative": "Si la Skill no puede utilizarse, emplea Orden Secreta, Piedra o el Hechicero según tu mano.",
      "related_route_ids": [
        "707:A09:ILLUSION:SAGE01",
        "707:A09:EXECUTOR:DARKMAGIC01",
        "707:A09:SECRETORDER:DM01"
      ]
    }
  ]
}
```

## Revisión técnica y pedagógica individual — 23-11-2026, revisión 3

Se hizo explícito el requisito de controlar el nombre Mago Oscuro para ambas Magias, el aumento temporal y protección de Orden Secreta, y los dos Tributos para Hechicero. El primer turno no usa Illusion of Execution; las Fusiones Gaia continúan sin acceso demostrado. La Skill local requiere cotejar su fuente original antes de certificar T4.

Se han leído las ocho lecciones. T2: ajuste de acciones y condiciones realizado en esta acta; T1/T3: contraste contra fuentes del expediente y rutas concretas, sin afirmar cotejo exhaustivo de todos los efectos; T4/T5: abiertos hasta reconciliar el JSON/Markdown, comprobar semántica restante y ejecutar las pruebas de la nueva revisión. No se ejecuta A02–A10 ni se aplica banlist.
