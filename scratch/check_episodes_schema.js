
const SUPABASE_URL = 'https://rdfbxxgzzuppexkpvwsh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Le7ZY6YDw2jS-FqpFz4XJg_WLAT_-S5';

async function checkSchema() {
    // Get a sample episode to see columns
    const url = `${SUPABASE_URL}/rest/v1/episodes?select=*&limit=1`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        
        const data = await response.json();
        if (data && data.length > 0) {
            console.log('Available Columns in "episodes":', Object.keys(data[0]));
            console.log('Sample Episode:', data[0]);
        } else {
            console.log('No episodes found to check schema.');
        }
    } catch (e) {
        console.error('Fetch Error:', e);
    }
}

checkSchema();
