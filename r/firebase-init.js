// firebase-init.js v3 — Fixed for GitHub Pages subfolder hosting
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

const firebaseConfig = {
    apiKey: "AIzaSyCqirD4D5ScIwRDQtiugVFLwhTHjTptacQ",
    authDomain: "reelarab-7f96c.firebaseapp.com",
    projectId: "reelarab-7f96c",
    storageBucket: "reelarab-7f96c.firebasestorage.app",
    messagingSenderId: "268246686856",
    appId: "1:268246686856:web:1a1ffcc5042cb67355933d",
    measurementId: "G-84YWY5CNCB"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Get SW URL relative to the current page — works on any GitHub Pages subfolder
// e.g. page at /reel/index.html → SW at /reel/firebase-messaging-sw.js ✅
function getSwUrl() {
    let base = window.location.href;
    if (!base.endsWith('/')) {
        if (base.includes('.html')) {
            base = base.substring(0, base.lastIndexOf('/') + 1);
        } else {
            base += '/';
        }
    }
    return base + 'firebase-messaging-sw.js';
}

async function setupNotifications() {
    try {
        if (!('serviceWorker' in navigator)) return;

        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;

        const swUrl = getSwUrl();
        console.log('[FCM v3] Registering SW at:', swUrl);

        // Step 1: Unregister any stale SWs that might be pointing to wrong paths.
        // This prevents old /firebase-cloud-messaging-push-scope SWs from interfering.
        const existingRegs = await navigator.serviceWorker.getRegistrations();
        for (const reg of existingRegs) {
            // Only unregister Firebase-default SWs (wrong root scope), not ours
            if (reg.scope.includes('firebase-cloud-messaging-push-scope')) {
                console.log('[FCM v3] Unregistering stale Firebase SW:', reg.scope);
                await reg.unregister();
            }
        }

        // Step 2: Register OUR SW at the correct path
        const registration = await navigator.serviceWorker.register(swUrl, {
            scope: './'
        });
        console.log('[FCM v3] SW registered. Scope:', registration.scope);

        // Step 3: Wait until our SW is fully ACTIVE.
        // navigator.serviceWorker.ready resolves with an active ServiceWorkerRegistration.
        // Firebase's getToken() checks if the passed registration is active —
        // if it is, it uses it directly and SKIPS its broken registerDefaultSw().
        const activeReg = await navigator.serviceWorker.ready;
        console.log('[FCM v3] SW is active. Scope:', activeReg.scope);

        // Step 4: Get FCM token using OUR active SW (bypasses Firebase's default path)
        const token = await getToken(messaging, {
            vapidKey: 'BKrBLE_lmrlP8LUherpW4NdDxFIaj_fEdRC8RXBme4o8p6T7nyLDJ9UeoUCtZdmlsHz1UR97XnJ7KPzL7QTCj48',
            serviceWorkerRegistration: activeReg
        });

        if (token) {
            console.log('[FCM v3] Token OK ✅');
            saveTokenToDatabase(token);
        }

    } catch (err) {
        console.error('[FCM v3] Error:', err.message || err);
    }
}

async function saveTokenToDatabase(token) {
    console.log('[FCM Debug] Attempting to save token...');
    
    // 1. Save to profile if logged in
    if (typeof window.getCurrentUser === 'function') {
        const user = window.getCurrentUser();
        if (user && typeof window.updateProfile === 'function') {
            await window.updateProfile({ fcm_token: token });
            localStorage.removeItem('pending_fcm_token');
            console.log('[FCM Debug] Token saved to user profile.');
        } else {
            // Save it locally so we can push it after the user logs in
            localStorage.setItem('pending_fcm_token', token);
            console.log('[FCM Debug] User not logged in, token saved to pending list.');
        }
    }

    // 2. ALWAYS save to universal 'guest_tokens' table for guests and everyone else
    try {
        if (typeof window.initSupabase === 'function') {
            const client = await window.initSupabase();
            if (client) {
                // Upsert will insert if not exists, or do nothing if it does exist
                const { error } = await client.from('guest_tokens').upsert([{ token: token }], { onConflict: 'token' });
                if (error) {
                    console.error('[FCM Debug] Supabase Upsert Error:', error);
                } else {
                    console.log('[FCM Debug] Token successfully saved to guest_tokens table!');
                }
            }
        }
    } catch (err) {
        console.error('[FCM Debug] Critical error saving guest token:', err);
    }
}

// Ensure pending tokens are saved when a user returns or logs in
window.addEventListener('load', () => {
    if (typeof window.getCurrentUser === 'function') {
        const user = window.getCurrentUser();
        const pendingToken = localStorage.getItem('pending_fcm_token');
        if (user && pendingToken && typeof window.updateProfile === 'function') {
            window.updateProfile({ fcm_token: pendingToken }).then(() => {
                localStorage.removeItem('pending_fcm_token');
                console.log('[FCM Debug] Pending token saved to profile on load.');
            });
        }
    }
});

// Foreground notifications
onMessage(messaging, async (payload) => {
    const title = payload.notification?.title || 'ReelArab';
    const body  = payload.notification?.body  || '';
    const image = payload.notification?.image || payload.data?.image || undefined;
    
    // 1. Show in-app toast
    if (typeof window.showToast === 'function') window.showToast(`${title}: ${body}`);
    
    // 2. Also show native system notification (even if app is open)
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
        const reg = await navigator.serviceWorker.ready;
        reg.showNotification(title, {
            body: body,
            icon: 'favicon.png',
            badge: 'favicon.png',
            image: image,
            data: payload.data || {}
        });
    }
});

// --- Cordova Native Push Notifications ---
document.addEventListener("deviceready", function() {
    if (window.FirebasePlugin) {
        console.log('[FCM Native] Cordova FirebasePlugin is ready.');

        // 1. Grant permission (iOS) and Get Token
        window.FirebasePlugin.grantPermission(function(hasPermission){
            if (hasPermission) {
                window.FirebasePlugin.getToken(function(token) {
                    console.log("[FCM Native] Token:", token);
                    saveTokenToDatabase(token);
                });
            }
        });

        // 2. Token refresh handler
        window.FirebasePlugin.onTokenRefresh(function(token) {
            console.log("[FCM Native] Token Refreshed:", token);
            saveTokenToDatabase(token);
        });

        // 3. Message receiver (Background click or Foreground)
        window.FirebasePlugin.onMessageReceived(function(message) {
            console.log("[FCM Native] Message received:", message);
            
            // If the user tapped the notification while the app was in the background
            if (message.tap) {
                const targetUrl = message.url || (message.data && message.data.url);
                if (targetUrl) {
                    window.location.href = targetUrl;
                }
            } else {
                // Received while app is open (Foreground)
                const title = message.title || message.notification?.title || 'ReelArab';
                const body = message.body || message.notification?.body || '';
                if (typeof showToast === 'function') {
                    showToast(`${title}: ${body}`);
                }
            }
        });
    }
}, false);

// --- Web Push Notifications ---
window.addEventListener('load', () => {
    // Only run web setup if NOT running inside Cordova
    if (!window.cordova && 'Notification' in window) {
        setTimeout(setupNotifications, 1500);
    }
});
