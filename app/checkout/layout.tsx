import type { Metadata } from 'next'

const checkoutDescription =
  'Clique aqui, selecione CPF ou CNPJ. PIX ou 3x no Cartão de Crédito.'

export const metadata: Metadata = {
  title: 'Página de Pagamento',
  description: checkoutDescription,
  openGraph: {
    title: 'Página de Pagamento',
    description: checkoutDescription,
    url: 'https://maisscore.com.br/checkout',
    siteName: 'Pagamento Mais Score',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://maisscore.com.br/img/open-graph-preview.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Página de Pagamento',
    description: checkoutDescription,
    images: ['https://maisscore.com.br/img/open-graph-preview.png'],
  },
  alternates: {
    canonical: 'https://maisscore.com.br/checkout',
  },
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
