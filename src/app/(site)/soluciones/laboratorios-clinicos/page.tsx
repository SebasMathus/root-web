import { FIT_POINTS, handoffSkill, numberFaq, priceFaq, START_FAQ } from "@/components/soluciones-fase2/common";
import { EscenaLaboratorios } from "@/components/soluciones-fase2/escena-laboratorios";
import type { VerticalData } from "@/components/soluciones-fase2/types";
import { VerticalPage } from "@/components/soluciones-fase2/vertical-page";
import { pageMetadata } from "@/lib/seo";

/*
 * /soluciones/laboratorios-clinicos (fase 2, plan §3.3). Búsqueda principal: «WhatsApp para laboratorio clínico»;
 * variante con volumen: «software para laboratorio clínico» (búsqueda de LIS: root es complemento, no LIS).
 * Embudo y métricas: ficha 2.5 de verticales-root.md (OPP-194). El agente no entrega ni interpreta resultados: dice
 * cómo consultarlos. Sin liga de pago (por confirmar).
 */

export const metadata = pageMetadata({
  title: "WhatsApp para laboratorio clínico: cotiza y agenda",
  description:
    "WhatsApp para laboratorio clínico con agentes de IA: cotiza estudios con tu lista de precios, explica la preparación y agenda tomas en sucursal o a domicilio.",
  path: "/soluciones/laboratorios-clinicos",
  ownOgImage: true,
});

const DATA: VerticalData = {
  path: "/soluciones/laboratorios-clinicos",
  label: "Laboratorios clínicos",
  kicker: "Soluciones · Laboratorios clínicos",
  h1: "WhatsApp para laboratorio clínico: cotiza estudios y agenda tomas",
  intro:
    "Tu agente contesta precio y preparación con tu lista, agenda la toma en sucursal o a domicilio y le da seguimiento a las cotizaciones que no se cerraron. Tu recepción deja de saturarse y atiende a quien ya está en el mostrador.",
  heroNote: "Complemento de tu sistema de laboratorio · Agentes de IA en los planes Pro y Enterprise · API oficial de WhatsApp Business",
  cta: "sol-laboratorios",
  pains: {
    title: "Lo que satura el WhatsApp de un laboratorio clínico",
    intro: "Las mismas preguntas, todo el día, por el mismo número.",
    items: [
      {
        title: "¿Cuánto cuesta y necesito ayuno?",
        text: "Precio y preparación, una y otra vez. Recepción contesta entre paciente y paciente, y muchos mensajes se quedan sin respuesta.",
        icon: "chat",
        role: "alerta",
      },
      {
        title: "¿Ya están mis resultados?",
        text: "Pacientes que escriben para preguntar y llamadas que interrumpen a quien está atendiendo en sucursal.",
        icon: "clock",
        role: "alerta",
      },
      {
        title: "¿Qué médicos y empresas te mandan pacientes?",
        text: "Llegan pacientes referidos y por convenio, pero nadie sabe cuántos ni a quién darle seguimiento.",
        icon: "users",
        role: "alerta",
      },
    ],
  },
  how: {
    title: "Cómo trabaja root en tu laboratorio",
    intro: "Tu agente atiende el WhatsApp del laboratorio con tu lista de precios, tus indicaciones de preparación y tus zonas de cobertura.",
    items: [
      { title: "Cotiza", text: "Responde el precio de estudios y paquetes con tu lista, de día y de noche.", icon: "money", role: "agente" },
      { title: "Explica la preparación", text: "Ayuno, horarios y cuidados previos, tal como tú los indicas. No inventa ni interpreta.", icon: "file", role: "agente" },
      { title: "Agenda la toma", text: "En sucursal o a domicilio: pregunta el código postal, revisa tus zonas y propone horario.", icon: "calendar", role: "agente" },
      { title: "Da seguimiento", text: "Le escribe a quien cotizó y no agendó, en los días que tú defines.", icon: "repeat", role: "agente" },
      { title: "Orienta sobre resultados", text: "Le dice al paciente cómo y dónde consultar sus resultados, según el proceso de tu laboratorio.", icon: "flask", role: "agente" },
      handoffSkill("Dudas médicas, convenios con empresas y quejas pasan a tu equipo con el historial completo."),
    ],
  },
  recipe: {
    title: "Receta de cotización y agenda de estudios",
    intro:
      "Una Receta es el punto de partida que armamos contigo para tu industria: etapas, preguntas y cadencia. Esta es la de un laboratorio con sucursales y toma a domicilio; tú cambias lo que no te sirva.",
    stages: [
      { name: "Pregunta", lane: "agente" },
      { name: "Cotización", lane: "agente" },
      { name: "Cita agendada", lane: "agente" },
      { name: "Toma", lane: "equipo" },
      { name: "Resultados entregados", lane: "equipo" },
      { name: "Próximo estudio", lane: "agente" },
    ],
    questions: [
      "¿Qué estudio o paquete te pidió tu médico?",
      "¿Tienes orden médica?",
      "¿Prefieres ir a sucursal o que vayamos a tu domicilio?",
      "¿Cuál es tu código postal?",
      "¿Qué día y a qué hora te acomoda?",
      "¿Te recomendó algún médico o vienes por convenio de tu empresa?",
    ],
    cadenceTitle: "Cadencia de una cotización",
    cadence: [
      { when: "Al cotizar", label: "Cotización", message: "La química sanguínea de 6 elementos cuesta $420 y va con ayuno." },
      { when: "Día 1", label: "Seguimiento", message: "¿Te agendo tu estudio? Mañana tenemos lugar desde las 7:00." },
      { when: "Noche antes", label: "Preparación", message: "Mañana es tu toma. Te dejo las indicaciones para llegar preparado." },
      { when: "Después", label: "Resultados", message: "Te comparto cómo consultar tus resultados. ¿Te ayudo con algo más?" },
      { when: "En 3 meses", label: "Control", message: "Se acerca tu estudio de control. ¿Te agendo?" },
    ],
    cadenceNote:
      "Precios, indicaciones y tiempos salen de tu información; el agente no inventa preparaciones ni interpreta resultados. Si el paciente pregunta algo médico, pasa a tu equipo.",
  },
  useCases: {
    title: "Casos de uso para laboratorios clínicos",
    intro: "Empieza por el cotizador y suma lo demás cuando quieras.",
    items: [
      { title: "Cotizador por WhatsApp", text: "Precios de estudios y paquetes al momento, con tu lista y sin que recepción deje el mostrador.", icon: "money", role: "agente" },
      { title: "Toma a domicilio", text: "El agente revisa el código postal contra tus zonas, propone horario y deja la toma agendada a la vista de tu equipo.", icon: "home", role: "agente" },
      { title: "Recordatorio con preparación", text: "La noche anterior, el paciente recibe sus indicaciones para que no tenga que reprogramar.", icon: "clock", role: "agente" },
      { title: "«¿Ya están mis resultados?»", text: "El agente responde cómo y dónde consultarlos, y tu equipo deja de contestar la misma pregunta.", icon: "flask", role: "agente" },
      { title: "Cotizaciones sin cerrar", text: "Quien preguntó y no agendó recibe un seguimiento amable.", icon: "repeat", role: "agente" },
      { title: "Médicos y empresas referentes", text: "Cada paciente entra con quién lo mandó: médico, empresa o campaña. Así sabes a quién agradecer y a quién buscar.", icon: "users", role: "equipo" },
    ],
  },
  metrics: {
    title: "Las métricas de tu laboratorio en WhatsApp",
    intro: "Sin promedios de la industria: tus números, por sucursal y por zona.",
    items: [
      { name: "Cotizaciones que se vuelven cita", text: "Qué parte de las cotizaciones termina en una toma agendada." },
      { name: "Tomas a domicilio", text: "Cuántas se agendan al mes y en qué zonas." },
      { name: "Citas por sucursal", text: "Cómo se reparte la demanda entre tus sucursales." },
      { name: "Pacientes por referente", text: "Cuántos pacientes llegan por cada médico, empresa o campaña." },
      { name: "Tiempo de primera respuesta", text: "Cuánto tarda en contestarse un mensaje nuevo, también de noche." },
      { name: "Preguntas resueltas por el agente", text: "Cuántas consultas de precio, preparación y resultados ya no llegan a recepción." },
    ],
  },
  fit: {
    title: "No es otro software para laboratorio clínico",
    text: "Tu sistema de laboratorio sigue manejando órdenes, muestras y resultados. root se encarga de WhatsApp: cotiza, agenda, recuerda y ordena a tus pacientes y a tus referentes en un CRM.",
    points: FIT_POINTS,
  },
  siblings: ["/soluciones/consultorios-y-clinicas", "/soluciones/clinicas-dentales", "/soluciones/clinicas-esteticas"],
  faq: [
    {
      q: "¿root reemplaza mi software de laboratorio?",
      a: "No. root es un CRM de WhatsApp con agentes de IA. Tu sistema de laboratorio sigue manejando órdenes, muestras y resultados; root atiende la conversación con el paciente: cotiza, agenda y da seguimiento.",
    },
    {
      q: "¿El agente entrega o interpreta resultados?",
      a: "No. El agente le dice al paciente cómo y dónde consultar sus resultados, según el proceso de tu laboratorio. Los resultados los entrega tu sistema o tu equipo, y cualquier duda médica pasa a una persona.",
    },
    {
      q: "¿Puede agendar tomas a domicilio?",
      a: "Sí. El agente pregunta el código postal, revisa tus zonas de cobertura, propone horario y deja la toma agendada. La noche anterior le manda al paciente sus indicaciones.",
    },
    {
      q: "¿Cómo sabe los precios y la preparación de cada estudio?",
      a: "Los configuramos contigo en el arranque, a partir de tu lista de precios y tus indicaciones. Cuando cambian, se actualizan, y el agente solo responde con esa información.",
    },
    numberFaq("de tu laboratorio"),
    priceFaq("tu laboratorio"),
    START_FAQ,
  ],
  close: {
    title: "Que ninguna cotización se quede en visto.",
    text: "Escríbenos por WhatsApp, cuéntanos cuántas sucursales tienes y si haces tomas a domicilio, y te mostramos tu Receta.",
  },
};

export default function LaboratoriosPage() {
  return <VerticalPage data={DATA} scene={<EscenaLaboratorios />} />;
}
