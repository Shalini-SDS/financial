const events = [
  { label: 'Invoice creation', hash: '0xabc...001', ts: '2025-01-12 10:12' },
  { label: 'Funding', hash: '0xabc...0f4', ts: '2025-01-14 15:22' },
  { label: 'Settlement', hash: '0xabc...9de', ts: '2025-02-02 09:45' },
];

export const Blockchain = () => {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-muted text-sm">Transparency</p>
        <h2 className="text-2xl font-heading">Blockchain Ledger</h2>
      </div>
      <div className="relative border-l border-copper/60 pl-6">
        {events.map((ev, idx) => (
          <div key={ev.hash} className="mb-6">
            <div className="absolute -left-2 mt-1 w-4 h-4 rounded-full bg-copper" />
            <p className="text-platinum font-heading">{ev.label}</p>
            <p className="text-sm text-muted">{ev.ts}</p>
            <p className="text-sm font-mono text-amber">{ev.hash}</p>
            <button className="text-xs text-platinum underline" onClick={() => navigator.clipboard.writeText(ev.hash)}>
              Copy hash
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

