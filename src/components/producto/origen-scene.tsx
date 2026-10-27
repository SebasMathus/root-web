"use client";
import { Scene, useSceneLoop } from "@/components/motion/kit";
import { Icon } from "@/components/icons";
import { Avatar, Panel, SceneChip } from "./parts";

/*
 * Origen del trato (atribución de campañas, disponible). Arriba, tres orígenes; en medio, el prospecto que entra
 * con su campaña; abajo, los tratos por campaña listos para exportar. El bucle resalta un origen a la vez.
 * Reposo = los tres orígenes y la tabla completa. Datos de ejemplo.
 */

const SOURCES = [
  { id: "narvarte", kind: "Anuncio en Meta", name: "Depas en Narvarte", prospect: { initials: "ML", name: "Mariana López" }, leads: 64, won: 5 },
  { id: "coyoacan", kind: "Anuncio en Meta", name: "Preventa Coyoacán", prospect: { initials: "LG", name: "Luis García" }, leads: 41, won: 3 },
  { id: "sitio", kind: "Formulario del sitio", name: "Tu sitio · Contacto", prospect: { initials: "AC", name: "Ana Castro" }, leads: 18, won: 2 },
];

const CAPTION =
  "Ejemplo de Origen del trato. Tres orígenes: el anuncio de Meta «Depas en Narvarte», el anuncio «Preventa Coyoacán» y el formulario de contacto de tu sitio. " +
  "Cada prospecto entra al CRM como trato con la campaña que lo trajo; por ejemplo, Mariana López llega etiquetada con «Depas en Narvarte». " +
  "Abajo, la tabla de tratos por campaña: 64 prospectos y 5 ganados de Narvarte, 41 y 3 de Coyoacán, 18 y 2 del formulario, lista para exportar y calcular tu costo por venta.";

export function OrigenScene() {
  // 0–2: un origen a la vez · 3: todo (reposo)
  const { ref, step } = useSceneLoop<HTMLDivElement>([1700, 1700, 1700, 4000]);
  const active = step < 3 ? SOURCES[step] : SOURCES[0];
  const all = step === 3;

  return (
    <div ref={ref}>
      <Scene caption={CAPTION} baseWidth={420}>
        <div className="grid grid-cols-3 gap-[0.5em]">
          {SOURCES.map((src) => {
            const on = all || src.id === active.id;
            return (
              <div
                key={src.id}
                className={`rounded-[0.8em] border p-[0.6em] bg-surface transition-all duration-500 ${on ? "border-lime shadow-[var(--shadow)]" : "border-line opacity-55"}`}
              >
                <p className="text-[0.62em] font-bold uppercase tracking-[0.06em] text-muted leading-tight">{src.kind}</p>
                <p className="text-[0.78em] font-semibold text-ink leading-tight mt-[0.25em]">{src.name}</p>
                <span className="mt-[0.5em] inline-flex rounded-[0.5em] bg-ink text-paper text-[0.6em] font-semibold px-[0.6em] py-[0.25em]">
                  {src.id === "sitio" ? "Enviar" : "Enviar mensaje"}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center text-muted my-[0.4em]">
          <Icon name="chevron" className="w-[1.3em] h-[1.3em]" />
        </div>

        <Panel className="p-[0.7em] flex items-center gap-[0.6em]">
          <Avatar initials={active.prospect.initials} role="agente" />
          <div className="min-w-0 flex-1">
            <p className="text-[0.62em] font-bold uppercase tracking-[0.08em] text-muted">Nuevo trato</p>
            <p className="text-[0.8em] font-semibold text-ink">{active.prospect.name}</p>
          </div>
          <SceneChip role="agente">
            <Icon name="tag" className="w-[1em] h-[1em]" />
            Origen: {active.name}
          </SceneChip>
        </Panel>

        <div className="flex justify-center text-muted my-[0.4em]">
          <Icon name="chevron" className="w-[1.3em] h-[1.3em]" />
        </div>

        <Panel className="overflow-hidden">
          <div className="flex items-center justify-between px-[0.8em] py-[0.55em] border-b border-line">
            <p className="text-[0.74em] font-semibold text-ink">Tratos por campaña · octubre</p>
            <SceneChip>
              <Icon name="file" className="w-[1em] h-[1em]" />
              Exportar
            </SceneChip>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="px-[0.8em] py-[0.4em] text-[0.6em] font-bold uppercase tracking-[0.08em] text-muted">Campaña</th>
                <th className="px-[0.8em] py-[0.4em] text-[0.6em] font-bold uppercase tracking-[0.08em] text-muted text-right">Prospectos</th>
                <th className="px-[0.8em] py-[0.4em] text-[0.6em] font-bold uppercase tracking-[0.08em] text-muted text-right">Ganados</th>
              </tr>
            </thead>
            <tbody>
              {SOURCES.map((src) => {
                const on = all || src.id === active.id;
                return (
                  <tr key={src.id} className={`border-t border-line transition-colors duration-500 ${on && !all ? "bg-lime-soft" : ""}`}>
                    <td className="px-[0.8em] py-[0.4em] text-[0.72em] text-ink">{src.name}</td>
                    <td className="px-[0.8em] py-[0.4em] mono text-[0.72em] text-ink text-right">{src.leads}</td>
                    <td className="px-[0.8em] py-[0.4em] mono text-[0.72em] text-success text-right">{src.won}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>
      </Scene>
    </div>
  );
}
