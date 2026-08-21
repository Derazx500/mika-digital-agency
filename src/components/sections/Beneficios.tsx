import {
  BadgeCheck,
  Clock,
  Gauge,
  HeartHandshake,
  KeyRound,
  LineChart,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import { SectionBadge } from '@/components/ui/SectionBadge';

const ICONOS: Record<string, LucideIcon> = {
  velocidad: Gauge,
  tiempo: Clock,
  llave: KeyRound,
  escudo: ShieldCheck,
  verificado: BadgeCheck,
  crecimiento: TrendingUp,
  metricas: LineChart,
  cohete: Rocket,
  dinero: Wallet,
  equipo: Users,
  trato: HeartHandshake,
  brillo: Sparkles,
};

export type Beneficio = {
  /** Clave del icono. Ver ICONOS arriba. */
  icono: string;
  titulo: string;
  texto: string;
};

/**
 * Razones para contratar, en formato escaneable.
 *
 * Va inmediatamente después del hero porque quien llega de un anuncio o de
 * una búsqueda decide en segundos si sigue leyendo. Aquí no se explica el
 * servicio: se responde "¿y esto a mí qué me da?".
 *
 * Cada tarjeta dice un beneficio concreto, no un adjetivo. "Tu sitio carga
 * en menos de 2 segundos" convence; "diseño de calidad" no dice nada.
 */
export function Beneficios({
  beneficios,
  number,
  label = 'Por qué con nosotros',
  titulo,
}: {
  beneficios: Beneficio[];
  number: string;
  label?: string;
  titulo: string;
}) {
  if (beneficios.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-mika">
        <SectionBadge number={number} label={label} className="mb-6 sm:mb-8" />

        <h2 className="h-section mb-10 max-w-3xl text-gray-900 sm:mb-14">
          {titulo}
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {beneficios.map((beneficio, i) => {
            const Icono = ICONOS[beneficio.icono] ?? Sparkles;
            return (
              <Reveal as="li" key={beneficio.titulo} delay={(i % 3) * 80}>
                <div className="group h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-500 ease-roll hover:-translate-y-1 hover:border-brand-500 hover:shadow-[0_12px_40px_rgba(1,103,243,0.10)] sm:p-7">
                  <span className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand-500 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                    <Icono size={19} aria-hidden="true" />
                  </span>
                  <h3 className="text-[17px] font-semibold tracking-tight text-gray-900 sm:text-[19px]">
                    {beneficio.titulo}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.6] text-gray-600 sm:text-[15px]">
                    {beneficio.texto}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
