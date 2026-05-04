'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../lib/useTheme';
import toast from 'react-hot-toast';

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
    const { isDark, toggleTheme } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredGallery = MOCK_GALLERY_DATA.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const navLinks = [
        { href: '/', label: 'Beranda' },
        { href: '/gallery', label: 'Galeri' },
        { href: '/akademi', label: 'Akademi' },
        { href: '/tutorial', label: 'Tutorial' },
        { href: '/dashboard', label: 'Dashboard' },
    ];

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDark ? 'bg-[#00040a] text-white' : 'bg-sky-50 text-gray-900'}`}>

            {/* Ambient glow - dark only */}
            {isDark && (
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full" />
                </div>
            )}

            {/* NAVBAR */}
            <nav className="fixed top-0 w-full z-50 px-6 py-5 flex justify-between items-center transition-all">
                {/* Logo */}
                <div className={`flex items-center gap-3 backdrop-blur-xl py-2 px-5 rounded-full border shadow-xl transition-colors ${isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-blue-100 shadow-sm'}`}>
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <span className="text-base">🌊</span>
                    </div>
                    <span className={`text-lg font-black tracking-widest pr-1 ${isDark ? 'text-white' : 'text-blue-900'}`}>DIVEXPLORE</span>
                </div>

                {/* Nav links */}
                <div className={`hidden md:flex items-center gap-1 backdrop-blur-2xl p-1.5 rounded-full border transition-colors ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200 shadow-sm'}`}>
                    {navLinks.map(({ href, label }) => {
                        const isActive = pathname === href;
                        return (
                            <Link key={href} href={href}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                                    isActive
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                                        : isDark
                                            ? 'text-gray-400 hover:text-white hover:bg-white/5'
                                            : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                                }`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>

                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    title={isDark ? 'Mode Terang' : 'Mode Gelap'}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all text-base ${isDark ? 'bg-white/10 hover:bg-white/20 border border-white/10' : 'bg-white hover:bg-gray-100 border border-gray-200 shadow-sm'}`}
                >
                    {isDark ? '☀️' : '🌙'}
                </button>
            </nav>

            {/* MAIN */}
            <main className="relative z-10 flex-grow pt-32 p-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-sm">
                            Galeri Komunitas
                        </h1>
                        <p className={`mt-2 font-medium text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Jelajahi keindahan laut lewat karya komunitas Divexplore-3D.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
                    >
                        + Unggah Karya
                    </button>
                </div>

                {/* Search & Filter */}
                <div className={`flex flex-col md:flex-row gap-4 mb-10 p-4 rounded-2xl border transition-colors ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <input
                        type="text"
                        placeholder="Cari biota, karang, atau lokasi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`flex-grow p-4 rounded-xl border-2 border-transparent focus:outline-none transition-colors font-medium ${isDark ? 'bg-white/5 text-white placeholder-gray-500 focus:border-blue-500/50 focus:bg-white/10' : 'bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:bg-white'}`}
                    />
                    <div className="flex items-center gap-2 flex-wrap">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                                    selectedCategory === cat.value
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                                        : isDark
                                            ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gallery Grid */}
                {filteredGallery.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredGallery.map((item) => (
                            <div
                                key={item.id}
                                className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 border ${isDark
                                    ? 'bg-white/[0.04] border-white/10 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]'
                                    : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200'
                                }`}
                            >
                                <div className={`h-52 flex items-center justify-center relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/20' : 'bg-gradient-to-br from-blue-100 to-cyan-100'}`}>
                                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className={`font-bold text-lg transition-transform duration-300 group-hover:scale-110 ${isDark ? 'text-cyan-500/60' : 'text-blue-400/80'}`}>
                                        Karya {item.id}
                                    </span>
                                </div>
                                <div className="p-5">
                                    <h3 className={`font-bold text-base group-hover:text-cyan-400 transition-colors line-clamp-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center mt-3 gap-2">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${isDark ? 'bg-blue-500/20 text-cyan-300' : 'bg-cyan-100 text-cyan-700'}`}>
                                            {item.author.charAt(0)}
                                        </div>
                                        <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.author}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={`text-center py-20 rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <span className="text-5xl">🐠</span>
                        <h3 className={`mt-4 text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Ups, tidak ada karya yang cocok.</h3>
                        <p className={`mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Coba kata kunci lain atau hapus filter kategori.</p>
                    </div>
                )}
            </main>

            {/* FOOTER */}
            <footer className={`relative z-10 mt-auto py-8 border-t text-center px-6 ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
                <p className={`text-[10px] tracking-[0.4em] font-bold uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    © 2026 TIM DIVEXPLORE-3D • TEKNOLOGI INFORMASI UNY
                </p>
            </footer>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className={`rounded-[28px] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden border ${isDark ? 'bg-[#050d1a] border-white/10' : 'bg-white border-gray-100'}`}>
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 flex justify-between items-center">
                            <h3 className="text-white font-bold text-xl flex items-center gap-2">
                                <span>📸</span> Unggah Karya Baru
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors font-bold"
                            >✕</button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer group transition-colors ${isDark ? 'border-blue-500/30 hover:border-blue-400/50 bg-blue-500/5' : 'border-blue-200 hover:border-blue-400 bg-blue-50/50'}`}>
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform ${isDark ? 'bg-white/10' : 'bg-white shadow-sm'}`}>📥</div>
                                <p className={`font-bold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Pilih gambar atau tarik ke sini</p>
                            </div>
                            <div>
                                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Judul Karya <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Beri judul yang menarik..."
                                    className={`w-full p-3.5 rounded-xl border focus:outline-none transition-all font-medium ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-400 focus:bg-white'}`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Kategori Karya <span className="text-red-500">*</span></label>
                                <select defaultValue=""
                                    className={`w-full p-3.5 rounded-xl border focus:outline-none transition-all font-medium cursor-pointer ${isDark ? 'bg-white/5 border-white/10 text-gray-300 focus:border-blue-500/50' : 'bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-400 focus:bg-white'}`}
                                >
                                    <option value="" disabled>Pilih kategori yang sesuai...</option>
                                    <option value="coral">Terumbu Karang</option>
                                    <option value="fish">Ikan & Biota Laut</option>
                                    <option value="environment">Lingkungan Laut</option>
                                </select>
                            </div>
                        </div>
                        <div className={`p-6 flex justify-end gap-3 border-t ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                            <button onClick={() => setIsModalOpen(false)}
                                className={`px-6 py-3 font-bold rounded-xl transition-colors ${isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-200'}`}
                            >Batal</button>
                            <button
                                onClick={() => { toast('Fitur unggah akan segera tersedia!', { icon: '🚧' }); setIsModalOpen(false); }}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                            >Kirim Karya</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
