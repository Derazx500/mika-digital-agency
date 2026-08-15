import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

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
    title: `${project.name} — Caso de estudio`,
    // Se recorta porque el resumen lo escribe quien edita desde el panel y
    // no tiene por qué saber cuánto muestra Google.
    description: recortarDescripcion(
      `${project.summary} Proyecto de ${project.tags.join(', ').toLowerCase()} realizado por Mika Digital Agency en ${project.year}.`,
    ),
    path: `/portafolio/${project.slug}/`,
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
        intro={project.summary}
        breadcrumbs={crumbs}
      />

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="container-mika">
          <div className="overflow-hidden rounded-2xl bg-gray-100">
            <div className="aspect-[16/9]">
              <Thumb
                src={project.image}
                alt={`Vista del proyecto ${project.name}, ${project.industry}, desarrollado por Mika Digital Agency.`}
                label={project.name}
                priority
              />
            </div>
          </div>

          <dl className="mt-10 grid gap-8 border-t border-gray-200 pt-10 sm:grid-cols-3">
            <div>
              <dt className="text-[13px] uppercase tracking-wider text-gray-400">
                Cliente
              </dt>
              <dd className="mt-2 text-[16px] font-medium text-gray-900">
                {project.name}
              </dd>
            </div>
            <div>
              <dt className="text-[13px] uppercase tracking-wider text-gray-400">
                Sector
              </dt>
              <dd className="mt-2 text-[16px] font-medium text-gray-900">
                {project.industry}
              </dd>
            </div>
            <div>
              <dt className="text-[13px] uppercase tracking-wider text-gray-400">
                Servicios
              </dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-200 px-3 py-1 text-[13px] text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          {/* El caso de estudio se escribe desde el panel en /admin, en el
              cuerpo del archivo de cada proyecto. */}
          <div className="mt-12 max-w-[46rem] border-t border-gray-200 pt-12">
            <MdxContent source={project.body} />
          </div>
        </div>
      </section>

      {/* Otros proyectos */}
      <section className="bg-[#F5F5F5] py-16 sm:py-20">
        <div className="container-mika">
          <div className="mb-8 flex items-baseline justify-between gap-4">
            <h2 className="text-[20px] font-medium tracking-tight text-gray-900 sm:text-[24px]">
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

      <CtaBand message={`Hola Mika, vi el proyecto de ${project.name} y quiero algo así para mi marca.`} />

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
