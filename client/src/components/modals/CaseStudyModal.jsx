import React from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  IndianRupee, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Quote, 
  Camera 
} from 'lucide-react';

export default function CaseStudyModal({ event, isOpen, onClose, onBookEvent, onViewFullPage }) {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-ink-950/65 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-paper-300 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-ink-700 hover:bg-gold-500 hover:text-ink-950 transition-all shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner Image */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={event.heroImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-gold-500 text-white font-bold uppercase text-[10px] tracking-widest px-3 py-1 rounded-full shadow-sm">
                {event.category}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white font-medium text-xs px-3 py-1 rounded-full border border-white/20">
                {event.year}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white drop-shadow-md">
              {event.title}
            </h2>
            <p className="text-xs sm:text-sm text-gold-200 font-medium mt-1">
              Curated for {event.client}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 bg-paper-50">
          
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-paper-300 shadow-lux-sm">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-ink-500 block font-semibold">Location</span>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink-800 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-ink-500 block font-semibold">Attendance</span>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink-800 mt-0.5">
                <Users className="w-3.5 h-3.5 text-gold-600" />
                <span>{event.guestCount} Guests</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-ink-500 block font-semibold">Production Scale</span>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink-800 mt-0.5">
                <IndianRupee className="w-3.5 h-3.5 text-gold-600" />
                <span>{event.budgetRange}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-ink-500 block font-semibold">Discretion Level</span>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gold-700 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>White-Glove VIP</span>
              </div>
            </div>
          </div>

          {/* Narrative Overview */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-gold-800 font-semibold">
              The Curatorial Narrative
            </h4>
            <p className="text-lg font-serif italic text-ink-800 leading-snug">
              "{event.headline}"
            </p>
            <p className="text-sm text-ink-600 leading-relaxed font-light">
              {event.story}
            </p>
          </div>

          {/* Highlights & Engineering Accomplishments */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-gold-800 font-semibold">
              Key Technical & Spatial Accomplishments
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {event.highlights?.map((highlight, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-paper-300 flex items-start gap-3 shadow-lux-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 mt-0.5 shrink-0" />
                  <span className="text-xs text-ink-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photographic Moments Gallery */}
          {event.gallery && event.gallery.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-widest text-gold-800 font-semibold flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  Visual Moments Archive
                </h4>
                <span className="text-[10px] text-ink-400 uppercase font-medium">35mm Archival Photography</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {event.gallery.map((imgUrl, i) => (
                  <div key={i} className="group relative h-48 rounded-2xl overflow-hidden border border-paper-300 shadow-sm">
                    <img
                      src={imgUrl}
                      alt={`${event.title} moment ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Client Testimonial */}
          {event.testimonial && (
            <div className="p-5 rounded-2xl bg-gold-50/80 border border-gold-300 relative shadow-sm">
              <Quote className="w-8 h-8 text-gold-400/40 absolute top-4 right-4" />
              <p className="text-sm font-serif italic text-gold-900 mb-3">
                "{event.testimonial.quote}"
              </p>
              <div className="text-xs font-semibold text-ink-900">
                {event.testimonial.author}
                <span className="text-ink-500 font-normal ml-1.5">— {event.testimonial.role}</span>
              </div>
            </div>
          )}

          {/* CTA Footer */}
          <div className="pt-4 border-t border-paper-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-ink-600">
              Estimated Investment: <strong className="text-gold-900 font-serif text-sm">{event.budgetRange || '₹4.5 Crore+'}</strong> • ★ 5.0 Rating
            </span>
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {onViewFullPage && (
                <button
                  onClick={() => {
                    onClose();
                    onViewFullPage(event);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gold-900 bg-gold-100 hover:bg-gold-200 border border-gold-300 transition-all shrink-0"
                >
                  Full Page Dossier →
                </button>
              )}
              <button
                onClick={() => {
                  onClose();
                  if (onBookEvent) onBookEvent(event);
                }}
                className="btn-gold px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider shrink-0 w-full sm:w-auto"
              >
                Inquire For Similar Scale
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
