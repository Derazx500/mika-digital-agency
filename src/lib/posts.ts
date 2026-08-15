import { readCollection, readingTime, toIsoDate, type RawDoc } from '@/lib/content';

/**
 * Blog.
 *
 * Los artículos son archivos Markdown en `/content/blog/`. Para publicar uno
 * nuevo basta con crear el archivo — desde el panel en /admin o a mano — y
 * aparece solo en el listado, en el sitemap y con su schema de artículo.
 * No hay ningún índice que mantener.
 */

type PostFrontmatter = {
  title: string;
  seoTitle?: string;
  description: string;
  date: string | Date;
  author?: string;
  category: string;
  /** Palabra clave objetivo. Documentación interna, no se muestra. */
  keyword?: string;
  cover: string;
  coverAlt: string;
  /**
   * Fecha de la última revisión. Google la usa como señal de frescura: un
   * artículo revisado hace un mes compite mejor que uno de hace dos años.
   */
  updated?: string | Date;
  /**
   * Preguntas frecuentes del artículo.
   *
   * Se muestran al final y alimentan el schema FAQPage, que es el que puede
   * ganar espacio extra en el resultado de Google con las preguntas
   * desplegables. De los datos estructurados, es el de mejor retorno.
   */
  faqs?: { q: string; a: string }[];
  /** Marca el artículo como borrador: no se publica ni entra al sitemap. */
  draft?: boolean;
};

export type Post = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  author: string;
  category: string;
  cover: string;
  coverAlt: string;
  /** Fecha de última revisión. Si no se define, es la de publicación. */
  updated: string;
  /** Preguntas frecuentes. Vacío si el artículo no define ninguna. */
  faqs: { q: string; a: string }[];
  /** Minutos de lectura, calculados a partir del texto. */
  readingTime: number;
  body: string;
};

function toPost(doc: RawDoc<PostFrontmatter>): Post {
  const { data, body, slug } = doc;
  return {
    slug,
    title: data.title,
    // Si no se define un título SEO propio, se usa el titular del artículo.
    seoTitle: data.seoTitle ?? data.title,
    description: data.description,
    date: toIsoDate(data.date),
    author: data.author ?? 'Mika Digital Agency',
    category: data.category,
    cover: data.cover,
    coverAlt: data.coverAlt,
    updated: data.updated ? toIsoDate(data.updated) : toIsoDate(data.date),
    // Se filtran las entradas a medio llenar: el panel crea la fila en
    // cuanto pulsas "añadir", y una pregunta sin respuesta en el schema
    // hace que Google descarte el bloque entero.
    faqs: (data.faqs ?? []).filter((f) => f?.q?.trim() && f?.a?.trim()),
    readingTime: readingTime(body),
    body,
  };
}

/** Artículos publicados, del más reciente al más antiguo. */
export function getAllPosts(): Post[] {
  return readCollection<PostFrontmatter>('blog')
    .filter((doc) => !doc.data.draft)
    .map(toPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

/** Fecha legible en español, ej. "14 de julio de 2026". */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
