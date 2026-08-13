import { NextResponse, type NextRequest } from 'next/server';

/**
 * Paso 1 del inicio de sesión del panel: redirige a GitHub.
 *
 * Decap CMS abre esta ruta en una ventana emergente. Aquí solo la mandamos a
 * GitHub con los permisos que necesita; GitHub luego devuelve al usuario a
 * /api/callback con un código temporal.
 *
 * Existe porque el flujo OAuth de Decap está pensado para Netlify. Al estar
 * en Vercel, hospedamos nosotros mismos las dos rutas y así no dependemos de
 * ningún servicio externo para entrar al panel.
 */

// Necesita ejecutarse en cada petición: genera un `state` aleatorio distinto.
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_ID;

  if (!clientId) {
    /*
     * Diagnóstico de la configuración.
     *
     * Solo expone NOMBRES de variables, nunca valores, para poder distinguir
     * los tres motivos por los que esto falla:
     *   - la variable no se guardó
     *   - se guardó con el nombre mal escrito
     *   - se guardó pero no para el entorno de producción, o no se
     *     redesplegó después (Vercel solo las inyecta al desplegar)
     */
    const nombresGithub = Object.keys(process.env)
      .filter((k) => k.toUpperCase().includes('GITHUB'))
      .sort();

    return NextResponse.json(
      {
        error:
          'Falta la variable de entorno GITHUB_OAUTH_ID. Configúrala en Vercel.',
        diagnostico: {
          GITHUB_OAUTH_ID: process.env.GITHUB_OAUTH_ID ? 'definida' : 'NO definida',
          GITHUB_OAUTH_SECRET: process.env.GITHUB_OAUTH_SECRET
            ? 'definida'
            : 'NO definida',
          entorno: process.env.VERCEL_ENV ?? 'desconocido',
          variablesConGithubEnElNombre: nombresGithub,
          commitDesplegado:
            process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'desconocido',
        },
        ayuda:
          'Si "variablesConGithubEnElNombre" sale vacío, las variables no llegaron a este despliegue: guárdalas marcando Production y vuelve a desplegar. Si aparece algún nombre parecido pero distinto, es un error de escritura.',
      },
      { status: 500 },
    );
  }

  // `state` protege contra CSRF: GitHub nos lo devuelve tal cual y lo
  // comprobamos en el callback.
  const state = crypto.randomUUID();

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', clientId);
  // `repo` es el permiso mínimo para que el panel pueda escribir el contenido.
  authorizeUrl.searchParams.set('scope', 'repo,user');
  authorizeUrl.searchParams.set('state', state);
  authorizeUrl.searchParams.set(
    'redirect_uri',
    new URL('/api/callback', request.url).toString(),
  );

  const response = NextResponse.redirect(authorizeUrl);

  response.cookies.set('decap_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600, // 10 minutos: de sobra para iniciar sesión.
  });

  return response;
}
