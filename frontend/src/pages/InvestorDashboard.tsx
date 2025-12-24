const cards = [
  { label: 'Total Invested', value: 92000 },
  { label: 'Expected Returns', value: 103400 },
  { label: 'Active Settlements', value: 18 },
];

export const InvestorDashboard = () => {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-muted text-sm">Returns & Exposure</p>
        <h2 className="text-2xl font-heading">Investor Dashboard</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-carbon border border-slate/60 p-4 rounded">
            <p className="text-muted text-sm">{c.label}</p>
            <p className="text-2xl font-heading text-platinum mt-2">
              {c.label.includes('Active') ? c.value : `$${c.value.toLocaleString()}`}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-carbon border border-slate/60 p-4 rounded">
        <p className="text-muted text-sm mb-3">Settlement Progress</p>
        <div className="space-y-3">
          {[65, 82, 45].map((pct, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs text-muted">
                <span>Invoice #{1040 + i}</span>
                <span>{pct}%</span>
              </div>
              <div className="w-full bg-slate/40 h-2 rounded">
                <div className="h-2 rounded bg-copper" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 px-4 py-2 bg-amber text-graphite rounded">Download Performance Report</button>
      </div>
    </div>
  );
};

