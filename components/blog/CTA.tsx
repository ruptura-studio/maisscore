import Link from 'next/link'

type Props = {
  title?: string
  description?: string
  label?: string
  href?: string
}

export function CTA({
  title = 'Regularize seu CPF agora',
  description = 'Mais de 1.142 famílias já limparam o nome com a Mais Score. Taxa de sucesso de 97%.',
  label = 'Quero limpar meu nome',
  href = '/#contato',
}: Props) {
  return (
    <div className="rounded-2xl bg-brand-navy text-white px-8 py-10 my-8 flex flex-col items-center text-center gap-4">
      <h3 className="text-heading-3 text-white">{title}</h3>
      <p className="text-para-md text-white/75 max-w-md">{description}</p>
      <Link href={href} className="btn-primary mt-2">
        {label}
      </Link>
    </div>
  )
}
