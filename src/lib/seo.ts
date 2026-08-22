import type { Metadata } from 'next';
import { SERVICES, SITE } from '@/lib/site';
import { IMAGENES } from '@/lib/ajustes';

/**
 * Construye la metadata de una página.
 *
 * Reglas que aplicamos en todo el sitio:
 * - `title` máx ~60 caracteres (Google corta el resto en el resultado).
 * - `description` entre 150 y 160 caracteres, con la keyword y una razón para
 *   hacer clic. No es factor de ranking directo, pero sí de CTR, y el CTR sí
 *   mueve posiciones.
 * - `canonical` siempre absoluta, para que no se dupliquen versiones con y sin
 *   www o con parámetros.
 */
export function buildMetadata({
  title,
  description,
  path,
  // Editable en el panel: Ajustes del sitio → Imágenes.
  image = IMAGENES.compartir,
  noIndex = false,
  type = 'website',
  publishedTime,
}: {
  title: string;
  description: string;
  /** Ruta con barras al inicio y al final, ej. '/servicios/diseno-web/' */
  path: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
}): Metadata {
  const url = `${SITE.url}${path}`;

  return {
    // `absolute` evita que la plantilla del layout raíz ("%s | Mika Digital
    // Agency") se concatene: cada título ya lleva su propia marca y quedaría
    // duplicada, además de pasarse del largo que Google muestra.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [{ url: `${SITE.url}${image}`, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE.url}${image}`],
    },
  };
}

/**
 * Recorta una meta descripción al largo que Google muestra.
 *
 * Google corta alrededor de los 155-160 caracteres. Pasarse no penaliza el
 * posicionamiento, pero la frase queda truncada a media palabra en el
 * resultado de búsqueda y se pierde justo el final, que suele ser la razón
 * para hacer clic.
 *
 * Corta por espacio para no partir palabras y solo añade puntos suspensivos
 * si de verdad sobró texto.
 */
export function recortarDescripcion(texto: string, maximo = 155): string {
  const limpio = texto.replace(/\s+/g, ' ').trim();
  if (limpio.length <= maximo) return limpio;

  const cortado = limpio.slice(0, maximo);
  const ultimoEspacio = cortado.lastIndexOf(' ');
  // Si no hay espacios cerca del final, se corta en seco antes que devolver
  // una cadena vacía.
  const base = ultimoEspacio > maximo * 0.6 ? cortado.slice(0, ultimoEspacio) : cortado;

  return base.replace(/[.,;:]$/, '') + '…';
}

/* ------------------------------------------------------------------ */
/* Datos estructurados (JSON-LD)                                       */
/* ------------------------------------------------------------------ */

/**
 * Organización + negocio local. Es lo que permite que Google entienda quién
 * eres, dónde estás y cómo contactarte, y lo que alimenta el panel de marca.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    // Apuntaba a /images/logo/, una carpeta que no existe: el logo del schema
    // era un 404 y Google no podía usarlo en el panel de conocimiento.
    logo: `${SITE.url}${IMAGENES.logo}`,
    image: `${SITE.url}${IMAGENES.compartir}`,
    description:
      'Agencia digital en Ciudad de México especializada en diseño web, posicionamiento SEO, diseño gráfico y branding.',
    foundingDate: SITE.founded,
    email: SITE.email,
    telephone: SITE.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: [
      { '@type': 'Country', name: 'México' },
      { '@type': 'Country', name: 'Estados Unidos' },
      { '@type': 'Country', name: 'Canadá' },
    ],
    sameAs: [SITE.social.instagram, SITE.social.facebook],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      contactType: 'ventas',
      availableLanguage: ['es'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios digitales',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          url: `${SITE.url}/servicios/${s.slug}/`,
        },
      })),
    },
  };
}

/** Migas de pan: Google las muestra en vez de la URL cruda en los resultados. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

/**
 * FAQPage: es el schema con mejor retorno para una agencia, porque puede
 * ganar espacio extra en el resultado de búsqueda con las preguntas
 * desplegables.
 */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  slug,
  priceFrom,
}: {
  name: string;
  description: string;
  slug: string;
  priceFrom: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: name,
    url: `${SITE.url}/servicios/${slug}/`,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'México' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MXN',
      price: priceFrom,
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'MXN',
        minPrice: priceFrom,
      },
    },
  };
}

export function articleSchema({
  title,
  description,
  slug,
  date,
  updated,
  author,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  /** Última revisión. Google la usa como señal de frescura del contenido. */
  updated?: string;
  author: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    // Google pide la imagen para poder mostrar el artículo con miniatura.
    ...(image ? { image: [`${SITE.url}${image}`] } : {}),
    datePublished: date,
    dateModified: updated ?? date,
    author: { '@type': 'Person', name: author },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: `${SITE.url}/blog/${slug}/`,
  };
}

/** Inserta un bloque JSON-LD. Se usa como <JsonLd data={...} /> en cada página. */
export function jsonLdProps(data: object) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}
