import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { investmentSchema } from '../utils/validation';
import { fundInvoice } from '../services/investmentService';

export const investmentRouter = Router();

investmentRouter.post('/', requireAuth(['INVESTOR', 'ADMIN']), async (req, res) => {
  const parsed = investmentSchema.safeParse({
    invoiceId: req.body.invoiceId,
    amount: Number(req.body.amount),
  });
  if (!parsed.success) return res.status(400).json(parsed.error);
  const investment = await fundInvoice({
    invoiceId: parsed.data.invoiceId,
    investorId: (req as any).user.id,
    amount: parsed.data.amount,
  });
  res.json(investment);
});

