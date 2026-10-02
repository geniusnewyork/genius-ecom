import React, { useState } from 'react';
import { PDFDocument, PageSizes } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { FileUp, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { FileUploader } from '../../../components/ui/FileUploader';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import { formatFileSize } from '../../../utils/format';

export default function ImageToPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles.filter(f => f.type.startsWith('image/'))]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    try {
      const pdfDoc = await PDFDocument.create();
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;
        
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          continue; // skip unsupported
        }
        
        const dims = image.scale(1);
        const page = pdfDoc.addPage([dims.width, dims.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: dims.width,
          height: dims.height,
        });
      }
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      saveAs(blob, 'images_converted.pdf');
    } catch (error) {
      console.error(error);
      alert('Error creating PDF from images');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
      <ToolHeader title="Image to PDF" description="Convert your JPG and PNG images into a PDF document." />
      <main className="flex-1 container mx-auto p-4 max-w-4xl">
        <p className="text-sm text-green-600 mb-4 text-center">
          Your files are processed locally in your browser
        </p>

        <FileUploader accept="image/jpeg, image/png" multiple onUpload={addFiles} />

        {files.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Images ({files.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {files.map((file, i) => (
                <Card key={i} className="p-2 relative group">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center overflow-hidden mb-2">
                    <img src={URL.createObjectURL(file)} alt="preview" className="object-cover w-full h-full" />
                  </div>
                  <p className="text-xs truncate">{file.name}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-red-500 hover:text-red-700" 
                    onClick={() => removeFile(i)}
                  >
                    X
                  </Button>
                </Card>
              ))}
            </div>

            <Button onClick={handleProcess} disabled={isProcessing} className="w-full mt-6">
              {isProcessing ? 'Processing...' : <><FileUp className="w-4 h-4 mr-2" /> Convert to PDF</>}
            </Button>
          </div>
        )}
      </main>
      <ToolFooter />
    </div>
  );
}


