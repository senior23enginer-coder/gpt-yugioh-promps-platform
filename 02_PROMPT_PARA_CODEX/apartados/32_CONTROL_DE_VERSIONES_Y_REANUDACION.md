# Apartado 32 — CONTROL DE VERSIONES Y REANUDACIÓN

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida auxiliar:** aplicar los criterios de este módulo al registro único de control privado, únicamente cuando proceda, mediante referencias a la ficha canónica y al registro central permitido. Este módulo no crea sección persistida APARTADO_32, porcentaje ni estado de avance independiente; documentar en el eje A01–A10 correspondiente la evidencia y el pendiente sin duplicar contenido.

## Instrucción editorial específica

**Invalidación dirigida por dependencias:** cuando cambie el inventario aprobado, la interpretación de un efecto, una ventana, una Skill o un ID de ruta, identificar `carta_id/regla_id` afectados, relaciones A06, interacciones A08, combos A09, guías A10 y conclusiones de módulos auxiliares que dependan de ellos. Registrar versión anterior/nueva, causa y IDs impactados en la ficha canónica y el registro único; reabrir solo las unidades afectadas como PARCIAL/CONDICIONAL cuando la evidencia deje de sostenerlas. Mantener trazabilidad y cifras históricas con fecha; no invalidar automáticamente otros decks ni reescribir inventarios sin autorización.

**Protección mandatoria de prompts (orden de Miguel, 16-11-2026):** ningún prompt puede borrarse, excluirse del ZIP, renombrarse, fusionarse, vaciarse ni ser sustituido por un resumen durante una actualización, migración, corrección o depuración. Mantener **siempre** los 36 apartados `01`–`36` y los tres documentos base del directorio `02_PROMPT_PARA_CODEX/`, además de cualquier prompt añadido posteriormente. Antes y después de cada cambio ejecutar la verificación de nombres, conteos y SHA-256 descrita en el apartado 0 del orquestador; los archivos no editados deben ser idénticos. Las huellas vigentes y la lista de archivos editados se actualizan **solo en la bitácora única**, no en nuevos manifiestos. Si falta uno o aparece una modificación no anunciada, detenerse y recuperar la versión íntegra: **nunca publicar un ZIP incompleto**.

Preservar el inventario confirmado y el contenido útil cuando haya una modificación aprobada. Reanalizar solo las cartas, rutas y comparaciones dependientes **dentro de la ficha del deck afectado**; no reiniciar arbitrariamente otros decks ni regenerar el ZIP general. Los cambios de inventario necesitan instrucción de Miguel con carta/cantidad/sección. Una revisión de redacción o reglas no cambia el inventario. Registrar fecha, estado y reanudación en **A01–A10 del deck y en el resumen central**, nunca como atributos adicionales de Station X.

**Distribución de archivos:** el ZIP maestro completo conserva los 39 prompts protegidos y sus tres carpetas; un ZIP **incremental de deck** contiene **solo `01_INFORMACION_PARA_IMPORTAR/decks/DECK_<...>/`**, configuración y recursos propios. Es un **paquete parcial importable**, no sustituye al maestro ni autoriza borrar prompts. **Las 16 fichas existentes ya están dentro de subcarpetas individuales**, con referencias a fotografías/guías locales y materiales compartidos comprobadas en el paquete. Si se actualizan instrucciones comunes, entregar **solo el parche de prompts editados**, nunca todo el ZIP por inercia, salvo que Miguel pida expresamente el maestro completo. El apartado 36 sigue intacto.

**Al retomar trabajo:** leer el control del prompt, localizar el último paso
realmente terminado y continuar desde allí. No duplicar entregables ni
atribuir a la plataforma cambios que no se han comprobado.

**Reanudación de una secuencia A01–A10:** recuperar del deck y del registro único la selección original de apartados, su orden ascendente, el último Axx realmente cerrado y el primero no cerrado. Reanudar **dentro del primer apartado incompleto**, en los IDs concretos pendientes, sin saltarlo, reiniciar trabajo acreditado ni ampliar la selección. Cerrar documental y lógicamente ese Axx antes de pasar al siguiente solicitado. Si persiste un bloqueo imprescindible, documentarlo y detener la secuencia; `PENDIENTE_MESA` no impide por sí solo avanzar cuando el trabajo documental verificable ya terminó. No solicitar confirmación entre apartados de una secuencia autorizada.
