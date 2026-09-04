import { SITE } from '@/lib/site';
import type { Miembro } from '@/lib/team';

/**
 * Genera el contacto en formato vCard 3.0.
 *
 * Es el archivo que la agenda del teléfono entiende. Al abrirlo, iOS y Android
 * ofrecen guardar la ficha con todo relleno: nombre, puesto, teléfono, correo
 * y hasta la foto. Es la diferencia entre una página con tus datos y una
 * tarjeta de presentación de verdad — que el contacto acabe en la agenda, no
 * en una pestaña que se cierra.
 *
 * Se usa la versión 3.0 y no la 4.0 a propósito: la 4.0 es más moderna y más
 * limpia, pero la agenda de iOS todavía la trata peor. Aquí importa que
 * funcione en el teléfono de quien lo escanea, no la elegancia del formato.
 */

/**
 * Escapa los caracteres que en vCard tienen significado propio.
 *
 * Sin esto, un puesto como "Diseño, Web" partiría el campo en dos y la ficha
 * llegaría rota a la agenda.
 */
function escapar(valor: string): string {
  return valor
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Parte el nombre en apellidos y nombre de pila, que es como lo quiere el
 * campo `N`. Con un solo nombre, todo va al nombre de pila.
 */
function partirNombre(completo: string): { nombre: string; apellidos: string } {
  const partes = completo.trim().split(/\s+/);
  if (partes.length === 1) return { nombre: partes[0], apellidos: '' };
  return {
    nombre: partes[0],
    apellidos: partes.slice(1).join(' '),
  };
}

export function construirVCard(miembro: Miembro): string {
  const { nombre, apellidos } = partirNombre(miembro.name);
  const telefono = `+${miembro.whatsapp}`;

  /*
   * Cada red se añade como URL etiquetada: la agenda las muestra como enlaces
   * con su nombre debajo, en vez de como un montón de direcciones sueltas.
   *
   * Van como dos entradas separadas del array y no como un texto de dos
   * líneas porque el separador de vCard es CRLF, y el `join` de abajo solo lo
   * pone entre elementos. Metidas juntas, quedaban unidas por un salto suelto
   * que algunos lectores no aceptan.
   */
  const redes = miembro.socials.flatMap((s, i) => [
    `item${i + 1}.URL:${s.url}`,
    `item${i + 1}.X-ABLabel:${escapar(s.red)}`,
  ]);

  // El salto de línea de vCard es CRLF por especificación. Con \n solo, hay
  // agendas que leen el archivo como una sola línea y lo descartan entero.
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapar(apellidos)};${escapar(nombre)};;;`,
    `FN:${escapar(miembro.name)}`,
    `ORG:${escapar(SITE.name)}`,
    `TITLE:${escapar(miembro.role)}`,
    `TEL;TYPE=CELL,VOICE:${telefono}`,
    `EMAIL;TYPE=INTERNET,WORK:${miembro.email}`,
    `URL:${SITE.url}/equipo/${miembro.slug}/`,
    ...redes,
    `ADR;TYPE=WORK:;;;${escapar(SITE.address.city)};;;${escapar(SITE.address.countryName)}`,
    `NOTE:${escapar(miembro.shortBio)}`,
    'END:VCARD',
  ].join('\r\n');
}
