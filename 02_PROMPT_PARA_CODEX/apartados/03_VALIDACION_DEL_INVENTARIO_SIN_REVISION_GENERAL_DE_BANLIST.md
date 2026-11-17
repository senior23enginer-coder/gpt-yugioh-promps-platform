# Apartado 03 — VALIDACIÓN DEL INVENTARIO, IDENTIDAD Y COMPATIBILIDAD MECÁNICA

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** abrir únicamente el archivo del deck solicitado en `01_INFORMACION_PARA_IMPORTAR/decks/` y sus salidas previas pertinentes. Consultar las instrucciones generales vigentes de `02_PROMPT_PARA_CODEX/00_PROMPT_UNICO_STATION_X_V31.md` y las reglas contextuales de `02_PROMPT_PARA_CODEX/REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md` cuando correspondan; no ejecutar el orquestador para corregir este apartado.

**Salida:** guardar el resultado de este apartado en el mismo archivo del deck, sección `APARTADO_03`, con estado real (SIN_INICIAR, EN_PROCESO, PARCIAL, COMPLETA o NO_APLICA justificado), referencias cruzadas por ID, evidencias cuando existan y siguiente tarea concreta. No crear un nuevo archivo de resultados.

**Paquete incremental por deck:** el inventario confirmado Main/Extra/Side/Reserva y Skill, con cantidades por zona, debe quedar **dentro de la ficha `DECK_*_CONTENIDO_CURADO.md` del deck solicitado**, en su carpeta individual tanto si el deck ya existía como si es nuevo. Verificar que no haya cartas de otro deck ni se introduzcan cartas del Side/Reserva como disponibles por defecto. Si Miguel pide analizar un único deck, incluir **solo su carpeta** bajo `01_INFORMACION_PARA_IMPORTAR/decks/`; no volver a comprimir el maestro salvo petición expresa, ni duplicar el inventario en otro archivo de configuración. Las **16 fichas actuales** están organizadas por deck; comprobar que cada referencia relativa resuelva dentro de su carpeta o a los recursos compartidos.

## Instrucción editorial específica

Transcribir exactamente cartas, nombres y copias; detectar imágenes ambiguas, entradas duplicadas por error y piezas no identificadas. Separar datos **confirmados**, **recibidos sin confirmar** y **faltantes**. No inventar una carta ni tratar un vacío sin constancia como prueba de que el usuario decidió dejarlo vacío.

Validar **compatibilidad mecánica del formato, identidad y requisitos reales de invocación**. Aplicar la exclusión transversal de la sección 1 del orquestador también a recomendaciones de altas, bajas y cantidades, sin excepciones. Evaluar las cartas recibidas por sus efectos, costes, materiales, zonas y condiciones reales; conservar sus cantidades y no agregar advertencias procedentes de listas de construcción.

Se puede comenzar un **estudio provisional** con inventario recibido. No presentar como definitivo un inventario pendiente de aprobación. La falta de certeza reglamentaria tampoco impide conservar trabajo documental etiquetado como pendiente.
