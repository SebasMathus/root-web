import { FIT_POINTS, handoffSkill, numberFaq, priceFaq, START_FAQ } from "@/components/soluciones-fase2/common";
import { EscenaDental } from "@/components/soluciones-fase2/escena-dental";
import type { VerticalData } from "@/components/soluciones-fase2/types";
import { VerticalPage } from "@/components/soluciones-fase2/vertical-page";
import { pageMetadata } from "@/lib/seo";

/*
 * /soluciones/clinicas-dentales (fase 2, plan §3.3). Búsqueda principal: «crm dental»; variantes: «crm para
 * dentistas», «software para dentistas». Etapas, cadencia (día 1, 3, 7 y 30) y métrica principal: ficha 2.8 de
 * verticales-root.md (OPP-199). Agendar, recordatorios y cobranza se presentan como funciones (decisión del dueño);
 * la Receta y la cadencia, como concepto de cómo trabaja root, sin cifras de resultados.
 */

export const metadata = pageMetadata({
  title: "CRM dental para cerrar presupuestos por WhatsApp",
  description:
    "CRM dental con agentes de IA en WhatsApp: contesta a tus pacientes, da seguimiento a cada presupuesto de ortodoncia o implantes y recuerda limpiezas y pagos.",
  path: "/soluciones/clinicas-dentales",
  ownOgImage: true,
});

const DATA: VerticalData = {
  path: "/soluciones/clinicas-dentales",
  label: "Clínicas dentales",
  kicker: "Soluciones · Clínicas dentales",
  h1: "CRM dental para cerrar más presupuestos por WhatsApp",
  intro:
    "Tu agente contesta el «¿precio?» de tus anuncios, agenda la valoración y le da seguimiento a cada presupuesto. Tu equipo atiende a quien ya decidió. Tú ves qué presupuestos avanzan y cuáles se quedaron en visto.",
  heroNote: "Agentes de IA en los planes Pro y Enterprise · API oficial de WhatsApp Business · El número de tu clínica",
  cta: "sol-dentales",
  pains: {
    title: "Por qué un CRM para dentistas empieza en WhatsApp",
    intro: "El paciente ya te escribió. Lo difícil es lo que pasa después.",
    items: [
      {
        title: "¿Quién le dio seguimiento al presupuesto de implantes?",
        text: "Se entregó en consulta, el paciente dijo «lo pienso» y nadie volvió a escribirle. El presupuesto más grande es el que más fácil se olvida.",
        icon: "file",
        role: "alerta",
      },
      {
        title: "¿Cuántos «¿precio?» de tus anuncios se contestaron al día siguiente?",
        text: "Los mensajes llegan de noche y en fin de semana. Cuando recepción abre, el paciente ya cotizó en otra clínica.",
        icon: "clock",
        role: "alerta",
      },
      {
        title: "¿A quién le toca recordar la mensualidad de ortodoncia?",
        text: "Da pena recordar un pago vencido y la limpieza semestral se queda sin agendar. Nadie lo hace a tiempo porque nadie lo tiene en su lista.",
        icon: "money",
        role: "alerta",
      },
    ],
  },
  how: {
    title: "Cómo trabaja root en tu clínica dental",
    intro:
      "Tu agente atiende el WhatsApp de la clínica con tus precios de referencia, tus horarios y tu tono. Cuando el paciente está listo, pasa con tu equipo con todo el contexto.",
    items: [
      { title: "Responde", text: "Contesta en segundos los mensajes de tus anuncios, de día y de noche, con la información que tú apruebas.", icon: "bot", role: "agente" },
      { title: "Califica", text: "Pregunta qué tratamiento busca, si ya tiene valoración y cómo prefiere pagar, sin repetir lo que el paciente ya dijo.", icon: "target", role: "agente" },
      { title: "Agenda", text: "Propone horarios de valoración y deja la cita agendada, con recordatorio un día antes.", icon: "calendar", role: "agente" },
      { title: "Da seguimiento", text: "Le escribe al paciente después del presupuesto, en los días y horarios que tú defines, hasta que decide.", icon: "repeat", role: "agente" },
      { title: "Recuerda", text: "Avisa de la mensualidad de ortodoncia y de la limpieza semestral desde el número de la clínica.", icon: "clock", role: "agente" },
      handoffSkill("Cuando el paciente acepta o tiene una duda clínica, la conversación llega a recepción o a la doctora con el historial completo."),
    ],
  },
  recipe: {
    title: "Receta de seguimiento de presupuestos dentales",
    intro:
      "Una Receta es el punto de partida que armamos contigo para tu industria: etapas, preguntas y cadencia. Esta es la de una clínica dental; tú cambias lo que no te sirva.",
    stages: [
      { name: "Prospecto", lane: "agente" },
      { name: "Valoración agendada", lane: "agente" },
      { name: "Presupuesto entregado", lane: "equipo" },
      { name: "En seguimiento", lane: "agente" },
      { name: "Aceptado", lane: "equipo" },
      { name: "Plan de pagos", lane: "agente" },
      { name: "Mantenimiento", lane: "agente" },
    ],
    questions: [
      "¿Qué tratamiento te interesa: ortodoncia, implantes, limpieza u otro?",
      "¿Ya tienes una valoración o sería la primera vez?",
      "¿Tienes alguna molestia o dolor en este momento?",
      "¿Cómo prefieres pagar: contado, tarjeta o mensualidades?",
      "¿Qué días y horarios te acomodan?",
    ],
    cadenceTitle: "Cadencia después del presupuesto",
    cadence: [
      { when: "Día 1", label: "Seguimiento", message: "Hola Laura, ¿te quedó alguna duda del presupuesto?" },
      { when: "Día 3", label: "Formas de pago", message: "Te comparto las opciones de pago que maneja la clínica." },
      { when: "Día 7", label: "Agenda", message: "¿Te apartamos un horario para resolver dudas con la doctora?" },
      { when: "Día 30", label: "Rescate", message: "¿Retomamos tu tratamiento?" },
    ],
    cadenceNote:
      "Si el paciente contesta, la cadencia se detiene y la conversación pasa a tu equipo. Los días, los horarios y los mensajes los decides tú. Fuera de la ventana de 24 horas de WhatsApp, los mensajes salen con plantillas aprobadas por Meta.",
  },
  useCases: {
    title: "Casos de uso del CRM dental en WhatsApp",
    intro: "Empieza por el que más te duele y suma los demás cuando quieras.",
    items: [
      { title: "Seguimiento de presupuestos", text: "Cada presupuesto entra al embudo con su tratamiento y su doctor. El agente le da seguimiento hasta que el paciente decide.", icon: "file", role: "agente" },
      { title: "Anuncios que terminan en valoración", text: "El agente contesta los mensajes de tus campañas en WhatsApp e Instagram y agenda la valoración. Cada paciente entra con la campaña que lo trajo.", icon: "send", role: "agente" },
      { title: "Recordatorio de mensualidad", text: "Un mensaje amable antes de la fecha de pago de ortodoncia, desde el número de la clínica y con tus datos de pago.", icon: "money", role: "agente" },
      { title: "Limpieza semestral", text: "A los seis meses, el agente invita al paciente a su limpieza y le propone horarios.", icon: "calendar", role: "agente" },
      { title: "Tratamientos a medias", text: "Pacientes con un presupuesto viejo o un tratamiento sin terminar reciben un mensaje para retomarlo.", icon: "repeat", role: "agente" },
      { title: "Reseñas", text: "Al terminar el tratamiento, el agente le pide al paciente que te deje una reseña.", icon: "sparkle", role: "agente" },
    ],
  },
  metrics: {
    title: "Las métricas de tu CRM dental",
    intro: "Sin promedios de la industria: tus números, con tus pacientes y tus doctores.",
    items: [
      { name: "Presupuestos aceptados por doctor", text: "Qué parte de los presupuestos se acepta con cada doctor y en cada tratamiento." },
      { name: "Presupuestos en seguimiento", text: "Cuántos siguen abiertos y en qué toque de la cadencia van." },
      { name: "Tiempo de primera respuesta", text: "Cuánto tarda en contestarse un mensaje nuevo, también de noche." },
      { name: "Pacientes por campaña", text: "Qué anuncio trajo a cada paciente y cuántos llegaron a valoración." },
      { name: "Mensualidades al corriente", text: "Quién va al día y a quién le toca recordatorio." },
      { name: "Limpiezas agendadas", text: "Pacientes que regresaron a su mantenimiento." },
    ],
  },
  fit: {
    title: "root no reemplaza tu software para dentistas",
    text: "Tu expediente clínico, tu odontograma y tu agenda se quedan donde están. root vive en WhatsApp: contesta, da seguimiento y le avisa a tu equipo. Y si usas un CRM o un Excel, le manda los datos cuando pasa algo importante.",
    points: FIT_POINTS,
  },
  siblings: ["/soluciones/clinicas-esteticas", "/soluciones/consultorios-y-clinicas", "/soluciones/laboratorios-clinicos"],
  faq: [
    {
      q: "¿root es un software dental?",
      a: "No es un expediente clínico. Es un CRM de WhatsApp con agentes de IA: atiende a tus pacientes por WhatsApp, da seguimiento a los presupuestos y ordena a tus prospectos en un embudo. Tu software clínico sigue siendo tu expediente.",
    },
    {
      q: "¿El agente puede dar diagnósticos?",
      a: "No. El agente responde con la información que tú apruebas: precios de referencia, horarios, ubicación y formas de pago. Las dudas clínicas pasan a tu equipo con el historial de la conversación.",
    },
    {
      q: "¿Cómo funciona el seguimiento de presupuestos?",
      a: "Cada presupuesto entra a una etapa del embudo. El agente le escribe al paciente en los días que definas, por ejemplo 1, 3, 7 y 30, y se detiene en cuanto contesta para que tu equipo continúe.",
    },
    numberFaq("de tu clínica"),
    priceFaq("tu clínica"),
    START_FAQ,
  ],
  close: {
    title: "Que ningún presupuesto se quede en visto.",
    text: "Escríbenos por WhatsApp, cuéntanos cuántos presupuestos entregas al mes y te mostramos cómo se vería tu Receta.",
  },
};

export default function ClinicasDentalesPage() {
  return <VerticalPage data={DATA} scene={<EscenaDental />} />;
}
