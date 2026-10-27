import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ProductByNextia } from "@/components/product-by-nextia";
import { Breadcrumbs, Container, CtaBand, Prose } from "@/components/ui";
import { formatDate, postBySlug, POSTS } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, PARENT, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = postBySlug((await params).slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, type: "article", publishedTime: post.date });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();
  const path = `/blog/${post.slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          inLanguage: "es-MX",
          mainEntityOfPage: absoluteUrl(path),
          author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
          publisher: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/`, parentOrganization: { "@type": "Organization", name: PARENT.name } },
        }}
      />
      <article>
        <header className="bg-paper grid-bg border-b border-line">
          <Container size="narrow" className="pt-10 pb-12 md:pt-14 md:pb-16">
            <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title, href: path }]} />
            <p className="kicker mt-8">{post.category}</p>
            <h1 className="h-hero text-ink mt-4">{post.title}</h1>
            <p className="lead mt-5">{post.excerpt}</p>
            <p className="mt-6 text-sm text-muted">
              Publicado el <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated ? (
                <>
                  {" "}
                  · Actualizado el <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </>
              ) : null}
            </p>
          </Container>
        </header>
        <Container size="narrow" className="py-14 md:py-20">
          <Prose>
            {post.blocks.map((b, i) => {
              if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
              if (b.type === "ol")
                return (
                  <ol key={i}>
                    {b.items.map((it) => (
                      <li key={it.title}>
                        <strong>{it.title}:</strong> {it.text}
                      </li>
                    ))}
                  </ol>
                );
              if (b.type === "note")
                return (
                  <p key={i} className="text-sm border-l-2 border-line pl-4 text-muted!">
                    {b.text}
                  </p>
                );
              return <p key={i}>{b.text}</p>;
            })}
          </Prose>
        </Container>
      </article>
      <ProductByNextia />
      <CtaBand
        title="Pon a un agente de root a contestar tu WhatsApp"
        text="Contesta en segundos, califica con tus preguntas y le pasa cada prospecto a tu equipo con todo el historial."
        cta="blog-articulo"
      />
    </>
  );
}
