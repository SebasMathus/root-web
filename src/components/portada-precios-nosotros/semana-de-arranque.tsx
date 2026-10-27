"use client";
import { Icon } from "@/components/icons";
import { useSceneLoop } from "@/components/motion/kit";

/*
 * D10 · Semana de arranque (plan §4). Cinco pasos del arranque con una barra que se llena.
 * Respaldo: la mayoría de los equipos opera en menos de una semana; el arranque incluye configuración, migración de
 * contactos e integración, y el trámite de la API va sin costo extra. Los días son un rango ilustrativo, nunca una
 * garantía (lo dice la etiqueta visible). Diagrama de texto: se reacomoda (cinco columnas en escritorio, lista en
 * móvil) en lugar de escalar, para que se lea a buen tamaño. El servidor pinta los cinco pasos completos.
 */

const STEPS = [
  { icon: "shield", days: "Día 1", title: "Trámite de la API oficial", text: "Te ayudamos con Meta para dar de alta tu número en la API de WhatsApp Business. Sin costo extra." },
  { icon: "bot", days: "Días 1–3", title: "Configuramos root", text: "Tus embudos y etapas. En Pro y Enterprise, también tu agente: tus preguntas, tus respuestas, tu tono." },
  { icon: "users", days: "Días 2–4", title: "Migramos tus contactos", text: "Tus contactos entran a root, listos para trabajarse desde el número de tu empresa." },
  { icon: "plug", days: "Días 3–5", title: "Conectamos tus sistemas", text: "Salesforce, SAP, HubSpot o Excel, según lo que uses y lo que incluya tu plan." },
  { icon: "send", days: "Días 5–7", title: "En vivo", text: "Tu equipo atiende desde root y, si tu plan trae IA, tu agente contesta el primer mensaje." },
];

/** 0–4: pasos completados hasta i · 5: todo completo (final). */
const DURATIONS = [800, 800, 800, 800, 800, 3600] as const;

export function SemanaDeArranque({ className = "" }: { className?: string }) {
  const { ref, step } = useSceneLoop<HTMLElement>(DURATIONS);
  const reached = step >= STEPS.length ? STEPS.length : step + 1;

  return (
    <figure ref={ref} className={`m-0 ${className}`}>
      <div aria-hidden="true" className="card p-6 md:p-8">
        <div className="hidden h-1.5 overflow-hidden rounded-full bg-line sm:block">
          <div className="h-full rounded-full bg-lime-fill transition-[width] duration-700 ease-out" style={{ width: `${(reached / STEPS.length) * 100}%` }} />
        </div>
        <ol className="grid gap-6 sm:mt-7 sm:grid-cols-5 sm:gap-5">
          {STEPS.map((s, i) => {
            const done = i < reached;
            return (
              <li key={s.title} className={`flex gap-4 transition-opacity duration-500 sm:flex-col sm:gap-3 ${done ? "" : "opacity-45"}`}>
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${done ? "bg-lime-fill text-fixed-ink" : "bg-surface-2 text-muted"}`}
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="mono block text-xs uppercase tracking-[0.08em] text-muted">
                    Paso {i + 1} · {s.days}
                  </span>
                  <span className="mt-1 block font-display text-[17px] font-bold leading-snug text-ink">{s.title}</span>
                  <span className="mt-1.5 block text-[15px] leading-relaxed text-muted">{s.text}</span>
                </span>
              </li>
            );
          })}
        </ol>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-5 text-sm">
          <span className="inline-flex items-center gap-2 font-semibold text-ink">
            <Icon name="clock" className="h-4 w-4 text-lime" />
            La mayoría de los equipos opera en menos de una semana.
          </span>
          <span className="mono text-xs uppercase tracking-[0.08em] text-muted">Días ilustrativos, no son una garantía</span>
        </div>
      </div>
      <figcaption className="sr-only">
        Semana de arranque en cinco pasos: 1, te ayudamos a tramitar la API oficial de WhatsApp Business sin costo extra; 2, configuramos tus
        embudos y, en los planes Pro y Enterprise, tu agente de IA; 3, migramos tus contactos; 4, conectamos tus sistemas, como Salesforce, SAP,
        HubSpot o Excel; 5, quedas en vivo. La mayoría de los equipos opera en menos de una semana; los días son ilustrativos y no son una garantía.
      </figcaption>
    </figure>
  );
}
