import React, { useState } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export default function ProductTitleGenerator() {
  const [data, setData] = useState({
    brand: 'Nike',
    product: 'Running Shoes',
    features: 'Lightweight, Breathable',
    color: 'Black',
    size: '10 UK',
    material: 'Mesh'
  });

  const generateTitles = () => {
    const { brand, product, features, color, size, material } = data;
    return [
      `${brand} ${product} for Men/Women - ${color}, ${size}`,
      `${brand} ${material} ${product} (${features}) - ${color}`,
      `${product} by ${brand} | ${features} | Size ${size} | ${color}`,
      `Premium ${brand} ${product} - ${color} ${material} (${size})`
    ];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied!');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToolHeader title="Product Title Generator" description="Generate SEO-friendly product titles using templates." />
      
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(data).map(key => (
            <div key={key}>
              <label className="block mb-1 capitalize">{key}</label>
              <input 
                type="text" 
                value={data[key as keyof typeof data]} 
                onChange={(e) => setData({...data, [key]: e.target.value})}
                className="w-full border rounded p-2"
              />
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-4">
        {generateTitles().map((title, idx) => (
          <Card key={idx} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-lg">{title}</p>
              <p className="text-sm text-gray-500 mt-1">{title.length} characters</p>
            </div>
            <Button onClick={() => copyToClipboard(title)} variant="outline">Copy</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
