import { useState, useCallback } from 'react';

interface FileProcessorOptions {
  maxSizeMB?: number;
  allowedTypes?: string[];
}

export const useFileProcessor = (options: FileProcessorOptions = {}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { maxSizeMB = 5, allowedTypes = [] } = options;

  const processFile = useCallback((selectedFile: File) => {
    setError(null);
    setIsProcessing(true);

    if (maxSizeMB && selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      setIsProcessing(false);
      return false;
    }

    if (allowedTypes.length > 0 && !allowedTypes.includes(selectedFile.type)) {
      setError(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
      setIsProcessing(false);
      return false;
    }

    setFile(selectedFile);
    setIsProcessing(false);
    return true;
  }, [maxSizeMB, allowedTypes]);

  const clearFile = useCallback(() => {
    setFile(null);
    setError(null);
  }, []);

  return { file, error, isProcessing, processFile, clearFile };
};
