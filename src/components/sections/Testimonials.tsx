import { Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/projects';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { Reveal } from '@/components/ui/Reveal';

export function Testimonials({ number = '4' }: { number?: string }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="container-mika">
        <SectionBadge
          number={number}
          label="Lo que dicen nuestros clientes"
          className="mb-6 sm:mb-8"
        />

        <h2 className="h-section mb-12 max-w-4xl text-gray-900 sm:mb-16">
          No lo decimos nosotros.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Lo dicen quienes ya trabajaron con nosotros.
        </h2>

        <ul className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={t.author} delay={i * 80}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <div>
                  <div className="mb-4 flex gap-0.5" aria-label="5 de 5 estrellas">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        size={15}
                        className="fill-brand-500 text-brand-500"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="text-[15px] leading-[1.6] text-gray-800 sm:text-[16px]">
                    “{t.quote}”
                  </blockquote>
                </div>

                <figcaption className="mt-6 border-t border-gray-100 pt-5 text-[13px] sm:text-[14px]">
                  <span className="font-semibold text-gray-900">{t.author}</span>
                  <span className="block text-gray-500">
                    {t.role} — {t.company}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
