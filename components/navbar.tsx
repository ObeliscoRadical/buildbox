"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  ChevronDown,
  Globe,
  Smartphone,
  LayoutDashboard,
  Users,
  Layers,
  Calendar,
  Bot,
  Briefcase,
  Building2,
  BookOpen,
  HelpCircle,
  Clock,
  Download,
  Rocket,
  Coins,
  Monitor,
  Tablet,
  CheckCircle2,
  Columns
} from "lucide-react";

interface NavbarProps {
  projectName?: string;
  creditBalance?: number;
  onOpenCredits?: () => void;
  onOpenDeploy?: () => void;
  onOpenRollback?: () => void;
  onDownloadZip?: () => void;
  isStudio?: boolean;
  activeView?: "preview" | "code" | "split";
  onViewChange?: (view: "preview" | "code" | "split") => void;
  viewport?: "desktop" | "tablet" | "mobile";
  onViewportChange?: (viewport: "desktop" | "tablet" | "mobile") => void;
}

export function Navbar({
  projectName,
  creditBalance = 10,
  onOpenCredits,
  onOpenDeploy,
  onOpenRollback,
  onDownloadZip,
  isStudio = false,
  activeView = "preview",
  onViewChange,
  viewport = "desktop",
  onViewportChange,
}: NavbarProps) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="h-[56px] border-b border-[#1b1e2a] bg-[#07080c]/90 backdrop-blur-md px-4 md:px-6 flex items-center justify-between z-40 sticky top-0 text-white">
      {/* Left: Brand Logo & Navigation */}
      <div className="flex items-center gap-5">
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Emergent-style Geometric Icon */}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Box className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
            Buildbox
          </span>
        </Link>

        {/* Studio Mode Left Details */}
        {isStudio && projectName && (
          <div className="flex items-center gap-3 pl-4 border-l border-[#1f2333]">
            <span className="text-xs font-medium text-white/90 truncate max-w-[200px]">
              {projectName}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>
        )}

        {/* Emergent Landing Navigation Menus */}
        {!isStudio && (
          <nav className="hidden lg:flex items-center gap-5 text-[13px] font-medium text-[#9da3b4]">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-white transition-colors py-2">
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 w-[520px] p-3 rounded-2xl bg-[#0e1017] border border-[#1f2333] shadow-2xl grid grid-cols-2 gap-2 animate-in fade-in duration-150">
                  <Link href="/dashboard" className="p-2.5 rounded-xl hover:bg-[#151824] flex items-center gap-3 transition-colors">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">AI Website Builder</div>
                      <div className="text-[11px] text-[#8b90a0]">Build and publish websites fast</div>
                    </div>
                  </Link>

                  <Link href="/dashboard" className="p-2.5 rounded-xl hover:bg-[#151824] flex items-center gap-3 transition-colors">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">AI App Builder</div>
                      <div className="text-[11px] text-[#8b90a0]">Create & launch mobile apps fast</div>
                    </div>
                  </Link>

                  <Link href="/dashboard" className="p-2.5 rounded-xl hover:bg-[#151824] flex items-center gap-3 transition-colors">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">AI Web App Builder</div>
                      <div className="text-[11px] text-[#8b90a0]">Build and ship web apps fast</div>
                    </div>
                  </Link>

                  <Link href="/dashboard" className="p-2.5 rounded-xl hover:bg-[#151824] flex items-center gap-3 transition-colors">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <LayoutDashboard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">AI Dashboard Builder</div>
                      <div className="text-[11px] text-[#8b90a0]">Build dashboards and track KPIs</div>
                    </div>
                  </Link>

                  <Link href="/dashboard" className="p-2.5 rounded-xl hover:bg-[#151824] flex items-center gap-3 transition-colors">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">AI CRM Builder</div>
                      <div className="text-[11px] text-[#8b90a0]">Build CRMs and manage leads</div>
                    </div>
                  </Link>

                  <Link href="/dashboard" className="p-2.5 rounded-xl hover:bg-[#151824] flex items-center gap-3 transition-colors">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">AI SaaS Builder</div>
                      <div className="text-[11px] text-[#8b90a0]">Build complete SaaS products</div>
                    </div>
                  </Link>

                  <Link href="/dashboard" className="p-2.5 rounded-xl hover:bg-[#151824] flex items-center gap-3 transition-colors">
                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">AI Schedule Builder</div>
                      <div className="text-[11px] text-[#8b90a0]">Create schedules & automate</div>
                    </div>
                  </Link>

                  <Link href="/dashboard" className="p-2.5 rounded-xl hover:bg-[#151824] flex items-center gap-3 transition-colors">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">AI Agent Builder</div>
                      <div className="text-[11px] text-[#8b90a0]">Build AI agents to automate</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-white transition-colors py-2">
                <span>Solutions</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 w-64 p-2 rounded-2xl bg-[#0e1017] border border-[#1f2333] shadow-2xl space-y-1 animate-in fade-in duration-150">
                  <Link href="/dashboard" className="p-2.5 rounded-xl hover:bg-[#151824] block transition-colors">
                    <div className="text-xs font-semibold text-white">SMB Owners</div>
                    <div className="text-[11px] text-[#8b90a0]">Build internal tools without dev</div>
                  </Link>
                  <Link href="/dashboard" className="p-2.5 rounded-xl hover:bg-[#151824] block transition-colors">
                    <div className="text-xs font-semibold text-white">IT Agencies</div>
                    <div className="text-[11px] text-[#8b90a0]">Deliver client apps faster</div>
                  </Link>
                  <Link href="/dashboard" className="p-2.5 rounded-xl hover:bg-[#151824] block transition-colors">
                    <div className="text-xs font-semibold text-white">Product Managers</div>
                    <div className="text-[11px] text-[#8b90a0]">Turn requirements into real apps</div>
                  </Link>
                  <Link href="/dashboard" className="p-2.5 rounded-xl hover:bg-[#151824] block transition-colors">
                    <div className="text-xs font-semibold text-white">Operations Teams</div>
                    <div className="text-[11px] text-[#8b90a0]">Automate business operations</div>
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown (3 Columns Mega Menu) */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-white transition-colors py-2">
                <span>Resources</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {resourcesOpen && (
                <div className="absolute top-full left-0 w-[580px] p-4 rounded-2xl bg-[#0e1017] border border-[#1f2333] shadow-2xl grid grid-cols-3 gap-4 animate-in fade-in duration-150">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280] mb-2 px-2">Get Started</div>
                    <Link href="/dashboard" className="p-2 rounded-lg hover:bg-[#151824] block text-xs font-medium text-white">Tutorials</Link>
                    <Link href="/dashboard" className="p-2 rounded-lg hover:bg-[#151824] block text-xs font-medium text-white">Blog</Link>
                    <Link href="/dashboard" className="p-2 rounded-lg hover:bg-[#151824] block text-xs font-medium text-white">Integrations</Link>
                    <Link href="/dashboard" className="p-2 rounded-lg hover:bg-[#151824] block text-xs font-medium text-white">AI Contest</Link>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280] mb-2 px-2">Insights</div>
                    <Link href="/dashboard" className="p-2 rounded-lg hover:bg-[#151824] block text-xs font-medium text-white">Learn</Link>
                    <Link href="/dashboard" className="p-2 rounded-lg hover:bg-[#151824] block text-xs font-medium text-white">Case Studies</Link>
                    <Link href="/dashboard" className="p-2 rounded-lg hover:bg-[#151824] block text-xs font-medium text-white">News</Link>
                    <Link href="/dashboard" className="p-2 rounded-lg hover:bg-[#151824] block text-xs font-medium text-white">Videos</Link>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280] mb-2 px-2">Help</div>
                    <Link href="/dashboard" className="p-2 rounded-lg hover:bg-[#151824] block text-xs font-medium text-white">Documentation</Link>
                    <Link href="/dashboard" className="p-2 rounded-lg hover:bg-[#151824] block text-xs font-medium text-white">Community</Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/dashboard" className="hover:text-white transition-colors">
              Enterprise
            </Link>
            <Link href="/#pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>
        )}
      </div>

      {/* Center Studio View Switcher */}
      {isStudio && onViewChange && (
        <div className="flex items-center gap-3">
          <div className="flex items-center p-0.5 bg-[#0e1017] border border-[#1f2333] rounded-lg">
            <button
              onClick={() => onViewChange("preview")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                activeView === "preview"
                  ? "bg-[#1f2333] text-white shadow-sm"
                  : "text-[#8b90a0] hover:text-white"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => onViewChange("code")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                activeView === "code"
                  ? "bg-[#1f2333] text-white shadow-sm"
                  : "text-[#8b90a0] hover:text-white"
              }`}
            >
              Code
            </button>
            <button
              onClick={() => onViewChange("split")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                activeView === "split"
                  ? "bg-[#1f2333] text-white shadow-sm"
                  : "text-[#8b90a0] hover:text-white"
              }`}
            >
              Split
            </button>
          </div>

          {/* Viewport Switcher when in preview or split */}
          {activeView !== "code" && onViewportChange && (
            <div className="hidden sm:flex items-center p-0.5 bg-[#0e1017] border border-[#1f2333] rounded-lg">
              <button
                onClick={() => onViewportChange("desktop")}
                title="Desktop (100%)"
                className={`p-1 rounded-md text-xs transition-colors ${
                  viewport === "desktop" ? "bg-[#1f2333] text-white" : "text-[#8b90a0] hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onViewportChange("tablet")}
                title="Tablet (768px)"
                className={`p-1 rounded-md text-xs transition-colors ${
                  viewport === "tablet" ? "bg-[#1f2333] text-white" : "text-[#8b90a0] hover:text-white"
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onViewportChange("mobile")}
                title="Mobile (375px)"
                className={`p-1 rounded-md text-xs transition-colors ${
                  viewport === "mobile" ? "bg-[#1f2333] text-white" : "text-[#8b90a0] hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Right Side Actions */}
      <div className="flex items-center gap-2.5">
        {/* Credits Badge (Click opens billing modal) */}
        <button
          onClick={onOpenCredits}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#272b3d] bg-[#0e1017] text-xs font-semibold text-amber-300 hover:border-amber-400/50 transition-all cursor-pointer shadow-sm"
          title="Saldo de créditos disponíveis"
        >
          <Coins className="w-3.5 h-3.5 text-amber-400" />
          <span>{creditBalance} cr</span>
        </button>

        {/* Buy Credits Button (Styled exactly like Emergent gold button) */}
        <button
          onClick={onOpenCredits}
          className="emergent-btn-gold px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
        >
          Buy Credits
        </button>

        {isStudio ? (
          <>
            {onOpenRollback && (
              <button
                onClick={onOpenRollback}
                className="p-1.5 rounded-lg bg-[#0e1017] border border-[#1f2333] text-[#8b90a0] hover:text-white hover:border-[#2f354d] transition-all"
                title="Histórico de versões / Rollback"
              >
                <Clock className="w-4 h-4" />
              </button>
            )}

            {onDownloadZip && (
              <button
                onClick={onDownloadZip}
                className="p-1.5 rounded-lg bg-[#0e1017] border border-[#1f2333] text-[#8b90a0] hover:text-white hover:border-[#2f354d] transition-all"
                title="Exportar ZIP com código-fonte completo"
              >
                <Download className="w-4 h-4" />
              </button>
            )}

            {onOpenDeploy && (
              <button
                onClick={onOpenDeploy}
                className="emergent-btn-blue flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Publish</span>
              </button>
            )}
          </>
        ) : (
          /* Landing CTA Start for Free */
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-semibold transition-all shadow-md active:scale-95"
          >
            <span>Start for Free</span>
            {/* Emergent authentic sparkle/arrow SVG icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path d="M 4.697 14.125 L 5.875 15.303 L 12.946 8.232 L 14.125 9.411 L 15.303 8.232 L 14.125 7.054 L 15.303 5.875 L 14.125 4.697 L 12.946 5.875 L 11.768 4.697 L 10.589 5.875 L 11.768 7.054 Z M 8.232 5.875 L 9.411 4.697 L 10.589 5.875 L 9.411 7.054 Z M 8.232 5.875 L 7.054 7.054 L 5.875 5.875 L 7.054 4.697 Z M 14.125 11.768 L 15.303 10.589 L 14.125 9.411 L 12.946 10.589 Z M 14.125 11.768 L 12.946 12.946 L 14.125 14.125 L 15.303 12.946 Z" />
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
}
