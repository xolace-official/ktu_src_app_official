// lib/supabase/use-supabase.ts
import { useMemo } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '@/utils/supabase';
import { Database } from '@/types/types_db';

const client = getSupabaseBrowserClient<unknown>();

export function useSupabase<Db = Database>() {
  return useMemo(() => client as SupabaseClient<Db>, []);
}
