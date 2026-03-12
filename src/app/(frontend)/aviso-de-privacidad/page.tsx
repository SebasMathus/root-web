export const metadata = {
    title: 'Aviso de Privacidad | Root',
    description: 'Aviso de Privacidad de Root - goroot.ai',
  }
  
  export default function AvisoDePrivacidad() {
    return (
      <main className="bg-black min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-32">
          <div className="mb-12">
            <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">Legal</span>
            <h1 className="text-4xl font-bold text-white tracking-tight mt-3 mb-4">Aviso de Privacidad</h1>
            <p className="text-white/40 text-sm">Última actualización: marzo 2026</p>
          </div>
  
          <div className="border-t border-white/5 mb-12" />
  
          <div className="flex flex-col gap-8 text-white/70 text-sm leading-relaxed">
  
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">1. Identidad y domicilio del Responsable</h2>
              <p>Root (en adelante "Root" o "el Responsable"), con domicilio en C. Montes Urales 424, Lomas - Virreyes, Lomas de Chapultepec V Secc., Miguel Hidalgo, 11000, Ciudad de México, CDMX, es responsable del tratamiento de sus datos personales conforme a lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).</p>
            </section>
  
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">2. Datos personales que recabamos</h2>
              <p>Para llevar a cabo las finalidades descritas en este aviso, recabamos los siguientes datos personales:</p>
              <ul className="list-disc list-inside mt-3 flex flex-col gap-2">
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono / WhatsApp</li>
                <li>Nombre y giro de la empresa</li>
                <li>Datos de uso de la plataforma</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">3. Finalidades del tratamiento</h2>
              <p>Sus datos personales serán utilizados para las siguientes finalidades primarias:</p>
              <ul className="list-disc list-inside mt-3 flex flex-col gap-2">
                <li>Proveer los servicios contratados de la plataforma Root</li>
                <li>Gestionar su cuenta y acceso a la plataforma</li>
                <li>Brindar soporte técnico y atención al cliente</li>
                <li>Procesar pagos y emitir comprobantes fiscales</li>
                <li>Cumplir con obligaciones legales y contractuales</li>
              </ul>
              <p className="mt-3">Finalidades secundarias:</p>
              <ul className="list-disc list-inside mt-3 flex flex-col gap-2">
                <li>Envío de comunicaciones comerciales y promociones</li>
                <li>Encuestas de satisfacción y mejora del servicio</li>
              </ul>
              <p className="mt-3">Si no desea que sus datos sean tratados para las finalidades secundarias, puede manifestarlo enviando un correo a <a href="mailto:sebastian@goroot.ai" className="text-blue-400 hover:text-blue-300">sebastian@goroot.ai</a>.</p>
            </section>
  
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">4. Transferencia de datos</h2>
              <p>Root no vende, cede ni transfiere sus datos personales a terceros sin su consentimiento, salvo en los casos previstos por la LFPDPPP o cuando sea necesario para la prestación del servicio con proveedores tecnológicos bajo estrictas obligaciones de confidencialidad.</p>
            </section>
  
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">5. Derechos ARCO</h2>
              <p>Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales (derechos ARCO). Para ejercer estos derechos, envíe su solicitud a <a href="mailto:sebastian@goroot.ai" className="text-blue-400 hover:text-blue-300">sebastian@goroot.ai</a> indicando su nombre completo, descripción clara del derecho que desea ejercer y cualquier documento que acredite su identidad.</p>
              <p className="mt-3">Responderemos a su solicitud en un plazo máximo de 20 días hábiles.</p>
            </section>
  
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">6. Uso de cookies y tecnologías de rastreo</h2>
              <p>Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia, analizar el tráfico y personalizar el contenido. Puede deshabilitar las cookies desde la configuración de su navegador, aunque esto puede afectar el funcionamiento del sitio.</p>
            </section>
  
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">7. Cambios al aviso de privacidad</h2>
              <p>Nos reservamos el derecho de modificar este aviso en cualquier momento. Las modificaciones serán publicadas en esta página con la fecha de actualización correspondiente. Le recomendamos revisarlo periódicamente.</p>
            </section>
  
            <section>
              <h2 className="text-white font-semibold text-lg mb-3">8. Contacto</h2>
              <p>Para cualquier duda o aclaración respecto a este aviso de privacidad, puede contactarnos en:</p>
              <div className="mt-3 flex flex-col gap-1">
                <p>Email: <a href="mailto:sebastian@goroot.ai" className="text-blue-400 hover:text-blue-300">sebastian@goroot.ai</a></p>
                <p>Domicilio: C. Montes Urales 424, Lomas - Virreyes, Lomas de Chapultepec V Secc., Miguel Hidalgo, 11000, Ciudad de México, CDMX</p>
              </div>
            </section>
  
          </div>
        </div>
      </main>
    )
  }