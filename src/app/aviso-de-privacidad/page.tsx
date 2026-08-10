import type { Metadata } from 'next';

import { SITE } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';

export const metadata: Metadata = buildMetadata({
  title: 'Aviso de Privacidad',
  description:
    'Aviso de privacidad de Mika Digital Agency conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
  path: '/aviso-de-privacidad/',
  // Las páginas legales no aportan al posicionamiento y diluyen el sitio.
  noIndex: true,
});

const CRUMBS = [
  { name: 'Inicio', path: '/' },
  { name: 'Aviso de privacidad', path: '/aviso-de-privacidad/' },
];

export default function AvisoPage() {
  return (
    <>
      <PageHero
        badge="Legal"
        title="Aviso de privacidad"
        breadcrumbs={CRUMBS}
      />

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="container-mika">
          {/* NOTA: es una base conforme a la LFPDPPP. Antes de publicar,
              revísalo con tu contador o abogado y completa el domicilio
              fiscal completo, que la ley pide de forma explícita. */}
          <div className="max-w-[46rem] space-y-5 text-[16px] leading-[1.75] text-gray-700">
            <p>
              <strong className="font-semibold text-gray-900">{SITE.name}</strong>,
              con domicilio en {SITE.address.city}, {SITE.address.countryName}, es
              responsable del tratamiento de sus datos personales conforme a la
              Ley Federal de Protección de Datos Personales en Posesión de los
              Particulares.
            </p>

            <h2 className="pt-6 text-[22px] font-medium tracking-tight text-gray-900">
              Datos que recabamos
            </h2>
            <p>
              Recabamos únicamente los datos que usted nos proporciona de forma
              voluntaria al contactarnos: nombre, correo electrónico, número
              telefónico y la información sobre su proyecto que decida
              compartirnos.
            </p>

            <h2 className="pt-6 text-[22px] font-medium tracking-tight text-gray-900">
              Para qué los usamos
            </h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-brand-500">
              <li>Responder a su solicitud de información o cotización.</li>
              <li>Prestar los servicios contratados y darles seguimiento.</li>
              <li>Emitir comprobantes fiscales cuando corresponda.</li>
              <li>
                Enviarle información sobre nuestros servicios, únicamente si nos
                dio su consentimiento.
              </li>
            </ul>

            <h2 className="pt-6 text-[22px] font-medium tracking-tight text-gray-900">
              Transferencia de datos
            </h2>
            <p>
              No vendemos ni compartimos sus datos personales con terceros para
              fines comerciales. Solo los compartimos con proveedores de
              servicios necesarios para operar (por ejemplo, hosting o correo
              electrónico), que están obligados a protegerlos.
            </p>

            <h2 className="pt-6 text-[22px] font-medium tracking-tight text-gray-900">
              Derechos ARCO
            </h2>
            <p>
              Usted puede en cualquier momento solicitar el Acceso,
              Rectificación, Cancelación u Oposición al tratamiento de sus datos
              personales, así como revocar su consentimiento. Para ello escriba a{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-brand-500 underline underline-offset-4"
              >
                {SITE.email}
              </a>{' '}
              indicando su nombre completo y la solicitud concreta. Le
              responderemos en un plazo máximo de 20 días hábiles.
            </p>

            <h2 className="pt-6 text-[22px] font-medium tracking-tight text-gray-900">
              Cookies
            </h2>
            <p>
              Este sitio puede utilizar cookies propias y de terceros con fines
              analíticos, para entender cómo se navega y mejorarlo. Puede
              desactivarlas desde la configuración de su navegador sin que ello
              afecte el uso del sitio.
            </p>

            <h2 className="pt-6 text-[22px] font-medium tracking-tight text-gray-900">
              Cambios a este aviso
            </h2>
            <p>
              Cualquier modificación a este aviso de privacidad se publicará en
              esta misma página. Le recomendamos revisarla periódicamente.
            </p>

            <p className="pt-6 text-[14px] text-gray-500">
              Última actualización: agosto de 2026.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
