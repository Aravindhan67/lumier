import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Users, 
  ArrowRight 
} from 'lucide-react';
import SpotlightCard from '../components/common/SpotlightCard.jsx';

export default function PortfolioPage({ events, onSelectEvent, onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Royal Destination Weddings',
    'Grand Sangeet Soirée',
    'Corporate Conclave',
    'Destination Beachside Wedding',
    'Royal Charity Ball',
    'Brand Activation'
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-semibold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>Curated Royal Indian Archive 2021 – 2025</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-ink-950">
          Landmark Celebrations & Conclaves
        </h1>
        <p className="text-sm sm:text-base text-ink-600 font-light leading-relaxed">
          From floating island mandaps in Udaipur to courtyard Sangeets at Rambagh Palace, tech summits at Jio World Centre, and sunset beach vows in Goa.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-white border border-paper-300 shadow-lux-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold-500 text-ink-950 font-bold shadow-sm'
                    : 'bg-paper-100 text-ink-600 hover:text-ink-900 border border-paper-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by palace, city, or client..."
              className="w-full bg-paper-50 border border-paper-300 rounded-xl pl-9 pr-4 py-2 text-xs text-ink-900 placeholder-ink-400 focus:outline-none focus:border-gold-500 shadow-sm"
            />
          </div>

        </div>
      </div>

      {/* Results Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-paper-300 shadow-lux-sm space-y-3">
          <p className="text-ink-500 text-sm">No landmark celebrations found matching your criteria.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="text-xs text-gold-700 underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <SpotlightCard
              key={event.id}
              onClick={() => onSelectEvent(event)}
              className="group cursor-pointer bg-white border border-paper-300 hover:border-gold-400 rounded-3xl overflow-hidden flex flex-col justify-between shadow-lux"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.heroImage}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-gold-900 font-semibold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-gold-300 shadow-sm">
                    {event.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-ink-900/70 backdrop-blur-md text-white font-mono text-[10px] px-2.5 py-1 rounded-full">
                    {event.budgetRange}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-xs text-white flex items-center justify-between font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-300" />
                    {event.location.split(',')[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-gold-300" />
                    {event.guestCount} Guests
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink-900 group-hover:text-gold-700 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-ink-600 line-clamp-3 mt-2 leading-relaxed font-light">
                    {event.headline}
                  </p>
                </div>

                <div className="pt-4 border-t border-paper-200 flex items-center justify-between text-xs">
                  <span className="text-ink-400 truncate max-w-[150px]">
                    {event.client}
                  </span>
                  <span className="text-gold-700 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Case Dossier <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Commission Footer Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-paper-100 via-paper-50 to-paper-100 border border-gold-300 text-center space-y-4 shadow-lux">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
          Ready to Architect Your Royal Celebration?
        </h3>
        <p className="text-sm text-ink-600 max-w-xl mx-auto font-light">
          Our producers are prepared to guide your family through confidential palace scouting, photorealistic 3D mandap simulations, and royal Khansama menu tastings.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenBooking}
            className="btn-gold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-lux"
          >
            Request Private Consultation
          </button>
        </div>
      </div>

    </div>
  );
}
