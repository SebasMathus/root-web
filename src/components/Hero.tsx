import Link from 'next/link'

const WHATSAPP_URL = 'https://wa.me/15557794199?text=Hola%2C%20quiero%20agendar%20una%20demo'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs text-white/60 tracking-wide">WhatsApp CRM con IA</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
          Potencia tu negocio{' '}
          <span className="text-blue-500">con WhatsApp</span>
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          Transforma cómo vendes, retienes y te comunicas con tus clientes
          utilizando WhatsApp con IA.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm w-full sm:w-auto text-center"
          >
            Agendar demo gratis
          </Link>
          <Link
            href="#features"
            className="border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium px-8 py-3.5 rounded-lg transition-colors text-sm w-full sm:w-auto text-center"
          >
            Ver características
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '+500', label: 'Empresas activas' },
            { value: '98%', label: 'Retención de clientes' },
            { value: '3x', label: 'Más conversiones' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}