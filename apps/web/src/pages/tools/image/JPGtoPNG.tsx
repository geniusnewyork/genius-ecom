import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { FileUploader } from '../../../components/ui/FileUploader';
import { ToolHeader } from '../../../components/ui/ToolHeader';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { downloadBlob } from '../../../utils/download';

export default function JPGtoPNG() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<{file: Blob, url: string, name: string}[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const convertImages = async () => {
    setIsProcessing(true);
    const newResults: any[] = [];
    
    for (const file of files) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = url;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const blob = await new Promise<Blob|null>(res => canvas.toBlob(res, 'image/png'));
        if (blob) {
          const newName = file.name.replace(/\.(jpg|jpeg)$/i, '.png');
          newResults.push({
            file: blob,
            url: URL.createObjectURL(blob),
            name: newName
          });
        }
      }
    }
    
    setResults(newResults);
    setIsProcessing(false);
  };

  const handleDownloadAll = async () => {
    if (results.length === 1) {
      downloadBlob(results[0].file, results[0].name);
      return;
    }
    const zip = new JSZip();
    results.forEach(r => zip.file(r.name, r.file));
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'converted_pngs.zip');
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <ToolHeader title="JPG to PNG Converter" description="Convert JPG/JPEG images to PNG format. Your files are processed locally in your browser." />
      <Card className="p-6">
        <FileUploader multiple accept="image/jpeg, image/jpg" onUpload={(f) => setFiles(Array.from(f))} />
        <Button className="mt-6 w-full" onClick={convertImages} disabled={files.length === 0 || isProcessing}>
          {isProcessing ? 'Converting...' : 'Convert to PNG'}
        </Button>
      </Card>

      {results.length > 0 && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Converted Images</h3>
            <Button onClick={handleDownloadAll}>Download All</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((r, i) => (
              <div key={i} className="border p-2 rounded flex flex-col items-center">
                <img src={r.url} alt="Preview" className="max-h-32 object-contain mb-2" />
                <p className="text-xs text-center truncate w-full mb-2">{r.name}</p>
                <Button variant="outline" size="sm" onClick={() => downloadBlob(r.file, r.name)}>Download</Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

