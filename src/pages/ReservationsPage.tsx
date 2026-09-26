import React, { useState } from 'react';
import { saveReservationToFirestore } from '../services/firestore';
import { Calendar, Users, Clock, MapPin, CheckCircle, Shield, AlertCircle } from 'lucide-react';

interface ReservationsPageProps {
  selectedCity: string;
}

export const ReservationsPage: React.FC<ReservationsPageProps> = ({ selectedCity }) => {
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: 2,
    seatingArea: 'Main Dining Hall' as any,
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const depositPerGuest = 50;
  const totalDeposit = formData.guests * depositPerGuest;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docId = await saveReservationToFirestore({
        ...formData,
        location: selectedCity as any,
        depositAmountUSD: totalDeposit,
        status: 'Confirmed'
      });
      setSuccessId(docId);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-100">
          Table Reservation & Private Dining
        </h1>
        <p className="text-xs md:text-sm text-slate-400">
          Selected Flagship: <span className="text-amber-300 font-medium">{selectedCity}</span>
        </p>
      </div>

      {successId ? (
        <div className="bg-neutral-900/80 border border-emerald-500/40 p-8 rounded-2xl text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-100">Reservation Confirmed!</h2>
          <p className="text-xs text-slate-400">
            Your booking reference ID is <span className="text-amber-300 font-mono font-bold">{successId}</span>. <br />
            A confirmation email has been dispatched to <span className="text-slate-200">{formData.email}</span>.
          </p>
          <div className="p-4 bg-neutral-950 rounded-xl max-w-sm mx-auto text-left text-xs space-y-1.5 border border-neutral-800">
            <div><span className="text-slate-500">Location:</span> {selectedCity}</div>
            <div><span className="text-slate-500">Guest Name:</span> {formData.guestName}</div>
            <div><span className="text-slate-500">Date & Time:</span> {formData.date} at {formData.time}</div>
            <div><span className="text-slate-500">Party Size:</span> {formData.guests} Guests ({formData.seatingArea})</div>
            <div><span className="text-slate-500">Hold Deposit:</span> ${totalDeposit} USD</div>
          </div>
          <button
            onClick={() => setSuccessId(null)}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-xs hover:bg-amber-400 transition-all"
          >
            Book Another Table
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-neutral-900/50 border border-amber-500/20 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Full Name</label>
              <input
                type="text"
                required
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                placeholder="Lord Alexander Vanderbilt"
                className="w-full bg-neutral-950 border border-amber-500/20 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-amber-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="vanderbilt@estate.com"
                className="w-full bg-neutral-950 border border-amber-500/20 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-amber-500"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Phone Number</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 234-5678"
                className="w-full bg-neutral-950 border border-amber-500/20 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-amber-500"
              />
            </div>

            {/* Guests Count */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Number of Guests</label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                className="w-full bg-neutral-950 border border-amber-500/20 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-amber-500"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                  <option key={num} value={num}>{num} Guests (${num * 50} Deposit)</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-neutral-950 border border-amber-500/20 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-amber-500"
              />
            </div>

            {/* Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Time</label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-neutral-950 border border-amber-500/20 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-amber-500"
              >
                {['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'].map((t) => (
                  <option key={t} value={t}>{t} EST</option>
                ))}
              </select>
            </div>
          </div>

          {/* Seating Location Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Seating Atmosphere</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'Main Dining Hall',
                'Private Wine Cellar Vault',
                "Chef's Counter",
                'Rooftop Terrace'
              ].map((area) => (
                <button
                  type="button"
                  key={area}
                  onClick={() => setFormData({ ...formData, seatingArea: area as any })}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    formData.seatingArea === area
                      ? 'border-amber-500 bg-amber-500/10 text-amber-200 font-semibold'
                      : 'border-neutral-800 bg-neutral-950 text-slate-400 hover:border-neutral-700'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Deposit Summary Box */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-amber-200">Table Guarantee Deposit</div>
              <div className="text-[11px] text-slate-400">$50 deposit per guest, applied directly to final bill.</div>
            </div>
            <div className="font-serif text-xl font-bold text-[#D4AF37]">
              ${totalDeposit} USD
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-600 text-black font-semibold text-xs hover:shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            {loading ? 'Processing & Syncing to Firestore...' : `Confirm Reservation ($${totalDeposit} Deposit)`}
          </button>
        </form>
      )}
    </div>
  );
};
