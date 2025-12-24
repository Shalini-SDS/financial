import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import 'express-async-errors';
import { json, urlencoded } from 'body-parser';
import { config } from 'dotenv';
import { authRouter } from './routes/auth';
import { invoiceRouter } from './routes/invoices';
import { reportRouter } from './routes/reports';
import { investmentRouter } from './routes/investments';
import { auditLogger } from './middleware/auditLogger';
import { errorHandler } from './middleware/errorHandler';

config();

const upload = multer({ dest: 'uploads/', limits: { fileSize: 10 * 1024 * 1024 } });

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: process.env.ALLOW_ORIGIN?.split(',') ?? ['http://localhost:5173'],
      credentials: true,
    }),
  );
  app.use(helmet());
  app.use(json({ limit: '2mb' }));
  app.use(urlencoded({ extended: true }));
  app.use(auditLogger);

  app.get('/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

  app.use('/api/auth', authRouter);
  app.use('/api/invoices', upload.single('invoice'), invoiceRouter);
  app.use('/api/investments', investmentRouter);
  app.use('/api/reports', reportRouter);

  app.use(errorHandler);
  return app;
};

