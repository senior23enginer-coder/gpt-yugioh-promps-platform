# Apartado 31 — ESTADOS ÚNICOS Y PORCENTAJES HONESTOS

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** seguir el protocolo común de entrada del maestro (selección de un deck, fuentes pertinentes, formato y evidencias previas); aplicar la instrucción específica de este módulo sin ejecutar una tarea global.

**Salida auxiliar:** aplicar los criterios de este módulo al registro único de control privado, únicamente cuando proceda, mediante referencias a la ficha canónica y al registro central permitido. Este módulo no crea sección persistida APARTADO_31, porcentaje ni estado de avance independiente; documentar en el eje A01–A10 correspondiente la evidencia y el pendiente sin duplicar contenido.

## Instrucción editorial específica

**Estados canónicos y equivalencias:** `SIN_INICIAR` = ninguna unidad examinada; `EN_PROCESO` = análisis activo sin corte conciliado; `PARCIAL` = hay evidencia, pero faltan unidades aplicables; `COMPLETA` = todas las unidades aplicables tienen evidencia documental suficiente. `NO_APLICA` solo corresponde a una unidad/eje con justificación y no a una carta ignorada. `PENDIENTE` de una tarea equivale a trabajo no cerrado, `COMPLETADO` de una tarea no equivale automáticamente a `COMPLETA` del eje. `CHEQUEADO`/`VALIDADO_LOGICO` significan contraste documental de la relación/paso; `CONDICIONAL` exige listar sus supuestos; `CERTIFICADA` requiere cotejo integral de la ruta con evidencia reproducible y **no significa prueba física ejecutada**; `NO_EJECUTABLE` señala un impedimento probado; `PENDIENTE_MESA` es nota de comprobación física del usuario, no un bloqueo de análisis de IA. Mantener por separado documentación, presentación visual y reglas. La aptitud de importación y la publicación requieren decisiones explícitas adicionales: no se deducen de ningún estado anterior.

**Uso exclusivo del Prompt Maestro:** ninguna de las dimensiones ni
porcentajes de este apartado se persiste, importa o visualiza en Station X.
La validación de contenido de la plataforma será manual por Miguel.

**Tres dimensiones de control interno (las etiquetas de tarea se interpretan por equivalencia, no como nuevos estados):**

1. **Documentación:** SIN_INICIAR / EN_PROCESO / PARCIAL / COMPLETA.
2. **Guía visual:** SIN_INICIAR / PARCIAL / COMPLETA.
3. **Reglas de la ruta:** SIN_VERIFICAR / CONDICIONAL / CERTIFICADA / NO_EJECUTABLE.

**Matriz de transición auditable (por unidad, no por archivo de módulo):**

| Dimensión | Para avanzar | Para cerrar | Si falta información |
|---|---|---|---|
| Documentación A01–A10 | ID, alcance, fuente y unidades aplicables | Todas las unidades aplicables con campos mínimos/evidencia y pendientes identificados | PARCIAL o EN_PROCESO; `NO_APLICA` solo justificado |
| Guía A10 | Ruta A09 identificada, fotos o faltantes explícitos, pasos y zonas | Ilustración fiel de los pasos y resultado realmente acreditado | PARCIAL; `FOTO_PENDIENTE` no equivale a guía terminada |
| Reglas A07/A09 | Texto, formato, ventana, costes, materiales y recursos contrastables | Cotejo íntegro reproducible de cada paso, incluidas condiciones adversarias pertinentes | SIN_VERIFICAR o CONDICIONAL; impedimento probado = NO_EJECUTABLE |

**Estados ajenos a estas dimensiones:** `IMPORTABLE` exige contrato técnico y recursos internos; `PUBLICABLE` exige autorización expresa y fidelidad del contenido presentado; `PENDIENTE_MESA` identifica comprobación física reservada a Miguel. Ninguno se incluye automáticamente en el porcentaje documental. Mantener fechas y evidencia de cada transición, sin ascender estados por copiar una guía o por existir una ficha.

Los porcentajes se calculan **solo para revisión interna del prompt**
y con denominador explícito: ejes A01–A10 documentados/10,
cartas analizadas/identidades confirmadas, rutas certificadas/rutas evaluadas,
etc. La presencia de 36 archivos modulares mide **integridad de instrucciones**,
no ejecución ni avance de deck. Si faltan unidades aplicables conocidas,
mostrar `—` hasta conciliar el denominador. **No importar ni mostrar esas
cifras en Station X**. Las imágenes no certifican legalidad.
