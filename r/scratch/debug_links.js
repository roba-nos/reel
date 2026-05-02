
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zryskvepghpndubvymjh.supabase.co';
const supabaseKey = 'YOUR_KEY'; // I'll use the one from the project if I can find it or just use the agent's internal context

async function checkEpisodes() {
    const { data, error } = await supabase.from('episodes').select('id, series_id, title, video_url').eq('title', '!!LINK!!');
    if (error) console.error(error);
    else console.log('!!LINK!! episodes found:', data);
}
