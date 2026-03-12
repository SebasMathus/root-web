import Link from 'next/link'

const WHATSAPP_URL = 'https://wa.me/15557794199?text=Hola%2C%20quiero%20agendar%20una%20demo'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* CTA final */}
        <div className="text-center mb-16 py-16 border border-white/5 bg-white/[0.02] rounded-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            ¿Listo para transformar<br />
            <span className="text-blue-500">tu operación?</span>
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-md mx-auto">
            Agenda una demo gratuita y te mostramos cómo Root puede funcionar para tu negocio.
          </p>
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm"
          >
            Agendar demo gratis
          </Link>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white font-semibold">Root</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              WhatsApp CRM con IA para empresas en crecimiento.
            </p>
          </div>

          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">Producto</h4>
            <ul className="flex flex-col gap-2">
              {['Features', 'Precios', 'Integraciones', 'Blog'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">Empresa</h4>
            <ul className="flex flex-col gap-2">
              {['Nosotros', 'Clientes', 'Careers', 'Contacto'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">Legal</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/terminos-y-condiciones" className="text-white/40 hover:text-white text-sm transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/aviso-de-privacidad" className="text-white/40 hover:text-white text-sm transition-colors">
                  Aviso de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Root. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href={WHATSAPP_URL} target="_blank" className="text-white/30 hover:text-white text-xs transition-colors">
              WhatsApp
            </Link>
            <Link href="#" className="text-white/30 hover:text-white text-xs transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="text-white/30 hover:text-white text-xs transition-colors">
              Twitter/X
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}