import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
/** null si faltan las variables: la web pública funciona igual, solo el panel avisa. */
export const supabase = url && key ? createClient(url, key) : null
