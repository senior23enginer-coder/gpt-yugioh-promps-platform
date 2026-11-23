# A01 — cierre individual GOAT Control (699)

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
