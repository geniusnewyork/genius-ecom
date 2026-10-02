import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { FileUploader } from '../../../components/ui/FileUploader';
import { ToolHeader } from '../../../components/ui/ToolHeader';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { downloadBlob } from '../../../utils/download';
import { Input } from '../../../components/ui/Input';

export default function SKUGenerator() {
  const [prefix, setPrefix] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [startNum, setStartNum] = useState(1);
  const [count, setCount] = useState(1);
  const [separator, setSeparator] = useState('-');
  const [padding, setPadding] = useState(3);
  const [results, setResults] = useState<string[]>([]);

  const generateSKUs = () => {
    const generated = [];
    for (let i = 0; i < count; i++) {
      const parts = [];
      if (prefix) parts.push(prefix);
      if (category) parts.push(category);
      if (color) parts.push(color);
      if (size) parts.push(size);
      
      const numStr = String(startNum + i).padStart(padding, '0');
      parts.push(numStr);
      
      generated.push(parts.join(separator));
    }
    setResults(generated);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(results.join('\n'));
    alert('Copied to clipboard');
  };

  const downloadCSV = () => {
    const csv = 'SKU\n' + results.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'skus.csv');
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <ToolHeader title="SKU Generator" description="Generate customizable SKUs for your products locally." />
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm mb-1">Prefix</label><Input value={prefix} onChange={e => setPrefix(e.target.value)} placeholder="e.g. MG" /></div>
          <div><label className="block text-sm mb-1">Category</label><Input value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. SHOE" /></div>
          <div><label className="block text-sm mb-1">Color</label><Input value={color} onChange={e => setColor(e.target.value)} placeholder="e.g. BLK" /></div>
          <div><label className="block text-sm mb-1">Size</label><Input value={size} onChange={e => setSize(e.target.value)} placeholder="e.g. 42" /></div>
          <div><label className="block text-sm mb-1">Separator</label>
            <select className="w-full border p-2 rounded" value={separator} onChange={e => setSeparator(e.target.value)}>
              <option value="-">Hyphen (-)</option>
              <option value="_">Underscore (_)</option>
              <option value=".">Dot (.)</option>
              <option value="">None</option>
            </select>
          </div>
          <div><label className="block text-sm mb-1">Start Number</label><Input type="number" value={startNum} onChange={e => setStartNum(Number(e.target.value))} /></div>
          <div><label className="block text-sm mb-1">Number Padding</label><Input type="number" value={padding} onChange={e => setPadding(Number(e.target.value))} /></div>
          <div><label className="block text-sm mb-1">Quantity to Generate</label><Input type="number" value={count} onChange={e => setCount(Number(e.target.value))} /></div>
        </div>
        <Button className="mt-6 w-full" onClick={generateSKUs}>Generate SKUs</Button>
      </Card>

      {results.length > 0 && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Generated SKUs</h3>
            <div className="space-x-2">
              <Button variant="outline" onClick={copyToClipboard}>Copy All</Button>
              <Button onClick={downloadCSV}>Download CSV</Button>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded max-h-64 overflow-y-auto font-mono text-sm">
            {results.map((r, i) => <div key={i}>{r}</div>)}
          </div>
        </Card>
      )}
    </div>
  );
}

