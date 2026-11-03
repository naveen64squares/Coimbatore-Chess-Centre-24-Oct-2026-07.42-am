import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  const url = supabaseUrl as string;
  const key = supabaseAnonKey as string;

  if (!/^https?:\/\/.+/.test(url)) {
    console.error('[Supabase] Invalid URL format:', JSON.stringify(url));
  } else if (key.length < 20) {
    console.error('[Supabase] Anon key looks truncated (length ' + key.length + ').');
  } else {
    client = createClient(url, key, {
      auth: { persistSession: false },
    });
  }
}

export const supabase: SupabaseClient | null = client;
