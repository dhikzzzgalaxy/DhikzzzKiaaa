# Dhikzzz Galaxy Website

Website ini adalah landing page untuk download aplikasi premium, dikembangkan dengan React dan Tailwind CSS.

## Fitur Utama
- **Dynamic URL**: Setiap kali website dibuka atau dibagikan, URL akan menyertakan parameter unik (`?v=...`) untuk memastikan preview (appcard) di media sosial selalu segar dan terupdate.
- **Deep Linking**: Mendukung link langsung ke aplikasi tertentu menggunakan `?app=ID`.
- **Responsive Design**: Tampilan modern yang menyesuaikan dengan perangkat mobile dan desktop.

## Struktur File
- `index.html`: File utama website.
- `css/style.css`: File styling kustom.
- `js/data.js`: Berisi data aplikasi (`MOCK_APPS`) dan kategori.
- `js/app.js`: Berisi logika React dan komponen website.

## Cara Upload ke GitHub
1. Pastikan Anda berada di repositori [Dhikzzz-Galaxy](https://github.com/dhikzzzgalaxy/Dhikzzz-Galaxy).
2. Unggah semua file dan folder (`index.html`, `css/`, `js/`) ke root repositori tersebut.
3. Aktifkan **GitHub Pages** di menu Settings > Pages jika belum aktif.
4. Website akan dapat diakses melalui `https://dhikzzzgalaxy.github.io/`.

## Cara Menambah Aplikasi
Buka file `js/data.js` dan tambahkan objek baru ke dalam array `MOCK_APPS`.
