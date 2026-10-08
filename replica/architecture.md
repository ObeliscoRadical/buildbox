# Architecture: Emergent Clone (Full-Stack AI Vibe-Coding Platform)

## Stack

| layer | choice | why |
| --- | --- | --- |
| web | Next.js 15 (App Router) + TypeScript | Server components rápidos, rotas de API seguras, streaming de resposta nativo e forte ecossistema de UI |
| styling | Tailwind CSS + shadcn/ui + Lucide Icons | Design moderno, componentes acessíveis e alta velocidade de estilização |
| editor | @monaco-editor/react | O mesmo motor do VS Code: syntax highlight nativo, abas, diff view e minimap |
| ai engine | Vercel AI SDK (`ai`) | Streaming de UI em tempo real, Tool Calling padronizado e abstração multimodelo |
| ai models | Gemini 2.5 Flash / Pro + Claude 3.7 Sonnet | Gemini para latência ultrabaixa e baixo custo; Claude para raciocínio e scaffolds complexos |
| sandbox | E2B Devboxes / WebContainers StackBlitz | Execução isolada em microVM Linux com Vite + Node.js e porta pública para iframe |
| database | PostgreSQL (Supabase ou Neon) | Confiabilidade relacional, tipos JSONB para diffs/checkpoints e constraints fortes |
| auth | Supabase Auth | Login social (Google, GitHub), Magic Links, JWTs integrados com Row Level Security |
| payments | Stripe Checkout + Billing Webhooks | Pagamentos de assinaturas mensais e pacotes de créditos com webhook seguro |
| deploy | Cloudflare Workers / Vercel API | Roteamento de subdomínios dinâmicos com SSL automático para os apps dos usuários |
| storage | Supabase Storage / Cloudflare R2 | Upload de capturas de tela e mockups anexados nos prompts |

## Schema

Tabelas: 8 tabelas centrais (`users`, `credit_accounts`, `credit_transactions`, `projects`, `project_files`, `checkpoints`, `conversation_turns`, `deployments`).
Regras de acesso: Row Level Security (RLS) habilitado em todas as tabelas no nível do PostgreSQL.

O script SQL completo está documentado em `replica/schema.sql`.

## API

| method path | does | who | input | output | flow |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST /api/auth/callback` | Conclui login e cria conta de créditos inicial (10 créditos free) | público | OAuth code | User session | F01 |
| `GET /api/projects` | Lista todos os projetos do usuário logado | auth | - | Project[] | F01, F03 |
| `POST /api/projects` | Cria novo projeto com template base | auth | `{ name, template_type, prompt }` | Project | F01 |
| `POST /api/projects/:id/prompt` | Executa turno do agente com streaming de ações e consumo de crédito | auth | `{ prompt, attachments, model }` | SSE Stream (Tool calls, code, status) | F01, F02 |
| `GET /api/projects/:id/files` | Obtém árvore de arquivos e conteúdo para o Monaco | auth | - | ProjectFile[] | F03 |
| `PUT /api/projects/:id/files` | Salva edição manual de arquivo feita pelo usuário | auth | `{ path, content }` | ProjectFile | F03 |
| `POST /api/projects/:id/rollback` | Restaura projeto para um checkpoint anterior | auth | `{ checkpoint_id }` | Project snapshot | F04 |
| `POST /api/projects/:id/fork` | Duplica o projeto para novo ambiente | auth | `{ new_name }` | Project clone | F04 |
| `POST /api/projects/:id/deploy` | Gera build de produção e vincula a subdomínio com SSL | auth | `{ subdomain }` | Deployment | F06 |
| `GET /api/credits/balance` | Consulta saldo e histórico de uso do usuário | auth | - | CreditAccount + transactions | F05 |
| `POST /api/billing/checkout` | Cria sessão Stripe para plano ou pacote avulso | auth | `{ price_id, type }` | `{ checkout_url }` | F05 |
| `POST /api/billing/webhook` | Recebe evento do Stripe e credita saldo no banco | Stripe IP | Webhook payload | `{ received: true }` | F05 |
| `POST /api/github/sync` | Exporta ou sincroniza commits com repositório GitHub | auth | `{ repo_name, private }` | `{ repo_url }` | F07 |
| `GET /api/projects/:id/export` | Gera e faz stream do arquivo .zip com código limpo | auth | - | binary zip stream | F07 |

### Webhooks
* **Inbound:** Stripe (`checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`).
* **Outbound:** Notificações de deploy concluído via Server-Sent Events (SSE).

### Background Jobs
* `sandbox_cleanup`: A cada 30 minutos, desliga instâncias de sandboxes inativas para economizar custos.
* `subscription_renewal`: Diário, confere status de renovação de cotas mensais de crédito.

## The parts that bite

* **Consumo de créditos em chamadas com erro:** Se o agente quebrar a geração por erro de rede ou modelo, a transação de crédito deve ser estornada imediatamente (`refund`), evitando que o usuário sinta que perdeu dinheiro por falha da plataforma.
* **Idempotência no Webhook do Stripe:** O webhook pode entregar o mesmo evento mais de uma vez. O endpoint armazena o `stripe_event_id` para garantir que o crédito só seja adicionado 1 única vez.
* **Compilação e Auto-healing em Loop Infinito:** O auto-healer tem limite estrito de **3 tentativas automáticas**. Se o código não compilar na terceira tentativa, ele pausa, explica o erro ao usuário no chat e não queima mais créditos.
* **Isolamento de Segurança no Sandbox:** Usuários podem gerar código malicioso ou loops infinitos de CPU. O E2B / WebContainer roda em sandbox fechado sem acesso à rede interna ou variáveis de ambiente do servidor host.

## Build order

1. **Vertical slice:**
   * Telas: S03 (Dashboard simples), S05 (Chat básico com input), S06 (Live preview com iframe).
   * Banco: `users`, `projects`, `project_files`, `credit_accounts`.
   * Rotas: `POST /api/projects`, `POST /api/projects/:id/prompt`, `GET /api/projects/:id/files`.
   * Prova de conceito: Usuário digita prompt -> Agente cria arquivos -> Iframe carrega e renderiza.
2. **Must-haves:**
   * Motor multi-agente completo (Planner, Coder, Auto-healer com detecção de erro).
   * Editor Monaco completo com árvore de arquivos, abas e visualizador de diffs.
   * Sistema transacional de créditos e bloqueio em zero créditos.
   * Rollback por checkpoints e fork de projetos.
   * Deploy com 1 clique e exportação ZIP.
3. **Should-haves:**
   * Billing Stripe (Assinaturas Starter/Pro e Pacotes Top-up).
   * Sincronização bidirecional com GitHub.
   * Terminal de logs e gaveta de console.
   * Provisionamento de banco de dados Supabase para o app gerado.
4. **Fixes do `replica-entrepreneur`:**
   * Transparência total de créditos (mostrar custo estimado antes do prompt pesado).
   * Política anti-desperdício de créditos em falhas de compilação.
