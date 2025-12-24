import PDFDocument from 'pdfkit';
import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const generatePdf = async (title: string, rows: Record<string, any>[]) => {
  const doc = new PDFDocument({ margin: 40 });
  const file = `tmp/${title}-${Date.now()}.pdf`;
  doc.pipe(fs.createWriteStream(file));
  doc.fontSize(18).text(title, { underline: true });
  doc.moveDown();
  rows.forEach((row) => {
    doc.fontSize(12).text(JSON.stringify(row, null, 2));
    doc.moveDown();
  });
  doc.end();
  return file;
};

export const generateCsv = async (title: string, rows: Record<string, any>[]) => {
  const file = `tmp/${title}-${Date.now()}.csv`;
  const csvWriter = createObjectCsvWriter({
    path: file,
    header: Object.keys(rows[0] ?? {}).map((k) => ({ id: k, title: k })),
  });
  await csvWriter.writeRecords(rows);
  return file;
};

export const fetchInvoiceHistory = async () => {
  return prisma.invoice.findMany({ orderBy: { createdAt: 'desc' } });
};

export const fetchInvestments = async () => {
  return prisma.investment.findMany({ orderBy: { createdAt: 'desc' } });
};

