"use client";
import { useState } from "react";
import { COMPETITOR_REVIEW_LABEL } from "@/lib/site";
import { COST_BARS, IVA_RATE, mxn, mxnSmart, type CostBar, type CostKey } from "./data";

/*
 * D8 · Costo por usuario al mes (plan §4). Barras horizontales con dos interruptores:
 * «Por usuario / Mensualidad» y «Como lo publican / Con IVA». root siempre va primero.
 * - El HTML del servidor trae el estado completo (por usuario, como lo publican): nunca vacío.
 * - Cada barra lleva su valor en texto; los rellenos son decorativos (aria-hidden).
 * - Con movimiento reducido las barras cambian sin transición.
 * - El cálculo es nuestro (inferido) y el pie lo dice.
 */

type Mode = "usuario" | "mensual";
type Tax = "publicado" | "iva";

/** Valor sólido y, para root con IVA, el tope «si se sumara IVA» (parte rayada). */
function valueOf(bar: CostBar, mode: Mode, tax: Tax) {
  const base = mode === "usuario" ? bar.monthly / bar.users : bar.monthly;
  if (tax === "publicado" || bar.iva === "incluido") return { solid: base, ghost: null as number | null };
  if (bar.iva === "aparte") return { solid: base * (1 + IVA_RATE), ghost: null };
  // root: según los Términos ya incluye IVA cuando aplique; mostramos el peor caso como extensión rayada.
  return { solid: base, ghost: base * (1 + IVA_RATE) };
}

const TONE: Record<CostKey, { fill: string; label: string }> = {
  root: { fill: "bg-lime-fill", label: "text-ink" },
  leadsales: { fill: "bg-ink/25", label: "text-ink" },
  vambe: { fill: "bg-ink/25", label: "text-ink" },
};

const HATCH = "repeating-linear-gradient(135deg, transparent 0 6px, color-mix(in srgb, var(--ink) 14%, transparent) 6px 8px)";

function Toggle<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; text: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={label}>
      <span className="kicker">{label}</span>
      <div className="inline-flex rounded-full border border-line bg-surface p-1">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={value === o.id}
            onClick={() => onChange(o.id)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors motion-reduce:transition-none ${
              value === o.id ? "bg-ink text-paper" : "text-muted hover:text-ink"
            }`}
          >
            {o.text}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * `only`: competidores que se muestran junto a root (por defecto, los dos).
 * `id`: prefijo para ids (si hay más de un D8 en la página).
 */
export function CostPerUser({ only, id = "d8" }: { only?: Exclude<CostKey, "root">[]; id?: string }) {
  const [mode, setMode] = useState<Mode>("usuario");
  const [tax, setTax] = useState<Tax>("publicado");
  const bars = COST_BARS.filter((b) => b.key === "root" || !only || only.includes(b.key as Exclude<CostKey, "root">));

  // Escala fija por modo (la misma con y sin IVA) para que al cambiar el IVA las barras crezcan, no se reacomoden.
  const max = Math.max(...bars.flatMap((b) => [valueOf(b, mode, "publicado"), valueOf(b, mode, "iva")]).map((v) => v.ghost ?? v.solid));
  const pct = (n: number) => `${Math.max(2, (n / max) * 100).toFixed(2)}%`;
  const unit = mode === "usuario" ? "por usuario al mes" : "al mes";

  const caption = [
    `Costo del plan con IA de cada opción, en pesos mexicanos, revisado el ${COMPETITOR_REVIEW_LABEL}.`,
    ...bars.map((b) => {
      const per = b.monthly / b.users;
      return `${b.name} ${b.plan}: ${mxnSmart(b.monthly)} al mes para ${b.users} usuarios, ${mxn(per)} por usuario. ${b.ivaNote}`;
    }),
    "Cálculo nuestro: mensualidad dividida entre los usuarios incluidos. Con IVA, a los precios publicados sin IVA se les suma 16 %.",
  ].join(" ");

  return (
    <figure className="card p-5 md:p-8" aria-labelledby={`${id}-titulo`}>
      <figcaption className="sr-only">{caption}</figcaption>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="kicker">Precios públicos en MXN</p>
          <h3 id={`${id}-titulo`} className="h-card text-xl md:text-2xl text-ink mt-2">
            Costo {mode === "usuario" ? "por usuario" : "del plan con IA"} al mes
          </h3>
          <p className="text-sm text-muted mt-1">Revisado el {COMPETITOR_REVIEW_LABEL}.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
          <Toggle
            label="Ver"
            value={mode}
            onChange={setMode}
            options={[
              { id: "usuario", text: "Por usuario" },
              { id: "mensual", text: "Mensualidad" },
            ]}
          />
          <Toggle
            label="IVA"
            value={tax}
            onChange={setTax}
            options={[
              { id: "publicado", text: "Como lo publican" },
              { id: "iva", text: "Con IVA" },
            ]}
          />
        </div>
      </div>

      {/* Al cambiar un interruptor se anuncia solo el resumen, no la lista completa con sus notas. */}
      <p className="sr-only" aria-live="polite">
        {`${mode === "usuario" ? "Por usuario" : "Mensualidad"}, ${tax === "iva" ? "con IVA" : "como lo publican"}: `}
        {bars
          .map((b) => {
            const v = valueOf(b, mode, tax);
            return `${b.name} ${mxn(v.solid)}${v.ghost ? ` a ${mxn(v.ghost)}` : ""}`;
          })
          .join("; ")}{" "}
        {unit}.
      </p>
      <ul className="mt-8 flex flex-col gap-7">
        {bars.map((b) => {
          const v = valueOf(b, mode, tax);
          return (
            <li key={b.key} className="grid gap-2 md:grid-cols-[13rem_1fr] md:gap-6">
              <div>
                <p className={`font-display font-bold text-lg leading-tight ${TONE[b.key].label}`}>{b.name}</p>
                <p className="text-sm text-muted">
                  {b.plan} · {b.users} usuarios
                </p>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 flex-1 rounded-lg bg-surface-2 overflow-hidden" aria-hidden="true">
                    {v.ghost ? (
                      <span
                        className="absolute inset-y-0 left-0 rounded-lg border border-dashed border-ink/40 transition-[width] duration-700 ease-out motion-reduce:transition-none"
                        style={{ width: pct(v.ghost), backgroundImage: HATCH }}
                      />
                    ) : null}
                    <span
                      className={`absolute inset-y-0 left-0 rounded-lg ${TONE[b.key].fill} transition-[width] duration-700 ease-out motion-reduce:transition-none`}
                      style={{ width: pct(v.solid) }}
                    />
                  </div>
                  <p className="mono text-right text-ink font-semibold text-base md:text-lg w-[7.5rem] shrink-0">
                    {mxn(v.solid)}
                    {v.ghost ? <span className="block text-xs font-normal text-muted">a {mxn(v.ghost)}</span> : null}
                  </p>
                </div>
                <p className="mt-1 text-xs text-muted">
                  <span className="sr-only">
                    {b.name}: {mxn(v.solid)}
                    {v.ghost ? ` a ${mxn(v.ghost)}` : ""} {unit}.{" "}
                  </span>
                  {tax === "iva" ? b.ivaNote : null}
                  {tax === "iva" && v.ghost ? " La parte rayada muestra cuánto sería si se sumara el IVA." : null}
                  {tax === "publicado"
                    ? b.iva === "aparte"
                      ? "Precio sin IVA."
                      : b.iva === "incluido"
                        ? "Precio con IVA."
                        : "Precio publicado."
                    : null}
                </p>
                <ul className="mt-2 flex flex-col gap-1 text-sm text-muted leading-relaxed">
                  {b.notes.map((n) => (
                    <li key={n} className="flex gap-2">
                      <span aria-hidden="true">·</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 border-t border-line pt-5 text-sm text-muted leading-relaxed flex flex-col gap-2">
        <p>
          <span className="font-semibold text-ink">Cómo lo calculamos.</span> Mensualidad del plan que trae IA entre los usuarios que
          incluye. Con IVA: a los precios publicados sin IVA les sumamos 16 %; los que ya lo incluyen no cambian. Es un cálculo nuestro con
          sus precios públicos, no una cifra que ellos publiquen. No incluye mensajes de WhatsApp, que en las tres opciones se pagan aparte
          o con saldo.
        </p>
        <p>
          Fuentes:{" "}
          {bars
            .flatMap((b) => b.sources)
            .filter((s, i, all) => all.findIndex((x) => x.href === s.href) === i)
            .map((s, i) => (
              <span key={s.href}>
                {i > 0 ? ", " : ""}
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
                  className="underline decoration-line underline-offset-2 hover:text-ink"
                >
                  {s.label}
                </a>
              </span>
            ))}
          . Revisado en octubre de 2026.
        </p>
      </div>
    </figure>
  );
}
