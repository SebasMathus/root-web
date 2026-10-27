/**
 * Datos de competidores para las comparativas (equipo «comparativas»).
 * Fuente única: vambe.md y leadsales.md (barrido del 27-oct-2026), que citan las páginas públicas de abajo.
 * Regla (DESIGN.md §8): solo datos de sus páginas públicas, con enlace y la fecha de revisión visible.
 * Antes de cada publicación hay que volver a revisar precios: Leadsales marca «Última revisión: 2026-09-25».
 */
import { planById } from "@/lib/site";

export type Source = { label: string; href: string };

/** Páginas públicas de Vambe que citamos. */
export const VAMBE = {
  name: "Vambe",
  site: "https://www.vambe.ai/",
  src: {
    home: { label: "vambe.ai", href: "https://www.vambe.ai/" },
    pricing: { label: "Precios de Vambe", href: "https://www.vambe.ai/pricing" },
    core: { label: "Vambe: plataforma", href: "https://www.vambe.ai/platform/core" },
    ads: { label: "Vambe Ads", href: "https://www.vambe.ai/platform/ads" },
    security: { label: "Seguridad de Vambe", href: "https://www.vambe.ai/get/landings/seguridad" },
    contact: { label: "Contacto de Vambe (garantía)", href: "https://www.vambe.ai/contact" },
    tech: { label: "Actualizaciones de Vambe", href: "https://www.vambe.ai/tech-updates" },
    llms: { label: "Ficha de Vambe (llms.txt)", href: "https://www.vambe.ai/llms.txt" },
    salud: { label: "Vambe para salud", href: "https://www.vambe.ai/get/salud" },
    services: { label: "Consultoría de Vambe", href: "https://www.vambe.ai/services" },
    api: { label: "API de Vambe (documentación)", href: "https://docs.vambe.me/docs/quickstart" },
    crmBlog: {
      label: "Blog de Vambe sobre CRM para WhatsApp",
      href: "https://www.vambe.ai/reads/post/crm-para-whatsapp-que-es-que-debe-tener-y-cuando-no-basta",
    },
  },
} as const;

/** Páginas públicas de Leadsales que citamos. */
export const LEADSALES = {
  name: "Leadsales",
  site: "https://leadsales.io/",
  src: {
    home: { label: "leadsales.io", href: "https://leadsales.io/" },
    pricing: { label: "Precios de Leadsales", href: "https://leadsales.io/precios/" },
    agent: { label: "Agente de IA de Leadsales", href: "https://leadsales.io/agente-ia-whatsapp/" },
    api: { label: "WhatsApp API en Leadsales", href: "https://leadsales.io/whatsapp-api/" },
    escalation: {
      label: "Ayuda de Leadsales: cuándo escala a un humano",
      href: "https://help.leadsales.io/es/articles/15009242-cuando-y-como-lead-agent-escala-una-conversacion-con-un-humano",
    },
    consumption: {
      label: "Ayuda de Leadsales: costo y consumo del agente",
      href: "https://help.leadsales.io/es/articles/15984598-cuanto-cuesta-el-lead-agent-y-como-se-mide-su-consumo",
    },
    integrations: { label: "Ayuda de Leadsales: integraciones", href: "https://help.leadsales.io/es/collections/16269010-integraciones" },
    jobs: { label: "Vacantes de Leadsales", href: "https://leadsales.io/vacantes/" },
    trialBlog: { label: "Blog de Leadsales: alternativas a Vambe", href: "https://leadsales.io/blog/alternativas-a-vambe-ai/" },
  },
} as const;

/** Páginas públicas de root que respaldan lo que decimos de root. */
export const ROOT_SRC = {
  terms: { label: "Términos y condiciones de root", href: "/docs/terminos-y-condiciones/" },
  privacy: { label: "Aviso de privacidad de root", href: "/docs/aviso-de-privacidad/" },
  support: { label: "Soporte de root", href: "/docs/soporte/" },
};

/* ───────────── D8 · Costo por usuario al mes (plan §4 D8, MXN, revisión 27-oct-2026) ───────────── */

export type CostKey = "root" | "leadsales" | "vambe";

/** Cómo trata el IVA cada precio publicado. */
export type IvaRule =
  /** root: los Términos dicen «incluyen IVA cuando aplique»; la tarjeta no lo aclara. */
  | "terminos"
  /** El precio publicado ya trae IVA. */
  | "incluido"
  /** El precio publicado es sin IVA. */
  | "aparte";

export type CostBar = {
  key: CostKey;
  name: string;
  plan: string;
  /** Mensualidad del plan con IA, MXN, como se publica. */
  monthly: number;
  users: number;
  iva: IvaRule;
  ivaNote: string;
  notes: string[];
  sources: Source[];
};

const PRO = planById("pro");

export const COST_BARS: CostBar[] = [
  {
    key: "root",
    name: "root",
    plan: `${PRO.name} · IA incluida`,
    monthly: PRO.price ?? 10599,
    users: 10,
    iva: "terminos",
    ivaNote: "Nuestros Términos dicen que los precios incluyen IVA cuando aplique.",
    notes: [
      "10 usuarios y agentes de IA en el mismo plan.",
      "Límite de conversaciones de IA: por publicar.",
      "Mensajes de WhatsApp aparte, a tarifa oficial de Meta, sin sobreprecio.",
    ],
    sources: [ROOT_SRC.terms],
  },
  {
    key: "leadsales",
    name: "Leadsales",
    plan: "Profesional + agente Starter",
    monthly: 5359.2,
    users: 4,
    iva: "incluido",
    ivaNote: "Leadsales publica sus precios en MXN con IVA.",
    notes: [
      "Profesional ($3,239.88) más su agente de IA Starter ($2,119.32), que se contrata aparte.",
      "Starter: hasta 500 conversaciones al mes según su página del agente; unas 900 según su centro de ayuda. Al llegar al 100 % el agente se pausa.",
      "Incluye saldo de $10 USD al mes para mensajes de WhatsApp.",
    ],
    sources: [LEADSALES.src.pricing, LEADSALES.src.agent, LEADSALES.src.consumption],
  },
  {
    key: "vambe",
    name: "Vambe",
    plan: "Standard",
    monthly: 11480,
    users: 6,
    iva: "aparte",
    ivaNote: "Vambe aclara que sus precios en MXN no incluyen IVA.",
    notes: [
      "6 usuarios y 3,000 conversaciones al mes.",
      "Arranque: implementación de $12,000 el mes 1 y $6,000 el mes 2; la mensualidad completa empieza el mes 3.",
      "Mensajes de Meta aparte, según su blog.",
    ],
    sources: [VAMBE.src.pricing, VAMBE.src.crmBlog],
  },
];

export const IVA_RATE = 0.16;

/** «$1,059.90» (MXN). */
export const mxn = (n: number, decimals = 2) =>
  `$${n.toLocaleString("es-MX", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;

/** «$10,599» sin decimales cuando el número es entero. */
export const mxnSmart = (n: number) => mxn(n, Number.isInteger(Math.round(n * 100) / 100) ? 0 : 2);
