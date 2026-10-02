import React, { useState, useMemo } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import ResultCard from '../../../components/ui/ResultCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { formatCurrency, formatPercentage } from '../../../utils/format';
import { useAppStore } from '../../../store/useAppStore';

export default function DiscountCalculator() {
  const addRecentTool = useAppStore(state => state.addRecentTool);
  React.useEffect(() => {
    addRecentTool('discount-calculator');
  }, [addRecentTool]);

  const [originalPrice, setOriginalPrice] = useState(1000);
  const [discountPct, setDiscountPct] = useState(15);
  const [finalPrice, setFinalPrice] = useState(850);
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');

  const handleForwardChange = (val: number, field: 'original' | 'discount') => {
    setMode('forward');
    const newOriginal = field === 'original' ? val : originalPrice;
    const newDiscount = field === 'discount' ? val : discountPct;
    
    setOriginalPrice(newOriginal);
    setDiscountPct(newDiscount);
    setFinalPrice(newOriginal * (1 - newDiscount / 100));
  };

  const handleReverseChange = (val: number, field: 'original' | 'final') => {
    setMode('reverse');
    const newOriginal = field === 'original' ? val : originalPrice;
    const newFinal = field === 'final' ? val : finalPrice;
    
    setOriginalPrice(newOriginal);
    setFinalPrice(newFinal);
    const newDiscount = newOriginal > 0 ? ((newOriginal - newFinal) / newOriginal) * 100 : 0;
    setDiscountPct(parseFloat(newDiscount.toFixed(2)));
  };

  const savedAmount = originalPrice - finalPrice;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToolHeader title="Discount Calculator" description="Calculate discounts, final prices, and savings easily" />
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-3xl mx-auto w-full">
        <Card className="mb-6">
          <CardHeader><CardTitle>Calculator</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Original Price</label>
              <Input type="number" value={originalPrice} onChange={e => {
                const v = parseFloat(e.target.value) || 0;
                mode === 'forward' ? handleForwardChange(v, 'original') : handleReverseChange(v, 'original');
              }} min="0" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-transparent focus-within:border-blue-500">
                <label className="text-sm font-medium">Discount %</label>
                <Input type="number" value={discountPct} onChange={e => handleForwardChange(parseFloat(e.target.value) || 0, 'discount')} min="0" max="100" />
                <p className="text-xs text-gray-500 mt-1">Edit to calculate final price</p>
              </div>
              <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-transparent focus-within:border-blue-500">
                <label className="text-sm font-medium">Final Price</label>
                <Input type="number" value={finalPrice} onChange={e => handleReverseChange(parseFloat(e.target.value) || 0, 'final')} min="0" />
                <p className="text-xs text-gray-500 mt-1">Edit to calculate discount %</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard title="Original Price" value={formatCurrency(originalPrice)} />
          <ResultCard title="Discount Amount (Savings)" value={formatCurrency(Math.max(0, savedAmount))} variant="success" />
          <ResultCard title="Final Price" value={formatCurrency(finalPrice)} variant="primary" />
        </div>
      </main>
      <ToolFooter />
    </div>
  );
}
