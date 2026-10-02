import React, { useEffect, useState } from 'react';
import { Laptop, Search, ShieldCheck, PowerOff } from 'lucide-react';

interface DeviceItem {
  id: string;
  licenseId: string;
  deviceIdentifier: string;
  deviceName: string;
  platform: string;
  extensionVersion: string;
  firstSeenAt: string;
  lastSeenAt: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export const DevicesPage: React.FC<{ token: string }> = ({ token }) => {
  const [devices, setDevices] = useState<DeviceItem[]>([]);
  const [search, setSearch] = useState('');

  const fetchDevices = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/v1/admin/devices', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setDevices(data.devices);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [token]);

  const filtered = devices.filter(
    (d) =>
      d.deviceIdentifier.toLowerCase().includes(search.toLowerCase()) ||
      d.deviceName.toLowerCase().includes(search.toLowerCase()) ||
      d.platform.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Connected Devices Explorer</h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor workstation seat installations across user licenses without invasive hardware fingerprinting.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter devices by identifier, name, platform..."
          className="w-full sm:w-80 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Device Installation ID</th>
              <th className="py-3 px-4">Friendly Name</th>
              <th className="py-3 px-4">Platform</th>
              <th className="py-3 px-4">Ext Version</th>
              <th className="py-3 px-4">Last Seen</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filtered.map((d) => (
              <tr key={d.id} className="hover:bg-slate-800/40 transition">
                <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                  {d.deviceIdentifier}
                </td>
                <td className="py-3.5 px-4 text-white font-semibold">
                  {d.deviceName}
                </td>
                <td className="py-3.5 px-4 text-slate-400">
                  {d.platform}
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-300">
                  v{d.extensionVersion || '1.0.0'}
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                  {new Date(d.lastSeenAt).toLocaleString()}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      d.status === 'ACTIVE'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
