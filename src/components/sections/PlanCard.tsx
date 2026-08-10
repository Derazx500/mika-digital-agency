import { Check } from 'lucide-react';
import { mxn, type Plan } from '@/lib/pricing';
import { waLink } from '@/lib/site';
import { clsx } from '@/lib/clsx';

export function PlanCard({ plan }: { plan: Plan }) {
  const message = `Hola Mika, me interesa el paquete "${plan.name}". ¿Me pueden dar más información?`;

  return (
    <div
      className={clsx(
        'flex h-full flex-col rounded-2xl border p-6 sm:p-8',
        plan.highlighted
          ? 'border-brand-500 bg-white shadow-[0_8px_40px_rgba(1,103,243,0.12)]'
          : 'border-gray-200 bg-white',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[18px] font-semibold text-gray-900 sm:text-[20px]">
          {plan.name}
        </h3>
        {plan.highlighted && (
          <span className="shrink-0 rounded-full bg-brand-500 px-2.5 py-1 text-[11px] font-medium text-white">
            Más contratado
          </span>
        )}
      </div>

      <p className="mt-2 text-[14px] leading-[1.55] text-gray-600">
        {plan.audience}
      </p>

      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="text-[13px] text-gray-500">desde</span>
        <span className="text-[30px] font-medium tracking-tight text-gray-900 sm:text-[34px]">
          {mxn(plan.priceFrom)}
        </span>
        <span className="text-[13px] text-gray-500">
          {plan.unit === 'mes' ? '/mes' : 'MXN'}
        </span>
      </p>

      <p className="mt-1 text-[13px] text-gray-500">
        Tiempo estimado: {plan.timeline}
      </p>

      <ul className="mt-6 flex-1 space-y-2.5 border-t border-gray-100 pt-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[14px] text-gray-700">
            <Check
              size={16}
              className="mt-0.5 shrink-0 text-brand-500"
              aria-hidden="true"
            />
            {f}
          </li>
        ))}
      </ul>

      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          'mt-8 block rounded-full py-3 text-center text-[14px] font-medium transition-colors duration-300',
          plan.highlighted
            ? 'bg-brand-500 text-white hover:bg-brand-600'
            : 'bg-ink text-white hover:bg-ink-soft',
        )}
      >
        Cotizar {plan.name}
      </a>
    </div>
  );
}
