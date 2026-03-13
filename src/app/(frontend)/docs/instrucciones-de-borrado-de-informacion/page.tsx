export const metadata = {
    title: 'Instrucciones de Borrado de Información | Root',
    description: 'Cómo solicitar el borrado de tu información personal en Root.',
  }
  
  export default function BorradoDeInformacion() {
    return (
      <main className="bg-black min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-32">
          <div className="mb-12">
            <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">Legal</span>
            <h1 className="text-4xl font-bold text-white tracking-tight mt-3 mb-4">Instrucciones de Borrado de Información</h1>
            <p className="text-white/40 text-sm">Última actualización: marzo 2026</p>
          </div>
          <div className="border-t border-white/5 mb-12" />
          <div className="flex flex-col gap-8 text-white/70 text-sm leading-relaxed">
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">¿Cómo solicitar el borrado de tu información?</h2>
              <p>De acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), tienes derecho a solicitar la cancelación y borrado de tus datos personales de nuestra plataforma.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">Proceso de solicitud</h2>
              <p>Para solicitar el borrado de tu información, sigue estos pasos:</p>
              <ul className="list-disc list-inside mt-3 flex flex-col gap-2">
                <li>Envía un correo a <a href="mailto:sebastian@goroot.ai" className="text-blue-400 hover:text-blue-300">sebastian@goroot.ai</a> con el asunto "Solicitud de borrado de información"</li>
                <li>Incluye tu nombre completo y correo electrónico asociado a tu cuenta</li>
                <li>Especifica qué información deseas que sea eliminada</li>
                <li>Adjunta una identificación oficial para verificar tu identidad</li>
              </ul>
            </section>
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">Tiempos de respuesta</h2>
              <p>Procesaremos tu solicitud en un plazo máximo de 20 días hábiles a partir de la recepción. Te notificaremos por correo electrónico una vez que el proceso haya sido completado.</p>
            </section>
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">Información que puede ser retenida</h2>
              <p>Algunos datos pueden ser retenidos por obligaciones legales, fiscales o contractuales aún después de tu solicitud. En ese caso, te informaremos específicamente qué información no puede ser eliminada y por qué razón.</p>
            </section>
          </div>
        </div>
      </main>
    )
  }