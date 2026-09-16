import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Login(){
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: any){
    e.preventDefault()
    setError('')
    if(!email || !password){ setError('ایمیل و رمز عبور لازم است'); return }
    setLoading(true)
    try{
      const res = await supabase.auth.signInWithPassword({ email, password })
      if(res.error){ setError(res.error.message || 'خطا در ورود'); }
      else{
        // redirect
        router.push('/')
      }
    }catch(err:any){ setError(err.message || 'خطا در ورود') }
    finally{ setLoading(false) }
  }

  return (
    <div className="container py-12">
      <Head>
        <title>ورود — پتروکالا</title>
      </Head>

      <div className="max-w-md mx-auto bg-[#071018] p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">ورود</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">ایمیل</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 rounded bg-[#081017] border border-gray-800 mb-3" type="email" />
          <label className="block mb-2">رمز عبور</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 rounded bg-[#081017] border border-gray-800 mb-3" type="password" />

          {error && <div className="text-red-400 mb-3">{error}</div>}

          <div className="flex items-center gap-3">
            <button type="submit" className="px-4 py-2 bg-[#d08a55] rounded" disabled={loading}>{loading? 'در حال ورود...' : 'ورود'}</button>
            <button type="button" onClick={()=>router.push('/auth/register')} className="px-4 py-2 border rounded">ثبت نام</button>
          </div>
        </form>
      </div>
    </div>
  )
}
