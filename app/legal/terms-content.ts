export type LegalBullet = { label?: string; text: string };

export type LegalSection = {
  title: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: LegalBullet[];
};

export type LegalDoc = {
  langLabel: string;
  back: string;
  badge: string;
  title1: string;
  title2: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
  contactTitle: string;
  contactText: string;
};

/** Guideline 1.2 — must appear verbatim in the Greek Terms. */
export const TERMS_EL_CORE =
  'Απαγορευμένο περιεχόμενο και συμπεριφορά. Η Spotly εφαρμόζει πολιτική μηδενικής ανοχής σε προσβλητικό περιεχόμενο και σε καταχρηστική συμπεριφορά χρηστών. Απαγορεύεται η δημοσίευση ή αποστολή περιεχομένου που είναι παράνομο, υβριστικό, απειλητικό, ρατσιστικό, σεξουαλικού περιεχομένου, παρενοχλητικό ή που παραβιάζει δικαιώματα τρίτων. Οι αναφορές εξετάζονται εντός 24 ωρών. Το περιεχόμενο που παραβιάζει τους παρόντες όρους αφαιρείται και οι λογαριασμοί που εμπλέκονται αναστέλλονται ή διαγράφονται οριστικά, χωρίς προειδοποίηση.';

export const termsContent: Record<'el' | 'en', LegalDoc> = {
  el: {
    langLabel: 'Ελληνικά',
    back: 'Επιστροφη στην Αρχικη',
    badge: 'Νομικά Έγγραφα',
    title1: 'Όροι',
    title2: 'Χρήσης',
    updated: 'Τελευταία Ενημέρωση: 13 Αυγούστου 2026',
    sections: [
      {
        title: '1. Η Εταιρεία & Περιγραφή της Υπηρεσίας',
        paragraphs: [
          'Η πλατφόρμα Spotly (parkspotly.gr και mobile εφαρμογή) λειτουργεί από την εταιρεία με νόμιμη επωνυμία «SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ» (Spotly Parking Management L.P.), διακριτικό τίτλο «SPOTLY», ΑΦΜ 803339090, αριθμό ΓΕΜΗ 194898201000 και έδρα επί της οδού Ρίμινι 14, 122 43 Αιγάλεω (εφεξής «Spotly», «η Εταιρεία»).',
          'Το Spotly λειτουργεί με το μοντέλο Master Lease: οι ιδιοκτήτες χώρων στάθμευσης («Hosts») παραχωρούν τους χώρους τους στην Εταιρεία βάσει ιδιωτικού συμφωνητικού μίσθωσης, και η Εταιρεία παρέχει την υπηρεσία στάθμευσης απευθείας στους οδηγούς («Οδηγοί»). Με κάθε κράτηση, η σύμβαση παροχής υπηρεσίας στάθμευσης συνάπτεται αποκλειστικά μεταξύ του Οδηγού και της SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ — όχι απευθείας με τον Host. Η Spotly δεν ενεργεί ως μεσίτης ή αντιπρόσωπος των Hosts.',
        ],
      },
      {
        title: '2. Λογαριασμοί Χρηστών',
        paragraphs: [
          'Για να χρησιμοποιήσετε την Πλατφόρμα, πρέπει να είστε άνω των 18 ετών. Η εγγραφή απαιτεί ταυτοποίηση με email ή λογαριασμό Google/Apple, και για τους Οδηγούς την καταχώρηση των στοιχείων του οχήματος (πινακίδα, μάρκα, μοντέλο, χρώμα). Είστε υπεύθυνοι για τη διατήρηση της εμπιστευτικότητας των στοιχείων πρόσβασής σας και για όλες τις δραστηριότητες που πραγματοποιούνται μέσω του λογαριασμού σας.',
        ],
      },
      {
        title: '3. Κρατήσεις, Ακυρώσεις & Χρεώσεις Καθυστέρησης',
        bullets: [
          { label: 'Δωρεάν ακύρωση', text: 'Οι Οδηγοί μπορούν να ακυρώσουν δωρεάν μια κράτηση μόνο εντός των πρώτων 10 λεπτών από τη δημιουργία της. Μετά το διάστημα αυτό, η ακύρωση δεν είναι εφικτή.' },
          { label: 'Πρόωρη αποχώρηση', text: 'Αν ο Οδηγός αποχωρήσει πριν τη λήξη του χρόνου κράτησης, η κράτηση τερματίζεται και το υπόλοιπο ποσό πιστώνεται στο Spotly Wallet του για μελλοντικές κρατήσεις.' },
          { label: 'Υπέρβαση χρόνου', text: 'Σε περίπτωση παραμονής πέραν του συμφωνημένου χρόνου, επιβάλλεται αυτόματα χρέωση υπερημερίας ίση με το διπλάσιο της αρχικής τιμής για κάθε 30 λεπτά καθυστέρησης.' },
        ],
      },
      {
        title: '4. Υποχρεώσεις Οδηγών (Drivers)',
        bullets: [
          { label: 'Ακρίβεια Χρόνου', text: 'Ο Οδηγός υποχρεούται να αποχωρήσει από τον χώρο στάθμευσης στη λήξη του χρόνου κράτησης, διαφορετικά επιβάλλονται οι χρεώσεις καθυστέρησης της ενότητας 3.' },
          { label: 'Χρήση Χώρου', text: 'Ο χώρος πρέπει να χρησιμοποιείται αποκλειστικά για στάθμευση του δηλωθέντος οχήματος. Απαγορεύεται η αποθήκευση αντικειμένων, η διαμονή ή η εκτέλεση εργασιών.' },
          { label: 'Ασφάλιση & Ευθύνη Ζημιών', text: 'Το όχημα του Οδηγού πρέπει να διαθέτει ενεργό ασφαλιστήριο συμβόλαιο. Ο Οδηγός φέρει την αποκλειστική ευθύνη για οποιαδήποτε ζημιά προκαλέσει στον χώρο στάθμευσης, στον μηχανισμό της γκαραζόπορτας ή σε τρίτα οχήματα.' },
        ],
      },
      {
        title: '5. Υποχρεώσεις Ιδιοκτητών (Hosts)',
        bullets: [
          { label: 'Νόμιμο Δικαίωμα & Master Lease', text: 'Ο Host δηλώνει υπεύθυνα ότι έχει το νόμιμο δικαίωμα παραχώρησης του χώρου και συνάπτει με την Εταιρεία ιδιωτικό συμφωνητικό μίσθωσης (Master Lease), το οποίο υποβάλλεται στη Δήλωση Πληροφοριακών Στοιχείων Μίσθωσης της ΑΑΔΕ (myAADE/TAXISnet) πριν την ενεργοποίηση της θέσης.' },
          { label: 'Μίσθωμα', text: 'Το μίσθωμα του Host ανέρχεται στο 80% της καθαρής (προ ΦΠΑ) αξίας των εισπράξεων από την εκμετάλλευση της θέσης και εκκαθαρίζεται μηνιαίως στον δηλωμένο τραπεζικό λογαριασμό (IBAN) του.' },
          { label: 'Εξοπλισμός (Smart Entry)', text: 'Ο Host είναι υπεύθυνος για την παροχή ρεύματος και σύνδεσης Wi-Fi στον μηχανισμό απομακρυσμένου ανοίγματος του Spotly, όπου αυτός έχει εγκατασταθεί.' },
          { label: 'Διαθεσιμότητα & Πρόσβαση', text: 'Ο χώρος πρέπει να είναι καθαρός, ασφαλής και προσβάσιμος. Κατά τη διάρκεια ενεργής κράτησης, ο Host δεν πρέπει να εμποδίζει την πρόσβαση του Οδηγού.' },
        ],
      },
      {
        title: '6. Πληρωμές',
        paragraphs: [
          'Όλες οι πληρωμές διεκπεραιώνονται ηλεκτρονικά μέσω πιστοποιημένου παρόχου πληρωμών (Stripe) και εισπράττονται από την Εταιρεία, η οποία είναι ο πάροχος της υπηρεσίας στάθμευσης. Το τελικό ποσό που εμφανίζεται πριν την επιβεβαίωση της κράτησης περιλαμβάνει ΦΠΑ 24%, και το σχετικό φορολογικό παραστατικό εκδίδεται στο όνομα του Οδηγού. Η Spotly δεν αποθηκεύει στοιχεία καρτών· αυτά επεξεργάζονται αποκλειστικά από τη Stripe.',
        ],
      },
      {
        title: '7. Περιορισμός Ευθύνης',
        paragraphs: [
          'Το Spotly δεν φέρει ευθύνη για κλοπές, φθορές, ατυχήματα ή τραυματισμούς που μπορεί να προκύψουν εντός του χώρου στάθμευσης. Η στάθμευση γίνεται με αποκλειστική ευθύνη του Οδηγού (Park at your own risk). Η Spotly δεν ελέγχει εξαντλητικά τίτλους ιδιοκτησίας των χώρων· την ευθύνη νομιμότητας φέρει ο εκάστοτε Host.',
        ],
      },
      {
        title: '8. Απαγορευμένο περιεχόμενο και συμπεριφορά',
        paragraphs: [
          TERMS_EL_CORE,
          'Οι κανόνες αυτοί ισχύουν για κάθε περιεχόμενο που δημιουργούν οι χρήστες στην Πλατφόρμα, ιδίως μηνύματα στο chat μεταξύ Οδηγών και Hosts, κείμενα και φωτογραφίες καταχωρίσεων θέσεων στάθμευσης, καθώς και στοιχεία προφίλ. Απαγορεύεται επίσης η πλαστοπροσωπία άλλου προσώπου ή φορέα και η αποστολή ανεπιθύμητων μηνυμάτων (spam).',
          'Κάθε χρήστης μπορεί να αναφέρει περιεχόμενο ή άλλον χρήστη μέσα από την εφαρμογή. Μπορείτε επίσης να αποκλείσετε άλλον χρήστη, ώστε να μην επικοινωνεί μαζί σας μέσω chat και να μην εμφανίζεται στις λίστες της Πλατφόρμας.',
        ],
      },
    ],
    contactTitle: '9. Επικοινωνία',
    contactText: 'Αν έχετε απορίες σχετικά με τους Όρους Χρήσης, παρακαλούμε επικοινωνήστε μαζί μας στο',
  },
  en: {
    langLabel: 'English',
    back: 'Back to Home',
    badge: 'Legal Documents',
    title1: 'Terms of',
    title2: 'Use',
    updated: 'Last Updated: 13 August 2026',
    sections: [
      {
        title: '1. The Company & Service Description',
        paragraphs: [
          'The Spotly platform (parkspotly.gr and the mobile app) is operated by the company with the registered name «SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ» (Spotly Parking Management L.P.), trade name «SPOTLY», VAT No. EL803339090, General Commercial Registry (ΓΕΜΗ) No. 194898201000, with its registered seat at Rimini 14, 122 43 Egaleo, Greece (hereinafter “Spotly”, “the Company”).',
          'Spotly operates under a Master Lease model: parking space owners (“Hosts”) lease their spaces to the Company under a private lease agreement, and the Company provides the parking service directly to drivers (“Drivers”). For every booking, the parking service contract is formed exclusively between the Driver and SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ — not directly with the Host. Spotly does not act as a broker or agent of the Hosts.',
        ],
      },
      {
        title: '2. User Accounts',
        paragraphs: [
          'To use the Platform, you must be over 18 years old. Registration requires verification via email or a Google/Apple account, and for Drivers the registration of vehicle details (license plate, make, model, color). You are responsible for maintaining the confidentiality of your credentials and for all activity carried out through your account.',
        ],
      },
      {
        title: '3. Bookings, Cancellations & Overstay Charges',
        bullets: [
          { label: 'Free cancellation', text: 'Drivers may cancel a booking free of charge only within the first 10 minutes after it is created. After that window, cancellation is no longer possible.' },
          { label: 'Early departure', text: 'If the Driver leaves before the end of the booked time, the booking is ended and the remaining amount is credited to their Spotly Wallet for future bookings.' },
          { label: 'Overstay', text: 'If the Driver stays beyond the agreed time, an overstay charge equal to double the original rate is applied automatically for every 30 minutes of delay.' },
        ],
      },
      {
        title: '4. Driver Obligations',
        bullets: [
          { label: 'Punctuality', text: 'The Driver must vacate the parking space by the end of the booked time; otherwise, the overstay charges of section 3 apply.' },
          { label: 'Use of the Space', text: 'The space must be used exclusively for parking the declared vehicle. Storing items, residing, or carrying out works is prohibited.' },
          { label: 'Insurance & Liability', text: "The Driver's vehicle must carry an active insurance policy. The Driver bears sole responsibility for any damage caused to the parking space, the garage door mechanism, or third-party vehicles." },
        ],
      },
      {
        title: '5. Host Obligations',
        bullets: [
          { label: 'Legal Right & Master Lease', text: "The Host warrants that they have the legal right to grant use of the space and enters into a private lease agreement (Master Lease) with the Company, which is submitted to the Greek tax authority's lease declaration system (myAADE/TAXISnet) before the spot is activated." },
          { label: 'Rent', text: "The Host's rent amounts to 80% of the net (pre-VAT) value of the proceeds from the exploitation of the spot and is settled monthly to their declared bank account (IBAN)." },
          { label: 'Equipment (Smart Entry)', text: "The Host is responsible for providing power and Wi-Fi connectivity to Spotly's remote-opening device, where installed." },
          { label: 'Availability & Access', text: 'The space must be clean, safe, and accessible. During an active booking, the Host must not obstruct the Driver\'s access.' },
        ],
      },
      {
        title: '6. Payments',
        paragraphs: [
          "All payments are processed electronically through a certified payment provider (Stripe) and are collected by the Company, which is the provider of the parking service. The final amount shown before booking confirmation includes 24% VAT, and the corresponding tax document is issued in the Driver's name. Spotly does not store card details; these are processed exclusively by Stripe.",
        ],
      },
      {
        title: '7. Limitation of Liability',
        paragraphs: [
          "Spotly is not liable for theft, damage, accidents, or injuries that may occur within the parking space. Parking is at the Driver's own risk. Spotly does not exhaustively verify property titles of the spaces; responsibility for legality lies with the respective Host.",
        ],
      },
      {
        title: '8. Prohibited Content and Conduct',
        paragraphs: [
          'Prohibited content and conduct. Spotly operates a zero-tolerance policy toward objectionable content and abusive users. You must not publish or send content that is illegal, abusive, threatening, racist, sexually explicit, harassing, or that infringes third-party rights. Reports are reviewed within 24 hours. Content that breaches these Terms is removed, and accounts involved are suspended or permanently deleted, without prior notice.',
          'These rules apply to all user-generated content on the Platform, including chat messages between Drivers and Hosts, listing text and photos, and profile information. Impersonating another person or entity, and sending unsolicited messages (spam), are also prohibited.',
          'Any user may report content or another user from inside the app. You may also block another user so that they cannot message you in chat and no longer appear to you on the Platform.',
        ],
      },
    ],
    contactTitle: '9. Contact',
    contactText: 'If you have any questions about these Terms of Use, please contact us at',
  },
};
