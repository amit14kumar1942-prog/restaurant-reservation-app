import React from 'react';
import { Award, Flame, GlassWater, ArrowRight, ShieldCheck, Star } from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: 'home' | 'menu' | 'reservations' | 'firebase') => void;
  selectedCity: string;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, selectedCity }) => {
  return (
    <div className="space-y-20 py-8">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-b from-neutral-900 to-black p-8 md:p-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Flagship Location: {selectedCity}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-slate-100 leading-tight">
            The Pinnacle of American <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-200 to-amber-500">
              USDA Prime Fine Dining
            </span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light">
            Experiential steakhouse gastronomy featuring 45-day dry-aged artisanal beef, rare Napa Valley cellars, and seamless real-time Firebase reservation synchronization across four US luxury metropolises.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('reservations')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-600 text-black font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              Book Estate Reservation <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className="px-8 py-3.5 rounded-xl border border-amber-500/30 bg-neutral-900/60 text-amber-200 font-medium text-sm hover:bg-neutral-800 transition-all"
            >
              Explore Reserve Menu
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <Flame className="w-6 h-6 text-[#D4AF37]" />,
            title: "45-Day Dry-Aged Prime",
            desc: "Custom-aged in Japanese white oak salt vaults for unmatched marrow richness and cut tenderness."
          },
          {
            icon: <GlassWater className="w-6 h-6 text-[#D4AF37]" />,
            title: "Grand Cru Wine Vault",
            desc: "Curated by Master Sommeliers with rare vintages from Napa Valley, Bordeaux, and Tuscany."
          },
          {
            icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
            title: "James Beard Standard",
            desc: "Exceeding hospitality benchmarks with private dining suites and chef-table culinary art."
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-neutral-900/50 border border-amber-500/20 p-6 rounded-2xl space-y-3 hover:border-amber-500/40 transition-all">
            <div className="p-3 bg-amber-500/10 rounded-xl w-fit border border-amber-500/20">{item.icon}</div>
            <h3 className="font-serif text-xl font-bold text-amber-100">{item.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Firebase Developer Architecture Teaser */}
      <section className="border border-amber-500/20 bg-neutral-900/40 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
            <ShieldCheck className="w-4 h-4" /> Integrated Firebase Backend
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-100">Ready to Connect Your Firestore Database?</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            The estate application includes clean, modular TypeScript hooks (`useAuth.ts`, `firestore.ts`) and a live configuration UI so you can test real-time reservations instantly.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('firebase')}
          className="whitespace-nowrap px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium text-xs hover:bg-amber-500/20 transition-all"
        >
          Open Developer Firebase Console
        </button>
      </section>
    </div>
  );
};
import { Sparkles } from 'lucide-react';
