import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Scissors } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { FileUploader } from '../../../components/ui/FileUploader';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import { formatFileSize } from '../../../utils/format';

export default function PDFSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitEvery, setSplitEvery] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleUpload = async (files: File[]) => {
    const f = files[0];
    setFile(f);
    const arrayBuffer = await f.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    setTotalPages(pdfDoc.getPageCount());
  };

  const handleSplit = async () => {
    if (!file || splitEvery < 1) return;
    setIsProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const total = pdfDoc.getPageCount();
      
      const zip = new JSZip();
      
      for (let i = 0; i < total; i += splitEvery) {
        const end = Math.min(i + splitEvery, total);
        const newPdf = await PDFDocument.create();
        const indices = Array.from({ length: end - i }, (_, idx) => i + idx);
        
        const copiedPages = await newPdf.copyPages(pdfDoc, indices);
        copiedPages.forEach((page) => newPdf.addPage(page));
        
        const pdfBytes = await newPdf.save();
        zip.file(`split_${i + 1}_to_${end}.pdf`, pdfBytes);
      }
      
      const zipContent = await zip.generateAsync({ type: 'blob' });
      saveAs(zipContent, `split_${file.name}.zip`);
    } catch (error) {
      console.error(error);
      alert('Error splitting PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
      <ToolHeader title="PDF Splitter" description="Split a PDF file into multiple smaller PDFs." />
      <main className="flex-1 container mx-auto p-4 max-w-4xl">
        <p className="text-sm text-green-600 mb-4 text-center">
          Your files are processed locally in your browser
        </p>

        {!file ? (
          <FileUploader accept=".pdf" onUpload={handleUpload} />
        ) : (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold">{file.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{formatFileSize(file.size)} • {totalPages} pages</p>
              <Button variant="outline" onClick={() => setFile(null)}>Change File</Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Split Settings</h3>
              <div className="mb-4">
                <label className="block text-sm mb-1">Split every N pages:</label>
                <Input 
                  type="number" 
                  min={1} 
                  max={totalPages}
                  value={splitEvery} 
                  onChange={e => setSplitEvery(Number(e.target.value))} 
                />
              </div>

              <Button onClick={handleSplit} disabled={isProcessing} className="w-full">
                {isProcessing ? 'Processing...' : <><Scissors className="w-4 h-4 mr-2" /> Split and Download ZIP</>}
              </Button>
            </Card>
          </div>
        )}
      </main>
      <ToolFooter />
    </div>
  );
}


