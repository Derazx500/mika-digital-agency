import Link from 'next/link';
import {
  ArrowUpRight,
  Boxes,
  Camera,
  Code2,
  CreditCard,
  Mic,
  Monitor,
  Palette,
  Search,
  Share2,
  ShoppingBag,
  Sparkles,
  Video,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { SECONDARY_SERVICES, SERVICES } from '@/lib/site';
import { mxn } from '@/lib/pricing';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { Reveal } from '@/components/ui/Reveal';

/** Un icono por slug de servicio, más los de la lista secundaria. */
const ICONS: Record<string, LucideIcon> = {
  'diseno-web': Monitor,
  'posicionamiento-seo': Search,
  'diseno-grafico-branding': Palette,
  'tienda-en-linea': ShoppingBag,
  'desarrollo-de-software': Code2,
  'produccion-de-video': Video,
  'produccion-de-podcast': Mic,
  'fotografia-profesional': Camera,
  'social-media': Share2,
  'tarjetas-digitales-nfc': CreditCard,
  Sparkles,
  Boxes,
  Wrench,
};

/** Sufijo del precio según la unidad del servicio. */
function sufijoDePrecio(unidad?: 'proyecto' | 'mes' | 'pieza'): string {
  if (unidad === 'mes') return ' / mes';
  if (unidad === 'pieza') return ' c/u';
  return '';
}

export function ServicesGrid({ number = '2' }: { number?: string }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="container-mika">
        <SectionBadge number={number} label="Qué hacemos" className="mb-6 sm:mb-8" />

        <h2 className="h-section mb-4 max-w-4xl text-gray-900">
          Tres servicios donde somos muy buenos,
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>y todo lo demás que tu marca necesita.
        </h2>

        <p className="mb-12 max-w-2xl text-[15px] leading-[1.65] text-gray-600 sm:mb-16 sm:text-[16px]">
          Diseño web, posicionamiento SEO y branding son nuestro núcleo. El resto
          lo cubrimos con el mismo equipo, para que no tengas que coordinar tres
          proveedores distintos.
        </p>

        {/* Servicios principales: cada uno con su propia landing optimizada */}
        <ul className="grid gap-5 sm:gap-6 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.slug] ?? Monitor;
            return (
              <Reveal as="li" key={service.slug} delay={i * 90}>
                <Link
                  href={`/servicios/${service.slug}/`}
                  className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-500 ease-roll hover:border-brand-500 hover:shadow-[0_8px_40px_rgba(1,103,243,0.10)] sm:p-8"
                >
                  <span className="mb-6 grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand-500 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon size={19} aria-hidden="true" />
                  </span>

                  <h3 className="text-[19px] font-semibold tracking-tight text-gray-900 sm:text-[21px]">
                    {service.name}
                  </h3>

                  <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-gray-600 sm:text-[15px]">
                    {service.tagline}
                  </p>

                  <span className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5 text-[13px]">
                    <span className="text-gray-500">
                      desde{' '}
                      <span className="font-semibold text-gray-900">
                        {mxn(service.priceFrom)}
                        {sufijoDePrecio(service.priceUnit)}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-brand-500">
                      Ver servicio
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-500 ease-roll group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        {/* Servicios complementarios */}
        <div className="mt-12 rounded-2xl bg-[#F5F5F5] p-6 sm:mt-16 sm:p-10">
          <h3 className="text-[17px] font-semibold tracking-tight text-gray-900 sm:text-[19px]">
            También lo resolvemos nosotros
          </h3>
          <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {SECONDARY_SERVICES.map((s) => {
              const Icon = ICONS[s.icon] ?? Sparkles;
              return (
                <li key={s.name} className="flex gap-3.5">
                  <Icon
                    size={18}
                    className="mt-0.5 shrink-0 text-brand-500"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-[15px] font-medium text-gray-900">
                      {s.name}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-[1.55] text-gray-600 sm:text-[14px]">
                      {s.tagline}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
