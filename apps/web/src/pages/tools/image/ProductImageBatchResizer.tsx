import React, { useState } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function ProductImageBatchResizer() {
  const [files, setFiles] = useState<File[]>([]);
  const [width, setWidth] = useState(800);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const processBatch = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    const zip = new JSZip();
    
    for (const file of files) {
      await new Promise<void>((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const scale = width / img.width;
          canvas.width = width;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d')!;
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
          const base64 = dataUrl.split(',')[1];
          zip.file(`resized_${file.name.replace(/\.[^/.]+$/, "")}.jpg`, base64, {base64: true});
          resolve();
        };
      });
    }
    
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'resized_images.zip');
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToolHeader title="Product Image Batch Resizer" description="Resize multiple images maintaining aspect ratio." />
      <Card className="p-6">
        <input type="file" accept="image/*" multiple onChange={handleFileSelect} className="mb-4" />
        {files.length > 0 && (
          <div className="space-y-4">
            <p>{files.length} images selected</p>
            <div>
              <label className="block mb-2 font-medium">Target Width (px)</label>
              <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} className="border rounded p-2" min="100" />
            </div>
            <Button onClick={processBatch} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Resize & Download ZIP'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
