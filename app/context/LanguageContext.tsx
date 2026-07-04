"use client";

import React, { createContext, useContext, useState } from 'react';

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
      socialProof: "Οδηγοί είναι ήδη στη λίστα"
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
      socialProof: "Drivers already on the list"
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

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'el' ? 'en' : 'el'));
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