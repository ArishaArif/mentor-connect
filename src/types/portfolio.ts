export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  role: string;
  highlights: string[];
  startDate: string;
  endDate?: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  type: 'award' | 'certification' | 'publication' | 'speaking' | 'other';
  url?: string;
}

export interface TechStack {
  category: string;
  technologies: {
    name: string;
    yearsOfExperience: number;
    proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }[];
}

export interface MentorPortfolio {
  userId: string;
  headline: string;
  bio: string;
  workExperience: WorkExperience[];
  projects: Project[];
  achievements: Achievement[];
  techStacks: TechStack[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    blog?: string;
  };
  testimonials: {
    id: string;
    author: string;
    role: string;
    content: string;
    avatar?: string;
  }[];
}

export const TECH_CATEGORIES = [
  'Languages',
  'Frontend',
  'Backend',
  'Database',
  'Cloud & DevOps',
  'AI/ML',
  'Mobile',
  'Tools',
] as const;

export const POPULAR_TECHNOLOGIES: Record<string, string[]> = {
  'Languages': ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C++', 'C#', 'Ruby', 'Swift', 'Kotlin'],
  'Frontend': ['React', 'Vue.js', 'Angular', 'Next.js', 'Svelte', 'HTML/CSS', 'Tailwind CSS', 'SASS', 'Redux', 'GraphQL'],
  'Backend': ['Node.js', 'Express', 'Django', 'FastAPI', 'Spring Boot', 'Rails', '.NET', 'NestJS', 'Flask'],
  'Database': ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch', 'DynamoDB', 'Firebase', 'Supabase'],
  'Cloud & DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Jenkins', 'GitHub Actions'],
  'AI/ML': ['TensorFlow', 'PyTorch', 'scikit-learn', 'OpenAI', 'LangChain', 'Hugging Face', 'Computer Vision', 'NLP'],
  'Mobile': ['React Native', 'Flutter', 'iOS/Swift', 'Android/Kotlin', 'Expo'],
  'Tools': ['Git', 'VS Code', 'Figma', 'Jira', 'Notion', 'Postman', 'Linux'],
};
