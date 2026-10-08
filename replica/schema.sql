-- Schema: Emergent Clone (AI Vibe-Coding Platform)
-- Database: PostgreSQL 15+ (Supabase / Neon)

create extension if not exists "uuid-ossp";

-- 1. Users & Profiles
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  avatar_url text,
  github_username text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_users_email on users(email);

-- 2. Credit Accounts (Central Balance)
create table credit_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references users(id) on delete cascade,
  balance integer not null default 10 check (balance >= 0),
  lifetime_purchased integer not null default 0,
  plan text not null default 'free' check (plan in ('free', 'starter', 'pro')),
  stripe_customer_id text,
  stripe_subscription_id text,
  renews_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_credit_accounts_user on credit_accounts(user_id);
create index idx_credit_accounts_stripe on credit_accounts(stripe_customer_id);

-- 3. Credit Transactions Ledger
create table credit_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  amount integer not null, -- positive for purchase/grant, negative for usage
  balance_after integer not null,
  action_type text not null check (action_type in ('initial_grant', 'prompt_turn', 'scaffold', 'auto_healing', 'topup_purchase', 'subscription_grant', 'refund')),
  project_id uuid,
  notes text,
  created_at timestamptz not null default now()
);
create index idx_credit_transactions_user on credit_transactions(user_id, created_at desc);

-- 4. Projects
create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  template_type text not null default 'fullstack' check (template_type in ('fullstack', 'mobile', 'landing', 'dashboard', 'crm', 'saas')),
  ai_model text not null default 'gemini-2.5-flash',
  session_budget_limit integer default null, -- optional credit guard
  current_checkpoint_id uuid,
  github_repo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, slug)
);
create index idx_projects_user on projects(user_id, updated_at desc);

-- 5. Project Files
create table project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  path text not null,
  content text not null,
  mime_type text not null default 'text/plain',
  is_binary boolean not null default false,
  size_bytes integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, path)
);
create index idx_project_files_path on project_files(project_id, path);

-- 6. Checkpoints (Rollback History)
create table checkpoints (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  prompt_message text not null,
  files_snapshot jsonb not null, -- array of { path, content, mime_type }
  credits_spent integer not null default 0,
  created_at timestamptz not null default now()
);
create index idx_checkpoints_project on checkpoints(project_id, created_at desc);

-- 7. Conversation Turns & Agent Timeline
create table conversation_turns (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  clarifying_answers jsonb default null,
  tool_invocations jsonb default '[]', -- steps: create_file, execute_command, auto_heal
  diff_summary jsonb default '[]',
  credits_spent integer not null default 0,
  created_at timestamptz not null default now()
);
create index idx_conversation_project on conversation_turns(project_id, created_at asc);

-- 8. Deployments
create table deployments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  subdomain text unique not null,
  custom_domain text,
  status text not null default 'building' check (status in ('building', 'live', 'failed', 'offline')),
  deployed_url text not null,
  build_logs text,
  ssl_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_deployments_project on deployments(project_id);
create index idx_deployments_subdomain on deployments(subdomain);

-- Row Level Security (RLS)
alter table users enable row level security;
alter table credit_accounts enable row level security;
alter table credit_transactions enable row level security;
alter table projects enable row level security;
alter table project_files enable row level security;
alter table checkpoints enable row level security;
alter table conversation_turns enable row level security;
alter table deployments enable row level security;

-- RLS Policies: users access only their own resources
create policy "users_self" on users for all using (auth.uid() = id);
create policy "credit_accounts_self" on credit_accounts for select using (auth.uid() = user_id);
create policy "credit_transactions_self" on credit_transactions for select using (auth.uid() = user_id);
create policy "projects_owner" on projects for all using (auth.uid() = user_id);
create policy "project_files_owner" on project_files for all using (
  exists (select 1 from projects where projects.id = project_files.project_id and projects.user_id = auth.uid())
);
create policy "checkpoints_owner" on checkpoints for all using (
  exists (select 1 from projects where projects.id = checkpoints.project_id and projects.user_id = auth.uid())
);
create policy "conversation_owner" on conversation_turns for all using (auth.uid() = user_id);
create policy "deployments_owner" on deployments for all using (auth.uid() = user_id);
create policy "deployments_public_read" on deployments for select using (status = 'live');
