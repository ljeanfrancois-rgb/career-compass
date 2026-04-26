create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  email text,
  first_dream text,
  current_interest text,
  mission text,
  saved_path_id text,
  completed_path_ids text[] default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  field_id text not null,
  top_match_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.career_paths (
  id text primary key,
  created_by uuid not null references auth.users (id) on delete cascade,
  field text not null,
  title text not null,
  description text not null,
  mission text not null,
  traits text[] not null default '{}'::text[],
  skills text[] not null default '{}'::text[],
  classes text[] not null default '{}'::text[],
  projects text[] not null default '{}'::text[],
  roadmap text[] not null default '{}'::text[],
  answer_weights jsonb not null default '{}'::jsonb,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.quiz_runs enable row level security;
alter table public.career_paths enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

drop trigger if exists career_paths_set_updated_at on public.career_paths;
create trigger career_paths_set_updated_at
  before update on public.career_paths
  for each row execute procedure public.update_updated_at_column();

drop policy if exists "users can view own profile" on public.profiles;
create policy "users can view own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "users can insert own profile" on public.profiles;
create policy "users can insert own profile"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "users can view own quiz runs" on public.quiz_runs;
create policy "users can view own quiz runs"
on public.quiz_runs for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "users can insert own quiz runs" on public.quiz_runs;
create policy "users can insert own quiz runs"
on public.quiz_runs for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "users can view public or owned career paths" on public.career_paths;
create policy "users can view public or owned career paths"
on public.career_paths for select
to authenticated
using (is_public or auth.uid() = created_by);

drop policy if exists "anon can view public career paths" on public.career_paths;
create policy "anon can view public career paths"
on public.career_paths for select
to anon
using (is_public);

drop policy if exists "users can insert own career paths" on public.career_paths;
create policy "users can insert own career paths"
on public.career_paths for insert
to authenticated
with check (auth.uid() = created_by);

drop policy if exists "users can update own career paths" on public.career_paths;
create policy "users can update own career paths"
on public.career_paths for update
to authenticated
using (auth.uid() = created_by)
with check (auth.uid() = created_by);

drop policy if exists "users can delete own career paths" on public.career_paths;
create policy "users can delete own career paths"
on public.career_paths for delete
to authenticated
using (auth.uid() = created_by);
