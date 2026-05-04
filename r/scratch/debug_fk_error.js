
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rdfbxxgzzuppexkpvwsh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Le7ZY6YDw2jS-FqpFz4XJg_WLAT_-S5';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function debugSchema() {
    console.log("--- SCHEMA DEBUG ---");
    // 1. Get one series to see column names and values
    const { data: series, error: sErr } = await supabase.from('series').select('*').limit(1);
    if (sErr) console.error("Series Fetch Error:", sErr);
    else console.log("Series Columns:", Object.keys(series[0] || {}));

    // 2. Get categories to see what's there
    const { data: cats, error: cErr } = await supabase.from('categories').select('*').limit(5);
    if (cErr) console.error("Categories Fetch Error:", cErr);
    else console.log("Sample Categories:", cats);

    // 3. Try a test insert with multiple categories to see the exact error
    const testPayload = {
        title: "FK Test " + Date.now(),
        category_name: "Action, Drama"
    };
    const { error: iErr } = await supabase.from('series').insert([testPayload]);
    if (iErr) {
        console.log("Test Insert Result (Expected Failure):", iErr.message);
        console.log("Error Details:", iErr);
    } else {
        console.log("Test Insert Succeeded! So FK allows comma-separated strings?");
    }
}

debugSchema();
