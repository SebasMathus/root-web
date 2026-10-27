import { FeatureGrid, Section, SectionHeader } from "@/components/ui";
import { PRODUCT_PAGES } from "@/lib/routes";

/** Ícono de cada página de producto (el mismo de la portada). */
export const PRODUCT_ICONS: Record<string, string> = {
  "/producto/agentes-de-ia": "bot",
  "/producto/bandeja-de-whatsapp": "inbox",
  "/producto/crm-y-embudos": "kanban",
  "/producto/campanas-y-seguimiento": "repeat",
  "/producto/integraciones": "plug",
};

/** Enlaces a las páginas hermanas de producto (todas menos la actual). */
export function RelatedProducts({ current, tone = "claro" }: { current: string; tone?: "claro" | "gris" }) {
  const items = PRODUCT_PAGES.filter((r) => r.path !== current).map((r) => ({
    title: `${r.verb} · ${r.label}`,
    text: r.blurb ?? "",
    href: r.path,
    icon: PRODUCT_ICONS[r.path],
    role: r.path === "/producto/agentes-de-ia" ? ("agente" as const) : undefined,
  }));
  return (
    <Section tone={tone} labelledBy="mas-producto-titulo" pad="md">
      <SectionHeader id="mas-producto-titulo" kicker="Sigue explorando" title="El resto de root" />
      <FeatureGrid items={items} cols={4} />
    </Section>
  );
}
