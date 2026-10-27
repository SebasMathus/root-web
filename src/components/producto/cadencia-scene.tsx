"use client";
import { useState } from "react";
import { useSceneLoop } from "@/components/motion/kit";
import { Icon } from "@/components/icons";
import { DualScene, SceneNote } from "./scene-frame";
import { Avatar, Bubble } from "./parts";

/**
 * Lo que todavía no sale se ve atenuado (programado), nunca vacío: la cadencia completa está siempre en pantalla
 * y cada mensaje se «enciende» el día que se envía.
 */
const due = (on: boolean) =>
  `transition-[opacity,transform] duration-500 ease-out ${on ? "opacity-100 translate-y-0" : "opacity-50 translate-y-[0.3em]"}`;

/*
 * D6 · Cadencia de seguimiento y rescate (Cadencias = concepto de «cómo trabaja root»; el seguimiento y la
 * reactivación están disponibles). Ejemplo dental: presupuesto el día 0 y mensajes los días 1, 3, 7 y 30.
 * Interruptor real fuera del lienzo: «Si contesta» (relevo a la doctora y la cadencia se detiene) o «Si no contesta»
 * (sigue hasta el día 30 y termina en Rescate). Reposo de cada modo = el desenlace completo. Nunca se vacía: lo que
 * aún no sale se ve atenuado (programado) y se enciende al enviarse.
 */

const STEPS = [
  { day: "Día 0", text: "Presupuesto de ortodoncia enviado", system: true },
  { day: "Día 1", text: "Hola, Laura, ¿te quedó alguna duda del presupuesto de ortodoncia?" },
  { day: "Día 3", text: "Te comparto opciones de pago a 12 meses." },
  { day: "Día 7", text: "¿Te aparto un horario para resolver tus dudas con la doctora?" },
  { day: "Día 30", text: "¿Retomamos tu tratamiento?" },
];

type Mode = "contesta" | "no";

/** Estado de cada hito según el modo y el paso del bucle. */
function stateOf(i: number, mode: Mode, s: number): "sent" | "paused" | "pending" {
  if (mode === "contesta") {
    if (i <= 2) return s >= i ? "sent" : "pending";
    return s >= 3 ? "paused" : "pending";
  }
  return s >= i ? "sent" : "pending";
}

function Outcome({ mode, s }: { mode: Mode; s: number }) {
  if (mode === "contesta") {
    return (
      <div className={`rounded-[0.8em] bg-sky-soft p-[0.7em] flex flex-col gap-[0.45em] ${due(s >= 3)}`}>
        <Bubble tone="in">Sí, me interesa a 12 meses.</Bubble>
        <p className="flex items-center gap-[0.45em]">
          <Avatar initials="DM" role="equipo" className="ring-[0.15em] ring-surface" />
          <span className="text-[0.74em] text-ink leading-snug">
            <span className="font-semibold text-sky">Relevo a Dra. Martínez.</span> La cadencia se detiene.
          </span>
        </p>
      </div>
    );
  }
  return (
    <div
      className={`rounded-[0.8em] border-[0.1em] border-dashed border-coral bg-coral-soft p-[0.7em] flex items-start gap-[0.5em] ${due(s >= 5)}`}
    >
      <Icon name="repeat" className="w-[1.2em] h-[1.2em] text-coral shrink-0" />
      <p className="text-[0.74em] text-ink leading-snug">
        <span className="font-semibold text-coral">Rescate.</span> No contestó en 30 días: vuelve a la lista de rescate en 90 días.
      </p>
    </div>
  );
}

function Wide({ mode, s }: { mode: Mode; s: number }) {
  return (
    <div className="rounded-[1em] border border-line bg-surface p-[1em] shadow-[var(--shadow)]">
      <div className="relative grid grid-cols-5 gap-[0.7em]">
        <span aria-hidden="true" className="absolute left-[1.2em] right-[1.2em] top-[2.15em] h-[0.14em] bg-line" />
        {STEPS.map((st, i) => {
          const state = stateOf(i, mode, s);
          return (
            <div
              key={st.day}
              className={`relative flex flex-col gap-[0.5em] transition-opacity duration-500 ${state === "paused" ? "opacity-50" : ""}`}
            >
              <p className="mono text-[0.7em] text-muted">{st.day}</p>
              <span
                className={`relative z-[1] w-[0.95em] h-[0.95em] rounded-full border-[0.18em] transition-colors duration-500 ${
                  state === "sent" ? "bg-lime-fill border-lime" : "bg-surface border-line"
                }`}
              />
              {st.system ? (
                <p className="text-[0.72em] text-muted leading-snug">{st.text}</p>
              ) : (
                <Bubble tone="agente" className={`max-w-full ${due(state !== "pending")}`}>
                  {st.text}
                </Bubble>
              )}
              {state === "paused" ? <p className="text-[0.62em] font-semibold text-muted">En pausa</p> : null}
            </div>
          );
        })}
      </div>
      <div className="mt-[0.9em] grid grid-cols-5 gap-[0.7em]">
        <div className="col-start-3 col-span-3">
          <Outcome mode={mode} s={s} />
        </div>
      </div>
    </div>
  );
}

function Narrow({ mode, s }: { mode: Mode; s: number }) {
  return (
    <div className="rounded-[1em] border border-line bg-surface p-[0.9em] shadow-[var(--shadow)]">
      <ol className="relative flex flex-col gap-[0.7em]">
        <span aria-hidden="true" className="absolute left-[0.42em] top-[0.6em] bottom-[0.6em] w-[0.14em] bg-line" />
        {STEPS.map((st, i) => {
          const state = stateOf(i, mode, s);
          return (
            <li
              key={st.day}
              className={`relative flex gap-[0.7em] transition-opacity duration-500 ${state === "paused" ? "opacity-50" : ""}`}
            >
              <span
                className={`relative z-[1] mt-[0.3em] w-[0.95em] h-[0.95em] rounded-full border-[0.18em] shrink-0 transition-colors duration-500 ${
                  state === "sent" ? "bg-lime-fill border-lime" : "bg-surface border-line"
                }`}
              />
              <div className="flex-1 min-w-0 flex flex-col gap-[0.3em]">
                <p className="mono text-[0.7em] text-muted">
                  {st.day}
                  {state === "paused" ? " · en pausa" : ""}
                </p>
                {st.system ? (
                  <p className="text-[0.76em] text-muted leading-snug">{st.text}</p>
                ) : (
                  <Bubble tone="agente" className={`self-start max-w-full ${due(state !== "pending")}`}>
                    {st.text}
                  </Bubble>
                )}
                {mode === "contesta" && i === 2 ? <Outcome mode={mode} s={s} /> : null}
              </div>
            </li>
          );
        })}
      </ol>
      {mode === "no" ? (
        <div className="mt-[0.8em]">
          <Outcome mode={mode} s={s} />
        </div>
      ) : null}
    </div>
  );
}

/** Bucle de un modo. Se monta de nuevo al cambiar de modo (key), así arranca siempre en su reposo completo. */
function CadenciaLoop({ mode, reveal }: { mode: Mode; reveal: boolean }) {
  // contesta: días 0, 1 y 3 → relevo (reposo) · no contesta: días 0, 1, 3, 7 y 30 → rescate (reposo)
  const { ref, step } = useSceneLoop<HTMLDivElement>(mode === "contesta" ? [1100, 1300, 1500, 4500] : [1100, 1100, 1100, 1100, 1300, 4500]);
  const caption =
    mode === "contesta"
      ? "Ejemplo de cadencia de seguimiento de una clínica dental. Día 0: se envía el presupuesto de ortodoncia. Día 1: el agente pregunta si quedó alguna duda. " +
        "Día 3: comparte opciones de pago a 12 meses y Laura contesta que le interesa. La conversación pasa a la Dra. Martínez y los mensajes de los días 7 y 30 quedan en pausa."
      : "Ejemplo de cadencia de seguimiento de una clínica dental cuando la paciente no contesta. Días 1, 3, 7 y 30: el agente escribe con una duda, opciones de pago, " +
        "un horario con la doctora y una invitación a retomar el tratamiento. Sin respuesta al día 30, Laura vuelve a la lista de rescate en 90 días.";
  return (
    <div ref={ref}>
      <DualScene
        caption={caption}
        reveal={reveal}
        wideBase={880}
        narrowBase={400}
        wide={<Wide mode={mode} s={step} />}
        narrow={<Narrow mode={mode} s={step} />}
      />
    </div>
  );
}

export function CadenciaScene({ reveal = true }: { reveal?: boolean }) {
  const [mode, setMode] = useState<Mode>("contesta");
  return (
    <div>
      <div
        role="group"
        aria-label="Elige qué pasa con la paciente"
        className="mb-5 inline-flex rounded-full border border-line bg-surface p-1"
      >
        {(
          [
            ["contesta", "Si contesta"],
            ["no", "Si no contesta"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={mode === key}
            onClick={() => setMode(key)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors cursor-pointer ${
              mode === key ? (key === "contesta" ? "bg-sky-soft text-sky" : "bg-coral-soft text-coral") : "text-muted hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <CadenciaLoop key={mode} mode={mode} reveal={reveal} />
      <SceneNote concept />
    </div>
  );
}
