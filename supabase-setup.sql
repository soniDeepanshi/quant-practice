-- Run this once in the Supabase SQL Editor for the Quant Practice project.
create table if not exists public.practice_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.practice_progress enable row level security;
revoke all on table public.practice_progress from anon, authenticated;
grant select, insert, update, delete on table public.practice_progress to authenticated;

drop policy if exists "Users can read their own practice progress" on public.practice_progress;
create policy "Users can read their own practice progress"
  on public.practice_progress for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own practice progress" on public.practice_progress;
create policy "Users can create their own practice progress"
  on public.practice_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own practice progress" on public.practice_progress;
create policy "Users can update their own practice progress"
  on public.practice_progress for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own practice progress" on public.practice_progress;
create policy "Users can delete their own practice progress"
  on public.practice_progress for delete to authenticated
  using ((select auth.uid()) = user_id);
