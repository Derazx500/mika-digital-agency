import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';

import { formatDate, getAllPosts } from '@/lib/posts';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { Reveal } from '@/components/ui/Reveal';
import { Thumb } from '@/components/ui/Thumb';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Blog de Diseño Web, SEO y Branding | Mika',
  description:
    'Guías prácticas sobre diseño web, posicionamiento SEO y branding para negocios en México. Sin humo: lo que de verdad funciona y cuánto cuesta.',
  path: '/blog/',
});

const CRUMBS = [
  { name: 'Inicio', path: '/' },
  { name: 'Blog', path: '/blog/' },
];

export default function BlogPage() {
  const posts = getAllPosts();
  // El más reciente va destacado a lo ancho; el resto, en retícula de tarjetas.
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        badge="Blog"
        title="Lo que sabemos, explicado sin humo"
        intro="Guías prácticas sobre diseño web, SEO y branding para negocios en México. Escritas por la gente que hace el trabajo, no por un becario con ChatGPT."
        breadcrumbs={CRUMBS}
      />

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="container-mika">
          {/* Artículo destacado: el más reciente, a lo ancho */}
          {featured && (
            <Reveal>
              <Link
                href={`/blog/${featured.slug}/`}
                className="group grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-12"
              >
                <div className="overflow-hidden rounded-2xl bg-gray-100">
                  <div className="aspect-[16/10]">
                    <Thumb
                      src={featured.cover}
                      alt={featured.coverAlt}
                      label={featured.title}
                      priority
                      className="transition-transform duration-700 ease-roll group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div>
                  <span className="inline-flex items-center gap-2 text-[13px]">
                    <span className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-600">
                      {featured.category}
                    </span>
                    <time dateTime={featured.date} className="text-gray-500">
                      {formatDate(featured.date)}
                    </time>
                  </span>

                  <h2 className="mt-4 text-[26px] font-medium leading-[1.15] tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-brand-500 sm:text-[34px]">
                    {featured.title}
                  </h2>

                  <p className="mt-4 text-[15px] leading-[1.65] text-gray-600 sm:text-[16px]">
                    {featured.description}
                  </p>

                  <span className="mt-5 flex items-center gap-2 text-[14px] font-medium text-brand-500">
                    Leer el artículo
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-500 ease-roll group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span className="font-normal text-gray-400">
                      · {featured.readingTime} min
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Resto de artículos en retícula */}
          {rest.length > 0 && (
            <ul className="mt-14 grid gap-6 border-t border-gray-200 pt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {rest.map((post, i) => (
                <Reveal as="li" key={post.slug} delay={i * 80}>
                  <Link href={`/blog/${post.slug}/`} className="group block">
                    <div className="overflow-hidden rounded-2xl bg-gray-100">
                      <div className="aspect-[16/10]">
                        <Thumb
                          src={post.cover}
                          alt={post.coverAlt}
                          label={post.title}
                          className="transition-transform duration-700 ease-roll group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>

                    <span className="mt-4 inline-flex items-center gap-2 text-[13px]">
                      <span className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-600">
                        {post.category}
                      </span>
                      <time dateTime={post.date} className="text-gray-500">
                        {formatDate(post.date)}
                      </time>
                    </span>

                    <h2 className="mt-3 text-[19px] font-medium leading-[1.25] tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-brand-500 sm:text-[21px]">
                      {post.title}
                    </h2>

                    <p className="mt-2 text-[14px] leading-[1.6] text-gray-600">
                      {post.description}
                    </p>

                    <span className="mt-3 block text-[13px] text-gray-400">
                      {post.readingTime} min de lectura
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBand message="Hola Mika, leí su blog y quiero platicar un proyecto." />

      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `Blog de ${SITE.name}`,
          url: `${SITE.url}/blog/`,
          publisher: { '@id': `${SITE.url}/#organization` },
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            url: `${SITE.url}/blog/${p.slug}/`,
          })),
        }}
      />
    </>
  );
}
