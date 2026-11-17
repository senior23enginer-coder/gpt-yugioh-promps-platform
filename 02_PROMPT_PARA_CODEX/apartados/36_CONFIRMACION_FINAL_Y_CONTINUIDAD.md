# Apartado 36 — CONFIRMACIÓN FINAL Y CONTINUIDAD

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** abrir únicamente el archivo del deck solicitado en `decks/` y sus salidas previas pertinentes. Consultar `00_REGLAS_COMPARTIDAS.md`; no ejecutar el orquestador para corregir este apartado.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_36`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

## Instrucción editorial específica

**Bloqueo de entrega por integridad de prompts:** antes de cerrar, actualizar el ZIP o informar éxito, verificar que existen **36/36 prompts modulares y 3/3 documentos base**, sin archivos renombrados ni eliminados, y que las huellas SHA-256 de todo prompt no editado coinciden con el registro único. Reportar expresamente `prompts eliminados: 0` y `modificaciones no autorizadas: 0`. Si una comprobación falla, detener el empaquetado: una depuración jamás justifica perder un prompt. Esta regla permanece aplicable aunque solo se esté corrigiendo una carta, una ruta, una guía visual o el archivo de pendientes.

Cerrar cada ejecución con **un solo resumen** en el mensaje; la generación inicial entrega el **único ZIP modular con maestro, apartados, guía Codex y archivos de decks** y una corrección individual entrega, si se solicita, **solo el prompt del deck afectado**:

- Deck, ID, equipo, formato y versión.
- Inventario confirmado o pendiente.
- Documentación: estado y porcentaje con numerador/denominador.
- Guías visuales: estado y porcentaje con numerador/denominador.
- Reglas: estado y porcentaje de rutas evaluadas.
- Publicación: estado comprobado o SIN_COMPROBAR.
- Última tarea terminada; siguiente tarea; impedimentos y fecha.
- Listado breve de decks trabajados y decks aún SIN_INICIAR, si se cerró un lote.

**Nunca decir «estudio completo» si faltan combos por desarrollar, rutas por ilustrar, estrategias requeridas o un estado pendiente significativo.** Publicar contenido provisional **solo cuando se autorice** y siempre con su verdadera condición. Mantener **un Prompt Maestro global**, **un prompt operativo por deck con cartas** y **una única bitácora nativa** para continuidad. Los prompts de deck no son maestros adicionales ni requieren repetir la ejecución global.
