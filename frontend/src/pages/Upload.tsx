import { useState } from 'react';
import { api } from '../lib/api';

export const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [step, setStep] = useState<'idle' | 'analyze' | 'chain' | 'token'>('idle');

  const submit = async () => {
    if (!file) return;
    const form = new FormData();
    form.append('invoice', file);
    form.append('amount', amount);
    form.append('currency', currency);
    const { data } = await api.post('/invoices', form);
    setStep('analyze');
    await api.post(`/invoices/${data.id}/analyze`);
    setStep('chain');
    const tokenized = await api.post(`/invoices/${data.id}/tokenize`);
    setTokenId(tokenized.data.tokenId);
    setStep('token');
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted text-sm">Secure upload</p>
        <h2 className="text-2xl font-heading">Upload & Tokenize Invoice</h2>
      </div>
      <div className="bg-carbon border border-slate/60 p-6 rounded space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <input
            className="bg-slate/40 border border-slate/60 rounded px-3 py-2 text-platinum"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            className="bg-slate/40 border border-slate/60 rounded px-3 py-2 text-platinum"
            placeholder="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
          <input
            className="bg-slate/40 border border-slate/60 rounded px-3 py-2 text-platinum"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
        <button className="bg-copper text-graphite px-5 py-2 rounded" onClick={submit}>
          Tokenize Invoice
        </button>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'AI Analysis', state: step !== 'idle' ? 'active' : 'idle' },
            { label: 'Blockchain Validation', state: step === 'chain' || step === 'token' ? 'active' : 'idle' },
            { label: 'Token Creation', state: step === 'token' ? 'active' : 'idle' },
          ].map((s) => (
            <div
              key={s.label}
              className={`p-3 rounded border ${
                s.state === 'active' ? 'border-copper text-platinum' : 'border-slate/60 text-muted'
              }`}
            >
              {s.label}
            </div>
          ))}
        </div>
        {tokenId && (
          <div className="text-sm text-platinum font-mono">Token ID: {tokenId}</div>
        )}
      </div>
    </div>
  );
};

