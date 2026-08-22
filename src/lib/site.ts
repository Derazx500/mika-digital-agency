import { CONTACTO, INICIO } from '@/lib/ajustes';

/**
 * Fuente única de verdad del sitio.
 *
 * Los datos de contacto y las redes ya no se escriben aquí: se editan en el
 * panel, en "Ajustes del sitio → Contacto y redes", y entran por [CONTACTO].
 * Lo que queda en este archivo es lo que no tiene sentido cambiar desde una
 * interfaz —el dominio canónico, el idioma, el ID de Analytics— porque
 * tocarlo mal rompe el SEO o la medición.
 */

export const SITE = {
  name: 'Mika Digital Agency',
  shortName: 'Mika',
  /**
   * Dominio canónico. Se usa en canonical, sitemap, Open Graph y schema.
   *
   * Va sin `www` porque es el que Vercel tiene como principal: las peticiones
   * a www.mikadigitalagency.com se redirigen aquí. Si apuntara a www, cada
   * URL canónica del sitio acabaría en una redirección, que es justo lo que
   * una canónica debe evitar.
   *
   * Si algún día cambias el dominio principal en Vercel, cambia también esto.
   */
  url: 'https://mikadigitalagency.com',
  locale: 'es_MX',
  lang: 'es',
  founded: '2020',
  /* Editables en el panel: Ajustes del sitio → Contacto y redes. */
  email: CONTACTO.correo,
  phone: CONTACTO.telefono,
  /** Formato E.164 sin signos, para los enlaces wa.me y tel: */
  phoneRaw: CONTACTO.whatsapp,
  address: {
    city: CONTACTO.ciudad,
    region: CONTACTO.estado,
    country: 'MX',
    countryName: 'México',
  },
  social: {
    instagram: CONTACTO.instagram,
    facebook: CONTACTO.facebook,
    linkedin: CONTACTO.linkedin,
    behance: CONTACTO.behance,
  },
  /** Zona horaria del reloj en vivo del navbar. */
  timezone: 'America/Mexico_City',
  timezoneLabel: 'CDMX',

  /**
   * ID de medición de Google Analytics 4.
   *
   * Es público: viaja en el HTML de todas las páginas, cualquiera puede
   * verlo y no da acceso a los informes. Por eso está aquí y no en una
   * variable de entorno, que solo complicaría el despliegue.
   *
   * Solo se carga en producción (ver layout.tsx): así las pruebas en local
   * no ensucian las estadísticas.
   */
  analyticsId: 'G-1BY4770KW4',
} as const;

/**
 * Genera un enlace de WhatsApp con mensaje pre-llenado.
 * El mensaje pre-llenado sube muchísimo la tasa de respuesta porque el usuario
 * no tiene que pensar qué escribir.
 */
export function waLink(message?: string): string {
  // El mensaje por defecto también se edita en el panel.
  const text = message ?? CONTACTO.mensajeWhatsApp;
  return `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(text)}`;
}

export const NAV_LINKS = [
  { label: 'Servicios', href: '/servicios/' },
  { label: 'Portafolio', href: '/portafolio/' },
  { label: 'Precios', href: '/precios/' },
  { label: 'Nosotros', href: '/nosotros/' },
  { label: 'Blog', href: '/blog/' },
] as const;

/* ------------------------------------------------------------------ */
/* Servicios                                                           */
/* ------------------------------------------------------------------ */

import { SERVICIOS_ESPECIALIZADOS, type Service } from '@/lib/services';

export type { Service };

/**
 * Los tres servicios núcleo. El resto de landings especializadas viven en
 * `services.ts`, que ya era demasiado contenido para tenerlo aquí.
 */
const SERVICIOS_NUCLEO: Service[] = [
  {
    slug: 'diseno-web',
    name: 'Diseño y desarrollo web',
    h1: 'Diseño web y desarrollo de sitios que venden',
    title: 'Diseño Web en México | Sitios que Convierten | Mika',
    description:
      'Agencia de diseño y desarrollo web en CDMX. Sitios corporativos, tiendas en línea y landing pages rápidas, optimizadas para SEO y listas para vender.',
    tagline:
      'Sitios corporativos, e-commerce y landing pages construidos para convertir, no solo para verse bien.',
    keyword: 'diseño web México',
    priceFrom: 18000,
    deliverables: [
      'Diseño UX/UI a la medida, sin plantillas genéricas',
      'Desarrollo a medida o WordPress según tu caso',
      'Tienda en línea con pasarela de pago',
      '100% responsivo: móvil, tablet y escritorio',
      'Velocidad optimizada (Core Web Vitals en verde)',
      'SEO técnico desde el primer día',
      'Panel para que edites tu contenido sin depender de nosotros',
      'Capacitación y 30 días de soporte incluidos',
    ],
    process: [
      {
        step: '01',
        title: 'Descubrimiento',
        body: 'Entendemos tu negocio, tu cliente ideal y a quién le compites. Sin esto, el diseño es decoración.',
      },
      {
        step: '02',
        title: 'Arquitectura y wireframes',
        body: 'Definimos las páginas, la jerarquía de información y las rutas de conversión antes de tocar un pixel.',
      },
      {
        step: '03',
        title: 'Diseño visual',
        body: 'Diseñamos cada pantalla en alta fidelidad. Apruebas el diseño completo antes de que programemos.',
      },
      {
        step: '04',
        title: 'Desarrollo',
        body: 'Código limpio, rápido y accesible. Optimizamos imágenes, tiempos de carga y SEO técnico.',
      },
      {
        step: '05',
        title: 'Lanzamiento y medición',
        body: 'Publicamos, conectamos Analytics y Search Console, y te entregamos capacitación en video.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta un sitio web en México?',
        a: 'En Mika, un sitio corporativo profesional arranca en $18,000 MXN y una tienda en línea en $35,000 MXN. El precio final depende del número de páginas, si necesitas e-commerce, integraciones o generación de contenido. Te damos una cotización cerrada antes de empezar: no cobramos extras sorpresa.',
      },
      {
        q: '¿Cuánto tarda el desarrollo de una página web?',
        a: 'Una landing page toma de 1 a 2 semanas. Un sitio corporativo de 5 a 8 páginas, entre 3 y 5 semanas. Una tienda en línea, de 5 a 8 semanas. El plazo depende sobre todo de qué tan rápido nos entregues textos e imágenes.',
      },
      {
        q: '¿Usan WordPress o programan a la medida?',
        a: 'Depende de tu caso. Si necesitas publicar contenido constantemente y que tu equipo lo administre, WordPress bien configurado es la mejor opción. Si buscas máxima velocidad, algo fuera de lo común o una aplicación web, programamos a la medida con Next.js o React. Te recomendamos honestamente lo que te conviene, no lo que nos conviene.',
      },
      {
        q: '¿El sitio va a estar optimizado para Google?',
        a: 'Sí. Todos nuestros sitios se entregan con SEO técnico: estructura de encabezados correcta, títulos y meta descripciones escritas, datos estructurados, sitemap, velocidad optimizada y Search Console conectado. Eso es la base. El posicionamiento sostenido en el tiempo es un servicio aparte.',
      },
      {
        q: '¿Incluye hosting y dominio?',
        a: 'Te asesoramos y configuramos ambos. El costo del dominio (~$300 MXN al año) y el hosting (desde ~$1,500 MXN al año) se contratan a tu nombre, para que siempre seas el dueño de tus activos digitales. Nunca dejamos a un cliente atado.',
      },
      {
        q: '¿Trabajan con clientes fuera de México?',
        a: 'Sí. Hemos trabajado con clientes en Estados Unidos, Canadá y otros países de Latinoamérica. Todo el proceso es remoto, con juntas por videollamada y entregas en línea.',
      },
    ],
    related: ['posicionamiento-seo', 'diseno-grafico-branding'],
    landing: {
      badge: 'Más de 20 sitios en línea desde 2020',
      promesa:
        'Diseñamos y programamos sitios que cargan rápido, se entienden en cinco segundos y están hechos para que te escriban. No plantillas con tu logo encima.',
      pruebas: [
        'Diseño a la medida, sin plantillas',
        'SEO técnico incluido',
        'Todo queda a tu nombre',
      ],
      mensajeWhatsApp:
        'Hola Mika, quiero una página web. ¿Me pueden dar información?',
      planes: 'web',
      beneficios: [
        {
          icono: 'velocidad',
          titulo: 'Rápido de verdad',
          texto:
            'Optimizamos cada imagen y cada línea de código. La velocidad no es presumir: es factor de posicionamiento y es gente que no se va antes de que cargue.',
        },
        {
          icono: 'crecimiento',
          titulo: 'Construido para aparecer en Google',
          texto:
            'Estructura, títulos, datos estructurados y sitemap desde el primer día. Un sitio bonito que nadie encuentra es un folleto caro.',
        },
        {
          icono: 'llave',
          titulo: 'Lo editas tú',
          texto:
            'Panel propio y capacitación en video. Cambiar un texto o subir una nota no debería costarte un correo y tres días de espera.',
        },
        {
          icono: 'verificado',
          titulo: 'Precio cerrado por escrito',
          texto:
            'Cotizamos el alcance completo antes de empezar. Si algo cambia lo hablamos antes, nunca aparece en la factura final.',
        },
        {
          icono: 'trato',
          titulo: 'Hablas con quien lo hace',
          texto:
            'Sin ejecutivo de cuenta ni teléfono descompuesto. Tratas directo con quien diseña y programa tu proyecto.',
        },
        {
          icono: 'escudo',
          titulo: 'Dominio y hosting a tu nombre',
          texto:
            'Eres el dueño de tus activos digitales. Si algún día quieres irte con otro proveedor, te llevas todo.',
        },
      ],
      galeria: [
        {
          src: '/images/landings/web/sitio-corporativo.webp',
          alt: 'Sitio corporativo diseñado por Mika Digital Agency visto en escritorio.',
          titulo: 'Sitio corporativo',
        },
        {
          src: '/images/landings/web/landing-campana.webp',
          alt: 'Landing page de campaña con formulario de contacto destacado.',
          titulo: 'Landing de campaña',
        },
        {
          src: '/images/landings/web/responsive.webp',
          alt: 'El mismo sitio web adaptado a teléfono, tableta y escritorio.',
          titulo: 'Se ve bien en todo',
        },
        {
          src: '/images/landings/web/blog.webp',
          alt: 'Sección de blog administrable con artículos y categorías.',
          titulo: 'Blog administrable',
        },
        {
          src: '/images/landings/web/panel.webp',
          alt: 'Panel de administración desde el que el cliente edita su contenido.',
          titulo: 'Tu panel de contenido',
        },
        {
          src: '/images/landings/web/velocidad.webp',
          alt: 'Resultado de una medición de velocidad con las métricas en verde.',
          titulo: 'Core Web Vitals en verde',
        },
      ],
    },
  },
  {
    slug: 'posicionamiento-seo',
    name: 'Posicionamiento SEO',
    h1: 'Posicionamiento SEO para aparecer en la primera página de Google',
    title: 'Agencia SEO en México | Posicionamiento Web | Mika',
    description:
      'Agencia de posicionamiento SEO en CDMX. Auditoría, SEO técnico, contenido y SEO local para que tu negocio aparezca en Google cuando te buscan. Resultados medibles.',
    tagline:
      'Auditoría, SEO técnico, contenido y SEO local para que te encuentren los que ya te están buscando.',
    keyword: 'agencia SEO México',
    priceFrom: 8500,
    // El SEO se cobra por mes. Sin la unidad, "desde $8,500" se lee como
    // pago único y la primera llamada arranca con un malentendido.
    priceUnit: 'mes',
    deliverables: [
      'Auditoría SEO técnica completa de tu sitio',
      'Investigación de palabras clave con intención de compra',
      'Optimización on-page: títulos, encabezados, contenido',
      'Corrección de errores técnicos e indexación',
      'Datos estructurados (schema) para rich snippets',
      'SEO local y Google Business Profile',
      'Estrategia de contenidos y blog',
      'Reporte mensual con posiciones, tráfico y conversiones',
    ],
    process: [
      {
        step: '01',
        title: 'Auditoría',
        body: 'Revisamos indexación, velocidad, estructura, contenido y perfil de enlaces. Te entregamos el diagnóstico por escrito.',
      },
      {
        step: '02',
        title: 'Palabras clave',
        body: 'Identificamos qué buscan tus clientes y con qué intención. Priorizamos por volumen, dificultad y cercanía a la compra.',
      },
      {
        step: '03',
        title: 'Corrección técnica',
        body: 'Arreglamos lo que impide posicionar: velocidad, errores de rastreo, canonicals, encabezados, datos estructurados.',
      },
      {
        step: '04',
        title: 'Contenido',
        body: 'Creamos o reescribimos las páginas que atacan cada palabra clave, con enlazado interno estratégico.',
      },
      {
        step: '05',
        title: 'Medición continua',
        body: 'Reporte mensual claro: qué subió, qué falta y qué hacemos el mes siguiente. Sin humo ni métricas de vanidad.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto tarda el SEO en dar resultados?',
        a: 'Los primeros movimientos se ven entre el mes 2 y el 3. Los resultados sólidos, entre el mes 4 y el 6. Cualquier agencia que te prometa primer lugar en Google en 30 días te está mintiendo: el SEO es acumulativo, y por eso mismo también es difícil de perder una vez que lo ganas.',
      },
      {
        q: '¿Cuánto cuesta el posicionamiento SEO en México?',
        a: 'Nuestro plan mensual de SEO arranca en $8,500 MXN. La auditoría SEO como servicio único cuesta $6,500 MXN y se te bonifica si contratas el plan mensual. El precio varía según la competencia de tu sector y el tamaño de tu sitio.',
      },
      {
        q: '¿Garantizan el primer lugar en Google?',
        a: 'No, y desconfía de quien lo garantice: nadie controla el algoritmo de Google. Lo que sí garantizamos es trabajo medible y transparente — verás mes a mes las posiciones, el tráfico orgánico y las conversiones que llegan por buscadores.',
      },
      {
        q: '¿Sirve el SEO si mi negocio es local?',
        a: 'Muchísimo. El SEO local es de lo más rentable que existe: optimizamos tu Google Business Profile, tus reseñas, tus citas locales y creamos páginas por zona. Cuando alguien busca "tu servicio + tu ciudad" desde su celular, apareces tú.',
      },
      {
        q: '¿Necesito rehacer mi sitio para hacer SEO?',
        a: 'No siempre. Primero auditamos. Si tu sitio tiene una base técnica sana, optimizamos lo que ya existe. Si está construido sobre una plantilla lenta o mal estructurada, te lo decimos claro: invertir en contenido sobre una base rota es tirar el dinero.',
      },
    ],
    related: ['diseno-web', 'diseno-grafico-branding'],
    landing: {
      badge: 'Reportes claros, sin métricas de vanidad',
      promesa:
        'Trabajamos para que aparezcas cuando tus clientes ya te están buscando. Con un reporte mensual que dice qué subió, qué falta y qué hacemos el mes siguiente.',
      pruebas: [
        'Primeros movimientos en 60 a 90 días',
        'Auditoría antes de cobrarte un plan',
        'Sin permanencia forzada',
      ],
      mensajeWhatsApp:
        'Hola Mika, quiero mejorar mi posicionamiento en Google. ¿Me pueden dar información?',
      planes: 'seo',
      beneficios: [
        {
          icono: 'crecimiento',
          titulo: 'Tráfico que no se apaga',
          texto:
            'La publicidad deja de traer gente el día que dejas de pagarla. El posicionamiento se acumula y sigue trabajando meses después.',
        },
        {
          icono: 'verificado',
          titulo: 'Te encuentran con la intención de comprar',
          texto:
            'Quien busca tu servicio y tu ciudad ya decidió contratar. Solo está eligiendo a quién.',
        },
        {
          icono: 'metricas',
          titulo: 'Reportes que se entienden',
          texto:
            'Posiciones, tráfico y contactos recibidos. Nada de gráficas impresionantes que no explican si entró un cliente.',
        },
        {
          icono: 'escudo',
          titulo: 'Nada de trucos',
          texto:
            'Sin granjas de enlaces ni texto oculto. Lo que da un salto rápido hoy te tumba del índice en la siguiente actualización de Google.',
        },
        {
          icono: 'tiempo',
          titulo: 'Te decimos la verdad del plazo',
          texto:
            'Resultados sólidos entre el mes 4 y el 6. Quien te prometa primer lugar en 30 días te está mintiendo.',
        },
        {
          icono: 'cohete',
          titulo: 'Empezamos por auditar',
          texto:
            'Primero vemos qué te frena. Invertir en contenido sobre una base técnica rota es tirar el dinero, y te lo diremos.',
        },
      ],
      galeria: [
        {
          src: '/images/landings/seo/posiciones.webp',
          alt: 'Gráfica de evolución de posiciones en Google a lo largo de seis meses.',
          titulo: 'Evolución de posiciones',
        },
        {
          src: '/images/landings/seo/search-console.webp',
          alt: 'Panel de Search Console mostrando el crecimiento de clics e impresiones.',
          titulo: 'Clics e impresiones',
        },
        {
          src: '/images/landings/seo/auditoria.webp',
          alt: 'Informe de auditoría SEO con las prioridades ordenadas por impacto.',
          titulo: 'Informe de auditoría',
        },
        {
          src: '/images/landings/seo/local-pack.webp',
          alt: 'Negocio apareciendo en el bloque de resultados locales de Google Maps.',
          titulo: 'Aparecer en el mapa',
        },
        {
          src: '/images/landings/seo/core-web-vitals.webp',
          alt: 'Métricas de Core Web Vitals de un sitio optimizado, todas en verde.',
          titulo: 'Rendimiento en verde',
        },
        {
          src: '/images/landings/seo/reporte.webp',
          alt: 'Reporte mensual de posicionamiento entregado a un cliente.',
          titulo: 'Reporte mensual',
        },
      ],
    },
  },
  {
    slug: 'diseno-grafico-branding',
    name: 'Diseño gráfico y branding',
    h1: 'Diseño gráfico y branding que hace memorable a tu marca',
    title: 'Diseño Gráfico y Branding CDMX | Identidad de Marca | Mika',
    description:
      'Diseño de logotipos, identidad corporativa y manuales de marca en CDMX. Creamos marcas coherentes que se reconocen y se recuerdan. Cotiza tu proyecto por WhatsApp.',
    tagline:
      'Logotipos, identidad corporativa y manuales de marca con criterio estratégico, no solo estético.',
    keyword: 'diseño gráfico CDMX',
    priceFrom: 12000,
    deliverables: [
      'Diagnóstico de marca y análisis de competencia',
      'Diseño de logotipo con propuestas y rondas de ajuste',
      'Sistema visual: color, tipografía, iconografía',
      'Manual de identidad de marca en PDF',
      'Papelería corporativa y plantillas editables',
      'Aplicaciones para redes sociales',
      'Archivos en todos los formatos (AI, SVG, PNG, PDF)',
      'Cesión total de derechos: la marca es tuya',
    ],
    process: [
      {
        step: '01',
        title: 'Inmersión',
        body: 'Entrevista de marca: qué vendes, a quién, qué te hace distinto y contra quién compites.',
      },
      {
        step: '02',
        title: 'Territorio visual',
        body: 'Definimos el rumbo con moodboards. Alineamos expectativas antes de diseñar.',
      },
      {
        step: '03',
        title: 'Diseño de identidad',
        body: 'Propuestas de logotipo con su racional. Eliges una y la refinamos hasta el detalle.',
      },
      {
        step: '04',
        title: 'Sistema y manual',
        body: 'Construimos el sistema completo y lo documentamos para que cualquiera aplique tu marca bien.',
      },
      {
        step: '05',
        title: 'Entrega',
        body: 'Todos los archivos organizados, en todos los formatos, con la cesión de derechos por escrito.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta un logotipo profesional?',
        a: 'Un logotipo con su manual básico arranca en $12,000 MXN. Una identidad de marca completa —con sistema visual, papelería, aplicaciones y manual extendido— desde $28,000 MXN. Incluye rondas de ajuste y cesión total de derechos.',
      },
      {
        q: '¿Cuántas propuestas de logo incluye?',
        a: 'Presentamos 3 propuestas sólidas con su justificación estratégica, no 20 opciones al azar. Eliges una y hacemos hasta 3 rondas de ajuste sobre esa ruta. Trabajamos con criterio, no a prueba y error.',
      },
      {
        q: '¿Me entregan los archivos editables?',
        a: 'Sí, siempre. Recibes los archivos vectoriales originales (AI, EPS, SVG) además de PNG y PDF en todas las versiones. Y firmamos la cesión de derechos: tu marca te pertenece al 100%.',
      },
      {
        q: '¿Qué es un manual de identidad y por qué lo necesito?',
        a: 'Es el documento que define cómo se usa tu marca: tamaños mínimos, colores exactos, tipografías, usos correctos e incorrectos. Sin él, cada proveedor aplica tu marca a su manera y en un año tu identidad es un desastre. Con él, tu marca se ve igual de sólida en todos lados.',
      },
      {
        q: '¿Hacen rediseño de marcas que ya existen?',
        a: 'Sí, y es de lo que más hacemos. Un rediseño bien hecho conserva el capital de reconocimiento que ya construiste y moderniza lo que envejeció. Analizamos qué vale la pena conservar antes de proponer cambios.',
      },
    ],
    related: ['diseno-web', 'posicionamiento-seo'],
    landing: {
      badge: 'Más de 300 diseños creados',
      promesa:
        'Un logotipo no es un dibujo bonito: es la pieza que hace que te reconozcan. Lo diseñamos con criterio y te lo entregamos con todo, incluida la cesión de derechos.',
      pruebas: [
        '3 propuestas con su razón de ser',
        'Archivos editables incluidos',
        'La marca es 100% tuya',
      ],
      mensajeWhatsApp:
        'Hola Mika, quiero un logotipo para mi marca. ¿Me pueden dar información?',
      planes: 'branding',
      beneficios: [
        {
          icono: 'brillo',
          titulo: 'Propuestas con criterio',
          texto:
            'Tres rutas sólidas con su justificación, no veinte opciones al azar para ver cuál pega. Trabajamos con razones, no a prueba y error.',
        },
        {
          icono: 'llave',
          titulo: 'Te llevas los archivos originales',
          texto:
            'Vectoriales, PNG y PDF en todas las versiones. Nada de recibir solo un JPG y tener que volver por cada aplicación.',
        },
        {
          icono: 'escudo',
          titulo: 'Cesión de derechos por escrito',
          texto:
            'Tu marca te pertenece al 100%. Puedes registrarla, modificarla o usarla donde quieras sin pedir permiso a nadie.',
        },
        {
          icono: 'verificado',
          titulo: 'Manual para que no se degrade',
          texto:
            'Sin manual, cada proveedor aplica tu marca a su manera y en un año es un desastre. Con él, se ve igual de sólida en todos lados.',
        },
        {
          icono: 'cohete',
          titulo: 'Funciona en todos los tamaños',
          texto:
            'Probamos el logotipo desde un anuncio espectacular hasta el ícono de una app. Muchos diseños preciosos dejan de leerse a 16 píxeles.',
        },
        {
          icono: 'trato',
          titulo: 'Rondas de ajuste incluidas',
          texto:
            'Eliges una ruta y la refinamos hasta el detalle, con hasta tres rondas dentro del precio acordado.',
        },
      ],
      galeria: [
        {
          src: '/images/landings/logos/logo-1.webp',
          alt: 'Logotipo diseñado por Mika Digital Agency aplicado sobre fondo neutro.',
          titulo: 'Identidad corporativa',
        },
        {
          src: '/images/landings/logos/logo-2.webp',
          alt: 'Propuesta de logotipo con sus variantes en positivo y negativo.',
          titulo: 'Variantes del logotipo',
        },
        {
          src: '/images/landings/logos/manual.webp',
          alt: 'Páginas del manual de identidad con usos correctos e incorrectos.',
          titulo: 'Manual de identidad',
        },
        {
          src: '/images/landings/logos/papeleria.webp',
          alt: 'Papelería corporativa con tarjetas, hojas membretadas y sobres.',
          titulo: 'Papelería corporativa',
        },
        {
          src: '/images/landings/logos/aplicaciones.webp',
          alt: 'Aplicaciones de marca en empaque, señalética y redes sociales.',
          titulo: 'Aplicaciones de marca',
        },
        {
          src: '/images/landings/logos/paleta.webp',
          alt: 'Paleta cromática y tipografías del sistema visual de una marca.',
          titulo: 'Sistema visual',
        },
      ],
    },
  },
];

/**
 * Todos los servicios con landing propia.
 *
 * El orden importa: es el que se usa en el pie de página, en /servicios y en
 * el selector de contacto. Los tres núcleo van primero porque son los que
 * más se venden y los que más tráfico deben captar.
 */
export const SERVICES: Service[] = [
  ...SERVICIOS_NUCLEO,
  ...SERVICIOS_ESPECIALIZADOS,
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/**
 * Servicios que se mencionan pero todavía no tienen landing propia.
 *
 * Los que estaban aquí antes —programación, video, podcast, fotografía,
 * social media y tarjetas digitales— se promovieron a página completa en
 * `services.ts`,
 * porque cada uno tiene su propia búsqueda y su propio público.
 *
 * Si alguno de estos empieza a pedirse mucho, toca promoverlo igual.
 */
export const SECONDARY_SERVICES = [
  {
    name: 'Realidad aumentada',
    tagline:
      'Experiencias AR para catálogos, empaques y activaciones de marca.',
    icon: 'Sparkles',
  },
  {
    name: 'Modelado 3D',
    tagline:
      'Producto en 3D para renders, animación y visualizadores interactivos.',
    icon: 'Boxes',
  },
  {
    name: 'Mantenimiento web',
    tagline:
      'Respaldos, actualizaciones de seguridad, monitoreo y cambios de contenido.',
    icon: 'Wrench',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Métricas                                                            */
/* ------------------------------------------------------------------ */

/**
 * Las cifras de la portada. Se editan en el panel, en Ajustes del sitio →
 * Página de inicio, porque envejecen: los proyectos entregados suben.
 */
export const STATS: { value: string; label: string }[] = INICIO.estadisticas.map(
  (dato) => ({ value: dato.valor, label: dato.etiqueta }),
);

/* ------------------------------------------------------------------ */
/* Equipo                                                              */
/* ------------------------------------------------------------------ */

/*
 * Los perfiles del equipo viven en `content/equipo/` y se leen desde
 * `src/lib/team.ts`. Se movieron ahí para que se puedan editar desde el
 * panel: la historia de cada persona, sus certificaciones y los proyectos
 * en los que participó cambian con el tiempo y no deberían requerir tocar
 * código.
 */
