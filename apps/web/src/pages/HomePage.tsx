import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Star, TrendingUp, ShieldCheck, Calculator, Percent, 
  Crop, Minimize, QrCode, Hash, ChevronDown, ChevronUp, Sparkles, 
  Puzzle, Download, Trash2, Heart, Clock, CheckCircle2, Layers,
  FileText, Wand2, Table, HelpCircle, ExternalLink
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { tools } from '../data/tools';
import { useAppStore } from '../store/useAppStore';

export const HomePage: React.FC = () => {
  const { favorites, recentTools, addFavorite, removeFavorite, clearAllData } = useAppStore();
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({ 0: true });

  const toggleFaq = (idx: number) => {
    setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const quickTools = [
    { id: 'profit-calculator', name: 'Profit Calculator', desc: 'Net profit, margins & break-even calculation', icon: Calculator, path: '/tools/profit-calculator', badge: 'Popular' },
    { id: 'gst-calculator', name: 'GST Calculator', desc: 'Inclusive & exclusive tax breakdown with 5-28% presets', icon: Percent, path: '/tools/gst-calculator', badge: 'Instant' },
    { id: 'pdf-cropper', name: 'PDF Cropper', desc: 'Crop margins for shipping labels & packing slips', icon: Crop, path: '/tools/pdf-cropper', badge: 'Client-Side' },
    { id: 'image-compressor', name: 'Image Compressor', desc: 'Compress JPG, PNG & WebP images without losing clarity', icon: Minimize, path: '/tools/image-compressor', badge: 'Batch ZIP' },
    { id: 'qr-code-generator', name: 'QR Code Generator', desc: 'Generate UPI, WhatsApp, URLs & Wi-Fi QR codes', icon: QrCode, path: '/tools/qr-code-generator', badge: 'Vector/SVG' },
    { id: 'sku-generator', name: 'SKU Generator', desc: 'Create systematic, unique product inventory codes', icon: Hash, path: '/tools/sku-generator', badge: 'Bulk' }
  ];

  const categories = [
    { id: 'calculators', name: 'Seller Calculators', count: '10 Tools', desc: 'Profit, GST, Margins, RTO loss, marketplace fee estimations', icon: Calculator, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40' },
    { id: 'pdf', name: 'PDF Tools', count: '10 Tools', desc: 'Crop, merge, split, extract, rotate & N-up layout tools', icon: FileText, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40' },
    { id: 'image', name: 'Image Tools', count: '9 Tools', desc: 'Compressor, resizer, converter, cropper & product formatter', icon: Minimize, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40' },
    { id: 'seller', name: 'Seller Utilities', count: '13 Tools', desc: 'SKU, QR, Barcode, Labels, Invoices, HSN helper & CSV tools', icon: Layers, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' },
    { id: 'ai', name: 'AI Product Tools', count: 'Provider Ready', desc: 'Title, description, bullets & SEO keyword generators', icon: Wand2, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40' },
    { id: 'csv', name: 'CSV & Data Tools', count: 'Client-Side', desc: 'CSV cleaner, duplicate remover, sorter & column mapper', icon: Table, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' }
  ];

  const popularTools = tools.slice(0, 6);

  const faqs = [
    {
      q: 'Are these tools completely free to use?',
      a: 'Yes, 100% free forever. MONTY GENIUS ECOM TOOLS was built by Mr. Monty Genius so that online sellers can perform vital day-to-day operations without purchasing expensive software subscriptions.'
    },
    {
      q: 'Are my private seller files, images or CSV uploaded to your servers?',
      a: 'No. All PDF operations, image processing, barcodes, QR codes, and CSV computations run locally inside your browser using client-side JavaScript. Your confidential business data never leaves your computer.'
    },
    {
      q: 'Do I need an account or login to use the tools?',
      a: 'No login is required. The entire suite operates instantly out of the box with zero sign-up friction.'
    },
    {
      q: 'How does the Chrome Extension assist sellers?',
      a: 'The MONTY GENIUS SELLER ASSISTANT Chrome Extension (Manifest V3) lets you save product catalogs locally and map custom form fields to autofill seller listing portals safely without scraping restricted data.'
    },
    {
      q: 'Are the marketplace fee rates officially guaranteed?',
      a: 'Marketplace fees, shipping rules, and GST rates are user-configurable estimates. Because platform rules change regularly, we provide editable presets that you can adjust to reflect your actual seller contract terms.'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50/60 via-white to-blue-50/50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free Open-Source Seller Toolkit</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Free Tools for <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
              Smart Online Sellers
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal">
            Master your e-commerce operations. Instant profit calculators, client-side PDF processors, image converters, and Chrome autofill assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link to="/all-tools">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Explore All 40+ Tools
              </Button>
            </Link>
            <Link to="/dev/test-suite">
              <Button size="lg" variant="outline" leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}>
                Self-Test Verification
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Real Local Data Statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center space-x-4 border-slate-200 dark:border-slate-800">
          <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{tools.length}+</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Available Free Tools</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center space-x-4 border-slate-200 dark:border-slate-800">
          <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{favorites.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Saved Favorites</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center space-x-4 border-slate-200 dark:border-slate-800">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{recentTools.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Recently Used</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-slate-200 dark:border-slate-800">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Local Privacy</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">100% In-Browser</p>
          </div>
          {(favorites.length > 0 || recentTools.length > 0) && (
            <button
              onClick={() => {
                if (confirm('Clear all your locally saved recent tools and favorites?')) {
                  clearAllData();
                }
              }}
              className="text-xs text-rose-500 hover:text-rose-600 flex items-center p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              title="Clear Local Data"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
            </button>
          )}
        </Card>
      </section>

      {/* Quick Tools Launchpad */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Quick Tools Launchpad</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Essential daily utilities for instant seller tasks.</p>
          </div>
          <Link to="/all-tools" className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 font-medium text-sm flex items-center">
            All tools <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quickTools.map((qt) => {
            const IconComponent = qt.icon;
            const isFav = favorites.includes(qt.id);
            return (
              <Link key={qt.id} to={qt.path} className="group">
                <Card className="h-full p-5 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all hover:shadow-md border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="primary">{qt.badge}</Badge>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            isFav ? removeFavorite(qt.id) : addFavorite(qt.id);
                          }}
                          className={`p-1 rounded-full ${isFav ? 'text-amber-500 fill-amber-500' : 'text-slate-400 hover:text-amber-500'}`}
                        >
                          <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-base group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {qt.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {qt.desc}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center text-xs font-medium text-cyan-600 dark:text-cyan-400">
                    <span>Open tool</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tool Categories</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Explore specialized suites tailored for modern e-commerce.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.id} to={`/category/${cat.id}`}>
                <Card className="h-full p-5 hover:border-slate-400 dark:hover:border-slate-600 transition-all hover:shadow-md border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-3 rounded-xl ${cat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{cat.name}</h3>
                      <span className="text-xs font-semibold text-slate-400">{cat.count}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {cat.desc}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Chrome Extension Section */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-medium">
            <Puzzle className="w-4 h-4" />
            <span>Official Chrome Extension Included (Manifest V3)</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            MONTY GENIUS SELLER ASSISTANT
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Eliminate repetitive copy-pasting during product listings. Save your products, configure custom CSS selectors for any portal, and autofill product attributes securely without risking credentials or violating portal safety.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Configurable CSS Selectors</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Local Offline Storage</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Manifest V3 Compliant</span>
            </div>
          </div>
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a 
              href="#extension-info" 
              onClick={(e) => {
                e.preventDefault();
                alert('The extension is located inside the /extension folder of this project! Load unpacked in chrome://extensions to run it.');
              }}
            >
              <Button variant="primary" leftIcon={<Download className="w-4 h-4" />}>
                Extension Ready in /extension
              </Button>
            </a>
            <Link to="/about">
              <Button variant="outline" className="text-white border-slate-600 hover:bg-slate-800">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Tools Featurette */}
      <section className="p-8 rounded-3xl border border-purple-200/60 dark:border-purple-900/30 bg-purple-50/40 dark:bg-purple-950/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-medium mb-2">
              <Wand2 className="w-3.5 h-3.5" />
              <span>Optional & Private AI Layer</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI Product Optimization Tools</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Connect your own OpenAI, Google Gemini, OpenRouter API keys or run locally with Ollama. Zero server retention.
            </p>
          </div>
          <Link to="/tools/ai-product-tools">
            <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open AI Generator
            </Button>
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-4 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Everything you need to know about Monty Genius Ecom Tools.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <Card key={idx} className="overflow-hidden border-slate-200 dark:border-slate-800">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left flex justify-between items-center font-semibold text-slate-900 dark:text-white text-sm"
              >
                <span>{faq.q}</span>
                {faqOpen[idx] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {faqOpen[idx] && (
                <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 mt-1">
                  {faq.a}
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Marketplace Disclaimer */}
      <section className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-xs leading-relaxed max-w-4xl mx-auto text-center">
        <p className="font-semibold mb-1">Marketplace Disclaimer</p>
        Marketplace fees, shipping charges, taxes, policies and seller requirements can change. Calculator values are configurable estimates and should be verified against the applicable marketplace's current official documentation. Monty Genius Ecom Tools is an independent utility and is not affiliated with Amazon, Flipkart, Meesho, or any other commercial marketplace.
      </section>
    </div>
  );
};

export default HomePage;
