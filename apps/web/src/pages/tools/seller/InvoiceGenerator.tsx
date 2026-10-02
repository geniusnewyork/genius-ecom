import React, { useState, useEffect } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Printer, Download, Plus, Trash2, Save, FileText, Check } from 'lucide-react';
import { formatCurrency } from '../../../utils/format';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

interface InvoiceItem {
  product: string;
  sku: string;
  qty: number;
  price: number;
  discount: number;
  gst: number;
}

export default function InvoiceGenerator() {
  const [sellerName, setSellerName] = useState('MONTY ENTERPRISES');
  const [sellerGstin, setSellerGstin] = useState('27AAAAA0000A1Z5');
  const [sellerAddress, setSellerAddress] = useState('123 Commerce Park, Mumbai, MH');
  const [buyerName, setBuyerName] = useState('Retail Customer');
  const [buyerAddress, setBuyerAddress] = useState('456 Market Lane, Pune, MH');
  const [invoiceNumber, setInvoiceNumber] = useState('MG-INV-2026-001');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [items, setItems] = useState<InvoiceItem[]>([
    { product: 'Cotton Casual Shirt', sku: 'MG-SHIRT-01', qty: 2, price: 599, discount: 50, gst: 12 },
    { product: 'Wireless Mouse', sku: 'MG-ACC-99', qty: 1, price: 349, discount: 0, gst: 18 }
  ]);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mg_invoice_template');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.sellerName) setSellerName(parsed.sellerName);
        if (parsed.sellerGstin) setSellerGstin(parsed.sellerGstin);
        if (parsed.sellerAddress) setSellerAddress(parsed.sellerAddress);
      }
    } catch (e) {
      console.warn('Storage read failed', e);
    }
  }, []);

  const saveSellerTemplate = () => {
    try {
      localStorage.setItem('mg_invoice_template', JSON.stringify({
        sellerName, sellerGstin, sellerAddress
      }));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (e) {
      console.warn('Storage save failed', e);
    }
  };

  const addItem = () => {
    setItems([...items, { product: '', sku: '', qty: 1, price: 0, discount: 0, gst: 18 }]);
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, it) => acc + (it.qty * it.price) - it.discount, 0);
  };

  const calculateTotalGST = () => {
    return items.reduce((acc, it) => {
      const taxable = (it.qty * it.price) - it.discount;
      return acc + (taxable * (it.gst / 100));
    }, 0);
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateTotalGST();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]); // A4
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

      page.drawText('TAX INVOICE', { x: 40, y: 800, size: 20, font: fontBold });
      page.drawText(`Invoice #: ${invoiceNumber}`, { x: 400, y: 800, size: 10, font: fontBold });
      page.drawText(`Date: ${invoiceDate}`, { x: 400, y: 785, size: 10, font: fontRegular });

      // Seller
      page.drawText('Sold By:', { x: 40, y: 760, size: 10, font: fontBold });
      page.drawText(sellerName, { x: 40, y: 745, size: 11, font: fontRegular });
      page.drawText(`GSTIN: ${sellerGstin}`, { x: 40, y: 730, size: 9, font: fontRegular });
      page.drawText(sellerAddress, { x: 40, y: 715, size: 9, font: fontRegular });

      // Buyer
      page.drawText('Billed To:', { x: 320, y: 760, size: 10, font: fontBold });
      page.drawText(buyerName, { x: 320, y: 745, size: 11, font: fontRegular });
      page.drawText(buyerAddress, { x: 320, y: 730, size: 9, font: fontRegular });

      // Table Header
      let y = 670;
      page.drawText('Item / SKU', { x: 40, y, size: 9, font: fontBold });
      page.drawText('Qty', { x: 260, y, size: 9, font: fontBold });
      page.drawText('Price', { x: 310, y, size: 9, font: fontBold });
      page.drawText('Disc', { x: 370, y, size: 9, font: fontBold });
      page.drawText('GST %', { x: 420, y, size: 9, font: fontBold });
      page.drawText('Total', { x: 480, y, size: 9, font: fontBold });

      page.drawLine({
        start: { x: 40, y: y - 5 },
        end: { x: 550, y: y - 5 },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7)
      });

      y -= 25;
      items.forEach(it => {
        const taxable = (it.qty * it.price) - it.discount;
        const total = taxable + (taxable * (it.gst / 100));

        page.drawText(`${it.product} (${it.sku})`, { x: 40, y, size: 9, font: fontRegular });
        page.drawText(`${it.qty}`, { x: 260, y, size: 9, font: fontRegular });
        page.drawText(`${it.price.toFixed(2)}`, { x: 310, y, size: 9, font: fontRegular });
        page.drawText(`${it.discount.toFixed(2)}`, { x: 370, y, size: 9, font: fontRegular });
        page.drawText(`${it.gst}%`, { x: 420, y, size: 9, font: fontRegular });
        page.drawText(`Rs.${total.toFixed(2)}`, { x: 480, y, size: 9, font: fontRegular });
        y -= 20;
      });

      y -= 10;
      page.drawLine({
        start: { x: 40, y },
        end: { x: 550, y },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7)
      });

      y -= 25;
      page.drawText(`Subtotal: Rs. ${calculateSubtotal().toFixed(2)}`, { x: 380, y, size: 10, font: fontRegular });
      y -= 15;
      page.drawText(`GST Amount: Rs. ${calculateTotalGST().toFixed(2)}`, { x: 380, y, size: 10, font: fontRegular });
      y -= 20;
      page.drawText(`Grand Total: Rs. ${calculateGrandTotal().toFixed(2)}`, { x: 380, y, size: 12, font: fontBold });

      page.drawText('Disclaimer: Verify invoice requirements with your tax professional.', {
        x: 40, y: 50, size: 8, font: fontRegular, color: rgb(0.5, 0.5, 0.5)
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      saveAs(blob, `invoice_${invoiceNumber}.pdf`);
    } catch (e) {
      console.error(e);
      alert('Error generating PDF invoice');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <ToolHeader 
        title="GST Invoice Generator" 
        description="Quickly draft, customize, and print GST-ready commercial invoices with local template storage." 
      />

      <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-800 dark:text-amber-300 text-xs print:hidden">
        <strong>Notice:</strong> Verify invoice requirements with your tax professional. This software is designed for estimates, drafting, and internal recordkeeping.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Form */}
        <div className="lg:col-span-5 space-y-4 print:hidden">
          <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Seller Details</h3>
              <Button size="sm" variant="ghost" onClick={saveSellerTemplate} leftIcon={savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Save className="w-3.5 h-3.5" />}>
                {savedSuccess ? 'Saved' : 'Save as Default'}
              </Button>
            </div>
            
            <Input label="Business / Seller Name" value={sellerName} onChange={e => setSellerName(e.target.value)} />
            <Input label="GSTIN" value={sellerGstin} onChange={e => setSellerGstin(e.target.value)} />
            <Input label="Address" value={sellerAddress} onChange={e => setSellerAddress(e.target.value)} />
          </Card>

          <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Invoice & Buyer Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Invoice Number" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} />
              <Input label="Date" type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} />
            </div>
            <Input label="Buyer Name" value={buyerName} onChange={e => setBuyerName(e.target.value)} />
            <Input label="Buyer Address" value={buyerAddress} onChange={e => setBuyerAddress(e.target.value)} />
          </Card>

          <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Invoice Line Items</h3>
              <Button size="sm" variant="outline" onClick={addItem} leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Add Item
              </Button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((it, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex gap-2">
                    <input
                      className="flex-1 p-1.5 border rounded bg-white dark:bg-slate-800"
                      placeholder="Product Description"
                      value={it.product}
                      onChange={e => updateItem(idx, 'product', e.target.value)}
                    />
                    <input
                      className="w-24 p-1.5 border rounded bg-white dark:bg-slate-800 font-mono"
                      placeholder="SKU"
                      value={it.sku}
                      onChange={e => updateItem(idx, 'sku', e.target.value)}
                    />
                    <button onClick={() => removeItem(idx)} className="text-rose-500 hover:text-rose-700 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-500">Qty</span>
                      <input
                        type="number"
                        className="w-full p-1.5 border rounded bg-white dark:bg-slate-800"
                        value={it.qty}
                        onChange={e => updateItem(idx, 'qty', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Price (₹)</span>
                      <input
                        type="number"
                        className="w-full p-1.5 border rounded bg-white dark:bg-slate-800"
                        value={it.price}
                        onChange={e => updateItem(idx, 'price', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Disc (₹)</span>
                      <input
                        type="number"
                        className="w-full p-1.5 border rounded bg-white dark:bg-slate-800"
                        value={it.discount}
                        onChange={e => updateItem(idx, 'discount', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">GST %</span>
                      <input
                        type="number"
                        className="w-full p-1.5 border rounded bg-white dark:bg-slate-800"
                        value={it.gst}
                        onChange={e => updateItem(idx, 'gst', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex gap-3">
              <Button onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />}>
                Print Invoice
              </Button>
              <Button variant="outline" onClick={handleExportPDF} leftIcon={<Download className="w-4 h-4" />}>
                Export PDF
              </Button>
            </div>
          </Card>
        </div>

        {/* Live Printable Preview */}
        <div className="lg:col-span-7">
          <Card className="p-8 bg-white text-slate-900 border-slate-300 shadow-md print:shadow-none print:border-none print:p-0">
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6">
              <div>
                <h1 className="text-2xl font-black tracking-tight uppercase">TAX INVOICE</h1>
                <p className="text-xs font-mono text-slate-600 mt-1">Invoice #: {invoiceNumber}</p>
                <p className="text-xs font-mono text-slate-600">Date: {invoiceDate}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
                  MONTY GENIUS FORMAT
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 text-xs mb-6">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <p className="font-bold text-slate-500 uppercase tracking-wider mb-1">Sold By</p>
                <p className="font-extrabold text-sm">{sellerName}</p>
                <p className="font-mono mt-0.5">GSTIN: {sellerGstin}</p>
                <p className="text-slate-600 mt-1">{sellerAddress}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <p className="font-bold text-slate-500 uppercase tracking-wider mb-1">Billed To</p>
                <p className="font-extrabold text-sm">{buyerName}</p>
                <p className="text-slate-600 mt-1">{buyerAddress}</p>
              </div>
            </div>

            {/* Line items table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs text-left">
                <thead className="border-b-2 border-slate-800 text-slate-700">
                  <tr>
                    <th className="py-2">Item & SKU</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Unit Price</th>
                    <th className="py-2 text-right">Discount</th>
                    <th className="py-2 text-center">GST</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {items.map((it, idx) => {
                    const taxable = (it.qty * it.price) - it.discount;
                    const tax = taxable * (it.gst / 100);
                    const total = taxable + tax;
                    return (
                      <tr key={idx}>
                        <td className="py-2.5">
                          <p className="font-medium">{it.product || 'Custom Item'}</p>
                          <p className="text-[10px] font-mono text-slate-400">{it.sku}</p>
                        </td>
                        <td className="py-2.5 text-center">{it.qty}</td>
                        <td className="py-2.5 text-right font-mono">₹{it.price.toFixed(2)}</td>
                        <td className="py-2.5 text-right font-mono text-slate-500">-₹{it.discount.toFixed(2)}</td>
                        <td className="py-2.5 text-center font-mono">{it.gst}%</td>
                        <td className="py-2.5 text-right font-bold font-mono">₹{total.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="flex justify-end pt-4 border-t-2 border-slate-800">
              <div className="w-64 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Taxable Subtotal:</span>
                  <span className="font-mono">₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total GST:</span>
                  <span className="font-mono">₹{calculateTotalGST().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold border-t border-slate-300 pt-1.5">
                  <span>Grand Total:</span>
                  <span className="font-mono text-cyan-700">₹{calculateGrandTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-400 text-center">
              Verify invoice requirements with your tax professional. Generated via Monty Genius Ecom Tools.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
