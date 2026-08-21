import { NextResponse } from 'next/server';

import { SITE, SERVICES } from '@/lib/site';
import { getAllPosts } from '@/lib/posts';
import { getAllProjects } from '@/lib/projects';
import { getMiembros } from '@/lib/team';

/**
 * Inventario de todas las páginas del sitio, para el panel de contenido.
 *
 * Se genera desde las mismas fuentes que el sitemap, así que no puede
 * quedarse desactualizado: si publicas un artículo, aparece aquí solo. Un
 * listado escrito a mano se desincroniza a la primera.
 *
 * Se marca cuáles se editan desde el panel y con qué colección, para poder
 * enlazar directo al formulario de cada una.
 *
 * Es contenido público —las mismas URLs que ya están en sitemap.xml— así que
 * no expone nada que no se pueda ver navegando el sitio.
 */
export const dynamic = 'force-static';

type Pagina = {
  ruta: string;
  titulo: string;
  seccion: string;
  /** Colección y slug en el panel, si es editable desde ahí. */
  editable: { coleccion: string; slug: string } | null;
  /** Fecha relevante del contenido, cuando la hay. */
  fecha?: string;
};

/**
 * Páginas fijas: su contenido vive en código, no en /content.
 *
 * Los títulos se repiten aquí porque la metadata de cada página solo existe
 * dentro de su propio módulo y Next no la expone para consultarla desde
 * fuera. Si cambias un título, actualízalo también aquí.
 */
const PAGINAS_FIJAS: Pagina[] = [
  { ruta: '/', titulo: 'Inicio', seccion: 'Principales', editable: null },
  { ruta: '/servicios/', titulo: 'Servicios', seccion: 'Principales', editable: null },
  { ruta: '/portafolio/', titulo: 'Portafolio', seccion: 'Principales', editable: null },
  { ruta: '/precios/', titulo: 'Precios', seccion: 'Principales', editable: null },
  { ruta: '/nosotros/', titulo: 'Nosotros', seccion: 'Principales', editable: null },
  { ruta: '/contacto/', titulo: 'Contacto', seccion: 'Principales', editable: null },
  { ruta: '/blog/', titulo: 'Blog (listado)', seccion: 'Principales', editable: null },
  {
    ruta: '/aviso-de-privacidad/',
    titulo: 'Aviso de privacidad',
    seccion: 'Legal',
    editable: null,
  },
];

export function GET() {
  const paginas: Pagina[] = [
    ...PAGINAS_FIJAS,

    ...SERVICES.map((s) => ({
      ruta: `/servicios/${s.slug}/`,
      titulo: s.name,
      seccion: 'Servicios',
      // Los servicios viven en código: su contenido es largo y estructurado
      // (entregables, proceso, FAQ, precios) y se edita mejor ahí.
      editable: null,
    })),

    ...getAllPosts().map((p) => ({
      ruta: `/blog/${p.slug}/`,
      titulo: p.title,
      seccion: 'Blog',
      editable: { coleccion: 'blog', slug: p.slug },
      fecha: p.updated,
    })),

    ...getAllProjects().map((p) => ({
      ruta: `/portafolio/${p.slug}/`,
      titulo: p.name,
      seccion: 'Portafolio',
      editable: { coleccion: 'proyectos', slug: p.slug },
      fecha: p.year,
    })),

    ...getMiembros().map((m) => ({
      ruta: `/equipo/${m.slug}/`,
      titulo: m.name,
      seccion: 'Equipo',
      editable: { coleccion: 'equipo', slug: m.slug },
    })),
  ];

  return NextResponse.json({
    sitio: SITE.url,
    generado: new Date().toISOString(),
    total: paginas.length,
    paginas,
  });
}
