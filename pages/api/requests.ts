import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, phone, part, message } = req.body
  if (!name || !phone || !part) return res.status(400).json({ error: 'Missing required fields' })

  try{
    const payload = { name, phone, part, message, created_at: new Date().toISOString() }

    // Use .select('id') so Supabase returns the inserted id (and keep types clear)
    const { data, error } = await supabaseAdmin.from('requests').insert([payload]).select('id')

    if (error) {
      console.error('Supabase insert error:', error)
      return res.status(500).json({ error: error.message })
    }

    // Safely handle the case where data may be null
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
