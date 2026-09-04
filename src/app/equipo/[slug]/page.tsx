import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Award, ExternalLink, FileText, IdCard } from 'lucide-react';

import { getMiembro, getMiembros } from '@/lib/team';
import { getAllProjects } from '@/lib/projects';
import { SITE, waLink } from '@/lib/site';
import { breadcrumbSchema, buildMetadata, recortarDescripcion } from '@/lib/seo';

import { PageHero } from '@/components/sections/PageHero';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { CtaBand } from '@/components/sections/CtaBand';
import { MdxContent } from '@/components/mdx/MdxContent';
import { Thumb } from '@/components/ui/Thumb';
import { TextRollButton } from '@/components/ui/TextRollButton';
import { JsonLd } from '@/components/seo/JsonLd';
import { iconoDeRed, nombreDeRed } from '@/components/ui/SocialIcons';

export function generateStaticParams() {
  return getMiembros().map((m) => ({ slug: m.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const miembro = getMiembro(slug);
  if (!miembro) return {};

  return buildMetadata({
    title: `${miembro.name} — ${miembro.role} | Mika`,
    description: recortarDescripcion(
      `${miembro.shortBio} Conoce su trabajo y los proyectos en los que ha participado en Mika Digital Agency.`,
    ),
    path: `/equipo/${miembro.slug}/`,
    image: miembro.photo,
  });
}

export default async function PerfilPage({ params }: Props) {
  const { slug } = await params;
  const miembro = getMiembro(slug);
  if (!miembro) notFound();

  // Proyectos vinculados desde el panel, en el orden del portafolio.
  const proyectos = getAllProjects().filter((p) =>
    miembro.proyectos.includes(p.slug),
  );

  const otros = getMiembros().filter((m) => m.slug !== miembro.slug);

  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros/' },
    { name: miembro.name, path: `/equipo/${miembro.slug}/` },
  ];

  return (
    <>
      <PageHero badge={miembro.role} title={miembro.name} breadcrumbs={crumbs} />

      {/* Ficha: foto, especialidades, redes y certificaciones */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="container-mika">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
            {/* Columna izquierda */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-2xl bg-gray-100">
                <div className="aspect-[4/5]">
                  <Thumb
                    src={miembro.photo}
                    alt={`${miembro.name}, ${miembro.role} en ${SITE.name}.`}
                    label={miembro.name}
                    priority
                  />
                </div>
              </div>

              {miembro.socials.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {miembro.socials.map((red) => {
                    const Icono = iconoDeRed(red.red);
                    const nombre = nombreDeRed(red.red);
                    return (
                      <li key={red.url}>
                        <a
                          href={red.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${miembro.name} en ${nombre}`}
                          title={nombre}
                          className="grid h-11 w-11 place-items-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-500"
                        >
                          <Icono className="h-[18px] w-[18px]" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="mt-6">
                <TextRollButton
                  href={waLink(
                    `Hola, me gustaría hablar con ${miembro.name} sobre un proyecto.`,
                  )}
                  external
                  variant="brand"
                  size="sm"
                >
                  Escribir por WhatsApp
                </TextRollButton>
              </div>

              {/*
                La tarjeta digital es el enlace corto que se comparte en una
                feria o por mensaje. Aquí va discreto: quien está leyendo el
                perfil completo ya no la necesita — es para cuando la persona
                quiere copiar su propio enlace y mandarlo.
              */}
              <Link
                href={`/tarjeta/${miembro.slug}/`}
                className="mt-4 inline-flex items-center gap-1.5 text-[14px] text-gray-500 underline-offset-4 transition-colors duration-300 hover:text-brand-500 hover:underline"
              >
                <IdCard size={16} aria-hidden="true" />
                Ver tarjeta digital
              </Link>
            </div>

            {/* Columna derecha */}
            <div className="min-w-0">
              <p className="text-[17px] font-medium leading-[1.6] text-gray-900 sm:text-[19px]">
                {miembro.shortBio}
              </p>

              {miembro.specialties.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {miembro.specialties.map((especialidad) => (
                    <li
                      key={especialidad}
                      className="rounded-full border border-gray-200 px-3.5 py-1.5 text-[13px] text-gray-700"
                    >
                      {especialidad}
                    </li>
                  ))}
                </ul>
              )}

              {/* La historia */}
              <div className="mt-10 max-w-[46rem] border-t border-gray-200 pt-10">
                <MdxContent source={miembro.body} />
              </div>

              {/* Certificaciones */}
              {miembro.certifications.length > 0 && (
                <div className="mt-12 border-t border-gray-200 pt-10">
                  <h2 className="text-[22px] font-medium tracking-tight text-gray-900 sm:text-[26px]">
                    Certificaciones y formación
                  </h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {miembro.certifications.map((cert) => {
                      const enlace = cert.url ?? cert.archivo;
                      const Contenido = (
                        <>
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-500">
                            {cert.archivo && !cert.url ? (
                              <FileText size={17} aria-hidden="true" />
                            ) : (
                              <Award size={17} aria-hidden="true" />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[15px] font-medium leading-snug text-gray-900">
                              {cert.titulo}
                            </span>
                            {(cert.emisor || cert.anio) && (
                              <span className="mt-0.5 block text-[13px] text-gray-500">
                                {[cert.emisor, cert.anio].filter(Boolean).join(' · ')}
                              </span>
                            )}
                          </span>
                          {enlace && (
                            <ExternalLink
                              size={15}
                              className="ml-auto mt-1 shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                          )}
                        </>
                      );

                      return (
                        <li key={cert.titulo}>
                          {enlace ? (
                            <a
                              href={enlace}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-3.5 rounded-2xl border border-gray-200 p-4 transition-colors duration-300 hover:border-brand-500"
                            >
                              {Contenido}
                            </a>
                          ) : (
                            <div className="flex items-start gap-3.5 rounded-2xl border border-gray-200 p-4">
                              {Contenido}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos en los que participó */}
      {proyectos.length > 0 && (
        <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24">
          <div className="container-mika">
            <h2 className="h-section mb-3 max-w-3xl text-gray-900">
              Proyectos de {miembro.name.split(' ')[0]}
            </h2>
            <p className="mb-10 max-w-2xl text-[15px] leading-[1.65] text-gray-600 sm:mb-14 sm:text-[16px]">
              Trabajo en el que participó directamente.
            </p>

            <ul className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:gap-7">
              {proyectos.map((proyecto, i) => (
                <li key={proyecto.slug}>
                  <ProjectCard
                    project={proyecto}
                    variant={i % 2 === 0 ? 'light' : 'dark'}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* El resto del equipo */}
      {otros.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="container-mika">
            <h2 className="mb-8 text-[20px] font-medium tracking-tight text-gray-900 sm:text-[24px]">
              El resto del equipo
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              {otros.map((otro) => (
                <li key={otro.slug}>
                  <Link
                    href={`/equipo/${otro.slug}/`}
                    className="group flex items-center gap-4 rounded-2xl border border-gray-200 p-4 transition-colors duration-300 hover:border-brand-500 sm:p-5"
                  >
                    <span className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100">
                      <Thumb
                        src={otro.photo}
                        alt={`${otro.name}, ${otro.role}.`}
                        label={otro.name.split(' ')[0]}
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[16px] font-semibold text-gray-900 transition-colors duration-300 group-hover:text-brand-500">
                        {otro.name}
                      </span>
                      <span className="block text-[14px] text-gray-500">
                        {otro.role}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title={`¿Quieres trabajar con ${miembro.name.split(' ')[0]}?`}
        message={`Hola, me gustaría hablar con ${miembro.name} sobre un proyecto.`}
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: `${SITE.url}/equipo/${miembro.slug}/`,
          mainEntity: {
            '@type': 'Person',
            name: miembro.name,
            jobTitle: miembro.role,
            description: miembro.shortBio,
            image: `${SITE.url}${miembro.photo}`,
            url: `${SITE.url}/equipo/${miembro.slug}/`,
            worksFor: { '@id': `${SITE.url}/#organization` },
            knowsAbout: miembro.specialties,
            ...(miembro.socials.length > 0
              ? { sameAs: miembro.socials.map((s) => s.url) }
              : {}),
            ...(miembro.certifications.length > 0
              ? {
                  hasCredential: miembro.certifications.map((c) => ({
                    '@type': 'EducationalOccupationalCredential',
                    name: c.titulo,
                    ...(c.emisor
                      ? { recognizedBy: { '@type': 'Organization', name: c.emisor } }
                      : {}),
                  })),
                }
              : {}),
          },
        }}
      />
    </>
  );
}
