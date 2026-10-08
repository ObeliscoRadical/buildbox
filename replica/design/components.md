# Component Specifications: Emergent Clone

Todos os componentes seguem os tokens definidos em `tokens.json`.

---

### 1. Button
* **Variants:** `primary`, `secondary`, `outline`, `ghost`, `danger`
* **Sizes:** `sm` (32px), `md` (40px), `lg` (48px)
* **States:** `default`, `hover`, `active`, `focus-visible` (anel de 2px `accent`), `disabled`, `loading` (spinner com aria-label preservado)
* **Tokens:**
  * Primary: bg `accent`, text `on-accent`, hover bg `accent-hover`
  * Secondary: bg `surface`, border `border`, text `text`
  * Ghost: bg transparent, hover bg `surface`, text `text`
* **A11y:** Elemento nativo `<button>`, suporte total a navegação por teclado (`Tab`, `Enter`, `Space`)
* **Uso:** Todas as telas e modais

### 2. PromptInputBar
* **Variants:** `hero` (expandido, central), `studio` (barra fixa inferior no painel esquerdo)
* **Components internos:** Textarea auto-expansível, botão de anexo de imagem/mockup, seletor rápido de modelo, botão de envio (com atalho `Cmd/Ctrl + Enter`)
* **States:** `idle`, `typing`, `with_attachments`, `generating` (botão de enviar vira botão de "Parar geração")
* **Tokens:** bg `surface`, border `border`, border-focus `accent`, text `text`, placeholder `text-muted`
* **A11y:** `aria-label="Prompt de instruções para IA"`, label associado
* **Uso:** S01, S04, S05

### 3. AgentMessageCard & ActionTimeline
* **Variants:** `user_message`, `assistant_response`, `tool_step`, `error_card`
* **Tool Steps:** `planning`, `create_file`, `update_file`, `run_command`, `auto_heal`
* **States:** `running` (pulse animado), `success` (ícone verde `success`), `failed` (ícone vermelho `danger`), `collapsed`/`expanded` (para visualização de diff)
* **Tokens:** bg `surface`, border `border`, text `text`, font `sans` e `mono` nos blocos de código
* **Uso:** S05 (Studio Chat)

### 4. CreditBadge
* **Variants:** `compact` (apenas ícone + número), `detailed` (com barra de progresso do plano)
* **States:** `normal` (> 10 créditos, badge neutro), `low` (1 a 5 créditos, destaque amarelo), `empty` (0 créditos, destaque vermelho + ação de compra)
* **Tokens:** text `text`, bg `surface`, border `border`
* **Uso:** S03, S05, S13

### 5. SandboxIframe & DeviceViewportSelector
* **Viewport Sizes:**
  * Desktop: 100% width
  * Tablet: 768px width
  * Mobile: 375px width (com moldura elegante de smartphone)
* **Header Controls:** Botão Voltar/Avançar, Campo de URL do preview, Botão Reload, Botão "Abrir em nova aba"
* **Tokens:** bg `bg`, border `border`, moldura `surface`
* **Uso:** S06 (Live Preview)

### 6. MonacoCodeEditor & FileTree
* **FileTree:** Hierarquia de diretórios colapsável, ícones de arquivo por extensão (TSX, CSS, JSON, SQL), indicador visual de arquivo modificado no turno atual (ponto azul)
* **Monaco Editor:** Tema escuro adaptado aos tokens, suporte a TypeScript/React, abas de arquivos abertos com botão de fechar, minimap ativável
* **Diff Viewer:** Visualização lado a lado ou inline destacando adições em verde (`success`) e remoções em vermelho (`danger`)
* **Uso:** S07 (Code Editor)

### 7. PricingCard
* **Variants:** `Free`, `Starter ($20/mo)`, `Pro ($167/mo)`
* **Items inclusos:** Título, Preço mensal, Créditos inclusos, Lista de recursos com ícone de check, Botão de CTA (Upgrade / Selecionar)
* **Tokens:** bg `surface`, border `border` (com glow no plano `popular`), text `text`
* **Uso:** S01 (Landing Page), S13 (Modal de Faturamento)
