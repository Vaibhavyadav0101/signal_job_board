import { Job, JobType, WorkMode, ExperienceLevel, Company } from '@/types';
import { companies } from './companies';

// Small seeded PRNG so mock data is stable across server/client renders
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const roles = [
  { title: 'Senior Frontend Engineer', category: 'Engineering', skills: ['React', 'TypeScript', 'Next.js', 'CSS'] },
  { title: 'Backend Engineer', category: 'Engineering', skills: ['Node.js', 'PostgreSQL', 'Go', 'AWS'] },
  { title: 'Full Stack Engineer', category: 'Engineering', skills: ['React', 'Node.js', 'GraphQL', 'Docker'] },
  { title: 'Staff Software Engineer', category: 'Engineering', skills: ['System Design', 'Kubernetes', 'Go', 'gRPC'] },
  { title: 'Machine Learning Engineer', category: 'Data & AI', skills: ['Python', 'PyTorch', 'MLOps', 'SQL'] },
  { title: 'Data Scientist', category: 'Data & AI', skills: ['Python', 'SQL', 'Statistics', 'A/B Testing'] },
  { title: 'Data Engineer', category: 'Data & AI', skills: ['Airflow', 'Spark', 'SQL', 'Python'] },
  { title: 'Product Manager', category: 'Product', skills: ['Roadmapping', 'User Research', 'SQL', 'Figma'] },
  { title: 'Senior Product Manager', category: 'Product', skills: ['Strategy', 'Analytics', 'Stakeholder Mgmt', 'Figma'] },
  { title: 'Product Designer', category: 'Design', skills: ['Figma', 'Prototyping', 'Design Systems', 'User Research'] },
  { title: 'UX Researcher', category: 'Design', skills: ['User Interviews', 'Usability Testing', 'Survey Design'] },
  { title: 'DevOps Engineer', category: 'Engineering', skills: ['Terraform', 'AWS', 'Kubernetes', 'CI/CD'] },
  { title: 'Site Reliability Engineer', category: 'Engineering', skills: ['Kubernetes', 'Prometheus', 'Go', 'Linux'] },
  { title: 'Security Engineer', category: 'Engineering', skills: ['Threat Modeling', 'Python', 'Cloud Security'] },
  { title: 'Growth Marketing Manager', category: 'Marketing', skills: ['SEO', 'Paid Acquisition', 'Analytics'] },
  { title: 'Content Marketing Lead', category: 'Marketing', skills: ['Content Strategy', 'SEO', 'Copywriting'] },
  { title: 'Sales Development Representative', category: 'Sales', skills: ['Outbound', 'CRM', 'Cold Outreach'] },
  { title: 'Account Executive', category: 'Sales', skills: ['Negotiation', 'CRM', 'Pipeline Management'] },
  { title: 'Customer Success Manager', category: 'Customer Success', skills: ['Onboarding', 'Retention', 'CRM'] },
  { title: 'Technical Support Engineer', category: 'Customer Success', skills: ['Debugging', 'SQL', 'APIs'] },
  { title: 'Engineering Manager', category: 'Engineering', skills: ['Leadership', 'System Design', 'Mentorship'] },
  { title: 'QA Automation Engineer', category: 'Engineering', skills: ['Cypress', 'Playwright', 'CI/CD'] },
  { title: 'Mobile Engineer (iOS)', category: 'Engineering', skills: ['Swift', 'SwiftUI', 'Xcode'] },
  { title: 'Mobile Engineer (Android)', category: 'Engineering', skills: ['Kotlin', 'Jetpack Compose'] },
  { title: 'Solutions Architect', category: 'Engineering', skills: ['AWS', 'System Design', 'Client Facing'] },
  { title: 'Business Operations Analyst', category: 'Operations', skills: ['SQL', 'Excel', 'Forecasting'] },
  { title: 'Recruiter, Technical', category: 'People', skills: ['Sourcing', 'ATS', 'Interviewing'] },
  { title: 'Finance Manager', category: 'Finance', skills: ['FP&A', 'Excel', 'Forecasting'] },
];

const locations = [
  'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Remote', 'Boston, MA',
  'Seattle, WA', 'Chicago, IL', 'Denver, CO', 'Los Angeles, CA', 'Remote',
];

const workModes: WorkMode[] = ['Remote', 'Hybrid', 'Onsite'];
const jobTypes: JobType[] = ['Full-time', 'Full-time', 'Full-time', 'Contract', 'Part-time'];
const levels: ExperienceLevel[] = ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'];

const salaryByLevel: Record<ExperienceLevel, [number, number]> = {
  Entry: [60000, 90000],
  Mid: [90000, 130000],
  Senior: [130000, 175000],
  Lead: [160000, 210000],
  Executive: [200000, 280000],
};

function buildDescription(title: string, company: Company) {
  return `${company.name} is hiring a ${title} to help us scale our product and engineering foundation. You'll work closely with a small, senior team, ship to production weekly, and have real ownership over the systems you build. We care about clear writing, fast iteration, and durable decisions over quick hacks.`;
}

function generate(): Job[] {
  const rand = seeded(42);
  const jobs: Job[] = [];
  let idx = 0;

  for (let i = 0; i < 58; i++) {
    const role = roles[i % roles.length];
    const company = companies[Math.floor(rand() * companies.length)];
    const level = levels[Math.floor(rand() * levels.length)];
    const [minBase, maxBase] = salaryByLevel[level];
    const salaryMin = Math.round((minBase + rand() * (maxBase - minBase) * 0.4) / 1000) * 1000;
    const salaryMax = Math.round((salaryMin + (maxBase - minBase) * 0.5) / 1000) * 1000;
    const workMode = workModes[Math.floor(rand() * workModes.length)];
    const jobType = jobTypes[Math.floor(rand() * jobTypes.length)];
    const location = workMode === 'Remote' ? 'Remote' : locations[Math.floor(rand() * locations.length)];
    const daysAgo = Math.floor(rand() * 45);
    const postedAt = new Date(Date.now() - daysAgo * 86_400_000).toISOString();
    const matchScore = Math.round(55 + rand() * 44);
    idx += 1;

    jobs.push({
      id: `job-${idx}`,
      title: role.title,
      companyId: company.id,
      location,
      workMode,
      jobType,
      experienceLevel: level,
      salaryMin,
      salaryMax,
      currency: 'USD',
      skills: role.skills,
      description: buildDescription(role.title, company),
      responsibilities: [
        `Own end-to-end delivery of key initiatives within the ${role.category.toLowerCase()} function.`,
        `Partner cross-functionally with product, design, and engineering stakeholders.`,
        `Set technical or functional direction for your area and mentor teammates.`,
        `Improve processes and tooling that the whole team relies on.`,
      ],
      requirements: [
        `${level === 'Entry' ? '0–2' : level === 'Mid' ? '2–5' : level === 'Senior' ? '5–8' : level === 'Lead' ? '8+' : '10+'} years of relevant experience.`,
        `Strong hands-on experience with ${role.skills.slice(0, 2).join(' and ')}.`,
        `Excellent written communication — we work async across time zones.`,
        `A track record of shipping and owning outcomes, not just tasks.`,
      ],
      benefits: [
        'Comprehensive health, dental, and vision coverage',
        'Flexible PTO and paid parental leave',
        '$1,500 annual learning & development stipend',
        'Equity in early-to-growth stage company',
        workMode === 'Remote' ? 'Fully remote with quarterly team offsites' : 'Hybrid schedule with flexible hours',
      ],
      postedAt,
      applicantCount: Math.floor(rand() * 240) + 3,
      viewCount: Math.floor(rand() * 3000) + 100,
      featured: rand() > 0.82,
      category: role.category,
      matchScore,
    });
  }

  return jobs;
}

export const jobs: Job[] = generate();

export function getCompany(companyId: string): Company {
  return companies.find((c) => c.id === companyId)!;
}

export const companiesWithCounts: Company[] = companies.map((c) => ({
  ...c,
  openRoles: jobs.filter((j) => j.companyId === c.id).length,
}));

export function getCompanyWithCount(companyId: string): Company {
  return companiesWithCounts.find((c) => c.id === companyId)!;
}

export function getJobWithCompany(job: Job) {
  return { ...job, company: getCompanyWithCount(job.companyId) };
}

export const jobsWithCompanies = jobs.map(getJobWithCompany);

export const categories = Array.from(new Set(roles.map((r) => r.category)));

export const allSkills = Array.from(new Set(roles.flatMap((r) => r.skills))).sort();
