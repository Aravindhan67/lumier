import React, { useState } from 'react';
import { Sparkles, Send, MapPin, Mail, Phone, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  const offices = [
    { city: 'Mumbai Atelier', address: '1204 Maker Chambers V, Nariman Point & BKC', tel: '+91 22 6154 8800' },
    { city: 'New Delhi Residence', address: '14 Barakhamba Road, Connaught Place', tel: '+91 11 4982 7200' },
    { city: 'Bengaluru Studio', address: 'Level 10, Concorde Block, UB City, Lavelle Road', tel: '+91 80 4321 9500' },
    { city: 'Jaipur & Udaipur Hub', address: 'Civil Lines, Jaipur & Lake Palace Road, Udaipur', tel: '+91 141 289 4400' }
  ];

  return (
    <footer className="bg-paper-100 border-t border-paper-300 pt-20 pb-12 relative overflow-hidden">
      {/* Subtle warm background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-gold-200/40 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-paper-300">
          
          {/* Brand & Editorial Mission */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-600 via-gold-500 to-amber-300 flex items-center justify-center text-white font-serif font-black text-xl shadow-md">
                L
              </div>
              <div>
                <span className="font-serif tracking-widest text-xl font-bold uppercase gold-text-gradient">
                  LUMIÈRE & CO.
                </span>
                <span className="text-[10px] tracking-[0.22em] text-ink-500 uppercase font-sans block font-semibold">
                  India • Haute Events & Spatial Production
                </span>
              </div>
            </div>

            <p className="text-ink-600 text-sm leading-relaxed max-w-md font-light">
              We design monumental Royal Indian Weddings, imperial palace Sangeet nights, and vanguard corporate conclaves across Udaipur, Jaipur, Jodhpur, Mumbai, Bengaluru, and Goa.
            </p>

            <div className="pt-2">
              <div className="text-xs uppercase tracking-widest text-gold-800 font-semibold mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                The LUMIÈRE Royal Indian Gazette
              </div>
              {subscribed ? (
                <div className="p-4 rounded-xl bg-gold-50 border border-gold-300 text-gold-900 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-600" />
                  <span>Your subscription to our biannual dispatch has been confirmed.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter private email address..."
                    required
                    className="flex-1 bg-white border border-paper-300 rounded-xl px-4 py-2.5 text-xs text-ink-900 placeholder-ink-400 focus:outline-none focus:border-gold-500 shadow-sm"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold px-4 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center gap-1"
                  >
                    <span>Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* India Atelier Coordinates */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-800">
              India Ateliers & Residences
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offices.map((office, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-paper-300 shadow-lux-sm space-y-1">
                  <div className="text-sm font-serif font-bold text-gold-800 flex items-center justify-between">
                    <span>{office.city}</span>
                    <MapPin className="w-3.5 h-3.5 text-gold-600" />
                  </div>
                  <p className="text-[11px] text-ink-600 leading-tight">{office.address}</p>
                  <p className="text-[10px] text-ink-500 font-mono pt-0.5">{office.tel}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Nav & Curations */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-800">
              Curation & Services
            </h4>
            <ul className="space-y-2 text-xs text-ink-600">
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-gold-700 transition-colors flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-gold-600" />
                  Royal Mandap Architecture
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-gold-700 transition-colors flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-gold-600" />
                  Precision Technical AV & Staging
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-gold-700 transition-colors flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-gold-600" />
                  Royal Dastarkhwan Gastronomy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('venues')} className="hover:text-gold-700 transition-colors flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-gold-600" />
                  Rajasthan Heritage Palaces
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('calculator')} className="hover:text-gold-700 transition-colors flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-gold-600" />
                  Interactive INR Budget Estimator
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('admin')} className="hover:text-gold-700 transition-colors flex items-center gap-1 font-semibold text-gold-800">
                  <ArrowUpRight className="w-3 h-3 text-gold-600" />
                  Admin Panel (Inquiries)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-ink-500 gap-4">
          <div className="flex items-center space-x-4">
            <span>© {new Date().getFullYear()} LUMIÈRE & CO. India. All Rights Reserved.</span>
            <span>•</span>
            <span className="text-gold-700 font-medium">Certified Zero-Waste Temple Flower Upcycling</span>
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <a href="#privacy" className="hover:text-ink-800 transition-colors">Privacy Protocol</a>
            <a href="#nda" className="hover:text-ink-800 transition-colors">Non-Disclosure Discretion</a>
            <a href="#terms" className="hover:text-ink-800 transition-colors">Terms of Engagement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
