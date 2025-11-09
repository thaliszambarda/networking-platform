'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Erro capturado:', error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center bg-gray-50 text-center p-6'>
      <h2 className='text-2xl font-semibold mb-4 text-red-600'>
        Ocorreu um erro inesperado 😢
      </h2>
      <p className='text-gray-600 mb-6'>
        {error.message || 'Erro desconhecido.'}
      </p>
      <Button onClick={() => reset()}>Tentar novamente</Button>
    </div>
  );
}
