"use client";
// Formulario «Contacto root». Mismo patrón que el de nextia.mx (components/contact-form.tsx de nextia-web).
//
// El tag de root (src/app/layout.tsx) escucha el evento `submit` y manda form_submit con el id del formulario
// (o el campo oculto `form_id`), su nombre (`data-form-name`) y cada campo por su atributo `name`. Por eso:
// - El nombre del contacto va en `full_name`: un campo llamado `name` taparía form.name.
// - `necesidad` es opcional, de una sola línea y de máximo 140 caracteres: si se usa como variable en una plantilla
//   de WhatsApp, Meta rechaza saltos de línea, tabuladores o más de cuatro espacios seguidos.
// - El campo oculto `origen` se llena al enviar con la página exacta (y la campaña si la URL trae utm_campaign).
// - El botón NO es type="submit": primero se valida todo y solo entonces se llama requestSubmit(), que dispara el
//   `submit` que lee root. Así a root solo llegan formularios completos y Enter tampoco envía sin validar.
// - `website` es una trampa para bots: está oculta para las personas; si viene llena no se envía nada.
import Link from "next/link";
import { useRef, useState } from "react";
import { CtaButton } from "@/components/ui";
import { SITE_URL } from "@/lib/site";

export const FORM_ID = "contacto-root";
export const FORM_NAME = "Contacto root";

/** Tamaño del equipo de ventas: el valor llega tal cual a root (campo `equipo_ventas`). */
const EQUIPO = [
  { value: "1–3", label: "1 a 3 personas" },
  { value: "4–10", label: "4 a 10 personas" },
  { value: "11–30", label: "11 a 30 personas" },
  { value: "31+", label: "31 o más personas" },
] as const;

const MAX_NECESIDAD = 140;
const HOST = SITE_URL.replace(/^https?:\/\//, "");

const ERR_TEXTO = "Escribe al menos dos letras.";
const ERR_EJEMPLO = "Escribe el dato real, no el ejemplo.";
const ERR_PHONE = "Escribe un WhatsApp válido: 10 dígitos, o + y la clave de tu país.";

function checkPhone(value: string) {
  const v = value.trim();
  const d = v.replace(/\D/g, "");
  if (v.startsWith("+")) return d.length >= 10 && d.length <= 15;
  return d.length === 10 && !/^(\d)\1+$/.test(d);
}

/** «goroot.ai/precios/» o «goroot.ai/precios/ · campaña: nombre» si la URL trae utm_campaign. */
function currentOrigen() {
  const { pathname, search } = window.location;
  const campaign = new URLSearchParams(search).get("utm_campaign")?.trim();
  return `${HOST}${pathname}${campaign ? ` · campaña: ${campaign}` : ""}`;
}

export function ContactForm({ path, cta }: { path: string; cta: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const verified = useRef(false);
  const [necesidad, setNecesidad] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  /** Valida todo; si pasa, dispara el `submit` que lee root. */
  function send() {
    const form = formRef.current;
    if (!form || sending || verified.current) return;
    const el = (n: string) => form.elements.namedItem(n) as HTMLInputElement | null;
    if (el("website")?.value) return;
    for (const n of ["full_name", "company"]) {
      const f = el(n);
      if (!f) continue;
      const v = f.value.trim();
      f.setCustomValidity(/^(ej|e\.g)\b/i.test(v) ? ERR_EJEMPLO : /\p{L}.*\p{L}/u.test(v) ? "" : ERR_TEXTO);
    }
    const phone = el("phone");
    phone?.setCustomValidity(checkPhone(phone.value) ? "" : ERR_PHONE);
    if (!form.reportValidity()) return;
    const origen = el("origen");
    if (origen) origen.value = currentOrigen();
    setSending(true);
    verified.current = true;
    form.requestSubmit();
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!verified.current) {
      send();
      return;
    }
    const nombre = String(new FormData(e.currentTarget).get("full_name") ?? "").trim();
    setSent(nombre.split(" ")[0] || "");
  }

  if (sent !== null) {
    return (
      <div role="status" className="card p-7 md:p-8 flex flex-col gap-4">
        <p className="h-card text-2xl text-ink">¡Gracias{sent ? `, ${sent}` : ""}! Te contactamos en menos de 24 horas hábiles.</p>
        <p className="text-muted leading-relaxed">Te escribimos por WhatsApp o al correo que nos diste. Si quieres adelantar la plática, escríbenos tú.</p>
        <CtaButton label="Seguir por WhatsApp" cta={`${cta}-gracias`} variant="outline" className="self-start" />
      </div>
    );
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-line bg-paper px-3.5 py-3 text-base text-ink placeholder:text-muted outline-none focus:border-lime focus:ring-2 focus:ring-lime-soft";
  const label = "block text-sm font-medium text-ink";
  const id = (k: string) => `${cta}-${k}`;
  const restantes = MAX_NECESIDAD - necesidad.length;

  return (
    <form
      ref={formRef}
      id={FORM_ID}
      name={FORM_NAME}
      data-form-name={FORM_NAME}
      aria-label={FORM_NAME}
      onSubmit={onSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
          e.preventDefault();
          send();
        }
      }}
      className="card p-6 md:p-8 flex flex-col gap-4"
    >
      <input type="hidden" name="form_id" value={FORM_ID} />
      <input type="hidden" name="origen" defaultValue={`${HOST}${path}`} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor={id("website")}>Sitio web</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label className={label} htmlFor={id("full_name")}>Tu nombre</label>
          <input id={id("full_name")} name="full_name" required autoComplete="name" maxLength={80} className={field} placeholder="Laura Méndez" onInput={(e) => e.currentTarget.setCustomValidity("")} />
        </div>
        <div className="min-w-0">
          <label className={label} htmlFor={id("company")}>Empresa</label>
          <input id={id("company")} name="company" required autoComplete="organization" maxLength={100} className={field} placeholder="Nombre de tu empresa" onInput={(e) => e.currentTarget.setCustomValidity("")} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label className={label} htmlFor={id("email")}>Correo de trabajo</label>
          <input id={id("email")} name="email" type="email" required autoComplete="email" maxLength={120} className={field} placeholder="tu@empresa.com" />
        </div>
        <div className="min-w-0">
          <label className={label} htmlFor={id("phone")}>WhatsApp</label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            className={field}
            placeholder="55 1234 5678"
            aria-describedby={id("phone-hint")}
            onInput={(e) => e.currentTarget.setCustomValidity("")}
          />
          <p id={id("phone-hint")} className="mt-1 text-xs text-muted">10 dígitos. Fuera de México, inicia con + y la clave de tu país.</p>
        </div>
      </div>
      <div>
        <label className={label} htmlFor={id("equipo_ventas")}>¿Cuántas personas venden en tu equipo?</label>
        <select id={id("equipo_ventas")} name="equipo_ventas" required defaultValue="" className={`${field} invalid:text-muted`}>
          <option value="" disabled>Elige una opción</option>
          {EQUIPO.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={label} htmlFor={id("necesidad")}>
          ¿Qué quieres resolver? <span className="font-normal text-muted">(opcional)</span>
        </label>
        <textarea
          id={id("necesidad")}
          name="necesidad"
          rows={2}
          maxLength={MAX_NECESIDAD}
          value={necesidad}
          onChange={(e) => setNecesidad(e.target.value.replace(/[\r\n\t]+/g, " ").replace(/ {4,}/g, " "))}
          className={`${field} resize-none`}
          placeholder="Ej. Nos llegan muchos mensajes y no alcanzamos a contestar todos a tiempo."
          aria-describedby={id("necesidad-count")}
        />
        <p id={id("necesidad-count")} className={`mt-1 text-xs mono ${restantes <= 20 ? "text-coral" : "text-muted"}`} aria-live="polite">
          {restantes} caracteres restantes
        </p>
      </div>
      <button type="button" onClick={send} disabled={sending} data-cta={`${cta}-enviar`} className="btn btn-primary px-6 py-3.5 text-base disabled:opacity-70">
        {sending ? "Enviando…" : "Agendar mi demo"}
      </button>
      <p className="text-xs text-muted leading-relaxed">
        Usamos tus datos solo para contactarte sobre root. Lee nuestro{" "}
        <Link href="/docs/aviso-de-privacidad/" className="underline underline-offset-2 hover:text-ink">aviso de privacidad</Link>.
      </p>
    </form>
  );
}
