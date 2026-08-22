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

/**
 * Categorías para filtrar el portafolio.
 *
 * Se filtra por tipo de trabajo y no por sector del cliente: quien entra al
 * portafolio busca "¿han hecho branding?", no "¿han trabajado con una
 * empresa de mi giro?".
 *
 * Un proyecto puede estar en varias, porque casi siempre lo está: un mismo
 * cliente suele llevar identidad y sitio web.
 *
 * El orden es el de aparición de los botones: primero lo que más se vende.
 */
export const CATEGORIAS = [
  'Diseño web',
  'Branding',
  'E-commerce',
  'SEO',
  'Redes sociales',
  'Fotografía',
  'Video',
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

type ProjectFrontmatter = {
  name: string;
  industry: string;
  /** Tipos de trabajo, para el filtro del portafolio. */
  categorias?: string[];
  year: string;
  summary: string;
  tags: string[];
  image: string;
  /**
   * Reseña que dejó el cliente de ESTE proyecto. Opcional: no todos la
   * tienen, y una reseña inventada para rellenar se nota y resta.
   */
  resena?: string;
  resenaAutor?: string;
  resenaPuesto?: string;
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
  categorias: string[];
  year: string;
  summary: string;
  tags: string[];
  image: string;
  /** Reseña del cliente, si la dejó. */
  resena?: { texto: string; autor: string; puesto: string };
  aspect: 'wide' | 'square';
  featured: boolean;
  order: number;
  url?: string;
  body: string;
};

function toProject(doc: RawDoc<ProjectFrontmatter>): Project {
  const { data, body, slug } = doc;
  // La reseña solo cuenta si tiene texto y autor: media a medias no se
  // muestra, porque una cita sin nombre no da confianza, la quita.
  const resena =
    data.resena?.trim() && data.resenaAutor?.trim()
      ? {
          texto: data.resena.trim(),
          autor: data.resenaAutor.trim(),
          puesto: data.resenaPuesto?.trim() ?? '',
        }
      : undefined;

  return {
    slug,
    name: data.name,
    industry: data.industry,
    categorias: (data.categorias ?? []).filter(Boolean),
    year: data.year,
    resena,
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

/**
 * Categorías que de verdad tienen proyectos, en el orden de CATEGORIAS.
 *
 * Se calculan a partir del contenido en vez de listar las siete fijas: un
 * filtro que al pulsarlo no muestra nada frustra más que no tenerlo.
 */
export function getCategoriasConProyectos(): string[] {
  const usadas = new Set<string>();
  for (const proyecto of getAllProjects()) {
    for (const categoria of proyecto.categorias) usadas.add(categoria);
  }

  // Se respeta el orden de CATEGORIAS y se añaden al final las que alguien
  // haya escrito a mano y no estén en la lista.
  const conocidas = CATEGORIAS.filter((c) => usadas.has(c));
  const otras = [...usadas].filter((c) => !CATEGORIAS.includes(c as Categoria));
  return [...conocidas, ...otras];
}

/*
 * Los testimonios se movieron a `content/testimonios/` para que se puedan
 * añadir desde el panel. Se leen desde `src/lib/testimonios.ts`.
 */
