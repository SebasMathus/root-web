export const metadata = {
    title: 'Soporte | Root',
    description: 'Centro de soporte de Root - goroot.ai',
  }
  
  export default function Soporte() {
    return (
      <main className="bg-black min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-32">
          <div className="mb-12">
            <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">Soporte</span>
            <h1 className="text-4xl font-bold text-white tracking-tight mt-3 mb-4">Centro de Soporte</h1>
            <p className="text-white/40 text-sm">Estamos aquí para ayudarte</p>
          </div>
          <div className="border-t border-white/5 mb-12" />
          <div className="flex flex-col gap-8 text-white/70 text-sm leading-relaxed">
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">Contacto directo</h2>
              <p>Para soporte técnico o cualquier duda sobre tu cuenta, contáctanos directamente:</p>
              <div className="mt-4 flex flex-col gap-3">
                <a href="mailto:sebastian@goroot.ai" className="flex items-center gap-3 border border-white/5 bg-white/[0.02] rounded-xl px-5 py-4 hover:border-blue-500/30 transition-colors">
                  <span className="text-blue-400">✉️</span>
                  <span className="text-white">sebastian@goroot.ai</span>
                </a>
                <a href="https://wa.me/message/BBFVGPKQADOPP1" target="_blank" className="flex items-center gap-3 border border-white/5 bg-white/[0.02] rounded-xl px-5 py-4 hover:border-blue-500/30 transition-colors">
                  <span className="text-blue-400">💬</span>
                  <span className="text-white">WhatsApp</span>
                </a>
              </div>
            </section>
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">Horario de atención</h2>
              <p>Lunes a viernes de 9:00 a 18:00 hrs (Ciudad de México, GMT-6). Respondemos todos los mensajes en menos de 24 horas hábiles.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">Dirección</h2>
              <p>C. Montes Urales 424, Lomas - Virreyes,<br />Lomas de Chapultepec V Secc.,<br />Miguel Hidalgo, 11000<br />Ciudad de México, CDMX</p>
            </section>
          </div>
        </div>
      </main>
    )
  }