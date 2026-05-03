# 🗄️ Backend — Rangkuman Lengkap

Backend dibangun dengan **Laravel 11** + **SQLite** + **Laravel Sanctum** (autentikasi token).

---

## Models (Tabel Database)

| Model | Tabel | Keterangan |
|-------|-------|------------|
| `User` | `users` | Data akun pengguna |
| `Content` | `contents` | File 3D yang diupload komunitas (status: pending/approved/rejected) |
| `Module` | `modules` | Modul materi pembelajaran, diakses via `slug` |
| `PointOfInterest` | `point_of_interests` | Titik interaktif di dalam tiap modul 3D (relasi ke Module) |
| `UserProgress` | `user_progress` | Progres user per modul: POI mana yang sudah dikunjungi & status selesai |

---

## API Endpoints

### 🔐 Autentikasi (Public)

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `POST` | `/api/register` | Daftar akun baru, mengembalikan token Sanctum |
| `POST` | `/api/login` | Login, mengembalikan token Sanctum |
| `POST` | `/api/logout` | Logout, hapus semua token user *(butuh auth)* |

### 📊 Dashboard

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/dashboard` | Data agregat dashboard: user, badges, learning progress, quiz terbaru, leaderboard, daily challenges *(saat ini dummy data)* |

### 🖼️ Gallery

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/gallery` | Daftar galeri *(saat ini dummy data)* |
| `GET` | `/api/gallery/paginated` | Galeri dari DB nyata dengan paginasi, query param: `per_page` (default 12) |

### 📁 Upload & Showcase Konten 3D

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `POST` | `/api/upload` | Upload file 3D (.glb, .gltf, .obj), max 100MB, status awal `pending` |
| `GET` | `/api/showcase` | 10 konten terbaru yang sudah diapprove |
| `GET` | `/api/showcase/{limit}` | Konten approved dengan limit custom |

### 📚 Modul Pembelajaran

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/modules` | Semua modul beserta Point of Interest (POI) di dalamnya |

### 📈 Progres User *(butuh auth)*

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/progress/{slug}` | Ambil progres user untuk modul tertentu (auto-create jika belum ada) |
| `POST` | `/api/progress` | Simpan/update progres: `moduleId`, `visitedPois[]`, `completed` |

### 🛡️ Admin Panel *(butuh auth)*

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/admin/pending` | Daftar konten yang menunggu review |
| `POST` | `/api/admin/approve/{id}` | Approve konten (ubah status → approved) |
| `POST` | `/api/admin/reject/{id}` | Reject konten (ubah status → rejected) |

---

## Status Pengerjaan

| Fitur | Status |
|-------|--------|
| Autentikasi (register/login/logout) | ✅ Selesai & terhubung ke DB |
| Upload konten 3D + review admin | ✅ Selesai & terhubung ke DB |
| Showcase konten approved | ✅ Selesai & terhubung ke DB |
| Gallery paginated dari DB | ✅ Selesai & terhubung ke DB |
| Modul pembelajaran + POI | ✅ Selesai & terhubung ke DB |
| Progres user per modul | ✅ Selesai & terhubung ke DB |
| Dashboard (XP, badges, leaderboard) | ⚠️ Masih dummy data, belum terhubung DB |
| Gallery index (`/api/gallery`) | ⚠️ Masih dummy data, belum terhubung DB |

---

## Struktur Controllers

```
app/Http/Controllers/
├── Api/
│   ├── AuthController.php       # Register, Login, Logout
│   ├── DashboardController.php  # Agregat dashboard
│   └── GalleryController.php    # Gallery + paginated
├── ContentController.php        # Upload, Showcase, Admin review
├── ModuleController.php         # Modul + POI
└── UserProgressController.php   # Progres user per modul
```
