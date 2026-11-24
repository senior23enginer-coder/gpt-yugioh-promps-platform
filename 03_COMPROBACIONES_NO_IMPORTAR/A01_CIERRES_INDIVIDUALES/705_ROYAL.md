# A01 — cierre individual Royal (705)

> **ESTADO VIGENTE: A01 REABIERTO — revisión funcional 2.** Los checks históricos inferiores conservan su valor de prueba técnica anterior, no certifican el nuevo estándar. Revalidar T1–T5 individualmente: diagnóstico, ocho lecciones prácticas, evidencia por lección, revisión semántica y lectura completa en navegador real. No cerrar por longitud, paridad o importación.

23-11-2026. Rush Duel, Royal Rebel's con Skill local Hard Rock Overture. Main 30 / Extra 0 / Side 0 / Reserva 0; 16 identidades, seis rutas. El Extra y Side no son obligatorios para admitir Rush Duel. Skill separada del inventario físico; no se cambia ninguna carta ni se evalúa banlist.

Fuentes exactas: Markdown `98a58cc42f80f724d2b6b38dc83e0dc62768547c`, JSON `dd6deee37457743b07f21588a6f4e082ef90d800`. Referencia de Skill en expediente: https://www.duellinksmeta.com/skills/Hard%20Rock%20Overture.

## T1 y T3 — diagnóstico y matriz de propósitos

Combo/Midrange de Demonios LUZ por Invocación por Sacrificio. Heavy Metal responde a monstruos boca arriba, Progrock retira M/T y cartas colocadas, Death Doom exige dos Demonios de Nivel 7 o mayor como Tributos. Hard Rock Overture prepara cuerpos según sus requisitos, no sustituye la Invocación por Sacrificio. Phaser recupera cuerpos de Nivel alto cuando ya se controla otro Demonio elegible. Canjear y Monstruo Reencarnado convierten mano/GY en recursos, sin garantizar robos. Victoria por presión de combate tras remoción válida; vigilar costes, niveles, tipo de Tributo, zonas, ventanas y restricciones de Skill.

| Propósito | CID, zona y fuente | Condición y riesgo | Ruta existente |
|---|---|---|---|
| Limpieza de monstruos | [16331](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16331&ope=2), [15441](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [19761](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19761&ope=2) Main | Death Doom requiere dos Demonios Nivel 7+ como Tributos y ventana del turno de su Invocación por Sacrificio. No atribuir efecto al colocarlo por Skill; el daño depende de monstruos realmente destruidos. | `705:A09:OVERTURE:DEATHDOOM01` |
| Presión y retirada selectiva | [15441](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [16331](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16331&ope=2) Main | Heavy Metal debe haber sido Invocado por Sacrificio usando al menos un Nivel 5+; su objetivo corresponde al menor Nivel entre monstruos rivales boca arriba elegibles Nivel 8 o menos. No escoger cualquier monstruo arbitrariamente. | `705:A09:OVERTURE:HEAVY01` |
| Retirada de retaguardia | [19761](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=19761&ope=2), [15441](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2) Main | Progrock requiere Sacrificio con Nivel 5+ y M/T elegible; la segunda destrucción depende de resolución y carta boca abajo existente. La restricción posterior de ataque se limita a Demonios. | `705:A09:OVERTURE:PROGROCK01` |
| Daño por penetración | [16344](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16344&ope=2) Main | Kheiron necesita monstruo rival, carta superior del Deck disponible y Demonio propio Nivel 5+ elegible; la penetración solo causa daño si hay batalla y DEF inferior. | `705:A09:OVERTURE:KHEIRON01` |
| Recurrencia sin Skill | [16330](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16330&ope=2), [15441](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2), [16331](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16331&ope=2) Main | Phaser exige Demonio propio Nivel 7+ y envía su propio cuerpo para revivir otro Demonio Nivel 7+ en Defensa. Dos cuerpos reales pueden habilitar Death Doom, si se conservan. | `705:A09:V11:PHASER:REVIVE:DEATHDOOM` |
| Filtrado y recuperación | [17721](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=17721&ope=2), [16330](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=16330&ope=2), [15441](https://www.db.yugioh-card.com/rushdb/card_search.action?cid=15441&ope=2) Main | Canjear exige Nivel 8 de mano para robar dos cartas desconocidas. Phaser puede recuperar el cuerpo bajo condiciones; Heavy Metal revivido no cumple su efecto de Sacrificio. | `705:A09:TRADEIN:PHASER01` |

La Skill Hard Rock Overture requiere las condiciones de Demonios/LUZ, Nivel 7/8 y ventana del expediente local. Se respetan sus restricciones de ataque; no es una carta física. CID, zonas, fuentes y route_id cotejados contra el registro versionado. No se afirma una auditoría exhaustiva nueva de reglas ni simulación de rutas. No se fabrican effect_id/motor_id.

## Checklist
- [x] T1: diagnóstico, estrategia, Skill, motores, riesgos y condición de victoria.
- [x] T2: seis campos, cuatro cartas destacadas y cuatro fases.
- [x] T3: matriz de propósitos con CID, zona, fuente, condición, riesgo y rutas existentes.
- [x] T4: [CI #45275755236](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45275755236) PASS, estilo 165/190, resumen 245/250, paridad de seis campos.
- [x] T5: misma CI, job 138046988317, commit Platform `47c7552b61e446ec932d72fdbb7291cd95317967`: ISOLATED_PASS de importación/exportación/reimportación con 16 fotos, seis rutas, ocho rechazos e inventario conservado. Presentación 390 y 1280 px PASS; job exitoso.

Resultado: **5/5 acreditadas en entorno aislado**. Cero importaciones en producción. No iniciar A02.
