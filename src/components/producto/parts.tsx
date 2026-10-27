import type { Role } from "@/components/ui";

/*
 * Piezas de interfaz para las escenas de producto (equipo «producto»). Todo se mide en em: dentro de <Scene> o
 * <DualScene> el font-size sale del ancho del contenedor, así que estas piezas escalan parejo.
 * Sin hooks: sirven igual en componentes de servidor y de cliente.
 * Código de color fijo: agente = lima, equipo = cielo, alerta = coral, ganado = verde.
 */

export const ROLE_SOFT: Record<Role, string> = {
  agente: "bg-lime-soft text-lime",
  equipo: "bg-sky-soft text-sky",
  alerta: "bg-coral-soft text-coral",
  ganado: "bg-success-soft text-success",
};

export const ROLE_BORDER: Record<Role, string> = {
  agente: "border-lime",
  equipo: "border-sky",
  alerta: "border-coral",
  ganado: "border-success",
};

/** Clases de aparición dentro de un bucle: en el servidor y en reposo `on` es true (nunca arranca vacío). */
export const appear = (on: boolean) =>
  `transition-[opacity,transform] duration-500 ease-out ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[0.5em]"}`;

/** Avatar redondo con iniciales. */
export function Avatar({ initials, role = "equipo", className = "" }: { initials: string; role?: Role; className?: string }) {
  return (
    <span className={`inline-grid place-items-center rounded-full w-[2.1em] h-[2.1em] text-[0.72em] font-bold shrink-0 ${ROLE_SOFT[role]} ${className}`}>
      {initials}
    </span>
  );
}

/** Chip pequeño dentro de una escena (en em). */
export function SceneChip({ role, children, className = "" }: { role?: Role; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-[0.35em] rounded-full px-[0.65em] py-[0.2em] text-[0.68em] font-semibold leading-tight whitespace-nowrap ${
        role ? ROLE_SOFT[role] : "bg-surface-2 text-muted border border-line"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/** Globo de conversación. tone "in" = prospecto; "agente" = tu agente de root; "equipo" = tu vendedor. */
export function Bubble({
  tone = "in",
  children,
  time,
  className = "",
}: {
  tone?: "in" | "agente" | "equipo";
  children: React.ReactNode;
  time?: string;
  className?: string;
}) {
  const side = tone === "in" ? "self-start rounded-bl-[0.25em] bg-surface border border-line" : "self-end rounded-br-[0.25em]";
  const fill = tone === "agente" ? "bg-lime-soft" : tone === "equipo" ? "bg-sky-soft" : "";
  return (
    <div className={`max-w-[84%] rounded-[0.9em] px-[0.8em] py-[0.5em] ${side} ${fill} ${className}`}>
      {tone !== "in" ? (
        <p className={`text-[0.62em] font-bold uppercase tracking-[0.08em] ${tone === "agente" ? "text-lime" : "text-sky"}`}>{tone === "agente" ? <>Agente de <span className="normal-case">root</span></> : "Tu equipo"}</p>
      ) : null}
      <p className="text-[0.82em] leading-snug text-ink">{children}</p>
      {time ? <p className="mono text-[0.58em] text-muted text-right mt-[0.2em]">{time}</p> : null}
    </div>
  );
}

/** Panel tipo ventana de la app (tarjeta con sombra), en em. */
export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[1em] border border-line bg-surface shadow-[var(--shadow)] ${className}`}>{children}</div>;
}

/** Encabezado de chat de WhatsApp de una empresa ficticia. */
export function ChatHeader({ name, status = "en línea", right }: { name: string; status?: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[0.6em] px-[0.9em] py-[0.65em] border-b border-line">
      <span className="inline-grid place-items-center w-[2em] h-[2em] rounded-full bg-ink text-paper text-[0.8em] font-bold shrink-0">A</span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.8em] font-semibold text-ink truncate">{name}</p>
        <p className="text-[0.62em] text-success">{status}</p>
      </div>
      {right}
    </div>
  );
}
