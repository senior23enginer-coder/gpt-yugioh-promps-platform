# Apartado 30 — COMPROBACIÓN INTERNA Y BITÁCORA ÚNICA

**Regla vigente confirmada por Miguel:** este apartado existe SOLO para
trabajar con el Prompt Maestro. Station X NO almacena bitácoras ni estados
editoriales. Está prohibido implementar o exigir vistas, registros, tablas,
permisos o APIs de seguimiento en la plataforma.

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** abrir únicamente el archivo del deck solicitado en `01_INFORMACION_PARA_IMPORTAR/decks/` y sus salidas previas pertinentes. Consultar las instrucciones generales vigentes de `02_PROMPT_PARA_CODEX/00_PROMPT_UNICO_STATION_X_V31.md` y las reglas contextuales de `02_PROMPT_PARA_CODEX/REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md` cuando correspondan; no ejecutar el orquestador para corregir este apartado.

**Salida:** controlar de forma privada la calidad del **apartado A01–A10 que se esté trabajando** en el deck elegido y sincronizar el registro central. Este módulo 30 **no crea una fila de progreso A30**, un archivo de resultados ni un estado dentro de Station X.

## Instrucción editorial específica

Revisar coherencia de inventario, cartas/cantidades, materiales, textos de efectos, resolución, rutas alternativas, resultados, cálculos e imágenes **antes de afirmar que una ficha está terminada**. Este trabajo se refleja en el **control A01–A10 de la ficha del deck seleccionado** y el único resumen central, sin informes independientes ni hojas de seguimiento adicionales. El registro existente `03_COMPROBACIONES_NO_IMPORTAR/ESTADO_UNICO_A01_A10_11_DECKS.md` es **privado, no importable a Station X**; los 36 módulos están en `02_PROMPT_PARA_CODEX/apartados/` y los **13** contenidos en `01_INFORMACION_PARA_IMPORTAR/decks/`. Los ZIPs parciales de decks **no incluyen este control central**, ni los prompts, ni datos de otro deck.

La bitácora registra por deck/version: tarea, cantidad esperada o conocida, cantidad resuelta, porcentaje, estado, punto de pausa, siguiente acción, fecha y observación corta. **No generar ni exigir evidencia fotográfica, actas, reportes o documentos auxiliares para alimentar la bitácora.** Si hay una duda, escribirla de manera concreta en el registro del propio deck.

## Especificación consolidada de la bitácora única

**Control de preservación incluido en esta misma bitácora:** el inventario de prompts y sus huellas SHA-256 se guardan únicamente en `03_COMPROBACIONES_NO_IMPORTAR/ESTADO_UNICO_A01_A10_11_DECKS.md`. No se habilita ningún archivo nuevo de inventario. Comprobar 36 apartados y los tres documentos base **en el maestro** antes y después de cada operación que lo modifique; prohibida cualquier eliminación por depuración, obsolescencia, renombrado o sustitución. Un ZIP incremental con la **única carpeta del deck** o un **parche de prompts** no sustituye el maestro, por tanto no se le exigen todos los prompts físicamente dentro de ese parcial. Una diferencia no autorizada en el maestro bloquea la entrega. Esta revisión de integridad es distinta de la validación reglamentaria de las cartas y no aumenta los porcentajes A01–A10.

BITÁCORA ÚNICA DE PROGRESO, SIN ARCHIVOS ADICIONALES

La bitácora es un **control de trabajo del Prompt Maestro**, fuera de
Station X. Actualizar siempre el registro único citado arriba y, al informar,
resumirlo en conversación; no crear campos de seguimiento en el modelo de
visualización. No generar una nueva hoja o informe por deck salvo solicitud
expresa del usuario.

**Campos mínimos por deck:** ID, nombre, equipo, formato, versión, fecha de actualización, último apartado tratado, último combo trabajado, estado actual, impedimento, siguiente tarea concreta, responsable de decisión cuando aplique.

**Checklist por categoría (casillas comprobables):**

| Categoría | Qué se marca | Métrica |
|---|---|---|
| Inventario | Main, Extra, Side, Reserva, Skill si aplica, copias y dudas | Datos confirmados / datos recibidos |
| Cartas | Roles, efectos, restricciones y funciones | Cartas analizadas / cartas identificadas |
| Sinergias | Motores, vínculos y dependencias | Relaciones documentadas y pendientes |
| Interacciones | Acciones básicas y starters, sin contarlas como combos | Líneas documentadas / identificadas |
| Extensiones | Formas de continuar jugadas | Extensiones documentadas / identificadas |
| Combos completos | Familias, variantes, objetivos y estados legales | Familias completas / familias identificadas |
| Guías visuales | Mano, fotos, pasos, flechas, tablero y zoom | Guías visuales terminadas / familias identificadas |
| Interrupciones | Respuestas por punto crítico y ramas sin salida | Escenarios resueltos / escenarios identificados |
| Estrategias | Primero, segundo, brick, medio/tardío, fortalezas/debilidades, condiciones de victoria | Subtemas completos / subtemas aplicables |
| Extra, Side y Reserva | Cobertura legal según cartas realmente disponibles | Cartas evaluadas / cartas conocidas |
| Matchups | Solo rivales registrados y pertinentes | Enfrentamientos desarrollados / seleccionados |
| Práctica y cálculos | Diez manos aplicables, probabilidades justificadas y errores | Actividades resueltas / actividades aplicables |
| Certificación de reglas | Secuencias cotejadas integralmente | Rutas CERTIFICADAS / rutas evaluadas |

**Fórmula por indicador:** porcentaje = 100 × elementos efectivamente terminados / elementos aplicables conocidos. No contar una casilla por el mero hecho de que tenga un título; requiere contenido útil. Si no se conocen todas las familias de combo posibles, el porcentaje se denomina **cobertura de las familias identificadas**; nunca «porcentaje de todos los combos existentes». Evitar un porcentaje global único engañoso; si se desea una vista general, mostrar los indicadores documentales, visuales y reglamentarios **por separado**.

**Inicialización o reanudación:** leer **solo la evidencia del deck seleccionado** entre los trece disponibles y conservar su progreso real A01–A10; no reiniciar ni recalcular los otros doce decks, ni fabricar porcentajes. Los estados quedan exclusivamente en el control documental privado, no en Station X.

**Actualización de cada sesión:** registrar en el archivo único los checks
realmente cumplidos y la siguiente tarea. El seguimiento se comunica al
usuario fuera de Station X y nunca se adjunta a las fichas importadas.
