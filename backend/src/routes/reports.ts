import { Router } from 'express';
import fs from 'fs';
import { requireAuth } from '../middleware/auth';
import { reportSchema } from '../utils/validation';
import { fetchInvestments, fetchInvoiceHistory, generateCsv, generatePdf } from '../services/reportService';

export const reportRouter = Router();

reportRouter.post('/download', requireAuth(), async (req, res) => {
  const parsed = reportSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const { type } = parsed.data;
  const rows =
    type === 'invoice'
      ? await fetchInvoiceHistory()
      : type === 'investment'
      ? await fetchInvestments()
      : type === 'ledger'
      ? await fetchInvoiceHistory()
      : await fetchInvoiceHistory();

  const title =
    type === 'invoice'
      ? 'invoice-history'
      : type === 'investment'
      ? 'investment-summary'
      : type === 'ledger'
      ? 'settlement-ledger'
      : 'ai-risk';

  const pdfFile = await generatePdf(title, rows);
  const csvFile = await generateCsv(title, rows);
  res.json({ pdf: pdfFile, csv: csvFile });
});

reportRouter.get('/file', requireAuth(), async (req, res) => {
  const path = req.query.path as string;
  if (!path || !fs.existsSync(path)) return res.status(404).send('Not found');
  res.download(path);
});

