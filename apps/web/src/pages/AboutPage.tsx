import React from 'react';
import { Card } from '../components/ui/Card';
import { ShieldCheck, Zap, Heart, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
    <div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        About MONTY GENIUS ECOM TOOLS
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300">
        Free Tools for Smart Online Sellers
      </p>
    </div>

    <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Story & Mission</h2>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
        <strong>MONTY GENIUS ECOM TOOLS</strong> was designed and developed with ❤️ by <strong>Mr. Monty Genius</strong> to provide independent, high-speed, free utilities for online sellers across India and the globe.
      </p>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
        Modern online entrepreneurs face dozens of friction points every single day: calculating complex GST slabs, accounting for marketplace deductions, cropping multi-page PDF shipping labels, resizing images for catalog guidelines, generating SKU barcodes, and creating invoices. Most commercial software charges hefty recurring monthly fees for basic utilities that can be computed directly on the seller's computer.
      </p>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
        Our mission is simple: provide an extensive, professional, 100% free open-source toolkit that sellers can rely on every single day without subscriptions, without logins, and without sacrificing privacy.
      </p>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-2">
        <div className="p-2.5 bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 rounded-lg w-fit">
          <Zap className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Client-Side Speed</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Heavy PDF and image transformations run right inside your browser using fast Canvas and WebAssembly technologies.
        </p>
      </Card>

      <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-2">
        <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg w-fit">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Uncompromised Privacy</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          We never upload your customer lists, sales figures, shipping labels, or SKU sheets to third-party databases.
        </p>
      </Card>

      <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-2">
        <div className="p-2.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg w-fit">
          <Heart className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Always 100% Free</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Built as a community-first utility. No credit cards, no trial periods, and no locked features.
        </p>
      </Card>
    </div>

    {/* Marketplace Disclaimer */}
    <Card className="p-6 border-amber-200 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-950/20 space-y-2">
      <h3 className="font-bold text-amber-900 dark:text-amber-300 text-sm">Independent Utility & Marketplace Disclaimer</h3>
      <p className="text-xs text-amber-800 dark:text-amber-300/80 leading-relaxed">
        MONTY GENIUS ECOM TOOLS is an independent collection of seller productivity utilities. We are NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with Amazon, Flipkart, Meesho, Ecomdost, FabulaTech, or any of their subsidiaries or affiliates. Marketplace fees, shipping charges, taxes, policies, and seller requirements are subject to change by their respective companies. All calculator outputs are configurable estimates and should always be verified against the official documentation of the applicable platform.
      </p>
    </Card>
  </div>
);

export default AboutPage;
