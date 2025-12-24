import { api } from '../lib/api';

const reports = [
  { key: 'invoice', title: 'Invoice History Report' },
  { key: 'investment', title: 'Investment Summary Report' },
  { key: 'risk', title: 'AI Risk Report' },
  { key: 'ledger', title: 'Settlement Ledger' },
];

export const Reports = () => {
  const download = async (type: string) => {
    const { data } = await api.post('/reports/download', { type });
    alert(`Report generated. PDF: ${data.pdf}`);
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-muted text-sm">Audit-ready outputs</p>
        <h2 className="text-2xl font-heading">Reports Hub</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {reports.map((r) => (
          <div key={r.key} className="bg-carbon border border-slate/60 rounded p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted">Preview</p>
                <p className="text-lg font-heading">{r.title}</p>
              </div>
              <div className="text-xs text-muted">Date range configurable</div>
            </div>
            <div className="h-20 bg-slate/30 rounded"></div>
            <div className="flex gap-3">
              <input className="bg-slate/40 border border-slate/60 rounded px-3 py-2 text-xs w-32" placeholder="From" />
              <input className="bg-slate/40 border border-slate/60 rounded px-3 py-2 text-xs w-32" placeholder="To" />
              <button className="px-4 py-2 bg-copper text-graphite rounded" onClick={() => download(r.key)}>
                Download PDF/CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

