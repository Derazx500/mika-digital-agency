import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SectionBadge } from '@/components/ui/SectionBadge';

/**
 * Encabezado de las páginas internas.
 *
 * Deja espacio arriba para el navbar fijo (pt-28 / pt-36) e incluye las migas
 * de pan visibles, que se acompañan del schema BreadcrumbList en cada página.
 */
export function PageHero({
  badge,
  title,
  intro,
  breadcrumbs,
  children,
}: {
  badge: string;
  /** Es el H1 de la página: aquí va la palabra clave principal. */
  title: string;
  intro?: string;
  breadcrumbs: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-white pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
      <div className="container-mika">
        <nav aria-label="Ruta de navegación" className="mb-6 sm:mb-8">
          <ol className="flex flex-wrap items-center gap-1 text-[13px] text-gray-500">
            {breadcrumbs.map((crumb, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-1">
                  {last ? (
                    <span className="text-gray-900" aria-current="page">
                      {crumb.name}
                    </span>
                  ) : (
                    <>
                      <Link
                        href={crumb.path}
                        className="transition-colors hover:text-gray-900"
                      >
                        {crumb.name}
                      </Link>
                      <ChevronRight size={13} aria-hidden="true" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <SectionBadge number="—" label={badge} className="mb-6 sm:mb-8" />

        <h1 className="h-display max-w-[22ch] text-gray-900">{title}</h1>

        {intro && (
          <p className="mt-6 max-w-2xl text-[16px] leading-[1.65] text-gray-600 sm:mt-8 sm:text-[18px]">
            {intro}
          </p>
        )}

        {children && <div className="mt-8 sm:mt-10">{children}</div>}
      </div>
    </section>
  );
}
