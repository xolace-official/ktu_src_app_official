export interface TeamMemberSocials {
  linkedin?: string;
  x?: string;
  email?: string;
  github?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  initials: string;
  imageUrl?: string;
  gradientColors?: [string, string];
  socials?: TeamMemberSocials;
  bio?: string;
}

const BASE = `${process.env.EXPO_PUBLIC_SUPABASE_API_URL}/storage/v1/object/public/developer-credit`;

export const techTeam: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Emmanuel Acquah',
    position: 'Chairman / Frontend Dev',
    initials: 'EA',
    gradientColors: ['#3c87f7', '#6366f1'],
    imageUrl: `${BASE}/kwame.jpeg`,
    socials: {
      linkedin: 'https://linkedin.com/in/',
      x: 'https://x.com/',
    },
  },
  {
    id: 'member-2',
    name: 'H.E. David Ofosu',
    position: 'Secretary / UI/UX Designer',
    initials: 'D',
    gradientColors: ['#f43f5e', '#ec4899'],
    imageUrl: `${BASE}/major.png`,
    socials: {
      linkedin: 'https://linkedin.com/in/',
      x: 'https://x.com/',
    },
  },
  {
    id: 'member-3',
    name: 'Nathaniel Edem Adama',
    position: 'Lead Developer',
    initials: 'NA',
    gradientColors: ['#10b981', '#06b6d4'],
    imageUrl: `${BASE}/Nathan-mini.JPG`,
    socials: {
      linkedin: 'https://linkedin.com/in/',
      github: 'https://github.com/',
      x: 'https://x.com/',
      email: 'nathaniel@example.com',
    },
  },
  {
    id: 'member-4',
    name: 'Andrew Nana Beniako',
    position: 'UI/UX designer',
    initials: 'AB',
    gradientColors: ['#f59e0b', '#ef4444'],
    imageUrl: `${BASE}/kobby-mini.jpg`,
    socials: {
      linkedin: 'https://linkedin.com/in/',
    },
  },
  {
    id: 'member-5',
    name: 'Agbesi Prosper Kwesi',
    position: 'QA / Mobile Developer',
    initials: 'P',
    gradientColors: ['#f59e0b', '#ef4444'],
    imageUrl: `${BASE}/prosper.jpg`,
    socials: {
      linkedin: 'https://linkedin.com/in/',
      x: 'https://x.com/',
    },
  },
  // {
  //   id: 'member-6',
  //   name: 'Emmanuel Somuah',
  //   position: 'Mobile Developer',
  //   initials: 'ES',
  //   gradientColors: ['#f59e0b', '#ef4444'],
  //   imageUrl: `${BASE}/emmanuel.jpg`,
  // },
];
