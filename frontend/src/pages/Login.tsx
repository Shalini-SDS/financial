import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../lib/api';
import { useAuthStore } from '../state/authStore';

export const Login = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const presetRole = params.get('role') || 'MSME';
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(presetRole);
  const setAuth = useAuthStore((s) => s.setAuth);

  const [error, setError] = useState<string>('');

  const submit = async () => {
    setError('');
    try {
      if (mode === 'signup') {
        await api.post('/auth/signup', { email, password, role });
      }
      const { data } = await api.post('/auth/login', { email, password });
      setAuth(data.token, data.user.role);
      navigate('/dashboard/msme');
    } catch (e: any) {
      const errorMessage = e.response?.data?.error || e.message || 'Authentication failed';
      setError(errorMessage);
      console.error('Auth error:', e.response?.data || e.message);
    }
  };

  return (
    <div className="min-h-screen bg-graphite flex items-center justify-center">
      <div className="w-[440px] bg-carbon border border-slate/60 p-8 rounded space-y-4 shadow-lg">
        <p className="text-muted text-sm">Secure access</p>
        <h2 className="text-2xl font-heading">InvoSure Control Panel</h2>
        <div className="flex gap-2 text-sm">
          <button
            className={`px-3 py-2 rounded ${mode === 'login' ? 'bg-slate text-platinum' : 'text-muted'}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`px-3 py-2 rounded ${mode === 'signup' ? 'bg-slate text-platinum' : 'text-muted'}`}
            onClick={() => setMode('signup')}
          >
            Signup
          </button>
        </div>
        <div className="space-y-3">
          <input
            className="w-full bg-slate/40 border border-slate/50 rounded px-3 py-2 text-platinum"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full bg-slate/40 border border-slate/50 rounded px-3 py-2 text-platinum"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {mode === 'signup' && (
            <select
              className="w-full bg-slate/40 border border-slate/50 rounded px-3 py-2 text-platinum"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="MSME">MSME</option>
              <option value="INVESTOR">Investor</option>
              <option value="ADMIN">Admin</option>
            </select>
          )}
        </div>
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}
        <button className="w-full bg-copper text-graphite py-3 rounded" onClick={submit}>
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </div>
    </div>
  );
};

