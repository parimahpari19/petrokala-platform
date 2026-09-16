import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Suppliers(){
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{ fetchSuppliers() }, [])

  async function fetchSuppliers(){
    setLoading(true)
    const { data, error } = await supabase.from('suppliers').select('*').limit(50)
    if(data) setSuppliers(data)
    setLoading(false)
  }

  return (
    <div className="container py-12">
      <Head><title>تأمین‌کنندگان — پتروکالا</title></Head>
      <h1 className="text-2xl font-bold mb-4">شبکه تأمین‌کنندگان</h1>
      {loading && <div>در حال بارگذاری...</div>}
      {!loading && suppliers.length===0 && <div className="text-gray-400">تأمین‌کننده‌ای ثبت نشده است.</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {suppliers.map(s => (
          <div key={s.id} className="p-4 bg-[#071018] rounded border border-gray-800">
            <h3 className="font-semibold">{s.company_name || s.id}</h3>
            <div className="text-gray-400 mt-2">{s.created_at}</div>
            <div className="mt-4">
              <Link href="#" className="px-3 py-1 border rounded">نمایش</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
