import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, phone, part, message, product_id } = req.body
  if (!name || !phone || !part) return res.status(400).json({ error: 'Missing required fields' })

  // try to get user from Authorization header if provided
  let user_id: string | null = null
  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null
    if (token) {
      // supabaseAdmin.auth.getUser accepts { access_token } in some versions; using getUser(token) which returns { data, error }
      const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token as string) as any
      if (!userErr && userData?.user?.id) {
        user_id = userData.user.id
      }
    }
  } catch (e) {
    console.warn('Could not validate user token', e)
  }

  try{
    const payload: any = { name, phone, part, message, created_at: new Date().toISOString() }
    if (product_id) payload.product_id = product_id
    if (user_id) payload.user_id = user_id

    const { data, error } = await supabaseAdmin.from('requests').insert([payload]).select('id')

    if (error) {
      console.error('Supabase insert error:', error)
      return res.status(500).json({ error: error.message })
    }

    if (!data || data.length === 0) {
      return res.status(200).json({ ok: true, id: null })
    }

    const insertedId = (data[0] as { id?: number }).id ?? null

    return res.status(200).json({ ok: true, id: insertedId })
  }catch(err:any){
    console.error('API requests error:', err)
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}
