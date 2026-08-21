import { SectionBadge } from '@/components/ui/SectionBadge';
import { Reveal } from '@/components/ui/Reveal';
import { Thumb } from '@/components/ui/Thumb';
import { clsx } from '@/lib/clsx';

export type ItemGaleria = {
  src: string;
  /** Describe lo que se ve. Lo leen Google y los lectores de pantalla. */
  alt: string;
  /** Pie visible sobre la imagen al pasar el cursor. */
  titulo?: string;
};

/**
 * Galería de ejemplos del servicio.
 *
 * En una landing de venta esto pesa más que cualquier texto: nadie contrata
 * diseño sin ver diseño. Por eso va alta en la página, justo después de los
 * beneficios.
 *
 * La retícula alterna tamaños en vez de ser uniforme — una cuadrícula
 * perfecta se lee como catálogo de plantillas; una con ritmo se lee como
 * portafolio.
 *
 * Mientras no haya imágenes reales se ven los degradados de marca con el
 * título, así que la sección nunca aparece rota.
 */
export function Galeria({
  items,
  number,
  label = 'Ejemplos',
  titulo,
  intro,
  tone = 'white',
}: {
  items: ItemGaleria[];
  number: string;
  label?: string;
  titulo: string;
  intro?: string;
  tone?: 'white' | 'gray';
}) {
  if (items.length === 0) return null;

  return (
    <section
      className={clsx(
        'py-16 sm:py-20 lg:py-24',
        tone === 'gray' ? 'bg-[#F5F5F5]' : 'bg-white',
      )}
    >
      <div className="container-mika">
        <SectionBadge
          number={number}
          label={label}
          tone={tone === 'gray' ? 'gray' : 'light'}
          className="mb-6 sm:mb-8"
        />

        <h2 className="h-section mb-4 max-w-3xl text-gray-900">{titulo}</h2>

        {intro && (
          <p className="mb-10 max-w-2xl text-[15px] leading-[1.65] text-gray-600 sm:mb-14 sm:text-[16px]">
            {intro}
          </p>
        )}

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {items.map((item, i) => {
            // Cada quinto elemento ocupa el doble: rompe la monotonía de la
            // cuadrícula sin necesitar configurarlo pieza por pieza.
            const grande = i % 5 === 0;
            return (
              <Reveal
                as="li"
                key={item.src + i}
                delay={(i % 4) * 70}
                className={clsx(grande && 'col-span-2 row-span-2')}
              >
                <figure className="group relative h-full overflow-hidden rounded-xl bg-gray-100 sm:rounded-2xl">
                  <div className={grande ? 'aspect-square' : 'aspect-square'}>
                    <Thumb
                      src={item.src}
                      alt={item.alt}
                      label={item.titulo ?? item.alt}
                      priority={i < 2}
                      className="transition-transform duration-700 ease-roll group-hover:scale-[1.06]"
                    />
                  </div>

                  {item.titulo && (
                    <figcaption
                      className={clsx(
                        'pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/85 to-transparent p-4 transition-transform duration-500 ease-roll group-hover:translate-y-0',
                      )}
                    >
                      <span className="text-[13px] font-medium text-white sm:text-[14px]">
                        {item.titulo}
                      </span>
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
