"use client";

import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function LegalShell({
  children,
  backEl,
  backEn,
}: {
  children: React.ReactNode;
  backEl: string;
  backEn: string;
}) {
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    document.documentElement.classList.add('js-legal');
    document.documentElement.setAttribute('data-legal-lang', language);
    return () => {
      document.documentElement.classList.remove('js-legal');
      document.documentElement.removeAttribute('data-legal-lang');
    };
  }, [language]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <a
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-[#00E676] transition-colors font-bold text-sm uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="legal-el">{backEl}</span>
            <span className="legal-en">{backEn}</span>
          </a>
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-[#121212] border border-white/10 rounded-full px-3 py-2 text-xs font-black hover:border-[#00E676]/50 transition-all shadow-lg active:scale-95"
          >
            <span className={language === 'el' ? 'text-[#00E676]' : 'text-gray-500'}>EL</span>
            <span className="text-gray-700">/</span>
            <span className={language === 'en' ? 'text-[#00E676]' : 'text-gray-500'}>EN</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
