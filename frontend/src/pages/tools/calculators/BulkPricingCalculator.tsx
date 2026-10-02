import React, { useState } from 'react';
import { Upload, Download, Copy, Trash2 } from 'lucide-react';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import ResultCard from '../../../components/ui/ResultCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { formatCurrency, formatPercentage } from '../../../utils/format';
import { downloadCSV, copyToClipboard } from '../../../utils/download';
import { useAppStore } from '../../../store/useAppStore';

interface ProductRow {
  sku: string;
  name: string;
  cost: number;
  shipping: number;
  sellingPrice: number;
  commissionPct: number;
  gstPct: number;
  profit?: number;
  margin?: number;
}

export default function BulkPricingCalculator() {
  const addRecentTool = useAppStore(state => state.addRecentTool);
  React.useEffect(() => {
    addRecentTool('bulk-pricing-calculator');
  }, [addRecentTool]);

  const [data, setData] = useState<ProductRow[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target?.result as string;
      const lines = csv.split('\n');
      const parsed: ProductRow[] = [];
      
      // Skip header row
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const [sku, name, cost, shipping, sellingPrice, commissionPct, gstPct] = lines[i].split(',');
        
        const c = parseFloat(cost) || 0;
        const s = parseFloat(shipping) || 0;
        const sp = parseFloat(sellingPrice) || 0;
        const comm = parseFloat(commissionPct) || 0;
        const gst = parseFloat(gstPct) || 0;

        const commissionAmount = sp * (comm / 100);
        const basePrice = sp / (1 + gst / 100);
        const gstAmount = sp - basePrice;
        const totalCost = c + s + commissionAmount + gstAmount;
        const profit = sp - totalCost;
        const margin = sp > 0 ? (profit / sp) * 100 : 0;

        parsed.push({
          sku: sku || `SKU-${i}`,
          name: name || `Product ${i}`,
          cost: c,
          shipping: s,
          sellingPrice: sp,
          commissionPct: comm,
          gstPct: gst,
          profit,
          margin
        });
      }
      setData(parsed);
    };
    reader.readAsText(file);
  };

  const handleDownloadTemplate = () => {
    const template = "SKU,Product Name,Cost,Shipping,Selling Price,Commission %,GST %\nSKU001,Sample Product,100,50,499,10,18";
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_pricing_template.csv';
    a.click();
  };

  const handleExport = () => {
    if (data.length === 0) return;
    const header = ['SKU', 'Product Name', 'Cost', 'Shipping', 'Selling Price', 'Commission %', 'GST %', 'Profit', 'Margin %'];
    const rows = data.map(r => [r.sku, r.name, r.cost, r.shipping, r.sellingPrice, r.commissionPct, r.gstPct, r.profit?.toFixed(2), r.margin?.toFixed(2)]);
    const csvContent = [header.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_pricing_results.csv';
    a.click();
  };

  const summary = React.useMemo(() => {
    if (data.length === 0) return { revenue: 0, cost: 0, profit: 0, margin: 0 };
    let revenue = 0, cost = 0, profit = 0;
    data.forEach(item => {
      revenue += item.sellingPrice;
      profit += item.profit || 0;
    });
    return {
      revenue,
      cost: revenue - profit,
      profit,
      margin: revenue > 0 ? (profit / revenue) * 100 : 0
    };
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToolHeader title="Bulk Pricing Calculator" description="Process hundreds of products via CSV" />
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        
        <Card>
          <CardContent className="p-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center bg-gray-50 dark:bg-gray-800">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload CSV File</h3>
              <p className="text-sm text-gray-500 mb-4">CSV format: SKU, Name, Cost, Shipping, SP, Comm%, GST%</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleDownloadTemplate}>Download Template</Button>
                <div>
                  <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="csv-upload" />
                  <Button onClick={() => document.getElementById('csv-upload')?.click()}>
                    Browse File
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {data.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ResultCard title="Total Revenue" value={formatCurrency(summary.revenue)} />
              <ResultCard title="Total Profit" value={formatCurrency(summary.profit)} variant={summary.profit >= 0 ? 'success' : 'danger'} />
              <ResultCard title="Avg Margin" value={formatPercentage(summary.margin)} />
              <ResultCard title="Products Processed" value={data.length.toString()} />
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Results Preview</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setData([])}><Trash2 className="w-4 h-4 mr-1"/> Clear</Button>
                  <Button variant="default" size="sm" onClick={handleExport}><Download className="w-4 h-4 mr-1"/> Export CSV</Button>
                </div>
              </CardHeader>
              <CardContent className="overflow-auto max-h-96">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 sticky top-0">
                    <tr>
                      <th className="px-4 py-2">SKU</th>
                      <th className="px-4 py-2">Product</th>
                      <th className="px-4 py-2">Selling Price</th>
                      <th className="px-4 py-2">Profit</th>
                      <th className="px-4 py-2">Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(0, 50).map((row, i) => (
                      <tr key={i} className="border-b dark:border-gray-700">
                        <td className="px-4 py-2">{row.sku}</td>
                        <td className="px-4 py-2 truncate max-w-[150px]">{row.name}</td>
                        <td className="px-4 py-2">{formatCurrency(row.sellingPrice)}</td>
                        <td className={`px-4 py-2 font-medium ${(row.profit || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(row.profit || 0)}
                        </td>
                        <td className={`px-4 py-2 ${(row.margin || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPercentage(row.margin || 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.length > 50 && <p className="text-center p-4 text-gray-500">Showing first 50 rows...</p>}
              </CardContent>
            </Card>
          </>
        )}
      </main>
      <ToolFooter />
    </div>
  );
}
