import { Hero } from '@/components/sections/Hero'
import { CtaResolverAgora } from '@/components/sections/CtaResolverAgora'
import { Pesquisa } from '@/components/sections/Pesquisa'
import { ComoFunciona } from '@/components/sections/ComoFunciona'
import { Depoimentos } from '@/components/sections/Depoimentos'
import { BeneficiosBar } from '@/components/sections/BeneficiosBar'
import { AgoraVocePode } from '@/components/sections/AgoraVocePode'
import { SobreNos } from '@/components/sections/SobreNos'
import { Precos } from '@/components/sections/Precos'
import { FAQ } from '@/components/sections/FAQ'
import { CtaWhatsapp } from '@/components/sections/CtaWhatsapp'
export default function HomePage() {
  return (
    <>
      <Hero />
      <CtaResolverAgora />
      <Pesquisa />
      <div id="como-funciona"><ComoFunciona /></div>
      <AgoraVocePode />
      <div id="depoimentos"><Depoimentos /></div>
      <div id="sobre"><SobreNos /></div>
      <div id="precos"><Precos /></div>
      <div id="faq"><FAQ /></div>
      <CtaWhatsapp />
      <BeneficiosBar />
    </>
  )
}
