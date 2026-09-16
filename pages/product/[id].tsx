import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Head from 'next/head'

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState<any|null>(null)
  const [supplier, setSupplier] = useState<any|null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // request form state
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [reqLoading, setReqLoading] = useState(false)
  const [reqSuccess, setReqSuccess] = useState('')
  const [reqError, setReqError] = useState('')

  useEffect(() => {
    if (!id) return
    fetchProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function fetchProduct() {
    setLoading(true)
    setError('')
    try {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
      if (error || !data) {
        setError('محصول یافت نشد')
        setProduct(null)
      } else {
        setProduct(data)
        if (data.supplier_id) {
          const { data: sup } = await supabase.from('suppliers').select('*').eq('id', data.supplier_id).single()
          setSupplier(sup ?? null)
        }
      }
    } catch (err:any) {
      setError(err.message || 'خطا در بارگذاری محصول')
    } finally {
      setLoading(false)
    }
  }

  async function submitRequest(e:any) {
    e.preventDefault()
    setReqError(''); setReqSuccess('')
    if (!name || !phone) { setReqError('نام و شماره تماس الزامی است'); return }
    setReqLoading(true)
    try {
      // get session/access token to pass to API for server-side user lookup
      const { data: sessionData } = await supabase.auth.getSession()
      const accessToken = sessionData?.session?.access_token

      const body = { name, phone, part: product?.name || product?.title || '', message, product_id: product?.id }
      const headers: any = { 'Content-Type': 'application/json' }
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`

      const res = await fetch('/api/requests', { method: 'POST', headers, body: JSON.stringify(body) })
      const j = await res.json()
      if (!res.ok) throw new Error(j?.error || 'خطا در ارسال درخواست')
      setReqSuccess('درخواست شما با موفقیت ثبت شد')
      setName(''); setPhone(''); setMessage('')
    } catch (err:any) {
      setReqError(err.message || 'خطا')
    } finally {
      setReqLoading(false)
    }
  }

  if (loading) return <div className="container py-12">در حال بارگذاری...</div>
  if (error) return <div className="container py-12 text-red-400">{error}</div>
  if (!product) return null

  return (
    <div>
      <Head><title>{product.title || product.name} — پتروکالا</title></Head>
      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold">{product.title || product.name}</h1>
            <div className="text-gray-400 mt-2">کد فنی: {product.sku || '-'}</div>
            <div className="text-gray-400 mt-1">سازنده: {product.en || '-'}</div>
            <div className="mt-4 text-gray-200">{product.description}</div>
            <div className="mt-4 text-sm text-gray-400">تگ‌ها: {product.tags}</div>
          </div>

          <aside className="bg-[#071018] p-4 rounded">
            <h3 className="font-semibold mb-2">درخواست قیمت</h3>
            {reqError && <div className="text-red-400 mb-2">{reqError}</div>}
            {reqSuccess && <div className="text-green-400 mb-2">{reqSuccess}</div>}
            <form onSubmit={submitRequest} className="flex flex-col gap-2">
              <input value={name} onChange={e=>setName(e.target.value)} className="p-2 bg-[#081017] rounded border border-gray-800" placeholder="نام / شرکت" />
              <input value={phone} onChange={e=>setPhone(e.target.value)} className="p-2 bg-[#081017] rounded border border-gray-800" placeholder="شماره تماس" />
              <textarea value={message} onChange={e=>setMessage(e.target.value)} className="p-2 bg-[#081017] rounded border border-gray-800" placeholder="توضیحات (اختیاری)" />
              <button type="submit" disabled={reqLoading} className="px-3 py-2 bg-[#d08a55] rounded">{reqLoading ? 'در حال ارسال...' : 'ارسال درخواست'}</button>
            </form>
            {!supabase.auth.getUser && <div className="text-xs text-gray-500 mt-2">برای پیگیری بهتر لطفاً وارد شوید.</div>}
            {supplier && <div className="mt-4 text-sm"><strong>تأمین‌کننده:</strong> {supplier.company_name}</div>}
          </aside>
        </div>
      </div>
    </div>
  )
}
