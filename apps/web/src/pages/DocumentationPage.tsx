import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Calculator,
  FileText,
  Image,
  Tag,
  Puzzle,
  Key,
  Shield,
  ArrowRight
} from 'lucide-react';

export const DocumentationPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>User & Developer Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          MONTY GENIUS Documentation Center
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          Everything you need to master our free e-commerce calculators, in-browser PDF utilities, image formatters, and the Seller Assistant extension.
        </p>
      </div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-2">Seller Calculators</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Learn mathematical formulas for net profit, statutory GST extraction, gross margin vs. markup, RTO loss ratios, and break-even points.
          </p>
          <Link to="/tools" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1">
            <span>Explore Calculators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-2">PDF Tools Guide</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            How to crop marketplace labels for 4x6 thermal printers, merge dispatch slips, and format 2-up/4-up N-up layouts in browser memory.
          </p>
          <Link to="/tools" className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
            <span>Explore PDF Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
            <Image className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-2">Image Processing</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Format catalog photography to compliant 1000x1000 square canvases with pure white backgrounds and batch ZIP compression.
          </p>
          <Link to="/tools" className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1">
            <span>Explore Image Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
            <Tag className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-2">Barcodes & Labels</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Generate Code 128, EAN-13, and UPC-A standard barcodes, QR codes for UPI/WhatsApp, and retail packaging labels.
          </p>
          <Link to="/tools" className="text-xs font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1">
            <span>Explore Utilities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
            <Puzzle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-2">Seller Assistant Extension</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Learn how to load unpacked, save product catalogs, map CSS selectors, and perform 1-click autofill on seller portals.
          </p>
          <Link to="/extensions" className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1">
            <span>Extension Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition">
          <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-2">License & Activation</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Understanding device activation, offline token grace periods, and moving your license to a new laptop.
          </p>
          <Link to="/pricing" className="text-xs font-semibold text-rose-400 hover:text-rose-300 inline-flex items-center gap-1">
            <span>License Info</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Offline Guarantee */}
      <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200">
        <h4 className="font-bold text-sm text-cyan-300 mb-1">Architecture & Data Privacy Principle</h4>
        <p className="leading-relaxed">
          MONTY GENIUS ECOM TOOLS is engineered with client-side priority. When you crop PDFs, convert images, or generate barcodes, processing happens in your browser's Web Workers and Canvas without transmitting confidential business records to external servers.
        </p>
      </div>
    </div>
  );
};
