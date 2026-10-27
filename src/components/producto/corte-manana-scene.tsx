"use client";
import { CountUp, useSceneLoop } from "@/components/motion/kit";
import { Icon } from "@/components/icons";
import { DualScene } from "./scene-frame";
import { Avatar, Panel, SceneChip } from "./parts";

/*
 * D4 · Corte de la mañana (concepto de «cómo trabaja root»; plan §4). La noche de 20:00 a 08:00: llegan mensajes,
 * cada uno se pone en lima cuando el agente lo atiende y a las 08:00 se arma el corte del turno.
 * Todos los números son del caso de ejemplo, no resultados. Reposo = noche atendida + corte completo.
 */

const NIGHT: { time: string; text: string; result: string; team?: boolean }[] = [
  { time: "20:14", text: "¿Tienen crédito a 12 meses?", result: "Calificado" },
  { time: "21:37", text: "Quiero ver el depa de Roma", result: "Visita propuesta" },
  { time: "22:05", text: "¿Precio del de Coyoacán?", result: "Respondido" },
  { time: "23:48", text: "¿Aceptan Fovissste?", result: "Calificado" },
  { time: "00:12", text: "Busco 3 recámaras", result: "Calificado" },
  { time: "06:55", text: "¿Puedo hablar con un asesor?", result: "Espera a tu equipo", team: true },
];

const WAITING = [
  { initials: "ML", name: "Mariana L.", note: "Visita el jueves, Infonavit" },
  { initials: "LG", name: "Luis G.", note: "Fovissste, 2 recámaras" },
  { initials: "AC", name: "Ana C.", note: "Contado, hasta $2.8 M" },
  { initials: "JP", name: "Jorge P.", note: "Pidió hablar con un asesor" },
];

const CAPTION =
  "Ejemplo de una noche, de las 20:00 a las 08:00. Llegan seis mensajes entre las 20:14 y las 06:55 y el agente de root atiende cada uno: " +
  "responde, califica o propone una visita, y el último lo deja para el equipo. A las 08:00 aparece el Corte de la mañana del martes: " +
  "37 conversaciones atendidas, 21 calificadas, 6 visitas propuestas, 4 personas que esperan a tu equipo con su nota, y 0 sin respuesta.";

function Night({ s }: { s: number }) {
  return (
    <Panel className="overflow-hidden h-full">
      <div className="px-[1em] py-[0.7em] border-b border-line flex items-center justify-between">
        <p className="text-[0.75em] font-semibold text-ink">Mientras tu equipo no está</p>
        <p className="mono text-[0.65em] text-muted">20:00 → 08:00</p>
      </div>
      <ol className="relative p-[0.9em] flex flex-col gap-[0.55em]">
        <span aria-hidden="true" className="absolute left-[2.15em] top-[1.2em] bottom-[1.2em] w-[0.12em] bg-gradient-to-b from-ink/50 to-lime" />
        {NIGHT.map((n, i) => {
          const done = s > i;
          return (
            <li key={n.time} className="relative flex items-center gap-[0.7em]">
              <span className="mono text-[0.68em] text-muted w-[3.4em] shrink-0">{n.time}</span>
              <span
                className={`relative z-[1] w-[0.75em] h-[0.75em] rounded-full shrink-0 transition-colors duration-500 ${done ? (n.team ? "bg-sky" : "bg-lime") : "bg-coral"}`}
              />
              <span className="text-[0.74em] text-ink truncate flex-1 min-w-0">{n.text}</span>
              <SceneChip role={done ? (n.team ? "equipo" : "agente") : "alerta"} className="transition-colors duration-500">
                {done ? n.result : "Nuevo"}
              </SceneChip>
            </li>
          );
        })}
      </ol>
    </Panel>
  );
}

function Report({ s, run }: { s: number; run: boolean }) {
  const ready = s >= 6;
  const rows = [
    { label: "Conversaciones atendidas", value: 37 },
    { label: "Calificadas", value: 21 },
    { label: "Visitas propuestas", value: 6 },
  ];
  return (
    <Panel className={`p-[1em] h-full transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-50"}`}>
      <div className="flex items-center justify-between gap-[0.5em]">
        <p className="text-[0.62em] font-bold uppercase tracking-[0.1em] text-lime">Corte de la mañana</p>
        <p className="mono text-[0.62em] text-muted">martes · 08:00</p>
      </div>
      <dl className="mt-[0.6em] divide-y divide-line">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between py-[0.4em]">
            <dt className="text-[0.76em] text-muted">{r.label}</dt>
            <dd className="mono text-[1.05em] text-ink">
              <CountUp value={r.value} run={run && ready} />
            </dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between py-[0.4em]">
          <dt className="text-[0.76em] text-muted">Sin respuesta</dt>
          <dd className="mono text-[1.05em] text-coral line-through decoration-2">0</dd>
        </div>
      </dl>
      <div className="mt-[0.5em] rounded-[0.7em] bg-sky-soft p-[0.6em]">
        <p className="flex items-center justify-between">
          <span className="text-[0.7em] font-semibold text-sky">Esperan a tu equipo</span>
          <span className="mono text-[0.9em] text-sky">4</span>
        </p>
        <ul className="mt-[0.35em] flex flex-col gap-[0.3em]">
          {WAITING.map((w) => (
            <li key={w.name} className="flex items-center gap-[0.45em]">
              <Avatar initials={w.initials} role="equipo" className="ring-[0.15em] ring-surface" />
              <span className="text-[0.68em] text-ink font-semibold shrink-0">{w.name}</span>
              <span className="text-[0.64em] text-muted truncate">{w.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

export function CorteMananaScene() {
  // 0–5: cada mensaje de la noche se atiende · 6: corte completo (reposo)
  const { ref, step, playing } = useSceneLoop<HTMLDivElement>([1100, 900, 900, 900, 900, 1000, 5000]);
  return (
    <div ref={ref}>
      <DualScene
        caption={CAPTION}
        wideBase={820}
        narrowBase={380}
        wide={
          <div className="grid grid-cols-[1.15fr_1fr] gap-[1em] items-stretch">
            <Night s={step} />
            <Report s={step} run={playing} />
          </div>
        }
        narrow={
          <div className="flex flex-col gap-[0.8em]">
            <Night s={step} />
            <div className="flex justify-center text-muted" aria-hidden="true">
              <Icon name="chevron" className="w-[1.2em] h-[1.2em]" />
            </div>
            <Report s={step} run={playing} />
          </div>
        }
      />
    </div>
  );
}
