'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/site';
import { clsx } from '@/lib/clsx';
import type { Seccion } from '@/lib/toc';

type ArticuloRelacionado = {
  slug: string;
  title: string;
  category: string;
  readingTime: number;
};

/**
 * Columna lateral del artículo.
 *
 * Va dentro de una retícula cuya altura es la del artículo, así que
 * `position: sticky` la mantiene a la vista mientras se lee y la suelta
 * justo al terminar el texto — que es el comportamiento que se buscaba.
 *
 * Solo aparece a partir de `lg`: por debajo no hay espacio y el contenido
 * ya está al final del artículo.
 */
export function ArticleSidebar({
  secciones,
  relacionados,
  tituloArticulo,
}: {
  secciones: Seccion[];
  relacionados: ArticuloRelacionado[];
  tituloArticulo: string;
}) {
  const activa = useSeccionActiva(secciones);

  return (
    <aside className="hidden lg:block">
      {/* top-28 deja hueco para el navbar fijo. */}
      <div className="sticky top-28 space-y-6">
        {secciones.length > 1 && (
          <nav aria-label="Secciones del artículo">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-gray-400">
              En este artículo
            </p>
            <ul className="space-y-1 border-l border-gray-200">
              {secciones.map((seccion) => (
                <li key={seccion.id}>
                  <a
                    href={`#${seccion.id}`}
                    className={clsx(
                      '-ml-px block border-l-2 py-1.5 pl-4 text-[13px] leading-snug transition-colors duration-200',
                      activa === seccion.id
                        ? 'border-brand-500 font-medium text-brand-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900',
                    )}
                  >
                    {seccion.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Llamado a la acción */}
        <div className="rounded-2xl bg-ink p-5">
          <p className="text-[16px] font-medium leading-snug tracking-tight text-white">
            ¿Quieres esto para tu marca?
          </p>
          <p className="mt-2 text-[13px] leading-[1.55] text-white/60">
            Cuéntanos tu proyecto. Te respondemos con una propuesta clara y un
            precio cerrado.
          </p>
          <a
            href={waLink(
              `Hola Mika, leí su artículo "${tituloArticulo}" y quiero platicar un proyecto.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 flex items-center justify-between gap-2 rounded-full bg-[#25D366] py-2.5 pl-4 pr-2.5 text-[13px] font-medium text-white transition-transform duration-300 hover:scale-[1.02]"
          >
            Escríbenos por WhatsApp
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/25">
              <MessageCircle size={13} className="fill-white text-white" aria-hidden="true" />
            </span>
          </a>
        </div>

        {/* Artículos relacionados */}
        {relacionados.length > 0 && (
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-gray-400">
              Sigue leyendo
            </p>
            <ul className="space-y-4">
              {relacionados.map((articulo) => (
                <li key={articulo.slug}>
                  <Link href={`/blog/${articulo.slug}/`} className="group block">
                    <span className="text-[12px] text-brand-500">
                      {articulo.category}
                    </span>
                    <span className="mt-0.5 block text-[14px] font-medium leading-snug text-gray-900 transition-colors duration-200 group-hover:text-brand-500">
                      {articulo.title}
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-[12px] text-gray-400">
                      {articulo.readingTime} min
                      <ArrowRight
                        size={11}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}

/** Línea de referencia, justo debajo del navbar fijo. */
const LINEA_DE_LECTURA = 140;

/**
 * Marca en el índice la sección que se está leyendo.
 *
 * La sección activa es **el último encabezado que quedó por encima de la
 * línea de lectura**, no el que esté dentro de una franja concreta.
 *
 * La diferencia importa: entre un encabezado y el siguiente pueden mediar
 * varias pantallas de texto, y durante todo ese rato no hay ningún título
 * en pantalla. Con el criterio de la franja, el índice se quedaba en blanco
 * casi todo el tiempo y solo parpadeaba al cruzar un título.
 *
 * Se lee la posición en cada scroll, limitando a una medición cada 80 ms
 * como mucho. Sobre un puñado de encabezados el coste es imperceptible.
 *
 * El límite es por tiempo y no con requestAnimationFrame a propósito: rAF
 * solo se ejecuta cuando la página compone fotogramas, así que no corre en
 * pestañas ocultas ni en navegadores automatizados. Con un temporizador el
 * comportamiento es el mismo para el usuario y además se puede comprobar.
 */
function useSeccionActiva(secciones: Seccion[]): string | null {
  const [activa, setActiva] = useState<string | null>(null);

  // Clave estable: evita reinstalar el listener en cada render solo porque
  // el array de secciones llegue como una referencia nueva.
  const claveSecciones = secciones.map((s) => s.id).join('|');

  useEffect(() => {
    const ids = claveSecciones ? claveSecciones.split('|') : [];
    if (ids.length === 0) return;

    const elementos = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elementos.length === 0) return;

    let temporizador: ReturnType<typeof setTimeout> | null = null;

    const calcular = () => {
      temporizador = null;

      // Antes del primer encabezado no se resalta nada: aún se está leyendo
      // la introducción.
      if (elementos[0].getBoundingClientRect().top > LINEA_DE_LECTURA) {
        setActiva(null);
        return;
      }

      let ultima = elementos[0].id;
      for (const el of elementos) {
        if (el.getBoundingClientRect().top > LINEA_DE_LECTURA) break;
        ultima = el.id;
      }
      setActiva(ultima);
    };

    const alMoverse = () => {
      if (temporizador !== null) return;
      temporizador = setTimeout(calcular, 80);
    };

    calcular();
    window.addEventListener('scroll', alMoverse, { passive: true });
    window.addEventListener('resize', alMoverse);
    return () => {
      if (temporizador !== null) clearTimeout(temporizador);
      window.removeEventListener('scroll', alMoverse);
      window.removeEventListener('resize', alMoverse);
    };
  }, [claveSecciones]);

  return activa;
}
