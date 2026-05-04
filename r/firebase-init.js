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

function getSwUrl() {
    const base = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
    return base + 'firebase-messaging-sw.js';
}

async function setupNotifications() {
    try {
        if (!('serviceWorker' in navigator)) return;
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;
        const swUrl = getSwUrl();
        console.log('[FCM v3] Registering SW at:', swUrl);
        const existingRegs = await navigator.serviceWorker.getRegistrations();
        for (const reg of existingRegs) {
            if (reg.scope.includes('firebase-cloud-messaging-push-scope')) {
                await reg.unregister();
            }
        }
        const registration = await navigator.serviceWorker.register(swUrl, { scope: './' });
        const activeReg = await navigator.serviceWorker.ready;
        console.log('[FCM v3] SW active:', activeReg.scope);
        const token = await getToken(messaging, {
            vapidKey: 'BKrBLE_lmrlP8LUherpW4NdDxFIaj_fEdRC8RXBme4o8p6T7nyLDJ9UeoUCtZdmlsHz1UR97XnJ7KPzL7QTCj48',
            serviceWorkerRegistration: activeReg
        });
        if (token) { console.log('[FCM v3] Token OK ✅'); saveTokenToDatabase(token); }
    } catch (err) { console.error('[FCM v3] Error:', err.message || err); }
}

async function saveTokenToDatabase(token) {
    if (typeof getCurrentUser === 'function' && typeof updateProfile === 'function') {
        const user = getCurrentUser();
        if (user) { await updateProfile({ fcm_token: token }); }
    }
}

onMessage(messaging, (payload) => {
    const title = payload.notification?.title || 'ReelArab';
    const body  = payload.notification?.body  || '';
    if (typeof showToast === 'function') showToast(`${title}: ${body}`);
});

window.addEventListener('load', () => {
    if ('Notification' in window) setTimeout(setupNotifications, 1500);
});
