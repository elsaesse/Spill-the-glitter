-- Module "Ma caisse" : catalogue, prestations encaissées, dépenses.
-- Accès réservé à un seul compte (la cliente), via RLS.

create type payment_method as enum ('cash', 'card', 'check', 'transfer', 'other');

create type expense_category as enum (
  'products', 'equipment', 'hygiene', 'rent',
  'training', 'marketing', 'accounting', 'other'
);

-- Catalogue ---------------------------------------------------------------

create table service_categories (
  id         uuid primary key default gen_random_uuid(),
  label      text not null,
  emoji      text,
  position   int  not null default 0,
  created_at timestamptz not null default now()
);

create table services (
  id            uuid primary key default gen_random_uuid(),
  category_id   uuid not null references service_categories(id) on delete restrict,
  name          text not null,
  price_cents   int  not null check (price_cents >= 0),
  price_is_from boolean not null default false, -- affiche « dès 85 € »
  position      int  not null default 0,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

create index services_category_idx on services (category_id, position);

-- Prestations encaissées --------------------------------------------------
-- label et amount_cents sont des copies : saisie libre possible, et
-- l'historique reste juste si un tarif du catalogue change.

create table sales (
  id             uuid primary key default gen_random_uuid(),
  service_id     uuid references services(id) on delete set null,
  label          text not null,
  amount_cents   int  not null check (amount_cents >= 0),
  client_name    text,
  sold_on        date not null default current_date,
  payment_method payment_method not null default 'cash',
  created_at     timestamptz not null default now()
);

create index sales_sold_on_idx on sales (sold_on desc);

-- Dépenses ----------------------------------------------------------------

create table expenses (
  id           uuid primary key default gen_random_uuid(),
  label        text not null,
  amount_cents int  not null check (amount_cents >= 0),
  category     expense_category not null default 'other',
  spent_on     date not null default current_date,
  paid_by      text,
  created_at   timestamptz not null default now()
);

create index expenses_spent_on_idx on expenses (spent_on desc);

-- Bilan (mois / année) ----------------------------------------------------

create view monthly_summary with (security_invoker = true) as
with s as (
  select date_trunc('month', sold_on)::date as month,
         sum(amount_cents) as revenue_cents,
         count(*)          as sales_count
  from sales group by 1
), e as (
  select date_trunc('month', spent_on)::date as month,
         sum(amount_cents) as expenses_cents,
         count(*)          as expenses_count
  from expenses group by 1
)
select coalesce(s.month, e.month)                      as month,
       coalesce(s.revenue_cents, 0)                    as revenue_cents,
       coalesce(s.sales_count, 0)                      as sales_count,
       coalesce(e.expenses_cents, 0)                   as expenses_cents,
       coalesce(e.expenses_count, 0)                   as expenses_count,
       coalesce(s.revenue_cents, 0) - coalesce(e.expenses_cents, 0) as result_cents
from s full join e on s.month = e.month;

-- RLS : seul le compte admin a accès --------------------------------------
-- ⚠️ Remplacer l'email avant d'exécuter (ou créer le compte dans Supabase Auth
-- avec cet email).

create function is_admin() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'REMPLACER_PAR_EMAIL_DE_LA_CLIENTE'
$$;

alter table service_categories enable row level security;
alter table services           enable row level security;
alter table sales              enable row level security;
alter table expenses           enable row level security;

create policy "admin only" on service_categories for all to authenticated
  using (is_admin()) with check (is_admin());
create policy "admin only" on services for all to authenticated
  using (is_admin()) with check (is_admin());
create policy "admin only" on sales for all to authenticated
  using (is_admin()) with check (is_admin());
create policy "admin only" on expenses for all to authenticated
  using (is_admin()) with check (is_admin());
