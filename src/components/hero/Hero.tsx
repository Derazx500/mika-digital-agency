'use client';

import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import { SITE, waLink } from '@/lib/site';
import { ShaderFallback } from '@/components/hero/ShaderBackground';

/**
 * El shader es pesado y solo tiene sentido en el navegador, así que se carga
 * aparte del bundle principal. Mientras llega, se ve el degradado CSS: el
 * usuario nunca percibe un hueco en blanco y el LCP no se castiga.
 */
const ShaderBackground = dynamic(
  () => import('@/components/hero/ShaderBackground').then((m) => m.ShaderBackground),
  { ssr: false, loading: () => <ShaderFallback /> },
);

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#EFEFEF]">
      <ShaderBackground />

      {/* Espaciador: empuja el contenido al fondo del viewport */}
      <div className="flex-1" />

      <div className="container-mika relative z-20 pb-14 sm:pb-16 lg:pb-20">
        <p className="mb-5 text-[13px] tracking-wide text-gray-900 sm:mb-8 sm:text-[14px]">
          {SITE.name} — {SITE.address.city}
        </p>

        {/* Único H1 de la home. Lleva la keyword principal: "agencia de diseño web". */}
        <h1 className="h-display max-w-[19ch] text-gray-900 sm:max-w-none">
          Agencia de diseño web y SEO
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          para marcas que quieren
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          dejar de pasar desapercibidas.
        </h1>

        <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5">
          {/* CTA principal: WhatsApp, con animación text-roll */}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-brand-500 py-2 pl-5 pr-2 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-brand-600 sm:pl-6 sm:text-[14px]"
          >
            <span className="flex h-[20px] flex-col overflow-hidden">
              <span className="transition-transform duration-500 ease-roll group-hover:-translate-y-1/2">
                <span className="block">Iniciar un proyecto</span>
                <span className="block" aria-hidden="true">
                  Iniciar un proyecto
                </span>
              </span>
            </span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white transition-transform duration-500 ease-roll group-hover:-rotate-45 sm:h-8 sm:w-8">
              <ArrowRight className="text-brand-500" size={15} aria-hidden="true" />
            </span>
          </a>

          <TrustBadge />
        </div>
      </div>
    </section>
  );
}

/**
 * Insignia de confianza. Muestra datos reales de la agencia (proyectos
 * entregados y año de fundación) en lugar de una certificación inventada.
 */
function TrustBadge() {
  return (
    <div className="inline-flex w-fit items-center gap-2.5 rounded-[4px] bg-white px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:gap-3 sm:px-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="h-5 w-5 shrink-0 fill-current text-brand-500 sm:h-6 sm:w-6"
        aria-hidden="true"
      >
        <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
      </svg>

      <span className="text-[13px] font-medium text-gray-900 sm:text-[14px]">
        30+ proyectos entregados
      </span>

      <span className="rounded bg-ink px-1.5 py-0.5 text-[10px] text-white sm:px-2 sm:text-[11px]">
        Desde {SITE.founded}
      </span>
    </div>
  );
}
