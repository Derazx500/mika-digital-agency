import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpRight, Check } from 'lucide-react';

import { getService, SERVICES, waLink } from '@/lib/site';
import {
  BRANDING_PLANS,
  ECOMMERCE_PLANS,
  NFC_PLANS,
  RETAINER_PLANS,
  WEB_PLANS,
  type Plan,
} from '@/lib/pricing';
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  serviceSchema,
} from '@/lib/seo';

import { PageHero } from '@/components/sections/PageHero';
import { LandingHero } from '@/components/sections/LandingHero';
import { Beneficios } from '@/components/sections/Beneficios';
import { Galeria } from '@/components/sections/Galeria';
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
  'tienda-en-linea': ECOMMERCE_PLANS,
  'tarjetas-digitales-nfc': NFC_PLANS,
};

/** Juegos de paquetes referenciados desde la configuración de landing. */
const PLANES_POR_CLAVE: Record<string, Plan[]> = {
  web: WEB_PLANS,
  seo: RETAINER_PLANS,
  branding: BRANDING_PLANS,
  ecommerce: ECOMMERCE_PLANS,
  nfc: NFC_PLANS,
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

  const landing = service.landing;
  const planesLanding = landing ? PLANES_POR_CLAVE[landing.planes] : null;

  /*
   * Numeración de las secciones.
   *
   * Se declara de forma explícita en vez de con un contador porque la landing
   * añade tres secciones antes de las de siempre; con números fijos, la
   * página quedaría numerada 1, 2, 3, 1, 2, 3 y se leería como un error.
   */
  const num = landing
    ? {
        beneficios: '1',
        galeria: '2',
        paquetes: '3',
        incluye: '4',
        proceso: '5',
        resenas: '6',
        faq: '7',
      }
    : {
        beneficios: '',
        galeria: '',
        paquetes: '3',
        incluye: '1',
        proceso: '2',
        resenas: '4',
        faq: '5',
      };

  return (
    <>
      {/*
        Los servicios con `landing` configurada renderizan una cabecera de
        venta —precio visible, prueba social y WhatsApp precargado—; el resto
        usa la cabecera estándar del sitio.
      */}
      {landing ? (
        <LandingHero
          slug={service.slug}
          badge={landing.badge}
          h1={service.h1}
          promesa={landing.promesa}
          pruebas={landing.pruebas}
          precioDesde={service.priceFrom}
          unidadPrecio={service.priceUnit}
          mensajeWhatsApp={landing.mensajeWhatsApp}
          breadcrumbs={crumbs}
        />
      ) : (
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

          <section className="bg-white pb-12 sm:pb-16">
            <div className="container-mika">
              <ServiceVisual slug={service.slug} />
            </div>
          </section>
        </>
      )}

      {/* Beneficios: responde "¿y esto a mí qué me da?" antes de explicar
          nada. Quien llega de un anuncio decide en segundos si sigue. */}
      {landing && (
        <Beneficios
          beneficios={landing.beneficios}
          number={num.beneficios}
          titulo={`Por qué elegir a Mika para ${service.name.toLowerCase()}`}
        />
      )}

      {/* Galería: nadie contrata diseño sin ver diseño. */}
      {landing && (
        <Galeria
          items={landing.galeria}
          number={num.galeria}
          titulo="Así se ve el trabajo"
          intro="Ejemplos de lo que entregamos. Cada proyecto se diseña desde cero para el negocio que lo pide."
          tone="gray"
        />
      )}

      {/* Paquetes con el precio visible y WhatsApp por paquete. */}
      {landing && planesLanding && (
        <section id="paquetes" className="scroll-mt-28 bg-white py-16 sm:py-20 lg:py-24">
          <div className="container-mika">
            <SectionBadge
              number={num.paquetes}
              label="Paquetes y precios"
              className="mb-6 sm:mb-8"
            />
            <h2 className="h-section mb-4 max-w-3xl text-gray-900">
              Elige el que encaje contigo
            </h2>
            <p className="mb-10 max-w-2xl text-[15px] leading-[1.65] text-gray-600 sm:mb-14 sm:text-[16px]">
              Precios de entrada, sin letras chiquitas. La cotización final
              siempre es cerrada y por escrito antes de empezar.
            </p>
            <ul className="grid gap-5 sm:gap-6 lg:grid-cols-3">
              {planesLanding.map((plan, i) => (
                <Reveal as="li" key={plan.name} delay={i * 90}>
                  <PlanCard plan={plan} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Qué incluye */}
      <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24">
        <div className="container-mika">
          <SectionBadge
            number={num.incluye}
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
          <SectionBadge
            number={num.proceso}
            label="Cómo trabajamos"
            className="mb-6 sm:mb-8"
          />

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

      {/* Paquetes (solo cuando no hay landing: esa ya trae los suyos arriba,
          con el precio a la vista desde la cabecera). */}
      {!landing && plans.length > 0 && (
        <section id="paquetes" className="scroll-mt-28 bg-[#F5F5F5] py-16 sm:py-20 lg:py-24">
          <div className="container-mika">
            <SectionBadge
              number={num.paquetes}
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

      {/* Reseñas del propio servicio cuando las hay: una reseña sobre lo
          mismo que se está mirando convence más que un elogio genérico. */}
      <Testimonials
        number={num.resenas}
        servicio={service.slug}
        titulo={
          landing
            ? `Clientes que ya contrataron ${service.name.toLowerCase()}`
            : undefined
        }
      />

      <Faq
        faqs={[...service.faqs]}
        number={num.faq}
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
