import React, { useState } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export default function CSVCleaner() {
  const [fileContent, setFileContent] = useState<string>('');
  const [cleanedContent, setCleanedContent] = useState<string>('');
  const [stats, setStats] = useState({ rows: 0, empty: 0, duplicates: 0 });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setFileContent(evt.target?.result as string);
      setCleanedContent('');
    };
    reader.readAsText(file);
  };

  const clean = () => {
    const lines = fileContent.split('\n');
    let empty = 0;
    let duplicates = 0;
    const seen = new Set();
    const result = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line || line.split(',').every(c => !c.trim())) {
        empty++;
        continue;
      }
      
      // Clean up multiple spaces
      line = line.replace(/\s+/g, ' ');
      
      if (seen.has(line) && i !== 0) {
        duplicates++;
        continue;
      }
      seen.add(line);
      result.push(line);
    }
    
    setStats({ rows: lines.length, empty, duplicates });
    setCleanedContent(result.join('\n'));
  };

  const download = () => {
    const blob = new Blob([cleanedContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cleaned.csv';
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToolHeader title="CSV Cleaner" description="Remove empty rows and duplicates from CSV." />
      
      <Card className="p-6 mb-6">
        <input type="file" accept=".csv" onChange={handleFileSelect} className="mb-4" />
        {fileContent && (
          <Button onClick={clean}>Clean CSV</Button>
        )}
      </Card>

      {cleanedContent && (
        <Card className="p-6">
          <h3 className="font-bold mb-4">Cleaning Results</h3>
          <ul className="mb-4 text-sm">
            <li>Original Rows: {stats.rows}</li>
            <li>Empty Rows Removed: {stats.empty}</li>
            <li>Duplicates Removed: {stats.duplicates}</li>
            <li>Final Rows: {stats.rows - stats.empty - stats.duplicates}</li>
          </ul>
          <Button onClick={download}>Download Cleaned CSV</Button>
        </Card>
      )}
    </div>
  );
}
