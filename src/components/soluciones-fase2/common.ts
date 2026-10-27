import type { FaqItem, Feature } from "@/components/ui";
import { planById, PRICING_FACTS } from "@/lib/site";

/*
 * Textos que se repiten en las cuatro páginas de fase 2. Todos salen de lo que root puede afirmar
 * (DESIGN.md › Qué afirmar): precios de lib/site, API oficial, arranque «la mayoría», Meta sin sobreprecio.
 */

const pro = planById("pro");

/** Pregunta de precio. `who` = «tu clínica», «tu financiera»… */
export function priceFaq(who: string): FaqItem {
  return {
    q: "¿Cuánto cuesta root?",
    a: `Los agentes de IA vienen en el plan ${pro.name}: ${pro.priceLabel} ${pro.period}, con ${pro.users}. Si ${who} necesita más usuarios o una IA a la medida, Enterprise se cotiza. ${PRICING_FACTS.meta}`,
  };
}

/** Pregunta de arranque (nunca como garantía). */
export const START_FAQ: FaqItem = {
  q: "¿Cuánto tarda en estar listo?",
  a: `La mayoría de los equipos opera en menos de una semana. En el arranque configuramos tu agente con tu información y tus preguntas, migramos tus contactos y conectamos tus sistemas. ${PRICING_FACTS.api}`,
};

/** Pregunta del número de la empresa. `whose` = «de tu clínica»… */
export function numberFaq(whose: string): FaqItem {
  return {
    q: `¿Los mensajes salen del WhatsApp ${whose}?`,
    a: `Sí. root usa la API oficial de WhatsApp Business con el número ${whose}, no con celulares personales. Si alguien de tu equipo se va, las conversaciones y el historial se quedan contigo. ${PRICING_FACTS.api}`,
  };
}

/** Lo que root conecta con el sistema que ya usa la industria (solo integraciones con respaldo). */
export const FIT_POINTS = [
  "Acciones conectadas: cuando pasa algo importante en root, se refleja en tu CRM, ERP o Excel",
  "Integraciones con Salesforce, HubSpot, SAP y Excel",
  "Contactos, conversaciones y seguimientos en un solo lugar",
  "Conversaciones en el número de tu empresa, no en celulares personales",
];

/** Habilidad «Pasar al equipo» (carril del equipo), con el texto de cada industria. */
export function handoffSkill(text: string): Feature {
  return { title: "Pasa a tu equipo", text, icon: "handoff", role: "equipo" };
}
