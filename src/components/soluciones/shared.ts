import type { FaqItem } from "@/components/ui";
import { planById, PRICING_FACTS } from "@/lib/site";

/*
 * Piezas de contenido que se repiten en todas las páginas de Soluciones (fase 1 y fase 2).
 * Todo sale de lib/site.ts, así que un cambio de precio o de condiciones se refleja en todas.
 */

/** Ícono de cada industria (menús, tarjetas del índice y páginas hermanas). */
export const SOLUTION_ICONS: Record<string, string> = {
  "/soluciones/inmobiliarias": "home",
  "/soluciones/agencias-de-autos": "car",
  "/soluciones/clinicas-esteticas": "face",
  "/soluciones/tiendas-en-redes": "bag",
  "/soluciones/clinicas-dentales": "tooth",
  "/soluciones/consultorios-y-clinicas": "stethoscope",
  "/soluciones/financieras-y-sofom": "bank",
  "/soluciones/laboratorios-clinicos": "flask",
};

/** Íconos de las páginas que se enlazan desde Soluciones (industrias + producto). */
export const PAGE_ICONS: Record<string, string> = {
  ...SOLUTION_ICONS,
  "/producto/agentes-de-ia": "bot",
  "/producto/bandeja-de-whatsapp": "inbox",
  "/producto/crm-y-embudos": "kanban",
  "/producto/campanas-y-seguimiento": "repeat",
  "/producto/integraciones": "plug",
  "/precios": "money",
};

const pro = planById("pro");
const basico = planById("basico");

/** «Los agentes de IA vienen en Pro ($10,599 MXN al mes, 10 usuarios) y Enterprise…». */
export const PLAN_AI_TEXT = `Los agentes de IA vienen en el plan Pro (${pro.priceLabel} ${pro.period}, ${pro.users}) y en Enterprise. El plan Básico (${basico.priceLabel} ${basico.period}) incluye la API oficial de WhatsApp Business y el CRM, sin agentes de IA.`;

/** Línea de condiciones bajo el precio: mensajes de Meta y cancelación. */
export const PLAN_TERMS = [PRICING_FACTS.meta, PRICING_FACTS.cancel];

/** Nota bajo el hero de cada vertical: solo hechos verificables. */
export const HERO_NOTE = "Agentes de IA en los planes Pro y Enterprise · API oficial de WhatsApp Business · Precios en pesos";

/** Pregunta estándar: en qué plan vienen los agentes. */
export const planFaq = (): FaqItem => ({
  q: "¿En qué plan vienen los agentes de IA?",
  a: `${PLAN_AI_TEXT} ${PRICING_FACTS.meta}`,
});

/** Pregunta estándar: cuánto tarda el arranque (nunca como garantía). */
export const startFaq = (): FaqItem => ({
  q: "¿Cuánto tarda en estar listo?",
  a: "La mayoría de los equipos opera en menos de una semana. En ese tiempo te ayudamos con el trámite de la API oficial de WhatsApp Business sin costo extra, configuramos tu agente con tus preguntas y tus respuestas, migramos tus contactos y conectamos tus sistemas.",
});

/** Pregunta estándar: qué pasa con la cartera si alguien del equipo se va (Línea de empresa). */
export const portfolioFaq = (who: string, where: string): FaqItem => ({
  q: `¿Qué pasa con la cartera si ${who} se va?`,
  a: `Se queda en ${where}. Todas las conversaciones pasan por el número de la empresa y quedan en la bandeja compartida con su historial, listas para reasignarse a otra persona del equipo.`,
});
