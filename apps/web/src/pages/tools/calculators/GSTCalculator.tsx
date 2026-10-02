import React, { useState, useMemo } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import ResultCard from '../../../components/ui/ResultCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { formatCurrency } from '../../../utils/format';
import { useAppStore } from '../../../store/useAppStore';

export default function GSTCalculator() {
  const addRecentTool = useAppStore(state => state.addRecentTool);
  React.useEffect(() => {
    addRecentTool('gst-calculator');
  }, [addRecentTool]);

  const [mode, setMode] = useState<'inclusive' | 'exclusive'>('inclusive');
  const [amount, setAmount] = useState(1000);
  const [gstRate, setGstRate] = useState(18);

  const presets = [5, 12, 18, 28];

  const results = useMemo(() => {
    let baseAmount = 0;
    let gstAmount = 0;
    let finalAmount = 0;

    if (mode === 'inclusive') {
      baseAmount = amount / (1 + gstRate / 100);
      gstAmount = amount - baseAmount;
      finalAmount = amount;
    } else {
      baseAmount = amount;
      gstAmount = amount * (gstRate / 100);
      finalAmount = amount + gstAmount;
    }

    return {
      baseAmount,
      gstAmount,
      cgstAmount: gstAmount / 2,
      sgstAmount: gstAmount / 2,
      finalAmount
    };
  }, [mode, amount, gstRate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToolHeader title="GST Calculator" description="Calculate GST inclusive and exclusive prices" />
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-3xl mx-auto w-full">
        <Card>
          <CardHeader>
            <div className="flex space-x-2 border-b pb-4">
              <Button 
                variant={mode === 'inclusive' ? 'default' : 'outline'}
                onClick={() => setMode('inclusive')}
                className="flex-1"
              >
                GST Inclusive (Extract GST)
              </Button>
              <Button 
                variant={mode === 'exclusive' ? 'default' : 'outline'}
                onClick={() => setMode('exclusive')}
                className="flex-1"
              >
                GST Exclusive (Add GST)
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <Input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} min="0" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">GST Rate (%)</label>
              <div className="flex space-x-2">
                {presets.map(rate => (
                  <Button
                    key={rate}
                    variant={gstRate === rate ? 'default' : 'outline'}
                    onClick={() => setGstRate(rate)}
                  >
                    {rate}%
                  </Button>
                ))}
                <Input type="number" value={gstRate} onChange={(e) => setGstRate(parseFloat(e.target.value) || 0)} min="0" className="w-24" placeholder="Custom" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
              <ResultCard title="Base Amount" value={formatCurrency(results.baseAmount)} />
              <ResultCard title="GST Amount" value={formatCurrency(results.gstAmount)} />
              <ResultCard title="Final Amount" value={formatCurrency(results.finalAmount)} variant="primary" />
            </div>

            <div className="flex justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500">CGST ({gstRate/2}%)</p>
                <p className="font-semibold">{formatCurrency(results.cgstAmount)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">SGST ({gstRate/2}%)</p>
                <p className="font-semibold">{formatCurrency(results.sgstAmount)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">IGST ({gstRate}%)</p>
                <p className="font-semibold">{formatCurrency(results.gstAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <ToolFooter />
    </div>
  );
}
