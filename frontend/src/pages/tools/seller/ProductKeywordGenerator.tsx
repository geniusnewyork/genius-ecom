import React, { useState } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export default function ProductKeywordGenerator() {
  const [data, setData] = useState({
    product: 'Water Bottle',
    material: 'Stainless Steel',
    usecase: 'Gym, Hiking, Office',
    audience: 'Men, Women, Kids'
  });

  const generateKeywords = () => {
    const keywords = new Set<string>();
    const { product, material, usecase, audience } = data;
    
    keywords.add(product.toLowerCase());
    keywords.add(`${material} ${product}`.toLowerCase());
    
    usecase.split(',').forEach(u => {
      keywords.add(`${product} for ${u.trim()}`.toLowerCase());
    });
    
    audience.split(',').forEach(a => {
      keywords.add(`${product} for ${a.trim()}`.toLowerCase());
      keywords.add(`${a.trim()} ${product}`.toLowerCase());
    });
    
    return Array.from(keywords);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToolHeader title="Keyword Generator" description="Generate search keywords based on product properties." />
      
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
                placeholder={key === 'usecase' ? 'comma separated' : ''}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Generated Keywords ({generateKeywords().length})</h3>
          <Button onClick={() => {
            navigator.clipboard.writeText(generateKeywords().join(', '));
            alert('Copied all keywords!');
          }} variant="outline">Copy All (Comma Separated)</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {generateKeywords().map((kw, idx) => (
            <div key={idx} className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => {
              navigator.clipboard.writeText(kw);
            }}>
              {kw}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">Click a keyword to copy it individually.</p>
      </Card>
    </div>
  );
}
