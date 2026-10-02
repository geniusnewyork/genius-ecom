import React, { useState } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export default function ProductDescriptionGenerator() {
  const [data, setData] = useState({
    name: 'Wireless Earbuds',
    benefits: 'Crystal clear sound, 24h battery life, Water resistant',
    specs: 'Bluetooth 5.0, 10m range, USB-C charging',
    boxContents: 'Earbuds, Charging Case, USB Cable, User Manual'
  });

  const generate = () => {
    return `**${data.name}**

Discover the ultimate experience with our premium ${data.name}. Designed for everyday use and built to last.

**Key Benefits:**
${data.benefits.split(',').map(b => `- ${b.trim()}`).join('\n')}

**Specifications:**
${data.specs.split(',').map(s => `- ${s.trim()}`).join('\n')}

**What's in the Box?**
${data.boxContents.split(',').map(c => `- ${c.trim()}`).join('\n')}
`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generate());
    alert('Copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToolHeader title="Product Description Generator" description="Generate structured product descriptions." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div>
            <label className="block mb-1">Product Name</label>
            <input type="text" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block mb-1">Benefits (comma separated)</label>
            <textarea value={data.benefits} onChange={(e) => setData({...data, benefits: e.target.value})} className="w-full border rounded p-2" rows={3} />
          </div>
          <div>
            <label className="block mb-1">Specifications (comma separated)</label>
            <textarea value={data.specs} onChange={(e) => setData({...data, specs: e.target.value})} className="w-full border rounded p-2" rows={3} />
          </div>
          <div>
            <label className="block mb-1">Box Contents (comma separated)</label>
            <textarea value={data.boxContents} onChange={(e) => setData({...data, boxContents: e.target.value})} className="w-full border rounded p-2" rows={3} />
          </div>
        </Card>

        <Card className="p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Preview</h3>
            <Button onClick={copyToClipboard} size="sm">Copy All</Button>
          </div>
          <div className="flex-grow bg-gray-50 dark:bg-gray-900 p-4 rounded whitespace-pre-wrap font-mono text-sm overflow-auto">
            {generate()}
          </div>
        </Card>
      </div>
    </div>
  );
}
