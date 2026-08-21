import type { Metadata } from 'next';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { SITE, STATS } from '@/lib/site';
import { getMiembros } from '@/lib/team';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

import { PageHero } from '@/components/sections/PageHero';
import { Stats } from '@/components/sections/Stats';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBand } from '@/components/sections/CtaBand';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { Thumb } from '@/components/ui/Thumb';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Sobre Nosotros | Agencia Digital en CDMX | Mika',
  description:
    'Somos una agencia digital de Ciudad de México fundada en 2020. Diseño web, SEO y branding con un equipo pequeño que trabaja directo contigo, sin intermediarios.',
  path: '/nosotros/',
});

const CRUMBS = [
  { name: 'Inicio', path: '/' },
  { name: 'Nosotros', path: '/nosotros/' },
];

const VALUES = [
  {
    title: 'Hablas con quien hace el trabajo',
    body: 'No hay ejecutivo de cuenta ni teléfono descompuesto. Tratas directo con quien diseña y programa tu proyecto.',
  },
  {
    title: 'Precio cerrado y por escrito',
    body: 'Cotizamos el alcance completo antes de empezar. Si algo cambia, lo hablamos antes; nunca aparece en la factura final.',
  },
  {
    title: 'Todo queda a tu nombre',
    body: 'Dominio, hosting y archivos originales son tuyos. Firmamos cesión de derechos. Nadie se queda con tu marca de rehén.',
  },
  {
    title: 'Diseño con una razón detrás',
    body: 'Cada decisión visual responde a un objetivo de negocio. Si no podemos explicar por qué algo está ahí, lo quitamos.',
  },
];

export default function NosotrosPage() {
  const equipo = getMiembros();

  return (
    <>
      <PageHero
        badge="Nosotros"
        title="Una agencia pequeña, con la que de verdad puedes hablar"
        intro={`Mika nació en ${SITE.founded} en Ciudad de México. Desde entonces hemos entregado más de 30 proyectos para clientes en México, Estados Unidos y Canadá.`}
        breadcrumbs={CRUMBS}
      />

      {/* Historia */}
      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="container-mika">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="overflow-hidden rounded-2xl bg-gray-100">
              <div className="aspect-[4/3]">
                <Thumb
                  src="/images/about/estudio-2.webp"
                  alt="El equipo de Mika Digital Agency en su estudio de Ciudad de México."
                  label="Mika Digital Agency"
                  priority
                />
              </div>
            </div>

            <div className="max-w-xl">
              <h2 className="h-section text-gray-900">
                Más que una agencia: tus aliados
              </h2>
              <div className="mt-6 space-y-4 text-[16px] leading-[1.7] text-gray-600">
                <p>
                  Empezamos en {SITE.founded} siendo dos: un diseñador y un
                  programador que estaban cansados de ver proyectos buenos
                  arruinados por procesos malos. Esa sigue siendo la idea.
                </p>
                <p>
                  Trabajamos con marcas que están creciendo y necesitan que su
                  presencia digital deje de ser un pendiente. No hacemos sitios
                  bonitos que nadie visita: hacemos sitios que la gente encuentra
                  en Google, entiende en cinco segundos y desde los que te
                  escribe.
                </p>
                <p>
                  Somos pequeños a propósito. Eso significa que tomamos menos
                  proyectos, pero cada uno lo hace gente con nombre y apellido
                  que conoces desde la primera llamada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stats />

      {/* Valores */}
      <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24">
        <div className="container-mika">
          <SectionBadge
            number="1"
            label="Cómo trabajamos"
            tone="gray"
            className="mb-6 sm:mb-8"
          />

          <h2 className="h-section mb-10 max-w-3xl text-gray-900 sm:mb-14">
            Cuatro reglas que no negociamos
          </h2>

          <ul className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {VALUES.map((value, i) => (
              <Reveal as="li" key={value.title} delay={i * 80}>
                <div className="h-full rounded-2xl bg-white p-6 sm:p-8">
                  <h3 className="text-[18px] font-semibold tracking-tight text-gray-900 sm:text-[20px]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-gray-600">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Equipo */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-mika">
          <SectionBadge number="2" label="El equipo" className="mb-6 sm:mb-8" />

          <h2 className="h-section mb-10 max-w-3xl text-gray-900 sm:mb-14">
            Quién va a trabajar en tu proyecto
          </h2>

          <ul className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {equipo.map((persona, i) => (
              <Reveal as="li" key={persona.slug} delay={i * 90}>
                <Link href={`/equipo/${persona.slug}/`} className="group block">
                  <div className="overflow-hidden rounded-2xl bg-gray-100">
                    <div className="aspect-[4/5] sm:aspect-[4/3]">
                      <Thumb
                        src={persona.photo}
                        alt={`${persona.name}, ${persona.role} en Mika Digital Agency.`}
                        label={persona.name}
                        className="transition-transform duration-700 ease-roll group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                  <h3 className="mt-5 text-[19px] font-semibold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-brand-500 sm:text-[21px]">
                    {persona.name}
                  </h3>
                  <p className="text-[14px] text-brand-500">{persona.role}</p>
                  <p className="mt-3 max-w-md text-[15px] leading-[1.6] text-gray-600">
                    {persona.shortBio}
                  </p>
                  <span className="mt-3 flex items-center gap-1.5 text-[14px] font-medium text-brand-500">
                    Ver su perfil
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-500 ease-roll group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials number="3" />

      <CtaBand
        title="¿Trabajamos juntos?"
        message="Hola Mika, leí sobre ustedes y me gustaría platicar un proyecto."
      />

      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          url: `${SITE.url}/nosotros/`,
          about: { '@id': `${SITE.url}/#organization` },
          mainEntity: {
            '@id': `${SITE.url}/#organization`,
            employee: equipo.map((persona) => ({
              '@type': 'Person',
              name: persona.name,
              jobTitle: persona.role,
              url: `${SITE.url}/equipo/${persona.slug}/`,
            })),
          },
        }}
      />
    </>
  );
}
