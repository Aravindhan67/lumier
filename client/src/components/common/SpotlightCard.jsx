import React, { useRef } from 'react';

export default function SpotlightCard({ 
  children, 
  className = '', 
  glowColor = 'rgba(222, 189, 111, 0.25)', 
  onClick 
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`spotlight-card group relative ${className}`}
      style={{
        '--mouse-x': '-200px',
        '--mouse-y': '-200px',
      }}
    >
      {/* 21st.dev Dynamic Warm Spotlight Accent Layer */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-[1.25rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(550px circle at var(--mouse-x) var(--mouse-y), ${glowColor}, transparent 45%)`
        }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
