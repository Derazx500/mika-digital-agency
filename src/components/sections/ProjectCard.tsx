import Link from 'next/link';
import { clsx } from '@/lib/clsx';
import type { Project } from '@/lib/projects';
import { Thumb } from '@/components/ui/Thumb';

/**
 * Tarjeta de proyecto. En hover, el botón circular se expande y revela el
 * texto — el mismo gesto que usa la tarjeta de caso de estudio del brief.
 */
export function ProjectCard({
  project,
  priority = false,
  variant = 'light',
}: {
  project: Project;
  priority?: boolean;
  variant?: 'light' | 'dark';
}) {
  const isDark = variant === 'dark';

  return (
    <article>
      <Link
        href={`/portafolio/${project.slug}/`}
        className="group relative block overflow-hidden rounded-2xl bg-gray-200"
        aria-label={`Ver el caso de estudio de ${project.name}`}
      >
        <div
          className={clsx(
            project.aspect === 'square' ? 'aspect-square' : 'aspect-[329/246]',
          )}
        >
          <Thumb
            src={project.image}
            alt={`${project.name} — ${project.industry}. Proyecto de ${project.tags.join(', ').toLowerCase()} realizado por Mika Digital Agency.`}
            label={project.name}
            priority={priority}
            className="transition-transform duration-700 ease-roll group-hover:scale-[1.03]"
          />
        </div>

        {/* Botón que se expande al pasar el cursor */}
        <span
          className={clsx(
            'absolute bottom-4 left-4 flex h-9 w-9 items-center gap-2 overflow-hidden rounded-full px-[10px] transition-all duration-300 ease-in-out group-hover:w-[168px]',
            isDark ? 'bg-ink text-white' : 'bg-white text-gray-900',
          )}
        >
          <LinkGlyph
            className={clsx(
              'h-[14px] w-[14px] shrink-0 -rotate-45 transition-transform duration-300 ease-in-out group-hover:rotate-0',
              isDark ? 'text-white' : 'text-gray-900',
            )}
          />
          <span className="whitespace-nowrap text-[13px] font-medium opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100">
            Ver caso de estudio
          </span>
        </span>
      </Link>

      <p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
        {project.summary}
      </p>
      <h3 className="mt-1 text-[14px] font-semibold text-gray-900 sm:text-[15px]">
        {project.name}
        <span className="ml-2 font-normal text-gray-400">{project.year}</span>
      </h3>
    </article>
  );
}

/** Icono de enlace (dos arcos), dibujado a mano para no cargar el set completo. */
function LinkGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
