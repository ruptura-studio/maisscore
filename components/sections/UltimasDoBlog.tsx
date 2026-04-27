import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, PostFrontmatter } from '@/lib/blog'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function BlogCard({ post }: { post: PostFrontmatter }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-border hover:shadow-lg transition-all duration-500 ease-in-out"
    >
      {post.ogImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={post.ogImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-in-out"
          />
        </div>
      )}
      <div className="flex flex-col gap-3 p-6">
        {post.tags?.length > 0 && (
          <span className="font-dm text-cap text-brand-orange uppercase tracking-wide">
            {post.tags[0]}
          </span>
        )}
        <h3 className="font-dm text-h3 text-brand-navy group-hover:text-brand-orange transition-colors duration-300 ease-out line-clamp-2">
          {post.title}
        </h3>
        <p className="font-dm text-[14px] leading-[18px] text-brand-navy/70 line-clamp-2">{post.description}</p>
        <span className="font-dm text-p text-brand-navy/50 mt-auto">{formatDate(post.date)}</span>
      </div>
    </Link>
  )
}

export function UltimasDoBlog() {
  const posts = getAllPosts().slice(0, 3)

  if (posts.length === 0) return null

  return (
    <section className="w-full bg-neutral-100 py-10 sm:py-24">
      <div className="container-ms flex flex-col items-center gap-8">

        <div className="flex flex-col items-center gap-4 pb-4">
          <p className="font-dm text-cap text-disabled">Blog</p>
          <h2 className="font-dm text-h2 text-brand-navy text-center">
            Últimas do blog
          </h2>
          <p className="font-dm text-p text-brand-navy/70 text-center max-w-xl">
            Dicas e guias para limpar o nome, aumentar o score e recuperar seu crédito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <Link href="/blog" className="btn-secondary mt-2">
          Ver todos os artigos
        </Link>

      </div>
    </section>
  )
}
