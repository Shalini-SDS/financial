import { motion } from 'framer-motion';

const invoices = [
  { id: 'INV-1045', amount: 32000, duration: '45d', expectedReturn: '8.2%', trust: 82 },
  { id: 'INV-1046', amount: 18000, duration: '30d', expectedReturn: '7.4%', trust: 74 },
  { id: 'INV-1047', amount: 54000, duration: '60d', expectedReturn: '9.1%', trust: 68 },
];

export const Marketplace = () => {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-muted text-sm">Capital deployment</p>
        <h2 className="text-2xl font-heading">Invoice Marketplace</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {invoices.map((inv) => (
          <motion.div
            key={inv.id}
            whileHover={{ y: -2, boxShadow: '0 0 12px rgba(200,122,44,0.35)' }}
            className="bg-carbon border border-slate/60 p-4 rounded space-y-2"
          >
            <div className="flex justify-between text-sm text-muted">
              <span className="font-mono text-platinum">{inv.id}</span>
              <span>{inv.duration}</span>
            </div>
            <div className="text-xl font-heading">${inv.amount.toLocaleString()}</div>
            <div className="text-sm text-muted">Expected Return: {inv.expectedReturn}</div>
            <div className="text-sm text-platinum">AI Trust Score: {inv.trust}</div>
            <button className="w-full mt-2 bg-amber text-graphite py-2 rounded">Fund Invoice</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

