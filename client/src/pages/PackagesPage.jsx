import React from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import SpotlightCard from '../components/common/SpotlightCard.jsx';

export default function PackagesPage({ packages, onOpenBooking, setActivePage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Minimal Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>Production Tiers</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink-950">
          Transparent Curation
        </h1>
        <p className="text-sm text-ink-600 font-light">
          Defined benchmarks with infinite room for bespoke customization.
        </p>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {packages.map((pkg) => (
          <SpotlightCard
            key={pkg.id}
            className={`p-6 sm:p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 bg-white ${
              pkg.recommended
                ? 'border-2 border-gold-500 shadow-lux-lg relative lg:-translate-y-2 bg-gradient-to-b from-gold-50/40 via-white to-white'
                : 'border border-paper-300 shadow-lux'
            }`}
          >
            <div className="space-y-5">
              <div>
                {pkg.recommended && (
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-gold-600 to-amber-500 text-white font-bold uppercase text-[10px] tracking-widest px-3 py-0.5 rounded-full shadow-sm mb-3">
                    <Sparkles className="w-3 h-3 text-gold-200" />
                    <span>Most Revered</span>
                  </div>
                )}
                <h3 className="text-xl font-serif font-bold text-ink-900">
                  {pkg.name}
                </h3>
                <p className="text-xs text-ink-500 mt-1 line-clamp-2 font-light">
                  {pkg.tagline}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-paper-100 border border-paper-300">
                <span className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold block">
                  Starting Investment
                </span>
                <div className="font-serif text-2xl font-bold gold-text-gradient mt-0.5">
                  {pkg.startingPrice}
                </div>
                <div className="flex items-center justify-between text-[11px] text-ink-500 mt-2 pt-2 border-t border-paper-200">
                  <span>{pkg.guestCap}</span>
                  <span>{pkg.timeline}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-ink-700">
                {pkg.features?.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-paper-200">
              <button
                onClick={onOpenBooking}
                className={`w-full py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-all ${
                  pkg.recommended
                    ? 'btn-gold shadow-md'
                    : 'bg-paper-100 hover:bg-paper-200 text-ink-900 border border-paper-300'
                }`}
              >
                Inquire For This Tier
              </button>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Clean Bottom Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-paper-100 border border-gold-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <h4 className="text-base font-serif font-bold text-ink-950">
            Need custom scoping for your wedding?
          </h4>
          <p className="text-xs text-ink-600 font-light">
            Use the real-time budget simulator for live guest and stagecraft projections.
          </p>
        </div>
        <button
          onClick={() => setActivePage('calculator')}
          className="btn-gold px-5 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider shrink-0 flex items-center gap-1.5"
        >
          <span>Open Estimator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
