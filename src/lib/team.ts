import { readCollection, type RawDoc } from '@/lib/content';

/**
 * Perfiles del equipo.
 *
 * Cada persona es un archivo Markdown en `content/equipo/`, editable desde
 * el panel. El cuerpo del archivo es su historia; el frontmatter guarda los
 * datos estructurados: redes, certificaciones y los proyectos en los que
 * participó.
 *
 * Vincular proyectos a personas no es un adorno: quien duda si contratarte
 * quiere saber quién va a hacer el trabajo y qué ha hecho antes. Es la
 * diferencia entre "somos una agencia" y "esto lo hizo esta persona".
 */

type Enlace = { red: string; url: string };

type Certificacion = {
  titulo: string;
  emisor?: string;
  anio?: string;
  /** PDF o imagen del certificado, subido desde el panel. */
  archivo?: string;
  /** Enlace a la credencial en línea, si la emiten así. */
  url?: string;
};

type MiembroFrontmatter = {
  name: string;
  role: string;
  photo: string;
  /** Frase corta para la tarjeta de /nosotros. */
  shortBio: string;
  /** Qué hace. Se muestran como etiquetas. */
  specialties?: string[];
  socials?: Enlace[];
  certifications?: Certificacion[];
  /** Slugs de proyectos del portafolio en los que participó. */
  proyectos?: string[];
  /** Orden en el listado. Menor número, primero. */
  order?: number;
  draft?: boolean;
};

export type Miembro = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  shortBio: string;
  specialties: string[];
  socials: Enlace[];
  certifications: Certificacion[];
  proyectos: string[];
  order: number;
  /** La historia, en Markdown. */
  body: string;
};

function aMiembro(doc: RawDoc<MiembroFrontmatter>): Miembro {
  const { data, body, slug } = doc;
  return {
    slug,
    name: data.name,
    role: data.role,
    photo: data.photo,
    shortBio: data.shortBio,
    specialties: data.specialties ?? [],
    // El panel crea la fila en cuanto pulsas "añadir", así que se descartan
    // las que quedaron a medio llenar.
    socials: (data.socials ?? []).filter((s) => s?.red?.trim() && s?.url?.trim()),
    certifications: (data.certifications ?? []).filter((c) => c?.titulo?.trim()),
    proyectos: (data.proyectos ?? []).filter(Boolean),
    order: data.order ?? 99,
    body,
  };
}

export function getMiembros(): Miembro[] {
  return readCollection<MiembroFrontmatter>('equipo')
    .filter((doc) => !doc.data.draft)
    .map(aMiembro)
    .sort((a, b) => a.order - b.order);
}

export function getMiembro(slug: string): Miembro | undefined {
  return getMiembros().find((m) => m.slug === slug);
}
