'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Producto', href: '/#features' },
  { label: 'Precios', href: '/#pricing' },
  { label: 'Blog', href: '/blog' },
]

const WHATSAPP_URL = 'https://wa.me/message/BBFVGPKQADOPP1'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <Link href="/" className="flex items-center">
      <img src="/api/media/file/Rootwhite-1.png" alt="Root" style={{ height: '20px', width: 'auto', maxWidth: '80px' }} />
</Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="https://app.goroot.ai/"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            className="text-sm bg-blue-500 hover:bg-blue-400 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Agendar demo
          </Link>
        </div>

        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-black px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            className="text-sm bg-blue-500 text-white font-medium px-4 py-2 rounded-lg text-center"
            onClick={() => setOpen(false)}
          >
            Agendar demo
          </Link>
        </div>
      )}
    </header>
  )
}