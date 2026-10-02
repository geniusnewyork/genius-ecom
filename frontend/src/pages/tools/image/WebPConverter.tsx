import React, { useState, useRef } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export default function WebPConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(0.8);
  const [format, setFormat] = useState<'image/webp' | 'image/jpeg' | 'image/png'>('image/webp');
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
      ctx.drawImage(img, 0, 0);
      setDownloadUrl(canvas.toDataURL(format, quality));
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToolHeader title="WebP Converter" description="Convert images to and from WebP format." />
      <Card className="p-6">
        <input type="file" accept="image/*" onChange={handleFileSelect} className="mb-4" />
        {file && (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Target Format</label>
              <select value={format} onChange={(e) => setFormat(e.target.value as any)} className="border rounded p-2">
                <option value="image/webp">WebP</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">Quality: {Math.round(quality * 100)}%</label>
              <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full" />
            </div>
            <Button onClick={convert}>Convert</Button>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {downloadUrl && (
              <div>
                <a href={downloadUrl} download={`converted.${format.split('/')[1]}`}>
                  <Button variant="outline">Download Converted Image</Button>
                </a>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
