import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X } from 'lucide-react';
import SpotlightCard from '../components/common/SpotlightCard.jsx';

const fallbackPosts = [
  {
    id: 'post-1',
    slug: 'sacred-mandap-architecture-and-spatial-sound',
    title: 'The Sacred Architecture of the Mandap: Harmonizing Vedic Geometry with Modern Acoustic Design',
    category: 'Wedding Architecture',
    readTime: '6 min read',
    date: 'November 2024',
    author: 'Arthur Vance & Pandit Ramesh Shastri',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    summary: 'How aligning traditional four-pillar Vedic mandap orientation with directional spatial microphone arrays ensures every Sanskrit shloka resonates with crystal clarity for 500 guests.',
    content: `In Indian wedding tradition, the Mandap is not decorative scenery; it is a sacred cosmic sanctum. The four pillars represent the four parents, the four Vedas, and the four ashrams of human life.

At LUMIÈRE, we unite this ancient wisdom with vanguard audio engineering:
1. Vedic Orientation: Aligning the sacred Agni kund with micro-directional air exhausts so holy smoke elevates upward without irritating the eyes of the couple or guests.
2. Pinpoint Spatial Sound: Using boundary microphones concealed inside the brass kalash, the Pandit's Vedic chanting is amplified evenly across the courtyard so distant guests feel as if they are seated in the first row.
3. Natural Floral Temperatures: Selecting locally harvested tuberose (Rajnigandha) and jasmine (Mogra) that release their sweetest botanical oils at the onset of evening twilight.`
  },
  {
    id: 'post-2',
    slug: 'top-rajasthan-heritage-palaces-for-weddings-2025',
    title: 'Royalty Redefined: Top Heritage Palaces in Rajasthan for 2025/2026 Destination Celebrations',
    category: 'Palace Guide',
    readTime: '8 min read',
    date: 'October 2024',
    author: 'Sophie Laurent, Head of Destination Scouting',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    summary: 'A curated private journey through the island fortresses of Udaipur, the sandstone ramparts of Jodhpur, and private royal estates across Jaipur and Samode.',
    content: `The modern Indian destination wedding has evolved. Today's couples look beyond generic banquet halls and seek living history, architectural grandeur, and total royal immersion.

Our scouting team shares key advice on securing heritage trust permits, navigating palace preservation laws when rigging concert lighting, and managing chartered aviation logistics for 300+ guests.`
  },
  {
    id: 'post-3',
    slug: 'zero-waste-indian-weddings-manifesto',
    title: 'The Zero-Waste Haute Indian Wedding: How We Repurpose 100% of Temple Flowers & Banquets',
    category: 'Sustainability in India',
    readTime: '5 min read',
    date: 'September 2024',
    author: 'Aditya Sharma, Production Governance Lead',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    summary: 'How we partner with Indian environmental NGOs to upcycle marigolds and roses into natural organic incenses, and donate surplus banquets to local community kitchens.',
    content: `Traditional Indian celebrations often generated substantial floral and food waste. LUMIÈRE introduced a pioneering circular luxury protocol four years ago across all Indian productions:
1. Temple Flower Upcycling: 100% of wedding marigolds, roses, and lotus are collected at 4 AM by local women's artisan cooperatives to produce organic holi powders and natural dhoop sticks.
2. Food Redistribution: Safe, hygienic redistribution of untouched gourmet banquets to local community kitchens.
3. Biodegradable & Compostable Tableware in all vendor and back-of-house areas.`
  }
];

export default function JournalPage({ posts, onOpenBooking }) {
  const [activeArticle, setActiveArticle] = useState(null);
  const articles = (posts && posts.length > 0) ? posts : fallbackPosts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-semibold uppercase tracking-widest shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-gold-600" />
          <span>Journal</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-ink-950">
          Perspectives & Monographs
        </h1>
        <p className="text-sm sm:text-base text-ink-600 font-light leading-relaxed">
          Explorations in sacred architecture, heritage logistics, and sensory gastronomy.
        </p>
      </div>

      {/* Featured Lead Article */}
      {articles[0] && (
        <SpotlightCard
          onClick={() => setActiveArticle(articles[0])}
          className="cursor-pointer group p-6 sm:p-10 bg-white border border-gold-300 rounded-3xl shadow-lux w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            <div className="lg:col-span-6 h-72 sm:h-96 rounded-2xl overflow-hidden relative w-full">
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-gold-500 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Featured Monograph
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 w-full">
              <div className="flex items-center gap-3 text-xs text-ink-500">
                <span className="text-gold-800 font-semibold">{articles[0].category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold-600" />
                  {articles[0].readTime}
                </span>
                <span>•</span>
                <span>{articles[0].date}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-ink-950 group-hover:text-gold-700 transition-colors leading-tight">
                {articles[0].title}
              </h2>

              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-light">
                {articles[0].summary}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-paper-200">
                <span className="text-ink-400 italic">By {articles[0].author}</span>
                <span className="text-gold-700 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Monograph <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      )}

      {/* Grid of Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.slice(1).map((post) => (
          <SpotlightCard
            key={post.id}
            onClick={() => setActiveArticle(post)}
            className="cursor-pointer group p-6 bg-white border border-paper-300 hover:border-gold-300 rounded-3xl flex flex-col justify-between shadow-lux-sm transition-all"
          >
            <div className="space-y-4">
              <div className="h-56 rounded-2xl overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-md text-ink-900 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-paper-300">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-ink-500">
                <Clock className="w-3 h-3 text-gold-600" />
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-ink-900 group-hover:text-gold-700 transition-colors">
                {post.title}
              </h3>

              <p className="text-xs text-ink-600 font-light leading-relaxed">
                {post.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-paper-200 flex items-center justify-between text-xs">
              <span className="text-ink-400 italic">By {post.author}</span>
              <span className="text-gold-700 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-paper-300 shadow-2xl relative p-6 sm:p-10 space-y-6">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-paper-100 hover:bg-paper-200 text-ink-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-gold-700 uppercase tracking-widest font-semibold">
                <span>{activeArticle.category}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink-950">
                {activeArticle.title}
              </h2>
              <div className="text-xs text-ink-400">
                Authored by {activeArticle.author} • Published {activeArticle.date}
              </div>
            </div>

            <div className="h-72 sm:h-96 rounded-2xl overflow-hidden">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-stone max-w-none text-xs sm:text-sm text-ink-700 leading-relaxed space-y-4 font-light">
              <p className="font-serif italic text-base sm:text-lg text-ink-900 border-l-2 border-gold-500 pl-4">
                "{activeArticle.summary}"
              </p>
              <p>
                {activeArticle.content || 'In modern luxury event curation, sacred spatial design acts as the invisible harmonic foundation. Our creative team approaches every courtyard, terrace, and royal pavilion with sensitivity to ancient geometric proportions.'}
              </p>
              <p>
                Every celebration is treated as an enduring cultural artifact, blending generational heritage with contemporary engineering to yield an indelible sensory memory.
              </p>
            </div>

            <div className="pt-6 border-t border-paper-200 flex items-center justify-between">
              <button
                onClick={() => setActiveArticle(null)}
                className="text-xs font-semibold text-ink-600 hover:text-ink-900"
              >
                Close Reading
              </button>
              <button
                onClick={() => {
                  setActiveArticle(null);
                  onOpenBooking();
                }}
                className="btn-gold px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider"
              >
                Commission Production
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
