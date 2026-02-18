export interface TeamMember {
  id: string;
  name: string;
  position: string;
  initials: string;
  imageUrl?: string;
  gradientColors?: [string, string];
}

export const techTeam: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Emmanuel Acquah',
    position: 'Chairman',
    initials: 'TM',
    gradientColors: ['#3c87f7', '#6366f1'],
    imageUrl: "http://127.0.0.1:54321/storage/v1/object/public/developer-credit/kwame.jpeg"
  },
  {
    id: 'member-2',
    name: 'David',
    position: 'Secretary / UI/UX',
    initials: 'TM',
    gradientColors: ['#f43f5e', '#ec4899'],
    imageUrl: "http://127.0.0.1:54321/storage/v1/object/public/developer-credit/major.png"
  },
  {
    id: 'member-3',
    name: 'Nathaniel Adama',
    position: 'Lead Developer',
    initials: 'TM',
    gradientColors: ['#10b981', '#06b6d4'],
    imageUrl: "http://127.0.0.1:54321/storage/v1/object/public/developer-credit/Nathan.JPG"
  },
  {
    id: 'member-4',
    name: 'Andrews Beniako',
    position: 'UI/UX designer',
    initials: 'TM',
    gradientColors: ['#f59e0b', '#ef4444'],
    imageUrl: "http://127.0.0.1:54321/storage/v1/object/public/developer-credit/kobby.jpg"
  },
   {
    id: 'member-5',
    name: 'Prosper',
    position: 'Mobile Developer',
    initials: 'TM',
    gradientColors: ['#f59e0b', '#ef4444'],
    imageUrl: "http://127.0.0.1:54321/storage/v1/object/public/developer-credit/prosper.jpg"
  },
   {
    id: 'member-6',
    name: 'Emmanuel Somuah',
    position: 'Mobile Developer',
    initials: 'TM',
    gradientColors: ['#f59e0b', '#ef4444'],
    imageUrl: "http://127.0.0.1:54321/storage/v1/object/public/developer-credit/prosper.jpg"
  },
];
