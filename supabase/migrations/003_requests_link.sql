-- Add product_id and user_id to requests for linking requests to products and users (non-destructive)
alter table if exists requests
  add column if not exists product_id integer references products(id),
  add column if not exists user_id uuid;

-- Add indexes to speed lookups (non-blocking)
create index if not exists idx_requests_user_id on requests (user_id);
create index if not exists idx_requests_product_id on requests (product_id);
