"use client";
import { useEffect, useState } from "react";
import { Icon, WhatsAppGlyph } from "@/components/icons";
import { CountUp, Typewriter, useSceneLoop } from "@/components/motion/kit";
import { Avatar, Canvas } from "./canvas";

/*
 * D1 · Del anuncio al cierre (plan §4, hero de la portada).
 * Siete pasos: anuncio en Meta → WhatsApp de tu empresa → el agente responde → califica → agenda → relevo al
 * vendedor → ganado. Abajo, el carril del CRM: la tarjeta del prospecto avanza por las etapas mientras arriba
 * ocurre cada paso. De izquierda a derecha en escritorio (lg) y de arriba abajo en pantallas chicas: dos lienzos
 * que comparten el mismo bucle. El servidor pinta el estado final (todo hecho, tarjeta en «Ganado»).
 * Datos de ejemplo (inmobiliaria): la página muestra <ExampleTag /> junto a la escena.
 */

/** 0–6 = paso activo · 7 = final (rest). */
const DURATIONS = [900, 1700, 1500, 1900, 1200, 1700, 1200, 3200] as const;
const REST = DURATIONS.length - 1;

type Lane = "origen" | "agente" | "equipo";
type NodeDef = { title: string; icon: string; lane: Lane; stage: string };

const NODES: NodeDef[] = [
  { title: "Anuncio en Meta", icon: "target", lane: "origen", stage: "Origen: anuncio" },
  { title: "WhatsApp de tu empresa", icon: "chat", lane: "origen", stage: "Nuevo" },
  { title: "Responde", icon: "clock", lane: "agente", stage: "Respondido" },
  { title: "Califica", icon: "funnel", lane: "agente", stage: "Calificado" },
  { title: "Agenda", icon: "calendar", lane: "agente", stage: "Visita agendada" },
  { title: "Relevo a vendedor", icon: "handoff", lane: "equipo", stage: "Con vendedor" },
  { title: "Cierre", icon: "check", lane: "equipo", stage: "Ganado" },
];

const MESSAGE = "Hola, vi el depa de 2 recámaras en Narvarte, ¿sigue disponible?";
const FIELDS = [
  ["Operación", "Compra"],
  ["Presupuesto", "$3.2 M"],
  ["Pago", "Crédito Infonavit"],
  ["Plazo", "3 meses"],
] as const;
const NOTE = "Busca 2 recámaras en Narvarte, crédito Infonavit preaprobado, quiere visitar jueves.";

type State = "pending" | "active" | "done";

/** Cuántos elementos de una lista se muestran: todos fuera del paso activo; uno por uno mientras está activo. */
function useStagger(active: boolean, count: number, every: number) {
  const [n, setN] = useState(count);
  useEffect(() => {
    if (!active) {
      const t = setTimeout(() => setN(count), 0);
      return () => clearTimeout(t);
    }
    let i = 0;
    const start = setTimeout(() => setN(0), 0);
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= count) clearInterval(id);
    }, every);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [active, count, every]);
  return n;
}

const timer = (n: number) => `00:00:${String(Math.round(n)).padStart(2, "0")}`;

/* ───────────── Contenido de cada paso (medido en em) ───────────── */

function Body({ index, state, playing }: { index: number; state: State; playing: boolean }) {
  const active = state === "active" && playing;
  const shown = useStagger(index === 3 && active, FIELDS.length, 300);
  const fieldsShown = state === "pending" ? 0 : index === 3 && active ? shown : FIELDS.length;

  switch (index) {
    case 0:
      return (
        <div className="rounded-[0.7em] border border-line bg-paper p-[0.45em]">
          <div className="grid h-[2.6em] place-items-center rounded-[0.45em] bg-[linear-gradient(135deg,var(--sky-soft),var(--lime-soft))] text-sky">
            <Icon name="home" className="h-[1.3em] w-[1.3em]" />
          </div>
          <p className="mt-[0.45em] text-[0.68em] font-semibold leading-tight text-ink">Depa 2 rec. · Narvarte</p>
          <p className="text-[0.58em] text-muted">Patrocinado</p>
          <span className="mt-[0.45em] flex items-center justify-center gap-[0.35em] rounded-[0.45em] bg-ink py-[0.35em] text-[0.6em] font-semibold text-paper">
            <WhatsAppGlyph className="h-[1.1em] w-[1.1em]" />
            Enviar mensaje
          </span>
        </div>
      );
    case 1:
      return (
        <div>
          <p className="mono text-[0.56em] text-muted">+52 55 ···· ···· · Tu empresa</p>
          <div className="mt-[0.4em] rounded-[0.7em] rounded-tl-[0.2em] border border-line bg-paper px-[0.55em] py-[0.45em] text-[0.68em] leading-snug text-ink">
            <Typewriter text={MESSAGE} run={active} speed={22} />
          </div>
          <p className="mt-[0.3em] text-right text-[0.55em] text-muted">Mariana López · 22:41</p>
        </div>
      );
    case 2:
      return (
        <div>
          <p className="mono text-[1.15em] leading-none text-lime">
            <CountUp value={8} run={active} duration={1} format={timer} />
          </p>
          <p className="mt-[0.2em] text-[0.56em] text-muted">Primera respuesta</p>
          <div className="mt-[0.45em] rounded-[0.7em] rounded-tr-[0.2em] bg-lime-soft px-[0.55em] py-[0.45em] text-[0.66em] leading-snug text-ink">
            ¡Hola, Mariana! Sí sigue disponible. ¿Lo buscas para compra o renta?
          </div>
        </div>
      );
    case 3:
      return (
        <dl className="flex flex-col gap-[0.3em]">
          {FIELDS.map(([k, v], i) => (
            <div key={k} className="flex items-baseline justify-between gap-[0.4em] border-b border-line pb-[0.25em] text-[0.62em]">
              <dt className="text-muted">{k}</dt>
              <dd className={`text-right font-semibold transition-colors duration-300 ${i < fieldsShown ? "text-ink" : "text-line"}`}>{i < fieldsShown ? v : "···"}</dd>
            </div>
          ))}
        </dl>
      );
    case 4:
      return (
        <div>
          <div className="grid grid-cols-5 gap-[0.25em] text-center text-[0.58em]">
            {["L", "M", "M", "J", "V"].map((d, i) => (
              <span key={i} className={`rounded-[0.4em] py-[0.35em] font-semibold ${i === 3 ? "bg-lime-fill text-fixed-ink" : "bg-paper text-muted"}`}>
                {d}
              </span>
            ))}
          </div>
          <div className="mt-[0.5em] rounded-[0.6em] border border-line bg-paper px-[0.5em] py-[0.4em]">
            <p className="mono text-[0.7em] text-ink">Jue 11:00</p>
            <p className="text-[0.6em] leading-snug text-muted">Visita al depa de Narvarte</p>
          </div>
        </div>
      );
    case 5:
      return (
        <div>
          <div className="flex items-center gap-[0.4em] text-[0.66em]">
            <Avatar initials="AR" />
            <span className="font-semibold leading-tight text-ink">Andrés R.</span>
          </div>
          <div
            className={`mt-[0.45em] rounded-[0.5em] border-l-[0.22em] bg-paper px-[0.5em] py-[0.4em] transition-colors duration-700 ${state === "pending" ? "border-lime" : "border-sky"}`}
          >
            <p className="text-[0.52em] font-semibold uppercase tracking-[0.08em] text-muted">Nota de relevo</p>
            <p className="mt-[0.15em] text-[0.6em] leading-snug text-ink">{NOTE}</p>
          </div>
        </div>
      );
    default:
      return (
        <div className="rounded-[0.7em] border border-success/40 bg-success-soft p-[0.55em]">
          <span className="inline-flex items-center gap-[0.3em] rounded-full bg-surface px-[0.55em] py-[0.15em] text-[0.6em] font-semibold text-success">
            <Icon name="check" className="h-[1em] w-[1em]" strokeWidth={2.6} />
            Ganado
          </span>
          <p className="mt-[0.45em] text-[0.7em] font-semibold leading-tight text-ink">Depa Narvarte</p>
          <p className="mono text-[0.66em] text-ink">$3.2 M</p>
          <p className="mt-[0.3em] text-[0.56em] leading-snug text-muted">Origen: anuncio de Meta</p>
        </div>
      );
  }
}

const LANE_TONE: Record<Lane, string> = { origen: "bg-surface-2 text-muted", agente: "bg-lime-soft text-lime", equipo: "bg-sky-soft text-sky" };

function NodeCard({ index, state, playing, vertical = false }: { index: number; state: State; playing: boolean; vertical?: boolean }) {
  const n = NODES[index];
  const ring =
    state === "active" ? (n.lane === "equipo" ? "border-sky shadow-[0_0_0_0.22em_var(--sky-soft)]" : "border-lime shadow-[0_0_0_0.22em_var(--lime-soft)]") : "border-line";
  return (
    <div className={`rounded-[0.9em] border bg-surface p-[0.6em] transition-[opacity,border-color,box-shadow] duration-500 ${ring} ${state === "pending" ? "opacity-50" : ""}`}>
      <div className="flex items-center gap-[0.4em]">
        <span className={`grid size-[1.5em] shrink-0 place-items-center rounded-[0.45em] ${LANE_TONE[n.lane]}`}>
          <Icon name={n.icon} className="h-[0.9em] w-[0.9em]" />
        </span>
        <span className="min-w-0 flex-1 text-[0.68em] font-bold leading-tight text-ink">{n.title}</span>
        {vertical ? <span className="mono shrink-0 text-[0.55em] text-muted">{n.stage}</span> : null}
      </div>
      <div className={`mt-[0.5em] ${vertical ? "" : "h-[8.4em]"}`}>
        <Body index={index} state={state} playing={playing} />
      </div>
    </div>
  );
}

/** Tarjeta del prospecto en el carril del CRM: borde lima con el agente, cielo con el vendedor, verde al ganar. */
function ProspectCard({ col }: { col: number }) {
  const tone = col >= 6 ? "border-success bg-success-soft" : col >= 5 ? "border-sky bg-sky-soft" : col >= 2 ? "border-lime bg-lime-soft" : "border-line bg-surface";
  return (
    <div className={`rounded-[0.7em] border-[0.12em] px-[0.55em] py-[0.4em] transition-colors duration-500 ${tone}`}>
      <p className="truncate text-[0.66em] font-bold leading-tight text-ink">Mariana López</p>
      <p className="truncate text-[0.56em] text-muted">Narvarte · $3.2 M</p>
      <p className="mono mt-[0.15em] truncate text-[0.56em] text-ink">{NODES[col].stage}</p>
    </div>
  );
}

const GAP = 0.75; // em entre columnas del lienzo horizontal
const colWidth = `((100% - ${6 * GAP}em) / 7)`;
const colLeft = (c: number) => `calc(${c} * (${colWidth} + ${GAP}em))`;
const colCenter = (c: number) => `calc(${c} * (${colWidth} + ${GAP}em) + ${colWidth} / 2)`;

export function DelAnuncioAlCierre() {
  // Plan D1: la escena se pausa con el cursor encima para poder leerla.
  const [hover, setHover] = useState(false);
  const { ref, step, playing } = useSceneLoop<HTMLElement>(DURATIONS, { paused: hover });
  const col = step === REST ? 6 : step;
  const state = (i: number): State => (step === REST || i < step ? "done" : i === step ? "active" : "pending");

  return (
    <figure ref={ref} className="m-0" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {/* Escritorio: de izquierda a derecha */}
      <Canvas base={1100} className="hidden lg:block">
        <div className="rounded-[1.4em] border border-line bg-surface p-[1.1em] shadow-[var(--shadow)]">
          <div className="grid grid-cols-7 gap-[0.75em] text-center">
            <span className="col-span-2 rounded-[0.6em] bg-surface-2 py-[0.35em] text-[0.62em] font-semibold uppercase tracking-[0.1em] text-muted">Tu anuncio y tu número</span>
            <span className="col-span-3 rounded-[0.6em] bg-lime-soft py-[0.35em] text-[0.62em] font-semibold uppercase tracking-[0.1em] text-lime">Agente de <span className="normal-case">root</span></span>
            <span className="col-span-2 rounded-[0.6em] bg-sky-soft py-[0.35em] text-[0.62em] font-semibold uppercase tracking-[0.1em] text-sky">Tu equipo</span>
          </div>
          <div className="mt-[0.75em] grid grid-cols-7 gap-[0.75em]">
            {NODES.map((n, i) => (
              <NodeCard key={n.title} index={i} state={state(i)} playing={playing} />
            ))}
          </div>

          {/* Recorrido: la línea se llena y un punto de luz marca el paso */}
          <div className="relative mt-[1em] h-[0.22em] rounded-full bg-line">
            <div className="absolute inset-y-0 left-0 rounded-full bg-lime-fill transition-[width] duration-700 ease-out" style={{ width: colCenter(col) }} />
            <span
              className="absolute top-1/2 size-[0.85em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-fill shadow-[0_0_0_0.32em_rgba(198,243,107,0.35)] transition-[left] duration-700 ease-out"
              style={{ left: colCenter(col) }}
            />
          </div>

          {/* Carril del CRM */}
          <div className="mt-[0.9em] rounded-[1em] border border-dashed border-line bg-paper p-[0.6em]">
            <div className="flex items-center gap-[0.4em]">
              <Icon name="kanban" className="h-[0.9em] w-[0.9em] text-muted" />
              <span className="text-[0.6em] font-semibold uppercase tracking-[0.1em] text-muted">CRM · la etapa del trato</span>
            </div>
            <div className="mt-[0.45em] grid grid-cols-7 gap-[0.75em] text-center">
              {NODES.map((n, i) => (
                <span key={n.stage} className={`mono truncate text-[0.56em] transition-colors duration-500 ${i <= col ? "text-ink" : "text-muted/60"}`}>
                  {n.stage}
                </span>
              ))}
            </div>
            <div className="relative mt-[0.4em] h-[3.3em]">
              <div className="absolute top-0 transition-[left] duration-700 ease-out" style={{ left: colLeft(col), width: `calc(${colWidth})` }}>
                <ProspectCard col={col} />
              </div>
            </div>
          </div>
        </div>
      </Canvas>

      {/* Pantallas chicas: de arriba abajo */}
      <Canvas base={400} className="mx-auto max-w-[460px] lg:hidden">
        <div className="rounded-[1.4em] border border-line bg-surface p-[0.9em] shadow-[var(--shadow)]">
          <ol>
            {NODES.map((n, i) => (
              <li key={n.title} className="grid grid-cols-[1.6em_1fr] gap-[0.6em]">
                <div className="flex flex-col items-center">
                  <span
                    className={`mt-[0.75em] size-[0.8em] shrink-0 rounded-full border-[0.15em] transition-colors duration-500 ${
                      state(i) === "pending" ? "border-line bg-surface" : n.lane === "equipo" ? "border-sky bg-sky" : n.lane === "agente" ? "border-lime bg-lime-fill" : "border-muted bg-muted"
                    }`}
                  />
                  {i < NODES.length - 1 ? <span className={`w-[0.14em] flex-1 transition-colors duration-500 ${i < col ? "bg-lime-fill" : "bg-line"}`} /> : null}
                </div>
                <div className="pb-[0.6em]">
                  <NodeCard index={i} state={state(i)} playing={playing} vertical />
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-[0.2em] flex items-center gap-[0.6em] rounded-[0.9em] border border-dashed border-line bg-paper p-[0.55em]">
            <Icon name="kanban" className="h-[1em] w-[1em] shrink-0 text-muted" />
            <span className="text-[0.62em] font-semibold uppercase tracking-[0.08em] text-muted">En el CRM</span>
            <div className="ml-auto w-[11em]">
              <ProspectCard col={col} />
            </div>
          </div>
        </div>
      </Canvas>

      <figcaption className="sr-only">
        Del anuncio al cierre, con datos de ejemplo de una inmobiliaria: Mariana López ve un anuncio en Meta y escribe al WhatsApp de la empresa
        preguntando por un depa de 2 recámaras en Narvarte. El agente de root contesta en 8 segundos, la califica (compra, presupuesto de 3.2
        millones, crédito Infonavit, plazo de 3 meses) y agenda la visita el jueves a las 11:00. Luego pasa la conversación a Andrés R., del equipo de
        ventas, con una nota de relevo, y el trato termina como ganado. Abajo, en el CRM, la tarjeta de Mariana avanza de etapa en cada paso.
      </figcaption>
    </figure>
  );
}
