'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../lib/useTheme';
import AdminDashboard from './AdminDashboard';
import dynamic from 'next/dynamic';



export default function DashboardPage() {
    const pathname = usePathname();
    const { isDark, toggleTheme } = useTheme();
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState(0);
    const [konservasiDone, setKonservasiDone] = useState(0);
    const [digitalDone, setDigitalDone] = useState(0);
    const [userRole, setUserRole] = useState('user');
    const [topScore, setTopScore] = useState(0);
    const [watchedTutorialCount, setWatchedTutorialCount] = useState(0);
    const [claimedCertificates, setClaimedCertificates] = useState<{type: string; label: string; track: string; date: string}[]>([]);

    useEffect(() => {
        const role = localStorage.getItem('user_role') || 'user';
        setUserRole(role);

        const userEmail = (localStorage.getItem('user_email') || '').toLowerCase();

        // Baca tutorial yang sudah ditonton (selalu, untuk semua user)
        const watched = localStorage.getItem('tutorial_watched');
        if (watched) setWatchedTutorialCount(JSON.parse(watched).length);

        // Baca riwayat sertifikat yang sudah diklaim
        const claimed = localStorage.getItem('claimed_certificates');
        if (claimed) setClaimedCertificates(JSON.parse(claimed));

        // TEST: vinzcan11 langsung semua selesai
        if (userEmail === 'vinzcan11@gmail.com') {
            setKonservasiDone(4);
            setDigitalDone(5);
            setTopScore(100);
            return;
        }

        const k = localStorage.getItem(`completed_quizzes_${userEmail}_konservasi-laut`);
        const d = localStorage.getItem(`completed_quizzes_${userEmail}_konten-digital`);
        if (k) setKonservasiDone(JSON.parse(k).length);
        if (d) setDigitalDone(JSON.parse(d).length);

        // Ambil skor tertinggi dari semua quiz yang pernah dikerjakan
        const scores: number[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i) || '';
            if (key.startsWith('quiz_score_')) {
                const val = parseInt(localStorage.getItem(key) || '0', 10);
                if (!isNaN(val)) scores.push(val);
            }
        }
        const totalDone = (k ? JSON.parse(k).length : 0) + (d ? JSON.parse(d).length : 0);
        if (totalDone > 0 && scores.length === 0) scores.push(100);
        if (scores.length > 0) setTopScore(Math.max(...scores));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            window.location.href = '/login';
            return;
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        })
            .then(res => {
                if (res.status === 401) { window.location.href = '/login'; return null; }
                return res.json();
            })
            .then(data => {
                if (data && data.status === 'success') setDashboardData(data.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className={`flex h-screen items-center justify-center ${isDark ? 'bg-[#00040a]' : 'bg-sky-50'}`}>
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-cyan-400 font-bold tracking-widest text-sm uppercase">Memuat Dashboard...</p>
                </div>
            </div>
        );
    }

    if (!dashboardData) return (
        <div className={`flex h-screen items-center justify-center ${isDark ? 'bg-[#00040a]' : 'bg-sky-50'}`}>
            <div className="text-center">
                <div className="text-4xl mb-4">🌊</div>
                <p className="text-red-400 font-bold">Gagal terhubung ke server</p>
                <p className="text-gray-500 text-sm mt-2">Pastikan backend sudah berjalan</p>
            </div>
        </div>
    );

    const menuItems = [
        { icon: '📊', label: 'Dashboard', action: () => setActiveMenu(0) },
        { icon: '📚', label: 'Mulai Akademi', action: () => window.location.href = '/lms' },
        { icon: '👑', label: 'Leaderboard', action: () => setActiveMenu(2) },
        { icon: '🎁', label: 'Klaim Hadiah', action: () => setActiveMenu(3) },
        // { icon: '⚙️', label: 'Pengaturan', action: () => setActiveMenu(4) }, // Disembunyikan sementara
    ];

    const userName = dashboardData.user?.name || 'Pengguna';
    const xp = dashboardData.user?.current_xp || 0;
    const targetXp = dashboardData.user?.next_level_xp || 500;
    const level = dashboardData.user?.level || 0;
    const rankName = dashboardData.user?.rank_name || 'Rookie';

    const completedQuizzesCount = dashboardData.recent_quizzes?.filter((q: any) => q.score === 100).length || 0;

    const claimCertificate = (type: string, label: string, track: string, url: string) => {
        const existing = JSON.parse(localStorage.getItem('claimed_certificates') || '[]');
        const alreadyClaimed = existing.some((c: any) => c.type === type);
        if (!alreadyClaimed) {
            const newEntry = { type, label, track, date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) };
            const updated = [...existing, newEntry];
            localStorage.setItem('claimed_certificates', JSON.stringify(updated));
            setClaimedCertificates(updated);
        }
        window.location.href = url;
    };
    const completedAkademikCount = konservasiDone + digitalDone;
    const totalModules = 9;
    const totalVideos = 5;
    const totalKuis = 4;

    return (
        <div className={`flex h-screen font-sans overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#00040a] text-white' : 'bg-sky-50 text-gray-900'}`}>

            {/* Ambient glow background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full" />
            </div>

            {/* SIDEBAR */}
            <aside className={`relative z-10 flex flex-col border-r backdrop-blur-2xl transition-all duration-500 ease-in-out flex-shrink-0 ${isSidebarOpen ? 'w-60' : 'w-[72px]'} ${isDark ? 'border-white/5 bg-white/[0.03]' : 'border-gray-200 bg-white shadow-sm'}`}>

                {/* Logo */}
                <div className={`h-20 flex items-center px-4 border-b ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                    <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 cursor-pointer overflow-hidden bg-white/5 border border-white/10`}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {/* Ganti '/logo.png' dengan nama file logo Anda jika berbeda */}
                        <img src="/images/logo.png" alt="Dive3D Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className={`ml-3 text-base font-black tracking-widest whitespace-nowrap ${isDark ? "text-white" : "text-blue-900"} transition-all duration-500 ${isSidebarOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                        DIVEXPLORE
                    </span>
                </div>

                {/* Menu */}
                {userRole !== 'admin' && (
                <ul className="flex-1 py-4 px-2 space-y-1 overflow-x-hidden">
                    {menuItems.map((item, idx) => (
                        <li
                            key={idx}
                            onClick={item.action}
                            title={!isSidebarOpen ? item.label : ''}
                            className={`flex items-center rounded-xl cursor-pointer transition-all duration-200 group
                                ${isSidebarOpen ? 'px-3 py-2.5 gap-3' : 'justify-center p-3'}
                                ${activeMenu === idx
                                    ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/20 border border-blue-500/30 text-cyan-400'
                                    : isDark
                                      ? 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
                                      : 'text-gray-500 hover:text-blue-700 hover:bg-blue-50 border border-transparent'
                                }`}
                        >
                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                            <span className={`text-sm font-semibold whitespace-nowrap transition-all duration-500 ${isSidebarOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0 overflow-hidden pointer-events-none'}`}>
                                {item.label}
                            </span>
                        </li>
                    ))}
                </ul>
                )}

                {/* Logout */}
                <div className={`p-2 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                    <button
                        onClick={() => { localStorage.removeItem('auth_token'); localStorage.removeItem('user_role'); localStorage.removeItem('user_name'); localStorage.removeItem('user_email'); window.location.href = '/'; }}
                        title={!isSidebarOpen ? 'Keluar' : ''}
                        className={`w-full flex items-center rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 border border-transparent
                            ${isSidebarOpen ? 'px-3 py-2.5 gap-3' : 'justify-center p-3'}`}
                    >
                        <span className="text-lg flex-shrink-0">🚪</span>
                        <span className={`text-sm font-semibold whitespace-nowrap transition-all duration-500 ${isSidebarOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0 overflow-hidden pointer-events-none'}`}>
                            Keluar
                        </span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="relative z-10 flex-1 flex flex-col overflow-y-auto">

                {/* TOP HEADER */}
                <header className={`sticky top-0 z-20 px-6 py-4 border-b backdrop-blur-2xl flex justify-between items-center ${isDark ? 'border-white/5 bg-[#00040a]/80' : 'border-gray-200 bg-sky-50/80'}`}>
                    <div className="flex items-center gap-4">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex-shrink-0 shadow-lg shadow-blue-500/20" />
                        <div>
                            <p className={`font-bold text-sm leading-none ${isDark ? "text-white" : "text-gray-900"}`}>{userName} {userRole === 'admin' && <span className="ml-2 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] uppercase tracking-wider">Admin</span>}</p>
                            {userRole !== 'admin' && <p className="text-cyan-400 text-xs mt-0.5">Level {level} · {rankName}</p>}
                        </div>
                    </div>

                    {/* Navbar */}
                    <div className={`hidden md:flex items-center gap-1 backdrop-blur-2xl p-1.5 rounded-full border ${isDark ? "bg-white/5 border-white/10" : "bg-white/80 border-gray-200 shadow-sm"}`}>
                        {[
                            { href: '/', label: 'Beranda' },
                            { href: '/gallery', label: 'Galeri' },
                            { href: '/akademi', label: 'Akademi' },
                            { href: '/tutorial', label: 'Tutorial' },
                            { href: '/dashboard', label: 'Dashboard' },
                        ].map(({ href, label }) => {
                            const isActive = pathname === href;
                            return (
                                <Link key={href} href={href}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${isActive
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                                        : isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'}`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            title={isDark ? 'Mode Gelap' : 'Mode Terang'}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all text-sm ${isDark ? 'bg-white/10 hover:bg-white/20 border border-white/10' : 'bg-white hover:bg-gray-100 border border-gray-200 shadow-sm'}`}
                        >
                            {isDark ? '🌙' : '☀️'}
                        </button>
                        <div className={`relative cursor-pointer p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
                            <span className="text-xl">🔔</span>
                            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full" />
                        </div>
                    </div>
                </header>

                {/* DASHBOARD CONTENT */}
                {userRole === 'admin' ? (
                    <AdminDashboard />
                ) : (
                <>
                {activeMenu === 0 && (
                <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
                    {/* Profile & XP Row */}
                    <div className={`flex flex-col md:flex-row justify-between items-center rounded-2xl p-6 border ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-gray-200 shadow-sm'}`}>
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/20">
                                🤿
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Selamat datang kembali,</p>
                                <h2 className="text-2xl font-bold">{userName}</h2>
                                <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
                                    ⭐ Level {level} · {rankName}
                                </div>
                            </div>
                        </div>

                        <div className={`mt-6 md:mt-0 w-full md:w-80 rounded-xl p-4 border ${isDark ? 'bg-[#0F172A]/50 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-yellow-400">⭐</span>
                                <span className="text-sm font-semibold text-gray-300">Total XP</span>
                            </div>
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-lg font-bold">{xp} XP</span>
                                <span className="text-xs text-gray-500">Target {targetXp} XP</span>
                            </div>
                            <div className={`h-1.5 rounded-full w-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                <div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${Math.min((xp/(targetXp||1))*100, 100)}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Grid 3 Cols (Row 1) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Akademik */}
                        <div className={`rounded-2xl p-6 border flex flex-col justify-between ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-gray-200 shadow-sm'}`}>
                            <div className="flex items-start gap-3 mb-6">
                                <div className="text-xl text-gray-400">📖</div>
                                <div>
                                    <h3 className="font-semibold text-sm">Ringkasan Progres Akademik</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Modul yang diselesaikan</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-3xl font-bold text-cyan-400">{Math.round((completedAkademikCount / totalModules) * 100)}%</span>
                                    <span className="text-xs text-gray-500 font-medium">{completedAkademikCount} / {totalModules} Modul</span>
                                </div>
                                <div className={`h-1.5 rounded-full w-full mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                    <div className="h-full rounded-full bg-cyan-400" style={{ width: `${(completedAkademikCount / totalModules) * 100}%` }} />
                                </div>
                                <Link href="/akademi" className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
                                    Lihat Detail ➔
                                </Link>
                            </div>
                        </div>

                        {/* Tutorial */}
                        <div className={`rounded-2xl p-6 border flex flex-col justify-between ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-gray-200 shadow-sm'}`}>
                            <div className="flex items-start gap-3 mb-6">
                                <div className="text-xl text-blue-400">▶️</div>
                                <div>
                                    <h3 className="font-semibold text-sm">Ringkasan Progres Tutorial</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Video yang ditonton</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-3xl font-bold text-cyan-400">{Math.round((watchedTutorialCount / totalVideos) * 100)}%</span>
                                    <span className="text-xs text-gray-500 font-medium">{watchedTutorialCount} / {totalVideos} Video</span>
                                </div>
                                <div className={`h-1.5 rounded-full w-full mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                    <div className="h-full rounded-full bg-cyan-400" style={{ width: `${(watchedTutorialCount / totalVideos) * 100}%` }} />
                                </div>
                                <Link href="/tutorial" className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
                                    Lihat Detail ➔
                                </Link>
                            </div>
                        </div>

                        {/* Status Kuis */}
                        <div className={`relative overflow-hidden rounded-2xl p-6 border flex flex-col justify-between ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-gray-200 shadow-sm'}`}>
                            <div className="flex items-start gap-3 mb-6 relative z-10">
                                <div className="text-xl text-gray-400">📝</div>
                                <div>
                                    <h3 className="font-semibold text-sm">Status Kuis</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Kuis yang dikerjakan</p>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-white">{completedQuizzesCount}</span>
                                    <p className="text-xs text-gray-500 mt-1">{completedQuizzesCount === 0 ? 'Belum ada kuis yang diselesaikan' : 'Kuis terselesaikan'}</p>
                                </div>
                                <Link href="/lms" className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
                                    Lihat Kuis ➔
                                </Link>
                            </div>
                            {/* Background Icon */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
                                <span className="text-9xl">📋</span>
                            </div>
                        </div>
                    </div>

                    {/* Grid 3 Cols (Row 2) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Status Verifikasi */}
                        <div className={`rounded-2xl p-6 border flex flex-col ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-gray-200 shadow-sm'}`}>
                            <div className="flex items-start gap-3 mb-8">
                                <div className="text-xl text-green-400">✅</div>
                                <div>
                                    <h3 className="font-semibold text-sm">Status Verifikasi Konten</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Upload & verifikasi Konten</p>
                                </div>
                            </div>
                            <div className="flex justify-around mb-8">
                                <div className="text-center border-r border-white/10 w-1/2">
                                    <p className="text-3xl font-bold text-cyan-400 mb-1">{dashboardData.content_stats?.submitted || 0}</p>
                                    <p className="text-xs text-gray-500">Diajukan</p>
                                </div>
                                <div className="text-center w-1/2">
                                    <p className="text-3xl font-bold text-cyan-400 mb-1">{dashboardData.content_stats?.approved || 0}</p>
                                    <p className="text-xs text-gray-500">Disetujui</p>
                                </div>
                            </div>
                            <Link href="/dashboard" className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 mt-auto">
                                Kelola Konten ➔
                            </Link>
                        </div>

                        {/* Koleksi Lencana */}
                        <div className={`rounded-2xl p-6 border flex flex-col justify-between ${isDark ? 'bg-[#0B1221] border-amber-500/30' : 'bg-amber-50 border-amber-300 shadow-sm'}`}>
                            <div className="flex items-start gap-3 mb-6">
                                <div className="text-xl text-orange-400">🏅</div>
                                <div>
                                    <h3 className="font-semibold text-sm">Trofi Eksklusif</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Pencapaian belajar Anda</p>
                                </div>
                            </div>

                            {(() => {
                                if (topScore < 50) return (
                                    <div className="flex-grow flex flex-col items-center justify-center py-4 text-center bg-black/20 rounded-xl border border-white/5">
                                        <div className="text-4xl mb-2 opacity-30">🔒</div>
                                        <p className="text-xs text-gray-400">Selesaikan kuis untuk membuka Trofi Ikan Emas!</p>
                                        <Link href="/lms" className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 font-medium">Mulai Akademi →</Link>
                                    </div>
                                );

                                return (
                                    <div className="flex-grow flex flex-col items-center justify-center py-4 text-center relative overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-b from-amber-500/10 to-transparent group">
                                        <div className="absolute top-0 right-0 text-6xl opacity-10 translate-x-4 -translate-y-4">🏆</div>
                                        <div className="text-4xl mb-3 drop-shadow-lg group-hover:scale-110 transition-transform">🏆</div>
                                        <h4 className="text-amber-400 font-bold mb-1">Trofi Ikan Mas Terbuka!</h4>
                                        <p className="text-[10px] text-gray-400 mb-4 px-4">Selamat! Anda telah mendapatkan lencana 3D eksklusif.</p>
                                        <Link href="/trophy" className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all shadow-lg shadow-amber-500/25">
                                            Lihat Trofi 3D ➔
                                        </Link>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Claim Sertifikat */}
                        <div className={`rounded-2xl p-6 border ${isDark ? 'bg-[#0B1221] border-yellow-500/30' : 'bg-yellow-50 border-yellow-300 shadow-sm'}`}>
                            <div className="flex items-start gap-3 mb-5">
                                <div className="text-xl text-yellow-400">📜</div>
                                <div>
                                    <h3 className="font-semibold text-sm">Claim Sertifikat</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Selesaikan jalur pembelajaran untuk klaim sertifikat.</p>
                                </div>
                            </div>

                            {/* Jalur 1: Konservasi Laut */}
                            <div className={`rounded-xl p-4 border mb-3 ${isDark ? 'bg-[#0F172A]/50 border-white/5' : 'bg-white border-gray-200'}`}>
                                <div className="flex items-center gap-2 mb-3">
                                    <span>🪸</span>
                                    <p className="text-xs font-semibold">Konservasi Laut (4 Modul)</p>
                                </div>
                                <ul className="space-y-2 text-xs text-gray-400">
                                    <li className="flex justify-between items-center">
                                        <span className="flex items-center gap-2"><span className={konservasiDone >= 4 ? "text-green-500" : "text-gray-600"}>✔</span> Selesaikan semua Modul & Kuis</span>
                                        <span className="flex items-center gap-1">{konservasiDone} / 4 {konservasiDone >= 4 ? <span className="text-green-500">✅</span> : <span className="text-red-500">❌</span>}</span>
                                    </li>
                                </ul>
                                <button
                                    disabled={konservasiDone < 4}
                                    onClick={() => konservasiDone >= 4 && claimCertificate('konservasi', 'Sertifikat Edukasi Konservasi Laut', 'Konservasi Laut', '/lms?track=konservasi-laut&module=all&action=certificate')}
                                    className={`w-full mt-3 py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all ${konservasiDone >= 4 ? 'bg-cyan-500 text-white hover:bg-cyan-400 cursor-pointer' : 'bg-gray-800 text-gray-500 border border-white/5 cursor-not-allowed'}`}>
                                    <span>{konservasiDone >= 4 ? '📜' : '🔒'}</span> Claim Sertifikat Konservasi Laut
                                </button>
                            </div>

                            {/* Jalur 2: Konten Digital Bahari */}
                            <div className={`rounded-xl p-4 border ${isDark ? 'bg-[#0F172A]/50 border-white/5' : 'bg-white border-gray-200'}`}>
                                <div className="flex items-center gap-2 mb-3">
                                    <span>🎬</span>
                                    <p className="text-xs font-semibold">Konten Digital Bahari (5 Modul)</p>
                                </div>
                                <ul className="space-y-2 text-xs text-gray-400">
                                    <li className="flex justify-between items-center">
                                        <span className="flex items-center gap-2"><span className={digitalDone >= 5 ? "text-green-500" : "text-gray-600"}>✔</span> Selesaikan semua Modul & Kuis</span>
                                        <span className="flex items-center gap-1">{digitalDone} / 5 {digitalDone >= 5 ? <span className="text-green-500">✅</span> : <span className="text-red-500">❌</span>}</span>
                                    </li>
                                </ul>
                                <button
                                    disabled={digitalDone < 5}
                                    onClick={() => digitalDone >= 5 && claimCertificate('digital', 'Sertifikat Pembuatan Konten Digital Bahari', 'Konten Digital Bahari', '/lms?track=konten-digital&module=all&action=certificate')}
                                    className={`w-full mt-3 py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all ${digitalDone >= 5 ? 'bg-purple-500 text-white hover:bg-purple-400 cursor-pointer' : 'bg-gray-800 text-gray-500 border border-white/5 cursor-not-allowed'}`}>
                                    <span>{digitalDone >= 5 ? '📜' : '🔒'}</span> Claim Sertifikat Konten Digital
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Riwayat Sertifikat header */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-start gap-3">
                            <div className="text-xl text-gray-400">🧾</div>
                            <div>
                                <h3 className="font-semibold text-sm">Riwayat Sertifikat</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Sertifikat yang telah diperoleh</p>
                            </div>
                        </div>
                        <Link href="/dashboard" className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
                            Lihat Semua ➔
                        </Link>
                    </div>
                    
                    {/* Riwayat Sertifikat content */}
                    {claimedCertificates.length === 0 ? (
                        <div className={`rounded-2xl p-8 border border-dashed flex items-center justify-center gap-4 ${isDark ? 'bg-transparent border-white/10' : 'bg-gray-50 border-gray-300'}`}>
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-gray-500">
                                🏅
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-300 mb-1">Belum ada sertifikat yang diklaim.</p>
                                <p className="text-xs text-gray-500">Selesaikan semua syarat dan klaim sertifikat pertamamu!</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {claimedCertificates.map((cert) => (
                                <div key={cert.type} className={`flex items-center justify-between p-4 rounded-2xl border ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-gray-200 shadow-sm'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${cert.type === 'konservasi' ? 'bg-cyan-500/10' : 'bg-purple-500/10'}`}>
                                            📜
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">{cert.label}</p>
                                            <p className="text-xs text-gray-500">Diklaim pada {cert.date}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => window.location.href = `/lms?track=${cert.type === 'konservasi' ? 'konservasi-laut' : 'konten-digital'}&module=all&action=certificate`}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${cert.type === 'konservasi' ? 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20' : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20'}`}>
                                        Download Ulang
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    </div>
                )}

                {activeMenu === 2 && (
                    <div className="p-6 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black text-white mb-2">👑 Global Leaderboard</h2>
                            <p className="text-gray-400">Peringkat poin XP tertinggi dari seluruh penjelajah laut.</p>
                        </div>
                        <div className={`rounded-3xl p-6 border ${isDark ? 'bg-[#0B1221]/80 backdrop-blur-md border-white/5 shadow-2xl' : 'bg-white border-gray-200 shadow-xl'} space-y-4`}>
                            {dashboardData.leaderboard?.map((user: any, idx: number) => (
                                <div key={idx} className={`flex items-center justify-between p-5 rounded-2xl border transition-all hover:scale-[1.01] ${user.is_me ? 'bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : (isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-gray-100')}`}>
                                    <div className="flex items-center gap-5">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-lg ${user.rank === 1 ? 'bg-gradient-to-br from-yellow-300 to-amber-500 text-black' : user.rank === 2 ? 'bg-gradient-to-br from-slate-300 to-gray-400 text-black' : user.rank === 3 ? 'bg-gradient-to-br from-orange-300 to-amber-700 text-white' : 'bg-white/10 text-white border border-white/10'}`}>
                                            #{user.rank}
                                        </div>
                                        <div className="text-3xl drop-shadow-md">{user.avatar_emoji}</div>
                                        <div>
                                            <p className={`font-bold text-lg ${user.is_me ? 'text-cyan-400' : (isDark ? 'text-white' : 'text-gray-900')}`}>{user.name}</p>
                                            {user.is_me && <p className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold">Ini Adalah Anda</p>}
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-2">
                                        <span className="text-2xl">⭐</span>
                                        <p className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">{user.xp} <span className="text-sm font-bold text-amber-500">XP</span></p>
                                    </div>
                                </div>
                            ))}
                            {(!dashboardData.leaderboard || dashboardData.leaderboard.length === 0) && (
                                <div className="text-center py-10 opacity-50">Belum ada data klasemen.</div>
                            )}
                        </div>
                    </div>
                )}

                {activeMenu === 3 && (
                    <div className="p-6 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-2">🎁 Pusat Hadiah</h2>
                            <p className="text-gray-400">Tukarkan pencapaian lencana Anda dengan berbagai hadiah eksklusif!</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Hadiah 1: Ebook */}
                            <div className={`p-6 rounded-3xl border flex flex-col relative overflow-hidden group ${isDark ? 'bg-[#0B1221]/80 backdrop-blur-md border-white/5' : 'bg-white border-gray-200 shadow-sm'}`}>
                                <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 text-7xl opacity-5 group-hover:scale-110 transition-transform">📚</div>
                                <div className="flex gap-4 items-start relative z-10 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl shadow-lg">
                                        📖
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>E-Book Konservasi Laut</h3>
                                        <p className="text-xs text-gray-400">Panduan lengkap pelestarian terumbu karang Nusantara (PDF).</p>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-semibold text-gray-500">Syarat: <span className="text-orange-400">🥉 Medali Perunggu</span></span>
                                    </div>
                                    {topScore >= 50 ? (
                                        <button onClick={() => alert('Berhasil mengklaim E-Book! Tautan unduhan akan dikirim ke email Anda.')} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] text-white font-bold transition-all shadow-lg shadow-cyan-500/25">
                                            Unduh E-Book
                                        </button>
                                    ) : (
                                        <button disabled className="w-full py-3 rounded-xl bg-gray-800 text-gray-500 font-bold cursor-not-allowed border border-gray-700">
                                            🔒 Terkunci (Butuh Nilai ≥ 50)
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Hadiah 2: Voucher */}
                            <div className={`p-6 rounded-3xl border flex flex-col relative overflow-hidden group ${isDark ? 'bg-[#0B1221]/80 backdrop-blur-md border-white/5' : 'bg-white border-gray-200 shadow-sm'}`}>
                                <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 text-7xl opacity-5 group-hover:scale-110 transition-transform">🎫</div>
                                <div className="flex gap-4 items-start relative z-10 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-2xl shadow-lg">
                                        🎟️
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Voucher Diskon 15%</h3>
                                        <p className="text-xs text-gray-400">Kupon diskon eksklusif untuk penyewaan perlengkapan selam mitra.</p>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-semibold text-gray-500">Syarat: <span className="text-slate-300">🥈 Medali Perak</span></span>
                                    </div>
                                    {topScore >= 75 ? (
                                        <button onClick={() => alert('Kode Voucher Anda: DIVE-SILVER-15')} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:scale-[1.02] text-white font-bold transition-all shadow-lg shadow-emerald-500/25">
                                            Lihat Kode Voucher
                                        </button>
                                    ) : (
                                        <button disabled className="w-full py-3 rounded-xl bg-gray-800 text-gray-500 font-bold cursor-not-allowed border border-gray-700">
                                            🔒 Terkunci (Butuh Nilai ≥ 75)
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Hadiah 3: Webinar */}
                            <div className={`p-6 rounded-3xl border flex flex-col relative overflow-hidden group ${isDark ? 'bg-[#0B1221]/80 backdrop-blur-md border-white/5' : 'bg-white border-gray-200 shadow-sm'}`}>
                                <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 text-7xl opacity-5 group-hover:scale-110 transition-transform">🎯</div>
                                <div className="flex gap-4 items-start relative z-10 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-fuchsia-600 flex items-center justify-center text-2xl shadow-lg">
                                        🎫
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Tiket VIP Webinar</h3>
                                        <p className="text-xs text-gray-400">Jalur khusus tanya jawab langsung dengan pakar biologi laut.</p>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-semibold text-gray-500">Syarat: <span className="text-yellow-400">🥇 Medali Emas</span></span>
                                    </div>
                                    {topScore >= 90 ? (
                                        <button onClick={() => alert('Berhasil mendaftar! Detail akses VIP Zoom dikirim via email.')} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:scale-[1.02] text-white font-bold transition-all shadow-lg shadow-purple-500/25">
                                            Klaim Tiket VIP
                                        </button>
                                    ) : (
                                        <button disabled className="w-full py-3 rounded-xl bg-gray-800 text-gray-500 font-bold cursor-not-allowed border border-gray-700">
                                            🔒 Terkunci (Butuh Nilai ≥ 90)
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Hadiah 4: Merch */}
                            <div className={`p-6 rounded-3xl border flex flex-col relative overflow-hidden group ${isDark ? 'bg-gradient-to-br from-[#0B1221] to-amber-900/20 border-amber-500/30' : 'bg-gradient-to-br from-amber-50 to-orange-100 border-amber-300 shadow-sm'}`}>
                                <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 text-7xl opacity-10 group-hover:scale-110 transition-transform">👕</div>
                                <div className="flex gap-4 items-start relative z-10 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center text-2xl shadow-lg border border-yellow-300/50">
                                        👕
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>T-Shirt Eksklusif</h3>
                                        <p className={`text-xs ${isDark ? 'text-amber-200/60' : 'text-amber-900/60'}`}>Merchandise fisik (T-Shirt) spesial untuk para peraih nilai sempurna!</p>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className={`text-xs font-semibold ${isDark ? 'text-amber-200/50' : 'text-amber-900/50'}`}>Syarat: <span className="text-yellow-400 font-bold">🏆 Trofi Ikan Mas</span></span>
                                    </div>
                                    {topScore >= 100 ? (
                                        <button onClick={() => alert('Isi formulir pengiriman di email Anda!')} className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:scale-[1.02] text-black font-black transition-all shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                                            Klaim T-Shirt Fisik
                                        </button>
                                    ) : (
                                        <button disabled className="w-full py-3 rounded-xl bg-black/40 text-white/30 font-bold cursor-not-allowed border border-white/10">
                                            🔒 Terkunci (Nilai Sempurna 100)
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* CTA ke Trophy Page */}
                        <div className="mt-10 text-center">
                            <button onClick={() => window.location.href = '/trophy'} className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-400 font-bold transition-all text-sm flex items-center justify-center gap-2 mx-auto">
                                <span>🏆</span> Lihat Lencana 3D Saya
                            </button>
                        </div>
                    </div>
                )}

                {activeMenu !== 0 && activeMenu !== 2 && activeMenu !== 3 && (
                    <div className="flex-grow flex flex-col items-center justify-center p-10 text-center">
                        <div className="text-6xl mb-4 opacity-50">🚧</div>
                        <h2 className="text-2xl font-bold text-white mb-2">Segera Hadir</h2>
                        <p className="text-gray-400">Menu ini sedang dalam tahap pengembangan.</p>
                    </div>
                )}
                </>
                )}

                {/* FOOTER */}
                <footer className={`mt-auto px-6 py-6 border-t text-center ${isDark ? "border-white/5" : "border-gray-200"}`}>
                    <p className={`text-[10px] tracking-[0.4em] font-bold uppercase ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                        © 2026 Tim DiveXplore-3D · Teknologi Informasi UNY
                    </p>
                </footer>
            </main>
        </div>
    );
}
