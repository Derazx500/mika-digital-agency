import { readCollection, type RawDoc } from '@/lib/content';

/**
 * Portafolio.
 *
 * Cada proyecto es un archivo Markdown en `/content/proyectos/`. Se crean y
 * editan desde el panel en /admin, igual que los artículos del blog.
 *
 * El cuerpo del archivo es el caso de estudio (reto, proceso, resultados),
 * que es justo lo que convierte visitantes en clientes y lo que Google
 * premia frente a una galería de imágenes sin texto.
 */

type ProjectFrontmatter = {
  name: string;
  industry: string;
  year: string;
  summary: string;
  tags: string[];
  image: string;
  /** Proporción de la tarjeta en la retícula: apaisada o cuadrada. */
  aspect: 'wide' | 'square';
  /** Si aparece en la home. */
  featured?: boolean;
  /** Orden manual en el portafolio. Menor número, primero. */
  order?: number;
  /** Enlace al sitio en vivo, si sigue publicado. */
  url?: string;
  draft?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  industry: string;
  year: string;
  summary: string;
  tags: string[];
  image: string;
  aspect: 'wide' | 'square';
  featured: boolean;
  order: number;
  url?: string;
  body: string;
};

function toProject(doc: RawDoc<ProjectFrontmatter>): Project {
  const { data, body, slug } = doc;
  return {
    slug,
    name: data.name,
    industry: data.industry,
    year: data.year,
    summary: data.summary,
    tags: data.tags ?? [],
    image: data.image,
    aspect: data.aspect ?? 'wide',
    featured: data.featured ?? false,
    // Sin orden explícito van al final, pero antes de romper nada.
    order: data.order ?? 999,
    url: data.url,
    body,
  };
}

export function getAllProjects(): Project[] {
  return readCollection<ProjectFrontmatter>('proyectos')
    .filter((doc) => !doc.data.draft)
    .map(toProject)
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

/*
 * Los testimonios se movieron a `content/testimonios/` para que se puedan
 * añadir desde el panel. Se leen desde `src/lib/testimonios.ts`.
 */
