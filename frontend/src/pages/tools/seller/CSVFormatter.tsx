import React, { useState } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export default function CSVFormatter() {
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

  const removeColumn = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
    setData(data.map(row => row.filter((_, i) => i !== index)));
  };

  const download = () => {
    const csv = [headers.join(','), ...data.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.csv';
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <ToolHeader title="CSV Formatter" description="Upload, edit and format CSV files." />
      
      <Card className="p-6 mb-6">
        <input type="file" accept=".csv" onChange={handleFileSelect} />
      </Card>

      {headers.length > 0 && (
        <Card className="p-6 overflow-x-auto">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold">Preview (First 10 rows)</h3>
            <Button onClick={download}>Download CSV</Button>
          </div>
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="border p-2 bg-gray-100 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <input 
                        value={h} 
                        onChange={(e) => {
                          const newHeaders = [...headers];
                          newHeaders[i] = e.target.value;
                          setHeaders(newHeaders);
                        }}
                        className="bg-transparent font-bold w-32"
                      />
                      <button onClick={() => removeColumn(i)} className="text-red-500 text-xs ml-2">X</button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border p-2 text-sm">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
