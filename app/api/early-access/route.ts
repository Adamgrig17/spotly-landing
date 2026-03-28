import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Σύνδεση με το Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Το email είναι υποχρεωτικό' }, { status: 400 });
    }

    // 1. ΑΠΟΘΗΚΕΥΣΗ ΣΤΟ SUPABASE (Για τη σειρά προτεραιότητας)
    const { error: dbError } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    // Κωδικός 23505 σημαίνει ότι το email υπάρχει ήδη. Δεν το θεωρούμε σφάλμα, 
    // απλά δεν το ξαναγράφουμε, αλλά του στέλνουμε το email κανονικά.
    if (dbError && dbError.code !== '23505') { 
      console.error('Σφάλμα Supabase:', dbError);
      return NextResponse.json({ error: 'Σφάλμα αποθήκευσης στη βάση' }, { status: 500 });
    }

    // 2. ΡΥΘΜΙΣΗ ΑΠΟΣΤΟΛΗΣ EMAIL (Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // To a.grigoropoulos@parkspotly.gr
        pass: process.env.EMAIL_PASS, // Ο 16-ψήφιος κωδικός
      },
    });

    // 3. ΤΟ ΜΗΝΥΜΑ ΠΟΥ ΘΑ ΠΑΕΙ ΣΤΟΝ ΧΡΗΣΤΗ
    const mailOptions = {
      from: `"Spotly" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Καλώς ήρθες στην Early Access λίστα του Spotly! 🚀',
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
            
            <h2 style="color: #fff; margin-top: 0; margin-bottom: 20px; font-size: 24px;">Είσαι επίσημα στη λίστα! 🚀</h2>
            
            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Γεια σου,<br><br>
              Σε ευχαριστούμε που γίνεσαι κομμάτι της επανάστασης στο παρκάρισμα. Η θέση σου στην <strong>Early Access</strong> λίστα του Spotly μόλις κατοχυρώθηκε με επιτυχία!
            </p>
            
            <!-- Highlight Box -->
            <div style="background-color: rgba(0, 230, 118, 0.05); border-left: 4px solid #00E676; padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 25px;">
               <p style="color: #00E676; margin: 0 0 8px 0; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Τι σημαινει αυτο για σενα;</p>
               <p style="color: #aaa; margin: 0; font-size: 14px; line-height: 1.6;">Θα είσαι από τους <strong>πρώτους</strong> που θα αποκτήσουν πρόσβαση στην εφαρμογή. Αυτό σημαίνει προτεραιότητα σε κλειστές θέσεις πάρκινγκ και αποκλειστικά προνόμια κατά το επίσημο λανσάρισμα.</p>
            </div>

            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              Ετοιμάσου να παρκάρεις με ένα κλικ στο κινητό σου, χωρίς άγχος και καθυστερήσεις. Δουλεύουμε πυρετωδώς για να σου προσφέρουμε την καλύτερη δυνατή εμπειρία.<br><br>
              Μείνε συντονισμένος, τα καλύτερα έρχονται σύντομα!
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
            © 2026 Spotly App. All rights reserved.<br>
            Αθήνα, Ελλάδα
          </p>
        </div>
      `,
    };

    // 4. ΑΠΟΣΤΟΛΗ ΤΟΥ EMAIL
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Επιτυχής εγγραφή!' });

  } catch (error: any) {
    console.error('Σφάλμα API:', error);
    return NextResponse.json({ error: 'Σφάλμα κατά την αποστολή email' }, { status: 500 });
  }
}