'use client';
import { useLocalStorage } from './useLocalStorage';
import { UserProfile } from '@/types';

const defaultProfile: UserProfile = {
  name: 'Jordan Casey',
  title: 'Senior Frontend Engineer',
  email: 'jordan.casey@example.com',
  location: 'Austin, TX',
  bio: 'Frontend engineer focused on design systems and performance. Previously at two Series B startups.',
  avatar: '',
  skills: ['React', 'TypeScript', 'Next.js', 'CSS', 'Accessibility'],
  experience: [
    {
      id: 'exp1',
      role: 'Senior Frontend Engineer',
      company: 'Switchboard',
      start: '2023',
      end: null,
      description: 'Lead the design system team and own the realtime collaboration UI.',
    },
    {
      id: 'exp2',
      role: 'Frontend Engineer',
      company: 'Thistle & Co.',
      start: '2020',
      end: '2023',
      description: 'Built the storefront checkout flow and internal component library.',
    },
  ],
  education: [{ id: 'edu1', school: 'University of Texas at Austin', degree: 'B.S. Computer Science', year: '2020' }],
  resumeFileName: null,
};

export function useProfile() {
  return useLocalStorage<UserProfile>('signal:profile', defaultProfile);
}

export function profileCompletion(profile: UserProfile): number {
  const checks = [
    !!profile.name,
    !!profile.title,
    !!profile.bio && profile.bio.length > 20,
    profile.skills.length >= 3,
    profile.experience.length >= 1,
    profile.education.length >= 1,
    !!profile.resumeFileName,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}
