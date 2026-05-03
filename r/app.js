// Minimalist State Management
let currentSeries = JSON.parse(localStorage.getItem('reelar_series')) || [
    {
        id: 1,
        title: "ظلال الماضي",
        description: "عندما تعود أسرار القدامى لتهدد حاضر المدينة الهادئة.",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-looking-at-camera-44673-large.mp4",
        category: "دراما",
        isTrending: true
    },
    {
        id: 2,
        title: "طريق الحرير",
        description: "رحلة ملحمية عبر القارات بحثاً عن العدالة المفقودة.",
        poster: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-man-walking-in-the-dark-under-the-rain-44585-large.mp4",
        category: "أكشن",
        isTrending: true
    },
    {
        id: 3,
        title: "نهاية البداية",
        description: "خيال علمي يطرح سؤالاً واحداً: ماذا لو عاد الزمن بنا؟",
        poster: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-fire-in-the-dark-night-44569-large.mp4",
        category: "خيال علمي",
        isTrending: false
    }
];

if (!localStorage.getItem('reelar_series')) {
    localStorage.setItem('reelar_series', JSON.stringify(currentSeries));
}

// Navigation Logic
function switchPage(pageId, navElement) {
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');

    pages.forEach(p => p.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    if (navElement) {
        navElement.classList.add('active');
    } else {
        // Fallback for direct calls
        const navMap = { 'home': 0, 'explore': 1, 'reels': 2, 'favorites': 3, 'profile': 4 };
        if(navItems[navMap[pageId]]) navItems[navMap[pageId]].classList.add('active');
    }

    if (pageId === 'reels') renderReels();
    else if (pageId === 'favorites') renderFavorites();
    else if (pageId === 'home') renderHome();
    else if (pageId === 'explore') renderExplore();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderHome() {
    const series = JSON.parse(localStorage.getItem('reelar_series')) || [];
    const trendingGrid = document.getElementById('trending-grid');
    const newGrid = document.getElementById('new-grid');
    
    if(trendingGrid) trendingGrid.innerHTML = series.filter(s => s.isTrending).map(s => createCard(s)).join('');
    if(newGrid) newGrid.innerHTML = series.slice().reverse().map(s => createCard(s)).join('');
}

function renderExplore(filter = 'الكل') {
    const series = JSON.parse(localStorage.getItem('reelar_series')) || [];
    const categories = JSON.parse(localStorage.getItem('reelar_categories')) || ["دراما", "أكشن", "رومانسية"];
    const exploreGrid = document.getElementById('explore-grid');
    const filterContainer = document.getElementById('category-filters');
    
    // Render Filters
    if(filterContainer) {
        const allCats = ['الكل', ...categories];
        filterContainer.innerHTML = allCats.map(c => `
            <button class="btn-glass ${filter === c ? 'active-filter' : ''}" 
                    style="white-space: nowrap; ${filter === c ? 'background: var(--accent); color: black;' : ''}" 
                    onclick="renderExplore('${c}')">${c}</button>
        `).join('');
    }

    // Filter Logic
    const filtered = filter === 'الكل' ? series : series.filter(s => s.category === filter);
    
    if(exploreGrid) {
        if(filtered.length === 0) {
            exploreGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">لا توجد مسلسلات في هذا التصنيف حالياً.</p>`;
        } else {
            exploreGrid.innerHTML = filtered.map(s => createCard(s)).join('');
        }
    }
}

function renderFavorites() {
    const favs = JSON.parse(localStorage.getItem('reelar_favs')) || [];
    const grid = document.getElementById('favorites-grid');
    const empty = document.getElementById('fav-empty');
    
    if(grid) {
        if(favs.length === 0) {
            empty.style.display = 'block';
            grid.innerHTML = '';
        } else {
            empty.style.display = 'none';
            grid.innerHTML = favs.map(s => createCard(s)).join('');
        }
    }
}

function createCard(series) {
    return `
        <div class="series-card" onclick="switchPage('reels')">
            <div class="card-img-wrapper">
                <img src="${series.poster}" alt="${series.title}" loading="lazy">
                <div class="category-badge">${series.category}</div>
            </div>
            <h4>${series.title}</h4>
        </div>
    `;
}

function renderReels() {
    const series = JSON.parse(localStorage.getItem('reelar_series')) || [];
    const container = document.getElementById('reels-container');
    if(!container) return;

    container.innerHTML = series.map(s => `
        <div class="reel-item">
            <video class="reel-video" loop muted playsinline>
                <source src="${s.video}" type="video/mp4">
            </video>
            
            <div class="reel-actions">
                <div class="action-btn" onclick="toggleFavorite(${s.id}, this)">
                    <i class="fa-solid fa-bookmark" style="color: ${isFavorite(s.id) ? 'var(--accent)' : 'white'}"></i>
                    <span>حفظ</span>
                </div>
                <div class="action-btn">
                    <i class="fa-solid fa-heart"></i>
                    <span>إعجاب</span>
                </div>
                <div class="action-btn">
                    <i class="fa-solid fa-share"></i>
                    <span>مشاركة</span>
                </div>
            </div>

            <div class="reel-ui">
                <div class="reel-info">
                    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 10px;">
                        <span style="background: var(--accent); color: black; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px;">الحلقة 1 مجاناً</span>
                    </div>
                    <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 5px;">${s.title}</h2>
                    <p style="font-size: 14px; opacity: 0.8; max-width: 80%; line-height: 1.4;">${s.description}</p>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 15px; pointer-events: auto;">
                    <button class="btn btn-accent" style="flex: 1;">مشاهدة الآن</button>
                    <button class="btn btn-outline" style="flex: 1;">التفاصيل</button>
                </div>
            </div>
        </div>
    `).join('');

    setupVideoObserver();
}

function setupVideoObserver() {
    const videos = document.querySelectorAll('.reel-video');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(() => {});
                entry.target.muted = false;
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.6 });
    videos.forEach(v => observer.observe(v));
}

// Using global toggleFavorite and isFavorite from shared.js

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderHome();
});
