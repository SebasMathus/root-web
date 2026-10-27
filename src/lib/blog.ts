/**
 * Artículos del blog (sitio estático: el contenido vive aquí, ya no en Payload).
 * Bloques simples para que el texto se rastree sin JS. Cifras SOLO con fuente enlazada (DESIGN.md › Qué no afirmar).
 */
export type Block = { type: "p"; text: string } | { type: "h2"; text: string } | { type: "ol"; items: { title: string; text: string }[] } | { type: "note"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "WhatsApp" | "Ventas" | "CRM" | "Automatización" | "Casos de éxito" | "Producto";
  /** ISO, fecha de publicación original. */
  date: string;
  updated?: string;
  blocks: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "como-automatizar-whatsapp",
    title: "Cómo automatizar WhatsApp para vender más",
    excerpt: "Cómo automatizar WhatsApp para vender más: contesta al instante, califica a cada prospecto y da seguimiento sin depender de que alguien de tu equipo se acuerde.",
    category: "WhatsApp",
    date: "2026-03-15",
    updated: "2026-10-27",
    blocks: [
      { type: "p", text: "WhatsApp se ha convertido en el canal de ventas más poderoso para empresas en Latinoamérica. Es donde están tus clientes." },
      { type: "h2", text: "¿Por qué automatizar WhatsApp?" },
      {
        type: "p",
        text: "Automatizar tus conversaciones de WhatsApp evita que tus prospectos se queden esperando. La clave está en responder rápido, calificar leads automáticamente y dar seguimiento sin depender del equipo.",
      },
      { type: "h2", text: "Las 3 automatizaciones que más impacto tienen" },
      {
        type: "ol",
        items: [
          {
            title: "Respuesta inmediata",
            text: "Cuando un prospecto te escribe, está en su momento de mayor interés. Una automatización de bienvenida puede capturar ese momento crítico.",
          },
          {
            title: "Calificación de leads",
            text: "Usa flujos inteligentes para identificar qué prospectos tienen mayor probabilidad de compra y prioriza tu tiempo en ellos.",
          },
          {
            title: "Seguimiento automático",
            text: "Muchas ventas no se cierran en el primer mensaje, sino después de varios contactos. Automatiza los follow-ups para que ningún lead se pierda.",
          },
        ],
      },
      {
        type: "note",
        text: "Actualizamos este artículo el 27 de octubre de 2026: quitamos tres cifras de la versión original porque no tenían una fuente publicada que pudiéramos enlazar.",
      },
    ],
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));
}
