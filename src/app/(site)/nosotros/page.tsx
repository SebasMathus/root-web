import Link from "next/link";
import { NextiaLogo, ProductByNextiaSignature, RootMarkAnimated } from "@/components/brand";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { ProductByNextia } from "@/components/product-by-nextia";
import { CheckList, CtaBand, CtaButton, FeatureGrid, LinkButton, PageHero, Section, SectionHeader } from "@/components/ui";
import { absoluteUrl, ADDRESS_LINE, CONTACT_EMAIL, GUIDE_PHRASE, PARENT, SITE_URL, SUPPORT_HOURS, TAGLINE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

/*
 * Nosotros (plan §3.7). Búsquedas navegacionales: «root crm», «goroot».
 * Por qué existe root, cómo pensamos, hecho por Nextia, dónde estamos y cómo contactarnos. Sin cifras de clientes,
 * sin testimonios y sin equipo con nombres (no hay datos publicados). Razón social y RFC siguen pendientes (plan §6.4).
 */

export const metadata = pageMetadata({
  title: "Nosotros: root CRM, hecho en la Ciudad de México",
  description:
    "root CRM: quiénes somos. Hacemos el CRM de WhatsApp con agentes de IA en la Ciudad de México, como producto de Nextia. Por qué existe y cómo contactarnos.",
  path: "/nosotros",
  ownOgImage: true,
});

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_LINE)}`;

const PAINS = [
  { title: "Tus clientes quieren WhatsApp", text: "Preguntan, cotizan y compran por ahí. Pedirles que llenen un formulario o que llamen ya no funciona.", icon: "chat" },
  { title: "Herramientas que no se hablan", text: "El CRM por un lado, la cobranza en Excel, el soporte en otro sistema y los chats en celulares sueltos.", icon: "plug" },
  { title: "Todo a mano", text: "Contestar, preguntar lo mismo de siempre, recordar a quién volver a escribir. El equipo se gasta el día en eso.", icon: "repeat" },
  { title: "Sin datos para decidir", text: "Nadie sabe bien cuántos prospectos llegaron, cuántos se atendieron a tiempo ni de qué campaña venían.", icon: "chart" },
];

const PRINCIPLES = [
  {
    title: "Tu equipo al centro",
    text: "El agente de IA hace el trabajo pesado: contesta, califica y da seguimiento. Las decisiones y el cierre son de tu gente.",
    icon: "users",
    role: "equipo" as const,
  },
  {
    title: "La cartera es de tu empresa",
    text: "Las conversaciones viven en el número de tu empresa, no en el celular de nadie. Si alguien se va, la cartera se queda.",
    icon: "building",
  },
  {
    title: "Pocas cifras, todas con fuente",
    text: "No publicamos números que no podamos respaldar. Lo que decimos de otros productos sale de sus páginas públicas, con enlace y fecha.",
    icon: "file",
  },
  {
    title: "En pesos y en español de México",
    text: "Precios en MXN, ejemplos de aquí (Infonavit, enganche, meses sin intereses) y soporte en horario de la Ciudad de México.",
    icon: "pin",
    role: "agente" as const,
  },
];

export default function NosotrosPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: absoluteUrl("/nosotros"),
          name: "Nosotros · root",
          inLanguage: "es-MX",
          about: { "@id": `${SITE_URL}/#organization` },
        }}
      />

      <PageHero
        breadcrumbs={[{ name: "Nosotros", href: "/nosotros" }]}
        kicker="Nosotros"
        title="root: el CRM de WhatsApp que hacemos en la Ciudad de México"
        intro="Hacemos root para equipos comerciales que venden por WhatsApp y quieren que la IA haga el trabajo pesado sin perder el control de su cartera. Es un producto de Nextia."
        cta="nosotros-hero"
        visual={
          <div className="card grid-bg flex flex-col items-center gap-7 px-6 py-12 text-center shadow-[var(--shadow)] md:py-16">
            <RootMarkAnimated size={128} />
            <p className="font-display text-2xl font-extrabold tracking-[-0.015em] text-ink">{TAGLINE}</p>
            <ProductByNextiaSignature size={22} />
            <p className="flex items-center gap-2 text-sm text-muted">
              <Icon name="pin" className="h-4 w-4" />
              Lomas de Chapultepec, Ciudad de México
            </p>
          </div>
        }
      />

      {/* Por qué existe root */}
      <Section tone="gris" labelledBy="porque-titulo">
        <SectionHeader
          id="porque-titulo"
          kicker="Por qué existe root"
          title="Los equipos venden por WhatsApp, pero sin trazabilidad ni control"
          intro="El negocio se mueve por WhatsApp y nadie tiene la foto completa. root nace para juntar en un solo lugar las conversaciones, el seguimiento y los sistemas de tu empresa, con agentes de IA que contestan en segundos."
        />
        <FeatureGrid cols={4} items={PAINS.map((p) => ({ title: p.title, text: p.text, icon: p.icon, role: "alerta" as const }))} />
      </Section>

      {/* Cómo pensamos */}
      <Section labelledBy="principios-titulo">
        <SectionHeader id="principios-titulo" kicker="Cómo pensamos" title={GUIDE_PHRASE} intro="Cuatro ideas guían cómo hacemos root y cómo hablamos de él." />
        <FeatureGrid cols={2} items={PRINCIPLES} />
      </Section>

      <ProductByNextia />

      {/* Hecho por Nextia */}
      <Section labelledBy="nextia-titulo">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <SectionHeader
              id="nextia-titulo"
              kicker="Hecho por Nextia"
              title="root es un producto de Nextia"
              intro="Nextia hace productos de software para empresas en México: root, el CRM de WhatsApp con agentes de IA para equipos comerciales, y Eugenia, software para administrar condominios."
              className="mb-6 md:mb-8"
            />
            <CheckList
              items={[
                "Oficina en Lomas de Chapultepec, en la Ciudad de México",
                "Te acompañamos en el arranque, desde el trámite de la API oficial de WhatsApp Business",
                "Precios en pesos mexicanos y facturación mensual",
              ]}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={PARENT.url} rel="noopener" className="btn btn-outline px-5 py-3 text-[15px]">
                Conoce Nextia
                <Icon name="external" className="h-4 w-4" />
              </a>
              <LinkButton href="/producto" label="Conoce root" variant="ghost" />
            </div>
          </div>
          <div className="card flex flex-col items-center gap-6 p-10 text-center">
            <NextiaLogo height={34} />
            <p className="max-w-sm text-muted leading-relaxed">
              Las organizaciones de la franja de arriba han trabajado con Nextia. No son casos de root: cuando tengamos clientes de root que quieran
              contar su historia, aparecerán aquí con su nombre.
            </p>
          </div>
        </div>
      </Section>

      {/* Dónde estamos y contacto */}
      <Section tone="gris" labelledBy="contacto-titulo">
        <SectionHeader id="contacto-titulo" kicker="Dónde estamos" title="Oficina en la Ciudad de México" intro="La forma más rápida de hablar con nosotros es por WhatsApp. También puedes escribirnos por correo." />
        <div className="grid gap-5 md:grid-cols-3">
          <div className="card flex flex-col gap-3 p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-paper">
              <Icon name="pin" className="h-5 w-5" />
            </span>
            <h3 className="h-card text-lg text-ink">Dirección</h3>
            <p className="leading-relaxed text-muted">{ADDRESS_LINE}</p>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-ink">
              Ver en el mapa <Icon name="external" className="h-4 w-4" />
            </a>
          </div>
          <div className="card flex flex-col gap-3 p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-lime-soft text-lime">
              <Icon name="chat" className="h-5 w-5" />
            </span>
            <h3 className="h-card text-lg text-ink">WhatsApp y correo</h3>
            <p className="leading-relaxed text-muted">
              Ventas y dudas por WhatsApp. Por correo:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-2">
                {CONTACT_EMAIL}
              </a>
            </p>
            <CtaButton cta="nosotros-contacto" size="sm" className="mt-auto w-fit" />
          </div>
          <div className="card flex flex-col gap-3 p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-soft text-sky">
              <Icon name="clock" className="h-5 w-5" />
            </span>
            <h3 className="h-card text-lg text-ink">Soporte</h3>
            <p className="leading-relaxed text-muted">{SUPPORT_HOURS} El soporte dedicado 24/7 es del plan Enterprise.</p>
            <LinkButton href="/docs/soporte" label="Ir a soporte" size="sm" className="mt-auto w-fit" />
          </div>
        </div>
        <p className="mt-8 text-sm text-muted">
          ¿Quieres saber cómo tratamos tus datos? Lee{" "}
          <Link href="/seguridad-y-privacidad/" className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-2">
            seguridad y privacidad
          </Link>{" "}
          y nuestro{" "}
          <Link href="/docs/aviso-de-privacidad/" className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-2">
            aviso de privacidad
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        kicker={TAGLINE}
        title="Platiquemos de cómo vende tu equipo por WhatsApp"
        text="Escríbenos y te mostramos root con los casos de tu equipo. Si te convence, revisamos juntos qué plan te conviene."
        cta="nosotros-final"
      />
    </>
  );
}
