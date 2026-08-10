import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { formatDate, getAllPosts, getPost } from '@/lib/posts';
import { MdxContent } from '@/components/mdx/MdxContent';
import { articleSchema, breadcrumbSchema, buildMetadata } from '@/lib/seo';

import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { Thumb } from '@/components/ui/Thumb';
import { JsonLd } from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}/`,
    // La portada es la miniatura que se ve al compartir el artículo.
    image: post.cover,
    type: 'article',
    publishedTime: post.date,
  });
}

export default async function ArticuloPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Blog', path: '/blog/' },
    { name: post.title, path: `/blog/${post.slug}/` },
  ];

  const others = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <PageHero badge={post.category} title={post.title} breadcrumbs={crumbs}>
        <p className="text-[14px] text-gray-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {' · '}
          {post.readingTime} min de lectura
          {' · '}
          {post.author}
        </p>
      </PageHero>

      <article className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="container-mika">
          {/* Portada: da respiro visual antes del muro de texto y es la
              imagen que aparece al compartir el artículo. */}
          <div className="mb-10 overflow-hidden rounded-2xl bg-gray-100 sm:mb-14">
            <div className="aspect-[16/9]">
              <Thumb
                src={post.cover}
                alt={post.coverAlt}
                label={post.title}
                priority
              />
            </div>
          </div>

          {/* Ancho de lectura cómodo: entre 65 y 75 caracteres por línea. */}
          <div className="max-w-[46rem]">
            <MdxContent source={post.body} />
          </div>
        </div>
      </article>

      {/* Otros artículos */}
      {others.length > 0 && (
        <section className="bg-[#F5F5F5] py-16 sm:py-20">
          <div className="container-mika">
            <h2 className="mb-8 text-[20px] font-medium tracking-tight text-gray-900 sm:text-[24px]">
              Sigue leyendo
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/blog/${other.slug}/`}
                    className="group block h-full overflow-hidden rounded-2xl bg-white transition-shadow duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)]"
                  >
                    <div className="aspect-[16/9] bg-gray-100">
                      <Thumb
                        src={other.cover}
                        alt={other.coverAlt}
                        label={other.title}
                        className="transition-transform duration-700 ease-roll group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-6 sm:p-7">
                      <span className="text-[13px] text-brand-500">
                        {other.category}
                      </span>
                      <h3 className="mt-2 text-[18px] font-medium leading-snug tracking-tight text-gray-900 sm:text-[20px]">
                        {other.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-[1.6] text-gray-600">
                        {other.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand message={`Hola Mika, leí su artículo "${post.title}" y quiero platicar un proyecto.`} />

      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          slug: post.slug,
          date: post.date,
          author: post.author,
          image: post.cover,
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
