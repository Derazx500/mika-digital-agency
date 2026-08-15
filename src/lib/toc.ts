/**
 * Índice de secciones de un artículo.
 *
 * Extrae los encabezados de nivel 2 del Markdown para construir el índice de
 * la barra lateral. Se calcula a partir del mismo texto que se renderiza, así
 * que nunca se desincroniza: si alguien edita un título desde el panel, el
 * índice cambia solo.
 */

export type Seccion = { id: string; titulo: string };

/**
 * Debe generar exactamente los mismos `id` que MdxContent pone en los <h2>,
 * o los enlaces del índice no llevarían a ningún sitio.
 */
export function slugificar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    // Quita los acentos que la normalización NFD dejó sueltos.
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function extraerSecciones(markdown: string): Seccion[] {
  const secciones: Seccion[] = [];
  let dentroDeBloqueDeCodigo = false;

  for (const linea of markdown.split('\n')) {
    // Un ``` alterna dentro/fuera de bloque de código: los ## que haya ahí
    // son código de ejemplo, no encabezados.
    if (linea.trimStart().startsWith('```')) {
      dentroDeBloqueDeCodigo = !dentroDeBloqueDeCodigo;
      continue;
    }
    if (dentroDeBloqueDeCodigo) continue;

    const coincidencia = /^##\s+(.+?)\s*$/.exec(linea);
    if (!coincidencia) continue;

    // Limpia el formato en línea para que el índice se lea en texto plano.
    const titulo = coincidencia[1]
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/`(.+?)`/g, '$1')
      .replace(/\[(.+?)\]\([^)]*\)/g, '$1')
      .trim();

    secciones.push({ id: slugificar(titulo), titulo });
  }

  return secciones;
}
