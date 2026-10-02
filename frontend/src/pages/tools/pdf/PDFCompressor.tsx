import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Archive, Download } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { FileUploader } from '../../../components/ui/FileUploader';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import { formatFileSize } from '../../../utils/format';

export default function PDFCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      // Load ignoring existing object streams to possibly reduce size
      const pdfDoc = await PDFDocument.load(arrayBuffer, { updateMetadata: false });
      
      // Remove basic metadata
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');

      // Note: true PDF compression (images/fonts) is complex in browser.
      // Saving without object streams using useObjectStreams: false helps sometimes
      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      
      setCompressedSize(pdfBytes.length);
      
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      saveAs(blob, `compressed_${file.name}`);
    } catch (error) {
      console.error(error);
      alert('Error compressing PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
      <ToolHeader title="PDF Compressor" description="Optimize and compress your PDF files." />
      <main className="flex-1 container mx-auto p-4 max-w-4xl">
        <p className="text-sm text-green-600 mb-4 text-center">
          Your files are processed locally in your browser
        </p>

        {!file ? (
          <FileUploader accept=".pdf" onUpload={(files) => { setFile(files[0]); setCompressedSize(null); }} />
        ) : (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold">{file.name}</h3>
              <p className="text-sm text-gray-500 mb-4">Original Size: {formatFileSize(file.size)}</p>
              
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded text-sm mb-4">
                <strong>Note:</strong> Browser-based compression has limitations. It removes metadata and flattens structures, but for heavy image compression, a server-side tool may be needed.
              </div>

              {compressedSize && (
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded text-sm mb-4">
                  Compressed Size: {formatFileSize(compressedSize)} ({( (1 - compressedSize / file.size) * 100 ).toFixed(1)}% savings)
                </div>
              )}

              <div className="flex space-x-4">
                <Button onClick={handleProcess} disabled={isProcessing} className="flex-1">
                  {isProcessing ? 'Processing...' : <><Archive className="w-4 h-4 mr-2" /> Compress PDF</>}
                </Button>
                <Button variant="outline" onClick={() => setFile(null)}>Change File</Button>
              </div>
            </Card>
          </div>
        )}
      </main>
      <ToolFooter />
    </div>
  );
}


