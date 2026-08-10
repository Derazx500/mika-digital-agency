/** @type {import('next').NextConfig} */

/*
 * El sitio se despliega en Vercel, que es lo que hace posible el panel de
 * administración: al publicar desde /admin se escribe en el repositorio y
 * Vercel recompila y publica solo.
 *
 * PARA VOLVER A HOSTGATOR (export estático):
 *   1. Descomenta `output: 'export'` y `images.unoptimized`.
 *   2. Ten en cuenta que se pierden el panel /admin y el despliegue
 *      automático, porque ambos necesitan las rutas de servidor.
 */
const nextConfig = {
  // output: 'export',
  // images: { unoptimized: true },

  // URLs con barra final, coherentes con lo que ya está indexado.
  trailingSlash: true,

  reactStrictMode: true,

  // El paquete `shaders` publica ESM moderno; Next lo transpila para el bundle.
  transpilePackages: ['shaders'],

  // El panel vive como HTML estático en public/admin/. Sin esta regla, entrar
  // a /admin daría 404: Next solo sirve la ruta exacta del archivo.
  async rewrites() {
    return [{ source: '/admin', destination: '/admin/index.html' }];
  },
};

export default nextConfig;
