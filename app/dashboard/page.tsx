import type { Metadata } from 'next';
import { DashboardView } from '@/components/dashboard/dashboard-view';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Track your saved jobs, submitted applications, and application status timeline.',
};

export default function DashboardPage() {
  return <DashboardView />;
}
