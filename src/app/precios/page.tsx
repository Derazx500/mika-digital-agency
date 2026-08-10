import type { Metadata } from 'next';

import { BRANDING_PLANS, RETAINER_PLANS, WEB_PLANS } from '@/lib/pricing';
import { breadcrumbSchema, buildMetadata, faqSchema } from '@/lib/seo';

import { PageHero } from '@/components/sections/PageHero';
import { PlanCard } from '@/components/sections/PlanCard';
import { Faq } from '@/components/sections/Faq';
import { CtaBand } from '@/components/sections/CtaBand';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Precios de Diseño Web y SEO en México | Mika',
  description:
    '¿Cuánto cuesta una página web en México? Landing desde $9,500, sitio corporativo desde $18,000, e-commerce desde $35,000 y SEO desde $8,500 al mes. Precios claros.',
  path: '/precios/',
});

const CRUMBS = [
  { name: 'Inicio', path: '/' },
  { name: 'Precios', path: '/precios/' },
];

/**
 * FAQ específica de precios. "cuánto cuesta una página web" es una de las
 * búsquedas más rentables del sector: quien la escribe está a un paso de
 * contratar.
 */
const PRICING_FAQS = [
  {
    q: '¿Los precios que publican son finales?',
    a: 'Son precios de entrada: el mínimo por el que entregamos ese tipo de proyecto bien hecho. El precio final depende del alcance real —número de páginas, funciones, si generamos contenido— y siempre te lo damos cerrado y por escrito antes de empezar. Nunca hay cargos sorpresa.',
  },
  {
    q: '¿Cómo son las formas de pago?',
    a: 'Trabajamos con 50% de anticipo para arrancar y 50% contra entrega. En proyectos grandes lo dividimos en tres o cuatro pagos ligados a etapas. Aceptamos transferencia y facturamos con IVA.',
  },
  {
    q: '¿Por qué el SEO se cobra mensual y no por proyecto?',
    a: 'Porque el posicionamiento no es una tarea que se termina, es un trabajo continuo: Google cambia, tu competencia se mueve y el contenido hay que alimentarlo. Pedimos un mínimo de 4 a 6 meses porque antes de ese plazo no se ven resultados reales, y no queremos cobrarte por algo que aún no puede funcionar.',
  },
  {
    q: '¿Qué pasa si mi proyecto no encaja en ningún paquete?',
    a: 'Es bastante común. Los paquetes son una referencia para que sepas el orden de magnitud; si necesitas algo distinto —un sistema a la medida, una integración, una app— lo cotizamos aparte. Escríbenos por WhatsApp y platicamos.',
  },
  {
    q: '¿El hosting y el dominio están incluidos?',
    a: 'No, y es a propósito: los contratas tú, a tu nombre, para que seas el dueño. Te asesoramos en la elección y lo dejamos todo configurado. El dominio cuesta alrededor de $300 MXN al año y un hosting adecuado desde unos $1,500 MXN al año.',
  },
];

export default function PreciosPage() {
  return (
    <>
      <PageHero
        badge="Precios"
        title="Cuánto cuesta trabajar con nosotros"
        intro="Publicamos nuestros precios de entrada porque hacerte perder el tiempo también es un mal servicio. Así sabes si encajamos antes de escribirnos."
        breadcrumbs={CRUMBS}
      />

      {/* Web */}
      <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24">
        <div className="container-mika">
          <SectionBadge
            number="1"
            label="Diseño y desarrollo web"
            tone="gray"
            className="mb-6 sm:mb-8"
          />
          <h2 className="h-section mb-10 max-w-3xl text-gray-900 sm:mb-14">
            Sitios web
          </h2>
          <ul className="grid gap-5 sm:gap-6 lg:grid-cols-3">
            {WEB_PLANS.map((plan, i) => (
              <Reveal as="li" key={plan.name} delay={i * 90}>
                <PlanCard plan={plan} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* SEO */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-mika">
          <SectionBadge
            number="2"
            label="Posicionamiento SEO"
            className="mb-6 sm:mb-8"
          />
          <h2 className="h-section mb-4 max-w-3xl text-gray-900">
            SEO mensual
          </h2>
          <p className="mb-10 max-w-2xl text-[15px] leading-[1.65] text-gray-600 sm:mb-14 sm:text-[16px]">
            El SEO se cobra por mes porque es un trabajo continuo. Pedimos un
            compromiso mínimo porque antes de ese plazo los resultados
            simplemente no existen todavía.
          </p>
          <ul className="grid gap-5 sm:gap-6 lg:grid-cols-2">
            {RETAINER_PLANS.map((plan, i) => (
              <Reveal as="li" key={plan.name} delay={i * 90}>
                <PlanCard plan={plan} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Branding */}
      <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24">
        <div className="container-mika">
          <SectionBadge
            number="3"
            label="Diseño gráfico y branding"
            tone="gray"
            className="mb-6 sm:mb-8"
          />
          <h2 className="h-section mb-10 max-w-3xl text-gray-900 sm:mb-14">
            Identidad de marca
          </h2>
          <ul className="grid gap-5 sm:gap-6 lg:grid-cols-2">
            {BRANDING_PLANS.map((plan, i) => (
              <Reveal as="li" key={plan.name} delay={i * 90}>
                <PlanCard plan={plan} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Faq
        faqs={PRICING_FAQS}
        number="4"
        label="Dudas sobre precios"
        title="Preguntas frecuentes sobre precios"
      />

      <CtaBand
        title="¿Tu proyecto no encaja en ningún paquete?"
        body="Casi nunca encajan del todo. Cuéntanos qué necesitas y te damos una cotización a la medida, cerrada y por escrito."
        message="Hola Mika, vi sus precios y quiero una cotización a la medida."
      />

      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd data={faqSchema(PRICING_FAQS)} />
    </>
  );
}
