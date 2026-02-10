import { useQuery } from '@tanstack/react-query';

import { useSupabase } from '@/lib/supabase/use-supabase';

const queryKey = ['supabase', 'user'];

export function useUser() {
  const client = useSupabase();

  const queryFn = async () => {
    const { data, error } = await client.auth.getClaims();
    const user = data?.claims;

    if (error || !user) {
      return null;
    }

    return user;
  };

  return useQuery({
    queryFn,
    queryKey,
  });
}
