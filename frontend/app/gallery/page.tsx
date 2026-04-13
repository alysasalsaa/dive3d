'use client';
import React from 'react';
import Link from 'next/link';

export default function CommunityGallery() {
    return (
        // Menggunakan flex flex-col min-h-screen agar footer selalu terdorong ke bawah
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-cyan-50 font-sans">

            {/* AREA KONTEN UTAMA */}
            <main className="flex-grow p-8">
                {/* Tombol Kembali ke Beranda */}
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors duration-300 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform duration-300 transform-gpu mr-2">
                        ←
                    </span>
                    Kembali ke Beranda
                </Link>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 drop-shadow-sm">
                            Galeri Komunitas
                        </h1>
                        <p className="text-blue-700/80 mt-2 font-medium text-lg">
                            Jelajahi keindahan laut lewat karya komunitas Divexplore-3D.
                        </p>
                    </div>

                    {/* Tombol Upload */}
                    <button
                        onClick={() => alert('Pop-up UI Upload Karya akan muncul di sini!')}
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 shadow-lg transform-gpu hover:-translate-y-1"
                    >
                        + Unggah Karya
                    </button>
                </div>

                {/* Search & Filter Section */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
                    <input
                        type="text"
                        placeholder="Cari biota, karang, atau lokasi..."
                        className="flex-grow p-4 bg-gray-50 border-2 border-transparent text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                    />
                    <select
                        className="p-4 bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-colors cursor-pointer min-w-[200px]"
                    >
                        <option value="all">Semua Kategori</option>
                        <option value="coral">Terumbu Karang</option>
                        <option value="fish">Ikan & Biota Laut</option>
                        <option value="environment">Lingkungan</option>
                    </select>
                </div>

                {/* Browse Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div key={item} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform-gpu overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
                            <div className="h-56 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="text-blue-400/80 font-bold text-lg z-10 transform-gpu group-hover:scale-110 transition-transform duration-300">
                                    Karya {item}
                                </span>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                                    Keindahan Alam {item}
                                </h3>
                                <div className="flex items-center mt-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                                        P{item}
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium ml-3">
                                        Penyelam {item}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* AREA FOOTER BARU */}
            <footer className="bg-blue-950 text-blue-100 pt-16 pb-8 px-8 mt-12 border-t-4 border-cyan-500">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Kolom 1: Info Proyek */}
                    <div>
                        <h4 className="text-2xl font-bold text-white mb-4">Divexplore-3D</h4>
                        <p className="text-sm text-blue-200 leading-relaxed">
                            Platform pembelajaran konservasi laut interaktif berbasis 3D. Menjelajahi keindahan ekosistem dan biota laut Raja Ampat langsung dari layarmu.
                        </p>
                    </div>

                    {/* Kolom 2: Tautan Cepat */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Tautan Cepat</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-cyan-400 transition-colors flex items-center"><span className="mr-2">›</span> Beranda</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors flex items-center"><span className="mr-2">›</span> Modul Konservasi 3D</Link></li>
                            <li><Link href="/gallery" className="hover:text-cyan-400 transition-colors flex items-center"><span className="mr-2">›</span> Galeri Komunitas</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors flex items-center"><span className="mr-2">›</span> Tentang Kami</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Kontak & Alamat */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Hubungi Kami</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start">
                                <span className="text-cyan-400 mr-3 text-lg">📍</span>
                                <span>Kampus UNY, Karangmalang,<br />Yogyakarta</span>
                            </li>
                            <li className="flex items-center">
                                <span className="text-cyan-400 mr-3 text-lg">✉️</span>
                                <span>hello@divexplore3d.com</span>
                            </li>
                            <li className="flex items-center">
                                <span className="text-cyan-400 mr-3 text-lg">📞</span>
                                <span>+62 812 3456 7890</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="max-w-7xl mx-auto border-t border-blue-800/50 mt-12 pt-8 text-center text-sm text-blue-400/80">
                    &copy; {new Date().getFullYear()} Tim Divexplore-3D. Hak Cipta Dilindungi.
                </div>
            </footer>

        </div>
    );
}