import { useQuery } from '@tanstack/react-query';

import { useSupabase } from '@/lib/supabase/use-supabase';

const queryKey = ['supabase', 'user'];

export function useUser() {
  const client = useSupabase();

  const queryFn = async () => {
    const { data, error } = await client.auth.getClaims();
    const user = data?.claims;

    console.log('payload : ', user);

    // this is most likely a session error or the user is not logged in
    if (error || !user) {
      return null;
    }

    if (user) {
      return user;
    }

    return Promise.reject(new Error('Unexpected result format'));
  };

  return useQuery({
    queryFn,
    queryKey,
  });
}
