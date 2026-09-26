import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Sparkles, Utensils, Flame } from 'lucide-react';

const SAMPLE_MENU: MenuItem[] = [
  {
    id: 'm1',
    name: '32oz USDA Prime Tomahawk Ribeye',
    category: 'steaks',
    priceUSD: 165,
    description: '45-day dry-aged beef infused with white oak smoke and bone marrow compound butter.',
    usdaGrade: 'USDA Prime',
    dryAgedDays: 45,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: 'm2',
    name: 'A5 Miyazaki Wagyu Strip Loin (8oz)',
    category: 'steaks',
    priceUSD: 210,
    description: 'Authentic Grade A5 Japanese Wagyu grilled over Binchotan charcoal with black truffle sea salt.',
    usdaGrade: 'A5 Wagyu',
    origin: 'Miyazaki Prefecture, Japan',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: 'm3',
    name: 'Maine Lobster Thermidor & Caviar',
    category: 'seafood',
    priceUSD: 140,
    description: 'Whole poached Atlantic lobster with Cognac cream, gruyère crust, topped with 10g Petrossian Osetra caviar.',
    usdaGrade: 'Wild Caught',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm4',
    name: 'Pan-Seared Hudson Valley Foie Gras',
    category: 'starters',
    priceUSD: 42,
    description: 'Caramelized mission fig reduction, brioche toast, and aged balsamic glaze.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm5',
    name: 'Château Margaux 2015 (Premier Grand Cru)',
    category: 'wines',
    priceUSD: 1250,
    description: 'Silky, aromatic vintage with rich cassis, violets, and cedar wood nuances.',
    usdaGrade: 'Grand Cru',
    origin: 'Bordeaux, France',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm6',
    name: '24K Gold Leaf Valrhona Chocolate Soufflé',
    category: 'desserts',
    priceUSD: 38,
    description: 'Warm dark Valrhona chocolate centerpiece, edible 24k gold leaf flakes, and Madagascar vanilla bean gelato.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80'
  }
];

export const MenuPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'steaks' | 'seafood' | 'starters' | 'wines' | 'desserts'>('all');

  const filteredItems = filter === 'all' 
    ? SAMPLE_MENU 
    : SAMPLE_MENU.filter(item => item.category === filter);

  return (
    <div className="space-y-10 py-6">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs">
          <Utensils className="w-3.5 h-3.5" /> Culinary Excellence
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-100">
          The Estate Fine Reserve Menu
        </h1>
        <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto">
          Every cut is dry-aged on site in our humidity-controlled salt chambers and grilled over white oak charcoal.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'all', label: 'All Offerings' },
          { id: 'steaks', label: 'Prime Cuts & Wagyu' },
          { id: 'seafood', label: 'Fresh Seafood' },
          { id: 'starters', label: 'Appetizers' },
          { id: 'wines', label: 'Wine Vault' },
          { id: 'desserts', label: 'Artisanal Desserts' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all border ${
              filter === cat.id
                ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md'
                : 'bg-neutral-900/60 border-amber-500/10 text-slate-400 hover:border-amber-500/30'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-neutral-900/40 border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                {item.usdaGrade && (
                  <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-amber-500/40 text-[#D4AF37] text-[10px] font-semibold px-2.5 py-1 rounded-md">
                    {item.usdaGrade}
                  </span>
                )}
                {item.isPopular && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Chef Choice
                  </span>
                )}
              </div>

              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-serif text-lg font-bold text-slate-100 group-hover:text-amber-200 transition-colors">
                    {item.name}
                  </h3>
                  <span className="font-serif text-lg font-bold text-[#D4AF37]">
                    ${item.priceUSD}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between text-[11px] text-amber-400/70 border-t border-neutral-800/60 mt-2">
              {item.dryAgedDays ? (
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> {item.dryAgedDays}-Day Cellar Aged
                </span>
              ) : item.origin ? (
                <span>Origin: {item.origin}</span>
              ) : (
                <span>Prepared Fresh Daily</span>
              )}
              <span className="text-slate-500">USD $</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
