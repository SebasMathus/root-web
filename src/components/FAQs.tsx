'use client'

import { useState } from 'react'

const FAQS = [
  {
    question: '¿Necesito la API oficial de WhatsApp Business?',
    answer: 'Sí, Root funciona con la API oficial de Meta. Te ayudamos a tramitar el acceso durante el onboarding sin costo adicional.',
  },
  {
    question: '¿Cuánto tiempo toma la implementación?',
    answer: 'La mayoría de nuestros clientes están operando en menos de una semana. El proceso incluye configuración, migración de contactos e integración con tus sistemas.',
  },
  {
    question: '¿Puedo integrar Root con mi CRM actual?',
    answer: 'Sí. Root se integra con Salesforce, HubSpot, SAP, Zoho y cualquier sistema que tenga API. También tenemos integración nativa con Excel y Google Sheets.',
  },
  {
    question: '¿Qué pasa si supero el límite de usuarios de mi plan?',
    answer: 'Puedes agregar usuarios adicionales o escalar a un plan superior en cualquier momento. No hay penalizaciones por cambiar de plan.',
  },
  {
    question: '¿Los mensajes de WhatsApp tienen costo adicional?',
    answer: 'El costo de los mensajes de la API de Meta se cobra por separado según su tarifa oficial. Root no cobra markup sobre estos mensajes.',
  },
  {
    question: '¿Mis datos están seguros?',
    answer: 'Sí. Toda la información está encriptada en tránsito y en reposo. Cumplimos con GDPR y la Ley Federal de Protección de Datos de México.',
  },
]

export default function FAQs() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-white/60 tracking-wide">Preguntas frecuentes</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            ¿Tienes dudas?
          </h2>
          <p className="text-white/50 text-lg">
            Si no encuentras tu respuesta, escríbenos por WhatsApp.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="border border-white/5 bg-white/[0.02] rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-white/90 text-sm font-medium">{faq.question}</span>
                <span className={`text-white/30 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-4">
                  <p className="text-white/50 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}