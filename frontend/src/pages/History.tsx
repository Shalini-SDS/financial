import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

type Invoice = {
  id: string;
  status: string;
  aiScore?: number;
  aiBand?: string;
  blockchainTx?: string;
  tokenId?: string;
};

export const History = () => {
  const { data } = useQuery<Invoice[]>({
    queryKey: ['history'],
    queryFn: async () => {
      const res = await api.get('/invoices');
      return res.data;
    },
  });

  return (
    <div className="space-y-4">
      <div>
        <p className="text-muted text-sm">Audit trail</p>
        <h2 className="text-2xl font-heading">Invoice History</h2>
      </div>
      <div className="bg-carbon border border-slate/60 rounded">
        <div className="grid grid-cols-6 px-4 py-3 text-muted text-sm border-b border-slate/50">
          <span>ID</span>
          <span>Status</span>
          <span>AI Risk</span>
          <span>Funding %</span>
          <span>Token</span>
          <span>Tx Hash</span>
        </div>
        {data?.map((inv) => (
          <div key={inv.id} className="grid grid-cols-6 px-4 py-3 border-b border-slate/50 text-sm">
            <span className="font-mono text-platinum truncate">{inv.id}</span>
            <span className="text-platinum">{inv.status}</span>
            <span className="text-platinum">{inv.aiScore ?? '-'} ({inv.aiBand ?? 'N/A'})</span>
            <span className="text-platinum">--</span>
            <span className="font-mono text-muted">{inv.tokenId ?? '-'}</span>
            <span className="font-mono text-amber truncate">{inv.blockchainTx ?? '-'}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-slate rounded text-platinum">Export CSV</button>
        <button className="px-4 py-2 border border-copper rounded text-platinum">Export PDF</button>
      </div>
    </div>
  );
};

