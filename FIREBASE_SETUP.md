# Setup Firebase untuk Ziyad Template Studio

Agar website ini berfungsi (bisa upload dan lihat produk), Anda harus menghubungkannya ke Firebase Google (Gratis).

## 1. Buat Project Firebase
1. Buka [console.firebase.google.com](https://console.firebase.google.com/).
2. Klik **"Add project"** -> Beri nama "ZiyadStudio" -> Continue -> Matikan Analytics (biar cepat) -> Create Project.

## 2. Aktifkan Database (Firestore)
1. Di menu kiri, klik **Build** -> **Firestore Database**.
2. Klik **Create Database**.
3. Pilih Location (pilih `asia-southeast2` untuk Jakarta jika ada, atau `us-central` default juga oke).
4. **PENTING:** Pilih **Start in test mode**. (Ini agar Anda bisa langsung tulis/baca tanpa setting rule rumit dulu).
5. Klik **Create**.

## 3. Aktifkan Storage (Untuk Gambar)
1. Di menu kiri, klik **Build** -> **Storage**.
2. Klik **Get Started**.
3. Klik **Start in test mode** -> Next -> Done.

## 4. Dapatkan Config API Key
1. Klik icon **Gear (Pengaturan)** di sebelah kiri atas ("Project Overview").
2. Pilih **Project settings**.
3. Scroll ke bawah sampai bagian "Your apps".
4. Klik icon **</> (Web)**.
5. Beri nama App (misal: "Web Toko") -> Klik **Register app**.
6. Anda akan melihat kode `const firebaseConfig = { ... }`.
7. **Copy** bagian objek config tersebut (dari `{` sampai `}`).

## 5. Pasang di Kode
1. Buka file `public/firebase-config.js` di folder project Anda.
2. Ganti isinya dengan kode yang baru saja Anda copy. Contoh:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyB...",
     authDomain: "ziyadstudio.firebaseapp.com",
     projectId: "ziyadstudio",
     storageBucket: "ziyadstudio.firebasestorage.app",
     messagingSenderId: "...",
     appId: "..."
   };
   window.firebaseConfig = firebaseConfig;
   ```

## 6. Selesai!
Sekarang buka file `public/index.html` dan `public/admin.html` di browser.
- Gunakan `admin.html` untuk upload produk (Password: `15-zyd@2-010`).
- Lihat hasilnya muncul otomatis di `index.html`.
