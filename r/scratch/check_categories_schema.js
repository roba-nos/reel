
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rdfbxxgzzuppexkpvwsh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Le7ZY6YDw2jS-FqpFz4XJg_WLAT_-S5';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkCategoriesSchema() {
    console.log("Checking 'categories' table schema...");
    const { data, error } = await supabase.from('categories').select('*').limit(1);
    if (error) {
        console.error("Error fetching categories:", error);
    } else if (data && data.length > 0) {
        console.log("Columns in 'categories' table:", Object.keys(data[0]));
        console.log("Sample category:", data[0]);
    } else {
        console.log("Categories table is empty.");
    }
}

checkCategoriesSchema();
