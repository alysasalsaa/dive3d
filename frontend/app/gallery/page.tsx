'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  likes: number;
  author: string;
  description: string;
}

export default function CommunityGallery() {
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/gallery')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setGalleryItems(data.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching gallery:", err);
                setLoading(false);
            });
    }, []);
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-cyan-50 font-sans">

            {/* GLOBAL NAVBAR (SAMA DENGAN BERANDA) */}
            <nav className="fixed top-0 w-full z-50 px-6 py-5 flex justify-between items-center transition-all">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <span className="text-xl text-white">🌊</span>
                    </div>
                    <span className="text-xl font-black tracking-widest text-blue-900">DIVEXPLORE</span>
                </div>

                <div className="hidden md:flex items-center gap-1 bg-white/40 backdrop-blur-2xl p-1.5 rounded-full border border-blue-100 shadow-xl">
                    <Link href="/" className="px-6 py-2 rounded-full hover:bg-white/50 text-gray-600 hover:text-blue-600 transition-all text-sm font-semibold">Beranda</Link>
                    <Link href="/gallery" className="px-6 py-2 rounded-full bg-blue-600 text-white font-bold text-sm shadow-md">Galeri</Link>
                    <Link href="/dashboard" className="px-6 py-2 rounded-full hover:bg-white/50 text-gray-600 hover:text-blue-600 transition-all text-sm font-semibold">Dashboard</Link>
                    <Link href="/tutorial" className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-600/20 transition-all">
                        Mulai Belajar
                    </Link>
                </div>
            </nav>

            {/* KONTEN UTAMA - Ditambahkan padding top agar tidak tertutup Navbar */}
            <main className="flex-grow pt-32 p-8">
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
                    <select className="p-4 bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-colors cursor-pointer min-w-[200px]">
                        <option value="all">Semua Kategori</option>
                        <option value="coral">Terumbu Karang</option>
                        <option value="fish">Ikan & Biota Laut</option>
                        <option value="environment">Lingkungan</option>
                    </select>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-blue-600 font-semibold animate-pulse">Menyelam mencari karya...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {galleryItems.map((item) => (
                            <div key={item.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform-gpu overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
                                <div className="h-56 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center relative overflow-hidden">
                                    <img src={item.image} alt={item.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full">
                                        {item.category}
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col justify-between h-40">
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 line-clamp-1">{item.title}</h3>
                                        <p className="text-sm text-gray-500 font-medium mt-1">oleh {item.author}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-3 border-t border-gray-50 pt-3">
                                        <p className="text-xs text-gray-400 line-clamp-1 flex-1 mr-2">{item.description}</p>
                                        <div className="flex items-center text-rose-500 text-sm font-bold bg-rose-50 px-2 py-1 rounded-lg">
                                            <span className="mr-1">❤️</span> {item.likes}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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