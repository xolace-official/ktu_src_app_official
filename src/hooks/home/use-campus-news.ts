import type { NewsArticle } from '@/types/home';
import { useQuery } from '@tanstack/react-query';

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'New Research Center Opens on Campus',
    description:
      'The state-of-the-art research facility will provide students and faculty with advanced equipment for scientific research and innovation projects.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'University Ranks Top 10 in National Survey',
    description:
      'Our institution has been recognized for excellence in teaching, research output, and student satisfaction in the latest national university rankings.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Student Union Elections Coming Up',
    description:
      'Nominations are now open for the upcoming student union elections. All students are encouraged to participate in the democratic process.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function useCampusNews(limit = 3) {
  const safeLimit = Math.max(0, Math.floor(limit));
  return useQuery({
    queryKey: ['campus-news', safeLimit],
    queryFn: async (): Promise<NewsArticle[]> => {
      await new Promise((resolve) => setTimeout(resolve, 350));
      return mockNews.slice(0, safeLimit);
    },
    staleTime: 5 * 60 * 1000,
  });
}
