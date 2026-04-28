import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { PostHeader } from '@/components/blog/PostHeader'
import { getMDXComponents } from '@/components/blog/MDXComponents'
import { JsonLd } from '@/components/blog/JsonLd'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return {}

  const { frontmatter } = post

  return {
    title: `${frontmatter.title} — Mais Score`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `https://maisscore.com.br/blog/${frontmatter.slug}`,
      images: frontmatter.ogImage ? [{ url: frontmatter.ogImage, width: 1200, height: 630 }] : [],
      type: 'article',
      publishedTime: frontmatter.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.ogImage ? [frontmatter.ogImage] : [],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const { frontmatter, content } = post

  return (
    <>
      <JsonLd frontmatter={frontmatter} slug={slug} />
      <main className="container-ms py-16">
        <PostHeader frontmatter={frontmatter} />
        <article className="mt-10 prose-none">
          <MDXRemote source={content} components={getMDXComponents()} />
        </article>
      </main>
    </>
  )
}
