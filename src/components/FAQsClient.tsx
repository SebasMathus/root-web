'use client'

import { useState } from 'react'

type FAQ = {
  id: string
  question: string
  answer: any
}

export default function FAQsClient({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-2">
      {faqs.map((faq, i) => (
        <div
          key={faq.id}
          className="border border-white/5 bg-white/[0.02] rounded-xl overflow-hidden"
        >
          <button
            className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-white/90 text-sm font-medium">{faq.question}</span>
            <span className={`text-white/30 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
              +
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-4">
              <p className="text-white/50 text-sm leading-relaxed">
                {faq.answer?.root?.children?.[0]?.children?.[0]?.text || ''}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}