import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Crop, Download, FileUp } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { FileUploader } from '../../../components/ui/FileUploader';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import { formatFileSize } from '../../../utils/format';

export default function PDFCropper() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [margins, setMargins] = useState({ top: 10, right: 10, bottom: 10, left: 10 });

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      
      pages.forEach(page => {
        const { width, height } = page.getSize();
        // Convert mm roughly to points (1mm = 2.83465 points)
        const pt = (mm: number) => mm * 2.83465;
        
        page.setCropBox(
          pt(margins.left), 
          pt(margins.bottom), 
          width - pt(margins.left) - pt(margins.right), 
          height - pt(margins.top) - pt(margins.bottom)
        );
      });
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      saveAs(blob, `cropped_${file.name}`);
    } catch (error) {
      console.error(error);
      alert('Error processing PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
      <ToolHeader title="PDF Cropper" description="Crop margins of your PDF files easily." />
      <main className="flex-1 container mx-auto p-4 max-w-4xl">
        <p className="text-sm text-green-600 mb-4 flex items-center justify-center">
          <FileUp className="w-4 h-4 mr-2" /> Your files are processed locally in your browser
        </p>
        
        {!file ? (
          <FileUploader accept=".pdf" onUpload={(files) => setFile(files[0])} />
        ) : (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">{file.name} ({formatFileSize(file.size)})</h3>
              <Button variant="outline" onClick={() => setFile(null)}>Remove</Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Crop Margins (mm)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm mb-1">Top</label>
                  <Input type="number" value={margins.top} onChange={e => setMargins({...margins, top: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm mb-1">Right</label>
                  <Input type="number" value={margins.right} onChange={e => setMargins({...margins, right: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm mb-1">Bottom</label>
                  <Input type="number" value={margins.bottom} onChange={e => setMargins({...margins, bottom: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm mb-1">Left</label>
                  <Input type="number" value={margins.left} onChange={e => setMargins({...margins, left: Number(e.target.value)})} />
                </div>
              </div>

              <Button onClick={handleProcess} disabled={isProcessing} className="w-full">
                {isProcessing ? 'Processing...' : <><Crop className="w-4 h-4 mr-2" /> Crop PDF</>}
              </Button>
            </Card>
          </div>
        )}
      </main>
      <ToolFooter />
    </div>
  );
}


