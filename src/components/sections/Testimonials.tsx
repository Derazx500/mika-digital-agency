import { Star } from 'lucide-react';

import { getTestimonios, getTestimoniosDeServicio } from '@/lib/testimonios';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { Reveal } from '@/components/ui/Reveal';
import { clsx } from '@/lib/clsx';

/**
 * Reseñas de clientes.
 *
 * Si se pasa `servicio`, muestra primero las reseñas etiquetadas con ese
 * servicio. Una reseña sobre lo mismo que el visitante está mirando convence
 * bastante más que un elogio genérico.
 */
export function Testimonials({
  number = '4',
  servicio,
  titulo,
  tone = 'white',
}: {
  number?: string;
  servicio?: string;
  titulo?: string;
  tone?: 'white' | 'gray';
}) {
  const resultado = servicio
    ? getTestimoniosDeServicio(servicio)
    : { testimonios: getTestimonios(), especificas: false };

  const { testimonios, especificas } = resultado;

  if (testimonios.length === 0) return null;

  /*
   * El titular específico solo se usa si todas las reseñas son de ese
   * servicio. Si se completaron con otras, se cae al genérico: decir
   * "clientes que contrataron X" mostrando reseñas de otra cosa se nota y
   * resta credibilidad.
   */
  const encabezado = especificas ? titulo : undefined;

  return (
    <section
      className={clsx(
        'py-16 sm:py-20 lg:py-28',
        tone === 'gray' ? 'bg-[#F5F5F5]' : 'bg-white',
      )}
    >
      <div className="container-mika">
        <SectionBadge
          number={number}
          label="Lo que dicen nuestros clientes"
          tone={tone === 'gray' ? 'gray' : 'light'}
          className="mb-6 sm:mb-8"
        />

        <h2 className="h-section mb-12 max-w-4xl text-gray-900 sm:mb-16">
          {encabezado ?? (
            <>
              No lo decimos nosotros.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Lo dicen quienes ya trabajaron con nosotros.
            </>
          )}
        </h2>

        <ul className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {testimonios.map((t, i) => (
            <Reveal as="li" key={t.slug} delay={i * 80}>
              <figure
                className={clsx(
                  'flex h-full flex-col justify-between rounded-2xl border border-gray-200 p-6 sm:p-8',
                  tone === 'gray' ? 'bg-white' : 'bg-white',
                )}
              >
                <div>
                  <div
                    className="mb-4 flex gap-0.5"
                    aria-label={`${t.rating} de 5 estrellas`}
                  >
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        size={15}
                        className={
                          s < t.rating
                            ? 'fill-brand-500 text-brand-500'
                            : 'text-gray-300'
                        }
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
                  {(t.role || t.company) && (
                    <span className="block text-gray-500">
                      {[t.role, t.company].filter(Boolean).join(' — ')}
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
