import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Check, ExternalLink, Star, TrendingUp } from 'lucide-react';

import { getAllProjects, getProject } from '@/lib/projects';
import { MdxContent } from '@/components/mdx/MdxContent';
import { breadcrumbSchema, buildMetadata, recortarDescripcion } from '@/lib/seo';
import { SITE } from '@/lib/site';

import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { Thumb } from '@/components/ui/Thumb';
import { JsonLd } from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return buildMetadata({
    // Si el caso trae título propio para Google se respeta; si no, se arma
    // uno. Los casos escritos con cuidado suelen tener un titular mejor
    // pensado para el buscador que el nombre del cliente a secas.
    title: project.seoTitle ?? `${project.name} — Caso de estudio`,
    // Se recorta porque el resumen lo escribe quien edita desde el panel y
    // no tiene por qué saber cuánto muestra Google.
    description: recortarDescripcion(
      project.seoDescription ??
        `${project.summary} Proyecto de ${project.tags.join(', ').toLowerCase()} realizado por Mika Digital Agency en ${project.year}.`,
    ),
    path: `/portafolio/${project.slug}/`,
    image: project.image,
  });
}

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = getAllProjects()
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Portafolio', path: '/portafolio/' },
    { name: project.name, path: `/portafolio/${project.slug}/` },
  ];

  return (
    <>
      <PageHero
        badge={`${project.industry} · ${project.year}`}
        title={project.name}
        // El subtítulo, cuando existe, dice de qué va el caso mejor que el
        // resumen: el resumen está escrito para la tarjeta del listado.
        intro={project.subtitulo ?? project.summary}
        breadcrumbs={crumbs}
      />

      <section className="bg-superficie pb-16 sm:pb-20 lg:pb-24">
        <div className="container-mika">
          <div className="overflow-hidden rounded-2xl bg-superficie-sutil">
            <div className="aspect-[16/9]">
              <Thumb
                src={project.image}
                alt={`Vista del proyecto ${project.name}, ${project.industry}, desarrollado por Mika Digital Agency.`}
                label={project.name}
                priority
              />
            </div>
          </div>

          <dl className="mt-10 grid gap-8 border-t border-borde pt-10 sm:grid-cols-3 lg:grid-cols-4">
            <div>
              <dt className="text-[13px] uppercase tracking-wider text-texto-tenue">
                Cliente
              </dt>
              <dd className="mt-2 text-[16px] font-medium text-texto">
                {project.name}
              </dd>
            </div>
            <div>
              <dt className="text-[13px] uppercase tracking-wider text-texto-tenue">
                Sector
              </dt>
              <dd className="mt-2 text-[16px] font-medium text-texto">
                {project.industry}
              </dd>
            </div>

            {project.ubicacion && (
              <div>
                <dt className="text-[13px] uppercase tracking-wider text-texto-tenue">
                  Ubicación
                </dt>
                <dd className="mt-2 text-[16px] font-medium text-texto">
                  {project.ubicacion}
                </dd>
              </div>
            )}

            {project.estado && (
              <div>
                <dt className="text-[13px] uppercase tracking-wider text-texto-tenue">
                  Estado
                </dt>
                <dd className="mt-2 text-[16px] font-medium text-texto">
                  {project.estado}
                </dd>
              </div>
            )}

            <div>
              <dt className="text-[13px] uppercase tracking-wider text-texto-tenue">
                Servicios
              </dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-borde px-3 py-1 text-[13px] text-texto-suave"
                  >
                    {tag}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          {/*
            El caso de estudio se escribe desde el panel en /admin, en el
            cuerpo del archivo de cada proyecto.

            Los entregables van en una columna lateral y no dentro del texto:
            es una lista de comprobación, no narrativa. Quien evalúa contratar
            la recorre con la vista buscando lo suyo, y en mitad del relato
            obligaría a leerlo todo para encontrarlo.
          */}
          <div className="mt-12 grid gap-10 border-t border-borde pt-12 lg:grid-cols-[minmax(0,46rem)_minmax(16rem,1fr)] lg:gap-14">
            <div className="min-w-0">
              <MdxContent source={project.body} />

              {/*
                Los resultados solo se dibujan si los hay. Un caso sin números
                pero con buen proceso es creíble; uno con resultados vagos
                para rellenar el hueco, no.
              */}
              {project.resultados.length > 0 && (
                <div className="mt-12 rounded-2xl bg-superficie-alt p-7 sm:p-9">
                  <h2 className="text-[20px] font-medium tracking-tight text-texto sm:text-[24px]">
                    Resultados
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {project.resultados.map((resultado) => (
                      <li
                        key={resultado}
                        className="flex gap-3 text-[15px] leading-[1.6] text-texto-suave sm:text-[16px]"
                      >
                        <TrendingUp
                          size={17}
                          className="mt-0.5 shrink-0 text-brand-500"
                          aria-hidden="true"
                        />
                        {resultado}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {(project.entregables.length > 0 ||
              project.url ||
              project.urlBehance) && (
              <aside className="lg:sticky lg:top-28 lg:self-start">
                {project.entregables.length > 0 && (
                  <div className="rounded-2xl border border-borde p-6 sm:p-7">
                    <h2 className="text-[13px] uppercase tracking-wider text-texto-tenue">
                      Qué entregamos
                    </h2>
                    <ul className="mt-4 space-y-2.5">
                      {project.entregables.map((entregable) => (
                        <li
                          key={entregable}
                          className="flex gap-2.5 text-[14px] leading-[1.55] text-texto-suave"
                        >
                          <Check
                            size={15}
                            className="mt-[3px] shrink-0 text-brand-500"
                            aria-hidden="true"
                          />
                          {entregable}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(project.url || project.urlBehance) && (
                  <div className="mt-4 flex flex-col gap-2.5">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-borde px-5 py-3 text-[14px] font-medium text-texto transition-colors duration-300 hover:border-borde-fuerte hover:bg-superficie-alt"
                      >
                        Ver el sitio en vivo
                        <ExternalLink size={15} aria-hidden="true" />
                      </a>
                    )}
                    {project.urlBehance && (
                      <a
                        href={project.urlBehance}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-borde px-5 py-3 text-[14px] font-medium text-texto transition-colors duration-300 hover:border-borde-fuerte hover:bg-superficie-alt"
                      >
                        Ver el caso en Behance
                        <ExternalLink size={15} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </aside>
            )}
          </div>

          {/* Reseña del cliente. Solo aparece si este proyecto tiene una:
              no todos los clientes dejan una, y rellenar con algo genérico
              se nota y resta credibilidad. */}
          {project.resena && (
            <figure className="mt-12 max-w-[46rem] rounded-2xl bg-superficie-alt p-7 sm:p-9">
              <div className="mb-4 flex gap-0.5" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-brand-500 text-brand-500"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="text-[17px] leading-[1.65] text-texto sm:text-[19px]">
                “{project.resena.texto}”
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-borde-fuerte pt-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-500 text-[14px] font-semibold text-white">
                  {project.resena.autor.charAt(0)}
                </span>
                <span className="text-[14px]">
                  <span className="block font-semibold text-texto">
                    {project.resena.autor}
                  </span>
                  {project.resena.puesto && (
                    <span className="block text-texto-tenue">
                      {project.resena.puesto}
                    </span>
                  )}
                </span>
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* Otros proyectos */}
      <section className="bg-superficie-alt py-16 sm:py-20">
        <div className="container-mika">
          <div className="mb-8 flex items-baseline justify-between gap-4">
            <h2 className="text-[20px] font-medium tracking-tight text-texto sm:text-[24px]">
              Otros proyectos
            </h2>
            <Link
              href="/portafolio/"
              className="text-[14px] font-medium text-brand-500 underline-offset-4 hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <ul className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {others.map((p, i) => (
              <li key={p.slug}>
                <ProjectCard project={p} variant={i % 2 === 0 ? 'light' : 'dark'} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*
        El cierre sale del propio caso cuando lo trae: cada proyecto remata
        con la frase que le corresponde —arquitectura de tienda, SEO local,
        cambio de marca— y eso convierte mejor que un "¿Empezamos?" igual
        para todos. Si no lo trae, se usa el genérico.
      */}
      <CtaBand
        title={project.cta ?? undefined}
        message={`Hola Mika, vi el proyecto de ${project.name} y quiero algo así para mi marca.`}
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.name,
          description: project.summary,
          about: project.industry,
          dateCreated: project.year,
          url: `${SITE.url}/portafolio/${project.slug}/`,
          creator: { '@id': `${SITE.url}/#organization` },
        }}
      />
    </>
  );
}
