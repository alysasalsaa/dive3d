import React from 'react';
import Link from 'next/link';

export default function DashboardWireframe() {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

            {/* Container Utama */}
            <div className="flex h-screen bg-gray-50 font-['Outfit'] text-gray-800">

                {/* NAVIGASI KONTROL: Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-6 text-2xl font-bold text-blue-900 flex items-center gap-3">
                        <span role="img" aria-label="rocket" className="bg-blue-100 p-2 rounded-lg text-xl">🚀</span>
                        SeaQuest
                    </div>

                    {/* TOMBOL KEMBALI KE BERANDA */}
                    <div className="px-4 mb-4">
                        <Link href="/">
                            <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-all border border-gray-200">
                                <span role="img" aria-label="back">⬅️</span> Kembali ke Beranda
                            </button>
                        </Link>
                    </div>

                    <ul className="flex-1 px-4 space-y-2 mt-2">
                        <li className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 font-semibold rounded-xl cursor-pointer">
                            <span role="img" aria-label="chart">📊</span> Dashboard Utama
                        </li>
                        <li className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors">
                            <span role="img" aria-label="books">📚</span> Ruang Kelas
                        </li>
                        <li className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors">
                            <span role="img" aria-label="crown">👑</span> Leaderboard
                        </li>
                        <li className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors">
                            <span role="img" aria-label="gift">🎁</span> Klaim Hadiah
                        </li>
                        <li className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors">
                            <span role="img" aria-label="settings">⚙️</span> Pengaturan
                        </li>
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
                            <Link href="/" className="px-6 py-2 rounded-full hover:bg-white/50 text-gray-600 hover:text-blue-600 transition-all text-sm font-semibold">Beranda</Link>
                            <Link href="/gallery" className="px-6 py-2 rounded-full hover:bg-white/50 text-gray-600 hover:text-blue-600 transition-all text-sm font-semibold">Galeri</Link>
                            <Link href="/dashboard" className="px-6 py-2 rounded-full bg-blue-600 text-white font-bold text-sm shadow-md">Dashboard</Link>
                            <Link href="/tutorial" className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-600/20 transition-all">
                                Mulai Belajar
                            </Link>
                        </div>
                    </header>

                    {/* Dashboard Content (SAMA PERSIS, TIDAK ADA YANG DIUBAH) */}
                    <div className="p-8 max-w-7xl mx-auto w-full space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* 1. KOMPONEN UTAMA: Profile */}
                            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-6">
                                <div className="w-24 h-24 bg-gradient-to-tr from-blue-400 to-cyan-400 rounded-full shadow-inner flex-shrink-0"></div>
                                <div className="flex-1">
                                    <div className="text-2xl font-bold text-gray-900">Maulana Yudo Yudistira</div>
                                    <div className="text-blue-600 font-medium mt-1 flex items-center gap-1">
                                        <span role="img" aria-label="stars">✨</span> Level 0 : Rookie
                                    </div>
                                    <div className="mt-4 bg-gray-100 rounded-full h-3 w-full overflow-hidden">
                                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 mt-2 font-medium">
                                        <span>0 XP Saat Ini</span>
                                        <span>Dibutuhkan 5,000 XP untuk Level Up</span>
                                    </div>
                                </div>
                            </div>

                            {/* 1. KOMPONEN UTAMA: Badge (Lencana) */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
                                <div className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span role="img" aria-label="medal" className="text-xl">🏅</span> Koleksi Lencana
                                </div>
                                <div className="flex gap-4 justify-center">
                                    <div className="w-14 h-14 bg-gray-50 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-2xl hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer" title="Pembelajar Cepat"><span role="img" aria-label="lightning" className="opacity-50 hover:opacity-100">⚡</span></div>
                                    <div className="w-14 h-14 bg-gray-50 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-2xl hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer" title="Nilai Sempurna"><span role="img" aria-label="target" className="opacity-50 hover:opacity-100">🎯</span></div>
                                    <div className="w-14 h-14 bg-gray-50 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-2xl hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer" title="Login Beruntun 7 Hari"><span role="img" aria-label="fire" className="opacity-50 hover:opacity-100">🔥</span></div>
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
                                    <div>
                                        <div className="flex justify-between text-sm font-medium mb-2">
                                            <span className="text-gray-700">Desain UI/UX Masterclass</span>
                                            <span className="text-emerald-500">0%</span>
                                        </div>
                                        <div className="bg-gray-100 rounded-full h-2 w-full overflow-hidden">
                                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: "0%" }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm font-medium mb-2">
                                            <span className="text-gray-700">Pemrograman JavaScript Dasar</span>
                                            <span className="text-blue-500">0%</span>
                                        </div>
                                        <div className="bg-gray-100 rounded-full h-2 w-full overflow-hidden">
                                            <div className="bg-blue-500 h-full rounded-full" style={{ width: "0%" }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm font-medium mb-2">
                                            <span className="text-gray-700">Pengantar Data Science</span>
                                            <span className="text-amber-500">0%</span>
                                        </div>
                                        <div className="bg-gray-100 rounded-full h-2 w-full overflow-hidden">
                                            <div className="bg-amber-500 h-full rounded-full" style={{ width: "0%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 2. ELEMEN MONITORING: Ringkasan Skor Kuis */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <span role="img" aria-label="memo" className="text-xl">📝</span> Ringkasan Skor Kuis
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 rounded-lg border border-emerald-100 bg-emerald-50/30">
                                        <span className="text-sm font-medium text-gray-700">Kuis: Teori Warna (UI/UX)</span>
                                        <span className="text-sm font-bold text-emerald-600">0 / 100</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-lg border border-amber-100 bg-amber-50/30">
                                        <span className="text-sm font-medium text-gray-700">Kuis: Logika Percabangan (JS)</span>
                                        <span className="text-sm font-bold text-amber-600">0 / 100</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-lg border border-blue-100 bg-blue-50/30">
                                        <span className="text-sm font-medium text-gray-700">Ujian Tengah Semester</span>
                                        <span className="text-sm font-bold text-blue-600">0 / 100</span>
                                    </div>
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
                                    <div className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50/50">
                                        <div className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center font-bold text-sm shadow-sm">1</div>
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">👨</div>
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-gray-800">Rama Putra M.</div>
                                            <div className="text-xs text-yellow-600 font-medium">0 XP</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                                        <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold text-sm shadow-sm">2</div>
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">👨‍🦱</div>
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-gray-800">Abyan Bergas I.</div>
                                            <div className="text-xs text-gray-600 font-medium">0 XP</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 rounded-lg bg-orange-50/50 border border-orange-100">
                                        <div className="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold text-sm shadow-sm">3</div>
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">👨</div>
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-blue-700">Maulana Yudo Y.</div>
                                            <div className="text-xs text-orange-600 font-medium">0 XP</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Gamifikasi: Tantangan Interaktif */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <span role="img" aria-label="crossed_swords" className="text-xl">⚔️</span> Tantangan Harian
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                        <div className="text-sm font-bold text-gray-800 mb-2">Selesaikan 2 Materi Video</div>
                                        <div className="bg-gray-200 rounded-full h-1.5 w-full overflow-hidden mb-2">
                                            <div className="bg-blue-500 h-full rounded-full" style={{ width: "0%" }}></div>
                                        </div>
                                        <div className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                                            <span role="img" aria-label="gem">💎</span> +150 Gems & 1 Mystery Box
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                        <div className="text-sm font-bold text-gray-800 mb-2">Dapatkan Skor Penuh di Kuis</div>
                                        <div className="bg-gray-200 rounded-full h-1.5 w-full overflow-hidden mb-2">
                                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: "0%" }}></div>
                                        </div>
                                        <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                                            <span role="img" aria-label="star">🌟</span> Lencana Emas Spesial
                                        </div>
                                    </div>
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
                                        <span role="img" aria-label="gem">💎</span> 0
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
                </main>
            </div>
        </>
    );
}