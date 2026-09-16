import Head from 'next/head'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import { supabase } from '../../lib/supabaseClient'

export default function Catalog(){
  const [products, setProducts] = useState<any[]>([])
  const [q, setQ] = useState('')

  useEffect(() => {
    // initial fetch from Supabase (indexed table)
    fetchProducts()
  }, [])

  async function fetchProducts(){
    const { data, error } = await supabase
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
