import { useEffect } from 'react';

import { AppState } from 'react-native';

import { useSupabase } from './use-supabase';

export function useRegisterAutoRefresh() {
  const supabase = useSupabase();

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') supabase.auth.startAutoRefresh();
      else supabase.auth.stopAutoRefresh();
    });
    return () => {
      sub?.remove?.();
    };
  }, [supabase]);
}
