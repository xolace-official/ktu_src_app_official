import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useAppStore } from '@/store/store';

import { useSupabase } from './use-supabase';

/**
 * Single auth listener that:
 * 1. Syncs userId/email to Zustand for fast UI access
 * 2. Invalidates/clears the React Query user cache on sign-in/out
 *
 * Replaces both `useAuthSyncStore` and `useAuthChangeListener`.
 */
export function useAuthListener() {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const setAuth = useAppStore((s) => s.setAuth);
  const resetAuth = useAppStore((s) => s.resetAuth);

  useEffect(() => {
    const { data: sub } = client.auth.onAuthStateChange((event, session) => {
      const user = session?.user ?? null;

      // Sync derived fields to Zustand
      if (user) {
        setAuth({ userId: user.id, email: user.email ?? null });
      } else {
        resetAuth();
      }

      // Keep React Query in sync
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        queryClient.invalidateQueries({ queryKey: ['supabase', 'user'] });
      }

      if (event === 'SIGNED_OUT') {
        queryClient.setQueryData(['supabase', 'user'], null);
      }
    });

    // Initial pull from JWT claims (no network request)
    client.auth.getClaims().then(({ data }) => {
      const claims = data?.claims ?? null;
      if (claims) {
        setAuth({ userId: claims.sub, email: claims.email ?? null });
      } else {
        resetAuth();
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [client, queryClient, setAuth, resetAuth]);
}
