import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import ResultCard from '../../../components/ui/ResultCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { formatCurrency, formatNumber } from '../../../utils/format';
import { useAppStore } from '../../../store/useAppStore';

export default function BreakEvenCalculator() {
  const addRecentTool = useAppStore(state => state.addRecentTool);
  React.useEffect(() => {
    addRecentTool('break-even-calculator');
  }, [addRecentTool]);

  const [inputs, setInputs] = useState({
    fixedCosts: 10000,
    variableCostPerUnit: 50,
    sellingPricePerUnit: 150
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const results = useMemo(() => {
    const { fixedCosts, variableCostPerUnit, sellingPricePerUnit } = inputs;
    const contributionMarginPerUnit = sellingPricePerUnit - variableCostPerUnit;
    
    let breakEvenUnits = 0;
    let breakEvenRevenue = 0;
    if (contributionMarginPerUnit > 0) {
      breakEvenUnits = Math.ceil(fixedCosts / contributionMarginPerUnit);
      breakEvenRevenue = breakEvenUnits * sellingPricePerUnit;
    }

    const chartData = [];
    if (breakEvenUnits > 0) {
      const maxUnits = breakEvenUnits * 2;
      const step = Math.max(1, Math.floor(maxUnits / 10));
      for (let i = 0; i <= maxUnits; i += step) {
        chartData.push({
          units: i,
          Revenue: i * sellingPricePerUnit,
          TotalCost: fixedCosts + (i * variableCostPerUnit)
        });
      }
    }

    return { breakEvenUnits, breakEvenRevenue, chartData };
  }, [inputs]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToolHeader title="Break-Even Calculator" description="Find out how many units you need to sell to cover costs" />
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader><CardTitle>Inputs</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Total Fixed Costs</label>
                <Input type="number" name="fixedCosts" value={inputs.fixedCosts} onChange={handleChange} min="0" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Variable Cost per Unit</label>
                <Input type="number" name="variableCostPerUnit" value={inputs.variableCostPerUnit} onChange={handleChange} min="0" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Selling Price per Unit</label>
                <Input type="number" name="sellingPricePerUnit" value={inputs.sellingPricePerUnit} onChange={handleChange} min="0" />
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultCard title="Break-Even Units" value={formatNumber(results.breakEvenUnits)} />
              <ResultCard title="Break-Even Revenue" value={formatCurrency(results.breakEvenRevenue)} />
            </div>

            <Card>
              <CardHeader><CardTitle>Revenue vs Costs Chart</CardTitle></CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="units" label={{ value: 'Units Sold', position: 'insideBottomRight', offset: -10 }} />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip formatter={(val: number) => formatCurrency(val)} />
                    <Legend />
                    <Line type="monotone" dataKey="Revenue" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="TotalCost" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ToolFooter />
    </div>
  );
}
