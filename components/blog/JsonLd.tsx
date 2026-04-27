import { PostFrontmatter } from '@/lib/blog'

type Props = {
  frontmatter: PostFrontmatter
  slug: string
}

export function JsonLd({ frontmatter, slug }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    image: frontmatter.ogImage
      ? `https://maisscore.com.br${frontmatter.ogImage}`
      : 'https://maisscore.com.br/img/open-graph-preview.png',
    url: `https://maisscore.com.br/blog/${slug}`,
    author: {
      '@type': 'Organization',
      name: 'Mais Score',
      url: 'https://maisscore.com.br',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mais Score',
      url: 'https://maisscore.com.br',
      logo: {
        '@type': 'ImageObject',
        url: 'https://maisscore.com.br/img/logo-mais-score-black.svg',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
