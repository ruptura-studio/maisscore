import Link from 'next/link'
import Image from 'next/image'
import { PostFrontmatter } from '@/lib/blog'

type Props = {
  post: PostFrontmatter
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-brand-border bg-white hover:shadow-md transition-shadow"
    >
      {post.ogImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={post.ogImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex flex-col gap-3 p-6">
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-brand-orange uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h2 className="text-heading-3 text-brand-navy group-hover:text-brand-orange transition-colors">
          {post.title}
        </h2>
        <p className="text-para-sm text-brand-navy/70 line-clamp-2">{post.description}</p>
        <span className="text-para-sm text-brand-navy/50 mt-auto">{formatDate(post.date)}</span>
      </div>
    </Link>
  )
}
