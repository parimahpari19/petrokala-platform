import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Register(){
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e:any){
    e.preventDefault()
    setError('')
    if(!email || !password || !name){ setError('نام، ایمیل و رمز الزامی است'); return }
    setLoading(true)
    try{
      const res = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name }
        }
      })
      if((res as any).error){ setError((res as any).error.message || 'خطا در ثبت‌نام') }
      else{
        // redirect to homepage or dashboard
        router.push('/')
      }
    }catch(err:any){ setError(err.message || 'خطا در ثبت‌‌نام') }
    finally{ setLoading(false) }
  }

  return (
    <div className="container py-12">
      <Head>
        <title>ثبت‌نام — پتروکالا</title>
      </Head>

      <div className="max-w-md mx-auto bg-[#071018] p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">ثبت‌نام</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">نام / شرکت</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-3 rounded bg-[#081017] border border-gray-800 mb-3" />

          <label className="block mb-2">ایمیل</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 rounded bg-[#081017] border border-gray-800 mb-3" type="email" />

          <label className="block mb-2">رمز عبور</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 rounded bg-[#081017] border border-gray-800 mb-3" type="password" />

          {error && <div className="text-red-400 mb-3">{error}</div>}

          <div className="flex items-center gap-3">
            <button type="submit" className="px-4 py-2 bg-[#d08a55] rounded" disabled={loading}>{loading? 'در حال ثبت...' : 'ثبت‌نام'}</button>
            <button type="button" onClick={()=>router.push('/auth/login')} className="px-4 py-2 border rounded">ورود</button>
          </div>
        </form>
      </div>
    </div>
  )
}
