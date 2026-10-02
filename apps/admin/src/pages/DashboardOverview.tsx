import React, { useEffect, useState } from 'react';
import {
  Key,
  Laptop,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface StatsData {
  totalLicenses: number;
  activeLicenses: number;
  expiredLicenses: number;
  suspendedLicenses: number;
  activeDevices: number;
  totalRevenue: number;
  plansCount: number;
  recentActivations: Array<{
    id: string;
    licenseId: string;
    deviceId: string;
    timestamp: string;
  }>;
}

export const DashboardOverview: React.FC<{ token: string }> = ({ token }) => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/v1/admin/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (e) {
      console.error('Failed to load admin stats', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Platform Operations Overview</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real database metrics from license management, device activations, and catalog integrations.
          </p>
        </div>
        <button
          onClick={fetchStats}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-2 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Licenses</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Key className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{stats?.activeLicenses || 0}</div>
          <div className="text-xs text-slate-500 mt-2">
            out of <strong>{stats?.totalLicenses || 0}</strong> issued licenses
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Connected Devices</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Laptop className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{stats?.activeDevices || 0}</div>
          <div className="text-xs text-slate-500 mt-2">
            active seller workstation installations
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Turnover</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            ₹{(stats?.totalRevenue || 0).toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            across Pro, Business, and Lifetime plans
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Suspended / Expired</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {(stats?.suspendedLicenses || 0) + (stats?.expiredLicenses || 0)}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            requires customer renewal or admin review
          </div>
        </div>
      </div>

      {/* Recent Activations Feed */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Recent Workstation Activations</span>
        </h3>

        {stats?.recentActivations && stats.recentActivations.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {stats.recentActivations.map((act) => (
              <div key={act.id} className="py-3.5 flex justify-between items-center text-xs">
                <div>
                  <span className="font-mono text-cyan-400 font-semibold">{act.deviceId}</span>
                  <span className="text-slate-500 ml-2">activated on license #{act.licenseId}</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">
                  {new Date(act.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-slate-500 py-6 text-center">
            No recent activations recorded yet.
          </div>
        )}
      </div>
    </div>
  );
};
