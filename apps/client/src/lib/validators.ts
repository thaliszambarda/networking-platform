import { z } from 'zod';

export const memberSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('Email inválido'),
  company: z.string().optional(),
  reason: z.string().optional(),
});

export const registerSchema = z.object({
  company: z.string().optional(),
  role: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
});

export type MemberFormData = z.infer<typeof memberSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
