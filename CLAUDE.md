# Mais Score - CLAUDE.md

## Fonte da Verdade - Obsidian (OBRIGATORIO)

O vault Obsidian em `D:\Projects\mais-score\vault_mais_score` e a fonte primaria de toda informacao do projeto: copy, regras de negocio, produto, prazos, precos, scripts, briefings e qualquer dado de conteudo.

Regra: antes de responder qualquer pergunta sobre informacoes do projeto, copy, produto, precos, prazos, processo ou scripts, consultar o vault. Nunca inventar ou assumir valores; sempre verificar no vault primeiro.

## CRM / EspoCRM

Quando a conversa for sobre o CRM da Mais Score, usar `D:\Projects\mais-score\vault_mais_score\crm\requisitos_operacionais_espocrm.md` como fonte primaria e respeitar a diretriz de menu enxuto registrada no vault.

Resumo operacional atual:

- visivel no menu: `Lead`, `Contact`, `Users`, `Teams`, `Atendimentos` quando houver uso real, e `Campanhas` apenas se realmente consolidar a leitura de origem/campanha;
- oculto no menu: `Opportunity`, `Case`, `Listas de Alvo`, `Documentos`, `Working Time Calendars`, `Templates de Email`, `PDF Templates`, `Importar` para usuarios comuns e base de conhecimento vazia;
- fase 2: `Account`, `Opportunity`, `Case`, `Listas de Alvo`, `Documentos`, `Working Time Calendars`, `Templates de Email`, `PDF Templates`, base de conhecimento de atendimento e `Importar` com controle.

Diretriz de permissao por perfil:

- `Admin`: acesso total a configuracao, campos, layouts, usuarios e integracoes.
- `Gestao`: acesso a funil, pagamentos, campanhas, visoes e relatorios, sem configuracao tecnica.
- `Atendimento`: acesso a Leads, Contacts e Atendimentos, sem configuracao e sem entidades ocultas.
- `Operacao`: acesso a Leads pagos, Contacts de clientes e processos operacionais, com edicao limitada ao necessario.

## SACRO

Diretriz operacional principal:

`D:\Projects\mais-score\vault_mais_score\mkt\Sacro\protocolo-operacional.md`

Arquivo de visao geral e arquitetura:

`D:\Projects\mais-score\vault_mais_score\mkt\Sacro\sacro.md`

Arquivos de controle principais:

- `D:\Projects\mais-score\vault_mais_score\mkt\Sacro\status.md`
- `D:\Projects\mais-score\vault_mais_score\mkt\Sacro\log.md`
- `D:\Projects\mais-score\vault_mais_score\mkt\Sacro\handoff.md`

Quando o usuario executar `start-sacro`, seguir primeiro `protocolo-operacional.md`. A resposta inicial deve apresentar as opcoes `Sacro`, `Micro Sacro` e `Sacro Custom Execution` antes de qualquer outra acao.

Quando o usuario executar `exit-sacro`, seguir a rotina de fechamento do SACRO, atualizar as bases aplicaveis e encerrar no checkpoint atual sem iniciar nova micro tarefa.

## Tech Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript (strict)
- Styling: Tailwind CSS v3 + shadcn/ui components
- Fonts: Geist Sans & Geist Mono
- Icons: Lucide React + React Icons
- Database: Prisma 7 + Supabase PostgreSQL
- Email: Resend
- Validation: Zod

## Code Conventions

- Language: all UI text is in Brazilian Portuguese.
- Components: functional components with named exports.
- Imports: use `@/` path alias for absolute imports.
- Styling: Tailwind utility classes; use `cn()` from `lib/utils` for conditional classes.
- No CSS modules; Tailwind only.
- shadcn/ui: prefer existing components from `components/ui/` before creating new ones.

## Development Commands

```bash
npm run dev
npm run build
npm run lint
```
