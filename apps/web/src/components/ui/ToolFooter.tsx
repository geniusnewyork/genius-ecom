import React from 'react';
import { RotateCcw, Copy, Printer, Download } from 'lucide-react';
import { Button } from './Button';
import { usePrint } from '../../hooks/usePrint';
import { copyToClipboard } from '../../utils/download';
import { useToast } from './Toast';

interface ToolFooterProps {
  onReset?: () => void;
  onCopy?: () => string;
  onDownload?: () => void;
  showPrint?: boolean;
}

export const ToolFooter: React.FC<ToolFooterProps> = ({ onReset, onCopy, onDownload, showPrint = true }) => {
  const { handlePrint } = usePrint();
  const { toast } = useToast();

  const handleCopy = async () => {
    if (onCopy) {
      const text = onCopy();
      const success = await copyToClipboard(text);
      if (success) {
        toast('Copied to clipboard', 'success');
      } else {
        toast('Failed to copy', 'error');
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
      {onReset && (
        <Button variant="outline" onClick={onReset} leftIcon={<RotateCcw className="w-4 h-4" />}>
          Reset
        </Button>
      )}
      <div className="flex-1" />
      {onCopy && (
        <Button variant="secondary" onClick={handleCopy} leftIcon={<Copy className="w-4 h-4" />}>
          Copy Results
        </Button>
      )}
      {showPrint && (
        <Button variant="secondary" onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />}>
          Print
        </Button>
      )}
      {onDownload && (
        <Button variant="primary" onClick={onDownload} leftIcon={<Download className="w-4 h-4" />}>
          Download
        </Button>
      )}
    </div>
  );
};

export default ToolFooter;
