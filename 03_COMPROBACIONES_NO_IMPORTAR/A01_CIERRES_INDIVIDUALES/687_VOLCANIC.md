# A01 — verificación individual Volcanic (687)

> **ESTADO VIGENTE: A01 REABIERTO — revisión funcional 2.** Los checks históricos inferiores conservan su valor de prueba técnica anterior, no certifican el nuevo estándar. Revalidar T1–T5 individualmente: diagnóstico, ocho lecciones prácticas, evidencia por lección, revisión semántica y lectura completa en navegador real. No cerrar por longitud, paridad o importación.

23-11-2026. TCG Advanced. Main 42 / Extra 15 / Side 0 / Reserva 14; 36 identidades y 22 registros de ruta. Inventario inalterado. Reserva no equivale a Side; no se evalúa banlist.

Fuentes versionadas: Markdown blob `1fe95f73d986fb121de807b4c7e89e114ced1213`; JSON blob `c3413476e76821a4dc225519505aec8d8e2e3f13`.

## T1 y T3 — diagnóstico y matriz de propósitos

Estrategia Control/Burn de Piros: Trooper y Rocket buscan recursos Volcanic y Blaze Accelerator respectivamente. El motor de Aceleradores transforma envíos al Cementerio en control y munición; Rimfire prepara aceleradores y Shell repone cartas pagando LP. Scattershot causa daño al enviarse al GY, pero su barrido exige un envío específico por efecto de Blaze Accelerator y dos copias adicionales disponibles. Emperor sostiene presión de daño y acceso a trampas; Inferno y Emission ofrecen interacción condicionada. Los Enlaces del Extra son alternativas auxiliares, no el objetivo obligatorio del motor. Victoria por desgaste y daño acumulado o presión de combate según el estado real, sin OTK garantizado. Riesgos: confundir coste con efecto, consumir munición, restricciones FUEGO/Gozen, trampas recién colocadas y pérdida de recursos en GY/destierro.

| Propósito | CID y zona | Condición, riesgo y límite | Ruta existente |
|---|---|---|---|
| Preparar Reload | [18918](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18918&ope=2), [7086](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7086&ope=2), [18917](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18917&ope=2), [11597](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11597&ope=2) Main | VBA necesita Blaze Accelerator original y un objetivo rival elegible para enviar Rimfire Nivel 1 y destruir. Rimfire permite instalar Reload si quedan los recursos exigidos. No atribuir robo ni envío posterior ya realizado. | `687:A09:BLAZE:RIMFIRE:RELOAD01` |
| Reponer munición | [18918](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18918&ope=2), [7082](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7082&ope=2) Main | La variante Shell sustituye la elección de Rimfire en la misma activación; Shell desde GY paga 500 LP para buscar otra copia. No sumar ambas variantes ni asumir otra Shell disponible. | `687:A09:BLAZE:SHELL:RESOURCE01` |
| Barrido y daño | [15299](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15299&ope=2), [11597](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11597&ope=2), [7083](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7083&ope=2) Main | Droplet puede enviar Reload como coste; después el efecto de Reload desde GY envía Scattershot. El barrido requiere el envío por efecto Blaze Accelerator y otras dos Scattershot elegibles. Los 1500 LP y las destrucciones dependen de resolución y ausencia de prevención. | `687:A09:DROPLET:RELOAD:SCATTERSHOT01` |
| Presión Emperor | [18918](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18918&ope=2), [18919](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18919&ope=2), [18915](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18915&ope=2) Main | Fire Ejection envía Emperor; su procedimiento exige desterrar recursos permitidos. No contar daño futuro de 500 por Invocación Especial rival como daño inmediato ni asumir Trampa disponible si se agotó. | `687:A09:VBA:EJECTION:EMPEROR01` |
| Interacción Inferno | [18916](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18916&ope=2), [18919](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18919&ope=2), [7082](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7082&ope=2), [18921](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18921&ope=2) Main | Trooper busca Inferno; la Trampa debe poder activarse legalmente. Inferno responde a efecto de monstruo activado en Campo y destierra Piro del GY; la negación requiere que sea Volcanic. | `687:A09:V11:TROOPER:EJECTION:SHELL:INFERNO` |
| Emission y alternativas Extra | [19027](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19027&ope=2), [18916](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18916&ope=2), [18920](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18920&ope=2), [7934](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7934&ope=2) Main; [14133](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=14133&ope=2) Extra | Trooper requiere descarte para generar Ficha; Emission elige una modalidad y no inflige los 500 de destrucción de la Ficha sin ese evento. Gozen restringe Atributos; Hiita FUEGO es alternativa a I:P OSCURIDAD bajo esa restricción. | `687:A09:BONFIRE:TROOPER:BOMB:EMISSION01`, `687:A09:SITUACION:GO_FIRST:TROOPER_ROCKET_GOZEN04` |

CID, zonas, rutas y enlaces de fuentes cotejados con el registro exacto. Las referencias Konami proceden de fichas versionadas; no se atribuye un nuevo cotejo exhaustivo del texto oficial ni ejecución de combos. El registro no contiene record.calculator; los effect_id/motor_id inexistentes quedan PENDIENTE_DE_ENLACE_A05_A09. Los 22 registros incluyen interacciones básicas y alternativas, no equivalen a 22 combos certificados.

## Checklist

- [x] T1: diagnóstico, motores, estrategia y riesgos.
- [x] T2: seis campos de perfil, cuatro cartas destacadas y cuatro fases.
- [x] T3: matriz por propósito con CID, zonas, fuentes, condiciones y rutas existentes.
- [x] T4: [CI #45274393388](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45274393388) PASS, estilo 61/190, resumen 212/250, paridad Markdown/JSON de seis campos.
- [x] T5: misma CI, job 138042292852, commit Platform `c8e38d72bdcfc3bbc2826d2f6056e4b99d9f1b7e`: ISOLATED_PASS de importación/exportación/reimportación, 36 fotografías, 22 registros de ruta, ocho rechazos e inventario conservado. PASS de presentación a 390 y 1280 px. Job finalizado exitosamente.

Resultado: **5/5 acreditadas en entorno aislado**. Cero importaciones en producción. No iniciar A02.

## Revisión funcional 2 — ocho lecciones propuestas

Redacción individual basada en inventario y aperturas/resultados del paquete real, con condiciones y alternativas. No se modifica ningún efecto ni ruta; enlaces oficiales para cotejo. El nuevo cierre queda pendiente de la aplicación del contrato, verificación semántica completa y prueba real de interfaz.

- first: cartas [Volcanic Trooper — Soldado Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18916&ope=2), [Volcanic Rocket — Misil Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7243&ope=2), [Volcanic Blaze Accelerator — Acelerador de Llama Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18918&ope=2), [Blaze Accelerator Reload — Recarga del Acelerador de Llama](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11597&ope=2), [Volcanic Scattershot — Disparo Disperso Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7083&ope=2), [Volcanic Emperor — Emperador Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18915&ope=2), [Volcanic Inferno — Infierno Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18921&ope=2), [I:P Masquerena — I:P Enmascarada](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=14676&ope=2); rutas fuente `687:A09:SITUACION:GO_FIRST:TROOPER_ROCKET_IP01`, `687:A09:SITUACION:GO_FIRST:TROOPER_ROCKET_GOZEN04`.
- second: cartas [Volcanic Trooper — Soldado Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18916&ope=2), [Volcanic Rocket — Misil Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7243&ope=2), [Volcanic Blaze Accelerator — Acelerador de Llama Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18918&ope=2), [Volcanic Scattershot — Disparo Disperso Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7083&ope=2), [Knightmare Phoenix — Caballero de Pesadilla Fénix](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13600&ope=2), [Volcanic Emperor — Emperador Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18915&ope=2), [Volcanic Inferno — Infierno Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18921&ope=2); rutas fuente `687:A09:SITUACION:GO_SECOND:TROOPER_ROCKET_PHOENIX02`.
- mid: cartas [Volcanic Blaze Accelerator — Acelerador de Llama Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18918&ope=2), [Volcanic Rimfire — Percusión Anular Volcánica](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18917&ope=2), [Volcanic Shell — Cartucho Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7082&ope=2), [Blaze Accelerator — Acelerador de Llama](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7086&ope=2), [Blaze Accelerator Reload — Recarga del Acelerador de Llama](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11597&ope=2); rutas fuente `687:A09:BLAZE:RIMFIRE:RELOAD01`, `687:A09:BLAZE:SHELL:RESOURCE01`.
- late: cartas [Volcanic Emperor — Emperador Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18915&ope=2), [I:P Masquerena — I:P Enmascarada](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=14676&ope=2), [Knightmare Unicorn — Caballero de Pesadilla Unicornio](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13601&ope=2), [S:P Little Knight — S:P Pequeña Caballera](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19188&ope=2), [Forbidden Droplet — Gotas Prohibidas](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15299&ope=2); rutas fuente `687:A09:IP:EMPEROR:UNICORN14`, `687:A09:IP:EMPEROR:SP_DEFENSA16`.
- weak_hand: cartas [Fire Ejection — Eyección de Fuego](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18919&ope=2), [Volcanic Rimfire — Percusión Anular Volcánica](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18917&ope=2), [Volcanic Scattershot — Disparo Disperso Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7083&ope=2), [Volcanic Shell — Cartucho Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7082&ope=2), [Linkuriboh — Enlacekuriboh](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=13346&ope=2); rutas fuente `687:A09:EJECTION:RIMFIRE:SCATTERSHOT`, `687:A09:SHELL:LINKURIBOH:DEFENSA15`.
- disruption: cartas [Forbidden Droplet — Gotas Prohibidas](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=15299&ope=2), [Blaze Accelerator Reload — Recarga del Acelerador de Llama](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11597&ope=2), [Volcanic Scattershot — Disparo Disperso Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7083&ope=2), [Fire Ejection — Eyección de Fuego](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18919&ope=2), [Volcanic Emperor — Emperador Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18915&ope=2); rutas fuente `687:A09:DROPLET:RELOAD:SCATTERSHOT01`, `687:A09:VBA:EJECTION:EMPEROR01`.
- win_condition: cartas [Volcanic Emperor — Emperador Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18915&ope=2), [Fire Ejection — Eyección de Fuego](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18919&ope=2), [Volcanic Scattershot — Disparo Disperso Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7083&ope=2), [Volcanic Emission — Emisión Volcánica](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18920&ope=2), [Volcanic Inferno — Infierno Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18921&ope=2); rutas fuente `687:A09:DROPLET:RELOAD:EJECTION:EMPEROR01`, `687:A09:SITUACION:OPPONENT_TURN:TROOPER_VBA_EJECTION_EMISSION06`.
- common_errors: cartas [Volcanic Scattershot — Disparo Disperso Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7083&ope=2), [Blaze Accelerator Reload — Recarga del Acelerador de Llama](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=11597&ope=2), [Gozen Match — Emparejamiento de Atributos](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=7934&ope=2), [Promethean Princess, Bestower of Flames — Princesa Prometea](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=19507&ope=2), [Volcanic Emperor — Emperador Volcánico](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=18915&ope=2), [I:P Masquerena — I:P Enmascarada](https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=14676&ope=2); rutas fuente `687:A09:DROPLET:RELOAD:SCATTERSHOT01`, `687:A09:SITUACION:GO_FIRST:TROOPER_ROCKET_GOZEN04`, `687:A09:TROOPER:ROCKET:SHELL:PRINCESS17`.

<!-- A01_ESTRATEGIA_REVISADA -->
```json
{
  "schema": "station-x-player-strategy/1",
  "sections": [
    {
      "id": "first",
      "title": "Primero: Emperador e Infierno",
      "objective": "Preparar daño por Invocaciones Especiales rivales y una respuesta de monstruo en su Campo.",
      "situation": "Trooper y Rocket en mano; VBA, Reload, Rimfire, Emperador, Scattershot e Inferno permanecen disponibles.",
      "card_cids": [
        18916,
        7243,
        18918,
        11597,
        7083,
        18915,
        18921,
        14676
      ],
      "actions": [
        "Sigue la búsqueda de Trooper y Rocket hacia el Acelerador, prepara Reload y envía la munición de Scattershot según la ruta.",
        "Desarrolla Emperador desterrando los recursos Piro requeridos y coloca Inferno mediante su acceso de preparación.",
        "Enlaza Trooper y Rocket hacia I:P, dejando esos Piros en Cementerio para el coste de Inferno."
      ],
      "expected_result": "Emperador de 3100 ATK, I:P, VBA e Inferno colocada; la negación se usa durante una activación rival elegible posterior.",
      "resources_to_keep": "Al menos un Piro disponible en Cementerio para Inferno y Emperador en Campo para presión.",
      "alternative": "Con Gozen en mano, elige la variante de Hiita FUEGO en lugar de I:P OSCURIDAD.",
      "related_route_ids": [
        "687:A09:SITUACION:GO_FIRST:TROOPER_ROCKET_IP01",
        "687:A09:SITUACION:GO_FIRST:TROOPER_ROCKET_GOZEN04"
      ]
    },
    {
      "id": "second",
      "title": "Segundo: limpiar y retirar Magias/Trampas",
      "objective": "Romper un campo enemigo antes de atacar con Emperador.",
      "situation": "Trooper y Rocket en mano; el rival controla un monstruo y una Magia/Trampa elegibles; Phoenix y Emperador disponibles.",
      "card_cids": [
        18916,
        7243,
        18918,
        7083,
        13600,
        18915,
        18921
      ],
      "actions": [
        "Usa el motor Acelerador para retirar el monstruo y preparar la munición de Scattershot si sus condiciones se cumplen.",
        "Desarrolla los dos monstruos requeridos para Phoenix; usa su efecto de retirada de Magia/Trampa con el coste apropiado.",
        "Invoca Emperador con los Piros de la línea y coloca Inferno, evitando gastar la única respuesta necesaria para después."
      ],
      "expected_result": "Phoenix y Emperador, con el daño y las cartas retiradas únicamente cuando sus efectos resuelven.",
      "resources_to_keep": "VBA e Inferno para el siguiente turno y cualquier Piro que aún pueda pagar su coste.",
      "alternative": "Si no hay Magia/Trampa que justifique Phoenix, conserva los cuerpos o elige una retirada diferente.",
      "related_route_ids": [
        "687:A09:SITUACION:GO_SECOND:TROOPER_ROCKET_PHOENIX02"
      ]
    },
    {
      "id": "mid",
      "title": "Juego medio: elegir la munición",
      "objective": "Decidir entre recuperar Cartucho o preparar Reload sin gastar el mismo efecto dos veces.",
      "situation": "VBA activo y una copia de Rimfire o Shell disponible en Deck según la variante; rival con objetivo destruible.",
      "card_cids": [
        18918,
        18917,
        7082,
        7086,
        11597
      ],
      "actions": [
        "Cuando VBA pueda usar su efecto, elige Rimfire para preparar Reload o Shell para conservar recursos de mano.",
        "Con Rimfire, usa la ventana de su efecto y el Acelerador original elegible para colocar Reload según la secuencia.",
        "Con Shell en Cementerio, paga los 500 LP solo si necesitas otra copia de Deck y puedes asumir ese coste."
      ],
      "expected_result": "Reload preparado o una Shell recuperada, además de la retirada del monstruo si resolvió; no ambos resultados del mismo uso de VBA.",
      "resources_to_keep": "La copia de munición de Deck y los LP que exige Shell.",
      "alternative": "Si no hay objetivo rival para el Acelerador, conserva su activación y prepara una línea de Fire Ejection.",
      "related_route_ids": [
        "687:A09:BLAZE:RIMFIRE:RELOAD01",
        "687:A09:BLAZE:SHELL:RESOURCE01"
      ]
    },
    {
      "id": "late",
      "title": "Juego tardío: Emperador o retirada puntual",
      "objective": "Conservar la presión de daño de Emperador salvo que una amenaza deba retirarse inmediatamente.",
      "situation": "Emperador e I:P permanecen en Campo y tienes recursos para la alternativa de Enlace.",
      "card_cids": [
        18915,
        14676,
        13601,
        19188,
        15299
      ],
      "actions": [
        "Si Emperador está infligiendo presión al rival, evita convertirlo en material sin una razón concreta.",
        "Con una carta de mano para el coste de Unicornio, evalúa I:P y Emperador para devolver una carta rival al Deck.",
        "Si necesitas una respuesta de destierro temporal, considera S:P mediante I:P, respetando sus materiales y objetivos."
      ],
      "expected_result": "Emperador conservado para daño o una retirada puntual con Unicornio o S:P; no quedan los jefes simultáneamente.",
      "resources_to_keep": "Un Piro de recuperación y recursos de mano suficientes para el coste de la salida elegida.",
      "alternative": "Si no hay objetivo que justifique sacrificar Emperador, mantén la presión y prepara Inferno.",
      "related_route_ids": [
        "687:A09:IP:EMPEROR:UNICORN14",
        "687:A09:IP:EMPEROR:SP_DEFENSA16"
      ]
    },
    {
      "id": "weak_hand",
      "title": "Mano débil: Ejection o Shell",
      "objective": "Obtener una ventaja concreta incluso cuando no puedes construir el campo completo.",
      "situation": "Fire Ejection en mano con Rimfire y Scattershot en Deck, o Shell con otra copia y Linkuriboh disponible.",
      "card_cids": [
        18919,
        18917,
        7083,
        7082,
        13346
      ],
      "actions": [
        "Con Ejection sola, envía Rimfire y usa su efecto posterior para preparar el Scattershot de la interacción documentada.",
        "Aplica únicamente el daño de los efectos que se resuelvan; esta apertura no cumple el barrido de tres Scattershot.",
        "Con Shell, utiliza la Normal hacia Linkuriboh y recupera otra copia por 500 LP si sigue disponible."
      ],
      "expected_result": "Hasta 600 LP en la línea breve de Ejection, o Linkuriboh con otra Shell y una defensa de batalla condicionada.",
      "resources_to_keep": "La Normal en la apertura de Ejection y una Shell para la siguiente acción.",
      "alternative": "Si no puedes pagar Shell o no queda otra copia, conserva tus LP y no declares un recurso de mano inexistente.",
      "related_route_ids": [
        "687:A09:EJECTION:RIMFIRE:SCATTERSHOT",
        "687:A09:SHELL:LINKURIBOH:DEFENSA15"
      ]
    },
    {
      "id": "disruption",
      "title": "Interrupción: Reload desde el Cementerio",
      "objective": "Distinguir una negación que deja combustible disponible de una línea completamente cortada.",
      "situation": "Gotas Prohibidas y Reload en mano, tres Scattershot disponibles en Deck y condiciones legales para activar Gotas.",
      "card_cids": [
        15299,
        11597,
        7083,
        18919,
        18915
      ],
      "actions": [
        "Si puedes activar Gotas legalmente, envía Reload como parte del coste correspondiente.",
        "En la ventana válida, destierra Reload desde Cementerio para enviar Scattershot mediante su efecto de Acelerador.",
        "Resuelve la parte que permite enviar las otras dos Scattershot solo si siguen disponibles y se cumple el evento exigido."
      ],
      "expected_result": "Barrido de monstruos destruibles y 1500 LP de daño si resuelve la línea completa; no requiere activar una Trampa recién colocada.",
      "resources_to_keep": "Las tres Scattershot y una copia de Emperador para una continuación que realmente lo habilite.",
      "alternative": "Si falta una Scattershot, no prometas barrido; valora la línea directa de VBA y Fire Ejection hacia Emperador.",
      "related_route_ids": [
        "687:A09:DROPLET:RELOAD:SCATTERSHOT01",
        "687:A09:VBA:EJECTION:EMPEROR01"
      ]
    },
    {
      "id": "win_condition",
      "title": "Ganar: combinar daño directo y batalla",
      "objective": "Reducir los LP mediante munición y Emperador sin suponer una cantidad de Invocaciones del rival.",
      "situation": "Emperador en Campo o disponible mediante una ruta de Ejection; conoces LP, amenazas y el número real de Invocaciones Especiales.",
      "card_cids": [
        18915,
        18919,
        7083,
        18920,
        18921
      ],
      "actions": [
        "Contabiliza el daño real de Scattershot y Ejection conforme a la carta enviada y al efecto resuelto.",
        "Aplica el daño de Emperador solo por los eventos que ocurran; no proyectes un número inventado de Invocaciones Especiales rivales.",
        "Decide si Emission permite una amenaza temporal adicional en el turno rival, o si Inferno es más útil para proteger el campo."
      ],
      "expected_result": "Presión de daño directo y 3100 ATK de Emperador; el letal requiere sumar únicamente eventos reales.",
      "resources_to_keep": "Emperador y un Piro para Inferno si la partida no termina.",
      "alternative": "Si el rival evita Invocaciones Especiales o retira Emperador, continúa con Acelerador y munición disponible.",
      "related_route_ids": [
        "687:A09:DROPLET:RELOAD:EJECTION:EMPEROR01",
        "687:A09:SITUACION:OPPONENT_TURN:TROOPER_VBA_EJECTION_EMISSION06"
      ]
    },
    {
      "id": "common_errors",
      "title": "Errores: tres Scattershot y restricciones de FUEGO",
      "objective": "Evitar declarar limpieza, daño o un campo de Enlace que no permiten los recursos.",
      "situation": "Estás utilizando Scattershot, Reload, Gozen o Princesa Prometea.",
      "card_cids": [
        7083,
        11597,
        7934,
        19507,
        18915,
        14676
      ],
      "actions": [
        "El barrido de Scattershot requiere el envío correspondiente por un Acelerador y otras dos copias disponibles.",
        "Una Inferno o Emission recién colocada no se trata como activada automáticamente ese mismo turno.",
        "Con Gozen o el límite de FUEGO de Princesa, revisa Atributos de I:P, S:P y las siguientes Invocaciones."
      ],
      "expected_result": "Daño, destrucción y Enlaces únicamente cuando las condiciones de cada efecto y restricción se cumplen.",
      "resources_to_keep": "Munición suficiente y una respuesta que sea compatible con tus propios bloqueos.",
      "alternative": "Si necesitas Gozen, usa la salida de Hiita FUEGO documentada en lugar del campo con I:P.",
      "related_route_ids": [
        "687:A09:DROPLET:RELOAD:SCATTERSHOT01",
        "687:A09:SITUACION:GO_FIRST:TROOPER_ROCKET_GOZEN04",
        "687:A09:TROOPER:ROCKET:SHELL:PRINCESS17"
      ]
    }
  ]
}
```
