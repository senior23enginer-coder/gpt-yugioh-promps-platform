# A01 — verificación individual Infernoble (670)

> **ESTADO VIGENTE: A01 REABIERTO — revisión funcional 2.** Los checks históricos inferiores conservan su valor de prueba técnica anterior, no certifican el nuevo estándar. Revalidar T1–T5 individualmente: diagnóstico, ocho lecciones prácticas, evidencia por lección, revisión semántica y lectura completa en navegador real. No cerrar por longitud, paridad o importación.

23-11-2026. TCG Advanced. Main 42 / Extra 15 / Side 0 / Reserva 12; 45 identidades y 11 rutas. No se modifica inventario ni se aplica banlist; Reserva no equivale a Side.

Fuentes versionadas: Markdown blob `50cde89821dd986511bbcc2f26a5103e0ac06f5a`; JSON blob `f91bf3a152dbdac4b1ab79da82f99c31c555d6b2`.

## T1 y T3 — diagnóstico y matriz de propósitos

Combo de Guerreros FUEGO mediante Equipos, búsqueda y recuperación para construir Enlaces y Sincronías. Ogier/Renaud, Museo y Durendal forman el núcleo; Connector/Dolphin aporta acceso a dos Guerreros. WANTED/Diabellstar prepara recursos alternativos; Fenrir/Riseheart es un paquete de presión separado cuyo bloqueo Xyz puede impedir las salidas principales. La victoria depende de desarrollar un jefe legal y conservar Equipos para interacción, no de atribuir automáticamente Charles a cualquier apertura. Los riesgos incluyen negación de búsqueda/envío, consumo de Normal, falta de Equipos distintos, niveles, zonas y restricciones de Guerreros.

| Propósito | CID y zona | Condición, riesgo y límite | Ruta existente |
|---|---|---|---|
| Acceso a Isolde | [14085](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=14085&ope=2), [6768](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6768&ope=2), [15082](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15082&ope=2) Main; [13500](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13500&ope=2) Extra | Connector requiere Normal y Dolphin disponible; Isolde necesita dos Guerreros y Equipos elegibles. Renaud invocado por Isolde no se convierte en Cantante por ese procedimiento. No atribuir jefe final a esta apertura. | `670:A09:CONNECTOR:ISOLDE01` |
| Búsqueda y extensión | [18844](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18844&ope=2), [15287](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15287&ope=2), [15082](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15082&ope=2), [15392](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15392&ope=2) Main; [13500](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13500&ope=2) Extra | Museo requiere pagar 1200 LP para buscar. Durendal necesita monstruo equipado para buscar y destruirse. La apertura usa dos Renaud distintos y recursos de Deck; el segundo efecto de Museo no se presume aplicado. | `670:A09:MUSEUM:RENAUD:ISOLDE01` |
| Sincronía Angélica | [15247](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15247&ope=2), [15082](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15082&ope=2), [15287](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15287&ope=2) Main; [18827](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18827&ope=2) Extra | Ogier envía Equipo elegible; Renaud desde mano con Guerrero FUEGO es Cantante Nivel 1 y recupera recurso válido. Ogier Nivel 4 + Renaud Nivel 1 habilitan Sincronía Nivel 5; Roland no aparece sin cumplir disparador de Angélica. | `670:A09:OGIER:RENAUD:ANGELICA01` |
| Preparación alternativa | [19196](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19196&ope=2), [19148](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19148&ope=2), [19199](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19199&ope=2), [15247](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15247&ope=2) Main | WANTED/Diabellstar requieren cartas y costes reales; la apertura registrada consume tres cartas y termina con Ogier, sin Extra usado. No confundir preparación del GY con negación o llegada a Charles. | `670:A09:WANTED:DIABELLSTAR:OGIER01` |
| Jefe e interacción M/T | [15276](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15276&ope=2), [18835](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18835&ope=2) Extra; [15287](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15287&ope=2) Main | Great Charles requiere Charles Sincronía Nivel 9 ya equipado. Su negación M/T requiere enviar un Equipo elegible; la ruta empieza con Charles en campo, no demuestra una apertura completa a ese jefe. | `670:A09:CHARLES:EQUIPPED:LINK01` |
| Alternativa Xyz | [15247](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15247&ope=2), [18801](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18801&ope=2), [15248](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15248&ope=2) Main; [18926](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18926&ope=2) Extra | Turpin requiere monstruo equipado para extender; Dempsey usa dos Nivel 4 y elige añadir o enviar objetivo permitido. Materiales Xyz no son cuerpos disponibles. No acumular esta salida con las demás. | `670:A09:V11:OGIER:DURENDAL:TURPIN:DEMPSEY` |

CID, zonas y route_id cotejados contra el registro exacto. Fuentes Konami procedentes de las fichas versionadas; no se atribuye nueva revisión exhaustiva del texto oficial. No existe record.calculator. Enlaces effect_id/motor_id inexistentes quedan PENDIENTE_DE_ENLACE_A05_A09; no se inventan reglas ni replays.

## Checklist

- [x] T1: diagnóstico específico, motores y riesgos.
- [x] T2: seis campos de perfil, cuatro cartas y cuatro fases.
- [x] T3: matriz individual de seis propósitos con fuentes, CID, zonas, condiciones y rutas reales.
- [x] T4: [CI #45273999784](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45273999784) devolvió PASS, estilo 61/190, resumen 171/250, paridad de seis campos.
- [x] T5: [CI #45274393388](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45274393388), job 138042292852, commit Platform `c8e38d72bdcfc3bbc2826d2f6056e4b99d9f1b7e`, devolvió ISOLATED_PASS de importación/exportación/reimportación para 670, 45 fotografías, 11 rutas, ocho rechazos y conservación de cantidades. Presentación del paquete real: PASS a 390 y 1280 px. Los tres pasos de aceptación finalizaron correctamente.

Resultado: **5/5 acreditadas en entorno aislado**. Cero importaciones en producción. No iniciar A02.

## Revisión funcional 2 — ocho lecciones propuestas

Redacción individual basada en inventario y aperturas/resultados del paquete real, con condiciones y alternativas. No se modifica ningún efecto ni ruta; enlaces oficiales para cotejo. El nuevo cierre queda pendiente de la aplicación del contrato, verificación semántica completa y prueba real de interfaz.

- first: cartas [Infernoble Caballero Ogier](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15247&ope=2), [Infernoble Caballero Renaud](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15082&ope=2), [Infernoble Arms - Durendal](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15287&ope=2), [Noble Arms Museum](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18844&ope=2), [Angelica, Princess of Noble Arms [Synchro]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18827&ope=2), [Infernoble Knight Captain Roland [Synchro]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15275&ope=2); rutas fuente `670:A09:OGIER:RENAUD:ANGELICA01`, `670:A09:ANGELICA:ROLAND02`.
- second: cartas [Infernoble Caballero Ogier](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15247&ope=2), [Infernoble Caballero Renaud](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15082&ope=2), [Relinquished Anima [Link]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13841&ope=2), [S:P Little Knight [Link]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19188&ope=2), [Infernoble Arms - Durendal](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15287&ope=2); rutas fuente `670:A09:OGIER:RENAUD:ANIMA:SP09`, `670:A09:OGIER:RENAUD:SP_DEFENSA08`.
- mid: cartas [Infernoble Caballero Renaud](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15082&ope=2), [Infernoble Arms - Durendal](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15287&ope=2), [Fire Flint Lady](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15392&ope=2), [Isolde, Two Tales of the Noble Knights [Link]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13500&ope=2), [Neo Space Connector](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=14085&ope=2), [Neo-Spacian Aqua Dolphin](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6768&ope=2); rutas fuente `670:A09:CONNECTOR:ISOLDE01`, `670:A09:CONNECTOR:DURENDAL02`, `670:A09:OGIER:RENAUD:ANGELICA01`.
- late: cartas [Infernoble Knight Emperor Charles [Synchro]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15276&ope=2), [Emperor Charles the Great [Link]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18835&ope=2), [Infernoble Arms - Durendal](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15287&ope=2), [Noble Arms Museum](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18844&ope=2); rutas fuente `670:A09:CHARLES:EQUIPPED:LINK01`.
- weak_hand: cartas [Neo Space Connector](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=14085&ope=2), [Neo-Spacian Aqua Dolphin](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6768&ope=2), [Noble Arms Museum](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18844&ope=2), [Infernoble Caballero Renaud](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15082&ope=2), [Isolde, Two Tales of the Noble Knights [Link]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13500&ope=2), [Infernoble Arms - Durendal](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15287&ope=2); rutas fuente `670:A09:CONNECTOR:ISOLDE01`, `670:A09:MUSEUM:RENAUD:ISOLDE01`.
- disruption: cartas [WANTED: Seeker of Sinful Spoils](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19196&ope=2), [Diabellstar la Bruja Negra](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19148&ope=2), [Original Sinful Spoils - Snake-Eye](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19199&ope=2), [Infernoble Caballero Ogier](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15247&ope=2), [Fire Flint Lady](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15392&ope=2), [Infernoble Caballero Renaud](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15082&ope=2); rutas fuente `670:A09:WANTED:DIABELLSTAR:OGIER01`, `670:A09:OGIER:RENAUD:SP_DEFENSA08`.
- win_condition: cartas [Emperor Charles the Great [Link]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18835&ope=2), [Infernoble Knight Emperor Charles [Synchro]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15276&ope=2), [Angelica's Angelic Ring](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19207&ope=2), [Noble Arms Museum](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18844&ope=2), [Immortal Phoenix Gearfried](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=14801&ope=2); rutas fuente `670:A09:CHARLES:EQUIPPED:LINK01`, `670:A09:OGIER:RENAUD:ANGELICA01`.
- common_errors: cartas [Infernoble Caballero Renaud](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15082&ope=2), [Isolde, Two Tales of the Noble Knights [Link]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13500&ope=2), [Angelica, Princess of Noble Arms [Synchro]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18827&ope=2), [Infernoble Knight Captain Roland [Synchro]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15275&ope=2), [Infernoble Knight Emperor Charles [Synchro]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15276&ope=2), [Infernoble Arms - Durendal](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15287&ope=2); rutas fuente `670:A09:CONNECTOR:ISOLDE01`, `670:A09:ANGELICA:ROLAND02`.

<!-- A01_ESTRATEGIA_REVISADA -->
```json
{
  "schema": "station-x-player-strategy/1",
  "sections": [
    {
      "id": "first",
      "title": "Primero: construir Angélica con Equipos disponibles",
      "objective": "Preparar una Sincronía del motor y conservar acceso a los Equipos, sin anunciar un jefe no construido.",
      "situation": "Ogier y Renaud en mano; Durendal, Museo y Angélica disponibles, Normal libre.",
      "card_cids": [
        15247,
        15082,
        15287,
        18844,
        18827,
        15275
      ],
      "actions": [
        "Invoca Normalmente Ogier de Nivel 4 y usa su disparo para enviar Durendal del Deck al Cementerio.",
        "Como controlas un Guerrero FUEGO, Invoca Renaud de Nivel 1 desde mano por su procedimiento propio; se trata como Cantante. Recupera Durendal de Cementerio con su disparo si resuelve.",
        "Sincroniza Ogier (4) + Renaud (1) para Angélica (5). Utiliza su efecto de Invocación Especial para añadir Museo y gestiona los Equipos conforme a sus requisitos.",
        "Conserva los Equipos; para que Angélica traiga Roland necesita su condición de selección en Campo. No existe Charles todavía."
      ],
      "expected_result": "Angélica y Museo con recursos para continuar; Roland y Charles no están automáticamente en el Campo.",
      "resources_to_keep": "Equipo recuperado, Museo y un no Cantante de Nivel 4 si la continuación exige ese material.",
      "alternative": "Si prefieres una respuesta corta con dos Guerreros, usa la ruta de S:P de la misma apertura.",
      "related_route_ids": [
        "670:A09:OGIER:RENAUD:ANGELICA01",
        "670:A09:ANGELICA:ROLAND02"
      ]
    },
    {
      "id": "second",
      "title": "Segundo: retirar una amenaza con Anima y S:P",
      "objective": "Usar un recurso del Extra para retirar un monstruo en una posición elegible.",
      "situation": "Ogier y Renaud disponibles; la posición del monstruo rival permite la interacción de Anima y existe S:P en Extra.",
      "card_cids": [
        15247,
        15082,
        13841,
        19188,
        15287
      ],
      "actions": [
        "Desarrolla Ogier y Renaud y conserva el Equipo recuperado según la ruta.",
        "Si la posición rival permite que Anima equipe un monstruo elegible, sigue la variante ofensiva con Anima.",
        "Convierte los materiales disponibles en S:P y resuelve su retirada solo si queda un objetivo elegible."
      ],
      "expected_result": "S:P y Durendal en mano; Anima ya no queda en Campo cuando se usa como material.",
      "resources_to_keep": "Durendal para desarrollar otro Guerrero y una apertura que no se haya gastado.",
      "alternative": "Si no existe posición aprovechable para Anima, usa la línea directa de S:P o conserva Angélica.",
      "related_route_ids": [
        "670:A09:OGIER:RENAUD:ANIMA:SP09",
        "670:A09:OGIER:RENAUD:SP_DEFENSA08"
      ]
    },
    {
      "id": "mid",
      "title": "Juego medio: recuperar mediante Renaud",
      "objective": "Volver a obtener un Equipo y usarlo para conectar con otro Guerrero.",
      "situation": "Renaud disponible mediante una apertura válida; existe Durendal u otro Equipo recuperable según la secuencia.",
      "card_cids": [
        15082,
        15287,
        15392,
        13500,
        14085,
        6768
      ],
      "actions": [
        "Si Connector puede resolver, trae Aqua Dolphin y usa ambos Guerreros para Isolde según la ruta existente.",
        "Usa las búsquedas y recuperación permitidas de Isolde y Renaud, respetando las limitaciones del Guerrero añadido.",
        "Activa Durendal para obtener Fire Flint Lady si esa continuación sigue disponible."
      ],
      "expected_result": "Cuerpos adicionales y recursos de mano, no una Sincronía o negación gratuita.",
      "resources_to_keep": "Un Equipo y el Guerrero que pueda Invocarse legalmente en ese turno.",
      "alternative": "Si no se cumple el acceso a Isolde, utiliza Ogier y Renaud para la ruta de Angélica.",
      "related_route_ids": [
        "670:A09:CONNECTOR:ISOLDE01",
        "670:A09:CONNECTOR:DURENDAL02",
        "670:A09:OGIER:RENAUD:ANGELICA01"
      ]
    },
    {
      "id": "late",
      "title": "Juego tardío: convertir Charles equipado",
      "objective": "Transformar un Charles ya construido en su amenaza de Enlace con interacción de Magia/Trampa.",
      "situation": "Charles Sincronía está en Campo y tiene una Mágica de Equipo propia equipada; Great Charles permanece en Extra.",
      "card_cids": [
        15276,
        18835,
        15287,
        18844
      ],
      "actions": [
        "Verifica que Charles esté realmente equipado y que la carta de Enlace permanezca disponible.",
        "Utiliza el procedimiento de Enlace que requiere al Charles equipado.",
        "Al Invocar Great Charles, selecciona al Charles Sincronía del Cementerio para su efecto de equipamiento. Reserva la Mágica de Equipo que deba enviarse para responder a una activación de Magia/Trampa."
      ],
      "expected_result": "Great Charles de 3500 ATK con Charles equipado y una respuesta potencial a Magia/Trampa.",
      "resources_to_keep": "El recurso de Equipo necesario para la respuesta y un iniciador si el jefe es retirado.",
      "alternative": "Si no controlas Charles equipado, no presentes Great Charles como salida de una carta; reconstruye primero el motor.",
      "related_route_ids": [
        "670:A09:CHARLES:EQUIPPED:LINK01"
      ]
    },
    {
      "id": "weak_hand",
      "title": "Mano débil: Connector o Museo con Renaud",
      "objective": "Identificar una apertura que genere Guerreros reales sin depender de una mano ideal.",
      "situation": "Connector en mano o Museo y Renaud según la apertura; Aqua Dolphin y Equipos siguen en Deck.",
      "card_cids": [
        14085,
        6768,
        18844,
        15082,
        13500,
        15287
      ],
      "actions": [
        "Con Connector, usa su acceso a Aqua Dolphin para reunir los dos Guerreros requeridos.",
        "Con Museo y Renaud, sigue la variante documentada que obtiene un segundo Guerrero mediante el motor de Equipos.",
        "Detente en el resultado que acredita la línea: Isolde y Renaud con recursos de mano, no un Charles gratuito."
      ],
      "expected_result": "Dos Guerreros convertidos en desarrollo de Enlace y acceso a Gearfried/Durendal cuando la búsqueda resuelve.",
      "resources_to_keep": "Durendal y cualquier cuerpo que no se necesite gastar en la primera apertura.",
      "alternative": "Si la búsqueda de Isolde queda negada, revisa si Ogier y Renaud están realmente disponibles antes de cambiar a Angélica.",
      "related_route_ids": [
        "670:A09:CONNECTOR:ISOLDE01",
        "670:A09:MUSEUM:RENAUD:ISOLDE01"
      ]
    },
    {
      "id": "disruption",
      "title": "Interrupción: separar motores de Guerrero y Diabellstar",
      "objective": "Conservar la Normal y una segunda vía cuando el rival detiene el primer efecto.",
      "situation": "Connector o una búsqueda de Equipo fue negada; WANTED, Diabellstar u Ogier pueden seguir disponibles.",
      "card_cids": [
        19196,
        19148,
        19199,
        15247,
        15392,
        15082
      ],
      "actions": [
        "Verifica si Aqua Dolphin o el Equipo llegaron realmente a su zona tras la negación.",
        "Si tienes WANTED, una carta que puedas enviar y Ogier según la apertura, valora la línea independiente de Diabellstar.",
        "Usa Original Sinful Spoils y los Guerreros de la ruta solo con sus recursos reales; conserva la Normal si la línea no la consume."
      ],
      "expected_result": "Un nuevo cuerpo Ogier o una apertura alternativa si los recursos lo permiten; no se garantiza Charles tras la interrupción.",
      "resources_to_keep": "La Normal y el Equipo que no haya sido consumido.",
      "alternative": "Con dos Guerreros válidos, considera la salida defensiva de S:P cuando una continuación mayor no sea posible.",
      "related_route_ids": [
        "670:A09:WANTED:DIABELLSTAR:OGIER01",
        "670:A09:OGIER:RENAUD:SP_DEFENSA08"
      ]
    },
    {
      "id": "win_condition",
      "title": "Ganar: presión de Charles y gestión de Equipos",
      "objective": "Asegurar un ataque favorable sin gastar la única respuesta de Great Charles.",
      "situation": "Great Charles ya está en Campo o puedes convertir un Charles equipado; el rival tiene recursos de Magia/Trampa.",
      "card_cids": [
        18835,
        15276,
        19207,
        18844,
        14801
      ],
      "actions": [
        "Conserva el Equipo que permite la respuesta de Great Charles mientras exista una amenaza rival pendiente.",
        "Compara el ataque del jefe con los monstruos y LP rivales antes de decidir la Battle Phase.",
        "Si aún no puedes terminar, deja Museo o un Equipo disponible para recuperar el motor y no consumas todos los Guerreros."
      ],
      "expected_result": "Presión de 3500 ATK y respuesta condicionada a Magia/Trampa; no implica daño letal por sí sola.",
      "resources_to_keep": "Una carta de Equipo utilizable y un Guerrero para el siguiente turno.",
      "alternative": "Si no has reunido Charles, usa la salida documentada de Angélica o S:P según el campo real.",
      "related_route_ids": [
        "670:A09:CHARLES:EQUIPPED:LINK01",
        "670:A09:OGIER:RENAUD:ANGELICA01"
      ]
    },
    {
      "id": "common_errors",
      "title": "Errores: nivel, Equipos y búsqueda de Isolde",
      "objective": "Evitar contar un Cantante o un jefe inexistente por la forma incorrecta de Invocación.",
      "situation": "Estás utilizando Renaud, Isolde, Angélica o Roland.",
      "card_cids": [
        15082,
        13500,
        18827,
        15275,
        15276,
        15287
      ],
      "actions": [
        "Renaud es Cantante si fue Invocado mediante su procedimiento propio desde mano al controlar un Guerrero FUEGO; si Isolde lo Invoca desde Deck, ese cambio de tipo no se aplica.",
        "El Guerrero añadido por el efecto pertinente de Isolde tiene restricciones durante ese turno; no lo uses como si fuera una extensión libre.",
        "Angélica puede traer Roland solo si se abre su condición; para Charles Nivel 9 aún necesitas el material no Cantante exigido."
      ],
      "expected_result": "Materiales y condiciones correctos para cada Sincronía o Enlace, sin sumar un jefe ausente.",
      "resources_to_keep": "Equipos reales, niveles de los cuerpos y efectos todavía disponibles.",
      "alternative": "Si falta el Nivel 4 para Charles, conserva Roland y Angélica según su ruta, o elige otra salida documentada.",
      "related_route_ids": [
        "670:A09:CONNECTOR:ISOLDE01",
        "670:A09:ANGELICA:ROLAND02"
      ]
    }
  ]
}
```

## Revisión técnica y pedagógica individual — 23-11-2026, revisión 3

Se precisó Ogier, envío de Durendal, procedimiento de Renaud y niveles de Angélica; se distinguen búsquedas y negación de Magia/Trampa de Great Charles. Renaud 15082 cotejado en base oficial. No se certifica construcción de Charles desde una mano que no lo produce.

Se han leído las ocho lecciones. T2: ajuste de acciones y condiciones realizado en esta acta; T1/T3: contraste contra fuentes del expediente y rutas concretas, sin afirmar cotejo exhaustivo de todos los efectos; T4/T5: abiertos hasta reconciliar el JSON/Markdown, comprobar semántica restante y ejecutar las pruebas de la nueva revisión. No se ejecuta A02–A10 ni se aplica banlist.
