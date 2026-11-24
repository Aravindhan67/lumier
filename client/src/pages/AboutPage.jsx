import React from 'react';
import { Sparkles, Leaf } from 'lucide-react';
import SpotlightCard from '../components/common/SpotlightCard.jsx';

export default function AboutPage({ onOpenBooking }) {
  const leadership = [
    {
      name: 'Arthur Vance',
      role: 'Executive Creative Director',
      bio: 'Architectural scenographer with 18 years staging landmark celebrations across Rajasthan and Mumbai.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Devika Singhania',
      role: 'Head of Royal Hospitality',
      bio: 'Specialist in Rajput and Awadhi court protocol, guest diplomacy, and family office coordination.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Aditya Sharma',
      role: 'Chief Technical Director',
      bio: 'Pioneer of spatial audio systems engineered specifically for marble and sandstone courtyards.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80'
    }
  ];

  const milestones = [
    { year: '2015', title: 'Mumbai Atelier', desc: 'LUMIÈRE founded in Nariman Point curating private galas and weddings.' },
    { year: '2018', title: 'Palace Guild', desc: 'Secures preferred producer partnerships with royal trusts across Rajasthan.' },
    { year: '2021', title: 'Acoustic Patent', desc: 'Engineers directional acoustic arrays eliminating echo inside stone courtyards.' },
    { year: '2024', title: 'Circularity Award', desc: 'Honored as India’s premier zero-waste luxury agency for floral upcycling.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-semibold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>Heritage & Vision</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-ink-950">
          Masters of Sacred Scenography
        </h1>
        <p className="text-sm sm:text-base text-ink-600 font-light leading-relaxed">
          Curating monumental Indian celebrations at the intersection of royal heritage, sacred geometry, and vanguard stagecraft.
        </p>
      </div>

      {/* Editorial Story Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold block">
            Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950">
            Ancient Sanctity Meets Vanguard Stagecraft
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-ink-600 leading-relaxed font-light">
            <p>
              Founded in 2015, LUMIÈRE curates celebrations as living art. We replace predictable banquets with architectural scenography rooted in India's royal traditions.
            </p>
            <p>
              From sunrise shehnai to acoustic Vedic pheras and midnight Sufi symphonies, every moment is planned with obsessive artistic rigor.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-gold-800">
            <span>• 980+ Celebrations</span>
            <span>• 45+ Production Laurels</span>
            <span>• ₹450 Cr+ Managed Budgets</span>
          </div>
        </div>

        <div className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden border border-paper-300 shadow-lux-lg">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
            alt="LUMIÈRE Production Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-paper-200 text-xs text-ink-800 italic font-serif shadow-md">
            "Atithi Devo Bhava: Creating sacred memories that become generational heirlooms."
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
            Directors
          </span>
          <h3 className="text-3xl font-serif font-bold text-ink-950">
            Executive Guild
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((leader, i) => (
            <SpotlightCard key={i} className="p-6 bg-white border border-paper-300 shadow-lux-sm space-y-4">
              <div className="h-64 rounded-2xl overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-ink-900">{leader.name}</h4>
                <div className="text-xs text-gold-800 font-semibold mb-2">{leader.role}</div>
                <p className="text-xs text-ink-600 leading-relaxed font-light">{leader.bio}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
            Milestones
          </span>
          <h3 className="text-3xl font-serif font-bold text-ink-950">
            A Decade of Excellence
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-paper-300 shadow-lux-sm space-y-3 relative">
              <div className="font-serif text-2xl font-bold gold-text-gradient">
                {m.year}
              </div>
              <h4 className="text-sm font-serif font-bold text-ink-900">{m.title}</h4>
              <p className="text-xs text-ink-600 leading-relaxed font-light">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainable Zero-Carbon & Flower Upcycling Pledge */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gold-300 shadow-lux-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-3">
          <div className="flex items-center gap-2 text-xs text-emerald-700 uppercase tracking-widest font-semibold">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Eco-Circularity Pledge</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            Zero-Waste Floral Upcycling
          </h3>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-light">
            100% of ceremonial temple florals are upcycled into organic incenses with artisan cooperatives. Single-use plastic is strictly prohibited.
          </p>
        </div>
        <div className="md:col-span-4 flex justify-center md:justify-end">
          <button
            onClick={onOpenBooking}
            className="btn-gold px-8 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider"
          >
            Commission Celebration
          </button>
        </div>
      </div>

    </div>
  );
}
