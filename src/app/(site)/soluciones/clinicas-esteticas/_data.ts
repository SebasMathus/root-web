import { planFaq, startFaq } from "@/components/soluciones/shared";
import type { Vertical } from "@/components/soluciones/types";

/*
 * Clínicas estéticas y de tratamientos de alto ticket (fase 1). Fuente: verticales-root.md §2.3 y plan §3.3.
 * La búsqueda en Google es baja («crm clinica estetica»): la página trabaja sobre todo como landing de pauta en Meta.
 * Datos de la escena: variante del plan D1 («¿precio de la depilación láser?», valoración el martes).
 */

export const SEO = {
  title: "CRM para clínicas estéticas con agentes de IA",
  description:
    "CRM para clínicas estéticas con agentes de IA en WhatsApp e Instagram: contestan cada «¿precio?» en segundos, agendan la valoración y siguen el retoque.",
  og: { kicker: "Soluciones · Clínicas estéticas", title: "Cada «¿precio?», una valoración agendada", sub: "CRM para clínicas estéticas con agentes de IA en WhatsApp e Instagram." },
};

export const vertical: Vertical = {
  path: "/soluciones/clinicas-esteticas",
  label: "Clínicas estéticas",
  ctaId: "soluciones-esteticas",
  kicker: "CRM para clínicas estéticas",
  h1: "CRM para clínicas estéticas: convierte cada «¿precio?» en una valoración agendada",
  intro:
    "Tu agente contesta en segundos los mensajes de tus anuncios en WhatsApp e Instagram con la información que aprobó tu clínica, pregunta qué tratamiento busca cada paciente, agenda la valoración y da seguimiento hasta el tratamiento y el retoque.",
  sceneCaption:
    "Ejemplo de una conversación de una clínica estética ficticia. Fernanda pregunta a las 20:15 el precio de la depilación láser; el agente de root contesta en 4 segundos y pregunta qué zona le interesa. Fernanda responde piernas y axilas, primera vez; la ficha se llena y el trato pasa a Calificado. El agente explica que el precio exacto se da en la valoración y propone el martes a las 17:00; Fernanda acepta, el trato pasa a Valoración agendada y la conversación llega a la Dra. Paredes con una nota de relevo.",
  scene: {
    business: "Clínica Aura Estética",
    contact: "Fernanda Ríos",
    origin: "Anuncio de Instagram · Láser",
    firstReply: "4 s",
    fields: [
      { key: "tratamiento", label: "Tratamiento", value: "Depilación láser" },
      { key: "zona", label: "Zona", value: "Piernas y axilas" },
      { key: "primera", label: "Primera vez", value: "Sí" },
      { key: "valoracion", label: "Valoración", value: "Martes 17:00" },
    ],
    stages: [
      { name: "Prospecto", lane: "agente" },
      { name: "Calificado", lane: "agente" },
      { name: "Valoración agendada", lane: "agente" },
      { name: "Tratamiento", lane: "equipo" },
      { name: "Retoque", lane: "agente" },
    ],
    messages: [
      { from: "cliente", time: "20:15", text: "Hola, ¿precio de la depilación láser?", fills: ["tratamiento"] },
      { from: "agente", time: "20:15", text: "¡Hola, Fernanda! Depende de la zona y de las sesiones. ¿Qué zona te interesa?" },
      { from: "cliente", time: "20:17", text: "Piernas completas y axilas. Nunca me lo he hecho", fills: ["zona", "primera"], stage: 1 },
      { from: "agente", time: "20:17", text: "El precio exacto te lo damos en la valoración. ¿Te queda el martes a las 17:00?" },
      { from: "cliente", time: "20:18", text: "Sí, el martes me queda", fills: ["valoracion"], stage: 2 },
      { from: "agente", time: "20:18", text: "Agendada con la Dra. Paredes. Te escribo el lunes para confirmar." },
    ],
    handoff: { to: "Dra. Paredes", stage: 2, note: "Depilación láser en piernas y axilas, primera vez. Valoración el martes a las 17:00. Viene de la campaña de Instagram." },
  },
  pains: {
    title: "¿Cuántos «¿precio?» se quedan sin respuesta?",
    intro: "Tus anuncios llenan el WhatsApp y el Instagram de la clínica. Lo difícil es que esas preguntas lleguen a valoración, y después a tratamiento.",
    items: [
      {
        icon: "chat",
        q: "¿Cuántos «¿precio?» contestas a tiempo?",
        text: "Llegan muchos mensajes con la misma pregunta. Si la respuesta tarda horas, la paciente ya agendó en otra clínica.",
      },
      {
        icon: "funnel",
        q: "¿Cuántas valoraciones terminan en tratamiento?",
        text: "La paciente viene, escucha el plan y se va a pensarlo. Sin seguimiento, el presupuesto se queda en el cajón.",
      },
      {
        icon: "repeat",
        q: "¿Tus pacientes vuelven a su retoque?",
        text: "Muchos tratamientos necesitan varias sesiones o mantenimiento. Si nadie les escribe a tiempo, la siguiente cita no se agenda.",
      },
    ],
  },
  how: {
    title: "Así trabaja un CRM para clínicas estéticas con agentes de IA",
    intro: "Tu agente atiende la parte comercial, del primer mensaje a la valoración. Lo clínico siempre lo atiende tu equipo.",
    steps: [
      { role: "agente", icon: "chat", title: "Responde", text: "Contesta en segundos en WhatsApp e Instagram con la información que tu clínica aprobó: tratamientos, zonas, sesiones y cómo se da el precio." },
      { role: "agente", icon: "target", title: "Califica", text: "Pregunta qué tratamiento busca, la zona y si es su primera vez. Lo anota en la ficha de la paciente." },
      { role: "agente", icon: "calendar", title: "Agenda la valoración", text: "Agenda la valoración en un horario disponible y manda el recordatorio antes de la cita." },
      { role: "equipo", icon: "handoff", title: "Pasa a tu equipo", text: "Tu equipo recibe la conversación con el historial y la campaña de la que vino. Con tu regla de pase, las preguntas médicas llegan a una persona de tu clínica." },
      { role: "agente", icon: "repeat", title: "Da seguimiento y reactiva", text: "Sigue los presupuestos de tratamiento, escribe cuando toca el retoque y reactiva a quien preguntó y no agendó." },
    ],
  },
  recipe: {
    title: "La Receta para clínicas estéticas de root",
    intro: "Del anuncio a la valoración, de la valoración al tratamiento y del tratamiento al retoque, por campaña.",
    stages: [
      { name: "Prospecto (por campaña)", lane: "agente" },
      { name: "Calificado", lane: "agente" },
      { name: "Valoración agendada", lane: "agente" },
      { name: "Tratamiento", lane: "equipo" },
      { name: "Mantenimiento o retoque", lane: "agente" },
    ],
    questions: [
      "¿Qué tratamiento te interesa?",
      "¿En qué zona del cuerpo o del rostro?",
      "¿Es tu primera vez con este tratamiento?",
      "¿Qué días y horarios te quedan para la valoración?",
    ],
    passRule: "Pasa a tu equipo cuando la paciente agenda su valoración, o en cuanto hace una pregunta médica.",
    cadence: [
      { day: "Día 1", text: "¿Te quedó alguna duda de tu plan de tratamiento?" },
      { day: "Día 3", text: "Te comparto cómo es una sesión, paso a paso." },
      { day: "Día 7", text: "¿Te apartamos un lugar para tu primera sesión?" },
      { day: "Día 30", text: "Ya toca tu siguiente sesión. ¿Te la agendo?" },
    ],
  },
  useCases: {
    title: "Qué resuelve root en una clínica estética",
    items: [
      { icon: "chat", role: "agente", title: "Respuesta inmediata a tus anuncios", text: "Cada mensaje de tus campañas en WhatsApp e Instagram recibe respuesta en segundos, a cualquier hora." },
      { icon: "calendar", role: "agente", title: "Agenda de valoraciones", text: "El agente propone horario, agenda la valoración y la recuerda antes de la cita." },
      { icon: "repeat", role: "agente", title: "Seguimiento de presupuestos", text: "Retoma a quien salió de la valoración sin agendar su tratamiento." },
      { icon: "clock", role: "agente", title: "Recordatorio de retoque", text: "Le escribe a cada paciente cuando toca su siguiente sesión o su mantenimiento." },
      { icon: "sparkle", role: "agente", title: "Reactivación de pacientes", text: "Vuelve a escribirles a quienes preguntaron y no agendaron, y a pacientes que no han regresado." },
      { icon: "chart", title: "Resultados por campaña", text: "Cada paciente entra con la campaña que la trajo: sabes qué anuncio llena tu agenda." },
    ],
  },
  metrics: {
    title: "Lo que vas a ver en el CRM de tu clínica",
    intro: "El embudo completo por campaña, del primer mensaje al retoque.",
    items: ["Prospectos por campaña", "Valoraciones agendadas", "De valoración a tratamiento", "Tiempo de primera respuesta", "Retoques y sesiones por agendar"],
  },
  systems: {
    title: "Junto a tu agenda y tu expediente",
    text: "No tienes que cambiar tu expediente clínico ni tu software de agenda: root atiende la conversación comercial, del primer «¿precio?» a la valoración. Se conecta con Salesforce, SAP, HubSpot y Excel; si usas otro sistema, cuéntanos cuál y revisamos tu caso.",
  },
  faq: {
    title: "Preguntas frecuentes sobre el CRM para clínicas estéticas",
    items: [
      {
        q: "¿El agente da los precios de los tratamientos?",
        a: "Da la información que tu clínica apruebe. Si prefieres que el precio exacto se dé en la valoración, el agente lo explica así y propone una cita. Tú decides qué responde y qué no.",
      },
      {
        q: "¿Qué pasa si una paciente hace una pregunta médica?",
        a: "Le indicas a tu agente que esas preguntas pasen a tu equipo. La conversación llega con todo el historial para que la responda una persona de tu clínica.",
      },
      {
        q: "¿Funciona con Instagram?",
        a: "Sí. WhatsApp e Instagram llegan a la misma bandeja, donde tu equipo y tus agentes atienden juntos, con el número y la cuenta de tu clínica.",
      },
      {
        q: "¿Puedo saber qué campaña trae más valoraciones?",
        a: "Sí. Cada prospecto entra con la campaña que lo trajo, así ves qué anuncios terminan en valoración y cuáles en tratamiento.",
      },
      planFaq(),
      startFaq(),
    ],
  },
  siblings: ["/soluciones/tiendas-en-redes", "/soluciones/inmobiliarias", "/soluciones/clinicas-dentales"],
  closing: {
    title: "Que ningún «¿precio?» se quede en visto.",
    text: "Escríbenos por WhatsApp y te mostramos cómo contestaría tu agente los mensajes de tus anuncios.",
  },
};
