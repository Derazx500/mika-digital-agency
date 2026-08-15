/**
 * Landings de servicio especializadas.
 *
 * Cada entrada genera una página completa en /servicios/<slug>/ con su H1,
 * metadatos, entregables, proceso, precios, FAQ y datos estructurados.
 *
 * ESTRATEGIA: una página por intención de búsqueda, no una por servicio.
 * "Diseño web" y "crear tienda en línea" los busca gente distinta, con
 * necesidades distintas y presupuestos distintos; meterlas en la misma
 * página hace que no posicione bien para ninguna de las dos.
 *
 * El razonamiento de cada palabra clave está en docs/estrategia-seo.md.
 */

export type Service = {
  slug: string;
  /** Nombre corto para menús y tarjetas. */
  name: string;
  /** H1 de la landing: aquí va la keyword principal. */
  h1: string;
  /** <title> de la página. Máx ~60 caracteres para que Google no lo corte. */
  title: string;
  /** meta description. 150-160 caracteres. */
  description: string;
  /** Frase de una línea para las tarjetas de la home. */
  tagline: string;
  /** Palabra clave principal que ataca esta página. */
  keyword: string;
  /** Precio de entrada, en MXN. */
  priceFrom: number;
  /** Unidad del precio. Por defecto es un proyecto único. */
  priceUnit?: 'proyecto' | 'mes' | 'pieza';
  /** Qué incluye — se muestra como lista con check. */
  deliverables: string[];
  /** Proceso paso a paso. */
  process: { step: string; title: string; body: string }[];
  /** Preguntas frecuentes. Alimentan el schema FAQPage (rich snippet en Google). */
  faqs: { q: string; a: string }[];
  /** Servicios relacionados, para enlazado interno (importante para SEO). */
  related: string[];
};

export const SERVICIOS_ESPECIALIZADOS: Service[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: 'tienda-en-linea',
    name: 'Tienda en línea',
    h1: 'Creamos tu tienda en línea y la dejamos vendiendo',
    title: 'Crear Tienda en Línea en México | E-commerce | Mika',
    description:
      'Creamos tu tienda en línea en México: catálogo, pasarela de pago, envíos y SEO para fichas de producto. Desde $35,000 MXN. Cotiza por WhatsApp.',
    tagline:
      'Catálogo, pagos, envíos e inventario. Una tienda que puedes administrar tú y que Google encuentra.',
    keyword: 'crear tienda en línea México',
    priceFrom: 35000,
    deliverables: [
      'Catálogo con variantes, categorías y buscador',
      'Pasarela de pago: tarjeta, SPEI, OXXO y meses sin intereses',
      'Cálculo de envíos y conexión con paqueterías',
      'Gestión de inventario, cupones y promociones',
      'SEO para fichas de producto y categorías',
      'Carrito optimizado para reducir abandonos',
      'Capacitación para que subas productos tú mismo',
    ],
    process: [
      {
        step: '01',
        title: 'Catálogo y estructura',
        body: 'Definimos categorías, variantes y filtros. Una tienda mal estructurada se vuelve inmanejable al llegar a los 100 productos.',
      },
      {
        step: '02',
        title: 'Diseño de la ruta de compra',
        body: 'Diseñamos el camino de la ficha al pago. Cada paso que quitamos es un porcentaje menos de carritos abandonados.',
      },
      {
        step: '03',
        title: 'Pagos, envíos e impuestos',
        body: 'Conectamos la pasarela, configuramos costos de envío por zona y dejamos la facturación lista.',
      },
      {
        step: '04',
        title: 'Pruebas reales y lanzamiento',
        body: 'Hacemos compras de prueba de principio a fin, en móvil y escritorio, antes de abrir al público.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta crear una tienda en línea en México?',
        a: 'En Mika arranca en $35,000 MXN. En el mercado mexicano una tienda profesional va de los $25,000 a los $150,000 según el catálogo y las integraciones. Por debajo de eso suele ser una plantilla sin configurar: te la entregan “funcionando” pero sin envíos calculados, sin SEO y sin pruebas de compra reales.',
      },
      {
        q: '¿Shopify o WooCommerce? ¿Cuál me conviene?',
        a: 'Shopify si quieres despreocuparte de la parte técnica y facturas lo suficiente para absorber su mensualidad y su comisión. WooCommerce si buscas control total, catálogos complejos o quieres evitar comisiones por venta. Te recomendamos según tu volumen y tu equipo, no según lo que nos convenga a nosotros.',
      },
      {
        q: '¿Puedo subir y editar productos yo mismo?',
        a: 'Sí, y es parte de la entrega. Te capacitamos en video y te dejamos el panel listo. Depender de la agencia para cambiar un precio o subir una foto es la forma más rápida de que una tienda se quede desactualizada.',
      },
      {
        q: '¿Cuánto tarda?',
        a: 'De 5 a 8 semanas para una tienda completa. El factor que más mueve el plazo es el catálogo: si tienes 40 productos con fotos listas avanzamos rápido; si son 500 sin fotos ni descripciones, ahí está el trabajo.',
      },
      {
        q: '¿Incluye las fotos de los productos?',
        a: 'No van incluidas, pero las hacemos nosotros. La fotografía de producto es determinante en una tienda: es lo único que el cliente puede “ver” antes de comprar. Puedes verlo en nuestro servicio de fotografía.',
      },
    ],
    related: ['diseno-web', 'fotografia-profesional'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'desarrollo-de-software',
    name: 'Desarrollo a la medida',
    h1: 'Desarrollo de software a la medida para tu operación',
    title: 'Desarrollo de Software a la Medida en México | Mika',
    description:
      'Sistemas web, automatizaciones e integraciones a la medida. Dejamos de hacer a mano lo que un sistema puede resolver solo. Cotiza tu proyecto sin costo.',
    tagline:
      'Sistemas web, automatizaciones e integraciones para lo que ninguna herramienta comercial te resuelve.',
    keyword: 'desarrollo de software a la medida México',
    priceFrom: 45000,
    deliverables: [
      'Análisis del proceso antes de escribir una línea de código',
      'Sistema web con el flujo real de tu operación',
      'Panel de administración con permisos por rol',
      'Integración con lo que ya usas: CRM, facturación, ERP',
      'Automatización de tareas repetitivas',
      'Documentación y capacitación del equipo',
      'Código tuyo, en tu repositorio, sin ataduras',
    ],
    process: [
      {
        step: '01',
        title: 'Entender el proceso',
        body: 'Nos sentamos con quien hace el trabajo hoy. Automatizar un proceso mal entendido solo consigue hacer más rápido lo que ya estaba mal.',
      },
      {
        step: '02',
        title: 'Alcance mínimo útil',
        body: 'Definimos la versión más pequeña que ya te sirve. Lanzar en 6 semanas algo que se usa vale más que en 6 meses algo perfecto.',
      },
      {
        step: '03',
        title: 'Desarrollo por entregas',
        body: 'Ves avances cada semana y corriges el rumbo temprano, cuando cambiar de opinión todavía es barato.',
      },
      {
        step: '04',
        title: 'Puesta en marcha',
        body: 'Migramos tus datos, capacitamos al equipo y acompañamos las primeras semanas de uso real.',
      },
    ],
    faqs: [
      {
        q: '¿Cuándo conviene un sistema a la medida y cuándo no?',
        a: 'No conviene si una herramienta comercial ya resuelve el 80% de tu problema: sale más barato adaptarte tú. Conviene cuando tu proceso es tu ventaja competitiva, cuando pagas licencias por usuario que ya no tienen sentido, o cuando tu equipo pierde horas al día moviendo datos entre sistemas.',
      },
      {
        q: '¿Cuánto cuesta un sistema web a la medida?',
        a: 'Arranca en $45,000 MXN para un sistema acotado. Depende sobre todo del número de flujos distintos y de las integraciones. Antes de cotizar hacemos el análisis del proceso, porque presupuestar sin entenderlo es adivinar.',
      },
      {
        q: '¿El código queda a mi nombre?',
        a: 'Sí, al 100%. El repositorio se crea en tu cuenta desde el primer día y tú eres el dueño. Si algún día quieres seguir con otro proveedor, se lo entregas y punto. Nunca dejamos a un cliente atrapado.',
      },
      {
        q: '¿Qué pasa si algo se rompe después?',
        a: 'Incluimos 60 días de garantía sobre errores del desarrollo. Después puedes contratar mantenimiento mensual, que cubre correcciones, actualizaciones de seguridad y una bolsa de horas para mejoras.',
      },
      {
        q: '¿Trabajan con sistemas que ya existen?',
        a: 'Sí. Buena parte de lo que hacemos es integrar o extender algo que ya está funcionando, no rehacerlo. Primero revisamos qué se puede aprovechar: tirar código que funciona es caro y rara vez necesario.',
      },
    ],
    related: ['diseno-web', 'tienda-en-linea'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'produccion-de-video',
    name: 'Producción de video',
    h1: 'Producción de video corporativo que explica lo que vendes',
    title: 'Producción de Video Corporativo en CDMX | Mika',
    description:
      'Video corporativo, institucional y contenido para redes en CDMX. Guion, grabación, edición y motion graphics. Desde $14,000 MXN. Cotiza por WhatsApp.',
    tagline:
      'Video corporativo, reels y animación de marca. Del guion a la entrega, con un equipo que también entiende de negocio.',
    keyword: 'producción de video corporativo CDMX',
    priceFrom: 14000,
    deliverables: [
      'Guion y storyboard antes de grabar',
      'Grabación con equipo profesional de video e iluminación',
      'Edición, corrección de color y mezcla de audio',
      'Motion graphics y animación de tu logotipo',
      'Versiones para YouTube, Instagram, TikTok y LinkedIn',
      'Subtítulos incrustados: la mayoría lo verá sin sonido',
      'Archivos originales y master en alta calidad',
    ],
    process: [
      {
        step: '01',
        title: 'Qué tiene que lograr el video',
        body: 'Un video para explicar un producto no se parece en nada a uno para reclutar. Definimos objetivo y público antes que estética.',
      },
      {
        step: '02',
        title: 'Guion y plan de rodaje',
        body: 'Escribimos el guion y planeamos locaciones, tomas y tiempos. Improvisar en el set es la forma más cara de grabar.',
      },
      {
        step: '03',
        title: 'Grabación',
        body: 'Una jornada bien planeada rinde más que tres improvisadas. Grabamos con margen para tener opciones en edición.',
      },
      {
        step: '04',
        title: 'Postproducción y entrega',
        body: 'Edición, color, audio, gráficos y las versiones por plataforma. Incluye dos rondas de ajustes.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta un video corporativo en México?',
        a: 'En Mika arranca en $14,000 MXN. En el mercado, un video corporativo básico va de $15,000 a $35,000; una producción intermedia con varias locaciones, de $35,000 a $80,000; y las producciones con dron y animación pesada superan los $80,000. El precio lo mueven los días de grabación y la complejidad de la postproducción, no la duración del video.',
      },
      {
        q: '¿Cuánto debe durar mi video?',
        a: 'Casi siempre menos de lo que crees. Un video institucional funciona entre 60 y 90 segundos; uno de producto, entre 30 y 60; un reel, menos de 30. La retención cae en picada pasado el primer minuto, y un video largo no se ve completo aunque esté muy bien hecho.',
      },
      {
        q: '¿Incluye actores o locutor?',
        a: 'El precio base no los incluye. Podemos trabajar con tu equipo —que suele resultar más creíble—, con locutor profesional o con talento contratado. Lo cotizamos aparte y siempre te decimos el costo real, sin margen escondido.',
      },
      {
        q: '¿En cuánto tiempo lo entregan?',
        a: 'De 2 a 4 semanas desde la aprobación del guion: una semana de preproducción, la grabación, y de 1 a 2 semanas de edición con sus rondas de ajuste.',
      },
      {
        q: '¿Pueden editar material que ya tengo grabado?',
        a: 'Sí, y suele salir bastante más barato que grabar de cero. Revisamos el material primero y te decimos con franqueza si da para lo que quieres o si conviene grabar algunas tomas nuevas.',
      },
    ],
    related: ['produccion-de-podcast', 'social-media'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'produccion-de-podcast',
    name: 'Producción de podcast',
    h1: 'Producción de podcast, de la idea al episodio publicado',
    title: 'Producción de Podcast en México | Grabación y Edición',
    description:
      'Producimos tu podcast: concepto, grabación, edición, identidad sonora y publicación en Spotify y Apple. Desde $8,500 MXN. Cotiza por WhatsApp.',
    tagline:
      'Concepto, grabación, edición e identidad sonora. Publicado en Spotify y Apple sin que tengas que aprender de audio.',
    keyword: 'producción de podcast México',
    priceFrom: 8500,
    priceUnit: 'mes',
    deliverables: [
      'Definición del concepto, formato y duración',
      'Grabación con micrófonos profesionales',
      'Edición: cortes, limpieza de ruido y nivelación',
      'Identidad sonora: cortinilla de entrada y salida',
      'Publicación en Spotify, Apple Podcasts y YouTube',
      'Fragmentos verticales para redes de cada episodio',
      'Portada del programa y arte por episodio',
    ],
    process: [
      {
        step: '01',
        title: 'Concepto y formato',
        body: 'Definimos de qué trata, para quién, cuánto dura y cada cuánto sale. La mayoría de los podcast mueren por prometer una frecuencia insostenible.',
      },
      {
        step: '02',
        title: 'Identidad sonora',
        body: 'Creamos la cortinilla, el arte y las plantillas. Que suene igual cada semana es lo que lo hace reconocible.',
      },
      {
        step: '03',
        title: 'Grabación',
        body: 'Grabamos varios episodios por sesión. Es la única forma realista de sostener una publicación semanal.',
      },
      {
        step: '04',
        title: 'Edición y publicación',
        body: 'Editamos, publicamos en todas las plataformas y entregamos los fragmentos para redes.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta producir un podcast en México?',
        a: 'Nuestro plan mensual arranca en $8,500 MXN e incluye la producción de 4 episodios. En el mercado hay desde estudios por hora —alrededor de $550 MXN— hasta paquetes de lanzamiento. La diferencia está en si te entregan solo el audio grabado o el episodio publicado con sus fragmentos para redes.',
      },
      {
        q: '¿Necesito un estudio o equipo propio?',
        a: 'No. Nosotros ponemos micrófonos, grabadora y tratamiento acústico, y grabamos en tu oficina o en una locación. Si más adelante quieres montar tu propio espacio, te asesoramos sobre qué comprar de verdad y qué no hace falta.',
      },
      {
        q: '¿Con qué frecuencia debería publicar?',
        a: 'Semanal o quincenal, y siempre el mismo día. Importa más la constancia que la frecuencia: un podcast quincenal que nunca falla construye audiencia; uno semanal que desaparece un mes la pierde y no la recupera.',
      },
      {
        q: '¿Sirve un podcast para vender?',
        a: 'No para vender directo, sino para construir autoridad. Funciona muy bien cuando vendes servicios profesionales con ciclos de decisión largos: quien te escucha una hora llega a la primera llamada ya convencido. Si buscas ventas inmediatas, tu dinero rinde más en otro lado y te lo diremos.',
      },
      {
        q: '¿Aparece el video del podcast también?',
        a: 'Sí, si lo quieres. Grabar en video multiplica el alcance porque YouTube y las redes son hoy el principal canal de descubrimiento de podcast. Se cotiza junto con producción de video.',
      },
    ],
    related: ['produccion-de-video', 'social-media'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'fotografia-profesional',
    name: 'Fotografía profesional',
    h1: 'Fotografía de producto y corporativa que sí vende',
    title: 'Fotografía de Producto y Corporativa CDMX | Mika',
    description:
      'Fotografía de producto para e-commerce, retratos corporativos y foto de espacios en CDMX. Retoque incluido. Desde $6,500 MXN. Cotiza por WhatsApp.',
    tagline:
      'Fotografía de producto, corporativa y de espacios. Con retoque, recorte y los formatos que tu tienda necesita.',
    keyword: 'fotografía de producto México',
    priceFrom: 6500,
    deliverables: [
      'Sesión en estudio o en tu locación',
      'Fotografía de producto sobre fondo blanco y ambientada',
      'Retratos corporativos del equipo, con estilo consistente',
      'Fotografía de instalaciones y espacios',
      'Retoque profesional y recorte de fondos',
      'Entrega en los formatos y medidas que pide tu tienda',
      'Cesión de derechos de uso comercial',
    ],
    process: [
      {
        step: '01',
        title: 'Definir el uso',
        body: 'No se fotografía igual para una tienda en línea que para un catálogo impreso o para redes. Lo definimos antes de agendar.',
      },
      {
        step: '02',
        title: 'Preparación',
        body: 'Preparamos referencias, montaje y lista de tomas. Una sesión sin lista termina con 300 fotos y ninguna de lo que hacía falta.',
      },
      {
        step: '03',
        title: 'Sesión',
        body: 'Fotografiamos con iluminación controlada, revisando en pantalla sobre la marcha para no descubrir problemas al día siguiente.',
      },
      {
        step: '04',
        title: 'Retoque y entrega',
        body: 'Seleccionamos, retocamos y entregamos en todas las medidas que necesites, optimizadas para web.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta una sesión de fotografía de producto?',
        a: 'Arranca en $6,500 MXN por una sesión de hasta 15 productos con retoque incluido. A partir de ahí el precio va por volumen: cuantos más productos en la misma sesión, menos cuesta cada uno, porque el montaje y la iluminación ya están hechos.',
      },
      {
        q: '¿Cuántas fotos necesito por producto para vender en línea?',
        a: 'Entre 4 y 6: una sobre fondo blanco para el catálogo, dos o tres de detalle, una que dé escala y una ambientada. Las fichas con varias fotos venden bastante más que las de una sola, porque el cliente no puede tocar el producto y las imágenes son todo lo que tiene.',
      },
      {
        q: '¿Puedo usar las fotos donde quiera?',
        a: 'Sí. Te cedemos los derechos de uso comercial sin límite de tiempo ni de medio: tu web, tus redes, Amazon, impresos, publicidad pagada. Sin costos adicionales por usarlas de nuevo.',
      },
      {
        q: '¿Van a mi local o hay que llevar los productos?',
        a: 'Las dos cosas. Para producto pequeño solemos trabajar en estudio, donde controlamos mejor la luz. Para mobiliario, alimentos, instalaciones o equipo del negocio vamos nosotros a tu locación.',
      },
      {
        q: '¿En cuánto tiempo entregan las fotos?',
        a: 'De 5 a 10 días hábiles después de la sesión, según el volumen. Si tienes un lanzamiento con fecha, dínoslo al agendar y trabajamos con esa fecha en mente.',
      },
    ],
    related: ['tienda-en-linea', 'produccion-de-video'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'social-media',
    name: 'Social media',
    h1: 'Social media con estrategia, no publicar por publicar',
    title: 'Agencia de Social Media en CDMX | Redes Sociales',
    description:
      'Gestión de redes sociales en CDMX: estrategia, parrilla de contenido, diseño de piezas y campañas pagadas. Desde $9,500 MXN al mes. Cotiza por WhatsApp.',
    tagline:
      'Estrategia, parrilla, diseño de piezas y campañas. Con un reporte que dice qué vendió, no cuántos likes hubo.',
    keyword: 'agencia de social media CDMX',
    priceFrom: 9500,
    priceUnit: 'mes',
    deliverables: [
      'Estrategia de contenido por objetivo, no por relleno',
      'Parrilla mensual aprobada por adelantado',
      'Diseño de piezas y edición de reels',
      'Redacción de textos con tu voz de marca',
      'Programación y publicación',
      'Campañas pagadas en Meta e Instagram',
      'Reporte mensual con lo que trajo clientes',
    ],
    process: [
      {
        step: '01',
        title: 'Diagnóstico',
        body: 'Revisamos qué has publicado, qué funcionó y qué hace tu competencia. Casi siempre ya hay señales de qué contenido conecta.',
      },
      {
        step: '02',
        title: 'Estrategia y pilares',
        body: 'Definimos 3 o 4 temas recurrentes. Sin pilares, la parrilla se convierte en rellenar huecos con lo que se ocurra ese día.',
      },
      {
        step: '03',
        title: 'Producción mensual',
        body: 'Diseñamos, escribimos y editamos el mes completo. Lo apruebas de una sola vez y se publica solo.',
      },
      {
        step: '04',
        title: 'Medición y ajuste',
        body: 'Cada mes revisamos qué funcionó y ajustamos. La estrategia del mes seis no debería ser la del mes uno.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta llevar las redes sociales de un negocio?',
        a: 'Nuestro plan arranca en $9,500 MXN al mes e incluye estrategia, 12 publicaciones y 4 reels. El presupuesto de publicidad pagada va aparte y se paga directo a Meta, nunca a través nuestro: así ves exactamente cuánto se invirtió.',
      },
      {
        q: '¿En qué redes debería estar mi negocio?',
        a: 'En las que esté tu cliente, que casi nunca son todas. Para la mayoría de negocios en México, Instagram y Facebook cubren el grueso; LinkedIn si vendes a empresas; TikTok si tu público es joven. Estar mal en cinco redes es peor que estar bien en dos.',
      },
      {
        q: '¿Cuánto tardan en verse resultados?',
        a: 'Los primeros movimientos de alcance e interacción, entre 4 y 8 semanas. Que las redes se conviertan en un canal de venta constante toma de 4 a 6 meses. Cualquiera que te prometa volverte viral el primer mes está vendiendo humo.',
      },
      {
        q: '¿Quién crea el contenido? ¿Necesito grabar yo?',
        a: 'Nosotros lo producimos. Dicho esto, el contenido donde apareces tú o tu equipo casi siempre rinde mucho más que el diseñado desde cero, así que lo ideal es una mezcla: nosotros producimos y tú aportas material real del negocio.',
      },
      {
        q: '¿Manejan también los mensajes y comentarios?',
        a: 'Respondemos comentarios y dudas generales. Los mensajes con intención de compra se te derivan directo a WhatsApp: quien pregunta por un precio quiere hablar contigo, no con un intermediario, y contestar tarde es la forma más común de perder una venta.',
      },
    ],
    related: ['produccion-de-video', 'diseno-grafico-branding'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'tarjetas-digitales-nfc',
    name: 'Tarjetas digitales NFC',
    h1: 'Tarjetas de presentación digitales con NFC',
    title: 'Tarjetas de Presentación Digitales NFC en México',
    description:
      'Tarjetas de presentación digitales con chip NFC: compartes tus datos con un toque, sin apps. Diseño y perfil incluidos. Desde $1,200 MXN por tarjeta.',
    tagline:
      'Compartes tus datos acercando la tarjeta a un celular. Sin apps, sin reimprimir cada vez que cambia algo.',
    keyword: 'tarjetas de presentación digitales NFC México',
    priceFrom: 1200,
    priceUnit: 'pieza',
    deliverables: [
      'Tarjeta física con chip NFC y código QR de respaldo',
      'Diseño de la tarjeta con tu identidad de marca',
      'Perfil digital con tus datos, redes y botón de WhatsApp',
      'Actualizable: cambias el teléfono y la tarjeta sigue sirviendo',
      'Botón para guardar tu contacto en un toque',
      'Estadísticas de cuántas veces se abrió tu perfil',
      'Precios por volumen para equipos completos',
    ],
    process: [
      {
        step: '01',
        title: 'Diseño',
        body: 'Diseñamos la tarjeta y el perfil digital con tu identidad, no con una plantilla genérica.',
      },
      {
        step: '02',
        title: 'Perfil y contenido',
        body: 'Cargamos datos, redes, catálogo o lo que quieras mostrar al abrirse.',
      },
      {
        step: '03',
        title: 'Producción',
        body: 'Fabricamos las tarjetas en PVC con el chip programado y probado una por una.',
      },
      {
        step: '04',
        title: 'Entrega y ajustes',
        body: 'Te entregamos las tarjetas y el acceso para que edites tu perfil cuando quieras.',
      },
    ],
    faqs: [
      {
        q: '¿Cómo funciona una tarjeta de presentación NFC?',
        a: 'Lleva un chip dentro. Acercas la tarjeta al celular de la otra persona y se abre tu perfil digital al instante, sin que ninguno de los dos instale nada. Si su teléfono no tiene NFC, escanea el código QR impreso y llega al mismo sitio.',
      },
      {
        q: '¿Cuánto cuesta una tarjeta digital NFC en México?',
        a: 'La nuestra arranca en $1,200 MXN e incluye el diseño de la tarjeta y del perfil digital. En el mercado hay tarjetas desde $500, pero suelen venir con una plantilla genérica y sin diseño propio: pagas el plástico, no la marca.',
      },
      {
        q: '¿Qué pasa si cambio de teléfono o de puesto?',
        a: 'Entras a tu panel y lo actualizas. La tarjeta física sigue siendo la misma y quien la use verá los datos nuevos. Ese es justo el punto: dejas de tirar cajas de tarjetas cada vez que cambia un número.',
      },
      {
        q: '¿Sirve para todo un equipo de ventas?',
        a: 'Es donde más rinde. Cada persona tiene su tarjeta y su perfil, con el diseño unificado de la empresa, y desde un panel central se administra a todos. Hay precio por volumen a partir de 10 tarjetas.',
      },
      {
        q: '¿Funciona en iPhone y Android?',
        a: 'En ambos. Todos los iPhone desde el 7 leen NFC sin abrir nada, igual que prácticamente cualquier Android de los últimos años. Y para los pocos casos que no, está el código QR impreso al reverso.',
      },
    ],
    related: ['diseno-grafico-branding', 'diseno-web'],
  },
];
