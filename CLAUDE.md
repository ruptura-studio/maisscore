# Mais Score — CLAUDE.md

## Fonte da Verdade — Obsidian (OBRIGATÓRIO)

O vault Obsidian em `C:\Vaults\mais-score` é a **fonte primária de toda informação do projeto**: copy, regras de negócio, produto, prazos, preços, scripts, briefings e qualquer dado de conteúdo.

**Regra:** Antes de responder qualquer pergunta sobre informações do projeto (copy, produto, preços, prazos, processo, etc.), consultar o vault via MCP `obsidian` (`list_directory` + `read_file`). Nunca inventar ou assumir valores — sempre verificar no vault primeiro.

**Isolamento:** Cada projeto tem seu próprio subdiretório em `C:\Vaults\<nome-do-projeto>`. Nunca cruzar informações entre projetos.

## Project Overview
Landing page para a **Mais Score**, serviço de regularização de CPF e score de crédito no Brasil. Stack: Next.js 15, React 19, TypeScript, Tailwind CSS, Prisma 7 + Supabase PostgreSQL.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v3 + shadcn/ui components
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Lucide React + React Icons
- **Database**: Prisma 7 + Supabase PostgreSQL
- **Email**: Resend
- **Validation**: Zod

## Directory Structure
```
app/                  # Next.js App Router
  api/                # API routes
  blog/               # Blog pages
  styleguide/         # Design system reference
  layout.tsx          # Root layout (Header + Footer)
  page.tsx            # Landing page
components/
  sections/           # Page sections (Hero, FAQ, LeadCapture, etc.)
  shared/             # Layout components (Header, Footer)
  ui/                 # shadcn/ui base components
lib/                  # Utilities and shared logic
prisma/               # Prisma schema and migrations
public/               # Static assets
  img/                # Images
```

## Code Conventions
- **Language**: All UI text is in **Brazilian Portuguese**
- **Components**: Functional components with named exports
- **Imports**: Use `@/` path alias for absolute imports
- **Styling**: Tailwind utility classes; use `cn()` from `lib/utils` for conditional classes
- **No CSS modules** — Tailwind only
- **shadcn/ui**: Prefer existing components from `components/ui/` before creating new ones

## Key Business Context
- Service: remove CPF restrictions from Serasa/SPC via legal process
- Target audience: Brazilian consumers with bad credit scores
- Key stats used in copy: 97% success rate, 1.142+ families served, results in up to 30 business days
- Site URL: `https://maisscore.com.br`

## Development Commands
```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # ESLint
```
