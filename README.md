# 🌊 DiveXplore-3D

Platform pembelajaran konservasi laut interaktif berbasis 3D. Menjelajahi keindahan ekosistem dan biota laut Raja Ampat langsung dari layar Anda.

## ✨ Fitur Utama

- **Eksplorasi Virtual 3D** - Visualization interaktif ekosistem laut Raja Ampat dengan model 3D terumbu karang
- **Galeri Komunitas** - Platform berbagi karya tentang keindahan dan konservasi laut
- **Dashboard Pembelajaran** - Sistem gamifikasi dengan XP, level, badges, leaderboard, dan reward
- **Materi Konservasi** - Pembelajaran tentang ekosistem laut, biota laut, terumbu karang, dan dampak sampah laut

## 🛠️ Teknologi

### Backend
- **Laravel 11** - PHP Framework
- **SQLite** - Database
- **REST API** - Untuk komunikasi frontend-backend

### Frontend
- **Next.js 14** - React Framework
- **Tailwind CSS 4** - Styling
- **@react-three/fiber** - 3D Rendering
- **Model Viewer** - Komponen untuk menampilkan model 3D

## 🚀 Cara Menjalankan

### Backend (Laravel)

```bash
# Install dependencies
composer install

# Jalankan migrations
php artisan migrate

# Jalankan server
php artisan serve
```

Server akan berjalan di `http://localhost:8000`

### Frontend (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📁 Struktur Folder

```
dive3d/
├── app/                    # Laravel app (Backend)
│   ├── Http/Controllers/   # API Controllers
│   └── Models/             # Eloquent Models
├── database/               # Database migrations & seeders
├── frontend/               # Next.js app (Frontend)
│   ├── app/
│   │   ├── page.tsx        # Landing page
│   │   ├── gallery/        # Galeri komunitas
│   │   └── dashboard/      # Dashboard pengguna
│   └── components/         # Komponen reusable
└── public/
    └── models/             # Model 3D (.glb/.gltf)
```

## 🔗 Link Halaman

| Halaman | URL |
|---------|-----|
| Beranda | `http://localhost:3000` |
| Galeri | `http://localhost:3000/gallery` |
| Dashboard | `http://localhost:3000/dashboard` |

## 👥 Tim Pengembangan

Tim DiveXplore-3D - Teknologi Informasi UNY

## Lisensi

MIT License