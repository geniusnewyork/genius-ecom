import React, { useState, useCallback } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { Select } from '../../../components/ui/Select';
import { FileUploader } from '../../../components/ui/FileUploader';
import { ToolHeader } from '../../../components/ui/ToolHeader';
import { Toast } from '../../../components/ui/Toast';
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { formatFileSize } from '../../../utils/format';
import { downloadBlob } from '../../../utils/download';

export default function ImageCompressor() {
  const [files, setFiles] = useState<File[]>([]);
  const [compressedFiles, setCompressedFiles] = useState<{file: File, url: string, originalSize: number, newSize: number}[]>([]);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState<number | ''>('');
  const [outputFormat, setOutputFormat] = useState('image/jpeg');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const results = [];
      for (const file of files) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: maxWidth ? Number(maxWidth) : undefined,
          useWebWorker: true,
          fileType: outputFormat,
          initialQuality: quality / 100
        };
        const compressedFile = await imageCompression(file, options);
        results.push({
          file: compressedFile,
          url: URL.createObjectURL(compressedFile),
          originalSize: file.size,
          newSize: compressedFile.size
        });
      }
      setCompressedFiles(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = async () => {
    if (compressedFiles.length === 0) return;
    if (compressedFiles.length === 1) {
      downloadBlob(compressedFiles[0].file, `compressed_${compressedFiles[0].file.name}`);
      return;
    }
    const zip = new JSZip();
    compressedFiles.forEach((cf, i) => {
      zip.file(`compressed_${i}_${cf.file.name}`, cf.file);
    });
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'compressed_images.zip');
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <ToolHeader title="Image Compressor" description="Compress your images locally without quality loss. Your files are processed locally in your browser." />
      <Card className="p-6">
        <FileUploader multiple accept="image/jpeg, image/png, image/webp" onUpload={(f) => setFiles(Array.from(f))} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium mb-1">Quality (1-100)</label>
            <Input type="number" min="1" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Width/Height (px)</label>
            <Input type="number" placeholder="Leave empty for original" value={maxWidth} onChange={(e) => setMaxWidth(e.target.value ? Number(e.target.value) : '')} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Output Format</label>
            <Select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
              <option value="image/jpeg">JPEG</option>
              <option value="image/png">PNG</option>
              <option value="image/webp">WebP</option>
            </Select>
          </div>
        </div>
        
        <Button className="mt-6 w-full" onClick={handleProcess} disabled={files.length === 0 || isProcessing}>
          {isProcessing ? 'Processing...' : 'Compress Images'}
        </Button>
      </Card>

      {compressedFiles.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Results</h3>
          <Button onClick={handleDownloadAll} className="mb-4">Download All</Button>
          <div className="space-y-4">
            {compressedFiles.map((cf, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded">
                <img src={cf.url} alt="Preview" className="h-16 w-16 object-cover" />
                <div className="flex-1 px-4">
                  <p className="font-medium">{cf.file.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(cf.originalSize)} &rarr; {formatFileSize(cf.newSize)} 
                    ({((cf.originalSize - cf.newSize) / cf.originalSize * 100).toFixed(1)}% savings)
                  </p>
                </div>
                <Button variant="outline" onClick={() => downloadBlob(cf.file, cf.file.name)}>Download</Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

