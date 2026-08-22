'use client';

import { useMemo, useState } from 'react';

import type { Project } from '@/lib/projects';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { clsx } from '@/lib/clsx';

/**
 * Portafolio con filtro por tipo de proyecto.
 *
 * El filtrado se hace en el cliente sobre la lista completa, que ya viene en
 * el HTML. Así Google indexa los nueve proyectos aunque el filtro esté en
 * "Todos", y cambiar de categoría es instantáneo: no hay ida y vuelta al
 * servidor.
 */
export function PortafolioFiltrado({
  proyectos,
  categorias,
}: {
  proyectos: Project[];
  categorias: string[];
}) {
  const [activo, setActivo] = useState<string>('todos');

  const visibles = useMemo(
    () =>
      activo === 'todos'
        ? proyectos
        : // Un proyecto puede estar en varias categorías, así que aparece
          // bajo cada una de las que tenga.
          proyectos.filter((p) => p.categorias.includes(activo)),
    [activo, proyectos],
  );

  const opciones = ['todos', ...categorias];

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
        {opciones.map((opcion) => {
          const cantidad =
            opcion === 'todos'
              ? proyectos.length
              : proyectos.filter((p) => p.categorias.includes(opcion)).length;
          const esActivo = opcion === activo;

          return (
            <button
              key={opcion}
              type="button"
              onClick={() => setActivo(opcion)}
              aria-pressed={esActivo}
              className={clsx(
                'flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300 sm:text-[14px]',
                esActivo
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900',
              )}
            >
              {opcion === 'todos' ? 'Todos los proyectos' : opcion}
              <span
                className={clsx(
                  'text-[12px] tabular-nums',
                  esActivo ? 'text-white/70' : 'text-gray-400',
                )}
              >
                {cantidad}
              </span>
            </button>
          );
        })}
      </div>

      {/* aria-live avisa del cambio a quien navega con lector de pantalla:
          sin esto, pulsar un filtro no anuncia nada y parece que no pasó. */}
      <p className="sr-only" aria-live="polite">
        {visibles.length}{' '}
        {visibles.length === 1 ? 'proyecto visible' : 'proyectos visibles'}
      </p>

      <ul className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:gap-7">
        {visibles.map((proyecto, i) => (
          <li
            key={`${activo}-${proyecto.slug}`}
            /* La clave incluye el filtro activo para que React remonte las
               tarjetas al cambiar de sector y la animación se repita. */
            className="animate-fade-up"
            style={{ animationDelay: `${(i % 4) * 60}ms` }}
          >
            <ProjectCard
              project={proyecto}
              priority={i === 0}
              variant={i % 2 === 0 ? 'light' : 'dark'}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
