import React, { useEffect, useState } from 'react';
import {
  Key,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Calendar,
  Laptop,
  Copy,
  Check,
  Shield
} from 'lucide-react';

interface LicenseItem {
  id: string;
  keyMasked: string;
  planId: string;
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' | 'REVOKED';
  customerName?: string;
  customerEmail?: string;
  createdAt: string;
  expiresAt: string | null;
  maxDevices: number;
  notes?: string;
}

export const LicensesPage: React.FC<{ token: string }> = ({ token }) => {
  const [licenses, setLicenses] = useState<LicenseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [newPlan, setNewPlan] = useState('PRO');
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [durationDays, setDurationDays] = useState(365);
  const [maxDev, setMaxDev] = useState(2);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchLicenses = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/v1/admin/licenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setLicenses(data.licenses);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, [token]);

  const handleCreateLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/v1/admin/licenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId: newPlan,
          customerName: custName,
          customerEmail: custEmail,
          durationDays: Number(durationDays),
          maxDevices: Number(maxDev),
        }),
      });

      const data = await res.json();
      if (data.success && data.license) {
        setGeneratedKey(data.license.plainLicenseKey);
        await fetchLicenses();
      }
    } catch (err) {
      alert('Failed to generate license');
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const reason = prompt(`Enter reason for marking as ${newStatus}:`, 'Admin action');
    if (reason === null) return;

    try {
      const res = await fetch(`http://localhost:3001/api/v1/admin/licenses/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus, reason }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchLicenses();
      }
    } catch (e) {
      alert('Error updating status');
    }
  };

  const handleExtend = async (id: string) => {
    const days = prompt('How many days to extend this license?', '30');
    if (!days || isNaN(Number(days))) return;

    try {
      const res = await fetch(`http://localhost:3001/api/v1/admin/licenses/${id}/extend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ days: Number(days) }),
      });
      const data = await res.json();
      if (data.success) {
        alert('License extended successfully!');
        await fetchLicenses();
      }
    } catch (e) {
      alert('Error extending license');
    }
  };

  const handleResetDevices = async (id: string) => {
    if (!confirm('Disconnect all workstation devices registered to this license seat?')) return;

    try {
      const res = await fetch(`http://localhost:3001/api/v1/admin/licenses/${id}/reset-devices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        alert(`Reset ${data.count} connected devices!`);
      }
    } catch (e) {
      alert('Error resetting devices');
    }
  };

  const filtered = licenses.filter((l) => {
    const matchesSearch =
      (l.keyMasked && l.keyMasked.toLowerCase().includes(search.toLowerCase())) ||
      (l.customerName && l.customerName.toLowerCase().includes(search.toLowerCase())) ||
      (l.customerEmail && l.customerEmail.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">License Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Issue cryptographically secure keys, manage subscription statuses, and reset device limits.
          </p>
        </div>
        <button
          onClick={() => {
            setGeneratedKey(null);
            setShowModal(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New License</span>
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by key, customer, email..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
          {['ALL', 'ACTIVE', 'SUSPENDED', 'EXPIRED', 'REVOKED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                statusFilter === st
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">License Key</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Plan</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Expires</th>
              <th className="py-3 px-4">Seats</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filtered.map((lic) => (
              <tr key={lic.id} className="hover:bg-slate-800/40 transition">
                <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                  {lic.keyMasked}
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-white">{lic.customerName || 'Direct Subscriber'}</div>
                  <div className="text-[11px] text-slate-500">{lic.customerEmail || '-'}</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {lic.planId}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      lic.status === 'ACTIVE'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : lic.status === 'SUSPENDED'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : lic.status === 'REVOKED'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : 'bg-slate-700 text-slate-300 border-slate-600'
                    }`}
                  >
                    {lic.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                  {lic.expiresAt ? new Date(lic.expiresAt).toLocaleDateString() : 'Lifetime'}
                </td>
                <td className="py-3.5 px-4 text-slate-300 font-semibold">
                  {lic.maxDevices} Devices
                </td>
                <td className="py-3.5 px-4 text-right space-x-1.5">
                  <button
                    onClick={() => handleExtend(lic.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                    title="Extend +30 Days"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleResetDevices(lic.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-400 hover:text-purple-300"
                    title="Reset Device Seats"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                  </button>

                  {lic.status === 'ACTIVE' ? (
                    <button
                      onClick={() => handleStatusChange(lic.id, 'SUSPENDED')}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300"
                      title="Suspend"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(lic.id, 'ACTIVE')}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300"
                      title="Reactivate"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => handleStatusChange(lic.id, 'REVOKED')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 hover:text-rose-300"
                    title="Revoke License"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Generate License */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-2">Issue Cryptographic License Key</h2>
            <p className="text-xs text-slate-400 mb-6">
              Generates an original MGPRO / MGBIZ license key with server-side SHA-256 hash storage.
            </p>

            {generatedKey ? (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-2">
                    Plain License Key (Revealed Once)
                  </span>
                  <div className="font-mono font-black text-xl text-white select-all bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {generatedKey}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedKey);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy License Key'}</span>
                  </button>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
                >
                  Done & Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateLicense} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Select Plan</label>
                  <select
                    value={newPlan}
                    onChange={(e) => {
                      setNewPlan(e.target.value);
                      if (e.target.value === 'BUSINESS') setMaxDev(5);
                      else if (e.target.value === 'LIFETIME') {
                        setMaxDev(3);
                        setDurationDays(0);
                      } else setMaxDev(2);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="PRO">Seller Pro (₹499/yr - 2 Devices)</option>
                    <option value="BUSINESS">Business Growth (₹1,499/yr - 5 Devices)</option>
                    <option value="LIFETIME">Lifetime Founder (₹2,999 - 3 Devices)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Customer Name</label>
                    <input
                      type="text"
                      required
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Customer Email</label>
                    <input
                      type="email"
                      required
                      value={custEmail}
                      onChange={(e) => setCustEmail(e.target.value)}
                      placeholder="seller@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Validity (Days, 0 = Lifetime)</label>
                    <input
                      type="number"
                      required
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Max Devices Seat Limit</label>
                    <input
                      type="number"
                      required
                      value={maxDev}
                      onChange={(e) => setMaxDev(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                  >
                    Generate Key
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
