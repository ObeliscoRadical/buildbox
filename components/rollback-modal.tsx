"use client";

import React from "react";
import { History, RotateCcw, Clock, Check, X } from "lucide-react";
import { Checkpoint } from "@/lib/types";

interface RollbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkpoints: Checkpoint[];
  onRollback: (checkpointId: string) => void;
}

export function RollbackModal({
  isOpen,
  onClose,
  checkpoints,
  onRollback,
}: RollbackModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent-light">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Histórico de Versões & Rollback</h3>
              <p className="text-xs text-text-muted">Desfaça alterações e volte a qualquer ponto anterior</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-text-muted hover:text-white hover:bg-surface-raised transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {checkpoints && checkpoints.length > 0 ? (
            checkpoints.map((cp, idx) => (
              <div
                key={cp.id}
                className="p-4 rounded-xl bg-surface-raised border border-border hover:border-accent/40 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-accent/20 text-accent-light px-1.5 py-0.5 rounded">
                      v{checkpoints.length - idx}.0
                    </span>
                    <span className="text-xs font-semibold text-white truncate">
                      {cp.prompt_message}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(cp.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span>• {cp.credits_spent} créditos consumidos</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onRollback(cp.id);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-surface border border-border hover:border-accent hover:text-white text-xs font-medium text-text-muted transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar</span>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-xs text-text-muted">
              Nenhum checkpoint adicional gravado ainda.
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-text-muted hover:text-white hover:bg-surface-raised transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
