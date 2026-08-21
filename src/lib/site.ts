/**
 * Fuente única de verdad del sitio.
 *
 * Todo lo que cambia con frecuencia (teléfono, precios, proyectos, textos de
 * servicios) vive aquí para no tener que tocar los componentes. Si mañana
 * cambias el WhatsApp o subes precios, este es el único archivo que editas.
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
  email: 'contacto@mikadigitalagency.com',
  phone: '+52 55 7495 7155',
  /** Formato E.164 sin signos, para los enlaces wa.me y tel: */
  phoneRaw: '525574957155',
  address: {
    city: 'Ciudad de México',
    region: 'CDMX',
    country: 'MX',
    countryName: 'México',
  },
  social: {
    instagram: 'https://www.instagram.com/mika_digitalagency/',
    facebook: 'https://www.facebook.com/mikadigitalagency',
    linkedin: 'https://www.linkedin.com/company/mika-digital-agency',
    behance: 'https://www.behance.net/mikadigitalagency',
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
  const text =
    message ??
    'Hola Mika, vengo de su sitio web y me gustaría cotizar un proyecto.';
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
 * social media y NFC— se promovieron a página completa en `services.ts`,
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

export const STATS = [
  { value: '30+', label: 'Proyectos entregados' },
  { value: '300+', label: 'Diseños creados' },
  { value: '20+', label: 'Sitios web en línea' },
  { value: '15+', label: 'Años de experiencia combinada' },
] as const;

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
