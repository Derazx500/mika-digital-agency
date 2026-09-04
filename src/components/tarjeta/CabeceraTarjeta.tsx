'use client';

import dynamic from 'next/dynamic';

import { Thumb } from '@/components/ui/Thumb';
import { ShaderFallback } from '@/components/hero/ShaderBackground';

/**
 * El shader es WebGL y solo tiene sentido en el navegador, así que se carga
 * aparte del paquete principal. Mientras llega se ve el degradado, que usa la
 * misma paleta: nunca hay un hueco en blanco detrás de la foto.
 */
const ShaderBackground = dynamic(
  () =>
    import('@/components/hero/ShaderBackground').then((m) => m.ShaderBackground),
  { ssr: false, loading: () => <ShaderFallback /> },
);

/**
 * Cabecera de la tarjeta: el mismo fondo animado de la portada, con la foto
 * encima.
 *
 * La foto va en un círculo blanco que se sale del recuadro por abajo. Ese
 * desbordamiento es lo que hace que la persona se lea como que está delante
 * del fondo y no pegada sobre él — es el recurso que separa esto de una
 * cabecera de plantilla.
 *
 * El shader queda por debajo (z-10, definido en el propio componente) y la
 * foto por encima (z-20). Al ser `pointer-events-none`, el fondo nunca roba
 * un toque a los botones de abajo.
 */
export function CabeceraTarjeta({
  foto,
  nombre,
}: {
  foto: string;
  nombre: string;
}) {
  return (
    <div className="relative h-40 sm:h-44">
      {/*
        El recorte vive en esta capa interior y no en el contenedor.
        `overflow-hidden` hace falta para redondear las esquinas del shader,
        pero aplicado arriba se comía la mitad inferior de la foto, que
        justamente tiene que sobresalir.
      */}
      <div className="absolute inset-0 overflow-hidden rounded-t-[26px] bg-[#EFEFEF]">
        <ShaderBackground />

        {/*
          Difuminado hacia el blanco de la tarjeta. Sin esto el shader termina
          en un corte recto y se nota el pegado entre cabecera y cuerpo.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-16 bg-gradient-to-b from-transparent to-white"
        />
      </div>

      <div className="absolute inset-x-0 -bottom-14 z-20 flex justify-center">
        <div className="rounded-full bg-white p-1.5 shadow-[0_8px_28px_rgba(10,10,10,0.14)]">
          <div className="h-[104px] w-[104px] overflow-hidden rounded-full bg-gray-100 sm:h-28 sm:w-28">
            <Thumb src={foto} alt={nombre} label={nombre} priority />
          </div>
        </div>
      </div>
    </div>
  );
}
