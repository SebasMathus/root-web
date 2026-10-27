import { Scene } from "@/components/motion/kit";
import { Icon } from "@/components/icons";
import { RootMarkAnimated } from "@/components/brand";
import { Avatar, Bubble, Panel, SceneChip } from "./parts";

/*
 * Visual del índice /producto: la frase guía en tres piezas de interfaz. Tu agente contesta y califica (lima) ·
 * Tu equipo cierra (cielo) · Tú ves todo (tinta). Estática y completa desde el servidor; solo el ∞ se anima en CSS.
 */

const CAPTION =
  "Ejemplo de cómo se reparte el trabajo en root. Tu agente contesta y califica: responde a Mariana en 8 segundos y la marca como calificada. " +
  "Tu equipo cierra: Andrés R. recibe el relevo, envía la propuesta y gana el trato. Tú ves todo: un embudo con 12 prospectos nuevos, 8 calificados, 5 con cita y 3 ganados.";

const FUNNEL = [
  { label: "Nuevo", n: 12, role: "alerta" as const },
  { label: "Calificado", n: 8, role: "agente" as const },
  { label: "Cita", n: 5, role: "equipo" as const },
  { label: "Ganado", n: 3, role: "ganado" as const },
];

const BAR: Record<(typeof FUNNEL)[number]["role"], string> = { alerta: "bg-coral", agente: "bg-lime", equipo: "bg-sky", ganado: "bg-success" };

export function GuideTriad() {
  return (
    <Scene caption={CAPTION} baseWidth={400} reveal={false}>
      <div className="relative flex flex-col gap-[0.8em]">
        <Panel className="p-[0.9em]">
          <p className="text-[0.62em] font-bold uppercase tracking-[0.1em] text-lime">Tu agente contesta y califica</p>
          <div className="mt-[0.6em] flex flex-col gap-[0.4em]">
            <Bubble tone="in" time="22:41">
              ¿Sigue disponible el depa de Narvarte?
            </Bubble>
            <Bubble tone="agente" time="22:41">
              ¡Sí! ¿Lo buscas para comprar o rentar?
            </Bubble>
          </div>
          <div className="mt-[0.5em] flex gap-[0.4em]">
            <SceneChip role="agente">
              <Icon name="clock" className="w-[1em] h-[1em]" />8 s
            </SceneChip>
            <SceneChip role="agente">Calificado</SceneChip>
          </div>
        </Panel>

        <div className="flex justify-center -my-[0.4em] relative z-[1]">
          {/* El ∞ se dimensiona en em, como el resto del lienzo. */}
          <span className="[&>svg]:w-[2.2em] [&>svg]:h-[2.2em]">
            <RootMarkAnimated size={34} />
          </span>
        </div>

        <Panel className="p-[0.9em] flex items-center gap-[0.6em]">
          <Avatar initials="AR" role="equipo" />
          <div className="min-w-0 flex-1">
            <p className="text-[0.62em] font-bold uppercase tracking-[0.1em] text-sky">Tu equipo cierra</p>
            <p className="text-[0.78em] text-ink leading-snug mt-[0.15em]">Andrés R. recibe el relevo y envía la propuesta</p>
          </div>
          <SceneChip role="ganado">Ganado</SceneChip>
        </Panel>

        <Panel className="p-[0.9em]">
          <p className="text-[0.62em] font-bold uppercase tracking-[0.1em] text-ink">Tú ves todo</p>
          <div className="mt-[0.6em] grid gap-[0.35em]">
            {FUNNEL.map((f) => (
              <div key={f.label} className="grid grid-cols-[5.5em_1fr_2em] items-center gap-[0.6em]">
                <span className="text-[0.7em] text-muted">{f.label}</span>
                <span className="h-[0.55em] rounded-full bg-surface-2 overflow-hidden">
                  <span className={`block h-full rounded-full ${BAR[f.role]}`} style={{ width: `${(f.n / 12) * 100}%` }} />
                </span>
                <span className="mono text-[0.72em] text-ink text-right">{f.n}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Scene>
  );
}
