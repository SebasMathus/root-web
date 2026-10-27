"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { useSceneLoop } from "@/components/motion/kit";
import { INFINITY_PATH } from "@/components/brand";
import { DualScene } from "./scene-frame";
import { SYSTEMS, type SystemId } from "./integrations-data";

/*
 * D5 · Mapa de conexiones (plan §4). Canales a la izquierda (API oficial de WhatsApp Business e Instagram), root al
 * centro con sus tres capas (Bandeja · Agentes · CRM) y, a la derecha, los sistemas: Salesforce, HubSpot, SAP y
 * Excel. Cada sistema lleva su evento → acción. El bucle enciende un flujo a la vez (raya que avanza, solo mientras
 * está en pantalla); los botones reales de abajo fijan un sistema y muestran sus Acciones conectadas en texto.
 * Reposo = todos los flujos dibujados con su etiqueta. Nombres en texto, sin logotipos de terceros.
 */

const CHANNELS = ["WhatsApp Business API", "Instagram"];

const CAPTION =
  "Mapa de conexiones de root. A la izquierda, los canales: la API oficial de WhatsApp Business e Instagram. Al centro, root con tres capas: bandeja, agentes y CRM. " +
  "A la derecha, los sistemas con un ejemplo de acción conectada cada uno: en Salesforce, un nuevo prospecto crea un lead; en HubSpot, una cita confirmada actualiza la etapa; " +
  "en SAP, un trato ganado crea el pedido; en Excel, el corte diario exporta los tratos.";

const FONT = { fontFamily: "var(--font-sans)" };

/** Sistemas con su índice, el activo al final (se pinta encima de los demás flujos). */
const activeLast = (active: SystemId | null) =>
  SYSTEMS.map((s, i) => ({ s, i })).sort((a, b) => Number(a.s.id === active) - Number(b.s.id === active));

function Center({ cx, cy, rings }: { cx: number; cy: number; rings: [number, number, number] }) {
  const labels = ["Bandeja", "Agentes", "CRM"];
  const s = 0.34;
  return (
    <g>
      {rings
        .map((r, i) => ({ r, i }))
        .reverse()
        .map(({ r, i }) => (
          <g key={r}>
            <circle cx={cx} cy={cy} r={r} className={i === 1 ? "fill-lime-soft stroke-lime" : "fill-surface stroke-line"} strokeWidth={1.5} />
            <text x={cx} y={cy - r + 15} textAnchor="middle" className="fill-muted" style={{ ...FONT, fontSize: 10.5, fontWeight: 600, letterSpacing: 0.6 }}>
              {labels[i].toUpperCase()}
            </text>
          </g>
        ))}
      <g transform={`translate(${cx - 165.5 * s} ${cy + 6 - 74 * s}) scale(${s})`}>
        <path d={INFINITY_PATH} fill="none" className="stroke-ink" strokeWidth={25} strokeLinejoin="round" />
      </g>
    </g>
  );
}

function Flow({ d, active, playing }: { d: string; active: boolean; playing: boolean }) {
  return (
    <>
      <path d={d} fill="none" className={active ? "stroke-lime" : "stroke-line"} strokeWidth={active ? 3 : 2} style={{ transition: "stroke .4s" }} />
      {active && playing ? (
        <motion.path
          d={d}
          fill="none"
          className="stroke-ink"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="2 12"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -56 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
    </>
  );
}

function SystemBox({ x, y, w, h, sys, active, dim }: { x: number; y: number; w: number; h: number; sys: (typeof SYSTEMS)[number]; active: boolean; dim: boolean }) {
  return (
    <g style={{ opacity: dim ? 0.45 : 1, transition: "opacity .4s" }}>
      <rect x={x} y={y} width={w} height={h} rx={12} className={active ? "fill-lime-soft stroke-lime" : "fill-surface stroke-line"} strokeWidth={1.5} />
      <text x={x + 14} y={y + 22} className="fill-ink" style={{ ...FONT, fontSize: 14, fontWeight: 700 }}>
        {sys.name}
        <tspan className="fill-muted" style={{ fontSize: 10.5, fontWeight: 500 }} dx={6}>
          {sys.kind}
        </tspan>
      </text>
      <text x={x + 14} y={y + 41} className={active ? "fill-lime" : "fill-muted"} style={{ ...FONT, fontSize: 11, fontWeight: 600 }}>
        {sys.event}
      </text>
    </g>
  );
}

function ChannelBox({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} className="fill-surface stroke-line" strokeWidth={1.5} />
      <text x={x + w / 2} y={y + h / 2 + 4.5} textAnchor="middle" className="fill-ink" style={{ ...FONT, fontSize: 13, fontWeight: 600 }}>
        {label}
      </text>
    </g>
  );
}

function Wide({ active, focus, playing }: { active: SystemId | null; focus: SystemId | null; playing: boolean }) {
  const cx = 440;
  const cy = 220;
  const sysX = 648;
  const sysW = 222;
  return (
    <svg viewBox="0 0 880 440" className="w-full h-auto block">
      {CHANNELS.map((c, i) => {
        const y = 130 + i * 124;
        return <path key={c} d={`M200 ${y + 28} C 290 ${y + 28}, 290 ${cy}, ${cx - 104} ${cy}`} fill="none" className="stroke-lime" strokeWidth={2} />;
      })}
      {activeLast(active).map(({ s, i }) => {
        const y = 30 + i * 100;
        return <Flow key={s.id} d={`M${cx + 104} ${cy} C 600 ${cy}, 590 ${y + 28}, ${sysX} ${y + 28}`} active={active === s.id} playing={playing} />;
      })}
      {CHANNELS.map((c, i) => (
        <ChannelBox key={c} x={15} y={130 + i * 124} w={185} h={56} label={c} />
      ))}
      <Center cx={cx} cy={cy} rings={[46, 75, 104]} />
      {SYSTEMS.map((s, i) => (
        <SystemBox key={s.id} x={sysX} y={30 + i * 100} w={sysW} h={56} sys={s} active={active === s.id} dim={!!focus && focus !== s.id} />
      ))}
    </svg>
  );
}

function Narrow({ active, focus, playing }: { active: SystemId | null; focus: SystemId | null; playing: boolean }) {
  const cx = 180;
  const cy = 236;
  return (
    <svg viewBox="0 0 360 612" className="w-full h-auto block">
      {CHANNELS.map((c, i) => {
        const x = 12 + i * 174 + 81;
        return <path key={c} d={`M${x} 68 C ${x} 110, ${cx} 100, ${cx} ${cy - 86}`} fill="none" className="stroke-lime" strokeWidth={2} />;
      })}
      {activeLast(active).map(({ s, i }) => {
        const y = 368 + i * 60;
        return <Flow key={s.id} d={`M${cx} ${cy + 86} C ${cx} 346, 18 334, 18 358 L 18 ${y + 26} L 34 ${y + 26}`} active={active === s.id} playing={playing} />;
      })}
      {CHANNELS.map((c, i) => (
        <ChannelBox key={c} x={12 + i * 174} y={16} w={162} h={52} label={c === "WhatsApp Business API" ? "WhatsApp API" : c} />
      ))}
      <Center cx={cx} cy={cy} rings={[38, 62, 86]} />
      {SYSTEMS.map((s, i) => (
        <SystemBox key={s.id} x={34} y={368 + i * 60} w={314} h={52} sys={s} active={active === s.id} dim={!!focus && focus !== s.id} />
      ))}
    </svg>
  );
}

export function ConexionesScene() {
  const [focus, setFocus] = useState<SystemId | null>(null);
  // 0–3: un flujo a la vez · 4: todos (reposo)
  const { ref, step, playing } = useSceneLoop<HTMLDivElement>([2200, 2200, 2200, 2200, 3500]);
  const looped = step < 4 ? SYSTEMS[step].id : null;
  const active = focus ?? looped;
  const shown = focus ? SYSTEMS.filter((s) => s.id === focus) : SYSTEMS;

  return (
    <div className="grid gap-8">
      <div ref={ref} className="min-w-0">
        <DualScene caption={CAPTION} wideBase={880} narrowBase={360} wide={<Wide active={active} focus={focus} playing={playing} />} narrow={<Narrow active={active} focus={focus} playing={playing} />} />
      </div>
      <div className="card p-6 md:p-8 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div>
          <p className="kicker">Acciones conectadas</p>
          <div role="group" aria-label="Elige un sistema" className="mt-4 flex flex-wrap gap-2">
            <button type="button" aria-pressed={focus === null} onClick={() => setFocus(null)} className={`chip cursor-pointer ${focus === null ? "chip-agente" : "hover:border-ink"}`}>
              Todos
            </button>
            {SYSTEMS.map((s) => (
              <button key={s.id} type="button" aria-pressed={focus === s.id} onClick={() => setFocus(s.id)} className={`chip cursor-pointer ${focus === s.id ? "chip-agente" : "hover:border-ink"}`}>
                {s.name}
              </button>
            ))}
          </div>
        </div>
        <ul className="flex flex-col gap-4">
          {shown.flatMap((s) =>
            (focus ? s.examples : s.examples.slice(0, 1)).map(([when, then]) => (
              <li key={`${s.id}-${when}`} className="text-[15px] leading-snug">
                <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted">{s.name}</span>
                <span className="text-ink">
                  Cuando {when.charAt(0).toLowerCase() + when.slice(1)}, <span className="font-semibold">{then}</span>.
                </span>
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
}
