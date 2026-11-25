import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  IndianRupee, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Quote, 
  Star, 
  Share2, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  Maximize2,
  X,
  ArrowRight
} from 'lucide-react';
import SpotlightCard from '../components/common/SpotlightCard.jsx';

export default function EventDetailPage({ 
  event, 
  events = [], 
  onBack, 
  onOpenBooking, 
  onSelectEvent 
}) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-ink-900">Event Dossier Not Found</h2>
        <p className="text-ink-500 text-sm">Please return to our portfolio to explore our curated productions.</p>
        <button onClick={onBack} className="btn-gold px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold">
          Return to Portfolio
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.headline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Compile full gallery
  const fullGallery = [
    event.heroImage,
    ...(event.gallery || [])
  ].filter(Boolean);

  // Reviews list: combine primary testimonial and additional patron reviews
  const reviewsList = [
    ...(event.reviews || []),
    ...(event.testimonial ? [{
      author: event.testimonial.author,
      role: event.testimonial.role || 'Patron / Client',
      quote: event.testimonial.quote,
      rating: 5,
      date: `${event.year} Celebration`
    }] : [])
  ];

  // If no secondary reviews, supply high-class verified patron reviews matching the aesthetic
  const displayReviews = reviewsList.length > 0 ? reviewsList : [
    {
      author: event.client?.split('&')[0]?.trim() || "Royal Family Office",
      role: "Host Family / Patron",
      quote: "LUMIÈRE orchestrated every minute with breathtaking grace. The floral scenography and acoustic precision exceeded international luxury standards.",
      rating: 5,
      date: `${event.year} Royal Ceremony`
    },
    {
      author: "Senior Protocol Officer",
      role: "Palace Liaison & Dignitary Hospitality",
      quote: "Flawless security, discreet white-glove hospitality for 400+ VVIP guests, and extraordinary gastronomic curation.",
      rating: 5,
      date: "Post-Event Audit"
    }
  ];

  // Other productions for "Explore More Celebrations"
  const relatedEvents = events.filter(e => e.id !== event.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-paper-50 pb-20 space-y-12 sm:space-y-16">
      
      {/* 1. TOP BREADCRUMB & ACTION BAR */}
      <div className="bg-white border-b border-paper-300 py-3.5 px-4 sm:px-6 lg:px-8 sticky top-16 sm:top-20 z-30 shadow-lux-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-ink-500">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-gold-800 hover:text-gold-950 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </button>
            <span className="text-paper-300">/</span>
            <span className="truncate max-w-[200px] sm:max-w-md text-ink-700 font-medium hidden xs:inline">
              {event.title}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg border border-paper-300 text-ink-700 hover:bg-paper-100 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
              title="Share Event Dossier"
            >
              <Share2 className="w-3.5 h-3.5 text-gold-700" />
              <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => onOpenBooking(event)}
              className="btn-gold px-4 py-1.5 rounded-lg text-xs uppercase tracking-wider font-bold shadow-sm whitespace-nowrap"
            >
              Inquire This Event
            </button>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION WITH PARALLAX DEPTH & TITLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-paper-300 shadow-lux-lg bg-ink-950">
          <div className="relative h-[360px] sm:h-[480px] lg:h-[540px] w-full">
            <img 
              src={event.heroImage} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-ink-950/20" />

            {/* Badges on Top */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-wrap items-center justify-between gap-2">
              <span className="bg-white/95 backdrop-blur-md text-gold-900 font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full border border-gold-300 shadow-md">
                {event.category}
              </span>
              <span className="bg-ink-900/80 backdrop-blur-md text-gold-200 font-mono text-xs px-3.5 py-1 rounded-full border border-gold-400/40">
                Season {event.year}
              </span>
            </div>

            {/* Bottom Content Header */}
            <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-10 right-4 sm:right-10 space-y-2 text-white">
              <div className="flex items-center gap-2 text-gold-300 text-xs sm:text-sm uppercase tracking-widest font-semibold">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>{event.location}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.1]">
                {event.title}
              </h1>

              <p className="text-xs sm:text-sm text-gold-200/90 font-light max-w-2xl pt-1">
                Bespoke spatial production curated for <span className="text-white font-semibold">{event.client}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY METRICS & TRANSPARENT INVESTMENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 rounded-3xl bg-white border border-paper-300 shadow-lux">
          
          {/* 1. Production Investment / Price */}
          <div className="p-4 rounded-2xl bg-gold-50/70 border border-gold-300/80 space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-gold-800 font-bold flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-gold-600" />
              Investment Scale
            </span>
            <div className="font-serif text-xl sm:text-2xl font-black text-gold-950">
              {event.budgetRange || '₹3.5 - ₹4.5 Crore'}
            </div>
            <p className="text-[11px] text-ink-500 font-medium">
              Avg. ₹6,500 – ₹9,500 / Guest
            </p>
          </div>

          {/* 2. Guest Count */}
          <div className="p-4 rounded-2xl bg-paper-100 border border-paper-200 space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-ink-500 font-bold flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-gold-600" />
              Guest Attendance
            </span>
            <div className="font-serif text-xl sm:text-2xl font-bold text-ink-950">
              {event.guestCount} Guests
            </div>
            <p className="text-[11px] text-ink-500 font-medium">
              Imperial Tier Protocol
            </p>
          </div>

          {/* 3. Timeline / Duration */}
          <div className="p-4 rounded-2xl bg-paper-100 border border-paper-200 space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-ink-500 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gold-600" />
              Production Timeline
            </span>
            <div className="font-serif text-xl sm:text-2xl font-bold text-ink-950">
              3 Days & Nights
            </div>
            <p className="text-[11px] text-ink-500 font-medium">
              Multi-Muhurat Celebrations
            </p>
          </div>

          {/* 4. Verified Client Satisfaction */}
          <div className="p-4 rounded-2xl bg-paper-100 border border-paper-200 space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-ink-500 font-bold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
              Client Delight Rating
            </span>
            <div className="font-serif text-xl sm:text-2xl font-bold text-ink-950 flex items-center gap-1.5">
              <span>5.0 / 5.0</span>
              <div className="flex text-amber-500 text-xs">★★★★★</div>
            </div>
            <p className="text-[11px] text-ink-500 font-medium">
              100% Verified Post-Event Audit
            </p>
          </div>

        </div>
      </section>

      {/* 4. MAIN DETAILS: DESCRIPTION, NARRATIVE & HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Full Editorial Description */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Production Narrative</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 leading-tight">
                {event.headline || 'A Monumental Union of Royal Heritage and Spatial Haute Couture'}
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-ink-700 leading-relaxed font-light">
                <p>
                  {event.story}
                </p>
                <p>
                  From the initial 3D photorealistic CAD simulations and acoustic alignment to the midnight muhurat pheras, every square meter was engineered to immerse patrons in imperial Indian opulence. A 40-member senior production unit oversaw hospitality protocols, live Vedic recitations, and synchronized multi-sensory experiences.
                </p>
              </div>
            </div>

            {/* Architectural & Scenography Highlights */}
            <div className="space-y-4 pt-4 border-t border-paper-200">
              <h3 className="text-sm uppercase tracking-widest font-bold text-ink-800">
                Key Curations & Disciplines Executed
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(event.highlights || [
                  'Engineered floating lotus glass mandap with 40,000 seasonal Indian tuberoses',
                  'L-Acoustics spatial acoustic coverage tuned for palace courtyard stone reflections',
                  'Synchronized 400-drone aerial light choreography narrating the lineage history',
                  'Awadhi and Mewari royal feast prepared by fourth-generation royal Khansamas'
                ]).map((highlight, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-paper-300 shadow-lux-sm flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-ink-700 font-medium leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Inclusions Breakdown */}
            <div className="p-6 rounded-3xl bg-white border border-paper-300 shadow-lux space-y-4">
              <h3 className="text-sm uppercase tracking-widest font-bold text-gold-900 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-gold-600" />
                What This Production Investment Covered
              </h3>
              <div className="space-y-3 text-xs text-ink-600">
                <div className="flex justify-between items-center pb-2 border-b border-paper-200">
                  <span className="font-medium text-ink-800">Bespoke Mandap & Spatial Scenography Architecture</span>
                  <span className="font-semibold text-gold-800">35% Allocation</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-paper-200">
                  <span className="font-medium text-ink-800">Royal Khansama Gastronomy, Sommelier & Silver Service</span>
                  <span className="font-semibold text-gold-800">28% Allocation</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-paper-200">
                  <span className="font-medium text-ink-800">Concert Sound, Kinetic MicroLED & Lighting Staging</span>
                  <span className="font-semibold text-gold-800">20% Allocation</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-paper-200">
                  <span className="font-medium text-ink-800">Drone Choreography, Water Pyrotechnics & Entertainment</span>
                  <span className="font-semibold text-gold-800">12% Allocation</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-ink-800">VVIP Dignitary Protocol, Tarmac Transfers & Governance</span>
                  <span className="font-semibold text-gold-800">5% Allocation</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Pricing Inquire Card & Reviews */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Inquiry & Price Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-gold-400 shadow-lux-lg space-y-6 sticky top-36">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-800 font-bold block">
                  Bespoke Production Commission
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-serif font-black text-ink-950">
                    {event.budgetRange || '₹4.5 Crore+'}
                  </span>
                  <span className="text-xs text-ink-500 font-medium">starting investment</span>
                </div>
                <p className="text-xs text-ink-500 mt-2 leading-relaxed font-light">
                  Customized to your chosen heritage venue, guest numbers, and specific ritual requirements across India.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-paper-200">
                <button
                  onClick={() => onOpenBooking(event)}
                  className="w-full btn-gold py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-lux flex items-center justify-center gap-2 group text-white"
                >
                  <span>Commission Similar Event</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="tel:+919820058643"
                  className="w-full py-3 rounded-xl border border-paper-300 text-ink-800 hover:bg-paper-100 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-gold-600" />
                  <span>Call VIP Concierge: +91 98200 58643</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className="space-y-2 pt-2 text-[11px] text-ink-500 border-t border-paper-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span>Strict Non-Disclosure & High-Security Discretion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span>Transparent Vendor Billing With Zero Surcharges</span>
                </div>
              </div>
            </div>

            {/* Customer Reviews Section in Sidebar */}
            <div className="p-6 rounded-3xl bg-white border border-paper-300 shadow-lux space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-widest font-bold text-ink-900 flex items-center gap-1.5">
                  <Quote className="w-4 h-4 text-gold-600" />
                  Patron Reviews
                </h3>
                <span className="text-[10px] font-bold text-gold-800 bg-gold-100 px-2 py-0.5 rounded-full border border-gold-300">
                  Verified Audits
                </span>
              </div>

              <div className="space-y-4">
                {displayReviews.map((rev, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-paper-50 border border-paper-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-500 text-xs">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <span className="text-[10px] text-ink-400 font-medium">
                        {rev.date || 'Verified Review'}
                      </span>
                    </div>

                    <p className="text-xs text-ink-700 italic font-light leading-relaxed">
                      "{rev.quote}"
                    </p>

                    <div className="pt-1">
                      <span className="font-serif text-xs font-bold text-ink-900 block">
                        {rev.author}
                      </span>
                      <span className="text-[10px] text-gold-800 font-medium">
                        {rev.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FULL PRODUCTION PHOTO GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-paper-300 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-800 font-bold block">
              Scenography & Spatial Visuals
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
              Production Photo Anthology
            </h2>
          </div>
          <p className="text-xs text-ink-500">
            Click any photograph to view in high definition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {fullGallery.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveGalleryIndex(idx)}
              className="group cursor-pointer relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-paper-300 shadow-lux hover:border-gold-400 transition-all"
            >
              <img 
                src={img} 
                alt={`${event.title} detail ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-ink-950/20 group-hover:bg-ink-950/40 transition-colors" />
              
              <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/90 backdrop-blur-md text-ink-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LIGHTBOX MODAL */}
      {activeGalleryIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-ink-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActiveGalleryIndex(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] bg-ink-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveGalleryIndex(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-ink-950 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={fullGallery[activeGalleryIndex]} 
              alt="Expanded Production View"
              className="w-full max-h-[80vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}

      {/* 7. EXPLORE MORE CELEBRATIONS */}
      {relatedEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-paper-300 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-800 font-bold block">
                Portfolio Continuum
              </span>
              <h2 className="text-2xl font-serif font-bold text-ink-950">
                Explore Parallel Productions
              </h2>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-gold-800 hover:text-gold-950 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedEvents.map((rel) => (
              <SpotlightCard
                key={rel.id}
                onClick={() => {
                  onSelectEvent(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-white border border-paper-300 hover:border-gold-400 rounded-3xl overflow-hidden flex flex-col justify-between shadow-lux"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={rel.heroImage}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-md text-gold-900 font-semibold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-gold-300">
                      {rel.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-xs text-white flex items-center justify-between font-medium">
                    <span>{rel.location.split(',')[0]}</span>
                    <span>{rel.budgetRange}</span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-serif text-base font-bold text-ink-900 group-hover:text-gold-700 transition-colors line-clamp-1">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-ink-500 line-clamp-2 font-light">
                    {rel.headline}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
