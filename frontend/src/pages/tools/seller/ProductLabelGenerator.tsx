import React, { useState, useEffect, useRef } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Printer, Download, Tag, QrCode as QrIcon } from 'lucide-react';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

type LabelTemplate = 'product' | 'shipping' | 'sku' | 'barcode' | 'thermal4x6';
type PaperSize = 'a4' | 'a5' | 'thermal';

export default function ProductLabelGenerator() {
  const [template, setTemplate] = useState<LabelTemplate>('product');
  const [paperSize, setPaperSize] = useState<PaperSize>('thermal');
  
  const [brand, setBrand] = useState('MONTY GENIUS');
  const [product, setProduct] = useState('Premium Cotton T-Shirt');
  const [sku, setSku] = useState('MG-TSHIRT-BLK-M');
  const [price, setPrice] = useState('499');
  const [mrp, setMrp] = useState('999');
  const [gstin, setGstin] = useState('27AAAAA0000A1Z5');
  const [contact, setContact] = useState('support@montygenius.com');
  const [barcodeVal, setBarcodeVal] = useState('890123456789');
  
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const barcodeSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Generate Barcode
    if (barcodeSvgRef.current && barcodeVal) {
      try {
        JsBarcode(barcodeSvgRef.current, barcodeVal, {
          format: 'CODE128',
          width: 1.5,
          height: 40,
          displayValue: true,
          font: 'monospace',
          fontSize: 12,
          margin: 4
        });
      } catch (e) {
        console.warn('Barcode render error', e);
      }
    }

    // Generate QR
    QRCode.toDataURL(sku || product, { width: 100, margin: 1 })
      .then(setQrDataUrl)
      .catch(console.warn);
  }, [barcodeVal, sku, product]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      // 4x6 thermal in points: 4 * 72 = 288, 6 * 72 = 432
      const page = pdfDoc.addPage(paperSize === 'thermal' ? [288, 432] : paperSize === 'a5' ? [420, 595] : [595, 842]);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

      page.drawText(brand.toUpperCase(), { x: 20, y: 390, size: 16, font, color: rgb(0, 0, 0) });
      page.drawText(product, { x: 20, y: 365, size: 13, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
      page.drawText(`SKU: ${sku}`, { x: 20, y: 340, size: 10, font: fontRegular, color: rgb(0.3, 0.3, 0.3) });
      page.drawText(`MRP: Rs. ${mrp}`, { x: 20, y: 315, size: 11, font: fontRegular, color: rgb(0.5, 0.5, 0.5) });
      page.drawText(`Offer Price: Rs. ${price}`, { x: 20, y: 295, size: 15, font, color: rgb(0, 0, 0) });
      page.drawText(`GSTIN: ${gstin}`, { x: 20, y: 270, size: 9, font: fontRegular, color: rgb(0.4, 0.4, 0.4) });
      page.drawText(`Support: ${contact}`, { x: 20, y: 250, size: 9, font: fontRegular, color: rgb(0.4, 0.4, 0.4) });

      if (qrDataUrl) {
        const qrImage = await pdfDoc.embedPng(qrDataUrl);
        page.drawImage(qrImage, { x: 180, y: 280, width: 80, height: 80 });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      saveAs(blob, `label_${sku || 'product'}.pdf`);
    } catch (e) {
      console.error(e);
      alert('Error generating PDF label');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      <ToolHeader 
        title="Product Label Generator" 
        description="Design and export printable thermal and standard product labels with live barcodes, QR codes, and GST info." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Form */}
        <div className="lg:col-span-6 space-y-4 print:hidden">
          <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Label Configuration</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Template"
                value={template}
                onChange={e => setTemplate(e.target.value as LabelTemplate)}
                options={[
                  { value: 'product', label: 'Product Retail Label' },
                  { value: 'sku', label: 'SKU Inventory Label' },
                  { value: 'shipping', label: 'Shipping Package Tag' },
                  { value: 'barcode', label: 'Pure Barcode Label' },
                ]}
              />
              <Select
                label="Paper Standard"
                value={paperSize}
                onChange={e => setPaperSize(e.target.value as PaperSize)}
                options={[
                  { value: 'thermal', label: 'Thermal 4x6 / 50x75mm' },
                  { value: 'a4', label: 'A4 Sheet' },
                  { value: 'a5', label: 'A5 Sheet' },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input label="Brand Name" value={brand} onChange={e => setBrand(e.target.value)} />
              <Input label="SKU" value={sku} onChange={e => setSku(e.target.value)} />
            </div>

            <Input label="Product Name" value={product} onChange={e => setProduct(e.target.value)} />

            <div className="grid grid-cols-2 gap-3">
              <Input label="Selling Price (₹)" value={price} onChange={e => setPrice(e.target.value)} />
              <Input label="MRP (₹)" value={mrp} onChange={e => setMrp(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input label="GSTIN" value={gstin} onChange={e => setGstin(e.target.value)} />
              <Input label="Barcode Data" value={barcodeVal} onChange={e => setBarcodeVal(e.target.value)} />
            </div>

            <Input label="Contact / Support" value={contact} onChange={e => setContact(e.target.value)} />

            <div className="pt-2 flex gap-3">
              <Button onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />}>
                Print Label
              </Button>
              <Button variant="outline" onClick={handleExportPDF} leftIcon={<Download className="w-4 h-4" />}>
                Export PDF
              </Button>
            </div>
          </Card>
        </div>

        {/* Live Label Preview */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <Card className="p-6 w-full border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 print:hidden">
              Print Preview
            </h3>

            {/* Actual Printable Label Box */}
            <div className="w-full max-w-sm bg-white text-black p-6 rounded-lg border-2 border-black shadow-md print:shadow-none print:border-none print:p-0">
              <div className="border-b-2 border-black pb-2 mb-3 flex justify-between items-start">
                <div>
                  <h2 className="font-extrabold text-lg uppercase tracking-wider">{brand}</h2>
                  <p className="text-xs text-gray-700 font-mono">GSTIN: {gstin}</p>
                </div>
                {qrDataUrl && (
                  <img src={qrDataUrl} alt="QR" className="w-14 h-14 border border-gray-300 p-0.5" />
                )}
              </div>

              <div className="mb-3">
                <p className="font-bold text-base leading-tight">{product}</p>
                <p className="text-xs font-mono text-gray-800 mt-1">SKU: <strong>{sku}</strong></p>
              </div>

              <div className="flex justify-between items-baseline bg-gray-100 p-2 rounded mb-3">
                <div>
                  <span className="text-xs text-gray-500 line-through">MRP: ₹{mrp}</span>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-600 mr-1">Offer Price:</span>
                  <span className="text-xl font-black">₹{price}</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center pt-1 border-t border-gray-300">
                <svg ref={barcodeSvgRef} className="max-w-full"></svg>
              </div>

              <div className="text-[10px] text-gray-500 text-center mt-2 border-t pt-1">
                Customer Support: {contact}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
