import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';

const { supabaseUrl, supabaseAnonKey } = z
  .object({
    supabaseUrl: z.string(),
    supabaseAnonKey: z.string(),
  })
  .parse({
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_API_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  });

let client: SupabaseClient | null = null;

export function getSupabaseBrowserClient<Db = unknown>(): SupabaseClient<Db> {
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }
  return client as SupabaseClient<Db>;
}
