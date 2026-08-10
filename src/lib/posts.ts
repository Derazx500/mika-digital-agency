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
