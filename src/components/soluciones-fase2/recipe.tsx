import { Icon } from "@/components/icons";
import { RoleChip } from "@/components/ui";
import type { Recipe, RecipeStage } from "./types";

/**
 * La Receta de una industria (glosario: «Recetas», concepto de cómo trabaja root): etapas del embudo con su
 * carril (agente en lima, equipo en cielo) y los relevos, las preguntas para calificar y la cadencia de
 * seguimiento. Componente de servidor: es estático y se lee completo sin JS.
 */
function Funnel({ stages, label }: { stages: RecipeStage[]; label: string }) {
  return (
    <ol aria-label={label} className="mt-6 flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-stretch">
      {stages.map((s, i) => {
        const prev = stages[i - 1];
        const change = prev && prev.lane !== s.lane;
        const agent = s.lane === "agente";
        return (
          <li key={s.name} className="flex flex-col gap-2 lg:flex-row lg:flex-1 lg:min-w-[140px]">
            {change ? (
              <span
                aria-hidden="true"
                className={`flex items-center gap-2 lg:flex-col lg:justify-center mono text-[11px] uppercase tracking-[0.1em] ${agent ? "text-lime" : "text-sky"}`}
              >
                <span className={`w-6 border-t-2 lg:w-0 lg:h-6 lg:border-t-0 lg:border-l-2 border-dashed ${agent ? "border-lime" : "border-sky"}`} />
                {agent ? "Vuelve" : "Relevo"}
              </span>
            ) : null}
            <span
              className={`flex flex-1 items-center gap-2.5 rounded-xl px-3.5 py-3 text-[15px] font-semibold text-ink ${agent ? "bg-lime-soft" : "bg-sky-soft"}`}
            >
              <span className={`mono text-xs ${agent ? "text-lime" : "text-sky"}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className="leading-snug">{s.name}</span>
              <span className="sr-only">
                {change ? (agent ? "(regresa al agente)" : "(relevo: la atiende tu equipo)") : agent ? "(la atiende el agente)" : "(la atiende tu equipo)"}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function RecipeBoard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="grid gap-6">
      {/* Etapas y carriles */}
      <article className="card p-6 md:p-8" aria-labelledby="receta-etapas">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 id="receta-etapas" className="h-card text-lg text-ink">
            1 · Etapas del embudo
          </h3>
          <div className="flex flex-wrap gap-2">
            <RoleChip role="agente">Carril del agente</RoleChip>
            <RoleChip role="equipo">Carril del equipo</RoleChip>
          </div>
        </div>
        <Funnel stages={recipe.stages} label="Etapas del embudo" />
        {recipe.altFunnel ? (
          <>
            <h4 className="mt-8 font-semibold text-ink">{recipe.altFunnel.title}</h4>
            <Funnel stages={recipe.altFunnel.stages} label={recipe.altFunnel.title} />
          </>
        ) : null}
        <p className="mt-5 text-sm text-muted leading-relaxed">
          En lima, lo que atiende tu agente. En cielo, lo que atiende tu equipo. Donde cambia el color hay un relevo: la conversación pasa con el historial
          completo. Tú decides dónde va cada relevo.
        </p>
      </article>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Preguntas */}
        <article className="card p-6 md:p-8" aria-labelledby="receta-preguntas">
          <h3 id="receta-preguntas" className="h-card text-lg text-ink">
            2 · Preguntas para calificar
          </h3>
          <p className="mt-2 text-sm text-muted">El agente las hace en la conversación, con tu tono, y no repite lo que ya le dijeron.</p>
          <ul className="mt-5 grid gap-2.5">
            {recipe.questions.map((q) => (
              <li key={q} className="flex items-start gap-3">
                <span className="mt-1 w-6 h-6 shrink-0 rounded-lg bg-lime-soft text-lime grid place-items-center">
                  <Icon name="question" className="w-3.5 h-3.5" strokeWidth={2.2} />
                </span>
                <span className="text-ink leading-relaxed">{q}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* Cadencia */}
        <article className="card p-6 md:p-8" aria-labelledby="receta-cadencia">
          <h3 id="receta-cadencia" className="h-card text-lg text-ink">
            3 · {recipe.cadenceTitle}
          </h3>
          <ol className="mt-5 relative grid gap-4 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-line">
            {recipe.cadence.map((c) => (
              <li key={c.when} className="relative grid grid-cols-[32px_1fr] gap-3">
                <span className="relative z-10 mt-0.5 w-8 h-8 rounded-full bg-surface border border-line grid place-items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-lime-fill" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm">
                    <span className="mono text-ink">{c.when}</span> <span className="text-muted">· {c.label}</span>
                  </p>
                  <p className="mt-1.5 w-fit max-w-full rounded-2xl rounded-tl-md bg-lime-soft px-3.5 py-2 text-[15px] text-ink leading-snug">{c.message}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-muted leading-relaxed">{recipe.cadenceNote}</p>
        </article>
      </div>
    </div>
  );
}
