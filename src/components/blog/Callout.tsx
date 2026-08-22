import { AlertTriangle, Info, Lightbulb } from 'lucide-react';
import { waLink } from '@/lib/site';
import { clsx } from '@/lib/clsx';
import { SuperficieOscura } from '@/components/ui/SuperficieOscura';

const TONES = {
  tip: {
    icon: Lightbulb,
    wrap: 'border-brand-200 bg-brand-50',
    iconColor: 'text-brand-500',
  },
  warning: {
    icon: AlertTriangle,
    wrap: 'border-amber-200 bg-amber-50',
    iconColor: 'text-amber-600',
  },
  note: {
    icon: Info,
    wrap: 'border-gray-200 bg-gray-50',
    iconColor: 'text-gray-500',
  },
} as const;

/**
 * Caja destacada dentro de un artículo. Rompe el muro de texto y sirve para
 * avisos, consejos o datos que no deben pasar desapercibidos.
 *
 *   <Callout tone="warning" title="Ojo con esto">Texto…</Callout>
 */
export function Callout({
  children,
  tone = 'tip',
  title,
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
  title?: string;
}) {
  const { icon: Icon, wrap, iconColor } = TONES[tone];

  return (
    <aside className={clsx('my-8 rounded-2xl border p-5 sm:p-6', wrap)}>
      <div className="flex gap-3.5">
        <Icon size={20} className={clsx('mt-0.5 shrink-0', iconColor)} aria-hidden="true" />
        <div className="min-w-0">
          {title && (
            <p className="text-[16px] font-semibold text-gray-900">{title}</p>
          )}
          <div className="text-[15px] leading-[1.65] text-gray-700 [&>p:first-child]:mt-0 [&>p]:mt-3">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}

/**
 * CTA a mitad de artículo. Va donde el lector ya entendió el problema y está
 * receptivo — convierte bastante mejor que el CTA del final.
 */
export function InlineCta({
  title,
  body,
  message,
  cta = 'Escríbenos por WhatsApp',
}: {
  title: string;
  body: string;
  message?: string;
  cta?: string;
}) {
  return (
    <SuperficieOscura
      as="div"
      // Es una caja pequeña dentro del texto: con nodos se vería cargada y
      // le robaría atención al artículo.
      conNodos={false}
      className="my-10 rounded-2xl bg-ink p-6 sm:p-8"
    >
      <p className="text-[19px] font-medium tracking-tight text-white sm:text-[22px]">
        {title}
      </p>
      <p className="mt-3 text-[15px] leading-[1.6] text-white/60">{body}</p>
      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex rounded-full bg-brand-500 px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-brand-600"
      >
        {cta}
      </a>
    </SuperficieOscura>
  );
}
