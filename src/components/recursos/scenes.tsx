"use client";
import { ExampleTag, keepRootCase } from "@/components/ui";
import { Scene, useSceneLoop } from "@/components/motion/kit";

/*
 * Escenas de las guías de Recursos (DESIGN.md › Escenas). Todas:
 * - renderizan en el servidor el estado FINAL (paso `rest`, el último);
 * - sostienen ese estado ≥ 2.5 s al entrar y pausan fuera de pantalla (useSceneLoop);
 * - con movimiento reducido se quedan en el estado final;
 * - miden todo en em dentro de <Scene> (escala uniforme) y no usan opacidad 0: lo que «aún no llega» se atenúa.
 * Nombres, horas y montos son de ejemplo (ExampleTag visible).
 */

const PENDING = "opacity-30 translate-y-[0.4em]";
const SHOWN = "opacity-100 translate-y-0";
const fade = "transition-[opacity,transform] duration-500";

/* ───────────── WhatsApp Business App vs API ───────────── */

const CHATS = [
  { name: "Mariana L.", text: "¿Sigue disponible el depa de Narvarte?", time: "21:14", app: "ok", api: { role: "agente", label: "Agente · respondió" } },
  { name: "Jorge P.", text: "Busco rentar en Del Valle", time: "21:37", app: "ok", api: { role: "agente", label: "Agente · calificó" } },
  { name: "Sofía M.", text: "¿Aceptan crédito Infonavit?", time: "22:05", app: "late", api: { role: "equipo", label: "Relevo · Paola V." } },
  { name: "Luis G.", text: "¿Puedo verlo el sábado?", time: "23:48", app: "late", api: { role: "agente", label: "Agente · respondió" } },
  { name: "Ana C.", text: "¿De cuánto es el enganche?", time: "00:12", app: "late", api: { role: "equipo", label: "Relevo · Andrés R." } },
] as const;

const ROLE_CHIP: Record<string, string> = {
  agente: "bg-lime-soft text-lime",
  equipo: "bg-sky-soft text-sky",
  alerta: "bg-coral-soft text-coral",
};

export function AppVsApiScene() {
  // Pasos 0–3: van llegando los mensajes; paso 4 (rest): los cinco, con su estado.
  const { ref, step } = useSceneLoop<HTMLDivElement>([1000, 1000, 1000, 1000, 4200]);
  const arrived = step + 1;

  return (
    <div ref={ref}>
      <Scene
        reveal={false}
        baseWidth={520}
        caption="Comparación de ejemplo. Con WhatsApp Business App, cinco mensajes que llegan de noche caen en el celular de un solo vendedor: contesta dos y tres se quedan sin respuesta. Con la API oficial y root, los mismos cinco mensajes llegan al número de la empresa: el agente de IA responde y califica tres, y pasa dos a Paola y Andrés con el historial."
      >
        <div className="card shadow-[var(--shadow)] p-[1em] grid grid-cols-2 gap-[0.9em]">
          {/* App */}
          <div className="min-w-0">
            <p className="font-display font-bold text-ink text-[0.95em] leading-tight">WhatsApp Business App</p>
            <p className="text-muted text-[0.72em] mt-[0.2em]">Un celular · una persona contesta</p>
            <div className="mt-[0.8em] rounded-[1.1em] border-[0.18em] border-ink/80 bg-surface-2 p-[0.5em]">
              <p className="mono text-[0.62em] text-muted px-[0.3em] pb-[0.4em]">Celular de Andrés</p>
              <ul className="grid gap-[0.35em]">
                {CHATS.map((c, i) => (
                  <li key={c.name} className={`${fade} ${i < arrived ? SHOWN : PENDING} rounded-[0.6em] bg-surface border border-line p-[0.45em]`}>
                    <div className="flex items-center justify-between gap-[0.4em]">
                      <span className="font-semibold text-ink text-[0.72em] truncate">{c.name}</span>
                      <span className="mono text-[0.6em] text-muted">{c.time}</span>
                    </div>
                    <p className="text-[0.66em] text-muted truncate">{c.text}</p>
                    <span
                      className={`mt-[0.3em] inline-block rounded-full px-[0.55em] py-[0.1em] text-[0.58em] font-semibold ${c.app === "ok" ? "bg-surface-2 text-muted" : ROLE_CHIP.alerta}`}
                    >
                      {c.app === "ok" ? "Respondió Andrés" : "Sin responder"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* API con root */}
          <div className="min-w-0">
            <p className="font-display font-bold text-ink text-[0.95em] leading-tight">API oficial con root</p>
            <p className="text-muted text-[0.72em] mt-[0.2em]">Un número · todo tu equipo</p>
            <div className="mt-[0.8em] rounded-[1.1em] border border-line bg-surface p-[0.5em]">
              <p className="mono text-[0.62em] text-muted px-[0.3em] pb-[0.4em] flex items-center gap-[0.4em]">
                <span className="inline-block w-[0.55em] h-[0.55em] rounded-full bg-lime-fill" />
                +52 55 … · Tu empresa
              </p>
              <ul className="grid gap-[0.35em]">
                {CHATS.map((c, i) => (
                  <li key={c.name} className={`${fade} ${i < arrived ? SHOWN : PENDING} rounded-[0.6em] bg-surface-2 border border-line p-[0.45em]`}>
                    <div className="flex items-center justify-between gap-[0.4em]">
                      <span className="font-semibold text-ink text-[0.72em] truncate">{c.name}</span>
                      <span className="mono text-[0.6em] text-muted">{c.time}</span>
                    </div>
                    <p className="text-[0.66em] text-muted truncate">{c.text}</p>
                    <span className={`mt-[0.3em] inline-block rounded-full px-[0.55em] py-[0.1em] text-[0.58em] font-semibold ${ROLE_CHIP[c.api.role]}`}>{c.api.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Scene>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <ExampleTag />
        <span className="text-xs text-muted">Lima: agente · Cielo: tu equipo · Coral: sin respuesta</span>
      </div>
    </div>
  );
}

/* ───────────── Chatbot vs agente de IA vs CRM ───────────── */

const ROWS = [
  {
    key: "bot",
    title: "Bot de menús",
    reply: "Hola. Escribe 1 para ventas, 2 para rentas o 3 para hablar con un asesor.",
    chip: { tone: "alerta", label: "La pregunta sigue sin respuesta" },
  },
  {
    key: "crm",
    title: "CRM sin IA",
    reply: "Tarjeta nueva en «Nuevo» · sin asignar · llegó a las 21:42",
    chip: { tone: "alerta", label: "Espera a que alguien la vea mañana" },
  },
  {
    key: "root",
    title: "Agente de root, dentro del CRM",
    reply: "¡Hola! Sí sigue disponible y aceptamos crédito Infonavit. ¿Lo buscas para vivir o para invertir?",
    chip: { tone: "agente", label: "Pago: Infonavit · Zona: Narvarte" },
    extra: { tone: "equipo", label: "Relevo a Paola V. con el historial" },
  },
] as const;

export function ChatbotAgentCrmScene() {
  // 0: llega el mensaje · 1: bot · 2: CRM · 3: agente · 4 (rest): todo, con el relevo.
  const { ref, step } = useSceneLoop<HTMLDivElement>([1300, 1300, 1300, 1500, 4200]);
  const shown = (i: number) => step >= i + 1;

  return (
    <div ref={ref}>
      <Scene
        reveal={false}
        baseWidth={440}
        caption="Ejemplo con un mismo mensaje a las 21:42: «Hola, ¿sigue disponible el depa de Narvarte? ¿Aceptan Infonavit?». El bot de menús contesta con opciones numeradas y la pregunta queda sin respuesta. El CRM sin IA crea una tarjeta sin asignar que espera al día siguiente. El agente de root contesta la pregunta, anota zona y forma de pago en la ficha y pasa la conversación a Paola con el historial."
      >
        <div className="card shadow-[var(--shadow)] p-[1em]">
          <div className="flex items-start gap-[0.6em]">
            <span className="w-[2em] h-[2em] shrink-0 rounded-full bg-surface-2 border border-line grid place-items-center text-[0.8em] font-semibold text-ink">MR</span>
            <div className="min-w-0">
              <p className="text-[0.7em] text-muted">
                Mariano R. · <span className="mono">21:42</span>
              </p>
              <p className="mt-[0.25em] rounded-[0.8em] rounded-tl-[0.2em] bg-surface-2 border border-line px-[0.75em] py-[0.5em] text-[0.85em] text-ink leading-snug">
                Hola, ¿sigue disponible el depa de Narvarte? ¿Aceptan Infonavit?
              </p>
            </div>
          </div>

          <ul className="mt-[0.9em] grid gap-[0.6em]">
            {ROWS.map((r, i) => (
              <li
                key={r.key}
                className={`${fade} ${shown(i) ? SHOWN : PENDING} rounded-[0.8em] border p-[0.7em] ${r.key === "root" ? "border-lime bg-lime-soft/40" : "border-line bg-surface"}`}
              >
                <p className="kicker text-[0.6em]!">{keepRootCase(r.title)}</p>
                <p className="mt-[0.35em] text-[0.8em] text-ink leading-snug">{r.reply}</p>
                <div className="mt-[0.45em] flex flex-wrap gap-[0.35em]">
                  <span className={`rounded-full px-[0.6em] py-[0.15em] text-[0.62em] font-semibold ${ROLE_CHIP[r.chip.tone]}`}>{r.chip.label}</span>
                  {"extra" in r ? (
                    <span className={`${fade} ${step >= 4 ? SHOWN : PENDING} rounded-full px-[0.6em] py-[0.15em] text-[0.62em] font-semibold ${ROLE_CHIP[r.extra.tone]}`}>
                      {r.extra.label}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Scene>
      <div className="mt-3">
        <ExampleTag />
      </div>
    </div>
  );
}

/* ───────────── Ventana de atención de 24 h (estático) ───────────── */

export function ServiceWindowDiagram() {
  return (
    <div>
      <Scene
        baseWidth={560}
        caption="Diagrama de la ventana de atención de WhatsApp. Cuando tu cliente te escribe se abre una ventana de 24 horas en la que puedes contestar con mensajes libres, llamados de servicio; cada mensaje nuevo del cliente la reinicia. Cuando la ventana se cierra, para volver a escribirle necesitas una plantilla aprobada por Meta de marketing, utilidad o autenticación, que se cobra por mensaje entregado."
      >
        <div className="card p-[1.1em]">
          <div className="grid grid-cols-[2.6fr_1fr] mono text-[0.7em] text-muted">
            <span className="flex justify-between pr-[0.2em]">
              <span>0 h</span>
              <span>24 h</span>
            </span>
            <span className="text-right">después</span>
          </div>
          <div className="mt-[0.4em] flex h-[2.4em] rounded-[0.7em] overflow-hidden border border-line">
            <div className="flex-[2.6] bg-lime-soft flex items-center px-[0.8em]">
              <span className="text-[0.78em] font-semibold text-lime">Ventana de atención abierta</span>
            </div>
            <div className="flex-1 bg-surface-2 flex items-center px-[0.8em] border-l border-dashed border-ink/30">
              <span className="text-[0.78em] font-semibold text-muted">Ventana cerrada</span>
            </div>
          </div>
          <div className="mt-[0.9em] grid grid-cols-[2.6fr_1fr] gap-[0.8em]">
            <div className="grid grid-cols-2 gap-[0.6em]">
              <div className="rounded-[0.7em] border border-line bg-surface-2 p-[0.6em]">
                <p className="mono text-[0.62em] text-muted">Abre la ventana</p>
                <p className="text-[0.76em] text-ink leading-snug mt-[0.2em]">Tu cliente te escribe o te llama</p>
              </div>
              <div className="rounded-[0.7em] border border-lime/50 bg-surface p-[0.6em]">
                <p className="mono text-[0.62em] text-lime">Dentro</p>
                <p className="text-[0.76em] text-ink leading-snug mt-[0.2em]">Contestas con mensajes libres (servicio)</p>
              </div>
            </div>
            <div className="rounded-[0.7em] border border-line bg-surface p-[0.6em]">
              <p className="mono text-[0.62em] text-muted">Fuera</p>
              <p className="text-[0.76em] text-ink leading-snug mt-[0.2em]">Solo con plantilla aprobada</p>
            </div>
          </div>
          <p className="mt-[0.9em] text-[0.72em] text-muted leading-snug">
            Cada mensaje nuevo de tu cliente reinicia las 24 horas. Las plantillas (marketing, utilidad o autenticación) se pueden mandar en cualquier momento y se cobran por mensaje entregado.
          </p>
        </div>
      </Scene>
    </div>
  );
}
