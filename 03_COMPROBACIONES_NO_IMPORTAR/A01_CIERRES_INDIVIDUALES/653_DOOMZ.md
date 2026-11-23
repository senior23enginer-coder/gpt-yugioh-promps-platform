# A01 — verificación individual DoomZ (653)

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
