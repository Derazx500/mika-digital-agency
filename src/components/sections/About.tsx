import { SITE } from '@/lib/site';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { TextRollButton } from '@/components/ui/TextRollButton';
import { Thumb } from '@/components/ui/Thumb';

/**
 * Sección "quiénes somos" de la home.
 *
 * La retícula de escritorio (26% / 1fr / 48%) alinea las dos imágenes por su
 * base y deja el texto flotando arriba, que es lo que le da el aire de estudio
 * de diseño. En móvil todo se apila.
 */
export function About({ number = '1' }: { number?: string }) {
  const paragraph =
    'Somos un equipo pequeño de Ciudad de México que trabaja con investigación, criterio y muchas iteraciones. Diseñamos y programamos sitios que se ven bien, cargan rápido y —sobre todo— traen clientes.';

  return (
    <section className="overflow-hidden bg-white pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-32">
      <div className="mx-auto w-full max-w-[1440px]">
        <SectionBadge
          number={number}
          label={`Conoce ${SITE.shortName}`}
          className="mb-6 px-5 sm:mb-8 sm:px-8 lg:px-12"
        />

        <h2 className="h-section mb-12 px-5 text-gray-900 sm:mb-16 sm:px-8 lg:mb-28 lg:px-12">
          Creatividad con estrategia detrás,
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          resultados que se pueden medir.
        </h2>

        {/* Móvil y tablet: apilado */}
        <div className="px-5 sm:px-8 lg:hidden">
          <p className="text-[15px] font-medium leading-[1.6] text-gray-900 sm:text-[17px]">
            {paragraph}
          </p>

          <TextRollButton href="/nosotros/" variant="brand" className="mt-8">
            Conoce al equipo
          </TextRollButton>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5">
            <div className="overflow-hidden rounded-xl bg-gray-100 sm:w-[45%] sm:rounded-2xl">
              <div className="aspect-[438/346]">
                <Thumb
                  src="/images/about/estudio-1.webp"
                  alt="Equipo de Mika Digital Agency trabajando en el diseño de un sitio web."
                  label="Nuestro estudio"
                />
              </div>
            </div>
            <div className="overflow-hidden rounded-xl bg-gray-100 sm:w-[55%] sm:rounded-2xl">
              <div className="aspect-[900/600]">
                <Thumb
                  src="/images/about/estudio-2.webp"
                  alt="Proceso de diseño y desarrollo web en Mika Digital Agency."
                  label="Nuestro proceso"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Escritorio: retícula de tres columnas alineadas por la base */}
        <div className="hidden grid-cols-[26%_1fr_48%] items-end gap-6 px-12 lg:grid xl:gap-8">
          <div className="self-end overflow-hidden rounded-2xl bg-gray-100">
            <div className="aspect-[438/346]">
              <Thumb
                src="/images/about/estudio-1.webp"
                alt="Equipo de Mika Digital Agency trabajando en el diseño de un sitio web."
                label="Nuestro estudio"
              />
            </div>
          </div>

          <div className="flex justify-end self-start">
            <div className="max-w-[30rem]">
              <p className="text-[16px] font-medium leading-[1.65] text-gray-900 xl:text-[18px]">
                {paragraph}
              </p>
              <TextRollButton href="/nosotros/" variant="brand" className="mt-8">
                Conoce al equipo
              </TextRollButton>
            </div>
          </div>

          <div className="self-end overflow-hidden rounded-2xl bg-gray-100">
            <div className="aspect-[3/2]">
              <Thumb
                src="/images/about/estudio-2.webp"
                alt="Proceso de diseño y desarrollo web en Mika Digital Agency."
                label="Nuestro proceso"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
