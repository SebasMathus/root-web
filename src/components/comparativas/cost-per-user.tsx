import { PLANS, PRICING_FACTS, type Plan } from "@/lib/site";

/*
 * D8 · Costo por usuario al mes de los planes de root (plan §4). Solo precios de root, publicados en lib/site › PLANS:
 * nunca precios de terceros. Componente de servidor: el HTML trae el estado completo, sin animación.
 * - Cada barra lleva su valor en texto; los rellenos son decorativos (aria-hidden).
 * - El cálculo (mensualidad entre los usuarios incluidos) es nuestro y el pie lo dice.
 */

/** Usuarios incluidos en el plan (Básico 3, Pro 10). Enterprise se arma a la medida y no entra en la gráfica. */
const USERS: Partial<Record<Plan["id"], number>> = { basico: 3, pro: 10 };

const mxn = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

/** Costo por usuario de un plan de root con precio publicado (null si no tiene). */
export function perUserCost(id: Plan["id"]) {
  const plan = PLANS.find((p) => p.id === id);
  const users = USERS[id];
  return plan?.price && users ? mxn(plan.price / users) : null;
}

export function CostPerUser({ id = "d8" }: { id?: string }) {
  const bars = PLANS.filter((p) => p.price !== null && USERS[p.id]).map((p) => {
    const users = USERS[p.id]!;
    return { plan: p, users, perUser: p.price! / users };
  });
  const max = Math.max(...bars.map((b) => b.perUser));

  const caption = [
    "Costo por usuario al mes de los planes de root, en pesos mexicanos.",
    ...bars.map(
      (b) =>
        `${b.plan.name}: ${b.plan.priceLabel} MXN al mes con ${b.users} usuarios, ${mxn(b.perUser)} por usuario, ${b.plan.ai ? "con agentes de IA" : "sin agentes de IA"}.`,
    ),
    "Cálculo nuestro: mensualidad dividida entre los usuarios incluidos. No incluye los mensajes de WhatsApp, que Meta cobra aparte.",
  ].join(" ");

  return (
    <figure className="card p-5 md:p-8" aria-labelledby={`${id}-titulo`}>
      <figcaption className="sr-only">{caption}</figcaption>
      <p className="kicker">Precios publicados en MXN</p>
      <h3 id={`${id}-titulo`} className="h-card text-xl md:text-2xl text-ink mt-2">
        Costo por usuario al mes en <span className="normal-case">root</span>
      </h3>
      <p className="text-sm text-muted mt-1">Mensualidad del plan entre los usuarios que incluye.</p>

      <ul className="mt-8 flex flex-col gap-7" aria-hidden="true">
        {bars.map((b) => (
          <li key={b.plan.id} className="grid gap-2 md:grid-cols-[13rem_1fr] md:gap-6">
            <div>
              <p className="font-display font-bold text-lg leading-tight text-ink">Plan {b.plan.name}</p>
              <p className="text-sm text-muted">
                {b.plan.priceLabel} MXN al mes · {b.users} usuarios
              </p>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="relative h-9 flex-1 rounded-lg bg-surface-2 overflow-hidden">
                  <span
                    className={`absolute inset-y-0 left-0 rounded-lg ${b.plan.ai ? "bg-lime-fill" : "bg-ink/25"}`}
                    style={{ width: `${((b.perUser / max) * 100).toFixed(2)}%` }}
                  />
                </div>
                <p className="mono text-right text-ink font-semibold text-base md:text-lg w-[7.5rem] shrink-0">{mxn(b.perUser)}</p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {b.plan.ai ? "Con agentes de IA incluidos." : "Sin agentes de IA: CRM, API oficial y automatizaciones simples."}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-line pt-5 text-sm text-muted leading-relaxed flex flex-col gap-2">
        <p>
          <span className="font-semibold text-ink">Cómo lo calculamos.</span> Mensualidad publicada del plan entre los usuarios que
          incluye. Es un cálculo nuestro, no un precio por usuario adicional. {PRICING_FACTS.iva}
        </p>
        <p>{PRICING_FACTS.meta} Enterprise tiene precio a convenir y usuarios a la medida de tu operación.</p>
      </div>
    </figure>
  );
}
