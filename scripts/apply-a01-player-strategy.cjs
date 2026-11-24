'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {validatePlayerGuide,validateStrategy}=require('./a01-player-guide-contract.cjs');
const {validateProfile,assertSourceParity}=require('./a01-profile-contract.cjs');
const root=path.resolve(__dirname,'../01_INFORMACION_PARA_IMPORTAR/decks');
const evidence=path.resolve(__dirname,'../03_COMPROBACIONES_NO_IMPORTAR/A01_CIERRES_INDIVIDUALES');
const ids=[653,671,677,665,650,656,670,684,687,660,673,699,704,705,706,707];
// Copy authored individually during the 16-deck technical/pedagogical review.
const reviewedCopy={
  "650": [
    "Elfnote / Modelo de Poder y apoyo Dogmátika",
    "Combo posicional y Sincronía de control",
    "Ocupa y rota la zona principal central con Lucina, Regina y Tinia; usa sus soportes y Power Patron para mantener control y construir Sincronías.",
    "Lucina busca Regina, Tinia coloca Welcome Home y Fortuna prepara Rhapsodia. Power Patron habilita Strelitzia o Junora cuando los niveles y zonas coinciden.",
    "Mantén libre la zona central cuando el procedimiento la requiera; Welcome Home necesita Atributo distinto y limita el Extra a Sincronías.",
    [
      [
        22523,
        "Extensora de control de la zona central",
        "Puede convertir un recurso Elfnote en una entrada desde mano; al llegar al centro permite desarrollar otro Elfnote desde Deck.",
        "Úsala después de Lucina si puedes pagar su condición de envío y quieres colocar Regina en el centro con apoyo lateral."
      ],
      [
        22116,
        "Iniciadora y buscadora del motor central",
        "Su acceso a la zona central y su búsqueda permiten elegir Regina para soporte continuo o Power Patron para la ruta de Sincronía.",
        "Úsala con el centro libre; selecciona Regina para el campo posicional o Patron si buscas Strelitzia."
      ],
      [
        22117,
        "Acceso a la Magia Continua de soporte",
        "Coloca Welcome Home boca arriba desde Deck; este soporte puede transformar Tinia AGUA en otro Elfnote de Atributo distinto.",
        "Úsala para establecer Welcome Home antes de convertirla en Lucina o Fortuna, respetando la restricción posterior de Sincronía."
      ],
      [
        22119,
        "Cantante de Nivel uno y ajuste de niveles",
        "Permite combinar su Nivel 1 con Lucina de Nivel 6 para Strelitzia; enviado como material de Sincronía puede facilitar otra búsqueda.",
        "Úsalo cuando tengas un Elfnote no Cantante o la apertura Medius y un destino Sincro compatible con la zona y el Nivel."
      ]
    ]
  ],
  "653": [
    "DoomZ / Modelo de Poder",
    "Combo Xyz con control mediante Equipos",
    "Destruye recursos DoomZ para buscar o colocar soporte, equipa monstruos y conviértelos en Xyz Máquina VIENTO; Drastrius controla y Júpiter presiona.",
    "Incursores, Amalthe y Elara convierten destrucciones en búsquedas y Equipos. Drastea equipada accede a Drastrius; Medius abre alternativas con Diactorus o Júpiter.",
    "Respeta los límites de cada efecto de Elara y Amalthe, la restricción Xyz de Incursores y los materiales de Drastrius. Júpiter puede entrar sin materiales.",
    [
      [
        21823,
        "Iniciador y extensión desde Deck",
        "Destruye otra carta DoomZ mediante su efecto para buscar o Invocar una pieza del Deck. Elara o Amalthe pueden activar su propio disparo después.",
        "Úsalo con una DoomZ que puedas destruir y cuando todavía puedas respetar el límite del Extra a Xyz."
      ],
      [
        21775,
        "Buscador de monstruos y material de Xyz",
        "Busca otro monstruo DoomZ al ser Invocada o destruida por efecto; equipada puede transformarse en una Xyz Máquina VIENTO del Rango correspondiente.",
        "Úsala cuando necesites Elara o Drastea en mano, o un cuerpo de Nivel 4 equipado para Diactorus."
      ],
      [
        21776,
        "Acceso a Magias y Trampas del motor",
        "Al ser Invocada o destruida por efecto permite Colocar soporte DoomZ desde Deck; equipada también puede convertirse en una Xyz de Rango 4.",
        "Decide si gastar su disparo al Invocarla o reservarlo para su destrucción: no puedes obtener las dos colocaciones ese turno."
      ],
      [
        21811,
        "Jefe Xyz de interacción y presión",
        "Puede negar un efecto de monstruo rival activado en Campo o Cementerio desacoplando un material; después puede equipar un monstruo rival boca arriba.",
        "Priorízalo con Drastea y su Equipo para preparar una respuesta; conserva material para la amenaza que realmente interrumpa tu plan."
      ]
    ]
  ],
  "656": [
    "Tiagrimientos / Horus / Demoniherrero",
    "Combo de Fusión por envío al Cementerio",
    "Envía Tiagrimientos por efecto para fusionar y reciclar materiales; Horus y Demoniherrero abren salidas independientes que complementan el plan.",
    "Reinoheart envía Scheiren, Merrli o Havnis para activar Fusiones. Caleido-Heart aporta retirada; Súper Polimerización aprovecha parejas rivales y Horus/Demoniherrero extienden.",
    "Los envíos por coste no activan automáticamente los disparos de Fusión. No presupongas las cartas aleatorias ni cuentes materiales Xyz como cartas del Cementerio.",
    [
      [
        17417,
        "Iniciador de envío dirigido al Cementerio",
        "Al ser Invocado permite enviar un Tiagrimientos del Deck al Cementerio; es el acceso preciso a Scheiren o Merrli para preparar una Fusión.",
        "Úsalo para enviar el nombre que falta. La ruta de Caleido-Heart exige Reinoheart y otros dos Aqua elegibles."
      ],
      [
        17415,
        "Extensora de mano y disparo de Fusión",
        "Puede desarrollar un cuerpo de Nivel 4 y enviar recursos desde Deck; si llega al Cementerio por efecto, su disparo permite fusionar usando materiales válidos.",
        "Úsala para reunir un Nivel 4 o iniciar una Fusión desde Cementerio; distingue su envío por efecto de los costes de otras cartas."
      ],
      [
        17416,
        "Respuesta desde mano y material Aqua",
        "Puede responder a una activación rival de monstruo en Campo con su Invocación y envío de cartas; si llega al Cementerio por efecto, habilita su Fusión.",
        "Resérvala para una ventana rival compatible o úsala como Aqua disponible en una Fusión de Caleido-Heart."
      ],
      [
        17414,
        "Iniciadora de envío y material de Fusión",
        "Al ser Invocada puede enviar cartas superiores al Cementerio; su propio envío por efecto habilita la Fusión si existen materiales.",
        "Úsala cuando puedas aprovechar los recursos del Cementerio sin suponer los nombres que serán enviados."
      ]
    ]
  ],
  "660": [
    "Purrely / Recuerdos de Juego Rápido",
    "Control Xyz por acumulación de materiales",
    "Convierte Recuerdos en materiales de Xyz: Belleza interrumpe monstruos, Rechoncho acumula recursos y Noir domina mediante retirada y protección condicionada.",
    "Purrely usa Recuerdos de mano, Purrelyly los del Cementerio; Belleza responde a monstruos y Rechoncho acumula materiales para Noir. Felicidad ofrece combate y acceso a ZEUS.",
    "Noir exige cinco materiales para su inmunidad a efectos activados rivales; desacoplar dos puede perderla. La Trampa de ascenso devuelve la Xyz al Extra.",
    [
      [
        18003,
        "Iniciador de excavación y Xyz desde Campo",
        "Al ser Invocado puede obtener una Magia o Trampa Purrely entre tres cartas excavadas; muestra un Recuerdo de mano para Invocar una Xyz usando a Purrely en Campo.",
        "Úsalo con un Recuerdo compatible en mano; el resultado de la excavación no sustituye el requisito de mostrar una carta real."
      ],
      [
        18481,
        "Buscador y acceso Xyz desde Cementerio",
        "Busca una carta Purrely que no sea Magia Rápida al ser Invocado; utiliza un Recuerdo Rápido elegible del Cementerio para el acceso Xyz correspondiente.",
        "Úsalo cuando Delicioso Recuerdo ya esté en Cementerio para preparar Rechoncho, o con otro Recuerdo según la Xyz necesaria."
      ],
      [
        18005,
        "Xyz de interacción frente a monstruos",
        "Puede seleccionar un monstruo de efecto rival y negar sus efectos; con Bello Recuerdo acoplado puede hacerlo como Efecto Rápido.",
        "Úsala cuando quieras una respuesta frente a un monstruo rival y puedas mantener Bello Recuerdo como material."
      ],
      [
        18008,
        "Jefe de retirada y protección por materiales",
        "Con cinco o más materiales es inmune a efectos activados del rival; desacopla dos para poner una carta rival del Campo o Cementerio al fondo del Deck.",
        "Úsalo sobre un Rango 2 de cinco materiales o por Trampa; conserva un Purrely de Nivel 1 como material para que la retirada sea rápida."
      ]
    ]
  ],
  "665": [
    "Kashtira / motor puro",
    "Control de destierro y Xyz de Rango 7",
    "Despliega Nivel 7 con Fenrir, Unicornio y Teosis; Shangri-Ira restringe zonas y prepara Arise-Heart, mientras Nacimiento facilita la recuperación.",
    "Wraitsoth busca iniciadores, Unicornio accede a Teosis y Fenrir genera presión. Shangri-Ira prepara desarrollo; Arise-Heart retira cartas y altera el Cementerio.",
    "Teosis restringe el Extra a Xyz; el bloqueo de Shangri-Ira requiere un destierro rival boca abajo mientras está presente. Arise-Heart necesita tres materiales para retirar.",
    [
      [
        17768,
        "Iniciador de Nivel siete y retirada rival",
        "Se Invoca desde mano si no controlas monstruos, busca otro Kashtira y puede desterrar boca abajo una carta rival boca arriba ante ataque propio o activación de monstruo rival.",
        "Úsalo con Campo vacío para buscar Riseheart o Unicornio; conserva su interacción para una amenaza elegible."
      ],
      [
        17769,
        "Acceso a Teosis y extensión del motor",
        "Con Campo propio vacío entra desde mano y puede buscar una Mágica Kashtira. Teosis permite traer un Kashtira de Atributo distinto desde Deck.",
        "Úsalo al comenzar para buscar Teosis y preparar dos monstruos de Nivel 7 sin gastar necesariamente la Normal."
      ],
      [
        17800,
        "Xyz de control de zonas y desarrollo",
        "En Standby puede Invocar otro Kashtira del Deck. Los destierros rivales boca abajo activan su bloqueo de zonas si permanece boca arriba.",
        "Constrúyelo con dos Nivel 7 cuando quieras preparar continuidad; reserva su efecto de Standby y los materiales de protección."
      ],
      [
        18191,
        "Jefe de destierro y control de Cementerio",
        "Mientras está boca arriba destierra cartas que irían al Cementerio; acopla cartas desterradas y puede desacoplar tres para desterrar una carta boca abajo.",
        "Úsalo tras una activación exitosa de Shangri-Ira ese turno o con los materiales estándar; conserva tres materiales si necesitas retirada rápida."
      ]
    ]
  ],
  "670": [
    "Infiernoble / Guerreros y Equipos",
    "Combo de Guerreros FUEGO, Sincronía y Enlace",
    "Convierte Guerreros FUEGO y Equipos en materiales de Angélica y recursos de Museo; Isolde desarrolla cuerpos y Great Charles ofrece presión cuando su acceso existe.",
    "Ogier envía Equipos y Renaud recupera recursos para Angélica. Connector abre Isolde; un Charles Sincronía equipado habilita Great Charles como salida de control.",
    "Distingue cómo fue Invocado Renaud y cuándo se trata como Cantante. No atribuyas Charles a Angélica sin niveles y materiales suficientes.",
    [
      [
        15247,
        "Iniciador de recursos y Nivel cuatro",
        "Al ser Invocado puede enviar Durendal u otro recurso elegible al Cementerio; su Nivel 4 permite sincronizar con Renaud Cantante de Nivel 1.",
        "Úsalo con Renaud en mano para preparar el Equipo recuperable antes de formar Angélica."
      ],
      [
        15248,
        "Extensor de Guerrero y soporte equipado",
        "Su acceso desde mano permite desarrollar otro Guerrero según el coste de Equipo o recurso FUEGO indicado; también participa en líneas de protección equipada.",
        "Úsalo cuando su coste esté disponible y necesites material de Sincronía; comprueba el Nivel que tendrá tras su procedimiento."
      ],
      [
        15082,
        "Cantante condicional y recuperación de Equipo",
        "Al Invocarse por su procedimiento desde mano se trata como Cantante; si es Invocado Especialmente puede recuperar un Guerrero FUEGO o Equipo elegible.",
        "Úsalo después de Ogier para recuperar Durendal y combinar Nivel 1 + Nivel 4. Si llega desde Deck por Isolde no se convierte en Cantante por eso."
      ],
      [
        13500,
        "Enlace de acceso a Guerreros y Equipos",
        "Aprovecha dos Guerreros para buscar otro Guerrero y preparar una extensión desde Deck mediante los Equipos requeridos; la carta buscada tiene restricciones.",
        "Úsala con Connector y Aqua Dolphin, o con el motor Museo/Renaud, para desarrollar recursos sin sumar automáticamente una Sincronía posterior."
      ]
    ]
  ],
  "671": [
    "Mementotlán / Demoniherrero",
    "Combo de Fusión y recuperación de Cementerio",
    "Destruye Memento propios, envía nombres al Cementerio y transforma esos recursos en Rey Creación y Creación Combinada; el segundo motor aporta salidas de Enlace.",
    "Angbruja busca Tatsunootoshigo para enviar Mementos. Fusión Mementotlán prepara Rey Creación y Creación Combinada ofrece presión de 5000 ATK al reunir cinco nombres distintos.",
    "Creación Combinada exige cinco otros nombres distintos en mano y/o Cementerio. Rey Creación destruye igual número de monstruos Memento propios y cartas rivales.",
    [
      [
        19364,
        "Iniciadora de búsqueda y recuperación",
        "Al ser Invocada añade un Memento distinto. Su otro efecto permite destruirse para recuperar un Memento válido desde Cementerio al Campo.",
        "Invócala primero para buscar Tatsunootoshigo si sigue en Deck; reserva su otro efecto cuando necesites recuperar un cuerpo."
      ],
      [
        19904,
        "Magia de Fusión y búsqueda posterior",
        "Fusiona con mano o Campo; si un monstruo propio fue destruido por efecto ese turno, también puedes devolver Mementos del Cementerio como material.",
        "Úsala tras preparar los materiales de Rey Creación, Dragón Gemelo o Quimera; comprueba que la destrucción previa habilite el Cementerio."
      ],
      [
        20216,
        "Fusión de preparación e interacción",
        "Al fusionarse envía tres cartas Memento de Deck o Extra al Cementerio; su respuesta rápida destruye igual cantidad de monstruos Memento propios y cartas rivales.",
        "Úsalo para preparar nombres y recursos; conserva Mementos propios que puedan servir para la destrucción de intercambio."
      ],
      [
        19360,
        "Amenaza de batalla y recuperación reactiva",
        "Se Invoca desde mano o Cementerio devolviendo cinco otros monstruos Memento de nombres distintos de esas zonas; puede atacar a todos los monstruos rivales si está sola.",
        "Úsala cuando reúnas esos cinco nombres y necesites presión; si el rival activa una carta o efecto, puede recuperar otro Memento en su ventana."
      ]
    ]
  ],
  "673": [
    "Salamangrande / motor de Enlaces FUEGO",
    "Combo de Enlace y recuperación de recursos",
    "Desarrolla Gacela y Rotante, obtiene Santuario y reutiliza Enlaces con Lobo y Jaque Jaguar; Fénix Furioso añade búsqueda mediante reencarnación.",
    "Gacela envía Rotante y Espejismetal trae Jaque Jaguar. Lincefogata busca Santuario; Lobo recupera recursos y Fénix Furioso puede buscar al reencarnarse.",
    "Distingue el bloqueo de Invocaciones FUEGO de Salamangrande de Fuego y el de activaciones de efectos de monstruos FUEGO de Espejismetal.",
    [
      [
        14240,
        "Iniciadora y envío dirigido del motor",
        "Puede entrar desde mano al enviarse otro Salamangrande al Cementerio y, al ser Invocada, enviar una carta Salamangrande del Deck.",
        "Úsala para enviar Rotante cuando quieras formar Espejismetal; si necesitas otra carta, comprueba que la línea de recuperación sigue viable."
      ],
      [
        18908,
        "Buscador de acceso a Gacela",
        "Al ser Invocado puede buscar otro Salamangrande de Nivel 4 o menor; después de resolver, limita las Invocaciones Especiales a FUEGO ese turno.",
        "Úsalo con la Normal para buscar Gacela y formar Lincefogata; evita elegir un destino incompatible con el bloqueo."
      ],
      [
        14249,
        "Enlace de acceso a Santuario",
        "Convierte un Ciberso de Nivel 4 o menor en un Enlace 1 y puede buscar Santuario para habilitar la reencarnación de tus Enlaces.",
        "Úsalo al comienzo del desarrollo para obtener Santuario antes de construir y reutilizar Lobo."
      ],
      [
        14125,
        "Enlace de recuperación y continuidad",
        "Puede recuperar un monstruo FUEGO del Cementerio cuando se Invoca un monstruo a una zona que apunta; su reencarnación habilita otra recuperación de soporte.",
        "Déjalo apuntando a una zona libre para Jaque Jaguar y decide qué recurso necesitas recuperar antes de gastar otra copia de Extra."
      ]
    ]
  ],
  "677": [
    "Cristron / Horus",
    "Combo reactivo de Sincronía con motor Horus",
    "Prepara Cantantes Cristron para sincronizar en turno rival y utiliza Sarcófago para recuperar Horus de Nivel 8 cuando no exista un bloqueo de Extra.",
    "Smiger prepara Citree o Tristaros; Sulfador e Inclusión recuperan recursos para Sincronía. Amset y Sarcófago habilitan cuerpos Horus para Xyz de Rango 8.",
    "Smiger restringe el Extra a Sincronías Máquina; Sulfador a Máquinas. Citree destierra sus materiales. El retorno Horus es efecto propio, no de Sarcófago.",
    [
      [
        12608,
        "Iniciador de Cantantes y búsqueda alternativa",
        "Destruye una carta propia boca arriba para traer un Cantante Cristron desde Deck; su otro efecto busca soporte al desterrarse del Cementerio.",
        "Úsalo para preparar Citree o Tristaros cuando aceptes el bloqueo Sincronía Máquina; elige solo uno de sus efectos ese turno."
      ],
      [
        12606,
        "Cantante reactiva de Nivel dos",
        "En Main o Battle Phase rival revive un no Cantante del Cementerio con efectos negados y sincroniza inmediatamente con él; ambos materiales se destierran.",
        "Déjala en Campo con Smiger de Nivel 3 en Cementerio para llegar a Hagoita cuando la ventana y los materiales lo permitan."
      ],
      [
        19200,
        "Soporte permanente del motor Horus",
        "Envía recursos de mano para preparar Horus en Cementerio; mientras esté boca arriba permite cumplir la condición de retorno propia de esos monstruos.",
        "Actívalo cuando tengas mano para el coste y un Horus que quieras preparar; conserva una zona de monstruo para su posterior retorno."
      ],
      [
        19153,
        "Buscador de Sarcófago y cuerpo de Nivel ocho",
        "Envía dos cartas de mano, incluida Amset, para añadir Sarcófago; puede retornar del Cementerio al controlar ese soporte.",
        "Úsalo con otra carta que puedas enviar, por ejemplo Hapi o Smiger, para elegir entre un Xyz Horus y una línea de ambos motores."
      ]
    ]
  ],
  "684": [
    "Cyber Dragon / apoyo Cyberdark",
    "Combo ofensivo de Máquinas, Fusión y Xyz",
    "Reúne Máquinas y nombres Cyber Dragon para Infinity, rompe campos con Fortress o Megafleet y presiona con los ataques de Rampage.",
    "Core busca soporte y Wurm/Revsystem reúnen Nivel 5 para Nova e Infinity. Clockwork Night habilita Fortress, mientras Rampage convierte materiales en presión de batalla.",
    "Nachster puede imponer solo Máquinas; Megafleet necesita Zona Extra y Fortress material Máquina. Cyberload limita ataques y Power Bond puede dañarte en End Phase.",
    [
      [
        10866,
        "Iniciador de búsqueda Cyber",
        "Al ser Invocado Normalmente busca una Magia o Trampa Cyber; se llama Cyber Dragon en Campo y Cementerio, por lo que habilita materiales de las rutas de contacto.",
        "Úsalo para buscar Overflow en la línea de Infinity o Cyber Emergency si necesitas completar la mano; con Clockwork Night puede acceder a Fortress."
      ],
      [
        6390,
        "Cuerpo de Nivel cinco y material central",
        "Puede Invocarse Especialmente desde mano si solo el rival controla monstruos; su Nivel y nombre habilitan Xyz, Fusiones y procedimientos de contacto.",
        "Úsalo para reunir dos Nivel 5 hacia Nova, o como material de Megafleet cuando el rival tiene un monstruo elegible en Zona Extra."
      ],
      [
        10870,
        "Xyz intermedia y acceso a Infinity",
        "Requiere dos Máquinas de Nivel 5 y sirve como material del procedimiento alternativo de Infinity; sus propios efectos permiten gestionar Cyber Dragon.",
        "Invócalo cuando tengas Wurm y Cyber Dragon u otros dos materiales compatibles, antes de decidir si subir a Infinity."
      ],
      [
        11765,
        "Jefe de negación y absorción de recursos",
        "Puede acoplar un monstruo boca arriba en Ataque y, al activarse una carta o efecto, desacoplar un material para negar su activación y destruirlo si procede.",
        "Úsalo como respuesta de primer turno y conserva material; no gastes la negación en una amenaza menor si necesitas proteger el resto del campo."
      ]
    ]
  ],
  "687": [
    "Volcánico / Aceleradores de Llama",
    "Control por daño de efecto y retirada de campo",
    "Envía munición Volcánica al Cementerio para retirar monstruos, reciclar recursos y preparar Infierno; Emperador añade presión de daño directo.",
    "Soldado busca el soporte, el Acelerador despliega Piros y envía munición. Disparo Disperso puede limpiar monstruos; Emperador e Infierno sostienen el daño y la interacción.",
    "Infierno solo puede negar cuando destierras un Volcánico; Disparo Disperso necesita el envío exigido y dos copias adicionales. No presupongas Invocaciones rivales.",
    [
      [
        18916,
        "Iniciador de búsqueda y ficha situacional",
        "Busca otra carta Volcánica al ser Invocado. También puede descartar una carta para crear una Ficha Bomba en el Campo rival.",
        "Úsalo para buscar Infierno si preparas interacción, o el Acelerador si necesitas desplegar Misil; la Ficha necesita su propio coste."
      ],
      [
        7243,
        "Buscador de Aceleradores y cuerpo Piro",
        "Al ser Invocado permite añadir un Acelerador de Llama elegible del Deck o Cementerio; su cuerpo puede servir de material de Enlace.",
        "Úsalo mediante el Acelerador Volcánico cuando necesites Recarga para preparar munición o un segundo cuerpo de desarrollo."
      ],
      [
        18918,
        "Motor continuo de extensión y retirada",
        "Se activa enviando el Acelerador original; puede Invocar un Volcánico de mano y enviar un Piro de Nivel 1 del Deck para destruir un monstruo rival boca arriba.",
        "Úsalo para desarrollar Soldado o Misil. Contra un objetivo rival, elige Cartucho para recursos o Percusión Anular para preparar soporte."
      ],
      [
        18915,
        "Jefe de daño y acceso a Trampas",
        "Se Invoca desde mano o Cementerio desterrando tres Piros o un Acelerador elegible; puede infligir daño por los Piros y Colocar una Trampa Volcánica.",
        "Úsalo cuando puedas pagar ese procedimiento sin agotar Infierno; mientras permanezca en Campo castiga cada evento de Invocación Especial rival."
      ]
    ]
  ],
  "699": [
    "GOAT Control / Scapegoat y Metamorfosis",
    "Control de recursos y presión de batalla",
    "Defiende con fichas y Trampas, transforma un Nivel 1 en Límite de los Mil Ojos y recupera Magias con Mago de la Fe; el Soldado cierra cuando hay recursos.",
    "Scapegoat prepara fichas para Metamorfosis y Límite controla amenazas. Mago de la Fe recicla Magias; Parshath y Soldado del Brillo Negro convierten ventaja en presión.",
    "Scapegoat exige cuatro zonas y restringe otras Invocaciones ese turno; Metamorfosis exige el Nivel correcto. Soldado necesita un LUZ y un OSCURIDAD en Cementerio.",
    [
      [
        4818,
        "Defensa y preparación de material de Nivel uno",
        "Invoca cuatro fichas Oveja de Nivel 1 en Defensa cuando hay cuatro zonas libres; pueden utilizarse para Metamorfosis en un turno posterior.",
        "Colócala para el turno rival y actívala en una ventana válida sin otras Invocaciones ese turno; conserva al menos una ficha para la transformación."
      ],
      [
        5539,
        "Magia de transformación por Nivel",
        "Ofrece como Tributo un monstruo propio para Invocar una Fusión del mismo Nivel desde Extra; una ficha de Nivel 1 sirve para Límite.",
        "Úsala en tu turno con una ficha superviviente para controlar amenazas, o con Parshath si convertirlo en Balter resulta mejor que conservar su robo."
      ],
      [
        4740,
        "Fusión de absorción y control del combate",
        "Puede equiparse con un monstruo rival y limitar el combate mientras está boca arriba; Libro de la Luna puede preparar una nueva absorción si puede voltearse legalmente.",
        "Úsala para retirar una amenaza elegible mediante absorción, no para buscar daño inmediato; conserva su posición si protege tus LP."
      ],
      [
        5835,
        "Finalizador de batalla o destierro de amenaza",
        "Se Invoca desde mano desterrando un monstruo LUZ y otro OSCURIDAD del Cementerio; puede elegir retirada o presión mediante su ataque.",
        "Úsalo cuando los dos Atributos existan; si eliges desterrar un monstruo, no puede atacar ese turno."
      ]
    ]
  ],
  "704": [
    "Piro FUEGO / Alchemy Blaze",
    "Fusión y presión de batalla en Rush Duel",
    "Reúne materiales Piro para Arquero o Salamandra; usa Alchemy Blaze solo con la condición local y el turno permitido, y elige ataque o limpieza.",
    "Cromatográfagas y Superasistente habilitan Arquero; Salamandra Quimicalizada y Superasistente habilitan Alquimicalizada. Hiperasistente prepara una alternativa sin Skill.",
    "Alchemy Blaze exige turno 2+, construcción y revelación válidas. Fusión usa materiales boca arriba; Salamandra Alquimicalizada destruye también tu apoyo.",
    [
      [
        18583,
        "Monstruo Normal de Nivel siete y material",
        "Es el material nombrado de Arquero Ígneo Supergráfagas y puede aprovechar Orden Secreta; no tiene un efecto activado propio.",
        "Úsalo cuando puedas colocarlo boca arriba y reunir Superasistente y Fusión; reserva la Skill para el turno y condición permitidos."
      ],
      [
        17963,
        "Material Normal de Nivel uno compartido",
        "Es el segundo nombre requerido por Arquero y Salamandra Alquimicalizada; su presencia en Cementerio también puede habilitar la mejora de Hiperasistente.",
        "Conserva una copia accesible cuando vayas a fusionar; no la gastes como Tributo si necesitas ambos materiales en Campo."
      ],
      [
        16934,
        "Magia de acceso a Fusiones Piro",
        "Utiliza los materiales nombrados que controlas boca arriba para Invocar el destino correspondiente del Extra; las Normales múltiples de Rush ayudan a reunirlos.",
        "Actívala solo después de comprobar la pareja correcta: Cromatográfagas o Salamandra Quimicalizada junto con Superasistente."
      ],
      [
        18614,
        "Fusión de limpieza y debilitamiento",
        "Puede destruir Magias y Trampas de ambos Campos y reducir ATK rival según las Magias realmente destruidas; su salida es distinta de la ofensiva de Arquero.",
        "Úsala cuando el obstáculo sea el apoyo rival y puedas asumir perder tus propias Magias y Trampas."
      ]
    ]
  ],
  "705": [
    "Rebelde Real / Hard Rock Overture",
    "Control por Sacrificio de Demonios en Rush Duel",
    "Reúne dos Tributos para elegir un Rebelde Real de Nivel alto según la amenaza; Phaser recupera Demonios y Canjear reorganiza la mano.",
    "Metal Maldito limpia monstruos, Heavy Metal gana ATK y Progrock retira apoyo. Hard Rock Overture ayuda en la apertura local de turno 2+; Phaser recupera cuerpos.",
    "Colocar por Skill o revivir por Phaser no equivale a Invocar por Sacrificio. Los tres jefes son destinos alternativos y requieren recursos reales.",
    [
      [
        16331,
        "Jefe de limpieza de monstruos rivales",
        "Su efecto tras la Invocación por Sacrificio de los materiales requeridos permite retirar los monstruos rivales elegibles; la recuperación por Phaser no habilita ese efecto.",
        "Elígelo cuando el rival tenga monstruos boca arriba que cumplan sus condiciones y dispongas de los dos Demonios requeridos."
      ],
      [
        15441,
        "Jefe de retirada y aumento de ataque",
        "Tras una Invocación por Sacrificio compatible, elige un monstruo rival aplicable de menor Nivel, gana su ATK hasta fin de turno y lo destruye si resuelve.",
        "Elígelo cuando puedas abrir el camino de ataque con esa retirada; si el objetivo tiene 1600 ATK, el ejemplo alcanza 4100."
      ],
      [
        19761,
        "Jefe de retirada de Magias y cartas colocadas",
        "Su efecto puede destruir una Magia o Trampa rival y después otra carta boca abajo; requiere el tipo de Invocación y recursos establecidos.",
        "Elígelo frente a apoyo rival y una segunda carta colocada, no cuando la prioridad sea limpiar varios monstruos boca arriba."
      ],
      [
        16330,
        "Extensor de Demonios desde Cementerio",
        "Si controlas un Demonio de Nivel 7 o superior, puede enviarse desde Campo para recuperar un Demonio elegible del Cementerio en Defensa.",
        "Úsalo cuando ya tengas un jefe en Campo para preparar otro material de Sacrificio; el monstruo revivido no obtiene un efecto de Sacrificio."
      ]
    ]
  ],
  "706": [
    "HÉROE Elemental / HERO RUSH RISING",
    "Fusión ofensiva y reciclaje en Rush Duel",
    "Reúne Héroes Normales con Fusión para Wingman; Voltic recicla nombres del Cementerio hacia una segunda Fusión y Shining Flare convierte Guerreros en ATK.",
    "Avian, Burstinatrix y Sparkman habilitan distintas Fusiones. Voltic y la Skill local permiten una segunda salida; Shining Flare y Heliosfera aportan ataque o retirada.",
    "Fusión usa materiales boca arriba, Voltic usa su procedimiento de Cementerio; la Skill reduce 600 ATK/DEF y los destinos de segunda Fusión son alternativas.",
    [
      [
        20460,
        "Material Normal de múltiples Fusiones",
        "Con Burstinatrix habilita Llama o Estallido Wingman; con Sparkman permite Voltic. Es también uno de los tres nombres de Heliosfera.",
        "Invócalo boca arriba con la pareja adecuada antes de usar Fusión; conserva su nombre para la recuperación posterior de Voltic."
      ],
      [
        20457,
        "Material Normal de Voltic y Shining Flare",
        "Con Avian forma Voltic; además, Sparkman y Llama Wingman son los materiales expresos de Shining Flare.",
        "Úsalo con Avian para el plan de doble Fusión por Skill, o resérvalo en Campo para fusionarlo con Llama Wingman."
      ],
      [
        20459,
        "Material Normal de Wingman y segunda Fusión",
        "Con Avian permite Llama o Estallido; la ruta local de Voltic puede enviarla mediante la Skill para completar los materiales de Cementerio.",
        "Úsala en Campo para la Fusión simple, o conserva su nombre para el procedimiento de Voltic si la Skill está habilitada."
      ],
      [
        21316,
        "Fusión puente para reciclar materiales",
        "Se forma con Sparkman y Avian; su efecto permite utilizar nombres del Cementerio devueltos al Deck para una segunda Fusión elegible.",
        "Úsalo con los materiales de Cementerio correctos; elige Llama, Estallido o Heliosfera según el nombre disponible y la amenaza."
      ]
    ]
  ],
  "707": [
    "Mago Oscuro / Lanzadores de Conjuros",
    "Control de campo por nombre y Sacrificio en Rush Duel",
    "Invoca Mago Oscuro o cambia el nombre del Hechicero Eliminador para habilitar Mil Cuchillos y Ataque Mágico Oscuro; Sabio permite recuperar el nombre.",
    "Orden Secreta y Piedra desarrollan Mago Oscuro; Sabio e Illusion of Execution preparan su recuperación. El Hechicero habilita las Magias de retirada con su nombre temporal.",
    "Las Magias exigen el nombre Mago Oscuro. La Skill local requiere turno 2+; el Hechicero cambia de nombre solo ese turno. Gaia carece de materiales accesibles.",
    [
      [
        15410,
        "Monstruo Normal LEGEND y habilitador de Magias",
        "Su nombre permite activar Mil Cuchillos y Ataque Mágico Oscuro. Orden Secreta puede Invocarlo y Sabio permite recuperarlo del Cementerio.",
        "Úsalo con Orden Secreta o Piedra cuando esté en mano; desde Cementerio, prepara el acceso de Sabio y conserva la única copia."
      ],
      [
        19773,
        "Jefe alternativo de nombre temporal",
        "Al cumplir su requisito de envío de la carta superior al Cementerio pasa a llamarse Mago Oscuro hasta fin de turno, habilitando las Magias del motor.",
        "Invócalo por Sacrificio con dos materiales legales cuando Mago Oscuro no esté disponible; activa la Magia de retirada antes de perder el nombre."
      ],
      [
        15450,
        "Magia de retirada de un monstruo",
        "Con Mago Oscuro boca arriba permite seleccionar y destruir un monstruo rival elegible; no necesita que ese monstruo esté boca arriba salvo otra restricción.",
        "Úsala cuando un monstruo impida tu ataque o amenace el Campo; si pierdes el nombre antes de activarla, conserva la carta."
      ],
      [
        15451,
        "Magia de limpieza del apoyo rival",
        "Con Mago Oscuro boca arriba puede destruir las Magias y Trampas que controla el adversario; no retira automáticamente sus monstruos.",
        "Úsala para despejar el apoyo antes de la Battle Phase, después de establecer Mago Oscuro o el nombre temporal del Hechicero."
      ]
    ]
  ]
};
const pending=[], report=[];
for(const id of ids){
 const matches=fs.readdirSync(evidence).filter(n=>n.startsWith(id+'_')&&n.endsWith('.md'));assert.equal(matches.length,1);
 const act=fs.readFileSync(path.join(evidence,matches[0]),'utf8');
 const m=act.match(/<!-- A01_ESTRATEGIA_REVISADA -->\s*```json\s*([\s\S]+?)\s*```/);assert(m,'Missing authored strategy '+id);
 const strategy=JSON.parse(m[1]);
 const folders=fs.readdirSync(root).filter(n=>{const f=path.join(root,n,'datos/stationx-deck.json');return fs.existsSync(f)&&JSON.parse(fs.readFileSync(f,'utf8')).deck_id===id;});
 assert.equal(folders.length,1);const folder=folders[0];
 const jp=path.join(root,folder,'datos/stationx-deck.json'), mp=path.join(root,folder,folder+'_CONTENIDO_CURADO.md');
 const orig=JSON.parse(fs.readFileSync(jp,'utf8')), p=structuredClone(orig);
 let oldMd=fs.readFileSync(mp,'utf8');assert.equal(p.record.deck_id,id);
 validateProfile(p.record);assertSourceParity(p.record,oldMd);

 const authored=reviewedCopy[id];assert(authored,'Missing reviewed copy '+id);
 const phaseIds=['first','second','mid','late'];
 const byPhase=new Map(strategy.sections.map(s=>[s.id,s]));
 const legacyPlan=phaseIds.map(key=>{const s=byPhase.get(key);return s.title+'. '+s.actions.join(' ')+' '+s.expected_result;}).join(' ');
 const values={'Arquetipo':authored[0],'Tipo de estrategia':authored[1],'Estilo breve':authored[2],'Resumen para ficha':authored[3],'Cómo se juega':legacyPlan,'Qué vigilar':authored[4]};
 const a01Start=oldMd.indexOf('## APARTADO_01'), a02Start=oldMd.indexOf('\n## APARTADO_02',a01Start);
 assert(a01Start>=0&&a02Start>a01Start);
 let a01=oldMd.slice(a01Start,a02Start);
 for(const [key,value] of Object.entries(values)){
  const oldLine='- **'+key+':** '+p.record.profile[key];assert(a01.includes(oldLine),'Missing old field '+id+' '+key);
  a01=a01.replace(oldLine,()=>'- **'+key+':** '+value);
  p.record.profile[key]=value;
 }
 oldMd=oldMd.slice(0,a01Start)+a01+oldMd.slice(a02Start);
 const byCard=new Map(authored[5].map(row=>[row[0],row]));
 assert.equal(byCard.size,4);assert.equal(p.record.player_guide.featured_cards.length,4);
 for(const card of p.record.player_guide.featured_cards){
  const row=byCard.get(card.cid);assert(row,'Featured card drift '+id+' '+card.cid);
  [card.role,card.reason,card.when_to_use]=row.slice(1);
 }
 for(const phase of p.record.player_guide.phases){
  const s=byPhase.get(phase.id);assert(s,'Unknown phase '+id);
  phase.title=s.title;phase.plan=s.actions.join(' ')+' '+s.expected_result;phase.preconditions=s.situation;phase.risks=s.alternative;phase.related_route_ids=s.related_route_ids;
 }
 p.record.player_guide.strategy=strategy;
 validateStrategy(p.record);validatePlayerGuide(p.record);
 const copy=structuredClone(p);if(orig.record.player_guide.strategy)copy.record.player_guide.strategy=orig.record.player_guide.strategy;else delete copy.record.player_guide.strategy;
 copy.record.profile=orig.record.profile;copy.record.player_guide.phases=orig.record.player_guide.phases;copy.record.player_guide.featured_cards=orig.record.player_guide.featured_cards;
 assert.deepEqual(copy,orig,'Non-A01 data changed: '+id);
 const names=new Map(p.record.cards.map(c=>[c.cid,c.name]));
 const block=['<!-- A01_PLAYER_STRATEGY_V2_START -->','### Plan práctico de juego',...strategy.sections.flatMap(s=>['','#### '+s.title,'','**Objetivo:** '+s.objective,'','**Situación:** '+s.situation,'','**Cartas:** '+s.card_cids.map(cid=>names.get(cid)).join(', '),'',...s.actions.map((a,i)=>(i+1)+'. '+a),'','**Resultado esperado:** '+s.expected_result,'','**Recursos que conservar:** '+s.resources_to_keep,'','**Alternativa:** '+s.alternative]),'','<!-- A01_PLAYER_STRATEGY_V2_END -->',''].join('\n');
 const cleaned=oldMd.replace(/<!-- A01_PLAYER_STRATEGY_V2_START -->[\s\S]*?<!-- A01_PLAYER_STRATEGY_V2_END -->\n?/g,'');
 const marker=/^## APARTADO_02\b/m;assert(marker.test(cleaned),'A02 boundary missing '+id);
 const md=cleaned.replace(marker,match=>block+'\n'+match);
 assertSourceParity(p.record,md);
 pending.push([jp,JSON.stringify(p,null,2)+'\n'],[mp,md]);report.push({deck_id:id,lessons:strategy.sections.length,status:'STRUCTURE_PASS_SEMANTIC_BROWSER_PENDING'});
}
assert.equal(pending.length,32);assert.equal(report.reduce((s,r)=>s+r.lessons,0),128);
for(const [file,content] of pending)fs.writeFileSync(file,content);
console.log(JSON.stringify(report,null,2));
console.log('A01_APPLIED 16 decks, 128 individually authored lessons, non-A01 JSON unchanged; no semantic certification');
