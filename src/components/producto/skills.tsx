import { Icon } from "@/components/icons";

/*
 * Las seis Habilidades del agente de root (plan §2.1; disponibles según la página de root en el sitio de Nextia).
 * Cada tarjeta trae un ejemplo corto en voz del agente. Servidor, sin JS.
 */

export const SKILLS: { name: string; icon: string; text: string; example: string; team?: boolean }[] = [
  {
    name: "Responder",
    icon: "chat",
    text: "Contesta en segundos, de día o de noche, con la información de tu negocio: precios, horarios, ubicación, requisitos.",
    example: "«Sí, sigue disponible. Está en Narvarte, tiene 2 recámaras y un lugar de estacionamiento.»",
  },
  {
    name: "Calificar",
    icon: "target",
    text: "Hace las preguntas que tu equipo haría: presupuesto, zona, fecha, producto o forma de pago.",
    example: "«¿Lo buscas para comprar o rentar, y cómo pagarías?»",
  },
  {
    name: "Agendar",
    icon: "calendar",
    text: "Propone horario para la cita, la visita o la prueba de manejo, la confirma y la recuerda.",
    example: "«¿Te late visitarlo el jueves a las 11:00?»",
  },
  {
    name: "Dar seguimiento",
    icon: "repeat",
    text: "Vuelve a escribir cuando un prospecto se queda callado después de una cotización, sin que nadie tenga que acordarse.",
    example: "«Hola, Laura, ¿te quedó alguna duda del presupuesto?»",
  },
  {
    name: "Reactivar",
    icon: "bolt",
    text: "Retoma a quien dejó de contestar y a clientes de antes, para que tu base de contactos vuelva a vender.",
    example: "«Hace unos meses buscabas depa en Del Valle. ¿Sigues buscando?»",
  },
  {
    name: "Pasar al equipo",
    icon: "handoff",
    text: "Cuando toca una persona, le pasa la conversación a tu vendedor con todo el historial.",
    example: "«Te comunico con Andrés, que lleva las visitas en Narvarte.»",
    team: true,
  },
];

export function SkillGrid() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {SKILLS.map((k) => (
        <li key={k.name} className="card p-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className={`w-11 h-11 rounded-xl grid place-items-center ${k.team ? "bg-sky-soft text-sky" : "bg-lime-soft text-lime"}`}>
              <Icon name={k.icon} className="w-5 h-5" />
            </span>
            <h3 className="h-card text-lg text-ink">{k.name}</h3>
          </div>
          <p className="text-muted leading-relaxed">{k.text}</p>
          <p className={`mt-auto rounded-xl px-4 py-3 text-[15px] leading-snug text-ink ${k.team ? "bg-sky-soft" : "bg-lime-soft"}`}>{k.example}</p>
        </li>
      ))}
    </ul>
  );
}
