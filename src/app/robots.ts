import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

// Con `output: 'export'` hay que declarar explícitamente que esta ruta se
// genera en build; si no, Next asume que es dinámica y falla la compilación.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Ni el panel de administración ni las rutas internas aportan nada al
        // índice de Google, y el panel además no debe ser público.
        disallow: ['/_next/', '/admin', '/api/'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
