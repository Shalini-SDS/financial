import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { invoiceSchema } from '../utils/validation';
import { analyzeInvoice, createInvoice, tokenizeInvoice } from '../services/invoiceService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const invoiceRouter = Router();

invoiceRouter.post('/', requireAuth(['MSME', 'ADMIN']), async (req, res) => {
  const parsed = invoiceSchema.safeParse({
    amount: Number(req.body.amount),
    currency: req.body.currency,
  });
  if (!parsed.success) return res.status(400).json(parsed.error);
  const filePath = (req as any).file?.path;
  const invoice = await createInvoice({
    ownerId: (req as any).user.id,
    amount: parsed.data.amount,
    currency: parsed.data.currency,
    filePath,
  });
  res.json(invoice);
});

invoiceRouter.get('/', requireAuth(), async (_req, res) => {
  const invoices = await prisma.invoice.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(invoices);
});

invoiceRouter.post('/:id/analyze', requireAuth(), async (req, res) => {
  const invoice = await analyzeInvoice(req.params.id);
  res.json(invoice);
});

invoiceRouter.post('/:id/tokenize', requireAuth(), async (req, res) => {
  const invoice = await tokenizeInvoice(req.params.id);
  res.json(invoice);
});

