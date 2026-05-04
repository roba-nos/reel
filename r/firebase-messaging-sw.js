importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCqirD4D5ScIwRDQtiugVFLwhTHjTptacQ",
    authDomain: "reelarab-7f96c.firebaseapp.com",
    projectId: "reelarab-7f96c",
    storageBucket: "reelarab-7f96c.firebasestorage.app",
    messagingSenderId: "268246686856",
    appId: "1:268246686856:web:1a1ffcc5042cb67355933d",
    measurementId: "G-84YWY5CNCB"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background / closed app notifications
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Background message received:', payload);

    // If the payload already has a 'notification' object, Firebase SDK will automatically display it!
    // We only need to manually show it if it's a data-only message.
    if (!payload.notification) {
        const notificationTitle = payload.data?.title || 'ReelArab';
        const notificationOptions = {
            body: payload.data?.body || '',
            icon: 'favicon.png',
            badge: 'favicon.png',
            image: payload.data?.image || undefined,
            data: payload.data || {},
            ...(payload.data?.url && { data: { url: payload.data.url } })
        };
        self.registration.showNotification(notificationTitle, notificationOptions);
    }
});

// Open the app or a specific URL when the notification is clicked
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    // Default to the current scope rather than root of the domain
    const url = event.notification.data?.url || self.registration.scope;
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // If a window is already open, focus it and navigate to the URL
            for (const client of windowClients) {
                if (client.url.includes(self.registration.scope) && 'focus' in client) {
                    client.focus();
                    // Navigate the open window to the new URL
                    if ('navigate' in client && client.url !== url) {
                        return client.navigate(url);
                    }
                    return;
                }
            }
            // Otherwise open a new window
            if (clients.openWindow) return clients.openWindow(url);
        })
    );
});
