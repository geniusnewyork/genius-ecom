import React, { useState, useMemo } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import ResultCard from '../../../components/ui/ResultCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { formatCurrency, formatPercentage } from '../../../utils/format';
import { useAppStore } from '../../../store/useAppStore';

export default function MarginCalculator() {
  const addRecentTool = useAppStore(state => state.addRecentTool);
  React.useEffect(() => {
    addRecentTool('margin-calculator');
  }, [addRecentTool]);

  const [costPrice, setCostPrice] = useState(100);
  const [sellingPrice, setSellingPrice] = useState(150);

  const results = useMemo(() => {
    const profit = sellingPrice - costPrice;
    const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
    const markup = costPrice > 0 ? (profit / costPrice) * 100 : 0;

    return { profit, margin, markup };
  }, [costPrice, sellingPrice]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToolHeader title="Margin vs Markup Calculator" description="Calculate profit margins and markups easily" />
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Inputs</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cost Price</label>
                <Input type="number" value={costPrice} onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)} min="0" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Selling Price</label>
                <Input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)} min="0" />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <ResultCard title="Gross Profit" value={formatCurrency(results.profit)} variant={results.profit >= 0 ? 'success' : 'danger'} />
            <ResultCard title="Margin (Profit / Revenue)" value={formatPercentage(results.margin)} />
            <ResultCard title="Markup (Profit / Cost)" value={formatPercentage(results.markup)} />
          </div>
        </div>
      </main>
      <ToolFooter />
    </div>
  );
}
