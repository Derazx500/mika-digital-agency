import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { formatDate, getAllPosts, getPost } from '@/lib/posts';
import { MdxContent } from '@/components/mdx/MdxContent';
import { articleSchema, breadcrumbSchema, buildMetadata } from '@/lib/seo';

import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { Thumb } from '@/components/ui/Thumb';
import { ArticleSidebar } from '@/components/blog/ArticleSidebar';
import { JsonLd } from '@/components/seo/JsonLd';
import { extraerSecciones } from '@/lib/toc';

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

  // Índice de secciones para la barra lateral, sacado del propio Markdown.
  const secciones = extraerSecciones(post.body);

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

          {/*
            Dos columnas a partir de lg. El texto se queda en 46rem —entre 65
            y 75 caracteres por línea, que es lo cómodo de leer— y el espacio
            que sobraba a la derecha pasa a ser útil.

            La barra lateral es `sticky` y vive dentro de esta retícula, cuya
            altura es la del artículo: por eso acompaña la lectura y se suelta
            justo al terminar el texto.
          */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,46rem)_minmax(16rem,1fr)] lg:gap-12 xl:gap-16">
            <div className="min-w-0">
              <MdxContent source={post.body} />
            </div>

            <ArticleSidebar
              secciones={secciones}
              relacionados={others.map((o) => ({
                slug: o.slug,
                title: o.title,
                category: o.category,
                readingTime: o.readingTime,
              }))}
              tituloArticulo={post.title}
            />
          </div>
        </div>
      </article>

      {/* Otros artículos.
          Oculto en escritorio: ahí ya están en la barra lateral y salían dos
          veces en la misma pantalla. */}
      {others.length > 0 && (
        <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:hidden">
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
