'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const BIROS = ['Serasa', 'Boa Vista', 'SPC', 'Cartório de Protesto', 'Não tenho certeza'] as const
type Biro = (typeof BIROS)[number]

const inputClass =
  'w-full bg-white border border-border rounded-lg px-3 py-[7.5px] text-para-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-dark/30'
const labelClass = 'text-para-sm font-medium text-foreground'
const fieldClass = 'flex flex-col gap-1'

export function LeadCapture() {
  const [form, setForm] = useState({
    documento: '',
    nome: '',
    cpf: '',
    whatsapp: '',
    email: '',
    objetivo: '',
    biros: [] as Biro[],
    termos: false,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  function toggleBiro(biro: Biro) {
    setForm((prev) => ({
      ...prev,
      biros: prev.biros.includes(biro)
        ? prev.biros.filter((b) => b !== biro)
        : [...prev.biros, biro],
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Obrigado! Em breve você receberá o Super Guia +Score no seu e-mail.')
  }

  return (
    <section className="w-full py-24 bg-secondary">
      <div className="container-ms">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — texto */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-caption text-foreground uppercase tracking-[1.5px]">Material gratuito</span>
              <h2 className="text-[32px] md:text-[40px] font-semibold leading-tight tracking-[-1.5px] text-foreground">
                Baixe nosso Super Guia +Score
              </h2>
              <p className="text-[18px] font-semibold text-foreground">
                Preencha o formulário e receba o Super Guia em seu e-mail
              </p>
              <p className="text-para-sm text-foreground">Não se preocupe, não vamos enviar spam.</p>
            </div>

            <p className="text-para-sm text-foreground leading-relaxed">
              O Super Guia +Score é o material mais completo que já produzimos. Nele, você vai
              entender como o sistema de crédito brasileiro funciona, quais são os seus direitos
              como consumidor e o que realmente pode ser feito para recuperar seu nome — sem
              promessas vazias.
            </p>
            <p className="text-para-sm text-foreground leading-relaxed">
              Dentro do guia, explicamos em linguagem simples os artigos do Código de Defesa do
              Consumidor que protegem você, como funciona o prazo de prescrição de dívidas, e quais
              estratégias você pode adotar hoje mesmo para começar a melhorar seu score,
              independentemente de contratar qualquer serviço.
            </p>
            <p className="text-para-sm text-foreground leading-relaxed">
              Este material é 100% gratuito e sem compromisso. Acreditamos que informação de
              qualidade é o primeiro passo para a liberdade financeira. Se depois de ler você quiser
              nossa ajuda profissional, estaremos aqui.
            </p>
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-lg p-6 flex flex-col gap-6"
          >
            {/* Qual documento */}
            <div className={fieldClass}>
              <label className={labelClass}>Qual documento você precisa limpar? *</label>
              <div className="relative">
                <select
                  name="documento"
                  value={form.documento}
                  onChange={handleChange}
                  className={inputClass + ' appearance-none pr-8'}
                  required
                >
                  <option value="" disabled>Selecione uma resposta</option>
                  <option value="cpf">CPF</option>
                  <option value="cnpj">CNPJ</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Nome + CPF */}
            <div className="grid grid-cols-2 gap-6">
              <div className={fieldClass}>
                <label className={labelClass}>Nome Completo *</label>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Ex. Maria da Silva"
                  className={inputClass}
                  required
                />
              </div>
              <div className={fieldClass}>
                <label className={labelClass}>CPF *</label>
                <input
                  name="cpf"
                  value={form.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* WhatsApp + E-Mail */}
            <div className="grid grid-cols-2 gap-6">
              <div className={fieldClass}>
                <label className={labelClass}>WhatsApp *</label>
                <input
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className={inputClass}
                  required
                />
              </div>
              <div className={fieldClass}>
                <label className={labelClass}>E-Mail *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            {/* Objetivo */}
            <div className={fieldClass}>
              <label className={labelClass}>O que espera conseguir com o Limpa Nome? *</label>
              <div className="relative">
                <select
                  name="objetivo"
                  value={form.objetivo}
                  onChange={handleChange}
                  className={inputClass + ' appearance-none pr-8'}
                  required
                >
                  <option value="" disabled>Selecione uma resposta</option>
                  <option value="financiamento_imovel">Financiar imóvel</option>
                  <option value="financiamento_veiculo">Financiar veículo</option>
                  <option value="cartao_credito">Cartão de crédito</option>
                  <option value="emprestimo">Empréstimo</option>
                  <option value="outro">Outro</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Birôs */}
            <div className={fieldClass}>
              <label className={labelClass}>Marque as opções onde seu nome está negativado *</label>
              <div className="flex flex-col gap-1 mt-1">
                {BIROS.map((biro) => (
                  <label key={biro} className="flex items-center gap-2 cursor-pointer h-6">
                    <input
                      type="checkbox"
                      checked={form.biros.includes(biro)}
                      onChange={() => toggleBiro(biro)}
                      className="shrink-0 accent-accent-dark size-4"
                    />
                    <span className="text-para-sm text-foreground">{biro}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            {/* Termos + Botão */}
            <div className="flex flex-col gap-6 items-center">
              <label className="flex items-start gap-2 cursor-pointer w-full">
                <input
                  type="checkbox"
                  name="termos"
                  checked={form.termos}
                  onChange={handleChange}
                  className="mt-0.5 shrink-0 accent-accent-dark size-4"
                  required
                />
                <span className="text-para-sm text-foreground leading-5">
                  Concordo com a{' '}
                  <a href="#" className="text-accent-dark underline">Política de Privacidade</a>
                  {' '}e autorizo o uso dos meus dados para contato e análise do meu caso, conforme a LGPD.
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-accent-dark text-white font-medium text-para-md py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Receber meu Super Guia
              </button>
            </div>

            <div className="w-full h-px bg-border" />

            <p className="text-para-xs text-foreground text-center">
              🔒 Seus dados estão protegidos com criptografia SSL
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
