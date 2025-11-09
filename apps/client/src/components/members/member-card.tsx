'use client';

import { ReactNode } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

interface MemberApplicationCardProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function MemberApplicationCard({
  children,
  title = 'Intenção de Associação',
  description = 'Preencha as informações abaixo para solicitar associação.',
}: MemberApplicationCardProps) {
  return (
    <Card className='w-full max-w-md mx-auto mt-12 shadow-sm'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
