"use client";
import { motion } from "motion/react";
import { RootMarkAnimated } from "@/components/brand";
import { Icon, WhatsAppGlyph } from "@/components/icons";
import { useSceneLoop } from "@/components/motion/kit";
import { Canvas } from "./canvas";

/*
 * D5 · Mapa de conexiones, versión resumida para la portada (plan §4).
 * Arriba los canales con respaldo (API oficial de WhatsApp Business e Instagram), al centro root con sus tres capas
 * (bandeja, agentes y CRM) y abajo los sistemas que root ya nombra: Salesforce, HubSpot, SAP y Excel. Nombres en
 * texto, sin logos de terceros. Cada paso, un evento entra por un canal y sale como acción hacia un sistema.
 * Lo que está por confirmar (otros canales, Zoho, Google Sheets) no se dibuja. Lienzo vertical: se lee igual en
 * móvil y en la columna de escritorio. El servidor pinta todo conectado, con el último evento a la vista.
 */

const W = 420;
const H = 540;
const DURATIONS = [2400, 2400, 2400, 3200] as const;

const CHANNELS = [
  { id: "wa", label: "WhatsApp Business", sub: "API oficial", x: 115 },
  { id: "ig", label: "Instagram", sub: "Mensajes directos", x: 305 },
];
const SYSTEMS = [
  { id: "sf", label: "Salesforce", sub: "CRM", icon: "users", x: 60 },
  { id: "hs", label: "HubSpot", sub: "CRM", icon: "funnel", x: 160 },
  { id: "sap", label: "SAP", sub: "ERP", icon: "building", x: 260 },
  { id: "xl", label: "Excel", sub: "Reportes", icon: "file", x: 360 },
];
const EVENTS = [
  { from: 0, to: 0, event: "Nuevo prospecto", action: "Salesforce: crear lead" },
  { from: 1, to: 2, event: "Trato ganado", action: "SAP: crear pedido" },
  { from: 0, to: 1, event: "Cita confirmada", action: "HubSpot: actualizar etapa" },
  { from: 1, to: 3, event: "Reporte del día", action: "Excel: exportar" },
];

const CH_Y = 74; // borde inferior de los canales
const HUB_TOP = 150;
const HUB_BOTTOM = 300;
const SYS_TOP = 398;

type Pt = { x: number; y: number };
const cubic = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt => {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
};
function wire(from: Pt, to: Pt) {
  const midY = (from.y + to.y) / 2;
  const c1 = { x: from.x, y: midY };
  const c2 = { x: to.x, y: midY };
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= 20; i++) {
    const p = cubic(from, c1, c2, to, i / 20);
    xs.push(Math.round(p.x * 10) / 10);
    ys.push(Math.round(p.y * 10) / 10);
  }
  return { d: `M${from.x} ${from.y}C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`, xs, ys };
}

const IN_WIRES = CHANNELS.map((c) => wire({ x: c.x, y: CH_Y }, { x: W / 2, y: HUB_TOP }));
const OUT_WIRES = SYSTEMS.map((s) => wire({ x: W / 2, y: HUB_BOTTOM }, { x: s.x, y: SYS_TOP }));

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export function MapaDeConexiones() {
  const { ref, step, playing } = useSceneLoop<HTMLElement>(DURATIONS);
  const ev = EVENTS[step];

  return (
    <figure ref={ref} className="m-0">
      <Canvas base={W} aspect={`${W} / ${H}`} className="mx-auto max-w-[520px]">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none">
          {IN_WIRES.map((w, i) => (
            <path
              key={`in-${i}`}
              d={w.d}
              className={`transition-colors duration-500 ${ev.from === i ? "stroke-lime" : "stroke-line"}`}
              strokeWidth={ev.from === i ? 2.4 : 1.6}
              strokeLinecap="round"
            />
          ))}
          {OUT_WIRES.map((w, i) => (
            <path
              key={`out-${i}`}
              d={w.d}
              className={`transition-colors duration-500 ${ev.to === i ? "stroke-lime" : "stroke-line"}`}
              strokeWidth={ev.to === i ? 2.4 : 1.6}
              strokeDasharray={ev.to === i ? undefined : "2 5"}
              strokeLinecap="round"
            />
          ))}
          {playing ? (
            <>
              <motion.circle
                key={`pin-${step}`}
                r={5}
                className="fill-lime-fill stroke-ink"
                strokeWidth={1.5}
                initial={{ cx: IN_WIRES[ev.from].xs[0], cy: IN_WIRES[ev.from].ys[0] }}
                animate={{ cx: IN_WIRES[ev.from].xs, cy: IN_WIRES[ev.from].ys, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.8, ease: "linear", opacity: { duration: 0.8, times: [0, 0.1, 0.85, 1] } }}
              />
              <motion.circle
                key={`pout-${step}`}
                r={5}
                className="fill-lime-fill stroke-ink"
                strokeWidth={1.5}
                initial={{ cx: OUT_WIRES[ev.to].xs[0], cy: OUT_WIRES[ev.to].ys[0], opacity: 0 }}
                animate={{ cx: OUT_WIRES[ev.to].xs, cy: OUT_WIRES[ev.to].ys, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.9, delay: 0.9, ease: "linear", opacity: { duration: 0.9, delay: 0.9, times: [0, 0.1, 0.85, 1] } }}
              />
            </>
          ) : null}
        </svg>

        {/* Canales */}
        {CHANNELS.map((c, i) => (
          <div
            key={c.id}
            className={`absolute flex w-[10.4em] -translate-x-1/2 items-center gap-[0.5em] rounded-[0.8em] border bg-surface px-[0.6em] py-[0.5em] transition-colors duration-500 ${
              ev.from === i ? "border-lime" : "border-line"
            }`}
            style={{ left: pct(c.x, W), top: pct(CH_Y - 50, H) }}
          >
            <span className="grid size-[1.9em] shrink-0 place-items-center rounded-[0.55em] bg-ink text-paper">
              {c.id === "wa" ? <WhatsAppGlyph className="h-[1.05em] w-[1.05em]" /> : <Icon name="instagram" className="h-[1.05em] w-[1.05em]" />}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.72em] font-bold leading-tight text-ink">{c.label}</span>
              <span className="block truncate text-[0.6em] text-muted">{c.sub}</span>
            </span>
          </div>
        ))}

        {/* root al centro */}
        <div
          className="absolute flex w-[15em] -translate-x-1/2 flex-col items-center rounded-[1.2em] border border-line bg-surface px-[0.8em] py-[0.8em] shadow-[var(--shadow)]"
          style={{ left: "50%", top: pct(HUB_TOP, H), height: `${((HUB_BOTTOM - HUB_TOP) / 16).toFixed(3)}em` }}
        >
          <RootMarkAnimated className="h-[3em] w-[3em]" />
          <div className="mt-[0.6em] flex flex-wrap justify-center gap-[0.35em] text-[0.62em] font-semibold">
            <span className="rounded-full border border-line px-[0.7em] py-[0.15em] text-ink">Bandeja</span>
            <span className="rounded-full bg-lime-soft px-[0.7em] py-[0.15em] text-lime">Agentes</span>
            <span className="rounded-full border border-line px-[0.7em] py-[0.15em] text-ink">CRM</span>
          </div>
          <p className="mono mt-auto text-[0.58em] text-muted">Evento → acción</p>
        </div>

        {/* Sistemas */}
        {SYSTEMS.map((s, i) => (
          <div
            key={s.id}
            className={`absolute flex w-[5.6em] -translate-x-1/2 flex-col items-center rounded-[0.8em] border bg-surface px-[0.3em] py-[0.5em] text-center transition-[border-color,box-shadow] duration-500 ${
              ev.to === i ? "border-lime shadow-[0_0_0_0.22em_var(--lime-soft)]" : "border-line"
            }`}
            style={{ left: pct(s.x, W), top: pct(SYS_TOP, H), transitionDelay: ev.to === i && playing ? "1.6s" : "0s" }}
          >
            <Icon name={s.icon} className="h-[1.1em] w-[1.1em] text-muted" />
            <span className="mt-[0.25em] text-[0.7em] font-bold leading-tight text-ink">{s.label}</span>
            <span className="text-[0.56em] text-muted">{s.sub}</span>
          </div>
        ))}

        {/* Evento en curso */}
        <div className="absolute left-1/2 flex w-[22em] -translate-x-1/2 items-center justify-center gap-[0.45em] rounded-full bg-ink px-[0.9em] py-[0.45em] text-paper" style={{ top: pct(H - 52, H) }}>
          <Icon name="bolt" className="h-[0.95em] w-[0.95em] shrink-0 text-lime-fill" />
          <span className="truncate text-[0.68em]">
            <span className="font-semibold">{ev.event}</span> → {ev.action}
          </span>
        </div>
      </Canvas>
      <figcaption className="sr-only">
        Mapa de conexiones de root: los mensajes entran por la API oficial de WhatsApp Business y por Instagram; root los atiende con su bandeja,
        sus agentes y su CRM, y cuando pasa algo importante dispara una acción en tus sistemas. Ejemplos: un nuevo prospecto crea un lead en
        Salesforce, un trato ganado crea un pedido en SAP, una cita confirmada actualiza la etapa en HubSpot y el reporte del día se exporta a Excel.
      </figcaption>
    </figure>
  );
}
