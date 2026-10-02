import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { FileUp, Download } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { FileUploader } from '../../../components/ui/FileUploader';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import { formatFileSize } from '../../../utils/format';

export default function PDFPageExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageRange, setPageRange] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const handleUpload = async (files: File[]) => {
    const f = files[0];
    setFile(f);
    const arrayBuffer = await f.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    setTotalPages(pdfDoc.getPageCount());
  };

  const parseRange = (range: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = range.split(',');
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(n => parseInt(n.trim(), 10));
        if (start && end && start <= end && start >= 1 && end <= maxPages) {
          for (let i = start; i <= end; i++) pages.add(i - 1); // 0-indexed
        }
      } else {
        const num = parseInt(part.trim(), 10);
        if (num && num >= 1 && num <= maxPages) {
          pages.add(num - 1);
        }
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleExtract = async () => {
    if (!file || !pageRange) return;
    setIsProcessing(true);
    
    try {
      const indicesToExtract = parseRange(pageRange, totalPages);
      if (indicesToExtract.length === 0) {
        alert('Invalid page range');
        setIsProcessing(false);
        return;
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();
      
      const copiedPages = await newPdf.copyPages(pdfDoc, indicesToExtract);
      copiedPages.forEach((page) => newPdf.addPage(page));
      
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      saveAs(blob, `extracted_${file.name}`);
    } catch (error) {
      console.error(error);
      alert('Error extracting pages');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
      <ToolHeader title="PDF Page Extractor" description="Extract specific pages from a PDF file." />
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
              <h3 className="text-lg font-semibold mb-4">Pages to Extract</h3>
              <div className="mb-4">
                <label className="block text-sm mb-1">Enter page numbers and/or ranges (e.g. 1, 3, 5-10):</label>
                <Input 
                  type="text" 
                  placeholder={`1-${totalPages}`}
                  value={pageRange} 
                  onChange={e => setPageRange(e.target.value)} 
                />
              </div>

              <Button onClick={handleExtract} disabled={isProcessing || !pageRange} className="w-full">
                {isProcessing ? 'Processing...' : <><Download className="w-4 h-4 mr-2" /> Extract Pages</>}
              </Button>
            </Card>
          </div>
        )}
      </main>
      <ToolFooter />
    </div>
  );
}


