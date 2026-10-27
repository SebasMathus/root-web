import Link from "next/link";
import { ProductByNextia } from "@/components/product-by-nextia";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { Icon } from "@/components/icons";
import { formatDate, POSTS } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog: ventas por WhatsApp, CRM y agentes de IA",
  description: "Blog de root: cómo vender por WhatsApp, ordenar tu CRM y poner agentes de IA a contestar, calificar y dar seguimiento a tus prospectos en México.",
  path: "/blog",
  ownOgImage: true,
});

export default function BlogIndex() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Blog", href: "/blog" }]}
        kicker="Blog"
        title="Ideas para vender mejor por WhatsApp"
        intro="Guías cortas sobre ventas por WhatsApp, CRM y agentes de IA para equipos comerciales en México."
        ctas={null}
      />
      <Section labelledBy="articulos-titulo">
        <h2 id="articulos-titulo" className="sr-only">
          Artículos
        </h2>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}/`} className="card card-hover p-6 flex flex-col gap-3 h-full">
                <span className="chip w-fit">{p.category}</span>
                <h3 className="h-card text-xl text-ink">{p.title}</h3>
                <p className="text-muted leading-relaxed">{p.excerpt}</p>
                <span className="mt-auto pt-3 flex items-center justify-between text-sm text-muted">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                    Leer <Icon name="arrow" className="w-4 h-4" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <ProductByNextia />
      <CtaBand title="Que nadie se quede en visto." text="Escríbenos por WhatsApp y te mostramos cómo un agente de root contesta, califica y le pasa cada prospecto a tu equipo." cta="blog" />
    </>
  );
}
