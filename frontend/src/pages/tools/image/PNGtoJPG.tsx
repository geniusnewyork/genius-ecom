import React, { useState, useRef } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export default function PNGtoJPG() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(0.8);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setDownloadUrl(null);
    }
  };

  const convert = () => {
    if (!file || !canvasRef.current) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setDownloadUrl(canvas.toDataURL('image/jpeg', quality));
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToolHeader title="PNG to JPG Converter" description="Convert PNG images to JPG with quality control." />
      <Card className="p-6">
        <input type="file" accept="image/png" onChange={handleFileSelect} className="mb-4" />
        {file && (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Quality: {Math.round(quality * 100)}%</label>
              <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full" />
            </div>
            <Button onClick={convert}>Convert</Button>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {downloadUrl && (
              <div>
                <a href={downloadUrl} download={file.name.replace('.png', '.jpg')} className="text-blue-500 underline">
                  <Button variant="outline">Download JPG</Button>
                </a>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
