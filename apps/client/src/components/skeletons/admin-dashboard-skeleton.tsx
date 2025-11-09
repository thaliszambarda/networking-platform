import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardSkeleton() {
  return (
    <div className='w-full max-w-5xl px-2'>
      {/* Header Skeleton */}
      <div className='flex flex-col sm:flex-row justify-between items-center mb-10 text-center sm:text-left gap-4'>
        <Skeleton className='h-10 w-64 rounded' />
        <div className='flex gap-3'>
          <Skeleton className='h-10 w-32 rounded' />
          <Skeleton className='h-10 w-24 rounded' />
        </div>
      </div>

      {/* Dashboard Cards Skeleton */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 text-center'>
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className='p-4 shadow-sm border border-border/50 transition hover:shadow-md'
          >
            <CardHeader className='pb-2'>
              <CardTitle>
                <Skeleton className='h-4 w-32 mx-auto rounded mb-2' />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className='h-12 w-20 mx-auto rounded' />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
