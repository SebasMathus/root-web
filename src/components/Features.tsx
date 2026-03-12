const FEATURES = [
    {
      icon: '💬',
      title: 'WhatsApp Nativo',
      description: 'Conecta directamente con la API oficial de WhatsApp Business. Sin intermediarios, sin restricciones.',
    },
    {
      icon: '🤖',
      title: 'Automatizaciones con IA',
      description: 'Crea flujos inteligentes que responden, califican y nutren leads automáticamente las 24 horas.',
    },
    {
      icon: '📊',
      title: 'Full CRM',
      description: 'Gestiona todos tus contactos, conversaciones y seguimientos desde un solo lugar.',
    },
    {
      icon: '📞',
      title: 'Llamadas',
      description: 'Realiza y recibe llamadas directamente desde la plataforma sin salir de tu flujo de trabajo.',
    },
    {
      icon: '⚡',
      title: 'Automatizaciones de Acciones',
      description: 'Dispara acciones automáticas en tu CRM, ERP o cualquier sistema cuando ocurran eventos clave.',
    },
    {
      icon: '🔗',
      title: 'Integraciones',
      description: 'Conecta Root con Salesforce, SAP, HubSpot, Excel y más. Tu stack existente, potenciado.',
    },
  ]
  
  export default function Features() {
    return (
      <section id="features" className="bg-black py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs text-white/60 tracking-wide">Características</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Todo lo que necesitas para<br />
              <span className="text-blue-500">vender más por WhatsApp</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Una plataforma completa para gestionar, automatizar y escalar tus conversaciones.
            </p>
          </div>
  
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="border border-white/5 bg-white/[0.02] rounded-xl p-6 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-200"
              >
                <div className="text-2xl mb-4">{feature.icon}</div>
                <h3 className="text-white font-semibold text-base mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }