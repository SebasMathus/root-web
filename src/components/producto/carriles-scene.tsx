"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { EASE, useSceneLoop } from "@/components/motion/kit";
import { GUIDE_PHRASE } from "@/lib/site";
import { DualScene, SceneNote } from "./scene-frame";
import { Avatar } from "./parts";

/*
 * D2 · Carriles: quién atiende cada etapa (concepto de «cómo trabaja root»; plan §4).
 * Kanban de 6 etapas. Las primeras van en el carril del agente (lima) y las demás en el del equipo (cielo); entre
 * los dos, la línea de Relevo. Las tarjetas avanzan una etapa por paso y, al cruzar el relevo, toman el avatar de
 * un vendedor. El control de abajo mueve el relevo (botones reales, fuera del lienzo aria-hidden).
 * Reposo = las 5 tarjetas repartidas en el tablero. Nunca se vacía: el tablero siempre tiene cinco tarjetas.
 * Mientras una tarjeta todavía no entra en este ciclo, su lugar lo ocupa un prospecto del ciclo anterior
 * (`prev`) que sigue avanzando hacia Ganado: el embudo fluye, una etapa por paso, sin columnas vacías de golpe.
 */

const STAGES = ["Nuevo", "Respondido", "Calificado", "Cita", "Propuesta", "Ganado"];

type Prospect = { id: string; name: string; detail: string; seller: string };
const CARDS: (Prospect & { end: number; prev?: Prospect })[] = [
  { id: "mariana", name: "Mariana L.", detail: "Narvarte · $3.2 M", seller: "AR", end: 5 },
  {
    id: "jorge",
    name: "Jorge P.",
    detail: "Del Valle · renta $18,000",
    seller: "PV",
    end: 4,
    prev: { id: "carla", name: "Carla N.", detail: "Polanco · $4.1 M", seller: "PV" },
  },
  {
    id: "sofia",
    name: "Sofía M.",
    detail: "Coyoacán · contado",
    seller: "AR",
    end: 3,
    prev: { id: "diego", name: "Diego S.", detail: "Narvarte · renta $15,000", seller: "AR" },
  },
  {
    id: "luis",
    name: "Luis G.",
    detail: "Roma · Fovissste",
    seller: "PV",
    end: 2,
    prev: { id: "elena", name: "Elena V.", detail: "Coyoacán · Infonavit", seller: "PV" },
  },
  {
    id: "ana",
    name: "Ana C.",
    detail: "Escandón · $2.8 M",
    seller: "AR",
    end: 0,
    prev: { id: "raul", name: "Raúl H.", detail: "Del Valle · contado", seller: "AR" },
  },
];

/** Opciones del relevo: índice de la última etapa que atiende el agente. */
const HANDOFFS = [1, 2, 3];

const LAST = 5;
const posAt = (end: number, step: number) => end - (LAST - step);

type Card = Prospect;

function KanbanCard({ card, team, animate }: { card: Card; team: boolean; animate: boolean }) {
  return (
    <motion.div
      initial={animate ? { x: "-0.9em" } : false}
      animate={{ x: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`rounded-[0.6em] border bg-surface px-[0.55em] py-[0.45em] flex items-center gap-[0.45em] shadow-[0_0.3em_0.8em_-0.5em_rgba(0,0,0,.25)] ${
        team ? "border-sky/50" : "border-lime/40"
      }`}
    >
      <Avatar initials={team ? card.seller : "IA"} role={team ? "equipo" : "agente"} />
      <span className="min-w-0">
        <span className="block text-[0.7em] font-semibold text-ink leading-tight truncate">{card.name}</span>
        <span className="block text-[0.6em] text-muted leading-tight truncate">{card.detail}</span>
      </span>
    </motion.div>
  );
}

/** Tablero en un paso: cada tarjeta avanza una etapa por paso; si aún no entra, su lugar es del prospecto anterior. */
function boardAt(step: number) {
  const placed = CARDS.map((c) => {
    const p = posAt(c.end, step);
    return p >= 0 ? { card: c as Card, col: p } : { card: c.prev ?? (c as Card), col: p + STAGES.length };
  });
  return STAGES.map((_, col) => placed.filter((x) => x.col === col).map((x) => x.card));
}

function Wide({ step, last, animate }: { step: number; last: number; animate: boolean }) {
  const board = boardAt(step);
  const agentCols = last + 1;
  return (
    <div className="rounded-[1em] border border-line bg-surface p-[0.9em] shadow-[var(--shadow)]">
      {/* Franjas de carril: se recorren con el relevo. */}
      <div className="grid grid-cols-6 gap-[0.5em] mb-[0.5em]">
        <div
          className="rounded-full bg-lime-fill text-fixed-ink text-[0.66em] font-bold px-[0.9em] py-[0.3em] transition-all duration-500"
          style={{ gridColumn: `1 / span ${agentCols}` }}
        >
          Carril del agente
        </div>
        <div
          className="rounded-full bg-sky text-paper text-[0.66em] font-bold px-[0.9em] py-[0.3em] transition-all duration-500"
          style={{ gridColumn: `${agentCols + 1} / -1` }}
        >
          Carril del equipo
        </div>
      </div>
      <div className="relative grid grid-cols-6 gap-[0.5em]">
        {STAGES.map((stage, col) => {
          const team = col > last;
          return (
            <div
              key={stage}
              className={`relative rounded-[0.7em] p-[0.45em] min-h-[4.2em] transition-colors duration-500 ${team ? "bg-sky-soft" : "bg-lime-soft"}`}
            >
              <p className={`text-[0.66em] font-bold uppercase tracking-[0.06em] px-[0.2em] mb-[0.5em] ${team ? "text-sky" : "text-lime"}`}>
                {stage}
              </p>
              <div className="flex flex-col gap-[0.4em]">
                {board[col].map((c) => (
                  <KanbanCard key={`${c.id}-${col}`} card={c} team={team} animate={animate} />
                ))}
              </div>
              {col === last ? (
                <span className="absolute -right-[0.31em] top-[-0.4em] bottom-[-0.4em] border-l-[0.12em] border-dashed border-ink/60 z-[2]">
                  <span className="absolute -translate-x-1/2 bottom-[-1.5em] whitespace-nowrap rounded-full bg-ink text-paper text-[0.6em] font-bold px-[0.7em] py-[0.15em]">
                    Relevo
                  </span>
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="h-[1.2em]" />
    </div>
  );
}

function Narrow({ step, last, animate }: { step: number; last: number; animate: boolean }) {
  const board = boardAt(step);
  return (
    <div className="rounded-[1em] border border-line bg-surface p-[0.8em] shadow-[var(--shadow)] flex flex-col gap-[0.45em]">
      {STAGES.map((stage, col) => {
        const team = col > last;
        return (
          <div key={stage}>
            {col === 0 || col === last + 1 ? (
              <p className={`text-[0.66em] font-bold mb-[0.3em] ${team ? "text-sky" : "text-lime"}`}>
                {team ? "Carril del equipo" : "Carril del agente"}
              </p>
            ) : null}
            <div
              className={`rounded-[0.7em] p-[0.5em] flex items-start gap-[0.6em] min-h-[3.2em] transition-colors duration-500 ${team ? "bg-sky-soft" : "bg-lime-soft"}`}
            >
              <p
                className={`w-[7.4em] shrink-0 pt-[0.5em] text-[0.68em] font-bold uppercase tracking-[0.05em] ${team ? "text-sky" : "text-lime"}`}
              >
                {stage}
              </p>
              <div className="flex-1 min-w-0 grid grid-cols-1 gap-[0.35em]">
                {board[col].map((c) => (
                  <KanbanCard key={`${c.id}-${col}`} card={c} team={team} animate={animate} />
                ))}
              </div>
            </div>
            {col === last ? (
              <div className="relative my-[0.55em] border-t-[0.12em] border-dashed border-ink/60">
                <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink text-paper text-[0.62em] font-bold px-[0.8em] py-[0.15em]">
                  Relevo
                </span>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function CarrilesScene() {
  const [last, setLast] = useState(2);
  // 0–4: las tarjetas avanzan una etapa por paso · 5: tablero completo (reposo)
  const { ref, step, playing } = useSceneLoop<HTMLDivElement>([1300, 1300, 1300, 1300, 1300, 4200]);
  const caption =
    `Ejemplo de embudo inmobiliario con seis etapas: ${STAGES.join(", ")}. ` +
    `El agente de root atiende de Nuevo a ${STAGES[last]} y tu equipo de ${STAGES[last + 1]} a Ganado; entre las dos, la línea de relevo. ` +
    "Cinco prospectos avanzan por el tablero: Mariana L. ya está en Ganado, Jorge P. en Propuesta, Sofía M. en Cita, Luis G. en Calificado y Ana C. acaba de entrar. " +
    "Al cruzar el relevo, cada tarjeta toma el avatar de un vendedor: Andrés R. o Paola V.";

  return (
    <div ref={ref}>
      <DualScene
        caption={caption}
        wideBase={900}
        narrowBase={380}
        wide={<Wide step={step} last={last} animate={playing} />}
        narrow={<Narrow step={step} last={last} animate={playing} />}
      />
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Mueve el relevo entre el agente y tu equipo" className="flex flex-wrap gap-2">
          {HANDOFFS.map((h) => (
            <button
              key={h}
              type="button"
              aria-pressed={h === last}
              onClick={() => setLast(h)}
              className={`chip cursor-pointer ${h === last ? "chip-equipo" : "hover:border-ink"}`}
            >
              Relevo después de {STAGES[h]}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted" aria-live="polite">
          Tu agente atiende hasta <strong className="text-ink">{STAGES[last]}</strong>. Desde{" "}
          <strong className="text-ink">{STAGES[last + 1]}</strong>, tu equipo.
        </p>
      </div>
      <SceneNote concept>{GUIDE_PHRASE}</SceneNote>
    </div>
  );
}
