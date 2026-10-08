"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Folder, FileCode, FileJson, FileText, ChevronRight, ChevronDown, Check, Save } from "lucide-react";
import { ProjectFile } from "@/lib/types";

interface CodeEditorProps {
  files: ProjectFile[];
  onFileChange: (path: string, newContent: string) => void;
}

export function CodeEditor({ files, onFileChange }: CodeEditorProps) {
  const [activeFilePath, setActiveFilePath] = useState<string>(files[0]?.path || "src/App.tsx");
  const [saved, setSaved] = useState(true);

  const activeFile = files.find(f => f.path === activeFilePath) || files[0];

  const getFileIcon = (path: string) => {
    if (path.endsWith(".json")) return <FileJson className="w-3.5 h-3.5 text-warning" />;
    if (path.endsWith(".tsx") || path.endsWith(".ts")) return <FileCode className="w-3.5 h-3.5 text-accent-light" />;
    return <FileText className="w-3.5 h-3.5 text-text-muted" />;
  };

  const getLanguage = (path: string) => {
    if (path.endsWith(".json")) return "json";
    if (path.endsWith(".tsx") || path.endsWith(".ts")) return "typescript";
    if (path.endsWith(".css")) return "css";
    if (path.endsWith(".html")) return "html";
    return "javascript";
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onFileChange(activeFilePath, value);
      setSaved(false);
    }
  };

  return (
    <div className="flex-1 flex h-full bg-bg overflow-hidden">
      {/* File Tree Explorer (Left sidebar) */}
      <div className="w-60 border-r border-border bg-surface flex flex-col shrink-0 select-none">
        <div className="h-10 px-3 border-b border-border flex items-center justify-between text-xs font-semibold text-text-muted uppercase tracking-wider">
          <span>Arquivos do Projeto</span>
          <span className="text-[10px] bg-bg px-1.5 py-0.5 rounded text-text-muted">
            {files.length}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {files.map((file) => {
            const isActive = file.path === activeFilePath;
            return (
              <button
                key={file.path}
                onClick={() => setActiveFilePath(file.path)}
                className={`w-full px-3 py-1.5 flex items-center gap-2 text-xs transition-colors ${
                  isActive
                    ? "bg-accent/15 text-white font-medium border-l-2 border-accent"
                    : "text-text-muted hover:text-text hover:bg-surface-raised"
                }`}
              >
                {getFileIcon(file.path)}
                <span className="truncate">{file.path}</span>
                {file.modified && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent ml-auto shrink-0" title="Modificado pelo agente" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor & Tabs Container */}
      <div className="flex-1 flex flex-col h-full bg-[#1e1e1e] overflow-hidden">
        {/* Editor Tabs */}
        <div className="h-10 bg-[#181818] border-b border-[#2d2d2d] flex items-center justify-between px-3">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-2 px-3 py-1 rounded bg-[#1e1e1e] text-xs font-medium text-white border-t border-accent">
              {getFileIcon(activeFilePath)}
              {activeFilePath}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!saved && (
              <button
                onClick={() => setSaved(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-accent text-white text-[11px] font-medium transition-all"
              >
                <Save className="w-3 h-3" />
                <span>Salvar</span>
              </button>
            )}
            <span className="text-[10px] text-gray-500 font-mono">Monaco Engine</span>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 relative">
          {activeFile ? (
            <Editor
              height="100%"
              path={activeFile.path}
              defaultLanguage={getLanguage(activeFile.path)}
              value={activeFile.content}
              theme="vs-dark"
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true,
                padding: { top: 12 },
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-gray-500">
              Selecione um arquivo para editar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
