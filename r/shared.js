// --- Supabase Initialization ---
const SUPABASE_URL = 'https://rdfbxxgzzuppexkpvwsh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Le7ZY6YDw2jS-FqpFz4XJg_WLAT_-S5';
let supabaseClient;
if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    if (window.location.protocol === 'file:') {
        if (!sessionStorage.getItem('reelar_protocol_warned')) {
            console.error('CRITICAL: Running via file:// protocol. Database saving WILL FAIL. Use Live Server (http://127.0.0.1:5500).');
            sessionStorage.setItem('reelar_protocol_warned', 'true');
        }
    }
} else {
    console.warn('Supabase SDK not loaded. Cloud features will be disabled.');
}

// Global Toast Helper
window.showToast = (msg, icon = 'fa-circle-check') => {
    let toast = document.getElementById('reelar-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'reelar-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
};

// --- Translation System ---
const translations = {
    ar: {
        home: "الرئيسية",
        explore: "اكتشف",
        reels: "ريلز",
        favorites: "قائمتي",
        profile: "ملفي",
        search_placeholder: "ابحث عن مسلسلك المفضل...",
        trending: "رائج الآن",
        explore_more: "استكشف المزيد",
        view_all: "مشاهدة الكل",
        points: "نقطة",
        watch_now: "شاهد الآن",
        save: "حفظ في قائمتي",
        saved: "محفوظ",
        logout: "تسجيل الخروج",
        settings: "الإعدادات",
        language: "اللغة",
        notifications: "تنبيهات الإشعارات",
        edit_profile: "تعديل الملف الشخصي",
        wallet: "المحفظة والعملات",
        watch_history: "سجل المشاهدة",
        watched_count: "مسلسلات وأفلام",
        admin_panel: "لوحة تحكم المسؤول",
        premium_upgrade: "اشترك في بريميوم <i class='fa-solid fa-crown'></i>",
        most_viewed: "الأكثر مشاهدة <i class='fa-solid fa-fire'></i>",
        top_picks: "مختارات لك",
        episodes: "الحلقات",
        comments: "التعليقات",
        add_comment: "أضف تعليقاً...",
        share: "مشاركة",
        related_series: "مسلسلات مشابهة",
        unlock_episode: "فتح الحلقة",
        buy_points: "شراء نقاط",
        reward_claimed: "تم استلام المكافأة!",
        series_ended: "تم إكمال الحلقات بنجاح",
        congrats: "شكراً للمشاهدة! <i class='fa-solid fa-circle-check'></i>",
        back_to_home: "العودة للرئيسية",
        no_favorites: "قائمتك فارغة حالياً...",
        start_watching: "ابدأ المشاهدة الآن",
        welcome_gift: "هدية ترحيبية! <i class='fa-solid fa-gift'></i>",
        claim_prize: "استلام الجائزة",
        login: "دخول",
        search_desc: "من هنا يمكنك الوصول لأي مسلسل تريده بسرعة فائقة.",
        reels_desc: "استمتع بمشاهدة مقاطع قصيرة وممتعة من أفضل المسلسلات.",
        profile_desc: "هنا يمكنك متابعة نقاطك، اشتراكك، وتغيير إعدادات حسابك.",
        next: "التالي",
        finish: "إنهاء",
        saved_items: "المسلسلات التي قمت بحفظها لمشاهدتها لاحقاً",
        explore_series: "استكشف المسلسلات",
        like: "إعجاب",
        my_activity: "نشاطي",
        premium_desc: "شاهد بدون إعلانات + نقاط مضاعفة",
        price_month: "$9.99 / شهر",
        price_week: "$2.99 / أسبوع",
        weekly_plan: "الخطة الأسبوعية",
        monthly_plan: "الخطة الشهرية",
        ad_free: "بدون إعلانات",
        double_points: "نقاط 2x",
        exclusive_content: "محتوى حصري",
        quality_4k: "جودة 4K",
        upgrade_now: "ترقية الحساب الآن",
        earn_free_points: "اكسب نقاط مجاناً!",
        watch_ad_desc: "شاهد إعلاناً قصيراً واحصل على مكافأة فورية في محفظتك",
        remaining_today: "المتبقي اليوم",
        no_ads_available: "لا توجد إعلانات حالياً",
        loading_ad: "جاري تشغيل الإعلان...",
        details: "تفاصيل",
        watch_full_series: "شاهد المسلسل بالكامل",
        series_label: "مسلسلات",
        episode: "حلقة",
        episodes_plural: "حلقات",
        unlock_episode_desc: "هذه الحلقة مغلقة. هل تريد فتحها باستخدام نقاطك؟",
        unlock_now: "فتح الحلقة الآن",
        episode_locked: "الحلقة مغلقة",
        next_episode: "الحلقة التالية",
        prev_episode: "الحلقة السابقة",
        watch_episode: "شاهد الحلقة",
        congrats_earned: "تهانينا! حصلت على نقاط!",
        discover_next: "<i class='fa-solid fa-wand-magic-sparkles'></i> اكتشف مغامرتك القادمة <i class='fa-solid fa-wand-magic-sparkles'></i>",
        regular_member: "عضو عادي",
        premium_member: "عضو بريميوم",
        admin_role: "مسؤول",
        drama: "دراما",
        movies: "أفلام سينمائية",
        movie: "فيلم",
        watch_movie: "شاهد الفيلم",
        featured_movies: "أفلام مختارة لك",
        action: "أكشن",
        romance: "رومانسية",
        view_more: "عرض المزيد",
        free: "مجاني",
        sort_newest: "الأحدث",
        sort_oldest: "الأقدم",
        sort_views: "الأكثر مشاهدة",
        sort_name: "الاسم (أ-ي)"
    },
    en: {
        home: "Home",
        explore: "Explore",
        reels: "Reels",
        favorites: "My List",
        profile: "Profile",
        search_placeholder: "Search for your favorite series...",
        trending: "Trending Now",
        explore_more: "Explore More",
        view_all: "View All",
        points: "Points",
        watch_now: "Watch Now",
        save: "Save to List",
        saved: "Saved",
        logout: "Logout",
        settings: "Settings",
        language: "Language",
        notifications: "Notifications",
        edit_profile: "Edit Profile",
        wallet: "Wallet & Coins",
        watch_history: "Watch History",
        watched_count: "Series & Movies",
        admin_panel: "Admin Panel",
        premium_upgrade: "Upgrade to Premium <i class='fa-solid fa-crown'></i>",
        most_viewed: "Most Viewed <i class='fa-solid fa-fire'></i>",
        top_picks: "Top Picks for You",
        episodes: "Episodes",
        comments: "Comments",
        add_comment: "Add a comment...",
        share: "Share",
        related_series: "Related Series",
        unlock_episode: "Unlock Episode",
        buy_points: "Buy Points",
        reward_claimed: "Reward Claimed!",
        series_ended: "Series Completed Successfully",
        congrats: "Thanks for watching! <i class='fa-solid fa-circle-check'></i>",
        back_to_home: "Back to Home",
        no_favorites: "Your list is currently empty...",
        start_watching: "Start Watching Now",
        welcome_gift: "Welcome Gift!",
        claim_prize: "Claim Prize",
        login: "Login",
        sort_newest: "Newest",
        sort_oldest: "Oldest",
        sort_views: "Most Viewed",
        sort_name: "Name (A-Z)",
        search_desc: "Find any series you want instantly from here.",
        reels_desc: "Enjoy short and fun clips from the best series.",
        profile_desc: "Track your points, subscription, and account settings here.",
        next: "Next",
        finish: "Finish",
        saved_items: "Series you've saved to watch later",
        explore_series: "Explore Series",
        like: "Like",
        my_activity: "My Activity",
        premium_desc: "Watch without ads + double points",
        price_month: "$9.99 / month",
        price_week: "$2.99 / week",
        weekly_plan: "Weekly Plan",
        monthly_plan: "Monthly Plan",
        ad_free: "Ad-free",
        double_points: "2x Points",
        exclusive_content: "Exclusive Content",
        quality_4k: "4K Quality",
        upgrade_now: "Upgrade Account Now",
        earn_free_points: "Earn Free Points!",
        watch_ad_desc: "Watch a short ad and get an instant reward in your wallet",
        remaining_today: "Remaining Today",
        no_ads_available: "No ads currently available",
        loading_ad: "Loading ad...",
        details: "Details",
        watch_full_series: "Watch Full Series",
        series_label: "Series",
        episode: "Episode",
        episodes_plural: "Episodes",
        unlock_episode_desc: "This episode is locked. Do you want to unlock it using your points?",
        unlock_now: "Unlock Now",
        episode_locked: "Episode Locked",
        next_episode: "Next Episode",
        prev_episode: "Previous Episode",
        watch_episode: "Watch Episode",
        congrats_earned: "Congrats! You earned points!",
        discover_next: "<i class='fa-solid fa-wand-magic-sparkles'></i> Discover your next adventure <i class='fa-solid fa-wand-magic-sparkles'></i>",
        regular_member: "Regular Member",
        premium_member: "VIP Member",
        admin_role: "Admin",
        drama: "Drama",
        movies: "Movies",
        movie: "Movie",
        watch_movie: "Watch Movie",
        featured_movies: "Featured Movies",
        action: "Action",
        romance: "Romance",
        view_more: "View More",
        free: "Free"
    }
};

function getCurrentLang() {
    return localStorage.getItem('reelar_lang') || 'ar';
}

function setLang(lang) {
    localStorage.setItem('reelar_lang', lang);
    applyTranslations();
}

function applyTranslations() {
    const lang = getCurrentLang();
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (t[key]) el.innerHTML = t[key];
    });

    document.querySelectorAll('[data-t-placeholder]').forEach(el => {
        const key = el.getAttribute('data-t-placeholder');
        if (t[key]) el.placeholder = t[key];
    });
}

document.addEventListener('DOMContentLoaded', applyTranslations);

// --- Cloud Database (Supabase) Management ---
const db = {
    // 1. Categories
    async getCategories(forceRefresh = false) {
        const cached = JSON.parse(localStorage.getItem('reelar_cats_cache'));
        const fetchTask = (async () => {
            try {
                const { data, error } = await supabaseClient.from('categories').select('*').order('name');
                if (!error && data) {
                    const mapped = data.map(c => ({
                        name: c.name || 'بدون اسم',
                        type: c.type || 'series'
                    }));
                    if (JSON.stringify(mapped) !== JSON.stringify(cached)) {
                        localStorage.setItem('reelar_cats_cache', JSON.stringify(mapped));
                        window.dispatchEvent(new CustomEvent('reelar-cats-updated', { detail: mapped }));
                    }
                    return mapped;
                }
            } catch (e) {}
            return cached || [];
        })();

        if (!forceRefresh && cached && cached.length > 0) {
            return cached;
        }
        return await fetchTask;
    },

    // 2. Series & Episodes
    async getSeries(forceRefresh = false) {
        // In-memory cache: fastest possible (same page session)
        if (!forceRefresh && window._seriesMemCache && window._seriesMemCache.length > 0) {
            return window._seriesMemCache;
        }

        const cachedRaw = localStorage.getItem('reelar_series_cache');
        let cached = null;
        try { cached = JSON.parse(cachedRaw); } catch(e){}

        // Cache Versioning: Force refresh if logic changed
        const cacheVer = localStorage.getItem('reelar_series_cache_ver');
        const CURRENT_VER = '2.2'; // Increment to force refresh
        if (cacheVer !== CURRENT_VER) {
            forceRefresh = true;
            localStorage.setItem('reelar_series_cache_ver', CURRENT_VER);
        }

        const needsRefresh = cached && cached.length > 0 && !cached.some(s => s.linked_ids !== undefined);
        if (needsRefresh) {
            forceRefresh = true;
        }

        const fetchTask = (async () => {
            try {
                const { data, error } = await supabaseClient
                    .from('series')
                    .select('*, episodes(id, title, video_url)')
                    .order('id', { ascending: false });

                if (!error && data) {
                    const mapped = data.map(s => {
                        const episodes = s.episodes || [];
                        const normalEps = episodes.filter(e => (e.title || '').trim().toUpperCase() !== '!!LINK!!');
                        const linkEps = episodes.filter(e => (e.title || '').trim().toUpperCase() === '!!LINK!!');
                        
                        const linkedIds = linkEps.map(e => {
                            const rawId = String(e.video_url || '');
                            const match = rawId.match(/\d+/);
                            return match ? parseInt(match[0]) : null;
                        }).filter(id => id !== null);

                        return {
                            ...s,
                            episodes_count: normalEps.length + ((s.trailer_url || s.video) ? 1 : 0),
                            links_count: linkedIds.length,
                            linked_ids: linkedIds,
                            episodes: undefined
                        };
                    });

                    // Transitive Link Resolution
                    let changed = true;
                    let iterations = 0;
                    while (changed && iterations < 5) {
                        changed = false;
                        iterations++;
                        mapped.forEach(s => {
                            mapped.forEach(other => {
                                if (s.id === other.id) return;
                                const connected = s.linked_ids.includes(other.id) || other.linked_ids.includes(s.id);
                                if (connected) {
                                    other.linked_ids.forEach(oid => {
                                        if (oid !== s.id && !s.linked_ids.includes(oid)) {
                                            s.linked_ids.push(oid);
                                            changed = true;
                                        }
                                    });
                                    if (!other.linked_ids.includes(s.id)) {
                                        other.linked_ids.push(s.id);
                                        changed = true;
                                    }
                                }
                            });
                        });
                    }

                    if (JSON.stringify(mapped) !== JSON.stringify(cached)) {
                        console.log(`[DEBUG] Series data updated from server.`);
                        localStorage.setItem('reelar_series_cache', JSON.stringify(mapped));
                        window._seriesMemCache = mapped;
                        window.dispatchEvent(new CustomEvent('reelar-series-updated', { detail: mapped }));
                    }
                    return mapped;
                }
            } catch (e) {}
            return cached || [];
        })();

        // Return localStorage cache immediately if available
        if (!forceRefresh && cached && cached.length > 0) {
            window._seriesMemCache = cached;
            return cached;
        }

        return await fetchTask;
    },

    async getSeriesById(id) {
        try {
            // 1. Try local cache first
            const allSeries = await this.getSeries();
            let found = allSeries.find(x => String(x.id) === String(id));

            // 2. If not found in cache (might be a new series or deep link), fetch directly
            if (!found) {
                console.log('Series not in cache, fetching directly from DB...');
                const { data, error } = await supabaseClient.from('series').select('*').eq('id', id).maybeSingle();
                if (!error && data) {
                    found = data;
                } else {
                    // One final attempt after 1.5s delay (in case of network hiccup)
                    await new Promise(r => setTimeout(r, 1500));
                    const { data: retryData } = await supabaseClient.from('series').select('*').eq('id', id).maybeSingle();
                    if (retryData) found = retryData;
                    else return null;
                }
            }

            // Check episodes cache first (instant)
            const epCacheKey = `reelar_eps_${id}`;
            const cachedEps = JSON.parse(localStorage.getItem(epCacheKey) || 'null');

            const mapEpisodes = (eps) => (eps || []).map(e => ({
                ...e,
                title: e.title || `حلقة ${e.order_index || ''}`,
                video: e.video_url || e.video || e.link,
                video_url: e.video_url || e.video || e.link
            }));

            // Background refresh
            const refreshEpisodes = async () => {
                try {
                    const { data } = await supabaseClient
                        .from('episodes')
                        .select('*')
                        .eq('series_id', id)
                        .order('order_index', { ascending: true });
                    if (data) localStorage.setItem(epCacheKey, JSON.stringify(data));
                } catch (e) {}
            };

            if (cachedEps && cachedEps.length > 0) {
                refreshEpisodes();
                return { ...found, episodes: mapEpisodes(cachedEps) };
            }

            // No cache: fetch and wait
            const { data: episodes } = await supabaseClient
                .from('episodes')
                .select('*')
                .eq('series_id', id)
                .order('order_index', { ascending: true });
            if (episodes) localStorage.setItem(epCacheKey, JSON.stringify(episodes));
            return { ...found, episodes: mapEpisodes(episodes) };

        } catch (err) {
            console.error('getSeriesById error:', err);
            return null;
        }
    },

    // 3. Ads
    async getAds(forceRefresh = false, includeInactive = false) {
        const cached = JSON.parse(localStorage.getItem('reelar_ads_cache'));
        const fetchTask = (async () => {
            try {
                const { data, error } = await supabaseClient.from('ads').select('*').order('created_at', { ascending: false });
                if (error) {
                    console.error('Supabase getAds Error:', error);
                    return cached || [];
                }
                if (data && data.length > 0) {
                    console.log('--- DB SCHEMA DETECTION ---');
                    console.log('Available Columns in "ads" table:', Object.keys(data[0]));
                    console.log('Sample Data:', data[0]);
                    
                    const mapped = data.map(a => {
                        // Resilient status detection
                        const isActive = (a.active !== undefined) ? a.active : 
                                         (a.is_active !== undefined) ? a.is_active : 
                                         (a.ad_data && a.ad_data.active !== undefined) ? a.ad_data.active : true;
                        
                        return { 
                            ...a.ad_data, 
                            id: a.id, 
                            active: isActive,
                            views: a.views_count || a.views || (a.ad_data ? a.ad_data.views : 0) || 0,
                            clicks: a.clicks_count || a.clicks || (a.ad_data ? a.ad_data.clicks : 0) || 0
                        };
                    });
                    localStorage.setItem('reelar_ads_cache', JSON.stringify(mapped));
                    return mapped;
                }
            } catch (e) {
                console.error('getAds Exception:', e);
            }
            return cached || [];
        })();
        const allAds = (!forceRefresh && cached && cached.length > 0) ? cached : await fetchTask;
        // In admin, we want everything. In app, only active.
        return includeInactive ? allAds : allAds.filter(a => a.active);
    },

    // 4. Site Config
    async getConfig(forceRefresh = false) {
        const cached = JSON.parse(localStorage.getItem('reelar_config_cache'));
        const fetchTask = (async () => {
            try {
                const { data, error } = await supabaseClient.from('site_config').select('*').maybeSingle();
                if (!error && data) {
                    const config = data.config_data || {};
                    if (JSON.stringify(config) !== JSON.stringify(cached)) {
                        localStorage.setItem('reelar_config_cache', JSON.stringify(config));
                        window.dispatchEvent(new CustomEvent('reelar-config-updated', { detail: config }));
                    }
                    return config;
                }
            } catch (e) {}
            return cached || getLocalAppConfig();
        })();

        if (!forceRefresh && cached) {
            return cached;
        }
        return await fetchTask;
    },

    async getAppBaseUrl() {
        const config = await this.getConfig();
        if (config && config.appDomain && config.appDomain.trim() !== '') {
            let domain = config.appDomain.trim();
            // Remove trailing slash if present
            if (domain.endsWith('/')) domain = domain.slice(0, -1);
            return domain;
        }
        // Fallback for development/local
        return window.location.origin;
    },

    // 5. Vouchers
    async getVouchers() {
        try {
            const { data, error } = await supabaseClient.from('vouchers').select('*').order('created_at', { ascending: false });
            return error ? [] : data;
        } catch (e) { return []; }
    },
    async saveVoucher(v) {
        const payload = { 
            code: v.code.toUpperCase(), 
            amount: parseFloat(v.amount), 
            is_active: v.active !== false,
            used_count: 0
        };
        if (v.id) {
            delete payload.used_count; // Don't reset usage on update
            const { error } = await supabaseClient.from('vouchers').update(payload).eq('id', v.id);
            return !error;
        } else {
            // Security: Check if code already exists
            const { data, error: checkError } = await supabaseClient.from('vouchers').select('id').eq('code', payload.code).maybeSingle();
            if (data) {
                showToast('هذا الكود موجود مسبقاً! يرجى اختيار كود آخر لضمان الأمان.', 'error');
                return false;
            }
            const { error } = await supabaseClient.from('vouchers').insert([payload]);
            if (error) console.error("Voucher Save Error:", error);
            return !error;
        }
    },
    async deleteVoucher(id) {
        const { error } = await supabaseClient.from('vouchers').delete().eq('id', id);
        return !error;
    },
    async redeemVoucherCode(code) {
        const { data, error } = await supabaseClient.from('vouchers').select('*').eq('code', code.toUpperCase()).single();
        if (error || !data) return { success: false, message: 'كود غير صالح' };
        if (data.is_active === false) return { success: false, message: 'هذا الكود معطل حالياً' };
        return { success: true, amount: data.amount, id: data.id };
    },
    async incrementVoucherUsage(id) {
        const { data } = await supabaseClient.from('vouchers').select('used_count').eq('id', id).single();
        const current = (data ? data.used_count : 0) || 0;
        await supabaseClient.from('vouchers').update({ used_count: current + 1 }).eq('id', id);
    },
    async saveSeries(s) {
        const payload = {
            title: s.title,
            type: s.type || 'series',
            category_name: s.category,
            description: s.description,
            poster_url: s.poster,
            trailer_url: s.video
        };
        try {
            let seriesId = s.id;
            if (seriesId) {
                const { error } = await supabaseClient.from('series').update(payload).eq('id', seriesId);
                if (error) {
                    console.error('Supabase Update Error:', error);
                    throw error;
                }
            } else {
                const { data, error } = await supabaseClient.from('series').insert([payload]).select().single();
                if (error) {
                    console.error('Supabase Insert Error:', error);
                    throw error;
                }
                seriesId = data.id;
            }

            // Sync Episodes
            if (s.episodes || s.linked_parts) {
                // Delete existing ones for simplicity (re-sync)
                await supabaseClient.from('episodes').delete().eq('series_id', seriesId);
                
                const finalEpisodes = [];
                
                // 1. Add normal episodes
                if (s.episodes && Array.isArray(s.episodes)) {
                    s.episodes.forEach(ep => {
                        let title = ep.title || '';
                        let season = parseInt(ep.season || 1);
                        
                        // If DB column doesn't exist, we might store season in title [S:n]
                        // But here we try to send both
                        finalEpisodes.push({
                            series_id: seriesId,
                            title: title,
                            video_url: ep.video || ep.url || ep.video_url,
                            season: season
                        });
                    });
                }

                // 2. Add linked series as special episodes
                if (s.linked_parts && Array.isArray(s.linked_parts)) {
                    s.linked_parts.forEach(targetId => {
                        finalEpisodes.push({
                            series_id: seriesId,
                            title: '!!LINK!!',
                            video_url: targetId,
                            season: 999 // High number to stay out of normal seasons
                        });
                    });
                }

                if (finalEpisodes.length > 0) {
                    const { error: epErr } = await supabaseClient.from('episodes').insert(finalEpisodes);
                    if (epErr) {
                        console.warn('Episode Insert Error (Check if season column exists):', epErr);
                        // Fallback: Try without season column if it failed
                        if (epErr.message && epErr.message.includes('season')) {
                            const fallbackEps = finalEpisodes.map(e => ({
                                series_id: e.series_id,
                                title: e.season && e.season !== 999 ? `[S:${e.season}] ${e.title}` : e.title,
                                video_url: e.video_url
                            }));
                            await supabaseClient.from('episodes').insert(fallbackEps);
                        }
                    }
                }
            }
            localStorage.removeItem('reelar_series_cache');
            return true;
        } catch (e) { console.error(e); return false; }
    },
    async deleteSeries(id) {
        const { error } = await supabaseClient.from('series').delete().eq('id', id);
        if (!error) localStorage.removeItem('reelar_series_cache');
        return !error;
    },
    async saveAd(a) {
        console.log('--- SAVING AD (DIAGNOSTIC MODE) ---');
        console.log('Target ID:', a.id);
        
        // We wrap everything in ad_data to be safe
        const payload = {
            ad_data: { 
                ...a.ad_data,
                name: String(a.name || ''),
                type: String(a.type || '')
            }
        };

        try {
            let result;
            if (a.id && a.id !== '') {
                console.log('Performing UPDATE on table "ads"...');
                result = await supabaseClient.from('ads').update(payload).eq('id', a.id);
            } else {
                console.log('Performing INSERT on table "ads"...');
                result = await supabaseClient.from('ads').insert([payload]);
            }

            if (result.error) {
                console.error('Supabase Error Object:', result.error);
                const msg = `Error ${result.error.code}: ${result.error.message}`;
                showToast("فشل الحفظ: " + msg, 'error');
                return false;
            }
            
            console.log('Save Successful!');
            localStorage.removeItem('reelar_ads_cache');
            return true;
        } catch (e) {
            console.error('CRITICAL FETCH ERROR:', e);
            if (e.message.includes('fetch')) {
                showToast("المتصفح يمنع الاتصال! يرجى تجربة متصفح آخر أو إيقاف الحماية", 'error');
            } else {
                showToast("خطأ تقني: " + e.message, 'error');
            }
            return false;
        }
    },
    async deleteAd(id) {
        const { error } = await supabaseClient.from('ads').delete().eq('id', id);
        if (!error) localStorage.removeItem('reelar_ads_cache');
        return !error;
    },
    async trackAdEvent(adId, eventType) {
        try {
            const { data, error: fetchError } = await supabaseClient.from('ads').select('*').eq('id', adId).single();
            if (fetchError || !data) return;

            // Priority: top-level column -> ad_data JSON
            const possibleColumns = [eventType, `${eventType}s`, `${eventType}_count`, `${eventType}s_count`].filter(c => c in data);
            
            if (possibleColumns.length > 0) {
                const column = possibleColumns[0];
                await supabaseClient.from('ads').update({ [column]: (data[column] || 0) + 1 }).eq('id', adId);
            } else {
                const updatedAdData = { ...data.ad_data };
                const subKey = eventType === 'view' ? 'views' : 'clicks';
                updatedAdData[subKey] = (updatedAdData[subKey] || 0) + 1;
                await supabaseClient.from('ads').update({ ad_data: updatedAdData }).eq('id', adId);
            }
            localStorage.removeItem('reelar_ads_cache');
        } catch (e) {
            console.error(`Ad Tracking Error:`, e.message);
        }
    },
    async getAdminStats() {
        try {
            const [usersCount, premiumCount, pointsSum, balanceSum] = await Promise.all([
                supabaseClient.from('profiles').select('*', { count: 'exact', head: true }),
                supabaseClient.from('profiles').select('*', { count: 'exact', head: true }).eq('is_premium', true),
                supabaseClient.from('profiles').select('points'),
                supabaseClient.from('profiles').select('wallet_balance')
            ]);

            const totalPoints = (pointsSum.data || []).reduce((acc, p) => acc + (p.points || 0), 0);
            const totalBalance = (balanceSum.data || []).reduce((acc, b) => acc + (b.wallet_balance || 0), 0);

            return {
                totalUsers: usersCount.count || 0,
                premiumUsers: premiumCount.count || 0,
                totalPoints,
                totalBalance
            };
        } catch (e) { 
            console.error("Stats fetch failed:", e);
            return { totalUsers: 0, premiumUsers: 0, totalPoints: 0, totalBalance: 0 }; 
        }
    },
    async getUsers() {
        try {
            const { data, error } = await supabaseClient.from('profiles').select('*').order('id', { ascending: false });
            return !error ? data : [];
        } catch (e) { return []; }
    },
    async saveConfig(config) {
        const { error } = await supabaseClient.from('site_config').update({ config_data: config }).eq('id', 1);
        if (!error) localStorage.setItem('reelar_config_cache', JSON.stringify(config));
        return !error;
    },
    async saveCategory(name, oldName = null) {
        if (oldName) {
            const { error } = await supabaseClient.from('categories').update({ name }).eq('name', oldName);
            return !error;
        } else {
            const { error } = await supabaseClient.from('categories').insert([{ name }]);
            return !error;
        }
    },
    async deleteCategory(name) {
        const { error } = await supabaseClient.from('categories').delete().eq('name', name);
        return !error;
    }
};

// --- User Profile & Cloud Data Sync ---
async function getUserProfile(forceRefresh = false) {
    const user = getCurrentUser();
    if (!user) return null;
    const cached = JSON.parse(localStorage.getItem(`reelar_profile_${user.id}`));
    
    const fetchTask = (async () => {
        const { data, error } = await supabaseClient.from('profiles').select('*').eq('id', user.id).single();
        if (!error && data) {
            // One-time migration for existing profiles if they have empty lists
            let needsUpdate = false;
            if ((!data.watched_ids || data.watched_ids.length === 0)) {
                const localWatched = JSON.parse(localStorage.getItem('reelar_watched_ids') || '[]');
                if (localWatched.length > 0) { data.watched_ids = localWatched; needsUpdate = true; }
            }
            if ((!data.favorites || data.favorites.length === 0)) {
                const localFavs = JSON.parse(localStorage.getItem('reelar_favorites') || '[]');
                if (localFavs.length > 0) { data.favorites = localFavs; needsUpdate = true; }
            }
            
            if (needsUpdate) {
                await supabaseClient.from('profiles').update({ 
                    watched_ids: data.watched_ids, 
                    favorites: data.favorites 
                }).eq('id', user.id);
            }

            localStorage.setItem(`reelar_profile_${user.id}`, JSON.stringify(data));
            return data;
        }
        if (error && error.code === 'PGRST116') {
             // Migration from local storage for new cloud profiles
             const localWatched = JSON.parse(localStorage.getItem('reelar_watched_ids') || '[]');
             const localFavs = JSON.parse(localStorage.getItem('reelar_favorites') || '[]');
             
             const newProfile = { 
                id: user.id, 
                email: user.email, 
                points: 50, 
                wallet_balance: 0, 
                is_premium: false, 
                favorites: localFavs, 
                watched_ids: localWatched,
                gift_claimed: false,
                tour_completed: false
             };
             await supabaseClient.from('profiles').insert([newProfile]);
             localStorage.setItem(`reelar_profile_${user.id}`, JSON.stringify(newProfile));
             return newProfile;
        }
        return cached;
    })();
    
    if (forceRefresh || !cached) return await fetchTask;
    return cached;
}

async function updateProfile(updates) {
    const user = getCurrentUser();
    if (!user) return;
    const { error } = await supabaseClient.from('profiles').update(updates).eq('id', user.id);
    if (!error) {
        const cached = JSON.parse(localStorage.getItem(`reelar_profile_${user.id}`)) || {};
        localStorage.setItem(`reelar_profile_${user.id}`, JSON.stringify({ ...cached, ...updates }));
    }
}

async function addPoints(amount) {
    const profile = await getUserProfile();
    if (!profile) return;
    const newPoints = (profile.points || 0) + amount;
    await updateProfile({ points: newPoints });
    // Force refresh cache so UI reflects changes immediately
    await getUserProfile(true);
    if (amount > 0) sendAppNotification("تمت إضافة نقاط!", `لقد حصلت على ${amount} نقطة جديدة.`);
}

async function getPoints() {
    // Always get fresh data for points to avoid stale cache
    const profile = await getUserProfile(true);
    return profile ? (profile.points || 0) : 0;
}

async function addBalance(amount) {
    const profile = await getUserProfile();
    if (!profile) return;
    const newBalance = parseFloat(((profile.wallet_balance || 0) + amount).toFixed(2));
    await updateProfile({ wallet_balance: newBalance });
    if (amount > 0) sendAppNotification("شحن رصيد بنجاح!", `تمت إضافة ${amount}$ إلى رصيدك.`);
}

async function getWalletBalance() {
    const profile = await getUserProfile();
    return profile ? (profile.wallet_balance || 0) : 0.00;
}

async function isPremium() {
    const user = getCurrentUser();
    if (user && user.role === 'admin') return true;
    const profile = await getUserProfile();
    if (!profile || !profile.is_premium) return false;
    if (profile.premium_expiry && new Date().getTime() > new Date(profile.premium_expiry).getTime()) {
        await updateProfile({ is_premium: false, premium_expiry: null });
        return false;
    }
    return true;
}

function isPremiumSync() {
    const user = getCurrentUser();
    if (!user) return false;
    if (user.role === 'admin') return true;
    const cached = JSON.parse(localStorage.getItem(`reelar_profile_${user.id}`));
    if (!cached || !cached.is_premium) return false;
    if (cached.premium_expiry && new Date().getTime() > new Date(cached.premium_expiry).getTime()) {
        return false;
    }
    return true;
}

async function setPremium(status, days = 30) {
    if (status) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + days);
        await updateProfile({ is_premium: true, premium_expiry: expiryDate.toISOString() });
    } else {
        await updateProfile({ is_premium: false, premium_expiry: null });
    }
}

async function trackUserWatch(id) {
    const profile = await getUserProfile();
    if (!profile) return;
    let watched = profile.watched_ids || [];
    if (!watched.includes(String(id))) {
        watched.push(String(id));
        await updateProfile({ watched_ids: watched });
    }
}

async function getWatchedCount() {
    const profile = await getUserProfile();
    return profile ? (profile.watched_ids || []).length : 0;
}

async function toggleFavorite(id, el) {
    const lang = getCurrentLang();
    const t = translations[lang];
    const profile = await getUserProfile();
    if (!profile) return;
    let favs = profile.favorites || [];
    const index = favs.indexOf(String(id));
    const icon = el.querySelector('i');
    const span = el.querySelector('span');
    if (index > -1) {
        favs.splice(index, 1);
        if(icon) icon.style.color = 'white';
        if(span) span.innerText = t['save'] || 'حفظ';
        el.classList.remove('active');
    } else {
        favs.push(String(id));
        if(icon) icon.style.color = 'var(--accent)';
        if(span) span.innerText = t['saved'] || 'محفوظ';
        el.classList.add('active');
    }
    await updateProfile({ favorites: favs });
    if (icon) { icon.style.transform = 'scale(1.4)'; setTimeout(() => icon.style.transform = 'scale(1)', 300); }
}

async function isFavorite(id) {
    const profile = await getUserProfile();
    return profile ? (profile.favorites || []).map(String).includes(String(id)) : false;
}

function isFavoriteSync(id) {
    const user = getCurrentUser();
    if (!user) return false;
    const cached = JSON.parse(localStorage.getItem(`reelar_profile_${user.id}`));
    if (!cached || !cached.favorites) return false;
    return cached.favorites.map(String).includes(String(id));
}

async function getFavs() {
    const profile = await getUserProfile();
    return profile ? (profile.favorites || []) : [];
}

// --- Global Helpers ---
function getLocalAppConfig() {
    return { siteName: "ReelArab", whatsapp: "966500000000", email: "support@reelar.com", welcomePoints: 50 };
}

async function getSeries(forceRefresh = false) { return await db.getSeries(forceRefresh); }
async function getSeriesById(id) { return await db.getSeriesById(id); }
async function getCategories(forceRefresh = false) { return await db.getCategories(forceRefresh); }
async function getAppConfig(forceRefresh = false) { return await db.getConfig(forceRefresh); }
async function getAds(forceRefresh = false, includeInactive = false) { return await db.getAds(forceRefresh, includeInactive); }

// --- Local Scoped Storage (for non-critical data like ad counters) ---
function getScopedKey(baseKey) {
    const user = getCurrentUser();
    return user ? `${baseKey}_${user.id}` : `${baseKey}_visitor`;
}

function getScopedData(baseKey, defaultValue) {
    const data = localStorage.getItem(getScopedKey(baseKey));
    return data !== null ? JSON.parse(data) : defaultValue;
}

function setScopedData(baseKey, value) {
    localStorage.setItem(getScopedKey(baseKey), JSON.stringify(value));
}

async function incrementView(id) {
    try {
        // Increment views_count in Supabase using RPC or direct update
        // We use a simple increment logic here
        const { data: series } = await supabaseClient.from('series').select('views_count').eq('id', id).single();
        const currentViews = (series ? series.views_count : 0) || 0;
        await supabaseClient.from('series').update({ views_count: currentViews + 1 }).eq('id', id);
    } catch (e) {
        console.error("Increment view failed:", e);
    }
}
window.incrementView = incrementView;

async function checkWelcomeGift() {
    const user = getCurrentUser();
    if (!user || !user.id) return false;
    
    // Always force refresh profile to check actual gift status from cloud
    const profile = await getUserProfile(true);
    if (profile && !profile.gift_claimed) {
        const config = await getAppConfig();
        await addPoints(config.welcomePoints || 50);
        await updateProfile({ gift_claimed: true });
        return true; 
    }
    return false;
}
window.checkWelcomeGift = checkWelcomeGift;

// Auth Helpers
async function registerUser(user) {
    const { data, error } = await supabaseClient.auth.signUp({
        email: user.email, 
        password: user.password, 
        options: { data: { full_name: user.name, role: 'user' } }
    });
    
    if (error) {
        let msg = error.message;
        if (msg === 'User already registered') msg = 'هذا البريد الإلكتروني مسجل مسبقاً';
        return { success: false, message: msg };
    }

    // Immediately create profile row so admin sees them right away
    if (data.user) {
        try {
            await supabaseClient.from('profiles').insert([{
                id: data.user.id,
                email: data.user.email,
                points: 0, // Will be updated on first visit via checkWelcomeGift if needed
                wallet_balance: 0,
                is_premium: false,
                favorites: [],
                watched_ids: []
            }]);
        } catch (e) { console.error("Profile auto-creation failed:", e); }
    }

    return { success: true, user: data.user };
}

async function authenticateUser(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) {
        let msg = error.message;
        if (msg === 'Invalid login credentials') msg = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
        if (msg === 'Email not confirmed') msg = 'يرجى تفعيل حسابك من خلال الرابط المرسل لبريدك الإلكتروني';
        return { success: false, message: msg };
    }
    // Use full_name, or fallback to the part before @ in email
    const fallbackName = data.user.email.split('@')[0];
    const userData = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.full_name || fallbackName,
        role: data.user.user_metadata.role || 'user'
    };
    localStorage.setItem('reelar_current_user', JSON.stringify(userData));
    return { success: true, user: userData };
}

function isLoggedIn() { return localStorage.getItem('reelar_current_user') !== null; }
function isAdmin() { const u = getCurrentUser(); return u && u.role === 'admin'; }
function getCurrentUser() { const u = localStorage.getItem('reelar_current_user'); return u ? JSON.parse(u) : null; }
function logout() { 
    const user = getCurrentUser();
    if (user) localStorage.removeItem(`reelar_profile_${user.id}`);
    localStorage.removeItem('reelar_current_user'); 
    supabaseClient.auth.signOut();
    window.location.href = 'login.html'; 
}

function createCard(series, isFav = false) {
    const lang = getCurrentLang();
    const t = translations[lang];
    
    const poster = getSeriesPosterUrl(series);
    const videoFallback = series.trailer_url || series.video || series.link || '';
    const title = series.title || 'No Title';
    const category = series.category_name || series.category || 'General';
    
    const isYouTube = poster && poster.includes('img.youtube.com');
    
    return `
        <div class="series-card" onclick="window.location.href='series.html?id=${series.id}'">
            <div class="card-img-wrapper" style="background: #000;">
                ${isYouTube ? `<img src="${poster}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: blur(15px) brightness(0.6); transform: scale(1.1);">` : ''}
                <img src="${poster || ''}" alt="${title}" loading="lazy" data-video="${videoFallback}" onerror="handlePosterError(this)" style="${isYouTube ? 'object-fit: contain; position: relative; z-index: 1;' : ''}">
                <div class="card-overlay" style="z-index: 2;">

                    <div class="card-play-btn">
                        <i class="fa-solid fa-play"></i>
                    </div>
                </div>
                <div class="category-badge">${category}</div>
                ${series.type === 'movie' ? `<div class="card-badge movie"><i class="fa-solid fa-film"></i> ${t['movie']}</div>` : ''}
                ${series.isHot ? `<div class="card-badge hot"><i class="fa-solid fa-fire"></i></div>` : ''}
            </div>
            <div class="card-info">
                <h4 class="card-title">${title}</h4>
            </div>
        </div>
    `;
}

async function initSite() {
    const config = await db.getConfig();
    applyTranslations();
    updateNavAuth();
    initNotificationEngine();
}

function updateNavAuth() {
    const navItems = document.querySelectorAll('.nav-item');
    const bottomNav = document.querySelector('.bottom-nav');
    if (isAdmin() && bottomNav && !bottomNav.querySelector('a[href="admin.html"]')) {
        const adminLink = document.createElement('a');
        adminLink.href = 'admin.html'; adminLink.className = 'nav-item';
        adminLink.innerHTML = '<i class="fa-solid fa-user-shield"></i><span>لوحة التحكم</span>';
        const profileLink = bottomNav.querySelector('a[href="profile.html"]');
        if (profileLink) bottomNav.insertBefore(adminLink, profileLink); else bottomNav.appendChild(adminLink);
    }
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === 'profile.html' || href === 'login.html') {
            if (isLoggedIn()) { item.setAttribute('href', 'profile.html'); item.innerHTML = '<i class="fa-solid fa-circle-user"></i><span>ملفي</span>'; }
            else { item.setAttribute('href', 'login.html'); item.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i><span>دخول</span>'; }
        }
    });
}

function showToast(msg, type = 'info') {
    let container = document.getElementById('global-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'global-toast-container';
        container.style = 'position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 10000; display: flex; flex-direction: column; gap: 10px; pointer-events: none;';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style = `
        background: ${type === 'error' ? 'rgba(229, 9, 20, 0.9)' : 'rgba(22, 22, 24, 0.9)'};
        color: white;
        padding: 12px 25px;
        border-radius: 15px;
        font-size: 14px;
        font-weight: 700;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: toastIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: auto;
    `;
    toast.innerText = msg;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = '0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

const toastStyles = document.createElement('style');
toastStyles.innerHTML = `
    @keyframes toastIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(toastStyles);

function sendAppNotification(title, body, data = {}) {
    if ("Notification" in window && Notification.permission === "granted") {
        const notif = new Notification(title, { 
            body: body, 
            icon: data.image || "https://cdn-icons-png.flaticon.com/512/3119/3119338.png",
            badge: "https://cdn-icons-png.flaticon.com/512/3119/3119338.png",
            tag: data.seriesId ? `series-${data.seriesId}` : 'general'
        });
        
        notif.onclick = function(event) {
            event.preventDefault();
            window.focus();
            if (data.seriesId) {
                window.location.href = `series.html?id=${data.seriesId}`;
            }
            notif.close();
        };
    } else {
        // Fallback to Toast with clickable action
        showToast(`${title}: ${body}`);
    }
}

async function togglePushNotifications() {
    if (!("Notification" in window)) {
        showToast("متصفحك لا يدعم التنبيهات", "error");
        return;
    }

    if (Notification.permission === "granted") {
        showToast("التنبيهات مفعلة بالفعل!");
    } else {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            showToast("تم تفعيل التنبيهات بنجاح!", "success");
            new Notification("ReelArab", { body: "شكراً لتفعيل التنبيهات! ستصلك آخر التحديثات هنا." });
        } else {
            showToast("تم رفض طلب التنبيهات", "error");
        }
    }
    updateNotificationUI();
}

function updateNotificationUI() {
    const text = document.getElementById('notif-text');
    const badge = document.getElementById('notif-status-badge');
    if (!text || !badge) return;

    if (Notification.permission === "granted") {
        text.innerText = "التنبيهات مفعلة";
        badge.style.background = "#22c55e"; // Success green
    } else if (Notification.permission === "denied") {
        text.innerText = "التنبيهات محظورة";
        badge.style.background = "#ef4444"; // Error red
    } else {
        text.innerText = "تفعيل التنبيهات";
        badge.style.background = "#fbbf24"; // Warning yellow
    }
}

function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(nav => {
        if (nav.getAttribute('href') === path) nav.classList.add('active');
        else nav.classList.remove('active');
    });
}

async function getPremiumExpiryDays() {
    const profile = await getUserProfile();
    if (!profile || !profile.is_premium || !profile.premium_expiry) return 0;
    const expiry = new Date(profile.premium_expiry);
    const now = new Date();
    const diff = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
}

// --- Global Helpers ---
async function getSeries(forceRefresh = false) {
    return await db.getSeries(forceRefresh);
}

async function getCategories(forceRefresh = false) {
    return await db.getCategories(forceRefresh);
}

async function getAds(forceRefresh = false) {
    return await db.getAds(forceRefresh);
}

async function getAppConfig(forceRefresh = false) {
    return await db.getConfig(forceRefresh);
}

async function checkNewContent() {
    const series = await getSeries();
    if (!series || series.length === 0) return;

    const lastSeenId = localStorage.getItem('reelar_last_seen_id');
    const newestSeries = series.sort((a, b) => b.id - a.id)[0];

    if (lastSeenId && newestSeries.id > parseInt(lastSeenId)) {
        sendAppNotification("✨ مسلسلات جديدة!", `تمت إضافة ${newestSeries.title} ومحتوى جديد آخر. شاهد الآن!`, {
            seriesId: newestSeries.id,
            image: newestSeries.poster_url || newestSeries.poster
        });
    }
    localStorage.setItem('reelar_last_seen_id', newestSeries.id);
}

async function showRandomRecommendations() {
    // Logic: Show 3 times a day (every 8 hours of session/visit gap)
    const lastRecTime = localStorage.getItem('reelar_last_rec_time') || 0;
    const now = Date.now();
    const eightHours = 8 * 60 * 60 * 1000;

    if (now - lastRecTime > eightHours) {
        const series = await getSeries();
        if (!series || series.length === 0) return;
        
        const random = series[Math.floor(Math.random() * series.length)];
        sendAppNotification("🎬 اقتراح لك", `ما رأيك بمشاهدة "${random.title}" اليوم؟ دراما لا تفوّت!`, {
            seriesId: random.id,
            image: random.poster_url || random.poster
        });
        localStorage.setItem('reelar_last_rec_time', now);
    }
}

async function getSeriesById(id) {
    return await db.getSeriesById(id);
}

// Initialize Engine
async function initNotificationEngine() {
    // Small delay to not overlap with welcome gift
    setTimeout(async () => {
        await checkNewContent();
        await showRandomRecommendations();
    }, 5000);

    // Periodic recommendation check every 4 hours if tab stays open
    setInterval(() => showRandomRecommendations(), 4 * 60 * 60 * 1000);
}

function trackAdEvent(adId, eventType) {
    db.trackAdEvent(adId, eventType);
}

function getPoints() {
    const user = getCurrentUser();
    if (!user) return 0;
    const profile = JSON.parse(localStorage.getItem(`reelar_profile_${user.id}`));
    return profile ? (profile.points || 0) : 0;
}

document.addEventListener('DOMContentLoaded', initSite);

// --- Auto Video Thumbnail Extractor ---
// Supports YouTube URLs and direct video files

function extractYouTubeId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Synchronous: returns best poster URL instantly (poster → YouTube thumb → empty)
function getSeriesPosterUrl(s) {
    let poster = s.poster_url || s.poster || '';
    if (typeof poster === 'string') poster = poster.trim();
    
    // If the user accidentally pasted a YouTube URL in the poster field, extract its thumb!
    const ytIdFromPoster = extractYouTubeId(poster);
    if (ytIdFromPoster) return `https://img.youtube.com/vi/${ytIdFromPoster}/hqdefault.jpg`;
    
    if (poster) return poster;
    
    const videoUrl = s.trailer_url || s.video || s.link || '';
    const ytId = extractYouTubeId(videoUrl);
    return ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '';
}

async function extractVideoFrame(videoUrl, timeSeconds = 2) {
    if (!videoUrl) return null;

    // YouTube: use their free thumbnail CDN instantly
    const ytId = extractYouTubeId(videoUrl);
    if (ytId) {
        // Try maxresdefault first, fall back to hqdefault
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img.src);
            img.onerror = () => {
                // fallback to hqdefault
                resolve(`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`);
            };
            img.src = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
        });
    }

    // Direct video files: extract frame via canvas
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.crossOrigin = 'anonymous';
        video.muted = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.src = videoUrl;

        const cleanup = () => { try { video.src = ''; } catch(e) {} };

        video.addEventListener('loadedmetadata', () => {
            video.currentTime = Math.min(timeSeconds, video.duration * 0.1);
        });

        video.addEventListener('seeked', () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth || 320;
                canvas.height = video.videoHeight || 180;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', 0.85));
            } catch(e) { resolve(null); }
            cleanup();
        });

        video.addEventListener('error', () => { resolve(null); cleanup(); });
        setTimeout(() => { resolve(null); cleanup(); }, 8000);
        video.load();
    });
}

// Called via onerror on <img> tags when poster is missing/broken
async function handlePosterError(img) {
    img.onerror = null; // prevent loop
    const videoUrl = img.getAttribute('data-video');
    if (!videoUrl) return;
    img.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e)';
    const frame = await extractVideoFrame(videoUrl);
    if (frame) {
        img.src = frame;
        img.style.background = '';
    }
}

// --- Global Audio System ---
// Silently handle missing local files and fall back to programmatic sounds
let successAudio = null;
let pointAudio = null;

try {
    successAudio = new Audio('assets/sounds/success.mp3');
    successAudio.onerror = () => { successAudio = null; };
} catch(e) {}

try {
    pointAudio = new Audio('assets/sounds/point.mp3');
    pointAudio.onerror = () => { pointAudio = null; };
} catch(e) {}

// Global click sound for all buttons and interactive elements
document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .btn, .nav-item, .card, .pill');
    if (target) playInteractionSound('click');
}, true);

function playInteractionSound(type = 'success') {
    try {
        if (type === 'success' && successAudio) {
            const node = successAudio.cloneNode();
            node.play().catch(() => playProgrammaticCelebration());
            return;
        }
        if (type === 'point' && pointAudio) {
            const node = pointAudio.cloneNode();
            node.play().catch(() => playProgrammaticSound('point'));
            return;
        }
        if (type === 'success') { playProgrammaticCelebration(); return; }
        if (type === 'point')   { playProgrammaticSound('point'); return; }
        playProgrammaticSound(type);
    } catch (e) {}
}

function playProgrammaticSound(type) {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const now = ctx.currentTime;
        osc.connect(gain); gain.connect(ctx.destination);

        if (type === 'point') {
            osc.type = 'sine'; osc.frequency.setValueAtTime(987, now);
            gain.gain.setValueAtTime(0.2, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(); osc.stop(now + 0.3);
        } else if (type === 'click') {
            osc.type = 'square'; osc.frequency.setValueAtTime(150, now);
            gain.gain.setValueAtTime(0.05, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            osc.start(); osc.stop(now + 0.05);
        } else if (type === 'nav') {
            osc.type = 'sine'; osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.2);
            gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(); osc.stop(now + 0.2);
        } else if (type === 'close') {
            osc.type = 'sine'; osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
            gain.gain.setValueAtTime(0.08, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(); osc.stop(now + 0.15);
        } else if (type === 'like') {
            osc.type = 'sine'; osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(350, now + 0.15);
            gain.gain.setValueAtTime(0.15, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(); osc.stop(now + 0.2);
        }
    } catch(e) {}
}

function playProgrammaticCelebration() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.1);
            osc.connect(gain); gain.connect(ctx.destination);
            gain.gain.setValueAtTime(0, now + i * 0.1);
            gain.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.4);
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.4);
        });
    } catch(e) {}
}

