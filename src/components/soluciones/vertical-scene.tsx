"use client";

import { motion } from "motion/react";
import { Icon } from "@/components/icons";
import { EASE, Scene, ThreadDivider, useSceneLoop } from "@/components/motion/kit";
import type { SceneMessage, VerticalSceneData } from "./types";

/*
 * Escena de cada vertical (plan §3.3 y D1/D9): a la izquierda, la conversación de WhatsApp en la línea de la
 * empresa; a la derecha, la Ficha viva que se llena mientras el agente pregunta y el trato que avanza de etapa por
 * los carriles (agente = lima, equipo = cielo). Al final, el relevo al equipo con su nota.
 * - El HTML del servidor trae el estado FINAL completo (todos los mensajes, la ficha llena y el relevo).
 * - Al entrar en pantalla sostiene ese estado ≥ 2.5 s, luego repite la conversación; fuera de pantalla se pausa y
 *   vuelve al final. Con movimiento reducido se queda quieta (useSceneLoop).
 * - Todo se mide en em (baseWidth 480): escala parejo del hero de escritorio al móvil. El chat se ancla abajo, como
 *   en WhatsApp: si el guion no cabe, el mensaje más viejo se desvanece arriba (máscara) en vez de cortarse en seco.
 * - Las entradas solo desplazan y escalan: nada parte de opacidad 0.
 * - Nunca se vacía: al repetir, la conversación anterior queda arriba como historial (con un separador) y la nueva
 *   entra debajo; el chat pasa de un estado lleno a otro.
 */

type Frame = { count: number; typing: boolean; handoff: boolean };

const TYPING_MS = 750;
const AFTER_CLIENT_MS = 1250;
const AFTER_AGENT_MS = 1650;
const FINAL_MS = 4200;

/** Línea de tiempo: cada mensaje del agente va precedido de «escribiendo…»; el último cuadro agrega el relevo. */
function timeline(messages: SceneMessage[]) {
  const frames: Frame[] = [];
  const durations: number[] = [];
  messages.forEach((m, i) => {
    if (m.from === "agente") {
      frames.push({ count: i, typing: true, handoff: false });
      durations.push(TYPING_MS);
    }
    frames.push({ count: i + 1, typing: false, handoff: false });
    durations.push(m.from === "agente" ? AFTER_AGENT_MS : AFTER_CLIENT_MS);
  });
  frames.push({ count: messages.length, typing: false, handoff: true });
  durations.push(FINAL_MS);
  return { frames, durations };
}

export function VerticalScene({ data, caption }: { data: VerticalSceneData; caption: string }) {
  const { frames, durations } = timeline(data.messages);
  const { ref, step, playing } = useSceneLoop<HTMLDivElement>(durations);
  const frame = frames[Math.min(step, frames.length - 1)];
  const replaying = playing && step !== frames.length - 1;

  const visible = data.messages.slice(0, frame.count);
  const filled = new Set(visible.flatMap((m) => m.fills ?? []));
  const lastMsg = visible[visible.length - 1];
  const freshFills = playing && !frame.typing && !frame.handoff ? new Set(lastMsg?.fills ?? []) : new Set<string>();
  let stage = 0;
  for (const m of visible) if (typeof m.stage === "number") stage = m.stage;
  if (frame.handoff) stage = data.handoff.stage;
  const current = data.stages[stage];

  return (
    <div ref={ref}>
      <Scene caption={caption} baseWidth={480} reveal={false}>
        <div className="grid grid-cols-[1.08fr_1fr] gap-[0.75em] h-[28em]">
          {/* ───── Conversación en la línea de la empresa ───── */}
          <div className="flex flex-col min-h-0 overflow-hidden rounded-[1em] border border-line bg-surface shadow-[var(--shadow)]">
            <div className="flex items-center gap-[0.55em] border-b border-line px-[0.8em] py-[0.6em]">
              <span className="grid size-[2em] shrink-0 place-items-center rounded-[0.55em] bg-ink font-display text-[0.85em] font-extrabold text-paper">
                {data.business.charAt(0)}
              </span>
              <span className="min-w-0 flex-1 leading-[1.2]">
                <span className="block truncate text-[0.74em] font-semibold text-ink">{data.business}</span>
                <span className="block truncate text-[0.6em] text-muted">Línea de empresa · en línea</span>
              </span>
              <span className="mono shrink-0 rounded-[0.5em] bg-lime-soft px-[0.5em] py-[0.25em] text-[0.56em] text-lime">
                1ª resp. {data.firstReply}
              </span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col justify-end gap-[0.45em] overflow-hidden bg-surface-2 px-[0.65em] py-[0.7em] [mask-image:linear-gradient(to_bottom,transparent,#000_1.6em)]">
              {replaying ? data.messages.map((m, i) => <Bubble key={`h${i}`} msg={m} animateIn={false} />) : null}
              {replaying ? <ThreadDivider /> : null}
              {visible.map((m, i) => (
                <Bubble key={`${replaying ? "r" : "c"}${i}`} msg={m} animateIn={replaying} />
              ))}
              {frame.typing ? <Typing playing={playing} /> : null}
            </div>
          </div>

          {/* ───── Ficha viva + etapa + relevo ───── */}
          <div className="flex min-h-0 flex-col rounded-[1em] border border-line bg-surface p-[0.8em] shadow-[var(--shadow)]">
            <div className="flex items-center justify-between gap-[0.5em]">
              <span className="mono text-[0.56em] uppercase tracking-[0.12em] text-muted">Ficha viva</span>
              <span className="truncate rounded-full border border-line px-[0.6em] py-[0.15em] text-[0.54em] text-muted">
                {data.origin}
              </span>
            </div>
            <p className="mt-[0.45em] font-display text-[0.95em] font-extrabold leading-[1.15] tracking-[-0.01em] text-ink">
              {data.contact}
            </p>

            <dl className="mt-[0.5em] flex flex-col">
              {data.fields.map((f) => {
                const on = filled.has(f.key);
                return (
                  <div
                    key={f.key}
                    className={`flex items-baseline justify-between gap-[0.6em] rounded-[0.4em] border-b border-line px-[0.3em] py-[0.4em] transition-colors duration-700 ${freshFills.has(f.key) ? "bg-lime-soft" : "bg-transparent"}`}
                  >
                    <dt className="shrink-0 text-[0.64em] text-muted">{f.label}</dt>
                    <dd className={`truncate text-right text-[0.7em] font-semibold ${on ? "text-ink" : "text-muted"}`}>
                      {on ? f.value : "—"}
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="mt-[0.7em]">
              <div className="flex items-center justify-between gap-[0.5em]">
                <span className="mono text-[0.54em] uppercase tracking-[0.12em] text-muted">Etapa</span>
                <span
                  className={`rounded-full px-[0.6em] py-[0.12em] text-[0.52em] font-semibold transition-colors duration-500 ${current.lane === "agente" ? "bg-lime-soft text-lime" : "bg-sky-soft text-sky"}`}
                >
                  {current.lane === "agente" ? "Carril del agente" : "Carril del equipo"}
                </span>
              </div>
              <div className="mt-[0.4em] flex gap-[0.22em]">
                {data.stages.map((s, i) => (
                  <span
                    key={s.name}
                    className={`h-[0.4em] flex-1 rounded-full transition-colors duration-500 ${i <= stage ? (s.lane === "agente" ? "bg-lime-fill" : "bg-sky") : "bg-line"}`}
                  />
                ))}
              </div>
              <p className="mt-[0.35em] text-[0.72em] font-semibold text-ink">{current.name}</p>
            </div>

            <div
              className={`mt-auto rounded-[0.7em] border px-[0.65em] py-[0.55em] transition-colors duration-500 ${frame.handoff ? "border-sky bg-sky-soft" : "border-dashed border-line bg-transparent"}`}
            >
              <div className="flex items-center gap-[0.4em]">
                <Icon name="handoff" className={`size-[0.9em] ${frame.handoff ? "text-sky" : "text-muted"}`} />
                <span className={`text-[0.64em] font-semibold ${frame.handoff ? "text-sky" : "text-muted"}`}>
                  {frame.handoff ? `Relevo · ${data.handoff.to}` : "Relevo al equipo"}
                </span>
              </div>
              <p className={`mt-[0.3em] text-[0.58em] leading-[1.4] ${frame.handoff ? "text-ink" : "text-muted"}`}>
                {frame.handoff
                  ? data.handoff.note
                  : "Cuando se cumpla tu regla de pase, la conversación llega a tu equipo con su nota de relevo."}
              </p>
            </div>
          </div>
        </div>
      </Scene>
    </div>
  );
}

function Bubble({ msg, animateIn }: { msg: SceneMessage; animateIn: boolean }) {
  const agent = msg.from === "agente";
  return (
    <motion.div
      initial={animateIn ? { y: "0.7em", scale: 0.96 } : false}
      animate={{ y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{ transformOrigin: agent ? "100% 100%" : "0% 100%" }}
      className={`max-w-[88%] shrink-0 rounded-[0.9em] px-[0.7em] py-[0.45em] shadow-[0_0.08em_0.12em_rgba(11,11,12,0.08)] ${
        agent ? "self-end rounded-br-[0.3em] bg-lime-soft" : "self-start rounded-bl-[0.3em] border border-line bg-surface"
      }`}
    >
      <p className="text-[0.67em] leading-[1.38] text-ink">{msg.text}</p>
      <p className="mt-[0.15em] flex items-center justify-end gap-[0.4em]">
        {agent ? <span className="mono text-[0.5em] uppercase tracking-[0.08em] text-lime">Agente</span> : null}
        <span className="mono text-[0.52em] text-muted">{msg.time}</span>
      </p>
    </motion.div>
  );
}

function Typing({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-center gap-[0.25em] self-end rounded-[0.9em] rounded-br-[0.3em] bg-lime-soft px-[0.8em] py-[0.65em]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-[0.4em] rounded-full bg-lime"
          animate={playing ? { y: ["0%", "-70%", "0%"] } : { y: "0%" }}
          transition={playing ? { duration: 0.8, repeat: Infinity, delay: i * 0.14, ease: "easeInOut" } : { duration: 0.2 }}
        />
      ))}
    </div>
  );
}
