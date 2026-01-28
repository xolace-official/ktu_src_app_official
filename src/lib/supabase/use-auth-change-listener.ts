import { useEffect } from 'react';

import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

import { useQueryClient } from '@tanstack/react-query';

import { useSupabase } from './use-supabase';

/**
 * @name useAuthChangeListener
 * @param privatePathPrefixes - A list of private path prefixes
 * @param appHomePath - The path to redirect to when the user is signed out
 * @param onEvent - Callback function to be called when an auth event occurs
 */
export function useAuthChangeListener({
  appHomePath,
  onEvent,
}: {
  appHomePath: string;
  onEvent?: (event: AuthChangeEvent, user: Session | null) => void;
}) {
  const client = useSupabase();
  const queryClient = useQueryClient();

  useEffect(() => {
    // keep this running for the whole session unless the component was unmounted
    const listener = client.auth.onAuthStateChange((event, user) => {
      if (onEvent) {
        onEvent(event, user);
      }
      console.log('listener ', event);
      console.log('listener session ', user);

      if (event === 'SIGNED_IN') {
        console.log('SIGNED_IN – refreshing user...');
        queryClient.invalidateQueries({ queryKey: ['supabase', 'user'] });
      }

      // revalidate user session when user signs in or out
      if (event === 'SIGNED_OUT') {
        console.log('SIGNED_OUT');
        queryClient.setQueryData(['supabase', 'user'], null);
      }
    });

    // destroy listener on un-mounts
    return () => listener.data.subscription.unsubscribe();
  }, [client.auth, appHomePath, onEvent, queryClient]);
}
