import React from 'react';
import { Sparkles, MapPin, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SpotlightCard from '../components/common/SpotlightCard.jsx';

export default function VenuesPage({ venues, onOpenBooking }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-semibold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>Heritage Estates</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-ink-950">
          Royal Palaces & Estates
        </h1>
        <p className="text-sm sm:text-base text-ink-600 font-light leading-relaxed">
          Exclusive access to private island palaces, sandstone fortresses, and luxury heritage retreats across India.
        </p>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {venues.map((venue) => (
          <SpotlightCard
            key={venue.id}
            className="group bg-white border border-paper-300 hover:border-gold-400 rounded-3xl overflow-hidden flex flex-col justify-between shadow-lux"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md text-gold-900 font-semibold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-gold-300 shadow-sm">
                  {venue.priceTier}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-xs text-white flex items-center justify-between font-medium">
                <span className="flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-gold-300" />
                  {venue.location.split(',')[0]}
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  <Users className="w-3.5 h-3.5 text-gold-300" />
                  {venue.capacity}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-ink-900 group-hover:text-gold-700 transition-colors">
                  {venue.name}
                </h3>
                <p className="text-xs text-gold-800 font-medium">
                  {venue.vibe}
                </p>
                <div className="space-y-1.5 pt-2">
                  {venue.highlights?.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-ink-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-paper-200">
                <button
                  onClick={onOpenBooking}
                  className="w-full btn-gold py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider text-center"
                >
                  Inquire For Availability
                </button>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Bespoke Scouting Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gold-300 shadow-lux flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>Private Scouting</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            Unlisted Palaces & Private Forts
          </h3>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-light">
            Direct access to unlisted Rajput havelis, Assam tea estates, and private island sanatoria.
          </p>
        </div>
        <button
          onClick={onOpenBooking}
          className="btn-gold px-8 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider shrink-0 w-full sm:w-auto"
        >
          Request Private Scouting
        </button>
      </div>

    </div>
  );
}
