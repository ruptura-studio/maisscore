import { Hero } from '@/components/sections/Hero'
import { Depoimentos } from '@/components/sections/Depoimentos'
import { SobreNos } from '@/components/sections/SobreNos'
import { ComoFunciona } from '@/components/sections/ComoFunciona'
import { Diferenciais } from '@/components/sections/Diferenciais'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Depoimentos />
      <SobreNos />
      <ComoFunciona />
      <Diferenciais />
      <FAQ />
      <CTA />
    </>
  )
}
