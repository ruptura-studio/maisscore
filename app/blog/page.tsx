import { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { PostCard } from '@/components/blog/PostCard'

export const metadata: Metadata = {
  title: 'Blog — Mais Score',
  description: 'Dicas, guias e informações sobre como limpar o nome, aumentar o score e regularizar seu CPF.',
  openGraph: {
    title: 'Blog — Mais Score',
    description: 'Dicas, guias e informações sobre como limpar o nome, aumentar o score e regularizar seu CPF.',
    url: 'https://maisscore.com.br/blog',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-heading-1 text-brand-navy mb-4">Blog</h1>
        <p className="text-para-lg text-brand-navy/70 max-w-2xl">
          Dicas, guias e tudo que você precisa saber para limpar o nome e aumentar seu score de crédito.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-para-md text-brand-navy/50">Nenhum post publicado ainda.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
