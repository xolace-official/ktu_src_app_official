export interface TeamMember {
  id: string;
  name: string;
  position: string;
  initials: string;
  imageUrl?: string;
  gradientColors?: [string, string];
}

const BASE = `${process.env.EXPO_PUBLIC_SUPABASE_API_URL}/storage/v1/object/public/developer-credit`;

export const techTeam: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Emmanuel Acquah',
    position: 'Chairman',
    initials: 'EA',
    gradientColors: ['#3c87f7', '#6366f1'],
    imageUrl: `${BASE}/kwame.jpeg`,
  },
  {
    id: 'member-2',
    name: 'David',
    position: 'Secretary / UI/UX',
    initials: 'D',
    gradientColors: ['#f43f5e', '#ec4899'],
    imageUrl: `${BASE}/major.png`,
  },
  {
    id: 'member-3',
    name: 'Nathaniel Adama',
    position: 'Lead Developer',
    initials: 'NA',
    gradientColors: ['#10b981', '#06b6d4'],
    imageUrl: `${BASE}/Nathan.JPG`,
  },
  {
    id: 'member-4',
    name: 'Andrews Beniako',
    position: 'UI/UX designer',
    initials: 'AB',
    gradientColors: ['#f59e0b', '#ef4444'],
    imageUrl: `${BASE}/kobby.jpg`,
  },
  {
    id: 'member-5',
    name: 'Prosper',
    position: 'Mobile Developer',
    initials: 'P',
    gradientColors: ['#f59e0b', '#ef4444'],
    imageUrl: `${BASE}/prosper.jpg`,
  },
  {
    id: 'member-6',
    name: 'Emmanuel Somuah',
    position: 'Mobile Developer',
    initials: 'ES',
    gradientColors: ['#f59e0b', '#ef4444'],
    imageUrl: `${BASE}/emmanuel.jpg`,
  },
];
