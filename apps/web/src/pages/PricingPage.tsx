import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Zap, Sparkles, Laptop, Infinity as InfinityIcon } from 'lucide-react';
import { DEFAULT_PLANS, FEATURES } from '@monty-genius/config';
import type { PlanId } from '@monty-genius/shared-types';

export const PricingPage: React.FC = () => {
  const plans = Object.values(DEFAULT_PLANS);

  const getPlanIcon = (id: PlanId) => {
    switch (id) {
      case 'FREE':
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'PRO':
        return <Zap className="w-6 h-6 text-cyan-400" />;
      case 'BUSINESS':
        return <Sparkles className="w-6 h-6 text-purple-400" />;
      case 'LIFETIME':
        return <InfinityIcon className="w-6 h-6 text-amber-400" />;
    }
  };

  const getPlanBadge = (id: PlanId) => {
    switch (id) {
      case 'FREE':
        return 'Free Forever';
      case 'PRO':
        return 'Most Popular';
      case 'BUSINESS':
        return 'Multi-Seat / Agency';
      case 'LIFETIME':
        return 'Best Value • One-Time';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent, Seller-Friendly Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tight">
          Supercharge Your E-Commerce Business
        </h1>
        <p className="mt-4 text-lg text-slate-400 leading-relaxed">
          Use all 40+ browser tools 100% free forever without creating an account. Upgrade when you need the automated Seller Assistant Chrome Extension, multi-device activation, and team tools.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => {
          const isPro = plan.id === 'PRO';
          const isLifetime = plan.id === 'LIFETIME';

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                isPro
                  ? 'bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-900 border-2 border-cyan-500/80 shadow-2xl shadow-cyan-500/10 scale-105 z-10'
                  : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-xl'
              } p-6 sm:p-8`}
            >
              {/* Badge */}
              <div className="flex justify-between items-center mb-6">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  {getPlanIcon(plan.id)}
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    isPro
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                      : isLifetime
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {getPlanBadge(plan.id)}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl font-bold text-slate-100">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-2 min-h-[36px]">{plan.description}</p>

                {/* Price Display */}
                <div className="mt-6 mb-6 flex items-baseline">
                  <span className="text-4xl font-black text-slate-100">
                    {plan.price === 0 ? '₹0' : `₹${plan.price.toLocaleString('en-IN')}`}
                  </span>
                  <span className="text-xs font-medium text-slate-400 ml-2">
                    {plan.durationDays === 0
                      ? plan.price === 0
                        ? '/ forever'
                        : '/ one-time lifetime'
                      : '/ year'}
                  </span>
                </div>

                {/* Device Limit Box */}
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-xs text-slate-300 mb-6">
                  <Laptop className="w-4 h-4 text-cyan-400" />
                  <span>
                    Up to <strong>{plan.maxDevices} {plan.maxDevices === 1 ? 'Device' : 'Devices'}</strong> active concurrently
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    What's Included:
                  </p>
                  {plan.features.map((featureKey) => {
                    const feat = FEATURES[featureKey];
                    return (
                      <div key={featureKey} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat ? feat.label : featureKey}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div>
                {plan.id === 'FREE' ? (
                  <Link
                    to="/tools"
                    className="w-full py-3 px-4 rounded-xl text-center font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition block"
                  >
                    Start Using Free Tools
                  </Link>
                ) : (
                  <Link
                    to="/extensions"
                    className={`w-full py-3 px-4 rounded-xl text-center font-bold text-xs transition block ${
                      isPro
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                        : isLifetime
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-lg shadow-amber-500/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700'
                    }`}
                  >
                    Get {plan.name} License
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Box */}
      <div className="mt-16 bg-slate-900/60 border border-slate-800 rounded-2xl p-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-sm">🔒 100% Client-Side Privacy</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your sales data, invoice numbers, product costs, and customer sheets never touch any cloud server.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-sm">💻 Seamless Device Migration</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bought a new laptop? Easily transfer your license key and deactivate old devices in 1-click.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-sm">⚡ Free Offline Mode</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Activated extension works offline for up to 72 hours without requiring continuous internet connectivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
