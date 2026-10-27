import { Icon } from "@/components/icons";

/*
 * Piezas de las escenas de Soluciones fase 2. Viven DENTRO de <Scene>, así que todo se mide en em (escala
 * uniforme). No traen hooks: las escenas cliente las pintan según su `step`.
 * Regla: nada arranca en opacidad 0. Lo que «todavía no pasa» se ve atenuado (50 %), nunca vacío; en los chats,
 * la conversación anterior queda como historial (<Thread> del kit) y lo nuevo entra debajo.
 */

/** Clases de un elemento según si ya ocurrió en el paso actual. */
export function beat(on: boolean) {
  return `transition-[opacity,transform] duration-500 ease-out ${on ? "opacity-100 translate-y-0" : "opacity-50 translate-y-[0.35em]"}`;
}

/** Marco tipo ventana: encabezado con título, subtítulo y un chip a la derecha. */
export function SceneFrame({
  title,
  sub,
  right,
  children,
  icon = "chat",
}: {
  title: string;
  sub?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  icon?: string;
}) {
  return (
    <div className="rounded-[1.1em] border border-line bg-surface shadow-[var(--shadow)] overflow-hidden text-ink">
      <div className="flex items-center justify-between gap-[0.75em] border-b border-line bg-surface-2 px-[1em] py-[0.7em]">
        <div className="flex items-center gap-[0.6em] min-w-0">
          <span className="grid h-[2em] w-[2em] shrink-0 place-items-center rounded-full bg-ink text-paper">
            <Icon name={icon} className="h-[1em] w-[1em]" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[0.9em] font-semibold">{title}</p>
            {sub ? <p className="truncate text-[0.72em] text-muted">{sub}</p> : null}
          </div>
        </div>
        {right}
      </div>
      <div className="p-[1em]">{children}</div>
    </div>
  );
}

/** Chip en em (las de ui.tsx miden en rem y no escalarían con la escena). */
export function SceneChip({
  role,
  children,
  className = "",
}: {
  role: "agente" | "equipo" | "alerta" | "ganado" | "neutro";
  children: React.ReactNode;
  className?: string;
}) {
  const tone = {
    agente: "bg-lime-soft text-lime",
    equipo: "bg-sky-soft text-sky",
    alerta: "bg-coral-soft text-coral",
    ganado: "bg-success-soft text-success",
    neutro: "bg-surface-2 text-muted border border-line",
  }[role];
  return (
    <span
      className={`inline-flex items-center gap-[0.35em] whitespace-nowrap rounded-full px-[0.65em] py-[0.2em] text-[0.7em] font-semibold ${tone} ${className}`}
    >
      {children}
    </span>
  );
}

/** Globo de WhatsApp. from: «cliente» (izquierda) o «agente» (derecha, lima). */
export function Bubble({
  from,
  children,
  meta,
  on = true,
}: {
  from: "cliente" | "agente";
  children: React.ReactNode;
  meta?: string;
  on?: boolean;
}) {
  const agent = from === "agente";
  return (
    <div className={`flex ${agent ? "justify-end" : "justify-start"} ${beat(on)}`}>
      <div
        className={`max-w-[84%] rounded-[1em] px-[0.85em] py-[0.55em] text-[0.82em] leading-snug ${
          agent ? "rounded-tr-[0.3em] bg-lime-soft" : "rounded-tl-[0.3em] border border-line bg-surface"
        }`}
      >
        {agent ? (
          <p className="mono mb-[0.2em] text-[0.78em] uppercase tracking-[0.08em] text-lime">
            Agente de <span className="normal-case">root</span>
          </p>
        ) : null}
        <p>{children}</p>
        {meta ? <p className="mono mt-[0.25em] text-right text-[0.72em] text-muted">{meta}</p> : null}
      </div>
    </div>
  );
}

/** Fila de dato (ficha): etiqueta a la izquierda, valor a la derecha. */
export function FieldRow({ label, value, on = true }: { label: string; value: string; on?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-[0.75em] border-b border-line py-[0.4em] last:border-b-0">
      <span className="text-[0.75em] text-muted">{label}</span>
      <span className={`mono text-[0.78em] text-right transition-colors duration-500 ${on ? "text-ink" : "text-muted/60"}`}>
        {on ? value : "—"}
      </span>
    </div>
  );
}

/** Etiqueta «Datos de ejemplo» en em. */
export function SceneExample() {
  return <p className="mono mt-[0.8em] text-[0.68em] uppercase tracking-[0.1em] text-muted">● Datos de ejemplo</p>;
}
