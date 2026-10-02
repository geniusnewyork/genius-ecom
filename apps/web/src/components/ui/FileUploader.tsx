import React, { useCallback, useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect?: (files: File[]) => void;
  onUpload?: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  label?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  onUpload,
  accept,
  maxSize = 52428800,
  multiple = false,
  label,
}) => {
  const handleFileCallback = onFileSelect || onUpload || (() => {});
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const valid = Array.from(files).filter((f) => f.size <= maxSize);
      if (valid.length > 0) handleFileCallback(valid);
    },
    [maxSize, handleFileCallback]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {label}
        </label>
      )}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
              : 'border-slate-300 dark:border-slate-700 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <UploadCloud className="mx-auto h-12 w-12 text-slate-400 mb-4" />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop files here, or click to select'}
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Max file size: {(maxSize / 1024 / 1024).toFixed(0)}MB
        </p>
      </div>
    </div>
  );
};
