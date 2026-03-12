import Link from 'next/link'
import { getPosts } from '@/lib/payload'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-32">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-white/60 tracking-wide">Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Recursos y estrategias<br />
            <span className="text-blue-500">para vender más</span>
          </h1>
          <p className="text-white/50 text-lg">
            Aprende cómo empresas como la tuya usan WhatsApp para crecer.
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-24 border border-white/5 rounded-xl">
            <p className="text-white/30 text-sm">Próximamente — el primer artículo está en camino.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="border border-white/5 bg-white/[0.02] rounded-xl p-6 hover:border-blue-500/30 transition-colors group"
              >
                {post.category && (
                  <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">
                    {post.category}
                  </span>
                )}
                <h2 className="text-white font-semibold text-lg mt-2 mb-3 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                {post.publishedAt && (
                  <p className="text-white/30 text-xs mt-4">
                    {new Date(post.publishedAt).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}