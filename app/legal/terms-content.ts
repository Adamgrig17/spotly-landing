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
    updated: 'Τελευταία Ενημέρωση: 18 Οκτωβρίου 2026',
    sections: [
      {
        title: '1. Η Εταιρεία & Περιγραφή της Υπηρεσίας',
        paragraphs: [
          'Η πλατφόρμα Spotly (parkspotly.gr, mobile εφαρμογή και web εφαρμογή στο app.parkspotly.gr) λειτουργεί από την εταιρεία με νόμιμη επωνυμία «SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ» (Spotly Parking Management L.P.), διακριτικό τίτλο «SPOTLY», ΑΦΜ 803339090, αριθμό ΓΕΜΗ 194898201000 και έδρα επί της οδού Ρίμινι 14, 122 43 Αιγάλεω (εφεξής «Spotly», «η Εταιρεία»).',
          'Το Spotly λειτουργεί με το μοντέλο Master Lease: οι ιδιοκτήτες χώρων στάθμευσης («Hosts») παραχωρούν τους χώρους τους στην Εταιρεία βάσει ιδιωτικού συμφωνητικού μίσθωσης, και η Εταιρεία παρέχει την υπηρεσία στάθμευσης απευθείας στους οδηγούς («Οδηγοί»). Με κάθε κράτηση θέσης Host, η σύμβαση παροχής υπηρεσίας στάθμευσης συνάπτεται αποκλειστικά μεταξύ του Οδηγού και της SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ — όχι απευθείας με τον Host. Η Spotly δεν ενεργεί ως μεσίτης ή αντιπρόσωπος των Hosts.',
          'Οι θέσεις ιδιωτών Hosts διέπονται από το μοντέλο Master Lease της παρούσας ενότητας. Όταν η κράτηση αφορά επαγγελματικό χώρο στάθμευσης τρίτου, ισχύουν επιπλέον οι ενότητες 10 έως 15. Η χρήση μέσω mobile εφαρμογής και μέσω web διέπεται από τους ίδιους όρους (ενότητα 9).',
        ],
      },
      {
        title: '2. Λογαριασμοί Χρηστών',
        paragraphs: [
          'Για τη δημιουργία λογαριασμού και την πραγματοποίηση κράτησης πρέπει να έχετε συμπληρώσει το 18ο έτος της ηλικίας σας· η υπηρεσία συνάπτει σύμβαση παροχής στάθμευσης και περιλαμβάνει πληρωμή.',
          'Η εγγραφή απαιτεί ταυτοποίηση με email ή λογαριασμό Google/Apple, και για τους Οδηγούς την καταχώρηση των στοιχείων του οχήματος (πινακίδα, μάρκα, μοντέλο, χρώμα). Είστε υπεύθυνοι για τη διατήρηση της εμπιστευτικότητας των στοιχείων πρόσβασής σας και για όλες τις δραστηριότητες που πραγματοποιούνται μέσω του λογαριασμού σας.',
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
      {
        title: '9. Χρήση μέσω εφαρμογής και μέσω web',
        paragraphs: [
          'Η υπηρεσία παρέχεται μέσω της mobile εφαρμογής Spotly και μέσω της web εφαρμογής στο app.parkspotly.gr. Οι παρόντες Όροι Χρήσης ισχύουν εξίσου και στα δύο κανάλια. Η επιλογή καναλιού δεν δημιουργεί διαφορετική σύμβαση ούτε διαφορετικά δικαιώματα, εκτός αν συγκεκριμένη ενότητα αναφέρει ρητά διαφορά, για παράδειγμα στις τιμές.',
        ],
      },
      {
        title: '10. Επαγγελματικοί χώροι στάθμευσης τρίτων',
        paragraphs: [
          'Εκτός από τις θέσεις ιδιωτών Hosts της ενότητας 1, η Πλατφόρμα μπορεί να εμφανίζει επαγγελματικούς χώρους στάθμευσης (γκαράζ) που ανήκουν ή λειτουργούν από τρίτους («Φορείς»).',
        ],
        bullets: [
          { label: 'Ρόλος της Spotly', text: 'Στις κρατήσεις αυτές η Spotly ενεργεί ως διαμεσολαβητής μεταξύ του Οδηγού και του Φορέα. Η Spotly δεν εκμεταλλεύεται η ίδια το γκαράζ και δεν αναλαμβάνει τη φύλαξη του οχήματος, την υπηρεσία παρκαδόρου ή την κατοχή των κλειδιών.' },
          { label: 'Ευθύνη του Φορέα', text: 'Ο Φορέας είναι υπεύθυνος για τη λειτουργία του χώρου και, όπου οι υπηρεσίες αυτές προσφέρονται, για τη φύλαξη του οχήματος, την υπηρεσία παρκαδόρου και τη διαχείριση των κλειδιών.' },
          { label: 'Αναφορά ζημιάς', text: 'Ο Οδηγός αναφέρει ζημιά που σχετίζεται με τη στάθμευση στον επαγγελματικό χώρο ως εξής: [ΣΥΜΠΛΗΡΩΣΕ: διαδικασία και προθεσμία αναφοράς ζημιάς].' },
          { label: 'Όρια ευθύνης', text: 'Για τη φύλαξη, τον παρκαδόρο και τα κλειδιά ευθύνεται ο Φορέας. [ΣΥΜΠΛΗΡΩΣΕ: όρια ευθύνης της Spotly και του Φορέα]. Η ενότητα 7 εξακολουθεί να ισχύει για όσα δεν ρυθμίζονται ειδικά εδώ.' },
          { label: 'Κανόνες του χώρου', text: 'Κάθε χώρος μπορεί να εφαρμόζει δικούς του κανόνες λειτουργίας. Ο Οδηγός οφείλει να τους τηρεί. Οι κανόνες που γνωστοποιούνται για τον συγκεκριμένο χώρο κατά την κράτηση αποτελούν μέρος της κράτησης.' },
          { label: 'Ακύρωση', text: 'Η ακύρωση ακολουθεί την ενότητα 3, εκτός αν πριν την πληρωμή εμφανίζεται διαφορετικός όρος για τον συγκεκριμένο χώρο. [ΣΥΜΠΛΗΡΩΣΕ: προθεσμία ακύρωσης επαγγελματικού χώρου, αν διαφέρει από την ενότητα 3].' },
        ],
      },
      {
        title: '11. Κατηγορία οχήματος',
        paragraphs: [
          'Κατά την κράτηση δηλώνετε την κατηγορία του οχήματος. Οι κατηγορίες είναι: Μηχανή, Μικρό, Μεσαίο, Μεγάλο/SUV και Van.',
          'Η τιμή της κράτησης εξαρτάται από την κατηγορία που δηλώνετε. Αν η δήλωση είναι ανακριβής, ο Φορέας μπορεί να αρνηθεί την είσοδο του οχήματος ή να ζητηθεί η διαφορά της τιμής που αντιστοιχεί στην πραγματική κατηγορία.',
        ],
      },
      {
        title: '12. Δέσμευση ποσού για στάθμευση χωρίς προκαθορισμένη λήξη',
        paragraphs: [
          'Σε στάθμευση χωρίς προκαθορισμένη ώρα λήξης, δεσμεύεται στην κάρτα σας το ανώτατο ποσό [ΣΥΜΠΛΗΡΩΣΕ: ανώτατο ποσό δέσμευσης]. Με τη λήξη της στάθμευσης χρεώνεται ο πραγματικός χρόνος και το υπόλοιπο της δέσμευσης αποδεσμεύεται. Ο χρόνος αποδέσμευσης εξαρτάται από την τράπεζα που εξέδωσε την κάρτα και δεν τον ορίζει η Spotly.',
          'Η διεκπεραίωση της πληρωμής γίνεται μέσω του παρόχου της ενότητας 6.',
        ],
      },
      {
        title: '13. Τιμές',
        paragraphs: [
          'Για κράτηση σε επαγγελματικό χώρο της ενότητας 10, το ποσό που εμφανίζεται πριν την πληρωμή περιλαμβάνει την τιμή του Φορέα και τη χρέωση υπηρεσίας της Spotly.',
          'Οι τιμές μπορεί να διαφέρουν ανάμεσα στην εφαρμογή και στο web (app.parkspotly.gr) και ενδέχεται να ισχύουν προσφορές. Ισχύει η τιμή που εμφανίζεται πριν την πληρωμή της συγκεκριμένης κράτησης. Η ενότητα 6 εξακολουθεί να ρυθμίζει τον τρόπο πληρωμής.',
        ],
      },
      {
        title: '14. Διαθεσιμότητα',
        paragraphs: [
          'Η διαθεσιμότητα που εμφανίζεται στην Πλατφόρμα είναι ενδεικτική. Αν ο χώρος είναι πλήρης, η κράτηση δεν ολοκληρώνεται και δεν γίνεται χρέωση.',
        ],
      },
      {
        title: '15. Ωράριο χώρου',
        paragraphs: [
          'Κάθε επαγγελματικός χώρος έχει ωράριο λειτουργίας, το οποίο εμφανίζεται στην Πλατφόρμα. Ο Οδηγός οφείλει να παραλάβει το όχημά του πριν το κλείσιμο του χώρου.',
          'Αν το όχημα δεν παραληφθεί πριν το κλείσιμο: [ΣΥΜΠΛΗΡΩΣΕ: συνέπειες αν το όχημα παραμείνει μετά το κλείσιμο].',
        ],
      },
    ],
    contactTitle: '16. Επικοινωνία',
    contactText: 'Αν έχετε απορίες σχετικά με τους Όρους Χρήσης, παρακαλούμε επικοινωνήστε μαζί μας στο',
  },
  en: {
    langLabel: 'English',
    back: 'Back to Home',
    badge: 'Legal Documents',
    title1: 'Terms of',
    title2: 'Use',
    updated: 'Last Updated: 18 October 2026',
    sections: [
      {
        title: '1. The Company & Service Description',
        paragraphs: [
          'The Spotly platform (parkspotly.gr, the mobile app, and the web app at app.parkspotly.gr) is operated by the company with the registered name «SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ» (Spotly Parking Management L.P.), trade name «SPOTLY», VAT No. EL803339090, General Commercial Registry (ΓΕΜΗ) No. 194898201000, with its registered seat at Rimini 14, 122 43 Egaleo, Greece (hereinafter “Spotly”, “the Company”).',
          'Spotly operates under a Master Lease model: parking space owners (“Hosts”) lease their spaces to the Company under a private lease agreement, and the Company provides the parking service directly to drivers (“Drivers”). For every Host-spot booking, the parking service contract is formed exclusively between the Driver and SPOTLY PARKING MANAGEMENT ΕΤΕΡΟΡΡΥΘΜΗ ΕΤΑΙΡΕΙΑ — not directly with the Host. Spotly does not act as a broker or agent of the Hosts.',
          'Private Host spots are governed by the Master Lease model in this section. When a booking is for a third-party professional parking facility, sections 10 to 15 also apply. Use through the mobile app and through the web is governed by the same terms (section 9).',
        ],
      },
      {
        title: '2. User Accounts',
        paragraphs: [
          'You must be at least 18 years old to create an account and make a booking: the service forms a parking contract and involves payment.',
          'Registration requires verification via email or a Google/Apple account, and for Drivers the registration of vehicle details (license plate, make, model, color). You are responsible for maintaining the confidentiality of your credentials and for all activity carried out through your account.',
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
      {
        title: '9. Use via the app and the web',
        paragraphs: [
          'The service is provided through the Spotly mobile app and through the web app at app.parkspotly.gr. These Terms of Use apply equally to both channels. Choosing a channel does not create a different contract or different rights, unless a specific section expressly states a difference, for example on prices.',
        ],
      },
      {
        title: '10. Third-party professional parking facilities',
        paragraphs: [
          'In addition to private Host spots under section 1, the Platform may show professional parking facilities (garages) owned or operated by third parties (“Operators”).',
        ],
        bullets: [
          { label: 'Spotly’s role', text: 'For these bookings Spotly acts as an intermediary between the Driver and the Operator. Spotly does not itself operate the garage and does not undertake custody of the vehicle, the valet service, or possession of the keys.' },
          { label: 'Operator’s responsibility', text: 'The Operator is responsible for running the facility and, where those services are offered, for custody of the vehicle, the valet service, and handling of the keys.' },
          { label: 'Damage report', text: 'The Driver reports damage related to parking at the professional facility as follows: [ΣΥΜΠΛΗΡΩΣΕ: damage-report process and deadline].' },
          { label: 'Liability limits', text: 'The Operator is responsible for custody, the valet, and the keys. [ΣΥΜΠΛΗΡΩΣΕ: liability limits of Spotly and the Operator]. Section 7 continues to apply to matters not specifically regulated here.' },
          { label: 'Facility rules', text: 'Each facility may apply its own operating rules. The Driver must follow them. The rules communicated for that facility at the time of booking form part of the booking.' },
          { label: 'Cancellation', text: 'Cancellation follows section 3, unless a different term for that facility is shown before payment. [ΣΥΜΠΛΗΡΩΣΕ: professional-facility cancellation deadline, if it differs from section 3].' },
        ],
      },
      {
        title: '11. Vehicle category',
        paragraphs: [
          'When you book, you declare the vehicle category. The categories are: Motorcycle, Small, Medium, Large/SUV, and Van.',
          'The booking price depends on the category you declare. If the declaration is inaccurate, the Operator may refuse entry of the vehicle, or the price difference for the actual category may be requested.',
        ],
      },
      {
        title: '12. Card hold for parking without a set end time',
        paragraphs: [
          'For parking without a predetermined end time, a maximum amount is authorized on your card [ΣΥΜΠΛΗΡΩΣΕ: maximum authorization amount]. When parking ends, you are charged for the actual time and the remainder of the authorization is released. The time until the release appears depends on the bank that issued the card, and Spotly does not set that time.',
          'Payment is processed through the provider in section 6.',
        ],
      },
      {
        title: '13. Prices',
        paragraphs: [
          'For a booking at a professional facility under section 10, the amount shown before payment includes the Operator’s price and the Spotly service fee.',
          'Prices may differ between the app and the web (app.parkspotly.gr), and offers may apply. The price shown before payment of that booking is the price that applies. Section 6 continues to govern how payment is processed.',
        ],
      },
      {
        title: '14. Availability',
        paragraphs: [
          'Availability shown on the Platform is indicative. If the facility is full, the booking is not completed and no charge is made.',
        ],
      },
      {
        title: '15. Facility hours',
        paragraphs: [
          'Each professional facility has opening hours, which are shown on the Platform. The Driver must collect the vehicle before the facility closes.',
          'If the vehicle is not collected before closing: [ΣΥΜΠΛΗΡΩΣΕ: consequences if the vehicle remains after closing].',
        ],
      },
    ],
    contactTitle: '16. Contact',
    contactText: 'If you have any questions about these Terms of Use, please contact us at',
  },
};
