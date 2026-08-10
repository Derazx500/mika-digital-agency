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
    return NextResponse.json(
      {
        error:
          'Falta la variable de entorno GITHUB_OAUTH_ID. Configúrala en Vercel.',
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
