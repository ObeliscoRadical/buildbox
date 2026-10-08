"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { CreditsModal } from "@/components/credits-modal";
import {
  Plus,
  Search,
  Box,
  ArrowRight,
  Clock,
  ExternalLink,
  Zap,
  Layers,
  Sparkles,
  Smartphone,
  Globe,
  LayoutDashboard,
  Users,
  Briefcase,
  Play,
  CheckCircle2,
  Trash2,
  Download,
  Copy
} from "lucide-react";
import { defaultProjects, initialAccount } from "@/lib/store";
import { Project, TemplateType, AIModel } from "@/lib/types";
import JSZip from "jszip";

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [creditBalance, setCreditBalance] = useState<number>(initialAccount.balance);
  const [creditsModalOpen, setCreditsModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [heroPrompt, setHeroPrompt] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("SaaS");
  const [selectedModel, setSelectedModel] = useState<AIModel>("gemini-2.5-flash");

  // Read query param if passed from landing
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const passedPrompt = urlParams.get("prompt");
      if (passedPrompt) {
        setHeroPrompt(passedPrompt);
      }
    }
  }, []);

  const categories = [
    { label: "Website", template: "website" as TemplateType },
    { label: "Web App", template: "webapp" as TemplateType },
    { label: "Mobile App", template: "mobile" as TemplateType },
    { label: "Dashboard", template: "dashboard" as TemplateType },
    { label: "CRM", template: "crm" as TemplateType },
    { label: "SaaS", template: "saas" as TemplateType },
  ];

  const handleCreateFromHero = (e: React.FormEvent) => {
    e.preventDefault();
    const promptText = heroPrompt.trim() || `Create a new ${selectedCategory} application`;
    const newId = `proj_${Date.now()}`;
    const name = heroPrompt.trim().slice(0, 30) || `New ${selectedCategory} App`;

    const newProj: Project = {
      id: newId,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      description: promptText,
      template_type: (categories.find(c => c.label === selectedCategory)?.template || "saas"),
      ai_model: selectedModel,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deployed_url: `https://${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.buildbox.app`,
      subdomain: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      files: [...defaultProjects[0].files],
      conversation: [
        {
          id: `msg_${Date.now()}`,
          role: "user",
          content: promptText,
          timestamp: new Date().toISOString(),
        },
      ],
      checkpoints: [],
    };

    setProjects([newProj, ...projects]);
    router.push(`/studio/${newId}`);
  };

  const handleExportZip = async (project: Project, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#07080c] text-[#f4f5f8] flex flex-col font-sans">
      <Navbar
        creditBalance={creditBalance}
        onOpenCredits={() => setCreditsModalOpen(true)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 space-y-12">
        {/* ========================================================= */}
        {/* HERO PROMPT SECTION (Exact app.emergent.sh style) */}
        {/* ========================================================= */}
        <section className="text-center pt-6 pb-2 space-y-4 max-w-3xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Describe your idea
            </h1>
            <p className="text-sm emergent-gradient-text font-semibold">
              Build websites & apps with AI
            </p>
          </div>

          <form onSubmit={handleCreateFromHero} className="rounded-2xl bg-[#0e1017] border border-[#1f2333] shadow-2xl p-4 text-left space-y-3 focus-within:border-blue-500/80 transition-all">
            {/* Category selection */}
            <div className="flex flex-wrap gap-1.5 pb-2 border-b border-[#1b1e2a]">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.label
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-[#151824] text-[#8b90a0] hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Prompt input */}
            <textarea
              value={heroPrompt}
              onChange={(e) => setHeroPrompt(e.target.value)}
              placeholder="What do you want to build? (e.g. 'A real estate listing portal with search filters, virtual tour cards, and WhatsApp contact button')..."
              rows={3}
              className="w-full bg-transparent px-1 text-sm text-white placeholder:text-[#5a6075] resize-none focus:outline-none leading-relaxed"
            />

            {/* Controls Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#1b1e2a]">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Model selector */}
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value as AIModel)}
                  className="bg-[#151824] border border-[#1f2333] text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash (~2 cr)</option>
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro (~4 cr)</option>
                  <option value="claude-3.7-sonnet">Claude 3.7 Sonnet (~5 cr)</option>
                </select>

                <span className="text-[11px] text-[#8b90a0]">
                  Cost: ~2 credits
                </span>
              </div>

              <button
                type="submit"
                className="emergent-btn-blue w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Start Building</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </section>

        {/* ========================================================= */}
        {/* CONTINUE WORKING / RECENT APPS SECTION */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1b1e2a]">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <span>Continue Working</span>
                <span className="text-xs font-normal text-[#8b90a0] px-2 py-0.5 rounded-full bg-[#151824]">
                  {projects.length}
                </span>
              </h2>
              <p className="text-xs text-[#8b90a0] mt-0.5">
                Pick up where you left off or open in the Studio IDE.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#8b90a0] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-[#0e1017] border border-[#1f2333] focus:border-blue-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-[#5a6075] focus:outline-none"
              />
            </div>
          </div>

          {/* Projects Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-[#0e1017] border border-[#1f2333] hover:border-blue-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div>
                  {/* Top Bar with Template badge & Actions */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#151824] border border-[#1f2333] text-blue-400">
                      {project.template_type}
                    </span>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleExportZip(project, e)}
                        title="Export project as ZIP"
                        className="p-1.5 rounded-lg hover:bg-[#151824] text-[#8b90a0] hover:text-white transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteProject(project.id, e)}
                        title="Delete project"
                        className="p-1.5 rounded-lg hover:bg-[#151824] text-[#8b90a0] hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* App Visual Preview Thumbnail Mockup */}
                  <Link href={`/studio/${project.id}`} className="block relative aspect-[16/9] rounded-xl bg-[#07080c] border border-[#1b1e2a] overflow-hidden mb-3.5 group-hover:border-blue-500/30 transition-colors">
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[10px] text-[#5a6075]">
                      <span className="truncate">{project.name}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-white/90 truncate max-w-[200px]">
                          {project.name}
                        </div>
                        <div className="text-[10px] text-[#71788e] line-clamp-1">
                          {project.description}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#8b90a0] mt-1 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1b1e2a] flex items-center justify-between">
                  <span className="text-[11px] text-[#71788e] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Updated recently
                  </span>

                  <Link
                    href={`/studio/${project.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151824] hover:bg-blue-600 text-xs font-semibold text-white transition-all"
                  >
                    <span>Open Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* LIVE BUILDERS WORLDWIDE ROLLING COUNTER */}
        {/* ========================================================= */}
        <section className="py-8 px-6 rounded-2xl bg-[#0e1017] border border-[#1f2333] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-sm font-bold text-white">Live Global Builder Activity</div>
            <div className="text-xs text-[#8b90a0]">Real-time autonomous agent generations across 200+ countries.</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 font-mono text-xl md:text-2xl font-bold bg-[#07080c] border border-[#1f2333] px-4 py-2 rounded-xl text-blue-400 shadow-inner">
              <span>1</span>
              <span>5</span>
              <span className="text-white/40">,</span>
              <span>4</span>
              <span>8</span>
              <span>2</span>
              <span className="text-white/40">,</span>
              <span>9</span>
              <span>1</span>
              <span>2</span>
            </div>
            <span className="text-xs text-[#8b90a0]">Apps Created</span>
          </div>
        </section>
      </main>

      <CreditsModal
        isOpen={creditsModalOpen}
        onClose={() => setCreditsModalOpen(false)}
        currentBalance={creditBalance}
        onAddCredits={(credits) => {
          setCreditBalance((prev) => prev + credits);
          setCreditsModalOpen(false);
        }}
      />
    </div>
  );
}
