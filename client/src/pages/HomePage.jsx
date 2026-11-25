import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  Quote, 
  MapPin,
  Eye,
  X
} from 'lucide-react';
import SpotlightCard from '../components/common/SpotlightCard.jsx';
import Marquee from '../components/common/Marquee.jsx';
import EventCalculator from '../components/calculator/EventCalculator.jsx';

export default function HomePage({ 
  events, 
  services, 
  reviews, 
  stats, 
  setActivePage, 
  onSelectEvent, 
  onOpenBooking 
}) {
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('All');
  const [activePhotoModal, setActivePhotoModal] = useState(null);
  
  // Hero Carousel State
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  const brandPartners = [
    'Sabyasachi Couture',
    'Taj Hotels & Palaces', 
    'The Oberoi Group', 
    'The Leela Palaces', 
    'Cartier India', 
    'Vogue India', 
    'Moët & Chandon', 
    'Architectural Digest India', 
    'Sotheby’s India',
    'Audemars Piguet'
  ];

  // Minimal, High-Impact Showcase Cards
  const heroShowcaseCards = [
    {
      id: 'sc-1',
      title: 'The Royal Rajputana Reverie',
      location: 'Udaipur',
      tag: 'Mandap',
      image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80',
      subtitle: 'Floating sacred mandap on Lake Pichola with fresh lotus and brass lamps',
      eventSlug: 'royal-rajputana-reverie'
    },
    {
      id: 'sc-2',
      title: 'Imperial Vows & Sabyasachi Splendor',
      location: 'Jodhpur',
      tag: 'Royal Vows',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      subtitle: 'Bespoke Zardozi couture vows framed by Baradari sandstone arches',
      eventSlug: 'maharaja-heritage-ball'
    },
    {
      id: 'sc-3',
      title: 'Starlight Sufi & Symphony',
      location: 'Jaipur',
      tag: 'Sangeet',
      image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
      subtitle: 'Kinetic light canopy with 300-drone aerial constellations and cold pyro',
      eventSlug: 'starlight-sufi-symphony'
    },
    {
      id: 'sc-4',
      title: 'Jagmandir Island Palace Sanctum',
      location: 'Udaipur',
      tag: 'Island Palace',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      subtitle: 'Private island palace buyout accessible exclusively via royal boats',
      eventSlug: 'royal-rajputana-reverie'
    },
    {
      id: 'sc-5',
      title: 'Midnight Fireworks & Palace Gala',
      location: 'Udaipur',
      tag: 'Fireworks',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      subtitle: 'Choreographed lake fireworks reflecting across tranquil water',
      eventSlug: 'starlight-sufi-symphony'
    },
    {
      id: 'sc-6',
      title: 'The Maharaja Heritage Dastarkhwan',
      location: 'Jaipur',
      tag: 'Dining',
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80',
      subtitle: 'Slow-dum Awadhi banquet served in gold-plated silverware',
      eventSlug: 'maharaja-heritage-ball'
    }
  ];

  const scrollToIndex = (index) => {
    let target = index;
    if (target < 0) target = heroShowcaseCards.length - 1;
    if (target >= heroShowcaseCards.length) target = 0;
    setActiveCardIndex(target);

    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.children[target];
      if (card) {
        // Only scroll the horizontal carousel container — NEVER touch window vertical scroll
        const targetScrollLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth'
        });
      }
    }
  };

  const handleNext = () => scrollToIndex(activeCardIndex + 1);
  const handlePrev = () => scrollToIndex(activeCardIndex - 1);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      // Never hijack vertical page scroll: only auto-advance if user is at top of page
      if (typeof window !== 'undefined' && window.scrollY > 400) {
        return;
      }
      scrollToIndex(activeCardIndex + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeCardIndex, isPaused]);

  // Curated Minimal Visual Anthology
  const visualGallery = [
    {
      id: 'gal-1',
      title: 'Floating Lotus Mandap',
      category: 'Mandaps',
      location: 'Lake Pichola, Udaipur',
      image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80',
      description: 'Glass-bottomed mandap floating on sacred waters with 40,000 hand-threaded tuberoses.'
    },
    {
      id: 'gal-2',
      title: 'Sandstone Palace Courtyard',
      category: 'Palaces',
      location: 'Umaid Bhawan, Jodhpur',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      description: 'Golden hour illumination across royal Chittar sandstone with 10,000 brass oil lamps.'
    },
    {
      id: 'gal-3',
      title: '300-Drone Sangeet Symphony',
      category: 'Sangeet',
      location: 'New Delhi',
      image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
      description: 'Kinetic light canopy, cold pyrotechnics, and aerial drone choreography.'
    },
    {
      id: 'gal-4',
      title: 'Imperial Awadhi Banqueting',
      category: 'Dining',
      location: 'Rambagh Palace, Jaipur',
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80',
      description: 'Silver katoris and slow-dum recipes prepared by fourth-generation royal Khansamas.'
    },
    {
      id: 'gal-5',
      title: 'Cliffside Sunset Vows',
      category: 'Mandaps',
      location: 'Vagator, Goa',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
      description: 'Bamboo pavilion overlooking the Arabian Sea, framed by pampas grass and acoustic harps.'
    },
    {
      id: 'gal-6',
      title: 'Midnight Chandelier Concert',
      category: 'Sangeet',
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      description: 'Motorized crystal chandeliers with immersive 360-degree spatial acoustics.'
    }
  ];

  const galleryCategories = ['All', 'Mandaps', 'Palaces', 'Sangeet', 'Dining'];

  const filteredGallery = selectedGalleryCategory === 'All'
    ? visualGallery
    : visualGallery.filter(item => item.category === selectedGalleryCategory);

  const serviceImageMap = {
    'srv-1': 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80',
    'srv-2': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    'srv-3': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    'srv-4': 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    'srv-5': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    'srv-6': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
  };

  const handleCardClick = (card) => {
    const matched = events?.find(e => e.slug === card.eventSlug || e.id === card.id);
    if (matched) {
      onSelectEvent(matched);
    } else {
      setActivePhotoModal({
        title: card.title,
        category: card.tag,
        location: card.location,
        image: card.image,
        description: card.subtitle
      });
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28">
      
      {/* 1. HERO SECTION (Minimal Editorial Typography & Scrolling Carousel) */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-8 pb-12 overflow-hidden aurora-bg w-full max-w-full">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-gold-200/35 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6 w-full">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-gold-300 text-gold-900 text-xs font-semibold uppercase tracking-widest shadow-lux-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Royal Indian Celebrations</span>
          </div>

          {/* Minimal Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-ink-950 tracking-tight leading-[1.12] sm:leading-[1.08] break-words">
            Where Royal Heritage Meets <br className="hidden sm:inline" />
            <span className="gold-text-gradient italic font-normal">Modern Splendor</span>
          </h1>

          {/* Minimal Subtitle */}
          <p className="max-w-xl mx-auto text-sm sm:text-lg text-ink-600 font-light leading-relaxed px-2">
            Curating royal destination weddings and monumental celebrations across Udaipur, Jaipur, Jodhpur, and Goa.
          </p>

          {/* 2 Clean CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenBooking}
              className="btn-gold px-7 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-widest font-bold shadow-lux flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              <span>Commission Event</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActivePage('portfolio')}
              className="px-7 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-widest font-semibold text-ink-800 bg-white hover:bg-paper-100 border border-paper-300 transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-lux-sm"
            >
              <span>Explore Portfolio</span>
            </button>
          </div>

          {/* SCROLLING SHOWCASE CAROUSEL (Minimal Text) */}
          <div 
            className="relative pt-6 max-w-6xl mx-auto w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Header Controls */}
            <div className="flex items-center justify-between pb-3 px-2">
              <span className="text-xs font-bold text-gold-900 uppercase tracking-widest">
                Curated Productions
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous"
                  className="p-2 rounded-full bg-white/90 hover:bg-white text-ink-800 hover:text-gold-700 border border-gold-300 shadow-lux-sm transition-all active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next"
                  className="p-2 rounded-full bg-white/90 hover:bg-white text-ink-800 hover:text-gold-700 border border-gold-300 shadow-lux-sm transition-all active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Track */}
            <div
              ref={scrollRef}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="relative flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-3 px-1 snap-x snap-mandatory"
            >
              {heroShowcaseCards.map((card, idx) => {
                const isActive = idx === activeCardIndex;
                return (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    style={{ scrollSnapAlign: 'center' }}
                    className={`group cursor-pointer shrink-0 rounded-3xl overflow-hidden relative transition-all duration-300 bg-paper-100 ${
                      isActive 
                        ? 'border-2 border-gold-400 shadow-lux-lg' 
                        : 'border border-gold-300/70 shadow-lux hover:border-gold-400'
                    } w-[260px] xs:w-[280px] sm:w-[360px] md:w-[380px] h-[330px] sm:h-[380px] flex flex-col justify-between`}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />

                    <div className="relative z-10 p-4 flex items-center justify-between">
                      <span className="bg-white/90 backdrop-blur-md text-gold-900 font-bold text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-gold-300 shadow-sm">
                        {card.tag}
                      </span>
                    </div>

                    <div className="relative z-10 p-5 text-left space-y-1">
                      <div className="flex items-center gap-1 text-gold-300 text-[10px] uppercase tracking-widest font-semibold">
                        <MapPin className="w-3 h-3" />
                        <span>{card.location}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-gold-200 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs text-paper-200 line-clamp-1 font-light">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              {heroShowcaseCards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeCardIndex ? 'w-6 bg-gold-600' : 'w-1.5 bg-paper-300'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2. PRESTIGE MARQUEE */}
      <section className="border-y border-paper-300 bg-paper-100 py-4">
        <div className="max-w-7xl mx-auto px-4 mb-2 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-ink-500 font-bold">
            Trusted Partners & Royal Houses
          </span>
        </div>
        <Marquee items={brandPartners} speed="32s" />
      </section>

      {/* 3. METRICS (Clean Numbers, Zero Fluff) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <SpotlightCard key={idx} className="p-6 bg-white border border-paper-300 text-center shadow-lux-sm">
              <div className="font-serif text-3xl sm:text-4xl font-bold gold-text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-ink-800 uppercase tracking-wider">
                {stat.label}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 4. SELECTED MASTERWORKS GALLERY (Merged & Streamlined) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
              The Archive
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950">
              Selected Landmark Productions
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedGalleryCategory === cat
                    ? 'bg-gold-700 text-white shadow-sm'
                    : 'bg-white border border-paper-300 text-ink-700 hover:border-gold-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <SpotlightCard
              key={item.id}
              onClick={() => setActivePhotoModal(item)}
              className="group cursor-pointer bg-white border border-paper-300 hover:border-gold-400 rounded-3xl overflow-hidden flex flex-col justify-between shadow-lux transition-all"
            >
              <div className="relative h-64 overflow-hidden bg-paper-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-md text-gold-900 font-semibold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-gold-300">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] text-gold-300 uppercase tracking-widest font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-gold-200 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between border-t border-paper-200 text-xs text-ink-600 bg-white">
                <span className="line-clamp-1 text-[11px] font-light">
                  {item.description}
                </span>
                <span className="text-gold-700 font-semibold flex items-center gap-1 shrink-0 ml-2">
                  <Eye className="w-3 h-3" />
                  View
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 5. SERVICES CARDS (Minimal, Zero Checklist Clutter) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950">
            Atelier Disciplines
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const cardImg = srv.image || serviceImageMap[srv.id] || 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80';
            return (
              <SpotlightCard key={srv.id} className="bg-white border border-paper-300 shadow-lux-sm rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-gold-400 transition-all">
                <div className="relative h-44 overflow-hidden bg-paper-200">
                  <img
                    src={cardImg}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold-300 block">
                      {srv.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-200 transition-colors">
                      {srv.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-ink-600 font-light leading-relaxed">
                    {srv.shortDesc}
                  </p>

                  <div className="pt-3 border-t border-paper-200">
                    <button
                      onClick={() => setActivePage('services')}
                      className="text-xs text-gold-800 hover:text-ink-950 font-semibold uppercase tracking-wider flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* 6. CRAFTSMANSHIP (Refined & Minimal) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-paper-300 rounded-3xl p-6 sm:p-10 shadow-lux">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-gold-300 h-64 sm:h-80 w-full relative">
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80"
                alt="Palace Courtyard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-xs font-serif font-bold">Rambagh Palace, Jaipur</span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block">
                The Collective
              </span>
              <h2 className="text-3xl font-serif font-bold text-ink-950">
                Crafted by Masters
              </h2>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-light">
                We unite regional artisans, block printers, and master Khansamas to produce peerless palatial celebrations.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-lux"
                >
                  Commission Consultation
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. BUDGET ESTIMATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
            Estimator
          </span>
          <h2 className="text-3xl font-serif font-bold text-ink-950">
            Celebration Budget Modeling (INR)
          </h2>
        </div>
        <EventCalculator onOpenBooking={onOpenBooking} />
      </section>

      {/* 8. TESTIMONIALS (Crisp 1-Sentence Quotes) */}
      <section className="bg-paper-100 border-y border-paper-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
              Patrons
            </span>
            <h2 className="text-3xl font-serif font-bold text-ink-950">
              Voices of Distinction
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <SpotlightCard key={rev.id} className="p-6 bg-white border border-paper-300 shadow-lux flex flex-col justify-between">
                <div className="space-y-3">
                  <Quote className="w-6 h-6 text-gold-400" />
                  <p className="font-serif italic text-ink-800 text-sm leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-paper-200 flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-9 h-9 rounded-full object-cover border border-gold-300"
                  />
                  <div>
                    <div className="text-xs font-bold text-ink-900">{rev.author}</div>
                    <div className="text-[10px] text-ink-500">{rev.role}</div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 9. MANIFESTO */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4 py-8">
        <div className="w-10 h-0.5 bg-gold-500 mx-auto" />
        <h3 className="text-2xl font-serif font-bold text-ink-950">
          "True royal luxury is not loud. It is the feeling of being entirely transported."
        </h3>
        <p className="text-[11px] uppercase tracking-widest text-gold-800 font-semibold">
          — LUMIÈRE India
        </p>
      </section>

      {/* PHOTO LIGHTBOX MODAL */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-lux-lg border border-gold-300">
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-ink-900/70 hover:bg-ink-900 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-[55vh] w-full bg-ink-950">
              <img
                src={activePhotoModal.image}
                alt={activePhotoModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 pointer-events-none">
                <span className="text-xs text-gold-300 uppercase tracking-widest font-semibold block">
                  {activePhotoModal.location}
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">
                  {activePhotoModal.title}
                </h3>
                <p className="text-xs text-paper-200 font-light max-w-xl">
                  {activePhotoModal.description}
                </p>
              </div>
            </div>

            <div className="p-4 bg-paper-50 flex items-center justify-between border-t border-paper-200">
              <span className="text-xs text-ink-600 font-light">
                Commission a bespoke production in this aesthetic.
              </span>
              <button
                onClick={() => {
                  setActivePhotoModal(null);
                  onOpenBooking();
                }}
                className="btn-gold px-5 py-2 rounded-xl text-xs uppercase tracking-widest font-bold shadow-lux"
              >
                Inquire
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
