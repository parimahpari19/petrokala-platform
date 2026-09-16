import Head from 'next/head'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Catalog(){
  const [products, setProducts] = useState<any[]>([])
  const [q, setQ] = useState('')
  const router = useRouter()

  useEffect(() => {
    // read query param q if present
    const query = (router.query.q as string) || ''
    setQ(query)
    fetchProducts(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.q])

  async function fetchProducts(query = ''){
    // basic behavior: if query present, try a simple ilike search across name/en/tags
    if (query && query.trim()){
      const qTrim = query.trim()
      // use OR across multiple columns
      const filter = `name.ilike.%${qTrim}%,en.ilike.%${qTrim}%,tags.ilike.%${qTrim}%`
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(filter)
        .limit(100)

      if (data) setProducts(data)
      return
    }

    // fallback: initial fetch
    const { data } = await supabase
      .from('products')
      .select('*')
      .limit(50)

    if (data) setProducts(data)
  }

  return (
    <div>
      <Head>
        <title>کاتالوگ — پتروکالا</title>
      </Head>

      <div className="container py-12">
        <h2 className="text-2xl font-bold">کاتالوگ تجهیزات</h2>
        <p className="text-gray-400">جست‌وجو و فیلتر قطعات بر اساس نام، استاندارد، متریال و مشخصات فنی.</p>

        <div className="mt-6 mb-4">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="جست‌وجو..." className="w-full p-3 rounded bg-[#081017] border border-gray-800" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map(p => (
            <ProductCard key={p.id} product={{...p, slug: p.slug || `product-${p.id}`}} />
          ))}
        </div>
      </div>
    </div>
  )
}
