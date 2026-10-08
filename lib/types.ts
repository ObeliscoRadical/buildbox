export type TemplateType = 'fullstack' | 'mobile' | 'landing' | 'dashboard' | 'crm' | 'saas';

export type AIModel = 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'claude-3-7-sonnet' | 'gpt-4o';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: 'user' | 'admin';
}

export interface CreditAccount {
  user_id: string;
  balance: number;
  lifetime_purchased: number;
  plan: 'free' | 'starter' | 'pro';
  renews_at?: string;
}

export interface CreditTransaction {
  id: string;
  user_id: string;
  amount: number;
  balance_after: number;
  action_type: 'initial_grant' | 'prompt_turn' | 'scaffold' | 'auto_healing' | 'topup_purchase' | 'subscription_grant' | 'refund';
  project_id?: string;
  notes?: string;
  created_at: string;
}

export interface ProjectFile {
  path: string;
  content: string;
  language?: string;
  modified?: boolean;
}

export interface ToolInvocation {
  tool: 'create_file' | 'edit_file' | 'delete_file' | 'run_command' | 'auto_heal';
  path?: string;
  command?: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  details?: string;
}

export interface ConversationTurn {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  tool_invocations?: ToolInvocation[];
  credits_spent?: number;
  clarifying_options?: string[];
}

export interface Checkpoint {
  id: string;
  project_id: string;
  prompt_message: string;
  files: ProjectFile[];
  timestamp: string;
  credits_spent: number;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  template_type: TemplateType;
  ai_model: AIModel;
  created_at: string;
  updated_at: string;
  files: ProjectFile[];
  conversation: ConversationTurn[];
  checkpoints: Checkpoint[];
  deployed_url?: string;
  subdomain?: string;
}
