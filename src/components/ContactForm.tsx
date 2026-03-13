'use client'

import { useState } from 'react'

const COUNTRIES = [
  'México', 'Estados Unidos', 'Colombia', 'Argentina', 'Chile', 'Perú',
  'Ecuador', 'Bolivia', 'Venezuela', 'Uruguay', 'Paraguay', 'Brasil',
  'España', 'Otro',
]

type FormState = {
  name: string
  company: string
  email: string
  phone: string
  country: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
  })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', company: '', email: '', phone: '', country: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-white/60 tracking-wide">Contacto</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Escríbenos por{' '}
            <a href="https://wa.me/message/BBFVGPKQADOPP1" target="_blank" className="text-blue-400 hover:text-blue-300 transition-colors">WhatsApp</a>
            {' '}o déjanos tus datos y te contactamos.
          </p>
        </div>

        {status === 'success' ? (
          <div className="border border-blue-500/30 bg-blue-500/5 rounded-xl p-8 text-center">
            <div className="text-3xl mb-4">✅</div>
            <h3 className="text-white font-semibold text-lg mb-2">¡Mensaje recibido!</h3>
            <p className="text-white/50 text-sm">Te contactaremos en menos de 24 horas.</p>
          </div>
        ) : (
          <div className="border border-white/5 bg-white/[0.02] rounded-xl p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs font-medium">Nombre completo *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Juan García"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs font-medium">Empresa *</label>
                  <input
                    name="company"
                    type="text"
                    required
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Mi Empresa SA de CV"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs font-medium">Correo electrónico *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="juan@miempresa.com"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs font-medium">Teléfono *</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+52 55 1234 5678"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-medium">País *</label>
                <select
                  name="country"
                  required
                  value={form.country}
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                >
                  <option value="" disabled className="bg-black">Selecciona tu país</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c} className="bg-black">{c}</option>
                  ))}
                </select>
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-xs">Hubo un error. Intenta de nuevo o escríbenos por WhatsApp.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
              >
                {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}