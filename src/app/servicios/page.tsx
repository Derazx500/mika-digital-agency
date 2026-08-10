import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { CtaBand } from '@/components/sections/CtaBand';
import { Faq } from '@/components/sections/Faq';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, buildMetadata, faqSchema } from '@/lib/seo';
import { HOME_FAQS } from '@/lib/faqs';

export const metadata: Metadata = buildMetadata({
  title: 'Servicios de Diseño Web, SEO y Branding | Mika',
  description:
    'Diseño y desarrollo web, posicionamiento SEO, branding, video, podcast y más. Todos los servicios digitales de Mika Digital Agency, con precios desde.',
  path: '/servicios/',
});

const CRUMBS = [
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios/' },
];

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        badge="Servicios"
        title="Todo lo que tu marca necesita para crecer en digital"
        intro="Nos especializamos en diseño web, posicionamiento SEO y branding. Alrededor de esos tres pilares cubrimos el resto, para que trates con un solo equipo y no con cinco proveedores."
        breadcrumbs={CRUMBS}
      />

      <ServicesGrid number="1" />

      <Faq faqs={[...HOME_FAQS]} number="2" tone="gray" />

      <CtaBand message="Hola Mika, vi sus servicios y quiero cotizar un proyecto." />

      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd data={faqSchema([...HOME_FAQS])} />
    </>
  );
}
