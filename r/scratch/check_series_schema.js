
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rdfbxxgzzuppexkpvwsh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Le7ZY6YDw2jS-FqpFz4XJg_WLAT_-S5';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkSchema() {
    console.log("Checking 'series' table schema...");
    const { data, error } = await supabase.from('series').select('*').limit(1);
    if (error) {
        console.error("Error fetching series:", error);
    } else if (data && data.length > 0) {
        console.log("Columns in 'series' table:", Object.keys(data[0]));
        console.log("Sample row:", data[0]);
    } else {
        console.log("Series table is empty.");
        // Try to insert a dummy row to see what happens
        const { error: insError } = await supabase.from('series').insert([{ title: 'Schema Test' }]);
        if (insError) {
            console.error("Insert failed, maybe missing columns?", insError);
        }
    }
}

checkSchema();
