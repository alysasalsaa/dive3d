'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../lib/useTheme';

export default function TutorialPage() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Semua');

  const categories = ['Semua', 'Pemula', 'Navigasi 3D', 'Fitur Lanjut'];

  const tutorials = [
    {
      id: 1,
      title: 'Dasar Navigasi 3D',
      description: 'Pelajari cara menggunakan mouse dan keyboard untuk bergerak, memutar kamera, dan berinteraksi di dalam lingkungan 3D Raja Ampat.',
      category: 'Navigasi 3D',
      duration: '5 min',
      icon: '🧭',
      color: 'from-blue-500 to-cyan-400',
      progress: 100,
    },
    {
      id: 2,
      title: 'Mengerjakan Kuis Interaktif',
      description: 'Panduan lengkap menemukan titik kuis (POI) pada terumbu karang dan mengumpulkan skor untuk mendapatkan lencana.',
      category: 'Fitur Lanjut',
      duration: '8 min',
      icon: '🎯',
      color: 'from-purple-500 to-pink-500',
      progress: 45,
    },
    {
      id: 3,
      title: 'Mengunggah Karya ke Galeri',
      description: 'Cara membagikan temuan 3D dan foto tangkapan layar (screenshot) Anda ke Galeri Komunitas agar dilihat oleh pengguna lain.',
      category: 'Pemula',
      duration: '4 min',
      icon: '📸',
      color: 'from-emerald-400 to-teal-500',
      progress: 0,
    },
    {
      id: 4,
      title: 'Membaca Dashboard Performa',
      description: 'Memahami cara kerja sistem lencana, leaderboard, dan statistik pembelajaran Anda selama menggunakan Divexplore.',
      category: 'Fitur Lanjut',
      duration: '6 min',
      icon: '📊',
      color: 'from-amber-400 to-orange-500',
      progress: 0,
    },
  ];

  const filteredTutorials = activeTab === 'Semua' 
    ? tutorials 
    : tutorials.filter(t => t.category === activeTab);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/gallery', label: 'Galeri' },
    { href: '/akademi', label: 'Akademi' },
    { href: '/tutorial', label: 'Tutorial' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <div className={`min-h-screen font-sans selection:bg-cyan-500/30 transition-colors duration-300 ${isDark ? 'bg-[#00040a] text-white' : 'bg-sky-50 text-gray-900'}`}>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 px-6 py-5 flex justify-between items-center">
        <div className={`flex items-center gap-3 backdrop-blur-xl py-2 px-5 rounded-full border shadow-xl transition-colors ${isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-blue-100 shadow-sm'}`}>
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-base">🌊</span>
          </div>
          <span className={`text-lg font-black tracking-widest pr-1 ${isDark ? 'text-white' : 'text-blue-900'}`}>
            DIVEXPLORE
          </span>
        </div>

        <div className={`hidden md:flex items-center gap-1 backdrop-blur-2xl p-1.5 rounded-full border transition-colors ${isDark ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white/80 border-gray-200 shadow-sm'}`}>
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg shadow-blue-600/20'
                    : isDark
                      ? 'hover:bg-white/5 text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <button
          onClick={toggleTheme}
          title={isDark ? 'Mode Gelap' : 'Mode Terang'}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all text-base ${isDark ? 'bg-white/10 hover:bg-white/20 border border-white/10' : 'bg-white hover:bg-gray-100 border border-gray-200 shadow-sm'}`}
        >
          {isDark ? '🌙' : '☀️'}
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background glow elements */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/20 blur-[150px] rounded-[100%] pointer-events-none" />
        <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className={`transition-colors hover:text-cyan-400 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Beranda
            </Link>
            <span className={isDark ? 'text-gray-700' : 'text-gray-400'}>›</span>
            <span className="text-cyan-400 font-bold">Pusat Tutorial</span>
          </div>

          <div className="max-w-3xl">
            <div className={`inline-block px-4 py-1.5 mb-6 rounded-full border text-[11px] font-black tracking-[0.2em] uppercase backdrop-blur-md ${isDark ? 'bg-blue-500/10 border-blue-400/20 text-blue-300' : 'bg-blue-500/10 border-blue-400/20 text-blue-600'}`}>
              💡 Pusat Bantuan & Panduan
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
              Kuasai{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Eksplorasi.
              </span>
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Pelajari semua fitur Divexplore-3D, mulai dari navigasi dasar hingga cara mendapatkan lencana di modul akademi konservasi.
            </p>
          </div>
        </div>
      </section>

      {/* TUTORIAL CONTENT SECTION */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === cat
                    ? isDark
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                      : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : isDark
                      ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                      : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-800 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tutorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredTutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className={`group relative rounded-[28px] overflow-hidden transition-all duration-500 border ${isDark ? 'bg-[#000814] border-white/5 hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]' : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-xl'}`}
              >
                {/* Background Hover Glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${tutorial.color} transition-opacity duration-500 pointer-events-none`} />

                <div className="p-8">
                  {/* Header Card */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tutorial.color} flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                      {tutorial.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border ${isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
                        {tutorial.category}
                      </span>
                      <span className="text-gray-500 text-xs font-bold flex items-center gap-1">
                        ⏱️ {tutorial.duration}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className={`text-2xl font-black mb-3 group-hover:text-cyan-400 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {tutorial.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {tutorial.description}
                  </p>

                  {/* Progress Section */}
                  <div className="mt-auto">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Progres Pembelajaran
                      </span>
                      <span className={`text-sm font-black ${tutorial.progress === 100 ? 'text-emerald-400' : 'text-cyan-400'}`}>
                        {tutorial.progress}%
                      </span>
                    </div>
                    
                    <div className={`h-2 w-full rounded-full overflow-hidden backdrop-blur-sm ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                      <div 
                        className={`h-full rounded-full relative overflow-hidden transition-all duration-1000 ease-out ${
                          tutorial.progress === 100 
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' 
                            : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                        }`}
                        style={{ width: `${tutorial.progress}%` }}
                      >
                        {/* Shimmer effect inside progress bar */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className={`mt-8 pt-6 border-t flex justify-between items-center ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                    <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {tutorial.progress === 100 ? '✅ Selesai dipelajari' : 'Lanjutkan membaca'}
                    </span>
                    <button className={`w-10 h-10 rounded-full flex items-center justify-center text-cyan-400 transition-colors ${isDark ? 'bg-white/5 hover:bg-white/15' : 'bg-blue-50 hover:bg-blue-100'}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Tutorial CTA */}
          <div className={`mt-20 relative rounded-[32px] overflow-hidden border p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 ${isDark ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/20 border-cyan-500/20' : 'bg-gradient-to-br from-blue-700 to-blue-900 border-blue-600/30'}`}>
            {/* Animated particles background */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #06b6d4 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Video Panduan Lengkap
              </div>
              <h2 className={`text-3xl md:text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Lebih Suka Menonton?</h2>
              <p className={`mb-8 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Tonton seri video tutorial lengkap kami yang memandu Anda langkah demi langkah dalam menggunakan platform Divexplore-3D.
              </p>
              <button className="px-8 py-3.5 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <span>▶️</span> Tonton Video Sekarang
              </button>
            </div>

            {/* Video Thumbnail Mockup */}
            <div className="relative z-10 w-full md:w-1/2 aspect-video bg-black/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              {/* Play Button */}
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-white border-b-8 border-b-transparent ml-1" />
              </div>
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-white font-bold text-sm">Tur Lengkap Divexplore</p>
                <p className="text-gray-300 text-xs">12:45</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-10 border-t text-center px-6 relative z-10 ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
        <p className={`text-[10px] tracking-[0.4em] font-bold uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
          © 2026 TIM DIVEXPLORE-3D • TEKNOLOGI INFORMASI UNY
        </p>
      </footer>
    </div>
  );
}
