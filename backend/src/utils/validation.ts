import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['MSME', 'INVESTOR', 'ADMIN']),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const invoiceSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
});

export const investmentSchema = z.object({
  invoiceId: z.string(),
  amount: z.number().positive(),
});

export const reportSchema = z.object({
  type: z.enum(['invoice', 'investment', 'risk', 'ledger']),
  from: z.string().optional(),
  to: z.string().optional(),
});

