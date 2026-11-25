import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  PhoneCall, 
  ShieldCheck,
  Home,
  Compass,
  Landmark,
  Calculator,
  Crown,
  BookOpen,
  FileText,
  Send,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenBooking, inquiryCount = 0 }) {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSideMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when side drawer is open
  useEffect(() => {
    if (sideMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sideMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'portfolio', label: 'Portfolio', icon: Compass },
    { id: 'services', label: 'Services', icon: Sparkles },
    { id: 'packages', label: 'Packages', icon: Crown },
    { id: 'venues', label: 'Venues', icon: Landmark },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'about', label: 'About', icon: BookOpen },
    { id: 'journal', label: 'Journal', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  // Dynamic slot 3 based on active page
  const dynamicMiddleTab = (() => {
    if (activePage === 'venues') return { id: 'venues', label: 'Venues', icon: Landmark };
    if (activePage === 'services') return { id: 'services', label: 'Services', icon: Sparkles };
    // Default to Packages (Royal Tiers)
    return { id: 'packages', label: 'Packages', icon: Crown };
  })();

  // Mobile Bottom Navigation Bar Links (5 key items with dynamic active slot)
  const mobileBottomLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'portfolio', label: 'Portfolio', icon: Compass },
    dynamicMiddleTab,
    { id: 'calculator', label: 'Budget', icon: Calculator },
  ];

  // Calculate which of the 5 slots is active for the sliding liquid glider
  const activeGliderIndex = (() => {
    if (sideMenuOpen) return 4;
    const idx = mobileBottomLinks.findIndex(l => l.id === activePage);
    if (idx !== -1) return idx;
    // If activePage is another page (About, Journal, Contact, Admin), highlight Menu
    return 4;
  })();

  const handleNavClick = (id) => {
    setActivePage(id);
    setSideMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. TOP PRE-HEADER ANNOUNCEMENT BAR (Desktop) */}
      <div className="bg-paper-100 border-b border-paper-300/80 py-1.5 px-4 text-xs tracking-wider text-ink-600 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-gold-800 font-medium">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-gold-600" />
              Private Ateliers: Mumbai • New Delhi • Bengaluru • Udaipur • Jaipur
            </span>
            <span className="text-paper-300">•</span>
            <span className="text-ink-500">2025/2026 Auspicious Muhurat Dates Now Open</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+919820058643" className="text-ink-600 hover:text-gold-700 transition-colors flex items-center gap-1 font-medium">
              <PhoneCall className="w-3 h-3 text-gold-600" />
              <span>Concierge: +91 98200 58643</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Desktop & Mobile Top Header) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-paper-300/70 shadow-lux-sm transition-all duration-300 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 xl:gap-4 w-full">
            
            {/* Brand Logo */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2 sm:space-x-3 text-left group min-w-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-gold-600 via-gold-500 to-amber-300 flex items-center justify-center text-white font-serif font-black text-base sm:text-xl shadow-md shadow-gold-600/20 group-hover:scale-105 transition-transform shrink-0">
                L
              </div>
              <div className="min-w-0">
                <span className="font-serif tracking-widest text-base sm:text-xl font-bold uppercase gold-text-gradient block truncate">
                  LUMIÈRE
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-[0.22em] text-ink-500 uppercase font-sans block -mt-0.5 sm:-mt-1 font-semibold truncate">
                  <span className="hidden xs:inline">India • </span>Royal Events & Production
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`whitespace-nowrap px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 relative inline-flex items-center justify-center leading-none ${
                      isActive 
                        ? 'text-gold-900 font-semibold bg-gold-50/70' 
                        : 'text-ink-700 hover:text-ink-950 hover:bg-paper-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-gradient-to-r from-gold-500 via-amber-400 to-gold-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Right Action Button */}
            <div className="hidden lg:flex items-center space-x-4 shrink-0">
              <button
                onClick={onOpenBooking}
                className="btn-gold px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center space-x-2 shadow-md text-white"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white">Reserve Muhurat</span>
              </button>
            </div>

            {/* Mobile Top Header Actions */}
            <div className="flex lg:hidden items-center space-x-2 shrink-0">
              <button
                onClick={onOpenBooking}
                className="btn-gold px-3 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs tracking-wider uppercase font-semibold text-white whitespace-nowrap"
              >
                Inquire
              </button>
              
              {/* Button to open Side Nav Bar */}
              <button
                onClick={() => setSideMenuOpen(true)}
                className="p-2 sm:p-2.5 rounded-xl text-ink-800 hover:text-gold-800 hover:bg-paper-100 border border-paper-300 relative shrink-0"
                aria-label="Open Side Navigation Drawer"
              >
                <Menu className="w-5 h-5" />
                {inquiryCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gold-600 rounded-full ring-2 ring-white" />
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 3. MOBILE SIDE NAVIGATION BAR (Slide-Over Drawer from Right) */}
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          sideMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSideMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <aside 
        className={`fixed inset-y-0 right-0 z-50 w-[86%] max-w-[340px] bg-white border-l border-gold-300 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden ${
          sideMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile Side Navigation"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-paper-200 flex items-center justify-between bg-paper-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-gold-600 via-gold-500 to-amber-300 flex items-center justify-center text-white font-serif font-black text-base shadow-sm">
              L
            </div>
            <div>
              <span className="font-serif tracking-widest text-base font-bold uppercase gold-text-gradient block">
                LUMIÈRE
              </span>
              <span className="text-[9px] tracking-widest text-ink-500 uppercase font-sans block -mt-1 font-semibold">
                Royal Events Atelier
              </span>
            </div>
          </div>

          <button
            onClick={() => setSideMenuOpen(false)}
            className="p-2 rounded-full text-ink-600 hover:text-ink-950 hover:bg-paper-200 transition-colors"
            aria-label="Close Side Navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links (Vertical Scrollable) */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-none">
          <div className="px-3 pb-2 text-[10px] uppercase tracking-widest text-gold-700 font-bold">
            Navigation Directory
          </div>

          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full px-3.5 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-gold-50 text-gold-900 font-bold border border-gold-300 shadow-sm'
                    : 'text-ink-700 hover:bg-paper-100 hover:text-ink-950'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold-700' : 'text-ink-400'}`} />
                  <span>{link.label}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-gold-600' : 'text-ink-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-paper-200 bg-paper-50 space-y-3">
          <a
            href="tel:+919820058643"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-ink-700 bg-white border border-paper-300 shadow-lux-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-gold-600" />
            <span>VIP Hotline: +91 98200 58643</span>
          </a>

          <button
            onClick={() => {
              setSideMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full btn-gold py-3 rounded-xl text-xs uppercase tracking-widest font-bold text-center shadow-lux flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commission an Event</span>
          </button>
        </div>
      </aside>

      {/* 4. LUXURY MOBILE FLOATING DOCK (Luminous Diya Spotlight & Magnetic Wave) */}
      <nav 
        className="fixed bottom-3 left-3 right-3 sm:left-6 sm:right-6 max-w-lg mx-auto z-40 lg:hidden"
        aria-label="Mobile Quick Bottom Navigation"
      >
        <div className="relative rounded-3xl bg-white/95 backdrop-blur-2xl border border-gold-300/80 shadow-[0_14px_45px_rgba(217,119,6,0.18)] ring-1 ring-gold-200/50 py-2 px-2 transition-all overflow-hidden">
          
          {/* Subtle Top Gold Shimmer Base Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-paper-300/60 pointer-events-none" />

          {/* UNIQUE ANIMATION 1: LUMINOUS DIYA SPOTLIGHT BEAM (Glides on top border above active tab) */}
          <div 
            className="absolute -top-[1px] h-[3px] bg-gradient-to-r from-transparent via-gold-500 to-transparent rounded-full shadow-[0_0_14px_#d97706] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none z-20"
            style={{
              left: `calc(${activeGliderIndex * 20}% + 10%)`,
              width: '46px',
              transform: 'translateX(-50%)'
            }}
          />

          {/* UNIQUE ANIMATION 2: AMBIENT DOWNWARD GOLDEN CONE (Soft radiant light shining onto active icon) */}
          <div 
            className="absolute top-0 h-16 w-20 bg-gradient-to-b from-amber-400/25 via-gold-300/10 to-transparent blur-md rounded-full pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0"
            style={{
              left: `calc(${activeGliderIndex * 20}% + 10%)`,
              transform: 'translateX(-50%)'
            }}
          />

          {/* UNIQUE ANIMATION 3: GLIDING GOLDEN CRESCENT ARC (Bottom active indicator line) */}
          <div 
            className="absolute bottom-1 h-[3px] bg-gradient-to-r from-gold-600 via-amber-400 to-gold-600 rounded-full shadow-[0_1px_8px_rgba(217,119,6,0.6)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none z-20"
            style={{
              left: `calc(${activeGliderIndex * 20}% + 10%)`,
              width: '24px',
              transform: 'translateX(-50%)'
            }}
          />

          <div className="grid grid-cols-5 items-center relative z-10">
            {mobileBottomLinks.map((item, idx) => {
              const isActive = activeGliderIndex === idx;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-200 relative group active:scale-90"
                >
                  {/* Magnetic Floating Icon with Glow Halo */}
                  <div className={`transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative flex items-center justify-center ${
                    isActive 
                      ? 'text-gold-700 transform -translate-y-2 scale-115 drop-shadow-[0_4px_8px_rgba(217,119,6,0.3)]' 
                      : 'text-ink-400 group-hover:text-gold-700'
                  }`}>
                    {/* Active Halo Ring */}
                    {isActive && (
                      <div className="absolute w-8 h-8 rounded-full bg-gold-400/20 blur-[2px] animate-pulse pointer-events-none" />
                    )}
                    
                    {/* Micro Sparkle Accent */}
                    {isActive && (
                      <Sparkles className="w-2.5 h-2.5 text-amber-500 absolute -top-1.5 -right-1.5 animate-pulse pointer-events-none" />
                    )}

                    <Icon className="w-5 h-5 relative z-10" />
                  </div>
                  
                  {/* Label */}
                  <span className={`text-[10px] tracking-tight leading-none transition-all duration-300 ${
                    isActive 
                      ? 'font-extrabold text-gold-950 transform -translate-y-0.5 scale-105' 
                      : 'font-medium text-ink-500 group-hover:text-ink-900 mt-1'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}

            {/* 5th Item: Menu / More (Toggles the Side Drawer) */}
            {(() => {
              const isMenuActive = activeGliderIndex === 4;
              return (
                <button
                  onClick={() => setSideMenuOpen(true)}
                  className="flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-200 relative group active:scale-90"
                >
                  <div className={`transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative flex items-center justify-center ${
                    isMenuActive 
                      ? 'text-gold-700 transform -translate-y-2 scale-115 drop-shadow-[0_4px_8px_rgba(217,119,6,0.3)]' 
                      : 'text-ink-400 group-hover:text-gold-700'
                  }`}>
                    {isMenuActive && (
                      <div className="absolute w-8 h-8 rounded-full bg-gold-400/20 blur-[2px] animate-pulse pointer-events-none" />
                    )}
                    {isMenuActive && (
                      <Sparkles className="w-2.5 h-2.5 text-amber-500 absolute -top-1.5 -right-1.5 animate-pulse pointer-events-none" />
                    )}
                    
                    <Layers className="w-5 h-5 relative z-10" />

                    {inquiryCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gold-600 rounded-full ring-2 ring-white animate-pulse" />
                    )}
                  </div>

                  <span className={`text-[10px] tracking-tight leading-none transition-all duration-300 ${
                    isMenuActive 
                      ? 'font-extrabold text-gold-950 transform -translate-y-0.5 scale-105' 
                      : 'font-medium text-ink-500 group-hover:text-ink-900 mt-1'
                  }`}>
                    Menu
                  </span>
                </button>
              );
            })()}
          </div>
        </div>
      </nav>
    </>
  );
}
