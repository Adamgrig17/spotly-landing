import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Αρχικοποίηση Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Αρχικοποίηση Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address } = body;

    if (!email || !name || !phone || !address) {
      return NextResponse.json({ error: 'Όλα τα πεδία είναι υποχρεωτικά' }, { status: 400 });
    }

    // 1. ΑΠΟΘΗΚΕΥΣΗ ΣΤΟ SUPABASE
    const { error: dbError } = await supabase
      .from('host_submissions')
      .insert([{ name, email, phone, address }]);

    if (dbError) {
      console.error('Σφάλμα Supabase:', dbError);
      return NextResponse.json({ error: 'Σφάλμα αποθήκευσης στη βάση' }, { status: 500 });
    }

    // 2. ΑΠΟΣΤΟΛΗ EMAIL ΜΕΣΩ RESEND (Anti-Spam & Εγγυημένο Inbox)
    try {
      await resend.emails.send({
        // ΠΡΟΣΟΧΗ: Εδώ βάζεις το verified domain σου. π.χ. hello@parkspotly.gr ή info@parkspotly.gr
        from: 'Spotly <noreply@parkspotly.gr>', 
        to: email,
        subject: 'Η αίτησή σου καταχωρήθηκε! Καλώς ήρθες στο Spotly 🚀',
        html: `
          <div style="background-color: #050505; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; color: #fff;">
            
            <!-- Header / Logo -->
            <div style="margin-bottom: 30px;">
              <img src="https://parkspotly.gr/logo.png" width="70" style="border-radius: 16px; margin-bottom: 15px; border: 1px solid rgba(0, 230, 118, 0.2); box-shadow: 0 0 20px rgba(0, 230, 118, 0.2);" alt="Spotly Logo">
              <h1 style="color: #ffffff; font-size: 32px; font-weight: 900; margin: 0; letter-spacing: -1px;">Spotly</h1>
              <p style="color: #00E676; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-top: 5px;">Park Smart. Earn Easy.</p>
            </div>

            <!-- Main Content Card -->
            <div style="background-color: #121212; border: 1px solid #333; border-radius: 24px; padding: 40px; max-width: 500px; margin: 0 auto; text-align: left;">
              
              <h2 style="color: #fff; margin-top: 0; margin-bottom: 20px; font-size: 24px;">Γεια σου, ${name}! 👋</h2>
              
              <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                Λάβαμε επιτυχώς τα στοιχεία σου και την αίτησή σου για να γίνεις Host στο Spotly. Σε ευχαριστούμε για το ενδιαφέρον σου να αξιοποιήσεις τον χώρο σου στη διεύθυνση <strong>${address}</strong>.
              </p>
              
              <!-- Highlight Box -->
              <div style="background-color: rgba(0, 230, 118, 0.05); border-left: 4px solid #00E676; padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 25px;">
                 <p style="color: #00E676; margin: 0 0 8px 0; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Τι ακολουθει τωρα;</p>
                 <p style="color: #aaa; margin: 0; font-size: 14px; line-height: 1.6;">Η ομάδα μας εξετάζει τα στοιχεία του χώρου σου. Θα σε καλέσουμε άμεσα στο τηλέφωνο επικοινωνίας (<strong>${phone}</strong>) για να συζητήσουμε τις λεπτομέρειες και να προχωρήσουμε στην ένταξή σου!</p>
              </div>

              <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                Είμαστε πολύ ενθουσιασμένοι που κάνεις το πρώτο βήμα. Το άδειο σου πάρκινγκ ετοιμάζεται να γίνει η νέα σου πηγή παθητικού εισοδήματος.<br><br>
                Τα λέμε σύντομα!
              </p>

              <hr style="border: none; border-top: 1px dashed #333; margin: 30px 0;">
              
              <!-- Signature -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                      <td width="50" style="padding-right: 15px;">
                          <img src="https://ui-avatars.com/api/?name=Αδαμάντιος+Γρηγορόπουλος&background=222&color=00E676&bold=true" width="50" height="50" style="border-radius: 50%;" alt="Adamantios">
                      </td>
                      <td>
                          <p style="margin: 0; color: #fff; font-weight: bold; font-size: 16px;">Αδαμάντιος Γρηγορόπουλος</p>
                          <p style="margin: 0; color: #888; font-size: 13px;">Founder & CEO, Spotly</p>
                      </td>
                  </tr>
              </table>
            </div>
            
            <!-- Footer -->
            <p style="color: #555; font-size: 11px; margin-top: 30px; text-transform: uppercase; letter-spacing: 1px;">
              © ${new Date().getFullYear()} Spotly App. All rights reserved.<br>
              Αθήνα, Ελλάδα
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Σφάλμα Resend:', emailError);
      // Το request συνεχίζει και πετυχαίνει γιατί τα δεδομένα μπήκαν στη βάση!
    }

    return NextResponse.json({ success: true, message: 'Επιτυχής υποβολή!' });

  } catch (error: any) {
    console.error('Σφάλμα API:', error);
    return NextResponse.json({ error: 'Εσωτερικό σφάλμα διακομιστή' }, { status: 500 });
  }
}