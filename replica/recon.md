# Recon map: Emergent (Web Platform)

Scope: Emergent Full-Stack AI App Builder & Vibe Coding Studio (Frontend Studio, Multi-Agent Engine, Sandboxed Live Preview, Credit & Billing System, 1-Click Deploy)
For: Plataforma própria de desenvolvimento autônomo com monetização por créditos (clone 100% fiel ao Emergent)
Date: 2026-10-07

## Sources

| # | source | URL | notes |
| --- | --- | --- | --- |
| 1 | Marketing & Landing Site | https://emergent.sh | Posicionamento, produtos (Website, Web App, Mobile, Dashboard, CRM, SaaS), propostas de valor |
| 2 | Application Studio | https://app.emergent.sh | Interface do editor, autenticação, dashboard de projetos, painel de chat e live preview |
| 3 | Pricing & Credits Documentation | https://emergent.sh/pricing | Planos (Free, Standard ~$20, Pro ~$167-$200), cotas de créditos e regras de consumo |
| 4 | Product Reviews & Walkthroughs | YouTube & Tech Communities | Mapeamento detalhado dos fluxos de prompt, fork, rollback, auto-healer e sincronização com GitHub |

## Core loop

O usuário descreve um aplicativo em linguagem natural no chat; uma equipe de agentes de IA planeja o projeto, gera o código full-stack, instala dependências e executa o app em um sandbox isolado com Live Preview em tempo real, permitindo refinamentos contínuos por conversa e publicação em 1 clique.

## Screens

| ID | screen | route / how to reach | purpose | key components | states seen |
| --- | --- | --- | --- | --- | --- |
| S01 | Landing Page | `/` | Apresentação do produto, demonstração em vídeo, comparativo e conversão | Navbar, Hero interativo, Grade de templates, Tabela de preços, CTA | default, dark/light |
| S02 | Auth Modal / Page | `/login`, `/signup` | Autenticação do usuário | Botões OAuth (Google, GitHub), formulário de email com Magic Link/Senha | default, loading, error |
| S03 | User Dashboard | `/home`, `/projects` | Listagem e gerenciamento de projetos do usuário | Grade de projetos, Barra de busca, Botão "Novo Projeto", Badge de saldo de créditos | empty, filled, loading |
| S04 | Project Creation Wizard | Modal em S03 ou prompt hero | Escolha do tipo de projeto e prompt inicial | Seletor de tipo (Full-stack, Mobile, Landing, Dashboard), Prompt Bar ampliado, Upload de imagem | default, submitting |
| S05 | Studio - Chat & Agent Panel | `/project/:id` (painel esquerdo) | Conversa com o agente, timeline de ações e perguntas de clarificação | Input de prompt com anexos, Cards de mensagens, Badges de execução de ferramentas, Indicador de modelo | default, streaming, thinking, error |
| S06 | Studio - Live Preview Panel | `/project/:id` (painel direito - aba 1) | Visualização em tempo real do app compilado e rodando | Iframe sandbox, Seletor de dispositivo (Desktop, Tablet, Mobile), Barra de endereço com botão reload | loading sandbox, running, runtime error |
| S07 | Studio - Code Editor | `/project/:id` (painel direito - aba 2) | Inspeção e edição manual de arquivos do projeto | Árvore de arquivos lateral, Editor Monaco com abas, Botão de salvar alterações, Visualizador de Diff | default, file open, diff mode |
| S08 | Studio - Console Drawer | `/project/:id` (gaveta inferior) | Logs de build, saídas do terminal e erros de compilação | Terminal emulator / Log viewer, Botão de limpar logs, Status do servidor de dev | idle, streaming logs, error output |
| S09 | Checkpoint / Rollback Modal | Botão no topo do Studio | Histórico de versões geradas e restauração com 1 clique | Timeline de checkpoints, Lista de arquivos alterados por versão, Botão "Restaurar versão" | default, restoring |
| S10 | Fork Project Modal | Botão no topo do Studio | Clonar o projeto para um novo branch/sandbox isolado | Input de nome do novo projeto, Confirmação de duplicação de dados | default, copying |
| S11 | Project Settings Modal | Botão engrenagem no Studio | Configuração técnica e integrações do projeto | Seletor de modelo (Claude/Gemini/GPT), Limite de orçamento por sessão, Variáveis de ambiente (.env), GitHub Sync | default, saving |
| S12 | Deploy & Domains Modal | Botão "Deploy / Publish" | Publicação em produção e configuração de domínio próprio | Subdomínio gerado com SSL, Formulário de domínio customizado com registros DNS, Status do deploy | draft, deploying, live |
| S13 | Credits & Billing Modal | Badge de créditos ou `/billing` | Monitoramento de saldo, compra de pacotes e assinatura de planos | Cartões de planos (Free, Starter, Pro), Pacotes de créditos avulsos, Checkout Stripe | default, checkout loading, success |

## Flows

```
F01 Novo Usuário cria seu Primeiro App
    S01 -> S02 (login) -> S03 -> S04 (escolhe template + digita prompt) -> S05 + S06 (agente gera arquivos e abre preview)
    happy path clicks: 4
    edge: saldo inicial de créditos insuficiente, prompt ambíguo aciona pergunta de clarificação do agente

F02 Refinamento Iterativo & Auto-healing
    S05 (usuário pede: "Adicione autenticação e tela de perfil") -> S05 (agente executa plano) -> S08 (erro de compilação detectado) -> S05 (auto-healer corrige o arquivo automaticamente) -> S06 (preview atualizado)
    happy path clicks: 1 (apenas digitar o prompt)
    edge: agente atinge limite de tentativas de autocorreção e solicita intervenção do usuário

F03 Inspeção e Edição Manual de Código
    S05 -> S07 (abre aba Code Editor) -> Navega na árvore de arquivos -> Abre componente -> Altera código manualmente -> S06 (preview recarrega instantaneamente via HMR)
    happy path clicks: 3
    edge: sintaxe inválida digitada pelo usuário mostra erro inline e no terminal S08

F04 Rollback para Versão Anterior
    S05 -> S09 (abre modal de rollback) -> Visualiza diff do último prompt -> Clica em "Restaurar este ponto" -> S05/S06/S07 revertem arquivos e preview
    happy path clicks: 3
    edge: usuário confirma se deseja sobrescrever modificações locais não salvas

F05 Compra de Créditos / Upgrade de Plano
    S05 (alerta de créditos baixos) -> S13 (abre modal de faturamento) -> Seleciona plano ou pacote de 100 créditos -> Redirecionamento Stripe Checkout -> Retorno com créditos adicionados imediatamente
    happy path clicks: 3
    edge: falha no cartão ou cancelamento no gateway mantém estado anterior com aviso claro

F06 Publicação em Produção com 1 Clique
    S06 -> S12 (clica em Deploy) -> Confirma slug do subdomínio -> Sistema gera build de produção e provisiona URL pública com SSL -> Usuário acessa app publicado
    happy path clicks: 2
    edge: conflito de subdomínio já utilizado ou erro de build estático

F07 Sincronização com GitHub e Download ZIP
    S05 -> S11/S12 -> Autentica GitHub App -> Cria repositório privado no perfil do usuário -> Commita código gerado / Botão "Download ZIP" baixa pacote limpo
    happy path clicks: 2
    edge: token do GitHub expirado ou permissões de repositório insuficientes
```

## Components

| component | variants | states | used on |
| --- | --- | --- | --- |
| Button | primary, secondary, outline, ghost, danger | default, hover, focus, disabled, loading | todas as telas |
| PromptInputBar | standard, expanded, withAttachments | idle, typing, withImages, generating | S01, S04, S05 |
| AgentMessageCard | user, agent_thinking, agent_action, error | default, expanded, collapsed | S05 |
| ActionTimelineStep | plan, create_file, edit_file, run_command, verify | pending, running, completed, failed | S05 |
| CreditBadge | compact, full | normal, low_credits (amarelo), empty (vermelho) | S03, S05, S13 |
| DeviceViewportSelector | desktop, tablet, mobile | active, inactive | S06 |
| SandboxIframe | live, loading, error_screen | loading, ready, disconnected | S06 |
| FileTreeExplorer | folder, file, modified_file | collapsed, expanded, active | S07 |
| MonacoCodeEditor | default, diff_mode | editing, readonly | S07 |
| TerminalLogViewer | stdout, stderr, system | streaming, paused | S08 |
| PricingCard | free, starter, pro | current_plan, upgrade_action, popular_badge | S01, S13 |
| ModalDialog | sm, md, lg, xl | open, closing | S02, S09, S10, S11, S12, S13 |

## Inferred data model

```
User               id, email, name, avatar_url, role, created_at
                   evidence: S02, S03, S13
                   confidence: high

CreditAccount      id, user_id, balance, lifetime_purchased, current_plan, renews_at
                   evidence: S03, S05, S13, documentação de billing
                   confidence: high

CreditTransaction  id, user_id, amount (-/+), reason (prompt, scaffold, refund, purchase), project_id, created_at
                   evidence: S05, S13
                   confidence: high

Project            id, user_id, name, description, template_type, current_checkpoint_id, created_at, updated_at
                   evidence: S03, S04, S05, S10
                   confidence: high

ProjectFile        id, project_id, path, content, mime_type, updated_at
                   evidence: S07 (árvore de arquivos), S05 (geração)
                   confidence: high

Checkpoint         id, project_id, prompt_message, files_snapshot_json, created_at
                   evidence: S09 (rollback history)
                   confidence: high

ConversationTurn   id, project_id, role (user|assistant), content, metadata_json (tool calls, diffs), credits_spent
                   evidence: S05 (chat timeline)
                   confidence: high

Deployment         id, project_id, subdomain, custom_domain, status (building|active|failed), deployed_url, ssl_active
                   evidence: S12 (deploy modal)
                   confidence: high
```

Relationships:
* User 1-1 CreditAccount
* User 1-n CreditTransaction
* User 1-n Project
* Project 1-n ProjectFile
* Project 1-n Checkpoint
* Project 1-n ConversationTurn
* Project 1-n Deployment

## Feature matrix

Consulte o arquivo `replica/features.csv`.
* **Must:** 19 features (essenciais para o core loop do produto)
* **Should:** 7 features (recursos de alta produtividade e infraestrutura)
* **Could:** 3 features (extensões avançadas)
* **Skip:** 1 feature (marketplace de terceiros fora do escopo de clonagem direta)

## Out of scope (cannot or should not be cloned)

* Marketplace fechado de parceiros comerciais terceirizados do Emergent.
* Infraestrutura interna proprietária e servidores legados não expostos publicamente.

## Size

* **Telas:** 13 telas/modais
* **Fluxos:** 7 fluxos completos
* **Entidades:** 8 modelos centrais de banco de dados
* **Partes mais desafiadoras:**
  1. Sandbox seguro para compilar e servir o código em tempo real com Hot Reload (WebContainers ou MicroVMs E2B).
  2. Motor de orquestração de IA com tool calling (`create_file`, `edit_file`, `run_command`) e loop de auto-healing de erros.
  3. Sistema transacional de controle de créditos e billing com Stripe Webhooks.
* **Tamanho estimado:** **M** (estruturável modularmente em etapas claras de arquitetura, estúdio, motor de agentes e billing).

---

### Próximo Passo na Esteira Replica:
Execute **`/replica-architect`** para definir a stack técnica, o schema relacional PostgreSQL com Prisma/Drizzle e o pipeline de execução dos agentes.
