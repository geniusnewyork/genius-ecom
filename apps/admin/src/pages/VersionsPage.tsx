import React, { useEffect, useState } from 'react';
import { GitBranch, Save, ShieldAlert } from 'lucide-react';

export const VersionsPage: React.FC<{ token: string }> = ({ token }) => {
  const [minVer, setMinVer] = useState('1.0.0');
  const [latestVer, setLatestVer] = useState('1.0.0');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/admin/versions', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setMinVer(d.minSupportedVersion || '1.0.0');
          setLatestVer(d.latestVersion || '1.0.0');
        }
      })
      .catch(console.error);
  }, [token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/v1/admin/versions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ minSupportedVersion: minVer, latestVersion: latestVer }),
      });
      const d = await res.json();
      if (d.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      alert('Error updating version config');
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Extension Version Governance</h1>
        <p className="text-xs text-slate-400 mt-1">
          Set backward compatibility boundaries. Extensions below the minimum supported version will politely prompt sellers to update.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5">
              Minimum Supported Version
            </label>
            <input
              type="text"
              required
              value={minVer}
              onChange={(e) => setMinVer(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
              placeholder="1.0.0"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Any extension reporting a version lower than this will be rejected during activation with code <code>UPDATE_REQUIRED</code>.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5">
              Latest Published Version
            </label>
            <input
              type="text"
              required
              value={latestVer}
              onChange={(e) => setLatestVer(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
              placeholder="1.0.0"
            />
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
            >
              <Save className="w-4 h-4" />
              <span>Update Version Policy</span>
            </button>
            {saved && (
              <span className="text-xs text-emerald-400 font-semibold">
                ✅ Version policy updated!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
