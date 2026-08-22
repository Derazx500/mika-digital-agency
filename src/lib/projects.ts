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
 * Sectores para filtrar el portafolio.
 *
 * Son deliberadamente amplios. El campo `industry` describe al cliente con
 * precisión ("Artes escénicas", "Servicios industriales"), pero como filtro
 * no sirve: con un sector distinto por proyecto, cada botón mostraría uno
 * solo y filtrar no aportaría nada.
 */
export const SECTORES = [
  'Comercio y retail',
  'Educación',
  'Salud y bienestar',
  'Servicios profesionales',
  'Industria',
  'Arte y cultura',
] as const;

export type Sector = (typeof SECTORES)[number];

type ProjectFrontmatter = {
  name: string;
  industry: string;
  /** Categoría amplia para el filtro del portafolio. */
  sector?: string;
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
  sector: string;
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
    // Sin sector asignado va a "Otros" en vez de romper el filtro.
    sector: data.sector?.trim() || 'Otros',
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
 * Sectores que de verdad tienen proyectos, en el orden del portafolio.
 *
 * Se calculan a partir del contenido en vez de listar los seis fijos: un
 * filtro que al pulsarlo no muestra nada frustra más que no tenerlo.
 */
export function getSectoresConProyectos(): string[] {
  const vistos = new Set<string>();
  for (const proyecto of getAllProjects()) vistos.add(proyecto.sector);
  return [...vistos];
}

/*
 * Los testimonios se movieron a `content/testimonios/` para que se puedan
 * añadir desde el panel. Se leen desde `src/lib/testimonios.ts`.
 */
