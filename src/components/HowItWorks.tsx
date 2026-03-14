import { getHowItWorks } from '@/lib/payload'

const FALLBACK_STEPS = [
  { number: '01', title: 'Conecta con tus canales', description: 'Elige los canales donde están tus clientes: WhatsApp, Instagram, Google y más.' },
  { number: '02', title: 'Automatiza tu flujo de trabajo', description: 'Configura automatizaciones con IA para que funcionen sin intervención manual las 24 horas.' },
  { number: '03', title: 'Integra con tus sistemas', description: 'Conecta Root con Salesforce, SAP o Excel. Convierte tus sistemas de registro en sistemas de acción.' },
]

const FALLBACK_PROBLEMS = [
  { number: '01', title: 'Tus clientes quieren hablar directamente contigo', description: 'Casi siempre por medio de WhatsApp.' },
  { number: '02', title: 'Múltiples herramientas desconectadas', description: 'CRM para ventas, soporte, cobranza, exceles por todos lados.' },
  { number: '03', title: 'Falta de automatizaciones inteligentes', description: 'Los equipos pierden demasiado tiempo en tareas repetitivas.' },
  { number: '04', title: 'Falta de insights accionables', description: 'Tus herramientas no te permiten actuar inmediatamente.' },
]

export default async function HowItWorks() {
  const data = await getHowItWorks().catch(() => null)

  const steps = (data?.steps as any[])?.length ? (data?.steps as any[]) : FALLBACK_STEPS
  const problems = (data?.problemPoints as any[])?.length
    ? (data?.problemPoints as any[]).map((p: any, i: number) => ({
        number: String(i + 1).padStart(2, '0'),
        title: p.title,
        description: p.description,
      }))
    : FALLBACK_PROBLEMS
  const problemHeadline = data?.problemHeadline || '¿Tu equipo sigue resolviendo todo por WhatsApp sin trazabilidad ni control?'
  const headline = data?.headline || 'Tres pasos para transformar tu operación'

  return (
    <>
      {/* Problema */}
      <section className="bg-transparent py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs text-white/60 tracking-wide">El problema</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-3xl mx-auto">
              {problemHeadline}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problems.map((problem: any) => (
              <div key={problem.number} className="border border-white/5 bg-white/[0.02] rounded-xl p-6 flex gap-4">
                <span className="text-blue-500/50 font-mono text-sm mt-0.5">{problem.number}</span>
                <div>
                  <h3 className="text-white font-medium text-sm mb-1">{problem.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-transparent py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs text-white/60 tracking-wide">Cómo funciona</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              {headline}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step: any, i: number) => (
              <div key={step.number || i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-white/5 -translate-x-4 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center mb-4">
                    <span className="text-blue-500 font-mono text-xs">{step.number || String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}