"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Το Λεξικό μας
const translations = {
  el: {
    nav: {
      experience: "Η Εμπειρία",
      hosts: "Για Ιδιοκτήτες",
      letsTalk: "Ας Μιλήσουμε",
      enterApp: "Είσοδος στο App"
    },
    hero: {
      title1: "Βρες Πάρκινγκ",
      title2: "Σε 10 Δευτερόλεπτα.",
      desc: "Η πρώτη και μοναδική πλατφόρμα που μετατρέπει τα κλειστά ιδιωτικά γκαράζ σε δικές σου θέσεις στάθμευσης. Κλείσε θέση εκ των προτέρων, άνοιξε την πόρτα με ένα πάτημα στο κινητό σου και ξέχασε το άγχος.",
      placeholder: "Το email σου...",
      earlyAccess: "EARLY ACCESS",
      socialProof: "Οδηγοί είναι ήδη στη λίστα",
      successTitle: "Η θέση σου κατοχυρώθηκε! 🚀",
      successSub: "Ελεγξε τα εισερχομενα σου",
      errorMsg: "Κάτι πήγε στραβά. Ξαναδοκίμασε."
    },
    how: {
      title1: "Η Μαγεία της",
      title2: "Απλότητας",
      desc: "Τρεις κινήσεις. Μηδέν άγχος. Ο χρόνος σου είναι πολύτιμος για να τον ξοδεύεις ψάχνοντας.",
      step1Title: "1. Εντόπισε",
      step1Desc: "Ο real-time χάρτης σου δείχνει μόνο τις θέσεις που είναι πραγματικά άδειες αυτή τη στιγμή, δίπλα στον προορισμό σου.",
      step2Title: "2. Κλείσε",
      step2Desc: "Επίλεξε τον χρόνο που χρειάζεσαι. Το Spotly ελέγχει αυτόματα αν η θέση θα μείνει ελεύθερη πριν επιστρέψει ο ιδιοκτήτης.",
      step3Title: "3. Πάρκαρε",
      step3DescA: "Το GPS σε οδηγεί εκεί. Δες τον κωδικό PIN, ή ",
      step3DescBold: "άνοιξε την γκαραζόπορτα με ένα πάτημα",
      step3DescB: " από το app, και πάρκαρε."
    },
    hosts: {
      badge: "Γίνε Host",
      title1: "Το άδειο σου πάρκινγκ,",
      title2: "η νέα σου επιχείρηση.",
      descA: "Νοίκιασε τη θέση σου με ",
      descBold: "Αυτόματο Πιλότο",
      descB: " όσο λείπεις στη δουλειά. Η ενσωμάτωση γίνεται σε 5 λεπτά και τα κέρδη μπαίνουν αυτόματα στο ΙΒΑΝ σου.",
      f1Title: "Plug & Play Εγκατάσταση",
      f1DescA: "Από ανοιχτές πιλοτές μέχρι ηλεκτρικές γκαραζόπορτες. Συνδέεται με το App μέσω απλού εξοπλισμού ",
      f1DescBold: "των 15€",
      f1DescB: ". Το στήνεις σε 5 λεπτά!",
      f2Title: "Smart Schedule",
      f2Desc: "Όρισε τις ώρες που λείπεις (π.χ. Δευ-Παρ, 08:00 - 17:00). Το Spotly ανοιγοκλείνει τη διαθεσιμότητα αυτόματα, χωρίς να ασχολείσαι καθόλου.",
      f3Title: "Εγγυημένες Πληρωμές",
      f3DescA: "100% ψηφιακές συναλλαγές. Τα χρήματά σου μπαίνουν με ασφάλεια κατευθείαν στον τραπεζικό σου λογαριασμό μέσω της ",
      cta: "ΓΙΝΕ HOST"
    },
    footer: {
      tagline: "Η στάθμευση στη νέα εποχή. Επαναπροσδιορίζουμε τον τρόπο που ανακαλύπτετε, διαχειρίζεστε και μοιράζεστε τους χώρους σας.",
      comingSoon: "Coming Soon",
      navHeading: "Πλοηγηση",
      navHome: "Αρχική",
      navExperience: "Η Εμπειρία",
      navHosts: "Για Ιδιοκτήτες",
      navFaq: "Συχνές Ερωτήσεις",
      contactHeading: "Επικοινωνια",
      location: "Ρίμινι 14, 122 43 Αιγάλεω",
      legalLine: "SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ (Spotly Parking Management L.P.) · δ.τ. SPOTLY · ΑΦΜ 803339090 · ΓΕΜΗ 194898201000 · Έδρα: Ρίμινι 14, 122 43 Αιγάλεω",
      terms: "Οροι Χρησης",
      privacy: "Πολιτικη Απορρητου"
    }
  },
  en: {
    nav: {
      experience: "The Experience",
      hosts: "For Hosts",
      letsTalk: "Let's Talk",
      enterApp: "Enter App"
    },
    hero: {
      title1: "Find Parking",
      title2: "In 10 Seconds.",
      desc: "The first and only platform that turns private garages into your own parking spots. Book in advance, open the door with a tap on your phone, and forget the stress.",
      placeholder: "Your email...",
      earlyAccess: "EARLY ACCESS",
      socialProof: "Drivers already on the list",
      successTitle: "Your spot is secured! 🚀",
      successSub: "Check your inbox",
      errorMsg: "Something went wrong. Try again."
    },
    how: {
      title1: "The Magic of",
      title2: "Simplicity",
      desc: "Three moves. Zero stress. Your time is too valuable to waste searching.",
      step1Title: "1. Locate",
      step1Desc: "The real-time map shows you only the spots that are actually free right now, right next to your destination.",
      step2Title: "2. Book",
      step2Desc: "Pick the time you need. Spotly automatically checks that the spot will stay free before the owner returns.",
      step3Title: "3. Park",
      step3DescA: "GPS guides you there. See the PIN code, or ",
      step3DescBold: "open the garage door with a single tap",
      step3DescB: " from the app, and park."
    },
    hosts: {
      badge: "Become a Host",
      title1: "Your empty parking spot,",
      title2: "your new business.",
      descA: "Rent out your spot on ",
      descBold: "Autopilot",
      descB: " while you're at work. Setup takes 5 minutes and your earnings land automatically in your IBAN.",
      f1Title: "Plug & Play Installation",
      f1DescA: "From open driveways to electric garage doors. Connects to the App with simple equipment ",
      f1DescBold: "costing €15",
      f1DescB: ". Set it up in 5 minutes!",
      f2Title: "Smart Schedule",
      f2Desc: "Set the hours you're away (e.g. Mon-Fri, 08:00 - 17:00). Spotly opens and closes availability automatically, hands-free.",
      f3Title: "Guaranteed Payouts",
      f3DescA: "100% digital transactions. Your money is deposited safely, straight into your bank account via ",
      cta: "BECOME A HOST"
    },
    footer: {
      tagline: "Parking for the new era. We are redefining how you discover, manage and share your spaces.",
      comingSoon: "Coming Soon",
      navHeading: "Navigation",
      navHome: "Home",
      navExperience: "The Experience",
      navHosts: "For Hosts",
      navFaq: "FAQ",
      contactHeading: "Contact",
      location: "Rimini 14, 122 43 Egaleo, Greece",
      legalLine: "Spotly Parking Management L.P. (SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ) · trade name SPOTLY · VAT EL803339090 · General Commercial Registry (ΓΕΜΗ) No. 194898201000 · Registered seat: Rimini 14, 122 43 Egaleo, Greece",
      terms: "Terms of Use",
      privacy: "Privacy Policy"
    }
  }
};

type Language = 'el' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (section: keyof typeof translations['el'], key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('el'); // Προεπιλογή Ελληνικά

  // Διατήρηση επιλογής γλώσσας μεταξύ σελίδων (terms, privacy κ.λπ.)
  useEffect(() => {
    const saved = window.localStorage.getItem('spotly-lang');
    if (saved === 'en' || saved === 'el') setLanguage(saved);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'el' ? 'en' : 'el';
      window.localStorage.setItem('spotly-lang', next);
      return next;
    });
  };

  const t = (section: keyof typeof translations['el'], key: string) => {
    // @ts-ignore
    return translations[language][section][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
