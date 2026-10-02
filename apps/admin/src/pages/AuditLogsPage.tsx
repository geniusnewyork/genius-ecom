import React, { useEffect, useState } from 'react';
import { History, ShieldAlert, User, Laptop, Key, RefreshCw } from 'lucide-react';

interface AuditItem {
  id: string;
  action: string;
  licenseId?: string;
  deviceId?: string;
  actorId?: string;
  actorType: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export const AuditLogsPage: React.FC<{ token: string }> = ({ token }) => {
  const [logs, setLogs] = useState<AuditItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/v1/admin/audit-logs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setLogs(data.auditLogs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [token]);

  const getActionBadge = (action: string) => {
    if (action.includes('CREATED') || action.includes('ACTIVATED') || action.includes('REACTIVATED')) {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
    if (action.includes('SUSPENDED') || action.includes('EXTENDED') || action.includes('RESET')) {
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
    if (action.includes('REVOKED') || action.includes('DEACTIVATED')) {
      return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
    return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Security Audit Log Timeline</h1>
          <p className="text-xs text-slate-400 mt-1">
            Immutable tracking of license creation, activations, administrative suspensions, and device seat releases.
          </p>
        </div>
        <button
          onClick={fetchLogs}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-2 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Security Action</th>
              <th className="py-3 px-4">Actor</th>
              <th className="py-3 px-4">Target License / Device</th>
              <th className="py-3 px-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${getActionBadge(log.action)}`}>
                    {log.action}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-white">{log.actorId || log.actorType}</span>
                </td>
                <td className="py-3 px-4 font-mono text-cyan-400">
                  {log.licenseId ? `#${log.licenseId}` : log.deviceId || '-'}
                </td>
                <td className="py-3 px-4 text-slate-400 truncate max-w-xs font-mono text-[11px]">
                  {log.details ? JSON.stringify(log.details) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
