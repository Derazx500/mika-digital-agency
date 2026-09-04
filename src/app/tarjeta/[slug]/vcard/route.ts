import { getMiembro, getMiembros } from '@/lib/team';
import { construirVCard } from '@/lib/vcard';

/**
 * El archivo de contacto de cada tarjeta digital.
 *
 * Se sirve como archivo real y no como un `blob:` generado en el navegador
 * porque Safari en iOS trata mal las descargas desde blob — y el iPhone es
 * justo donde más se van a escanear estas tarjetas. Una URL de verdad la abre
 * la agenda sin preguntar nada raro.
 *
 * Se genera en el build (no en cada visita) porque los datos vienen de
 * archivos del repositorio: no hay nada que calcular en caliente.
 */

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getMiembros().map((m) => ({ slug: m.slug }));
}

export async function GET(
  _peticion: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const miembro = getMiembro(slug);

  if (!miembro) {
    return new Response('No encontrado', { status: 404 });
  }

  // El nombre del archivo es lo que ve la persona al guardarlo, así que lleva
  // el nombre real. Se limpia de acentos y espacios para no depender de cómo
  // interprete cada navegador un nombre de archivo con caracteres especiales.
  const archivo = miembro.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-');

  return new Response(construirVCard(miembro), {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${archivo}.vcf"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
