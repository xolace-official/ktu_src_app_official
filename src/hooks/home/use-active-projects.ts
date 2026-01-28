import { useQuery } from '@tanstack/react-query';
import type { Project } from '@/types/home';

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Bus Shuttle Agenda',
    description: 'Implementing campus-wide shuttle service',
    progress: 50,
    gradientColors: ['#667eea', '#764ba2'],
  },
  {
    id: '2',
    title: 'Library Renovation',
    description: 'Modernizing library facilities',
    progress: 75,
    gradientColors: ['#f093fb', '#f5576c'],
  },
  {
    id: '3',
    title: 'Student Portal Upgrade',
    description: 'Improving online services',
    progress: 30,
    gradientColors: ['#4facfe', '#00f2fe'],
  },
  {
    id: '4',
    title: 'WiFi Expansion',
    description: 'Extending coverage across campus',
    progress: 90,
    gradientColors: ['#43e97b', '#38f9d7'],
  },
];

export function useActiveProjects(limit = 4) {
  return useQuery({
    queryKey: ['active-projects', limit],
    queryFn: async (): Promise<Project[]> => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockProjects.slice(0, limit);
    },
    staleTime: 5 * 60 * 1000,
  });
}
