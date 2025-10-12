-- Table to persist per-user template progress
create table if not exists public.template_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id text not null,
  tasks jsonb not null default '[]'::jsonb,
  notes text default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, template_id)
);

-- Enable RLS
alter table public.template_progress enable row level security;

-- Policies
create policy "template_progress_select_own"
  on public.template_progress for select
  using (auth.uid() = user_id);

create policy "template_progress_insert_own"
  on public.template_progress for insert
  with check (auth.uid() = user_id);

create policy "template_progress_update_own"
  on public.template_progress for update
  using (auth.uid() = user_id);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists template_progress_set_updated_at on public.template_progress;
create trigger template_progress_set_updated_at
  before update on public.template_progress
  for each row execute function public.set_updated_at();
