import Image from 'next/image'

export function HeaderCheckout() {
  return (
    <header className="w-full bg-white border-b border-brand-border">
      <div className="container-ms flex items-center justify-center py-4 lg:py-5">
        <a href="/" className="flex items-center justify-center">
          <Image
            src="/img/logo-mais-score-black.svg"
            alt="Mais Score"
            width={144}
            height={38}
            priority
          />
        </a>
      </div>
    </header>
  )
}
