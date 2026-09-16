# Petrokala Platform

This repository is the starter for the Petrokala marketplace: Next.js frontend (TypeScript) + Supabase (Postgres) backend + Algolia search.

I pushed an initial scaffold: frontend pages, components, Supabase schema migration and Algolia client hooks. This is a working base to continue development on the MVP.

What I pushed
- Next.js (Pages router) scaffold and Tailwind CSS
- Header, Footer, ProductCard components
- Catalog listing and product page
- Supabase client and initial SQL schema (supabase/migrations/initial.sql)
- Algolia helper (lib/algolia.ts) — requires keys

Important: No secrets are committed. You must create Supabase and Algolia accounts and provide keys as environment variables.

Setup — local (developer)
1. Install dependencies:
   npm install

2. Create a .env.local file in the project root with these variables (do NOT commit):

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # server-side only
NEXT_PUBLIC_ALGOLIA_APP_ID=your-algolia-app-id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your-algolia-search-key
ALGOLIA_ADMIN_KEY=your-algolia-admin-key
NEXT_PUBLIC_ALGOLIA_INDEX=petrokala_products

3. Run dev:
   npm run dev

Supabase setup (steps)
1. Create a Supabase project at https://app.supabase.com.
2. From the SQL Editor, run the SQL in `supabase/migrations/initial.sql` to create tables and indexes.
3. In the Supabase Dashboard > Settings > API, copy the Project URL and anon/public key.
4. Create a Service Role key (Settings > API) and store it securely — do NOT commit it.
5. Seed initial products via the SQL editor or use the REST API. Example insert SQL is provided below.

Algolia setup (steps)
1. Create an Algolia account (https://www.algolia.com/) and create an index named `petrokala_products`.
2. In Algolia dashboard, get your Application ID and Admin/Search API keys.
3. Add records (products) — you can push them from a server-side script using ALGOLIA_ADMIN_KEY.

Vercel deployment
1. Create a Vercel account and connect GitHub repository `parimahpari19/petrokala-platform`.
2. In the project settings, add the environment variables listed above (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_ALGOLIA_APP_ID, NEXT_PUBLIC_ALGOLIA_SEARCH_KEY, ALGOLIA_ADMIN_KEY, NEXT_PUBLIC_ALGOLIA_INDEX).
3. Deploy — Vercel will build and publish the site. Once deployed, configure a custom domain through Vercel when you're ready.

Domain purchase
- I can prepare DNS records and steps for connecting a custom domain to Vercel. Purchasing requires your authorization/payment — I will stop and provide exact instructions when you want to buy a domain.

Next steps I'll take after you provide environment variables and Supabase/Algolia access (or add them to Vercel):
- Implement full auth flows (buyer, supplier, admin) using Supabase Auth.
- Seed product data and index to Algolia.
- Implement supplier dashboard (CRUD), buyer flows (requests & quotes), messaging, and admin panel.
- Add SEO pages (sitemap.xml generation, robots.txt, JSON-LD enhancements).

If you want me to continue now, add the required env vars to the GitHub repository secrets and/or Vercel and tell me when Supabase is ready so I can run migrations and seed data remotely.
