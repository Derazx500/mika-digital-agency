import { readCollection, type RawDoc } from '@/lib/content';

/**
 * Reseñas de clientes.
 *
 * Viven en `content/testimonios/` para que se puedan añadir desde el panel:
 * una reseña nueva no debería requerir tocar código, y son el contenido que
 * más conviene alimentar de forma constante.
 *
 * Cada una puede marcarse con los servicios a los que aplica, para que en la
 * landing de tarjetas digitales salgan reseñas de tarjetas y no de otra
 * cosa. Una
 * reseña específica del servicio que se está mirando convence mucho más que
 * un elogio genérico.
 */

type TestimonioFrontmatter = {
  author: string;
  role?: string;
  company?: string;
  /** Slugs de servicio a los que aplica. Vacío = se puede usar en todos. */
  servicios?: string[];
  /** Proyecto del portafolio relacionado, si lo hay. */
  proyecto?: string;
  /** De 1 a 5. Por defecto 5. */
  rating?: number;
  order?: number;
  draft?: boolean;
};

export type Testimonio = {
  slug: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  servicios: string[];
  proyecto?: string;
  rating: number;
  order: number;
};

function aTestimonio(doc: RawDoc<TestimonioFrontmatter>): Testimonio {
  const { data, body, slug } = doc;
  return {
    slug,
    // El cuerpo del archivo es la reseña: se escribe más cómodo en el editor
    // que en un campo de texto del formulario.
    quote: body.trim(),
    author: data.author,
    role: data.role ?? '',
    company: data.company ?? '',
    servicios: (data.servicios ?? []).filter(Boolean),
    proyecto: data.proyecto,
    rating: Math.min(5, Math.max(1, data.rating ?? 5)),
    order: data.order ?? 99,
  };
}

export function getTestimonios(): Testimonio[] {
  return readCollection<TestimonioFrontmatter>('testimonios')
    .filter((doc) => !doc.data.draft)
    .map(aTestimonio)
    .filter((t) => t.quote.length > 0)
    .sort((a, b) => a.order - b.order);
}

/**
 * Reseñas para un servicio concreto.
 *
 * Devuelve las marcadas con ese servicio y, si no llegan al mínimo, completa
 * con el resto. Así una landing nunca se queda sin reseñas por no haber
 * etiquetado ninguna todavía.
 *
 * `especificas` indica si todas las devueltas son de ese servicio. Importa
 * para el titular: presentar como "clientes que contrataron tarjetas
 * digitales" a
 * gente que contrató una web sería engañoso, y una reseña que no cuadra con
 * lo que se está mirando resta credibilidad en vez de sumarla.
 */
export function getTestimoniosDeServicio(
  slug: string,
  minimo = 2,
): { testimonios: Testimonio[]; especificas: boolean } {
  const todos = getTestimonios();
  const especificos = todos.filter((t) => t.servicios.includes(slug));

  if (especificos.length >= minimo) {
    return { testimonios: especificos, especificas: true };
  }

  const resto = todos.filter((t) => !especificos.includes(t));
  const completados = [...especificos, ...resto].slice(
    0,
    Math.max(minimo, especificos.length),
  );

  return {
    testimonios: completados,
    // Solo son específicas si no hizo falta completar con otras.
    especificas: especificos.length > 0 && completados.length === especificos.length,
  };
}
