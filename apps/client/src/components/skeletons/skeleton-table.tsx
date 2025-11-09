// components/skeleton-table.tsx
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonTable() {
  return (
    <div className='space-y-3 border rounded-md bg-white p-4'>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='flex space-x-3'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-6 w-24' />
          <Skeleton className='h-6 w-28' />
          <Skeleton className='h-6 w-20' />
        </div>
      ))}
    </div>
  );
}
