/**
 * Inyecta datos estructurados JSON-LD.
 *
 * El contenido lo generamos nosotros en /lib/seo.ts, nunca viene del usuario,
 * por eso `dangerouslySetInnerHTML` es seguro aquí. Es la forma que recomienda
 * Next.js para schema.org en el App Router.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
