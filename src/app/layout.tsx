import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

import { GoogleAnalytics } from '@next/third-parties/google';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFab } from '@/components/ui/WhatsAppFab';
import { WhatsAppTracking } from '@/components/analytics/WhatsAppTracking';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema } from '@/lib/seo';
import { SITE } from '@/lib/site';

// DM Sans es la tipografía que ya usaba la marca. next/font la descarga en
// build y la auto-hospeda, así que no hay petición a Google en producción
// (mejor privacidad y un origen menos que resolver: LCP más rápido).
const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Mika Digital Agency | Diseño Web y SEO en CDMX',
    // Las páginas internas rellenan %s y heredan el sufijo de marca.
    template: '%s | Mika Digital Agency',
  },
  description:
    'Agencia digital en CDMX especializada en diseño web, posicionamiento SEO y branding. Creamos sitios rápidos que posicionan y venden. Cotiza por WhatsApp.',
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: true, address: true, email: true },
  alternates: { canonical: SITE.url },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
  },
  /*
   * Verificación de propiedad en Google Search Console.
   *
   * Genera <meta name="google-site-verification"> en todas las páginas.
   * El token es público por diseño: va en el HTML para que Google lo lea, no
   * da acceso a nada y no es un secreto.
   *
   * Esto verifica la propiedad de tipo "prefijo de URL". La de tipo
   * "Dominio" —que es la que cubre www, sin www y todos los subdominios— se
   * verifica con un registro TXT en el DNS; está explicado en el README.
   */
  verification: {
    google: 'DxgNLUUlTcfZPj4grRwsPtDbZXubWzc2XbFrLUag6tc',
  },

  // El icono se toma de src/app/icon.svg (convención de Next). Sustitúyelo por
  // el isotipo real de Mika y se propaga a la pestaña del navegador.
};

export const viewport: Viewport = {
  themeColor: '#0167f3',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={SITE.lang} className={dmSans.variable}>
      <body className="font-sans">
        {/* Salto directo al contenido: accesibilidad para teclado y lectores. */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-[14px] focus:text-white"
        >
          Saltar al contenido
        </a>

        <Navbar />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppFab />

        {/* Schema de organización: se declara una vez y vale para todo el sitio. */}
        <JsonLd data={organizationSchema()} />

        {/*
          Analytics solo en producción: así las pruebas en local y los
          despliegues de previsualización no ensucian las estadísticas.

          GoogleAnalytics de @next/third-parties carga el script de forma
          diferida, después de que la página sea usable, para que medir no
          penalice la velocidad —que sí es factor de posicionamiento—.
        */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <GoogleAnalytics gaId={SITE.analyticsId} />
            <WhatsAppTracking />
          </>
        )}
      </body>
    </html>
  );
}
