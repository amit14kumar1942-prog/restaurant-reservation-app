import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { FirebaseSetupPage } from './pages/FirebaseSetupPage';
import { auth } from './config/firebase';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'reservations' | 'firebase'>('home');
  const [selectedCity, setSelectedCity] = useState<string>('Manhattan, NYC');

  const isFirebaseConnected = !!auth.app.options.apiKey && auth.app.options.apiKey !== "AIzaSyDemoKey1234567890abcdefghijklmnopqrst";

  return (
    <div className="min-h-screen bg-[#08080A] text-slate-100 flex flex-col font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        isFirebaseConnected={isFirebaseConnected}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8">
        {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} selectedCity={selectedCity} />}
        {activeTab === 'menu' && <MenuPage />}
        {activeTab === 'reservations' && <ReservationsPage selectedCity={selectedCity} />}
        {activeTab === 'firebase' && <FirebaseSetupPage />}
      </main>

      <footer className="border-t border-amber-500/10 py-8 bg-neutral-950 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © 2026 THE ESTATE PRIME & RESERVE. Built with React, TypeScript & Firebase.
          </div>
          <div className="flex items-center gap-4 text-amber-400/60">
            <span>Manhattan</span> • <span>Beverly Hills</span> • <span>Miami Beach</span> • <span>Chicago</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
