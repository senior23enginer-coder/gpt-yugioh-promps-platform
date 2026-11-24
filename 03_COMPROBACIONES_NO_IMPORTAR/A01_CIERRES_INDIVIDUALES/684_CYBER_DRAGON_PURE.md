# A01 — verificación individual Cyber Dragon Pure (684)

> **ESTADO VIGENTE: A01 REABIERTO — revisión funcional 2.** Los checks históricos inferiores conservan su valor de prueba técnica anterior, no certifican el nuevo estándar. Revalidar T1–T5 individualmente: diagnóstico, ocho lecciones prácticas, evidencia por lección, revisión semántica y lectura completa en navegador real. No cerrar por longitud, paridad o importación.

23-11-2026. TCG Advanced. Main 42 / Extra 15 / Side 0 / Reserva 24; 52 identidades, 17 rutas. Inventario inalterado; Reserva no equivale a Side. No se evalúa banlist.

Fuentes versionadas: Markdown blob `4b8f72ccbacadef9af00920fe45bb1410f4d1bbf`; JSON blob `c8b37e52bb6d70e6c573166e8ab441be12a07a47`.

## T1 y T3 — diagnóstico y matriz de propósitos

Estrategia Combo/OTK de Máquinas orientada a romper el campo rival mediante procedimientos de Chimeratech y presión de Fusión; Nova/Infinity ofrece interacción alternativa al ir primero. Core y Emergency aportan búsqueda, Herz y Nachster recuperación y extensión condicionadas; Cyberdark Realm, Claw y Chimera permiten acceder al submotor Power Bond. Clockwork Night facilita Fortress cuando los materiales pueden enviarse al GY. La victoria depende de convertir recursos y ventanas reales en daño de combate, no de garantizar OTK. Riesgos: restricciones a Máquinas, efectos excluyentes de Herz, daño de Power Bond, materiales inaccesibles y falta de un monstruo rival elegible.

| Propósito | CID y zona | Condición, riesgo y límite | Ruta existente |
|---|---|---|---|
| Presión con Rampage | [6783](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6783&ope=2), [10866](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=10866&ope=2), [13723](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13723&ope=2) Main; [11764](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11764&ope=2) Extra | Overload requiere materiales elegibles; la apertura registrada consume Core y Herz del GY. Rampage necesita enviar Máquinas LUZ del Deck para obtener ataques adicionales contra monstruos; no garantizar daño ni atacar directamente varias veces. | `684:A09:OVERLOAD:RAMPAGE01` |
| Submotor Cyberdark | [13181](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13181&ope=2), [16298](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=16298&ope=2), [16296](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=16296&ope=2), [6398](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6398&ope=2) Main; [11764](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11764&ope=2) Extra | La apertura Claw/Realm/Power Bond registrada exige cuatro cartas, descartes y Normal adicional; Rampage gana 2100 ATK y existe daño de End Phase. No atribuir a Claw solo el resultado final. | `684:A09:CLAW:REALM:POWERBOND:RAMPAGE01` |
| Ruptura mediante Fortress | [10866](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=10866&ope=2), [17625](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17625&ope=2) Main; [7403](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7403&ope=2) Extra | Night convierte monstruos boca arriba en Máquinas; Core cuenta como Cyber Dragon en Campo. Fortress requiere materiales que puedan enviarse al GY, no destrucción ni efecto de negación. | `684:A09:CLOCKWORK:FORTRESS01` |
| Ruptura mediante Megafleet | [6390](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6390&ope=2), [10866](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=10866&ope=2) Main; [13358](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13358&ope=2) Extra | Necesita monstruo Cyber Dragon y material elegible en Zona de Monstruos Extra. No retirar arbitrariamente un monstruo en zona principal ni garantizar continuación. | `684:A09:MEGAFLEET:CYBER01`, `684:A09:MEGAFLEET:CORE01` |
| Control Xyz | [6390](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6390&ope=2), [13770](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13770&ope=2), [13723](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13723&ope=2) Main; [10870](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=10870&ope=2), [11765](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11765&ope=2) Extra | La apertura requiere Herz previamente en GY y monstruo rival para Invocar Cyber Dragon original por su procedimiento. Herz puede hacerse Nivel 5 si cumple su condición; Nova necesita dos Máquinas Nivel 5. Infinity puede superponerse a Nova; su negación exige material y ventana legal. | `684:A09:REV:HERZ:NOVA:INFINITY01` |
| Recuperación y ofensiva | [14047](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=14047&ope=2), [6390](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6390&ope=2) Main; [13758](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13758&ope=2) Extra | Nachster descarta otro monstruo y requiere Máquina elegible con 2100 ATK/DEF en GY para recuperar; su efecto limita posteriores Invocaciones Especiales a Máquinas. Sieger necesita materiales legales y una ventana de Battle Phase para aumentar ATK/DEF. No prometer daño letal. | `684:A09:NACHSTER:SIEGER01` |

CID, zonas, rutas y fuentes comprobados en el registro exacto; las fuentes Konami proceden de las fichas versionadas. No se atribuye una nueva revisión exhaustiva del texto oficial ni ejecución de combos. El registro no contiene record.calculator; los effect_id/motor_id inexistentes quedan PENDIENTE_DE_ENLACE_A05_A09. No iniciar A02.

## Checklist

- [x] T1: diagnóstico específico, motores, estrategia y riesgos.
- [x] T2: seis campos de perfil, cuatro cartas destacadas y cuatro fases.
- [x] T3: matriz individual con CID, zonas, fuentes, condiciones y rutas existentes.
- [x] T4: [CI #45274393388](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45274393388) PASS, estilo 67/190, resumen 227/250, paridad Markdown/JSON de seis campos.
- [x] T5: misma CI, job 138042292852, commit Platform `c8e38d72bdcfc3bbc2826d2f6056e4b99d9f1b7e`: ISOLATED_PASS de importación/exportación/reimportación, 52 fotografías, 17 rutas, ocho rechazos, inventario conservado. PASS de presentación del paquete real a 390 y 1280 px. Job finalizado exitosamente.

Resultado: **5/5 acreditadas en entorno aislado**. Cero importaciones en producción. No iniciar A02.

## Revisión funcional 2 — ocho lecciones propuestas

Redacción individual basada en inventario y aperturas/resultados del paquete real, con condiciones y alternativas. No se modifica ningún efecto ni ruta; enlaces oficiales para cotejo. El nuevo cierre queda pendiente de la aplicación del contrato, verificación semántica completa y prueba real de interfaz.

- first: cartas [Cyber Dragon Core](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=10866&ope=2), [Cyberdark Wurm [Konami 21164]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21164&ope=2), [Cyber Revsystem](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13770&ope=2), [Cyber Dragon](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6390&ope=2), [Cyber Dragon Nova (Konami ID 10870)](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=10870&ope=2), [Cyber Dragon Infinity (Konami ID 11765)](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11765&ope=2), [Cybernetic Overflow](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13787&ope=2); rutas fuente `684:A09:V11:CORE:WURM:REVSYSTEM:INFINITY:OVERFLOW`, `684:A09:REV:HERZ:NOVA:INFINITY01`.
- second: cartas [Clockwork Night](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17625&ope=2), [Cyber Dragon Core](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=10866&ope=2), [Cyber Dragon](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6390&ope=2), [Chimeratech Fortress Dragon](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7403&ope=2), [Chimeratech Megafleet Dragon](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13358&ope=2); rutas fuente `684:A09:CLOCKWORK:FORTRESS01`, `684:A09:MEGAFLEET:CYBER01`, `684:A09:MEGAFLEET:CORE01`.
- mid: cartas [Overload Fusion](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6783&ope=2), [Cyber Dragon Core](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=10866&ope=2), [Cyber Dragon Herz](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13723&ope=2), [Chimeratech Rampage Dragon (Konami ID 11764)](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11764&ope=2), [Cyber Dragon](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6390&ope=2), [Cyber Dragon Nachster](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=14047&ope=2); rutas fuente `684:A09:OVERLOAD:RAMPAGE01`, `684:A09:OVERLOAD:CYBERLOAD:DOUBLE_RAMPAGE01`.
- late: cartas [Overload Fusion](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6783&ope=2), [Cyberload Fusion](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13849&ope=2), [Cyber Dragon Core](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=10866&ope=2), [Cyber Dragon Herz](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13723&ope=2), [Chimeratech Rampage Dragon (Konami ID 11764)](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11764&ope=2); rutas fuente `684:A09:OVERLOAD:CYBERLOAD:DOUBLE_RAMPAGE01`.
- weak_hand: cartas [Cyber Dragon](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6390&ope=2), [Cyber Dragon Nachster](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=14047&ope=2), [Cyber Dragon Sieger](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13758&ope=2), [Cyber Dragon Core](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=10866&ope=2), [Cyber Emergency](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=8428&ope=2), [S:P Little Knight](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19188&ope=2); rutas fuente `684:A09:NACHSTER:SIEGER01`, `684:A09:CYBER:CORE:SP_DEFENSA11`.
- disruption: cartas [Cyber Dragon Core](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=10866&ope=2), [Cyber Dragon](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6390&ope=2), [Clockwork Night](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17625&ope=2), [Chimeratech Fortress Dragon](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7403&ope=2), [Overload Fusion](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6783&ope=2), [Chimeratech Rampage Dragon (Konami ID 11764)](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11764&ope=2); rutas fuente `684:A09:CLOCKWORK:FORTRESS01`, `684:A09:OVERLOAD:RAMPAGE01`, `684:A09:REV:HERZ:NOVA:INFINITY01`.
- win_condition: cartas [Chimeratech Rampage Dragon (Konami ID 11764)](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11764&ope=2), [Power Bond](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6398&ope=2), [Overload Fusion](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6783&ope=2), [Cyber Dragon Sieger](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13758&ope=2), [Limiter Removal](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5129&ope=2); rutas fuente `684:A09:OVERLOAD:RAMPAGE01`, `684:A09:CLAW:REALM:POWERBOND:RAMPAGE01`.
- common_errors: cartas [Chimeratech Megafleet Dragon](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13358&ope=2), [Chimeratech Fortress Dragon](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7403&ope=2), [Power Bond](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=6398&ope=2), [Cyberload Fusion](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13849&ope=2), [Cyber Dragon Infinity (Konami ID 11765)](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11765&ope=2), [Cyber Eternity Dragon](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13847&ope=2); rutas fuente `684:A09:MEGAFLEET:CORE01`, `684:A09:POWERBOND:CYBER_HERZ_NACHSTER:ETERNITY10`, `684:A09:REV:HERZ:NOVA:INFINITY01`.

<!-- A01_ESTRATEGIA_REVISADA -->
```json
{
  "schema": "station-x-player-strategy/1",
  "sections": [
    {
      "id": "first",
      "title": "Primero: Infinity y una respuesta adicional",
      "objective": "Construir una negación de activación sin confundir los materiales con monstruos independientes.",
      "situation": "Core, Wurm y Revsystem disponibles según la apertura; Cyber Dragon en Deck y Nova e Infinity en Extra.",
      "card_cids": [
        10866,
        21164,
        13770,
        6390,
        10870,
        11765,
        13787
      ],
      "actions": [
        "Invoca Normalmente Core y busca Cybernetic Overflow del Deck.",
        "Con Core en Campo, activa Wurm enviando Cyber Dragon original desde Deck al Cementerio como coste; Invoca Wurm si resuelve. Activa Cyber Revsystem para recuperar Cyber Dragon original.",
        "Superpón Wurm y Cyber Dragon, Máquinas de Nivel 5, para Nova; sobrepón Infinity transfiriendo los materiales y Coloca Overflow."
      ],
      "expected_result": "Infinity con tres materiales, Core y Overflow colocada en la apertura indicada; una respuesta de Infinity y la retirada de Overflow son distintas.",
      "resources_to_keep": "Un material para Infinity y Core disponible como recurso de Overflow.",
      "alternative": "Si falta Wurm pero Cyber Dragon y Revsystem están en mano con Herz ya en Cementerio, utiliza esa variante.",
      "related_route_ids": [
        "684:A09:V11:CORE:WURM:REVSYSTEM:INFINITY:OVERFLOW",
        "684:A09:REV:HERZ:NOVA:INFINITY01"
      ]
    },
    {
      "id": "second",
      "title": "Segundo: retirar monstruos sin combate",
      "objective": "Aprovechar el campo rival como material para Fortress o Megafleet cuando corresponde.",
      "situation": "Clockwork Night y Core, o Cyber Dragon disponible frente a un monstruo rival situado en Zona Extra y apto como material.",
      "card_cids": [
        17625,
        10866,
        6390,
        7403,
        13358
      ],
      "actions": [
        "Con Core y Clockwork Night, usa la búsqueda de Core y confirma que la carta rival ahora es Máquina.",
        "Si el material puede enviarse al Cementerio, utiliza el procedimiento de Fortress con Core y la Máquina rival.",
        "Si el problema es un monstruo elegible en Zona Extra, usa Cyber Dragon para Megafleet en lugar de depender de Clockwork Night."
      ],
      "expected_result": "Fortress o Megafleet y el monstruo rival enviado como material; la elección depende del tipo, zona y restricciones reales.",
      "resources_to_keep": "Cyber Emergency buscada por Core y las cartas de Fusión que no se hayan gastado.",
      "alternative": "Si el rival solo controla monstruos de zonas principales y no son Máquina, Megafleet no ofrece esa retirada.",
      "related_route_ids": [
        "684:A09:CLOCKWORK:FORTRESS01",
        "684:A09:MEGAFLEET:CYBER01",
        "684:A09:MEGAFLEET:CORE01"
      ]
    },
    {
      "id": "mid",
      "title": "Juego medio: usar los Ciber del Cementerio",
      "objective": "Recuperar un campo ofensivo después de que los primeros Ciber Dragones se conviertan en recursos.",
      "situation": "Overload Fusion en mano, Core y Herz en Cementerio, Rampage disponible en Extra.",
      "card_cids": [
        6783,
        10866,
        13723,
        11764,
        6390,
        14047
      ],
      "actions": [
        "Activa Overload usando los materiales requeridos del Cementerio; comprueba los nombres aplicables allí.",
        "Con Rampage, decide qué Máquinas LUZ enviar del Deck para habilitar ataques adicionales.",
        "Si envías Herz y su efecto está disponible, revisa qué Cyber Dragon original puedes recuperar."
      ],
      "expected_result": "Rampage listo para ataques múltiples si resolvió el efecto y se enviaron las cartas requeridas; materiales de Overload quedan desterrados.",
      "resources_to_keep": "Cyber Dragon recuperable y una copia de Cyberload para recursos desterrados si luego es legal.",
      "alternative": "Si no hay dos materiales aptos para Rampage, conserva Overload para cuando los recursos estén disponibles.",
      "related_route_ids": [
        "684:A09:OVERLOAD:RAMPAGE01",
        "684:A09:OVERLOAD:CYBERLOAD:DOUBLE_RAMPAGE01"
      ]
    },
    {
      "id": "late",
      "title": "Juego tardío: reciclar destierro con Cyberload",
      "objective": "Convertir recursos desterrados en otra Fusión cuando el primer Rampage ya no basta.",
      "situation": "Overload y Cyberload disponibles, con Core y Herz preparados inicialmente en Cementerio y destinos apropiados en Extra.",
      "card_cids": [
        6783,
        13849,
        10866,
        13723,
        11764
      ],
      "actions": [
        "Primero usa Overload para producir Rampage y deja identificados los materiales desterrados boca arriba.",
        "Después, si esos materiales son elegibles para Cyberload, devuélvelos al Deck mediante su efecto para la nueva Fusión.",
        "Respeta la restricción de ataques de Cyberload: únicamente la criatura fusionada por esa Magia podrá atacar el resto del turno."
      ],
      "expected_result": "Dos Rampage en el caso documentado, pero solo el segundo puede atacar tras Cyberload; no se suman ataques de ambos.",
      "resources_to_keep": "Una reserva de nombres Ciber en el Deck y las Máquinas que aún puedas enviar.",
      "alternative": "Si el primer Rampage tiene ataques suficientes, evita Cyberload hasta un momento en que su restricción no reduzca tu daño.",
      "related_route_ids": [
        "684:A09:OVERLOAD:CYBERLOAD:DOUBLE_RAMPAGE01"
      ]
    },
    {
      "id": "weak_hand",
      "title": "Mano débil: Cyber Dragon y Nachster",
      "objective": "Construir un Enlace útil sin exigir dos Nivel 5 desde el inicio.",
      "situation": "Cyber Dragon original y Nachster en mano, Sieger disponible y condiciones de Invocación de la ruta cumplidas.",
      "card_cids": [
        6390,
        14047,
        13758,
        10866,
        8428,
        19188
      ],
      "actions": [
        "Descarta Cyber Dragon original como coste del efecto de Nachster en mano; Invoca Nachster. En nueva cadena selecciona Cyber Dragon de 2100 ATK en Cementerio para revivirlo; desde esa resolución, solo Invocaciones Especiales de Máquinas el resto del turno.",
        "Enlaza ambos monstruos Máquina hacia Sieger, sin gastar la Normal. En Battle Phase, si Sieger no declaró ataque, su efecto puede dar +2100 ATK/DEF a una Máquina propia con al menos 2100 ATK; comprueba la restricción de daño de batalla.",
        "Si en cambio dispones de Cyber Dragon y Core, usa Core para buscar Cyber Emergency y considera la salida defensiva de S:P."
      ],
      "expected_result": "Sieger (2100 ATK base) y Normal libre tras la línea Nachster. La rama Cyber Dragon + Core hacia S:P es diferente y no debe hacerse bajo el bloqueo Máquina de Nachster.",
      "resources_to_keep": "La Normal o Cyber Emergency según la apertura que hayas elegido.",
      "alternative": "Si no tienes dos cuerpos válidos, conserva Cyber Dragon como presión y evita gastar la única pieza de recuperación.",
      "related_route_ids": [
        "684:A09:NACHSTER:SIEGER01",
        "684:A09:CYBER:CORE:SP_DEFENSA11"
      ]
    },
    {
      "id": "disruption",
      "title": "Interrupción: mantener otra vía de acceso",
      "objective": "Evitar perder toda la mano al ser negada la búsqueda de Core o el acceso a Nova.",
      "situation": "El rival responde a Core, Revsystem o Nova, pero aún conservas otros recursos en mano o Cementerio.",
      "card_cids": [
        10866,
        6390,
        17625,
        7403,
        6783,
        11764
      ],
      "actions": [
        "Si Core no buscó, comprueba si aún permanece como material de Cyber Dragon en Campo.",
        "Si Clockwork Night y un monstruo rival Máquina son elegibles, evalúa Fortress sin depender de la búsqueda perdida.",
        "Si Revsystem no recuperó Herz, no cuentes dos Nivel 5; conserva la Fusión si ya tienes materiales aptos en Cementerio."
      ],
      "expected_result": "Una alternativa de retirada o Fusión solo si existen sus requisitos; Infinity no aparece sin los materiales de Nova.",
      "resources_to_keep": "Clockwork Night, Overload y los nombres Ciber aún utilizables.",
      "alternative": "Si no queda salida de Extra demostrable, conserva una defensa de mano y prepara la siguiente apertura.",
      "related_route_ids": [
        "684:A09:CLOCKWORK:FORTRESS01",
        "684:A09:OVERLOAD:RAMPAGE01",
        "684:A09:REV:HERZ:NOVA:INFINITY01"
      ]
    },
    {
      "id": "win_condition",
      "title": "Ganar: calcular los ataques de Rampage",
      "objective": "Cerrar con daño de batalla real y tener en cuenta el coste futuro de Power Bond.",
      "situation": "Rampage en Campo, Battle Phase disponible y monstruos rivales identificados; Power Bond puede formar parte de la apertura.",
      "card_cids": [
        11764,
        6398,
        6783,
        13758,
        5129
      ],
      "actions": [
        "Rampage puede enviar hasta dos Máquinas LUZ desde Deck al Cementerio y obtener un ataque adicional por cada una durante la Battle Phase de ese turno, si su efecto resuelve.",
        "Si fue Invocado por Power Bond, calcula su ATK aumentado y el daño que recibirás en End Phase si no terminas el duelo.",
        "Antes de usar Sieger o Limiter Removal, comprueba sus condiciones y calcula el daño después de defensas y restricciones."
      ],
      "expected_result": "Ataques múltiples de Rampage y presión aumentada cuando correspondan; el letal depende de los LP y del campo rival.",
      "resources_to_keep": "Una salida posterior y suficientes LP para el posible daño de Power Bond.",
      "alternative": "Si no puedes cerrar, prioriza una respuesta de Infinity o conserva Rampage sin consumir otro recurso de daño.",
      "related_route_ids": [
        "684:A09:OVERLOAD:RAMPAGE01",
        "684:A09:CLAW:REALM:POWERBOND:RAMPAGE01"
      ]
    },
    {
      "id": "common_errors",
      "title": "Errores: materiales y límite de ataques",
      "objective": "Evitar confundir las distintas Fusiones y la protección que otorga cada carta.",
      "situation": "Estás eligiendo Megafleet, Fortress, Power Bond, Cyberload o la negación de Infinity.",
      "card_cids": [
        13358,
        7403,
        6398,
        13849,
        11765,
        13847
      ],
      "actions": [
        "Megafleet exige una carta elegible en Zona Extra; Fortress necesita Cyber Dragon y material Máquina apto para el envío.",
        "El aumento de Power Bond no evita el daño de End Phase y Cyberload restringe quién puede atacar después.",
        "Infinity debe disponer del material requerido y de una activación a la que responder; no niega automáticamente todo el campo."
      ],
      "expected_result": "Invocaciones, ataques y respuestas calculados con las restricciones correctas.",
      "resources_to_keep": "Material de Infinity o un recurso Ciber para reconstruir si no termina el duelo.",
      "alternative": "Si una Fusión no puede cumplir sus materiales, elige otra salida documentada sin inventar una protección de Eternity.",
      "related_route_ids": [
        "684:A09:MEGAFLEET:CORE01",
        "684:A09:POWERBOND:CYBER_HERZ_NACHSTER:ETERNITY10",
        "684:A09:REV:HERZ:NOVA:INFINITY01"
      ]
    }
  ]
}
```

## Revisión técnica y pedagógica individual — 23-11-2026, revisión 3

Se precisó apertura Core/Wurm/Revsystem, coste y retorno de Nachster, restricción Máquina y uso de Sieger. Fuente oficial Nachster 14047 cotejada. Las rutas de Fusión mantienen sus condiciones; efectos de todo el inventario no se han recertificado en esta revisión.

Se han leído las ocho lecciones. T2: ajuste de acciones y condiciones realizado en esta acta; T1/T3: contraste contra fuentes del expediente y rutas concretas, sin afirmar cotejo exhaustivo de todos los efectos; T4/T5: abiertos hasta reconciliar el JSON/Markdown, comprobar semántica restante y ejecutar las pruebas de la nueva revisión. No se ejecuta A02–A10 ni se aplica banlist.
