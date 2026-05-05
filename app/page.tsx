"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Car, MapPin, Zap, ShieldCheck, ArrowRight, Smartphone, Key, Navigation, Clock, Star, Wifi, Wallet, CheckCircle2, User, X, Loader2, Calendar, ChevronDown, Mail, Phone, ChevronUp } from 'lucide-react';

// ============================================================================
// COMPONENTS (FAQ)
// ============================================================================

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border border-white/5 rounded-2xl bg-[#121212] overflow-hidden transition-all duration-300 hover:border-[#00E676]/30">
      <button
        className="w-full px-6 py-5 flex justify-between items-center focus:outline-none group"
        onClick={onClick}
      >
        <span className="font-medium text-left text-white text-lg group-hover:text-[#00E676] transition-colors">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-[#00E676] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5 text-gray-400 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // Η πρώτη ερώτηση είναι ανοιχτή by default

  const faqs = [
    {
      question: "Τι ακριβώς είναι το Spotly;",
      answer: "Το Spotly είναι η πρώτη πλατφόρμα στην Ελλάδα που μετατρέπει ιδιωτικά γκαράζ σε άμεσα προσβάσιμες θέσεις στάθμευσης. Μέσω της εφαρμογής, μπορείς να βρεις, να κλείσεις και να ανοίξεις την πόρτα του γκαράζ απευθείας από το κινητό σου, χωρίς να ψάχνεις."
    },
    {
      question: "Πώς λειτουργεί για τους ιδιοκτήτες (Hosts);",
      answer: "Αν έχεις άδεια θέση ή γκαράζ, τοποθετούμε έναν απλό μηχανισμό (plug & play) στην πόρτα σου με ελάχιστο κόστος. Εσύ ορίζεις το πρόγραμμά σου (π.χ. όταν λείπεις στη δουλειά) και η θέση ενοικιάζεται αυτόματα, αποφέροντάς σου εγγυημένο παθητικό εισόδημα μέσω Stripe."
    },
    {
      question: "Τι γίνεται αν ο οδηγός κάνει ζημιά στην περιουσία μου;",
      answer: "Η ασφάλεια της περιουσίας σας είναι η απόλυτη προτεραιότητά μας. Κάθε οδηγός που χρησιμοποιεί το Spotly είναι ταυτοποιημένος και το όχημά του διαθέτει υποχρεωτικά ενεργό ασφαλιστήριο συμβόλαιο, το οποίο καλύπτει τυχόν υλικές ζημιές προς τρίτους. Παράλληλα, το Spotly βρίσκεται σε διαδικασία ενσωμάτωσης δικής του επιπλέον ασφαλιστικής κάλυψης, ώστε να σας προσφέρει τη μέγιστη δυνατή σιγουριά. Σε κάθε περίπτωση, η ομάδα υποστήριξής μας είναι δίπλα σας."
    },
    {
      question: "Πώς ξέρω ότι ο άνθρωπος που θα παρκάρει είναι αξιόπιστος;",
      answer: "Χτίζουμε μια κοινότητα εμπιστοσύνης. Για να κάνει κράτηση ένας οδηγός στο Spotly, απαιτείται πρώτα η εγγραφή και ταυτοποίησή του. Καταχωρεί υποχρεωτικά το email και το τηλέφωνό του, καθώς και όλα τα στοιχεία του οχήματός του (πινακίδα, χρώμα, μοντέλο και μάρκα). Επιπλέον, μετά από κάθε στάθμευση λειτουργεί σύστημα αξιολόγησης."
    },
    {
      question: "Τι συμβαίνει αν ο οδηγός δεν πάρει το αυτοκίνητό του όταν λήξει ο χρόνος του;",
      answer: "Προστατεύουμε αυστηρά τον χρόνο και τον χώρο σας. Σε περίπτωση που ο οδηγός υπερβεί τον συμφωνημένο χρόνο στάθμευσης, του επιβάλλεται αυτόματα πέναλτι. Συγκεκριμένα, χρεώνεται με το διπλάσιο της αρχικής τιμής για κάθε 30 λεπτά καθυστέρησης, και το ποσό αυτό πιστώνεται σε εσάς ως αποζημίωση."
    },
    {
      question: "Η θέση μου είναι σε κλειστό γκαράζ. Μπορώ να την καταχωρήσω στο Spotly;",
      answer: "Φυσικά! Το Spotly υποστηρίζει κάθε τύπο θέσης στάθμευσης, συμπεριλαμβανομένων και των κλειστών γκαράζ. Κατά τη δημιουργία του προφίλ της θέσης σας, μπορείτε να προσθέσετε συγκεκριμένες οδηγίες προς τους οδηγούς για τον τρόπο πρόσβασης στον χώρο, ώστε η διαδικασία να είναι ομαλή και ασφαλής."
    },
    {
      question: "Μπορώ να χρησιμοποιώ κι εγώ τη θέση μου ή δεσμεύεται 24/7 στο Spotly;",
      answer: "Εσείς έχετε τον απόλυτο έλεγχο! Μέσα από το προφίλ σας στο Spotly, ορίζετε το δικό σας ημερολόγιο διαθεσιμότητας. Αν χρειάζεστε τη θέση σας συγκεκριμένες μέρες ή ώρες, απλά την 'κλείνετε' στο σύστημα. Τις υπόλοιπες ώρες, η θέση σας παραμένει ανοιχτή για να σας αποφέρει παθητικό εισόδημα."
    },
    {
      question: "Τι γίνεται αν ένας οδηγός κλείσει τη θέση και την ακυρώσει τελευταία στιγμή;",
      answer: "Για να διασφαλίσουμε τα έσοδά σας, οι οδηγοί έχουν δικαίωμα δωρεάν ακύρωσης μόνο μέσα στα πρώτα 10 λεπτά από τη στιγμή της κράτησης. Μετά τα 10 λεπτά, η ακύρωση δεν είναι εφικτή. Ωστόσο, αν ένας οδηγός κλείσει π.χ. για 2 ώρες και αποχωρήσει στη 1 ώρα, η κράτηση τερματίζεται, του επιστρέφεται το υπόλοιπο στο Spotly Wallet του, και η θέση σας απελευθερώνεται άμεσα για τον επόμενο πελάτη."
    },
    {
      question: "Υπάρχει κάποιο νομικό ζήτημα με την ενοικίαση της θέσης μου; Πώς δηλώνω τα έσοδα;",
      answer: "Η βραχυχρόνια ενοικίαση ιδιωτικού χώρου στάθμευσης λειτουργεί νόμιμα στα πρότυπα της οικονομίας διαμοιρασμού (sharing economy). Το Spotly σας παρέχει ένα ξεκάθαρο και πλήρες ιστορικό των συναλλαγών σας. Έτσι, μπορείτε εύκολα να συμβουλευτείτε τον λογιστή σας για την απλή και ορθή δήλωση των εσόδων σας."
    },
    {
      question: "Πώς μπορώ να κλείσω ένα ραντεβού (Let's Talk);",
      answer: "Πολύ απλά! Πατώντας το κουμπί 'Ας Μιλήσουμε' στο πάνω μέρος της σελίδας, θα μεταφερθείτε στο περιβάλλον του Workspace μας για να διαλέξετε την ημέρα και ώρα που σας εξυπηρετεί για ένα απευθείας video call μαζί μας."
    },
    {
      question: "Πότε θα κυκλοφορήσει επίσημα η εφαρμογή;",
      answer: "Αυτή τη στιγμή βρισκόμαστε σε φάση κλειστής δοκιμής (Beta). Συμπληρώνοντας το email σας στην αρχική οθόνη (Early Access), θα είστε από τους πρώτους που θα αποκτήσουν πρόσβαση και αποκλειστικά προνόμια κατά το λανσάρισμα."
    }
  ];

  return (
    <section id="faq" className="py-32 relative bg-[#050505] border-t border-[#111]">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3 h-3 text-[#00E676]" /> Υποστήριξη
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Συχνές <span className="text-[#00E676]">Ερωτήσεις</span>
          </h2>
          <p className="text-gray-400 text-lg">Λύστε όλες σας τις απορίες σχετικά με τη νέα εποχή του parking.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
        
        {/* Extra CTA Card */}
        <div className="mt-12 text-center bg-[#121212] border border-[#222] rounded-[32px] p-8 shadow-xl">
          <h3 className="text-xl font-black text-white mb-2">Έχετε ακόμα απορίες;</h3>
          <p className="text-gray-400 mb-6 text-sm">Είμαστε εδώ για να συζητήσουμε οποιαδήποτε συνεργασία ή τεχνική απορία.</p>
          <a 
            href="https://calendar.app.google/iM86XzZGJZchYixo9" // Βάλε εδώ το ίδιο link που έβαλες στο κουμπί του μενού
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-[#00E676] hover:text-[#00c968] font-black text-sm uppercase tracking-widest transition-colors"
          >
            Ας Μιλησουμε <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// COMPONENT: NEON GLOWING BACKGROUND PATH
// ============================================================================
const NeonBackgroundLine = () => (
  <div className="absolute top-0 left-0 w-full h-[180vh] pointer-events-none z-0 overflow-hidden opacity-80">
    <svg viewBox="0 0 1440 1200" className="absolute top-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* Το Gradient της γραμμής */}
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E676" stopOpacity="0" />
          <stop offset="20%" stopColor="#00E676" stopOpacity="1" />
          <stop offset="80%" stopColor="#00b35c" stopOpacity="1" />
          <stop offset="100%" stopColor="#00E676" stopOpacity="0" />
        </linearGradient>
        {/* Το εφέ λάμψης (Glow) */}
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* 1. Η Διακεκομμένη Γραμμή (Οδηγός/Ράγα) πίσω-πίσω */}
      <path 
        d="M-100,200 C300,300 400,700 800,600 C1200,500 1300,1000 1600,900" 
        fill="none" 
        stroke="rgba(255, 255, 255, 0.05)" 
        strokeWidth="2" 
        strokeDasharray="8 12" 
      />
      
      {/* 2. Η Neon Ενέργεια που τρέχει πάνω στη ράγα */}
      <path 
        className="neon-path-animated" 
        d="M-100,200 C300,300 400,700 800,600 C1200,500 1300,1000 1600,900" 
        fill="none" 
        stroke="url(#neonGradient)" 
        strokeWidth="3" 
        filter="url(#neonGlow)" 
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export default function SpotlyLanding() {
  const [email, setEmail] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [hostEarnings, setHostEarnings] = useState(0);
  const [isHoveringPhone, setIsHoveringPhone] = useState(false);
  
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

  // ΝΕΟ: Επαγγελματικό Scroll Reveal Animation Engine
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Ενεργοποιείται όταν το 15% του στοιχείου μπει στην οθόνη
    };

    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Το κάνει animate μόνο την πρώτη φορά
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // ΝΕΟ: PREMIUM EXPERIENCE ENGINE (Mouse Spotlight & 3D Tilt)
  useEffect(() => {
    // Μην τρέχεις τα βαριά εφέ αν η οθόνη είναι κινητό (< 1024px)
    if (window.innerWidth < 1024) return;
    // 1. Mouse Spotlight (Glow Tracking)
    const cards = document.querySelectorAll<HTMLDivElement>('.spotlight-card');
    
    const handleMouseMoveCard = (e: MouseEvent, card: HTMLDivElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => handleMouseMoveCard(e, card));
    });

    // 2. Interactive 3D Mockup (Magnetic Phone)
    const mockupContainer = document.querySelector<HTMLDivElement>('.perspective-1000');
    const mockup = document.querySelector<HTMLDivElement>('.magnetic-mockup');

    const handleMouseMoveMockup = (e: MouseEvent) => {
      if (!mockupContainer || !mockup) return;
      
      const rect = mockupContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalized mouse position (-1 to 1)
      const mouseX = (e.clientX - centerX) / (rect.width / 2);
      const mouseY = (e.clientY - centerY) / (rect.height / 2);
      
      // Calculate rotation (max 15 degrees)
      const rotateX = mouseY * -15; 
      const rotateY = mouseX * 15;

      mockup.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeaveMockup = () => {
      if (!mockup) return;
      // Smooth reset with CSS transition
      mockup.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    mockupContainer?.addEventListener('mousemove', handleMouseMoveMockup);
    mockupContainer?.addEventListener('mouseleave', handleMouseLeaveMockup);

    // Clean up
    return () => {
      cards.forEach(card => card.removeEventListener('mousemove', (e) => handleMouseMoveCard(e, card)));
      mockupContainer?.removeEventListener('mousemove', handleMouseMoveMockup);
      mockupContainer?.removeEventListener('mouseleave', handleMouseLeaveMockup);
    };
  }, []);

  // Logic για το Back to Top κουμπί
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Εμφανίζεται αφού ο χρήστης σκρολάρει 600px
      if (window.scrollY > 600) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // ΝΕΟ STATE ΓΙΑ ΤΗΝ ΚΑΤΑΣΤΑΣΗ ΑΠΟΣΤΟΛΗΣ
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Η ΣΥΝΑΡΤΗΣΗ ΠΟΥ ΚΑΛΕΙ ΤΟ API ΜΑΣ
  const handleEarlyAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail(''); // Καθαρίζουμε το πεδίο
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  // 3D Υπολογισμοί: Ομαλό, ανεπαίσθητο κούνημα με βάση το scroll.
  const phoneRotateX = Math.sin(scrollY * 0.003) * 8; 
  const phoneRotateY = Math.cos(scrollY * 0.003) * 8;

  


  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black overflow-x-hidden relative">
      
      {/* CUSTOM CSS FOR ANIMATIONS & GRID */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Premium Experience Styles */
        .spotlight-card {
          position: relative;
        }
        .spotlight-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(400px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(0, 230, 118, 0.08), transparent 40%);
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
          pointer-events: none;
        }
        .spotlight-card:hover::before {
          opacity: 1;
        }

        .magnetic-mockup {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); /* Very responsive */
          will-change: transform;
        }

        /* Premium Scroll Reveals */
        .reveal, .reveal-left, .reveal-right, .reveal-scale {
          opacity: 0;
          will-change: transform, opacity;
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal { transform: translateY(50px); }
        .reveal-left { transform: translateX(-50px); }
        .reveal-right { transform: translateX(50px); }
        .reveal-scale { transform: translateY(30px) scale(0.9); }

        .reveal.visible, .reveal-left.visible, .reveal-right.visible, .reveal-scale.visible {
          opacity: 1;
          transform: translate(0) scale(1);
        }

        /* Delays */
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }

        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        .scanner { animation: scanline 3s linear infinite; }
        
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: 200%; animation: marquee 25s linear infinite; }

        .bg-grid {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent);
          -webkit-mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent);
        }
        /* --- NΕΟ: Neon Path Animation --- */
        @keyframes drawNeon {
          0% { stroke-dashoffset: 3000; }
          100% { stroke-dashoffset: 0; }
        }
        .neon-path-animated {
          stroke-dasharray: 3000;
          stroke-dashoffset: 3000;
          animation: drawNeon 8s linear infinite;
        }
        .bg-grid-fade {
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }
      `}} />

      {/* Αχνό Tech Πλέγμα στο παρασκήνιο */}
      <div className="absolute inset-0 bg-grid z-0 pointer-events-none"></div>

      {/* Εμφάνιση μόνο σε μεγάλες οθόνες (lg) για αποφυγή lag */}
      <div className="hidden lg:block">
        <NeonBackgroundLine />
      </div>

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
            
            {/* ΝΕΟ: Κουμπί Let's Talk */}
            <a 
              href="https://calendar.app.google/MWcpcvhhjxUb7RmP6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-[#00E676] to-[#00b35c] text-black px-5 py-2.5 rounded-full font-black text-sm hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" /> Ας Μιλήσουμε
            </a>

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

      {/* --- HERO SECTION --- Responsive Padding */}
      <section className="pt-24 sm:pt-32 pb-16 px-6 relative min-h-[90vh] flex items-center">
        {/* Dynamic Glow */}
        <div 
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[#00E676] opacity-[0.06] blur-[150px] rounded-full pointer-events-none"
          style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.2}px)` }}
        ></div>

        {/* Container - Reduced gap on mobile */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10 w-full">
          
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

            {/* ΝΕΑ ΦΟΡΜΑ ΠΟΥ ΚΑΛΕΙ ΤΗΝ API */}
            <form onSubmit={handleEarlyAccessSubmit} className="flex flex-col gap-2 max-w-md mx-auto lg:mx-0 group">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <div className="relative w-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00E676] to-[#00b35c] rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
                  <input 
                    type="email" 
                    required
                    disabled={status === 'loading' || status === 'success'}
                    placeholder="Το email σου..." 
                    className="relative w-full bg-[#121212] border border-[#333] rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#00E676] transition-colors disabled:opacity-50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full sm:w-auto bg-[#00E676] text-black px-8 py-4 rounded-2xl font-black whitespace-nowrap hover:bg-[#00c968] transition-all shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_40px_rgba(0,230,118,0.6)] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>EARLY ACCESS <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </div>

              {/* --- ΝΕΟ PREMIUM ΜΗΝΥΜΑ ΕΠΙΤΥΧΙΑΣ (GLASSMORPHISM) --- */}
              <div className="mt-5 h-16 w-full flex justify-center lg:justify-start">
                {status === 'success' && (
                  <div className="inline-flex items-center gap-4 bg-[#1A1A1A]/80 backdrop-blur-md border border-[#00E676]/30 p-3 pr-6 rounded-2xl shadow-[0_10px_30px_rgba(0,230,118,0.15)] animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                      {/* Κύκλος που πάλλεται από πίσω (Ping Effect) */}
                      <div className="absolute inset-0 bg-[#00E676] opacity-20 rounded-full animate-ping"></div>
                      
                      {/* Κεντρικό Icon με Λάμψη */}
                      <div className="w-8 h-8 bg-gradient-to-tr from-[#00E676] to-[#00b35c] rounded-full flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(0,230,118,0.5)]">
                        <CheckCircle2 className="w-5 h-5 text-black" />
                      </div>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-white font-black text-sm tracking-tight">Η θέση σου κατοχυρώθηκε! 🚀</span>
                      <span className="text-[#00E676] text-[10px] font-bold uppercase tracking-widest mt-0.5">Ελεγξε τα εισερχομενα σου</span>
                    </div>
                  </div>
                )}
                
                {/* ΝΕΟ ΜΗΝΥΜΑ ΣΦΑΛΜΑΤΟΣ */}
                {status === 'error' && (
                  <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/20 py-2 px-4 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <X className="w-4 h-4 text-red-500" />
                    <span className="text-red-500 text-sm font-bold">Κάτι πήγε στραβά. Ξαναδοκίμασε.</span>
                  </div>
                )}
              </div>

            </form>
            
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

          {/* Right Mockup (Interactive 3D Perspective) - Responsive */}
          <div className="flex-1 w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px] relative perspective-1000 mt-12 lg:mt-0 mx-auto lg:mx-0 z-20">
            {/* Radar Pulse Effect πίσω από το κινητό - Προσαρμοσμένο μέγεθος */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 border border-[#00E676]/30 rounded-full radar-ring"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 border border-[#00E676]/20 rounded-full radar-ring"></div>
            
            {/* ΝΕΟ: Interactive magnetic effect (X-Y Tilt) - Responsive μέγεθος */}
            <div className="magnetic-mockup relative mx-auto preserve-3d floating transition-transform duration-200 ease-out will-change-transform">
              
              {/* Το Κινητό (App Preview) - Responsive Ύψος */}
              <div className="border-gray-800 bg-[#0a0a0a] border-[8px] sm:border-[12px] rounded-[2rem] sm:rounded-[3rem] h-[500px] sm:h-[600px] md:h-[650px] w-full shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-white/10 relative mx-auto">
                <div className="absolute top-0 inset-x-0 h-4 sm:h-6 bg-[#0a0a0a] rounded-b-[1rem] sm:rounded-b-[1.5rem] w-24 sm:w-32 mx-auto z-50"></div>

                <div className="w-full h-full bg-[#121212] relative flex flex-col pt-8 sm:pt-12 px-3 sm:px-4">
                  <div className="absolute left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-transparent to-[#00E676]/20 border-b border-[#00E676]/50 scanner z-40 pointer-events-none"></div>

                  {/* UI: Map Area - Responsive Ύψος */}
                  <div className="w-full h-[200px] sm:h-[280px] bg-[#1A1A1A] rounded-[20px] sm:rounded-[24px] mb-3 sm:mb-4 relative overflow-hidden border border-[#222]">
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 bg-[#00E676]/20 rounded-full blur-2xl animate-pulse"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00E676] text-black font-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 shadow-[0_10px_20px_rgba(0,230,118,0.4)] transform hover:scale-110 transition-transform cursor-pointer">
                        <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4"/> 1.50€/30'
                      </div>
                      <div className="absolute bottom-8 left-8 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                  </div>
                  
                  {/* UI: Booking Sheet - Responsive Padding & Text */}
                  <div className="bg-[#161616]/95 backdrop-blur-2xl rounded-[28px] sm:rounded-[32px] border border-white/10 flex-1 p-4 sm:p-5 shadow-2xl relative z-30 flex flex-col mb-3 sm:mb-4 min-h-0">
                    <div className="w-10 h-1 sm:w-12 sm:h-1.5 bg-white/20 rounded-full mx-auto mb-4 sm:mb-5 shrink-0"></div>
                    
                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5 min-h-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2c2c2c] rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/5 shadow-inner shrink-0">
                        <Car className="w-5 h-5 sm:w-6 sm:h-6 text-[#00E676]/60" />
                      </div>
                      <div className="flex-1 min-w-0 pr-1 sm:pr-2 pt-0.5">
                        <h3 className="text-white font-black text-base sm:text-lg leading-tight flex items-center gap-1.5 truncate">
                          Γκαράζ Συντάγματος <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00E676] shrink-0" />
                        </h3>
                        <p className="text-[#888] text-[9px] sm:text-[10px] mt-0.5 sm:mt-1 flex items-center gap-1 font-medium">
                          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-current" /> 5.0 • Αθήνα
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[16px] sm:rounded-[20px] mb-4 sm:mb-5 overflow-hidden shrink-0">
                      <div className="bg-[#1A1A1A] p-2 sm:p-3 flex flex-col gap-0.5">
                        <span className="text-gray-500 text-[7px] sm:text-[8px] font-black uppercase tracking-widest">Τιμη / Ωρα</span>
                        <span className="text-white text-base sm:text-lg font-black">1.50<span className="text-[#00E676] ml-0.5">€</span></span>
                      </div>
                      <div className="bg-[#1A1A1A] p-2 sm:p-3 flex flex-col gap-0.5 items-end text-right">
                        <span className="text-gray-500 text-[7px] sm:text-[8px] font-black uppercase tracking-widest">Χρονος</span>
                        <span className="text-white text-base sm:text-lg font-black">3 min</span>
                      </div>
                    </div>

                    <div className="mt-auto shrink-0">
                      {/* Κουμπί που ανοίγει το Coming Soon Modal */}
                      <button 
                        onClick={() => setShowComingSoon(true)}
                        className="w-full bg-[#00E676] text-black py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black flex justify-between items-center px-4 sm:px-5 shadow-[0_10px_20px_rgba(0,230,118,0.25)] text-xs sm:text-sm"
                      >
                        <span className="tracking-tight uppercase">Κρατηση Τωρα</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Widgets - Responsive Position & Scale */}
              <div 
                className="absolute -right-6 md:-right-16 top-16 sm:top-20 bg-[#161616]/95 backdrop-blur-xl border border-white/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl flex items-center gap-3 sm:gap-4 z-[100] scale-90 sm:scale-100"
                style={{ transform: `translateZ(60px)` }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#00E676]/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,230,118,0.2)]">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#00E676]" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs sm:text-sm whitespace-nowrap">Ασφαλής Κράτηση</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs">Verified by Stripe</p>
                </div>
              </div>

              <div 
                className="absolute -left-10 md:-left-24 bottom-24 sm:bottom-32 bg-[#161616]/95 backdrop-blur-xl border border-white/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl flex items-center gap-2.5 sm:gap-3 z-[100] scale-90 sm:scale-100"
                style={{ transform: `translateZ(80px)` }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <Key className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs sm:text-sm whitespace-nowrap">Smart Entry</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs whitespace-nowrap">Άνοιγμα από το App</p>
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
            <div className="spotlight-card reveal-scale bg-[#121212] p-8 rounded-[32px] border border-white/5 hover:border-[#00E676]/40 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,230,118,0.05)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#00E676]/20 transition-all duration-500 border border-white/5 relative z-10">
                <MapPin className="w-8 h-8 text-white group-hover:text-[#00E676] transition-colors" />
              </div>
              <h3 className="text-xl font-black mb-3 relative z-10">1. Εντόπισε</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">Ο real-time χάρτης σου δείχνει μόνο τις θέσεις που είναι πραγματικά άδειες αυτή τη στιγμή, δίπλα στον προορισμό σου.</p>
            </div>
            
            <div className="spotlight-card reveal-scale delay-100 bg-[#121212] p-8 rounded-[32px] border border-white/5 hover:border-[#00E676]/40 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,230,118,0.05)] relative overflow-hidden mt-8 md:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#00E676]/20 transition-all duration-500 border border-white/5 relative z-10">
                <Clock className="w-8 h-8 text-white group-hover:text-[#00E676] transition-colors" />
              </div>
              <h3 className="text-xl font-black mb-3 relative z-10">2. Κλείσε</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">Επίλεξε τον χρόνο που χρειάζεσαι. Το Spotly ελέγχει αυτόματα αν η θέση θα μείνει ελεύθερη πριν επιστρέψει ο ιδιοκτήτης.</p>
            </div>

            <div className="spotlight-card reveal-scale delay-200 bg-[#121212] p-8 rounded-[32px] border border-white/5 hover:border-[#00E676]/40 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,230,118,0.05)] relative overflow-hidden mt-16 md:mt-0">
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
                <li className="reveal-left flex items-start gap-5 group">
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

                <li className="reveal-left delay-100 flex items-start gap-5 group">
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

                <li className="reveal-left delay-200 flex items-start gap-5 group">
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
      {/* --- ΝΕΟ FAQ SECTION --- */}
      <FAQSection />
      {/* --- ΝΕΟ ULTRA-PREMIUM FOOTER --- */}
      <footer 
        className="relative bg-[#050505] pt-24 pb-12 overflow-hidden group"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        }}
      >
        
        {/* Εντυπωσιακό Neon Border στο πάνω μέρος που σβήνει στις άκρες */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00E676]/60 to-transparent"></div>
        
        {/* Γιγάντιο Αχνό Watermark στο Background (Βάση) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/[0.02] tracking-tighter pointer-events-none select-none z-0">
          SPOTLY
        </div>

        {/* ΝΕΟ: Interactive Spotlight Overlay (Ο Φακός που ακολουθεί το ποντίκι) */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            WebkitMaskImage: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), black 10%, transparent 70%)',
            maskImage: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), black 10%, transparent 70%)'
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-[#00E676] tracking-tighter drop-shadow-[0_0_40px_rgba(0,230,118,0.5)]">
            SPOTLY
          </div>
        </div>
        
        {/* Background Ambient Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-[#00E676]/5 blur-[120px] pointer-events-none z-0"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
            
            {/* Στήλη 1: Brand, Text & App Badges */}
            <div className="md:col-span-5 lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_0_20px_rgba(0,230,118,0.2)] shrink-0">
                  <img src="/logo.png" alt="Spotly App Icon" className="w-full h-full object-cover scale-[1.02]" />
                </div>
                <span className="font-black tracking-tighter text-3xl text-white">Spotly<sup className="text-sm text-[#00E676] font-bold ml-1">™</sup></span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 text-sm max-w-sm">
                Η στάθμευση στη νέα εποχή. Επαναπροσδιορίζουμε τον τρόπο που ανακαλύπτετε, διαχειρίζεστε και μοιράζεστε τους χώρους σας.
              </p>
              
              {/* Fake App Badges για Premium Vibe */}
              <div className="flex flex-wrap gap-3 mb-10">
                <div onClick={() => setShowComingSoon(true)} className="flex items-center gap-3 bg-[#121212] border border-[#222] hover:border-[#00E676]/40 px-5 py-2.5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 group shadow-lg">
                  <svg className="w-7 h-7 text-white group-hover:text-[#00E676] transition-colors" viewBox="0 0 384 512" fill="currentColor">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Download on the</div>
                    <div className="text-base font-black text-white leading-tight">App Store</div>
                  </div>
                </div>
                <div onClick={() => setShowComingSoon(true)} className="flex items-center gap-3 bg-[#121212] border border-[#222] hover:border-[#00E676]/40 px-5 py-2.5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 group shadow-lg">
                  <svg className="w-7 h-7 text-white group-hover:text-[#00E676] transition-colors" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">GET IT ON</div>
                    <div className="text-base font-black text-white leading-tight">Google Play</div>
                  </div>
                </div>
              </div>

              {/* Social Links - Interactive & Connected */}
              <div className="flex items-center space-x-3">
                {/* Facebook - Coming Soon */}
                <button 
                  onClick={() => setShowComingSoon(true)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-[#00E676] hover:text-black transition-all duration-300 shadow-md group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </button>

                {/* LinkedIn - Coming Soon */}
                <button 
                  onClick={() => setShowComingSoon(true)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-[#00E676] hover:text-black transition-all duration-300 shadow-md group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </button>

                {/* Instagram - LIVE LINK */}
                <a 
                  href="https://www.instagram.com/parkspotly.official/" // <--- ΒΑΛΕ ΤΟ LINK ΣΟΥ ΕΔΩ
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-[#00E676] hover:text-black transition-all duration-300 shadow-md group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>

                {/* TikTok - LIVE LINK */}
                <a 
                  href="https://www.tiktok.com/@parkspotly.official" // <--- ΒΑΛΕ ΤΟ LINK ΣΟΥ ΕΔΩ
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-[#00E676] hover:text-black transition-all duration-300 shadow-md group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.3a3.42 3.42 0 0 0-1.22 1.24c-.45.79-.53 1.71-.4 2.6.11.9.54 1.74 1.21 2.35.85.79 2.04 1.13 3.19.94 1.19-.15 2.27-.86 2.89-1.9.31-.5.48-1.07.51-1.65.04-3.64.02-7.28.02-10.92z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-1"></div>

            {/* Στήλη 2: Πλοήγηση (Με Hover Effects) */}
            <div className="md:col-span-3 lg:col-span-2">
              <h4 className="text-white font-black mb-6 uppercase tracking-widest text-xs">Πλοηγηση</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="group flex items-center text-gray-400 hover:text-[#00E676] transition-colors"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Αρχική</a></li>
                <li><a href="#how-it-works" className="group flex items-center text-gray-400 hover:text-[#00E676] transition-colors"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Η Εμπειρία</a></li>
                <li><a href="#hosts" className="group flex items-center text-gray-400 hover:text-[#00E676] transition-colors"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Για Ιδιοκτήτες</a></li>
                <li><a href="#faq" className="group flex items-center text-gray-400 hover:text-[#00E676] transition-colors"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Συχνές Ερωτήσεις</a></li>
              </ul>
            </div>

            {/* Στήλη 3: Επικοινωνία */}
            <div className="md:col-span-4 lg:col-span-4">
              <h4 className="text-white font-black mb-6 uppercase tracking-widest text-xs">Επικοινωνια</h4>
              <ul className="space-y-5 text-sm font-medium bg-[#121212]/50 p-6 rounded-3xl border border-white/5 backdrop-blur-sm">
                <li className="flex items-center group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 group-hover:bg-[#00E676]/20 transition-colors">
                    <Mail className="w-4 h-4 text-[#00E676]" />
                  </div>
                  <a href="mailto:info@parkspotly.gr" className="text-gray-400 hover:text-white transition-colors">info@parkspotly.gr</a>
                </li>
                <li className="flex items-center group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 group-hover:bg-[#00E676]/20 transition-colors">
                    <Phone className="w-4 h-4 text-[#00E676]" />
                  </div>
                  <a href="tel:+306900000000" className="text-gray-400 hover:text-white transition-colors">Kαλέστε μας</a>
                </li>
                <li className="flex items-center group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 group-hover:bg-[#00E676]/20 transition-colors">
                    <MapPin className="w-4 h-4 text-[#00E676]" />
                  </div>
                  <span className="text-gray-400">Αθήνα, Ελλάδα</span>
                </li>
              </ul>
            </div>
            
          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00E676]" /> SECURED BY STRIPE <span className="text-[#333] hidden sm:inline">|</span> © {new Date().getFullYear()} SPOTLY INC.
            </p>
            <div className="flex space-x-8 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
              <a href="/terms" className="hover:text-[#00E676] transition-colors">Οροι Χρησης</a>
              <a href="/privacy" className="hover:text-[#00E676] transition-colors">Πολιτικη Απορρητου</a>
            </div>
          </div>
        </div>
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

      {/* --- BACK TO TOP BUTTON --- */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[150] w-14 h-14 rounded-full bg-[#00E676] text-black shadow-[0_0_20px_rgba(0,230,118,0.4)] flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] active:scale-90 ${
          showBackToTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'
        }`}
      >
        <ChevronUp className="w-7 h-7 stroke-[3]" />
      </button>

    </div>
  );
}