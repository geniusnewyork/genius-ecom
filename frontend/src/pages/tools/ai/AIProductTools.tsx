import React, { useState, useEffect } from 'react';
import ToolHeader from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Copy, Sparkles, Key, Check, Info, Bot, RefreshCw } from 'lucide-react';
import { copyToClipboard } from '../../../utils/download';

type AIProvider = 'offline' | 'openai' | 'gemini' | 'openrouter' | 'ollama';

export default function AIProductTools() {
  const [provider, setProvider] = useState<AIProvider>('offline');
  const [apiKey, setApiKey] = useState('');
  const [ollamaEndpoint, setOllamaEndpoint] = useState('http://localhost:11434');
  const [model, setModel] = useState('gpt-4o-mini');

  // Product Inputs
  const [productName, setProductName] = useState('Wireless Noise Cancelling Over-Ear Headphones');
  const [brand, setBrand] = useState('AuraSound');
  const [category, setCategory] = useState('Electronics');
  const [keyFeatures, setKeyFeatures] = useState('40h battery life, Active Noise Cancellation, Bluetooth 5.3, memory foam earcups, fast USB-C charging');
  const [targetMarketplace, setTargetMarketplace] = useState('Amazon');

  // Outputs
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [generatedTitle, setGeneratedTitle] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [generatedBullets, setGeneratedBullets] = useState<string[]>([]);
  const [generatedKeywords, setGeneratedKeywords] = useState<string[]>([]);
  const [generatedAttributes, setGeneratedAttributes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    try {
      const storedKey = localStorage.getItem('mg_ai_key');
      const storedProvider = localStorage.getItem('mg_ai_provider') as AIProvider;
      if (storedKey) setApiKey(storedKey);
      if (storedProvider) setProvider(storedProvider);
    } catch (e) {
      console.warn('Storage access', e);
    }
  }, []);

  const handleSaveConfig = () => {
    localStorage.setItem('mg_ai_key', apiKey);
    localStorage.setItem('mg_ai_provider', provider);
    alert('AI configuration saved locally in your browser.');
  };

  const handleCopy = (text: string, key: string) => {
    copyToClipboard(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Offline smart rule-based generator for zero-cost immediate usage
  const runOfflineGenerator = () => {
    // High-converting eCommerce Title pattern: [Brand] + [Product Name] + [Top Features] + [Color/Spec] for [Marketplace]
    const title = `${brand} ${productName} with ${keyFeatures.split(',')[0] || 'High Performance'} | Designed for ${targetMarketplace}`;
    
    // Bullet points
    const featuresList = keyFeatures.split(',').map(f => f.trim()).filter(Boolean);
    const bullets = featuresList.map(feat => `✅ ${feat.toUpperCase()}: Engineered for superior performance and everyday reliability in all conditions.`);
    if (bullets.length === 0) {
      bullets.push('✅ PREMIUM QUALITY: Manufactured to meet stringent industry benchmarks.');
      bullets.push('✅ ERGONOMIC DESIGN: Built for seamless daily convenience and durability.');
    }

    // Description
    const description = `Elevate your experience with the ${brand} ${productName}. Designed specifically for demanding customers on ${targetMarketplace}, this ${category.toLowerCase()} standout combines advanced innovation with durable styling.\n\nKey Highlights:\n- ${featuresList.join('\n- ')}\n\nPackage includes original packaging, standard warranty card, and comprehensive user guide. Ideal for personal use and gifting.`;

    // Keywords
    const words = `${productName} ${brand} ${category} ${keyFeatures}`.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');
    const uniqueKeywords = Array.from(new Set(words.filter(w => w.length > 3))).slice(0, 15);

    // Attributes
    const attrs = {
      'Brand': brand,
      'Category': category,
      'Marketplace Target': targetMarketplace,
      'Material / Build': 'Premium Grade Synthetic / Alloy',
      'Warranty': '1 Year Manufacturer Warranty'
    };

    setGeneratedTitle(title);
    setGeneratedDescription(description);
    setGeneratedBullets(bullets);
    setGeneratedKeywords(uniqueKeywords);
    setGeneratedAttributes(attrs);
  };

  const runLiveAIGeneration = async () => {
    setLoading(true);
    try {
      if (provider === 'offline') {
        runOfflineGenerator();
        return;
      }

      const prompt = `You are an expert eCommerce copywriter for ${targetMarketplace}.
Generate optimized listing content for:
Brand: ${brand}
Product Name: ${productName}
Category: ${category}
Key Features: ${keyFeatures}

Return valid JSON with:
{
  "title": "SEO Title under 200 chars",
  "description": "Product Description in 2-3 paragraphs",
  "bullets": ["Bullet 1", "Bullet 2", "Bullet 3", "Bullet 4", "Bullet 5"],
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "attributes": {"Key": "Value"}
}`;

      let resultText = '';

      if (provider === 'openai' || provider === 'openrouter') {
        const url = provider === 'openrouter' ? 'https://openrouter.ai/api/v1/chat/completions' : 'https://api.openai.com/v1/chat/completions';
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: provider === 'openrouter' ? 'meta-llama/llama-3-8b-instruct' : (model || 'gpt-4o-mini'),
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' }
          })
        });
        const data = await res.json();
        resultText = data.choices?.[0]?.message?.content || '';
      } else if (provider === 'gemini') {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${prompt}\nPlease return strict JSON only.` }] }]
          })
        });
        const data = await res.json();
        resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      } else if (provider === 'ollama') {
        const res = await fetch(`${ollamaEndpoint}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'llama3',
            prompt: `${prompt}\nReturn JSON only.`,
            stream: false
          })
        });
        const data = await res.json();
        resultText = data.response || '';
      }

      // Parse JSON from result
      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setGeneratedTitle(parsed.title || '');
        setGeneratedDescription(parsed.description || '');
        setGeneratedBullets(parsed.bullets || []);
        setGeneratedKeywords(parsed.keywords || []);
        setGeneratedAttributes(parsed.attributes || {});
      } else {
        runOfflineGenerator();
      }
    } catch (err: any) {
      console.warn('API call failed, falling back to smart local rules:', err);
      runOfflineGenerator();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <ToolHeader 
        title="AI Product Content Optimizer" 
        description="Generate SEO product titles, Amazon/Flipkart bullet points, rich descriptions, and search backend keywords." 
      />

      {/* Provider Selector Card */}
      <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-cyan-600" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Provider & API Key Architecture</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Keys stored locally in browser storage only</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            label="AI Provider"
            value={provider}
            onChange={e => setProvider(e.target.value as AIProvider)}
            options={[
              { value: 'offline', label: 'Offline Smart Generator (Free / No Key)' },
              { value: 'openai', label: 'OpenAI (GPT-4o / GPT-3.5)' },
              { value: 'gemini', label: 'Google Gemini 1.5' },
              { value: 'openrouter', label: 'OpenRouter (Multi-model)' },
              { value: 'ollama', label: 'Ollama (Localhost / Private)' },
            ]}
          />

          {provider !== 'offline' && provider !== 'ollama' && (
            <Input
              label="API Key"
              type="password"
              placeholder="sk-... or AIzaSy..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
            />
          )}

          {provider === 'ollama' && (
            <Input
              label="Ollama Endpoint"
              placeholder="http://localhost:11434"
              value={ollamaEndpoint}
              onChange={e => setOllamaEndpoint(e.target.value)}
            />
          )}

          <div className="flex items-end">
            <Button variant="outline" onClick={handleSaveConfig} className="w-full">
              Save Preferences
            </Button>
          </div>
        </div>

        {provider === 'offline' && (
          <div className="flex items-center text-xs text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 p-2.5 rounded-lg">
            <Info className="w-4 h-4 mr-2 shrink-0" />
            <span>Using Offline Smart Engine. No API keys needed, 100% free and instantaneous.</span>
          </div>
        )}
      </Card>

      {/* Inputs Form & Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Product Specifications</h3>

            <Input
              label="Brand Name"
              value={brand}
              onChange={e => setBrand(e.target.value)}
              placeholder="e.g. Nike, Philips, Anker..."
            />

            <Input
              label="Product Name"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder="e.g. Wireless Noise Cancelling Headphones"
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="Electronics"
              />
              <Select
                label="Target Marketplace"
                value={targetMarketplace}
                onChange={e => setTargetMarketplace(e.target.value)}
                options={[
                  { value: 'Amazon', label: 'Amazon India / US' },
                  { value: 'Flipkart', label: 'Flipkart' },
                  { value: 'Meesho', label: 'Meesho' },
                  { value: 'Shopify', label: 'Shopify / D2C' },
                  { value: 'Etsy', label: 'Etsy' },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Key Features & Specifications (Comma separated)
              </label>
              <textarea
                className="w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-xs"
                rows={3}
                value={keyFeatures}
                onChange={e => setKeyFeatures(e.target.value)}
                placeholder="40h battery, ANC, fast charge..."
              />
            </div>

            <Button
              onClick={runLiveAIGeneration}
              disabled={loading}
              className="w-full"
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              {loading ? 'Optimizing Listing...' : 'Generate Listing Content'}
            </Button>
          </Card>
        </div>

        {/* Results Showcase */}
        <div className="lg:col-span-7 space-y-4">
          {/* Title */}
          <Card className="p-4 border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Optimized Title</span>
              {generatedTitle && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleCopy(generatedTitle, 'title')}
                  leftIcon={copiedKey === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                >
                  {copiedKey === 'title' ? 'Copied' : 'Copy'}
                </Button>
              )}
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              {generatedTitle || 'Click "Generate Listing Content" to see title here.'}
            </p>
          </Card>

          {/* Bullet Points */}
          <Card className="p-4 border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Key Features / Bullet Points</span>
              {generatedBullets.length > 0 && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleCopy(generatedBullets.join('\n'), 'bullets')}
                  leftIcon={copiedKey === 'bullets' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                >
                  {copiedKey === 'bullets' ? 'Copied' : 'Copy'}
                </Button>
              )}
            </div>
            {generatedBullets.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {generatedBullets.map((b, i) => (
                  <li key={i} className="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                    {b}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No bullet points generated yet.</p>
            )}
          </Card>

          {/* Description */}
          <Card className="p-4 border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Product Description</span>
              {generatedDescription && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleCopy(generatedDescription, 'desc')}
                  leftIcon={copiedKey === 'desc' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                >
                  {copiedKey === 'desc' ? 'Copied' : 'Copy'}
                </Button>
              )}
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 whitespace-pre-line">
              {generatedDescription || 'Product description will appear here.'}
            </p>
          </Card>

          {/* Keywords */}
          {generatedKeywords.length > 0 && (
            <Card className="p-4 border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Backend Search Keywords</span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleCopy(generatedKeywords.join(' '), 'kw')}
                  leftIcon={copiedKey === 'kw' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                >
                  {copiedKey === 'kw' ? 'Copied' : 'Copy All'}
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {generatedKeywords.map((kw, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-mono">
                    {kw}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
