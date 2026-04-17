'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getModules } from '../../lib/api';
import { getMockProgress } from '../../lib/mockData';
import type { ModuleData } from '../../lib/mockData';
import ModelViewer from '../../components/ModelViewer';

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
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getModules()
      .then(setModules)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#00040a] text-white font-sans">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl py-2 px-5 rounded-full border border-white/10 shadow-2xl">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-base">🌊</span>
          </div>
          <span className="text-lg font-black tracking-widest text-white pr-1">
            DIVEXPLORE
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-2xl p-1.5 rounded-full border border-white/10 shadow-2xl">
          <Link
            href="/"
            className="px-6 py-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all text-sm font-semibold"
          >
            Beranda
          </Link>
          <Link
            href="/gallery"
            className="px-6 py-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all text-sm font-semibold"
          >
            Galeri
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all text-sm font-semibold"
          >
            Dashboard
          </Link>
          <Link
            href="/akademi"
            className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-600/20 transition-all"
          >
            Akademi
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-40 pb-20 px-6">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/15 blur-[120px] rounded-full" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="text-gray-700">›</span>
            <span className="text-cyan-400 font-bold">Akademi Konservasi</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[11px] font-black tracking-[0.2em] uppercase">
              🎓 Modul Pembelajaran 3D
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
              Akademi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                Konservasi.
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              Pilih modul pembelajaran dan mulai jelajahi ekosistem laut Raja
              Ampat dalam lingkungan 3D interaktif.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PREVIEW MODEL 3D KARANG (WP 2.2.3) */}
      {/* ============================================================ */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Judul Section */}
          <div className="mb-6">
            <div className="inline-block px-4 py-1.5 mb-3 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[11px] font-black tracking-[0.2em] uppercase">
              🪸 Spesimen 3D Interaktif
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
              Model Terumbu Karang
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              Putar dan perbesar model untuk mempelajari struktur terumbu karang
              secara langsung. Gunakan kursor atau sentuhan untuk berinteraksi.
            </p>
          </div>

          {/* Komponen ModelViewer — memanggil file GLTF dari folder public/models */}
          <ModelViewer
            url="/models/usnm_74016-100k-2048-gltf_std/usnm_74016-100k-2048.gltf"
            className="w-full h-[500px]"
          />

          {/* Keterangan singkat di bawah model */}
          <div className="mt-4 flex items-center gap-3 text-xs text-gray-600">
            <span>🖱️ Klik + Tarik untuk memutar</span>
            <span className="w-px h-4 bg-white/10" />
            <span>🔍 Scroll untuk zoom</span>
            <span className="w-px h-4 bg-white/10" />
            <span>📦 USNM 74016 — Smithsonian 3D Digitization</span>
          </div>
        </div>
      </section>

      {/* MODULE GRID */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Stats bar */}
          <div className="flex items-center gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-lg">📚</span>
              <span className="font-bold">{modules.length} Modul</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-gray-500">
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
                const progress = getMockProgress(mod.id);
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
                    <div className="relative rounded-[28px] overflow-hidden bg-[#000814] border border-white/5 hover:border-white/15 transition-all duration-500 hover:scale-[1.01] shadow-xl hover:shadow-2xl">
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
                        <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          {mod.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-5">
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
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
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
                          <span className="text-gray-600 text-xs font-medium">
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
      <footer className="py-20 border-t border-white/5 text-center px-6">
        <p className="text-gray-600 text-[10px] tracking-[0.4em] font-bold uppercase">
          © 2026 TIM DIVEXPLORE-3D • TEKNOLOGI INFORMASI UNY
        </p>
      </footer>
    </div>
  );
}
