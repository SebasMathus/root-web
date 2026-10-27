"use client";
import { Scene, useSceneLoop } from "@/components/motion/kit";
import { beat, SceneChip, SceneExample, SceneFrame } from "./scene-parts";

/**
 * D6 · Cadencia de un presupuesto dental (plan §4, ejemplo dental de OPP-199): día 0, 1, 3, 7 y 30.
 * El día 3 la paciente contesta: el agente hace el relevo a la doctora y la cadencia se pone en pausa.
 * Estado final (servidor, fuera de pantalla, movimiento reducido): todo el recorrido con el relevo hecho.
 */
const STEPS = [1400, 1400, 1400, 1600, 3400];

const TOUCHES = [
  { day: "Día 0", label: "Presupuesto enviado", msg: "Hola Laura, te comparto el presupuesto de ortodoncia que revisaste con la Dra. Martínez.", at: 0 },
  { day: "Día 1", label: "Seguimiento", msg: "¿Te quedó alguna duda del presupuesto?", at: 1 },
  { day: "Día 3", label: "Seguimiento", msg: "Te comparto las opciones de pago a 12 meses.", at: 2 },
];

export function EscenaDental() {
  const { ref, step } = useSceneLoop<HTMLDivElement>(STEPS);
  const replied = step >= 3;
  const handoff = step >= 4;
  return (
    <div ref={ref}>
      <Scene
        reveal={false}
        baseWidth={520}
        caption="Ejemplo de cadencia de seguimiento de un presupuesto de ortodoncia. Día 0: el agente de root envía el presupuesto. Día 1 y día 3: le da seguimiento por WhatsApp. El día 3 la paciente contesta que quiere empezar; el agente hace el relevo a la Dra. Martínez con una nota y los toques del día 7 y del día 30 quedan en pausa."
      >
        <SceneFrame
          title="Laura G. · Ortodoncia"
          sub="Presupuesto $38,000 · WhatsApp de la clínica"
          icon="tooth"
          right={<SceneChip role={handoff ? "equipo" : "agente"}>{handoff ? "Con la Dra. Martínez" : "Cadencia activa"}</SceneChip>}
        >
          <ol className="relative grid gap-[0.7em] before:absolute before:left-[0.95em] before:top-[0.6em] before:bottom-[0.6em] before:w-px before:bg-line">
            {TOUCHES.map((t) => (
              <li key={t.day} className={`relative grid grid-cols-[1.9em_1fr] gap-[0.6em] ${beat(step >= t.at)}`}>
                <span className="relative z-10 mt-[0.1em] grid h-[1.9em] w-[1.9em] place-items-center rounded-full border border-line bg-surface">
                  <span className="h-[0.6em] w-[0.6em] rounded-full bg-lime-fill" />
                </span>
                <div>
                  <p className="text-[0.72em]">
                    <span className="mono text-ink">{t.day}</span> <span className="text-muted">· {t.label}</span>
                  </p>
                  <p className="mt-[0.25em] w-fit rounded-[0.9em] rounded-tl-[0.3em] bg-lime-soft px-[0.8em] py-[0.45em] text-[0.8em] leading-snug">{t.msg}</p>
                </div>
              </li>
            ))}

            {/* Respuesta de la paciente */}
            <li className={`relative grid grid-cols-[1.9em_1fr] gap-[0.6em] ${beat(replied)}`}>
              <span />
              <p className="w-fit rounded-[0.9em] rounded-tl-[0.3em] border border-line bg-surface px-[0.8em] py-[0.45em] text-[0.8em] leading-snug">
                Sí, quiero empezar. ¿Puedo pagar el enganche el sábado?
              </p>
            </li>

            {/* Relevo */}
            <li className={`relative grid grid-cols-[1.9em_1fr] gap-[0.6em] ${beat(handoff)}`}>
              <span className="relative z-10 grid h-[1.9em] w-[1.9em] place-items-center rounded-full bg-sky-soft text-[0.95em] font-bold text-sky">M</span>
              <div className="rounded-[0.8em] border border-sky/40 bg-sky-soft px-[0.8em] py-[0.55em]">
                <p className="mono text-[0.66em] uppercase tracking-[0.08em] text-sky">Relevo · nota para la Dra. Martínez</p>
                <p className="mt-[0.2em] text-[0.78em] leading-snug">Aceptó el presupuesto de ortodoncia. Quiere pagar el enganche el sábado; ya vio las opciones a 12 meses.</p>
              </div>
            </li>

            {/* Toques que quedan en pausa */}
            {[
              { day: "Día 7", msg: "¿Te apartamos un horario para resolver dudas?" },
              { day: "Día 30", msg: "¿Retomamos tu tratamiento?" },
            ].map((t) => (
              <li key={t.day} className="relative grid grid-cols-[1.9em_1fr] gap-[0.6em]">
                <span className="relative z-10 mt-[0.1em] grid h-[1.9em] w-[1.9em] place-items-center rounded-full border border-dashed border-line bg-surface">
                  <span className="h-[0.5em] w-[0.5em] rounded-full bg-line" />
                </span>
                <p className="text-[0.72em] text-muted">
                  <span className={handoff ? "line-through decoration-muted/60" : ""}>
                    <span className="mono">{t.day}</span> · {t.msg}
                  </span>{" "}
                  <span className={handoff ? "font-semibold text-sky" : ""}>{handoff ? "En pausa: ya contestó" : "Programado"}</span>
                </p>
              </li>
            ))}
          </ol>
          <SceneExample />
        </SceneFrame>
      </Scene>
    </div>
  );
}
