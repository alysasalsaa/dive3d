'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../lib/useTheme';

export default function TutorialPage() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Semua');

  const categories = ['Semua', 'Fotografi', 'Videografi', 'Storytelling', 'Editing', 'Etika'];

  const tutorials = [
    {
      id: 1,
      title: 'Fotografi Bawah Laut',
      description: 'Belajar teknik foto bawah laut untuk hasil yang tajam dan memukau.',
      category: 'Fotografi',
      duration: '06:32',
      icon: '📸',
      color: 'from-blue-500 to-cyan-400',
      progress: 0,
    },
    {
      id: 2,
      title: 'Teknik-Teknik Videografi',
      description: 'Kuasai teknik pengambilan gambar video yang stabil dan sinematik.',
      category: 'Videografi',
      duration: '08:15',
      icon: '🎥',
      color: 'from-purple-500 to-pink-500',
      progress: 0,
    },
    {
      id: 3,
      title: 'Storytelling Digital',
      description: 'Bangun cerita yang kuat untuk konten wisata bahari yang menarik.',
      category: 'Storytelling',
      duration: '07:40',
      icon: '📖',
      color: 'from-emerald-400 to-teal-500',
      progress: 0,
    },
    {
      id: 4,
      title: 'Editing dan Publishing Guide',
      description: 'Panduan editing dan publikasi konten ke berbagai platform secara efektif.',
      category: 'Editing',
      duration: '09:10',
      icon: '💻',
      color: 'from-amber-400 to-orange-500',
      progress: 0,
    },
    {
      id: 5,
      title: 'Etika dalam Membuat Konten',
      description: 'Pahami etika dan tanggung jawab saat membuat konten wisata bahari.',
      category: 'Etika',
      duration: '05:45',
      icon: '🤝',
      color: 'from-red-400 to-rose-500',
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
              Pusat{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Tutorial.
              </span>
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Tonton video pembelajaran interaktif untuk menguasai keterampilan pembuatan konten wisata bahari.
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

          {/* Tutorial Timeline */}
          <div className="relative flex flex-col gap-12 md:gap-24 py-10">
            {/* Timeline vertical line */}
            <div className={`absolute left-[40px] md:left-1/2 md:-translate-x-1/2 top-10 bottom-10 w-1 border-l-2 border-dashed ${isDark ? 'border-cyan-900/50' : 'border-blue-200'} z-0 hidden sm:block`} />

            {filteredTutorials.map((tutorial, index) => {
              const isEven = index % 2 === 0;
              return (
              <div
                key={tutorial.id}
                className={`relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 ${!isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Number Badge on Timeline */}
                <div className={`absolute left-[40px] md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 border-4 ${isDark ? 'border-[#00040a]' : 'border-sky-50'} text-white font-black text-2xl flex items-center justify-center z-20 shadow-[0_0_20px_rgba(6,182,212,0.5)] hidden sm:flex`}>
                  {index + 1}
                </div>

                {/* Left/Right Side: Video Thumbnail */}
                <div className={`w-full md:w-1/2 flex ${!isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className={`relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden border ${isDark ? 'border-white/10 bg-gradient-to-br from-blue-900/40 to-cyan-900/20' : 'border-gray-200 bg-gradient-to-br from-blue-200 to-cyan-100'} group cursor-pointer shadow-2xl transition-all hover:scale-[1.02] hover:shadow-cyan-500/20`}>
                    
                    {/* Placeholder Underwater Background Effect */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
                    <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-cyan-400/20 blur-[60px] rounded-full" />
                    
                    {/* Decorative Icons in background */}
                    <span className="absolute top-4 left-6 text-3xl opacity-20 transform -rotate-12">🐠</span>
                    <span className="absolute bottom-6 right-8 text-4xl opacity-10">🪸</span>
                    
                    {/* Big Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-[0_0_40px_rgba(255,255,255,0.4)] ${isDark ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-2">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-lg text-white text-sm font-bold font-mono">
                      {tutorial.duration}
                    </div>

                    {/* Number on mobile */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center sm:hidden shadow-lg border-2 border-white/20">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Right/Left Side: Content */}
                <div className={`w-full md:w-1/2 flex flex-col ${!isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} text-center md:text-left`}>
                  
                  {/* Category & Status */}
                  <div className={`flex flex-wrap items-center gap-3 mb-5 ${!isEven ? 'md:flex-row-reverse' : ''} justify-center md:justify-start`}>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border ${isDark ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-blue-100 border-blue-200 text-blue-700'}`}>
                      {tutorial.category}
                    </span>
                    <span className={`flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-full border ${tutorial.progress === 100 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : isDark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-white border-gray-200 text-gray-500'}`}>
                      {tutorial.progress === 100 ? (
                        <>✅ Selesai</>
                      ) : (
                        <>🕒 Belum Ditonton</>
                      )}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-3xl md:text-4xl font-black mb-4 transition-colors duration-300 ${isDark ? 'text-white hover:text-cyan-400' : 'text-gray-900 hover:text-blue-600'}`}>
                    {tutorial.title}
                  </h3>
                  <p className={`text-base md:text-lg leading-relaxed mb-6 ${!isEven ? 'md:ml-auto' : ''} max-w-md ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {tutorial.description}
                  </p>

                  {/* Decorative Elements */}
                  <div className={`hidden md:flex items-center gap-4 text-2xl opacity-40 animate-pulse mt-2 ${!isEven ? 'flex-row-reverse' : ''}`}>
                    <span className="animate-[bounce_3s_infinite]">🫧</span>
                    <span className="animate-[bounce_4s_infinite_0.5s]">🫧</span>
                    <span className="animate-[bounce_5s_infinite_1s]">🐟</span>
                  </div>

                </div>
              </div>
            )})}
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
