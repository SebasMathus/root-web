"use client";
import { RoleChip, ExampleTag } from "@/components/ui";
import { Scene, useSceneLoop } from "@/components/motion/kit";

/*
 * Escena «Tu agente contesta y califica. Tu equipo cierra. Tú ves todo.» (frase guía, plan §2.3).
 * Tres tarjetas apiladas: la conversación del agente (lima), la nota de relevo al vendedor (cielo) y el embudo
 * que ve el gerente. El estado final (paso 5) es el que se pinta en el servidor, fuera de pantalla y con
 * movimiento reducido. Todo dentro se mide en em (escala uniforme). Datos de ejemplo.
 */

const DURATIONS = [1300, 1500, 1500, 1900, 1900, 3400] as const;
const REST = DURATIONS.length - 1;

export function GuidePhraseScene({ className = "" }: { className?: string }) {
  const { ref, step } = useSceneLoop<HTMLDivElement>(DURATIONS);
  const at = (n: number) => step === REST || step >= n;
  // Lo que aún no pasa queda tenue (30 %), nunca invisible: la escena no se vacía en ningún paso del bucle.
  const show = (n: number) =>
    `transition-[opacity,transform] duration-500 motion-reduce:transition-none ${at(n) ? "opacity-100 translate-y-0" : "opacity-30 translate-y-[0.4em]"}`;
  const panel = (n: number) => `transition-opacity duration-500 motion-reduce:transition-none ${at(n) ? "opacity-100" : "opacity-60"}`;

  return (
    <div ref={ref} className={className}>
      <Scene
        baseWidth={440}
        caption="Ejemplo de cómo trabaja root, con datos de ejemplo. Primero, el agente contesta en WhatsApp a una prospecta que pregunta por un departamento en Narvarte y la califica: paga con crédito Infonavit y quiere mudarse en marzo. Después le pasa la conversación a Luis, del equipo de ventas, con una nota de relevo que resume quién es, qué quiere y qué ya se le respondió, y la visita queda agendada. Al final, el gerente ve el embudo completo con nuevos, calificados, con cita y ganados."
      >
        <div className="flex flex-col gap-[0.9em] text-[1em] leading-snug">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.7em] uppercase tracking-[0.12em] text-muted">Inmobiliaria · WhatsApp</span>
            <ExampleTag className="text-[0.62em]!" />
          </div>

          {/* 1 · El agente contesta y califica */}
          <div className={`card p-[1em] ${panel(0)}`} style={{ borderRadius: "1em" }}>
            <div className="flex items-center justify-between gap-[0.5em]">
              <p className="font-display font-bold text-[0.95em] text-ink">Tu agente contesta y califica</p>
              <RoleChip role="agente" className="text-[0.68em]! px-[0.65em]! py-[0.22em]! gap-[0.35em]!" />
            </div>
            <div className="mt-[0.8em] flex flex-col gap-[0.45em] text-[0.8em]">
              <p
                className={`self-start max-w-[80%] rounded-[0.9em] rounded-bl-[0.25em] bg-surface-2 px-[0.8em] py-[0.5em] text-ink ${show(0)}`}
              >
                Hola, vi el depa en Narvarte. ¿Sigue disponible?
              </p>
              <p
                className={`self-end max-w-[82%] rounded-[0.9em] rounded-br-[0.25em] bg-lime-soft px-[0.8em] py-[0.5em] text-ink ${show(1)}`}
              >
                ¡Hola, Mariana! Sí sigue. ¿Lo buscas con crédito Infonavit o de contado?
              </p>
              <p
                className={`self-start max-w-[80%] rounded-[0.9em] rounded-bl-[0.25em] bg-surface-2 px-[0.8em] py-[0.5em] text-ink ${show(2)}`}
              >
                Infonavit. Quiero mudarme en marzo.
              </p>
              <div className={`self-end ${show(2)}`}>
                <RoleChip role="agente" className="text-[0.85em]! px-[0.65em]! py-[0.22em]! gap-[0.35em]!">
                  Calificada · 3 de 3 preguntas
                </RoleChip>
              </div>
            </div>
          </div>

          {/* 2 · Tu equipo cierra (nota de relevo) */}
          <div className={`card p-[1em] ${panel(3)}`} style={{ borderRadius: "1em" }}>
            <div className="flex items-center justify-between gap-[0.5em]">
              <p className="font-display font-bold text-[0.95em] text-ink">Tu equipo cierra</p>
              <RoleChip role="equipo" className="text-[0.68em]! px-[0.65em]! py-[0.22em]! gap-[0.35em]!">
                Relevo a Luis
              </RoleChip>
            </div>
            <dl className="mt-[0.7em] grid grid-cols-[auto_1fr] gap-x-[0.8em] gap-y-[0.3em] text-[0.78em]">
              <dt className="text-muted">Quién</dt>
              <dd className="text-ink">Mariana R. · llegó por el anuncio de Narvarte</dd>
              <dt className="text-muted">Quiere</dt>
              <dd className="text-ink">Depa de 2 recámaras, mudanza en marzo</dd>
              <dt className="text-muted">Pago</dt>
              <dd className="text-ink">Crédito Infonavit</dd>
              <dt className="text-muted">Ya se le dijo</dt>
              <dd className="text-ink">Disponibilidad y ubicación</dd>
            </dl>
            <div className={`mt-[0.7em] ${show(3)}`}>
              <RoleChip role="equipo" className="text-[0.72em]! px-[0.65em]! py-[0.22em]! gap-[0.35em]!">
                Visita agendada · sábado 11:00
              </RoleChip>
            </div>
          </div>

          {/* 3 · Tú ves todo */}
          <div className={`card p-[1em] ${panel(4)}`} style={{ borderRadius: "1em" }}>
            <p className="font-display font-bold text-[0.95em] text-ink">Tú ves todo</p>
            <div className="mt-[0.7em] grid grid-cols-4 gap-[0.45em] text-center">
              {[
                { label: "Nuevos", n: 18, cls: "bg-surface-2 text-ink" },
                { label: "Calificados", n: 9, cls: "bg-lime-soft text-lime" },
                { label: "Con cita", n: 5, cls: "bg-sky-soft text-sky" },
                { label: "Ganados", n: 2, cls: "bg-success-soft text-success" },
              ].map((s) => (
                <div key={s.label} className={`rounded-[0.7em] px-[0.3em] py-[0.55em] ${s.cls} ${show(4)}`}>
                  <p className="font-mono font-semibold text-[1.15em] leading-none">{s.n}</p>
                  <p className="mt-[0.35em] text-[0.62em] font-semibold uppercase tracking-[0.06em]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Scene>
    </div>
  );
}
