import React, { useState, useMemo } from 'react';
import { Download, Copy, Printer, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import ResultCard from '../../../components/ui/ResultCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { formatCurrency, formatPercentage } from '../../../utils/format';
import { downloadText, copyToClipboard } from '../../../utils/download';
import { useAppStore } from '../../../store/useAppStore';

export default function ProductPricingCalculator() {
  const addRecentTool = useAppStore(state => state.addRecentTool);
  React.useEffect(() => {
    addRecentTool('product-pricing-calculator');
  }, [addRecentTool]);

  const [inputs, setInputs] = useState({
    productCost: 100,
    packaging: 10,
    shipping: 50,
    marketplaceCommPct: 15,
    fixedFee: 10,
    gstPct: 18,
    expectedProfitPct: 20,
    advertisingCost: 20,
    returnRtoPct: 10
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const results = useMemo(() => {
    const {
      productCost, packaging, shipping, marketplaceCommPct, fixedFee,
      gstPct, expectedProfitPct, advertisingCost, returnRtoPct
    } = inputs;

    const baseCost = productCost + packaging + shipping + advertisingCost;
    
    // We want: Net Profit = expectedProfitPct% of Selling Price
    // Or Net Profit = expectedProfitPct% of Base Cost? Let's use % of Selling Price as expected margin
    // SP = Base Cost + Commission + Fixed Fee + GST + Return Loss + Expected Profit
    // Commission = SP * comm%
    // Expected Profit = SP * profit%
    // GST = SP - SP/(1+gst%)
    // Return Loss = Base Cost * return% (simplified)
    
    const returnLoss = baseCost * (returnRtoPct / 100);
    const totalFixedCosts = baseCost + fixedFee + returnLoss;
    
    // SP = totalFixedCosts + SP * (comm%/100) + SP * (profit%/100) + (SP - SP/(1+gst%/100))
    // SP = totalFixedCosts + SP * [ comm%/100 + profit%/100 + 1 - 1/(1+gst%/100) ]
    const variableRates = (marketplaceCommPct / 100) + (expectedProfitPct / 100) + (1 - (1 / (1 + gstPct / 100)));
    
    const recommendedSp = variableRates >= 1 ? 0 : totalFixedCosts / (1 - variableRates);
    
    // Minimum SP (0% profit)
    const minVariableRates = (marketplaceCommPct / 100) + (1 - (1 / (1 + gstPct / 100)));
    const minSp = minVariableRates >= 1 ? 0 : totalFixedCosts / (1 - minVariableRates);

    const expectedProfit = recommendedSp * (expectedProfitPct / 100);
    const expectedMargin = recommendedSp > 0 ? (expectedProfit / recommendedSp) * 100 : 0;

    const chartData = [
      {
        name: 'Price Breakdown',
        Cost: baseCost + returnLoss,
        Fees: (recommendedSp * (marketplaceCommPct / 100)) + fixedFee,
        GST: recommendedSp - (recommendedSp / (1 + gstPct / 100)),
        Profit: expectedProfit
      }
    ];

    return {
      recommendedSp,
      minSp,
      expectedProfit,
      expectedMargin,
      chartData
    };
  }, [inputs]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToolHeader title="Product Pricing Calculator" description="Determine the optimal selling price for your products" />
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader><CardTitle>Cost Inputs</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(inputs).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                    <Input type="number" name={key} value={value} onChange={handleChange} min="0" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultCard title="Recommended Selling Price" value={formatCurrency(results.recommendedSp)} variant="primary" />
              <ResultCard title="Minimum Selling Price (0% Profit)" value={formatCurrency(results.minSp)} />
              <ResultCard title="Expected Profit Amount" value={formatCurrency(results.expectedProfit)} variant="success" />
              <ResultCard title="Expected Margin" value={formatPercentage(results.expectedMargin)} variant="success" />
            </div>

            <Card>
              <CardHeader><CardTitle>Price Breakdown</CardTitle></CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.chartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" hide />
                      <Tooltip formatter={(val: number) => formatCurrency(val)} />
                      <Legend />
                      <Bar dataKey="Cost" stackId="a" fill="#3b82f6" />
                      <Bar dataKey="Fees" stackId="a" fill="#f97316" />
                      <Bar dataKey="GST" stackId="a" fill="#eab308" />
                      <Bar dataKey="Profit" stackId="a" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
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
