import Link from 'next/link';
import type { Metadata } from 'next';

import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/sections/About';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { Stats } from '@/components/sections/Stats';
import { Testimonials } from '@/components/sections/Testimonials';
import { PlanCard } from '@/components/sections/PlanCard';
import { Faq } from '@/components/sections/Faq';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { TextRollButton } from '@/components/ui/TextRollButton';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';

import { getFeaturedProjects } from '@/lib/projects';
import { WEB_PLANS } from '@/lib/pricing';
import { HOME_FAQS } from '@/lib/faqs';
import { buildMetadata, faqSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  // 58 caracteres: entra completo en el resultado de Google.
  title: 'Agencia de Diseño Web y SEO en CDMX | Mika Digital',
  description:
    'Agencia digital en CDMX. Diseño web, posicionamiento SEO y branding para marcas que quieren crecer. Sitios rápidos que posicionan y venden. Cotiza por WhatsApp.',
  path: '/',
});

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <Hero />
      <About number="1" />
      <ServicesGrid number="2" />

      {/* Proyectos destacados */}
      <section className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
        <div className="container-mika">
          <SectionBadge
            number="3"
            label="Trabajo destacado"
            tone="gray"
            className="mb-6 sm:mb-8"
          />

          <h2 className="h-display mb-10 text-gray-900 sm:mb-14 lg:mb-16">
            Nuestros proyectos
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:gap-7">
            {featuredProjects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                priority={i === 0}
                variant={i % 2 === 0 ? 'light' : 'dark'}
              />
            ))}
          </div>

          <div className="mt-12 sm:mt-14">
            <TextRollButton href="/portafolio/" variant="dark">
              Ver todo el portafolio
            </TextRollButton>
          </div>
        </div>
      </section>

      <Stats />
      <Testimonials number="4" />

      {/* Resumen de precios */}
      <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-28">
        <div className="container-mika">
          <SectionBadge
            number="5"
            label="Precios claros"
            tone="gray"
            className="mb-6 sm:mb-8"
          />

          <h2 className="h-section mb-4 max-w-3xl text-gray-900">
            Sabes cuánto cuesta antes de escribirnos.
          </h2>

          <p className="mb-12 max-w-2xl text-[15px] leading-[1.65] text-gray-600 sm:mb-16 sm:text-[16px]">
            Publicamos nuestros precios de entrada porque creemos que perder el
            tiempo de nadie es parte del buen servicio. La cotización final
            siempre es cerrada y por escrito.
          </p>

          <ul className="grid gap-5 sm:gap-6 lg:grid-cols-3">
            {WEB_PLANS.map((plan, i) => (
              <Reveal as="li" key={plan.name} delay={i * 90}>
                <PlanCard plan={plan} />
              </Reveal>
            ))}
          </ul>

          <p className="mt-8 text-[14px] text-gray-600">
            ¿Buscas SEO mensual o identidad de marca?{' '}
            <Link
              href="/precios/"
              className="font-medium text-brand-500 underline-offset-4 hover:underline"
            >
              Ver todos los paquetes y precios
            </Link>
            .
          </p>
        </div>
      </section>

      <Faq faqs={[...HOME_FAQS]} number="6" />

      {/* El schema FAQPage debe declarar las mismas preguntas que se ven en
          pantalla; si no coinciden, Google lo ignora o penaliza. */}
      <JsonLd data={faqSchema([...HOME_FAQS])} />
    </>
  );
}
