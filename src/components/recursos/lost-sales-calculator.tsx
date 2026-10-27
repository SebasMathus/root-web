"use client";
import { useId, useState } from "react";
import { Icon } from "@/components/icons";
import { CtaButton } from "@/components/ui";
import { planById } from "@/lib/site";

/*
 * D7 · Calculadora de ventas perdidas (plan §4). El usuario pone TODOS los números; los valores iniciales son de
 * ejemplo y lo dicen. Sin cifras de industria. Todo se calcula en el navegador; no se envía ni se guarda nada.
 * El HTML del servidor ya trae el cálculo completo con los valores de ejemplo.
 */

type Field = {
  key: "leads" | "sinRespuesta" | "cierre" | "ticket";
  label: string;
  help: string;
  min: number;
  max: number;
  step: number;
  /** Tope del campo numérico (el deslizador llega a `max`). */
  hardMax: number;
  prefix?: string;
  suffix?: string;
};

const FIELDS: Field[] = [
  { key: "leads", label: "Prospectos que te escriben por WhatsApp al mes", help: "Cuenta todos: anuncios, sitio, redes y recomendados.", min: 0, max: 3000, step: 10, hardMax: 1_000_000 },
  {
    key: "sinRespuesta",
    label: "De ellos, % que no recibe respuesta a tiempo",
    help: "Los que esperan horas, los de fuera de horario y los que nadie contestó.",
    min: 0,
    max: 100,
    step: 1,
    hardMax: 100,
    suffix: "%",
  },
  { key: "cierre", label: "Tasa de cierre de tu equipo", help: "De cada 100 prospectos que sí atienden, cuántos te compran.", min: 0, max: 60, step: 0.5, hardMax: 100, suffix: "%" },
  { key: "ticket", label: "Ticket promedio por venta", help: "Lo que vale una venta en pesos (sin IVA, si así lo mides).", min: 0, max: 200_000, step: 500, hardMax: 100_000_000, prefix: "$" },
];

type Values = Record<Field["key"], number>;
const EXAMPLE: Values = { leads: 400, sinRespuesta: 20, cierre: 8, ticket: 6500 };

const pesos = (n: number) => `$${Math.round(n).toLocaleString("es-MX")}`;
const num = (n: number, d = 0) => n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: d });

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function lostSales(v: Values) {
  const sinRespuesta = v.leads * (v.sinRespuesta / 100);
  const ventas = sinRespuesta * (v.cierre / 100);
  const mes = ventas * v.ticket;
  return { sinRespuesta, ventas, mes, anio: mes * 12 };
}

export function LostSalesCalculator() {
  const id = useId();
  const [v, setV] = useState<Values>(EXAMPLE);
  const [copied, setCopied] = useState<"idle" | "ok" | "error">("idle");
  const r = lostSales(v);
  const isExample = (Object.keys(EXAMPLE) as Field["key"][]).every((k) => EXAMPLE[k] === v[k]);
  const pro = planById("pro");
  const proPrice = pro.price ?? 0;
  const scale = Math.max(r.mes, proPrice, 1);

  const set = (key: Field["key"], raw: string, f: Field) => {
    const n = Number(raw.replace(/[^\d.]/g, ""));
    setV((prev) => ({ ...prev, [key]: Number.isFinite(n) ? Math.min(Math.max(n, 0), f.hardMax) : 0 }));
  };

  const summary = [
    "Mi cálculo de ventas en riesgo por contestar tarde (calculadora de root):",
    `- Prospectos por WhatsApp al mes: ${num(v.leads)}`,
    `- Sin respuesta a tiempo: ${num(v.sinRespuesta, 1)} % (${num(r.sinRespuesta, 1)} prospectos)`,
    `- Tasa de cierre: ${num(v.cierre, 1)} % (${num(r.ventas, 1)} ventas)`,
    `- Ticket promedio: ${pesos(v.ticket)} MXN`,
    `= ${pesos(r.mes)} MXN al mes en riesgo (${pesos(r.anio)} al año)`,
  ].join("\n");

  async function onCopy() {
    const ok = await copyText(summary);
    setCopied(ok ? "ok" : "error");
    setTimeout(() => setCopied("idle"), 2500);
  }

  return (
    <div className="card shadow-[var(--shadow)] overflow-hidden">
      <form className="p-5 md:p-7 grid gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="kicker">Tus números</p>
          {isExample ? (
            <span className="mono text-[11px] uppercase tracking-[0.1em] text-muted">● Valores de ejemplo: pon los tuyos</span>
          ) : (
            <button type="button" onClick={() => setV(EXAMPLE)} className="text-sm text-muted underline underline-offset-2 hover:text-ink">
              Volver al ejemplo
            </button>
          )}
        </div>
        {FIELDS.map((f) => {
          const inputId = `${id}-${f.key}`;
          return (
            <div key={f.key} className="grid gap-2">
              <div className="flex items-end justify-between gap-4">
                <label htmlFor={inputId} className="text-[15px] font-semibold text-ink leading-snug">
                  {f.label}
                </label>
                <span className="flex items-center h-11 w-[8.5rem] shrink-0 rounded-xl border border-line bg-surface focus-within:border-ink overflow-hidden">
                  {f.prefix ? <span className="pl-3 text-muted mono">{f.prefix}</span> : null}
                  <input
                    id={inputId}
                    type="number"
                    inputMode="decimal"
                    min={f.min}
                    max={f.hardMax}
                    step={f.step}
                    value={v[f.key]}
                    onChange={(e) => set(f.key, e.target.value, f)}
                    aria-describedby={`${inputId}-help`}
                    className="mono min-w-0 flex-1 bg-transparent px-2 text-right text-ink outline-none"
                  />
                  {f.suffix ? <span className="pr-3 text-muted mono">{f.suffix}</span> : <span className="pr-3" />}
                </span>
              </div>
              <input
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={Math.min(v[f.key], f.max)}
                onChange={(e) => set(f.key, e.target.value, f)}
                aria-label={`${f.label} (deslizador)`}
                className="w-full accent-[var(--lime)] h-6 cursor-pointer"
              />
              <p id={`${inputId}-help`} className="text-sm text-muted -mt-1">
                {f.help}
              </p>
            </div>
          );
        })}
      </form>

      <div className="theme-dark p-5 md:p-7" aria-live="polite">
        <p className="kicker">Lo que dejas en la mesa</p>
        <p className="mt-3 font-display font-extrabold text-ink text-[clamp(2.4rem,1.6rem+3vw,3.6rem)] leading-none tracking-tight">
          {pesos(r.mes)} <span className="text-[0.4em] font-bold text-muted tracking-normal">MXN al mes</span>
        </p>
        <p className="mt-2 text-muted">
          <span className="mono text-ink">{pesos(r.anio)}</span> al año, si nada cambia.
        </p>

        {/* La fórmula, visible y con tus números. */}
        <ol className="mt-6 grid gap-2 text-[15px]">
          <li className="flex items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3 border border-line">
            <span className="text-muted">
              {num(v.leads)} prospectos × {num(v.sinRespuesta, 1)} %
            </span>
            <span className="mono text-coral text-right">{num(r.sinRespuesta, 1)} sin respuesta a tiempo</span>
          </li>
          <li className="flex items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3 border border-line">
            <span className="text-muted">× {num(v.cierre, 1)} % de cierre</span>
            <span className="mono text-ink text-right">{num(r.ventas, 1)} ventas en juego</span>
          </li>
          <li className="flex items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3 border border-line">
            <span className="text-muted">× {pesos(v.ticket)} de ticket</span>
            <span className="mono text-lime text-right">{pesos(r.mes)} al mes</span>
          </li>
        </ol>

        {/* Referencia: costo del plan Pro (precio publicado). */}
        <div className="mt-7 grid gap-3" aria-label="Comparación con el precio del plan Pro">
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-ink">En riesgo al mes</span>
              <span className="mono text-ink">{pesos(r.mes)}</span>
            </div>
            <div className="mt-1.5 h-3 rounded-full bg-surface-2 overflow-hidden">
              <div className="h-full rounded-full bg-coral transition-[width] duration-500" style={{ width: `${(r.mes / scale) * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-ink">Plan {pro.name} de root (agentes de IA incluidos)</span>
              <span className="mono text-ink">{pro.priceLabel}</span>
            </div>
            <div className="mt-1.5 h-3 rounded-full bg-surface-2 overflow-hidden">
              <div className="h-full rounded-full bg-lime transition-[width] duration-500" style={{ width: `${(proPrice / scale) * 100}%` }} />
            </div>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Precio publicado del plan {pro.name}: {pro.priceLabel} {pro.period}, con {pro.users}. Los mensajes de WhatsApp se pagan aparte a la tarifa oficial de Meta.
            La comparación es una referencia, no una promesa de recuperar ese monto.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <CtaButton cta="calculadora-resultado" label="Escríbenos por WhatsApp" size="md" />
          <button type="button" onClick={onCopy} className="btn btn-outline px-5 py-3 text-[15px]">
            <Icon name="file" className="w-[18px] h-[18px]" />
            {copied === "ok" ? "¡Copiado!" : copied === "error" ? "No se pudo copiar" : "Copiar mi cálculo"}
          </button>
        </div>
        <p className="mt-3 text-sm text-muted">Copia tu cálculo y pégalo en el chat: con tus números te decimos qué parte puede atender un agente de root.</p>
        <p className="mt-4 flex items-start gap-2 text-xs text-muted">
          <Icon name="lock" className="w-4 h-4 shrink-0" />
          El cálculo se hace en tu navegador. No guardamos ni enviamos tus números.
        </p>
      </div>
    </div>
  );
}
