import { Project, CreditAccount, TemplateType } from "./types";

export const initialAccount: CreditAccount = {
  user_id: "user_1",
  balance: 10, // 10 créditos de boas-vindas
  lifetime_purchased: 10,
  plan: "free",
};

export const sampleTemplates: {
  id: TemplateType;
  title: string;
  desc: string;
  badge: string;
  prompt: string;
}[] = [
  {
    id: "saas",
    title: "AI SaaS Starter",
    desc: "Assinaturas com Stripe, autenticação, painel e banco de dados relacional.",
    badge: "Mais Popular",
    prompt: "Crie uma plataforma SaaS para geração de relatórios de SEO com autenticação, dashboard de métricas e planos de assinatura Stripe.",
  },
  {
    id: "crm",
    title: "AI CRM & Lead Flow",
    desc: "Funil de vendas no estilo Kanban, gestão de contatos e agendamentos.",
    badge: "Produtividade",
    prompt: "Crie um CRM visual para corretores de imóveis com funil Kanban, cadastro de clientes e métricas de conversão.",
  },
  {
    id: "dashboard",
    title: "AI Analytics Dashboard",
    desc: "Gráficos em tempo real, filtros dinâmicos e métricas de desempenho.",
    badge: "Analytics",
    prompt: "Crie um painel de controle financeiro com gráficos de receita, despesas e taxa de retenção com filtros por data.",
  },
  {
    id: "mobile",
    title: "AI Mobile App (PWA/Expo)",
    desc: "Design otimizado para smartphone, suporte offline e navegação por abas.",
    badge: "Mobile",
    prompt: "Crie um aplicativo mobile de treino e fitness com contador de séries, temporizador de descanso e histórico diário.",
  },
  {
    id: "landing",
    title: "AI Landing Page",
    desc: "Página de conversão de alta performance com formulário e FAQ.",
    badge: "Conversão",
    prompt: "Crie uma landing page moderna para uma startup de IA com seções de Hero, Prova Social, Preços e FAQ expansível.",
  },
];

export const defaultProjects: Project[] = [
  {
    id: "proj_1",
    name: "Nexus CRM Pro",
    slug: "nexus-crm-pro",
    description: "CRM para equipes de vendas com funil Kanban e cadastro de leads.",
    template_type: "crm",
    ai_model: "gemini-2.5-flash",
    created_at: "2026-10-06T18:00:00Z",
    updated_at: "2026-10-06T20:30:00Z",
    deployed_url: "https://nexus-crm-pro.buildbox.app",
    subdomain: "nexus-crm-pro",
    files: [
      {
        path: "src/App.tsx",
        language: "typescript",
        content: `import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, Plus, CheckCircle } from 'lucide-react';

export default function App() {
  const [leads, setLeads] = useState([
    { id: 1, name: 'Acme Corp', value: 'R$ 15.000', stage: 'Proposta' },
    { id: 2, name: 'Stark Industries', value: 'R$ 48.000', stage: 'Negociação' },
    { id: 3, name: 'Wayne Enterprises', value: 'R$ 32.000', stage: 'Fechado' }
  ]);

  return (
    <div style={{ minHeight: '100vh', background: '#090a0f', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Nexus CRM Pro</h1>
          <p style={{ color: '#888', margin: '4px 0 0 0', fontSize: '14px' }}>Pipeline de Vendas em Tempo Real</p>
        </div>
        <button style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
          + Novo Lead
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: '#12141c', padding: '20px', borderRadius: '12px', border: '1px solid #232635' }}>
          <div style={{ color: '#888', fontSize: '13px' }}>Total em Negociação</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px', color: '#34d399' }}>R$ 95.000</div>
        </div>
        <div style={{ background: '#12141c', padding: '20px', borderRadius: '12px', border: '1px solid #232635' }}>
          <div style={{ color: '#888', fontSize: '13px' }}>Leads Ativos</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px' }}>14</div>
        </div>
        <div style={{ background: '#12141c', padding: '20px', borderRadius: '12px', border: '1px solid #232635' }}>
          <div style={{ color: '#888', fontSize: '13px' }}>Taxa de Conversão</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px', color: '#818cf8' }}>68%</div>
        </div>
      </div>

      <div style={{ background: '#12141c', padding: '20px', borderRadius: '12px', border: '1px solid #232635' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Oportunidades no Funil</h2>
        {leads.map(lead => (
          <div key={lead.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #232635' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{lead.name}</div>
              <div style={{ fontSize: '12px', color: '#888' }}>Estágio: {lead.stage}</div>
            </div>
            <div style={{ fontWeight: 'bold', color: '#818cf8' }}>{lead.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}`
      },
      {
        path: "package.json",
        language: "json",
        content: `{\n  "name": "nexus-crm-pro",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.3.1",\n    "lucide-react": "^0.468.0"\n  }\n}`
      }
    ],
    conversation: [
      {
        id: "msg_1",
        role: "user",
        content: "Crie um CRM para equipe de vendas com pipeline de leads e indicadores de receita.",
        timestamp: "2026-10-06T18:00:00Z"
      },
      {
        id: "msg_2",
        role: "assistant",
        content: "Planejei a estrutura do CRM com os componentes principais e layout escuro de alta legibilidade.",
        timestamp: "2026-10-06T18:00:15Z",
        credits_spent: 3,
        tool_invocations: [
          { tool: "create_file", path: "package.json", status: "completed", details: "Criou manifesto de dependências" },
          { tool: "create_file", path: "src/App.tsx", status: "completed", details: "Estruturou telas e cards de métricas" },
          { tool: "run_command", command: "npm run build", status: "completed", details: "Build bem-sucedido em 1.2s" }
        ]
      }
    ],
    checkpoints: [
      {
        id: "cp_1",
        project_id: "proj_1",
        prompt_message: "Criação inicial do CRM",
        timestamp: "2026-10-06T18:00:15Z",
        credits_spent: 3,
        files: []
      }
    ]
  }
];
