"use client";

import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type Section = {
  title: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: { label?: string; text: string }[];
};

const content: Record<'el' | 'en', {
  back: string;
  badge: string;
  title1: string;
  title2: string;
  updated: string;
  intro: string;
  sections: Section[];
  contactTitle: string;
  contactText: string;
}> = {
  el: {
    back: "Επιστροφη στην Αρχικη",
    badge: "Προστασία Δεδομένων (GDPR)",
    title1: "Πολιτική",
    title2: "Απορρήτου",
    updated: "Τελευταία Ενημέρωση",
    intro: "Η πλατφόρμα Spotly (parkspotly.gr και mobile εφαρμογή) λειτουργεί από την εταιρεία με νόμιμη επωνυμία «SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ» (Spotly Parking Management L.P.), διακριτικό τίτλο «SPOTLY», ΑΦΜ 803339090, αριθμό ΓΕΜΗ 194898201000 και έδρα επί της οδού Ρίμινι 14, 122 43 Αιγάλεω (εφεξής \"εμείς\", \"η Εταιρεία\"). Σεβόμαστε τα προσωπικά σας δεδομένα και δεσμευόμαστε να τα προστατεύουμε σύμφωνα με τον Γενικό Κανονισμό για την Προστασία Δεδομένων (ΓΚΠΔ / GDPR).",
    sections: [
      {
        title: "1. Ποια δεδομένα συλλέγουμε",
        bullets: [
          { label: "Δεδομένα Ταυτοποίησης", text: "Όνομα, Επώνυμο, Διεύθυνση Email, Αριθμός Τηλεφώνου. Η σύνδεση μπορεί να γίνει και μέσω λογαριασμού Google ή Apple." },
          { label: "Δεδομένα Οχήματος (Οδηγοί)", text: "Αριθμός Κυκλοφορίας (Πινακίδα), Μάρκα/Μοντέλο, Χρώμα." },
          { label: "Δεδομένα Hosts", text: "Για τη σύναψη του συμφωνητικού μίσθωσης (Master Lease) και την καταβολή των μισθωμάτων, συλλέγουμε επιπλέον: ΑΦΜ, ΑΤΑΚ ή στοιχεία ακινήτου, διεύθυνση της θέσης και τραπεζικό λογαριασμό (IBAN)." },
          { label: "Δεδομένα Τοποθεσίας (GPS)", text: "Συλλέγουμε δεδομένα τοποθεσίας σε πραγματικό χρόνο (εφόσον μας δώσετε άδεια) για να σας εμφανίσουμε τους κοντινότερους διαθέσιμους χώρους και να σας πλοηγήσουμε σε αυτούς." },
          { label: "Οικονομικά Δεδομένα", text: "Τα στοιχεία της κάρτας σας κρυπτογραφούνται και επεξεργάζονται απευθείας από τον συνεργάτη μας (Stripe). Το Spotly δεν αποθηκεύει τον αριθμό της κάρτας σας. Τηρούμε ιστορικό συναλλαγών, κρατήσεων και υπολοίπου Spotly Wallet." },
          { label: "Δεδομένα Επικοινωνίας & Χρήσης", text: "Μηνύματα στο chat κράτησης μεταξύ Οδηγού και Host, αιτήματα υποστήριξης, καθώς και token ειδοποιήσεων της συσκευής σας (εφόσον αποδεχθείτε τις push ειδοποιήσεις)." }
        ]
      },
      {
        title: "2. Πώς χρησιμοποιούμε τα δεδομένα σας",
        bullets: [
          { text: "Για τη δημιουργία και διαχείριση του λογαριασμού σας." },
          { text: "Για τη διεκπεραίωση των κρατήσεων και την εκτέλεση της εντολής απομακρυσμένου ανοίγματος της γκαραζόπορτας (Smart Entry)." },
          { text: "Για την επεξεργασία των πληρωμών σας, την έκδοση παραστατικών και τη μηνιαία εκκαθάριση των μισθωμάτων προς τους Hosts." },
          { text: "Για την κατάρτιση και ηλεκτρονική υπογραφή του ιδιωτικού συμφωνητικού μίσθωσης (Master Lease) με τους Hosts και την υποστήριξη της δήλωσής του στο myAADE/TAXISnet." },
          { text: "Για την αποστολή ειδοποιήσεων σχετικών με τις κρατήσεις σας (email και push) — π.χ. υπενθυμίσεις λήξης, επιβεβαιώσεις, μηνύματα chat." },
          { text: "Για την πρόληψη κατάχρησης της πλατφόρμας (π.χ. έλεγχοι ασφαλείας κατά τη σύνδεση) και την επίλυση διαφορών." },
          { text: "Για τη βελτίωση της Πλατφόρμας μας." }
        ]
      },
      {
        title: "3. Κοινοποίηση Δεδομένων σε Τρίτους",
        intro: "Δεν πουλάμε τα προσωπικά σας δεδομένα. Ενδέχεται να τα μοιραστούμε με:",
        bullets: [
          { label: "Μεταξύ Χρηστών", text: "Ο Host βλέπει το όνομα και τον αριθμό κυκλοφορίας του Οδηγού για την ταυτοποίηση της κράτησης. Ο Οδηγός βλέπει την ακριβή διεύθυνση και τις οδηγίες πρόσβασης της θέσης μετά την κράτηση. Η σύμβαση παροχής υπηρεσίας στάθμευσης συνάπτεται με την Εταιρεία, όχι απευθείας με τον Host." },
          { label: "Παρόχους Υπηρεσιών", text: "Stripe (πληρωμές), Supabase (φιλοξενία βάσης δεδομένων και ταυτοποίηση), Google (χάρτες, σύνδεση), Apple (σύνδεση), Resend (αποστολή email), Expo (push ειδοποιήσεις), Cloudflare (ασφάλεια), καθώς και παρόχους cloud hosting." },
          { label: "Φορολογικές Αρχές", text: "Στοιχεία των συμφωνητικών μίσθωσης των Hosts δηλώνονται στην ΑΑΔΕ (myAADE/TAXISnet) όπως απαιτεί ο νόμος." },
          { label: "Αρχές Επιβολής του Νόμου", text: "Εάν ζητηθεί νομίμως στο πλαίσιο διερεύνησης αδικημάτων." }
        ]
      },
      {
        title: "4. Διατήρηση Δεδομένων",
        paragraphs: [
          "Διατηρούμε τα δεδομένα σας για όσο διάστημα διατηρείτε λογαριασμό στο Spotly. Στοιχεία συναλλαγών, παραστατικών και συμφωνητικών μίσθωσης διατηρούνται για όσο απαιτείται από τη φορολογική και εμπορική νομοθεσία, ακόμη και μετά τη διαγραφή του λογαριασμού."
        ]
      },
      {
        title: "5. Τα Δικαιώματά σας (GDPR)",
        intro: "Ως κάτοικος της Ευρωπαϊκής Ένωσης, έχετε τα εξής δικαιώματα:",
        bullets: [
          { label: "Δικαίωμα Πρόσβασης & Διόρθωσης", text: "Να ζητήσετε αντίγραφο των δεδομένων σας και να τα διορθώσετε." },
          { label: "Δικαίωμα Διαγραφής", text: "Να ζητήσετε τη διαγραφή του λογαριασμού σας — διατίθεται και απευθείας μέσα από την εφαρμογή." },
          { label: "Δικαίωμα Φορητότητας", text: "Να λάβετε τα δεδομένα σας σε δομημένη, κοινώς χρησιμοποιούμενη μορφή." },
          { label: "Δικαίωμα Εναντίωσης", text: "Να ανακαλέσετε τη συγκατάθεσή σας (π.χ. για τοποθεσία ή ειδοποιήσεις) ανά πάσα στιγμή από τις ρυθμίσεις της συσκευής ή της εφαρμογής." },
          { label: "Δικαίωμα Καταγγελίας", text: "Να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (www.dpa.gr)." }
        ]
      }
    ],
    contactTitle: "6. Επικοινωνία",
    contactText: "Για την άσκηση των δικαιωμάτων σας, επικοινωνήστε μαζί μας στο:"
  },
  en: {
    back: "Back to Home",
    badge: "Data Protection (GDPR)",
    title1: "Privacy",
    title2: "Policy",
    updated: "Last Updated",
    intro: "The Spotly platform (parkspotly.gr and the mobile app) is operated by the company with the registered name «SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ» (Spotly Parking Management L.P.), trade name «SPOTLY», VAT No. EL803339090, General Commercial Registry (ΓΕΜΗ) No. 194898201000, with its registered seat at Rimini 14, 122 43 Egaleo, Greece (hereinafter \"we\", \"the Company\"). We respect your personal data and are committed to protecting it in accordance with the General Data Protection Regulation (GDPR).",
    sections: [
      {
        title: "1. What data we collect",
        bullets: [
          { label: "Identification Data", text: "First name, last name, email address, phone number. Sign-in is also available via a Google or Apple account." },
          { label: "Vehicle Data (Drivers)", text: "License plate number, make/model, color." },
          { label: "Host Data", text: "To conclude the lease agreement (Master Lease) and pay out rent, we additionally collect: tax ID (ΑΦΜ), property identification number (ΑΤΑΚ) or property details, the spot's address, and bank account (IBAN)." },
          { label: "Location Data (GPS)", text: "We collect real-time location data (with your permission) to show you the nearest available spots and navigate you to them." },
          { label: "Financial Data", text: "Your card details are encrypted and processed directly by our partner (Stripe). Spotly does not store your card number. We keep a history of transactions, bookings, and your Spotly Wallet balance." },
          { label: "Communication & Usage Data", text: "Booking chat messages between Driver and Host, support requests, and your device's notification token (if you accept push notifications)." }
        ]
      },
      {
        title: "2. How we use your data",
        bullets: [
          { text: "To create and manage your account." },
          { text: "To process bookings and execute the remote garage-door opening command (Smart Entry)." },
          { text: "To process your payments, issue tax documents, and settle monthly rent payouts to Hosts." },
          { text: "To prepare and electronically sign the private lease agreement (Master Lease) with Hosts and support its declaration to the Greek tax authority (myAADE/TAXISnet)." },
          { text: "To send you notifications related to your bookings (email and push) — e.g. expiry reminders, confirmations, chat messages." },
          { text: "To prevent abuse of the platform (e.g. security checks at sign-in) and resolve disputes." },
          { text: "To improve our Platform." }
        ]
      },
      {
        title: "3. Sharing Data with Third Parties",
        intro: "We do not sell your personal data. We may share it with:",
        bullets: [
          { label: "Between Users", text: "The Host sees the Driver's name and license plate for booking identification. The Driver sees the exact address and access instructions of the spot after booking. The parking service contract is formed with the Company, not directly with the Host." },
          { label: "Service Providers", text: "Stripe (payments), Supabase (database hosting and authentication), Google (maps, sign-in), Apple (sign-in), Resend (email delivery), Expo (push notifications), Cloudflare (security), and cloud hosting providers." },
          { label: "Tax Authorities", text: "Details of Hosts' lease agreements are declared to the Greek tax authority (myAADE/TAXISnet) as required by law." },
          { label: "Law Enforcement", text: "If lawfully requested in the context of criminal investigations." }
        ]
      },
      {
        title: "4. Data Retention",
        paragraphs: [
          "We retain your data for as long as you maintain a Spotly account. Transaction records, tax documents, and lease agreements are retained for as long as required by tax and commercial law, even after account deletion."
        ]
      },
      {
        title: "5. Your Rights (GDPR)",
        intro: "As a resident of the European Union, you have the following rights:",
        bullets: [
          { label: "Right of Access & Rectification", text: "To request a copy of your data and have it corrected." },
          { label: "Right to Erasure", text: "To request deletion of your account — also available directly within the app." },
          { label: "Right to Portability", text: "To receive your data in a structured, commonly used format." },
          { label: "Right to Object", text: "To withdraw your consent (e.g. for location or notifications) at any time via your device or app settings." },
          { label: "Right to Lodge a Complaint", text: "To file a complaint with the Hellenic Data Protection Authority (www.dpa.gr)." }
        ]
      }
    ],
    contactTitle: "6. Contact",
    contactText: "To exercise your rights, contact us at:"
  }
};

export default function PrivacyPolicy() {
  const { language, toggleLanguage } = useLanguage();
  const c = content[language];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button & Language Toggle */}
        <div className="flex items-center justify-between mb-12">
          <a href="/" className="inline-flex items-center text-gray-400 hover:text-[#00E676] transition-colors font-bold text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 mr-2" /> {c.back}
          </a>
          <button 
            onClick={toggleLanguage} 
            className="flex items-center gap-1.5 bg-[#121212] border border-white/10 rounded-full px-3 py-2 text-xs font-black hover:border-[#00E676]/50 transition-all shadow-lg active:scale-95"
          >
            <span className={language === 'el' ? 'text-[#00E676]' : 'text-gray-500'}>EL</span>
            <span className="text-gray-700">/</span>
            <span className={language === 'en' ? 'text-[#00E676]' : 'text-gray-500'}>EN</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3 h-3 text-[#00E676]" /> {c.badge}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">{c.title1} <span className="text-[#00E676]">{c.title2}</span></h1>
          <p className="text-gray-500">{c.updated}: {new Date().toLocaleDateString(language === 'el' ? 'el-GR' : 'en-GB')}</p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-300 leading-relaxed">
          
          <section>
            <p className="text-lg font-medium text-white mb-6">
              {c.intro}
            </p>
          </section>

          {c.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
              {section.intro && <p className="mb-2">{section.intro}</p>}
              {section.paragraphs?.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {section.bullets && (
                <ul className="list-disc pl-6 space-y-2 marker:text-[#00E676]">
                  {section.bullets.map((b, j) => (
                    <li key={j}>{b.label ? <><strong>{b.label}:</strong> {b.text}</> : b.text}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{c.contactTitle}</h2>
            <p>
              {c.contactText} <a href="mailto:info@parkspotly.gr" className="text-[#00E676] hover:underline">info@parkspotly.gr</a>.
            </p>
          </section>
          
        </div>
      </div>
    </div>
  );
}
