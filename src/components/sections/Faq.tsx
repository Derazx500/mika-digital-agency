import { Plus } from 'lucide-react';
import { SectionBadge } from '@/components/ui/SectionBadge';

/**
 * Acordeón de preguntas frecuentes con <details>/<summary> nativos.
 *
 * Sin JavaScript: el contenido siempre está en el HTML, así que Google lo
 * indexa completo y puede mostrarlo como fragmento enriquecido junto al
 * schema FAQPage que declara la página.
 */
export function Faq({
  faqs,
  number,
  label = 'Preguntas frecuentes',
  title = 'Lo que casi siempre nos preguntan',
  tone = 'white',
}: {
  faqs: { q: string; a: string }[];
  number: string;
  label?: string;
  title?: string;
  tone?: 'white' | 'gray';
}) {
  return (
    <section
      className={tone === 'gray' ? 'bg-[#F5F5F5] py-16 sm:py-20 lg:py-28' : 'bg-white py-16 sm:py-20 lg:py-28'}
    >
      <div className="container-mika">
        <SectionBadge
          number={number}
          label={label}
          tone={tone === 'gray' ? 'gray' : 'light'}
          className="mb-6 sm:mb-8"
        />

        <h2 className="h-section mb-10 max-w-3xl text-gray-900 sm:mb-14">{title}</h2>

        <div className="max-w-3xl divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5 sm:py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[16px] font-medium text-gray-900 sm:text-[18px] [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  size={20}
                  className="mt-0.5 shrink-0 text-brand-500 transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-[1.65] text-gray-600 sm:text-[16px]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
