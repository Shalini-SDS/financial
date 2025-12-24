import { PrismaClient, InvestmentStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const fundInvoice = async ({
  invoiceId,
  investorId,
  amount,
}: {
  invoiceId: string;
  investorId: string;
  amount: number;
}) => {
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId }, include: { investments: true } });
  if (!invoice) throw new Error('Invoice not found');
  const funded = invoice.investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const remaining = Number(invoice.amount) - funded;
  if (amount > remaining) throw new Error('Overfunding not allowed');
  const expectedReturn = amount * 1.08; // placeholder yield
  return prisma.investment.create({
    data: { invoiceId, investorId, amount, expectedReturn },
  });
};

export const settleInvestment = async (investmentId: string) => {
  return prisma.investment.update({
    where: { id: investmentId },
    data: { status: InvestmentStatus.SETTLED },
  });
};

