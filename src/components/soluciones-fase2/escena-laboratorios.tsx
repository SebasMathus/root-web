"use client";
import { Enter, Scene, Thread, ThreadDivider, useSceneLoop } from "@/components/motion/kit";
import { beat, Bubble, FieldRow, SceneChip, SceneExample, SceneFrame } from "./scene-parts";

/**
 * Cotiza y agenda la toma (plan §3.3, laboratorios; OPP-194: pregunta → cotización → cita → toma → resultados).
 * Una paciente pregunta precio y preparación; el agente cotiza con la lista del laboratorio, ofrece sucursal
 * o domicilio y agenda la toma. A la derecha, la ficha se llena con lo que se dijo en la conversación.
 * Estado final: cita agendada con el recordatorio de preparación programado.
 * Nunca se vacía: al repetir, la conversación anterior queda como historial y la nueva entra debajo.
 */
const STEPS = [1500, 1600, 1500, 1600, 3400];

const MESSAGES: { from: "cliente" | "agente"; text: string; meta?: string; at: number }[] = [
  { from: "cliente", text: "Hola, ¿cuánto cuesta la química sanguínea y necesito ayuno?", meta: "lun 21:12", at: 0 },
  {
    from: "agente",
    text: "Hola Mónica. La química sanguínea de 6 elementos cuesta $420 y va con ayuno. ¿Prefieres sucursal o a domicilio?",
    at: 1,
  },
  { from: "cliente", text: "A domicilio, CP 03100.", at: 2 },
  { from: "agente", text: "Sí llegamos al 03100. Te agendo el miércoles a las 7:30. Un día antes te mando las indicaciones.", at: 3 },
];

export function EscenaLaboratorios() {
  const { ref, step, playing } = useSceneLoop<HTMLDivElement>(STEPS);
  const quoted = step >= 1;
  const home = step >= 2;
  const booked = step >= 3;
  const done = step >= 4;
  const replaying = playing && !done;

  return (
    <div ref={ref}>
      <Scene
        reveal={false}
        baseWidth={520}
        caption="Ejemplo: Mónica pregunta por WhatsApp cuánto cuesta una química sanguínea y si necesita ayuno. El agente de root le cotiza con la lista de precios del laboratorio, le dice que va con ayuno y le pregunta si prefiere sucursal o domicilio. Mónica pide domicilio en el código postal 03100 y el agente agenda la toma para el miércoles a las 7:30. La ficha de Mónica queda con el estudio, el precio, la modalidad y la cita, y el recordatorio con la preparación queda programado para la noche anterior."
      >
        <SceneFrame
          title="Mónica R."
          sub="WhatsApp del laboratorio"
          icon="flask"
          right={<SceneChip role={done ? "ganado" : "agente"}>{done ? "Cita agendada" : "Cotizando"}</SceneChip>}
        >
          <Thread
            fade={replaying}
            className="gap-[0.5em]"
            full={MESSAGES.map((m) => (
              <Bubble key={m.text} from={m.from} meta={m.meta}>
                {m.text}
              </Bubble>
            ))}
          >
            {replaying
              ? MESSAGES.map((m) => (
                  <div key={`h-${m.text}`} className="shrink-0">
                    <Bubble from={m.from} meta={m.meta}>
                      {m.text}
                    </Bubble>
                  </div>
                ))
              : null}
            {replaying ? <ThreadDivider /> : null}
            {MESSAGES.filter((m) => step >= m.at).map((m) => (
              <Enter key={(replaying ? "r-" : "") + m.text} run={replaying} origin={m.from === "agente" ? "100% 100%" : "0% 100%"}>
                <Bubble from={m.from} meta={m.meta}>
                  {m.text}
                </Bubble>
              </Enter>
            ))}
          </Thread>

          <div className="mt-[0.9em] rounded-[0.9em] border border-line bg-surface-2 px-[0.9em] py-[0.6em]">
            <div className="flex items-center justify-between gap-[0.6em]">
              <p className="text-[0.8em] font-semibold">Ficha de Mónica</p>
              <span className="mono text-[0.68em] text-muted">se llena en la conversación</span>
            </div>
            <div className="mt-[0.3em] grid grid-cols-2 gap-x-[1.2em]">
              <FieldRow label="Estudio" value="Química sanguínea 6" on={quoted} />
              <FieldRow label="Cotización" value="$420" on={quoted} />
              <FieldRow label="Modalidad" value="Domicilio · 03100" on={home} />
              <FieldRow label="Cita" value="mié 7:30" on={booked} />
            </div>
          </div>
          <div className={`mt-[0.6em] flex flex-wrap gap-[0.4em] ${beat(done)}`}>
            <SceneChip role="agente">Recordatorio con preparación · mar 20:00</SceneChip>
            <SceneChip role="equipo">Ruta de tomas · mié</SceneChip>
          </div>
          <SceneExample />
        </SceneFrame>
      </Scene>
    </div>
  );
}
