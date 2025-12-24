import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge, GaugeChart } from '../sections/Gauge';
import { api } from '../lib/api';

const metricStyle = 'bg-carbon border border-slate/60 rounded p-4 shadow';

export const DashboardMSME = () => {
  const [metrics, setMetrics] = useState({
    total: 125000,
    active: 82000,
    settled: 43000,
    liquidity: 52000,
    trust: 78,
  });

  useEffect(() => {
    // placeholder fetch
    api.get('/invoices').catch(() => null);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted text-sm">Liquidity Control Center</p>
          <h2 className="text-2xl font-heading">MSME Dashboard</h2>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Invoice Value', value: metrics.total },
          { label: 'Active Funding', value: metrics.active },
          { label: 'Settled Amount', value: metrics.settled },
          { label: 'Available Liquidity', value: metrics.liquidity },
        ].map((m) => (
          <motion.div key={m.label} whileHover={{ y: -2 }} className={metricStyle}>
            <p className="text-muted text-sm">{m.label}</p>
            <p className="text-2xl font-heading text-platinum mt-2">${m.value.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className={`${metricStyle} col-span-2`}>
          <p className="text-muted text-sm mb-2">Funding Activity</p>
          <div className="h-48 bg-slate/30 rounded"></div>
        </div>
        <div className={metricStyle}>
          <p className="text-muted text-sm mb-2">AI Trust Score</p>
          <GaugeChart value={metrics.trust} />
          <p className="text-xs text-muted mt-2">Derived from behavioral risk, exposure, and payment recency.</p>
        </div>
      </div>
    </div>
  );
};

