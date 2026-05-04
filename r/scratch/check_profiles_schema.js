const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://rdfbxxgzzuppexkpvwsh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Le7ZY6YDw2jS-FqpFz4XJg_WLAT_-S5';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkProfilesSchema() {
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    if (error) {
        console.error('Error fetching profiles:', error);
    } else if (data && data.length > 0) {
        console.log('Profiles columns:', Object.keys(data[0]));
    } else {
        console.log('No profiles found or empty table.');
    }
}

checkProfilesSchema();
