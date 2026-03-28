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
      subject: 'Καλώς ήρθες στην Early Access λίστα του Spotly! 🚗',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #121212; padding: 40px; border-radius: 16px; color: #ffffff;">
          
          <h2 style="color: #00E676; font-size: 24px; margin-bottom: 20px;">
            Είσαι επίσημα στη λίστα προτεραιότητας! 🎉
          </h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #e0e0e0;">
            Γεια σου,<br><br>
            Σε ευχαριστούμε πολύ για το ενδιαφέρον σου. Η θέση σου στη λίστα αναμονής (Early Access) του <strong>Spotly</strong> έχει κατοχυρωθεί επιτυχώς!
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #e0e0e0;">
            Εργαζόμαστε πυρετωδώς για να φέρουμε την επανάσταση στο πάρκινγκ. Ως μέλος της κοινότητάς μας, θα είσαι από τους πρώτους που θα ειδοποιηθούν όταν η εφαρμογή γίνει διαθέσιμη στην περιοχή σου, εξασφαλίζοντας αποκλειστικά προνόμια.
          </p>
          
          <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;">
          
          <p style="font-size: 14px; color: #888;">
            Φιλικά,<br>
            <strong style="color: #fff;">Άγγελος Γρηγορόπουλος</strong><br>
            Founder, Spotly
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