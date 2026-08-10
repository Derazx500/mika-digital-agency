import { type NextRequest } from 'next/server';

/**
 * Paso 2 del inicio de sesión del panel: canjea el código por un token.
 *
 * GitHub devuelve aquí un código temporal. Lo cambiamos por un token de
 * acceso usando el secreto de la aplicación —que nunca sale del servidor— y
 * se lo pasamos a Decap CMS por `postMessage`, que es el protocolo que espera
 * la ventana emergente.
 */

export const dynamic = 'force-dynamic';

/** Respuesta HTML que le entrega el resultado a la ventana que abrió el popup. */
function postMessageResponse(
  status: 'success' | 'error',
  content: unknown,
  httpStatus = 200,
) {
  // El mensaje va como JSON dentro de una cadena con el prefijo que Decap
  // espera: 'authorization:github:success:{...}'.
  const payload = JSON.stringify(content);

  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Autenticando…</title></head>
<body style="font-family:system-ui;padding:2rem;color:#0a0a0a">
<p>${status === 'success' ? 'Sesión iniciada. Puedes cerrar esta ventana.' : 'No se pudo iniciar sesión.'}</p>
<script>
(function () {
  function send() {
    window.opener.postMessage(
      'authorization:github:${status}:' + ${JSON.stringify(payload)},
      window.location.origin
    );
  }
  // Decap avisa cuando está listo para recibir; respondemos entonces.
  window.addEventListener('message', send, false);
  if (window.opener) {
    window.opener.postMessage('authorizing:github', '*');
  }
})();
</script>
</body></html>`;

  return new Response(html, {
    status: httpStatus,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_ID;
  const clientSecret = process.env.GITHUB_OAUTH_SECRET;

  if (!clientId || !clientSecret) {
    return postMessageResponse(
      'error',
      { message: 'Faltan GITHUB_OAUTH_ID o GITHUB_OAUTH_SECRET en Vercel.' },
      500,
    );
  }

  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const expectedState = request.cookies.get('decap_oauth_state')?.value;

  if (!code) {
    return postMessageResponse('error', { message: 'GitHub no devolvió código.' }, 400);
  }

  // Comprobación anti-CSRF: el `state` tiene que ser el que emitimos nosotros.
  if (!state || !expectedState || state !== expectedState) {
    return postMessageResponse(
      'error',
      { message: 'La verificación de seguridad falló. Vuelve a intentarlo.' },
      400,
    );
  }

  const tokenResponse = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    },
  );

  const data = (await tokenResponse.json()) as {
    access_token?: string;
    error_description?: string;
  };

  if (!data.access_token) {
    return postMessageResponse(
      'error',
      { message: data.error_description ?? 'GitHub no devolvió un token.' },
      401,
    );
  }

  return postMessageResponse('success', {
    token: data.access_token,
    provider: 'github',
  });
}
