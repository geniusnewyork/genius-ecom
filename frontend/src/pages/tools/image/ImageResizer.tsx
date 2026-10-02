import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { FileUploader } from '../../../components/ui/FileUploader';
import { ToolHeader } from '../../../components/ui/ToolHeader';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { downloadBlob } from '../../../utils/download';

export default function ImageResizer() {
  const [files, setFiles] = useState<File[]>([]);
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [preserveRatio, setPreserveRatio] = useState(true);
  const [results, setResults] = useState<{file: Blob, url: string, name: string}[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImages = async () => {
    setIsProcessing(true);
    const newResults: any[] = [];
    
    for (const file of files) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = url;
      });

      let targetW = width ? Number(width) : img.width;
      let targetH = height ? Number(height) : img.height;

      if (preserveRatio && width && !height) {
        targetH = (targetW / img.width) * img.height;
      } else if (preserveRatio && height && !width) {
        targetW = (targetH / img.height) * img.width;
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, targetW, targetH);
        const blob = await new Promise<Blob|null>(res => canvas.toBlob(res, file.type));
        if (blob) {
          newResults.push({
            file: blob,
            url: URL.createObjectURL(blob),
            name: `resized_${file.name}`
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
    saveAs(content, 'resized_images.zip');
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <ToolHeader title="Image Resizer" description="Resize images to specific dimensions. Your files are processed locally in your browser." />
      <Card className="p-6">
        <FileUploader multiple accept="image/*" onUpload={(f) => setFiles(Array.from(f))} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium mb-1">Width (px)</label>
            <Input type="number" value={width} onChange={(e) => setWidth(e.target.value ? Number(e.target.value) : '')} placeholder="Auto if empty" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Height (px)</label>
            <Input type="number" value={height} onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')} placeholder="Auto if empty" />
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <input type="checkbox" id="ratio" checked={preserveRatio} onChange={(e) => setPreserveRatio(e.target.checked)} className="mr-2" />
          <label htmlFor="ratio" className="text-sm font-medium">Preserve Aspect Ratio</label>
        </div>
        
        <Button className="mt-6 w-full" onClick={processImages} disabled={files.length === 0 || isProcessing}>
          {isProcessing ? 'Processing...' : 'Resize Images'}
        </Button>
      </Card>

      {results.length > 0 && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Resized Images</h3>
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

