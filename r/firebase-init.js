// firebase-init.js v3.2 — Final Complete & Robust Version
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

// Helper to get correct SW URL for GitHub Pages subfolders
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
        console.log('[FCM Web] Registering SW at:', swUrl);

        // Clean up stale registrations
        const existingRegs = await navigator.serviceWorker.getRegistrations();
        for (const reg of existingRegs) {
            if (reg.scope.includes('firebase-cloud-messaging-push-scope')) {
                await reg.unregister();
            }
        }

        // Register our specific SW
        await navigator.serviceWorker.register(swUrl, { scope: './' });
        const activeReg = await navigator.serviceWorker.ready;
        
        const token = await getToken(messaging, {
            vapidKey: 'BKrBLE_lmrlP8LUherpW4NdDxFIaj_fEdRC8RXBme4o8p6T7nyLDJ9UeoUCtZdmlsHz1UR97XnJ7KPzL7QTCj48',
            serviceWorkerRegistration: activeReg
        });

        if (token) {
            console.log('[FCM Web] Token OK ✅');
            saveTokenToDatabase(token);
        }
    } catch (err) {
        console.error('[FCM Web] Error:', err);
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
            console.log('[FCM Debug] Token saved to profile.');
        } else {
            localStorage.setItem('pending_fcm_token', token);
        }
    }

    // 2. ALWAYS save to guest_tokens table
    try {
        if (typeof window.initSupabase === 'function') {
            const client = await window.initSupabase();
            if (client) {
                const { error } = await client.from('guest_tokens').upsert([{ token: token }]);
                if (error) console.error('[FCM Debug] DB Error:', error);
                else console.log('[FCM Debug] Successfully saved to guest_tokens!');
            }
        }
    } catch (err) {
        console.error('[FCM Debug] Critical DB error:', err);
    }
}

// --- Cordova Native Push Notifications ---
document.addEventListener("deviceready", function() {
    console.log('[FCM Native] Device is ready.');
    
    if (window.FirebasePlugin) {
        alert("إضافة Firebase موجودة وتعمل!");
        
        window.FirebasePlugin.grantPermission(function(hasPermission){
            if (hasPermission) {
                console.log('[FCM Native] Permission granted.');
                window.FirebasePlugin.getToken(function(token) {
                    console.log('[FCM Native] Token received:', token);
                    if (token) saveTokenToDatabase(token);
                }, function(error) {
                    console.error('[FCM Native] Token error:', error);
                });
            } else {
                alert("يرجى تفعيل صلاحية الإشعارات لكي يصلك كل جديد!");
            }
        });

        window.FirebasePlugin.onMessageReceived(function(message) {
            if (message.tap) {
                const url = message.url || (message.data && message.data.url);
                if (url) window.location.href = url;
            } else {
                const title = message.title || message.notification?.title || 'ReelArab';
                const body = message.body || message.notification?.body || '';
                if (typeof window.showToast === 'function') window.showToast(`${title}: ${body}`);
            }
        });

        window.FirebasePlugin.onTokenRefresh(function(token) {
            if (token) saveTokenToDatabase(token);
        });
    } else {
        alert("خطأ: إضافة Firebase غير موجودة في هذا التطبيق!");
    }
}, false);

// --- Web Push Notifications ---
window.addEventListener('load', () => {
    if (!window.cordova && 'Notification' in window) {
        setTimeout(setupNotifications, 1500);
    }
    const pending = localStorage.getItem('pending_fcm_token');
    if (pending && typeof window.getCurrentUser === 'function' && window.getCurrentUser()) {
        saveTokenToDatabase(pending);
    }
});

onMessage(messaging, (payload) => {
    if (typeof window.showToast === 'function') window.showToast(`${payload.notification.title}: ${payload.notification.body}`);
});
