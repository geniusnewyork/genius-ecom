import React, { useState, useRef } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export default function ImageBackgroundUtility() {
  const [file, setFile] = useState<File | null>(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [padding, setPadding] = useState(20);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setDownloadUrl(null);
    }
  };

  const process = () => {
    if (!file || !canvasRef.current) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2;
      const ctx = canvas.getContext('2d')!;
      
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, padding, padding);
      
      setDownloadUrl(canvas.toDataURL('image/png'));
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToolHeader title="Image Background Utility" description="Add solid color background and padding to images." />
      <Card className="p-6">
        <input type="file" accept="image/*" onChange={handleFileSelect} className="mb-4" />
        {file && (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Background Color</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="p-1 border rounded" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Padding (px): {padding}</label>
              <input type="range" min="0" max="200" value={padding} onChange={(e) => setPadding(parseInt(e.target.value))} className="w-full" />
            </div>
            <Button onClick={process}>Process Image</Button>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {downloadUrl && (
              <div>
                <a href={downloadUrl} download="with-background.png">
                  <Button variant="outline">Download</Button>
                </a>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
