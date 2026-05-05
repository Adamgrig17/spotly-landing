import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Αρχικοποίηση Supabase (Βεβαιώσου ότι έχεις αυτά τα env variables στο .env.local σου)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// Χρησιμοποιούμε το SERVICE_ROLE_KEY για να έχουμε δικαίωμα εγγραφής (bypasses RLS)
// Αν δεν το έχεις, βάλε το NEXT_PUBLIC_SUPABASE_ANON_KEY (αλλά θέλει σωστό RLS policy στο Supabase)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address } = body;

    // Εισαγωγή στη βάση δεδομένων, στον πίνακα 'host_submissions'
    const { data, error } = await supabase
      .from('host_submissions')
      .insert([
        { name, email, phone, address }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}