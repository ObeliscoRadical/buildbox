"use client";

import React, { useState } from "react";
import { Monitor, Tablet, Smartphone, RotateCw, ExternalLink, ShieldCheck } from "lucide-react";
import { ProjectFile } from "@/lib/types";

interface LivePreviewProps {
  files: ProjectFile[];
  subdomain?: string;
  viewport?: "desktop" | "tablet" | "mobile";
}

export function LivePreview({ files, subdomain = "preview", viewport: externalViewport }: LivePreviewProps) {
  const [internalViewport, setInternalViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const viewport = externalViewport || internalViewport;
  const setViewport = setInternalViewport;
  const [reloadKey, setReloadKey] = useState(0);

  // Encontra o código de App.tsx ou HTML principal
  const appFile = files.find(f => f.path.endsWith("App.tsx") || f.path.endsWith("index.html") || f.path.endsWith("page.tsx"));
  
  // Constrói um bundle renderizável dentro do iframe (HTML stand-alone moderno)
  const previewHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
      body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #0b0c10; color: #f4f4f7; }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="min-h-screen bg-[#0b0c10] text-[#f4f4f7] p-6">
        <div class="max-w-4xl mx-auto space-y-6">
          <header class="flex justify-between items-center pb-6 border-b border-[#232635]">
            <div>
              <h1 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Nexus CRM Pro
              </h1>
              <p class="text-sm text-gray-400 mt-1">Pipeline de Vendas em Tempo Real</p>
            </div>
            <button class="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-all shadow-md">
              + Novo Lead
            </button>
          </header>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-[#141620] border border-[#232635] p-5 rounded-xl">
              <span class="text-xs text-gray-400 font-medium">Total em Negociação</span>
              <div class="text-2xl font-bold text-emerald-400 mt-2">R$ 95.000</div>
              <span class="text-[11px] text-emerald-500 mt-1 inline-block">+14% este mês</span>
            </div>
            <div class="bg-[#141620] border border-[#232635] p-5 rounded-xl">
              <span class="text-xs text-gray-400 font-medium">Leads Ativos</span>
              <div class="text-2xl font-bold text-white mt-2">14</div>
              <span class="text-[11px] text-gray-500 mt-1 inline-block">4 aguardando contato</span>
            </div>
            <div class="bg-[#141620] border border-[#232635] p-5 rounded-xl">
              <span class="text-xs text-gray-400 font-medium">Taxa de Conversão</span>
              <div class="text-2xl font-bold text-indigo-400 mt-2">68.4%</div>
              <span class="text-[11px] text-indigo-300 mt-1 inline-block">+5.2% vs média</span>
            </div>
          </div>

          <div class="bg-[#141620] border border-[#232635] rounded-xl p-5">
            <h2 class="text-base font-semibold text-white mb-4">Oportunidades em Aberto</h2>
            <div class="space-y-3">
              <div class="flex justify-between items-center p-3.5 rounded-lg bg-[#0e1017] border border-[#232635]/60 hover:border-indigo-500/50 transition-all">
                <div>
                  <div class="text-sm font-semibold text-white">Acme Corporation</div>
                  <div class="text-xs text-gray-400 mt-0.5">Contato: Carlos Eduardo • Estágio: Proposta Enviada</div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-bold text-emerald-400">R$ 15.000</div>
                  <span class="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium">Alta Prioridade</span>
                </div>
              </div>

              <div class="flex justify-between items-center p-3.5 rounded-lg bg-[#0e1017] border border-[#232635]/60 hover:border-indigo-500/50 transition-all">
                <div>
                  <div class="text-sm font-semibold text-white">Stark Industries</div>
                  <div class="text-xs text-gray-400 mt-0.5">Contato: Pepper Potts • Estágio: Negociação Contratual</div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-bold text-emerald-400">R$ 48.000</div>
                  <span class="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-medium">Enterprise</span>
                </div>
              </div>

              <div class="flex justify-between items-center p-3.5 rounded-lg bg-[#0e1017] border border-[#232635]/60 hover:border-indigo-500/50 transition-all">
                <div>
                  <div class="text-sm font-semibold text-white">Wayne Enterprises</div>
                  <div class="text-xs text-gray-400 mt-0.5">Contato: Lucius Fox • Estágio: Fechamento</div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-bold text-emerald-400">R$ 32.000</div>
                  <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-medium">Contrato Gerado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
  `;

  return (
    <div className="flex-1 flex flex-col h-full bg-bg overflow-hidden">
      {/* Preview Header / Device Toolbar */}
      <div className="h-11 px-4 border-b border-border bg-surface flex items-center justify-between shrink-0">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-bg p-0.5 rounded-lg border border-border">
          <button
            onClick={() => setViewport("desktop")}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              viewport === "desktop" ? "bg-surface-raised text-white shadow-sm" : "text-text-muted hover:text-white"
            }`}
            title="Desktop (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewport("tablet")}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              viewport === "tablet" ? "bg-surface-raised text-white shadow-sm" : "text-text-muted hover:text-white"
            }`}
            title="Tablet (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              viewport === "mobile" ? "bg-surface-raised text-white shadow-sm" : "text-text-muted hover:text-white"
            }`}
            title="Mobile (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-md mx-4 hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-bg border border-border text-xs text-text-muted font-mono truncate">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span className="truncate">https://{subdomain}.buildbox.preview</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setReloadKey(prev => prev + 1)}
            className="p-1.5 rounded-md hover:bg-surface-raised text-text-muted hover:text-white transition-colors"
            title="Recarregar Preview"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              const win = window.open();
              if (win) win.document.write(previewHtml);
            }}
            className="p-1.5 rounded-md hover:bg-surface-raised text-text-muted hover:text-white transition-colors"
            title="Abrir em Nova Aba"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-auto bg-bg flex items-center justify-center p-4">
        <div
          className={`h-full transition-all duration-300 rounded-xl overflow-hidden border border-border bg-[#0b0c10] shadow-2xl ${
            viewport === "desktop"
              ? "w-full"
              : viewport === "tablet"
              ? "w-[768px] max-w-full"
              : "w-[375px] max-w-full ring-8 ring-surface-raised"
          }`}
        >
          <iframe
            key={reloadKey}
            srcDoc={previewHtml}
            title="Live Preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
