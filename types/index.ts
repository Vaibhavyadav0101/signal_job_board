export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type WorkMode = 'Remote' | 'Hybrid' | 'Onsite';
export type ExperienceLevel = 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive';
export type ApplicationStatus = 'Saved' | 'Applied' | 'In Review' | 'Interviewing' | 'Offer' | 'Rejected';

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  founded: number;
  hq: string;
  website: string;
  description: string;
  rating: number;
  openRoles: number;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  location: string;
  workMode: WorkMode;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedAt: string; // ISO date
  applicantCount: number;
  viewCount: number;
  featured: boolean;
  category: string;
  /** Deterministic AI-style match score (0-100) used by the Signal-bars indicator */
  matchScore: number;
}

export interface JobWithCompany extends Job {
  company: Company;
}

export interface FilterState {
  query: string;
  location: string;
  jobTypes: JobType[];
  workModes: WorkMode[];
  experienceLevels: ExperienceLevel[];
  skills: string[];
  salaryRange: [number, number];
  category: string | null;
}

export type SortOption = 'relevance' | 'newest' | 'salary-high' | 'salary-low';

export interface TrackedApplication {
  jobId: string;
  status: ApplicationStatus;
  updatedAt: string;
  history: { status: ApplicationStatus; date: string }[];
}

export interface UserProfile {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  avatar: string;
  skills: string[];
  experience: {
    id: string;
    role: string;
    company: string;
    start: string;
    end: string | null;
    description: string;
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    year: string;
  }[];
  resumeFileName: string | null;
}
