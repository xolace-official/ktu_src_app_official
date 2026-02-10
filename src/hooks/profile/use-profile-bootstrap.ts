import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useSupabase } from '@/lib/supabase/use-supabase';
import { useAppStore } from '@/store/store';

export function useProfileBootstrap() {
  const client = useSupabase();
  const userId = useAppStore((s) => s.userId);
  const setProfileSummary = useAppStore((s) => s.setProfileSummary);

  const query = useQuery({
    queryKey: ['profile', 'summary', userId],
    queryFn: async () => {
      const { data, error } = await client
        .from('profiles')
        .select('id, username, full_name, avatar_url, completed')
        .eq('id', userId!)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  // Sync to Zustand for fast UI gating (profileSummary.completed)
  useEffect(() => {
    if (query.data) {
      setProfileSummary(query.data);
    }
  }, [query.data, setProfileSummary]);

  return query;
}
