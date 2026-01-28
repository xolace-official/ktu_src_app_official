import { useQuery } from '@tanstack/react-query';
import type { HomeEvent } from '@/types/home';

const mockEvents: HomeEvent[] = [
  {
    id: '1',
    title: 'Tech Summit 2025',
    startsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Great Hall, Main Campus',
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Career Fair - Engineering Week',
    startsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Engineering Block A',
    category: 'Career',
  },
  {
    id: '3',
    title: 'Inter-Faculty Sports Competition',
    startsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'University Stadium',
    category: 'Sports',
  },
];

export function useUpcomingEvents(limit = 3) {
  return useQuery({
    queryKey: ['upcoming-events', limit],
    queryFn: async (): Promise<HomeEvent[]> => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return mockEvents.slice(0, limit);
    },
    staleTime: 5 * 60 * 1000,
  });
}
