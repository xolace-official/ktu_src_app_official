import { useUser } from './use-user';

export function useAuthSession() {
  const user = useUser();
  return {
    isLoading: user.isLoading,
    isAuthenticated: !!user.data,
    user: user.data, // claims (or null)
  };
}
