# A01 — cierre individual GOAT Control (699)

> **ESTADO VIGENTE: A01 REABIERTO — revisión funcional 2.** Los checks históricos inferiores conservan su valor de prueba técnica anterior, no certifican el nuevo estándar. Revalidar T1–T5 individualmente: diagnóstico, ocho lecciones prácticas, evidencia por lección, revisión semántica y lectura completa en navegador real. No cerrar por longitud, paridad o importación.

23-11-2026. Formato histórico GOAT. Main 40 / Extra 14 / Side 0 / Reserva 0; 39 identidades, cinco rutas. No se añaden cartas ni se aplica banlist. Extra y Side no son obligatorios para la elegibilidad de este formato.

Fuentes exactas: Markdown `e09c8cd57123f8c08bdcbe9cbc2787fc89b7265a`; JSON `e984a34fb993c3fa49b1bb7762e39459b0b399b7`. Referencias históricas del expediente: https://www.goatformat.com/rulings7.html y https://beta.goatformat.com/deck-guides/goat-control.

## T1 y T3 — diagnóstico y propósitos

Control de tempo y ventaja de cartas con FLIP, Magias/Trampas y Scapegoat/Metamorfosis. El plan principal prepara fichas durante turno rival y convierte una en Límite de los Mil Ojos durante un turno posterior propio. Mago de la Fe y Tsukuyomi permiten reutilizar recursos bajo sus ventanas. Parshath aporta daño penetrante y robo; BLS es remate condicionado por atributos del Cementerio. Límite de los Mil Ojos absorbe monstruos y restringe ataque/cambios de posición; no es una negación universal. La victoria depende de administrar intercambios y convertir ventaja en daño. No se aplica texto/errata moderna automáticamente.

| Propósito | CID, zona y fuente de identidad | Condición y riesgo | Ruta documental existente |
|---|---|---|---|
| Preparar control de mesa | [4818](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4818&ope=2), [5539](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5539&ope=2) Main; [4740](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4740&ope=2) Extra | Scapegoat necesita cuatro zonas libres y estar colocada desde un turno anterior para activarse durante el rival; no se activa desde mano en turno rival. No realizar otras Invocaciones ese turno. En turno propio posterior, tributar ficha Nivel 1 para Metamorfosis si sigue disponible. | `699:A09:G-C01` (interpretar su apertura bajo esta restricción) |
| Reciclar Magias | [4434](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4434&ope=2) Main | Mago de la Fe debe voltearse y tener una Magia elegible en GY; colocarlo o perderlo boca abajo sin voltearse no produce el efecto. | `699:A09:G-C02` |
| Reutilizar absorción | [5432](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5432&ope=2), [5780](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5780&ope=2) Main; [4740](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4740&ope=2) Extra | Libro/Tsukuyomi voltean un monstruo elegible boca abajo; comprobar reglas de posición y turno antes de volver a voltearlo. No prometer loop instantáneo ni una nueva absorción sin blanco. | `699:A09:G-C03` |
| Presión o conversión | [5023](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5023&ope=2), [5539](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5539&ope=2) Main; [5302](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5302&ope=2), [5528](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5528&ope=2) Extra | Parshath Nivel 5 puede producir ventaja por combate o convertirse mediante Meta en una Fusión de su Nivel. Son alternativas: tributarlo impide mantener su presión. Aplicar restricciones históricas de cada Fusión. | `699:A09:G-C04` |
| Remate LUZ/OSCURIDAD | [4812](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4812&ope=2), [5835](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5835&ope=2) Main | Caridad Grácil roba y descarta; BLS requiere estar en mano y desterrar un LUZ y un OSCURIDAD reales del GY. No conocer de antemano los robos ni garantizar atributos. | `699:A09:G-C05` |
| Intercambios defensivos | [4963](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4963&ope=2), [4887](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4887&ope=2), [5114](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5114&ope=2) Main | Crossout, Fuerza de Espejo y Torrencial dependen de objetivos o ventanas diferentes; no intercambiarlos como negaciones ni atribuir carta rival desconocida. | PENDIENTE_DE_ENLACE_A05_A09 |

CID, zonas y route_id comprobados en el paquete versionado. Se conservan referencias Konami de identidad y referencias históricas GOAT del expediente, sin afirmar revisión exhaustiva de rulings ni simular jugadas. Las Fusiones de Nivel 6/9 no se ofrecen como acceso natural sin Nivel correspondiente. No se inventan effect_id/motor_id ni rutas.

## Checklist
- [x] T1: diagnóstico y motores con condiciones y riesgos del formato.
- [x] T2: seis campos del perfil, cuatro cartas destacadas y cuatro fases.
- [x] T3: matriz por propósito con CID, zona, fuente, condición, riesgo y ruta o pendiente explícito.
- [x] T4: [CI #45275755236](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45275755236) PASS, estilo 180/190, resumen 228/250, seis campos en paridad.
- [x] T5: misma CI, job 138046988317, commit Platform `47c7552b61e446ec932d72fdbb7291cd95317967`, ISOLATED_PASS de importación/exportación/reimportación con 39 fotos, cinco rutas, ocho rechazos e inventario preservado. Presentación a 390 y 1280 px PASS. Job finalizado exitosamente.

Resultado: **5/5 acreditadas en entorno aislado**. Cero importaciones en producción. No iniciar A02.

## Revisión funcional 2 — ocho lecciones propuestas

Redacción individual basada en inventario y aperturas/resultados del paquete real, con condiciones y alternativas. No se modifica ningún efecto ni ruta; enlaces oficiales para cotejo. El nuevo cierre queda pendiente de la aplicación del contrato, verificación semántica completa y prueba real de interfaz.

- first: cartas [Scapegoat](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4818&ope=2), [Metamorfosis](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5539&ope=2), [Límite de los Mil Ojos](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4740&ope=2); rutas fuente `699:A09:G-C01`.
- second: cartas [Scapegoat](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4818&ope=2), [Metamorfosis](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5539&ope=2), [Límite de los Mil Ojos](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4740&ope=2), [Caballero del Aire Parshath](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5023&ope=2), [Balter Oscuro el Terrible](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5302&ope=2); rutas fuente `699:A09:G-C01`, `699:A09:G-C04`.
- mid: cartas [Mago de la Fe](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4434&ope=2), [Metamorfosis](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5539&ope=2), [Scapegoat](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4818&ope=2), [Olla de la Codicia](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4844&ope=2); rutas fuente `699:A09:G-C02`.
- late: cartas [Límite de los Mil Ojos](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4740&ope=2), [Libro de la Luna](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5432&ope=2), [Mago de la Fe](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4434&ope=2); rutas fuente `699:A09:G-C03`.
- weak_hand: cartas [Scapegoat](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4818&ope=2), [Mago de la Fe](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4434&ope=2), [Fuerza de Espejo](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4887&ope=2), [Tributo Torrencial](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5114&ope=2), [Metamorfosis](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5539&ope=2); rutas fuente `699:A09:G-C01`, `699:A09:G-C02`.
- disruption: cartas [Scapegoat](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4818&ope=2), [Metamorfosis](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5539&ope=2), [Mago de la Fe](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4434&ope=2), [Libro de la Luna](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5432&ope=2); rutas fuente `699:A09:G-C01`, `699:A09:G-C02`.
- win_condition: cartas [Caridad Grácil](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4812&ope=2), [Soldado del Brillo Negro - Enviado del Principio](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5835&ope=2), [Caballero del Aire Parshath](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5023&ope=2), [Límite de los Mil Ojos](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4740&ope=2); rutas fuente `699:A09:G-C05`, `699:A09:G-C04`.
- common_errors: cartas [Scapegoat](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4818&ope=2), [Metamorfosis](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5539&ope=2), [Límite de los Mil Ojos](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=4740&ope=2), [Libro de la Luna](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5432&ope=2), [Caballero del Aire Parshath](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5023&ope=2), [Balter Oscuro el Terrible](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5302&ope=2); rutas fuente `699:A09:G-C01`, `699:A09:G-C03`, `699:A09:G-C04`.

<!-- A01_ESTRATEGIA_REVISADA -->
```json
{
  "schema": "station-x-player-strategy/1",
  "sections": [
    {
      "id": "first",
      "title": "Primero: preparar las ovejas para el siguiente turno",
      "objective": "Establecer defensa y preparar la transformación sin gastar la Invocación propia.",
      "situation": "Scapegoat Colocada previamente, cuatro Zonas de Monstruos libres y ninguna otra Invocación ese turno. Conserva Metamorfosis en mano para el siguiente turno propio y Límite de los Mil Ojos en Extra.",
      "card_cids": [
        4818,
        5539,
        4740
      ],
      "actions": [
        "Durante el turno rival, activa Scapegoat en una ventana válida; Invoca cuatro fichas Oveja de Nivel 1 en Defensa. No realices otras Invocaciones ese turno.",
        "En tu siguiente Main Phase, si sobrevive al menos una ficha, activa Metamorfosis ofreciendo esa ficha de Nivel 1 como Tributo para Invocar Límite de los Mil Ojos.",
        "Utiliza su efecto de absorción contra un monstruo rival elegible. Conserva las fichas restantes como defensa, sin tratarlas como Tributos de una Invocación por Sacrificio."
      ],
      "expected_result": "Límite de los Mil Ojos puede absorber un monstruo elegible; quedan hasta tres fichas.",
      "resources_to_keep": "Metamorfosis y una ficha superviviente hasta tu Main Phase.",
      "alternative": "Si pierdes las fichas, utiliza las defensas disponibles y espera otro material válido.",
      "related_route_ids": [
        "699:A09:G-C01"
      ]
    },
    {
      "id": "second",
      "title": "Segundo: neutralizar antes de atacar",
      "objective": "Decidir si conviene absorber una amenaza o mantener un atacante que genere cartas.",
      "situation": "El rival presenta un monstruo; dispones de la línea de ovejas o de Parshath ya en Campo.",
      "card_cids": [
        4818,
        5539,
        4740,
        5023,
        5302
      ],
      "actions": [
        "Si tienes Scapegoat ya Colocada desde un turno previo, actívala durante el turno rival con cuatro zonas libres; si acabas de robarla, no asumas que puedes activarla desde mano en turno rival.",
        "En tu turno transforma una ficha y selecciona un monstruo que Límite pueda absorber.",
        "Si Parshath ya está en Campo, compara la retirada de una amenaza con la opción de atacar a un defensor de menor DEF: su perforación puede generar daño y su efecto permite robar cuando inflige daño de batalla."
      ],
      "expected_result": "Control de un monstruo rival o presión con robo de Parshath, según la posición.",
      "resources_to_keep": "Una defensa y la Magia de transformación si todavía no es necesaria.",
      "alternative": "Si Parshath debe convertirse en defensa, utiliza Metamorfosis para Balter cuando exista el Nivel correcto.",
      "related_route_ids": [
        "699:A09:G-C01",
        "699:A09:G-C04"
      ]
    },
    {
      "id": "mid",
      "title": "Juego medio: recuperar la Magia decisiva",
      "objective": "Obtener una segunda utilización de una Magia sin gastar cartas que no aportan valor.",
      "situation": "Mago de la Fe preparado para voltearse y una Magia útil en Cementerio.",
      "card_cids": [
        4434,
        5539,
        4818,
        4844
      ],
      "actions": [
        "Voltea Mago de la Fe mediante una acción legal y activa su efecto de volteo.",
        "Elige entre recuperar Metamorfosis para un material disponible, Scapegoat para defensa u otra Magia necesaria.",
        "Comprueba que el estado del Campo permita usar la carta recuperada antes de comprometerla."
      ],
      "expected_result": "Una Magia recuperada y una nueva decisión de control; no se garantiza otra Fusión.",
      "resources_to_keep": "El monstruo de Nivel adecuado o las zonas libres para la siguiente línea.",
      "alternative": "Si el Mago es destruido sin voltearse, no cuentes con la recuperación y conserva tu otra defensa.",
      "related_route_ids": [
        "699:A09:G-C02"
      ]
    },
    {
      "id": "late",
      "title": "Juego tardío: reutilizar Límite de los Mil Ojos",
      "objective": "Recuperar la capacidad de absorción cuando el estado de posición lo permite.",
      "situation": "Límite de los Mil Ojos sigue en Campo tras una absorción y tienes Libro de la Luna.",
      "card_cids": [
        4740,
        5432,
        4434
      ],
      "actions": [
        "Coloca Límite boca abajo con Libro de la Luna en una ventana permitida.",
        "Comprueba qué ocurrió con el monstruo equipado al perder el equipo válido.",
        "Voltea Límite en una ocasión legal futura y absorbe otra amenaza si cumple su objetivo."
      ],
      "expected_result": "Posibilidad de nueva absorción en el turno correspondiente, sin declarar un ciclo inmediato.",
      "resources_to_keep": "Libro de la Luna y Límite vivo hasta que pueda cambiar legalmente de posición.",
      "alternative": "Si todavía no puede voltearse, deja pasar el turno y protege la posición.",
      "related_route_ids": [
        "699:A09:G-C03"
      ]
    },
    {
      "id": "weak_hand",
      "title": "Mano débil: seleccionar una defensa",
      "objective": "Sobrevivir sin depender de reunir inmediatamente las dos Magias del motor.",
      "situation": "No tienes Metamorfosis y Scapegoat juntas o el Campo no admite cuatro fichas.",
      "card_cids": [
        4818,
        4434,
        4887,
        5114,
        5539
      ],
      "actions": [
        "Si Scapegoat está disponible, reserva una ventana rival con cuatro zonas libres.",
        "Si Mago de la Fe está disponible y tienes una Magia útil en Cementerio, prepara su volteo futuro.",
        "Si ninguna línea está lista, conserva una Trampa de defensa acorde con la amenaza rival."
      ],
      "expected_result": "Un turno adicional para encontrar el recurso faltante, no una Fusión asegurada.",
      "resources_to_keep": "Metamorfosis si falta material y zonas libres si tienes Scapegoat.",
      "alternative": "Si el rival retira el Mago boca abajo, continúa con la defensa real que permanezca.",
      "related_route_ids": [
        "699:A09:G-C01",
        "699:A09:G-C02"
      ]
    },
    {
      "id": "disruption",
      "title": "Interrupción: no sacrificar un recurso inexistente",
      "objective": "Evitar perder la continuación si las fichas desaparecen o una Magia no resuelve.",
      "situation": "Scapegoat o Metamorfosis recibe una respuesta rival o se elimina el material previsto.",
      "card_cids": [
        4818,
        5539,
        4434,
        5432
      ],
      "actions": [
        "Confirma cuántas fichas sobrevivieron y si Metamorfosis sigue en mano.",
        "Si no queda ficha de Nivel 1, no declares Límite de los Mil Ojos.",
        "Si una Magia llegó al Cementerio y Mago de la Fe puede voltearse, recupera el recurso que falte."
      ],
      "expected_result": "Continuación solo con material y Magia reales; una defensa menor si la transformación no procede.",
      "resources_to_keep": "Libro de la Luna o una defensa de batalla que no se haya gastado.",
      "alternative": "Si la recuperación tampoco es viable, protege tus LP y espera una nueva oportunidad.",
      "related_route_ids": [
        "699:A09:G-C01",
        "699:A09:G-C02"
      ]
    },
    {
      "id": "win_condition",
      "title": "Ganar: Soldado del Brillo Negro o ventaja sostenida",
      "objective": "Convertir los intercambios de control en daño sin presumir atributos o cartas robadas.",
      "situation": "Caridad Grácil disponible y Soldado del Brillo Negro en mano o accesible; LP rivales conocidos.",
      "card_cids": [
        4812,
        5835,
        5023,
        4740
      ],
      "actions": [
        "Resuelve Caridad Grácil y decide los descartes según las cartas realmente robadas.",
        "Si hay un monstruo LUZ y uno OSCURIDAD elegibles en Cementerio, destierra uno de cada Atributo para Invocar Especialmente al Soldado del Brillo Negro desde mano.",
        "Elige entre desterrar una amenaza o atacar, respetando que la opción de destierro impide atacar ese turno."
      ],
      "expected_result": "Presión de batalla o eliminación de un objetivo con el Soldado; Parshath puede sostener ventaja por robo.",
      "resources_to_keep": "Un monstruo de cada Atributo hasta pagar la condición y una defensa para el turno siguiente.",
      "alternative": "Si faltan los Atributos, conserva el plan de control de Límite o Parshath.",
      "related_route_ids": [
        "699:A09:G-C05",
        "699:A09:G-C04"
      ]
    },
    {
      "id": "common_errors",
      "title": "Errores: ovejas, niveles y turnos",
      "objective": "Evitar Invocaciones incorrectas y pérdidas de cartas por transformar sin necesidad.",
      "situation": "Vas a activar Scapegoat, Metamorfosis o Libro de la Luna sobre una Fusión.",
      "card_cids": [
        4818,
        5539,
        4740,
        5432,
        5023,
        5302
      ],
      "actions": [
        "Scapegoat requiere cuatro zonas y restringe otras Invocaciones ese turno; sus fichas no son Tributos para una Invocación por Sacrificio.",
        "Metamorfosis sí puede ofrecer una ficha válida; el Nivel del material debe corresponder al destino de Fusión.",
        "No mantengas Parshath después de sacrificarlo para Balter ni voltees Límite antes de una ocasión legal."
      ],
      "expected_result": "Transformación y recuperación coherentes con los recursos y las reglas GOAT documentadas.",
      "resources_to_keep": "Los Niveles correctos y la defensa que permita esperar otro turno.",
      "alternative": "Si el Nivel requerido no existe en Campo, conserva la Magia para un material que sí lo cumpla.",
      "related_route_ids": [
        "699:A09:G-C01",
        "699:A09:G-C03",
        "699:A09:G-C04"
      ]
    }
  ]
}
```

## Revisión técnica y pedagógica individual — 23-11-2026, revisión 3

Se concretó que la mano necesita Metamorfosis para el turno propio, que Scapegoat debe colocarse previamente si se activa en turno rival y que su efecto impide otras Invocaciones durante ese turno. Se añadieron las funciones tácticas de Límite y Parshath sin mezclar reglas TCG modernas con GOAT. El resultado de BLS sigue condicionado al Cementerio real.

Se han leído las ocho lecciones. T2: ajuste de acciones y condiciones realizado en esta acta; T1/T3: contraste contra fuentes del expediente y rutas concretas, sin afirmar cotejo exhaustivo de todos los efectos; T4/T5: abiertos hasta reconciliar el JSON/Markdown, comprobar semántica restante y ejecutar las pruebas de la nueva revisión. No se ejecuta A02–A10 ni se aplica banlist.
