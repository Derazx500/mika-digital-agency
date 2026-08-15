# Mika Digital Agency — sitio web

**Next.js 15 · React 19 · TypeScript · Tailwind CSS 3.4 · Decap CMS**

Sitio de la agencia con panel de administración propio: se publican artículos y proyectos desde `/admin` y el sitio se actualiza solo.

---

## Índice

1. [Arrancar en local](#arrancar-en-local)
2. [Puesta en marcha (una sola vez)](#puesta-en-marcha-una-sola-vez)
3. [Cómo publicar contenido](#cómo-publicar-contenido)
4. [Qué falta](#qué-falta)
5. [Dónde se edita cada cosa](#dónde-se-edita-cada-cosa)
6. [Lo que se hizo por SEO](#lo-que-se-hizo-por-seo)
7. [Detalles técnicos](#detalles-técnicos)

---

## Arrancar en local

```bash
npm install
```

```bash
npm run dev
```

Abre <http://localhost:3000>.

Para probar el panel en local sin tocar GitHub, en otra terminal:

```bash
npx decap-server
```

Y entra a <http://localhost:3000/admin>. Los cambios se guardan directo en tus archivos.

---

## Puesta en marcha (una sola vez)

Son cuatro pasos. Después de esto, publicar contenido no requiere a ningún programador.

### 1. Subir el código a GitHub

Crea un repositorio **privado** en GitHub llamado `mika-digital-agency` y luego:

```bash
git add -A; git commit -m "Sitio web de Mika Digital Agency"
```

```bash
git remote add origin https://github.com/Derazx500/mika-digital-agency.git; git push -u origin main
```

### 2. Conectar Vercel

1. Entra a [vercel.com](https://vercel.com) con tu cuenta de GitHub.
2. **Add New → Project** e importa el repositorio.
3. Vercel detecta Next.js solo. Dale **Deploy**.
4. En **Settings → Domains**, agrega `mikadigitalagency.com` y `www.mikadigitalagency.com`. Vercel te dice qué registros DNS cambiar.

> El plan gratuito de Vercel cubre de sobra un sitio como este.

### 3. Crear la aplicación OAuth de GitHub

Esto es lo que permite entrar al panel. En <https://github.com/settings/developers> → **New OAuth App**:

| Campo | Valor |
| --- | --- |
| Application name | `Mika CMS` |
| Homepage URL | `https://mikadigitalagency.com` |
| Authorization callback URL | `https://mikadigitalagency.com/api/callback` |

> **Sin `www`.** Vercel tiene el dominio corto como principal y redirige `www` hacia él. GitHub solo acepta una URL de callback y exige coincidencia exacta: si la registras con `www`, el login falla con *redirect_uri mismatch*.

Copia el **Client ID**, genera un **Client Secret** y ponlos en Vercel (**Settings → Environment Variables**):

- `GITHUB_OAUTH_ID` → el Client ID
- `GITHUB_OAUTH_SECRET` → el Client Secret

Vuelve a desplegar para que tomen efecto.

### 4. Apuntar el panel a tu repositorio

Ya está hecho: [`public/admin/config.yml`](public/admin/config.yml) apunta a `Derazx500/mika-digital-agency`. Solo cámbialo si le pones otro nombre al repositorio.

Entra a `https://mikadigitalagency.com/admin`.

> **Para dar acceso a Deraz** (o a quien sea): invítalo como colaborador del repositorio en GitHub. Con eso ya puede entrar al panel con su propia cuenta. No necesita saber nada de código ni de GitHub.

---

## Cómo publicar contenido

### Desde el panel — el modo normal

1. Entra a `/admin` e inicia sesión con GitHub.
2. **Artículos del blog** o **Proyectos del portafolio** → *New*.
3. Rellena los campos y escribe. Las imágenes se suben arrastrándolas.
4. **Publish**.

En un minuto está en vivo. El sitemap, la fecha, el tiempo de lectura y los datos estructurados se generan solos.

**Trucos del editor:**

- El botón de **cita** (`"`) crea las cajas destacadas azules.
- Al insertar una imagen, lo que escribas en el campo **título** se convierte en el pie de foto.
- El campo **descripción de la portada** describe la imagen para Google y para lectores de pantalla. Describe lo que se ve, no escribas "imagen del blog".
- El interruptor **Borrador** lo deja invisible hasta que lo actives.

### Desde archivos — si prefieres

Crea un `.md` en `content/blog/` o `content/proyectos/` copiando el frontmatter de uno existente. Es exactamente lo mismo que escribe el panel.

---

## Qué falta

El código está terminado. Lo que sigue es material tuyo. Mientras falte, el sitio se ve bien igual: las imágenes que no existan se sustituyen por un degradado azul con el nombre del proyecto.

### 1. Logotipo — ✅ instalado

`public/logo/mika-logo.png` (356 × 78 px). Se ve nítido en retina.

**Mejora opcional:** deja el vectorial en `public/logo/mika-logo.svg` y cambia la constante `SRC` en [`src/components/ui/Logo.tsx`](src/components/ui/Logo.tsx).

El favicon también es el tuyo, pero pesa 269 KB — vale la pena regenerarlo a 32 × 32 px.

### 2. Imágenes del blog — ✅ instaladas

Los siete gráficos son SVG propios con tu identidad, en `public/images/blog/`. Pesan pocos KB, se ven nítidos a cualquier tamaño y explican el contenido mejor que una foto de stock genérica.

Si prefieres fotos, súbelas desde el panel y sustituye la portada: no hay que tocar código.

### 3. Imágenes del portafolio — ⬜ pendientes

En `public/images/portafolio/`, o súbelas desde el panel al editar cada proyecto:

| Formato de tarjeta | Medida |
| --- | --- |
| Apaisada | 1320 × 990 px |
| Cuadrada | 1200 × 1200 px |

Nombres esperados: `cia-escenicas-lurvik`, `cobi-education`, `cqda`, `corporativo-fumix`, `essenzuoils`, `maitreya`, `arauz`, `be74`, `miekki` (`.webp`).

### 4. Fotos del estudio y del equipo — ⬜ pendientes

- `public/images/about/estudio-1.webp` — 1314 × 1038 px
- `public/images/about/estudio-2.webp` — 1800 × 1200 px
- `public/images/team/deraz.webp` — 1200 × 900 px
- `public/images/team/juan-dom.webp` — 1200 × 900 px

### 5. Imagen para redes (Open Graph) — ⬜ pendiente

`public/og/og-default.jpg` — **1200 × 630 px**. Es lo que se ve al compartir el sitio por WhatsApp.

### 6. Revisar antes de publicar

- **Precios** ([`src/lib/pricing.ts`](src/lib/pricing.ts)): las cifras son una referencia de mercado, no tus costos reales.
- **Testimonios** ([`src/lib/projects.ts`](src/lib/projects.ts)): los recuperé de tu sitio anterior. Solo el primero decía explícitamente de quién era; los otros tres los asocié por el orden en que aparecían. **Verifica que cada frase sea de la persona correcta.**
- **Casos de estudio**: los nueve proyectos tienen el texto marcado como `PENDIENTE`. Escribirlos desde el panel es lo que más va a convertir.
- **Aviso de privacidad**: revísalo con tu contador y completa el domicilio fiscal.
- **Redes sociales** ([`src/lib/site.ts`](src/lib/site.ts)): las URLs de LinkedIn y Behance son supuestas. Corrígelas o bórralas.

---

## Archivos sueltos para compartir

Lo que se deja en `public/` se publica tal cual en internet. Por ejemplo, el menú de Bamboo House está en `public/bamboohouse/BambooHouse-Menu.pdf` y se comparte como:

```
https://mikadigitalagency.com/bamboohouse/BambooHouse-Menu.pdf
```

Esa carpeta se sirve con la cabecera `X-Robots-Tag: noindex`, definida en [`next.config.mjs`](next.config.mjs), para que no aparezca en Google: el material de un cliente colgando del dominio de la agencia confunde a Google sobre de qué trata el sitio.

> Se usa la cabecera y **no** una regla en `robots.txt` a propósito. `robots.txt` impide *rastrear*, no *indexar*: si alguien enlaza el PDF desde otro sitio, Google puede listarlo igualmente —solo la URL, sin descripción— justo porque tiene prohibido entrar a leer la instrucción de no indexar. Dejándolo rastreable pero con `noindex`, Google lo descarga, ve la cabecera y lo excluye de verdad.

Para añadir otro archivo así: déjalo en `public/loquesea/` y, si tampoco debe indexarse, añade su ruta al bloque `headers()` de `next.config.mjs`.

Evita espacios y acentos en los nombres de archivo. Las mayúsculas funcionan, pero la URL pasa a distinguirlas: `/BambooHouse-Menu.pdf` y `/bamboohouse-menu.pdf` son direcciones distintas, y quien la escriba a mano acabará en un 404. Si el enlace se va a teclear o dictar, en minúsculas es más seguro.

## Dónde se edita cada cosa

| Qué | Dónde | Quién |
| --- | --- | --- |
| Artículos del blog | `/admin` → Artículos | Cualquiera |
| Proyectos del portafolio | `/admin` → Proyectos | Cualquiera |
| Teléfono, correo, redes, menú | [`src/lib/site.ts`](src/lib/site.ts) | Programador |
| Textos y FAQs de los 3 servicios | [`src/lib/site.ts`](src/lib/site.ts) | Programador |
| Paquetes y precios | [`src/lib/pricing.ts`](src/lib/pricing.ts) | Programador |
| Testimonios | [`src/lib/projects.ts`](src/lib/projects.ts) | Programador |
| Preguntas frecuentes generales | [`src/lib/faqs.ts`](src/lib/faqs.ts) | Programador |
| Colores de marca | [`tailwind.config.ts`](tailwind.config.ts) | Programador |

**Cambiar el número de WhatsApp** = una línea (`phoneRaw` en `site.ts`) y se actualiza en los 40+ botones del sitio.

> Si quieres que los servicios y los precios también se editen desde el panel, se pueden mover a `/content` igual que el blog. Es un rato de trabajo; dime si te interesa.

---

## Lo que se hizo por SEO

El sitio anterior tenía `<title>mika - digital agency</title>` y la meta descripción **vacía**. Esto es lo que cambia:

**Técnico**

- Una URL por palabra clave: `/servicios/diseno-web/`, `/servicios/posicionamiento-seo/`, `/servicios/diseno-grafico-branding/`, `/precios/`.
- `<title>` y meta descripción escritos a mano en cada página, dentro del largo que Google muestra.
- URL canónica absoluta en todas las páginas.
- `sitemap.xml` y `robots.txt` generados automáticamente, con `/admin` y `/api` excluidos.
- Un solo `<h1>` por página, con la keyword.
- HTML pre-generado: Google recibe el contenido completo sin ejecutar JavaScript.

**Datos estructurados (JSON-LD)**

- `Organization` + `ProfessionalService` con dirección, teléfono y catálogo de servicios.
- `Service` en cada landing, con precio de entrada.
- `FAQPage` en home, servicios y precios — puede ganar espacio extra en el resultado de Google.
- `BreadcrumbList` en todas las internas.
- `BlogPosting` con imagen en cada artículo.

**Contenido**

- 3 landings de servicio con FAQ propia.
- Página de precios (*cuánto cuesta una página web en México* es de las búsquedas con más intención de compra del sector).
- 3 artículos atacando keywords reales.
- Enlazado interno entre servicios, blog y portafolio.

### Qué tienes que hacer tú después de publicar

1. **Google Search Console** — verifica el dominio y envía `https://mikadigitalagency.com/sitemap.xml`. Detalle abajo.
2. **Google Analytics 4** — crea la propiedad y pásame el ID de medición para insertarlo.
3. **Google Business Profile** — complétalo al 100%. Para una agencia local es lo que más mueve la aguja; está explicado en el artículo de SEO local del blog.
4. **Reseñas** — pídelas a tus últimos clientes satisfechos.
5. **Redirecciones 301** — si alguna URL del sitio viejo tiene visitas, hay que redirigirla o pierdes ese tráfico. Pásame la lista y te dejo las reglas.

---

## Google Search Console

Hay dos tipos de propiedad y no son equivalentes:

| Tipo | Qué cubre | Cómo se verifica |
| --- | --- | --- |
| **Dominio** | `www`, sin `www`, http, https y **todos los subdominios** | registro TXT en el DNS |
| Prefijo de URL | solo la variante exacta que registres | meta etiqueta, archivo HTML, Analytics |

**Usa la de Dominio.** Si registras solo `https://mikadigitalagency.com`, las visitas que lleguen por `www` cuentan como otra propiedad distinta y ves los datos partidos a la mitad.

### Verificar la propiedad de Dominio

En **cPanel de HostGator → Editor de Zona DNS**, añade:

| Campo | Valor |
| --- | --- |
| Tipo | `TXT` |
| Nombre / Host | `@` (o `mikadigitalagency.com`) |
| Valor | `google-site-verification=DxgNLUUlTcfZPj4grRwsPtDbZXubWzc2XbFrLUag6tc` |
| TTL | `14400` (el que venga por defecto) |

Tarda de minutos a unas horas en propagarse. Después, botón **Verificar** en Search Console.

> El DNS sigue gestionándose en HostGator aunque el sitio esté en Vercel: allí solo se cambiaron los registros `A` y `CNAME`. **No toques los `MX`**, que son el correo.

La meta etiqueta también está puesta en [`src/app/layout.tsx`](src/app/layout.tsx) (`metadata.verification.google`) como respaldo para la propiedad de prefijo de URL.

### Después de verificar

1. **Sitemaps** → envía `sitemap.xml`.
2. **Inspección de URLs** → pega la home y dale a *Solicitar indexación*. Repite con las tres páginas de servicio y la de precios: acelera el primer rastreo.
3. Los datos tardan **2 o 3 días** en aparecer. Es normal que el primer día esté vacío.

### Qué mirar cada mes

- **Rendimiento** → filtra por *Consultas* para ver por qué búsquedas apareces. Las que tienen muchas impresiones y pocos clics son las que hay que trabajar: ya te ve gente, pero el título no convence.
- **Indexación → Páginas** → confirma que las 29 URLs estén indexadas y revisa las excluidas.
- **Experiencia → Core Web Vitals** → debería estar en verde; si algo se pone en rojo, suele ser una imagen pesada recién subida.

> Search Console te dice **cómo te encuentran en Google**. Lo que hace la gente ya dentro del sitio lo mide Analytics, que es aparte y está explicado abajo.

## Google Analytics 4

Instalado con el ID `G-6YD2E6YQ6B`, definido en [`src/lib/site.ts`](src/lib/site.ts) (`analyticsId`).

Detalles de cómo está montado:

- **Solo carga en producción.** Las pruebas en local y los despliegues de previsualización no ensucian las estadísticas.
- Usa `@next/third-parties`, que carga el script **después** de que la página sea usable. Medir no debe penalizar la velocidad, que sí es factor de posicionamiento.
- El ID es público: viaja en el HTML y no da acceso a los informes.

### Evento de conversión: `contacto_whatsapp`

Cada clic a WhatsApp se registra como el evento **`contacto_whatsapp`**, con dos datos:

| Parámetro | Para qué sirve |
| --- | --- |
| `pagina` | Desde qué página escribieron. Revela qué contenido convierte. |
| `boton` | Qué botón usaron: el flotante, el del hero, el de un paquete… |

Está en [`WhatsAppTracking.tsx`](src/components/analytics/WhatsAppTracking.tsx) como un único escuchador de clics a nivel de documento, en vez de un manejador por botón. Así cubre los más de 40 enlaces a WhatsApp del sitio y los que se añadan después, sin tocar ningún componente.

**Márcalo como conversión** en Analytics: *Administrar → Eventos → `contacto_whatsapp` → Marcar como evento clave*. A partir de ahí, los informes te dicen qué páginas y qué canales traen clientes de verdad, no solo visitas.

> Si Google te ofrece *"Use the Google tag found on your website"*, **no la elijas**: esa etiqueta era del sitio anterior en HostGator y ya no existe. Hay que instalarla en el código, que es lo que está hecho aquí.

## Detalles técnicos

- **Contenido en el sistema de archivos.** Los artículos y proyectos son Markdown con frontmatter en `/content`, leídos con `gray-matter` y compilados con `next-mdx-remote` durante el build. No hay base de datos ni servicio externo que pueda caerse o subir de precio.
- **Autenticación del panel.** Decap CMS usa el backend de GitHub. Como su flujo OAuth está pensado para Netlify, el proxy va incluido aquí mismo en [`src/app/api/auth`](src/app/api/auth/route.ts) y [`src/app/api/callback`](src/app/api/callback/route.ts), con verificación anti-CSRF por cookie.
- **Hero con shaders WebGL** (paquete `shaders`): se carga aparte del bundle principal para no frenar la primera pantalla, y si el navegador no soporta WebGL cae en un degradado CSS equivalente.
- **Tipografía DM Sans** auto-hospedada con `next/font` — sin peticiones a Google Fonts.
- **Accesibilidad:** enlace de salto al contenido, foco visible, `aria-*` en menús y respeto a `prefers-reduced-motion`.

### Volver a HostGator

Se puede, pero **pierdes el panel y el despliegue automático**: ambos necesitan rutas de servidor que un hosting compartido no ejecuta. Si aun así hiciera falta, en [`next.config.mjs`](next.config.mjs) están comentadas las dos líneas que reactivan el export estático, y la configuración de Apache está guardada en [`docs/htaccess-hostgator.txt`](docs/htaccess-hostgator.txt) — hay que renombrarla a `.htaccess` y subirla a la raíz de `public_html`.

> Está fuera de `public/` a propósito: todo lo que hay en esa carpeta se publica tal cual en internet, y un archivo de configuración del servidor no tiene por qué ser legible por cualquiera.

### Si el sitio despliega pero todas las páginas dan 404

Síntoma: los archivos de `/images/` y `/logo/` responden, pero ninguna página existe. Significa que Vercel publicó solo la carpeta `public/` y descartó el build de Next.js.

Se arregla en **Settings → Build and Deployment**: *Framework Preset* debe ser **Next.js** y el override de *Output Directory* debe estar **desactivado**. El [`vercel.json`](vercel.json) de la raíz ya lo fija desde el repositorio para que no vuelva a pasar.

> `vercel.json` no admite comentarios: su esquema rechaza cualquier propiedad que no reconozca, incluidas las claves `"//"` que se usan como truco en otros JSON. Si el build falla con *"should NOT have additional property"*, es eso.
