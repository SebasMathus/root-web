import { planFaq, portfolioFaq, startFaq } from "@/components/soluciones/shared";
import type { Vertical } from "@/components/soluciones/types";

/*
 * Inmobiliarias (fase 1). Fuente: verticales-root.md §2.2 y plan §3.3 (búsqueda principal «crm inmobiliario»).
 * Datos de la escena: plan D1 (Mariana López, Narvarte, Infonavit, visita jueves 11:00, Andrés R.).
 */

export const SEO = {
  title: "CRM inmobiliario con agentes de IA en WhatsApp",
  description:
    "CRM inmobiliario con agentes de IA en WhatsApp: contestan en segundos cada lead de portales y Meta, califican por zona, presupuesto y crédito y agendan visitas.",
  og: { kicker: "Soluciones · Inmobiliarias", title: "CRM inmobiliario con agentes de IA", sub: "Cada lead de portal o de Meta, contestado en segundos, calificado y con la visita agendada." },
};

export const vertical: Vertical = {
  path: "/soluciones/inmobiliarias",
  label: "Inmobiliarias",
  ctaId: "soluciones-inmobiliarias",
  kicker: "CRM inmobiliario",
  h1: "CRM inmobiliario con agentes de IA que contestan, califican y agendan la visita",
  intro:
    "Cada lead de portal o de Meta recibe respuesta en segundos desde el número de tu inmobiliaria. Tu agente pregunta zona, presupuesto y forma de pago, agenda la visita y le pasa a tu asesor el prospecto con todo el historial.",
  sceneCaption:
    "Ejemplo de una conversación en WhatsApp de una inmobiliaria ficticia. Mariana escribe a las 22:41 por un departamento de 2 recámaras en Narvarte; el agente de root contesta en 6 segundos, pregunta si es compra o renta y su presupuesto, y anota en la ficha: compra, hasta 3.2 millones, crédito Infonavit. El trato pasa a Calificado. El agente propone una visita el jueves a las 11:00 con Andrés, Mariana acepta, el trato pasa a Visita agendada y la conversación llega a Andrés con una nota de relevo.",
  scene: {
    business: "Inmobiliaria Altavista",
    contact: "Mariana López",
    origin: "Anuncio de Meta · Narvarte",
    firstReply: "6 s",
    fields: [
      { key: "zona", label: "Zona", value: "Narvarte" },
      { key: "operacion", label: "Operación", value: "Compra" },
      { key: "presupuesto", label: "Presupuesto", value: "$3.2 M" },
      { key: "pago", label: "Forma de pago", value: "Crédito Infonavit" },
      { key: "visita", label: "Visita", value: "Jueves 11:00" },
    ],
    stages: [
      { name: "Lead nuevo", lane: "agente" },
      { name: "Calificado", lane: "agente" },
      { name: "Visita agendada", lane: "agente" },
      { name: "Visita realizada", lane: "equipo" },
      { name: "Cierre", lane: "equipo" },
    ],
    messages: [
      { from: "cliente", time: "22:41", text: "Hola, vi el depa de 2 recámaras en Narvarte, ¿sigue disponible?", fills: ["zona"] },
      { from: "agente", time: "22:41", text: "¡Hola, Mariana! Sí, sigue disponible. ¿Es para compra o renta, y qué presupuesto tienes?" },
      { from: "cliente", time: "22:43", text: "Compra, hasta 3.2 millones con mi crédito Infonavit", fills: ["operacion", "presupuesto", "pago"], stage: 1 },
      { from: "agente", time: "22:43", text: "Perfecto. ¿Te agendo una visita el jueves a las 11:00 con Andrés?" },
      { from: "cliente", time: "22:44", text: "Sí, ahí nos vemos", fills: ["visita"], stage: 2 },
      { from: "agente", time: "22:44", text: "¡Listo! Te mando la ubicación y un recordatorio el miércoles." },
    ],
    handoff: { to: "Andrés R.", stage: 2, note: "Compra en Narvarte, 2 recámaras, hasta $3.2 M con Infonavit. Visita el jueves a las 11:00." },
  },
  pains: {
    title: "¿Cuántos leads se te enfrían antes de que alguien conteste?",
    intro: "Pagas por cada lead de portal y de Meta. Lo que pasa en los primeros minutos decide si llega a visita.",
    items: [
      {
        icon: "clock",
        q: "¿Cuánto tarda tu equipo en contestar un lead?",
        text: "Los leads llegan de noche, en fin de semana y en plena visita. Si nadie contesta en minutos, le escriben a la siguiente inmobiliaria.",
      },
      {
        icon: "users",
        q: "¿De quién es la cartera cuando un asesor se va?",
        text: "Si cada asesor atiende desde su celular, los prospectos se van con él. Y nadie sabe qué se le prometió a quién.",
      },
      {
        icon: "calendar",
        q: "¿Cuántas visitas se caen sin aviso?",
        text: "Coordinar visitas con mensajes sueltos termina en citas olvidadas, cancelaciones de último minuto y asesores esperando en la puerta.",
      },
    ],
  },
  how: {
    title: "Así trabaja un CRM inmobiliario con agentes de IA",
    intro: "Tu agente atiende el primer tramo del embudo, a cualquier hora. Tus asesores entran cuando el prospecto ya está calificado y con visita.",
    steps: [
      {
        role: "agente",
        icon: "chat",
        title: "Responde",
        text: "Contesta en segundos cada lead de anuncios, portales o tu sitio, con la información que tú le das de cada propiedad.",
      },
      {
        role: "agente",
        icon: "target",
        title: "Califica",
        text: "Pregunta compra o renta, zona, presupuesto, forma de pago y plazo. Lo anota en la ficha del prospecto.",
      },
      {
        role: "agente",
        icon: "calendar",
        title: "Agenda la visita",
        text: "Propone horario, agenda la visita con el asesor que corresponde y manda el recordatorio antes de la cita.",
      },
      {
        role: "equipo",
        icon: "handoff",
        title: "Pasa al asesor",
        text: "Tu asesor recibe la conversación con todo el historial y una nota de relevo: quién es, qué busca y qué ya se le respondió.",
      },
      {
        role: "agente",
        icon: "repeat",
        title: "Da seguimiento y rescata",
        text: "Si el prospecto deja de contestar, retoma la conversación. Y reactiva a los leads de meses pasados que siguen buscando.",
      },
    ],
  },
  recipe: {
    title: "La Receta inmobiliaria de root",
    intro: "Etapas, preguntas y seguimiento pensados para vender y rentar inmuebles en México, listos para ajustar a tu forma de trabajar.",
    stages: [
      { name: "Lead nuevo (por fuente)", lane: "agente" },
      { name: "Calificado", lane: "agente" },
      { name: "Visita agendada", lane: "agente" },
      { name: "Visita realizada", lane: "equipo" },
      { name: "Cierre", lane: "equipo" },
    ],
    questions: [
      "¿Buscas comprar o rentar?",
      "¿En qué zona o colonia?",
      "¿Cuál es tu presupuesto?",
      "¿Cómo pagarías: Infonavit, Fovissste, crédito bancario o contado?",
      "¿Para cuándo te quieres cambiar?",
    ],
    passRule: "Pasa al asesor cuando el prospecto ya dio zona, presupuesto y forma de pago, y aceptó una visita.",
    cadence: [
      { day: "Día 1", text: "¿Te comparto más fotos o el recorrido del depa?" },
      { day: "Día 3", text: "Tenemos opciones parecidas en Narvarte y Del Valle. ¿Te las mando?" },
      { day: "Día 7", text: "¿Te agendo una visita este fin de semana?" },
      { day: "Día 30", text: "¿Sigues buscando? Entraron propiedades nuevas en tu zona." },
    ],
  },
  useCases: {
    title: "Qué resuelve root en una inmobiliaria",
    items: [
      { icon: "clock", role: "agente", title: "Primera respuesta a cualquier hora", text: "Los leads que pagaste reciben respuesta de noche y en fin de semana, cuando más se pierden." },
      { icon: "target", role: "agente", title: "Calificación por crédito y presupuesto", text: "Infonavit, Fovissste, bancario o contado: tu asesor sabe con quién habla antes de llamar." },
      { icon: "calendar", role: "agente", title: "Agenda y recordatorio de visitas", text: "El agente agenda la visita con el asesor y la recuerda antes, para que menos citas se caigan." },
      { icon: "handoff", role: "equipo", title: "Relevo al asesor con historial", text: "El asesor no repite preguntas: recibe la conversación completa y la nota de relevo." },
      { icon: "chart", title: "Leads por fuente", text: "Cada prospecto entra con la campaña que lo trajo, para saber qué anuncio sí llega a visita." },
      { icon: "building", title: "La cartera se queda en la inmobiliaria", text: "Todo pasa por el número de la empresa. Si un asesor se va, sus conversaciones se quedan y se reasignan." },
    ],
  },
  metrics: {
    title: "Lo que vas a ver en tu CRM inmobiliario",
    intro: "Un tablero por fuente y por asesor, sin perseguir a nadie por WhatsApp.",
    items: ["Leads por fuente y por campaña", "Tiempo de primera respuesta", "Prospectos calificados", "Visitas agendadas y visitas realizadas", "Tiempo de respuesta por asesor"],
  },
  systems: {
    title: "Complementa tu sistema inmobiliario",
    text: "Si ya llevas tu inventario en otro sistema, no tienes que cambiarlo: root atiende la conversación en WhatsApp y le pasa a tu equipo el prospecto calificado. Se conecta con Salesforce, SAP, HubSpot y Excel; si usas otro sistema, cuéntanos cuál y revisamos tu caso.",
  },
  faq: {
    title: "Preguntas frecuentes sobre el CRM inmobiliario",
    items: [
      {
        q: "¿Tengo que dejar mi sistema de inventario para usar root?",
        a: "No. Con root, tu agente atiende WhatsApp, califica y lleva el embudo de cada lead; tu inventario puede seguir donde está. Hoy se conecta con Salesforce, SAP, HubSpot y Excel. Si usas otro sistema, cuéntanos cuál y revisamos tu caso.",
      },
      {
        q: "¿El agente puede preguntar por crédito Infonavit o Fovissste?",
        a: "Sí. Tu agente califica con las preguntas de tu inmobiliaria: compra o renta, zona, presupuesto, forma de pago y plazo. Tú decides qué pregunta, en qué orden y con qué tono.",
      },
      {
        q: "¿Qué pasa con los leads que llegan de noche o en fin de semana?",
        a: "El agente los contesta en segundos, a cualquier hora, desde el número de tu inmobiliaria. Tu asesor los encuentra en la mañana ya calificados y, si aceptaron, con la visita agendada.",
      },
      portfolioFaq("un asesor", "la inmobiliaria"),
      planFaq(),
      startFaq(),
    ],
  },
  siblings: ["/soluciones/agencias-de-autos", "/soluciones/clinicas-esteticas", "/soluciones/tiendas-en-redes"],
  closing: {
    title: "Que ningún lead de tu inmobiliaria se quede en visto.",
    text: "Escríbenos por WhatsApp: cuéntanos cuántos leads te llegan al mes y te mostramos cómo los atendería tu agente.",
  },
};
