# A01 — verificación individual Kashtira Pure (665)

> **ESTADO VIGENTE: A01 REABIERTO — revisión funcional 2.** Los checks históricos inferiores conservan su valor de prueba técnica anterior, no certifican el nuevo estándar. Revalidar T1–T5 individualmente: diagnóstico, ocho lecciones prácticas, evidencia por lección, revisión semántica y lectura completa en navegador real. No cerrar por longitud, paridad o importación.

23-11-2026. TCG Advanced. Main 42 / Extra 15 / Side 0 / Reserva 19, 38 CID, 44 filas y 16 rutas. No se cambia el inventario ni se aplica banlist.

Fuentes: Markdown blob `a3270c337e2b29bd5db89bbb9657753ca36c1835`; JSON blob `f0b79c443a774e16f01e1e4940e9dc92de823d35`. La evidencia estratégica está en A01.1–A01.3 del documento individual, no en una simulación.

- [x] T1: control de recursos y zonas mediante destierro y Xyz de Rango 7. Motor Wraitsoth, Fenrir, Unicornio, Teosis y Riseheart; Shangri-Ira y Arise-Heart condicionados a disparadores y materiales; presión y recuperación sin OTK garantizado. Riesgos por campo propio no vacío, bloqueos Xyz y disponibilidad de cuerpos.
- [x] T2: seis campos de perfil, cuatro cartas y cuatro fases existentes.
- [x] T3: seis propósitos, 15 referencias documentales de efectos, CID/card_id y fuentes Konami, seis rutas existentes enlazadas en A01.3. Las referencias A01 no son efectos ejecutables.
- [x] T4: [CI #45272833416](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45272833416) devolvió PASS para 665: 6 campos, estilo 167/190, resumen 199/250, paridad Markdown/JSON y 4 cartas/4 fases.
- [x] T5: CI #45272833416 devolvió ISOLATED_PASS de importación/exportación/reimportación, 38 fotos, 16 rutas, 8 rechazos y cantidades conservadas. Tras corregir el módulo visual del entorno de pruebas, [CI #45273243817](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45273243817), job 138038253600, commit `030df199fba5d9f8f4760e1a3ef1324521539ece`, devolvió ISOLATED_PASS y PASS de navegador para el mismo deck (390 y 1280 px, 6 campos). El fallo global corresponde a otros registros.

Resultado: **5/5 acreditadas en entorno aislado**. No publicación en producción. No iniciar otro apartado.

## Revisión funcional 2 — ocho lecciones propuestas

Redacción individual basada en inventario y aperturas/resultados del paquete real, con condiciones y alternativas. No se modifica ningún efecto ni ruta; enlaces oficiales para cotejo. El nuevo cierre queda pendiente de la aplicación del contrato, verificación semántica completa y prueba real de interfaz.

- first: cartas [Pressured Planet Wraitsoth](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18204&ope=2), [Kashtira Unicorn](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17769&ope=2), [Kashtiratheosis](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18203&ope=2), [Kashtira Fenrir](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17768&ope=2), [Kashtira Shangri-Ira [Xyz rango 7]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17800&ope=2); rutas fuente `665:A09:WRAITSOTH:SHANGRI01`, `665:A09:FENRIR:RISEHEART:SHANGRI02`.
- second: cartas [Kashtira Fenrir](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17768&ope=2), [Kashtira Birth](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17815&ope=2), [Number 11: Big Eye [Xyz rango 7]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=9861&ope=2), [Dark Armed, the Dragon of Annihilation [Xyz rango 7]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13974&ope=2), [Kashtira Unicorn](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17769&ope=2); rutas fuente `665:A09:FENRIR:BIRTH:BIGEYE06`, `665:A09:FENRIR:BIRTH:DARKARMED10`.
- mid: cartas [Kashtira Birth](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17815&ope=2), [Kashtira Ogre](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17770&ope=2), [Tearlaments Kashtira](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18153&ope=2), [Kashtira Shangri-Ira [Xyz rango 7]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17800&ope=2); rutas fuente `665:A09:V11:TEARKASH:OGRE:BIRTH:SHANGRI`, `665:A09:SHANGRI:STANDBY:ARISE04`.
- late: cartas [Kashtira Shangri-Ira [Xyz rango 7]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17800&ope=2), [Kashtira Unicorn](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17769&ope=2), [Kashtira Fenrir](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17768&ope=2), [Kashtira Arise-Heart [Xyz rango 7]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18191&ope=2), [Pressured Planet Wraitsoth](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18204&ope=2); rutas fuente `665:A09:SHANGRI:STANDBY:ARISE04`, `665:A09:WRAITSOTH:RISEHEART:BIGBANG:ARISE1MAT09`.
- weak_hand: cartas [Kashtira Fenrir](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17768&ope=2), [Kashtira Unicorn](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17769&ope=2), [Kashtira Riseheart](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18151&ope=2), [Kashtiratheosis](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18203&ope=2), [Kashtira Shangri-Ira [Xyz rango 7]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17800&ope=2); rutas fuente `665:A09:FENRIR:RISEHEART:SHANGRI02`, `665:A09:UNICORN:THEOSIS:FENRIR:SHANGRI03`.
- disruption: cartas [Kashtira Unicorn](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17769&ope=2), [Kashtira Fenrir](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17768&ope=2), [Kashtiratheosis](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18203&ope=2), [Kashtira Birth](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17815&ope=2), [Book of Moon](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=5432&ope=2); rutas fuente `665:A09:FENRIR:BIRTH:SHANGRI05`, `665:A09:UNICORN:THEOSIS:FENRIR:SHANGRI03`.
- win_condition: cartas [Kashtira Arise-Heart [Xyz rango 7]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18191&ope=2), [Kashtira Fenrir](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17768&ope=2), [Kashtira Shangri-Ira [Xyz rango 7]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17800&ope=2), [Divine Arsenal AA-ZEUS – Sky Thunder [Xyz]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15524&ope=2), [Number 11: Big Eye [Xyz rango 7]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=9861&ope=2); rutas fuente `665:A09:WRAITSOTH:RISEHEART:ARISE3MAT08`, `665:A09:BIGEYE:BATTLE:ZEUS11`.
- common_errors: cartas [Kashtiratheosis](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18203&ope=2), [Kashtira Riseheart](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18151&ope=2), [Kashtira Shangri-Ira [Xyz rango 7]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=17800&ope=2), [Kashtira Big Bang](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18220&ope=2), [Kashtira Arise-Heart [Xyz rango 7]](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18191&ope=2); rutas fuente `665:A09:FENRIR:RISEHEART:SHANGRI02`, `665:A09:UNICORN:ASH:BIRTH:BARONNE15`.

<!-- A01_ESTRATEGIA_REVISADA -->
```json
{
  "schema": "station-x-player-strategy/1",
  "sections": [
    {
      "id": "first",
      "title": "Primero: Shangri-Ira con recursos",
      "objective": "Preparar control de zonas y mantener acceso a otro Kashtira.",
      "situation": "Wraitsoth o Unicornio en mano, campo vacío y Teosis, Fenrir y Shangri-Ira disponibles.",
      "card_cids": [
        18204,
        17769,
        18203,
        17768,
        17800
      ],
      "actions": [
        "Si tienes Wraitsoth, actívalo para añadir Unicornio; Invoca Unicornio con el Campo propio sin monstruos.",
        "Busca Teosis con Unicornio y úsala sobre él para traer Fenrir de diferente Atributo.",
        "Superpón los Nivel 7 para Shangri-Ira; distingue el campo realmente obtenido de sus efectos futuros."
      ],
      "expected_result": "Shangri-Ira con dos materiales y Wraitsoth si la apertura fue con Planeta; el bloqueo de zonas todavía no se produce automáticamente.",
      "resources_to_keep": "Una copia disponible de Fenrir para la Standby y materiales Xyz para las continuaciones.",
      "alternative": "Con Fenrir solo, emplea su búsqueda de Riseheart y la línea alternativa de Shangri-Ira.",
      "related_route_ids": [
        "665:A09:WRAITSOTH:SHANGRI01",
        "665:A09:FENRIR:RISEHEART:SHANGRI02"
      ]
    },
    {
      "id": "second",
      "title": "Segundo: tomar o eliminar amenazas",
      "objective": "Elegir la Xyz que responde a la amenaza rival antes de atacar.",
      "situation": "Fenrir y Nacimiento en mano; existe un monstruo rival elegible para Ojo Grande, o una carta que Dark Armed pueda destruir.",
      "card_cids": [
        17768,
        17815,
        9861,
        13974,
        17769
      ],
      "actions": [
        "Desarrolla los Nivel 7 con Fenrir y Nacimiento siguiendo la apertura documentada.",
        "Elige Ojo Grande cuando el monstruo rival sea seleccionable y el cambio de control sea útil; desacopla el material exigido.",
        "Si conviene destruir otra clase de carta, usa la alternativa Dark Armed respetando su coste y el destierro posterior."
      ],
      "expected_result": "Una amenaza retirada o controlada y recursos Kashtira restantes según la variante; no se garantizan ambos resultados a la vez.",
      "resources_to_keep": "Nacimiento y los Nivel 7 independientes que no necesites convertir en materiales.",
      "alternative": "Si ya no existe un objetivo legal para Ojo Grande, prioriza Shangri-Ira o una Xyz apropiada para la amenaza real.",
      "related_route_ids": [
        "665:A09:FENRIR:BIRTH:BIGEYE06",
        "665:A09:FENRIR:BIRTH:DARKARMED10"
      ]
    },
    {
      "id": "mid",
      "title": "Juego medio: usar Nacimiento para reconstruir",
      "objective": "Recuperar un Kashtira de las zonas disponibles y convertirlo en nuevo material.",
      "situation": "Nacimiento activo; Ogro en Cementerio y Tearlaments Kashtira disponible según el escenario de recuperación.",
      "card_cids": [
        17815,
        17770,
        18153,
        17800
      ],
      "actions": [
        "Comprueba que Ogro está realmente en Cementerio y que todavía puedes emplear la Invocación de Tearlaments Kashtira.",
        "En la línea documentada, destierra Ogro como recurso para desarrollar Tearlaments Kashtira.",
        "Usa Nacimiento para recuperar el Kashtira elegible y reúne dos Nivel 7 para Shangri-Ira."
      ],
      "expected_result": "Shangri-Ira con dos materiales y Nacimiento boca arriba si los recursos sobreviven.",
      "resources_to_keep": "Nacimiento y un Kashtira que pueda recuperarse en el siguiente turno.",
      "alternative": "Si Ogro no está disponible, no presupongas un monstruo recuperable; usa la Standby de un Shangri-Ira que siga en Campo.",
      "related_route_ids": [
        "665:A09:V11:TEARKASH:OGRE:BIRTH:SHANGRI",
        "665:A09:SHANGRI:STANDBY:ARISE04"
      ]
    },
    {
      "id": "late",
      "title": "Juego tardío: elegir Arise-Heart o mantener control",
      "objective": "Pasar de Shangri-Ira a presión de Cementerio sin sacrificar recursos sin necesidad.",
      "situation": "Shangri-Ira sigue boca arriba desde el turno anterior y su efecto de Standby puede resolverse.",
      "card_cids": [
        17800,
        17769,
        17768,
        18191,
        18204
      ],
      "actions": [
        "Activa la opción de Shangri-Ira en la Standby legal para desarrollar un Kashtira del Deck.",
        "Si la continuación de tres materiales está disponible, prepara Arise-Heart mediante el procedimiento documentado.",
        "Evalúa si conservar Shangri-Ira y un Fenrir independiente es más útil que concentrar todo el Campo en un único Xyz."
      ],
      "expected_result": "Arise-Heart con materiales para interacción o un campo diversificado, según los recursos de la apertura.",
      "resources_to_keep": "Una salida adicional en Extra y un Fenrir o Nacimiento para volver a desarrollar.",
      "alternative": "Con pocos materiales, conserva Shangri-Ira y no trates Arise-Heart como una negación universal.",
      "related_route_ids": [
        "665:A09:SHANGRI:STANDBY:ARISE04",
        "665:A09:WRAITSOTH:RISEHEART:BIGBANG:ARISE1MAT09"
      ]
    },
    {
      "id": "weak_hand",
      "title": "Mano débil: un solo Nivel 7",
      "objective": "Encontrar una apertura sin exigir Wraitsoth y múltiples monstruos.",
      "situation": "Fenrir o Unicornio en mano, Campo vacío y sus búsquedas todavía utilizables.",
      "card_cids": [
        17768,
        17769,
        18151,
        18203,
        17800
      ],
      "actions": [
        "Invoca Fenrir si no controlas monstruos; busca Riseheart cuando quieras seguir esa línea.",
        "Con Unicornio, busca Teosis y comprueba un Kashtira de Atributo distinto disponible en Deck.",
        "Elige una salida de Shangri-Ira acorde con los recursos obtenidos, sin sumar al Campo los monstruos ya acoplados."
      ],
      "expected_result": "Shangri-Ira o presión de un Nivel 7 si la búsqueda no permite extender.",
      "resources_to_keep": "La Invocación Normal cuando la línea de Unicornio permita reservarla.",
      "alternative": "Si no queda objetivo de Teosis, usa la línea de Fenrir solo cuando dispongas realmente de ese iniciador.",
      "related_route_ids": [
        "665:A09:FENRIR:RISEHEART:SHANGRI02",
        "665:A09:UNICORN:THEOSIS:FENRIR:SHANGRI03"
      ]
    },
    {
      "id": "disruption",
      "title": "Interrupción: proteger la apertura correcta",
      "objective": "Identificar si se perdió la búsqueda o el acceso a los materiales Xyz.",
      "situation": "El rival niega el efecto de Unicornio, Fenrir o Teosis; todavía hay recursos de mano sin gastar.",
      "card_cids": [
        17769,
        17768,
        18203,
        17815,
        5432
      ],
      "actions": [
        "Si Unicornio no obtuvo Teosis, comprueba si Teosis ya estaba en mano o si Nacimiento permite una línea diferente.",
        "Si Teosis no resolvió, no cuentes el monstruo de Deck entre tus materiales.",
        "Si Nacimiento y un Nivel 7 están disponibles, verifica la continuación alternativa; conserva Fenrir como amenaza cuando no puedas extender."
      ],
      "expected_result": "Una Xyz solo cuando reúnes los materiales reales, o un Nivel 7 que siga ofreciendo presión.",
      "resources_to_keep": "La Normal y Nacimiento antes de gastar recursos buscando un campo imposible.",
      "alternative": "Si no existe segundo cuerpo, termina con Fenrir o Unicornio y reserva defensas de mano.",
      "related_route_ids": [
        "665:A09:FENRIR:BIRTH:SHANGRI05",
        "665:A09:UNICORN:THEOSIS:FENRIR:SHANGRI03"
      ]
    },
    {
      "id": "win_condition",
      "title": "Ganar: presión de destierro y batalla",
      "objective": "Reducir las opciones del rival y cerrar mediante ataques calculados.",
      "situation": "Arise-Heart o Fenrir en Campo con efectos disponibles; conoces LP y amenazas rivales.",
      "card_cids": [
        18191,
        17768,
        17800,
        15524,
        9861
      ],
      "actions": [
        "Conserva tres materiales de Arise-Heart cuando necesites su retirada rápida; aplica su efecto continuo mientras esté boca arriba.",
        "Retira o toma la amenaza que impide tus ataques con una salida documentada y legal.",
        "Si un Xyz batalla y es mejor limpiar que atacar de nuevo, usa el procedimiento de ZEUS en Main Phase 2 cuando corresponda."
      ],
      "expected_result": "Control de recursos y daño efectivo; ZEUS es una salida de limpieza, no daño letal garantizado.",
      "resources_to_keep": "Materiales de Arise-Heart y un recurso de recuperación si la partida continúa.",
      "alternative": "Si no hay daño suficiente, no consumas todos los materiales buscando un letal inexistente.",
      "related_route_ids": [
        "665:A09:WRAITSOTH:RISEHEART:ARISE3MAT08",
        "665:A09:BIGEYE:BATTLE:ZEUS11"
      ]
    },
    {
      "id": "common_errors",
      "title": "Errores: orden de bloqueo y materiales",
      "objective": "Evitar aplicar restricciones, bloqueos de zona o cuerpos fuera de su momento real.",
      "situation": "Se está usando Teosis, Riseheart, Shangri-Ira o Big Bang.",
      "card_cids": [
        18203,
        18151,
        17800,
        18220,
        18191
      ],
      "actions": [
        "Después de resolver Teosis, limita el Extra a Xyz el resto del turno; no apliques ese límite retroactivamente.",
        "Un destierro anterior a la presencia de Shangri-Ira no bloquea una zona por su efecto.",
        "Al acoplar Fenrir o Riseheart, retíralos de los cuerpos independientes; solo usa Big Bang y Arise-Heart si cumplen su procedimiento."
      ],
      "expected_result": "Un Campo con zonas, materiales y restricciones acordes con el orden de resolución.",
      "resources_to_keep": "El material que corresponda a Big Bang y los efectos de Shangri-Ira realmente disponibles.",
      "alternative": "Si buscas una Sincronía como Baronne, revisa la apertura específica antes de imponer el bloqueo Xyz.",
      "related_route_ids": [
        "665:A09:FENRIR:RISEHEART:SHANGRI02",
        "665:A09:UNICORN:ASH:BIRTH:BARONNE15"
      ]
    }
  ]
}
```
