"use client";
import { Scene, useSceneLoop } from "@/components/motion/kit";
import { Icon, WhatsAppGlyph } from "@/components/icons";
import type { Role } from "@/components/ui";
import { appear, Avatar, Panel, SceneChip } from "./parts";

/*
 * Hero de /producto/bandeja-de-whatsapp: la bandeja compartida en el número de la empresa. Cada conversación dice
 * quién la atiende (Agente o Equipo). Pasos: entra un mensaje nuevo (coral) → el agente lo contesta (lima) →
 * otra conversación pasa al equipo con relevo (cielo). Reposo = bandeja completa, nadie sin respuesta.
 */

type Row = { id: string; initials: string; name: string; text: string; time: string; channel: "wa" | "ig"; owner: (s: number) => { role: Role; label: string } };

const ROWS: Row[] = [
  {
    id: "daniela",
    initials: "DR",
    name: "Daniela R.",
    text: "¿Tienen 3 recámaras en Coyoacán?",
    time: "10:42",
    channel: "wa",
    owner: (s) => (s >= 1 ? { role: "agente", label: "Agente · 8 s" } : { role: "alerta", label: "Nuevo" }),
  },
  {
    id: "mariana",
    initials: "ML",
    name: "Mariana L.",
    text: "Sí, el jueves me queda.",
    time: "10:39",
    channel: "wa",
    owner: (s) => (s >= 2 ? { role: "equipo", label: "Equipo · Andrés R." } : { role: "agente", label: "Agente" }),
  },
  { id: "jorge", initials: "JP", name: "@jorge.perez", text: "¿El depa admite mascotas?", time: "10:31", channel: "ig", owner: () => ({ role: "agente", label: "Agente" }) },
  { id: "sofia", initials: "SM", name: "Sofía M.", text: "Te mando la propuesta firmada", time: "10:12", channel: "wa", owner: () => ({ role: "equipo", label: "Equipo · Paola V." }) },
  { id: "luis", initials: "LG", name: "Luis G.", text: "¿Aceptan Fovissste?", time: "09:58", channel: "wa", owner: () => ({ role: "agente", label: "Agente" }) },
  { id: "ana", initials: "AC", name: "Ana C.", text: "Lo platico y te aviso", time: "09:20", channel: "wa", owner: () => ({ role: "equipo", label: "Equipo · Andrés R." }) },
];

const CAPTION =
  "Ejemplo de bandeja compartida de una inmobiliaria, con todas las conversaciones en el número de la empresa. Cada fila dice quién la atiende: " +
  "Daniela R. acaba de escribir y el agente de root le contesta en 8 segundos; Mariana L. pasa del agente a Andrés R., del equipo, con su historial; " +
  "@jorge.perez escribe por Instagram en la misma bandeja; Sofía M. y Ana C. las atiende el equipo y Luis G. el agente. Nadie se queda sin respuesta.";

export function BandejaScene() {
  // 0 entra Daniela · 1 el agente contesta · 2 relevo de Mariana · 3 reposo
  const { ref, step } = useSceneLoop<HTMLDivElement>([1500, 1600, 1800, 4200]);
  const s = step;
  return (
    <div ref={ref}>
      <Scene caption={CAPTION} baseWidth={420} reveal={false}>
        <Panel className="overflow-hidden">
          <div className="flex items-center gap-[0.6em] px-[0.9em] py-[0.7em] border-b border-line">
            <span className="inline-grid place-items-center w-[2em] h-[2em] rounded-[0.6em] bg-ink text-paper shrink-0">
              <Icon name="inbox" className="w-[1.1em] h-[1.1em]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.82em] font-semibold text-ink">Bandeja compartida</p>
              <p className="mono text-[0.62em] text-muted truncate">+52 55 … · Tu empresa</p>
            </div>
            <div className="flex gap-[0.3em]">
              <SceneChip>Todas</SceneChip>
              <SceneChip role="agente">Agente</SceneChip>
              <SceneChip role="equipo">Equipo</SceneChip>
            </div>
          </div>
          <ul className="divide-y divide-line">
            {ROWS.map((r) => {
              const owner = r.owner(s);
              const isNew = r.id === "daniela";
              return (
                <li key={r.id} className={`flex items-center gap-[0.6em] px-[0.9em] py-[0.55em] ${isNew ? appear(true) : ""} ${isNew && s === 0 ? "bg-coral-soft/60" : ""}`}>
                  <span className="relative shrink-0">
                    <Avatar initials={r.initials} role={owner.role === "alerta" ? "alerta" : owner.role} />
                    <span className="absolute -right-[0.2em] -bottom-[0.2em] inline-grid place-items-center w-[1em] h-[1em] rounded-full bg-surface text-ink">
                      {r.channel === "wa" ? <WhatsAppGlyph className="w-[0.8em] h-[0.8em]" /> : <Icon name="instagram" className="w-[0.8em] h-[0.8em]" />}
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center justify-between gap-[0.5em]">
                      <span className="text-[0.76em] font-semibold text-ink truncate">{r.name}</span>
                      <span className="mono text-[0.6em] text-muted shrink-0">{r.time}</span>
                    </p>
                    <p className="flex items-center justify-between gap-[0.5em] mt-[0.15em]">
                      <span className="text-[0.7em] text-muted truncate">{r.text}</span>
                      <SceneChip role={owner.role} className="transition-colors duration-500 shrink-0">
                        {owner.label}
                      </SceneChip>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={`mx-[0.9em] mb-[0.9em] mt-[0.2em] rounded-[0.7em] bg-sky-soft p-[0.6em] flex items-start gap-[0.5em] ${appear(s >= 2)}`}>
            <Icon name="handoff" className="w-[1.1em] h-[1.1em] text-sky shrink-0 mt-[0.1em]" />
            <p className="text-[0.68em] text-ink leading-snug">
              <span className="font-semibold text-sky">Relevo a Andrés R.</span> Mariana busca 2 recámaras en Narvarte, crédito Infonavit, quiere visitar el jueves.
            </p>
          </div>
        </Panel>
      </Scene>
    </div>
  );
}
