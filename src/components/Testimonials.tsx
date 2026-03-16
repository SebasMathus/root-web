import { getTestimonials } from '@/lib/payload'
import Image from 'next/image'

const S3_BASE = 'https://root-web-cms.s3.us-east-1.amazonaws.com'

function getAvatarUrl(avatar: any): string {
  if (!avatar?.url) return ''
  if (avatar.url.startsWith('/api')) {
    return `${S3_BASE}/${avatar.filename}`
  }
  return avatar.url
}

export default async function Testimonials() {
  const testimonials = await getTestimonials()

  if (!testimonials.length) return null

  return (
    <section className="bg-transparent py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-white/60 tracking-wide">Testimonios</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Empresas que ya{' '}
            <span className="text-blue-500">crecen con Root</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="border border-white/5 bg-white/[0.02] rounded-xl p-6 flex flex-col gap-4 hover:border-blue-500/20 transition-colors"
            >
              <p className="text-white/70 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-3">
                  {t.avatar && typeof t.avatar === 'object' && t.avatar.url && (
                    <Image
                      src={getAvatarUrl(t.avatar)}
                      alt={t.authorName}
                      width={36}
                      height={36}
                      className="rounded-full object-cover w-9 h-9"
                    />
                  )}
                  <div>
                    <div className="text-white font-medium text-sm">{t.authorName}</div>
                    <div className="text-white/40 text-xs mt-0.5">
                      {t.authorRole} · {t.company}
                    </div>
                  </div>
                </div>
                {t.metric?.value && (
                  <div className="text-right">
                    <div className="text-blue-400 font-bold text-lg">{t.metric.value}</div>
                    <div className="text-white/30 text-xs">{t.metric.label}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}