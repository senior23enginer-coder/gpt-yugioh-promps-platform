# Apartado 32 — CONTROL DE VERSIONES Y REANUDACIÓN

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** abrir únicamente el archivo del deck solicitado en `01_INFORMACION_PARA_IMPORTAR/decks/` y sus salidas previas pertinentes. Consultar las instrucciones generales vigentes de `02_PROMPT_PARA_CODEX/00_PROMPT_UNICO_STATION_X_V31.md` y las reglas contextuales de `02_PROMPT_PARA_CODEX/REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md` cuando correspondan; no ejecutar el orquestador para corregir este apartado.

**Salida:** aplicar esta política de reanudación al **control A01–A10** ya presente en la ficha del deck seleccionado. `APARTADO_32` es una **instrucción de soporte**: no crear una fila de avance A32, una pantalla de progreso ni un archivo de resultados.

## Instrucción editorial específica

**Protección mandatoria de prompts (orden de Miguel, 16-11-2026):** ningún prompt puede borrarse, excluirse del ZIP, renombrarse, fusionarse, vaciarse ni ser sustituido por un resumen durante una actualización, migración, corrección o depuración. Mantener **siempre** los 36 apartados `01`–`36` y los tres documentos base del directorio `02_PROMPT_PARA_CODEX/`, además de cualquier prompt añadido posteriormente. Antes y después de cada cambio ejecutar la verificación de nombres, conteos y SHA-256 descrita en el apartado 0 del orquestador; los archivos no editados deben ser idénticos. Las huellas vigentes y la lista de archivos editados se actualizan **solo en la bitácora única**, no en nuevos manifiestos. Si falta uno o aparece una modificación no anunciada, detenerse y recuperar la versión íntegra: **nunca publicar un ZIP incompleto**.

Preservar el inventario confirmado y el contenido útil cuando haya una modificación aprobada. Reanalizar solo las cartas, rutas y comparaciones dependientes **dentro de la ficha del deck afectado**; no reiniciar arbitrariamente otros decks ni regenerar el ZIP general. Los cambios de inventario necesitan instrucción de Miguel con carta/cantidad/sección. Una revisión de redacción o reglas no cambia el inventario. Registrar fecha, estado y reanudación en **A01–A10 del deck y en el resumen central**, nunca como atributos adicionales de Station X.

**Distribución de archivos:** el ZIP maestro completo conserva los 39 prompts protegidos y sus tres carpetas; un ZIP **incremental de deck** contiene **solo `01_INFORMACION_PARA_IMPORTAR/decks/DECK_<...>/`**, configuración y recursos propios. Es un **paquete parcial importable**, no sustituye al maestro ni autoriza borrar prompts. **Las 13 fichas existentes ya están dentro de subcarpetas individuales**, con referencias a fotografías/guías locales y materiales compartidos comprobadas en el paquete. Si se actualizan instrucciones comunes, entregar **solo el parche de prompts editados**, nunca todo el ZIP por inercia, salvo que Miguel pida expresamente el maestro completo. El apartado 36 sigue intacto.

**Al retomar trabajo:** leer el control del prompt, localizar el último paso
realmente terminado y continuar desde allí. No duplicar entregables ni
atribuir a la plataforma cambios que no se han comprobado.
