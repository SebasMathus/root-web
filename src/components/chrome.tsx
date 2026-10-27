import Link from "next/link";
import { LEGAL_PAGES, PRODUCT_PAGES, RESOURCE_PAGES, route, SOLUTION_PAGES, type RouteEntry } from "@/lib/routes";
import { withSlash } from "@/lib/seo";
import { ADDRESS_LINE, APP_LOGIN_URL, CATEGORY, CONTACT_EMAIL, CTA_LABEL, TAGLINE, WHATSAPP_URL } from "@/lib/site";
import { ProductByNextiaSignature, RootLogo } from "./brand";
import { Icon, WhatsAppGlyph } from "./icons";
import { MenuAutoClose } from "./menu-auto-close";
import { Container, CtaButton } from "./ui";

/** Íconos de los menús (por ruta). */
const MENU_ICON: Record<string, string> = {
  "/producto/agentes-de-ia": "bot",
  "/producto/bandeja-de-whatsapp": "inbox",
  "/producto/crm-y-embudos": "kanban",
  "/producto/campanas-y-seguimiento": "repeat",
  "/producto/integraciones": "plug",
  "/soluciones/inmobiliarias": "home",
  "/soluciones/agencias-de-autos": "car",
  "/soluciones/clinicas-esteticas": "face",
  "/soluciones/tiendas-en-redes": "bag",
  "/soluciones/clinicas-dentales": "tooth",
  "/soluciones/consultorios-y-clinicas": "stethoscope",
  "/soluciones/financieras-y-sofom": "bank",
  "/soluciones/laboratorios-clinicos": "flask",
};

const RECURSOS_MENU: RouteEntry[] = [route("/blog")!, ...RESOURCE_PAGES, route("/docs/soporte")!];

const panel = "card p-2 shadow-[var(--shadow)]";

/* ───────────── Encabezado ───────────── */

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-line">
      <Container size="wide" className="h-16 flex items-center justify-between gap-4">
        <Link href="/" aria-label="root, inicio" className="shrink-0 text-ink">
          <RootLogo height={24} title="" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:flex items-center gap-0.5 text-[15px] font-medium text-ink">
          <Dropdown label="Producto" width="w-[560px]">
            <div className="grid grid-cols-2 gap-1">
              {PRODUCT_PAGES.map((r) => (
                <MenuItem key={r.path} r={r} />
              ))}
              <Link href="/producto/" className="rounded-xl px-3 py-3 text-[14px] font-semibold hover:bg-surface-2 inline-flex items-center gap-1.5">
                Todo el producto <Icon name="arrow" className="w-4 h-4" />
              </Link>
            </div>
          </Dropdown>
          <Dropdown label="Soluciones" width="w-[600px]">
            <div className="grid grid-cols-2 gap-1">
              {SOLUTION_PAGES.map((r) => (
                <MenuItem key={r.path} r={r} />
              ))}
            </div>
            <Link href="/soluciones/" className="mt-1 rounded-xl px-3 py-2.5 text-[14px] font-semibold bg-surface-2 hover:bg-line/60 flex items-center gap-1.5">
              Todas las industrias <Icon name="arrow" className="w-4 h-4" />
            </Link>
          </Dropdown>
          <Link href="/comparativas/" className="px-3 py-2 rounded-lg hover:bg-surface-2">
            Comparativas
          </Link>
          <Link href="/precios/" className="px-3 py-2 rounded-lg hover:bg-surface-2">
            Precios
          </Link>
          <Dropdown label="Recursos" width="w-[320px]">
            <ul className="flex flex-col">
              {RECURSOS_MENU.map((r) => (
                <li key={r.path}>
                  <Link href={withSlash(r.path)} className="block rounded-lg px-3 py-2.5 hover:bg-surface-2 text-[14px]">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Dropdown>
        </nav>

        <div className="flex items-center gap-2">
          <a href={APP_LOGIN_URL} className="hidden xl:inline-flex btn btn-ghost px-3 py-2 text-[15px]">
            Iniciar sesión
          </a>
          <CtaButton cta="header" size="sm" className="hidden sm:inline-flex" />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}

function Dropdown({ label, width, children }: { label: string; width: string; children: React.ReactNode }) {
  return (
    <div className="nav-dropdown">
      <button type="button" className="inline-flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-surface-2" aria-haspopup="true">
        {label} <Icon name="chevron" className="w-4 h-4" />
      </button>
      <div className="nav-panel pt-3">
        <div className={`${panel} ${width}`}>{children}</div>
      </div>
    </div>
  );
}

function MenuItem({ r }: { r: RouteEntry }) {
  return (
    <Link href={withSlash(r.path)} className="flex gap-3 rounded-xl p-3 hover:bg-surface-2">
      <span className="w-9 h-9 rounded-lg grid place-items-center shrink-0 bg-ink text-paper">
        <Icon name={MENU_ICON[r.path] ?? "sparkle"} className="w-[18px] h-[18px]" />
      </span>
      <span>
        <span className="block text-[14px] font-semibold leading-tight">{r.label}</span>
        {r.blurb ? <span className="block text-[13px] font-normal text-muted leading-snug mt-0.5">{r.blurb}</span> : null}
      </span>
    </Link>
  );
}

/** Menú móvil sin JS (<details>); MenuAutoClose lo cierra al navegar o con Escape. */
function MobileMenu() {
  const groups: { title: string; links: RouteEntry[] }[] = [
    { title: "Producto", links: PRODUCT_PAGES },
    { title: "Soluciones", links: SOLUTION_PAGES },
    { title: "Recursos", links: RECURSOS_MENU },
  ];
  return (
    <details className="lg:hidden relative">
      <MenuAutoClose />
      <summary className="list-none cursor-pointer w-11 h-11 rounded-xl border border-line grid place-items-center text-ink" aria-label="Abrir menú">
        <Icon name="menu" className="w-5 h-5" strokeWidth={2} />
      </summary>
      <div className="absolute right-0 top-14 w-[min(calc(100vw-32px),380px)] card p-4 shadow-[var(--shadow)] max-h-[75vh] overflow-auto">
        <Link href="/precios/" className="block rounded-lg px-2 py-2.5 hover:bg-surface-2 font-semibold text-[15px]">
          Precios
        </Link>
        <Link href="/comparativas/" className="block rounded-lg px-2 py-2.5 hover:bg-surface-2 font-semibold text-[15px]">
          Comparativas
        </Link>
        {groups.map((g) => (
          <div key={g.title} className="mt-3">
            <p className="kicker px-2">{g.title}</p>
            <ul className="mt-1 flex flex-col">
              {g.links.map((r) => (
                <li key={r.path}>
                  <Link href={withSlash(r.path)} className="block rounded-lg px-2 py-2 hover:bg-surface-2 text-[15px]">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <a href={APP_LOGIN_URL} className="mt-3 block rounded-lg px-2 py-2.5 hover:bg-surface-2 text-[15px]">
          Iniciar sesión
        </a>
        <CtaButton cta="menu-movil" className="w-full mt-3" />
      </div>
    </details>
  );
}

/* ───────────── Pie ───────────── */

export function SiteFooter() {
  const year = 2026;
  const cols: { title: string; links: { href: string; label: string }[] }[] = [
    { title: "Producto", links: [...PRODUCT_PAGES, route("/precios")!].map(toLink) },
    { title: "Soluciones", links: SOLUTION_PAGES.map(toLink) },
    { title: "Recursos", links: [route("/blog")!, ...RESOURCE_PAGES, route("/comparativas")!].map(toLink) },
    { title: "Empresa y legal", links: [route("/nosotros")!, route("/docs/soporte")!, ...LEGAL_PAGES].map(toLink) },
  ];
  return (
    <footer className="theme-dark border-t border-line">
      <Container size="wide" className="py-16 grid gap-x-6 gap-y-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <RootLogo height={28} />
          <p className="mt-4 text-muted leading-relaxed max-w-xs">
            {CATEGORY} para equipos comerciales en México. {TAGLINE}
          </p>
          <CtaButton cta="footer" size="sm" className="mt-6" />
          <ul className="mt-6 flex flex-col gap-2 text-[14px] text-muted">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-ink">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href={APP_LOGIN_URL} className="hover:text-ink">
                Iniciar sesión en root
              </a>
            </li>
          </ul>
          <address className="mt-6 not-italic text-[13px] text-muted leading-relaxed max-w-xs">{ADDRESS_LINE}</address>
        </div>
        {cols.map((c) => (
          <FooterCol key={c.title} title={c.title} links={c.links} />
        ))}
      </Container>
      <div className="border-t border-line">
        <Container size="wide" className="py-6 flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between text-[13px] text-muted">
          <span>© {year} root. Todos los derechos reservados. Hecho en la Ciudad de México.</span>
          <ProductByNextiaSignature dark size={18} />
        </Container>
      </div>
    </footer>
  );
}

const toLink = (r: RouteEntry) => ({ href: withSlash(r.path), label: r.label });

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="kicker">{title}</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-ink/80 hover:text-ink text-[14px] leading-snug">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────── Botón flotante de WhatsApp (todo el sitio) ───────────── */

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="flotante"
      aria-label={CTA_LABEL}
      className="wa-float btn btn-primary w-14 h-14 rounded-full shadow-[0_14px_34px_-12px_rgba(11,11,12,.55)] md:w-auto md:h-auto md:px-5 md:py-3.5"
    >
      <WhatsAppGlyph className="w-6 h-6 md:w-5 md:h-5" />
      <span className="hidden md:inline text-[15px]">WhatsApp</span>
    </a>
  );
}
