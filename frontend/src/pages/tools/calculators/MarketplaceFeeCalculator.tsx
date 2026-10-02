import React, { useState, useMemo } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import ToolFooter from '../../../components/ui/ToolFooter';
import ResultCard from '../../../components/ui/ResultCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { formatCurrency } from '../../../utils/format';
import { useAppStore } from '../../../store/useAppStore';

const PRESETS = {
  meesho: { commissionPct: 0, fixedFee: 15, shipping: 50, gstPct: 18 },
  amazon: { commissionPct: 10, fixedFee: 20, shipping: 65, gstPct: 18 },
  flipkart: { commissionPct: 12, fixedFee: 15, shipping: 60, gstPct: 18 },
  custom: { commissionPct: 5, fixedFee: 10, shipping: 40, gstPct: 18 }
};

export default function MarketplaceFeeCalculator() {
  const addRecentTool = useAppStore(state => state.addRecentTool);
  React.useEffect(() => {
    addRecentTool('marketplace-fee-calculator');
  }, [addRecentTool]);

  const [sellingPrice, setSellingPrice] = useState(500);
  const [activePreset, setActivePreset] = useState<keyof typeof PRESETS>('amazon');
  const [fees, setFees] = useState(PRESETS['amazon']);

  const applyPreset = (preset: keyof typeof PRESETS) => {
    setActivePreset(preset);
    setFees(PRESETS[preset]);
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFees(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    setActivePreset('custom');
  };

  const results = useMemo(() => {
    const commissionAmount = sellingPrice * (fees.commissionPct / 100);
    const subtotalFees = commissionAmount + fees.fixedFee + fees.shipping;
    const gstOnFees = subtotalFees * (fees.gstPct / 100);
    const totalFees = subtotalFees + gstOnFees;
    const netRevenue = sellingPrice - totalFees;

    return { commissionAmount, gstOnFees, totalFees, netRevenue };
  }, [sellingPrice, fees]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToolHeader title="Marketplace Fee Calculator" description="Estimate your payout after marketplace deductions" />
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-5xl mx-auto w-full">
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-6 text-sm">
          Disclaimer: These rates are user-configurable estimates. Verify with official marketplace documentation.
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <div className="flex space-x-2 pt-2">
                {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map(preset => (
                  <Button key={preset} variant={activePreset === preset ? 'default' : 'outline'} size="sm" onClick={() => applyPreset(preset)} className="capitalize">
                    {preset}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Selling Price</label>
                <Input type="number" value={sellingPrice} onChange={e => setSellingPrice(parseFloat(e.target.value) || 0)} min="0" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Commission (%)</label>
                  <Input type="number" name="commissionPct" value={fees.commissionPct} onChange={handleFeeChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fixed Fee</label>
                  <Input type="number" name="fixedFee" value={fees.fixedFee} onChange={handleFeeChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Shipping Fee</label>
                  <Input type="number" name="shipping" value={fees.shipping} onChange={handleFeeChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">GST on Fees (%)</label>
                  <Input type="number" name="gstPct" value={fees.gstPct} onChange={handleFeeChange} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <ResultCard title="Total Fees Deducted" value={formatCurrency(results.totalFees)} variant="warning" />
            <ResultCard title="Net Revenue (Bank Settlement)" value={formatCurrency(results.netRevenue)} variant="success" />
            
            <Card>
              <CardContent className="pt-6 space-y-2 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Commission Fee</span><span>{formatCurrency(results.commissionAmount)}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Fixed Fee</span><span>{formatCurrency(fees.fixedFee)}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Shipping Fee</span><span>{formatCurrency(fees.shipping)}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>GST on Fees</span><span>{formatCurrency(results.gstOnFees)}</span>
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
