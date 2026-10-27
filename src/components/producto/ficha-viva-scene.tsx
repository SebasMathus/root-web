"use client";
import { Enter, Thread, ThreadDivider, Typewriter, useSceneLoop } from "@/components/motion/kit";
import { Icon } from "@/components/icons";
import { DualScene } from "./scene-frame";
import { Avatar, Bubble, ChatHeader, Panel, SceneChip } from "./parts";

/*
 * D9 · Ficha viva: la conversación llena el CRM (plan §4). A la izquierda el WhatsApp de una inmobiliaria
 * ficticia; a la derecha la ficha de Jorge, que se llena mientras el agente pregunta. Al final la etapa pasa a
 * «Calificado» y aparece «Listo para relevo · Paola V.». Reposo = ficha completa.
 * Nunca se vacía: al repetir, la conversación anterior queda como historial (<Thread>) y la nueva entra debajo.
 */

const MESSAGES: { at: number; tone: "in" | "agente"; text: string }[] = [
  { at: 0, tone: "in", text: "Hola, busco rentar depa en Del Valle" },
  { at: 1, tone: "agente", text: "¡Hola, Jorge! Con gusto te ayudo. ¿Cuál es tu presupuesto mensual aproximado?" },
  { at: 2, tone: "in", text: "Unos 18 mil, con póliza jurídica" },
  { at: 3, tone: "agente", text: "¿Para cuándo te quieres mudar?" },
  { at: 4, tone: "in", text: "En diciembre" },
];

const FIELDS: { label: string; value: string; at: number }[] = [
  { label: "Operación", value: "Renta", at: 1 },
  { label: "Zona", value: "Del Valle", at: 1 },
  { label: "Presupuesto", value: "$18,000/mes", at: 2 },
  { label: "Garantía", value: "Póliza jurídica", at: 2 },
  { label: "Cuándo", value: "Diciembre", at: 4 },
];

const CAPTION =
  "Ejemplo de Ficha viva. Jorge escribe a Inmobiliaria Altavista: busca rentar un departamento en Del Valle. Mientras el agente de root le pregunta, " +
  "su ficha en el CRM se llena sola: operación renta, zona Del Valle, presupuesto de 18,000 pesos al mes, garantía con póliza jurídica y mudanza en diciembre. " +
  "Al final la etapa cambia de Nuevo a Calificado y la ficha queda lista para el relevo con Paola V., del equipo. Primera respuesta: 6 segundos.";

function Chat({ s, playing }: { s: number; playing: boolean }) {
  const replaying = playing && s !== 5;
  return (
    <Panel className="overflow-hidden h-full flex flex-col">
      <ChatHeader name="Inmobiliaria Altavista" />
      <Thread
        fade={replaying}
        outerClassName="flex-1"
        className="gap-[0.5em] p-[0.9em] bg-surface-2"
        full={MESSAGES.map((m) => (
          <div key={m.text} className="flex flex-col">
            <Bubble tone={m.tone}>{m.text}</Bubble>
          </div>
        ))}
      >
        {replaying
          ? MESSAGES.map((m) => (
              <div key={`h-${m.text}`} className="flex shrink-0 flex-col">
                <Bubble tone={m.tone}>{m.text}</Bubble>
              </div>
            ))
          : null}
        {replaying ? <ThreadDivider /> : null}
        {MESSAGES.filter((m) => s >= m.at).map((m) => (
          <Enter key={(replaying ? "r-" : "") + m.text} run={replaying} origin={m.tone === "in" ? "0% 100%" : "100% 100%"}>
            <Bubble tone={m.tone}>
              {m.tone === "agente" ? <Typewriter text={m.text} run={playing && s === m.at} speed={22} /> : m.text}
            </Bubble>
          </Enter>
        ))}
      </Thread>
    </Panel>
  );
}

function Ficha({ s }: { s: number }) {
  const qualified = s >= 5;
  return (
    <Panel className="p-[1em] h-full flex flex-col">
      <div className="flex items-center gap-[0.6em]">
        <Avatar initials="JP" role={qualified ? "agente" : "alerta"} className="transition-colors duration-500" />
        <div className="min-w-0 flex-1">
          <p className="text-[0.62em] font-bold uppercase tracking-[0.1em] text-muted">Ficha</p>
          <p className="text-[0.9em] font-semibold text-ink leading-tight">Jorge Pérez</p>
        </div>
        <SceneChip role={qualified ? "agente" : "alerta"} className="transition-colors duration-500">
          {qualified ? "Calificado" : "Nuevo"}
        </SceneChip>
      </div>
      <dl className="mt-[0.8em] flex flex-col gap-[0.4em]">
        {FIELDS.map((f) => {
          const filled = s >= f.at;
          return (
            <div
              key={f.label}
              className={`flex items-center justify-between gap-[0.6em] rounded-[0.6em] px-[0.65em] py-[0.42em] border transition-colors duration-500 ${
                filled ? "border-transparent bg-lime-soft" : "border-dashed border-line bg-surface"
              }`}
            >
              <dt className="text-[0.7em] text-muted">{f.label}</dt>
              <dd className={`text-[0.76em] font-semibold ${filled ? "text-ink" : "text-muted"}`}>{filled ? f.value : "—"}</dd>
            </div>
          );
        })}
      </dl>
      <div className="mt-auto pt-[0.8em] flex flex-wrap items-center justify-between gap-[0.4em]">
        <SceneChip role="agente">
          <Icon name="clock" className="w-[1em] h-[1em]" />
          Primera respuesta: 6 s
        </SceneChip>
        <SceneChip role={qualified ? "equipo" : undefined} className="transition-colors duration-500">
          <Icon name="handoff" className="w-[1em] h-[1em]" />
          {qualified ? "Listo para relevo · Paola V." : "Relevo · al calificar"}
        </SceneChip>
      </div>
    </Panel>
  );
}

export function FichaVivaScene({ reveal = false }: { reveal?: boolean }) {
  // 0 Jorge escribe · 1 agente pregunta (Operación, Zona) · 2 presupuesto y pago · 3 pregunta · 4 Cuándo · 5 calificado (reposo)
  const { ref, step, playing } = useSceneLoop<HTMLDivElement>([1400, 2600, 1600, 1600, 1500, 4500]);
  return (
    <div ref={ref}>
      <DualScene
        caption={CAPTION}
        reveal={reveal}
        breakpoint={480}
        wideBase={560}
        narrowBase={400}
        wide={
          <div className="grid grid-cols-[1fr_1fr] gap-[1em] items-stretch">
            <Chat s={step} playing={playing} />
            <Ficha s={step} />
          </div>
        }
        narrow={
          <div className="flex flex-col gap-[0.8em]">
            <Chat s={step} playing={playing} />
            <Ficha s={step} />
          </div>
        }
      />
    </div>
  );
}
