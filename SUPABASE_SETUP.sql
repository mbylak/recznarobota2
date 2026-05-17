-- Minimal backend for RR2 demo (cross-device CMS + contact form)

-- 1) KV store for CMS data
create table if not exists public.cms_kv (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_cms_kv_touch on public.cms_kv;
create trigger trg_cms_kv_touch
before update on public.cms_kv
for each row execute function public.touch_updated_at();

-- 2) Admin users + helper function
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users a
    where a.user_id = uid
  );
$$;

-- 3) RLS
alter table public.cms_kv enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "public read cms_kv" on public.cms_kv;
drop policy if exists "anon insert messages kv" on public.cms_kv;
drop policy if exists "anon update messages kv" on public.cms_kv;
drop policy if exists "admin full cms_kv" on public.cms_kv;
drop policy if exists "admin read admin_users" on public.admin_users;
drop policy if exists "admin manage admin_users" on public.admin_users;

-- Everyone can read CMS state
create policy "public read cms_kv"
on public.cms_kv
for select
to anon, authenticated
using (true);

-- Public form can only write messages key
create policy "anon insert messages kv"
on public.cms_kv
for insert
to anon
with check (key = 'rr2_cms_messages');

create policy "anon update messages kv"
on public.cms_kv
for update
to anon
using (key = 'rr2_cms_messages')
with check (key = 'rr2_cms_messages');

-- Admin has full access to all keys
create policy "admin full cms_kv"
on public.cms_kv
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- Admins can view/manage admin list
create policy "admin read admin_users"
on public.admin_users
for select
to authenticated
using (public.is_admin(auth.uid()));

create policy "admin manage admin_users"
on public.admin_users
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

