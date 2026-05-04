// Firebase Initialization & Messaging Logic
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Function to request permission and get token
async function setupNotifications() {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await getToken(messaging, { 
                vapidKey: 'BKrBLE_lmrlP8LUherpW4NdDxFIaj_fEdRC8RXBme4o8p6T7nyLDJ9UeoUCtZdmlsHz1UR97XnJ7KPzL7QTCj48'
            });
            
            if (token) {
                console.log('FCM Token:', token);
                saveTokenToDatabase(token);
            }
        }
    } catch (error) {
        console.error('Notification Setup Error:', error);
    }
}

async function saveTokenToDatabase(token) {
    // Save to Supabase if user is logged in
    if (typeof getCurrentUser === 'function') {
        const user = getCurrentUser();
        if (user && typeof updateProfile === 'function') {
            await updateProfile({ fcm_token: token });
            console.log('Token saved to profile');
        }
    }
}

// Handle messages when app is in foreground
onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    if (typeof showToast === 'function') {
        showToast(`${payload.notification.title}: ${payload.notification.body}`);
    }
});

// Trigger setup on load
window.addEventListener('load', () => {
    // Check if browser supports notifications
    if ('Notification' in window) {
        setupNotifications();
    }
});
