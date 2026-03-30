import { Hero } from '@/components/sections/Hero'
import { CtaResolverAgora } from '@/components/sections/CtaResolverAgora'
import { Pesquisa } from '@/components/sections/Pesquisa'
import { ComoFunciona } from '@/components/sections/ComoFunciona'
import { Depoimentos } from '@/components/sections/Depoimentos'
import { BeneficiosBar } from '@/components/sections/BeneficiosBar'
import { AgoraVocePode } from '@/components/sections/AgoraVocePode'
import { SobreNos } from '@/components/sections/SobreNos'
export default function HomePage() {
  return (
    <>
      <Hero />
      <CtaResolverAgora />
      <Pesquisa />
      <ComoFunciona />
      <AgoraVocePode />
      <BeneficiosBar />
      <Depoimentos />
      <SobreNos />
    </>
  )
}
