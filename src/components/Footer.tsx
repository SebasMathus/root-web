import Link from 'next/link'

const WHATSAPP_URL = 'https://wa.me/message/BBFVGPKQADOPP1'

export default function Footer() {
  return (
    <footer className="bg-transparent py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 py-16 border border-white/5 bg-white/[0.02] rounded-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            ¿Listo para transformar<br />
            <span className="text-blue-500">tu operación?</span>
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-md mx-auto">
            Agenda una demo gratuita y te mostramos cómo Root puede funcionar para tu negocio.
          </p>
          <Link href={WHATSAPP_URL} target="_blank" className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm">
            Agendar demo gratis
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <img src="https://root-web-cms.s3.us-east-1.amazonaws.com/root-white4.png" alt="Root" style={{ height: '32px', width: '32px' }} className="object-contain" />
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-3">
              WhatsApp CRM con IA para empresas en crecimiento.
            </p>
            <p className="text-white/30 text-xs leading-relaxed">
              C. Montes Urales 424, Lomas - Virreyes,<br />
              Lomas de Chapultepec V Secc.,<br />
              Miguel Hidalgo, 11000<br />
              Ciudad de México, CDMX
            </p>
            <a href="mailto:sebastian@goroot.ai" className="text-white/30 hover:text-white text-xs transition-colors mt-2 block">sebastian@goroot.ai</a>
          </div>

          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">Producto</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/#features" className="text-white/40 hover:text-white text-sm transition-colors">Features</Link></li>
              <li><Link href="/#pricing" className="text-white/40 hover:text-white text-sm transition-colors">Precios</Link></li>
              <li><Link href="/blog" className="text-white/40 hover:text-white text-sm transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">Legal</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/docs/aviso-de-privacidad" className="text-white/40 hover:text-white text-sm transition-colors">Aviso de Privacidad</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex items-center justify-center">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Root. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}