// app/admin/intentions/page.tsx
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { SkeletonTable } from '@/components/skeletons/skeleton-table';
import { IntentionsContent } from './intentions-content';

export default function AdminIntentionsPage() {
  const secret = process.env.NEXT_PUBLIC_ADMIN_SECRET;

  if (!secret) {
    redirect('/');
  }

  return (
    <Suspense fallback={<SkeletonTable />}>
      <IntentionsContent />
    </Suspense>
  );
}
