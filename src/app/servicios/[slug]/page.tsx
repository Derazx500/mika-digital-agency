import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpRight, Check } from 'lucide-react';

import { getService, SERVICES, waLink } from '@/lib/site';
import { BRANDING_PLANS, RETAINER_PLANS, WEB_PLANS, type Plan } from '@/lib/pricing';
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  serviceSchema,
} from '@/lib/seo';

import { PageHero } from '@/components/sections/PageHero';
import { ServiceVisual } from '@/components/sections/ServiceVisual';
import { PlanCard } from '@/components/sections/PlanCard';
import { Faq } from '@/components/sections/Faq';
import { CtaBand } from '@/components/sections/CtaBand';
import { Testimonials } from '@/components/sections/Testimonials';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { TextRollButton } from '@/components/ui/TextRollButton';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';

/** Necesario para el export estático: pre-genera una carpeta por servicio. */
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/servicios/${service.slug}/`,
  });
}

/** Cada servicio muestra los paquetes que le corresponden. */
const PLANS_BY_SERVICE: Record<string, Plan[]> = {
  'diseno-web': WEB_PLANS,
  'posicionamiento-seo': RETAINER_PLANS,
  'diseno-grafico-branding': BRANDING_PLANS,
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const plans = PLANS_BY_SERVICE[service.slug] ?? [];
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios/' },
    { name: service.name, path: `/servicios/${service.slug}/` },
  ];

  return (
    <>
      <PageHero
        badge={service.name}
        title={service.h1}
        intro={service.tagline}
        breadcrumbs={crumbs}
      >
        <TextRollButton
          href={waLink(
            `Hola Mika, me interesa el servicio de ${service.name}. ¿Me pueden cotizar?`,
          )}
          external
          variant="brand"
        >
          Cotizar por WhatsApp
        </TextRollButton>
      </PageHero>

      {/* Ilustración del servicio. No todas las landings tienen una todavía;
          las que no, simplemente pasan directo a la siguiente sección. */}
      <section className="bg-white pb-12 sm:pb-16">
        <div className="container-mika">
          <ServiceVisual slug={service.slug} />
        </div>
      </section>

      {/* Qué incluye */}
      <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24">
        <div className="container-mika">
          <SectionBadge
            number="1"
            label="Qué incluye"
            tone="gray"
            className="mb-6 sm:mb-8"
          />

          <h2 className="h-section mb-10 max-w-3xl text-gray-900 sm:mb-14">
            Todo lo que recibes al contratar {service.name.toLowerCase()}
          </h2>

          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {service.deliverables.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 50}>
                <div className="flex items-start gap-3 rounded-xl bg-white p-4 sm:p-5">
                  <Check
                    size={17}
                    className="mt-0.5 shrink-0 text-brand-500"
                    aria-hidden="true"
                  />
                  <span className="text-[14px] leading-[1.5] text-gray-800 sm:text-[15px]">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Proceso */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-mika">
          <SectionBadge number="2" label="Cómo trabajamos" className="mb-6 sm:mb-8" />

          <h2 className="h-section mb-10 max-w-3xl text-gray-900 sm:mb-14">
            Un proceso que ya recorrimos más de 30 veces
          </h2>

          <ol className="border-t border-gray-200">
            {service.process.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i * 60}>
                <div className="grid gap-3 border-b border-gray-200 py-6 sm:grid-cols-[64px_minmax(0,20rem)_1fr] sm:gap-8 sm:py-8">
                  <span className="text-[13px] font-semibold text-brand-500">
                    {step.step}
                  </span>
                  <h3 className="text-[18px] font-medium tracking-tight text-gray-900 sm:text-[20px]">
                    {step.title}
                  </h3>
                  <p className="max-w-2xl text-[14px] leading-[1.6] text-gray-600 sm:text-[15px]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Paquetes */}
      {plans.length > 0 && (
        <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24">
          <div className="container-mika">
            <SectionBadge
              number="3"
              label="Paquetes y precios"
              tone="gray"
              className="mb-6 sm:mb-8"
            />

            <h2 className="h-section mb-10 max-w-3xl text-gray-900 sm:mb-14">
              Precios de entrada, sin letras chiquitas
            </h2>

            <ul className="grid gap-5 sm:gap-6 lg:grid-cols-3">
              {plans.map((plan, i) => (
                <Reveal as="li" key={plan.name} delay={i * 90}>
                  <PlanCard plan={plan} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Testimonials number="4" />

      <Faq
        faqs={[...service.faqs]}
        number="5"
        label={`Dudas sobre ${service.name.toLowerCase()}`}
        title={`Preguntas frecuentes sobre ${service.name.toLowerCase()}`}
        tone="gray"
      />

      {/* Servicios relacionados: enlazado interno, clave para repartir
          autoridad entre las landings y que Google las encuentre todas. */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-mika">
          <h2 className="mb-8 text-[20px] font-medium tracking-tight text-gray-900 sm:text-[24px]">
            También te puede servir
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2">
            {service.related.map((relatedSlug) => {
              const related = getService(relatedSlug);
              if (!related) return null;
              return (
                <li key={related.slug}>
                  <Link
                    href={`/servicios/${related.slug}/`}
                    className="group flex items-start justify-between gap-4 rounded-2xl border border-gray-200 p-6 transition-colors duration-500 hover:border-brand-500"
                  >
                    <span>
                      <span className="block text-[17px] font-semibold text-gray-900 sm:text-[19px]">
                        {related.name}
                      </span>
                      <span className="mt-2 block text-[14px] leading-[1.55] text-gray-600">
                        {related.tagline}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={19}
                      className="mt-1 shrink-0 text-brand-500 transition-transform duration-500 ease-roll group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`¿Hablamos de tu proyecto de ${service.name.toLowerCase()}?`}
        message={`Hola Mika, quiero información sobre ${service.name}.`}
      />

      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.description,
          slug: service.slug,
          priceFrom: service.priceFrom,
        })}
      />
      <JsonLd data={faqSchema([...service.faqs])} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
