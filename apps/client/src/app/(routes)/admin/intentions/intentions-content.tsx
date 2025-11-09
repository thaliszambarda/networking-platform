// app/admin/intentions/intentions-content.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MembersService } from '@/services/http/members-service';
import IntentionsTable from '@/components/admin/intentions-table';

export async function IntentionsContent() {
  const applications = await MembersService.getAllApplications();

  return (
    <>
      <div className='w-full max-w-6xl space-y-8'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Intenções de Membros
          </h1>

          <Link href='/admin'>
            <Button variant='outline' size='lg'>
              ← Voltar para o Painel
            </Button>
          </Link>
        </div>

        <div className='bg-background rounded-2xl border border-border/50 shadow-sm p-4'>
          <IntentionsTable applications={applications} />
        </div>
      </div>
    </>
  );
}
