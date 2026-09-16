-- Add requests table for storing buyer requests
create table if not exists requests (
  id serial primary key,
  name text,
  phone text,
  part text,
  message text,
  created_at timestamptz default now()
);
