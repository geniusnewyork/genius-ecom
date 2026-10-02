import React, { useState } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export default function ShippingLabelFormatter() {
  const [data, setData] = useState({
    fromName: 'Seller Store',
    fromAddress: '123 Main St, City, State 12345',
    toName: 'John Doe',
    toAddress: '456 Buyer Rd, Town, State 67890',
    orderId: 'ORD-987654321',
    weight: '1.5 kg',
    dimensions: '20x15x10 cm'
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToolHeader title="Shipping Label Formatter" description="Generate shipping labels for orders." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4 print:hidden">
          <h3 className="font-bold mb-2">Shipping Details</h3>
          {Object.keys(data).map(key => (
            <div key={key}>
              <label className="block mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
              <input 
                type="text" 
                value={data[key as keyof typeof data]} 
                onChange={(e) => setData({...data, [key]: e.target.value})}
                className="w-full border rounded p-2"
              />
            </div>
          ))}
          <Button onClick={() => window.print()}>Print Label</Button>
        </Card>

        <Card className="p-6 bg-white text-black print:w-full print:h-full print:shadow-none print:border-none">
          <div className="border-2 border-black p-4 h-full flex flex-col">
            <div className="border-b-2 border-black pb-4 mb-4">
              <h2 className="font-bold text-lg mb-1">FROM:</h2>
              <p className="font-semibold">{data.fromName}</p>
              <p className="whitespace-pre-wrap">{data.fromAddress}</p>
            </div>
            
            <div className="flex-grow mb-4">
              <h2 className="font-bold text-xl mb-2">TO:</h2>
              <p className="font-bold text-lg">{data.toName}</p>
              <p className="text-lg whitespace-pre-wrap">{data.toAddress}</p>
            </div>
            
            <div className="border-t-2 border-black pt-4 grid grid-cols-2 gap-4">
              <div>
                <p><span className="font-bold">Order ID:</span> {data.orderId}</p>
              </div>
              <div className="text-right">
                <p><span className="font-bold">Weight:</span> {data.weight}</p>
                <p><span className="font-bold">Dim:</span> {data.dimensions}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
