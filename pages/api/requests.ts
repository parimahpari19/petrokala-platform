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

    // Types: data can be null according to Supabase client types.
    // Cast to an explicit expected shape and check safely before accessing.
    type InsertedRow = { id?: number }
    const rows = (data as InsertedRow[] | null) ?? null

    if (!rows || rows.length === 0) {
      // No row information returned — respond with ok and null id
      return res.status(200).json({ ok: true, id: null })
    }

    const insertedId = rows[0].id ?? null

    return res.status(200).json({ ok: true, id: insertedId })
  }catch(err:any){
    console.error('API requests error:', err)
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}
