import { Suspense } from 'react';
import AdminContent from './admin-content';
import AdminDashboardSkeleton from '@/components/skeletons/admin-dashboard-skeleton';
import { redirect } from 'next/navigation';

export default function AdminDashboard() {
  const secret = process.env.NEXT_PUBLIC_ADMIN_SECRET;

  if (!secret) {
    redirect('/');
  }

  return (
    <Suspense fallback={<AdminDashboardSkeleton />}>
      <AdminContent />
    </Suspense>
  );
}
