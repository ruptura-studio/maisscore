---
created: 2026-03-25T16:04:45.756Z
title: Implementar seção FAQ com 9 questões do Figma
area: ui
files:
  - components/sections/FAQ.tsx
---

## Problem

O Figma (node 166:11636, file divSXDEjuY1Xf2LmfKOSYl) tem o design final do FAQ pronto mas ainda não foi implementado no código. O componente atual precisa ser substituído pelo design aprovado.

## Solution

Layout: 2 colunas com 62px de gap, fundo branco, padding 120px top / 110px bottom / 190px horizontal.

9 questões (5 esquerda, 4 direita):
- Como vocês conseguem remover as restrições?
- E se não funcionar? Tem garantia? (garantia: 30 dias úteis)
- Preciso pagar minhas dívidas para limpar o nome?
- Em quanto tempo meu nome fica limpo? (15 a 30 dias úteis)
- Não tenho dinheiro agora. O que faço? (PIX à vista ou 2x cartão)
- Qualquer pessoa negativada pode contratar?
- Depois que limpar, o nome pode sujar de novo?
- Meu score vai aumentar depois que o nome limpar?
- Nome sujo impede de alugar um imóvel?

Cards: bg-white, border rgba(0,0,0,0.15), rounded-xl, px-8 py-6.
Pergunta: DM Sans Light 16px #101c2e. Resposta: DM Sans Light 16px #707070.
Ícone laranja (chevron) que rotaciona 180deg quando aberto.
Usar shadcn/ui Accordion. Estado inicial: todos fechados (ou apenas o primeiro aberto).
