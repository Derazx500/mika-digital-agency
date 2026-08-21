import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';

import { waLink } from '@/lib/site';
import { mxn } from '@/lib/pricing';
import { TextRollButton } from '@/components/ui/TextRollButton';
import { ServiceVisual } from '@/components/sections/ServiceVisual';

/**
 * Cabecera de las landings de servicio.
 *
 * A diferencia del PageHero del resto del sitio, esta está pensada para
 * vender: promesa grande, tres pruebas rápidas, precio visible y el botón de
 * WhatsApp con el mensaje ya escrito.
 *
 * El precio va arriba a propósito. Ocultarlo hasta el final parece que
 * protege la venta, pero lo que hace es que la gente se vaya a buscarlo a
 * otro lado; enseñarlo filtra a quien no tiene presupuesto y da confianza a
 * quien sí.
 *
 * El fondo lleva un degradado radial en azul de marca en vez del shader del
 * hero principal: se ve vivo pero no pelea con el contenido ni descarga
 * WebGL en una página a la que se llega desde un anuncio.
 */
export function LandingHero({
  slug,
  badge,
  h1,
  promesa,
  pruebas,
  precioDesde,
  unidadPrecio,
  mensajeWhatsApp,
  breadcrumbs,
}: {
  slug: string;
  badge: string;
  h1: string;
  /** El subtítulo: qué gana el cliente, en una o dos frases. */
  promesa: string;
  /** Tres datos cortos que dan confianza. */
  pruebas: string[];
  precioDesde: number;
  unidadPrecio?: 'proyecto' | 'mes' | 'pieza';
  mensajeWhatsApp: string;
  breadcrumbs: { name: string; path: string }[];
}) {
  const sufijo =
    unidadPrecio === 'mes' ? ' / mes' : unidadPrecio === 'pieza' ? ' c/u' : ' MXN';

  return (
    <section className="relative overflow-hidden bg-[#F7F9FC] pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
      {/* Fondo: dos focos de color y una retícula muy tenue. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 70% at 12% 0%, rgba(1,103,243,0.14) 0%, rgba(1,103,243,0) 60%), radial-gradient(70% 60% at 95% 20%, rgba(1,103,243,0.10) 0%, rgba(255,255,255,0) 65%)',
        }}
      />

      <div className="container-mika relative">
        <nav aria-label="Ruta de navegación" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-[13px] text-gray-500">
            {breadcrumbs.map((crumb, i) => {
              const ultimo = i === breadcrumbs.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-1">
                  {ultimo ? (
                    <span className="text-gray-900" aria-current="page">
                      {crumb.name}
                    </span>
                  ) : (
                    <>
                      <Link
                        href={crumb.path}
                        className="transition-colors hover:text-gray-900"
                      >
                        {crumb.name}
                      </Link>
                      <ChevronRight size={13} aria-hidden="true" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            {/* Etiqueta con reseñas: prueba social antes del titular. */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-white/80 py-1.5 pl-2 pr-4 backdrop-blur">
              <span className="flex gap-0.5" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className="fill-brand-500 text-brand-500"
                    aria-hidden="true"
                  />
                ))}
              </span>
              <span className="text-[13px] font-medium text-gray-700">
                {badge}
              </span>
            </div>

            <h1 className="h-display max-w-[18ch] text-gray-900">{h1}</h1>

            <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-gray-600 sm:text-[18px]">
              {promesa}
            </p>

            {/* Precio visible desde el principio. */}
            <p className="mt-7 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-[14px] text-gray-500">desde</span>
              <span className="text-[34px] font-medium tracking-[-0.03em] text-gray-900 sm:text-[40px]">
                {mxn(precioDesde)}
              </span>
              <span className="text-[14px] text-gray-500">{sufijo}</span>
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <TextRollButton
                href={waLink(mensajeWhatsApp)}
                external
                variant="brand"
              >
                Quiero cotizar ahora
              </TextRollButton>
              <a
                href="#paquetes"
                className="text-[14px] font-medium text-gray-600 underline-offset-4 transition-colors hover:text-brand-500 hover:underline"
              >
                Ver los paquetes
              </a>
            </div>

            {/* Tres pruebas rápidas */}
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-gray-200 pt-6">
              {pruebas.map((prueba) => (
                <li
                  key={prueba}
                  className="flex items-center gap-2 text-[13px] text-gray-600 sm:text-[14px]"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                    aria-hidden="true"
                  />
                  {prueba}
                </li>
              ))}
            </ul>
          </div>

          {/* Ilustración del servicio */}
          <div className="lg:pl-4">
            <ServiceVisual slug={slug} />
          </div>
        </div>
      </div>
    </section>
  );
}
