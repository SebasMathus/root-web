"use client";
import { useState } from "react";
import { Scene, useSceneLoop } from "@/components/motion/kit";
import { Icon, WhatsAppGlyph } from "@/components/icons";
import { appear, Avatar, Panel, SceneChip } from "./parts";

/*
 * D3 · La cartera es tuya (Línea de empresa; plan §4). Interruptor «Antes / Con root» (botones reales fuera del
 * lienzo). Antes: tres celulares personales; Toño se va y sus 23 chats se van con él. Con root: un solo número de
 * empresa y la bandeja compartida; Toño se va y sus 23 conversaciones se quedan y pasan a Paola.
 * Reposo de cada modo = el desenlace completo. Datos de ejemplo.
 */

const SELLERS = [
  { initials: "AN", name: "Andrés", chats: 31 },
  { initials: "PA", name: "Paola", chats: 27 },
  { initials: "TO", name: "Toño", chats: 23 },
];

function Before({ s }: { s: number }) {
  const gone = s >= 1;
  return (
    <div className="grid grid-cols-3 gap-[0.8em]">
      {SELLERS.map((p) => {
        const leaving = p.name === "Toño" && gone;
        return (
          <div key={p.name} className="flex flex-col items-center gap-[0.5em]">
            <div
              className={`w-full rounded-[1.3em] border-[0.15em] p-[0.5em] pt-[0.9em] bg-surface transition-all duration-700 ${
                leaving ? "border-dashed border-coral opacity-35 -translate-y-[0.3em]" : "border-ink/70"
              }`}
            >
              <span className="block mx-auto w-[2.2em] h-[0.3em] rounded-full bg-line mb-[0.6em]" />
              <p className="flex items-center gap-[0.3em] text-[0.66em] text-muted justify-center">
                <WhatsAppGlyph className="w-[1em] h-[1em]" /> WhatsApp personal
              </p>
              <div className="mt-[0.5em] flex flex-col gap-[0.3em]">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="block h-[0.9em] rounded-[0.3em] bg-surface-2" />
                ))}
              </div>
              <p className="mono text-center text-[0.7em] text-ink mt-[0.5em]">{p.chats} chats</p>
            </div>
            <p className="flex items-center gap-[0.35em]">
              <Avatar initials={p.initials} role="equipo" />
              <span className="text-[0.74em] font-semibold text-ink">{p.name}</span>
            </p>
          </div>
        );
      })}
      <div className={`col-span-3 rounded-[0.7em] bg-coral-soft text-coral p-[0.6em] text-center ${appear(gone)}`}>
        <p className="text-[0.76em] font-semibold">Toño dejó la empresa · 23 prospectos perdidos</p>
      </div>
    </div>
  );
}

function WithRoot({ s }: { s: number }) {
  const gone = s >= 1;
  const moved = s >= 2;
  return (
    <div className="flex flex-col items-center gap-[0.8em]">
      <div className="rounded-full bg-ink text-paper px-[1em] py-[0.45em] flex items-center gap-[0.45em]">
        <WhatsAppGlyph className="w-[1em] h-[1em]" />
        <span className="mono text-[0.72em]">+52 55 … · Tu empresa</span>
      </div>
      <span className="w-[0.12em] h-[1.2em] bg-ink/40" />
      <Panel className="w-full p-[0.8em]">
        <p className="text-[0.62em] font-bold uppercase tracking-[0.1em] text-muted text-center">Bandeja compartida · 81 conversaciones</p>
        <div className="mt-[0.7em] grid grid-cols-3 gap-[0.6em]">
          {SELLERS.map((p) => {
            const leaving = p.name === "Toño" && gone;
            const chats = p.name === "Paola" && moved ? 50 : p.name === "Toño" && moved ? 0 : p.chats;
            return (
              <div
                key={p.name}
                className={`rounded-[0.7em] p-[0.55em] flex flex-col items-center gap-[0.3em] transition-all duration-700 ${
                  leaving ? "border-[0.1em] border-dashed border-line opacity-45" : "bg-sky-soft"
                }`}
              >
                <Avatar initials={p.initials} role="equipo" className="ring-[0.15em] ring-surface" />
                <span className="text-[0.7em] font-semibold text-ink">{leaving ? `${p.name} se fue` : p.name}</span>
                <span className="mono text-[0.66em] text-muted">{chats} conversaciones</span>
              </div>
            );
          })}
        </div>
      </Panel>
      <div className={`w-full rounded-[0.7em] bg-success-soft text-success p-[0.6em] text-center ${appear(moved)}`}>
        <p className="text-[0.76em] font-semibold flex items-center justify-center gap-[0.4em]">
          <Icon name="check" className="w-[1em] h-[1em]" strokeWidth={2.6} />
          23 conversaciones reasignadas a Paola, con su historial
        </p>
      </div>
    </div>
  );
}

export function LineaEmpresaScene() {
  const [mode, setMode] = useState<"antes" | "root">("root");
  // 0 equipo completo · 1 Toño se va · 2 desenlace (reposo)
  const { ref, step } = useSceneLoop<HTMLDivElement>([1600, 1700, 4200]);
  const caption =
    mode === "antes"
      ? "Antes: tres vendedores, Andrés, Paola y Toño, atienden desde su WhatsApp personal con 31, 27 y 23 chats. Toño deja la empresa y sus 23 prospectos se van con él."
      : "Con root: todas las conversaciones pasan por el número de tu empresa y viven en la bandeja compartida. Toño deja la empresa y sus 23 conversaciones se quedan: se reasignan a Paola con su historial.";
  return (
    <div ref={ref}>
      <div role="group" aria-label="Compara la cartera antes y con root" className="mb-5 inline-flex rounded-full border border-line bg-surface p-1">
        {(
          [
            ["antes", "Antes"],
            ["root", "Con root"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={mode === key}
            onClick={() => setMode(key)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors cursor-pointer ${mode === key ? (key === "root" ? "bg-lime-fill text-fixed-ink" : "bg-coral-soft text-coral") : "text-muted hover:text-ink"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <Scene caption={caption} baseWidth={420}>
        <div className="flex items-center justify-between mb-[0.8em]">
          <SceneChip role={mode === "root" ? "agente" : "alerta"}>{mode === "root" ? "Con root: la cartera es de tu empresa" : "Antes: la cartera vive en celulares personales"}</SceneChip>
        </div>
        {mode === "antes" ? <Before s={step} /> : <WithRoot s={step} />}
      </Scene>
    </div>
  );
}
