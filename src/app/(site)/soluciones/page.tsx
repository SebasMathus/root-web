import { Icon } from "@/components/icons";
import { ProductByNextia } from "@/components/product-by-nextia";
import { HERO_NOTE, planFaq, SOLUTION_ICONS, startFaq } from "@/components/soluciones/shared";
import type { Lane } from "@/components/soluciones/types";
import { PlanAndSiblings } from "@/components/soluciones/vertical-page";
import { CtaBand, Faq, FeatureGrid, PageHero, Section, SectionHeader } from "@/components/ui";
import { SOLUTION_PAGES } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { GUIDE_PHRASE } from "@/lib/site";
import { vertical as autos } from "./agencias-de-autos/_data";
import { vertical as esteticas } from "./clinicas-esteticas/_data";
import { vertical as inmobiliarias } from "./inmobiliarias/_data";
import { vertical as tiendas } from "./tiendas-en-redes/_data";
import { SEO } from "./_seo";

/* Índice de Soluciones (plan §3.3): las 8 industrias, qué trae una Receta y lo que root hace en todas. */

export const metadata = pageMetadata({ title: SEO.title, description: SEO.description, path: "/soluciones", ownOgImage: true });

const RECIPES = [inmobiliarias, autos, esteticas, tiendas];

export default function SolucionesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Soluciones", href: "/soluciones" }]}
        kicker="Soluciones por industria"
        title="CRM de WhatsApp con agentes de IA, hecho para tu industria"
        intro="Cada industria vende distinto. Por eso root arranca con una Receta para la tuya: las etapas de tu embudo, las preguntas que califican a un prospecto y el seguimiento que funciona en tu negocio."
        cta="soluciones-hero"
        note={HERO_NOTE}
        visual={<RecipeMatrix />}
      />

      <Section tone="gris" labelledBy="industrias-titulo">
        <SectionHeader
          id="industrias-titulo"
          kicker="Industrias"
          title="Elige tu industria"
          intro="Inmobiliarias, agencias de autos, clínicas, tiendas en redes y financieras: cada página trae su Receta, sus casos de uso y sus preguntas frecuentes."
        />
        <FeatureGrid cols={4} items={SOLUTION_PAGES.map((r) => ({ title: r.label, text: r.blurb ?? "", icon: SOLUTION_ICONS[r.path], href: r.path }))} />
      </Section>

      <Section tone="claro" labelledBy="receta-titulo">
        <SectionHeader
          id="receta-titulo"
          kicker="Cómo trabaja root"
          title="Qué trae la Receta de tu industria"
          intro="La Receta es el punto de partida de tu CRM de WhatsApp: llega armada para tu industria y durante el arranque la ajustamos contigo."
        />
        <FeatureGrid
          items={[
            { icon: "kanban", title: "Etapas del embudo", text: "Las etapas por las que pasa un prospecto en tu industria, del primer mensaje al cierre." },
            { icon: "handoff", role: "equipo", title: "Carriles", text: "Qué etapas atiende tu agente (carril del agente) y cuáles tu equipo (carril del equipo), con el punto de relevo marcado." },
            { icon: "target", role: "agente", title: "Preguntas de calificación", text: "Lo que tu equipo necesita saber antes de atender: presupuesto, zona, modelo, tratamiento o talla. Llenan la Ficha viva." },
            { icon: "check", title: "Reglas de pase", text: "La condición para pasar el prospecto a tu equipo, en lenguaje natural: «dio presupuesto y zona, y aceptó una visita»." },
            { icon: "repeat", role: "agente", title: "Cadencias de seguimiento", text: "Qué escribe tu agente y cuándo, si el prospecto deja de contestar. Cuando responde, la cadencia se detiene." },
            { icon: "chat", role: "agente", title: "Respuestas base", text: "Las preguntas de siempre de tu industria, contestadas con la información que tú le das a tu agente." },
          ]}
        />
      </Section>

      <ProductByNextia />

      <Section tone="claro" labelledBy="habilidades-titulo">
        <SectionHeader
          id="habilidades-titulo"
          kicker="En cualquier industria"
          title={GUIDE_PHRASE}
          intro="Cambian las preguntas y las etapas; lo que hace tu agente es lo mismo en todas las industrias. Y todo pasa por el número de tu empresa: la cartera es tuya, no del vendedor."
        />
        <FeatureGrid
          items={[
            { icon: "chat", role: "agente", title: "Responde", text: "Contesta en segundos, a cualquier hora, en WhatsApp e Instagram." },
            { icon: "target", role: "agente", title: "Califica", text: "Hace las preguntas de tu negocio y deja las respuestas en la ficha del prospecto." },
            { icon: "calendar", role: "agente", title: "Agenda", text: "Agenda visitas, pruebas de manejo o valoraciones, y las recuerda antes de la cita." },
            { icon: "repeat", role: "agente", title: "Da seguimiento", text: "Retoma la conversación cuando el prospecto deja de contestar." },
            { icon: "sparkle", role: "agente", title: "Reactiva", text: "Vuelve a escribirles a prospectos y clientes de antes." },
            { icon: "handoff", role: "equipo", title: "Pasa a tu equipo", text: "Con todo el historial, para que tu equipo cierre sin repetir preguntas." },
          ]}
        />
      </Section>

      <PlanAndSiblings
        id="soluciones-precio"
        cta="soluciones-precio"
        siblings={["/producto/agentes-de-ia", "/producto/crm-y-embudos", "/producto/bandeja-de-whatsapp"]}
        siblingsTitle="Conoce el producto"
        showAll={false}
      />

      <Faq
        id="soluciones-preguntas"
        tone="claro"
        title="Preguntas frecuentes sobre root por industria"
        items={[
          {
            q: "¿Qué pasa si mi industria no está en la lista?",
            a: "root está hecho para cualquier equipo que vende o atiende por WhatsApp; las páginas por industria son solo un punto de partida. Escríbenos y durante el arranque armamos contigo las etapas, las preguntas y el seguimiento de tu negocio.",
          },
          {
            q: "¿Puedo cambiar la Receta de mi industria?",
            a: "Sí. La Receta es un punto de partida: cambias etapas, preguntas de calificación, reglas de pase, días de seguimiento y el tono de tu agente según tu forma de vender.",
          },
          {
            q: "¿Hay un plan distinto para cada industria?",
            a: "No. Los planes son los mismos para todas las industrias: Básico, Pro y Enterprise, con precios en pesos. Lo que cambia es cómo configuramos tu agente y tu embudo.",
          },
          planFaq(),
          startFaq(),
        ]}
      />

      <CtaBand
        cta="soluciones-final"
        kicker="Que nadie se quede en visto"
        title="¿No ves tu industria? Escríbenos."
        text="Cuéntanos cómo vendes hoy por WhatsApp y te mostramos cómo trabajaría root con tus etapas y tus preguntas."
      />
    </>
  );
}

/* ───────────── Visual del hero: las etapas de cada Receta de fase 1, con sus carriles (estático) ───────────── */

function RecipeMatrix() {
  const laneBg: Record<Lane, string> = { agente: "bg-lime-fill", equipo: "bg-sky" };
  return (
    <figure className="card m-0 p-5 shadow-[var(--shadow)] md:p-6">
      <div aria-hidden="true">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="kicker">Recetas por industria</span>
          <span className="flex gap-2">
            <span className="chip chip-agente">Agente</span>
            <span className="chip chip-equipo">Equipo</span>
          </span>
        </div>
        <ul className="mt-5 flex flex-col divide-y divide-line">
          {RECIPES.map((v) => (
            <li key={v.path} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink">
                  <Icon name={SOLUTION_ICONS[v.path] ?? "sparkle"} className="h-[18px] w-[18px]" />
                </span>
                <span className="font-semibold text-ink">{v.label}</span>
              </div>
              <div className="mt-3 flex gap-1">
                {v.recipe.stages.map((s) => (
                  <span key={s.name} className={`h-1.5 flex-1 rounded-full ${laneBg[s.lane]}`} />
                ))}
              </div>
              <p className="mt-2 text-[13px] leading-snug text-muted">{v.recipe.stages.map((s) => s.name).join(" → ")}</p>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="sr-only">
        Etapas de la Receta de cada industria y quién las atiende.{" "}
        {RECIPES.map((v) => `${v.label}: ${v.recipe.stages.map((s) => `${s.name} (${s.lane === "agente" ? "agente" : "equipo"})`).join(", ")}.`).join(" ")}
      </figcaption>
    </figure>
  );
}
