"use client";
import { RootMark } from "@/components/brand";
import { Icon } from "@/components/icons";
import { useSceneLoop } from "@/components/motion/kit";
import { Avatar, Canvas } from "./canvas";

/*
 * D2 · Carriles: quién atiende cada etapa (plan §4). Concepto de cómo trabaja root, sin interruptores (el cambio
 * de carril por etapa es una propuesta de producto: aquí solo se explica).
 * Kanban de 6 etapas. Detrás, dos franjas: el carril del agente (lima, de Nuevo a Calificado) y el carril del
 * equipo (cielo, de Cita a Ganado), con la línea de «Relevo» entre las dos. Cinco prospectos avanzan; al cruzar
 * el relevo cada tarjeta toma el avatar de su vendedor. El servidor pinta el tablero final, con las cinco tarjetas
 * repartidas. Dos composiciones con el mismo bucle (container query, 640 px): el tablero ancho y, en pantallas
 * chicas, una fila por prospecto con su pista de seis etapas. Las dos escalan uniforme (em + cqw): nada se corta
 * ni pide desplazarse.
 */

const COLS = ["Nuevo", "Respondido", "Calificado", "Cita", "Propuesta", "Ganado"];
const RELEVO = 3; // primera columna del carril del equipo

type Card = { name: string; detail: string; final: number; seller: { initials: string; name: string } };
const CARDS: Card[] = [
  { name: "Mariana L.", detail: "Narvarte · $3.2 M", final: 5, seller: { initials: "AR", name: "Andrés R." } },
  { name: "Jorge P.", detail: "Del Valle · renta $18,000", final: 4, seller: { initials: "PV", name: "Paola V." } },
  { name: "Sofía M.", detail: "Coyoacán · contado", final: 3, seller: { initials: "AR", name: "Andrés R." } },
  { name: "Luis G.", detail: "Roma · Fovissste", final: 2, seller: { initials: "PV", name: "Paola V." } },
  { name: "Ana C.", detail: "Escandón · $2.8 M", final: 1, seller: { initials: "AR", name: "Andrés R." } },
];

/** Cada paso las tarjetas avanzan una etapa; el último (rest) es el tablero final. */
const DURATIONS = [1300, 1300, 1300, 3600] as const;
const ROW = 4.8; // em por fila de tarjeta
const colW = "(100% / 6)";

function CardView({ card, col }: { card: Card; col: number }) {
  const team = col >= RELEVO;
  const won = col === COLS.length - 1;
  return (
    <div
      className={`rounded-[0.7em] border bg-surface px-[0.6em] py-[0.5em] shadow-[0_0.5em_1.2em_-0.9em_rgba(0,0,0,0.45)] transition-colors duration-500 ${
        won ? "border-success" : team ? "border-sky/50" : "border-lime/50"
      }`}
    >
      <p className="truncate text-[0.74em] font-bold leading-tight text-ink">{card.name}</p>
      <p className="truncate text-[0.6em] text-muted">{card.detail}</p>
      <div className="mt-[0.4em] flex items-center gap-[0.35em] text-[0.58em]">
        {team ? (
          <>
            <Avatar initials={card.seller.initials} className="text-[0.85em]" />
            <span className="truncate font-semibold text-sky">{card.seller.name}</span>
            {won ? <Icon name="check" className="ml-auto h-[1.1em] w-[1.1em] shrink-0 text-success" strokeWidth={2.6} /> : null}
          </>
        ) : (
          <>
            <span className="grid size-[1.6em] shrink-0 place-items-center rounded-full bg-lime-soft">
              <RootMark variant="plain" tone="auto" className="h-auto w-[1.1em]" />
            </span>
            <span className="truncate font-semibold text-lime">Agente</span>
          </>
        )}
      </div>
    </div>
  );
}

/** Composición angosta: una fila por prospecto con su pista de 6 etapas (3 del agente, relevo, 3 del equipo). */
function NarrowBoard({ behind }: { behind: number }) {
  return (
    <div className="rounded-[1.2em] border border-line bg-surface p-[0.8em] shadow-[var(--shadow)]">
      <div className="grid grid-cols-2 gap-[0.5em] text-[0.68em] font-semibold uppercase tracking-[0.08em]">
        <span className="flex items-center gap-[0.5em] rounded-[0.7em] bg-lime-soft px-[0.7em] py-[0.4em] text-lime">
          <RootMark variant="plain" tone="auto" className="h-auto w-[1.5em]" />
          Agente
        </span>
        <span className="flex items-center gap-[0.5em] rounded-[0.7em] bg-sky-soft px-[0.7em] py-[0.4em] text-sky">
          <Icon name="users" className="h-[1.2em] w-[1.2em]" />
          Equipo
        </span>
      </div>
      <ul className="mt-[0.7em] flex flex-col gap-[0.5em]">
        {CARDS.map((card, row) => {
          const col = Math.max(0, card.final - behind);
          const team = col >= RELEVO;
          const won = col === COLS.length - 1;
          return (
            <li
              key={card.name}
              className={`rounded-[0.8em] border px-[0.7em] py-[0.55em] transition-colors duration-500 ${won ? "border-success" : team ? "border-sky/50" : "border-lime/50"}`}
            >
              <div className="flex items-baseline justify-between gap-[0.6em]">
                <p className="truncate text-[0.82em] font-bold leading-tight text-ink">{card.name}</p>
                <p className="truncate text-[0.66em] text-muted">{card.detail}</p>
              </div>
              <div className="mt-[0.45em] flex items-center gap-[0.18em]">
                {COLS.map((c, i) => (
                  <span key={c} className="contents">
                    {i === RELEVO ? <span className="mx-[0.2em] h-[1.1em] w-0 border-l-[0.12em] border-dashed border-ink/50" /> : null}
                    <span
                      className={`h-[0.5em] flex-1 rounded-full transition-colors duration-500 ${
                        i <= col ? (i >= RELEVO ? "bg-sky" : "bg-lime-fill") : i >= RELEVO ? "bg-sky-soft" : "bg-lime-soft"
                      }`}
                      style={{ transitionDelay: `${row * 70}ms` }}
                    />
                  </span>
                ))}
              </div>
              <div className="mt-[0.4em] flex items-center justify-between gap-[0.5em] text-[0.68em]">
                <span className="font-semibold text-ink">{COLS[col]}</span>
                {team ? (
                  <span className="flex items-center gap-[0.35em]">
                    <Avatar initials={card.seller.initials} className="text-[0.85em]" />
                    <span className="font-semibold text-sky">{card.seller.name}</span>
                    {won ? <Icon name="check" className="h-[1.1em] w-[1.1em] shrink-0 text-success" strokeWidth={2.6} /> : null}
                  </span>
                ) : (
                  <span className="flex items-center gap-[0.35em]">
                    <span className="grid size-[1.6em] shrink-0 place-items-center rounded-full bg-lime-soft">
                      <RootMark variant="plain" tone="auto" className="h-auto w-[1.1em]" />
                    </span>
                    <span className="font-semibold text-lime">Agente</span>
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-[0.6em] flex items-center justify-center gap-[0.5em] text-[0.62em] text-muted">
        <span className="h-[1em] w-0 border-l-[0.14em] border-dashed border-ink/50" />
        Relevo: de Calificado a Cita, el prospecto pasa a tu equipo
      </p>
    </div>
  );
}

export function Carriles() {
  const { ref, step } = useSceneLoop<HTMLElement>(DURATIONS);
  const behind = DURATIONS.length - 1 - step; // cuántas etapas atrás de su posición final
  const height = CARDS.length * ROW + 0.6;

  return (
    <figure ref={ref} className="m-0 @container">
      <div className="@max-[640px]:hidden">
        <Canvas base={820}>
          <div className="rounded-[1.4em] border border-line bg-surface p-[0.9em] shadow-[var(--shadow)]">
            {/* Franjas */}
            <div className="grid grid-cols-2 gap-[0.6em] text-[0.66em] font-semibold uppercase tracking-[0.1em]">
              <span className="flex items-center gap-[0.5em] rounded-[0.7em] bg-lime-soft px-[0.8em] py-[0.45em] text-lime">
                <RootMark variant="plain" tone="auto" className="h-auto w-[1.5em]" />
                Carril del agente
              </span>
              <span className="flex items-center gap-[0.5em] rounded-[0.7em] bg-sky-soft px-[0.8em] py-[0.45em] text-sky">
                <Icon name="users" className="h-[1.2em] w-[1.2em]" />
                Carril del equipo
              </span>
            </div>

            {/* Etapas */}
            <div className="mt-[0.6em] grid grid-cols-6 text-center">
              {COLS.map((c) => (
                <span key={c} className="text-[0.66em] font-semibold text-ink">
                  {c}
                </span>
              ))}
            </div>

            {/* Tablero */}
            <div className="relative mt-[0.5em]" style={{ height: `${height}em` }}>
              <div className="absolute inset-y-0 left-0 w-1/2 rounded-[0.8em] bg-lime-soft/60" />
              <div className="absolute inset-y-0 right-0 w-1/2 rounded-[0.8em] bg-sky-soft/60" />
              {[1, 2, 4, 5].map((c) => (
                <span key={c} className="absolute inset-y-[0.6em] w-px bg-line" style={{ left: `calc(${c} * ${colW})` }} />
              ))}
              <span className="absolute inset-y-0 left-1/2 w-0 border-l-[0.12em] border-dashed border-ink/40" />
              <span className="absolute left-1/2 top-[-0.2em] -translate-x-1/2 rounded-full bg-ink px-[0.7em] py-[0.2em] text-[0.62em] font-semibold text-paper">
                Relevo
              </span>

              {CARDS.map((card, row) => {
                const col = Math.max(0, card.final - behind);
                return (
                  <div
                    key={card.name}
                    className="absolute transition-[left] duration-700 ease-out"
                    style={{
                      top: `${row * ROW + 0.9}em`,
                      left: `calc(${col} * ${colW} + 0.35em)`,
                      width: `calc(${colW} - 0.7em)`,
                      transitionDelay: `${row * 70}ms`,
                    }}
                  >
                    <CardView card={card} col={col} />
                  </div>
                );
              })}
            </div>
          </div>
        </Canvas>
      </div>
      <div className="mx-auto max-w-[440px] @min-[640px]:hidden">
        <Canvas base={360}>
          <NarrowBoard behind={behind} />
        </Canvas>
      </div>
      <figcaption className="sr-only">
        Carriles de un embudo de ventas con datos de ejemplo: seis etapas, de Nuevo a Ganado. Las tres primeras (Nuevo, Respondido y
        Calificado) son el carril del agente de root; las tres últimas (Cita, Propuesta y Ganado) son el carril del equipo. Entre Calificado
        y Cita está el relevo. Cinco prospectos avanzan por el tablero y, al cruzar el relevo, cada uno queda a cargo de un vendedor: Andrés
        R. o Paola V.
      </figcaption>
    </figure>
  );
}
