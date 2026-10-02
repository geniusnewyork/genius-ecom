import React, { useEffect, useState } from 'react';
import { CreditCard, Check, Edit2, Save, X } from 'lucide-react';
import type { Plan } from '@monty-genius/shared-types';

export const PlansPage: React.FC<{ token: string }> = ({ token }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editMaxDev, setEditMaxDev] = useState(1);

  const fetchPlans = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/v1/admin/plans', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setPlans(data.plans);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [token]);

  const handleSavePlan = async (plan: Plan) => {
    try {
      const updated = {
        ...plan,
        price: Number(editPrice),
        maxDevices: Number(editMaxDev),
      };

      const res = await fetch(`http://localhost:3001/api/v1/admin/plans/${plan.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });

      const data = await res.json();
      if (data.success) {
        setEditingId(null);
        await fetchPlans();
      }
    } catch (e) {
      alert('Error updating plan');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Product Plans & Pricing Engine</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure commercial tier pricing, device allowances, and feature entitlements dynamically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((p) => {
          const isEditing = editingId === p.id;
          return (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-400 border border-slate-700">
                    {p.id}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-6 min-h-[32px]">{p.description}</p>

                {isEditing ? (
                  <div className="space-y-3 mb-6 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Max Devices</label>
                      <input
                        type="number"
                        value={editMaxDev}
                        onChange={(e) => setEditMaxDev(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="text-3xl font-black text-white">
                      ₹{p.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Up to <strong>{p.maxDevices}</strong> workstation seat(s)
                    </div>
                  </div>
                )}

                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Entitlements ({p.features.length})
                  </span>
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSavePlan(p)}
                      className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(p.id);
                      setEditPrice(p.price);
                      setEditMaxDev(p.maxDevices);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Tier Parameters</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
