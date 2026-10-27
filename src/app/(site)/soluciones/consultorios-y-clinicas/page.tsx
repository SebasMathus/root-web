import { FIT_POINTS, handoffSkill, numberFaq, priceFaq, START_FAQ } from "@/components/soluciones-fase2/common";
import { EscenaConsultorios } from "@/components/soluciones-fase2/escena-consultorios";
import type { VerticalData } from "@/components/soluciones-fase2/types";
import { VerticalPage } from "@/components/soluciones-fase2/vertical-page";
import { pageMetadata } from "@/lib/seo";
import { PRICING_FACTS } from "@/lib/site";

/*
 * /soluciones/consultorios-y-clinicas (fase 2, plan §3.3). Búsqueda principal: «agenda de citas médicas»;
 * variantes: «software para clínicas», «recordatorios de citas». Público: clínicas de varios médicos (alerta de
 * OPP-188). Embudo y métrica principal (inasistencias por semana): ficha 2.7 de verticales-root.md. root complementa
 * el software de agenda o expediente; no lo sustituye.
 */

export const metadata = pageMetadata({
  title: "Agenda de citas médicas por WhatsApp para clínicas",
  description:
    "Agenda de citas médicas por WhatsApp con agentes de IA: confirma cada cita un día antes, reagenda sin llamadas y ofrece los horarios libres a otros pacientes.",
  path: "/soluciones/consultorios-y-clinicas",
  ownOgImage: true,
});

const DATA: VerticalData = {
  path: "/soluciones/consultorios-y-clinicas",
  label: "Consultorios y clínicas",
  kicker: "Soluciones · Consultorios y clínicas",
  h1: "Agenda de citas médicas por WhatsApp: confirma, reagenda y llena huecos",
  intro:
    "Tu agente confirma cada cita un día antes, cambia la fecha cuando el paciente no puede y le ofrece el horario libre a quien quería adelantar la suya. Tu recepción deja de llamar uno por uno.",
  heroNote: "Pensado para clínicas con varios médicos · Agentes de IA en los planes Pro y Enterprise · API oficial de WhatsApp Business",
  cta: "sol-consultorios",
  pains: {
    title: "Sin recordatorios de citas por WhatsApp, la agenda se vacía sola",
    intro: "Una cita que no llega es un horario que nadie más pudo usar.",
    items: [
      {
        title: "¿Cuántos pacientes no llegaron esta semana, ni avisaron?",
        text: "Cada falta es un horario perdido para el médico y para otro paciente que sí quería venir.",
        icon: "clock",
        role: "alerta",
      },
      {
        title: "¿Cuántas horas pasa tu recepción llamando para confirmar?",
        text: "Llamadas que nadie contesta, mensajes desde el celular de la asistente y una lista en papel que no ve nadie más.",
        icon: "phone",
        role: "alerta",
      },
      {
        title: "¿Quién contesta cuando un paciente pide cita a las 11 de la noche?",
        text: "Nadie. Al día siguiente ese paciente ya agendó en otro lado.",
        icon: "chat",
        role: "alerta",
      },
    ],
  },
  how: {
    title: "Cómo trabaja root en tu clínica o consultorio",
    intro: "Tu agente atiende el WhatsApp de la clínica con los horarios de cada médico, tus indicaciones y tu tono. Lo clínico siempre lo ve tu equipo.",
    items: [
      { title: "Responde", text: "Atiende a pacientes nuevos de día y de noche: ubicación, especialidades, horarios y lo que tú apruebes.", icon: "bot", role: "agente" },
      { title: "Agenda", text: "Pregunta con qué médico y en qué horario, y deja la cita agendada.", icon: "calendar", role: "agente" },
      { title: "Confirma", text: "Un día antes pide confirmación por WhatsApp. Tu recepción ve en root quién ya confirmó.", icon: "check", role: "agente" },
      { title: "Reagenda", text: "Si el paciente no puede, le ofrece otra fecha en la misma conversación, sin que recepción tenga que llamar.", icon: "repeat", role: "agente" },
      { title: "Llena huecos", text: "Cuando se libera un horario, se lo ofrece a pacientes que pidieron una cita antes.", icon: "users", role: "agente" },
      handoffSkill("Urgencias, dudas médicas y casos especiales llegan a recepción o al médico con el historial completo."),
    ],
  },
  recipe: {
    title: "Receta de confirmación y reagenda de citas",
    intro:
      "Una Receta es el punto de partida que armamos contigo para tu industria: etapas, preguntas y cadencia. Esta es la de una clínica con varios médicos; tú cambias lo que no te sirva.",
    stages: [
      { name: "Solicitud de cita", lane: "agente" },
      { name: "Agendada", lane: "agente" },
      { name: "Confirmada o reagendada", lane: "agente" },
      { name: "En consulta", lane: "equipo" },
      { name: "Asistió", lane: "equipo" },
      { name: "Próxima cita", lane: "agente" },
    ],
    questions: [
      "¿Con qué médico o especialidad buscas cita?",
      "¿Es tu primera consulta o ya eres paciente?",
      "¿Qué días y horarios te acomodan?",
      "¿Tienes alguna molestia urgente?",
      "¿Te avisamos si se libera un lugar antes?",
    ],
    cadenceTitle: "Cadencia alrededor de la cita",
    cadence: [
      { when: "Al agendar", label: "Confirmación", message: "Listo, quedó tu cita con el Dr. Ramos el jueves a las 10:00." },
      { when: "24 h antes", label: "Confirmar", message: "¿Confirmas tu cita de mañana a las 10:00?" },
      { when: "Si no puede", label: "Reagendar", message: "Sin problema. ¿Te acomoda el viernes a las 12:00?" },
      { when: "Horario libre", label: "Llenar el hueco", message: "Se liberó un lugar el jueves a las 10:00. ¿Lo quieres?" },
      { when: "Después", label: "Próxima cita", message: "¿Agendamos tu revisión de seguimiento?" },
    ],
    cadenceNote:
      "Los tiempos los defines tú: 24 o 48 horas antes, uno o dos recordatorios. Las dudas médicas nunca las contesta el agente: pasan a tu equipo. Fuera de la ventana de 24 horas de WhatsApp, los recordatorios salen con plantillas aprobadas por Meta.",
  },
  useCases: {
    title: "Casos de uso para clínicas y consultorios",
    intro: "Empieza por las confirmaciones y suma lo demás cuando quieras.",
    items: [
      { title: "Confirmación de citas", text: "Cada paciente recibe su recordatorio y confirma con un mensaje. Tu recepción ve quién falta por confirmar.", icon: "check", role: "agente" },
      { title: "Reagenda y cancelación", text: "El paciente que no puede cambia su cita por WhatsApp en lugar de simplemente no llegar.", icon: "calendar", role: "agente" },
      { title: "Horarios que se vuelven a llenar", text: "Un horario libre se le ofrece a quien quería adelantar su cita.", icon: "users", role: "agente" },
      { title: "Solicitudes fuera de horario", text: "Quien escribe de noche o en fin de semana recibe respuesta y sale con su cita.", icon: "clock", role: "agente" },
      { title: "Pacientes que no han vuelto", text: "El agente invita a su revisión a pacientes que no han regresado.", icon: "repeat", role: "agente" },
      { title: "Reseñas", text: "Después de la consulta, el agente le pide al paciente que te deje una reseña.", icon: "sparkle", role: "agente" },
    ],
  },
  metrics: {
    title: "Lo que vas a medir en tu agenda",
    intro: "Sin promedios de la industria: los números de tu clínica, por médico y por semana.",
    items: [
      { name: "Inasistencias por semana", text: "Pacientes que no llegaron ni avisaron, por médico." },
      { name: "Citas confirmadas", text: "Qué parte de la agenda de mañana ya está confirmada." },
      { name: "Citas reagendadas", text: "Pacientes que cambiaron su cita por WhatsApp en lugar de faltar." },
      { name: "Horarios recuperados", text: "Huecos que se volvieron a ocupar." },
      { name: "Solicitudes fuera de horario", text: "Pacientes que pidieron cita de noche o en fin de semana." },
      { name: "Tiempo de primera respuesta", text: "Cuánto tarda en contestarse un mensaje nuevo." },
    ],
  },
  fit: {
    title: "root trabaja junto a tu software para clínicas",
    text: "Tu expediente clínico y tu sistema de agenda se quedan como están. root es la parte de WhatsApp: conversa, confirma y avisa. En el arranque revisamos contigo cómo se conecta con lo que ya usas.",
    points: FIT_POINTS,
  },
  siblings: ["/soluciones/clinicas-dentales", "/soluciones/laboratorios-clinicos", "/soluciones/clinicas-esteticas"],
  faq: [
    {
      q: "¿root sustituye mi software para clínicas o mi agenda médica?",
      a: "No. root es un CRM de WhatsApp con agentes de IA. Tu expediente y tu agenda siguen donde están; root se encarga de la conversación con el paciente: responder, agendar, confirmar y reagendar.",
    },
    {
      q: "¿Funciona para un consultorio de un solo médico?",
      a: "Funciona, pero root está pensado para clínicas con varios médicos o con muchas citas por WhatsApp, donde confirmar a mano ya no alcanza. Escríbenos y vemos juntos si te conviene.",
    },
    {
      q: "¿El agente responde preguntas médicas?",
      a: "No. El agente contesta lo que tú apruebas: horarios, ubicación, especialidades y cómo prepararse para la consulta si tú se lo indicas. Las dudas médicas y las urgencias pasan a tu equipo con el historial.",
    },
    {
      q: "¿Los recordatorios cuestan aparte?",
      a: `${PRICING_FACTS.meta} Los recordatorios que salen fuera de la ventana de 24 horas de WhatsApp usan plantillas aprobadas por Meta.`,
    },
    numberFaq("de tu clínica"),
    priceFaq("tu clínica"),
    START_FAQ,
  ],
  close: {
    title: "Que ninguna cita se quede en visto.",
    text: "Escríbenos por WhatsApp, cuéntanos cuántos médicos hay en tu clínica y cuántas citas manejas por semana, y te mostramos cómo se vería tu Receta.",
  },
};

export default function ConsultoriosPage() {
  return <VerticalPage data={DATA} scene={<EscenaConsultorios />} />;
}
