# A01 — verificación individual Kashtira Pure (665)

23-11-2026. TCG Advanced. Main 42 / Extra 15 / Side 0 / Reserva 19, 38 CID, 44 filas y 16 rutas. No se cambia el inventario ni se aplica banlist.

Fuentes: Markdown blob `a3270c337e2b29bd5db89bbb9657753ca36c1835`; JSON blob `f0b79c443a774e16f01e1e4940e9dc92de823d35`. La evidencia estratégica está en A01.1–A01.3 del documento individual, no en una simulación.

- [x] T1: control de recursos y zonas mediante destierro y Xyz de Rango 7. Motor Wraitsoth, Fenrir, Unicornio, Teosis y Riseheart; Shangri-Ira y Arise-Heart condicionados a disparadores y materiales; presión y recuperación sin OTK garantizado. Riesgos por campo propio no vacío, bloqueos Xyz y disponibilidad de cuerpos.
- [x] T2: seis campos de perfil, cuatro cartas y cuatro fases existentes.
- [x] T3: seis propósitos, 15 referencias documentales de efectos, CID/card_id y fuentes Konami, seis rutas existentes enlazadas en A01.3. Las referencias A01 no son efectos ejecutables.
- [x] T4: [CI #45272833416](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45272833416) devolvió PASS para 665: 6 campos, estilo 167/190, resumen 199/250, paridad Markdown/JSON y 4 cartas/4 fases.
- [x] T5: CI #45272833416 devolvió ISOLATED_PASS de importación/exportación/reimportación, 38 fotos, 16 rutas, 8 rechazos y cantidades conservadas. Tras corregir el módulo visual del entorno de pruebas, [CI #45273243817](https://github.com/senior23enginer-coder/platform-yugioh-md/actions/runs/45273243817), job 138038253600, commit `030df199fba5d9f8f4760e1a3ef1324521539ece`, devolvió ISOLATED_PASS y PASS de navegador para el mismo deck (390 y 1280 px, 6 campos). El fallo global corresponde a otros registros.

Resultado: **5/5 acreditadas en entorno aislado**. No publicación en producción. No iniciar otro apartado.
