import { Children, isValidElement, type ReactNode } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { Figure } from '@/components/blog/Figure';

/**
 * Renderiza el cuerpo Markdown de un artículo o caso de estudio.
 *
 * El contenido se compila en el servidor durante el build, así que al
 * navegador no llega ni una línea de código del compilador de Markdown: el
 * usuario recibe HTML puro y Google lo indexa completo.
 *
 * `remarkGfm` habilita la sintaxis extendida de GitHub — tablas, tachado y
 * enlaces automáticos —, que el editor del panel escribe de forma natural.
 */

/**
 * Saca el texto plano de un encabezado.
 *
 * Hace falta porque un título con formato —`## Los **cinco** factores`— llega
 * como un array de nodos de React, y convertirlo con String() daría
 * "[object Object]". El `id` quedaría inservible y el enlace del índice
 * lateral no llevaría a ninguna parte.
 */
function textoDe(nodo: React.ReactNode): string {
  if (nodo === null || nodo === undefined || typeof nodo === 'boolean') return '';
  if (typeof nodo === 'string' || typeof nodo === 'number') return String(nodo);
  if (Array.isArray(nodo)) return nodo.map(textoDe).join('');
  if (typeof nodo === 'object' && 'props' in nodo) {
    return textoDe((nodo as { props: { children?: React.ReactNode } }).props.children);
  }
  return '';
}

function slugify(children: React.ReactNode): string {
  return textoDe(children)
    .toLowerCase()
    .normalize('NFD')
    // Elimina los acentos que la normalización NFD dejó sueltos.
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Imagen dentro de un artículo, escrita como Markdown normal:
 * `![alt](/ruta.webp "pie de foto")`. El atributo `title` se aprovecha como
 * pie, así que quien escribe en el panel no necesita sintaxis especial.
 */
function ImagenDeArticulo({
  src,
  alt,
  title,
}: {
  src?: string;
  alt?: string;
  title?: string;
}) {
  return <Figure src={String(src ?? '')} alt={alt ?? ''} caption={title} wide />;
}

/**
 * ¿El párrafo contiene únicamente una imagen?
 *
 * Markdown envuelve toda imagen suelta en un `<p>`, y nuestra imagen
 * renderiza un `<figure>`. Un `<figure>` dentro de un `<p>` es HTML
 * inválido: al analizarlo, el navegador cierra el párrafo por su cuenta, el
 * DOM resultante deja de coincidir con el que React espera y **la
 * hidratación falla en toda la página**.
 *
 * El síntoma es traicionero, porque el artículo se ve perfecto pero ningún
 * componente interactivo llega a activarse.
 */
function soloContieneImagen(children: ReactNode): boolean {
  const relevantes = Children.toArray(children).filter(
    (hijo) => !(typeof hijo === 'string' && hijo.trim() === ''),
  );

  return (
    relevantes.length === 1 &&
    isValidElement(relevantes[0]) &&
    relevantes[0].type === ImagenDeArticulo
  );
}

const components = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2
      id={slugify(children)}
      className="mt-12 scroll-mt-28 text-[24px] font-medium tracking-tight text-gray-900 sm:text-[30px]"
    >
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3
      id={slugify(children)}
      className="mt-8 scroll-mt-28 text-[19px] font-semibold tracking-tight text-gray-900 sm:text-[22px]"
    >
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => {
    // Una imagen sola no se envuelve en <p>: ver soloContieneImagen.
    if (soloContieneImagen(children)) return <>{children}</>;

    return (
      <p className="mt-5 text-[16px] leading-[1.75] text-gray-700 sm:text-[17px]">
        {children}
      </p>
    );
  },
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mt-5 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-gray-700 marker:text-brand-500 sm:text-[17px]">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5 text-[16px] leading-[1.7] text-gray-700 marker:text-brand-500 sm:text-[17px]">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="pl-1">{children}</li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),

  /**
   * La cita de bloque se usa como caja destacada. Se eligió así a propósito:
   * es sintaxis Markdown estándar, o sea que el editor del panel la escribe
   * con un botón y nunca la va a romper.
   */
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <aside className="my-8 rounded-2xl border border-brand-200 bg-brand-50 p-5 sm:p-6">
      <div className="border-l-2 border-brand-500 pl-4 text-[15px] leading-[1.65] text-gray-800 [&>p:first-child]:mt-0 [&>p]:mt-3">
        {children}
      </div>
    </aside>
  ),

  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    const className =
      'font-medium text-brand-500 underline underline-offset-4 hover:text-brand-600';

    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  },

  hr: () => <hr className="my-10 border-gray-200" />,

  img: ImagenDeArticulo,

  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-[15px]">{children}</table>
    </div>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="border-b border-gray-300 px-3 py-2.5 text-left font-semibold text-gray-900">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="border-b border-gray-200 px-3 py-2.5 text-gray-700">
      {children}
    </td>
  ),
};

export async function MdxContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  });

  return <>{content}</>;
}
