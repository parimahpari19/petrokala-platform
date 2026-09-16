-- Create/ensure a GIN full-text index that covers title, name, en, sku, tags
-- We create a new index name (products_ft_idx_v2) to avoid dropping/replacing an existing index unexpectedly.
create index if not exists products_ft_idx_v2
  on products using gin (
    to_tsvector('simple',
      coalesce(title, '') || ' ' ||
      coalesce(name, '')  || ' ' ||
      coalesce(en, '')    || ' ' ||
      coalesce(sku, '')   || ' ' ||
      coalesce(tags, '')
    )
  );

-- Product full-text search RPC (uses title, name, en, sku, tags)
create or replace function product_search(q text, limit_count int, offset_count int)
returns table(
  id int,
  supplier_id uuid,
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
  created_at timestamptz,
  updated_at timestamptz,
  rank double precision
) as $$
  select
    p.id,
    p.supplier_id,
    p.title,
    p.name,
    p.en,
    p.cat,
    p.slug,
    p.sku,
    p.description,
    p.sizes,
    p.standards,
    p.materials,
    p.tags,
    p.created_at,
    p.updated_at,
    ts_rank_cd(
      to_tsvector('simple',
        coalesce(p.title,'') || ' ' ||
        coalesce(p.name,'')  || ' ' ||
        coalesce(p.en,'')    || ' ' ||
        coalesce(p.sku,'')   || ' ' ||
        coalesce(p.tags,'')
      ),
      plainto_tsquery('simple', q)
    ) as rank
  from products p
  where to_tsvector('simple',
        coalesce(p.title,'') || ' ' ||
        coalesce(p.name,'')  || ' ' ||
        coalesce(p.en,'')    || ' ' ||
        coalesce(p.sku,'')   || ' ' ||
        coalesce(p.tags,'')
      )
    @@ plainto_tsquery('simple', q)
  order by rank desc
  limit limit_count offset offset_count;
$$ language sql stable;
