import React, { useState, useRef, useEffect } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export default function ImageCropper() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cropBox, setCropBox] = useState({ x: 50, y: 50, w: 200, h: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => setImage(img);
      setDownloadUrl(null);
    }
  };

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')!;
      canvas.width = Math.min(image.width, 800);
      canvas.height = (image.height / image.width) * canvas.width;
      
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, cropBox.y);
        ctx.fillRect(0, cropBox.y + cropBox.h, canvas.width, canvas.height - cropBox.y - cropBox.h);
        ctx.fillRect(0, cropBox.y, cropBox.x, cropBox.h);
        ctx.fillRect(cropBox.x + cropBox.w, cropBox.y, canvas.width - cropBox.x - cropBox.w, cropBox.h);
        
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.strokeRect(cropBox.x, cropBox.y, cropBox.w, cropBox.h);
      };
      draw();
    }
  }, [image, cropBox]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCropBox(prev => ({
      ...prev,
      x: Math.min(Math.max(0, x - prev.w/2), canvasRef.current!.width - prev.w),
      y: Math.min(Math.max(0, y - prev.h/2), canvasRef.current!.height - prev.h)
    }));
  };

  const crop = () => {
    if (!image || !canvasRef.current) return;
    const scaleX = image.width / canvasRef.current.width;
    const scaleY = image.height / canvasRef.current.height;
    
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = cropBox.w * scaleX;
    cropCanvas.height = cropBox.h * scaleY;
    const ctx = cropCanvas.getContext('2d')!;
    
    ctx.drawImage(
      image,
      cropBox.x * scaleX, cropBox.y * scaleY, cropBox.w * scaleX, cropBox.h * scaleY,
      0, 0, cropCanvas.width, cropCanvas.height
    );
    
    setDownloadUrl(cropCanvas.toDataURL('image/png'));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToolHeader title="Image Cropper" description="Crop images interactively." />
      <Card className="p-6">
        <input type="file" accept="image/*" onChange={handleFileSelect} className="mb-4" />
        {image && (
          <div className="space-y-4">
            <div 
              onMouseDown={handleMouseDown} 
              onMouseUp={handleMouseUp} 
              onMouseMove={handleMouseMove} 
              onMouseLeave={handleMouseUp}
              className="cursor-move inline-block bg-gray-100"
            >
              <canvas ref={canvasRef} />
            </div>
            <div className="flex space-x-2">
              <Button onClick={crop}>Crop Image</Button>
            </div>
            {downloadUrl && (
              <div>
                <a href={downloadUrl} download="cropped.png">
                  <Button variant="outline">Download Cropped</Button>
                </a>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
