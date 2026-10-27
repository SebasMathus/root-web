"use client";
import { useId, useState } from "react";
import { Icon, WhatsAppGlyph } from "@/components/icons";

/*
 * Generador de link de WhatsApp (wa.me). Todo se arma en el navegador: no hay red, ni almacenamiento, ni
 * analítica de lo que escribes. El HTML del servidor ya trae el formulario completo con un ejemplo.
 */

const COUNTRIES = [
  { code: "52", label: "México (+52)", digits: [10, 10] },
  { code: "1", label: "Estados Unidos y Canadá (+1)", digits: [10, 10] },
  { code: "57", label: "Colombia (+57)", digits: [10, 10] },
  { code: "51", label: "Perú (+51)", digits: [9, 9] },
  { code: "56", label: "Chile (+56)", digits: [9, 9] },
  { code: "54", label: "Argentina (+54)", digits: [10, 11] },
  { code: "502", label: "Guatemala (+502)", digits: [8, 8] },
  { code: "593", label: "Ecuador (+593)", digits: [9, 9] },
  { code: "34", label: "España (+34)", digits: [9, 9] },
] as const;

const TEMPLATES = [
  "Hola, vi su anuncio y quiero más información.",
  "Hola, quiero cotizar.",
  "Hola, quiero agendar una cita.",
  "Hola, ¿siguen teniendo disponible lo que publicaron?",
];

const EXAMPLE_NUMBER = "5512345678";

type CopyState = "idle" | "ok" | "error";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Respaldo para navegadores sin permiso de portapapeles.
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function buildWaLink(countryCode: string, number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  const text = message.trim();
  return `https://wa.me/${countryCode}${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function LinkGenerator() {
  const id = useId();
  const [country, setCountry] = useState<string>("52");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState(TEMPLATES[0]);
  const [copied, setCopied] = useState<{ what: "link" | "html" | null; state: CopyState }>({ what: null, state: "idle" });

  const spec = COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0];
  let digits = number.replace(/\D/g, "");
  // Si pegaron el número con la lada, la quitamos.
  if (digits.length > spec.digits[1] && digits.startsWith(spec.code)) digits = digits.slice(spec.code.length);
  const isEmpty = digits.length === 0;
  const valid = digits.length >= spec.digits[0] && digits.length <= spec.digits[1];
  const link = buildWaLink(country, isEmpty ? EXAMPLE_NUMBER : digits, message);
  const html = `<a href="${link}" target="_blank" rel="noopener">Escríbenos por WhatsApp</a>`;
  const ready = !isEmpty && valid;

  const hint = isEmpty
    ? `Escribe tu número de ${spec.digits[0] === spec.digits[1] ? spec.digits[0] : `${spec.digits[0]} a ${spec.digits[1]}`} dígitos, sin la lada.`
    : valid
      ? "Número listo."
      : `Revisa el número: para ${spec.label.split(" (")[0]} van ${spec.digits[0] === spec.digits[1] ? spec.digits[0] : `${spec.digits[0]} a ${spec.digits[1]}`} dígitos sin la lada (llevas ${digits.length}).`;

  async function onCopy(what: "link" | "html") {
    if (!ready) return;
    const ok = await copyText(what === "link" ? link : html);
    setCopied({ what, state: ok ? "ok" : "error" });
    setTimeout(() => setCopied({ what: null, state: "idle" }), 2500);
  }

  const label = (what: "link" | "html", idle: string) => (copied.what === what ? (copied.state === "ok" ? "¡Copiado!" : "No se pudo copiar") : idle);

  return (
    <div className="card shadow-[var(--shadow)] p-5 md:p-7">
      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()} aria-describedby={`${id}-privacidad`}>
        <div className="grid gap-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <label className="grid gap-1.5">
            <span className="text-sm font-semibold text-ink">País</span>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="h-12 rounded-xl border border-line bg-surface px-3 text-ink text-[15px] focus:border-ink outline-none"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="text-sm font-semibold text-ink">Número de WhatsApp</span>
            <span className="flex h-12 rounded-xl border border-line bg-surface focus-within:border-ink overflow-hidden">
              <span className="mono grid place-items-center px-3 text-muted bg-surface-2 border-r border-line">+{country}</span>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="off"
                placeholder={EXAMPLE_NUMBER}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                aria-describedby={`${id}-hint`}
                aria-invalid={!isEmpty && !valid}
                className="min-w-0 flex-1 bg-transparent px-3 text-ink text-[15px] outline-none"
              />
            </span>
          </label>
        </div>
        <p id={`${id}-hint`} className={`-mt-2 text-sm ${!isEmpty && !valid ? "text-coral" : "text-muted"}`} aria-live="polite">
          {hint}
        </p>

        <label className="grid gap-1.5">
          <span className="flex items-baseline justify-between gap-3">
            <span className="text-sm font-semibold text-ink">Mensaje que aparecerá escrito (opcional)</span>
            <span className="mono text-xs text-muted">{message.length} caracteres</span>
          </span>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-xl border border-line bg-surface p-3 text-ink text-[15px] leading-relaxed outline-none focus:border-ink resize-y"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Mensajes sugeridos">
          {TEMPLATES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setMessage(t)}
              aria-pressed={message === t}
              className={`chip cursor-pointer text-left whitespace-normal ${message === t ? "border-ink!" : "hover:border-ink"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </form>

      <div className="mt-7 rounded-2xl border border-line bg-surface-2 p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="kicker">Tu link</p>
          {ready ? null : <span className="mono text-[11px] uppercase tracking-[0.1em] text-muted">● Ejemplo</span>}
        </div>
        <output className={`mono mt-2 block break-all text-[14px] leading-relaxed ${ready ? "text-ink" : "text-muted"}`} aria-live="polite">
          {link}
        </output>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <button type="button" onClick={() => onCopy("link")} disabled={!ready} className="btn btn-primary px-5 py-3 text-[15px] disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon name="file" className="w-[18px] h-[18px]" />
            {label("link", "Copiar link")}
          </button>
          {ready ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-outline px-5 py-3 text-[15px]">
              <WhatsAppGlyph className="w-[18px] h-[18px]" />
              Probar link
            </a>
          ) : (
            <span className="btn btn-outline px-5 py-3 text-[15px] opacity-50 cursor-not-allowed" aria-disabled="true">
              <WhatsAppGlyph className="w-[18px] h-[18px]" />
              Probar link
            </span>
          )}
          <button type="button" onClick={() => onCopy("html")} disabled={!ready} className="btn btn-ghost px-4 py-3 text-[15px] disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon name="tool" className="w-[18px] h-[18px]" />
            {label("html", "Copiar código para tu sitio")}
          </button>
        </div>
      </div>

      {/* Vista previa de cómo verá el mensaje tu cliente. */}
      <div className="mt-5 rounded-2xl border border-line p-4 grid-bg">
        <p className="text-xs text-muted">Así lo verá tu cliente al abrir el link, listo para enviar:</p>
        <div className="mt-3 flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-tr-md bg-lime-soft px-4 py-2.5 text-[15px] text-ink leading-snug wrap-break-word">
            {message.trim() || <span className="text-muted">(Sin mensaje: el chat abre vacío)</span>}
          </p>
        </div>
      </div>

      <p id={`${id}-privacidad`} className="mt-5 flex items-start gap-2 text-sm text-muted">
        <Icon name="lock" className="w-4 h-4 mt-0.5 shrink-0" />
        El link se arma en tu navegador. No guardamos ni enviamos tu número ni tu mensaje.
      </p>
    </div>
  );
}
