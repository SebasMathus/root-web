import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/chrome";

/** Páginas del sitio: encabezado con menús, pie y botón flotante de WhatsApp. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 btn btn-dark px-4 py-2">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
