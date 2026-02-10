import { useEffect } from 'react';

import { useAppStore } from '@/store/store';

import { useSupabase } from '@/lib/supabase/use-supabase';

// path to your state package

export function useAuthSyncStore() {
  const supabase = useSupabase();
  const setAuth = useAppStore((s) => s.setAuth);
  const resetAuth = useAppStore((s) => s.resetAuth);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      console.log('session: ', user);
      if (user) {
        // Extract minimal, non-sensitive derived fields
        setAuth({ userId: user.id, email: user.email ?? null });
      } else {
        resetAuth();
      }
    });

    // also do an initial pull on mount
    supabase.auth.getClaims().then(({ data }) => {
      const user = data?.claims ?? null;
      if (user) setAuth({ userId: user.sub, email: user.email ?? null });
      else resetAuth();
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [resetAuth, setAuth, supabase]);
}
