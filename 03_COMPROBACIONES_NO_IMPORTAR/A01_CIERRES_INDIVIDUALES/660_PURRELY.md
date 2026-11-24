# A01 — verificación individual Purrely (660)

> **ESTADO VIGENTE: A01 REABIERTO — revisión funcional 2.** Los checks históricos inferiores conservan su valor de prueba técnica anterior, no certifican el nuevo estándar. Revalidar T1–T5 individualmente: diagnóstico, ocho lecciones prácticas, evidencia por lección, revisión semántica y lectura completa en navegador real. No cerrar por longitud, paridad o importación.

23-11-2026. TCG Advanced. Main 48 / Extra 15 / Side 7 / Reserva 0; 36 identidades, cinco rutas. Inventario inalterado. No se evalúa banlist ni se completa el Side artificialmente.

Fuentes versionadas: revisión GPT `a9c214433ceb4cd955e705465547df1a36cf4f0b`, Markdown blob `d88d223d1a1d8c3c727fc4c67e83b4a686e9948b` y JSON blob `0f1d81fd4bc37ac113b4127c9de183c26f41b27b`. Comparación con la revisión anterior: inventario idéntico y todos los campos de record ajenos a profile/player_guide idénticos. Los estados históricos de A02–A10 permanecen intactos.

## T1 y T3 — diagnóstico y matriz de propósitos

Control/Midrange mediante Recuerdos Rápidos, Xyz de Rango 2 y gestión de materiales. Purrely explora tres cartas y puede obtener una Mágica/Trampa Purrely disponible; revela un Recuerdo Rápido desde mano para una Xyz compatible. Purrelyly busca una carta Purrely excepto Mágica Rápida y convierte un Recuerdo Rápido del GY en material. Belleza ofrece interacción, Rechoncho acumula materiales y Felicidad aporta búsqueda condicionada a batalla. Noir Rango 7 protege únicamente ante efectos activados rivales mientras tenga al menos cinco materiales; su retirada consume dos y es rápida si conserva un Purrely Nivel 1. Mi Amigo gestiona recursos en mano, no acopla materiales directamente. La condición de victoria depende del control y presión reales, no de OTK ni de excavación garantizada.

| Propósito | CID, zona y fuente oficial | Condición, riesgo y límite | Ruta existente (documental) |
|---|---|---|---|
| Interacción inicial | [18003](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18003&ope=2), [18012](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18012&ope=2) Main; [18005](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18005&ope=2) Extra | Purrely revela Bello Recuerdo en mano; Belleza necesita material Bello para convertir su negación en rápida. No depender de una excavación con resultado desconocido. | `660:A09:P-C01` |
| Materiales desde GY | [18481](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18481&ope=2), [18013](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18013&ope=2) Main; [18006](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18006&ope=2) Extra | Purrelyly necesita Delicioso Recuerdo previamente en GY; Rechoncho puede acoplar hasta dos M/T elegibles de los Cementerios. Cuatro materiales en el caso documentado no satisfacen el umbral alternativo de Noir. | `660:A09:P-C02` |
| Noir permanente | [18006](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18006&ope=2), [18008](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18008&ope=2) Extra; Recuerdo adicional Main | Una Xyz Rango 2 con cinco o más materiales permite el ascenso alternativo. Rechoncho debe resolver el acople necesario; Noir no tiene inmunidad universal y el gasto de dos materiales puede reducir su protección. | `660:A09:P-C03` |
| Noir temporal | [18014](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18014&ope=2) Main; [18008](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18008&ope=2) Extra | Purrelysalto requiere una Xyz Purrely seleccionable y una trampa legalmente activable. La nueva Xyz vuelve al Extra en la End Phase del próximo turno. Su protección depende de materiales reales; no es equivalente a un ascenso permanente. | `660:A09:P-C04` |
| Ofensiva y cierre | [18003](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18003&ope=2), [18011](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18011&ope=2) Main; [18004](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18004&ope=2), [15524](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15524&ope=2) Extra | Felicidad necesita batalla real para búsqueda. ZEUS es alternativa en Main Phase 2 si un Xyz batalló, hay material Xyz propio y no existe bloqueo incompatible. No atribuir daño garantizado. | `660:A09:P-C05` |
| Recuperar y proteger recursos | [18010](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18010&ope=2), [18009](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18009&ope=2), [21338](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=21338&ope=2) Main | Mi Amigo paga 500 LP y presenta tres cartas elegibles para selección aleatoria; puede recuperar hasta tres Recuerdos Rápidos distintos si una Xyz propia boca arriba sale por carta rival. Calle protege bajo sus condiciones; Kambi puede limitar Invocaciones Especiales a Hadas. No inventar materiales ni una ruta independiente. | PENDIENTE_DE_ENLACE_A05_A09 |

CID, zonas y rutas contrastados con el registro exacto. Se contrastaron directamente en Konami los efectos de Purrelyly, Rechoncho, Noir, Purrelysalto y Mi Amigo para corregir la imprecisión del perfil/guía anterior. No se atribuye nueva revisión exhaustiva de las 36 cartas, legalidad de todos los combos ni replays. El registro no contiene record.calculator; no se fabrican effect_id ni motor_id.

## Checklist

- [x] T1: diagnóstico estratégico, motores, condiciones y riesgos.
- [x] T2: seis campos corregidos en JSON y Markdown; cuatro cartas destacadas y cuatro fases específicas, enlazadas a rutas existentes.
- [x] T3: matriz por propósito con CID, zona, fuente, condición, riesgo y route_id existente o pendiente.
- [x] T4: [CI #45275755236](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45275755236), job 138046988317, commit Platform `47c7552b61e446ec932d72fdbb7291cd95317967`, PASS para la revisión GPT `a9c214433ceb4cd955e705465547df1a36cf4f0b`: seis campos en paridad, estilo 144/190, resumen 196/250, cuatro cartas y cuatro fases.
- [x] T5: misma CI finalizada exitosamente: ISOLATED_PASS de importación/exportación/reimportación; 36 fotos, cinco rutas, ocho rechazos y cantidades preservadas. PASS de navegador del paquete revisado a 390 y 1280 px.

Resultado: **5/5 acreditadas en entorno aislado**. Cero importaciones en producción. No iniciar A02.

## Revisión funcional 2 — ocho lecciones propuestas

Redacción individual basada en inventario y aperturas/resultados del paquete real, con condiciones y alternativas. No se modifica ningún efecto ni ruta; enlaces oficiales para cotejo. El nuevo cierre queda pendiente de la aplicación del contrato, verificación semántica completa y prueba real de interfaz.

- first: cartas [Purrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18003&ope=2), [Bello Recuerdo Purrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18012&ope=2), [Belleza Epurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18005&ope=2); rutas fuente `660:A09:P-C01`, `660:A09:P-C02`.
- second: cartas [Purrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18003&ope=2), [Feliz Recuerdo Purrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18011&ope=2), [Felicidad Epurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18004&ope=2), [Divino Arsenal AA-ZEUS - Trueno del Cielo](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15524&ope=2); rutas fuente `660:A09:P-C05`, `660:A09:P-C01`.
- mid: cartas [Purrelyly](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18481&ope=2), [Delicioso Recuerdo Purrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18013&ope=2), [Rechoncho Epurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18006&ope=2), [Noir Expurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18008&ope=2); rutas fuente `660:A09:P-C02`, `660:A09:P-C03`.
- late: cartas [Rechoncho Epurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18006&ope=2), [Noir Expurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18008&ope=2), [¿¡Purrelysaltó!?](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18014&ope=2), [Delicioso Recuerdo Purrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18013&ope=2); rutas fuente `660:A09:P-C03`, `660:A09:P-C04`.
- weak_hand: cartas [Purrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18003&ope=2), [Purrelyly](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18481&ope=2), [Bello Recuerdo Purrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18012&ope=2), [Delicioso Recuerdo Purrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18013&ope=2), [Belleza Epurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18005&ope=2), [Rechoncho Epurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18006&ope=2); rutas fuente `660:A09:P-C01`, `660:A09:P-C02`.
- disruption: cartas [Purrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18003&ope=2), [Purrelyly](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18481&ope=2), [Rechoncho Epurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18006&ope=2), [Noir Expurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18008&ope=2), [¿¡Purrelysaltó!?](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18014&ope=2); rutas fuente `660:A09:P-C01`, `660:A09:P-C03`, `660:A09:P-C04`.
- win_condition: cartas [Noir Expurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18008&ope=2), [Felicidad Epurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18004&ope=2), [Rechoncho Epurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18006&ope=2), [Divino Arsenal AA-ZEUS - Trueno del Cielo](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15524&ope=2); rutas fuente `660:A09:P-C03`, `660:A09:P-C05`.
- common_errors: cartas [Rechoncho Epurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18006&ope=2), [Noir Expurrely](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18008&ope=2), [¿¡Purrelysaltó!?](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18014&ope=2), [Purrelyly](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18481&ope=2); rutas fuente `660:A09:P-C02`, `660:A09:P-C03`, `660:A09:P-C04`.

<!-- A01_ESTRATEGIA_REVISADA -->
```json
{
  "schema": "station-x-player-strategy/1",
  "sections": [
    {
      "id": "first",
      "title": "Primero: Belleza como respuesta inicial",
      "objective": "Establecer una Xyz Purrely con un Recuerdo que permita interacción de monstruo.",
      "situation": "Purrely y Bello Recuerdo en mano, Belleza disponible en Extra, Campo propio vacío.",
      "card_cids": [
        18003,
        18012,
        18005
      ],
      "actions": [
        "Invoca Purrely normalmente y resuelve su excavación sin contar cartas que todavía no has visto.",
        "Revela Bello Recuerdo para utilizar el procedimiento de Xyz desde mano si sigue disponible.",
        "Comprueba los materiales reales de Belleza y reserva el efecto de interacción para una amenaza elegible."
      ],
      "expected_result": "Belleza con Purrely y Bello como materiales; la Normal se consumió y la respuesta depende de su ventana.",
      "resources_to_keep": "Bello Recuerdo hasta completar el procedimiento y otros Recuerdos que permitan extender.",
      "alternative": "Si falta Bello pero Delicioso ya está en Cementerio y tienes Purrelyly, evalúa la ruta de Rechoncho.",
      "related_route_ids": [
        "660:A09:P-C01",
        "660:A09:P-C02"
      ]
    },
    {
      "id": "second",
      "title": "Segundo: Felicidad y combate",
      "objective": "Buscar recursos mediante combate o convertir una Xyz que batalló en ZEUS.",
      "situation": "Purrely y Feliz Recuerdo en mano; Felicidad en Extra y objetivo de batalla alcanzable.",
      "card_cids": [
        18003,
        18011,
        18004,
        15524
      ],
      "actions": [
        "Desarrolla Felicidad mediante el Recuerdo correspondiente y conserva sus materiales reales.",
        "Elige un combate que cumpla sus condiciones; aplica la búsqueda de posbatalla solo si ocurrió y resolvió.",
        "En Main Phase 2, evalúa ZEUS si se cumple el procedimiento y limpiar otras cartas del Campo es más útil."
      ],
      "expected_result": "Una búsqueda condicionada al combate o acceso posterior a ZEUS; no es una Xyz de primer turno garantizada por esta ruta.",
      "resources_to_keep": "Materiales de Felicidad o ZEUS y un Recuerdo que permita reconstruir.",
      "alternative": "Si el rival no ofrece un objetivo de batalla válido, prioriza el control de Belleza o la preparación de Noir.",
      "related_route_ids": [
        "660:A09:P-C05",
        "660:A09:P-C01"
      ]
    },
    {
      "id": "mid",
      "title": "Juego medio: cuatro materiales en Rechoncho",
      "objective": "Acumular recursos del Cementerio para desarrollar la siguiente Xyz sin atribuir materiales imaginarios.",
      "situation": "Purrelyly en mano, Delicioso Recuerdo en Cementerio, dos Magias/Trampas elegibles adicionales y Rechoncho en Extra.",
      "card_cids": [
        18481,
        18013,
        18006,
        18008
      ],
      "actions": [
        "Invoca Purrelyly y verifica que Delicioso Recuerdo siga en Cementerio para su procedimiento.",
        "Forma Rechoncho con los materiales previstos y usa su efecto para acoplar las dos Magias/Trampas elegibles.",
        "Cuenta el resultado: cuatro materiales en este escenario, todavía insuficientes para el ascenso permanente a Noir."
      ],
      "expected_result": "Rechoncho con cuatro materiales si los dos objetivos permanecen disponibles y resuelve el efecto.",
      "resources_to_keep": "Un Recuerdo Rápido adicional en mano para alcanzar el quinto material.",
      "alternative": "Si falta un objetivo de Cementerio, acepta un número menor de materiales y no declares Noir todavía.",
      "related_route_ids": [
        "660:A09:P-C02",
        "660:A09:P-C03"
      ]
    },
    {
      "id": "late",
      "title": "Juego tardío: elegir Noir permanente o temporal",
      "objective": "Distinguir dos formas de acceder a Noir según los materiales y la Trampa disponible.",
      "situation": "Rechoncho con cuatro materiales y otro Recuerdo activable, o una Xyz Purrely con ¿¡Purrelysaltó!? colocada desde el turno anterior.",
      "card_cids": [
        18006,
        18008,
        18014,
        18013
      ],
      "actions": [
        "Para el acceso permanente, activa el Recuerdo adicional y confirma que el efecto de Rechoncho acopla el quinto material.",
        "Utiliza el procedimiento alternativo de Noir cuando se cumple su requisito de cinco materiales.",
        "Si eliges la Trampa sobre una Xyz elegible, trata el Noir obtenido como temporal y revisa cuántos materiales tiene."
      ],
      "expected_result": "Noir permanente con cinco o más materiales, o Noir temporal por Trampa; sus condiciones y duración no son equivalentes.",
      "resources_to_keep": "Los cinco materiales si necesitas conservar la protección y las cartas que alimentan una nueva Xyz.",
      "alternative": "Si no llegaste al quinto material, conserva Rechoncho o usa la Trampa solo cuando sea legal.",
      "related_route_ids": [
        "660:A09:P-C03",
        "660:A09:P-C04"
      ]
    },
    {
      "id": "weak_hand",
      "title": "Mano débil: confirmar el Recuerdo disponible",
      "objective": "No depender de acertar una excavación para decidir el destino del Extra.",
      "situation": "Purrely o Purrelyly disponibles, pero faltan Recuerdos o blancos adicionales de Cementerio.",
      "card_cids": [
        18003,
        18481,
        18012,
        18013,
        18005,
        18006
      ],
      "actions": [
        "Comprueba qué Recuerdo está realmente en mano antes de revelar con Purrely.",
        "Si tienes Purrelyly y Delicioso en Cementerio, utiliza la vía de Rechoncho solo cuando la carta sigue allí.",
        "Si obtienes un Recuerdo mediante excavación o búsqueda, elige la Xyz correspondiente a esa carta real."
      ],
      "expected_result": "Belleza o Rechoncho cuando hay acceso legítimo; si no, se conserva el motor sin prometer una Xyz.",
      "resources_to_keep": "La Normal y los Recuerdos que puedan utilizarse después de la búsqueda.",
      "alternative": "Si la excavación no ofrece el Recuerdo necesario, conserva tus defensas y espera otro recurso.",
      "related_route_ids": [
        "660:A09:P-C01",
        "660:A09:P-C02"
      ]
    },
    {
      "id": "disruption",
      "title": "Interrupción: proteger la cuenta de materiales",
      "objective": "Mantener un plan defensivo si se pierde el Recuerdo o se niega el acoplamiento.",
      "situation": "El rival niega Purrely, Purrelyly o el efecto que acoplaría un quinto material a Rechoncho.",
      "card_cids": [
        18003,
        18481,
        18006,
        18008,
        18014
      ],
      "actions": [
        "Si Bello ya no está en mano o Purrely fue negado, no presentes Belleza como Invocada.",
        "Si se perdió Delicioso del Cementerio, revisa el procedimiento de Purrelyly con los recursos que quedan.",
        "Si Rechoncho permanece con cuatro materiales, conserva su Campo y evalúa la Trampa de ascenso solo si ya estaba colocada y es activable."
      ],
      "expected_result": "Una Xyz existente preservada o una salida temporal legal; no se fuerza Noir permanente con cuatro materiales.",
      "resources_to_keep": "El Recuerdo todavía disponible y la Trampa que pueda responder en su turno correcto.",
      "alternative": "Si la interrupción retira todos los cuerpos, conserva Purrelyly o un Recuerdo para reconstruir más adelante.",
      "related_route_ids": [
        "660:A09:P-C01",
        "660:A09:P-C03",
        "660:A09:P-C04"
      ]
    },
    {
      "id": "win_condition",
      "title": "Ganar: controlar antes de buscar daño",
      "objective": "Preservar Noir cuando su retirada es la ventaja principal y usar Felicidad para presionar.",
      "situation": "Noir con materiales o Felicidad en Campo, con amenazas y LP rivales identificados.",
      "card_cids": [
        18008,
        18004,
        18006,
        15524
      ],
      "actions": [
        "Antes de retirar una amenaza con Noir, comprueba el coste de materiales y la protección que conservará después.",
        "Si pasas de control a ataque, usa la línea de Felicidad cuando exista un combate útil y su efecto pueda resolver.",
        "Calcula el daño de las criaturas realmente en Campo; no conviertas una retirada de Noir en daño garantizado."
      ],
      "expected_result": "Control por retirada y presión gradual mediante combate y recursos Xyz; no se presupone letal.",
      "resources_to_keep": "Materiales suficientes para mantener la condición de Noir y un Recuerdo para otro turno.",
      "alternative": "Si usar Noir deja de protegerlo y no permite ganar, conserva sus materiales hasta una amenaza más importante.",
      "related_route_ids": [
        "660:A09:P-C03",
        "660:A09:P-C05"
      ]
    },
    {
      "id": "common_errors",
      "title": "Errores: cinco materiales y duración de Noir",
      "objective": "Evitar confundir un ascenso temporal con la condición de protección del jefe.",
      "situation": "Estás gestionando Rechoncho, Noir y ¿¡Purrelysaltó!? después de una respuesta rival.",
      "card_cids": [
        18006,
        18008,
        18014,
        18481
      ],
      "actions": [
        "Cuenta los materiales que tiene la Xyz en ese momento, no las cartas que se pensaba acoplar.",
        "No uses el procedimiento permanente de Noir desde cuatro materiales ni atribuyas protección a un Noir temporal que no cumple cinco.",
        "Cuando desacoples materiales, vuelve a comprobar si Noir conserva la condición que da protección."
      ],
      "expected_result": "La duración y protección de Noir corresponden a su procedimiento y materiales reales.",
      "resources_to_keep": "Recuerdos que sirvan para el quinto material y una Trampa que ya sea activable.",
      "alternative": "Con cuatro materiales sin otra extensión, conserva Rechoncho en lugar de declarar un ascenso inexistente.",
      "related_route_ids": [
        "660:A09:P-C02",
        "660:A09:P-C03",
        "660:A09:P-C04"
      ]
    }
  ]
}
```
