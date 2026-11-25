import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Users, 
  Flame, 
  Plane, 
  Check, 
  ShieldCheck
} from 'lucide-react';
import SpotlightCard from '../common/SpotlightCard.jsx';
import { getApiUrl } from '../../config/api.js';

// Indian numbering format helper (Lakhs & Crores)
function formatINR(val) {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Crore`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
}

export default function EventCalculator({ onOpenBooking }) {
  const [guestCount, setGuestCount] = useState(350);
  const [eventType, setEventType] = useState('Royal Destination Wedding');
  const [productionTier, setProductionTier] = useState('elevated'); // standard, elevated, vanguard
  const [gastronomyLevel, setGastronomyLevel] = useState('michelin'); // curated, michelin, royal
  const [floralLevel, setFloralLevel] = useState('luxe'); // minimalist, luxe, couture
  
  const [hasPyrotechnics, setHasPyrotechnics] = useState(false);
  const [hasDroneShow, setHasDroneShow] = useState(false);
  const [hasAviationConcierge, setHasAviationConcierge] = useState(false);

  const [estimate, setEstimate] = useState({
    breakdown: {
      productionArchitecture: 650000,
      gastronomyAndSommelier: 770000,
      floralAndScenicArt: 770000,
      curatedAddons: 0,
      managementAndGovernance: 219000
    },
    addons: [],
    guestCount: 350,
    eventType: 'Royal Destination Wedding',
    tierSummary: 'Elevated Production & Michelin Dining',
    estimatedTotal: 2409000,
    rangeFormatted: '₹22.16 Lakhs - ₹26.98 Lakhs'
  });
  const [calculating, setCalculating] = useState(false);

  const computeEstimate = async () => {
    setCalculating(true);
    try {
      const res = await fetch(getApiUrl('/api/quote-calculator'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestCount,
          eventType,
          productionTier,
          gastronomyLevel,
          floralLevel,
          hasPyrotechnics,
          hasDroneShow,
          hasAviationConcierge
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setEstimate(data.data);
      } else {
        fallbackCalculate();
      }
    } catch (e) {
      fallbackCalculate();
    } finally {
      setCalculating(false);
    }
  };

  const fallbackCalculate = () => {
    const guests = Math.max(50, parseInt(guestCount) || 200);
    let baseProd = productionTier === 'standard' ? 250000 : productionTier === 'elevated' ? 650000 : 1500000;
    let foodPerGuest = gastronomyLevel === 'curated' ? 1200 : gastronomyLevel === 'michelin' ? 2200 : 3800;
    let floralRate = floralLevel === 'minimalist' ? 500 : floralLevel === 'luxe' ? 1200 : 2400;
    let baseFloral = floralLevel === 'minimalist' ? 150000 : floralLevel === 'luxe' ? 350000 : 750000;
    
    let foodTotal = guests * foodPerGuest;
    let floralTotal = guests * floralRate + baseFloral;
    let addons = 0;
    const addOnList = [];
    if (hasPyrotechnics) { addons += 180000; addOnList.push({ name: 'Cold Pyro & Fireworks', cost: 180000 }); }
    if (hasDroneShow) { addons += 450000; addOnList.push({ name: '300-Drone Aerial Show', cost: 450000 }); }
    if (hasAviationConcierge) { addons += 380000; addOnList.push({ name: 'Private Aircraft & VIP Motorcade', cost: 380000 }); }

    const sub = baseProd + foodTotal + floralTotal + addons;
    const mgmt = Math.round(sub * 0.10);
    const grand = sub + mgmt;

    setEstimate({
      breakdown: {
        productionArchitecture: baseProd,
        gastronomyAndSommelier: foodTotal,
        floralAndScenicArt: floralTotal,
        curatedAddons: addons,
        managementAndGovernance: mgmt
      },
      addons: addOnList,
      guestCount: guests,
      eventType,
      tierSummary: `${productionTier.toUpperCase()} Production with ${gastronomyLevel.toUpperCase()} Gastronomy`,
      estimatedTotal: grand,
      rangeFormatted: `${formatINR(Math.round(grand * 0.92))} - ${formatINR(Math.round(grand * 1.12))}`
    });
  };

  useEffect(() => {
    computeEstimate();
  }, [guestCount, eventType, productionTier, gastronomyLevel, floralLevel, hasPyrotechnics, hasDroneShow, hasAviationConcierge]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          <SpotlightCard className="p-4 sm:p-8 bg-white border border-paper-300 shadow-lux">
            <div className="space-y-6">
              
              {/* Event Type */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink-700 font-semibold mb-3">
                  1. Event Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Royal Destination Wedding', 
                    'Grand Sangeet & Mehendi', 
                    'Corporate Conclave', 
                    'High-Profile Gala', 
                    'Milestone Celebration',
                    'Palace Soirée & Gala'
                  ].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEventType(type)}
                      className={`p-2.5 sm:p-3 rounded-xl text-xs font-medium text-center border transition-all h-full min-h-[46px] flex items-center justify-center leading-tight ${
                        eventType === type
                          ? 'bg-gold-50 border-gold-400 text-gold-900 font-semibold shadow-sm'
                          : 'bg-paper-50 border-paper-200 text-ink-600 hover:border-paper-300'
                      }`}
                    >
                      <span>{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-widest text-ink-700 font-semibold flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gold-600" />
                    2. Guest Count
                  </label>
                  <span className="font-serif text-xl font-bold text-gold-800">
                    {guestCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2500"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  className="w-full accent-gold-500 bg-paper-200 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-ink-400 mt-1.5 font-medium px-0.5">
                  <span>50 <span className="hidden sm:inline">(Intimate)</span></span>
                  <span>350 <span className="hidden sm:inline">(Destination)</span></span>
                  <span>800 <span className="hidden sm:inline">(Grand)</span></span>
                  <span>2,500+ <span className="hidden sm:inline">(Imperial)</span></span>
                </div>
              </div>

              {/* Production Tier */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink-700 font-semibold mb-3">
                  3. Production Tier
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: 'standard', name: 'Signature', desc: 'Concert audio & mood lighting' },
                    { id: 'elevated', name: 'Rajwada Élite', desc: 'MicroLED & spatial acoustics' },
                    { id: 'vanguard', name: 'Imperial Vanguard', desc: 'Kinetic arches & stadium lasers' }
                  ].map(tier => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setProductionTier(tier.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all h-full min-h-[96px] sm:min-h-[105px] flex flex-col justify-between ${
                        productionTier === tier.id
                          ? 'bg-gold-50 border-gold-400 text-gold-900 font-semibold shadow-sm'
                          : 'bg-paper-50 border-paper-200 text-ink-600 hover:border-paper-300'
                      }`}
                    >
                      <div className="h-7 sm:h-8 flex items-center">
                        <div className="text-[11px] sm:text-xs font-bold text-ink-900 leading-tight">
                          {tier.name}
                        </div>
                      </div>
                      <div className="text-[10px] text-ink-500 leading-snug line-clamp-2">
                        {tier.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gastronomy Tier */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink-700 font-semibold mb-3">
                  4. Gastronomy
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: 'curated', name: 'Curated Royal', desc: '₹1,200/guest • Regional feast' },
                    { id: 'michelin', name: 'Master Chef', desc: '₹2,200/guest • Awadhi counters' },
                    { id: 'royal', name: 'Imperial Silver', desc: '₹3,800/guest • 24-dish Thali' }
                  ].map(gast => (
                    <button
                      key={gast.id}
                      type="button"
                      onClick={() => setGastronomyLevel(gast.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all h-full min-h-[96px] sm:min-h-[105px] flex flex-col justify-between ${
                        gastronomyLevel === gast.id
                          ? 'bg-gold-50 border-gold-400 text-gold-900 font-semibold shadow-sm'
                          : 'bg-paper-50 border-paper-200 text-ink-600 hover:border-paper-300'
                      }`}
                    >
                      <div className="h-7 sm:h-8 flex items-center">
                        <div className="text-[11px] sm:text-xs font-bold text-ink-900 leading-tight">
                          {gast.name}
                        </div>
                      </div>
                      <div className="text-[10px] text-ink-500 leading-snug line-clamp-2">
                        {gast.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Floral & Mandap Scale */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink-700 font-semibold mb-3">
                  5. Florals & Scenography
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: 'minimalist', name: 'Architectural', desc: 'Botanicals & brass urns' },
                    { id: 'luxe', name: 'Grand Cascade', desc: 'Lotus mandap & canopy' },
                    { id: 'couture', name: 'Royal Living', desc: 'Floating water mandap' }
                  ].map(fl => (
                    <button
                      key={fl.id}
                      type="button"
                      onClick={() => setFloralLevel(fl.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all h-full min-h-[96px] sm:min-h-[105px] flex flex-col justify-between ${
                        floralLevel === fl.id
                          ? 'bg-gold-50 border-gold-400 text-gold-900 font-semibold shadow-sm'
                          : 'bg-paper-50 border-paper-200 text-ink-600 hover:border-paper-300'
                      }`}
                    >
                      <div className="h-7 sm:h-8 flex items-center">
                        <div className="text-[11px] sm:text-xs font-bold text-ink-900 leading-tight">
                          {fl.name}
                        </div>
                      </div>
                      <div className="text-[10px] text-ink-500 leading-snug line-clamp-2">
                        {fl.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div className="pt-2 border-t border-paper-200">
                <label className="block text-xs uppercase tracking-widest text-ink-700 font-semibold mb-3">
                  6. Curated Add-Ons
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setHasPyrotechnics(!hasPyrotechnics)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      hasPyrotechnics ? 'bg-gold-50 border-gold-400 text-gold-900 font-semibold shadow-sm' : 'bg-paper-50 border-paper-200 text-ink-600'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-ink-900 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-600" />
                        Cold Pyro & Fireworks
                      </div>
                      <div className="text-[10px] text-ink-500">+₹1.80 Lakhs</div>
                    </div>
                    {hasPyrotechnics && <Check className="w-4 h-4 text-gold-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasDroneShow(!hasDroneShow)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      hasDroneShow ? 'bg-gold-50 border-gold-400 text-gold-900 font-semibold shadow-sm' : 'bg-paper-50 border-paper-200 text-ink-600'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-ink-900 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        300-Drone Show
                      </div>
                      <div className="text-[10px] text-ink-500">+₹4.50 Lakhs</div>
                    </div>
                    {hasDroneShow && <Check className="w-4 h-4 text-gold-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasAviationConcierge(!hasAviationConcierge)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      hasAviationConcierge ? 'bg-gold-50 border-gold-400 text-gold-900 font-semibold shadow-sm' : 'bg-paper-50 border-paper-200 text-ink-600'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-ink-900 flex items-center gap-1">
                        <Plane className="w-3.5 h-3.5 text-amber-600" />
                        Charter & VIP Convoy
                      </div>
                      <div className="text-[10px] text-ink-500">+₹3.80 Lakhs</div>
                    </div>
                    {hasAviationConcierge && <Check className="w-4 h-4 text-gold-600" />}
                  </button>
                </div>
              </div>

            </div>
          </SpotlightCard>
        </div>

        {/* Live Estimate Breakdown Card */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <SpotlightCard className="p-4 sm:p-8 bg-white border border-gold-300 shadow-lux-lg">
            <div className="space-y-6">
              
              <div className="flex justify-between items-center border-b border-paper-200 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold block">
                    Scope Matrix
                  </span>
                  <h3 className="text-xl font-serif font-bold text-ink-900">
                    Estimated Budget
                  </h3>
                </div>
                <div className="p-2 rounded-xl bg-gold-100 border border-gold-300">
                  <Calculator className="w-5 h-5 text-gold-700" />
                </div>
              </div>

              {/* Total Figure in INR */}
              <div className="p-5 sm:p-6 rounded-2xl bg-paper-100 border border-gold-300 text-center space-y-1">
                <span className="text-xs uppercase tracking-widest text-ink-500 font-medium">
                  Projected Range
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-extrabold gold-text-gradient">
                  {estimate && estimate.estimatedTotal
                    ? `${formatINR(Math.round(estimate.estimatedTotal * 0.92))} - ${formatINR(Math.round(estimate.estimatedTotal * 1.12))}`
                    : '₹68.77 Lakhs - ₹83.72 Lakhs'}
                </div>
                <p className="text-[11px] text-ink-500">
                  For {guestCount} guests • {eventType}
                </p>
              </div>

              {/* Itemized Cost Bars */}
              {estimate && estimate.breakdown && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs uppercase tracking-wider text-ink-700 font-semibold block">
                    Cost Breakdown
                  </span>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-ink-700">
                      <span>Production & Staging</span>
                      <span className="font-mono text-gold-800 font-semibold">
                        {formatINR(estimate.breakdown.productionArchitecture)}
                      </span>
                    </div>
                    <div className="w-full bg-paper-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gold-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (estimate.breakdown.productionArchitecture / (estimate.estimatedTotal || 1)) * 100 * 2.2)}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-ink-700 pt-1">
                      <span>Gastronomy & Dining</span>
                      <span className="font-mono text-gold-800 font-semibold">
                        {formatINR(estimate.breakdown.gastronomyAndSommelier)}
                      </span>
                    </div>
                    <div className="w-full bg-paper-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (estimate.breakdown.gastronomyAndSommelier / (estimate.estimatedTotal || 1)) * 100 * 2.2)}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-ink-700 pt-1">
                      <span>Florals & Scenography</span>
                      <span className="font-mono text-gold-800 font-semibold">
                        {formatINR(estimate.breakdown.floralAndScenicArt)}
                      </span>
                    </div>
                    <div className="w-full bg-paper-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-yellow-600 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (estimate.breakdown.floralAndScenicArt / (estimate.estimatedTotal || 1)) * 100 * 2.2)}%` }}
                      />
                    </div>

                    {estimate.breakdown.curatedAddons > 0 && (
                      <>
                        <div className="flex justify-between text-ink-700 pt-1">
                          <span>Spectacle Add-Ons</span>
                          <span className="font-mono text-gold-800 font-semibold">
                            {formatINR(estimate.breakdown.curatedAddons)}
                          </span>
                        </div>
                        <div className="w-full bg-paper-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-rose-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, (estimate.breakdown.curatedAddons / (estimate.estimatedTotal || 1)) * 100 * 2.2)}%` }}
                          />
                        </div>
                      </>
                    )}

                    <div className="flex justify-between text-ink-700 pt-1">
                      <span>Management & Direction</span>
                      <span className="font-mono text-gold-800 font-semibold">
                        {formatINR(estimate.breakdown.managementAndGovernance)}
                      </span>
                    </div>
                    <div className="w-full bg-paper-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (estimate.breakdown.managementAndGovernance / (estimate.estimatedTotal || 1)) * 100 * 2.2)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Guarantees */}
              <div className="p-4 rounded-xl bg-paper-100 border border-paper-200 space-y-1 text-[11px] text-ink-600">
                <div className="flex items-center gap-1.5 text-gold-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-gold-600" />
                  <span>Audited Line-Item Pricing</span>
                </div>
                <p>
                  Transparent itemized billing with zero hidden surcharges.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full btn-gold py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-md"
                >
                  Reserve With This Scope
                </button>
                <p className="text-[10px] text-center text-ink-400">
                  Includes itemized scope dossier.
                </p>
              </div>

            </div>
          </SpotlightCard>
        </div>

      </div>
    </div>
  );
}
