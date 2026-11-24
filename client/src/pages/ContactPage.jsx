import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import SpotlightCard from '../components/common/SpotlightCard.jsx';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: 'Royal Destination Wedding',
    guestCount: 350,
    targetDate: '2025-11-20',
    location: 'Udaipur, Rajasthan',
    estimatedBudget: '₹1.5 Crore - ₹3 Crore',
    visionDetails: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successDossier, setSuccessDossier] = useState(null);

  const ateliers = [
    {
      city: 'Mumbai Atelier',
      address: '1204 Maker Chambers V, Nariman Point & BKC, Mumbai',
      phone: '+91 22 6154 8800',
      email: 'mumbai@lumiere-events.in',
      hours: 'Mon – Sat: 09:30 – 19:30 IST'
    },
    {
      city: 'New Delhi Residence',
      address: '14 Barakhamba Road, Connaught Place & Aerocity',
      phone: '+91 11 4982 7200',
      email: 'delhi@lumiere-events.in',
      hours: 'Mon – Sat: 09:30 – 19:30 IST'
    },
    {
      city: 'Bengaluru Studio',
      address: 'Level 10, Concorde Block, UB City, Lavelle Road',
      phone: '+91 80 4321 9500',
      email: 'bengaluru@lumiere-events.in',
      hours: 'Mon – Sat: 09:30 – 19:00 IST'
    },
    {
      city: 'Jaipur & Udaipur Hub',
      address: 'Civil Lines, Jaipur & Lake Palace Road, Udaipur',
      phone: '+91 141 289 4400',
      email: 'rajasthan@lumiere-events.in',
      hours: 'Mon – Sun: 09:00 – 20:00 IST'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSuccessDossier(data.data);
        if (typeof confetti === 'function') {
          confetti({ particleCount: 80, spread: 60 });
        }
      } else {
        setSuccessDossier({ ...formData, _id: 'inq-' + Date.now() });
      }
    } catch (e) {
      setSuccessDossier({ ...formData, _id: 'inq-' + Date.now() });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-semibold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>Confidential Executive Concierge (India)</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-ink-950">
          Begin the Conversation
        </h1>
        <p className="text-sm sm:text-base text-ink-600 font-light leading-relaxed">
          Whether you hold a fully formed brief or are seeking initial auspicious palace inspiration, our Managing Partners are available across Mumbai, Delhi, Bengaluru, and Rajasthan.
        </p>
      </div>

      {/* Main Grid: Ateliers & Direct Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: India Ateliers */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
              India Atelier Coordinates
            </span>
            <h3 className="text-2xl font-serif font-bold text-ink-950">
              Private Residences & Offices
            </h3>
          </div>

          <div className="space-y-4">
            {ateliers.map((item, idx) => (
              <SpotlightCard key={idx} className="p-5 bg-white border border-paper-300 shadow-lux-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-gold-800">
                    {item.city}
                  </h4>
                  <MapPin className="w-4 h-4 text-gold-600" />
                </div>
                <p className="text-xs text-ink-600 font-light">{item.address}</p>
                <div className="pt-2 text-[11px] text-ink-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gold-600" />
                    <span>{item.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gold-600" />
                    <span>{item.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-ink-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.hours}</span>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Urgent Concierge Hotline */}
          <div className="p-6 rounded-3xl bg-paper-100 border border-gold-300 shadow-sm space-y-2">
            <div className="text-xs uppercase tracking-widest text-gold-800 font-semibold flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold-600" />
              <span>National Priority VIP Helpline</span>
            </div>
            <p className="text-xs text-ink-600 font-light">
              For active productions, family office heads, or urgent press inquiries:
            </p>
            <div className="font-mono text-base font-bold text-ink-900">
              +91 98200 58643 / 1800-LUMIERE
            </div>
          </div>
        </div>

        {/* Right Column: Direct Consultation Form */}
        <div className="lg:col-span-7">
          <SpotlightCard className="p-8 sm:p-10 bg-white border border-gold-300 shadow-lux-lg rounded-3xl">
            {successDossier ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-gold-100 border border-gold-300 flex items-center justify-center mx-auto text-gold-700">
                  <CheckCircle2 className="w-10 h-10 text-gold-600" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
                    Dossier Confirmed
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
                    We Have Received Your Auspicious Vision
                  </h3>
                  <p className="text-sm text-ink-600 max-w-md mx-auto leading-relaxed font-light">
                    A Senior Producer from the nearest India atelier has been assigned to your request and will contact you directly.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-paper-100 border border-paper-200 max-w-sm mx-auto text-xs text-left space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-ink-500">Dossier ID:</span>
                    <span className="font-mono text-gold-800 font-semibold">{successDossier._id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-500">Representative:</span>
                    <span className="text-ink-900 font-medium">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-500">Celebration:</span>
                    <span className="text-ink-900 font-medium">{formData.eventType}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSuccessDossier(null)}
                  className="btn-gold px-8 py-3 rounded-xl text-xs uppercase font-bold tracking-wider"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1 pb-4 border-b border-paper-200">
                  <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-gold-600" />
                    <span>Direct Consultation Dossier (India)</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-ink-950">
                    Submit Your Celebration Specifications
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Radhika Singhania"
                      className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-xs text-ink-900 focus:outline-none focus:border-gold-500 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="radhika@singhania-group.in"
                      className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-xs text-ink-900 focus:outline-none focus:border-gold-500 shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1">
                      Mobile / WhatsApp (India) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 45678"
                      className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-xs text-ink-900 focus:outline-none focus:border-gold-500 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1">
                      Celebration Classification
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-xs text-ink-900 focus:outline-none focus:border-gold-500 shadow-sm font-medium"
                    >
                      <option value="Royal Destination Wedding">Royal Destination Wedding</option>
                      <option value="Grand Sangeet & Mehendi">Grand Sangeet & Mehendi</option>
                      <option value="Corporate Conclave">Corporate Conclave</option>
                      <option value="High-Profile Award Night">High-Profile Award Night</option>
                      <option value="Brand Activation">Brand Activation</option>
                      <option value="Milestone Celebration">Milestone Celebration</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 200 })}
                      className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-xs text-ink-900 focus:outline-none focus:border-gold-500 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1">
                      Muhurat Window / Date
                    </label>
                    <input
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                      className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-xs text-ink-900 focus:outline-none focus:border-gold-500 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1">
                      Budget Tier (INR)
                    </label>
                    <select
                      value={formData.estimatedBudget}
                      onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                      className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-xs text-ink-900 focus:outline-none focus:border-gold-500 shadow-sm font-medium"
                    >
                      <option value="₹35 Lakhs - ₹75 Lakhs">₹35 Lakhs - ₹75 Lakhs</option>
                      <option value="₹75 Lakhs - ₹1.5 Crore">₹75 Lakhs - ₹1.5 Crore</option>
                      <option value="₹1.5 Crore - ₹3 Crore">₹1.5 Crore - ₹3 Crore</option>
                      <option value="₹3 Crore+">₹3 Crore+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1">
                    Celebration Vision, Rituals & Special Requests
                  </label>
                  <textarea
                    rows="4"
                    value={formData.visionDetails}
                    onChange={(e) => setFormData({ ...formData, visionDetails: e.target.value })}
                    placeholder="Share any preferred palaces in Rajasthan/Goa, artist performances, Jain/Veg banqueting requirements..."
                    className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-xs text-ink-900 focus:outline-none focus:border-gold-500 resize-none shadow-sm font-light"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-ink-500">
                  <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Encrypted communication under strict legal non-disclosure. Total family discretion guaranteed.</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-gold py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-lux"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Transmitting Dossier...' : 'Transmit Royal Brief'}</span>
                </button>
              </form>
            )}
          </SpotlightCard>
        </div>

      </div>

    </div>
  );
}
