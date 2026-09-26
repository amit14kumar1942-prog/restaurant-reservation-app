import React, { useState } from 'react';
import { currentFirebaseConfig, reinitializeFirebase } from '../config/firebase';
import { ShieldCheck, RefreshCw, Key, Database, Terminal } from 'lucide-react';

export const FirebaseSetupPage: React.FC = () => {
  const [config, setConfig] = useState(currentFirebaseConfig);
  const [copied, setCopied] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    reinitializeFirebase(config);
  };

  const sampleEnvCode = `VITE_FIREBASE_API_KEY="${config.apiKey}"
VITE_FIREBASE_AUTH_DOMAIN="${config.authDomain}"
VITE_FIREBASE_PROJECT_ID="${config.projectId}"
VITE_FIREBASE_STORAGE_BUCKET="${config.storageBucket}"
VITE_FIREBASE_MESSAGING_SENDER_ID="${config.messagingSenderId}"
VITE_FIREBASE_APP_ID="${config.appId}"`;

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-100">
          Firebase Backend Configuration Studio
        </h1>
        <p className="text-xs md:text-sm text-slate-400">
          Enter your custom Firebase web keys below to test live Firestore reservations and Auth streams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Credentials Form */}
        <form onSubmit={handleSave} className="md:col-span-2 bg-neutral-900/50 border border-amber-500/20 rounded-2xl p-6 space-y-4">
          <h2 className="font-serif text-lg font-bold text-amber-200 flex items-center gap-2">
            <Key className="w-4 h-4 text-[#D4AF37]" /> Active Firebase Credentials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(config).map((key) => (
              <div key={key} className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{key}</label>
                <input
                  type="text"
                  value={(config as any)[key]}
                  onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                  className="w-full bg-neutral-950 border border-amber-500/20 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 outline-none focus:border-amber-500"
                />
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-xs hover:bg-amber-400 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Save Keys & Reload App
            </button>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('estate_firebase_config');
                window.location.reload();
              }}
              className="px-4 py-2.5 rounded-xl border border-neutral-700 text-slate-400 text-xs hover:bg-neutral-800 transition-all"
            >
              Reset to Default Demo
            </button>
          </div>
        </form>

        {/* Environment File Exporter */}
        <div className="bg-neutral-950 border border-amber-500/20 rounded-2xl p-6 space-y-4">
          <h2 className="font-serif text-lg font-bold text-amber-200 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#D4AF37]" /> .env File Generator
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Copy these keys directly into your local <code className="text-amber-300 font-mono">.env</code> file for development.
          </p>

          <pre className="p-3 bg-neutral-900 rounded-xl text-[10px] font-mono text-amber-300 overflow-x-auto border border-neutral-800 leading-relaxed">
            {sampleEnvCode}
          </pre>

          <button
            onClick={() => {
              navigator.clipboard.writeText(sampleEnvCode);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="w-full py-2 rounded-lg bg-neutral-900 border border-amber-500/30 text-amber-300 text-xs hover:bg-neutral-800 transition-all"
          >
            {copied ? 'Copied to Clipboard!' : 'Copy .env Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
};
