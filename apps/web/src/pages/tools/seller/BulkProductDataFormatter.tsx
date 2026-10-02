import React, { useState } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export default function BulkProductDataFormatter() {
  const [data, setData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const rows = text.split('\n').map(r => r.split(','));
      setHeaders(rows[0] || []);
      setData(rows.slice(1).filter(r => r.join('').trim() !== ''));
    };
    reader.readAsText(file);
  };

  const formatData = () => {
    // Example format: uppercase SKUs, Title Case product names
    const skuIdx = headers.findIndex(h => h.toLowerCase().includes('sku'));
    const titleIdx = headers.findIndex(h => h.toLowerCase().includes('title') || h.toLowerCase().includes('name'));
    
    const formatted = data.map(row => {
      const newRow = [...row];
      if (skuIdx !== -1 && newRow[skuIdx]) {
        newRow[skuIdx] = newRow[skuIdx].toUpperCase();
      }
      if (titleIdx !== -1 && newRow[titleIdx]) {
        newRow[titleIdx] = newRow[titleIdx]
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ');
      }
      return newRow;
    });
    setData(formatted);
    alert('Data formatted! SKUs uppercased and Titles title-cased.');
  };

  const download = () => {
    const csv = [headers.join(','), ...data.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_formatted.csv';
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <ToolHeader title="Bulk Product Data Formatter" description="Format standard product fields in CSV." />
      
      <Card className="p-6 mb-6">
        <input type="file" accept=".csv" onChange={handleFileSelect} />
        {headers.length > 0 && (
          <div className="mt-4 flex space-x-2">
            <Button onClick={formatData}>Auto-Format Standard Fields</Button>
            <Button onClick={download} variant="outline">Download CSV</Button>
          </div>
        )}
      </Card>

      {headers.length > 0 && (
        <Card className="p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max text-sm">
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="border p-2 bg-gray-100 dark:bg-gray-800">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 5).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border p-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-gray-500 mt-2 text-xs">Showing first 5 rows.</p>
        </Card>
      )}
    </div>
  );
}
