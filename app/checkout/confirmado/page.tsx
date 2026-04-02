import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

const PROXIMOS_PASSOS = [
  {
    numero: '1',
    titulo: 'Processo iniciado em até 7 dias úteis',
    descricao: 'Nossa equipe jurídica recebe a notificação e inicia a ação judicial.',
  },
  {
    numero: '2',
    titulo: 'Você recebe atualizações pelo WhatsApp',
    descricao: 'Acompanhe cada etapa do processo diretamente no seu celular.',
  },
  {
    numero: '3',
    titulo: 'Nome limpo em até 30 dias úteis',
    descricao:
      'Após a liminar, seu nome é retirado do Serasa, SPC, Boa Vista e Cartórios de Protesto.',
  },
]

export default function ConfirmadoPage() {
  return (
    <div className="min-h-screen bg-neutral-100 py-12">
      <div className="container-ms max-w-[600px]">
        {/* Ícone de sucesso */}
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <div>
            <h1 className="font-dm text-h2 text-brand-navy">Pagamento confirmado!</h1>
            <p className="mt-2 text-sm text-foreground-alt">
              Obrigado por contratar a Mais Score. Seu processo foi registrado.
            </p>
          </div>
        </div>

        {/* Próximos passos */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-subtitle text-brand-navy">O que acontece agora?</h2>
          <div className="flex flex-col gap-6">
            {PROXIMOS_PASSOS.map((passo) => (
              <div key={passo.numero} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange text-sm font-semibold text-white">
                  {passo.numero}
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-navy">{passo.titulo}</p>
                  <p className="mt-1 text-txt-xs text-foreground-alt">{passo.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Garantia */}
        <div className="mt-4 rounded-lg border border-brand-border bg-white p-4">
          <p className="text-txt-xs text-brand-navy">
            <strong className="font-semibold">Garantia total de resultado</strong>
            <br />
            Se seu nome não ficar limpo em até 30 dias úteis, você recebe o dinheiro de volta. Base
            legal: Art. 42 do Código de Defesa do Consumidor.
          </p>
        </div>

        {/* Voltar */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-foreground-alt underline hover:text-brand-navy">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  )
}
