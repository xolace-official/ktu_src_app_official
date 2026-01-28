import { useQuery } from '@tanstack/react-query';
import type { Representative } from '@/types/home';

const mockRepresentatives: Representative[] = [
  {
    id: '1',
    name: 'STACY BENSON',
    position: 'S.R.C President',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'JAMES WILSON',
    position: 'Vice President',
    description:
      'Dedicated to serving the student community with integrity and passion. Working together to create positive change and meaningful experiences for all students.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'SARAH JOHNSON',
    position: 'General Secretary',
    description:
      'Committed to transparency and effective communication. Ensuring that every student voice is heard and represented in our decision-making processes.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'MICHAEL CHEN',
    position: 'Financial Secretary',
    description:
      'Managing student funds with accountability and precision. Dedicated to ensuring financial transparency and responsible resource allocation.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    name: 'EMMA DAVIS',
    position: 'Organizing Secretary',
    description:
      'Bringing creativity and organization to every student event. Passionate about creating memorable experiences that bring our campus community together.',
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
  },
];

export function useRepresentatives() {
  return useQuery({
    queryKey: ['representatives'],
    queryFn: async (): Promise<Representative[]> => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockRepresentatives;
    },
    staleTime: 10 * 60 * 1000,
  });
}
