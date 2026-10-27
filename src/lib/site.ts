/**
 * Datos globales del sitio de root. Fuente de cada dato: plan §6.1 y root-actual.md (ver DESIGN.md › Qué afirmar).
 * Cambiar algo aquí lo cambia en todo el sitio (CTA, pie, datos estructurados, precios).
 */

// `||`: en CI la variable puede llegar vacía (no indefinida).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://goroot.ai").replace(/\/$/, "");
export const SITE_NAME = "root";
export const LOCALE = "es_MX";

/** Categoría, lema y frase guía (plan §1.3 y §2.3). */
export const CATEGORY = "CRM de WhatsApp con agentes de IA";
export const TAGLINE = "Que nadie se quede en visto.";
export const GUIDE_PHRASE = "Tu agente contesta y califica. Tu equipo cierra. Tú ves todo.";
export const DEFAULT_DESCRIPTION =
  "root es el CRM de WhatsApp con agentes de IA para equipos de ventas en México: contestan en segundos, califican y dan seguimiento desde el número de tu empresa.";

/** Empresa que hace root. */
export const PARENT = { name: "Nextia", url: "https://nextia.mx" };

/** Acceso a la plataforma (no es un CTA de venta). */
export const APP_LOGIN_URL = "https://app.goroot.ai/";

export const CONTACT_EMAIL = "sebastian@goroot.ai";

export const ADDRESS = {
  street: "C. Montes Urales 424, Lomas - Virreyes, Lomas de Chapultepec V Secc.",
  locality: "Miguel Hidalgo",
  region: "Ciudad de México",
  postalCode: "11000",
  country: "MX",
};
export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.postalCode}, ${ADDRESS.region}`;

/** Horario de soporte publicado (/docs/soporte). El 24/7 es solo de Enterprise. */
export const SUPPORT_HOURS = "Lunes a viernes de 9:00 a 18:00 h (Ciudad de México). Respondemos en menos de 24 horas hábiles.";

/* ───────────── WhatsApp: TODOS los CTA del sitio abren esta línea ───────────── */

/** Línea de ventas actual de root. Los enlaces wa.me/message no aceptan texto precargado. */
export const WHATSAPP_URL = "https://wa.me/message/BBFVGPKQADOPP1";
export const CTA_LABEL = "Escríbenos por WhatsApp";

/* ───────────── Precios (plan §6.1, goroot.ai#pricing, revisados el 27-oct-2026) ───────────── */

export type Plan = {
  id: "basico" | "pro" | "enterprise";
  name: string;
  /** Para quién es. */
  audience: string;
  /** Precio mensual en MXN; null = a convenir. */
  price: number | null;
  /** Texto del precio tal como se muestra. */
  priceLabel: string;
  period: string;
  users: string;
  /** Trae agentes de IA (automatizaciones con IA). */
  ai: boolean;
  highlight?: string;
  includes: string[];
  excludes: string[];
};

export const PLANS: Plan[] = [
  {
    id: "basico",
    name: "Básico",
    audience: "PyMEs y startups",
    price: 4999,
    priceLabel: "$4,999",
    period: "MXN al mes",
    users: "3 usuarios",
    ai: false,
    includes: ["3 usuarios", "API oficial de WhatsApp Business", "CRM básico", "Automatizaciones simples", "Soporte por correo"],
    excludes: ["Agentes de IA", "Integraciones avanzadas", "IA personalizada"],
  },
  {
    id: "pro",
    name: "Pro",
    audience: "Equipos en crecimiento",
    price: 10599,
    priceLabel: "$10,599",
    period: "MXN al mes",
    users: "10 usuarios",
    ai: true,
    // goroot.ai lo marca «Más popular», sin datos detrás: aquí se destaca por lo que trae, no por popularidad.
    highlight: "Con agentes de IA",
    includes: [
      "10 usuarios",
      "API oficial de WhatsApp Business",
      "CRM completo",
      "Agentes de IA (automatizaciones con IA)",
      "Integraciones avanzadas",
      "Soporte prioritario",
    ],
    excludes: ["IA personalizada"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Grandes operaciones",
    price: null,
    priceLabel: "Precio a convenir",
    period: "",
    // La fuente dice «usuarios ilimitados»; el sitio no usa «ilimitado» (DESIGN.md › Qué no afirmar).
    users: "Usuarios a la medida",
    ai: true,
    includes: [
      "Usuarios a la medida de tu operación",
      "API oficial de WhatsApp Business",
      "CRM completo",
      "Agentes de IA (automatizaciones con IA)",
      "Integraciones avanzadas",
      "IA personalizada",
      "Soporte dedicado 24/7",
    ],
    excludes: [],
  },
];

export const planById = (id: Plan["id"]) => PLANS.find((p) => p.id === id)!;

/** «Desde $4,999 MXN al mes». */
export const PRICE_FROM = `Desde ${PLANS[0].priceLabel} MXN al mes`;

/** Lo que se puede decir del cobro (Términos y FAQ sembrada). La leyenda de IVA de la tarjeta sigue pendiente. */
export const PRICING_FACTS = {
  meta: "Los mensajes de WhatsApp se pagan aparte, a la tarifa oficial de Meta, sin sobreprecio de root.",
  api: "Te ayudamos a tramitar la API oficial de WhatsApp Business durante el arranque, sin costo extra.",
  billing: "Facturación mensual en pesos mexicanos.",
  iva: "Según nuestros Términos, los precios están en MXN e incluyen IVA cuando aplique.",
  cancel: "Cancelas cuando quieras: la cancelación aplica al final del periodo que ya pagaste.",
  changes: "Si un precio cambia, te avisamos con 30 días de anticipación.",
  users: "Puedes agregar usuarios o subir de plan cuando lo necesites.",
  start: "La mayoría de los equipos opera en menos de una semana: configuración, migración de contactos e integración.",
};

/** Fecha de revisión de los datos de competidores (vambe.md y leadsales.md). Visible en comparativas. */
export const COMPETITOR_REVIEW_DATE = "2026-10-27";
export const COMPETITOR_REVIEW_LABEL = "27 de octubre de 2026";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`}`;
}
