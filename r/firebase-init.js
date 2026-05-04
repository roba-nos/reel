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
    if (typeof getCurrentUser === 'function' && typeof updateProfile === 'function') {
        const user = getCurrentUser();
        if (user) {
            await updateProfile({ fcm_token: token });
            console.log('[FCM v3] Token saved to profile.');
        }
    }
}

// Foreground notifications
onMessage(messaging, async (payload) => {
    const title = payload.notification?.title || 'ReelArab';
    const body  = payload.notification?.body  || '';
    const image = payload.notification?.image || payload.data?.image || undefined;
    
    // 1. Show in-app toast
    if (typeof showToast === 'function') showToast(`${title}: ${body}`);
    
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

window.addEventListener('load', () => {
    if ('Notification' in window) {
        setTimeout(setupNotifications, 1500);
    }
});
