import React, { useState } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Card } from '../../../components/ui/Card';

const hsnData = [
  { code: '6109', desc: 'T-shirts, singlets and other vests, knitted or crocheted', gst: '5%' },
  { code: '6203', desc: 'Men\'s or boys\' suits, ensembles, jackets, blazers, trousers', gst: '12%' },
  { code: '8517', desc: 'Smartphones and mobile phones', gst: '18%' },
  { code: '8523', desc: 'Discs, tapes, solid-state non-volatile storage devices (Pendrives)', gst: '18%' },
  { code: '6403', desc: 'Footwear with outer soles of rubber, plastics, leather', gst: '18%' },
  { code: '3304', desc: 'Beauty or make-up preparations and skin care', gst: '18%' },
  { code: '3924', desc: 'Tableware, kitchenware, other household articles of plastics', gst: '18%' },
  { code: '4202', desc: 'Trunks, suit-cases, vanity-cases, executive-cases, brief-cases', gst: '28%' },
  { code: '9102', desc: 'Wrist-watches, pocket-watches', gst: '18%' },
  { code: '9503', desc: 'Tricycles, scooters, pedal cars and similar toys', gst: '12%' }
];

export default function HSNHelper() {
  const [search, setSearch] = useState('');
  
  const filtered = hsnData.filter(h => 
    h.code.includes(search) || h.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToolHeader title="HSN Code Helper" description="Find common HSN codes and GST rates for e-commerce." />
      <p className="text-sm text-red-500 mb-4">Disclaimer: Information provided is for reference only. Always verify with official tax authorities.</p>
      
      <Card className="p-6">
        <input 
          type="text" 
          placeholder="Search by HSN code or description..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded p-3 mb-6"
        />
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b">
              <tr>
                <th className="py-2">HSN Code</th>
                <th className="py-2">Description</th>
                <th className="py-2">GST Rate</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-3 font-medium">{item.code}</td>
                  <td className="py-3">{item.desc}</td>
                  <td className="py-3">{item.gst}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-500">No matching HSN codes found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
