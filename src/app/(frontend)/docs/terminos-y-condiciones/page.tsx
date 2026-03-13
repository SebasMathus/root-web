export const metadata = {
    title: 'Términos y Condiciones | Root',
    description: 'Términos y Condiciones de Root - goroot.ai',
  }
  
  export default function TerminosYCondiciones() {
    return (
      <main className="bg-black min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-32">
          <div className="mb-12">
            <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">Legal</span>
            <h1 className="text-4xl font-bold text-white tracking-tight mt-3 mb-4">Términos y Condiciones</h1>
            <p className="text-white/40 text-sm">Última actualización: marzo 2026</p>
          </div>
          <div className="border-t border-white/5 mb-12" />
          <div className="flex flex-col gap-8 text-white/70 text-sm leading-relaxed">
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">1. Aceptación de los términos</h2>
              <p>Al acceder y utilizar la plataforma Root, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguno de estos términos, no debe usar nuestros servicios.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">2. Descripción del servicio</h2>
              <p>Root es una plataforma de CRM y automatización de WhatsApp con inteligencia artificial, diseñada para empresas que desean mejorar sus procesos de ventas y comunicación con clientes.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">3. Uso permitido</h2>
              <p>El usuario se compromete a utilizar la plataforma únicamente para fines legales y de acuerdo con estos términos. Queda prohibido el uso de Root para enviar spam, contenido ilegal o cualquier actividad que viole las políticas de WhatsApp Business.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">4. Cuentas y seguridad</h2>
              <p>El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran bajo su cuenta. Debe notificar inmediatamente a Root sobre cualquier uso no autorizado.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">5. Pagos y facturación</h2>
              <p>Los servicios de Root se facturan mensualmente. Los precios están expresados en MXN e incluyen IVA cuando aplique. Root se reserva el derecho de modificar sus precios con un aviso previo de 30 días.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">6. Cancelación</h2>
              <p>El usuario puede cancelar su suscripción en cualquier momento. La cancelación tomará efecto al final del período de facturación vigente. No se realizan reembolsos por períodos parciales.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">7. Limitación de responsabilidad</h2>
              <p>Root no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso de la plataforma. La responsabilidad máxima de Root se limita al monto pagado por el usuario en los últimos 3 meses.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">8. Contacto</h2>
              <p>Para cualquier duda sobre estos términos: <a href="mailto:sebastian@goroot.ai" className="text-blue-400 hover:text-blue-300">sebastian@goroot.ai</a></p>
            </section>
          </div>
        </div>
      </main>
    )
  }