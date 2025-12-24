import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../state/authStore';

const navItems = [
  { to: '/dashboard/msme', label: 'Dashboard' },
  { to: '/upload', label: 'Upload Invoice' },
  { to: '/history', label: 'Invoice History' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/investor', label: 'Investor' },
  { to: '/reports', label: 'Reports' },
  { to: '/blockchain', label: 'Blockchain Logs' },
];

export const Layout = ({ children }: { children: ReactNode }) => {
  const { role, logout } = useAuthStore();
  const location = useLocation();
  return (
    <div className="min-h-screen bg-graphite text-platinum flex">
      <aside className="w-64 bg-carbon border-r border-slate/50">
        <div className="px-6 py-6 flex items-center justify-between">
          <span className="text-lg font-heading tracking-tight">InvoSure</span>
          <span className="text-xs text-muted bg-slate/40 px-2 py-1 rounded">{role || 'Guest'}</span>
        </div>
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <motion.div
                whileHover={{ x: 4, boxShadow: '0 0 12px rgba(200,122,44,0.35)' }}
                className={`px-4 py-3 rounded transition ${
                  location.pathname === item.to ? 'bg-slate text-platinum' : 'text-muted'
                }`}
              >
                {item.label}
              </motion.div>
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-slate/50 flex items-center px-6 justify-between">
          <div className="text-sm text-muted">Financial Infrastructure for MSME Liquidity</div>
          <div className="flex items-center gap-3 text-sm">
            <button
              className="px-3 py-1 rounded bg-slate text-platinum hover:shadow-glow"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </header>
        <main className="p-6 bg-graphite flex-1">{children}</main>
      </div>
    </div>
  );
};

