"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { AgentChat } from "@/components/agent-chat";
import { LivePreview } from "@/components/live-preview";
import { CodeEditor } from "@/components/code-editor";
import { CreditsModal } from "@/components/credits-modal";
import { DeployModal } from "@/components/deploy-modal";
import { RollbackModal } from "@/components/rollback-modal";
import { Terminal, RefreshCw, ChevronUp, ChevronDown } from "lucide-react";
import { defaultProjects, initialAccount } from "@/lib/store";
import { Project, ProjectFile, AIModel, ConversationTurn, Checkpoint } from "@/lib/types";
import JSZip from "jszip";

export default function StudioPage() {
  const params = useParams();
  const projectId = (params?.id as string) || "proj_1";

  // Project state and credits account
  const [project, setProject] = useState<Project>(defaultProjects[0]);
  const [creditBalance, setCreditBalance] = useState<number>(initialAccount.balance);
  const [activeView, setActiveView] = useState<"preview" | "code" | "split">("preview");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [terminalTab, setTerminalTab] = useState<"console" | "build" | "agent">("console");

  // Modals
  const [creditsModalOpen, setCreditsModalOpen] = useState<boolean>(false);
  const [deployModalOpen, setDeployModalOpen] = useState<boolean>(false);
  const [rollbackModalOpen, setRollbackModalOpen] = useState<boolean>(false);

  // Send message to autonomous agent
  const handleSendMessage = (content: string, model: AIModel) => {
    const cost = 2;
    if (creditBalance < cost) {
      setCreditsModalOpen(true);
      return;
    }

    setCreditBalance((prev) => Math.max(0, prev - cost));
    setIsGenerating(true);

    const userTurn: ConversationTurn = {
      id: `turn_${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    setProject((prev) => ({
      ...prev,
      conversation: [...prev.conversation, userTurn],
    }));

    // Multi-agent loop simulation (Planner -> Coder -> Auto-healer)
    setTimeout(() => {
      const assistantTurn: ConversationTurn = {
        id: `turn_${Date.now() + 1}`,
        role: "assistant",
        content: `I've updated your application: modified component layout, enhanced styles with Tailwind CSS, and verified all TypeScript types.`,
        timestamp: new Date().toISOString(),
        credits_spent: cost,
        tool_invocations: [
          {
            tool: "create_file",
            path: "src/components/FeatureGrid.tsx",
            status: "completed",
            details: "Generated new responsive interactive grid component",
          },
          {
            tool: "edit_file",
            path: "src/App.tsx",
            status: "completed",
            details: "Integrated component and updated state handlers",
          },
          {
            tool: "auto_heal",
            status: "completed",
            details: "Validated TypeScript syntax and compilation: 0 errors",
          },
        ],
      };

      // Create new checkpoint
      const newCheckpoint: Checkpoint = {
        id: `cp_${Date.now()}`,
        project_id: project.id,
        prompt_message: content.slice(0, 50),
        files: [...project.files],
        timestamp: new Date().toISOString(),
        credits_spent: cost,
      };

      setProject((prev) => ({
        ...prev,
        conversation: [...prev.conversation, assistantTurn],
        checkpoints: [newCheckpoint, ...prev.checkpoints],
      }));

      setIsGenerating(false);
    }, 2000);
  };

  const handleFileChange = (path: string, newContent: string) => {
    setProject((prev) => ({
      ...prev,
      files: prev.files.map((f) =>
        f.path === path ? { ...f, content: newContent, modified: true } : f
      ),
    }));
  };

  const handleRollback = (checkpointId: string) => {
    const cp = project.checkpoints.find((c) => c.id === checkpointId);
    if (cp) {
      setProject((prev) => ({
        ...prev,
        files: cp.files,
      }));
      setRollbackModalOpen(false);
    }
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    project.files.forEach((file) => {
      zip.file(file.path, file.content);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.slug || "buildbox-project"}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#07080c] text-[#f4f5f8] font-sans">
      {/* Studio Top Navbar */}
      <Navbar
        projectName={project.name}
        creditBalance={creditBalance}
        onOpenCredits={() => setCreditsModalOpen(true)}
        onOpenDeploy={() => setDeployModalOpen(true)}
        onOpenRollback={() => setRollbackModalOpen(true)}
        onDownloadZip={handleDownloadZip}
        isStudio={true}
        activeView={activeView}
        onViewChange={setActiveView}
        viewport={viewport}
        onViewportChange={setViewport}
      />

      {/* Main Studio Workspace: Left Chat + Right Viewer */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Conversational Agent Chat Panel (420px) */}
        <AgentChat
          conversation={project.conversation}
          onSendMessage={handleSendMessage}
          isGenerating={isGenerating}
          creditBalance={creditBalance}
          onOpenCredits={() => setCreditsModalOpen(true)}
        />

        {/* Right Side: Workspace Area */}
        <div className="flex-1 flex flex-col h-full bg-[#07080c] overflow-hidden">
          {/* Workspace Views */}
          <div className="flex-1 flex overflow-hidden relative">
            {activeView === "preview" && (
              <div className="flex-1 h-full">
                <LivePreview
                  subdomain={project.subdomain}
                  files={project.files}
                  viewport={viewport}
                />
              </div>
            )}

            {activeView === "code" && (
              <div className="flex-1 h-full">
                <CodeEditor
                  files={project.files}
                  onFileChange={handleFileChange}
                />
              </div>
            )}

            {activeView === "split" && (
              <div className="flex-1 grid grid-cols-2 h-full divide-x divide-[#1b1e2a]">
                <div className="h-full overflow-hidden">
                  <CodeEditor
                    files={project.files}
                    onFileChange={handleFileChange}
                  />
                </div>
                <div className="h-full overflow-hidden">
                  <LivePreview
                    subdomain={project.subdomain}
                    files={project.files}
                    viewport={viewport}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bottom Collapsible Terminal Drawer */}
          <div className="shrink-0 border-t border-[#1b1e2a] bg-[#090b10]">
            <div className="h-8 px-4 flex items-center justify-between text-xs text-[#8b90a0]">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTerminalOpen(!terminalOpen)}
                  className="flex items-center gap-1.5 font-semibold text-white hover:text-blue-400 transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Terminal & Logs</span>
                  {terminalOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                </button>

                {terminalOpen && (
                  <div className="flex items-center gap-2 text-[11px]">
                    <button
                      onClick={() => setTerminalTab("console")}
                      className={`px-2 py-0.5 rounded ${terminalTab === "console" ? "bg-[#151824] text-white" : "hover:text-white"}`}
                    >
                      Console
                    </button>
                    <button
                      onClick={() => setTerminalTab("build")}
                      className={`px-2 py-0.5 rounded ${terminalTab === "build" ? "bg-[#151824] text-white" : "hover:text-white"}`}
                    >
                      Build Output
                    </button>
                    <button
                      onClick={() => setTerminalTab("agent")}
                      className={`px-2 py-0.5 rounded ${terminalTab === "agent" ? "bg-[#151824] text-white" : "hover:text-white"}`}
                    >
                      Agent Trace
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>WebContainer: Ready</span>
              </div>
            </div>

            {terminalOpen && (
              <div className="h-36 p-3 bg-[#050608] font-mono text-xs overflow-y-auto border-t border-[#1b1e2a] text-[#9ca3af] space-y-1">
                {terminalTab === "console" && (
                  <>
                    <div className="text-emerald-400">[vite] connected.</div>
                    <div>[HMR] waiting for update signal from WSS...</div>
                    <div className="text-[#8b90a0]">&gt; App rendered in 14ms (2 components mounted)</div>
                    <div className="text-blue-400">&gt; GET /api/health 200 OK (2ms)</div>
                  </>
                )}
                {terminalTab === "build" && (
                  <>
                    <div className="text-white">&gt; buildbox@1.0.0 build</div>
                    <div className="text-[#8b90a0]">&gt; tsc -b &amp;&amp; vite build</div>
                    <div className="text-emerald-400">✓ 42 modules transformed.</div>
                    <div className="text-emerald-400">✓ dist/index.html 0.45 kB</div>
                    <div className="text-emerald-400">✓ dist/assets/index.js 42.12 kB</div>
                    <div className="text-emerald-400">✓ Built in 482ms.</div>
                  </>
                )}
                {terminalTab === "agent" && (
                  <>
                    <div className="text-purple-400">[Agent:Planner] Analyzed user intent: FeatureGrid creation</div>
                    <div className="text-blue-400">[Agent:Coder] Generated file: src/components/FeatureGrid.tsx</div>
                    <div className="text-blue-400">[Agent:Coder] Edited file: src/App.tsx</div>
                    <div className="text-emerald-400">[Agent:AutoHealer] Type verification passed (0 errors)</div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreditsModal
        isOpen={creditsModalOpen}
        onClose={() => setCreditsModalOpen(false)}
        currentBalance={creditBalance}
        onAddCredits={(credits) => {
          setCreditBalance((prev) => prev + credits);
          setCreditsModalOpen(false);
        }}
      />

      <DeployModal
        isOpen={deployModalOpen}
        onClose={() => setDeployModalOpen(false)}
        projectName={project.name}
        subdomain={project.subdomain || "app"}
      />

      <RollbackModal
        isOpen={rollbackModalOpen}
        onClose={() => setRollbackModalOpen(false)}
        checkpoints={project.checkpoints}
        onRollback={handleRollback}
      />
    </div>
  );
}
