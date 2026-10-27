"use client";
import { Icon, WhatsAppGlyph } from "@/components/icons";
import { CountUp, useSceneLoop } from "@/components/motion/kit";
import { Avatar, Canvas } from "./canvas";

/*
 * D3 · La cartera es tuya (línea de empresa, plan §4). Dos paneles que se leen juntos:
 * - Antes: tres vendedores, cada uno con su WhatsApp personal. Toño deja la empresa y sus 23 chats se van con él.
 * - Con root: una sola línea de empresa y una bandeja compartida. Toño se va, sus 23 conversaciones se quedan y
 *   pasan a Paola.
 * Estado final (servidor, movimiento reducido y fuera de pantalla): Toño ya se fue; los dos resultados a la vista.
 * Cada panel es su propio lienzo (base 360) para que en móvil se lea a buen tamaño.
 */

/** 0 = los tres vendedores · 1 = Toño ya se fue (final). */
const DURATIONS = [2400, 4400] as const;

const SELLERS = [
  { name: "Andrés", initials: "AR", chats: 18 },
  { name: "Paola", initials: "PV", chats: 27 },
  { name: "Toño", initials: "TO", chats: 23 },
];

function ChatLines({ faded = false }: { faded?: boolean }) {
  return (
    <div className="flex flex-col gap-[0.4em]">
      {[0.9, 0.7, 0.8].map((w, i) => (
        <div key={i} className="flex items-center gap-[0.35em]">
          <span className={`size-[0.9em] shrink-0 rounded-full ${faded ? "bg-line" : "bg-surface-2"}`} />
          <span className={`h-[0.4em] rounded-full ${faded ? "bg-line" : "bg-surface-2"}`} style={{ width: `${w * 100}%` }} />
        </div>
      ))}
    </div>
  );
}

function Before({ gone }: { gone: boolean }) {
  return (
    <div className="flex h-full flex-col rounded-[1.2em] border border-line bg-surface p-[1em]">
      <p className="text-[0.62em] font-semibold uppercase tracking-[0.1em] text-muted">Antes</p>
      <p className="mt-[0.2em] text-[0.95em] font-bold leading-tight text-ink">Cada quien en su celular</p>
      <div className="mt-[0.9em] grid flex-1 grid-cols-3 gap-[0.6em]">
        {SELLERS.map((s) => {
          const leaving = s.name === "Toño" && gone;
          return (
            <div
              key={s.name}
              className={`flex flex-col rounded-[0.9em] border-[0.12em] bg-paper p-[0.5em] transition-all duration-700 ${
                leaving ? "translate-y-[0.6em] border-dashed border-coral/60 opacity-60 grayscale" : "border-ink/80"
              }`}
            >
              <span className="mx-auto mb-[0.45em] h-[0.25em] w-[1.8em] rounded-full bg-line" />
              <p className="text-[0.66em] font-bold text-ink">{s.name}</p>
              <p className="text-[0.5em] text-muted">WhatsApp personal</p>
              <div className="mt-[0.5em] flex-1">
                <ChatLines faded={leaving} />
              </div>
              <p className="mono mt-[0.5em] text-[0.62em] text-ink">{s.chats} chats</p>
            </div>
          );
        })}
      </div>
      <div className="mt-[0.9em] flex h-[2.6em] items-center gap-[0.5em] rounded-[0.8em] px-[0.7em] transition-colors duration-500" style={{ background: gone ? "var(--coral-soft)" : "var(--surface-2)" }}>
        <Icon name={gone ? "x" : "users"} className={`h-[1.1em] w-[1.1em] shrink-0 ${gone ? "text-coral" : "text-muted"}`} strokeWidth={2.2} />
        <p className={`text-[0.66em] font-semibold leading-snug ${gone ? "text-coral" : "text-muted"}`}>
          {gone ? "Toño dejó la empresa: 23 prospectos perdidos" : "Tres vendedores, tres carteras distintas"}
        </p>
      </div>
    </div>
  );
}

function WithRoot({ gone, playing }: { gone: boolean; playing: boolean }) {
  return (
    <div className="flex h-full flex-col rounded-[1.2em] border border-lime/50 bg-surface p-[1em]">
      <p className="text-[0.62em] font-semibold uppercase tracking-[0.1em] text-lime">Con <span className="normal-case">root</span></p>
      <p className="mt-[0.2em] text-[0.95em] font-bold leading-tight text-ink">Una línea de empresa</p>

      <div className="mt-[0.9em] flex flex-1 flex-col items-center">
        <span className="inline-flex items-center gap-[0.4em] rounded-full bg-ink px-[0.8em] py-[0.35em] text-paper">
          <WhatsAppGlyph className="h-[0.95em] w-[0.95em]" />
          <span className="mono text-[0.62em]">+52 55 ···· ···· · Tu empresa</span>
        </span>
        <span className="h-[0.8em] w-px bg-line" />
        <div className="w-full rounded-[0.9em] border border-line bg-paper p-[0.6em]">
          <div className="flex items-center justify-between">
            <p className="text-[0.62em] font-semibold text-ink">Bandeja compartida</p>
            <p className="mono text-[0.58em] text-muted">68 conversaciones</p>
          </div>
          <div className="mt-[0.55em] grid grid-cols-3 gap-[0.5em]">
            {SELLERS.map((s) => {
              const leaving = s.name === "Toño" && gone;
              const count = s.name === "Paola" && gone ? 50 : leaving ? 0 : s.chats;
              return (
                <div
                  key={s.name}
                  className={`flex flex-col items-center rounded-[0.7em] border bg-surface py-[0.5em] text-[0.62em] transition-all duration-700 ${
                    leaving ? "border-dashed border-line opacity-45" : s.name === "Paola" && gone ? "border-sky" : "border-line"
                  }`}
                >
                  <Avatar initials={s.initials} tone={leaving ? "neutral" : "equipo"} />
                  <span className="mt-[0.3em] font-semibold text-ink">{s.name}</span>
                  <span className="mono text-muted">{count} chats</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-[0.9em] flex h-[2.6em] items-center gap-[0.5em] rounded-[0.8em] px-[0.7em] transition-colors duration-500" style={{ background: gone ? "var(--success-soft)" : "var(--surface-2)" }}>
        <Icon name={gone ? "check" : "inbox"} className={`h-[1.1em] w-[1.1em] shrink-0 ${gone ? "text-success" : "text-muted"}`} strokeWidth={2.2} />
        <p className={`text-[0.66em] font-semibold leading-snug ${gone ? "text-success" : "text-muted"}`}>
          {gone ? (
            <>
              <CountUp value={23} run={playing} duration={1.1} /> conversaciones reasignadas a Paola
            </>
          ) : (
            "Todo vive en el número de tu empresa"
          )}
        </p>
      </div>
    </div>
  );
}

export function CarteraEsTuya() {
  const { ref, step, playing } = useSceneLoop<HTMLElement>(DURATIONS);
  const gone = step === 1;
  return (
    <figure ref={ref} className="m-0 grid gap-5 md:grid-cols-2">
      <Canvas base={360} aspect="360 / 330">
        <Before gone={gone} />
      </Canvas>
      <Canvas base={360} aspect="360 / 330">
        <WithRoot gone={gone} playing={playing} />
      </Canvas>
      <figcaption className="sr-only">
        Comparación con datos de ejemplo. Antes: tres vendedores (Andrés, Paola y Toño) atienden desde su WhatsApp personal; cuando Toño deja la
        empresa, sus 23 prospectos se pierden con él. Con root: todas las conversaciones pasan por el número de la empresa y viven en una bandeja
        compartida; cuando Toño se va, sus 23 conversaciones se quedan y se reasignan a Paola.
      </figcaption>
    </figure>
  );
}
