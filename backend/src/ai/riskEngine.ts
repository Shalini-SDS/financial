type RiskInput = {
  amount: number;
  currency: string;
  createdAt: Date;
};

const explain = (score: number) => {
  if (score >= 80) return 'Strong payment history and low exposure; high confidence.';
  if (score >= 50) return 'Balanced risk; monitor liquidity and buyer concentration.';
  return 'Elevated risk due to limited history or high concentration.';
};

export const riskScoreInvoice = (input: RiskInput) => {
  const recencyFactor = Math.min(
    1,
    (Date.now() - input.createdAt.getTime()) / (1000 * 60 * 60 * 24 * 90),
  );
  const amountFactor = Math.max(0, 1 - input.amount / 500000);
  const score = Math.floor(50 + amountFactor * 40 - recencyFactor * 10);
  const band = score >= 80 ? 'High' : score >= 50 ? 'Medium' : 'Low';
  return { score, band, explanation: explain(score) };
};

