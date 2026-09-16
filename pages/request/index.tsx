import Head from 'next/head'
import { useState } from 'react'

export default function RequestPage(){
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [part, setPart] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e:any){
    e.preventDefault()
    setError('')
    if(!name || !phone || !part){ setError('نام، شماره تماس و نام قطعه لازم است'); return }
    setLoading(true)
    try{
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, part, message: msg })
      })
      const j = await res.json()
      if(!res.ok) throw new Error(j?.error || 'خطا در ثبت درخواست')
      setSuccess('درخواست شما ثبت شد')
      setName(''); setPhone(''); setPart(''); setMsg('')
    }catch(err:any){ setError(err.message || 'خطا') }
    finally{ setLoading(false) }
  }

  return (
    <div className="container py-12">
      <Head><title>ثبت درخواست — پتروکالا</title></Head>
      <h1 className="text-2xl font-bold mb-4">ثبت درخواست تأمین</h1>

      <div className="max-w-lg bg-[#071018] p-6 rounded">
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">نام / شرکت</label>
          <input className="w-full p-3 rounded bg-[#081017] border border-gray-800 mb-3" value={name} onChange={e=>setName(e.target.value)} />

          <label className="block mb-2">شماره تماس</label>
          <input className="w-full p-3 rounded bg-[#081017] border border-gray-800 mb-3" value={phone} onChange={e=>setPhone(e.target.value)} />

          <label className="block mb-2">نام قطعه</label>
          <input className="w-full p-3 rounded bg-[#081017] border border-gray-800 mb-3" value={part} onChange={e=>setPart(e.target.value)} />

          <label className="block mb-2">توضیحات</label>
          <textarea className="w-full p-3 rounded bg-[#081017] border border-gray-800 mb-3" value={msg} onChange={e=>setMsg(e.target.value)} />

          {error && <div className="text-red-400 mb-3">{error}</div>}
          {success && <div className="text-green-400 mb-3">{success}</div>}

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-[#d08a55] rounded" disabled={loading}>{loading? 'در حال ارسال...' : 'ارسال درخواست'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
