import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import ResultCard from '../../../components/ui/ResultCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { formatCurrency, formatPercentage } from '../../../utils/format';
import { useAppStore } from '../../../store/useAppStore';

const COLORS = ['#10b981', '#ef4444'];

export default function RTOCalculator() {
  const addRecentTool = useAppStore(state => state.addRecentTool);
  React.useEffect(() => {
    addRecentTool('rto-calculator');
  }, [addRecentTool]);

  const [inputs, setInputs] = useState({
    totalOrders: 1000,
    deliveredOrders: 800,
    rtoOrders: 200,
    productCost: 100,
    forwardShipping: 50,
    returnShipping: 50,
    packagingCost: 10,
    sellingPrice: 499
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const results = useMemo(() => {
    const { totalOrders, deliveredOrders, rtoOrders, productCost, forwardShipping, returnShipping, packagingCost, sellingPrice } = inputs;

    const actualDelivered = deliveredOrders || (totalOrders - rtoOrders);
    const actualRTO = rtoOrders || (totalOrders - deliveredOrders);

    const rtoRate = totalOrders > 0 ? (actualRTO / totalOrders) * 100 : 0;
    const deliveredRate = totalOrders > 0 ? (actualDelivered / totalOrders) * 100 : 0;

    const lossPerRto = forwardShipping + returnShipping + packagingCost; // Product is usually recovered
    const totalRtoLoss = lossPerRto * actualRTO;

    const grossProfitPerDelivered = sellingPrice - productCost - forwardShipping - packagingCost;
    const adjustedProfitPerDelivered = actualDelivered > 0 ? grossProfitPerDelivered - (totalRtoLoss / actualDelivered) : 0;
    
    const chartData = [
      { name: 'Delivered', value: actualDelivered },
      { name: 'RTO', value: actualRTO }
    ];

    return {
      rtoRate, deliveredRate, lossPerRto, totalRtoLoss, adjustedProfitPerDelivered, chartData
    };
  }, [inputs]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToolHeader title="RTO Loss Calculator" description="Calculate the impact of Return to Origin (RTO) on your margins" />
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader><CardTitle>Inputs</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(inputs).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <Input type="number" name={key} value={value} onChange={handleChange} min="0" />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultCard title="RTO Rate" value={formatPercentage(results.rtoRate)} variant={results.rtoRate > 20 ? 'danger' : 'warning'} />
              <ResultCard title="Loss per RTO" value={formatCurrency(results.lossPerRto)} variant="danger" />
              <ResultCard title="Total RTO Loss" value={formatCurrency(results.totalRtoLoss)} variant="danger" />
              <ResultCard title="Adj. Profit per Delivered" value={formatCurrency(results.adjustedProfitPerDelivered)} variant={results.adjustedProfitPerDelivered > 0 ? 'success' : 'danger'} />
            </div>

            <Card>
              <CardHeader><CardTitle>Delivery vs RTO</CardTitle></CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={results.chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {results.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
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
