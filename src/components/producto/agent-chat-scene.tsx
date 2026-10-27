"use client";
import { Enter, Scene, Thread, ThreadDivider, useSceneLoop } from "@/components/motion/kit";
import { Icon } from "@/components/icons";
import { Avatar, Bubble, ChatHeader, Panel, SceneChip } from "./parts";

/*
 * Hero de /producto/agentes-de-ia: una conversación real de inmobiliaria a las 22:41 y, arriba, las Habilidades que
 * el agente va usando. Pasos: llega el mensaje → Responder → Calificar → Agendar → Pasar al equipo (relevo).
 * El estado de reposo (servidor, fuera de pantalla, movimiento reducido) es la conversación completa.
 * Nunca se vacía: al repetir, la conversación anterior queda como historial (<Thread>) y la nueva entra debajo;
 * las tarjetas de abajo se ven siempre (pendientes, con borde punteado, hasta que el agente las cumple).
 */

const SKILLS = [
  { name: "Responder", from: 1 },
  { name: "Calificar", from: 2 },
  { name: "Agendar", from: 4 },
  { name: "Dar seguimiento", from: 99 },
  { name: "Reactivar", from: 99 },
  { name: "Pasar al equipo", from: 5 },
];

const MESSAGES: { at: number; tone: "in" | "agente"; text: string; time: string }[] = [
  { at: 0, tone: "in", text: "Hola, vi el depa de 2 recámaras en Narvarte, ¿sigue disponible?", time: "22:41" },
  {
    at: 1,
    tone: "agente",
    text: "¡Hola, Mariana! Sí, sigue disponible. ¿Lo buscas para comprar o rentar, y cómo pagarías?",
    time: "22:41",
  },
  { at: 2, tone: "in", text: "Para comprar, con crédito Infonavit.", time: "22:43" },
  { at: 3, tone: "agente", text: "Perfecto. ¿Te late visitarlo el jueves a las 11:00?", time: "22:43" },
  { at: 4, tone: "in", text: "Sí, el jueves me queda.", time: "22:44" },
];

const CAPTION =
  "Ejemplo de conversación de una inmobiliaria a las 22:41. Mariana pregunta si sigue disponible un departamento en Narvarte. " +
  "El agente de root responde en 8 segundos, la califica (compra con crédito Infonavit), le propone una visita el jueves a las 11:00 " +
  "y pasa la conversación a Andrés R., del equipo, con una nota de relevo. Arriba se encienden las habilidades que usó: " +
  "Responder, Calificar, Agendar y Pasar al equipo.";

/** Tarjeta de resultado: siempre visible; «pendiente» (punteada, atenuada en color) hasta que ocurre. */
function Outcome({ on, label, team = false, children }: { on: boolean; label: string; team?: boolean; children: React.ReactNode }) {
  const tone = team ? "border-sky bg-sky-soft" : "border-line bg-surface";
  return (
    <div
      className={`rounded-[0.8em] border p-[0.6em] transition-colors duration-500 ${on ? tone : "border-dashed border-line bg-surface-2"}`}
    >
      <p
        className={`text-[0.6em] font-bold uppercase tracking-[0.08em] transition-colors duration-500 ${on ? (team ? "text-sky" : "text-lime") : "text-muted"}`}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

export function AgentChatScene() {
  // 0 llega · 1 responde · 2 califica · 3 propone · 4 agenda · 5 relevo · 6 reposo (todo)
  const { ref, step, playing } = useSceneLoop<HTMLDivElement>([1300, 1600, 1500, 1400, 1500, 1700, 4200]);
  const s = step === 6 ? 99 : step;
  const replaying = playing && step !== 6;
  const bubble = (m: (typeof MESSAGES)[number]) => (
    <Bubble tone={m.tone} time={m.time}>
      {m.text}
    </Bubble>
  );

  return (
    <div ref={ref}>
      <Scene caption={CAPTION} baseWidth={420} reveal={false}>
        <div className="flex flex-wrap gap-[0.4em] mb-[0.8em]">
          {SKILLS.map((k) => {
            const on = s >= k.from && k.from !== 99;
            const team = k.name === "Pasar al equipo";
            return (
              <SceneChip key={k.name} role={on ? (team ? "equipo" : "agente") : undefined} className="transition-colors duration-300">
                {on ? <Icon name="check" className="w-[1em] h-[1em]" strokeWidth={2.6} /> : null}
                {k.name}
              </SceneChip>
            );
          })}
        </div>

        <Panel className="overflow-hidden">
          <ChatHeader
            name="Inmobiliaria Altavista"
            right={
              <SceneChip role={s >= 1 ? "agente" : undefined} className="transition-colors duration-300">
                <Icon name="clock" className="w-[1em] h-[1em]" />
                {s >= 1 ? "1.ª respuesta · 8 s" : "1.ª respuesta · …"}
              </SceneChip>
            }
          />
          <Thread
            fade={replaying}
            className="gap-[0.5em] p-[0.9em] bg-surface-2"
            full={MESSAGES.map((m) => (
              <div key={m.text} className="flex flex-col">
                {bubble(m)}
              </div>
            ))}
          >
            {replaying
              ? MESSAGES.map((m) => (
                  <div key={`h-${m.text}`} className="flex shrink-0 flex-col">
                    {bubble(m)}
                  </div>
                ))
              : null}
            {replaying ? <ThreadDivider /> : null}
            {MESSAGES.filter((m) => s >= m.at).map((m) => (
              <Enter key={(replaying ? "r-" : "") + m.text} run={replaying} origin={m.tone === "in" ? "0% 100%" : "100% 100%"}>
                {bubble(m)}
              </Enter>
            ))}
          </Thread>
        </Panel>

        <div className="grid grid-cols-3 gap-[0.5em] mt-[0.7em]">
          <Outcome on={s >= 2} label="Califica">
            <p className="text-[0.72em] text-ink leading-snug mt-[0.2em]">Compra · Infonavit · Narvarte</p>
          </Outcome>
          <Outcome on={s >= 4} label="Agenda">
            <p className="text-[0.72em] text-ink leading-snug mt-[0.2em]">Visita · jueves 11:00</p>
          </Outcome>
          <Outcome on={s >= 5} label="Relevo" team>
            <p className="flex items-center gap-[0.35em] mt-[0.2em]">
              <Avatar initials="AR" role="equipo" className="ring-[0.15em] ring-surface" />
              <span className="text-[0.72em] text-ink leading-snug">Andrés R.</span>
            </p>
          </Outcome>
        </div>
      </Scene>
    </div>
  );
}
