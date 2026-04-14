# Mais Score — CLAUDE.md

## Fonte da Verdade — Obsidian (OBRIGATÓRIO)

O vault Obsidian em `C:\Vaults\mais-score` é a **fonte primária de toda informação do projeto**: copy, regras de negócio, produto, prazos, preços, scripts, briefings e qualquer dado de conteúdo.

**Regra:** Antes de responder qualquer pergunta sobre informações do projeto (copy, produto, preços, prazos, processo, etc.), consultar o vault via MCP `obsidian` (`list_directory` + `read_file`). Nunca inventar ou assumir valores — sempre verificar no vault primeiro.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v3 + shadcn/ui components
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Lucide React + React Icons
- **Database**: Prisma 7 + Supabase PostgreSQL
- **Email**: Resend
- **Validation**: Zod

## Code Conventions
- **Language**: All UI text is in **Brazilian Portuguese**
- **Components**: Functional components with named exports
- **Imports**: Use `@/` path alias for absolute imports
- **Styling**: Tailwind utility classes; use `cn()` from `lib/utils` for conditional classes
- **No CSS modules** — Tailwind only
- **shadcn/ui**: Prefer existing components from `components/ui/` before creating new ones

## Development Commands
```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # ESLint
```
