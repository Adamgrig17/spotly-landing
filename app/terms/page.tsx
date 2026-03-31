"use client";

import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <a href="/" className="inline-flex items-center text-gray-400 hover:text-[#00E676] transition-colors mb-12 font-bold text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4 mr-2" /> Επιστροφη στην Αρχικη
        </a>

        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3 h-3 text-[#00E676]" /> Νομικά Έγγραφα
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Όροι <span className="text-[#00E676]">Χρήσης</span></h1>
          <p className="text-gray-500">Τελευταία Ενημέρωση: {new Date().toLocaleDateString('el-GR')}</p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-300 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Περιγραφή της Υπηρεσίας</h2>
            <p>
              Το Spotly λειτουργεί αποκλειστικά ως ενδιάμεσος (διαδικτυακή πλατφόρμα) που συνδέει άτομα που αναζητούν χώρο στάθμευσης ("Οδηγοί") με ιδιοκτήτες ή διαχειριστές χώρων στάθμευσης ("Hosts"). Το Spotly δεν κατέχει, δεν ενοικιάζει και δεν διαχειρίζεται τους χώρους στάθμευσης.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Λογαριασμοί Χρηστών</h2>
            <p>
              Για να χρησιμοποιήσετε την Πλατφόρμα, πρέπει να είστε άνω των 18 ετών. Είστε υπεύθυνοι για τη διατήρηση της εμπιστευτικότητας του κωδικού πρόσβασής σας και για όλες τις δραστηριότητες που πραγματοποιούνται μέσω του λογαριασμού σας.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Υποχρεώσεις Οδηγών (Drivers)</h2>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#00E676]">
              <li><strong>Ακρίβεια Χρόνου:</strong> Ο Οδηγός υποχρεούται να αποχωρήσει από τον χώρο στάθμευσης ακριβώς στη λήξη του χρόνου κράτησης. Σε περίπτωση καθυστέρησης, ενδέχεται να επιβληθούν πρόστιμα υπερημερίας.</li>
              <li><strong>Χρήση Χώρου:</strong> Ο χώρος πρέπει να χρησιμοποιείται αποκλειστικά για στάθμευση του δηλωθέντος οχήματος. Απαγορεύεται η αποθήκευση αντικειμένων, η διαμονή ή η εκτέλεση εργασιών.</li>
              <li><strong>Ευθύνη Ζημιών:</strong> Ο Οδηγός φέρει την αποκλειστική ευθύνη για οποιαδήποτε ζημιά προκαλέσει στον χώρο στάθμευσης, στον μηχανισμό της γκαραζόπορτας ή σε τρίτα οχήματα.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Υποχρεώσεις Ιδιοκτητών (Hosts)</h2>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#00E676]">
              <li><strong>Διαθεσιμότητα & Ασφάλεια:</strong> Ο Host εγγυάται ότι έχει το νόμιμο δικαίωμα να υπεκμισθώνει τη θέση. Ο χώρος πρέπει να είναι καθαρός και ασφαλής.</li>
              <li><strong>Εξοπλισμός (Smart Entry):</strong> Ο Host είναι υπεύθυνος για την παροχή ρεύματος και σύνδεσης Wi-Fi στον μηχανισμό του Spotly.</li>
              <li><strong>Αποκλεισμός Πρόσβασης:</strong> Κατά τη διάρκεια μιας ενεργής κράτησης, ο Host δεν πρέπει να εμποδίζει την πρόσβαση του Οδηγού.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Πληρωμές και Χρεώσεις</h2>
            <p>
              Όλες οι πληρωμές διεκπεραιώνονται μέσω πιστοποιημένου τρίτου παρόχου (Stripe). Το Spotly παρακρατεί προμήθεια επί της συναλλαγής, όπως αυτή εμφανίζεται κατά την κράτηση.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Περιορισμός Ευθύνης</h2>
            <p>
              Το Spotly δεν φέρει καμία ευθύνη για κλοπές, φθορές, ατυχήματα ή τραυματισμούς που μπορεί να προκύψουν εντός του χώρου στάθμευσης. Η στάθμευση γίνεται με αποκλειστική ευθύνη του Οδηγού (Park at your own risk). Η ευθύνη του Spotly περιορίζεται αυστηρά στη διευκόλυνση της διαδικτυακής συναλλαγής.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Επικοινωνία</h2>
            <p>
              Αν έχετε απορίες σχετικά με τους Όρους Χρήσης, παρακαλούμε επικοινωνήστε μαζί μας στο <a href="mailto:info@parkspotly.gr" className="text-[#00E676] hover:underline">info@parkspotly.gr</a>.
            </p>
          </section>
          
        </div>
      </div>
    </div>
  );
}