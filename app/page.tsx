"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Car, MapPin, Zap, ShieldCheck, ArrowRight, Smartphone, Key, Navigation, Clock, Star, Wifi, Wallet, CheckCircle2, User, X } from 'lucide-react';

export default function SpotlyLanding() {
  const [email, setEmail] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [hostEarnings, setHostEarnings] = useState(0);
  const [isHoveringPhone, setIsHoveringPhone] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // ΝΕΟ STATE: Για το αναδυόμενο παράθυρο "Coming Soon"
  const [showComingSoon, setShowComingSoon] = useState(false);
  
  // Refs για το Scroll Intersection
  const hostSectionRef = useRef<HTMLElement>(null);

  // Παρακολούθηση Scroll 
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Όταν φτάσει στην ενότητα Host, ξεκινάει το μέτρημα!
      if (hostSectionRef.current) {
        const rect = hostSectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && hostEarnings === 0) {
          animateValue(0, 145.50, 1500, setHostEarnings);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hostEarnings]);

  const animateValue = (start: number, end: number, duration: number, setter: (val: number) => void) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setter(start + easeOutQuart * (end - start));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };

  // 3D Υπολογισμοί: Ομαλό, ανεπαίσθητο κούνημα με βάση το scroll.
  const phoneRotateX = Math.sin(scrollY * 0.003) * 8; 
  const phoneRotateY = Math.cos(scrollY * 0.003) * 8;

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
        // Εδώ στο μέλλον μπορείς να το συνδέσεις με Supabase ή Resend για να σώζεις τα emails
        setIsSubmitted(true);
        setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black overflow-x-hidden relative">
      
      {/* CUSTOM CSS FOR ANIMATIONS & GRID */}
      <style dangerouslySetInnerHTML={{__html: `
        .reveal { opacity: 0; transform: translateY(40px); transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        .scanner { animation: scanline 3s linear infinite; }
        
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .floating { animation: float 6s ease-in-out infinite; }

        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }
        .radar-ring { animation: pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite; }
        .radar-ring:nth-child(2) { animation-delay: 1s; }
        .radar-ring:nth-child(3) { animation-delay: 2s; }

        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: 200%; animation: marquee 25s linear infinite; }

        /* Tech Background Grid */
        .bg-grid {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent);
          -webkit-mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent);
        }
      `}} />

      {/* Αχνό Tech Πλέγμα στο παρασκήνιο */}
      <div className="absolute inset-0 bg-grid z-0 pointer-events-none"></div>

      {/* --- HEADER --- */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#333]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            {/* Λογότυπο Spotly σε στυλ App Icon */}
            <div className="w-10 h-10 rounded-[10px] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_0_15px_rgba(0,230,118,0.3)] group-hover:shadow-[0_0_25px_rgba(0,230,118,0.6)] transition-all duration-300 shrink-0">
              <img 
                src="/logo.png" 
                alt="Spotly App Icon" 
                className="w-full h-full object-cover scale-[1.02]"
              />
            </div>
            <span className="text-2xl font-black tracking-tighter">Spotly<sup className="text-[10px] text-gray-500 font-bold ml-0.5">™</sup></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">Η Εμπειρία</a>
            <a href="#hosts" className="hover:text-white transition-colors">Για Ιδιοκτήτες</a>
            
            {/* Κουμπί που ανοίγει το "Coming Soon" */}
            <button 
              onClick={() => setShowComingSoon(true)}
              className="bg-white/5 text-white px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/10 hover:border-[#00E676]/50 transition-all active:scale-95 shadow-lg"
            >
              Είσοδος στο App
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-16 px-6 relative min-h-[90vh] flex items-center">
        {/* Dynamic Glow */}
        <div 
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[#00E676] opacity-[0.06] blur-[150px] rounded-full pointer-events-none"
          style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.2}px)` }}
        ></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10 w-full">
          
          {/* Left Text */}
          <div className="flex-1 text-center lg:text-left z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00E676]/20 to-transparent border border-[#00E676]/30 text-[#00E676] text-xs font-black tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(0,230,118,0.15)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[#00E676] opacity-20 scanner"></div>
              <Zap className="w-4 h-4 fill-current animate-pulse relative z-10" /> 
              {/* ΣΛΟΓΚΑΝ */}
              <span className="relative z-10">Park Smart. Earn Easy.</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tighter mb-6 drop-shadow-2xl">
              Βρες Πάρκινγκ <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E676] via-emerald-400 to-[#00E676] bg-[length:200%_auto] animate-gradient">
                  Σε 10 Δευτερόλεπτα.
                </span>
                {/* Accent line below text */}
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-[#00E676]/20 blur-sm rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Η πρώτη και μοναδική πλατφόρμα που μετατρέπει τα κλειστά ιδιωτικά γκαράζ σε δικές σου θέσεις στάθμευσης. Κλείσε θέση εκ των προτέρων, άνοιξε την πόρτα με ένα πάτημα στο κινητό σου και ξέχασε το άγχος.
            </p>

            {/* WAITLIST FORM */}
            {!isSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto lg:mx-0 group">
                <div className="relative w-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00E676] to-[#00b35c] rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
                    <input 
                    type="email" 
                    placeholder="Το email σου..." 
                    required
                    className="relative w-full bg-[#121212] border border-[#333] rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#00E676] transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className="w-full sm:w-auto bg-[#00E676] text-black px-8 py-4 rounded-2xl font-black whitespace-nowrap hover:bg-[#00c968] transition-all shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_40px_rgba(0,230,118,0.6)] active:scale-95 flex items-center justify-center gap-2">
                    EARLY ACCESS <ArrowRight className="w-5 h-5" />
                </button>
                </form>
            ) : (
                <div className="bg-[#00E676]/10 border border-[#00E676]/30 p-4 rounded-2xl max-w-md mx-auto lg:mx-0 flex items-center gap-3 animate-fadeIn">
                    <CheckCircle2 className="w-6 h-6 text-[#00E676] shrink-0" />
                    <p className="text-[#00E676] font-bold text-sm">Ευχαριστούμε! Το email σου προστέθηκε στη λίστα προτεραιότητας.</p>
                </div>
            )}
            
            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-8">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#050505] bg-gray-800 flex items-center justify-center text-[10px] font-bold ${i===4 ? 'bg-[#1a1a1a] text-[#00E676] border-[#00E676]/30 z-10' : 'z-0'}`}>
                     {i===4 ? '+2K' : <User className="w-4 h-4 text-gray-500" />}
                   </div>
                 ))}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                 Οδηγοί είναι ήδη στη λίστα
              </div>
            </div>
          </div>

          {/* Right Mockup (3D Smooth Floating App Preview) */}
          <div className="flex-1 w-full max-w-md relative perspective-1000 hidden md:block">
            {/* Radar Pulse Effect πίσω από το κινητό */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#00E676]/30 rounded-full radar-ring"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#00E676]/20 rounded-full radar-ring"></div>
            
            {/* Smooth floating & scroll parallax */}
            <div 
              className="relative mx-auto transition-transform ease-out preserve-3d duration-1000 floating"
              style={{ transform: `rotateX(${phoneRotateX}deg) rotateY(${phoneRotateY}deg)` }}
            >
              
              <div className="border-gray-800 bg-[#0a0a0a] border-[12px] rounded-[3rem] h-[650px] w-[320px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-white/10 relative">
                <div className="absolute top-0 inset-x-0 h-6 bg-[#0a0a0a] rounded-b-[1.5rem] w-32 mx-auto z-50"></div>

                <div className="w-full h-full bg-[#121212] relative flex flex-col pt-12 px-4">
                  <div className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#00E676]/20 border-b border-[#00E676]/50 scanner z-40 pointer-events-none"></div>

                  {/* UI: Map Area */}
                  <div className="w-full h-[280px] bg-[#1A1A1A] rounded-[24px] mb-4 relative overflow-hidden border border-[#222]">
                     <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#00E676]/20 rounded-full blur-2xl animate-pulse"></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00E676] text-black font-black px-4 py-2 rounded-full text-sm flex items-center gap-1.5 shadow-[0_10px_20px_rgba(0,230,118,0.4)] transform hover:scale-110 transition-transform cursor-pointer">
                       <Car className="w-4 h-4"/> 1.50€/30'
                     </div>
                     <div className="absolute bottom-10 left-10 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                  </div>
                  
                  {/* UI: Booking Sheet */}
                  <div className="bg-[#161616]/95 backdrop-blur-2xl rounded-[32px] border border-white/10 flex-1 p-5 shadow-2xl relative z-30 flex flex-col mb-4">
                    <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-5"></div>
                    
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 bg-[#2c2c2c] rounded-2xl flex items-center justify-center border border-white/5 shadow-inner shrink-0">
                        <Car className="w-6 h-6 text-[#00E676]/60" />
                      </div>
                      <div className="flex-1 min-w-0 pr-2 pt-0.5">
                        <h3 className="text-white font-black text-lg leading-tight flex items-center gap-1.5 truncate">
                          Γκαράζ Συντάγματος <ShieldCheck className="w-3.5 h-3.5 text-[#00E676] shrink-0" />
                        </h3>
                        <p className="text-[#888] text-[10px] mt-1 flex items-center gap-1 font-medium">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" /> 5.0 • Αθήνα
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[20px] mb-5 overflow-hidden shrink-0">
                      <div className="bg-[#1A1A1A] p-3 flex flex-col gap-0.5">
                        <span className="text-gray-500 text-[8px] font-black uppercase tracking-widest">Τιμη / Ωρα</span>
                        <span className="text-white text-lg font-black">1.50<span className="text-[#00E676] ml-0.5">€</span></span>
                      </div>
                      <div className="bg-[#1A1A1A] p-3 flex flex-col gap-0.5 items-end text-right">
                        <span className="text-gray-500 text-[8px] font-black uppercase tracking-widest">Χρονος</span>
                        <span className="text-white text-lg font-black">3 min</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      {/* Κουμπί που ανοίγει το Coming Soon Modal */}
                      <button 
                        onClick={() => setShowComingSoon(true)}
                        className="w-full bg-[#00E676] text-black py-4 rounded-2xl font-black flex justify-between items-center px-5 shadow-[0_10px_20px_rgba(0,230,118,0.25)]"
                      >
                        <span className="tracking-tight uppercase text-sm">Κρατηση Τωρα</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Widgets */}
              <div 
                className="absolute -right-8 md:-right-16 top-20 bg-[#161616]/95 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-[100]"
                style={{ transform: `translateZ(60px) translateY(${scrollY * -0.1}px)` }}
              >
                <div className="w-10 h-10 bg-[#00E676]/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,230,118,0.2)]">
                  <ShieldCheck className="w-5 h-5 text-[#00E676]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm whitespace-nowrap">Ασφαλής Κράτηση</p>
                  <p className="text-gray-400 text-xs">Verified by Stripe</p>
                </div>
              </div>

              <div 
                className="absolute -left-12 md:-left-24 bottom-32 bg-[#161616]/95 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[100]"
                style={{ transform: `translateZ(80px) translateY(${scrollY * -0.05}px)` }}
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <Key className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm whitespace-nowrap">Smart Entry</p>
                  <p className="text-gray-400 text-xs whitespace-nowrap">Άνοιγμα από το App</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- INFINITE TICKER (MARQUEE) --- */}
      <div className="w-full bg-[#00E676] py-3 border-y border-[#00b35c] overflow-hidden relative z-20 shadow-[0_0_30px_rgba(0,230,118,0.2)]">
        <div className="animate-marquee whitespace-nowrap flex items-center">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="flex items-center text-black font-black text-sm tracking-widest uppercase shrink-0">
                <span className="mx-6">Live Parking Map</span>
                <Star className="w-4 h-4 fill-current mx-2" />
                <span className="mx-6">Zero Stress</span>
                <Star className="w-4 h-4 fill-current mx-2" />
                <span className="mx-6">Smart Garage Entry</span>
                <Star className="w-4 h-4 fill-current mx-2" />
                <span className="mx-6">Guaranteed Payouts</span>
                <Star className="w-4 h-4 fill-current mx-2" />
             </div>
           ))}
        </div>
      </div>

      {/* --- SCROLL REVEAL FEATURES --- */}
      <section id="how-it-works" className="py-32 relative bg-gradient-to-b from-[#050505] to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20" style={{ transform: `translateY(${Math.max(0, 100 - scrollY * 0.2)}px)`, opacity: Math.min(1, scrollY / 300) }}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Η Μαγεία της Απλότητας</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Τρεις κινήσεις. Μηδέν άγχος. Ο χρόνος σου είναι πολύτιμος για να τον ξοδεύεις ψάχνοντας.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#121212] p-8 rounded-[32px] border border-white/5 hover:border-[#00E676]/40 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,230,118,0.05)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#00E676]/20 transition-all duration-500 border border-white/5 relative z-10">
                <MapPin className="w-8 h-8 text-white group-hover:text-[#00E676] transition-colors" />
              </div>
              <h3 className="text-xl font-black mb-3 relative z-10">1. Εντόπισε</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">Ο real-time χάρτης σου δείχνει μόνο τις θέσεις που είναι πραγματικά άδειες αυτή τη στιγμή, δίπλα στον προορισμό σου.</p>
            </div>
            
            <div className="bg-[#121212] p-8 rounded-[32px] border border-white/5 hover:border-[#00E676]/40 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,230,118,0.05)] relative overflow-hidden mt-8 md:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#00E676]/20 transition-all duration-500 border border-white/5 relative z-10">
                <Clock className="w-8 h-8 text-white group-hover:text-[#00E676] transition-colors" />
              </div>
              <h3 className="text-xl font-black mb-3 relative z-10">2. Κλείσε</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">Επίλεξε τον χρόνο που χρειάζεσαι. Το Spotly ελέγχει αυτόματα αν η θέση θα μείνει ελεύθερη πριν επιστρέψει ο ιδιοκτήτης.</p>
            </div>

            <div className="bg-[#121212] p-8 rounded-[32px] border border-white/5 hover:border-[#00E676]/40 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,230,118,0.05)] relative overflow-hidden mt-16 md:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#00E676]/20 transition-all duration-500 border border-white/5 relative z-10">
                <Car className="w-8 h-8 text-white group-hover:text-[#00E676] transition-colors" />
              </div>
              <h3 className="text-xl font-black mb-3 relative z-10">3. Πάρκαρε</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">
                Το GPS σε οδηγεί εκεί. Δες τον κωδικό PIN, ή <b className="text-white group-hover:text-[#00E676] transition-colors">άνοιξε την γκαραζόπορτα με ένα πάτημα</b> από το app, και πάρκαρε.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOST SECTION --- */}
      <section id="hosts" ref={hostSectionRef} className="py-32 bg-black border-t border-[#222] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#00E676]/5 blur-[200px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center gap-20">
            
            <div className="flex-1 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-6">
                <Star className="w-3 h-3 text-yellow-500 fill-current" /> Γίνε Host
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
                Το άδειο σου πάρκινγκ,<br/>
                <span className="text-[#00E676]">η νέα σου επιχείρηση.</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
                Νοίκιασε τη θέση σου με <b>Αυτόματο Πιλότο</b> όσο λείπεις στη δουλειά. Η ενσωμάτωση γίνεται σε 5 λεπτά και τα κέρδη μπαίνουν αυτόματα στο ΙΒΑΝ σου.
              </p>
              
              <ul className="space-y-8 mb-12">
                <li className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-[#333] group-hover:border-[#00E676]/50 flex items-center justify-center shrink-0 shadow-lg transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#00E676] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <Wifi className="w-6 h-6 text-[#00E676] relative z-10 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-1">Plug & Play Εγκατάσταση</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Από ανοιχτές πιλοτές μέχρι ηλεκτρικές γκαραζόπορτες. Συνδέεται με το App μέσω απλού εξοπλισμού <b>των 15€</b>. Το στήνεις σε 5 λεπτά!
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-[#333] group-hover:border-[#00E676]/50 flex items-center justify-center shrink-0 shadow-lg transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#00E676] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <Smartphone className="w-6 h-6 text-[#00E676] relative z-10 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-1">Smart Schedule</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Όρισε τις ώρες που λείπεις (π.χ. Δευ-Παρ, 08:00 - 17:00). Το Spotly ανοιγοκλείνει τη διαθεσιμότητα αυτόματα, χωρίς να ασχολείσαι καθόλου.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-[#333] group-hover:border-[#00E676]/50 flex items-center justify-center shrink-0 shadow-lg transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#00E676] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <Wallet className="w-6 h-6 text-[#00E676] relative z-10 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-1">Εγγυημένες Πληρωμές</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      100% ψηφιακές συναλλαγές. Τα χρήματά σου μπαίνουν με ασφάλεια κατευθείαν στον τραπεζικό σου λογαριασμό μέσω της <b>Stripe</b>.
                    </p>
                  </div>
                </li>
              </ul>

              <button 
                onClick={() => setShowComingSoon(true)}
                className="inline-flex bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-2xl font-black items-center gap-3 transition-transform active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                ΞΕΚΙΝΑ ΝΑ ΚΕΡΔΙΖΕΙΣ <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 w-full max-w-md relative mt-16 lg:mt-0">
               <div className="absolute -left-10 top-20 w-32 h-[1px] bg-gradient-to-r from-transparent to-[#00E676]"></div>
               <div className="absolute -right-10 bottom-40 w-32 h-[1px] bg-gradient-to-l from-transparent to-[#00E676]"></div>

               <div className="bg-[#121212] border border-white/10 rounded-[40px] p-8 shadow-[0_0_80px_rgba(0,230,118,0.15)] relative overflow-hidden group hover:border-[#00E676]/30 transition-colors duration-500">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#00E676] opacity-10 rounded-full blur-3xl transition-opacity group-hover:opacity-20"></div>
                  
                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <span className="text-white font-bold tracking-tight text-xl">Το Ταμείο μου</span>
                    <span className="text-[#00E676] bg-[#00E676]/10 border border-[#00E676]/20 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse"></span> Live
                    </span>
                  </div>
                  
                  <div className="mb-10 relative z-10">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">ΣΥΝΟΛΙΚΑ ΚΕΡΔΗ</p>
                    <div className="text-6xl font-black text-white tracking-tighter flex items-baseline">
                      {hostEarnings.toFixed(2)}<span className="text-[#00E676] ml-2 text-4xl">€</span>
                    </div>
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div className="p-4 bg-[#1A1A1A] rounded-2xl border border-white/5 flex items-center justify-between hover:border-[#00E676]/30 transition-colors">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-[#222] rounded-xl flex items-center justify-center"><Car className="w-5 h-5 text-gray-400" /></div>
                         <div>
                           <p className="text-white font-bold text-sm">Κράτηση (Audi A3)</p>
                           <p className="text-gray-500 text-[11px] font-medium">Σήμερα, 14:30</p>
                         </div>
                       </div>
                       <span className="text-[#00E676] font-black text-lg">+€8.50</span>
                    </div>
                    
                    <div className="p-4 bg-[#1A1A1A] rounded-2xl border border-white/5 flex items-center justify-between opacity-70">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-[#222] rounded-xl flex items-center justify-center"><Car className="w-5 h-5 text-gray-500" /></div>
                         <div>
                           <p className="text-white font-bold text-sm">Κράτηση (Toyota)</p>
                           <p className="text-gray-500 text-[11px] font-medium">Χθες, 09:15</p>
                         </div>
                       </div>
                       <span className="text-white font-black text-lg">+€12.00</span>
                    </div>
                  </div>

                  <button className="w-full mt-8 bg-white/5 border border-white/10 text-white font-bold py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-white/10 transition-colors group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-default">
                    Ανάληψη στην Τράπεζα
                  </button>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-[#222] py-16 bg-[#050505] text-center relative overflow-hidden">
        {/* Αχνό Grid στο Footer */}
        <div className="absolute inset-0 bg-grid z-0 opacity-30 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center mb-8">
           {/* Λογότυπο Spotly σε στυλ App Icon στο Footer */}
           <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_0_20px_rgba(0,230,118,0.3)] mb-4">
             <img 
               src="/logo.png" 
               alt="Spotly App Icon" 
               className="w-full h-full object-cover scale-[1.02]"
             />
           </div>
           <span className="font-black tracking-tighter text-3xl text-white">Spotly<sup className="text-sm text-gray-500 font-bold ml-1">™</sup></span>
           
           {/* ΣΛΟΓΚΑΝ ΣΤΟ FOOTER */}
           <span className="text-[#00E676] text-[10px] font-bold uppercase tracking-[0.25em] mt-2">Park Smart. Earn Easy.</span>
        </div>
        <p className="relative z-10 text-gray-500 text-sm max-w-md mx-auto mb-8 font-medium px-4 mt-4">
          Η στάθμευση δεν χρειάζεται να είναι πρόβλημα. Ελάτε στην κοινότητα του Spotly και ανακαλύψτε τον έξυπνο τρόπο.
        </p>
        <p className="relative z-10 text-[#444] text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3 h-3" /> SECURED BY STRIPE • © {new Date().getFullYear()} SPOTLY. ALL RIGHTS RESERVED.
        </p>
      </footer>

      {/* =========================================================
          COMING SOON MODAL (Αναδυόμενο Παράθυρο)
      ========================================================= */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-6 animate-fadeIn" onClick={() => setShowComingSoon(false)}>
          <div className="bg-[#161616]/95 backdrop-blur-2xl border border-[#00E676]/30 rounded-[40px] max-w-md w-full p-10 relative shadow-[0_20px_60px_rgba(0,230,118,0.2)] text-center animate-slideUp" onClick={e => e.stopPropagation()}>
            
            <button onClick={() => setShowComingSoon(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-full transition-all z-10">
              <X className="w-5 h-5" />
            </button>

            {/* Logo με Floating & Pulse Animations & App Icon styling */}
            <div className="relative w-28 h-28 mx-auto mb-8 animate-float">
              <div className="absolute inset-0 bg-[#00E676] opacity-20 blur-[30px] rounded-full animate-pulse"></div>
              <div className="relative z-10 w-full h-full rounded-[28px] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_0_30px_rgba(0,230,118,0.4)]">
                <img 
                  src="/logo.png" 
                  alt="Spotly App Icon" 
                  className="w-full h-full object-cover scale-[1.02]"
                />
              </div>
            </div>

            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Ερχόμαστε Σύντομα!</h3>
            <p className="text-[#00E676] text-xs font-bold uppercase tracking-[0.2em] mb-6">Park Smart. Earn Easy.</p>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Η ομάδα του Spotly εργάζεται πυρετωδώς για να φέρει την επανάσταση στο παρκάρισμα. Αφήστε το email σας για να ειδοποιηθείτε πρώτοι μόλις κυκλοφορήσει η εφαρμογή.
            </p>

            <button 
              onClick={() => {
                setShowComingSoon(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full bg-[#00E676] hover:bg-[#00c968] text-black font-black py-4 rounded-2xl transition-all shadow-[0_10px_20px_rgba(0,230,118,0.3)] active:scale-95"
            >
              Επιστροφή
            </button>
          </div>
        </div>
      )}

    </div>
  );
}