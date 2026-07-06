"use client";

import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type Section = {
  title: string;
  paragraphs?: string[];
  bullets?: { label: string; text: string }[];
};

const content: Record<'el' | 'en', {
  back: string;
  badge: string;
  title1: string;
  title2: string;
  updated: string;
  sections: Section[];
  contactTitle: string;
  contactText: string;
}> = {
  el: {
    back: "Επιστροφη στην Αρχικη",
    badge: "Νομικά Έγγραφα",
    title1: "Όροι",
    title2: "Χρήσης",
    updated: "Τελευταία Ενημέρωση",
    sections: [
      {
        title: "1. Η Εταιρεία & Περιγραφή της Υπηρεσίας",
        paragraphs: [
          "Η πλατφόρμα Spotly (parkspotly.gr και mobile εφαρμογή) λειτουργεί από την εταιρεία με νόμιμη επωνυμία «SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ» (Spotly Parking Management L.P.), διακριτικό τίτλο «SPOTLY», ΑΦΜ 803339090, αριθμό ΓΕΜΗ 194898201000 και έδρα επί της οδού Ρίμινι 14, 122 43 Αιγάλεω (εφεξής «Spotly», «η Εταιρεία»).",
          "Το Spotly λειτουργεί με το μοντέλο Master Lease: οι ιδιοκτήτες χώρων στάθμευσης («Hosts») παραχωρούν τους χώρους τους στην Εταιρεία βάσει ιδιωτικού συμφωνητικού μίσθωσης, και η Εταιρεία παρέχει την υπηρεσία στάθμευσης απευθείας στους οδηγούς («Οδηγοί»). Με κάθε κράτηση, η σύμβαση παροχής υπηρεσίας στάθμευσης συνάπτεται αποκλειστικά μεταξύ του Οδηγού και της SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ — όχι απευθείας με τον Host. Η Spotly δεν ενεργεί ως μεσίτης ή αντιπρόσωπος των Hosts."
        ]
      },
      {
        title: "2. Λογαριασμοί Χρηστών",
        paragraphs: [
          "Για να χρησιμοποιήσετε την Πλατφόρμα, πρέπει να είστε άνω των 18 ετών. Η εγγραφή απαιτεί ταυτοποίηση με email ή λογαριασμό Google/Apple, και για τους Οδηγούς την καταχώρηση των στοιχείων του οχήματος (πινακίδα, μάρκα, μοντέλο, χρώμα). Είστε υπεύθυνοι για τη διατήρηση της εμπιστευτικότητας των στοιχείων πρόσβασής σας και για όλες τις δραστηριότητες που πραγματοποιούνται μέσω του λογαριασμού σας."
        ]
      },
      {
        title: "3. Κρατήσεις, Ακυρώσεις & Χρεώσεις Καθυστέρησης",
        bullets: [
          { label: "Δωρεάν ακύρωση", text: "Οι Οδηγοί μπορούν να ακυρώσουν δωρεάν μια κράτηση μόνο εντός των πρώτων 10 λεπτών από τη δημιουργία της. Μετά το διάστημα αυτό, η ακύρωση δεν είναι εφικτή." },
          { label: "Πρόωρη αποχώρηση", text: "Αν ο Οδηγός αποχωρήσει πριν τη λήξη του χρόνου κράτησης, η κράτηση τερματίζεται και το υπόλοιπο ποσό πιστώνεται στο Spotly Wallet του για μελλοντικές κρατήσεις." },
          { label: "Υπέρβαση χρόνου", text: "Σε περίπτωση παραμονής πέραν του συμφωνημένου χρόνου, επιβάλλεται αυτόματα χρέωση υπερημερίας ίση με το διπλάσιο της αρχικής τιμής για κάθε 30 λεπτά καθυστέρησης." }
        ]
      },
      {
        title: "4. Υποχρεώσεις Οδηγών (Drivers)",
        bullets: [
          { label: "Ακρίβεια Χρόνου", text: "Ο Οδηγός υποχρεούται να αποχωρήσει από τον χώρο στάθμευσης στη λήξη του χρόνου κράτησης, διαφορετικά επιβάλλονται οι χρεώσεις καθυστέρησης της ενότητας 3." },
          { label: "Χρήση Χώρου", text: "Ο χώρος πρέπει να χρησιμοποιείται αποκλειστικά για στάθμευση του δηλωθέντος οχήματος. Απαγορεύεται η αποθήκευση αντικειμένων, η διαμονή ή η εκτέλεση εργασιών." },
          { label: "Ασφάλιση & Ευθύνη Ζημιών", text: "Το όχημα του Οδηγού πρέπει να διαθέτει ενεργό ασφαλιστήριο συμβόλαιο. Ο Οδηγός φέρει την αποκλειστική ευθύνη για οποιαδήποτε ζημιά προκαλέσει στον χώρο στάθμευσης, στον μηχανισμό της γκαραζόπορτας ή σε τρίτα οχήματα." }
        ]
      },
      {
        title: "5. Υποχρεώσεις Ιδιοκτητών (Hosts)",
        bullets: [
          { label: "Νόμιμο Δικαίωμα & Master Lease", text: "Ο Host δηλώνει υπεύθυνα ότι έχει το νόμιμο δικαίωμα παραχώρησης του χώρου και συνάπτει με την Εταιρεία ιδιωτικό συμφωνητικό μίσθωσης (Master Lease), το οποίο υποβάλλεται στη Δήλωση Πληροφοριακών Στοιχείων Μίσθωσης της ΑΑΔΕ (myAADE/TAXISnet) πριν την ενεργοποίηση της θέσης." },
          { label: "Μίσθωμα", text: "Το μίσθωμα του Host ανέρχεται στο 80% της καθαρής (προ ΦΠΑ) αξίας των εισπράξεων από την εκμετάλλευση της θέσης και εκκαθαρίζεται μηνιαίως στον δηλωμένο τραπεζικό λογαριασμό (IBAN) του." },
          { label: "Εξοπλισμός (Smart Entry)", text: "Ο Host είναι υπεύθυνος για την παροχή ρεύματος και σύνδεσης Wi-Fi στον μηχανισμό απομακρυσμένου ανοίγματος του Spotly, όπου αυτός έχει εγκατασταθεί." },
          { label: "Διαθεσιμότητα & Πρόσβαση", text: "Ο χώρος πρέπει να είναι καθαρός, ασφαλής και προσβάσιμος. Κατά τη διάρκεια ενεργής κράτησης, ο Host δεν πρέπει να εμποδίζει την πρόσβαση του Οδηγού." }
        ]
      },
      {
        title: "6. Πληρωμές",
        paragraphs: [
          "Όλες οι πληρωμές διεκπεραιώνονται ηλεκτρονικά μέσω πιστοποιημένου παρόχου πληρωμών (Stripe) και εισπράττονται από την Εταιρεία, η οποία είναι ο πάροχος της υπηρεσίας στάθμευσης. Το τελικό ποσό που εμφανίζεται πριν την επιβεβαίωση της κράτησης περιλαμβάνει ΦΠΑ 24%, και το σχετικό φορολογικό παραστατικό εκδίδεται στο όνομα του Οδηγού. Η Spotly δεν αποθηκεύει στοιχεία καρτών· αυτά επεξεργάζονται αποκλειστικά από τη Stripe."
        ]
      },
      {
        title: "7. Περιορισμός Ευθύνης",
        paragraphs: [
          "Το Spotly δεν φέρει ευθύνη για κλοπές, φθορές, ατυχήματα ή τραυματισμούς που μπορεί να προκύψουν εντός του χώρου στάθμευσης. Η στάθμευση γίνεται με αποκλειστική ευθύνη του Οδηγού (Park at your own risk). Η Spotly δεν ελέγχει εξαντλητικά τίτλους ιδιοκτησίας των χώρων· την ευθύνη νομιμότητας φέρει ο εκάστοτε Host."
        ]
      }
    ],
    contactTitle: "8. Επικοινωνία",
    contactText: "Αν έχετε απορίες σχετικά με τους Όρους Χρήσης, παρακαλούμε επικοινωνήστε μαζί μας στο"
  },
  en: {
    back: "Back to Home",
    badge: "Legal Documents",
    title1: "Terms of",
    title2: "Use",
    updated: "Last Updated",
    sections: [
      {
        title: "1. The Company & Service Description",
        paragraphs: [
          "The Spotly platform (parkspotly.gr and the mobile app) is operated by the company with the registered name «SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ» (Spotly Parking Management L.P.), trade name «SPOTLY», VAT No. EL803339090, General Commercial Registry (ΓΕΜΗ) No. 194898201000, with its registered seat at Rimini 14, 122 43 Egaleo, Greece (hereinafter “Spotly”, “the Company”).",
          "Spotly operates under a Master Lease model: parking space owners (“Hosts”) lease their spaces to the Company under a private lease agreement, and the Company provides the parking service directly to drivers (“Drivers”). For every booking, the parking service contract is formed exclusively between the Driver and SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ — not directly with the Host. Spotly does not act as a broker or agent of the Hosts."
        ]
      },
      {
        title: "2. User Accounts",
        paragraphs: [
          "To use the Platform, you must be over 18 years old. Registration requires verification via email or a Google/Apple account, and for Drivers the registration of vehicle details (license plate, make, model, color). You are responsible for maintaining the confidentiality of your credentials and for all activity carried out through your account."
        ]
      },
      {
        title: "3. Bookings, Cancellations & Overstay Charges",
        bullets: [
          { label: "Free cancellation", text: "Drivers may cancel a booking free of charge only within the first 10 minutes after it is created. After that window, cancellation is no longer possible." },
          { label: "Early departure", text: "If the Driver leaves before the end of the booked time, the booking is ended and the remaining amount is credited to their Spotly Wallet for future bookings." },
          { label: "Overstay", text: "If the Driver stays beyond the agreed time, an overstay charge equal to double the original rate is applied automatically for every 30 minutes of delay." }
        ]
      },
      {
        title: "4. Driver Obligations",
        bullets: [
          { label: "Punctuality", text: "The Driver must vacate the parking space by the end of the booked time; otherwise, the overstay charges of section 3 apply." },
          { label: "Use of the Space", text: "The space must be used exclusively for parking the declared vehicle. Storing items, residing, or carrying out works is prohibited." },
          { label: "Insurance & Liability", text: "The Driver's vehicle must carry an active insurance policy. The Driver bears sole responsibility for any damage caused to the parking space, the garage door mechanism, or third-party vehicles." }
        ]
      },
      {
        title: "5. Host Obligations",
        bullets: [
          { label: "Legal Right & Master Lease", text: "The Host warrants that they have the legal right to grant use of the space and enters into a private lease agreement (Master Lease) with the Company, which is submitted to the Greek tax authority's lease declaration system (myAADE/TAXISnet) before the spot is activated." },
          { label: "Rent", text: "The Host's rent amounts to 80% of the net (pre-VAT) value of the proceeds from the exploitation of the spot and is settled monthly to their declared bank account (IBAN)." },
          { label: "Equipment (Smart Entry)", text: "The Host is responsible for providing power and Wi-Fi connectivity to Spotly's remote-opening device, where installed." },
          { label: "Availability & Access", text: "The space must be clean, safe, and accessible. During an active booking, the Host must not obstruct the Driver's access." }
        ]
      },
      {
        title: "6. Payments",
        paragraphs: [
          "All payments are processed electronically through a certified payment provider (Stripe) and are collected by the Company, which is the provider of the parking service. The final amount shown before booking confirmation includes 24% VAT, and the corresponding tax document is issued in the Driver's name. Spotly does not store card details; these are processed exclusively by Stripe."
        ]
      },
      {
        title: "7. Limitation of Liability",
        paragraphs: [
          "Spotly is not liable for theft, damage, accidents, or injuries that may occur within the parking space. Parking is at the Driver's own risk. Spotly does not exhaustively verify property titles of the spaces; responsibility for legality lies with the respective Host."
        ]
      }
    ],
    contactTitle: "8. Contact",
    contactText: "If you have any questions about these Terms of Use, please contact us at"
  }
};

export default function TermsOfService() {
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
          
          {c.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
              {section.paragraphs?.map((p, j) => (
                <p key={j} className={j < (section.paragraphs?.length ?? 0) - 1 ? "mb-4" : undefined}>{p}</p>
              ))}
              {section.bullets && (
                <ul className="list-disc pl-6 space-y-2 marker:text-[#00E676]">
                  {section.bullets.map((b, j) => (
                    <li key={j}><strong>{b.label}:</strong> {b.text}</li>
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
