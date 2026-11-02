"use client";
// Formulario «Contacto root» (homologado con los demás sitios de Nextia) y, al enviarlo, la agenda de Calendly.
//
// El tag de root (src/app/layout.tsx) escucha el evento `submit` y manda form_submit con el id del formulario
// (o el campo oculto `form_id`), su nombre (`data-form-name`) y cada campo por su atributo `name`. Por eso:
// - Campos, en este orden: `company`, `full_name` (un campo llamado `name` taparía form.name), `email`, teléfono
//   (`lada` + `telefono`, y el oculto `phone` en E.164), `equipo_ventas` y `herramienta_actual`.
// - `phone` se arma en E.164 (+52XXXXXXXXXX) al escribir, al cambiar la lada y otra vez justo antes de
//   requestSubmit(): el tag lee el FormData en el mismo evento `submit`, así que ya debe venir lleno.
// - El campo oculto `origen` se llena al enviar con la página exacta (y utm_campaign / utm_source si vienen).
// - El botón NO es type="submit": primero se valida todo y solo entonces se llama requestSubmit(), que dispara el
//   `submit` que lee root. Así a root solo llegan formularios completos y Enter tampoco envía sin validar.
// - `website` es una trampa para bots: está oculta para las personas; si viene llena no se envía nada.
// - Enviado, el formulario se reemplaza por la agenda de Calendly (iframe directo, sin widget.js) con nombre y correo
//   ya llenos. La disponibilidad (hoy y dos días más; sábados de 10:00 a 14:00) se configura en Calendly.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { SITE_URL } from "@/lib/site";

export const FORM_ID = "contacto-root";
export const FORM_NAME = "Contacto root";

const HOST = SITE_URL.replace(/^https?:\/\//, "");
const CALENDLY_URL = "https://calendly.com/sebastian-357/demo-de-eugenia";
const EMAIL_EJEMPLO = "enrico.fermi@goroot.ai";

/** Pregunta 1 (`equipo_ventas`): el valor llega tal cual a root. */
const EQUIPO = [
  { value: "1–3", label: "1 a 3 personas" },
  { value: "4–10", label: "4 a 10 personas" },
  { value: "11–30", label: "11 a 30 personas" },
  { value: "31+", label: "31 o más personas" },
] as const;

/** Pregunta 2 (`herramienta_actual`). */
const HERRAMIENTA = ["Excel o WhatsApp", "Otro CRM", "Nada"] as const;

/** Ladas: el valor de `lada` es la clave internacional; México va primero y es la de por defecto. */
const LADAS = [
  { iso: "MX", flag: "🇲🇽", country: "México", dial: "+52" },
  { iso: "US", flag: "🇺🇸", country: "EE. UU. y Canadá", dial: "+1" },
  { iso: "ES", flag: "🇪🇸", country: "España", dial: "+34" },
  { iso: "CO", flag: "🇨🇴", country: "Colombia", dial: "+57" },
  { iso: "AR", flag: "🇦🇷", country: "Argentina", dial: "+54" },
  { iso: "CL", flag: "🇨🇱", country: "Chile", dial: "+56" },
  { iso: "PE", flag: "🇵🇪", country: "Perú", dial: "+51" },
  { iso: "GT", flag: "🇬🇹", country: "Guatemala", dial: "+502" },
  { iso: "SV", flag: "🇸🇻", country: "El Salvador", dial: "+503" },
  { iso: "CR", flag: "🇨🇷", country: "Costa Rica", dial: "+506" },
  { iso: "EC", flag: "🇪🇨", country: "Ecuador", dial: "+593" },
  { iso: "VE", flag: "🇻🇪", country: "Venezuela", dial: "+58" },
  { iso: "PA", flag: "🇵🇦", country: "Panamá", dial: "+507" },
  { iso: "UY", flag: "🇺🇾", country: "Uruguay", dial: "+598" },
  { iso: "BO", flag: "🇧🇴", country: "Bolivia", dial: "+591" },
  { iso: "PY", flag: "🇵🇾", country: "Paraguay", dial: "+595" },
  { iso: "HN", flag: "🇭🇳", country: "Honduras", dial: "+504" },
  { iso: "NI", flag: "🇳🇮", country: "Nicaragua", dial: "+505" },
  { iso: "DO", flag: "🇩🇴", country: "República Dominicana", dial: "+1" },
] as const;

const ERR_TEXTO = "Escribe al menos dos letras.";
const ERR_EJEMPLO = "Escribe el dato real, no el ejemplo.";

/** 10 dígitos en México y con +1 (Norteamérica y RD); en los demás países, de 7 a 12 (E.164: 15 dígitos en total). */
const tenDigits = (dial: string) => dial === "+52" || dial === "+1";
function phoneError(dial: string, digits: string) {
  if (tenDigits(dial)) return digits.length === 10 && !/^(\d)\1+$/.test(digits) ? "" : "Escribe 10 dígitos, sin la lada.";
  const ok = digits.length >= 7 && digits.length <= 12 && dial.length - 1 + digits.length <= 15;
  return ok ? "" : "Escribe tu número sin la lada (de 7 a 12 dígitos).";
}

function utm() {
  const q = new URLSearchParams(window.location.search);
  return { campaign: q.get("utm_campaign")?.trim() || "", source: q.get("utm_source")?.trim() || "" };
}

/** «goroot.ai/precios/», más « · campaña: …» y « · fuente: …» si la URL trae utm_campaign / utm_source. */
function currentOrigen() {
  const { campaign, source } = utm();
  return `${HOST}${window.location.pathname}${campaign ? ` · campaña: ${campaign}` : ""}${source ? ` · fuente: ${source}` : ""}`;
}

function calendlySrc(name: string, email: string) {
  const { campaign, source } = utm();
  const params: [string, string][] = [
    ["embed_type", "Inline"],
    ["hide_gdpr_banner", "1"],
    ["embed_domain", HOST],
    ["name", name],
    ["email", email],
  ];
  if (campaign) params.push(["utm_campaign", campaign]);
  if (source) params.push(["utm_source", source]);
  return `${CALENDLY_URL}?${params.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&")}`;
}

export function ContactForm({ cta }: { cta: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const verified = useRef(false);
  const [lada, setLada] = useState(0);
  const [sending, setSending] = useState(false);
  const [agenda, setAgenda] = useState<string | null>(null);

  // Al cambiar a la agenda: foco en su título y la sección arriba, para que se vea el calendario completo.
  useEffect(() => {
    if (!agenda) return;
    doneRef.current?.focus({ preventScroll: true });
    doneRef.current?.closest("section")?.scrollIntoView({ block: "start" });
  }, [agenda]);

  const input = (n: string) => formRef.current?.elements.namedItem(n) as HTMLInputElement | null;

  /** Escribe en el oculto `phone` el número completo en E.164 (+52XXXXXXXXXX). Devuelve los dígitos nacionales. */
  function syncPhone(index = lada) {
    const tel = input("telefono");
    const phone = input("phone");
    const digits = tel?.value.replace(/\D/g, "") ?? "";
    if (phone) phone.value = digits ? `${LADAS[index].dial}${digits}` : "";
    return digits;
  }

  /** Valida todo; si pasa, dispara el `submit` que lee root. */
  function send() {
    const form = formRef.current;
    if (!form || sending || verified.current) return;
    if (input("website")?.value) return;
    for (const n of ["company", "full_name"]) {
      const f = input(n);
      if (!f) continue;
      const v = f.value.trim();
      f.setCustomValidity(/^(ej|e\.g)\b/i.test(v) ? ERR_EJEMPLO : /\p{L}.*\p{L}/u.test(v) ? "" : ERR_TEXTO);
    }
    const email = input("email");
    email?.setCustomValidity(email.value.trim().toLowerCase() === EMAIL_EJEMPLO ? ERR_EJEMPLO : "");
    const digits = syncPhone();
    input("telefono")?.setCustomValidity(phoneError(LADAS[lada].dial, digits));
    if (!form.reportValidity()) return;
    const origen = input("origen");
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
    const data = new FormData(e.currentTarget);
    setAgenda(calendlySrc(String(data.get("full_name") ?? "").trim(), String(data.get("email") ?? "").trim()));
  }

  if (agenda) {
    return (
      <div role="status" className="card overflow-hidden">
        <div className="p-6 pb-4 md:p-8 md:pb-5">
          <h3 ref={doneRef} tabIndex={-1} className="h-card text-2xl text-ink outline-none">
            ¡Listo! Elige tu horario para la demo
          </h3>
          <p className="mt-2 text-muted leading-relaxed">Puedes agendar hoy o en los próximos dos días. Sábados de 10:00 a 14:00.</p>
        </div>
        <iframe src={agenda} title="Agenda tu demo de root en Calendly" className="block h-[1000px] w-full border-0 border-t border-line bg-white md:h-[700px]" />
      </div>
    );
  }

  const box = "w-full rounded-xl border border-line bg-paper px-3.5 py-3 text-base text-ink placeholder:text-muted outline-none focus:border-lime focus:ring-2 focus:ring-lime-soft";
  const field = `mt-1.5 ${box}`;
  const label = "block text-sm font-medium text-ink";
  const id = (k: string) => `${cta}-${k}`;
  const clear = (e: React.FormEvent<HTMLInputElement>) => e.currentTarget.setCustomValidity("");
  const selected = LADAS[lada];

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
      <input type="hidden" name="origen" defaultValue="" />
      <input type="hidden" name="phone" defaultValue="" />
      <div className="hidden" aria-hidden="true">
        <label htmlFor={id("website")}>Sitio web</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label className={label} htmlFor={id("company")}>Nombre de la empresa</label>
          <input id={id("company")} name="company" required autoComplete="organization" maxLength={100} className={field} placeholder="Tu empresa" onInput={clear} />
        </div>
        <div className="min-w-0">
          <label className={label} htmlFor={id("full_name")}>Nombre del contacto</label>
          <input id={id("full_name")} name="full_name" required autoComplete="name" maxLength={80} className={field} placeholder="Enrico Fermi" onInput={clear} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label className={label} htmlFor={id("email")}>Correo del contacto</label>
          <input id={id("email")} name="email" type="email" required autoComplete="email" maxLength={120} className={field} placeholder={EMAIL_EJEMPLO} onInput={clear} />
        </div>
        <div className="min-w-0">
          <label className={label} htmlFor={id("telefono")}>Teléfono del contacto</label>
          <div className="mt-1.5 flex gap-2">
            {/* La lada: un <select> nativo transparente encima de la bandera y la clave elegidas. */}
            <div className="relative shrink-0 rounded-xl border border-line bg-paper focus-within:border-lime focus-within:ring-2 focus-within:ring-lime-soft">
              <span aria-hidden="true" className="pointer-events-none flex h-full items-center gap-1.5 px-3 text-base text-ink">
                <span>{selected.flag}</span>
                <span className="mono text-[15px]">{selected.dial}</span>
                <Icon name="chevron" className="h-4 w-4 text-muted" />
              </span>
              <select
                id={id("lada")}
                name="lada"
              required
                aria-label="Lada del país"
                defaultValue={LADAS[0].dial}
                onChange={(e) => {
                  const i = e.currentTarget.selectedIndex;
                  setLada(i);
                  syncPhone(i);
                  input("telefono")?.setCustomValidity("");
                }}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              >
                {LADAS.map((l) => (
                  <option key={l.iso} value={l.dial}>
                    {l.flag} {l.country} {l.dial}
                  </option>
                ))}
              </select>
            </div>
            <input
              id={id("telefono")}
              name="telefono"
              type="tel"
              required
              autoComplete="tel-national"
              inputMode="numeric"
              maxLength={16}
              className={`${box} min-w-0`}
              placeholder={selected.dial === "+52" ? "55 1234 5678" : "Número sin lada"}
              aria-describedby={id("telefono-hint")}
              onInput={clear}
              onChange={() => syncPhone()}
            />
          </div>
          <p id={id("telefono-hint")} className="mt-1 text-xs text-muted">
            {tenDigits(selected.dial) ? "10 dígitos, sin la lada." : "Tu número sin la lada del país."}
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label className={label} htmlFor={id("equipo_ventas")}>Tamaño de tu equipo de ventas</label>
          <select id={id("equipo_ventas")} name="equipo_ventas" required defaultValue="" className={`${field} invalid:text-muted`}>
            <option value="" disabled>Elige una opción</option>
            {EQUIPO.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="min-w-0">
          <label className={label} htmlFor={id("herramienta_actual")}>¿Con qué das seguimiento a tus clientes hoy?</label>
          <select id={id("herramienta_actual")} name="herramienta_actual" required defaultValue="" className={`${field} invalid:text-muted`}>
            <option value="" disabled>Elige una opción</option>
            {HERRAMIENTA.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="button" onClick={send} disabled={sending} data-cta={`${cta}-enviar`} className="btn btn-primary px-6 py-3.5 text-base disabled:opacity-70">
        {sending ? "Enviando…" : "Agendar mi demo"}
      </button>
      <p className="text-xs text-muted leading-relaxed">
        Al enviar eliges el horario de tu demo. Usamos tus datos solo para contactarte sobre root. Lee nuestro{" "}
        <Link href="/docs/aviso-de-privacidad/" className="underline underline-offset-2 hover:text-ink">aviso de privacidad</Link>.
      </p>
    </form>
  );
}
