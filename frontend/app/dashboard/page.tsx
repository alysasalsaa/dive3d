'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../lib/useTheme';

export default function DashboardPage() {
    const pathname = usePathname();
    const { isDark, toggleTheme } = useTheme();
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            window.location.href = '/login';
            return;
        }
        fetch('http://localhost:8000/api/dashboard', {
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
        { icon: '📊', label: 'Dashboard' },
        { icon: '📚', label: 'Ruang Kelas' },
        { icon: '👑', label: 'Leaderboard' },
        { icon: '🎁', label: 'Klaim Hadiah' },
        { icon: '⚙️', label: 'Pengaturan' },
    ];

    const userName = dashboardData.user?.name || 'Pengguna';
    const xp = dashboardData.user?.current_xp || 0;
    const targetXp = dashboardData.user?.next_level_xp || 500;
    const level = dashboardData.user?.level || 0;
    const rankName = dashboardData.user?.rank_name || 'Rookie';

    const completedQuizzesCount = dashboardData.recent_quizzes?.filter((q: any) => q.score === 100).length || 0;
    const totalModules = 4;
    const totalVideos = 4;
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
                        className={`w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0 cursor-pointer`}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <span className="text-lg">🌊</span>
                    </div>
                    <span className={`ml-3 text-base font-black tracking-widest whitespace-nowrap ${isDark ? "text-white" : "text-blue-900"} transition-all duration-500 ${isSidebarOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                        DIVEXPLORE
                    </span>
                </div>

                {/* Menu */}
                <ul className="flex-1 py-4 px-2 space-y-1 overflow-x-hidden">
                    {menuItems.map((item, idx) => (
                        <li
                            key={idx}
                            onClick={() => setActiveMenu(idx)}
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
                            <p className={`font-bold text-sm leading-none ${isDark ? "text-white" : "text-gray-900"}`}>{userName}</p>
                            <p className="text-cyan-400 text-xs mt-0.5">Level {level} · {rankName}</p>
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
                                    <span className="text-3xl font-bold text-cyan-400">{Math.round((completedQuizzesCount / totalModules) * 100)}%</span>
                                    <span className="text-xs text-gray-500 font-medium">{completedQuizzesCount} / {totalModules} Modul</span>
                                </div>
                                <div className={`h-1.5 rounded-full w-full mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                    <div className="h-full rounded-full bg-cyan-400" style={{ width: `${(completedQuizzesCount / totalModules) * 100}%` }} />
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
                                    <span className="text-3xl font-bold text-cyan-400">{Math.round((completedQuizzesCount / totalVideos) * 100)}%</span>
                                    <span className="text-xs text-gray-500 font-medium">{completedQuizzesCount} / {totalVideos} Video</span>
                                </div>
                                <div className={`h-1.5 rounded-full w-full mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                    <div className="h-full rounded-full bg-cyan-400" style={{ width: `${(completedQuizzesCount / totalVideos) * 100}%` }} />
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
                                    <p className="text-3xl font-bold text-cyan-400 mb-1">0</p>
                                    <p className="text-xs text-gray-500">Diajukan</p>
                                </div>
                                <div className="text-center w-1/2">
                                    <p className="text-3xl font-bold text-cyan-400 mb-1">0</p>
                                    <p className="text-xs text-gray-500">Disetujui</p>
                                </div>
                            </div>
                            <Link href="/dashboard" className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 mt-auto">
                                Kelola Konten ➔
                            </Link>
                        </div>

                        {/* Koleksi Lencana */}
                        <div className={`rounded-2xl p-6 border flex flex-col ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-gray-200 shadow-sm'}`}>
                            <div className="flex items-start gap-3 mb-6">
                                <div className="text-xl text-orange-400">🏅</div>
                                <div>
                                    <h3 className="font-semibold text-sm">Koleksi Lencana</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Lencana yang diperoleh</p>
                                </div>
                            </div>
                            <div className="flex justify-center gap-3 mb-6">
                                {/* Badges placeholder */}
                                {['🪸','🔍','🌊','🏆','⭐'].map((icon, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg opacity-40 grayscale">
                                        {icon}
                                    </div>
                                ))}
                            </div>
                            <div className="mb-4">
                                <span className="text-2xl font-bold text-cyan-400">0</span>
                                <span className="text-lg font-bold text-gray-600"> / 10</span>
                                <p className="text-xs text-gray-500 mt-1">Lencana Terkumpul</p>
                            </div>
                            <Link href="/dashboard/badges" className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 mt-auto">
                                Lihat Semua Lencana ➔
                            </Link>
                        </div>

                        {/* Claim Sertifikat */}
                        <div className={`rounded-2xl p-6 border ${isDark ? 'bg-[#0B1221] border-yellow-500/30' : 'bg-yellow-50 border-yellow-300 shadow-sm'}`}>
                            <div className="flex items-start gap-3 mb-5">
                                <div className="text-xl text-yellow-400">📜</div>
                                <div>
                                    <h3 className="font-semibold text-sm">Claim Sertifikat</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Klaim sertifikat setelah memenuhi syarat.</p>
                                </div>
                            </div>
                            
                            <div className={`rounded-xl p-4 border ${isDark ? 'bg-[#0F172A]/50 border-white/5' : 'bg-white border-gray-200'}`}>
                                <p className="text-xs font-semibold mb-3">Cek Kelayakan Sertifikat</p>
                                <ul className="space-y-2 text-xs text-gray-400">
                                    <li className="flex justify-between items-center">
                                        <span className="flex items-center gap-2"><span className={completedQuizzesCount >= totalModules ? "text-green-500" : "text-gray-600"}>✔</span> Selesaikan semua Modul Akademik</span>
                                        <span className="flex items-center gap-1">{completedQuizzesCount} / {totalModules} {completedQuizzesCount >= totalModules ? <span className="text-green-500">✅</span> : <span className="text-red-500">❌</span>}</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span className="flex items-center gap-2"><span className={completedQuizzesCount >= totalVideos ? "text-green-500" : "text-gray-600"}>✔</span> Tonton semua Video Tutorial</span>
                                        <span className="flex items-center gap-1">{completedQuizzesCount} / {totalVideos} {completedQuizzesCount >= totalVideos ? <span className="text-green-500">✅</span> : <span className="text-red-500">❌</span>}</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span className="flex items-center gap-2"><span className="text-gray-600">✔</span> Minimal 1 Konten Disetujui</span>
                                        <span className="flex items-center gap-1">0 / 1 <span className="text-red-500">❌</span></span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span className="flex items-center gap-2"><span className={completedQuizzesCount >= totalKuis ? "text-green-500" : "text-gray-600"}>✔</span> Selesaikan semua Kuis</span>
                                        <span className="flex items-center gap-1">{completedQuizzesCount} / {totalKuis} {completedQuizzesCount >= totalKuis ? <span className="text-green-500">✅</span> : <span className="text-red-500">❌</span>}</span>
                                    </li>
                                </ul>

                                <button disabled className="w-full mt-4 py-2.5 rounded-lg bg-gray-800 text-gray-500 font-semibold text-xs border border-white/5 cursor-not-allowed flex items-center justify-center gap-2">
                                    <span>🔒</span> Claim Sertifikat
                                </button>
                                <p className="text-[10px] text-red-400 text-center mt-2">Lengkapi syarat untuk mengaktifkan tombol.</p>
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
                    <div className={`rounded-2xl p-8 border border-dashed flex items-center justify-center gap-4 ${isDark ? 'bg-transparent border-white/10' : 'bg-gray-50 border-gray-300'}`}>
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-gray-500">
                            🏅
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-300 mb-1">Belum ada sertifikat yang diklaim.</p>
                            <p className="text-xs text-gray-500">Selesaikan semua syarat dan klaim sertifikat pertamamu!</p>
                        </div>
                    </div>
                </div>

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
