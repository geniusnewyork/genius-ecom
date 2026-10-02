import React from 'react';
import { UploadCloud } from 'lucide-react';

interface DropZoneProps {
  onDrop: (files: FileList) => void;
  accept?: string;
  maxSizeMB?: number;
}

export const DropZone: React.FC<DropZoneProps> = ({ onDrop, accept, maxSizeMB = 5 }) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDrop(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onDrop(e.target.files);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl
        transition-colors cursor-pointer
        ${isDragging 
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
          : 'border-slate-300 dark:border-slate-700 hover:border-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}
      `}
    >
      <input 
        type="file" 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        accept={accept}
        onChange={handleChange}
      />
      <UploadCloud className={`w-12 h-12 mb-4 ${isDragging ? 'text-primary-500' : 'text-slate-400'}`} />
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center">
        {isDragging ? 'Drop it here...' : 'Drag & drop a file here, or click to select'}
      </p>
      <p className="text-xs text-slate-500 mt-2">Maximum file size: {maxSizeMB}MB</p>
    </div>
  );
};
