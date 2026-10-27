"use client";
import { Scene, useSceneLoop } from "@/components/motion/kit";
import { beat, Bubble, SceneChip, SceneExample, SceneFrame } from "./scene-parts";

/**
 * Confirmar, reagendar y llenar el hueco (plan §3.3, consultorios; OPP-188). Un día antes el agente pide
 * confirmación; una paciente no puede, se cambia al viernes y el horario libre se le ofrece a otra paciente
 * que quería adelantar su cita. Estado final: agenda del jueves completa, sin huecos.
 */
const STEPS = [1500, 1500, 1500, 1700, 3400];

export function EscenaConsultorios() {
  const { ref, step } = useSceneLoop<HTMLDivElement>(STEPS);
  const asked = step >= 0;
  const declined = step >= 1;
  const moved = step >= 2;
  const offered = step >= 3;
  const filled = step >= 4;

  const slots = [
    { time: "09:00", who: "Carlos R.", state: "ok" as const },
    { time: "10:00", who: "", state: "cambio" as const },
    { time: "11:00", who: "Pedro A.", state: "ok" as const },
    { time: "12:30", who: "Ana T.", state: "ok" as const },
  ];

  return (
    <div ref={ref}>
      <Scene
        reveal={false}
        baseWidth={520}
        caption="Ejemplo: un día antes, el agente de root le pide a Sofía que confirme su cita del jueves a las 10:00. Sofía no puede y pide el viernes; el agente la cambia al viernes a las 12:00 y le ofrece el horario libre del jueves a Laura, que había pedido una cita antes. Laura lo toma y la agenda del jueves queda completa."
      >
        <div className="grid gap-[0.9em]">
          <SceneFrame title="Sofía M." sub="WhatsApp de la clínica · Dr. Ramos" icon="stethoscope" right={<SceneChip role="agente">Confirmaciones</SceneChip>}>
            <div className="grid gap-[0.5em]">
              <Bubble from="agente" meta="mié 10:00" on={asked}>
                Hola Sofía, te recordamos tu cita con el Dr. Ramos mañana jueves a las 10:00. ¿La confirmas?
              </Bubble>
              <Bubble from="cliente" on={declined}>
                No voy a poder, ¿hay lugar el viernes?
              </Bubble>
              <Bubble from="agente" on={moved}>
                Listo: viernes a las 12:00. Te escribo un día antes para confirmar.
              </Bubble>
            </div>
          </SceneFrame>

          <div className="rounded-[1.1em] border border-line bg-surface p-[1em] text-ink">
            <div className="flex items-center justify-between gap-[0.6em]">
              <p className="text-[0.85em] font-semibold">Agenda · jueves 14</p>
              <SceneChip role={filled ? "ganado" : "neutro"}>{filled ? "Sin huecos" : "1 horario libre"}</SceneChip>
            </div>
            <ul className="mt-[0.6em] grid gap-[0.35em]">
              {slots.map((s) => {
                if (s.state === "ok")
                  return (
                    <li key={s.time} className="flex items-center justify-between gap-[0.6em] rounded-[0.6em] bg-surface-2 px-[0.7em] py-[0.4em]">
                      <span className="text-[0.78em]">
                        <span className="mono">{s.time}</span> · {s.who}
                      </span>
                      <SceneChip role="agente">Confirmada</SceneChip>
                    </li>
                  );
                return (
                  <li
                    key={s.time}
                    className={`flex items-center justify-between gap-[0.6em] rounded-[0.6em] border px-[0.7em] py-[0.4em] transition-colors duration-500 ${
                      filled ? "border-transparent bg-sky-soft" : moved ? "border-dashed border-coral/60 bg-coral-soft" : "border-transparent bg-surface-2"
                    }`}
                  >
                    <span className="text-[0.78em]">
                      <span className="mono">{s.time}</span> · {filled ? "Laura G." : moved ? "Horario libre" : "Sofía M."}
                    </span>
                    <SceneChip role={filled ? "equipo" : moved ? "alerta" : "neutro"}>{filled ? "Adelantó su cita" : moved ? "Se ofrece" : "Por confirmar"}</SceneChip>
                  </li>
                );
              })}
            </ul>
            <p className={`mt-[0.6em] text-[0.74em] text-muted ${beat(offered)}`}>
              <span className="font-semibold text-lime">Agente:</span> «Laura, se liberó un lugar el jueves a las 10:00. ¿Lo quieres?» · Laura: «¡Sí!»
            </p>
          </div>
          <SceneExample />
        </div>
      </Scene>
    </div>
  );
}
