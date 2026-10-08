"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Paperclip,
  CheckCircle2,
  Clock,
  Terminal,
  FileCode,
  AlertTriangle,
  RotateCcw,
  Zap,
  Bot,
  HelpCircle,
  Check
} from "lucide-react";
import { ConversationTurn, AIModel } from "@/lib/types";

interface AgentChatProps {
  conversation: ConversationTurn[];
  onSendMessage: (content: string, model: AIModel) => void;
  isGenerating: boolean;
  creditBalance: number;
  onOpenCredits: () => void;
}

export function AgentChat({
  conversation,
  onSendMessage,
  isGenerating,
  creditBalance,
  onOpenCredits,
}: AgentChatProps) {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState<AIModel>("gemini-2.5-flash");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    if (creditBalance <= 0) {
      onOpenCredits();
      return;
    }

    onSendMessage(input.trim(), selectedModel);
    setInput("");
  };

  const handleSelectOption = (opt: string) => {
    if (isGenerating || creditBalance <= 0) return;
    onSendMessage(`Opção escolhida: ${opt}`, selectedModel);
  };

  return (
    <div className="w-[430px] border-r border-border bg-surface flex flex-col h-full shrink-0 select-none">
      {/* Studio Agent Header */}
      <div className="h-12 px-4 border-b border-border flex items-center justify-between shrink-0 bg-surface">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-accent/20 border border-accent/30 flex items-center justify-center text-accent-light">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-bold text-white tracking-wide block leading-none">
              AI Agent Team
            </span>
            <span className="text-[10px] text-text-muted mt-0.5 block leading-none">
              Planner • Coder • Auto-Healer
            </span>
          </div>
        </div>

        {/* Model Selector */}
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value as AIModel)}
          className="bg-bg border border-border text-[11px] font-medium rounded-lg px-2.5 py-1 text-text-muted focus:border-accent focus:outline-none"
        >
          <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
          <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
          <option value="claude-3-7-sonnet">Claude 3.7 Sonnet</option>
        </select>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.map((msg) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              {/* Header Label */}
              <div className="text-[10px] text-text-muted mb-1 px-1 flex items-center gap-1.5">
                <span className="font-semibold">{isUser ? "Você" : "Emergent Agent"}</span>
                {msg.credits_spent && msg.credits_spent > 0 && (
                  <span className="bg-accent/20 text-accent-light px-1.5 py-0.2 rounded font-semibold">
                    -{msg.credits_spent} cr
                  </span>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[94%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  isUser
                    ? "bg-accent text-white shadow-md shadow-accent/20 rounded-tr-sm"
                    : "bg-surface-raised border border-border text-text rounded-tl-sm"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>

                {/* Clarifying Questions / Quick Options */}
                {msg.clarifying_options && msg.clarifying_options.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/80 space-y-1.5">
                    <div className="text-[10px] font-semibold text-accent-light flex items-center gap-1 mb-1">
                      <HelpCircle className="w-3 h-3" /> Responda para refinar a arquitetura:
                    </div>
                    {msg.clarifying_options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(opt)}
                        className="w-full text-left p-2 rounded-lg bg-surface border border-border hover:border-accent hover:text-white text-[11px] text-text-muted transition-colors flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <Check className="w-3 h-3 text-accent-light opacity-60" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Tool Invocations Timeline */}
                {msg.tool_invocations && msg.tool_invocations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/80 space-y-2">
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Ações do Agente:
                    </div>
                    {msg.tool_invocations.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-bg/80 border border-border flex items-start gap-2 text-[11px]"
                      >
                        {step.status === "completed" ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-warning shrink-0 mt-0.5 animate-spin" />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="font-mono text-text flex items-center gap-1">
                            {step.tool === "create_file" && <FileCode className="w-3 h-3 text-accent-light" />}
                            {step.tool === "edit_file" && <FileCode className="w-3 h-3 text-emerald-400" />}
                            {step.tool === "run_command" && <Terminal className="w-3 h-3 text-warning" />}
                            {step.tool === "auto_heal" && <Sparkles className="w-3 h-3 text-purple-400" />}
                            <span className="truncate">{step.path || step.command || "Auto-Healing"}</span>
                          </div>
                          {step.details && (
                            <div className="text-[10px] text-text-muted mt-0.5">{step.details}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Live Generating State */}
        {isGenerating && (
          <div className="flex flex-col items-start animate-in fade-in">
            <div className="text-[10px] text-accent-light font-semibold mb-1 px-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 animate-spin" /> Agente Executando...
            </div>
            <div className="bg-surface-raised border border-accent/40 rounded-2xl p-3.5 text-xs text-text space-y-2 max-w-[94%] shadow-lg shadow-accent/5">
              <p className="animate-pulse">Planejando dependências e atualizando componentes...</p>
              <div className="p-2 rounded-lg bg-bg/80 border border-border flex items-center gap-2 text-[11px] text-text-muted font-mono">
                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                <span>running sandbox compile & verifying preview</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Fixed Prompt Bar */}
      <div className="p-3 border-t border-border bg-surface shrink-0">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                handleSubmit(e);
              }
            }}
            placeholder={
              creditBalance <= 0
                ? "Saldo esgotado! Clique acima para adicionar créditos..."
                : "Descreva o que deseja criar ou alterar (Cmd + Enter para enviar)..."
            }
            disabled={isGenerating || creditBalance <= 0}
            rows={3}
            className="w-full bg-bg border border-border focus:border-accent rounded-xl p-3 pb-10 text-xs text-text placeholder:text-text-muted resize-none focus:outline-none transition-colors"
          />

          {/* Bottom Toolbar inside Input */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button
                type="button"
                className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-surface-raised transition-colors"
                title="Anexar screenshot ou mockup"
              >
                <Paperclip className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-text-muted flex items-center gap-1">
                <Zap className="w-3 h-3 text-accent-light" /> ~2 cr
              </span>
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              className="pointer-events-auto px-3.5 py-1.5 rounded-lg bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:hover:bg-accent text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1 active:scale-95"
            >
              <span>Enviar</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
