import type { Metadata } from 'next';

import { getAllProjects, getSectoresConProyectos } from '@/lib/projects';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

import { PageHero } from '@/components/sections/PageHero';
import { PortafolioFiltrado } from '@/components/sections/PortafolioFiltrado';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBand } from '@/components/sections/CtaBand';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Portafolio de Proyectos Web y Branding | Mika',
  description:
    'Casos de estudio de diseño web, e-commerce, SEO y branding para clientes en México y el extranjero. Mira lo que hemos construido en Mika Digital Agency.',
  path: '/portafolio/',
});

const CRUMBS = [
  { name: 'Inicio', path: '/' },
  { name: 'Portafolio', path: '/portafolio/' },
];

export default function PortafolioPage() {
  const projects = getAllProjects();
  const sectores = getSectoresConProyectos();

  return (
    <>
      <PageHero
        badge="Portafolio"
        title="Proyectos que ya están trabajando para sus dueños"
        intro={`Desde ${SITE.founded} hemos entregado más de 30 proyectos entre sitios web, tiendas en línea e identidades de marca. Estos son algunos.`}
        breadcrumbs={CRUMBS}
      />

      <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24">
        <div className="container-mika">
          <PortafolioFiltrado proyectos={projects} sectores={sectores} />
        </div>
      </section>

      <Testimonials number="2" />

      <CtaBand
        title="¿Tu proyecto es el siguiente?"
        message="Hola Mika, vi su portafolio y quiero platicarles mi proyecto."
      />

      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Portafolio de Mika Digital Agency',
          url: `${SITE.url}/portafolio/`,
          hasPart: projects.map((p) => ({
            '@type': 'CreativeWork',
            name: p.name,
            url: `${SITE.url}/portafolio/${p.slug}/`,
            about: p.industry,
            dateCreated: p.year,
          })),
        }}
      />
    </>
  );
}
