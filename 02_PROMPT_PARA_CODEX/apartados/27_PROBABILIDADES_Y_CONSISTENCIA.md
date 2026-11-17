# Apartado 27 — PROBABILIDADES Y CONSISTENCIA

Módulo de trabajo independiente del proyecto Station X. Versión modular 4 (2026-11-03).

**Entrada:** abrir únicamente el archivo del deck solicitado en `01_INFORMACION_PARA_IMPORTAR/decks/` y sus salidas previas pertinentes. Consultar las instrucciones generales vigentes de `02_PROMPT_PARA_CODEX/00_PROMPT_UNICO_STATION_X_V31.md` y las reglas contextuales de `02_PROMPT_PARA_CODEX/REFERENCIA_REGLAS_TCG_RUSH_Y_SKILLS.md` cuando correspondan; no ejecutar el orquestador para corregir este apartado.

**Salida auxiliar:** aplicar los criterios de este módulo al A01/A02/A08, únicamente cuando proceda, mediante referencias a la ficha canónica y al registro central permitido. Este módulo no crea sección persistida APARTADO_27, porcentaje ni estado de avance independiente; documentar en el eje A01–A10 correspondiente la evidencia y el pendiente sin duplicar contenido.

## Instrucción editorial específica

**Contrato reproducible de probabilidad:** declarar formato, versión, zona Main y tamaño `N`, tamaño de mano `n` según situación de primero/segundo y reglas del formato, identificadores de cartas que cumplen la condición, número de copias `K`, criterio exacto de éxito y modelo (por ejemplo, `P(≥1)=1−C(N−K,n)/C(N,n)` sin reemplazo). Para starter+extensor usar conjuntos y solapamientos explícitos, no sumar probabilidades marginales. Separar probabilidad de **tener recursos** de probabilidad de **resolver** frente a una respuesta. Rush/GOAT requieren hipótesis propias de mano/robo; no extrapolar TCG. Sin inventario confirmado o condición funcional clara, resultado PENDIENTE. Presentar redondeo y supuestos junto a cada cifra.

Con lista completa y cantidades confirmadas, calcular probabilidades de starter, starter+extender, buscadores, bricks, manos funcionales, interrupciones iniciales e impacto de sustituciones. Usar hipergeométrica u otro método declarado y condiciones de mano del formato. **Robar un starter no implica resolver un combo**. Nunca inventar porcentajes ni tratar hipótesis como resultados empíricos.
