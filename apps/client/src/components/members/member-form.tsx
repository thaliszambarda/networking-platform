'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { memberSchema, type MemberFormData } from '@/lib/validators';
import { createMemberApplication } from '@/app/(routes)/actions';

export default function MembersForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful: success },
    reset,
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
  });

  const onSubmit = async (data: MemberFormData) => {
    await createMemberApplication(data);
    reset();
  };

  if (success) {
    return (
      <div className='max-w-md mx-auto p-6 text-center bg-white rounded-xl shadow-sm'>
        <h2 className='text-xl font-semibold text-green-600 mb-2'>
          Aplicação enviada com sucesso!
        </h2>
        <p className='text-gray-600'>
          Você receberá um e-mail com o próximo passo.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-md mx-auto p-4 space-y-4'
    >
      <div>
        <Input placeholder='Nome' {...register('name')} />
        {errors.name && (
          <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input placeholder='Email' type='email' {...register('email')} />
        {errors.email && (
          <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input placeholder='Empresa (opcional)' {...register('company')} />
      </div>

      <div>
        <Textarea placeholder='Motivo (opcional)' {...register('reason')} />
      </div>

      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
}
