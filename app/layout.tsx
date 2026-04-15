import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-dm-sans',
})
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { GridOverlay } from '@/components/dev/GridOverlay'

export const metadata: Metadata = {
  title: 'Mais Score — Regularize seu CPF em até 15 dias úteis',
  description:
    'Já recuperamos a liberdade financeira de 1.142 famílias endividadas. Remova restrições no Serasa e SPC via processo jurídico próprio. Taxa de sucesso de 97%.',
  keywords: [
    'limpa nome',
    'regularizar CPF',
    'score Serasa',
    'sair do SPC',
    'limpar nome',
    'crédito',
    'Mais Score',
  ],
  openGraph: {
    title: 'Mais Score — Recupere sua liberdade financeira',
    description:
      'Regularize seu CPF em até 15 dias úteis com 97% de taxa de sucesso. Mais de 1.142 famílias atendidas.',
    url: 'https://maisscore.com.br',
    siteName: 'Mais Score',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://maisscore.com.br',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable} ${dmSans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'development' && <GridOverlay />}
      </body>
    </html>
  )
}
