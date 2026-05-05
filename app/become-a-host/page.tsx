"use client";

import React, { useState } from 'react';
import { ShieldCheck, Zap, Lock, Banknote, ArrowRight, User, Mail, Phone, MapPin } from 'lucide-react';

export default function BecomeAHost() {
  // States για τη Φόρμα Επικοινωνίας
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // States για το Simulator Εσόδων
  const [hourlyRate, setHourlyRate] = useState(1.5);
  const [hoursPerDay, setHoursPerDay] = useState(5);
  const [daysPerMonth, setDaysPerMonth] = useState(20);

  // Υπολογισμός Εσόδων (Εκτίμηση)
  const calculateIncome = () => {
    const totalIncome = hourlyRate * hoursPerDay * daysPerMonth;
    // Προσθέτουμε ένα "range" (π.χ. +/- 10%) για να είναι ρεαλιστικό το simulation
    const minIncome = (totalIncome * 0.9).toFixed(0);
    const maxIncome = (totalIncome * 1.1).toFixed(0);
    return { minIncome, maxIncome };
  };

  const income = calculateIncome();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Εδώ ιδανικά θα καλούσες το δικό σου API route, π.χ. fetch('/api/submit-host', ...)
    // Προς το παρόν βάζουμε ένα fake delay για να δεις το UI
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', address: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Σελίδας */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            Γίνε Host στο <span className="text-[#00E676]">Spotly</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Μετάτρεψε την άδεια θέση στάθμευσής σου σε πηγή παθητικού εισοδήματος. Ασφαλές, εύκολο και με πλήρη έλεγχο στα χέρια σου.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Αριστερή Στήλη: Πληροφορίες & Safety Measures */}
          <div>
            <h2 className="text-3xl font-black mb-8">Γιατί να επιλέξεις το Spotly;</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center shrink-0 border border-white/5">
                  <ShieldCheck className="w-6 h-6 text-[#00E676]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Απόλυτη Ασφάλεια</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Όλοι οι οδηγοί είναι ταυτοποιημένοι με τηλέφωνο, email και στοιχεία οχήματος. Τα οχήματά τους διαθέτουν υποχρεωτική ασφάλιση για κάλυψη ζημιών.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center shrink-0 border border-white/5">
                  <Lock className="w-6 h-6 text-[#00E676]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Smart Πρόσβαση</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Σε κλειστά γκαράζ τοποθετούμε ειδικό μηχανισμό (plug & play) ώστε ο οδηγός να ανοίγει την πόρτα μέσω του app, χωρίς να χρειάζεται να του δώσεις κλειδιά.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center shrink-0 border border-white/5">
                  <Zap className="w-6 h-6 text-[#00E676]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Προστασία Χρόνου</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Αν ο οδηγός αργήσει να πάρει το αυτοκίνητό του, χρεώνεται αυτόματα με πέναλτι (διπλάσια χρέωση για κάθε 30 λεπτά), το οποίο πιστώνεται απευθείας σε εσένα.
                  </p>
                </div>
              </div>
            </div>

            {/* Εργαλείο: Income Simulator */}
            <div className="mt-16 bg-[#121212] p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Banknote className="w-6 h-6 text-[#00E676]" />
                <h3 className="text-2xl font-black">Υπολόγισε τα Κέρδη σου</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-gray-400 font-bold">Τιμή ανά Ώρα (€)</label>
                    <span className="text-white font-bold">{hourlyRate.toFixed(2)}€</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="5" step="0.1" 
                    value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full accent-[#00E676]"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-gray-400 font-bold">Εκτιμώμενες Ώρες Κράτησης / Ημέρα</label>
                    <span className="text-white font-bold">{hoursPerDay} Ώρες</span>
                  </div>
                  <input 
                    type="range" min="1" max="24" step="1" 
                    value={hoursPerDay} onChange={(e) => setHoursPerDay(Number(e.target.value))}
                    className="w-full accent-[#00E676]"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-gray-400 font-bold">Ημέρες Διαθεσιμότητας / Μήνα</label>
                    <span className="text-white font-bold">{daysPerMonth} Ημέρες</span>
                  </div>
                  <input 
                    type="range" min="1" max="30" step="1" 
                    value={daysPerMonth} onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                    className="w-full accent-[#00E676]"
                  />
                </div>
              </div>

              <div className="mt-8 p-6 bg-[#1A1A1A] rounded-2xl text-center border border-[#00E676]/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-[#00E676] opacity-10 blur-2xl rounded-full"></div>
                 <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Εκτιμωμενο Μηνιαιο Εισοδημα</p>
                 <div className="text-4xl font-black text-white">
                   {income.minIncome}€ - {income.maxIncome}€
                 </div>
              </div>
            </div>
          </div>

          {/* Δεξιά Στήλη: Φόρμα Επικοινωνίας */}
          <div className="bg-[#121212] p-8 md:p-10 rounded-3xl border border-white/5 h-fit sticky top-32">
            <h3 className="text-2xl font-black mb-2">Κάνε το πρώτο βήμα</h3>
            <p className="text-gray-400 text-sm mb-8">Συμπλήρωσε τα στοιχεία σου και η ομάδα μας θα επικοινωνήσει μαζί σου για να δούμε αν ο χώρος σου πληροί τις προϋποθέσεις.</p>
            
            {submitStatus === 'success' ? (
              <div className="bg-[#00E676]/10 border border-[#00E676]/30 p-6 rounded-2xl text-center">
                <div className="w-16 h-16 bg-[#00E676] rounded-full flex items-center justify-center mx-auto mb-4">
                   <ShieldCheck className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Ευχαριστούμε!</h4>
                <p className="text-gray-400 text-sm">Λάβαμε τα στοιχεία σου. Ένας εκπρόσωπός μας θα επικοινωνήσει μαζί σου πολύ σύντομα.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2"><User className="w-4 h-4 text-[#00E676]"/> Ονοματεπώνυμο</label>
                  <input 
                    type="text" required
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E676] transition-colors"
                    placeholder="π.χ. Γιάννης Παπαδόπουλος"
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2"><Mail className="w-4 h-4 text-[#00E676]"/> Email</label>
                  <input 
                    type="email" required
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E676] transition-colors"
                    placeholder="το email σου..."
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2"><Phone className="w-4 h-4 text-[#00E676]"/> Τηλέφωνο</label>
                  <input 
                    type="tel" required
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E676] transition-colors"
                    placeholder="π.χ. 6900000000"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2"><MapPin className="w-4 h-4 text-[#00E676]"/> Διεύθυνση Θέσης / Γκαράζ</label>
                  <input 
                    type="text" required
                    value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E676] transition-colors"
                    placeholder="Οδός & Αριθμός (π.χ. Ερμού 10)"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00E676] hover:bg-[#00c968] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-4 shadow-lg shadow-[#00E676]/20"
                >
                  {isSubmitting ? 'Αποστολή...' : <>ΑΠΟΣΤΟΛΗ ΣΤΟΙΧΕΙΩΝ <ArrowRight className="w-5 h-5" /></>}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}