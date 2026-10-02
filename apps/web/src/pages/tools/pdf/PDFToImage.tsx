import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Image as ImageIcon } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { FileUploader } from '../../../components/ui/FileUploader';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';

export default function PDFToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfjsLib, setPdfjsLib] = useState<any>(null);

  useEffect(() => {
    // Dynamic import for pdfjs-dist
    import('pdfjs-dist').then(pdfjs => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      setPdfjsLib(pdfjs);
    }).catch(err => {
      console.error("Failed to load pdfjs-dist", err);
    });
  }, []);

  const handleProcess = async () => {
    if (!file || !pdfjsLib) return;
    setIsProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const zip = new JSZip();

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // Scale for better quality
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({ canvasContext: ctx, viewport }).promise;
        
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
        if (blob) {
          zip.file(`page_${i}.png`, blob);
        }
      }

      const zipContent = await zip.generateAsync({ type: 'blob' });
      saveAs(zipContent, `${file.name.replace('.pdf', '')}_images.zip`);
    } catch (error) {
      console.error(error);
      alert('Error converting PDF to images.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
      <ToolHeader title="PDF to Image" description="Convert your PDF pages to high-quality PNG images." />
      <main className="flex-1 container mx-auto p-4 max-w-4xl">
        <p className="text-sm text-green-600 mb-4 text-center">
          Your files are processed locally in your browser
        </p>

        {!pdfjsLib && (
          <div className="bg-yellow-100 p-4 text-yellow-800 rounded mb-4 text-center">
            Loading PDF engine... please wait.
          </div>
        )}

        {!file ? (
          <FileUploader accept=".pdf" onUpload={(files) => setFile(files[0])} />
        ) : (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold">{file.name}</h3>
              <Button variant="outline" className="mt-2" onClick={() => setFile(null)}>Change File</Button>
            </Card>

            <Card className="p-6">
              <Button onClick={handleProcess} disabled={isProcessing || !pdfjsLib} className="w-full">
                {isProcessing ? 'Processing...' : <><ImageIcon className="w-4 h-4 mr-2" /> Convert to Images (ZIP)</>}
              </Button>
            </Card>
          </div>
        )}
      </main>
      <ToolFooter />
    </div>
  );
}


