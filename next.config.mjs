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

  /*
   * El panel es HTML estático en public/admin/. Next sirve el archivo exacto
   * (/admin/index.html) pero no la carpeta (/admin/), así que hace falta
   * mandar ahí a quien escriba solo /admin.
   *
   * OJO: tiene que ser `redirects`, NO `rewrites`. Con un rewrite, Next busca
   * el destino entre las rutas de la aplicación, no lo encuentra y cae al
   * Pages Router, que exige un _document inexistente: el build revienta con
   * "Cannot find module for page: /_document". Una redirección solo devuelve
   * un 308 al navegador y no resuelve nada del lado del servidor.
   */
  async redirects() {
    return [
      {
        // Con `trailingSlash: true`, Next ya redirige /admin a /admin/ antes
        // de mirar esta tabla. Por eso el origen lleva la barra final: si se
        // pone sin ella, esta regla nunca llega a aplicarse.
        source: '/admin/',
        destination: '/admin/index.html',
        permanent: false, // 307: por si algún día el panel cambia de sitio.
      },
    ];
  },
};

export default nextConfig;
