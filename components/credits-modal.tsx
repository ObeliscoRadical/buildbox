"use client";

import React, { useState } from "react";
import { Zap, Check, ShieldCheck, ArrowRight, X, Sparkles } from "lucide-react";

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onAddCredits: (amount: number) => void;
}

export function CreditsModal({
  isOpen,
  onClose,
  currentBalance,
  onAddCredits,
}: CreditsModalProps) {
  const [selectedTab, setSelectedTab] = useState<"plans" | "topup">("plans");
  const [purchasing, setPurchasing] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePurchase = (amount: number) => {
    setPurchasing(true);
    setTimeout(() => {
      onAddCredits(amount);
      setPurchasing(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent-light">
              <Zap className="w-5 h-5 fill-accent-light/40" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Planos e Créditos Buildbox
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Saldo atual: <span className="font-semibold text-accent-light">{currentBalance} créditos</span> disponíveis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-surface-raised transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Anti-waste Guarantee Banner */}
        <div className="bg-accent/10 border-b border-accent/20 px-6 py-2.5 flex items-center gap-2 text-xs text-accent-light font-medium">
          <ShieldCheck className="w-4 h-4 shrink-0 text-success" />
          <span>
            <strong>Garantia Zero Desperdício:</strong> Se a IA falhar em compilar o código ou gerar erro não corrigido pelo auto-healer, seus créditos são <strong>reembolsados instantaneamente</strong>.
          </span>
        </div>

        {/* Tab Selector */}
        <div className="px-6 pt-4 flex gap-2 border-b border-border">
          <button
            onClick={() => setSelectedTab("plans")}
            className={`pb-3 text-sm font-semibold border-b-2 transition-all ${
              selectedTab === "plans"
                ? "border-accent text-white"
                : "border-transparent text-text-muted hover:text-text"
            }`}
          >
            Assinaturas Mensais
          </button>
          <button
            onClick={() => setSelectedTab("topup")}
            className={`pb-3 text-sm font-semibold border-b-2 transition-all ${
              selectedTab === "topup"
                ? "border-accent text-white"
                : "border-transparent text-text-muted hover:text-text"
            }`}
          >
            Pacotes Avulsos (Top-up)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {selectedTab === "plans" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Free Plan */}
              <div className="bg-surface-raised/50 border border-border rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-text text-base">Free</h3>
                  <p className="text-xs text-text-muted mt-1">Para explorar a plataforma</p>
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-white">R$ 0</span>
                    <span className="text-xs text-text-muted"> /mês</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs text-text-muted">
                    <li className="flex items-center gap-2 text-text">
                      <Check className="w-3.5 h-3.5 text-success" /> 10 créditos grátis
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-success" /> Modelo Gemini 2.5 Flash
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-success" /> Subdomínio buildbox.app
                    </li>
                  </ul>
                </div>
                <button
                  disabled
                  className="mt-6 w-full py-2 rounded-lg bg-surface border border-border text-xs text-text-muted cursor-not-allowed"
                >
                  Plano Atual
                </button>
              </div>

              {/* Starter Plan (Featured) */}
              <div className="bg-surface-raised border-2 border-accent rounded-xl p-5 flex flex-col justify-between relative shadow-lg shadow-accent/10">
                <div className="absolute -top-3 right-4 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Mais Popular
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base">Starter</h3>
                  <p className="text-xs text-text-muted mt-1">Para criadores e prototipagem</p>
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-white">R$ 99</span>
                    <span className="text-xs text-text-muted"> /mês (~$20)</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs text-text-muted">
                    <li className="flex items-center gap-2 text-white font-medium">
                      <Check className="w-3.5 h-3.5 text-accent-light" /> 100 créditos /mês
                    </li>
                    <li className="flex items-center gap-2 text-text">
                      <Check className="w-3.5 h-3.5 text-accent-light" /> Gemini 2.5 Pro & Flash
                    </li>
                    <li className="flex items-center gap-2 text-text">
                      <Check className="w-3.5 h-3.5 text-accent-light" /> Sincronização com GitHub
                    </li>
                    <li className="flex items-center gap-2 text-text">
                      <Check className="w-3.5 h-3.5 text-accent-light" /> Download ZIP irrestrito
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => handleSimulatePurchase(100)}
                  disabled={purchasing}
                  className="mt-6 w-full py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  {purchasing ? "Processando..." : "Assinar Starter (+100)"}
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-surface-raised/50 border border-border rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-text text-base">Pro Studio</h3>
                  <p className="text-xs text-text-muted mt-1">Para agências e power users</p>
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-white">R$ 890</span>
                    <span className="text-xs text-text-muted"> /mês (~$170)</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs text-text-muted">
                    <li className="flex items-center gap-2 text-white font-medium">
                      <Check className="w-3.5 h-3.5 text-accent-light" /> 750 créditos /mês
                    </li>
                    <li className="flex items-center gap-2 text-text">
                      <Check className="w-3.5 h-3.5 text-accent-light" /> Claude 3.7 Sonnet & GPT-4o
                    </li>
                    <li className="flex items-center gap-2 text-text">
                      <Check className="w-3.5 h-3.5 text-accent-light" /> 1M Context Window
                    </li>
                    <li className="flex items-center gap-2 text-text">
                      <Check className="w-3.5 h-3.5 text-accent-light" /> Domínios Customizados Ilimitados
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => handleSimulatePurchase(750)}
                  disabled={purchasing}
                  className="mt-6 w-full py-2.5 rounded-lg bg-surface-raised hover:bg-surface border border-border text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  {purchasing ? "Processando..." : "Assinar Pro (+750)"}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Top-up Pack 1 */}
              <div className="bg-surface-raised border border-border rounded-xl p-5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-accent-light" /> 50 Créditos Avulsos
                  </div>
                  <p className="text-xs text-text-muted mt-1">Ideal para finalizar 1 ou 2 apps completos</p>
                  <div className="text-lg font-bold text-white mt-2">R$ 75,00</div>
                </div>
                <button
                  onClick={() => handleSimulatePurchase(50)}
                  disabled={purchasing}
                  className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-semibold transition-all"
                >
                  Comprar (+50)
                </button>
              </div>

              {/* Top-up Pack 2 */}
              <div className="bg-surface-raised border border-border rounded-xl p-5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-accent-light" /> 200 Créditos Avulsos
                  </div>
                  <p className="text-xs text-text-muted mt-1">Melhor custo-benefício por crédito</p>
                  <div className="text-lg font-bold text-white mt-2">R$ 240,00</div>
                </div>
                <button
                  onClick={() => handleSimulatePurchase(200)}
                  disabled={purchasing}
                  className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-semibold transition-all"
                >
                  Comprar (+200)
                </button>
              </div>
            </div>
          )}

          {/* Pricing Burn Guide */}
          <div className="mt-6 p-4 rounded-xl bg-surface border border-border text-xs text-text-muted space-y-1.5">
            <div className="font-semibold text-text mb-2">Tabela de Queima de Créditos (Burn Rate Transparente):</div>
            <div className="flex justify-between"><span>• Ajuste pontual ou modificação simples:</span> <strong className="text-text">1 crédito</strong></div>
            <div className="flex justify-between"><span>• Criação de nova página ou tela completa:</span> <strong className="text-text">2 a 3 créditos</strong></div>
            <div className="flex justify-between"><span>• Geração inicial de um aplicativo completo do zero:</span> <strong className="text-text">5 a 8 créditos</strong></div>
            <div className="flex justify-between"><span>• Ciclo de auto-healing de erros de compilação:</span> <strong className="text-success">Grátis (coberto pela garantia)</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
