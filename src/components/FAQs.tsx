import { getFAQs } from '@/lib/payload'
import FAQsClient from '@/components/FAQsClient'

export default async function FAQs() {
  const faqs = await getFAQs()

  if (!faqs.length) return null

  return (
    <section className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
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
        <FAQsClient faqs={faqs} />
      </div>
    </section>
  )
}