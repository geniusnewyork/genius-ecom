import React, { useState, useMemo } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import ResultCard from '../../../components/ui/ResultCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { formatCurrency, formatPercentage } from '../../../utils/format';
import { useAppStore } from '../../../store/useAppStore';

export default function ReturnLossCalculator() {
  const addRecentTool = useAppStore(state => state.addRecentTool);
  React.useEffect(() => {
    addRecentTool('return-loss-calculator');
  }, [addRecentTool]);

  const [inputs, setInputs] = useState({
    productCost: 200,
    sellingPrice: 899,
    forwardShipping: 60,
    returnShipping: 60,
    packaging: 15,
    commissionPct: 10,
    returnRatePct: 15,
    monthlyOrders: 1000
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const results = useMemo(() => {
    const { productCost, sellingPrice, forwardShipping, returnShipping, packaging, commissionPct, returnRatePct, monthlyOrders } = inputs;
    
    // Typically on customer return, you lose forward, return, packaging, and sometimes product becomes unsellable (assume 20% damage rate for simplicity, but let's just do shipping+packaging)
    const lossPerReturn = forwardShipping + returnShipping + packaging; 
    
    const totalReturns = Math.round(monthlyOrders * (returnRatePct / 100));
    const totalReturnLoss = totalReturns * lossPerReturn;

    const successfulOrders = monthlyOrders - totalReturns;
    const commissionPerSale = sellingPrice * (commissionPct / 100);
    const profitPerSale = sellingPrice - productCost - forwardShipping - packaging - commissionPerSale;
    
    const totalProfit = (successfulOrders * profitPerSale) - totalReturnLoss;
    const adjustedMargin = (totalProfit / (monthlyOrders * sellingPrice)) * 100;

    return { lossPerReturn, totalReturns, totalReturnLoss, totalProfit, adjustedMargin };
  }, [inputs]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToolHeader title="Customer Return Loss Calculator" description="Evaluate the financial impact of customer returns" />
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Inputs</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {Object.entries(inputs).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <Input type="number" name={key} value={value} onChange={handleChange} min="0" />
                </div>
              ))}
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <ResultCard title="Estimated Monthly Returns" value={results.totalReturns.toString()} variant="warning" />
            <ResultCard title="Loss per Return" value={formatCurrency(results.lossPerReturn)} variant="danger" />
            <ResultCard title="Total Monthly Return Loss" value={formatCurrency(results.totalReturnLoss)} variant="danger" />
            <ResultCard title="Adjusted Net Profit" value={formatCurrency(results.totalProfit)} variant={results.totalProfit > 0 ? 'success' : 'danger'} />
            <ResultCard title="Adjusted Net Margin" value={formatPercentage(results.adjustedMargin || 0)} />
          </div>
        </div>
      </main>
      <ToolFooter />
    </div>
  );
}
