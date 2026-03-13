import { Mail, Phone } from 'lucide-react'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'

const links = {
  empresa: [
    { label: 'Sobre nós', href: '#sobre' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Nossos clientes', href: '#depoimentos' },
    { label: 'FAQ', href: '#faq' },
  ],
  legal: [
    { label: 'Termos de uso', href: '/termos' },
    { label: 'Política de privacidade', href: '/privacidade' },
    { label: 'Política de reembolso', href: '/reembolso' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-grafite text-white">
      <div className="container-ms py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <span className="font-semibold text-xl tracking-tight">
              Mais<span className="text-accent">Score</span>
            </span>
            <p className="text-para-sm text-white/60 leading-relaxed">
              Regularização de crédito via processo jurídico. Fundada em 2021.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/5515974058014"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="https://instagram.com/mais.score.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="mailto:contato@maisscore.com.br"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="E-mail"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Empresa */}
          <div className="flex flex-col gap-4">
            <h4 className="text-para-sm font-semibold uppercase tracking-[1.5px] text-white/40">
              Empresa
            </h4>
            <ul className="flex flex-col gap-3">
              {links.empresa.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-para-sm text-white/70 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="text-para-sm font-semibold uppercase tracking-[1.5px] text-white/40">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {links.legal.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-para-sm text-white/70 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="flex flex-col gap-4">
            <h4 className="text-para-sm font-semibold uppercase tracking-[1.5px] text-white/40">
              Contato
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://wa.me/5515974058014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-para-sm text-white/70 hover:text-white transition-colors"
                >
                  <FaWhatsapp size={14} />
                  (15) 97405-8014
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@maisscore.com.br"
                  className="flex items-center gap-2 text-para-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail size={14} />
                  contato@maisscore.com.br
                </a>
              </li>
              <li>
                <a
                  href="tel:5515974058014"
                  className="flex items-center gap-2 text-para-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone size={14} />
                  (15) 97405-8014
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-ms py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-para-xs text-white/40 text-center sm:text-left">
            © 2025 Mais Score — uma marca Ruptura Comércio Digital Ltda. | CNPJ: 64.945.712/0001-66
          </p>
          <p className="text-para-xs text-white/30">Fundada em 2021</p>
        </div>
      </div>
    </footer>
  )
}
