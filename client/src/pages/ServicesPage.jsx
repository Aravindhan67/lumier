import React from 'react';
import { 
  Sparkles, 
  Cpu, 
  Crown, 
  Utensils, 
  Globe, 
  Target, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import SpotlightCard from '../components/common/SpotlightCard.jsx';

export default function ServicesPage({ services, onOpenBooking, setActivePage }) {
  const iconMap = {
    Sparkles: Sparkles,
    Cpu: Cpu,
    Crown: Crown,
    Utensils: Utensils,
    Globe: Globe,
    Target: Target
  };

  const processMilestones = [
    {
      step: '01',
      title: 'Discovery & Muhurat',
      timeline: 'Phase 1',
      description: 'Aligning family vision, rituals, and auspicious astrological dates.'
    },
    {
      step: '02',
      title: '3D Palace Simulation',
      timeline: 'Phase 2',
      description: 'Photorealistic virtual walkthroughs of mandaps, lighting, and stagecraft.'
    },
    {
      step: '03',
      title: 'Guild & Heritage Logistics',
      timeline: 'Phase 3',
      description: 'Securing palace permits, drone clearances, and Khansama brigades.'
    },
    {
      step: '04',
      title: 'Zero-Fault Production',
      timeline: 'Event Week',
      description: '24/7 command center, discreet protocol, and white-glove hosting.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>Atelier Capabilities</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink-950">
          Royal Event Architecture
        </h1>
        <p className="text-sm text-ink-600 font-light">
          Spatial design, acoustics, and hospitality across India's landmark destinations.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => {
          const IconComp = iconMap[srv.icon] || Sparkles;
          return (
            <SpotlightCard key={srv.id} className="p-7 bg-white border border-paper-300 shadow-lux flex flex-col justify-between rounded-3xl">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-100 border border-gold-300 flex items-center justify-center text-gold-700">
                  <IconComp className="w-6 h-6" />
                </div>
                
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold-700 font-bold block">
                    {srv.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-ink-900 mt-1">
                    {srv.title}
                  </h3>
                </div>

                <p className="text-xs text-ink-600 leading-relaxed font-light">
                  {srv.shortDesc}
                </p>

                <div className="space-y-2 pt-2 border-t border-paper-200">
                  {srv.features?.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-ink-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-paper-200">
                <button
                  onClick={onOpenBooking}
                  className="w-full btn-gold py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold text-center"
                >
                  Commission Discipline
                </button>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Process Milestones */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
            Methodology
          </span>
          <h2 className="text-3xl font-serif font-bold text-ink-950">
            Four Auspicious Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processMilestones.map((m) => (
            <SpotlightCard key={m.step} className="p-5 bg-white border border-paper-300 shadow-lux-sm space-y-2 rounded-2xl">
              <div className="flex justify-between items-center">
                <span className="font-serif text-2xl font-bold gold-text-gradient">
                  {m.step}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-paper-100 text-ink-600 border border-paper-200">
                  {m.timeline}
                </span>
              </div>
              <h4 className="text-sm font-serif font-bold text-ink-900">
                {m.title}
              </h4>
              <p className="text-xs text-ink-600 font-light leading-relaxed">
                {m.description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Minimal Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-paper-100 border border-gold-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <h4 className="text-base font-serif font-bold text-ink-950">
            Ready to commission an atelier production?
          </h4>
          <p className="text-xs text-ink-600 font-light">
            Direct coordination with our principal designers and technical directors.
          </p>
        </div>
        <button
          onClick={onOpenBooking}
          className="btn-gold px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider shrink-0"
        >
          Request Consultation
        </button>
      </div>

    </div>
  );
}
