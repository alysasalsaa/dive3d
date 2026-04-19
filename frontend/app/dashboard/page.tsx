'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardWireframe() {
    const pathname = usePathname();
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8000/api/dashboard')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setDashboardData(data.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching dashboard:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="flex h-screen items-center justify-center bg-gray-50 text-blue-600 font-bold text-xl animate-pulse">Memuat Dashboard...</div>;
    }

    if (!dashboardData) return(
        <div className="flex h-screen items-center justify-center bg-gray-50 text-red-500 font-bold text-xl">Gagal memuat API</div>
    );

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

            {/* Container Utama */}
            <div className="flex h-screen bg-gray-50 font-['Outfit'] text-gray-800">

                {/* NAVIGASI KONTROL: Sidebar */}
                <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-500 ease-in-out relative ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                    
                    {/* Header Area */}
                    <div className="h-24 flex items-center px-4 relative overflow-hidden border-b border-transparent">
                        {/* Tombol Utama / Logo */}
                        <div 
                            className={`p-2 rounded-xl transition-all duration-500 ease-in-out flex-shrink-0 flex items-center justify-center cursor-pointer ${isSidebarOpen ? 'bg-blue-100 text-blue-900 w-11 h-11' : 'bg-gradient-to-tr from-blue-500 to-cyan-400 text-white w-12 h-12 hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-cyan-400/50 mx-auto'}`} 
                            onClick={() => !isSidebarOpen && setIsSidebarOpen(true)} 
                            title={!isSidebarOpen ? "Expand Sidebar" : ""}
                        >
                            <span role="img" aria-label="rocket" className={`text-xl transition-transform duration-500 ${!isSidebarOpen ? 'animate-pulse' : ''}`}>🚀</span>
                        </div>
                        
                        {/* Teks Logo */}
                        <span className={`text-2xl font-bold text-blue-900 whitespace-nowrap ml-3 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none max-w-0'}`}>
                            SeaQuest
                        </span>
                        
                        {/* Tombol Minimize */}
                        <button 
                            onClick={() => setIsSidebarOpen(false)} 
                            className={`absolute right-4 text-gray-400 hover:text-blue-600 focus:outline-none transition-all duration-500 ease-in-out hover:scale-125 ${isSidebarOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180 pointer-events-none'}`} 
                            title="Minimize Sidebar"
                        >
                            <span role="img" aria-label="collapse" className="text-sm">◀️</span>
                        </button>
                    </div>

                    {/* Menu Items */}
                    <ul className="flex-1 mt-4 space-y-3 px-3 overflow-x-hidden">
                        {[
                            { icon: '📊', label: 'Dashboard Utama' },
                            { icon: '📚', label: 'Ruang Kelas' },
                            { icon: '👑', label: 'Leaderboard' },
                            { icon: '🎁', label: 'Klaim Hadiah' },
                            { icon: '⚙️', label: 'Pengaturan' },
                        ].map((item, idx) => (
                            <li key={idx} onClick={() => setActiveMenu(idx)} className={`flex items-center rounded-xl cursor-pointer transition-all duration-300 group ${activeMenu === idx ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'} ${isSidebarOpen ? 'p-3 gap-3' : 'justify-center p-3 w-12 h-12 mx-auto'}`} title={!isSidebarOpen ? item.label : ""}>
                                <div className={`flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-out ${isSidebarOpen ? 'w-6 h-6' : 'w-full h-full group-hover:scale-125 group-hover:rotate-12 group-active:scale-95'}`}>
                                    <span role="img" aria-label={item.label} className="text-xl">{item.icon}</span>
                                </div>
                                <span className={`whitespace-nowrap transition-all duration-500 ease-in-out overflow-hidden ${isSidebarOpen ? 'opacity-100 max-w-[200px] translate-x-0' : 'opacity-0 max-w-0 -translate-x-4 pointer-events-none'}`}>
                                    {item.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col overflow-y-auto">

                    {/* NAVIGASI KONTROL: Header (BAGIAN INI YANG DIUBAH) */}
                    <header className="bg-white/40 backdrop-blur-2xl px-6 py-5 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10 transition-all">
                        {/* Bagian Kiri: Profile Menu, Notifikasi, dan Judul dipindah ke kiri */}
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-tr from-blue-400 to-cyan-400 rounded-full cursor-pointer shadow-sm border-2 border-white" title="Profile Menu"></div>
                            <div className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors" title="Notifikasi">
                                <span role="img" aria-label="bell" className="text-xl">🔔</span>
                                <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="text-xl font-semibold text-gray-800 ml-2">Learning Page</div>
                        </div>

                        {/* Bagian Kanan: Global Navigation Bar (Desain persis seperti Gallery) */}
                        <div className="hidden md:flex items-center gap-1 bg-white/40 backdrop-blur-2xl p-1.5 rounded-full border border-blue-100 shadow-xl">
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
                    </header>

                    {/* Dashboard Content (SAMA PERSIS, TIDAK ADA YANG DIUBAH) */}
                    <div className="p-8 max-w-7xl mx-auto w-full space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* 1. KOMPONEN UTAMA: Profile */}
                            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-6">
                                <div className="w-24 h-24 bg-gradient-to-tr from-blue-400 to-cyan-400 rounded-full shadow-inner flex-shrink-0"></div>
                                <div className="flex-1">
                                    <div className="text-2xl font-bold text-gray-900">{dashboardData.user.name}</div>
                                    <div className="text-blue-600 font-medium mt-1 flex items-center gap-1">
                                        <span role="img" aria-label="stars">✨</span> Level {dashboardData.user.level} : {dashboardData.user.rank_name}
                                    </div>
                                    <div className="mt-4 bg-gray-100 rounded-full h-3 w-full overflow-hidden">
                                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(dashboardData.user.current_xp / dashboardData.user.next_level_xp) * 100}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 mt-2 font-medium">
                                        <span>{dashboardData.user.current_xp} XP Saat Ini</span>
                                        <span>Dibutuhkan {dashboardData.user.next_level_xp} XP untuk Level Up</span>
                                    </div>
                                </div>
                            </div>

                            {/* 1. KOMPONEN UTAMA: Badge (Lencana) */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
                                <div className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span role="img" aria-label="medal" className="text-xl">🏅</span> Koleksi Lencana
                                </div>
                                <div className="flex gap-4 justify-center">
                                    {dashboardData.badges.map((badge: any) => (
                                        <div key={badge.id} className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl cursor-pointer transition-all ${badge.achieved ? 'bg-blue-50 border-2 border-blue-400 shadow-sm' : 'bg-gray-50 border-2 border-dashed border-gray-300'}`} title={`${badge.name}: ${badge.tooltip}`}>
                                            <span role="img" aria-label={badge.name} className={badge.achieved ? 'opacity-100' : 'opacity-50 hover:opacity-100'}>{badge.icon}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 2. ELEMEN MONITORING: Status Progres Belajar */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <span role="img" aria-label="chart_up" className="text-xl">📈</span> Progres Belajar
                                </div>

                                <div className="space-y-5">
                                    {dashboardData.learning_progress.map((progress: any) => {
                                        const c = progress.color || "blue";
                                        return (
                                        <div key={progress.course_id}>
                                            <div className="flex justify-between text-sm font-medium mb-2">
                                                <span className="text-gray-700">{progress.title}</span>
                                                <span className={c === 'emerald' ? 'text-emerald-500' : c === 'amber' ? 'text-amber-500' : 'text-blue-500'}>{progress.progress_percentage}%</span>
                                            </div>
                                            <div className="bg-gray-100 rounded-full h-2 w-full overflow-hidden">
                                                <div className={c === 'emerald' ? 'bg-emerald-500 h-full rounded-full' : c === 'amber' ? 'bg-amber-500 h-full rounded-full' : 'bg-blue-500 h-full rounded-full'} style={{ width: `${progress.progress_percentage}%` }}></div>
                                            </div>
                                        </div>
                                    )})}
                                </div>
                            </div>

                            {/* 2. ELEMEN MONITORING: Ringkasan Skor Kuis */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <span role="img" aria-label="memo" className="text-xl">📝</span> Ringkasan Skor Kuis
                                </div>
                                <div className="space-y-4">
                                    {dashboardData.recent_quizzes.map((quiz: any) => {
                                        const c = quiz.color || 'blue';
                                        const borderClass = c === 'emerald' ? 'border-emerald-100 bg-emerald-50/30' : c === 'amber' ? 'border-amber-100 bg-amber-50/30' : 'border-blue-100 bg-blue-50/30';
                                        const textClass = c === 'emerald' ? 'text-emerald-600' : c === 'amber' ? 'text-amber-600' : 'text-blue-600';
                                        
                                        return (
                                        <div key={quiz.quiz_id} className={`flex justify-between items-center p-3 rounded-lg border ${borderClass}`}>
                                            <span className="text-sm font-medium text-gray-700">{quiz.title}</span>
                                            <span className={`text-sm font-bold ${textClass}`}>{quiz.score} / 100</span>
                                        </div>
                                    )})}
                                </div>
                            </div>
                        </div>

                        {/* 3. FITUR GAMIFIKASI: Leaderboard, Tantangan, Reward */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Gamifikasi: Leaderboard */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <span role="img" aria-label="crown" className="text-xl">👑</span> Leaderboard Top 3
                                </div>
                                <div className="space-y-4">
                                    {dashboardData.leaderboard.map((user: any) => {
                                        const rankColors: any = {
                                            1: "bg-yellow-50/50 border-transparent",
                                            2: "bg-gray-50 border-transparent",
                                            3: "bg-orange-50/50 border-orange-100"
                                        };
                                        const textColors: any = {
                                            1: "text-yellow-600",
                                            2: "text-gray-600",
                                            3: "text-orange-600"
                                        };
                                        const badgeColors: any = {
                                            1: "bg-yellow-400",
                                            2: "bg-gray-300",
                                            3: "bg-orange-400"
                                        };
                                        return (
                                        <div key={user.rank} className={`flex items-center gap-3 p-2 rounded-lg border ${rankColors[user.rank] || 'bg-white border-gray-100'}`}>
                                            <div className={`w-8 h-8 rounded-full ${badgeColors[user.rank] || 'bg-blue-300'} text-white flex items-center justify-center font-bold text-sm shadow-sm`}>{user.rank}</div>
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">{user.avatar_emoji}</div>
                                            <div className="flex-1">
                                                <div className={`text-sm font-bold ${user.rank === 3 ? 'text-blue-700' : 'text-gray-800'}`}>{user.name}</div>
                                                <div className={`text-xs font-medium ${textColors[user.rank] || 'text-gray-500'}`}>{user.xp} XP</div>
                                            </div>
                                        </div>
                                    )})}
                                </div>
                            </div>

                            {/* Gamifikasi: Tantangan Interaktif */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <span role="img" aria-label="crossed_swords" className="text-xl">⚔️</span> Tantangan Harian
                                </div>
                                <div className="space-y-4">
                                    {dashboardData.daily_challenges.map((challenge: any) => (
                                        <div key={challenge.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                            <div className="text-sm font-bold text-gray-800 mb-2">{challenge.title}</div>
                                            <div className="bg-gray-200 rounded-full h-1.5 w-full overflow-hidden mb-2">
                                                <div className={`${challenge.id % 2 === 0 ? 'bg-emerald-500' : 'bg-blue-500'} h-full rounded-full`} style={{ width: `${challenge.progress_percentage}%` }}></div>
                                            </div>
                                            <div className={`text-xs font-semibold flex items-center gap-1 ${challenge.id % 2 === 0 ? 'text-emerald-600' : 'text-blue-600'}`}>
                                                <span role="img" aria-label="reward">{challenge.reward_icon}</span> {challenge.reward_text}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Gamifikasi: Reward System */}
                            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 shadow-md border border-blue-800 flex flex-col justify-center items-center text-center">
                                <div className="font-bold text-yellow-400 mb-4 flex items-center gap-2 text-lg">
                                    <span role="img" aria-label="gift" className="text-xl">🎁</span> Reward System
                                </div>
                                <div className="mb-6">
                                    <div className="text-sm text-blue-200 font-medium mb-1">Total Gems Yang Anda Miliki:</div>
                                    <div className="text-4xl font-extrabold text-white flex items-center justify-center gap-2">
                                        <span role="img" aria-label="gem">💎</span> {dashboardData.user.gems}
                                    </div>
                                </div>
                                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-orange-950 font-bold py-3 px-4 rounded-xl transition-transform transform hover:-translate-y-1 shadow-lg">
                                    Buka Toko / Tukar Reward
                                </button>
                                <div className="mt-4 text-xs text-blue-300/80 font-medium">
                                    Ada 3 item e-book eksklusif yang bisa ditukar!
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* FOOTER */}
                    <footer className="bg-blue-950 text-blue-100 pt-16 pb-8 px-8 mt-auto border-t-4 border-cyan-500">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div>
                                <h4 className="text-2xl font-bold text-white mb-4">Divexplore-3D</h4>
                                <p className="text-sm text-blue-200 leading-relaxed">Platform pembelajaran konservasi laut interaktif berbasis 3D. Menjelajahi keindahan ekosistem dan biota laut Raja Ampat langsung dari layarmu.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-4">Tautan Cepat</h4>
                                <ul className="space-y-3 text-sm">
                                    <li><Link href="/" className="hover:text-cyan-400 transition-colors flex items-center"><span className="mr-2">›</span> Beranda</Link></li>
                                    <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors flex items-center"><span className="mr-2">›</span> Dashboard</Link></li>
                                    <li><Link href="/gallery" className="hover:text-cyan-400 transition-colors flex items-center"><span className="mr-2">›</span> Galeri</Link></li>
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
                </main>

            </div>

        </>
    );
}