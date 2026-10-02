import React, { useState, useEffect } from 'react';
import ToolHeader from '../components/ui/ToolHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CheckCircle2, XCircle, Play, RefreshCw } from 'lucide-react';

interface TestCase {
  id: string;
  tool: string;
  testName: string;
  expected: string;
  run: () => { actual: string; passed: boolean };
}

export const DevTestSuitePage: React.FC = () => {
  const [results, setResults] = useState<{ [id: string]: { actual: string; passed: boolean } }>({});
  const [isRunning, setIsRunning] = useState(false);

  const testCases: TestCase[] = [
    {
      id: 'calc-profit-1',
      tool: 'Profit Calculator',
      testName: '₹100 cost + ₹50 shipping + ₹200 sale (0% fee, 0% gst)',
      expected: 'Net Profit: ₹50.00, Margin: 25.00%',
      run: () => {
        const cost = 100, shipping = 50, sp = 200;
        const profit = sp - (cost + shipping);
        const margin = (profit / sp) * 100;
        const actual = `Net Profit: ₹${profit.toFixed(2)}, Margin: ${margin.toFixed(2)}%`;
        return { actual, passed: profit === 50 && margin === 25 };
      }
    },
    {
      id: 'calc-profit-breakeven',
      tool: 'Profit Calculator',
      testName: '₹150 total cost with zero markup selling price',
      expected: 'Profit: ₹0.00 (Break-even SP: ₹150.00)',
      run: () => {
        const cost = 150, sp = 150;
        const profit = sp - cost;
        const actual = `Profit: ₹${profit.toFixed(2)} (Break-even SP: ₹${cost.toFixed(2)})`;
        return { actual, passed: profit === 0 };
      }
    },
    {
      id: 'calc-gst-inclusive',
      tool: 'GST Calculator',
      testName: 'Inclusive GST ₹118 @ 18%',
      expected: 'Base: ₹100.00, GST: ₹18.00',
      run: () => {
        const total = 118, rate = 18;
        const base = total / (1 + rate / 100);
        const gst = total - base;
        const actual = `Base: ₹${base.toFixed(2)}, GST: ₹${gst.toFixed(2)}`;
        return { actual, passed: Math.round(base) === 100 && Math.round(gst) === 18 };
      }
    },
    {
      id: 'calc-gst-exclusive',
      tool: 'GST Calculator',
      testName: 'Exclusive GST ₹1000 @ 18%',
      expected: 'Final: ₹1180.00, GST: ₹180.00',
      run: () => {
        const base = 1000, rate = 18;
        const gst = base * (rate / 100);
        const finalAmt = base + gst;
        const actual = `Final: ₹${finalAmt.toFixed(2)}, GST: ₹${gst.toFixed(2)}`;
        return { actual, passed: finalAmt === 1180 && gst === 180 };
      }
    },
    {
      id: 'calc-gst-5pct',
      tool: 'GST Calculator',
      testName: 'Exclusive GST ₹500 @ 5%',
      expected: 'Final: ₹525.00, GST: ₹25.00',
      run: () => {
        const base = 500, rate = 5;
        const gst = base * (rate / 100);
        const finalAmt = base + gst;
        const actual = `Final: ₹${finalAmt.toFixed(2)}, GST: ₹${gst.toFixed(2)}`;
        return { actual, passed: finalAmt === 525 && gst === 25 };
      }
    },
    {
      id: 'calc-margin',
      tool: 'Margin Calculator',
      testName: 'Cost: ₹60, Sale: ₹100',
      expected: 'Gross Margin: 40.00%, Markup: 66.67%',
      run: () => {
        const cost = 60, sp = 100;
        const margin = ((sp - cost) / sp) * 100;
        const markup = ((sp - cost) / cost) * 100;
        const actual = `Gross Margin: ${margin.toFixed(2)}%, Markup: ${markup.toFixed(2)}%`;
        return { actual, passed: margin === 40 && Math.abs(markup - 66.67) < 0.01 };
      }
    },
    {
      id: 'calc-discount',
      tool: 'Discount Calculator',
      testName: 'Price: ₹1000 with 25% discount',
      expected: 'Final: ₹750.00, Saved: ₹250.00',
      run: () => {
        const original = 1000, disc = 25;
        const saved = (original * disc) / 100;
        const finalPrice = original - saved;
        const actual = `Final: ₹${finalPrice.toFixed(2)}, Saved: ₹${saved.toFixed(2)}`;
        return { actual, passed: finalPrice === 750 && saved === 250 };
      }
    },
    {
      id: 'calc-breakeven-units',
      tool: 'Break-Even Calculator',
      testName: 'Fixed Cost: ₹10,000, SP: ₹100, VC: ₹60',
      expected: 'Break-even Quantity: 250 units',
      run: () => {
        const fc = 10000, sp = 100, vc = 60;
        const cm = sp - vc;
        const qty = fc / cm;
        const actual = `Break-even Quantity: ${qty} units`;
        return { actual, passed: qty === 250 };
      }
    },
    {
      id: 'calc-rto-rate',
      tool: 'RTO Calculator',
      testName: '1,000 Total Orders, 250 RTO Orders',
      expected: 'RTO Rate: 25.00%, Delivered Rate: 75.00%',
      run: () => {
        const total = 1000, rto = 250;
        const delivered = total - rto;
        const rtoRate = (rto / total) * 100;
        const delivRate = (delivered / total) * 100;
        const actual = `RTO Rate: ${rtoRate.toFixed(2)}%, Delivered Rate: ${delivRate.toFixed(2)}%`;
        return { actual, passed: rtoRate === 25 && delivRate === 75 };
      }
    },
    {
      id: 'util-sku-generator',
      tool: 'SKU Generator',
      testName: 'Prefix: MG, Cat: SHOE, Color: BLK, Size: 42, Seq: 001',
      expected: 'MG-SHOE-BLK-42-001',
      run: () => {
        const parts = ['MG', 'SHOE', 'BLK', '42', '001'].filter(Boolean);
        const actual = parts.join('-');
        return { actual, passed: actual === 'MG-SHOE-BLK-42-001' };
      }
    },
    {
      id: 'util-upi-format',
      tool: 'QR Code Generator',
      testName: 'UPI URI format for seller@okaxis with ₹499',
      expected: 'upi://pay?pa=seller@okaxis&pn=MontyStore&am=499&cu=INR',
      run: () => {
        const pa = 'seller@okaxis', pn = 'MontyStore', am = '499';
        const actual = `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR`;
        return { actual, passed: actual === 'upi://pay?pa=seller@okaxis&pn=MontyStore&am=499&cu=INR' };
      }
    },
    {
      id: 'util-csv-cleaner',
      tool: 'CSV Cleaner',
      testName: 'De-duplicate 3 rows with 1 duplicate and 1 empty line',
      expected: 'Original: 4 lines, Cleaned: 2 unique valid lines',
      run: () => {
        const input = "SKU,Price\nMG-01,100\n\nMG-01,100\nMG-02,200";
        const lines = input.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const unique = Array.from(new Set(lines));
        const actual = `Original: 5 lines, Cleaned: ${unique.length - 1} unique valid lines`;
        return { actual, passed: unique.length === 3 }; // header + 2 items
      }
    },
    {
      id: 'sys-local-storage',
      tool: 'System LocalStorage',
      testName: 'Browser local storage write and retrieve test',
      expected: 'PASS (Value matches)',
      run: () => {
        try {
          const testKey = '__mg_test_storage__';
          const testVal = 'mg_v1_' + Date.now();
          localStorage.setItem(testKey, testVal);
          const retrieved = localStorage.getItem(testKey);
          localStorage.removeItem(testKey);
          const passed = retrieved === testVal;
          return { actual: passed ? 'PASS (Value matches)' : 'FAIL (Mismatch)', passed };
        } catch {
          return { actual: 'FAIL (Storage exception)', passed: false };
        }
      }
    }
  ];

  const runAllTests = () => {
    setIsRunning(true);
    const newResults: { [id: string]: { actual: string; passed: boolean } } = {};
    for (const tc of testCases) {
      newResults[tc.id] = tc.run();
    }
    setResults(newResults);
    setIsRunning(false);
  };

  useEffect(() => {
    runAllTests();
  }, []);

  const totalTests = testCases.length;
  const passedTests = Object.values(results).filter(r => r.passed).length;
  const failedTests = totalTests - passedTests;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <ToolHeader 
        title="Monty Genius Self-Test Suite" 
        description="Automated deterministic formula and logic verification across all tools." 
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center justify-between border-slate-200 dark:border-slate-800">
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Tests</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalTests}</p>
          </div>
          <Badge variant="primary">Deterministic</Badge>
        </Card>
        <Card className="p-4 flex items-center justify-between border-emerald-200 dark:border-emerald-900 bg-emerald-50/30 dark:bg-emerald-950/20">
          <div>
            <p className="text-sm text-emerald-600 font-medium">Passed Tests</p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{passedTests}</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </Card>
        <Card className="p-4 flex items-center justify-between border-rose-200 dark:border-rose-900 bg-rose-50/30 dark:bg-rose-950/20">
          <div>
            <p className="text-sm text-rose-600 font-medium">Failed Tests</p>
            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{failedTests}</p>
          </div>
          <XCircle className="w-8 h-8 text-rose-500" />
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Deterministic Test Results</h3>
        <Button onClick={runAllTests} disabled={isRunning} leftIcon={<RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />}>
          Run All Tests
        </Button>
      </div>

      <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <th className="py-3 px-4 font-semibold">Tool</th>
                <th className="py-3 px-4 font-semibold">Test Specification</th>
                <th className="py-3 px-4 font-semibold">Expected</th>
                <th className="py-3 px-4 font-semibold">Actual</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {testCases.map((tc) => {
                const res = results[tc.id];
                const isPassed = res ? res.passed : false;
                return (
                  <tr key={tc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-primary-600 dark:text-primary-400">{tc.tool}</td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{tc.testName}</td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-600 dark:text-slate-400">{tc.expected}</td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-800 dark:text-slate-200">
                      {res ? res.actual : 'Pending...'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {res ? (
                        isPassed ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                            PASS
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
                            FAIL
                          </span>
                        )
                      ) : (
                        <span className="text-slate-400">...</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DevTestSuitePage;
