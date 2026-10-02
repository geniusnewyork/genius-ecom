import React, { useState } from 'react';
import { PDFDocument, PageSizes } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Layout, Download } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Select } from '../../../components/ui/Select';
import { FileUploader } from '../../../components/ui/FileUploader';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';

export default function PDFLayoutTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [nUp, setNUp] = useState(2); // 2-up, 4-up, etc.

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();
      
      const sourcePages = sourcePdf.getPages();
      const pageCount = sourcePages.length;
      
      const cols = nUp === 2 ? 2 : nUp === 4 ? 2 : nUp === 6 ? 3 : nUp === 8 ? 4 : 2;
      const rows = Math.ceil(nUp / cols);
      
      let newPage = newPdf.addPage(PageSizes.A4);
      const { width, height } = newPage.getSize();
      
      const cellWidth = width / cols;
      const cellHeight = height / rows;
      
      for (let i = 0; i < pageCount; i++) {
        if (i > 0 && i % nUp === 0) {
          newPage = newPdf.addPage(PageSizes.A4);
        }
        
        const embeddedPage = await newPdf.embedPage(sourcePages[i]);
        const dims = embeddedPage.scale(1);
        
        const scale = Math.min(cellWidth / dims.width, cellHeight / dims.height) * 0.9;
        
        const col = i % cols;
        const row = Math.floor((i % nUp) / cols);
        
        const x = col * cellWidth + (cellWidth - dims.width * scale) / 2;
        // Invert Y axis for PDF coordinates (origin bottom-left)
        const y = height - ((row + 1) * cellHeight) + (cellHeight - dims.height * scale) / 2;
        
        newPage.drawPage(embeddedPage, {
          x,
          y,
          xScale: scale,
          yScale: scale,
        });
      }
      
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      saveAs(blob, `layout_${file.name}`);
    } catch (error) {
      console.error(error);
      alert('Error creating layout');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
      <ToolHeader title="PDF Layout (N-up)" description="Arrange multiple pages onto a single sheet." />
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
              <Button variant="outline" className="mt-2" onClick={() => setFile(null)}>Change File</Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Layout Options</h3>
              <div className="mb-4">
                <label className="block text-sm mb-1">Pages per sheet (N-up):</label>
                <select 
                  className="w-full p-2 border rounded dark:bg-gray-800"
                  value={nUp} 
                  onChange={e => setNUp(Number(e.target.value))}
                >
                  <option value={2}>2 pages per sheet</option>
                  <option value={4}>4 pages per sheet</option>
                  <option value={6}>6 pages per sheet</option>
                  <option value={8}>8 pages per sheet</option>
                </select>
              </div>

              <Button onClick={handleProcess} disabled={isProcessing} className="w-full">
                {isProcessing ? 'Processing...' : <><Layout className="w-4 h-4 mr-2" /> Generate Layout PDF</>}
              </Button>
            </Card>
          </div>
        )}
      </main>
      <ToolFooter />
    </div>
  );
}


