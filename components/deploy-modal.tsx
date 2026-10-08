"use client";

import React, { useState } from "react";
import { Rocket, Check, Copy, ExternalLink, Globe, Shield, X } from "lucide-react";

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  subdomain: string;
}

export function DeployModal({
  isOpen,
  onClose,
  projectName,
  subdomain,
}: DeployModalProps) {
  const [copied, setCopied] = useState(false);
  const [deployState, setDeployState] = useState<"idle" | "building" | "live">("live");

  if (!isOpen) return null;

  const deployedUrl = `https://${subdomain || "app"}.buildbox.app`;

  const handleCopy = () => {
    navigator.clipboard.writeText(deployedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent-light">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Publicação em Produção</h3>
              <p className="text-xs text-text-muted">Deploy com 1 clique e SSL automático</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-text-muted hover:text-white hover:bg-surface-raised transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-5">
          {/* Status Badge */}
          <div className="p-4 rounded-xl bg-success/10 border border-success/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-success animate-ping" />
              <div>
                <div className="text-xs font-semibold text-success uppercase tracking-wider">Online e Ativo</div>
                <div className="text-xs text-text-muted mt-0.5">Certificado SSL Let's Encrypt ativo</div>
              </div>
            </div>
            <Shield className="w-5 h-5 text-success/60" />
          </div>

          {/* Deployed URL Box */}
          <div>
            <label className="text-xs font-medium text-text-muted block mb-1.5">
              Link Público do seu Aplicativo:
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2.5 rounded-lg bg-bg border border-border text-xs text-text font-mono truncate select-all">
                {deployedUrl}
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-2.5 rounded-lg bg-surface-raised border border-border hover:bg-border text-xs font-medium text-white transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copiado!" : "Copiar"}</span>
              </button>
            </div>
          </div>

          {/* Custom Domain Promo */}
          <div className="p-4 rounded-xl bg-surface-raised border border-border">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Globe className="w-4 h-4 text-accent-light" />
              <span>Deseja usar seu próprio domínio?</span>
            </div>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">
              Você pode conectar domínios próprios (ex: <code>seusite.com.br</code>) apontando o registro CNAME para os servidores Buildbox.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-text-muted hover:text-white hover:bg-surface-raised transition-colors"
          >
            Fechar
          </button>
          <a
            href={deployedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Acessar App Ao Vivo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
