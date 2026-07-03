import type { Metadata } from 'next';
import { ProfileView } from '@/components/profile/profile-view';

export const metadata: Metadata = {
  title: 'Your Profile',
  description: 'Manage your resume, skills, experience, and education to improve job match accuracy.',
};

export default function ProfilePage() {
  return <ProfileView />;
}
