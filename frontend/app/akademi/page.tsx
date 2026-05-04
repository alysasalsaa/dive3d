'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getModules, getUserProgress } from '../../lib/api';
import type { ModuleData } from '../../lib/mockData';
import { useTheme } from '../../lib/useTheme';

// ============================================================
// LOADING SKELETON
// ============================================================
function ModuleSkeleton() {
  return (
    <div className="rounded-[28px] overflow-hidden bg-[#000814] border border-white/5 animate-pulse">
      <div className="h-44 bg-white/5" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-white/10 rounded-full w-3/4" />
        <div className="h-3 bg-white/5 rounded-full w-full" />
        <div className="h-3 bg-white/5 rounded-full w-2/3" />
      </div>
    </div>
  );
}

// ============================================================
// HALAMAN AKADEMI KONSERVASI
// ============================================================
export default function AkademiPage() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [progresses, setProgresses] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getModules()
      .then(async (modulesData) => {
        setModules(modulesData);

        // TAMBAHAN BARU KITA: Ambil progres API untuk semua modul
        const kantongSakti: Record<string, any> = {};
        for (const mod of modulesData) {
          kantongSakti[mod.id] = await getUserProgress(mod.id);
        }
        setProgresses(kantongSakti);

      })
      .finally(() => setLoading(false));
  }, []);


  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/gallery', label: 'Galeri' },
    { href: '/akademi', label: 'Akademi' },
    { href: '/tutorial', label: 'Tutorial' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'bg-[#00040a] text-white' : 'bg-sky-50 text-gray-900'}`}>
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

      {/* HERO */}
      <section className="relative pt-40 pb-20 px-6">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/15 blur-[120px] rounded-full" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className={`transition-colors hover:text-cyan-400 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Beranda
            </Link>
            <span className={isDark ? 'text-gray-700' : 'text-gray-400'}>›</span>
            <span className="text-cyan-400 font-bold">Akademi Konservasi</span>
          </div>

          <div className="max-w-3xl">
            <div className={`inline-block px-4 py-1.5 mb-6 rounded-full border text-[11px] font-black tracking-[0.2em] uppercase ${isDark ? 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300' : 'bg-cyan-500/10 border-cyan-400/20 text-cyan-600'}`}>
              🎓 Modul Pembelajaran 3D
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
              Akademi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                Konservasi.
              </span>
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Pilih modul pembelajaran dan mulai jelajahi ekosistem laut Raja
              Ampat dalam lingkungan 3D interaktif.
            </p>

            <div className="mt-8">
              <Link 
                href="/lms" 
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-transform shadow-xl shadow-blue-500/25"
              >
                <span>Buka Halaman LMS</span>
                <span className="text-xl">🚀</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CARD SHORTCUT KE HALAMAN MODEL 3D */}
      {/* ============================================================ */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/akademi/model-3d"
            className={`group relative flex flex-col md:flex-row items-center gap-8 p-8 rounded-[32px] border transition-all duration-500 hover:scale-[1.01] shadow-xl hover:shadow-2xl overflow-hidden ${isDark ? 'bg-[#000814] border-white/5 hover:border-cyan-500/30' : 'bg-white border-gray-100 hover:border-cyan-200 hover:shadow-cyan-100'}`}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon area */}
            <div className={`shrink-0 w-32 h-32 rounded-2xl flex items-center justify-center text-6xl shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${isDark ? 'bg-gradient-to-br from-cyan-900/50 to-blue-900/30 border border-cyan-500/20' : 'bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200'}`}>
              🪸
            </div>

            {/* Text */}
            <div className="flex-grow relative z-10">
              <div className={`inline-block px-3 py-1 mb-3 rounded-full border text-[10px] font-black tracking-[0.2em] uppercase ${isDark ? 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300' : 'bg-cyan-500/10 border-cyan-400/20 text-cyan-600'}`}>
                🔬 2 Spesimen Tersedia
              </div>
              <h2 className={`text-2xl md:text-3xl font-black mb-2 group-hover:text-cyan-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Eksplorasi Model 3D Biota Laut
              </h2>
              <p className={`text-sm leading-relaxed max-w-lg ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                Jelajahi Terumbu Karang dan Ikan Badut dalam tampilan 3D interaktif berteknologi WebGL. Putar, perbesar, dan amati setiap detail spesimen.
              </p>
              <div className="mt-4 flex items-center gap-2 text-cyan-400 font-bold text-sm group-hover:gap-3 transition-all">
                <span>Buka Halaman Model 3D</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            {/* Decorative icons */}
            <div className="shrink-0 hidden lg:flex flex-col gap-4 relative z-10 opacity-60 group-hover:opacity-100 transition-opacity">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>🐟</div>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>🌊</div>
            </div>
          </Link>
        </div>
      </section>

      {/* MODULE GRID */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Stats bar */}
          <div className="flex items-center gap-6 mb-10 text-sm">
            <div className={`flex items-center gap-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              <span className="text-lg">📚</span>
              <span className="font-bold">{modules.length} Modul</span>
            </div>
            <div className={`h-4 w-px ${isDark ? 'bg-white/10' : 'bg-gray-300'}`} />
            <div className={`flex items-center gap-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              <span className="text-lg">⏱️</span>
              <span className="font-bold">~68 menit total</span>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <ModuleSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((mod) => {
                const progress = progresses[mod.id] || { visitedPois: [], completed: false };
                const poiCount = mod.pois.length;
                const visitedCount = progress.visitedPois.length;
                const progressPct =
                  poiCount > 0 ? (visitedCount / poiCount) * 100 : 0;

                return (
                  <Link
                    key={mod.id}
                    href={`/akademi/${mod.id}`}
                    className="group relative block"
                  >
                    <div className={`relative rounded-[28px] overflow-hidden border transition-all duration-500 hover:scale-[1.01] shadow-xl hover:shadow-2xl ${isDark ? 'bg-[#000814] border-white/5 hover:border-white/15' : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-blue-100'}`}>
                      {/* Card header with gradient */}
                      <div
                        className="h-44 relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${mod.gradientFrom}20, ${mod.gradientTo}10)`,
                        }}
                      >
                        {/* Animated background pattern */}
                        <div
                          className="absolute inset-0 opacity-5"
                          style={{
                            backgroundImage:
                              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px',
                          }}
                        />

                        {/* Icon */}
                        <div className="absolute bottom-6 left-8 text-6xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                          {mod.icon}
                        </div>

                        {/* Difficulty badge */}
                        <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-[10px] font-bold text-white/70">
                          {mod.difficulty}
                        </div>

                        {/* Time estimate */}
                        <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-[10px] font-bold text-white/70 flex items-center gap-1">
                          <span>⏱️</span> {mod.estimatedTime}
                        </div>

                        {/* Status indicator */}
                        {progress.completed && (
                          <div className="absolute bottom-5 right-5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-black text-emerald-400">
                            ✅ Selesai
                          </div>
                        )}
                      </div>

                      {/* Card body */}
                      <div className="p-7">
                        <h3 className={`text-xl font-black mb-2 group-hover:text-cyan-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {mod.title}
                        </h3>
                        <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                          {mod.longDescription}
                        </p>

                        {/* Progress bar */}
                        <div className="mb-3">
                          <div className="flex justify-between text-[10px] mb-1.5">
                            <span className="text-gray-600 font-bold uppercase tracking-wider">
                              Progres
                            </span>
                            <span
                              className={`font-black ${progress.completed
                                ? 'text-emerald-400'
                                : 'text-cyan-400'
                                }`}
                            >
                              {Math.round(progressPct)}%
                            </span>
                          </div>
                          <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${progress.completed
                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                                : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                                }`}
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                        </div>

                        {/* POI count */}
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-medium ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                            {visitedCount} / {poiCount} titik dikunjungi
                          </span>
                          <span className="text-cyan-400 text-xs font-bold group-hover:translate-x-1 transition-transform">
                            Mulai →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-20 border-t text-center px-6 ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
        <p className={`text-[10px] tracking-[0.4em] font-bold uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
          © 2026 TIM DIVEXPLORE-3D • TEKNOLOGI INFORMASI UNY
        </p>
      </footer>
    </div>
  );
}
