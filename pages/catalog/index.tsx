import Head from 'next/head'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'

const PAGE_SIZE = 20

export default function Catalog() {
  const router = useRouter()
  const queryParam = (router.query.q as string) || ''
  const [q, setQ] = useState(queryParam)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setQ(queryParam)
    setPage(0)
    fetchProducts(queryParam, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParam])

  async function fetchProducts(query = '', pageIndex = 0) {
    setLoading(true)
    setError('')
    try {
      const offset = pageIndex * PAGE_SIZE
      if (query && query.trim()) {
        // call RPC full-text search
        const { data, error } = await supabase.rpc('product_search', { q: query.trim(), limit_count: PAGE_SIZE, offset_count: offset })
        if (error) throw error
        setProducts((data as any[]) ?? [])
        setHasMore(((data as any[]) ?? []).length === PAGE_SIZE)
      } else {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .range(offset, offset + PAGE_SIZE - 1)
        if (error) throw error
        setProducts((data as any[]) ?? [])
        setHasMore(((data as any[]) ?? []).length === PAGE_SIZE)
      }
    } catch (err:any) {
      setError(err.message || 'خطا در دریافت نتایج')
    } finally {
      setLoading(false)
    }
  }

  function onSearchSubmit(e:any) {
    e?.preventDefault()
    const v = (q || '').trim()
    router.push(v ? `/catalog?q=${encodeURIComponent(v)}` : '/catalog')
  }

  return (
    <div>
      <Head><title>کاتالوگ — پتروکالا</title></Head>

      <div className="container py-12">
        <h2 className="text-2xl font-bold">کاتالوگ تجهیزات</h2>
        <p className="text-gray-400">جست‌وجو و فیلتر قطعات.</p>

        <form onSubmit={onSearchSubmit} className="mt-6 mb-4 flex gap-3">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="جست‌وجو..." className="flex-1 p-3 rounded bg-[#081017] border border-gray-800" />
          <button className="px-4 py-2 bg-[#d08a55] rounded">جست‌وجو</button>
        </form>

        {loading && <div className="py-8 text-center">در حال جست‌وجو...</div>}
        {error && <div className="py-8 text-red-400 text-center">{error}</div>}
        {!loading && !error && products.length === 0 && <div className="py-8 text-center text-gray-400">نتیجه‌ای یافت نشد — عبارت دیگری امتحان کنید.</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {products.map(p => <ProductCard key={p.id} product={{...p, slug: p.slug || `product-${p.id}`}} />)}
        </div>

        <div className="flex items-center justify-between mt-6">
          <button disabled={page===0 || loading} onClick={()=>{ const np = page-1; setPage(np); fetchProducts(q, np); }} className="px-3 py-2 border rounded">قبلی</button>
          <div>{page+1}</div>
          <button disabled={!hasMore || loading} onClick={()=>{ const np = page+1; setPage(np); fetchProducts(q, np); }} className="px-3 py-2 border rounded">بعدی</button>
        </div>
      </div>
    </div>
  )
}
