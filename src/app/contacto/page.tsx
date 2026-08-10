import type { Metadata } from 'next';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import { SERVICES, SITE, waLink } from '@/lib/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

import { PageHero } from '@/components/sections/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Contacto | Agencia Digital en CDMX | Mika',
  description:
    'Escríbenos por WhatsApp al +52 55 7495 7155 o a contacto@mikadigitalagency.com. Cotizamos tu proyecto de diseño web, SEO o branding sin compromiso.',
  path: '/contacto/',
});

const CRUMBS = [
  { name: 'Inicio', path: '/' },
  { name: 'Contacto', path: '/contacto/' },
];

export default function ContactoPage() {
  return (
    <>
      <PageHero
        badge="Contacto"
        title="Cuéntanos qué necesitas"
        intro="La forma más rápida de llegar a nosotros es WhatsApp: normalmente respondemos el mismo día hábil. Elige el tema y te escribimos con el contexto ya cargado."
        breadcrumbs={CRUMBS}
      />

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="container-mika">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            {/* Atajos de WhatsApp por tema */}
            <div>
              <h2 className="text-[20px] font-medium tracking-tight text-gray-900 sm:text-[24px]">
                ¿Sobre qué quieres platicar?
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-gray-600">
                Cada botón abre WhatsApp con el mensaje ya escrito. Solo dale
                enviar y añade lo que quieras.
              </p>

              <ul className="mt-8 space-y-3">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <a
                      href={waLink(
                        `Hola Mika, me interesa el servicio de ${service.name}. ¿Me pueden dar más información?`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 p-5 transition-colors duration-500 hover:border-brand-500 sm:p-6"
                    >
                      <span>
                        <span className="block text-[16px] font-medium text-gray-900 sm:text-[17px]">
                          {service.name}
                        </span>
                        <span className="mt-1 block text-[13px] text-gray-500 sm:text-[14px]">
                          {service.tagline}
                        </span>
                      </span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25D366] transition-transform duration-500 ease-roll group-hover:scale-110">
                        <MessageCircle
                          size={18}
                          className="fill-white text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </li>
                ))}

                <li>
                  <a
                    href={waLink('Hola Mika, tengo un proyecto distinto y quisiera platicarlo con ustedes.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 p-5 transition-colors duration-500 hover:border-brand-500 sm:p-6"
                  >
                    <span>
                      <span className="block text-[16px] font-medium text-gray-900 sm:text-[17px]">
                        Otra cosa
                      </span>
                      <span className="mt-1 block text-[13px] text-gray-500 sm:text-[14px]">
                        Video, podcast, fotografía, sistemas a la medida o algo
                        que no está en la lista.
                      </span>
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25D366] transition-transform duration-500 ease-roll group-hover:scale-110">
                      <MessageCircle
                        size={18}
                        className="fill-white text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Datos de contacto */}
            <aside className="rounded-2xl bg-[#F5F5F5] p-6 sm:p-8 lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-[20px] font-medium tracking-tight text-gray-900">
                Datos de contacto
              </h2>

              <ul className="mt-6 space-y-5">
                <li>
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 transition-colors hover:text-brand-500"
                  >
                    <MessageCircle
                      size={18}
                      className="mt-0.5 shrink-0 text-brand-500"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-[13px] text-gray-500">
                        WhatsApp
                      </span>
                      <span className="text-[16px] font-medium text-gray-900">
                        {SITE.phone}
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={`tel:+${SITE.phoneRaw}`}
                    className="flex items-start gap-3.5 transition-colors hover:text-brand-500"
                  >
                    <Phone
                      size={18}
                      className="mt-0.5 shrink-0 text-brand-500"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-[13px] text-gray-500">
                        Teléfono
                      </span>
                      <span className="text-[16px] font-medium text-gray-900">
                        {SITE.phone}
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-start gap-3.5 transition-colors hover:text-brand-500"
                  >
                    <Mail
                      size={18}
                      className="mt-0.5 shrink-0 text-brand-500"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-[13px] text-gray-500">
                        Correo
                      </span>
                      <span className="break-all text-[16px] font-medium text-gray-900">
                        {SITE.email}
                      </span>
                    </span>
                  </a>
                </li>

                <li className="flex items-start gap-3.5">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-brand-500"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-[13px] text-gray-500">
                      Ubicación
                    </span>
                    <span className="text-[16px] font-medium text-gray-900">
                      {SITE.address.city}, {SITE.address.countryName}
                    </span>
                    <span className="mt-1 block text-[13px] text-gray-500">
                      Trabajamos de forma remota con clientes en toda la
                      República, Estados Unidos y Canadá.
                    </span>
                  </span>
                </li>

                <li className="flex items-start gap-3.5">
                  <Clock
                    size={18}
                    className="mt-0.5 shrink-0 text-brand-500"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-[13px] text-gray-500">
                      Horario
                    </span>
                    <span className="text-[16px] font-medium text-gray-900">
                      Lunes a viernes, 9:00 – 18:00
                    </span>
                    <span className="mt-1 block text-[13px] text-gray-500">
                      Hora de Ciudad de México (GMT-6)
                    </span>
                  </span>
                </li>
              </ul>

              <div className="mt-8 border-t border-gray-300 pt-6">
                <p className="text-[13px] text-gray-500">Síguenos</p>
                <div className="mt-2 flex gap-4 text-[14px]">
                  <a
                    href={SITE.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-900 underline-offset-4 hover:text-brand-500 hover:underline"
                  >
                    Instagram
                  </a>
                  <a
                    href={SITE.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-900 underline-offset-4 hover:text-brand-500 hover:underline"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: `${SITE.url}/contacto/`,
          mainEntity: { '@id': `${SITE.url}/#organization` },
        }}
      />
    </>
  );
}
