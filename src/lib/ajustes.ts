import contacto from '@contenido/ajustes/contacto.json';
import imagenes from '@contenido/ajustes/imagenes.json';
import inicio from '@contenido/ajustes/inicio.json';
import nosotros from '@contenido/ajustes/nosotros.json';

/**
 * Ajustes editables desde el panel.
 *
 * Son los textos e imágenes que no encajaban en ninguna colección —no son
 * artículos ni proyectos, son piezas sueltas de páginas concretas— pero que
 * aun así hay que poder cambiar sin tocar código: el teléfono, las redes, el
 * titular de la portada, las fotos del estudio.
 *
 * Viven en `/content/ajustes/*.json` y se editan en /admin, sección
 * "Ajustes del sitio".
 *
 * ---
 *
 * SE IMPORTAN, NO SE LEEN CON `fs`, y esa decisión importa.
 *
 * El resto del contenido (blog, proyectos) se lee de disco, lo que solo
 * funciona en el servidor. Estos ajustes los necesitan también componentes de
 * cliente —el navbar, el hero, el botón flotante de WhatsApp llevan el
 * teléfono— así que leerlos con `fs` obligaría a pasarlos como props por media
 * aplicación.
 *
 * Un `import` de JSON lo resuelve el empaquetador en el build: el valor acaba
 * incrustado donde se use, dé igual el lado. El resultado para ti es el mismo
 * —editas en el panel, Vercel recompila, el cambio sale— pero sin arrastrar
 * props por toda la app.
 */

export type Estadistica = { valor: string; etiqueta: string };
export type Valor = { titulo: string; texto: string };

export const CONTACTO: {
  telefono: string;
  whatsapp: string;
  mensajeWhatsApp: string;
  correo: string;
  ciudad: string;
  estado: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  behance: string;
} = contacto;

export const IMAGENES: {
  logo: string;
  logoAncho: number;
  logoAlto: number;
  compartir: string;
  estudio1: string;
  estudio1Alt: string;
  estudio2: string;
  estudio2Alt: string;
} = imagenes;

export const INICIO: {
  heroTitulo: string;
  heroBoton: string;
  nosotrosTitulo: string;
  nosotrosTexto: string;
  nosotrosBoton: string;
  estadisticas: Estadistica[];
} = inicio;

export const NOSOTROS: {
  heroTitulo: string;
  heroIntro: string;
  historiaTitulo: string;
  historiaParrafos: string[];
  valoresTitulo: string;
  valores: Valor[];
  equipoTitulo: string;
} = nosotros;

/**
 * Parte un texto en sus líneas para poder maquetarlo con saltos controlados.
 *
 * Los titulares grandes se cortan a mano en puntos concretos —donde la frase
 * respira— y no donde caiga el ancho de la pantalla. Al hacerlos editables,
 * cada salto de línea del panel se convierte en un `<br>` que solo se aplica
 * de tablet hacia arriba; en móvil el texto fluye normal, que es lo que
 * conviene ahí.
 */
export function lineas(texto: string): string[] {
  return texto
    .split('\n')
    .map((linea) => linea.trim())
    .filter(Boolean);
}
