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

/**
 * Testimonios reales, tomados del sitio anterior de Mika.
 *
 * NOTA: la asociación del primero es explícita ("CEO de Cia escénicas
 * Lurvik"); las otras tres se dedujeron por el orden en que aparecían en el
 * carrusel. Verifica que cada frase corresponda a la persona correcta antes
 * de publicar.
 */
export const TESTIMONIALS = [
  {
    quote:
      'El equipo de diseño web y programación cumplió mis expectativas con una página profesional, atractiva y fácil de navegar. Su increíble resultado con mi visión fueron impresionantes. ¡Gracias por su gran esfuerzo!',
    author: 'Luis Lurvik',
    role: 'CEO',
    company: 'Cia Escénicas Lurvik',
  },
  {
    quote:
      'Estoy encantado con mi nueva web. El equipo capturó perfectamente la esencia de mi negocio y creó una experiencia de usuario fluida y atractiva. ¡Gracias por hacer realidad mi visión en línea de manera brillante!',
    author: 'Marcos Arellano',
    role: 'CEO',
    company: 'SAN-AR Automation',
  },
  {
    quote:
      'El equipo de diseño web hizo un trabajo increíble con mi página. Capturaron la esencia de mi negocio y crearon un sitio visualmente impactante y fácil de usar. ¡Gracias por su profesionalismo y dedicación!',
    author: 'Irving Espinoza',
    role: 'Director',
    company: 'CQDA',
  },
  {
    quote:
      '¡Mi página web es increíble! El equipo de diseño web capturó exactamente lo que quería. Estoy impresionado por su creatividad y profesionalismo. ¡Gracias por hacer realidad mi visión en línea!',
    author: 'Oscar Ortega',
    role: 'Director',
    company: 'Cobi Education',
  },
] as const;
