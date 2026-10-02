import React from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Zap,
  CheckCircle,
  Puzzle,
  Laptop,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const ExtensionsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
          <Puzzle className="w-3.5 h-3.5" />
          <span>Manifest V3 Chrome Extension</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tight">
          MONTY GENIUS SELLER ASSISTANT
        </h1>
        <p className="mt-4 text-lg text-slate-400 leading-relaxed">
          The ultimate productivity extension for smart online sellers. Automate repetitive form filling on Meesho, Amazon, Flipkart, and Shopify with 1-click form autofill and local product catalog storage.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#install-guide"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 inline-flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            <span>Install Extension (Unpacked)</span>
          </a>
          <Link
            to="/pricing"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm inline-flex items-center gap-2 transition"
          >
            <span>View Pro Plans</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Feature Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">1-Click Form Autofill</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Eliminate repetitive typing. Open any seller portal draft page, select a product from your catalog, and click Autofill. Title, SKU, Price, MRP, HSN, and Description fill in 1 second.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">Universal CSS Mappings</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Marketplaces update their form HTML often. Easily adjust field CSS selectors in the extension settings with our built-in live element inspector.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
            <Laptop className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">Multi-Device & Offline Support</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Activate your license on your desktop, laptop, or packing workstation. Supports 72-hour offline operation without failing when internet dips.
          </p>
        </div>
      </div>

      {/* Installation Guide */}
      <div id="install-guide" className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 mb-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-6">
          How to Install in Google Chrome, Brave, or Microsoft Edge
        </h2>

        <div className="space-y-6 text-sm text-slate-300">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">1</span>
            <div>
              <strong className="text-slate-100 block mb-1">Open Chrome Extensions Manager:</strong>
              Type <code className="bg-slate-950 px-2 py-0.5 rounded text-cyan-400 font-mono">chrome://extensions/</code> in your browser address bar and press Enter.
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">2</span>
            <div>
              <strong className="text-slate-100 block mb-1">Enable Developer Mode:</strong>
              Turn ON the <strong>Developer mode</strong> toggle located at the top-right corner of the Extensions page.
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">3</span>
            <div>
              <strong className="text-slate-100 block mb-1">Click "Load unpacked":</strong>
              Click the <strong>Load unpacked</strong> button at the top-left, and select the extension directory:
              <pre className="mt-2 bg-slate-950 p-3 rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto">
m:\MONTY GENIUS ECOM TOOLS\apps\extension
              </pre>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">4</span>
            <div>
              <strong className="text-slate-100 block mb-1">Pin to Toolbar:</strong>
              Click the Chrome puzzle piece icon in the top toolbar and click the <strong>Pin 📌</strong> button next to <strong>MONTY GENIUS SELLER ASSISTANT</strong>.
            </div>
          </div>
        </div>

        {/* Safety Note */}
        <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong>Compliance & Safety Guarantee:</strong> The extension operates only within your active, logged-in session. It never bypasses CAPTCHAs, does not scrape unauthorized marketplace databases, and never shares your passwords or customer info.
          </p>
        </div>
      </div>
    </div>
  );
};
