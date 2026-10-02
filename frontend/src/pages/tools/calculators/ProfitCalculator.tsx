import React, { useState, useMemo } from 'react';
import { Download, Copy, Printer, RefreshCw } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import ResultCard from '../../../components/ui/ResultCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { formatCurrency, formatPercentage } from '../../../utils/format';
import { downloadText, copyToClipboard } from '../../../utils/download';
import { useAppStore } from '../../../store/useAppStore';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#8b5cf6', '#06b6d4', '#10b981', '#3b82f6'];

export default function ProfitCalculator() {
  const addRecentTool = useAppStore(state => state.addRecentTool);
  React.useEffect(() => {
    addRecentTool('profit-calculator');
  }, [addRecentTool]);

  const [inputs, setInputs] = useState({
    productCost: 100,
    packagingCost: 10,
    shippingCost: 50,
    marketplaceFeePct: 10,
    gstPct: 18,
    advertisingCost: 20,
    otherCost: 5,
    sellingPrice: 499,
    returnCost: 0,
    discountPct: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const results = useMemo(() => {
    const {
      productCost, packagingCost, shippingCost, marketplaceFeePct, gstPct,
      advertisingCost, otherCost, sellingPrice, returnCost, discountPct
    } = inputs;

    const discountAmount = (sellingPrice * discountPct) / 100;
    const finalSellingPrice = sellingPrice - discountAmount;

    const marketplaceFeeAmount = (finalSellingPrice * marketplaceFeePct) / 100;
    
    // Base amount for GST is the selling price excluding GST
    const baseAmount = finalSellingPrice / (1 + gstPct / 100);
    const gstAmount = finalSellingPrice - baseAmount;

    const totalCost = productCost + packagingCost + shippingCost + marketplaceFeeAmount + gstAmount + advertisingCost + otherCost + returnCost;
    const netProfit = finalSellingPrice - totalCost;
    const profitMargin = finalSellingPrice > 0 ? (netProfit / finalSellingPrice) * 100 : 0;
    
    // Break-even is when finalSellingPrice = totalCost
    // SP - (SP * fee%) - (SP - SP/(1+gst%)) = Fixed Costs
    // Fixed Costs = productCost + packaging + shipping + adv + other + return
    const fixedCosts = productCost + packagingCost + shippingCost + advertisingCost + otherCost + returnCost;
    // Let effective fee rate = fee% + (1 - 1/(1+gst%))
    const effectiveFeeRate = (marketplaceFeePct / 100) + (1 - (1 / (1 + gstPct / 100)));
    const breakEvenSellingPrice = fixedCosts / (1 - effectiveFeeRate);

    const isProfit = netProfit >= 0;

    const costBreakdown = [
      { name: 'Product', value: productCost },
      { name: 'Packaging', value: packagingCost },
      { name: 'Shipping', value: shippingCost },
      { name: 'Marketplace Fee', value: marketplaceFeeAmount },
      { name: 'GST', value: gstAmount },
      { name: 'Ads', value: advertisingCost },
      { name: 'Other', value: otherCost + returnCost }
    ];

    return {
      grossRevenue: finalSellingPrice,
      totalCost,
      marketplaceFeeAmount,
      gstAmount,
      netProfit,
      profitMargin,
      breakEvenSellingPrice,
      isProfit,
      costBreakdown
    };
  }, [inputs]);

  const handleReset = () => {
    setInputs({
      productCost: 0, packagingCost: 0, shippingCost: 0, marketplaceFeePct: 0,
      gstPct: 0, advertisingCost: 0, otherCost: 0, sellingPrice: 0, returnCost: 0, discountPct: 0
    });
  };

  const handleCopy = () => {
    const text = `Profit Calculation:
Revenue: ${formatCurrency(results.grossRevenue)}
Cost: ${formatCurrency(results.totalCost)}
Net Profit: ${formatCurrency(results.netProfit)} (${formatPercentage(results.profitMargin)})
Break-even: ${formatCurrency(results.breakEvenSellingPrice)}`;
    copyToClipboard(text);
  };

  const handleDownload = () => {
    const text = `Profit Calculation Results\n\nRevenue: ${formatCurrency(results.grossRevenue)}\nCost: ${formatCurrency(results.totalCost)}\nNet Profit: ${formatCurrency(results.netProfit)}\nMargin: ${formatPercentage(results.profitMargin)}\nBreak-even: ${formatCurrency(results.breakEvenSellingPrice)}`;
    downloadText('profit-calculation.txt', text);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToolHeader title="Profit Calculator" description="Calculate your net profit, margins, and break-even point" />
      
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Costs & Expenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Product Cost</label>
                    <Input type="number" name="productCost" value={inputs.productCost} onChange={handleChange} min="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Packaging Cost</label>
                    <Input type="number" name="packagingCost" value={inputs.packagingCost} onChange={handleChange} min="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Shipping Cost</label>
                    <Input type="number" name="shippingCost" value={inputs.shippingCost} onChange={handleChange} min="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Advertising Cost</label>
                    <Input type="number" name="advertisingCost" value={inputs.advertisingCost} onChange={handleChange} min="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Other Costs</label>
                    <Input type="number" name="otherCost" value={inputs.otherCost} onChange={handleChange} min="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Return/RTO Cost</label>
                    <Input type="number" name="returnCost" value={inputs.returnCost} onChange={handleChange} min="0" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales & Fees</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Selling Price</label>
                    <Input type="number" name="sellingPrice" value={inputs.sellingPrice} onChange={handleChange} min="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Discount (%)</label>
                    <Input type="number" name="discountPct" value={inputs.discountPct} onChange={handleChange} min="0" max="100" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Marketplace Fee (%)</label>
                    <Input type="number" name="marketplaceFeePct" value={inputs.marketplaceFeePct} onChange={handleChange} min="0" max="100" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GST (%)</label>
                    <Input type="number" name="gstPct" value={inputs.gstPct} onChange={handleChange} min="0" max="100" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ResultCard title="Gross Revenue" value={formatCurrency(results.grossRevenue)} />
              <ResultCard title="Total Cost" value={formatCurrency(results.totalCost)} />
              <ResultCard 
                title={results.isProfit ? "Net Profit" : "Net Loss"} 
                value={formatCurrency(Math.abs(results.netProfit))} 
                variant={results.isProfit ? 'success' : 'danger'}
              />
              <ResultCard 
                title="Profit Margin" 
                value={formatPercentage(results.profitMargin)} 
                variant={results.isProfit ? 'success' : 'danger'}
              />
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Detailed Breakdown</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleReset}><RefreshCw className="w-4 h-4 mr-1" /> Reset</Button>
                  <Button variant="outline" size="sm" onClick={handleCopy}><Copy className="w-4 h-4 mr-1" /> Copy</Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}><Download className="w-4 h-4 mr-1" /> Save</Button>
                  <Button variant="outline" size="sm" onClick={handlePrint}><Printer className="w-4 h-4 mr-1" /> Print</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={results.costBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                          {results.costBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600 dark:text-gray-400">Marketplace Fee Amount</span>
                      <span className="font-semibold">{formatCurrency(results.marketplaceFeeAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600 dark:text-gray-400">GST Amount</span>
                      <span className="font-semibold">{formatCurrency(results.gstAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600 dark:text-gray-400">Break-even Selling Price</span>
                      <span className="font-semibold">{formatCurrency(results.breakEvenSellingPrice)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <ToolFooter />
    </div>
  );
}
