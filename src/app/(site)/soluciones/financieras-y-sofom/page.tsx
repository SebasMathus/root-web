import { FIT_POINTS, handoffSkill, numberFaq, priceFaq, START_FAQ } from "@/components/soluciones-fase2/common";
import { EscenaFinancieras } from "@/components/soluciones-fase2/escena-financieras";
import type { VerticalData } from "@/components/soluciones-fase2/types";
import { VerticalPage } from "@/components/soluciones-fase2/vertical-page";
import { pageMetadata } from "@/lib/seo";

/*
 * /soluciones/financieras-y-sofom (fase 2, plan §3.3). Búsqueda principal: «crm de cobranza»; variantes:
 * «software de cobranza», «software para Sofom», «recordatorios de pago por WhatsApp». Tramos (preventivo, día de
 * pago, +1, +5, +10) y métricas: ficha 2.4 de verticales-root.md (OPP-105). Límite del plan: no prometer voz ni
 * cumplimiento regulatorio. Cobranza y recordatorios se presentan como funciones (decisión del dueño), sin cifras.
 */

export const metadata = pageMetadata({
  title: "CRM de cobranza por WhatsApp para financieras y Sofom",
  description:
    "CRM de cobranza por WhatsApp para financieras y Sofom: recordatorios de pago desde tu número, promesas registradas y seguimiento a solicitudes de crédito.",
  path: "/soluciones/financieras-y-sofom",
  ownOgImage: true,
});

const DATA: VerticalData = {
  path: "/soluciones/financieras-y-sofom",
  label: "Financieras y Sofom",
  kicker: "Soluciones · Financieras y Sofom",
  h1: "CRM de cobranza por WhatsApp para financieras y Sofom",
  intro:
    "Recordatorios de pago antes y después del vencimiento, promesas registradas y una lista clara para tus gestores. Y el mismo agente atiende a quien pide un crédito desde tus anuncios.",
  heroNote: "Desde el número de tu financiera · Agentes de IA en los planes Pro y Enterprise · API oficial de WhatsApp Business",
  cta: "sol-financieras",
  pains: {
    title: "Cobranza por WhatsApp sin orden: lo que se escapa",
    intro: "Un atraso de un día se arregla con un mensaje. Uno de treinta ya es otra conversación.",
    items: [
      {
        title: "¿Quién prometió pagar y quién ya pagó?",
        text: "Las promesas viven en el celular de cada gestor. Para saber cuáles se cumplieron hay que preguntar una por una.",
        icon: "money",
        role: "alerta",
      },
      {
        title: "¿Desde qué número le escribe tu gestor a tus clientes?",
        text: "Recordatorios desde WhatsApp personales, sin registro. Cuando el gestor se va, se lleva la conversación.",
        icon: "phone",
        role: "alerta",
      },
      {
        title: "¿Quién atiende las solicitudes de crédito de tus anuncios?",
        text: "Los prospectos llegan, nadie les pide los datos a tiempo y la solicitud se enfría.",
        icon: "clock",
        role: "alerta",
      },
    ],
  },
  how: {
    title: "Cómo trabaja root en tu financiera",
    intro:
      "Tu agente escribe a nombre de la financiera, con los textos que aprueba tu área de cobranza. Tus gestores se quedan con lo que necesita criterio.",
    items: [
      { title: "Recuerda", text: "Avisa unos días antes del vencimiento y el mismo día de pago, con los datos para pagar.", icon: "clock", role: "agente" },
      { title: "Da seguimiento", text: "Si el pago no llega, escribe en los tramos que definas (+1, +5, +10) con un mensaje distinto en cada uno.", icon: "repeat", role: "agente" },
      { title: "Registra promesas", text: "Cuando el cliente dice «pago el lunes», la fecha y el monto quedan en su historial. Si manda su comprobante, también.", icon: "file", role: "agente" },
      { title: "Califica solicitudes", text: "Atiende a quien pide un crédito desde tus anuncios: monto, destino, ingresos y documentos, con tus preguntas.", icon: "target", role: "agente" },
      { title: "Ordena a tus gestores", text: "Promesas vencidas y clientes que no contestan llegan a tu gestor con la conversación completa.", icon: "users", role: "equipo" },
      handoffSkill("Negociaciones, reestructuras y quejas pasan a una persona de tu equipo, con todo el historial."),
    ],
  },
  recipe: {
    title: "Receta de recordatorios de pago por WhatsApp",
    intro:
      "Una Receta es el punto de partida que armamos contigo para tu industria: etapas, preguntas y cadencia. Esta es la de una financiera con cobranza preventiva y temprana; tu área de cobranza ajusta tramos y textos.",
    stages: [
      { name: "Preventivo", lane: "agente" },
      { name: "Día de pago", lane: "agente" },
      { name: "+1 día", lane: "agente" },
      { name: "Promesa de pago", lane: "agente" },
      { name: "+5 días", lane: "agente" },
      { name: "+10 días · gestor", lane: "equipo" },
      { name: "Pagado o escalado", lane: "equipo" },
    ],
    altFunnel: {
      title: "Y para originación de crédito",
      stages: [
        { name: "Prospecto", lane: "agente" },
        { name: "Solicitud completa", lane: "agente" },
        { name: "En análisis", lane: "equipo" },
        { name: "Aprobado", lane: "equipo" },
        { name: "Dispersado", lane: "equipo" },
      ],
    },
    questions: [
      "¿Qué monto necesitas y para qué lo vas a usar?",
      "¿Cuál es tu ingreso mensual aproximado?",
      "¿En qué ciudad vives?",
      "¿Tienes a la mano tu identificación y un comprobante de domicilio?",
      "Para cobranza: ¿qué día puedes hacer tu pago?",
    ],
    cadenceTitle: "Cadencia de recordatorios de pago",
    cadence: [
      { when: "−3 días", label: "Preventivo", message: "Hola Ricardo, tu pago de $2,350 vence el viernes 15. Te dejo los datos para pagar." },
      { when: "Día de pago", label: "Recordatorio", message: "Hoy vence tu pago. Si ya lo hiciste, mándanos tu comprobante por aquí." },
      { when: "+1 día", label: "Promesa", message: "Tu pago está pendiente. ¿Qué día puedes cubrirlo?" },
      { when: "+5 días", label: "Seguimiento", message: "Tu promesa de pago era el lunes. ¿Te ayudamos con algo?" },
      { when: "+10 días", label: "Gestor", message: "Una persona de la financiera te va a escribir para buscar una opción." },
    ],
    cadenceNote:
      "Los textos, los tramos y los horarios los define tu área de cobranza con su criterio legal. Cuando el cliente paga, la secuencia se detiene. Fuera de la ventana de 24 horas de WhatsApp, los recordatorios salen con plantillas aprobadas por Meta.",
  },
  useCases: {
    title: "Casos de uso para financieras y Sofom",
    intro: "Empieza por la cobranza preventiva y suma originación cuando quieras.",
    items: [
      { title: "Recordatorio preventivo", text: "Unos días antes del vencimiento y el día de pago, desde el número de la financiera.", icon: "clock", role: "agente" },
      { title: "Secuencia de atraso", text: "Mensajes en +1, +5 y +10 días, cada uno con su tono, hasta que el cliente paga o pasa a un gestor.", icon: "repeat", role: "agente" },
      { title: "Promesa y comprobante", text: "La promesa de pago y el «ya pagué» con comprobante quedan en el historial del cliente.", icon: "file", role: "agente" },
      { title: "Lista del día para gestores", text: "Cada mañana tus gestores ven a quién atender primero: promesas vencidas y clientes que no contestan.", icon: "users", role: "equipo" },
      { title: "Solicitudes desde anuncios", text: "Cada solicitud de crédito entra con la campaña que la trajo y el agente pide los datos en la misma conversación.", icon: "send", role: "agente" },
      { title: "Renovación", text: "Clientes que terminaron de pagar reciben una invitación a un nuevo crédito.", icon: "sparkle", role: "agente" },
    ],
  },
  metrics: {
    title: "Las métricas de tu CRM de cobranza",
    intro: "Sin promedios de la industria: tu cartera, por tramo y por gestor.",
    items: [
      { name: "Cartera al corriente", text: "Qué parte de tus clientes va al día." },
      { name: "Avance por tramo", text: "Cuántas cuentas pasan de un tramo al siguiente y cuántas regresan al corriente." },
      { name: "Promesas hechas y cumplidas", text: "Quién prometió, para cuándo y si cumplió." },
      { name: "Respuesta a recordatorios", text: "Quién contestó, quién mandó comprobante y quién no ha respondido." },
      { name: "Solicitudes por campaña", text: "Qué anuncio trajo cada solicitud y hasta qué etapa llegó." },
      { name: "Carga por gestor", text: "Cuántos casos tiene cada gestor y cuántos resolvió." },
    ],
  },
  fit: {
    title: "No es otro software de cobranza: es tu canal de WhatsApp",
    text: "root cubre lo que pasa en WhatsApp: cobranza preventiva y temprana, y originación. Tu sistema de cartera sigue siendo la fuente de saldos. root no hace llamadas automáticas de cobranza ni sustituye a tu despacho.",
    points: FIT_POINTS,
  },
  siblings: ["/soluciones/agencias-de-autos", "/soluciones/inmobiliarias", "/soluciones/clinicas-dentales"],
  faq: [
    {
      q: "¿root es un software para Sofom?",
      a: "root es un CRM de WhatsApp con agentes de IA. En una Sofom o financiera cubre lo que pasa en WhatsApp: recordatorios antes y después del vencimiento, promesas, comprobantes, la lista de tus gestores y las solicitudes de crédito que llegan por anuncios. Tu sistema de cartera sigue siendo la fuente de saldos.",
    },
    {
      q: "¿root cumple la normativa de cobranza por mí?",
      a: "La normativa la cumple tu financiera; root es la herramienta. Los textos, los horarios y los tramos los define tu área de cobranza con su criterio legal, y el agente solo usa los mensajes que apruebes. Las negociaciones y los casos delicados pasan a una persona de tu equipo.",
    },
    {
      q: "¿Hace llamadas de cobranza?",
      a: "No. root no hace llamadas automáticas de cobranza. Si un caso necesita una llamada, tu gestor la hace desde la plataforma cuando lo decida.",
    },
    {
      q: "¿Sirve también para originación de crédito?",
      a: "Sí. El agente atiende a quien escribe desde tus anuncios, le hace tus preguntas de precalificación, le pide sus documentos y pasa la solicitud a tu equipo cuando está completa. Cada solicitud entra con la campaña que la trajo.",
    },
    numberFaq("de tu financiera"),
    priceFaq("tu financiera"),
    START_FAQ,
  ],
  close: {
    title: "Que ningún pago se quede en visto.",
    text: "Escríbenos por WhatsApp, cuéntanos cuántos créditos activos manejas y en qué tramo se te acumula el atraso, y te mostramos tu Receta.",
  },
};

export default function FinancierasPage() {
  return <VerticalPage data={DATA} scene={<EscenaFinancieras />} />;
}
