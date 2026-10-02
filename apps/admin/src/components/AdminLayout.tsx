import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Key,
  Laptop,
  CreditCard,
  History,
  GitBranch,
  LogOut,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  adminEmail: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout, adminEmail }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Overview', path: '/', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Licenses', path: '/licenses', icon: <Key className="w-4 h-4" /> },
    { label: 'Devices', path: '/devices', icon: <Laptop className="w-4 h-4" /> },
    { label: 'Plans & Pricing', path: '/plans', icon: <CreditCard className="w-4 h-4" /> },
    { label: 'Audit Logs', path: '/audit-logs', icon: <History className="w-4 h-4" /> },
    { label: 'Extension Versions', path: '/versions', icon: <GitBranch className="w-4 h-4" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand */}
          <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-sm">
              MG
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white block">
                MONTY GENIUS
              </span>
              <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider block">
                Commercial Admin
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition"
          >
            <span>Public Web Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs text-slate-300 truncate max-w-[120px]">{adminEmail}</span>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-slate-900/60 border-b border-slate-800 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Environment:</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              PRODUCTION READY
            </span>
          </div>
          <div className="text-xs text-slate-400">
            Designed with ❤️ by Mr. Monty Genius
          </div>
        </header>

        {/* Dynamic page content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
