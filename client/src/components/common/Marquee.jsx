import React from 'react';

export default function Marquee({ items, reverse = false, speed = '35s' }) {
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Edge Gradients for smooth fade - Lite ivory fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-paper-50 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-paper-50 to-transparent z-10" />

      <div
        className={`flex min-w-full shrink-0 items-center gap-12 whitespace-nowrap ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
        style={{ animationDuration: speed }}
      >
        {repeatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-ink-500 font-serif tracking-widest uppercase text-sm md:text-base hover:text-gold-700 transition-colors font-medium"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-500/60" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
