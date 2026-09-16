export interface ExperienceMentor {
  name: string;
  link?: string;
}

export interface ExperienceData {
  id: string;
  company: string;
  link?: string;
  logo: string;
  role: string;
  dates: string;
  mentors?: ExperienceMentor[];
}

// Add internships here; each item renders with the same Experience.vue template.
const experiences: ExperienceData[] = [
  {
    id: 'robbyant-2026',
    company: 'RobbyAnt',
    link: 'https://github.com/Robbyant',
    logo: '/Experiences/robbyant.png',
    role: 'Research Intern',
    dates: 'May 2026 - Aug. 2026',
    mentors: [
      { name: 'Dr. Yinghao Xu', link: 'https://justimyhxu.github.io/' },
    ],
  },
];

export default experiences;
