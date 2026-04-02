export interface TeamMemberSocials {
  linkedin?: string;
  x?: string;
  email?: string;
  github?: string;
  instagram?: string;
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
      linkedin: 'https://www.linkedin.com/in/emmanuel-acquah-2a46b8268',
      instagram: 'https://www.instagram.com/offi_cialemmanuel99',
      email: 'emmanuelacquah398@gmail.com'
    },
    bio: 'Co-Founder & COO of Xolace Inc. Software Developer HTML | CSS | Tailwind | JavaScript | nodeJs | nextJs | Java | Supabase. Former Google Development Student Club Member 2022-2024, President COMPSSA KTU 2023/2024 , Vice President Faculty of Applied Science 2023/2024, Chairman Tech & Innovation Committee SRC, KTU 2025/2026. '
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
      linkedin: 'https://www.linkedin.com/in/nathaniel-e-adama-93802a234/',
      github: 'https://github.com/s-kvng',
      x: 'https://x.com/sirr_nathan',
      email: 'nathanieladama8420@gmail.com',
    },
    bio: 'Co-Founder & CEO of Xolace Inc. Software Engineer | React | Django | React Native | Expo | Nodejs  | GDSC Lead 2022 - 2024 | Ex-Vice President of the COMPSSA KTU 2023/2024 | Awarded BEST STUDENT Software Developer by UMB Tertiary Awards 2024'
  },
  {
    id: 'member-4',
    name: 'Andrew Nana Beniako',
    position: 'UI/UX designer',
    initials: 'AB',
    gradientColors: ['#f59e0b', '#ef4444'],
    imageUrl: `${BASE}/kobby-mini.jpg`,
    socials: {
      linkedin: 'https://www.linkedin.com/in/andrew-beniako-04715a255',
      email: 'b.qhuabenah17@gmail.com'
    },
    bio: 'Co-Founder & CMO of Xolace Inc. Front End Developer HTML | CSS | Tailwind | JavaScript | nodeJs | nextJs . Graphic Designer, Former Project Lead at Google Development Student Club 2022, Academic Chair for COMPSSA KTU 2023 , Tech & Innovation Committee Member KTU 2026. '
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
