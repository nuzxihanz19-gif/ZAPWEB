// Konfigurasi Firebase Anda
// Salin config dari Firebase Console -> Project Settings -> General -> Your apps -> SDK Setup and Configuration (NPM/CDN)
const firebaseConfig = {
    apiKey: "GANTI_DENGAN_API_KEY_ANDA",
    authDomain: "PROJECT_ID.firebaseapp.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.firebasestorage.app",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

// Export agar bisa dipakai di file lain jika menggunakan module,
// tapi untuk script tag biasa, variabel ini akan global.
window.firebaseConfig = firebaseConfig;
