# 🌊 DiveXplore-3D

Platform pembelajaran konservasi laut interaktif berbasis 3D. Menjelajahi keindahan ekosistem dan biota laut Raja Ampat langsung dari layar Anda dengan teknologi WebGL terkini.

## ✨ Fitur Utama

- **Eksplorasi Virtual 3D & HUD Info Panel** - Visualisasi interaktif ekosistem laut dan spesimen 3D. Dilengkapi dengan _Floating Glassmorphism HUD_ yang menyajikan data edukasi interaktif (Nama Ilmiah, Deskripsi Ekologi, dan Fakta Unik Konservasi).
- **Integrasi Cloud 3D (Hugging Face)** - Mendukung pemuatan (_streaming_) model 3D berskala raksasa (hingga ~1GB) langsung dari server _cloud_ tanpa membebani _storage_ aplikasi.
- **Optimasi Play-to-Load** - Penerapan rendering 3D berdasarkan permintaan (_On-Demand Rendering_) untuk mencegah _lag_ dan kebocoran memori (RAM) pada browser pengguna.
- **Galeri Komunitas** - Platform sosial berbagi karya foto/video keindahan laut dan kegiatan pelestarian.
- **Dashboard Pembelajaran (LMS)** - Sistem _gamification_ terpadu dengan XP, level, Lencana Penghargaan 3D yang bisa diputar, _leaderboard_, dan kuis evaluasi otomatis.

## 🛠️ Teknologi

### Backend

- **Laravel 12** - PHP Framework
- **Supabase (PostgreSQL)** - Database utama berbasis *cloud* yang tangguh
- **REST API** - Komunikasi data mulus antara Frontend dan Backend

### Frontend

- **Next.js 16** - React Framework (App Router)
- **Tailwind CSS 4** - Styling & Glassmorphism UI
- **@react-three/fiber & @react-three/drei** - Engine 3D Rendering & Controls
- **Framer Motion** - Animasi mikro dan transisi halus

## 🚀 Cara Menjalankan (Localhost)

### Backend (Laravel)

```bash
# Masuk ke root directory
# Install dependencies
composer install

# Jalankan migrations
php artisan migrate

# Jalankan server
php artisan serve
```

Server backend akan berjalan di `http://localhost:8000`

### Frontend (Next.js)

```bash
cd frontend

# Install dependencies (termasuk framer-motion, three.js, dll)
npm install

# Jalankan development server
npm run dev
```

Aplikasi frontend akan berjalan di `http://localhost:3000`

## 📁 Struktur Folder Utama

```
dive3d/
├── app/                    # Laravel app (Backend)
│   ├── Http/Controllers/   # API Controllers
│   └── Models/             # Eloquent Models
├── database/               # Database migrations & seeders
├── frontend/               # Next.js app (Frontend)
│   ├── app/
│   │   ├── akademi/        # LMS dan 3D Viewer Interaktif + HUD
│   │   ├── gallery/        # Galeri komunitas
│   │   └── dashboard/      # Gamifikasi dan Lencana 3D
│   └── components/         # Komponen global (ModelViewer, BadgeViewer, Navbar)
└── public/
    └── models/             # Model 3D lokal (.glb/.gltf)
```

## 🔗 Direktori Halaman Frontend

| Halaman           | URL                               | Keterangan                                                |
| ----------------- | --------------------------------- | --------------------------------------------------------- |
| **Beranda**       | `http://localhost:3000`           | Landing page perkenalan platform                          |
| **Akademi**       | `http://localhost:3000/akademi`   | Pusat pembelajaran: LMS Modul & Ruang 3D Interaktif       |
| **Galeri**        | `http://localhost:3000/gallery`   | Area berbagi karya antar sesama penyelam/pengguna         |
| **Dashboard**     | `http://localhost:3000/dashboard` | Panel personal, daftar XP, progres, dan statistik         |
| **Koleksi Trofi** | `http://localhost:3000/trophy`    | Lemari piala 3D untuk setiap lencana yang berhasil diraih |

## 👥 Tim Pengembangan

Dikembangkan penuh cinta oleh **Tim DiveXplore-3D** - J Teknologi Informasi UNY (2026).

## Lisensi

MIT License
