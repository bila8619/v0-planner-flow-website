-- Create profiles table that references auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Subscription information
  subscription_plan text default 'free' check (subscription_plan in ('free', 'essential', 'complete', 'pro', 'family')),
  subscription_status text default 'active' check (subscription_status in ('active', 'cancelled', 'expired')),
  subscription_start_date timestamp with time zone,
  subscription_end_date timestamp with time zone,
  
  -- Stripe integration
  stripe_customer_id text,
  stripe_subscription_id text,
  
  -- Template access tracking
  templates_accessed integer default 0,
  last_template_access timestamp with time zone
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policies for profiles table
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Create trigger for updated_at
create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();
