import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function seed() {
  const payload = await getPayload({ config: configPromise })

  // Limpiar todo
  console.log('🗑️ Limpiando datos existentes...')
  for (const collection of ['testimonials', 'features', 'pricing-plans', 'faqs', 'posts'] as const) {
    const existing = await payload.find({ collection, limit: 100 })
    for (const doc of existing.docs) {
      await payload.delete({ collection, id: doc.id })
    }
  }

  // Testimonios
  console.log('🌱 Seeding testimonials...')
  const testimonials = [
    {
      authorName: 'David Llanes',
      authorRole: 'Head of Engineering',
      company: 'Nextia',
      quote: 'Estamos implementando Root a clientes de Nextia en menos de una semana. La integración con sistemas existentes es sorprendentemente sencilla y el equipo lo adopta de inmediato.',
      metric: { value: '<1 sem', label: 'Tiempo de implementación' },
      featured: true,
      order: 1,
    },
    {
      authorName: 'Manuel Ramírez',
      authorRole: 'Gerente Comercial',
      company: 'Hybridge Education',
      quote: 'Las automatizaciones con IA nos ahorran 4 horas diarias por agente. El equipo ahora se enfoca en cerrar, no en responder mensajes repetitivos.',
      metric: { value: '4h', label: 'Ahorradas por agente/día' },
      featured: true,
      order: 2,
    },
    {
      authorName: 'Daniela Anaya',
      authorRole: 'Directora Universidad',
      company: 'Hybridge Education',
      quote: 'Con Root atendemos 10 veces más estudiantes por hora sin aumentar el equipo. La automatización de WhatsApp cambió completamente nuestra operación.',
      metric: { value: '10x', label: 'Más estudiantes por hora' },
      featured: false,
      order: 3,
    },
    {
      authorName: 'Sofía Ardura',
      authorRole: 'Growth Manager',
      company: 'Eugenia',
      quote: 'Desde que implementamos Root en Eugenia estamos vendiendo al doble. Los flujos automatizados convierten leads que antes se perdían en el caos de WhatsApp.',
      metric: { value: '2x', label: 'Ventas desde implementación' },
      featured: false,
      order: 4,
    },
  ]
  for (const t of testimonials) {
    await payload.create({ collection: 'testimonials', data: t })
    console.log(`✅ Testimonio: ${t.authorName}`)
  }

  // Features
  console.log('🌱 Seeding features...')
  const features = [
    {
      title: 'WhatsApp Nativo',
      description: 'Conecta directamente con la API oficial de WhatsApp Business. Sin intermediarios, sin restricciones.',
      icon: '💬',
      category: 'whatsapp',
      order: 1,
      active: true,
    },
    {
      title: 'Automatizaciones con IA',
      description: 'Crea flujos inteligentes que responden, califican y nutren leads automáticamente las 24 horas.',
      icon: '🤖',
      category: 'automation',
      order: 2,
      active: true,
    },
    {
      title: 'Full CRM',
      description: 'Gestiona todos tus contactos, conversaciones y seguimientos desde un solo lugar.',
      icon: '📊',
      category: 'crm',
      order: 3,
      active: true,
    },
    {
      title: 'Llamadas',
      description: 'Realiza y recibe llamadas directamente desde la plataforma sin salir de tu flujo de trabajo.',
      icon: '📞',
      category: 'calls',
      order: 4,
      active: true,
    },
    {
      title: 'Automatizaciones de Acciones',
      description: 'Dispara acciones automáticas en tu CRM, ERP o cualquier sistema cuando ocurran eventos clave.',
      icon: '⚡',
      category: 'automation',
      order: 5,
      active: true,
    },
    {
      title: 'Integraciones',
      description: 'Conecta Root con Salesforce, SAP, HubSpot, Excel y más. Tu stack existente, potenciado.',
      icon: '🔗',
      category: 'integrations',
      order: 6,
      active: true,
    },
  ]
  for (const f of features) {
    await payload.create({ collection: 'features', data: f })
    console.log(`✅ Feature: ${f.title}`)
  }

  // Pricing Plans
  console.log('🌱 Seeding pricing plans...')
  const plans = [
    {
      name: 'Básico',
      tagline: 'Para PyMEs y Startups',
      price: 4999,
      features: [
        { text: '3 usuarios incluidos', enabled: true },
        { text: 'WhatsApp Business API', enabled: true },
        { text: 'CRM básico', enabled: true },
        { text: 'Automatizaciones simples', enabled: true },
        { text: 'Soporte por email', enabled: true },
        { text: 'Integraciones avanzadas', enabled: false },
        { text: 'IA personalizada', enabled: false },
      ],
      ctaLabel: 'Hablar con asesor',
      ctaUrl: 'https://wa.me/15557794199',
      highlighted: false,
      order: 1,
      active: true,
    },
    {
      name: 'Pro',
      tagline: 'Para equipos en crecimiento',
      price: 10599,
      badge: 'Más popular',
      features: [
        { text: '10 usuarios incluidos', enabled: true },
        { text: 'WhatsApp Business API', enabled: true },
        { text: 'CRM completo', enabled: true },
        { text: 'Automatizaciones con IA', enabled: true },
        { text: 'Soporte prioritario', enabled: true },
        { text: 'Integraciones avanzadas', enabled: true },
        { text: 'IA personalizada', enabled: false },
      ],
      ctaLabel: 'Hablar con asesor',
      ctaUrl: 'https://wa.me/15557794199',
      highlighted: true,
      order: 2,
      active: true,
    },
    {
      name: 'Enterprise',
      tagline: 'Para grandes operaciones',
      priceLabel: 'Precio a convenir',
      features: [
        { text: 'Usuarios ilimitados', enabled: true },
        { text: 'WhatsApp Business API', enabled: true },
        { text: 'CRM completo', enabled: true },
        { text: 'Automatizaciones con IA', enabled: true },
        { text: 'Soporte dedicado 24/7', enabled: true },
        { text: 'Integraciones avanzadas', enabled: true },
        { text: 'IA personalizada', enabled: true },
      ],
      ctaLabel: 'Hablar con asesor',
      ctaUrl: 'https://wa.me/15557794199',
      highlighted: false,
      order: 3,
      active: true,
    },
  ]
  for (const p of plans) {
    await payload.create({ collection: 'pricing-plans', data: p })
    console.log(`✅ Plan: ${p.name}`)
  }

  // FAQs
  console.log('🌱 Seeding FAQs...')
  const faqs = [
    {
      question: '¿Necesito la API oficial de WhatsApp Business?',
      answer: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Sí, Root funciona con la API oficial de Meta. Te ayudamos a tramitar el acceso durante el onboarding sin costo adicional.' }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
      category: 'general',
      order: 1,
    },
    {
      question: '¿Cuánto tiempo toma la implementación?',
      answer: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'La mayoría de nuestros clientes están operando en menos de una semana. El proceso incluye configuración, migración de contactos e integración con tus sistemas.' }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
      category: 'general',
      order: 2,
    },
    {
      question: '¿Puedo integrar Root con mi CRM actual?',
      answer: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Sí. Root se integra con Salesforce, HubSpot, SAP, Zoho y cualquier sistema que tenga API. También tenemos integración nativa con Excel y Google Sheets.' }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
      category: 'integrations',
      order: 3,
    },
    {
      question: '¿Qué pasa si supero el límite de usuarios de mi plan?',
      answer: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Puedes agregar usuarios adicionales o escalar a un plan superior en cualquier momento. No hay penalizaciones por cambiar de plan.' }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
      category: 'pricing',
      order: 4,
    },
    {
      question: '¿Los mensajes de WhatsApp tienen costo adicional?',
      answer: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'El costo de los mensajes de la API de Meta se cobra por separado según su tarifa oficial. Root no cobra markup sobre estos mensajes.' }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
      category: 'pricing',
      order: 5,
    },
    {
      question: '¿Mis datos están seguros?',
      answer: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Sí. Toda la información está encriptada en tránsito y en reposo. Cumplimos con GDPR y la Ley Federal de Protección de Datos de México.' }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
      category: 'security',
      order: 6,
    },
  ]
  for (const f of faqs) {
    await payload.create({ collection: 'faqs', data: f })
    console.log(`✅ FAQ: ${f.question}`)
  }

  // Posts
  console.log('🌱 Seeding posts...')
  await payload.create({
    collection: 'posts',
    data: {
      title: 'Cómo automatizar WhatsApp para vender más',
      slug: 'como-automatizar-whatsapp',
      excerpt: 'Aprende las estrategias que usan las empresas más exitosas para cerrar más ventas por WhatsApp.',
      category: 'whatsapp',
      status: 'published',
      publishedAt: new Date().toISOString(),
      featured: true,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'WhatsApp se ha convertido en el canal de ventas más poderoso para empresas en Latinoamérica. Con más de 2 mil millones de usuarios activos, es donde están tus clientes.' }],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '¿Por qué automatizar WhatsApp?' }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Las empresas que automatizan sus conversaciones de WhatsApp reportan un incremento promedio del 3x en conversiones. La clave está en responder rápido, calificar leads automáticamente y dar seguimiento sin depender del equipo.' }],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Las 3 automatizaciones que más impacto tienen' }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '1. Respuesta inmediata: El 78% de los clientes compra con el proveedor que responde primero. Una automatización de bienvenida puede capturar ese momento crítico.' }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '2. Calificación de leads: Usa flujos inteligentes para identificar qué prospectos tienen mayor probabilidad de compra y prioriza tu tiempo en ellos.' }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '3. Seguimiento automático: El 80% de las ventas se cierran después del quinto contacto. Automatiza los follow-ups para que ningún lead se pierda.' }],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  })
  console.log('✅ Post: Cómo automatizar WhatsApp')

  console.log('🎉 Seed completo')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})