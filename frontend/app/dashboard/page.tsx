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
                            <p className={`font-bold text-sm leading-none ${isDark ? "text-white" : "text-gray-900"}`}>{dashboardData.user.name}</p>
                            <p className="text-cyan-400 text-xs mt-0.5">Level {dashboardData.user.level} · {dashboardData.user.rank_name}</p>
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

                    {/* Row 1: Profile + Badges */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        {/* Profile Card */}
                        <div className={`md:col-span-2 backdrop-blur-xl rounded-2xl p-6 border ${isDark ? "bg-white/[0.04] border-white/10" : "bg-white border-gray-100 shadow-sm"} flex items-center gap-6 hover:border-blue-500/30 transition-colors`}>
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex-shrink-0 shadow-xl shadow-blue-500/30 flex items-center justify-center text-3xl">
                                🤿
                            </div>
                            <div className="flex-1 min-w-0">
                                <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{dashboardData.user.name}</h2>
                                <p className="text-cyan-400 text-sm font-semibold mt-0.5">✨ Level {dashboardData.user.level} · {dashboardData.user.rank_name}</p>
                                <div className={`mt-4 rounded-full h-2 overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-700"
                                        style={{ width: `${(dashboardData.user.current_xp / dashboardData.user.next_level_xp) * 100}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1.5 font-medium">
                                    <span>{dashboardData.user.current_xp} XP</span>
                                    <span>Target {dashboardData.user.next_level_xp} XP</span>
                                </div>
                            </div>
                        </div>

                        {/* Badges */}
                        <Link href="/dashboard/badges" className={`block backdrop-blur-xl rounded-2xl p-6 border ${isDark ? "bg-white/[0.04] border-white/10" : "bg-white border-gray-100 shadow-sm"} hover:border-blue-500/30 hover:-translate-y-1 transition-all cursor-pointer group`}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className={`font-bold flex items-center gap-2 text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                                    <span>🏅</span> Koleksi Lencana
                                </h3>
                                <span className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity font-bold ${isDark ? "text-cyan-400" : "text-blue-600"}`}>Detail Lencana ➔</span>
                            </div>
                            <div className="flex gap-3 flex-wrap justify-center">
                                {dashboardData.badges.map((badge: any) => (
                                    <div
                                        key={badge.id}
                                        title={`${badge.name}: ${badge.tooltip}`}
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all cursor-pointer
                                            ${badge.achieved
                                                ? 'bg-gradient-to-br from-blue-600/40 to-cyan-500/20 border border-cyan-400/40 shadow-lg shadow-cyan-500/10 hover:scale-110'
                                                : 'bg-white/5 border border-white/10 opacity-40 grayscale'
                                            }`}
                                    >
                                        {badge.icon}
                                    </div>
                                ))}
                            </div>
                        </Link>
                    </div>

                    {/* Row 2: Progress + Quiz */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Progres Belajar */}
                        <div className={`backdrop-blur-xl rounded-2xl p-6 border ${isDark ? "bg-white/[0.04] border-white/10" : "bg-white border-gray-100 shadow-sm"} hover:border-blue-500/30 transition-colors`}>
                            <h3 className={`font-bold mb-5 flex items-center gap-2 text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                                <span>📈</span> Progres Belajar
                            </h3>
                            <div className="space-y-5">
                                {dashboardData.learning_progress.map((progress: any) => {
                                    const colorMap: Record<string, string> = {
                                        emerald: 'from-emerald-500 to-teal-400',
                                        amber: 'from-amber-500 to-orange-400',
                                        blue: 'from-blue-500 to-cyan-400',
                                    };
                                    const textMap: Record<string, string> = {
                                        emerald: 'text-emerald-400',
                                        amber: 'text-amber-400',
                                        blue: 'text-cyan-400',
                                    };
                                    const c = progress.color || 'blue';
                                    return (
                                        <div key={progress.course_id}>
                                            <div className="flex justify-between text-xs font-semibold mb-2">
                                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{progress.title}</span>
                                                <span className={textMap[c] || 'text-cyan-400'}>{progress.progress_percentage}%</span>
                                            </div>
                                            <div className={`rounded-full h-2 overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                                                <div
                                                    className={`bg-gradient-to-r ${colorMap[c] || colorMap.blue} h-full rounded-full`}
                                                    style={{ width: `${progress.progress_percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Ringkasan Kuis */}
                        <div className={`backdrop-blur-xl rounded-2xl p-6 border ${isDark ? "bg-white/[0.04] border-white/10" : "bg-white border-gray-100 shadow-sm"} hover:border-blue-500/30 transition-colors`}>
                            <h3 className={`font-bold mb-5 flex items-center gap-2 text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                                <span>📝</span> Ringkasan Skor Kuis
                            </h3>
                            <div className="space-y-3">
                                {dashboardData.recent_quizzes.length === 0 && (
                                    <p className="text-sm text-gray-500 text-center py-4">Belum ada kuis yang dikerjakan.</p>
                                )}
                                {dashboardData.recent_quizzes.map((quiz: any) => {
                                    const c = quiz.color || 'blue';
                                    const bgMap: Record<string, string> = {
                                        emerald: 'bg-emerald-500/10 border-emerald-500/20',
                                        amber: 'bg-amber-500/10 border-amber-500/20',
                                        blue: 'bg-blue-500/10 border-blue-500/20',
                                    };
                                    const textMap: Record<string, string> = {
                                        emerald: 'text-emerald-400',
                                        amber: 'text-amber-400',
                                        blue: 'text-cyan-400',
                                    };
                                    return (
                                        <div key={quiz.quiz_id} className={`flex justify-between items-center p-3 rounded-xl border ${bgMap[c] || bgMap.blue}`}>
                                            <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>{quiz.title}</span>
                                            <span className={`text-sm font-black ${textMap[c] || 'text-cyan-400'}`}>{quiz.score} / {quiz.max_score ?? 100}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Leaderboard + Tantangan + Reward */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        {/* Leaderboard */}
                        <div className={`backdrop-blur-xl rounded-2xl p-6 border ${isDark ? "bg-white/[0.04] border-white/10" : "bg-white border-gray-100 shadow-sm"} hover:border-yellow-500/20 transition-colors`}>
                            <h3 className={`font-bold mb-5 flex items-center gap-2 text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                                <span>👑</span> Leaderboard Top 3
                            </h3>
                            <div className="space-y-3">
                                {dashboardData.leaderboard.map((user: any) => {
                                    const rankStyle: Record<number, string> = {
                                        1: 'border-yellow-500/30 bg-yellow-500/10',
                                        2: 'border-gray-400/20 bg-gray-400/10',
                                        3: 'border-orange-500/20 bg-orange-500/10',
                                    };
                                    const rankBadge: Record<number, string> = {
                                        1: 'bg-gradient-to-br from-yellow-400 to-orange-400',
                                        2: 'bg-gradient-to-br from-gray-300 to-gray-400',
                                        3: 'bg-gradient-to-br from-orange-400 to-amber-500',
                                    };
                                    return (
                                        <div key={user.rank} className={`flex items-center gap-3 p-2.5 rounded-xl border ${rankStyle[user.rank] || 'border-white/10 bg-white/5'}`}>
                                            <div className={`w-7 h-7 rounded-full ${rankBadge[user.rank] || 'bg-blue-500'} text-white flex items-center justify-center font-black text-xs shadow-sm`}>{user.rank}</div>
                                            <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-lg">{user.avatar_emoji}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-bold truncate ${isDark ? "text-white" : "text-gray-900"}`}>{user.name}</p>
                                                <p className="text-xs text-gray-400 font-medium">{user.xp} XP</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Tantangan Harian */}
                        <div className={`backdrop-blur-xl rounded-2xl p-6 border ${isDark ? "bg-white/[0.04] border-white/10" : "bg-white border-gray-100 shadow-sm"} hover:border-blue-500/30 transition-colors`}>
                            <h3 className={`font-bold mb-5 flex items-center gap-2 text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                                <span>⚔️</span> Tantangan Harian
                            </h3>
                            <div className="space-y-4">
                                {dashboardData.daily_challenges.map((challenge: any) => {
                                    const isEven = challenge.id % 2 === 0;
                                    return (
                                        <div key={challenge.id} className={`p-4 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-100"}`}>
                                            <p className={`text-sm font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{challenge.title}</p>
                                            <div className={`rounded-full h-1.5 overflow-hidden mb-2 ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
                                                <div
                                                    className={`h-full rounded-full ${isEven ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-blue-500 to-cyan-400'}`}
                                                    style={{ width: `${challenge.progress_percentage}%` }}
                                                />
                                            </div>
                                            <p className={`text-xs font-semibold flex items-center gap-1 ${isEven ? 'text-emerald-400' : 'text-cyan-400'}`}>
                                                <span>{challenge.reward_icon}</span> {challenge.reward_text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Reward System */}
                        <div className="bg-gradient-to-br from-blue-700 to-blue-900 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 flex flex-col justify-center items-center text-center hover:border-blue-400/50 transition-colors shadow-lg shadow-blue-900/20">
                            <h3 className="font-bold text-yellow-400 mb-4 flex items-center gap-2 text-sm">
                                <span>🎁</span> Reward System
                            </h3>
                            <p className="text-xs text-blue-200 mb-1">Total Gems Anda</p>
                            <div className="text-5xl font-black text-white flex items-center gap-2 mb-6">
                                <span>💎</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">{dashboardData.user.gems}</span>
                            </div>
                            <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:opacity-90 text-orange-950 font-black py-3 px-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-yellow-500/20 text-sm">
                                Tukar Reward
                            </button>
                            <p className="mt-3 text-xs text-blue-300/70">3 item e-book eksklusif tersedia</p>
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
