import type { Metadata } from "next";
import { RootMarkAnimated } from "@/components/brand";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/chrome";
import { Container, CtaPair } from "@/components/ui";

export const metadata: Metadata = { title: "Página no encontrada", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="grid-bg">
        <Container size="narrow" className="py-24 md:py-32 text-center">
          <RootMarkAnimated size={72} className="mx-auto" />
          <h1 className="h-hero text-ink mt-8">Esta página se quedó en visto.</h1>
          <p className="lead mt-5">No la encontramos. Vuelve al inicio o escríbenos y te ayudamos a encontrar lo que buscas.</p>
          <CtaPair cta="404" secondary={{ href: "/", label: "Ir al inicio" }} className="mt-9 justify-center" />
        </Container>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
