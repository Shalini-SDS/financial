import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-graphite text-platinum relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="w-full h-full bg-[radial-gradient(circle,_rgba(184,115,51,0.12),_transparent_30%)]" />
      </div>
      <div className="max-w-5xl mx-auto px-8 pt-28 relative">
        <p className="text-amber text-sm tracking-[0.3em] uppercase mb-6">InvoSure</p>
        <h1 className="text-5xl font-heading leading-tight max-w-3xl">
          Financial Infrastructure for MSME Liquidity
        </h1>
        <p className="text-muted mt-6 max-w-2xl">
          AI-driven invoice risk intelligence and blockchain-backed tokenization built for institutional-grade trust.
        </p>
        <div className="flex gap-4 mt-10">
          <Link to="/login?role=MSME">
            <motion.button whileHover={{ scale: 1.02 }} className="px-6 py-3 bg-copper text-graphite rounded">
              Enter as MSME
            </motion.button>
          </Link>
          <Link to="/login?role=INVESTOR">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="px-6 py-3 border border-copper text-platinum rounded"
            >
              Enter as Investor
            </motion.button>
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-3 gap-6">
          {['AI Risk Intelligence', 'On-chain Tokenization', 'Audit-ready Reports'].map((item) => (
            <div key={item} className="bg-carbon border border-slate/50 p-6 rounded">
              <p className="text-sm text-muted">{item}</p>
              <p className="text-platinum font-heading mt-2">Institutional-grade controls</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

