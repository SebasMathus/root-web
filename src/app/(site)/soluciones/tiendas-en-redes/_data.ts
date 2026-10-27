import { planFaq, startFaq } from "@/components/soluciones/shared";
import type { Vertical } from "@/components/soluciones/types";
import { planById } from "@/lib/site";

/*
 * Tiendas que venden por WhatsApp e Instagram (fase 1). Fuente: verticales-root.md §2.1 y plan §3.3.
 * La vertical casi no se busca por nombre: la búsqueda va por la herramienta («vender por WhatsApp», «chatbot de
 * WhatsApp»). Es la vertical más sensible al precio y el Básico no trae IA: la página muestra el plan Pro.
 * La liga de pago está por confirmar (plan §6.2): el agente deja el pedido listo y lo pasa a la vendedora.
 * Datos de la escena: variante del plan D1 («¿tienes la talla M?»).
 */

const pro = planById("pro");

export const SEO = {
  title: "Vender por WhatsApp e Instagram con agentes de IA",
  description:
    "Vender por WhatsApp e Instagram sin contestar todo a mano: un agente de IA, más que un chatbot, responde precio, talla y envío en segundos y te pasa el pedido.",
  og: { kicker: "Soluciones · Tiendas en redes", title: "Vende por WhatsApp e Instagram a cualquier hora", sub: "Un agente de IA contesta precio, talla y envío, y le pasa el pedido a tu equipo." },
};

export const vertical: Vertical = {
  path: "/soluciones/tiendas-en-redes",
  label: "Tiendas en redes",
  ctaId: "soluciones-tiendas",
  kicker: "Vender por WhatsApp e Instagram",
  h1: "Vende por WhatsApp e Instagram aunque tu tienda esté cerrada",
  intro:
    "Tu agente contesta en segundos las preguntas de siempre (precio, talla, existencia, envío y pago), deja el pedido listo y se lo pasa a tu vendedora con todo el historial. De día, de noche y en fin de semana.",
  sceneCaption:
    "Ejemplo de una conversación de una tienda ficticia que vende por redes. Andrea pregunta a las 23:02 si hay el vestido de lino en talla M; el agente de root contesta en 3 segundos que sí, en arena y en negro, a 890 pesos. Andrea elige el negro y pregunta si envían a Puebla; la ficha se llena con producto, talla, color y envío, y el trato pasa a Quiere comprar. Andrea pide que se lo aparten; el agente avisa que la pasa con Sofía para cerrar el pedido, y la conversación llega a Sofía con una nota de relevo.",
  scene: {
    business: "Tienda Lunaria",
    contact: "Andrea Torres",
    origin: "Anuncio de Instagram · Vestido de lino",
    firstReply: "3 s",
    fields: [
      { key: "producto", label: "Producto", value: "Vestido de lino" },
      { key: "talla", label: "Talla", value: "M" },
      { key: "color", label: "Color", value: "Negro" },
      { key: "envio", label: "Envío", value: "Puebla" },
      { key: "total", label: "Precio", value: "$890" },
    ],
    stages: [
      { name: "Mensaje de anuncio", lane: "agente" },
      { name: "Respondido", lane: "agente" },
      { name: "Quiere comprar", lane: "agente" },
      { name: "Pedido con vendedora", lane: "equipo" },
      { name: "Venta reportada", lane: "equipo" },
    ],
    messages: [
      { from: "cliente", time: "23:02", text: "Hola! ¿Tienes el vestido de lino en talla M?", fills: ["producto", "talla"] },
      { from: "agente", time: "23:02", text: "¡Hola, Andrea! Sí hay en M, en arena y en negro. Cuesta $890. ¿Cuál te gusta?", fills: ["total"], stage: 1 },
      { from: "cliente", time: "23:04", text: "El negro. ¿Hacen envíos a Puebla?", fills: ["color", "envio"], stage: 2 },
      { from: "agente", time: "23:04", text: "Sí, enviamos a todo el país. ¿Te lo aparto?" },
      { from: "cliente", time: "23:05", text: "Sí, apártamelo porfa" },
      { from: "agente", time: "23:05", text: "¡Apartado! Te paso con Sofía para cerrar tu pedido y el envío." },
    ],
    handoff: { to: "Sofía M.", stage: 3, note: "Vestido de lino negro, talla M, $890 más envío a Puebla. Lo pidió apartado: quiere cerrar hoy." },
  },
  pains: {
    title: "¿Cuántas ventas se pierden por contestar tarde?",
    intro: "Tus anuncios funcionan: el WhatsApp y el Instagram de la tienda no paran. El problema es contestar todo a tiempo, y bien.",
    items: [
      {
        icon: "repeat",
        q: "¿Cuántas veces al día contestas «¿precio?» y «¿tienes talla?»?",
        text: "Los anuncios traen muchos mensajes con las mismas cinco preguntas: precio, talla, existencia, envío y pago. Contestarlas a mano se come el día.",
      },
      {
        icon: "clock",
        q: "¿Quién contesta cuando la tienda cierra?",
        text: "Los mensajes de tus anuncios llegan de noche y en fin de semana. Si nadie responde, la clienta compra en otra cuenta.",
      },
      {
        icon: "bot",
        q: "¿Un chatbot de menús te ha costado ventas?",
        text: "Los botones de «escribe 1 para precios» desesperan. Tu clienta quiere que le contesten como persona, y que alguien le cierre el pedido.",
      },
    ],
  },
  how: {
    title: "Más que un chatbot de WhatsApp: un agente que vende contigo",
    intro: "Tu agente conversa como persona y con la información de tu tienda. Tu equipo entra cuando ya hay pedido.",
    steps: [
      { role: "agente", icon: "chat", title: "Responde", text: "Contesta precio, tallas, colores, existencia, envíos y formas de pago con la información que tú le das, en WhatsApp e Instagram." },
      { role: "agente", icon: "target", title: "Califica", text: "Detecta quién quiere comprar y anota producto, talla, color y destino del envío en la ficha de la clienta." },
      { role: "equipo", icon: "handoff", title: "Pasa a tu vendedora", text: "Cuando hay pedido, una duda especial o una queja, le pasa la conversación a tu equipo con todo el historial." },
      { role: "agente", icon: "repeat", title: "Da seguimiento", text: "Retoma la conversación con quien preguntó y no compró, en los días que tú definas." },
      { role: "agente", icon: "sparkle", title: "Reactiva", text: "Vuelve a escribirles a clientas que compraron antes, para que regresen a tu tienda." },
    ],
  },
  recipe: {
    title: "La Receta para tiendas en redes de root",
    intro: "Del mensaje del anuncio a la venta reportada, con las preguntas de siempre ya resueltas.",
    stages: [
      { name: "Mensaje de anuncio", lane: "agente" },
      { name: "Respondido", lane: "agente" },
      { name: "Quiere comprar", lane: "agente" },
      { name: "Pedido con vendedora", lane: "equipo" },
      { name: "Venta reportada", lane: "equipo" },
    ],
    questions: ["¿Qué producto te interesa?", "¿Qué talla y qué color?", "¿A qué ciudad lo enviamos?", "¿Cómo prefieres pagar?"],
    passRule: "Pasa a tu vendedora cuando la clienta confirma producto, talla y envío, o en cuanto hay una queja o un pedido especial.",
    cadence: [
      { day: "Día 1", text: "¿Te ayudo a elegir talla? Te paso la guía de medidas." },
      { day: "Día 3", text: "¿Te aparto el vestido en negro, talla M?" },
      { day: "Día 7", text: "Llegaron colores nuevos de ese modelo. ¿Te mando fotos?" },
      { day: "Día 30", text: "¡Hola de nuevo! Ya está la colección nueva. ¿Te la comparto?" },
    ],
  },
  useCases: {
    title: "Qué resuelve root en una tienda que vende por redes",
    items: [
      { icon: "chat", role: "agente", title: "Las cinco preguntas de siempre, contestadas", text: "Precio, talla, existencia, envío y pago, en segundos y con la información de tu tienda." },
      { icon: "clock", role: "agente", title: "Atención fuera de horario", text: "Los mensajes de tus anuncios reciben respuesta de noche y en fin de semana." },
      { icon: "handoff", role: "equipo", title: "Pase a la vendedora con historial", text: "Para pedidos, dudas especiales o quejas: tu vendedora ve toda la conversación." },
      { icon: "repeat", role: "agente", title: "Seguimiento a quien no compró", text: "El agente retoma la conversación con quien preguntó y se quedó pensándolo." },
      { icon: "inbox", title: "Una bandeja para WhatsApp e Instagram", text: "Tu equipo y tus agentes atienden juntos, en el número y la cuenta de tu tienda." },
      { icon: "chart", title: "Qué anuncio vende", text: "Cada conversación entra con la campaña que la trajo, para saber dónde poner tu presupuesto." },
    ],
  },
  metrics: {
    title: "Lo que vas a ver de tus ventas por WhatsApp",
    intro: "Cuántos mensajes llegan, qué tan rápido se contestan y cuántos terminan en venta.",
    items: ["Mensajes recibidos", "Tiempo de respuesta", "Conversaciones fuera de horario", "Pases a la vendedora", "Ventas reportadas"],
  },
  systems: {
    title: "Tu catálogo, tus respuestas",
    text: "Tu agente responde con la información que tú le das: precios, tallas, envíos y políticas de cambio. Si llevas tu inventario o tus pedidos en Excel, root se conecta con él; también con Salesforce, SAP y HubSpot.",
  },
  planText: `Los agentes de IA vienen en el plan Pro: ${pro.priceLabel} ${pro.period} con ${pro.users}, para que tu equipo y tu agente atiendan juntos. El plan Básico incluye la API oficial de WhatsApp Business y el CRM, pero no trae agentes de IA.`,
  faq: {
    title: "Preguntas frecuentes sobre vender por WhatsApp con root",
    items: [
      {
        q: "¿Es lo mismo que un chatbot de WhatsApp?",
        a: "No. Un chatbot de menús responde con botones fijos. Tu agente de root conversa como persona con la información de tu tienda y, cuando hay pedido o queja, se lo pasa a tu equipo con el historial.",
      },
      {
        q: "¿Funciona con Instagram Direct?",
        a: "Sí. WhatsApp e Instagram llegan a la misma bandeja, donde tu equipo y tus agentes atienden juntos.",
      },
      {
        q: "¿El agente cobra el pedido?",
        a: "El agente deja el pedido listo (producto, talla, color y envío) y se lo pasa a tu vendedora, que cierra el cobro como ya lo haces. Si quieres cobrar dentro de la conversación, escríbenos y revisamos tu caso.",
      },
      {
        q: "Todavía vendo poco, ¿me conviene?",
        a: "Depende de tu volumen. Si hoy contestas todo a tiempo, quizá te baste con WhatsApp Business App. Cuando los mensajes de tus anuncios ya no te dejan responder rápido, un agente hace la diferencia. Escríbenos y lo vemos con tus números.",
      },
      planFaq(),
      startFaq(),
    ],
  },
  siblings: ["/soluciones/clinicas-esteticas", "/soluciones/agencias-de-autos", "/soluciones/inmobiliarias"],
  closing: {
    title: "Que ninguna clienta se quede en visto.",
    text: "Escríbenos por WhatsApp y te mostramos cómo contestaría tu agente los mensajes de tus anuncios.",
  },
};
