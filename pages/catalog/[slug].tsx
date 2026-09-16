import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function ProductPage(){
  const router = useRouter()
  const { slug } = router.query
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    if (!slug) return
    fetchProduct()
  }, [slug])

  async function fetchProduct(){
    // try find by slug then id
    const { data } = await supabase.from('products').select('*').or(`slug.eq.${slug},id.eq.${slug}`)
    if (data && data.length) setProduct(data[0])
  }

  if (!product) return <div className="container py-12">در حال بارگذاری...</div>

  return (
    <div>
      <Head>
        <title>{product.name} — پتروکالا</title>
        <meta name="description" content={`${product.name} — ${product.materials} — ${product.sizes}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "description": product.description || '',
          "sku": product.sku || `PK-${String(product.id).padStart(3,'0')}`
        })}} />
      </Head>

      <div className="container py-12">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="text-gray-400 mt-2">{product.en} · {product.cat}</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-[#071018] p-4 rounded">Image / gallery</div>
          <div className="p-4 bg-[#071018] rounded">
            <div><strong>متریال:</strong> {product.materials}</div>
            <div><strong>سایز:</strong> {product.sizes}</div>
            <div><strong>استاندارد:</strong> {product.standards}</div>

            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 bg-[#d08a55] rounded" type="button">ارسال درخواست</button>
              <button className="px-4 py-2 border rounded" type="button">تماس با تأمین‌کننده</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
