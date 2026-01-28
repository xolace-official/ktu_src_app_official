import { useMemo } from 'react';
import { useAppStore } from '@/store/store';
import type { UserGreeting } from '@/types/home';

export function useUserGreeting(): UserGreeting {
  const profileSummary = useAppStore((s) => s.profileSummary);

  return useMemo(() => {
    const getTimeGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 17) return 'Good afternoon';
      return 'Good evening';
    };

    const firstName = profileSummary.full_name?.split(' ')[0] ?? 'Student';
    const greeting = getTimeGreeting();

    return {
      greeting,
      name: firstName,
      fullGreeting: `${greeting}, ${firstName}`,
      subtitle: "Here's what's happening on campus today",
    };
  }, [profileSummary.full_name]);
}
