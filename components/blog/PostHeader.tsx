import Image from 'next/image'
import { PostFrontmatter } from '@/lib/blog'

type Props = {
  frontmatter: PostFrontmatter
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function PostHeader({ frontmatter }: Props) {
  return (
    <header className="flex flex-col gap-6">
      {frontmatter.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="font-dm text-cap text-brand-orange uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <h1 className="font-dm text-display text-brand-navy">{frontmatter.title}</h1>
      <p className="font-dm text-subtitle text-brand-navy/70">{frontmatter.description}</p>
      <span className="font-dm text-p text-brand-navy/50">{formatDate(frontmatter.date)}</span>
      {frontmatter.ogImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image
            src={frontmatter.ogImage}
            alt={frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </header>
  )
}
