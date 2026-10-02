import React, { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { RotateCw, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { FileUploader } from '../../../components/ui/FileUploader';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';

export default function PDFRotator() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rotation, setRotation] = useState(0);

  const rotate = (deg: number) => {
    setRotation((prev) => (prev + deg) % 360);
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      
      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + rotation));
      });
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      saveAs(blob, `rotated_${file.name}`);
    } catch (error) {
      console.error(error);
      alert('Error rotating PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
      <ToolHeader title="PDF Rotator" description="Rotate all pages in your PDF file." />
      <main className="flex-1 container mx-auto p-4 max-w-4xl">
        <p className="text-sm text-green-600 mb-4 text-center">
          Your files are processed locally in your browser
        </p>

        {!file ? (
          <FileUploader accept=".pdf" onUpload={(files) => setFile(files[0])} />
        ) : (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold">{file.name}</h3>
              <Button variant="outline" className="mt-2" onClick={() => { setFile(null); setRotation(0); }}>
                Change File
              </Button>
            </Card>

            <Card className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-4">Current Rotation: {rotation}°</h3>
              <div className="flex justify-center space-x-4 mb-6">
                <Button variant="outline" onClick={() => rotate(-90)}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Left 90°
                </Button>
                <Button variant="outline" onClick={() => rotate(90)}>
                  <RotateCw className="w-4 h-4 mr-2" /> Right 90°
                </Button>
              </div>

              <Button onClick={handleProcess} disabled={isProcessing || rotation === 0} className="w-full">
                {isProcessing ? 'Processing...' : 'Apply Rotation & Download'}
              </Button>
            </Card>
          </div>
        )}
      </main>
      <ToolFooter />
    </div>
  );
}


