import Link from 'next/link'
import { getPricingPlans } from '@/lib/payload'

export default async function Pricing() {
  const plans = await getPricingPlans()

  if (!plans.length) return null

  return (
    <section id="pricing" className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-white/60 tracking-wide">Precios</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Simple y transparente
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Sin costos ocultos. Cancela cuando quieras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative border rounded-xl p-6 flex flex-col gap-6 transition-all ${
                plan.highlighted
                  ? 'border-blue-500/50 bg-blue-500/5'
                  : 'border-white/5 bg-white/[0.02]'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-white font-semibold text-lg">{plan.name}</h3>
                <p className="text-white/40 text-sm mt-1">{plan.tagline}</p>
              </div>

              <div>
                {plan.price ? (
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-white">
                      ${plan.price.toLocaleString('es-MX')}
                    </span>
                    <span className="text-white/40 text-sm mb-1">MXN/mes</span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-white">{plan.priceLabel}</div>
                )}
              </div>

              {plan.features && plan.features.length > 0 && (
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className={feature.enabled ? 'text-blue-400' : 'text-white/20'}>
                        {feature.enabled ? '✓' : '×'}
                      </span>
                      <span className={`text-sm ${feature.enabled ? 'text-white/70' : 'text-white/20'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href={plan.ctaUrl || 'https://wa.me/15557794199'}
                target="_blank"
                className={`text-sm font-medium px-4 py-2.5 rounded-lg text-center transition-colors ${
                  plan.highlighted
                    ? 'bg-blue-500 hover:bg-blue-400 text-white'
                    : 'border border-white/10 hover:border-white/20 text-white/70 hover:text-white'
                }`}
              >
                {plan.ctaLabel || 'Hablar con asesor'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}