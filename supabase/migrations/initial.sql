-- Supabase initial schema for Petrokala

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  full_name text,
  role text default 'buyer', -- buyer | supplier | admin
  company text,
  phone text,
  created_at timestamptz default now()
);

create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  company_name text,
  verified boolean default false,
  created_at timestamptz default now()
);

create table if not exists products (
  id serial primary key,
  supplier_id uuid references suppliers(id),
  title text,
  name text,
  en text,
  cat text,
  slug text,
  sku text,
  description text,
  sizes text,
  standards text,
  materials text,
  tags text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists products_ft_idx on products using gin ((to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(en,'') || ' ' || coalesce(tags,''))));
