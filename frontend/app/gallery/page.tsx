'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 1. DATA PALSU (Mock Data) untuk simulasi pencarian
const CATEGORIES = [
    { value: 'all', label: 'Semua' },
    { value: 'coral', label: 'Karang' },
    { value: 'fish', label: 'Ikan' },
    { value: 'environment', label: 'Lingkungan' },
];

const MOCK_GALLERY_DATA = [
    { id: 1, title: 'Keindahan Terumbu Karang', author: 'Rama Putra', category: 'coral' },
    { id: 2, title: 'Penyu Hijau Berenang', author: 'Abyan Bergas', category: 'fish' },
    { id: 3, title: 'Laut Bebas Plastik', author: 'Maulana Yudo', category: 'environment' },
    { id: 4, title: 'Ikan Badut & Anemon', author: 'Fahryan', category: 'fish' },
    { id: 5, title: 'Restorasi Karang Otak', author: 'Yossi Marluga', category: 'coral' },
    { id: 6, title: 'Pembersihan Pantai', author: 'Relawan Laut', category: 'environment' },
    { id: 7, title: 'Hiu Paus Raja Ampat', author: 'Diver Pro 99', category: 'fish' },
    { id: 8, title: 'Terumbu Karang Sehat', author: 'Eco Warrior', category: 'coral' },
];

export default function CommunityGallery() {
    const pathname = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 2. STATE UNTUK PENCARIAN & FILTER
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // 3. FUNGSI PENYARING DATA
    const filteredGallery = MOCK_GALLERY_DATA.filter((item) => {
        // Cek apakah teks pencarian cocok dengan judul atau nama author
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.author.toLowerCase().includes(searchQuery.toLowerCase());

        // Cek apakah kategori cocok (atau jika "Semua Kategori" dipilih)
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-cyan-50 font-sans">

            {/* GLOBAL NAVBAR - LIGHT STYLE DENGAN CAPSULE LOGO */}
            <nav className="fixed top-0 w-full z-50 px-6 py-5 flex justify-between items-center transition-all">
                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-xl py-2 px-5 rounded-full border border-blue-100 shadow-sm">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-base text-white">🌊</span>
                    </div>
                    <span className="text-lg font-black tracking-widest text-blue-900 pr-1">DIVEXPLORE</span>
                </div>

                <div className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-xl p-1.5 rounded-full border border-blue-100 shadow-sm">
                  {[
                    { href: '/', label: 'Beranda' },
                    { href: '/gallery', label: 'Galeri' },
                    { href: '/dashboard', label: 'Dashboard' },
                    { href: '/akademi', label: 'Akademi' },
                  ].map(({ href, label }) => {
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white font-bold shadow-md'
                            : 'hover:bg-white/50 text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
            </nav>

            <main className="flex-grow pt-32 p-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 drop-shadow-sm">Galeri Komunitas</h1>
                        <p className="text-blue-700/80 mt-2 font-medium text-lg">Jelajahi keindahan laut lewat karya komunitas Divexplore-3D.</p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 shadow-lg transform-gpu hover:-translate-y-1">
                        + Unggah Karya
                    </button>
                </div>

                {/* SEARCH BAR & FILTER */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
                    <input
                        type="text"
                        placeholder="Cari biota, karang, atau lokasi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow p-4 bg-gray-50 border-2 border-transparent text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-colors font-medium"
                    />
                    <div className="flex items-center gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                                    selectedCategory === cat.value
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* GRID GAMBAR (Me-render hasil saringan) */}
                {filteredGallery.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredGallery.map((item) => (
                            <div key={item.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform-gpu overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
                                <div className="h-56 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="text-blue-400/80 font-bold text-lg transform-gpu group-hover:scale-110 transition-transform duration-300">Karya {item.id}</span>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</h3>
                                    <div className="flex items-center mt-3">
                                        <div className="w-7 h-7 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-[10px]">
                                            {item.author.charAt(0)}
                                        </div>
                                        <p className="text-sm text-gray-500 font-medium ml-2">{item.author}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Pesan jika pencarian tidak ditemukan */
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <span className="text-5xl">🐠</span>
                        <h3 className="mt-4 text-xl font-bold text-gray-800">Ups, tidak ada karya yang cocok.</h3>
                        <p className="text-gray-500 mt-2">Coba kata kunci lain atau hapus filter kategori.</p>
                    </div>
                )}
            </main>

            {/* AREA MODAL DAN FOOTER TETAP SAMA SEPERTI SEBELUMNYA */}
            {/* FOOTER */}
            <footer className="bg-blue-950 text-blue-100 pt-16 pb-8 px-8 mt-12 border-t-4 border-cyan-500">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <h4 className="text-2xl font-bold text-white mb-4">Divexplore-3D</h4>
                        <p className="text-sm text-blue-200 leading-relaxed">Platform pembelajaran konservasi laut interaktif berbasis 3D. Menjelajahi keindahan ekosistem dan biota laut Raja Ampat langsung dari layarmu.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Tautan Cepat</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-cyan-400 transition-colors flex items-center"><span className="mr-2">›</span> Beranda</Link></li>
                            <li><Link href="/gallery" className="hover:text-cyan-400 transition-colors flex items-center"><span className="mr-2">›</span> Galeri Komunitas</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Hubungi Kami</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start"><span className="text-cyan-400 mr-3 text-lg">📍</span><span>Kampus UNY, Karangmalang,<br />Yogyakarta</span></li>
                            <li className="flex items-center"><span className="text-cyan-400 mr-3 text-lg">✉️</span><span>hello@divexplore3d.com</span></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto border-t border-blue-800/50 mt-12 pt-8 text-center text-sm text-blue-400/80">
                    &copy; {new Date().getFullYear()} Tim Divexplore-3D. Hak Cipta Dilindungi.
                </div>
            </footer>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden transform transition-all">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 flex justify-between items-center">
                            <h3 className="text-white font-bold text-xl flex items-center gap-2"><span className="text-2xl">📸</span> Unggah Karya Baru</h3>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors font-bold">✕</button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="border-2 border-dashed border-blue-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer group">
                                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform">📥</div>
                                <p className="text-blue-700 font-bold">Pilih gambar atau tarik ke sini</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Judul Karya <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Beri judul yang menarik..." className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white focus:outline-none transition-all font-medium" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Karya <span className="text-red-500">*</span></label>
                                <select defaultValue="" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white focus:outline-none transition-all font-medium cursor-pointer text-gray-700">
                                    <option value="" disabled>Pilih kategori yang sesuai...</option>
                                    <option value="coral">Terumbu Karang</option>
                                    <option value="fish">Ikan & Biota Laut</option>
                                    <option value="environment">Lingkungan Laut</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
                            <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-colors">Batal</button>
                            <button onClick={() => { alert('Fitur terhubung ke API akan dikerjakan di tahap selanjutnya!'); setIsModalOpen(false); }} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all">
                                Kirim Karya
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}