import { getPostBySlug } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return notFound()

  return (
    <main className="bg-black min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-32">
        <Link
          href="/blog"
          className="text-white/40 hover:text-white text-sm transition-colors mb-12 flex items-center gap-2"
        >
          ← Volver al blog
        </Link>

        <div className="mb-12">
          {post.category && (
            <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">
              {post.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mt-3 mb-4 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-white/50 text-lg leading-relaxed">{post.excerpt}</p>
          )}
          {post.publishedAt && (
            <p className="text-white/30 text-sm mt-4">
              {new Date(post.publishedAt).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>

        <div className="border-t border-white/5 mb-12" />

        <div className="flex flex-col gap-4">
          {(post.content as any)?.root?.children?.map((node: any, i: number) => {
            if (node.type === 'paragraph') {
              return (
                <p key={i} className="text-white/70 leading-relaxed">
                  {node.children?.map((child: any, j: number) => (
                    <span key={j}>{child.text}</span>
                  ))}
                </p>
              )
            }
            if (node.type === 'heading') {
              if (node.tag === 'h2') return <h2 key={i} className="text-2xl font-bold text-white mt-4">{node.children?.map((c: any) => c.text).join('')}</h2>
              if (node.tag === 'h3') return <h3 key={i} className="text-xl font-bold text-white mt-3">{node.children?.map((c: any) => c.text).join('')}</h3>
            }
            return null
          })}
        </div>

        <div className="mt-16 border border-white/5 bg-white/[0.02] rounded-xl p-8 text-center">
          <h3 className="text-white font-semibold text-xl mb-2">¿Listo para empezar?</h3>
          <p className="text-white/50 text-sm mb-6">Agenda una demo y te mostramos Root en acción.</p>
          <Link
            href="https://wa.me/15557794199?text=Hola%2C%20quiero%20agendar%20una%20demo"
            target="_blank"
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Agendar demo gratis
          </Link>
        </div>
      </div>
    </main>
  )
}