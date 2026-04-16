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
import { WhatsappFloat } from '@/components/shared/WhatsappFloat'
import { GridOverlay } from '@/components/dev/GridOverlay'

export const metadata: Metadata = {
  title: 'Mais Score - Limpa Nome',
  description:
    'Remova as restrições de seu CPF ou CNPJ em até 30 dias úteis.',
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
    title: 'Mais Score - Limpa Nome',
    description:
      'Remova as restrições de seu CPF ou CNPJ em até 30 dias úteis.',
    url: 'https://maisscore.com.br',
    siteName: 'Mais Score',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://maisscore.com.br/img/open-graph-preview.png', width: 1200, height: 630 }],
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
        <WhatsappFloat />
        {process.env.NODE_ENV === 'development' && <GridOverlay />}
      </body>
    </html>
  )
}
