import React from 'react';
import { Calculator, HelpCircle } from 'lucide-react';
import EventCalculator from '../components/calculator/EventCalculator.jsx';

export default function CalculatorPage({ onOpenBooking }) {
  const faqs = [
    {
      q: 'How accurate is this predictive estimator?',
      a: 'Our algorithmic model calculates allocations based on verified line-item data from 980+ international productions executed over the past 5 years. Final line items will be confirmed during your custom 3D technical blueprint review.'
    },
    {
      q: 'Are local municipal taxes, permits, and customs included?',
      a: 'The management and governance fee (18%) covers our lead producer team, permit applications, and vendor orchestration. Statutory local city permits and cross-border customs are itemized transparently in your final agreement.'
    },
    {
      q: 'What is the minimum lead time required?',
      a: 'For signature productions, we advise 3 to 6 months. For grand international galas with custom temporary architecture, 6 to 12 months allows optimal securing of heritage venues and Michelin guest chefs.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-semibold uppercase tracking-widest shadow-sm">
          <Calculator className="w-3.5 h-3.5 text-gold-600" />
          <span>Real-time Financial Modeling</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-ink-950">
          Event Scope & Budget Estimator
        </h1>
        <p className="text-sm sm:text-base text-ink-600 font-light leading-relaxed">
          Manipulate guest attendance, staging architecture tiers, Michelin gastronomical pairings, and iconic spectacle add-ons to simulate your investment.
        </p>
      </div>

      {/* Main Interactive Tool Component */}
      <EventCalculator onOpenBooking={onOpenBooking} />

      {/* FAQ on Budget & Scope */}
      <div className="max-w-3xl mx-auto space-y-6 pt-12 border-t border-paper-300">
        <h3 className="text-2xl font-serif font-bold text-ink-950 text-center">
          Planning Governance & Budget FAQ
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-paper-300 shadow-lux-sm space-y-2">
              <h4 className="text-sm font-serif font-bold text-gold-800 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-gold-600 shrink-0" />
                {faq.q}
              </h4>
              <p className="text-xs text-ink-600 leading-relaxed pl-6 font-light">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
