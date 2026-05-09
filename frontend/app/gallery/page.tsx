'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../lib/useTheme';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/** Ubah file_path dari DB menjadi URL yang bisa diakses browser */
const resolveMediaUrl = (url: string): string => {
    if (!url) return '';
    // Sudah URL lengkap — ganti hostname saja jika pakai localhost tanpa port
    if (url.startsWith('http')) {
        return url.replace(/^http:\/\/localhost(?!:8000)/, `${API_URL}`);
    }
    // Path relatif — tambahkan base URL
    return `${API_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};


const CATEGORIES = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'coral', label: 'Karang' },
    { value: 'marine_life', label: 'Biota Laut' },
    { value: 'environment', label: 'Lingkungan' },
];

const FORMATS = [
    { value: 'all', label: 'Semua Format' },
    { value: 'photo', label: '📷 Foto' },
    { value: 'video', label: '🎥 Video' },
];

// Mock data dihapus karena sekarang kita menggunakan data asli dari API

export default function CommunityGallery() {
    const pathname = usePathname();
    const { isDark, toggleTheme } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
    const [selectedFormat, setSelectedFormat] = useState('all');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState<'galeri'|'karyaku'>('galeri');

    const [galleryData, setGalleryData] = useState<any[]>([]);
    const [myUploads, setMyUploads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMyLoading, setIsMyLoading] = useState(false);

    // Form states
    const [uploadTitle, setUploadTitle] = useState('');
    const [uploadCategories, setUploadCategories] = useState<string[]>([]);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchGallery();
        const role = localStorage.getItem('user_role');
        const token = localStorage.getItem('auth_token');
        setIsAdmin(role === 'admin');
        setIsLoggedIn(!!token);
        if (token) fetchMyUploads(token);
    }, []);

    const fetchMyUploads = async (token: string) => {
        setIsMyLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/my-uploads`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
            });
            const data = await res.json();
            if (data.status === 'success') setMyUploads(data.data);
        } catch (e) {
            console.error('Error fetching my uploads:', e);
        } finally {
            setIsMyLoading(false);
        }
    };

    const fetchGallery = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/gallery`);
            const data = await res.json();
            if (data.status === 'success') {
                setGalleryData(data.data);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async () => {
        if (!uploadTitle || uploadCategories.length === 0 || !uploadFile) {
            toast.error('Harap lengkapi semua data dan pilih gambar!');
            return;
        }

        const token = localStorage.getItem('auth_token');
        if (!token) {
            toast.error('Silakan login terlebih dahulu untuk mengunggah karya.');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('title', uploadTitle);
        formData.append('category', uploadCategories.join(','));
        const authorName = typeof window !== 'undefined' ? localStorage.getItem('user_name') || 'Diver' : 'Diver';
        formData.append('author', authorName);
        formData.append('file', uploadFile);

        try {
            const res = await fetch(`${API_URL}/api/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
                body: formData,
            });

            // Hindari crash jika server balik HTML bukan JSON
            const contentType = res.headers.get('content-type') || '';
            const data = contentType.includes('application/json') ? await res.json() : { message: `Server error (${res.status})` };
            
            if (res.ok) {
                toast.success('Karya berhasil diunggah! Menunggu persetujuan admin.');
                setIsModalOpen(false);
                setUploadTitle('');
                setUploadCategories([]);
                setUploadFile(null);
                setPreviewUrl(null);
                // Refresh karya saya
                fetchMyUploads(token);
                // Otomatis pindah ke tab Karyaku
                setActiveTab('karyaku');
            } else if (res.status === 401) {
                toast.error('Sesi login habis. Silakan login ulang.');
            } else {
                toast.error(data.message || `Gagal mengunggah (${res.status})`);
            }
        } catch (error: any) {
            console.error('Upload error:', error);
            toast.error(`Gagal upload: ${error?.message || 'Kesalahan tidak diketahui'}`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteContent = async (id: number) => {
        if (!confirm('Yakin ingin menghapus karya ini secara permanen dari Galeri?')) return;
        const token = localStorage.getItem('auth_token');
        try {
            const res = await fetch(`${API_URL}/api/admin/gallery/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Karya berhasil dihapus!');
                setSelectedItem(null);
                fetchGallery(); // Refresh the gallery
            } else {
                toast.error('Gagal menghapus karya (Mungkin sesi admin Anda sudah habis).');
            }
        } catch (e) {
            toast.error('Terjadi kesalahan jaringan saat menghapus karya.');
        }
    };

    const filteredGallery = galleryData.filter((item) => {
        const titleMatch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const authorMatch = item.author?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSearch = titleMatch || authorMatch;
        const matchesCategory = selectedCategories.includes('all') || selectedCategories.every(cat => item.category && item.category.includes(cat));
        
        let matchesFormat = true;
        if (selectedFormat === 'video') {
            matchesFormat = !!item.image?.match(/\.(mp4|webm|ogg|mov)$/i);
        } else if (selectedFormat === 'photo') {
            matchesFormat = !item.image?.match(/\.(mp4|webm|ogg|mov)$/i);
        }

        return matchesSearch && matchesCategory && matchesFormat;
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
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-white/5 border border-blue-500/20 overflow-hidden">
                        <img src="/images/logo.png" alt="Dive3D Logo" className="w-full h-full object-cover" />
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
                    title={isDark ? 'Mode Gelap' : 'Mode Terang'}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all text-base ${isDark ? 'bg-white/10 hover:bg-white/20 border border-white/10' : 'bg-white hover:bg-gray-100 border border-gray-200 shadow-sm'}`}
                >
                    {isDark ? '🌙' : '☀️'}
                </button>
            </nav>

            {/* MAIN */}
            <main className="relative z-10 flex-grow pt-32 p-8 max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
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

                {/* Tabs */}
                <div className={`flex gap-2 mb-8 p-1.5 rounded-2xl border w-fit ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <button
                        onClick={() => setActiveTab('galeri')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'galeri' ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
                    >
                        🌊 Galeri
                    </button>
                    {isLoggedIn && (
                        <button
                            onClick={() => setActiveTab('karyaku')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'karyaku' ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
                        >
                            📁 Karyaku
                            {myUploads.filter(u => u.status === 'pending').length > 0 && (
                                <span className="bg-yellow-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded-full">
                                    {myUploads.filter(u => u.status === 'pending').length}
                                </span>
                            )}
                        </button>
                    )}
                </div>

                {/* ===== TAB: GALERI ===== */}
                {activeTab === 'galeri' && (
                    <>
                        {/* Search & Filter */}
                        <div className={`flex flex-col md:flex-row gap-4 mb-10 p-4 rounded-2xl border transition-colors ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <input
                                type="text"
                                placeholder="Cari biota, karang, atau lokasi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`flex-grow p-4 rounded-xl border-2 border-transparent focus:outline-none transition-colors font-medium ${isDark ? 'bg-white/5 text-white placeholder-gray-500 focus:border-blue-500/50 focus:bg-white/10' : 'bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:bg-white'}`}
                            />
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 flex-wrap">
                                    {CATEGORIES.map((cat) => {
                                        const isSelected = selectedCategories.includes(cat.value);
                                        return (
                                            <button
                                                key={cat.value}
                                                onClick={() => {
                                                    if (cat.value === 'all') {
                                                        setSelectedCategories(['all']);
                                                    } else {
                                                        const newSelection = selectedCategories.filter(c => c !== 'all');
                                                        if (newSelection.includes(cat.value)) {
                                                            const removed = newSelection.filter(c => c !== cat.value);
                                                            setSelectedCategories(removed.length === 0 ? ['all'] : removed);
                                                        } else {
                                                            setSelectedCategories([...newSelection, cat.value]);
                                                        }
                                                    }
                                                }}
                                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                                    isSelected
                                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                                                        : isDark
                                                            ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 border border-gray-200'
                                                }`}
                                            >
                                                {cat.label}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {FORMATS.map((fmt) => (
                                        <button
                                            key={fmt.value}
                                            onClick={() => setSelectedFormat(fmt.value)}
                                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                                selectedFormat === fmt.value
                                                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/20'
                                                    : isDark
                                                        ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 border border-gray-200'
                                            }`}
                                        >
                                            {fmt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Gallery Grid */}
                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                            </div>
                        ) : filteredGallery.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredGallery.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedItem(item)}
                                        className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 border ${isDark
                                            ? 'bg-white/[0.04] border-white/10 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]'
                                            : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200'
                                        }`}
                                    >
                                        <div className={`h-52 flex items-center justify-center relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/20' : 'bg-gradient-to-br from-blue-100 to-cyan-100'}`}>
                                            {item.image ? (
                                                item.image.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                                                    <video src={resolveMediaUrl(item.image)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none" loop muted playsInline autoPlay />
                                                ) : (
                                                    <img src={resolveMediaUrl(item.image)} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                )
                                            ) : (
                                                <>
                                                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    <span className={`font-bold text-lg transition-transform duration-300 group-hover:scale-110 ${isDark ? 'text-cyan-500/60' : 'text-blue-400/80'}`}>
                                                        Karya {item.id}
                                                    </span>
                                                </>
                                            )}
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
                                <h3 className={`mt-4 text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Belum ada karya yang dipublikasikan.</h3>
                                <p className={`mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Jadilah yang pertama mengunggah karya!</p>
                            </div>
                        )}
                    </>
                )}

                {/* ===== TAB: KARYAKU ===== */}
                {activeTab === 'karyaku' && isLoggedIn && (
                    <div className="animate-in fade-in duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Karya yang Kamu Unggah</h2>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                                {myUploads.length} karya
                            </span>
                        </div>

                        {/* Legend status */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            {[
                                { status: 'pending', label: 'Menunggu Review', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
                                { status: 'approved', label: 'Sudah Tayang', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
                                { status: 'rejected', label: 'Ditolak Admin', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
                            ].map(s => (
                                <span key={s.status} className={`text-xs font-bold px-3 py-1.5 rounded-full border ${s.color}`}>
                                    {s.label} ({myUploads.filter(u => u.status === s.status).length})
                                </span>
                            ))}
                        </div>

                        {isMyLoading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                            </div>
                        ) : myUploads.length === 0 ? (
                            <div className={`text-center py-20 rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
                                <span className="text-5xl">📁</span>
                                <h3 className={`mt-4 text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Belum ada karya yang kamu unggah.</h3>
                                <p className={`mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Klik tombol "Unggah Karya" untuk berbagi karyamu!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {myUploads.map((item) => {
                                    const statusMap: Record<string, { label: string; color: string; icon: string }> = {
                                        pending:  { label: 'Menunggu Review', color: 'bg-yellow-500 text-black', icon: '⏳' },
                                        approved: { label: 'Sudah Tayang',    color: 'bg-green-500 text-white',  icon: '✅' },
                                        rejected: { label: 'Ditolak',         color: 'bg-red-500 text-white',    icon: '❌' },
                                    };
                                    const s = statusMap[item.status] || statusMap['pending'];
                                    return (
                                        <div key={item.id} className={`group rounded-2xl overflow-hidden border transition-all duration-300 ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
                                            {/* Thumbnail */}
                                            <div className={`h-44 relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/20' : 'bg-gradient-to-br from-purple-100 to-pink-100'}`}>
                                                {item.image ? (
                                                    item.image.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                                                        <video src={resolveMediaUrl(item.image)} className="w-full h-full object-cover pointer-events-none" loop muted playsInline autoPlay />
                                                    ) : (
                                                        <img src={resolveMediaUrl(item.image)} alt={item.title} className="w-full h-full object-cover" />
                                                    )
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-30">🖼️</div>
                                                )}
                                                {/* Status badge */}
                                                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-black flex items-center gap-1.5 shadow-lg ${s.color}`}>
                                                    <span>{s.icon}</span> {s.label}
                                                </div>
                                            </div>
                                            {/* Info */}
                                            <div className="p-4">
                                                <h3 className={`font-bold text-sm line-clamp-1 mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.title}</h3>
                                                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </p>
                                                {item.status === 'rejected' && (
                                                    <p className="mt-2 text-xs text-red-400 font-medium">Karya ditolak. Coba unggah ulang dengan kualitas lebih baik.</p>
                                                )}
                                                {item.status === 'pending' && (
                                                    <p className="mt-2 text-xs text-yellow-400 font-medium">Sedang direview oleh admin...</p>
                                                )}
                                                {item.status === 'approved' && (
                                                    <p className="mt-2 text-xs text-green-400 font-medium">Karya sudah tayang di galeri! 🎉</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
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
                            <div className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer group transition-colors relative overflow-hidden min-h-[200px] ${isDark ? 'border-blue-500/30 hover:border-blue-400/50 bg-blue-500/5' : 'border-blue-200 hover:border-blue-400 bg-blue-50/50'}`}>
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*,video/*" onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setUploadFile(file);
                                    if (file) {
                                        setPreviewUrl(URL.createObjectURL(file));
                                    } else {
                                        setPreviewUrl(null);
                                    }
                                }} />
                                {previewUrl ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                                        {uploadFile?.type.startsWith('video/') ? (
                                            <video src={previewUrl} className="w-full h-full object-contain" controls playsInline />
                                        ) : (
                                            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                            <p className="font-bold text-white bg-black/50 px-4 py-2 rounded-lg">Ganti Media</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform ${isDark ? 'bg-white/10' : 'bg-white shadow-sm'}`}>📥</div>
                                        <p className={`font-bold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Pilih media atau tarik ke sini</p>
                                        <p className="text-xs text-gray-500 mt-2">Semua format foto & video didukung (Tanpa Batas)</p>
                                    </>
                                )}
                            </div>
                            <div>
                                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Judul Karya <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Beri judul yang menarik..." value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)}
                                    className={`w-full p-3.5 rounded-xl border focus:outline-none transition-all font-medium ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-400 focus:bg-white'}`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-bold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Kategori Karya (Bisa Pilih Lebih Dari Satu) <span className="text-red-500">*</span></label>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.filter(c => c.value !== 'all').map((cat) => {
                                        const isSelected = uploadCategories.includes(cat.value);
                                        return (
                                            <button
                                                key={cat.value}
                                                type="button"
                                                onClick={() => {
                                                    if (isSelected) {
                                                        setUploadCategories(uploadCategories.filter(c => c !== cat.value));
                                                    } else {
                                                        setUploadCategories([...uploadCategories, cat.value]);
                                                    }
                                                }}
                                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border ${
                                                    isSelected
                                                        ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30'
                                                        : isDark 
                                                            ? 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white' 
                                                            : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-gray-800'
                                                }`}
                                            >
                                                {cat.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <button onClick={handleUpload} disabled={isUploading} className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:-translate-y-1 ${isUploading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-blue-500/25'}`}>
                                {isUploading ? '⏳ Mengunggah Karya...' : '🚀 Unggah Sekarang'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* LIGHTBOX MODAL TIKTOK-STYLE */}
            {selectedItem && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedItem(null)} />
                    
                    <div className="relative z-10 w-full max-w-6xl h-full max-h-[85vh] flex flex-col md:flex-row bg-[#000814] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
                        {/* Media Section (Object Contain to respect ratio) */}
                        <div className="flex-1 flex items-center justify-center bg-black relative overflow-hidden h-[50vh] md:h-auto">
                            {selectedItem.image ? (
                                selectedItem.image.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                                    <video src={resolveMediaUrl(selectedItem.image)} className="w-full h-full object-contain" controls autoPlay playsInline />
                                ) : (
                                    <img src={resolveMediaUrl(selectedItem.image)} alt={selectedItem.title} className="w-full h-full object-contain" />
                                )
                            ) : null}
                        </div>
                        
                        {/* Info Section */}
                        <div className="w-full md:w-[350px] lg:w-[400px] p-8 flex flex-col bg-white/5 border-t md:border-t-0 md:border-l border-white/10 flex-shrink-0">
                            <h2 className="text-3xl font-black text-white mb-6 leading-tight">{selectedItem.title}</h2>
                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
                                    {selectedItem.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Penyelam</p>
                                    <p className="font-bold text-white text-lg">{selectedItem.author}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Kategori Karya</p>
                                <div className="flex flex-wrap gap-2">
                                    {(selectedItem.category || '').split(',').map((catVal: string) => {
                                        const label = CATEGORIES.find(c => c.value === catVal)?.label || catVal;
                                        return (
                                            <span key={catVal} className="px-4 py-2 bg-white/10 rounded-xl text-sm font-bold text-cyan-300 inline-block border border-cyan-500/20">
                                                {label}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="mt-auto pt-8 space-y-3">
                                {isAdmin && (
                                    <button onClick={() => handleDeleteContent(selectedItem.id)} className="w-full py-4 rounded-xl font-bold text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white transition-colors border border-red-500/20">
                                        🗑️ Hapus Karya (Admin Akses)
                                    </button>
                                )}
                                <button onClick={() => setSelectedItem(null)} className="w-full py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/10 hover:border-white/20">
                                    Kembali
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
