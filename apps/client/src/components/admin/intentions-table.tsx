// app/admin/intentions/intentions-table.tsx
'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { updateApplicationStatus } from '../../app/(routes)/admin/intentions/actions';
import { useRouter } from 'next/navigation';

interface IntentionsTableProps {
  applications: {
    id: string;
    name: string;
    email: string;
    company?: string | null;
    reason?: string | null;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    token?: string | null;
    createdAt: string;
  }[];
}

export default function IntentionsTable({
  applications,
}: IntentionsTableProps) {
  const router = useRouter();

  const handleApprove = async (appId: string) => {
    const { token } = await updateApplicationStatus(appId, 'APPROVED');

    // Exibe toast com link clicável
    toast.success('Membro aprovado com sucesso!', {
      description: 'Clique aqui para acessar o link de cadastro.',
      action: {
        label: 'Abrir link',
        onClick: () => {
          if (token) router.push(`/member/${token}`);
        },
      },
      duration: 6000,
    });
  };

  if (!applications.length) {
    return <p className='text-gray-500'>Nenhuma intenção encontrada.</p>;
  }

  return (
    <div className='rounded-md border bg-white'>
      <Table className='table-auto w-full'>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Motivo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className='font-medium'>{app.name}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>{app.company || '—'}</TableCell>
              <TableCell>{app.reason || '—'}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    'font-semibold',
                    app.status === 'APPROVED'
                      ? 'text-green-600'
                      : app.status === 'REJECTED'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                  )}
                >
                  {app.status}
                </span>
              </TableCell>
              <TableCell className='text-right'>
                {app.status === 'PENDING' ? (
                  <div className='flex justify-end gap-2'>
                    <Button onClick={() => handleApprove(app.id)} size='sm'>
                      Aprovar
                    </Button>
                    <Button
                      onClick={async () =>
                        await updateApplicationStatus(app.id, 'REJECTED')
                      }
                      size='sm'
                      variant='destructive'
                    >
                      Recusar
                    </Button>
                  </div>
                ) : (
                  <span className='text-sm text-gray-500'>—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
