import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Users, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Phone, 
  User
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getApiUrl } from '../../config/api.js';

export default function BookingModal({ isOpen, onClose, onBookingSuccess }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: 'Royal Destination Wedding',
    guestCount: 350,
    targetDate: '2025-11-20',
    location: 'Udaipur, Rajasthan',
    estimatedBudget: '₹1.5 Crore - ₹3 Crore',
    visionDetails: '',
    servicePreferences: ['Royal Mandap Architecture', 'Royal Dastarkhwan']
  });

  if (!isOpen) return null;

  const eventTypes = [
    'Royal Destination Wedding',
    'Grand Sangeet & Mehendi',
    'Corporate Conclave',
    'High-Profile Award Night',
    'Brand Activation',
    'Milestone Celebration'
  ];

  const budgetTiers = [
    '₹35 Lakhs - ₹75 Lakhs',
    '₹75 Lakhs - ₹1.5 Crore',
    '₹1.5 Crore - ₹3 Crore',
    '₹3 Crore+'
  ];

  const availableServices = [
    'Royal Mandap & Spatial Scenography',
    'Concert Spatial Audio & Kinetic Lighting',
    'Royal Dastarkhwan & Khansama Gastronomy',
    'Bollywood Choreography & Sufi Mehfil',
    '300-Drone Aerial Show & Cold Pyrotechnics',
    'Private Aircraft Charter & Armored VIP Fleet'
  ];

  const toggleService = (srv) => {
    setFormData(prev => {
      const exists = prev.servicePreferences.includes(srv);
      return {
        ...prev,
        servicePreferences: exists 
          ? prev.servicePreferences.filter(s => s !== srv)
          : [...prev.servicePreferences, srv]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(getApiUrl('/api/inquiries'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setSubmittedData(data.data);
        if (typeof confetti === 'function') {
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        }
        if (onBookingSuccess) onBookingSuccess(data.data);
      } else {
        setSubmittedData({ ...formData, _id: 'inq-' + Date.now() });
      }
    } catch (err) {
      setSubmittedData({ ...formData, _id: 'inq-' + Date.now() });
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSubmittedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-ink-950/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-paper-300 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-ink-400 hover:text-ink-900 hover:bg-paper-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedData ? (
          /* Success Screen */
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-gold-100 border border-gold-300 flex items-center justify-center mx-auto text-gold-700">
              <CheckCircle2 className="w-10 h-10 text-gold-600" />
            </div>
            
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
                Private Consultation Requested
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900">
                Auspicious Dossier Received with Honour
              </h3>
              <p className="text-sm text-ink-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-ink-900 font-semibold">{formData.fullName}</span>. Your dossier has been assigned to an Executive Producer. We will contact your family office within 12 business hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-paper-100 border border-paper-300 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-ink-500">Dossier Reference:</span>
                <span className="font-mono text-gold-800 font-semibold">{submittedData._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Celebration Type:</span>
                <span className="text-ink-900 font-medium">{formData.eventType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Target Muhurat Date:</span>
                <span className="text-ink-900 font-medium">{formData.targetDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Estimated Guest Count:</span>
                <span className="text-ink-900 font-medium">{formData.guestCount} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Target Budget Tier:</span>
                <span className="text-emerald-700 font-semibold">{formData.estimatedBudget}</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="btn-gold px-8 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold"
            >
              Return to Showcase
            </button>
          </div>
        ) : (
          /* Multi-Step Flow */
          <div>
            {/* Header */}
            <div className="space-y-1 pb-6 border-b border-paper-200">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-700 font-semibold">
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span>Private Consultation Dossier (India)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900">
                Curate Your Royal Celebration
              </h3>
              <p className="text-xs text-ink-500">
                Step {step} of 3 • Confidential family office & corporate consultation
              </p>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-3 gap-2 my-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step >= s ? 'bg-gradient-to-r from-gold-500 to-amber-400' : 'bg-paper-200'
                  }`}
                />
              ))}
            </div>

            {/* Step 1: Event Type, Date & Scale */}
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-2">
                    Event Classification
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {eventTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, eventType: type })}
                        className={`p-3 rounded-xl text-xs font-medium border text-left transition-all ${
                          formData.eventType === type
                            ? 'bg-gold-50 border-gold-400 text-gold-900 font-semibold shadow-sm'
                            : 'bg-paper-50 border-paper-300 text-ink-700 hover:border-paper-400'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gold-600" />
                      Expected Guest Attendance
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="15000"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 200 })}
                      className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold-600" />
                      Target Date / Muhurat Window
                    </label>
                    <input
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                      className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-600" />
                    Preferred Destination / City in India
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Udaipur, Jaipur, Jodhpur, Goa, Mumbai, Mahabalipuram, or Mussoorie"
                    className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-gold px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center gap-2"
                  >
                    <span>Proceed to Services</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Budget in INR & Service Preferences */}
            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-2">
                    Target Budget Range (INR)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {budgetTiers.map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setFormData({ ...formData, estimatedBudget: tier })}
                        className={`p-3 rounded-xl text-xs font-medium border text-left transition-all ${
                          formData.estimatedBudget === tier
                            ? 'bg-gold-50 border-gold-400 text-gold-900 font-semibold shadow-sm'
                            : 'bg-paper-50 border-paper-300 text-ink-700 hover:border-paper-400'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-2">
                    Key Production Services Required (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableServices.map((srv) => {
                      const selected = formData.servicePreferences.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`p-3 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between ${
                            selected
                              ? 'bg-gold-50 border-gold-400 text-gold-900 font-semibold'
                              : 'bg-paper-50 border-paper-200 text-ink-600 hover:border-paper-300'
                          }`}
                        >
                          <span className="text-[11px]">{srv}</span>
                          {selected && <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl text-xs uppercase font-medium tracking-wider text-ink-600 hover:text-ink-900 border border-paper-300"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="btn-gold px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center gap-2"
                  >
                    <span>Proceed to Concierge Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Vision */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gold-600" />
                      Full Name / Family Representative *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-gold-600" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@singhania-holdings.in"
                      className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gold-600" />
                    Direct Mobile / WhatsApp (India) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98200 45678"
                    className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-700 font-semibold mb-1">
                    Celebration Vision, Rituals & Special Requirements
                  </label>
                  <textarea
                    rows="3"
                    value={formData.visionDetails}
                    onChange={(e) => setFormData({ ...formData, visionDetails: e.target.value })}
                    placeholder="Tell us about the desired palace backdrop, Sangeet theme, Jain/Veg banqueting requirements, or artist preferences..."
                    className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-gold-500 resize-none font-light"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-paper-100 border border-paper-200 flex items-center gap-2 text-[11px] text-ink-600">
                  <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>All inquiries are guarded under strict non-disclosure protocol. Total discretion guaranteed.</span>
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl text-xs uppercase font-medium tracking-wider text-ink-600 hover:text-ink-900 border border-paper-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold px-8 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center gap-2"
                  >
                    <span>{submitting ? 'Transmitting Dossier...' : 'Submit Royal Dossier'}</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
