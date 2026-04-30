
const SUPABASE_URL = 'https://rdfbxxgzzuppexkpvwsh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Le7ZY6YDw2jS-FqpFz4XJg_WLAT_-S5';

async function checkLinks() {
    const url = `${SUPABASE_URL}/rest/v1/series?select=id,title,episodes(id,title,video_url,video,url)&title=ilike.*وادي الذئاب*`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        
        const series = await response.json();
        console.log('Raw Response:', JSON.stringify(series, null, 2));

        if (!Array.isArray(series)) {
            console.error('Expected array, got:', typeof series);
            return;
        }

        if (series.length === 0) {
            console.log('No series found with title like "وادي الذئاب".');
            return;
        }

        console.log('--- Series Link Analysis ---');
        series.forEach(s => {
            const episodes = s.episodes || [];
            const linkEps = episodes.filter(e => (e.title || '').trim().toUpperCase() === '!!LINK!!');
            console.log(`\nSeries ID ${s.id}: "${s.title}"`);
            console.log(`- Total Episodes: ${episodes.length}`);
            console.log(`- !!LINK!! Episodes Found: ${linkEps.length}`);
            linkEps.forEach(le => {
                console.log(`  -> Link target raw: ${le.video_url || le.video || le.url}`);
            });
        });
    } catch (e) {
        console.error('Fetch Error:', e);
    }
}

checkLinks();
