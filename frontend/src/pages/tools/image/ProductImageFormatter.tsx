import React, { useState, useRef } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function ProductImageFormatter() {
  const [files, setFiles] = useState<File[]>([]);
  const [preset, setPreset] = useState(1000);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [padding, setPadding] = useState(50);
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
          canvas.width = preset;
          canvas.height = preset;
          const ctx = canvas.getContext('2d')!;
          
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          const scale = Math.min(
            (preset - padding * 2) / img.width,
            (preset - padding * 2) / img.height
          );
          
          const w = img.width * scale;
          const h = img.height * scale;
          const x = (preset - w) / 2;
          const y = (preset - h) / 2;
          
          ctx.drawImage(img, x, y, w, h);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
          const base64 = dataUrl.split(',')[1];
          zip.file(`formatted_${file.name.replace(/\.[^/.]+$/, "")}.jpg`, base64, {base64: true});
          resolve();
        };
      });
    }
    
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'formatted_product_images.zip');
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToolHeader title="Product Image Formatter" description="Format product images to square dimensions with padding." />
      <Card className="p-6">
        <input type="file" accept="image/*" multiple onChange={handleFileSelect} className="mb-4" />
        {files.length > 0 && (
          <div className="space-y-4">
            <p>{files.length} images selected</p>
            <div>
              <label className="block mb-2 font-medium">Canvas Size</label>
              <select value={preset} onChange={(e) => setPreset(parseInt(e.target.value))} className="border rounded p-2">
                <option value={800}>800 x 800</option>
                <option value={1000}>1000 x 1000</option>
                <option value={1080}>1080 x 1080</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">Background Color</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="p-1 border rounded" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Padding: {padding}px</label>
              <input type="range" min="0" max="200" value={padding} onChange={(e) => setPadding(parseInt(e.target.value))} className="w-full" />
            </div>
            <Button onClick={processBatch} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Format & Download ZIP'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
