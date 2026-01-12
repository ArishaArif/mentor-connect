export type UserRole = 'student' | 'alumni' | 'mentor';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: Date;
  profileCompleted: boolean;
}

export interface StudentProfile {
  userId: string;
  profilePicture?: string;
  firstName: string;
  lastName: string;
  semester: number;
  cgpa: number;
  department: string;
  field: string;
  degree: string;
  university: string;
  professionalStatus: 'student' | 'intern' | 'employed';
  company?: string;
  skills: Skill[];
  certifications: Certification[];
  interests: string[];
}

export interface MentorProfile extends StudentProfile {
  yearsOfExperience: number;
  currentCompany: string;
  jobTitle: string;
  expertiseAreas: string[];
  mentoringPreferences: MentoringPreferences;
  linkedInProfile?: string;
}

export interface Skill {
  id: string;
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'expert';
}

export interface Certification {
  id: string;
  name: string;
  fileUrl: string;
  fileType: 'pdf' | 'png' | 'jpg';
  uploadedAt: Date;
}

export interface MentoringPreferences {
  ageGroupPreference: string[];
  experienceLevelPreference: string[];
  availabilityHoursPerWeek: number;
  preferredAreas: string[];
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
