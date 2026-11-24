import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X } from 'lucide-react';
import SpotlightCard from '../components/common/SpotlightCard.jsx';

export default function JournalPage({ posts, onOpenBooking }) {
  const [activeArticle, setActiveArticle] = useState(null);

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
      {posts && posts[0] && (
        <SpotlightCard
          onClick={() => setActiveArticle(posts[0])}
          className="cursor-pointer group p-6 sm:p-10 bg-white border border-gold-300 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-lux"
        >
          <div className="lg:col-span-6 h-72 sm:h-96 rounded-2xl overflow-hidden relative">
            <img
              src={posts[0].image}
              alt={posts[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-gold-500 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                Featured
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3 text-xs text-ink-500">
              <span className="text-gold-800 font-semibold">{posts[0].category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-600" />
                {posts[0].readTime}
              </span>
              <span>•</span>
              <span>{posts[0].date}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 group-hover:text-gold-700 transition-colors">
              {posts[0].title}
            </h2>

            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-light">
              {posts[0].summary}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-ink-400 italic">By {posts[0].author}</span>
              <span className="text-gold-700 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Monograph <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </SpotlightCard>
      )}

      {/* Grid of Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts?.slice(1).map((post) => (
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
