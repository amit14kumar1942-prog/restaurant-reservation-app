import React from 'react';
import { ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'menu' | 'reservations' | 'firebase';
  setActiveTab: (tab: 'home' | 'menu' | 'reservations' | 'firebase') => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  isFirebaseConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCity,
  setSelectedCity,
  isFirebaseConnected
}) => {
  const cities = ['Manhattan, NYC', 'Beverly Hills, CA', 'Miami Beach, FL', 'Gold Coast, Chicago'];

  return (
    <header className="sticky top-0 z-50 bg-[#08080A]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-200 p-[1px] shadow-lg shadow-amber-500/10">
            <div className="w-full h-full bg-[#08080A] rounded-full flex items-center justify-center">
              <span className="font-serif text-xl font-bold text-[#D4AF37]">E</span>
            </div>
          </div>
          <div>
            <div className="font-serif text-lg tracking-[0.2em] font-bold text-amber-100 flex items-center gap-2">
              THE ESTATE <span className="text-[10px] tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-[#D4AF37] font-sans border border-amber-500/30">US PRIME</span>
            </div>
            <div className="text-[10px] tracking-[0.3em] text-amber-400/60 uppercase">Steakhouse & Wine Reserve</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-neutral-900/80 p-1.5 rounded-full border border-amber-500/20">
          {[
            { id: 'home', label: 'Overview' },
            { id: 'menu', label: 'Reserve Menu' },
            { id: 'reservations', label: 'Book Table' },
            { id: 'firebase', label: 'Firebase Console' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-amber-600 text-black shadow-md font-semibold'
                  : 'text-neutral-400 hover:text-amber-200 hover:bg-neutral-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Location & Firebase Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-neutral-900/90 border border-amber-500/20 px-3 py-1.5 rounded-lg text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-amber-200 outline-none cursor-pointer text-xs"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-neutral-900 text-neutral-200">
                  {city}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setActiveTab('firebase')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isFirebaseConnected
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isFirebaseConnected ? 'Firebase Active' : 'Configure Firebase'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
