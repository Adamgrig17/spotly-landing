"use client";

import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
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
            <ShieldCheck className="w-3 h-3 text-[#00E676]" /> Προστασία Δεδομένων (GDPR)
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Πολιτική <span className="text-[#00E676]">Απορρήτου</span></h1>
          <p className="text-gray-500">Τελευταία Ενημέρωση: {new Date().toLocaleDateString('el-GR')}</p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-300 leading-relaxed">
          
          <section>
            <p className="text-lg font-medium text-white mb-6">
              Στο Spotly (εφεξής "εμείς", "η Εταιρεία"), σεβόμαστε τα προσωπικά σας δεδομένα και δεσμευόμαστε να τα προστατεύουμε σύμφωνα με τον Γενικό Κανονισμό για την Προστασία Δεδομένων (ΓΚΠΔ / GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Ποια δεδομένα συλλέγουμε</h2>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#00E676]">
              <li><strong>Δεδομένα Ταυτοποίησης:</strong> Όνομα, Επώνυμο, Διεύθυνση Email, Αριθμός Τηλεφώνου.</li>
              <li><strong>Δεδομένα Οχήματος:</strong> Αριθμός Κυκλοφορίας (Πινακίδα), Μάρκα/Μοντέλο.</li>
              <li><strong>Δεδομένα Τοποθεσίας (GPS):</strong> Συλλέγουμε δεδομένα τοποθεσίας σε πραγματικό χρόνο (εφόσον μας δώσετε άδεια) για να σας εμφανίσουμε τους κοντινότερους διαθέσιμους χώρους.</li>
              <li><strong>Οικονομικά Δεδομένα:</strong> Τα στοιχεία της κάρτας σας κρυπτογραφούνται απευθείας από τον συνεργάτη μας (Stripe). Το Spotly δεν αποθηκεύει τον αριθμό της πιστωτικής σας κάρτας.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Πώς χρησιμοποιούμε τα δεδομένα σας</h2>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#00E676]">
              <li>Για τη δημιουργία και διαχείριση του λογαριασμού σας.</li>
              <li>Για τη διεκπεραίωση των κρατήσεων και την εκτέλεση της εντολής ανοίγματος της γκαραζόπορτας.</li>
              <li>Για την επεξεργασία των πληρωμών σας και την απόδοση των κερδών στους Hosts.</li>
              <li>Για την επίλυση διαφορών και τη βελτίωση της Πλατφόρμας μας.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Κοινοποίηση Δεδομένων σε Τρίτους</h2>
            <p className="mb-2">Δεν πουλάμε τα προσωπικά σας δεδομένα. Ενδέχεται να τα μοιραστούμε με:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#00E676]">
              <li><strong>Μεταξύ Χρηστών:</strong> Ο Host θα βλέπει τον αριθμό κυκλοφορίας και το όνομα του Οδηγού. Ο Οδηγός θα βλέπει την ακριβή διεύθυνση του Host μετά την κράτηση.</li>
              <li><strong>Παρόχους Υπηρεσιών:</strong> Stripe (για πληρωμές), παρόχους cloud hosting και υπηρεσίες επικοινωνίας.</li>
              <li><strong>Αρχές Επιβολής του Νόμου:</strong> Εάν ζητηθεί νομίμως στο πλαίσιο διερεύνησης αδικημάτων.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Τα Δικαιώματά σας (GDPR)</h2>
            <p className="mb-2">Ως κάτοικος της Ευρωπαϊκής Ένωσης, έχετε τα εξής δικαιώματα:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#00E676]">
              <li><strong>Δικαίωμα Πρόσβασης & Διόρθωσης:</strong> Να ζητήσετε αντίγραφο των δεδομένων σας και να τα διορθώσετε.</li>
              <li><strong>Δικαίωμα Διαγραφής:</strong> Να ζητήσετε τη διαγραφή του λογαριασμού σας.</li>
              <li><strong>Δικαίωμα Εναντίωσης:</strong> Να ανακαλέσετε τη συγκατάθεσή σας ανά πάσα στιγμή.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Επικοινωνία</h2>
            <p>
              Για την άσκηση των δικαιωμάτων σας, επικοινωνήστε μαζί μας στο: <a href="mailto:info@parkspotly.gr" className="text-[#00E676] hover:underline">info@parkspotly.gr</a>.
            </p>
          </section>
          
        </div>
      </div>
    </div>
  );
}