# Estrategia de posicionamiento — Mika Digital Agency

## Cómo leer este documento

**No hay cifras de volumen de búsqueda aquí, y es a propósito.** Los volúmenes se obtienen de herramientas de pago (Ahrefs, Semrush) o del Keyword Planner de Google, y poner números inventados sería peor que no poner ninguno: tomarías decisiones sobre datos falsos.

Lo que sí hay es un orden de prioridad basado en **intención de compra** —qué tan cerca está de contratar quien escribe esa búsqueda— y en el **panorama de competencia real** que se revisó al construir estas páginas.

### Validar los volúmenes (gratis, 20 minutos)

1. Crea una cuenta en [Google Ads](https://ads.google.com) (no hace falta gastar).
2. **Herramientas → Planificador de palabras clave → Descubrir palabras clave**.
3. Pega las palabras clave de la tabla de abajo, con ubicación **México** e idioma **español**.
4. Anota volumen y competencia en la última columna de este documento.

Repítelo cada 6 meses: las búsquedas cambian.

---

## El principio detrás de la estructura

**Una página por intención de búsqueda, no una por servicio.**

Quien busca *«diseño web»* y quien busca *«crear tienda en línea»* son personas distintas, con problemas, presupuestos y urgencias distintas. Si las dos búsquedas caen en la misma página, esa página tiene que hablarles a ambas y acaba sin convencer a ninguna — y Google, que mide si la gente vuelve atrás, la baja para las dos.

Por eso el sitio pasó de 3 a 10 landings de servicio: cada una responde una pregunta concreta.

---

## Mapa de palabras clave

Ordenadas por cercanía a la compra. Las de arriba convierten más aunque se busquen menos.

### Nivel 1 — Intención transaccional

Quien busca esto ya decidió contratar; solo está eligiendo a quién.

| Palabra clave objetivo | Página | Por qué |
| --- | --- | --- |
| crear tienda en línea México | [/servicios/tienda-en-linea/](../src/lib/services.ts) | Nadie busca esto por curiosidad. Además es el ticket más alto. |
| cuánto cuesta una página web en México | [/precios/](../src/lib/pricing.ts) y el artículo del blog | Buscar precio es el último paso antes de pedir cotización. |
| agencia de diseño web CDMX | /servicios/diseno-web/ | Búsqueda local con intención de contratar. |
| desarrollo de software a la medida México | /servicios/desarrollo-de-software/ | Poco volumen, ticket muy alto y competencia baja. |
| tarjetas de presentación digitales | /servicios/tarjetas-de-presentacion-digitales/ | Nicho joven, competencia mayormente de plataformas sin diseño propio. |

### Nivel 2 — Intención comercial

Está comparando opciones y todavía no sabe si contrata o lo hace por su cuenta.

| Palabra clave objetivo | Página | Por qué |
| --- | --- | --- |
| agencia SEO México / posicionamiento web | /servicios/posicionamiento-seo/ | Muy competida, pero es servicio recurrente: un cliente vale meses. |
| producción de video corporativo CDMX | /servicios/produccion-de-video/ | Local y con ticket medio-alto. |
| agencia de social media CDMX | /servicios/social-media/ | Muy competida. Vale por el ingreso recurrente. |
| fotografía de producto México | /servicios/fotografia-profesional/ | Puerta de entrada natural hacia tienda en línea. |
| diseño de logotipo / identidad de marca | /servicios/diseno-grafico-branding/ | Suele ser el primer servicio que contrata un negocio nuevo. |
| producción de podcast México | /servicios/produccion-de-podcast/ | Competencia baja, categoría en crecimiento. |

### Nivel 3 — Intención informativa

Todavía no compra, pero si le resuelves la duda te recuerda. Es el trabajo del blog.

Cada artículo se escribe para una búsqueda concreta y enlaza a la landing que le corresponde. Esa es la función del blog: atraer a quien todavía no compra y pasarle la autoridad a la página que sí vende.

| Tema | Landing a la que apunta | Estado |
| --- | --- | --- |
| cuánto cuesta una página web en México | /servicios/diseno-web/ | ✅ publicado |
| cómo elegir una agencia de diseño web | /servicios/diseno-web/ | ✅ publicado |
| SEO local / aparecer en Google Maps | /servicios/posicionamiento-seo/ | ✅ publicado |
| cuánto cuesta el SEO en México | /servicios/posicionamiento-seo/ | ✅ publicado |
| por qué mi página no aparece en Google | /servicios/posicionamiento-seo/ | ✅ publicado |
| cuánto cuesta una tienda en línea | /servicios/tienda-en-linea/ | ✅ publicado |
| Shopify o WooCommerce, cuál conviene | /servicios/tienda-en-linea/ | ✅ publicado |
| cuánto cuesta un logo en México | /servicios/diseno-grafico-branding/ | ✅ publicado |
| qué es una tarjeta de presentación digital | /servicios/tarjetas-de-presentacion-digitales/ | ✅ publicado |
| cuánto cuesta un video corporativo | /servicios/produccion-de-video/ | ✅ publicado |
| cómo hacer fotos de producto que vendan | /servicios/fotografia-profesional/ | ✅ publicado |
| cómo aparecer en ChatGPT y respuestas con IA | /servicios/posicionamiento-seo/ | ✅ publicado |

**Sin cubrir todavía** (por orden de interés):

| Tema | Landing a la que apuntaría |
| --- | --- |
| cuánto cuesta manejar redes sociales al mes | /servicios/social-media/ |
| cuánto cuesta producir un podcast | /servicios/produccion-de-podcast/ |
| WordPress o desarrollo a la medida | /servicios/desarrollo-de-software/ |
| por qué mi página web es lenta | /servicios/diseno-web/ |

> **Antes de escribir uno nuevo, comprueba que no compita con los de arriba.** Dos artículos atacando la misma búsqueda se restan entre sí. Si el tema ya está tocado, amplía el que existe y actualiza su campo *Fecha de última revisión*: Google la usa como señal de frescura.

---

## Panorama de competencia

Lo que se encontró al revisar cada categoría, y de dónde salen los precios de referencia del sitio.

**Tienda en línea.** Rango de mercado: $25,000 a $150,000 MXN. Muchos competidores publican guías de precios pero pocos tienen una landing dedicada a *crear tienda en línea* con precio visible. Ahí hay hueco.
Fuentes: [Shortway](https://shortway.com.mx/cuanto-cuesta/tienda-en-linea), [Atémpora](https://atempora.studio/blog/como-crear-tienda-en-linea-mexico), [Panamerik](https://panamerik.com/cuanto-cuesta-crear-tienda-linea-mexico-rangos/)

**Video corporativo.** Básico $15,000–$35,000; intermedio $35,000–$80,000; premium más de $80,000. Compiten productoras especializadas, no agencias digitales — la ventaja de Mika es ofrecerlo junto con el sitio web.
Fuentes: [Publicidad y Video](https://publicidadyvideo.com.mx/cuanto-cuesta-producir-un-video-corporativo-profesional-en-mexico/), [Plug Group](https://pluggroup.com.mx/produccion-de-video/), [Filmmen](https://filmmen.com/video-corporativo-cdmx/)

**Podcast.** Mercado poco maduro: estudios por hora (~$550 MXN) y paquetes de lanzamiento. Casi nadie ofrece producción integral con distribución y fragmentos para redes.
Fuentes: [Sala Podcast](https://salapodcast.com/servicio-podcast-agencias/), [Shore Studio](https://www.shorestudio.mx/), [In House Work](https://inhousework.mx/en/studio/)

**Tarjetas de presentación digitales.** El mercado ronda los $500 a $1,700 MXN. La competencia vende una plataforma con plantillas a las que solo se les cambia el color; ninguna vende diseño de marca propio. Ahí está la diferencia de Mika.

---

## Qué hacer ahora

En orden de impacto:

1. **Enviar las 10 landings a indexar.** Search Console → Inspección de URLs → *Solicitar indexación*, una por una. Acelera semanas el primer rastreo.
2. **Validar volúmenes** en Keyword Planner y reordenar prioridades con datos reales.
3. **Escribir los casos de estudio.** Nueve de las doce fichas de portafolio siguen con texto de relleno; las tres de 2026 ya están redactadas. Google premia el contenido único y los clientes deciden leyendo resultados concretos.
4. **Subir las imágenes del portafolio.** Es lo que más resta hoy en la página que usas para vender.
5. **Google Business Profile al 100% y pedir reseñas.** Para las búsquedas locales —*agencia de diseño web CDMX*— pesa más que cualquier cosa del sitio.
6. **Subir las portadas de los artículos nuevos.** Los nueve publicados en agosto apuntan a un archivo en `/public/images/blog/` que todavía no existe; mientras tanto se muestra un degradado con el título. La lista de nombres exactos está en el README.
7. **Escalonar la publicación si lo prefieres.** Los nueve artículos nuevos salieron con la misma fecha. Si quieres que el blog parezca —y sea— un calendario constante, cambia la fecha de algunos desde el panel o márcalos como borrador y ve publicando uno por semana.

---

## Cómo añadir una landing nueva

Todo el contenido vive en [`src/lib/services.ts`](../src/lib/services.ts). Añadir una entrada al array genera la página completa: URL, `<title>`, meta descripción, H1, entregables, proceso, precios, FAQ, datos estructurados, enlaces internos y entrada en el sitemap.

Antes de crear una, comprueba que **no compita con una existente**. Dos páginas atacando la misma búsqueda se restan entre sí: Google elige una, casi nunca la que tú querías, y la otra queda muerta. Si dudas, es mejor ampliar la página que ya existe.
