import React, { useState, useRef, useEffect } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Select } from '../../../components/ui/Select';
import { Input } from '../../../components/ui/Input';
import { Download, Printer, AlertCircle, CheckCircle } from 'lucide-react';
import JsBarcode from 'jsbarcode';
import { downloadText } from '../../../utils/download';

export default function BarcodeGenerator() {
  const [text, setText] = useState('MG12345678');
  const [format, setFormat] = useState('CODE128');
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [displayValue, setDisplayValue] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  const validateInput = (val: string, fmt: string): string | null => {
    if (!val.trim()) return 'Value cannot be empty.';
    if (fmt === 'EAN13') {
      if (!/^\d{12,13}$/.test(val)) return 'EAN-13 requires 12 or 13 digits.';
    } else if (fmt === 'EAN8') {
      if (!/^\d{7,8}$/.test(val)) return 'EAN-8 requires 7 or 8 digits.';
    } else if (fmt === 'UPC') {
      if (!/^\d{11,12}$/.test(val)) return 'UPC-A requires 11 or 12 digits.';
    }
    return null;
  };

  const generateBarcode = () => {
    const validationError = validateInput(text, format);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);

    if (svgRef.current) {
      try {
        JsBarcode(svgRef.current, text, {
          format: format === 'UPC' ? 'UPC' : format,
          width,
          height,
          displayValue,
          fontOptions: 'bold',
          font: 'monospace',
          textMargin: 6,
          margin: 10,
          background: '#ffffff',
          lineColor: '#000000',
          valid: (valid) => {
            if (!valid) setError('Invalid characters or checksum for ' + format);
          }
        });
      } catch (err: any) {
        setError(err.message || 'Failed to render barcode for this input.');
      }
    }
  };

  useEffect(() => {
    generateBarcode();
  }, [text, format, width, height, displayValue]);

  const handleFormatChange = (newFmt: string) => {
    setFormat(newFmt);
    if (newFmt === 'EAN13' && !/^\d{12,13}$/.test(text)) {
      setText('890123456789');
    } else if (newFmt === 'EAN8' && !/^\d{7,8}$/.test(text)) {
      setText('1234567');
    } else if (newFmt === 'UPC' && !/^\d{11,12}$/.test(text)) {
      setText('01234567890');
    } else if (newFmt === 'CODE128' && /^\d+$/.test(text)) {
      setText('MG-SKU-9901');
    }
  };

  const downloadSVG = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    downloadText(`barcode_${format}_${text}.svg`, source);
  };

  const downloadPNG = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));
    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `barcode_${format}_${text}.png`;
      a.click();
    };
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <ToolHeader 
        title="Barcode Generator" 
        description="Create standard Code 128, EAN-13, EAN-8, and UPC-A barcodes with instant client-side rendering." 
      />

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-3 rounded-xl text-amber-800 dark:text-amber-300 text-xs">
        <strong>Important:</strong> Do not generate fake registered product identifiers for commercial marketplaces. Ensure you use authorized GS1 GTINs/UPCs if selling retail items.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6 space-y-4">
          <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Barcode Standard</label>
              <Select
                value={format}
                onChange={e => handleFormatChange(e.target.value)}
                options={[
                  { value: 'CODE128', label: 'Code 128 (Alphanumeric / SKUs / Logistics)' },
                  { value: 'EAN13', label: 'EAN-13 (12 or 13 digits standard retail)' },
                  { value: 'EAN8', label: 'EAN-8 (7 or 8 digits compact retail)' },
                  { value: 'UPC', label: 'UPC-A (11 or 12 digits North America retail)' },
                ]}
              />
            </div>

            <Input
              label="Barcode Value"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter barcode string..."
              error={error || undefined}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Bar Width ({width}px)</label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.5"
                  value={width}
                  onChange={e => setWidth(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Height ({height}px)</label>
                <input
                  type="range"
                  min="50"
                  max="160"
                  step="10"
                  value={height}
                  onChange={e => setHeight(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="display-value"
                checked={displayValue}
                onChange={e => setDisplayValue(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
              />
              <label htmlFor="display-value" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Display human-readable text below barcode
              </label>
            </div>
          </Card>
        </div>

        <div className="md:col-span-6 flex flex-col items-center">
          <Card className="p-6 w-full border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Barcode Output
            </h3>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 min-h-[160px] flex items-center justify-center mb-6 max-w-full overflow-x-auto">
              <svg ref={svgRef} className="max-w-full h-auto"></svg>
            </div>

            {error && (
              <div className="flex items-center text-xs text-rose-500 mb-4">
                <AlertCircle className="w-4 h-4 mr-1 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 w-full">
              <Button 
                onClick={downloadPNG} 
                disabled={Boolean(error)}
                size="sm"
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                PNG
              </Button>
              <Button 
                variant="outline" 
                onClick={downloadSVG} 
                disabled={Boolean(error)}
                size="sm"
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                SVG
              </Button>
              <Button 
                variant="secondary" 
                onClick={handlePrint} 
                disabled={Boolean(error)}
                size="sm"
                leftIcon={<Printer className="w-3.5 h-3.5" />}
              >
                Print
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
