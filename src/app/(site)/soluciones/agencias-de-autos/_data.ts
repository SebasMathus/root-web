import { planFaq, portfolioFaq, startFaq } from "@/components/soluciones/shared";
import type { Vertical } from "@/components/soluciones/types";

/*
 * Agencias de autos y lotes de seminuevos (fase 1). Fuente: verticales-root.md §2.6 y plan §3.3 (búsqueda principal
 * «crm automotriz»). Datos de la escena: variante de autos del plan D1 (Aveo 2022, enganche de $40,000, prueba de
 * manejo el sábado).
 */

export const SEO = {
  title: "CRM automotriz con agentes de IA para WhatsApp",
  description:
    "CRM automotriz con agentes de IA para WhatsApp: contestan cada «¿sigue disponible?» en segundos, califican crédito y enganche y agendan la prueba de manejo.",
  og: { kicker: "Soluciones · Agencias de autos", title: "CRM automotriz con agentes de IA", sub: "Que ningún prospecto se quede sin respuesta: del «¿sigue disponible?» a la prueba de manejo." },
};

export const vertical: Vertical = {
  path: "/soluciones/agencias-de-autos",
  label: "Agencias de autos",
  ctaId: "soluciones-autos",
  kicker: "CRM automotriz",
  h1: "CRM automotriz para que ningún prospecto se quede sin respuesta",
  intro:
    "Tu agente contesta en segundos los mensajes de tus anuncios y de WhatsApp, pregunta modelo, crédito, enganche y auto a cuenta, agenda la prueba de manejo y le pasa el prospecto al asesor con todo el historial.",
  sceneCaption:
    "Ejemplo de una conversación en WhatsApp de una agencia ficticia. Carlos pregunta a las 21:07 si sigue disponible el Aveo 2022; el agente de root contesta en 5 segundos y pregunta si lo pagaría de contado o a crédito. Carlos responde que a crédito, con 40 mil de enganche y un Versa 2017 a cuenta; la ficha se llena y el trato pasa a Calificado. El agente agenda la prueba de manejo el sábado a las 10:00 con Daniela, el trato pasa a Prueba agendada y la conversación llega a Daniela con una nota de relevo.",
  scene: {
    business: "Seminuevos del Norte",
    contact: "Carlos Méndez",
    origin: "Anuncio de Meta · Aveo 2022",
    firstReply: "5 s",
    fields: [
      { key: "modelo", label: "Modelo", value: "Aveo 2022" },
      { key: "pago", label: "Pago", value: "Crédito" },
      { key: "enganche", label: "Enganche", value: "$40,000" },
      { key: "cuenta", label: "Auto a cuenta", value: "Versa 2017" },
      { key: "prueba", label: "Prueba de manejo", value: "Sábado 10:00" },
    ],
    stages: [
      { name: "Lead", lane: "agente" },
      { name: "Calificado", lane: "agente" },
      { name: "Prueba agendada", lane: "agente" },
      { name: "Con asesor", lane: "equipo" },
      { name: "Crédito o cierre", lane: "equipo" },
    ],
    messages: [
      { from: "cliente", time: "21:07", text: "¿Sigue disponible el Aveo 2022?", fills: ["modelo"] },
      { from: "agente", time: "21:07", text: "¡Hola, Carlos! Sí, sigue disponible. ¿Lo pagarías de contado o a crédito?" },
      { from: "cliente", time: "21:09", text: "A crédito. Tengo 40 mil de enganche y dejo mi Versa 2017 a cuenta", fills: ["pago", "enganche", "cuenta"], stage: 1 },
      { from: "agente", time: "21:09", text: "Va. ¿Te agendo la prueba de manejo el sábado a las 10:00 con Daniela?" },
      { from: "cliente", time: "21:10", text: "Sí, el sábado", fills: ["prueba"], stage: 2 },
      { from: "agente", time: "21:10", text: "Listo. Trae tu INE y la factura del Versa para valuarlo." },
    ],
    handoff: { to: "Daniela S.", stage: 3, note: "Aveo 2022 a crédito, $40,000 de enganche y Versa 2017 a cuenta. Prueba de manejo el sábado a las 10:00." },
  },
  pains: {
    title: "¿Cuántos «¿sigue disponible?» se quedan sin contestar?",
    intro: "Quien busca auto le escribe a varias agencias a la vez. La que contesta primero, y bien, se queda con la prueba de manejo.",
    items: [
      {
        icon: "clock",
        q: "¿Quién contesta el mensaje del sábado en la noche?",
        text: "Los prospectos de anuncios escriben a cualquier hora. Si la respuesta llega el lunes, ya están negociando en otra agencia.",
      },
      {
        icon: "funnel",
        q: "¿En qué va cada prueba de manejo y cada crédito?",
        text: "Entre la cotización, la prueba de manejo y la aprobación del crédito pasan semanas. Sin seguimiento, el prospecto se enfría o compra en otro lado.",
      },
      {
        icon: "phone",
        q: "¿Tus vendedores se llevan clientes a su WhatsApp personal?",
        text: "Cuando cada asesor vende desde su celular, la agencia no ve las conversaciones. Y si el asesor se va, los clientes se van con él.",
      },
    ],
  },
  how: {
    title: "Así trabaja un CRM automotriz con agentes de IA",
    intro: "El agente contesta, califica y agenda. Tus asesores reciben prospectos con prueba de manejo y con la información para cotizar.",
    steps: [
      { role: "agente", icon: "chat", title: "Responde", text: "Contesta en segundos con la información del auto que tú le das: versión, kilometraje, precio y disponibilidad." },
      { role: "agente", icon: "target", title: "Califica", text: "Pregunta modelo, contado o crédito, enganche y si deja un auto a cuenta. Lo anota en la ficha del prospecto." },
      { role: "agente", icon: "calendar", title: "Agenda la prueba", text: "Agenda la prueba de manejo con el asesor que corresponde y manda el recordatorio antes de la cita." },
      { role: "equipo", icon: "handoff", title: "Pasa al asesor", text: "El asesor recibe la conversación con todo el historial y una nota de relevo, para cotizar sin repetir preguntas." },
      { role: "agente", icon: "repeat", title: "Da seguimiento y reactiva", text: "Retoma las cotizaciones que se quedaron en pausa y reactiva a quienes cotizaron en los últimos meses." },
    ],
  },
  recipe: {
    title: "La Receta automotriz de root",
    intro: "Etapas, preguntas y seguimiento para agencias de nuevos, seminuevos y lotes, listos para ajustar a tu operación.",
    stages: [
      { name: "Lead", lane: "agente" },
      { name: "Calificado", lane: "agente" },
      { name: "Prueba de manejo agendada", lane: "agente" },
      { name: "Asignado a asesor", lane: "equipo" },
      { name: "Crédito o cierre", lane: "equipo" },
    ],
    questions: [
      "¿Qué modelo y versión te interesa?",
      "¿Lo pagarías de contado o a crédito?",
      "¿Con cuánto de enganche cuentas?",
      "¿Dejarías un auto a cuenta? ¿Cuál y de qué año?",
      "¿Cuándo puedes venir a la prueba de manejo?",
    ],
    passRule: "Pasa al asesor cuando el prospecto ya dio modelo, forma de pago y enganche, o en cuanto agenda la prueba de manejo.",
    cadence: [
      { day: "Día 1", text: "¿Te mando la cotización con mensualidades a 36 y 48 meses?" },
      { day: "Día 3", text: "Llegó otra unidad parecida con menos kilometraje. ¿Te paso fotos?" },
      { day: "Día 7", text: "¿Te agendo la prueba de manejo este sábado?" },
      { day: "Día 30", text: "¿Sigues buscando auto? Tenemos unidades nuevas en tu rango." },
    ],
  },
  useCases: {
    title: "Qué resuelve root en una agencia de autos",
    items: [
      { icon: "chat", role: "agente", title: "Respuesta al «¿sigue disponible?»", text: "Con los datos del auto que tú le das, a cualquier hora y desde el número de la agencia." },
      { icon: "money", role: "agente", title: "Calificación de crédito y enganche", text: "Tu asesor sabe si viene de contado, a crédito o con auto a cuenta antes de llamar." },
      { icon: "calendar", role: "agente", title: "Agenda de prueba de manejo", text: "El agente propone horario, agenda la prueba y la recuerda un día antes." },
      { icon: "handoff", role: "equipo", title: "Relevo al asesor con historial", text: "La conversación completa y la nota de relevo llegan al asesor que va a cerrar." },
      { icon: "repeat", role: "agente", title: "Reactivación de cotizaciones", text: "Retoma a quienes cotizaron y no compraron en los últimos meses." },
      { icon: "tool", title: "Posventa por WhatsApp", text: "Un embudo de posventa para dar seguimiento a citas de servicio y mantenimiento desde el número de la agencia." },
    ],
  },
  metrics: {
    title: "Lo que vas a ver en tu CRM automotriz",
    intro: "Quién contesta, qué tan rápido y qué campaña trae ventas, por vendedor.",
    items: ["Tiempo de respuesta por vendedor", "Conversión por vendedor", "Prospectos y ventas por campaña", "Pruebas de manejo agendadas", "Cotizaciones en seguimiento"],
  },
  systems: {
    title: "Se conecta con el sistema de tu agencia",
    text: "Además de llevar tu embudo, root se conecta con Salesforce, SAP, HubSpot y Excel, y dispara acciones cuando pasa algo clave: por ejemplo, un trato ganado crea el registro en tu sistema. Si usas otro sistema en la agencia, cuéntanos cuál y revisamos tu caso.",
  },
  faq: {
    title: "Preguntas frecuentes sobre el CRM automotriz",
    items: [
      {
        q: "¿El agente puede dar precio y disponibilidad de cada auto?",
        a: "Sí, con la información que tú le das: versiones, kilometraje, precio y disponibilidad. Y le indicas que, si le preguntan algo que no está en esa información, le pase la conversación a un asesor.",
      },
      {
        q: "¿Puede calificar por crédito, enganche y auto a cuenta?",
        a: "Sí. Tu agente hace las preguntas de tu agencia (modelo, contado o crédito, enganche, auto a cuenta) y las deja en la ficha del prospecto para que el asesor cotice con todo a la mano.",
      },
      {
        q: "¿Sirve para seminuevos y lotes de autos?",
        a: "Sí. La Receta se ajusta a tu forma de vender: agencia de nuevos, seminuevos o lote. Cambias etapas, preguntas y seguimiento según tu operación.",
      },
      portfolioFaq("un vendedor", "la agencia"),
      planFaq(),
      startFaq(),
    ],
  },
  siblings: ["/soluciones/inmobiliarias", "/soluciones/tiendas-en-redes", "/soluciones/clinicas-esteticas"],
  closing: {
    title: "Que ningún prospecto de tu agencia se quede en visto.",
    text: "Escríbenos por WhatsApp y te mostramos cómo contestaría tu agente un «¿sigue disponible?» de tu inventario.",
  },
};
