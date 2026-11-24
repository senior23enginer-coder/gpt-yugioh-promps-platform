# A01 — verificación individual DoomZ (653)

> **ESTADO VIGENTE: A01 REABIERTO — revisión funcional 2.** Los checks históricos inferiores conservan su valor de prueba técnica anterior, no certifican el nuevo estándar. Revalidar T1–T5 individualmente: diagnóstico, ocho lecciones prácticas, evidencia por lección, revisión semántica y lectura completa en navegador real. No cerrar por longitud, paridad o importación.

23-11-2026. TCG Advanced. Main 40 / Extra 15 / Side 9 / Reserva 0; 37 identidades, 16 rutas. Se conserva cada copia y zona; no se evalúa banlist.

Fuentes versionadas: Markdown blob `f128d47aa8a5459543abdfade2a9e491baf04efa`; JSON blob `603419f4d81d60a670c9cd9073c17a0ab5b4101a`.

## T1 y T3 — diagnóstico y trazabilidad

Motor principal DoomZ: destrucción de recursos propios para disparar búsquedas o colocación de soporte, Equipos convertidos en materiales y acceso a Xyz Máquina VIENTO. Medius/Modelo de Poder es motor auxiliar; Júpiter tiene procedimiento distinto. Regulus y ZEUS son salidas condicionadas. La victoria depende de interrupciones, presión y recurrencia, no de una negación ilimitada. El coste de destrucción, el evento de destruir por efecto y enviar al GY no se deben confundir.

| Propósito | CID y zona | Condición, riesgo y límite | Ruta existente (documental) |
|---|---|---|---|
| Inicio y búsqueda | [21823](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21823&ope=2), [21775](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21775&ope=2), Main | Incursores destruye otra DoomZ elegible para añadir o invocar desde Deck; Amalthe puede buscar otro monstruo DoomZ al ser invocada o destruida por efecto. No duplicar opciones ni asumir respuesta rival. | `653:A09:RAIDERS:AMALTHE:DRAS02` |
| Interacción Drastrius | [21776](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21776&ope=2), [21774](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21774&ope=2), [21824](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21824&ope=2) Main; [21811](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21811&ope=2) Extra | Elara coloca soporte al cumplirse su evento; Drastea necesita destruir DoomZ propia, equiparse y respetar Nivel/Rango. Drastrius necesita material y activación rival elegible de monstruo en Campo/GY para negar. | `653:A09:RAIDERS:ELARA:DRAS01` |
| Motor auxiliar | [21419](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21419&ope=2), [21777](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21777&ope=2), [22158](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22158&ope=2) Main; [21812](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21812&ope=2) Extra | Medius/Modelo de Poder y Diactorus constituyen un acceso alternativo; verificar recursos de Deck, destrucción y materiales. No conservar simultáneamente como cuerpos los materiales acoplados. | `653:A09:MEDIUS:POWERPATRON:DIACTORUS:DRAS05` |
| Recuperación y bloqueo | [22567](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22567&ope=2), [21840](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21840&ope=2), [21776](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21776&ope=2) Main; [21812](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21812&ope=2) Extra | Adrasteia requiere un monstruo equipado y DoomZ elegible distinto del destruido; su equipamiento desde GY implica daño. Destrucción DoomZ debe equipar a un Xyz DoomZ para el bloqueo de adiciones salvo robo; no asumir que una trampa colocada ya aplica. | `653:A09:V11:DRASTEA:ADRASTEIA:DIACTORUS` |
| Júpiter alternativo | [21419](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21419&ope=2), [22521](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22521&ope=2) Main; [21810](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21810&ope=2) Extra | La apertura documentada de Medius/Zegredo produce Júpiter sin materiales; no atribuir bonificación por material Xyz ni efecto de desacoplar si no hay material. | `653:A09:MEDIUS:JUPREDO:JUPITER04` |
| Salida de limpieza tras batalla | [21811](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21811&ope=2), [15524](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15524&ope=2), Extra | ZEUS es alternativa tras batalla de Xyz si se cumple su procedimiento; requiere dos materiales para enviar las otras cartas del Campo. No presupone que Drastrius pueda batallar o sobreviva. | `653:A09:RAIDERS:ELARA:DRASTRIUS_BATTLE_ZEUS08` |

Todos los CID, zonas y route_id constan en el JSON exacto. Las fuentes oficiales son enlaces de las fichas versionadas; no se atribuye una nueva verificación exhaustiva del texto impreso. El registro carece de record.calculator; referencias effect_id/motor_id no disponibles quedan PENDIENTE_DE_ENLACE_A05_A09. No se crean reglas, rutas ni replays.

## Checklist

- [x] T1: identidad, motores, estrategia condicional y riesgos documentados.
- [x] T2: seis campos del perfil, cuatro cartas y cuatro fases.
- [x] T3: matriz por propósito con fuentes, zonas, CID y rutas existentes.
- [x] T4: CI [#45273679793](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45273679793) PASS para 653, seis campos, estilo 103/190, resumen 186/250 y paridad.
- [x] T5: [CI #45273999784](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45273999784), commit Platform `34e9f1fb22a5faebe8c6a138efe19416cbb998d4`, devolvió ISOLATED_PASS de importación/exportación/reimportación para 653, 37 fotografías, 16 rutas, ocho rechazos y conservación de cantidades. Presentación del paquete real: PASS a 390 y 1280 px. Los fallos globales corresponden a otros registros.

Resultado: **5/5 acreditadas en entorno aislado**. Cero importaciones en producción. No iniciar A02.

## Revisión funcional 2 — ocho lecciones propuestas

Redacción individual basada en inventario y aperturas/resultados del paquete real, con condiciones y alternativas. No se modifica ningún efecto ni ruta; enlaces oficiales para cotejo. El nuevo cierre queda pendiente de la aplicación del contrato, verificación semántica completa y prueba real de interfaz. 

- first: cartas [Incursores DoomZ](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21823&ope=2), [DoomZ VII Siete - Elara](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21776&ope=2), [DoomZ XII Cero - Drastea](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21774&ope=2), [Mando DoomZ «D.O.O.M.D.U.R.G.»](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21824&ope=2), [DoomZ XII Fin - Drastrius](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21811&ope=2); rutas fuente `653:A09:RAIDERS:ELARA:DRAS01`, `653:A09:RAIDERS:AMALTHE:DRAS02`.
- second: cartas [DoomZ XII Fin - Drastrius](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21811&ope=2), [Divino Arsenal AA-ZEUS - Trueno del Cielo](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15524&ope=2), [Incursores DoomZ](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21823&ope=2), [DoomZ VII Siete - Elara](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21776&ope=2); rutas fuente `653:A09:RAIDERS:ELARA:DRASTRIUS_BATTLE_ZEUS08`.
- mid: cartas [DoomZ VII Siete - Elara](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21776&ope=2), [DoomZ XII Cero - Drastea](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21774&ope=2), [Mando DoomZ «A.D.R.A.S.T.E.I.A.»](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22567&ope=2), [Destrucción DoomZ](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21840&ope=2), [Fractura DoomZ - Diactorus](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21812&ope=2); rutas fuente `653:A09:V11:DRASTEA:ADRASTEIA:DIACTORUS`, `653:A09:V12:ELARA:DRASTEA:DRASTRIUS:SINGLE`.
- late: cartas [Medius el Puro](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21419&ope=2), [Modelo de Poder Máquina de Sombras Zegredo](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22521&ope=2), [Júpiter el Modelo de Poder de Destrucción](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21810&ope=2), [DoomZ XII Fin - Drastrius](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21811&ope=2); rutas fuente `653:A09:MEDIUS:JUPREDO:JUPITER04`, `653:A09:MEDIUS:POWERPATRON:DIACTORUS:DRAS05`.
- weak_hand: cartas [Cambio DoomZ](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22158&ope=2), [Medius el Puro](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21419&ope=2), [DoomZ Modelo de Poder](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21777&ope=2), [DoomZ VII Siete - Elara](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21776&ope=2), [Fractura DoomZ - Diactorus](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21812&ope=2), [DoomZ XII Fin - Drastrius](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21811&ope=2); rutas fuente `653:A09:CHANGE:POWERPATRON:GRAFLAREIO:DRAS07`, `653:A09:MEDIUS:POWERPATRON:DIACTORUS:DRAS05`.
- disruption: cartas [Incursores DoomZ](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21823&ope=2), [DoomZ V Cinco - Amalthe](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21775&ope=2), [DoomZ VII Siete - Elara](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21776&ope=2), [Cambio DoomZ](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=22158&ope=2), [Medius el Puro](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21419&ope=2); rutas fuente `653:A09:RAIDERS:CHANGE:DRAS03`, `653:A09:MEDIUS:POWERPATRON:DIACTORUS:DRAS05`.
- win_condition: cartas [DoomZ XII Fin - Drastrius](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21811&ope=2), [Júpiter el Modelo de Poder de Destrucción](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21810&ope=2), [Divino Arsenal AA-ZEUS - Trueno del Cielo](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15524&ope=2), [DoomZ V Cinco - Amalthe](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21775&ope=2), [DoomZ VII Siete - Elara](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21776&ope=2); rutas fuente `653:A09:MEDIUS:JUPREDO:JUPITER04`, `653:A09:RAIDERS:ELARA:DRASTRIUS_BATTLE_ZEUS08`.
- common_errors: cartas [Incursores DoomZ](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21823&ope=2), [DoomZ XII Cero - Drastea](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21774&ope=2), [Mando DoomZ «D.O.O.M.D.U.R.G.»](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21824&ope=2), [Destrucción DoomZ](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21840&ope=2), [DoomZ XII Fin - Drastrius](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21811&ope=2); rutas fuente `653:A09:RAIDERS:ELARA:DRAS01`, `653:A09:V12:ELARA:DRASTEA:DRASTRIUS:SINGLE`.

<!-- A01_ESTRATEGIA_REVISADA -->
```json
{
  "schema": "station-x-player-strategy/1",
  "sections": [
    {
      "id": "first",
      "title": "Primero: Drastrius con una respuesta",
      "objective": "Construir una interacción de monstruo sin gastar la Normal si la mano lo permite.",
      "situation": "Incursores DoomZ y Elara en mano; Drastea y Mando en Deck; Drastrius en Extra.",
      "card_cids": [
        21823,
        21776,
        21774,
        21824,
        21811
      ],
      "actions": [
        "Activa Incursores para destruir Elara por efecto e Invocar Drastea del Deck.",
        "En una cadena nueva, Elara Coloca Mando; actívalo como Mágica de Equipo sobre Drastea.",
        "Usa el procedimiento de Drastea con su Equipo para llegar a Drastrius; conserva la Invocación Normal."
      ],
      "expected_result": "Drastrius con dos materiales y 2700 ATK; Incursores permanece boca arriba. Puede negar una activación elegible de monstruo en Campo o Cementerio.",
      "resources_to_keep": "Un material para la interacción de Drastrius y la Normal si todavía está libre.",
      "alternative": "Con Incursores y Amalthe, busca Elara tras destruir Amalthe y gasta la Normal para colocar Mando.",
      "related_route_ids": [
        "653:A09:RAIDERS:ELARA:DRAS01",
        "653:A09:RAIDERS:AMALTHE:DRAS02"
      ]
    },
    {
      "id": "second",
      "title": "Segundo: elegir cómo romper el campo",
      "objective": "Retirar una amenaza antes de comprometer los materiales restantes.",
      "situation": "El rival controla monstruos o cartas que siguen siendo vulnerables; dispones de una apertura hacia Drastrius y, si procede, de la Battle Phase.",
      "card_cids": [
        21811,
        15524,
        21823,
        21776
      ],
      "actions": [
        "Completa la apertura hacia Drastrius solo si Incursores y Elara pueden resolver.",
        "Si Drastrius puede combatir y se cumple el procedimiento de ZEUS, valora sobreponerlo tras la batalla.",
        "Desacopla dos materiales de ZEUS únicamente cuando limpiar las otras cartas del Campo compense perder también recursos propios."
      ],
      "expected_result": "ZEUS con materiales para limpieza condicional, o Drastrius conservado si la batalla o la limpieza no convienen.",
      "resources_to_keep": "Materiales Xyz, Incursores y cartas de mano que no sea necesario gastar.",
      "alternative": "Si el ataque no es posible, conserva Drastrius y su respuesta a monstruos en lugar de anunciar ZEUS.",
      "related_route_ids": [
        "653:A09:RAIDERS:ELARA:DRASTRIUS_BATTLE_ZEUS08"
      ]
    },
    {
      "id": "mid",
      "title": "Juego medio: reciclar Equipos y destrucción",
      "objective": "Convertir una destrucción propia en otra amenaza sin perder la posibilidad de interacción.",
      "situation": "Elara y Drastea disponibles; existe Adrasteia o Mando en el Deck y una zona de Magias/Trampas utilizable.",
      "card_cids": [
        21776,
        21774,
        22567,
        21840,
        21812
      ],
      "actions": [
        "Invoca Elara y decide si colocar Destrucción DoomZ antes de usar Drastea.",
        "Usa Drastea para destruir Elara e Invocarse cuando los objetivos sean válidos; aprovecha la colocación posterior de Elara.",
        "Si el Equipo y el destino siguen disponibles, elige la línea de Diactorus o la de Drastrius según la interacción que necesites."
      ],
      "expected_result": "Diactorus con Destrucción preparada, o Drastrius con materiales, según la línea elegida; la Trampa necesita su ventana legal.",
      "resources_to_keep": "Una carta DoomZ para destruir, un Equipo utilizable y materiales del siguiente Xyz.",
      "alternative": "Si no quedan Equipos válidos, evita gastar Drastea esperando una Xyz que no se puede completar.",
      "related_route_ids": [
        "653:A09:V11:DRASTEA:ADRASTEIA:DIACTORUS",
        "653:A09:V12:ELARA:DRASTEA:DRASTRIUS:SINGLE"
      ]
    },
    {
      "id": "late",
      "title": "Juego tardío: presión de Júpiter",
      "objective": "Cambiar a una amenaza de 3500 ATK cuando el motor de Equipos no está disponible.",
      "situation": "Medius en mano, Zegredo en Deck, Júpiter disponible en Extra; se puede asumir el coste de desterrar tres cartas superiores.",
      "card_cids": [
        21419,
        22521,
        21810,
        21811
      ],
      "actions": [
        "Invoca Medius normalmente y trae Zegredo del Deck.",
        "Usa el procedimiento de Zegredo pagando las tres cartas superiores desterradas boca abajo; Júpiter entra sin materiales.",
        "Comprueba si el disparo de Zegredo al llegar al Extra permite recuperar una Magia/Trampa del motor que quede en Deck."
      ],
      "expected_result": "Júpiter de 3500 ATK y Medius en Campo; no hay material que desacoplar de Júpiter en esta apertura.",
      "resources_to_keep": "Piezas DoomZ que aún estén en Deck, y acceso a Drastrius para un turno posterior.",
      "alternative": "Si quedan pocas cartas esenciales o el coste es demasiado arriesgado, usa la salida documentada de Medius con Modelo de Poder hacia Drastrius.",
      "related_route_ids": [
        "653:A09:MEDIUS:JUPREDO:JUPITER04",
        "653:A09:MEDIUS:POWERPATRON:DIACTORUS:DRAS05"
      ]
    },
    {
      "id": "weak_hand",
      "title": "Mano débil: abrir con Cambio o Medius",
      "objective": "Identificar una salida real aunque no se hayan robado Incursores y Elara juntos.",
      "situation": "La mano contiene Cambio DoomZ o Medius; comprueba las piezas todavía presentes en el Deck.",
      "card_cids": [
        22158,
        21419,
        21777,
        21776,
        21812,
        21811
      ],
      "actions": [
        "Con Cambio, destruye Modelo de Poder desde el Deck y usa su búsqueda posterior para conseguir Elara.",
        "Invoca Elara, coloca y activa Mando, y sigue su acceso a Diactorus si sus condiciones se cumplen.",
        "Con Medius en lugar de Cambio, Invoca Modelo de Poder del Deck y utiliza su acceso alternativo a Diactorus."
      ],
      "expected_result": "Un puente Xyz hacia Drastrius en las aperturas documentadas, no un campo garantizado si falta una pieza.",
      "resources_to_keep": "La Normal hasta saber qué iniciador se usará y las copias de Equipo que exigen las rutas.",
      "alternative": "Si no está Modelo de Poder en Deck, cambia a la línea de Incursores con Amalthe solo cuando ambas estén disponibles.",
      "related_route_ids": [
        "653:A09:CHANGE:POWERPATRON:GRAFLAREIO:DRAS07",
        "653:A09:MEDIUS:POWERPATRON:DIACTORUS:DRAS05"
      ]
    },
    {
      "id": "disruption",
      "title": "Interrupción: distinguir destrucción y búsqueda",
      "objective": "Conservar una apertura alternativa si el rival corta el primer efecto.",
      "situation": "El rival puede negar Incursores, Medius o la colocación de Elara; revisa qué llegó a resolverse.",
      "card_cids": [
        21823,
        21775,
        21776,
        22158,
        21419
      ],
      "actions": [
        "Si Incursores no resolvió su destrucción, Elara o Amalthe no obtienen un disparo por esa destrucción inexistente.",
        "Comprueba si Cambio sigue en mano y si queda un objetivo en Deck; úsalo como apertura distinta solo si todavía es legal.",
        "Si la búsqueda de Elara se perdió, conserva la Normal y valora Medius si está disponible y no hay restricción incompatible."
      ],
      "expected_result": "La continuación depende de las cartas realmente conservadas; si no hay segundo iniciador, termina sin consumir más recursos.",
      "resources_to_keep": "La carta que sobreviva a la negación y cualquier iniciador independiente no utilizado.",
      "alternative": "Si ninguna apertura puede resolver, conserva las respuestas defensivas y espera un turno en vez de gastar los Equipos sin objetivo.",
      "related_route_ids": [
        "653:A09:RAIDERS:CHANGE:DRAS03",
        "653:A09:MEDIUS:POWERPATRON:DIACTORUS:DRAS05"
      ]
    },
    {
      "id": "win_condition",
      "title": "Ganar: alternar control y daño",
      "objective": "Usar las interacciones para abrir una Battle Phase favorable y cerrar con daño comprobable.",
      "situation": "Drastrius ya tiene materiales o se puede acceder a Júpiter; conoces los monstruos y LP rivales.",
      "card_cids": [
        21811,
        21810,
        15524,
        21775,
        21776
      ],
      "actions": [
        "Con Drastrius, guarda la negación para una activación rival elegible que impida tu desarrollo o combate.",
        "Cuando sea tu turno, compara la suma de ataques disponibles con las defensas y LP del rival.",
        "Elige Júpiter como presión si su acceso es legal; reserva ZEUS para limpiar un campo que no puedas superar atacando."
      ],
      "expected_result": "Ventaja por interacción y daño efectivo; 2700 o 3500 ATK por sí solos no equivalen a daño letal.",
      "resources_to_keep": "Material de interacción y un iniciador para reconstruir si el ataque no termina la partida.",
      "alternative": "Si no puedes ganar este turno, prioriza conservar Drastrius o una salida de recuperación sobre atacar sin protección.",
      "related_route_ids": [
        "653:A09:MEDIUS:JUPREDO:JUPITER04",
        "653:A09:RAIDERS:ELARA:DRASTRIUS_BATTLE_ZEUS08"
      ]
    },
    {
      "id": "common_errors",
      "title": "Errores: costes, Equipos y restricciones",
      "objective": "Evitar perder una búsqueda o construir una Xyz ilegal por confundir operaciones.",
      "situation": "Estás decidiendo una ruta con Incursores, Drastea, Mando o Destrucción DoomZ.",
      "card_cids": [
        21823,
        21774,
        21824,
        21840,
        21811
      ],
      "actions": [
        "Distingue destruir por efecto de pagar un coste: los disparos de Elara y Amalthe necesitan su evento correspondiente.",
        "Después de colocar Mando, actívalo y equipa un objetivo válido antes de usar el procedimiento que lo convierte en material.",
        "Tras resolver el efecto pertinente de Incursores, respeta el límite a Xyz desde Extra; comprueba los materiales de Drastrius antes de negar."
      ],
      "expected_result": "Las cartas terminan en sus zonas reales y las interacciones se emplean únicamente en la ventana correcta.",
      "resources_to_keep": "El Equipo que exige la Xyz y al menos un material para Drastrius si planeas responder.",
      "alternative": "Si no cumples el requisito de Equipo, conserva el monstruo o busca una apertura alternativa desde Cambio.",
      "related_route_ids": [
        "653:A09:RAIDERS:ELARA:DRAS01",
        "653:A09:V12:ELARA:DRASTEA:DRASTRIUS:SINGLE"
      ]
    }
  ]
}
```
