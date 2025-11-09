'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MemberApplicationCard } from '@/components/members/member-card';
import { MembersService } from '@/services/http/members-service';
import { registerSchema, type RegisterFormData } from '@/lib/validators';

export default function RegisterPage() {
  const params = useParams<{ token: string }>();
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      company: '',
      role: '',
      address: '',
      city: '',
      country: '',
      phone: '',
    },
  });

  // Simulação de validação do token
  useEffect(() => {
    const validateToken = async () => {
      console.log('🔍 Validando token:', params.token);
      await new Promise((r) => setTimeout(r, 800)); // simula delay da API
      const valid = params.token && params.token.length >= 16;
      setIsValidToken(valid || false);
    };

    validateToken();
  }, [params.token]);

  const onSubmit = async (data: RegisterFormData) => {
    await MembersService.completeRegistration({
      token: params.token,
      ...data,
    });
    console.log('✅ Cadastro finalizado:', data);
    console.log(`📧 Simulando envio de email de boas-vindas para o email`);
    setSubmitted(true);
  };

  if (isValidToken === null) {
    return (
      <div className='flex min-h-screen items-center justify-center text-gray-500'>
        Validando token...
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <MemberApplicationCard
          title='Token inválido'
          description='O link de acesso é inválido ou expirou.'
        >
          <p className='text-red-500 text-sm'>
            Por favor, verifique o link enviado por e-mail ou solicite um novo.
          </p>
        </MemberApplicationCard>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <MemberApplicationCard
          title='Cadastro concluído!'
          description='Seu cadastro foi realizado com sucesso.'
        >
          <p className='text-sm text-gray-600'>
            Você receberá um e-mail de confirmação em instantes.
          </p>
        </MemberApplicationCard>
      </div>
    );
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-50'>
      <MemberApplicationCard
        title='Finalizar Cadastro'
        description='Confira seus dados e preencha as informações restantes.'
      >
        <div className='space-y-4'>
          {/* Formulário com campos adicionais */}
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <Input
              placeholder='Empresa (opcional)'
              {...form.register('company')}
            />
            <Input
              placeholder='Cargo/Função (opcional)'
              {...form.register('role')}
            />
            <Input
              placeholder='Telefone (opcional)'
              {...form.register('phone')}
            />
            <Input
              placeholder='Endereço (opcional)'
              {...form.register('address')}
            />
            <Input placeholder='Cidade (opcional)' {...form.register('city')} />
            <Input
              placeholder='País (opcional)'
              {...form.register('country')}
            />

            <Button type='submit' className='w-full'>
              Concluir Cadastro
            </Button>
          </form>
        </div>
      </MemberApplicationCard>
    </main>
  );
}
