import type { MetadataRoute } from 'next';
import { SERVICES, SITE } from '@/lib/site';
import { getAllProjects } from '@/lib/projects';
import { getAllPosts } from '@/lib/posts';

/**
 * Sitemap. Next lo genera en build y lo escribe como /sitemap.xml dentro de
 * la carpeta `out`, así que funciona igual en hosting estático.
 *
 * `priority` y `changeFrequency` son sugerencias que Google ignora en gran
 * medida, pero no estorban. Lo que de verdad importa es que todas las URLs
 * indexables estén aquí y que las envíes en Search Console.
 */
// Igual que robots.ts: obligatorio para el export estático.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { path: '/', priority: 1, freq: 'weekly' as const },
    { path: '/servicios/', priority: 0.9, freq: 'monthly' as const },
    { path: '/portafolio/', priority: 0.8, freq: 'monthly' as const },
    { path: '/precios/', priority: 0.9, freq: 'monthly' as const },
    { path: '/nosotros/', priority: 0.7, freq: 'yearly' as const },
    { path: '/contacto/', priority: 0.8, freq: 'yearly' as const },
    { path: '/blog/', priority: 0.7, freq: 'weekly' as const },
  ];

  return [
    ...staticPages.map((p) => ({
      url: `${SITE.url}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),

    // Las landings de servicio son las páginas que más queremos posicionar.
    ...SERVICES.map((s) => ({
      url: `${SITE.url}/servicios/${s.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),

    ...getAllProjects().map((p) => ({
      url: `${SITE.url}/portafolio/${p.slug}/`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),

    ...getAllPosts().map((post) => ({
      url: `${SITE.url}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
