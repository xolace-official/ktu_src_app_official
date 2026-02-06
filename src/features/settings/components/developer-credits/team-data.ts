export interface TeamMember {
  id: string;
  name: string;
  position: string;
  initials: string;
  imageUrl?: string;
}

export const techTeam: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Team Member 1',
    position: 'Lead Developer',
    initials: 'TM',
    // imageUrl: 'https://example.com/avatar.jpg',
  },
  {
    id: 'member-2',
    name: 'Team Member 2',
    position: 'UI/UX Designer',
    initials: 'TM',
  },
  {
    id: 'member-3',
    name: 'Team Member 3',
    position: 'Backend Developer',
    initials: 'TM',
  },
  {
    id: 'member-4',
    name: 'Team Member 4',
    position: 'Mobile Developer',
    initials: 'TM',
  },
];
