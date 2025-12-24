import { PrismaClient, InvoiceStatus } from '@prisma/client';
import { storeRiskLog } from './logService';
import { riskScoreInvoice } from '../ai/riskEngine';
import { pinToIpfs } from '../utils/ipfs';
import { mintInvoiceToken } from '../blockchain/tokenization';

const prisma = new PrismaClient();

export const createInvoice = async ({
  ownerId,
  amount,
  currency,
  filePath,
}: {
  ownerId: string;
  amount: number;
  currency: string;
  filePath?: string;
}) => {
  let ipfsHash: string | undefined;
  if (filePath) {
    ipfsHash = await pinToIpfs(filePath);
  }
  const invoice = await prisma.invoice.create({
    data: {
      ownerId,
      amount,
      currency,
      ipfsHash,
    },
  });
  return invoice;
};

export const analyzeInvoice = async (invoiceId: string) => {
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) throw new Error('Invoice not found');
  const risk = riskScoreInvoice({
    amount: Number(invoice.amount),
    currency: invoice.currency,
    createdAt: invoice.createdAt,
  });
  await storeRiskLog(invoiceId, risk);
  return prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      aiScore: risk.score,
      aiBand: risk.band,
      aiExplanation: risk.explanation,
      riskCreatedAt: new Date(),
      status: InvoiceStatus.ANALYZED,
    },
  });
};

export const tokenizeInvoice = async (invoiceId: string) => {
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) throw new Error('Invoice not found');
  const mint = await mintInvoiceToken(invoice.id, Number(invoice.amount));
  return prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      tokenId: mint.tokenId,
      blockchainTx: mint.txHash,
      status: InvoiceStatus.TOKENIZED,
    },
  });
};

