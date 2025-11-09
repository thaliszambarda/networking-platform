import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DashboardService } from '@/services/http/dashboard-service';

export default async function AdminContent() {
  const data = await DashboardService.getAllPerformanceMetrics();

  return (
    <div className='w-full max-w-5xl px-2'>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-10 text-center sm:text-left gap-4'>
        <h1 className='text-3xl font-bold tracking-tight mb-4 sm:mb-0'>
          Painel do Administrador
        </h1>

        <div className='flex gap-3'>
          <Link href='/admin/intentions'>
            <Button size='lg' variant='default'>
              Ver Intenções
            </Button>
          </Link>

          <Link href='/'>
            <Button size='lg' variant='outline'>
              Sair
            </Button>
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 text-center'>
        <Card className='p-4 shadow-sm border border-border/50 transition hover:shadow-md'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-base font-medium text-muted-foreground'>
              Membros Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-4xl font-semibold text-foreground'>
              {data.totalMembers}
            </p>
          </CardContent>
        </Card>

        <Card className='p-4 shadow-sm border border-border/50 transition hover:shadow-md'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-base font-medium text-muted-foreground'>
              Indicações no Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-4xl font-semibold text-foreground'>
              {data.totalReferrals}
            </p>
          </CardContent>
        </Card>

        <Card className='p-4 shadow-sm border border-border/50 transition hover:shadow-md'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-base font-medium text-muted-foreground'>
              “Obrigados” no Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-4xl font-semibold text-foreground'>
              {data.totalThanks}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
