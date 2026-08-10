import { clsx } from '@/lib/clsx';

/**
 * Etiqueta numerada que encabeza cada sección: círculo oscuro con el número
 * + píldora con el texto. Da ritmo y jerarquía a lo largo de toda la página.
 */
export function SectionBadge({
  number,
  label,
  className,
  tone = 'light',
}: {
  number: string;
  label: string;
  className?: string;
  tone?: 'light' | 'gray';
}) {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
        {number}
      </span>
      <span
        className={clsx(
          'rounded-full border px-3 py-1 text-[12px] font-medium text-gray-700 sm:px-4 sm:py-1.5 sm:text-[13px]',
          tone === 'gray' ? 'border-gray-300' : 'border-gray-200',
        )}
      >
        {label}
      </span>
    </div>
  );
}
