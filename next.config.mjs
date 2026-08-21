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
  /*
   * Archivos que se sirven pero no deben aparecer en Google.
   *
   * Se usa la cabecera X-Robots-Tag y NO una regla en robots.txt, aunque
   * parezca lo obvio. Motivo: robots.txt impide *rastrear*, no *indexar*.
   * Si alguien enlaza el PDF desde otro sitio, Google puede listarlo igual
   * (solo la URL, sin descripción) precisamente porque tiene prohibido
   * entrar a leer la instrucción de no indexar.
   *
   * Dejándolo rastreable pero con noindex, Google lo descarga, ve la
   * cabecera y lo excluye del índice de verdad.
   */
  async headers() {
    return [
      {
        /*
         * Cabeceras de seguridad para todo el sitio.
         *
         * Estaban en el .htaccess de HostGator y se perdieron al migrar a
         * Vercel, que no lee ese archivo. Aquí se reponen:
         *
         * - nosniff: impide que el navegador adivine el tipo de un archivo
         *   e interprete como script algo que no lo es.
         * - SAMEORIGIN: evita que terceros incrusten el sitio en un iframe
         *   para superponer botones invisibles (clickjacking).
         * - Referrer-Policy: al salir hacia otro dominio manda solo el
         *   origen, no la URL completa que estaba viendo el visitante.
         */
        source: '/:ruta*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
      {
        source: '/bamboohouse/:archivo*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          // El menú cambia de vez en cuando: una hora de caché evita servir
          // una versión vieja durante días si lo actualizan.
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        /*
         * El servicio se llamaba "tarjetas digitales NFC" y cambió de nombre
         * al no ser NFC. La URL vieja se redirige de forma permanente para
         * no dejar en 404 a quien la tenga enlazada o indexada, y para que
         * Google transfiera lo poco o mucho que hubiera acumulado.
         */
        source: '/servicios/tarjetas-digitales-nfc/',
        destination: '/servicios/tarjetas-de-presentacion-digitales/',
        permanent: true,
      },
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
