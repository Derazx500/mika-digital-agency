import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Lectura de contenido desde disco.
 *
 * Todo el contenido editable vive en `/content` como archivos Markdown con
 * frontmatter. Eso es lo que permite que el panel de administración
 * (Decap CMS) los cree y los edite: escribe archivos en el repositorio, y
 * cada cambio dispara una recompilación.
 *
 * Estas funciones solo corren en el servidor, durante el build. Nunca llegan
 * al navegador.
 */

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type RawDoc<T> = {
  slug: string;
  data: T;
  /** Cuerpo del documento en Markdown, sin el frontmatter. */
  body: string;
};

/** Lee todos los .md de una carpeta de /content. */
export function readCollection<T>(collection: string): RawDoc<T>[] {
  const dir = path.join(CONTENT_DIR, collection);

  // Si la carpeta aún no existe (por ejemplo, antes del primer artículo),
  // devolvemos vacío en vez de romper el build.
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx?$/, ''),
        data: data as T,
        body: content,
      };
    });
}

export function readDoc<T>(
  collection: string,
  slug: string,
): RawDoc<T> | undefined {
  return readCollection<T>(collection).find((doc) => doc.slug === slug);
}

/**
 * Calcula el tiempo de lectura a partir del texto.
 *
 * Se hace automáticamente para que quien escriba en el panel no tenga que
 * estimarlo (y para que no se quede desactualizado al editar el artículo).
 * 200 palabras por minuto es la media aceptada para lectura en pantalla.
 */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Normaliza la fecha del frontmatter a 'YYYY-MM-DD'.
 *
 * gray-matter convierte las fechas sin comillas en objetos Date, y las que
 * llevan comillas las deja como texto. Esto acepta ambas.
 */
export function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? '').slice(0, 10);
}
