import Link from "next/link";
import { LEGAL_PAGES, route } from "@/lib/routes";
import { withSlash } from "@/lib/seo";
import { Breadcrumbs, Container, Prose } from "./ui";

/**
 * Plantilla de las páginas legales y de soporte (/docs/*). El texto legal se publica tal cual lo tenía el sitio
 * anterior: aquí solo cambia el formato. Al lado, enlaces a los demás documentos.
 */
export function LegalPage({
  title,
  path,
  kicker = "Legal",
  updated,
  intro,
  children,
}: {
  title: string;
  path: string;
  kicker?: string;
  updated?: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  const docs = [...LEGAL_PAGES, route("/docs/soporte")!];
  return (
    <>
      <section className="bg-paper grid-bg border-b border-line">
        <Container className="pt-10 pb-12 md:pt-14 md:pb-16">
          <Breadcrumbs items={[{ name: title, href: path }]} />
          <p className="kicker mt-8">{kicker}</p>
          <h1 className="h-hero text-ink mt-4 max-w-3xl">{title}</h1>
          {updated ? <p className="mt-5 text-sm text-muted">Última actualización: {updated}</p> : null}
          {intro ? <p className="lead mt-5 max-w-2xl">{intro}</p> : null}
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="py-14 md:py-20 grid gap-12 lg:grid-cols-[1fr_260px]">
          <Prose className="max-w-3xl">{children}</Prose>
          <aside aria-label="Documentos" className="lg:sticky lg:top-24 self-start">
            <p className="kicker">Documentos</p>
            <ul className="mt-4 flex flex-col gap-1 border-l border-line">
              {docs.map((d) => (
                <li key={d.path}>
                  <Link
                    href={withSlash(d.path)}
                    aria-current={d.path === path ? "page" : undefined}
                    className={`block -ml-px border-l-2 pl-4 py-1.5 text-[15px] ${d.path === path ? "border-lime text-ink font-semibold" : "border-transparent text-muted hover:text-ink"}`}
                  >
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>
    </>
  );
}
