'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const ModelViewer = dynamic(() => import('../../../components/ModelViewer'), { ssr: false });
import { useTheme } from '../../../lib/useTheme';

const models = [
  {
    key: 'terumbu-karang',
    badge: '🪸 Spesimen 3D Interaktif',
    badgeColor: 'cyan',
    title: 'Model Terumbu Karang',
    desc: 'Terumbu karang adalah "hutan hujan laut" yang menjadi rumah bagi 25% spesies laut meski hanya menutupi kurang dari 1% dasar samudra. Organisme ini tumbuh sangat lambat, hanya beberapa sentimeter per tahun.',
    url: '/models/usnm_74016-100k-2048-gltf_std/usnm_74016-100k-2048.gltf',
    credit: '📦 USNM 74016 — Smithsonian 3D Digitization',
    stats: {
      "Tipe": "Invertebrata",
      "Habitat": "Perairan Dangkal",
      "Ancaman Utama": "Perubahan Iklim",
    }
  },
  {
    key: 'clownfish',
    badge: '🐟 Spesimen 3D Interaktif',
    badgeColor: 'orange',
    title: 'Model Ikan Badut (Clownfish)',
    desc: 'Ikan badut kebal terhadap sengatan anemon laut berkat lapisan lendir khusus di tubuhnya. Mereka hidup berdampingan secara harmonis; anemon memberikan perlindungan, dan ikan badut membersihkan parasit dari anemon.',
    url: '/models/ClownFish3D/ClownFish3d.glb',
    credit: '📦 Koleksi Divexplore 3D',
    stats: {
      "Nama Ilmiah": "Amphiprioninae",
      "Habitat": "Terumbu Karang",
      "Simbiosis": "Mutualisme (Anemon)",
    }
  },
];

const badgeClass: Record<string, string> = {
  cyan: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300',
  orange: 'bg-orange-500/15 border-orange-400/30 text-orange-400',
};

const badgeClassLight: Record<string, string> = {
  cyan: 'bg-cyan-500/10 border-cyan-400/20 text-cyan-600',
  orange: 'bg-orange-500/10 border-orange-400/20 text-orange-600',
};

export default function Model3DPage() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const [loadedModels, setLoadedModels] = useState<Record<string, boolean>>({});

  const handleLoadModel = (key: string) => {
    setLoadedModels((prev) => ({ ...prev, [key]: true }));
  };

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
          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-white/5 border border-blue-500/20 overflow-hidden">
            <img src="/images/logo.png" alt="Dive3D Logo" className="w-full h-full object-cover" />
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
      <section className="relative pt-40 pb-12 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/15 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className={`transition-colors hover:text-cyan-400 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Beranda
            </Link>
            <span className={isDark ? 'text-gray-700' : 'text-gray-400'}>›</span>
            <Link href="/akademi" className={`transition-colors hover:text-cyan-400 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Akademi
            </Link>
            <span className={isDark ? 'text-gray-700' : 'text-gray-400'}>›</span>
            <span className="text-cyan-400 font-bold">Model 3D Interaktif</span>
          </div>

          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="max-w-2xl">
              <div className={`inline-block px-4 py-1.5 mb-6 rounded-full border text-[11px] font-black tracking-[0.2em] uppercase ${isDark ? 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300' : 'bg-cyan-500/10 border-cyan-400/20 text-cyan-600'}`}>
                🪸 Eksplorasi 3D Interaktif
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
                Model 3D{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                  Biota Laut.
                </span>
              </h1>
              <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Pelajari spesimen laut secara mendalam melalui model 3D interaktif berteknologi WebGL. Putar, perbesar, dan amati setiap detail.
              </p>
            </div>

            <Link
              href="/akademi"
              className={`mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all border ${isDark ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
            >
              ← Kembali ke Akademi
            </Link>
          </div>
        </div>
      </section>

      {/* MODEL SECTIONS */}
      {models.map((model) => (
        <section key={model.key} className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <div className={`inline-block px-4 py-1.5 mb-3 rounded-full border text-[11px] font-black tracking-[0.2em] uppercase ${isDark ? badgeClass[model.badgeColor] : badgeClassLight[model.badgeColor]}`}>
                {model.badge}
              </div>
              <h2 className={`text-3xl md:text-4xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {model.title}
              </h2>
              <p className={`text-base md:text-lg max-w-3xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {model.desc}
              </p>
            </div>

            <div className={`relative group rounded-[2.5rem] overflow-hidden border transition-all duration-500 ${isDark ? 'bg-white/[0.02] border-white/10 hover:border-blue-500/30' : 'bg-blue-50 border-blue-100 shadow-xl'}`}>
              {loadedModels[model.key] ? (
                <ModelViewer url={model.url} className="w-full h-[560px] cursor-grab active:cursor-grabbing" />
              ) : (
                <div className={`w-full h-[560px] flex flex-col items-center justify-center relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-blue-900/20 to-cyan-900/10' : 'bg-gradient-to-br from-blue-100/50 to-cyan-50/50'}`}>
                  {/* Ornamen Latar Belakang */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />
                  
                  <button 
                    onClick={() => handleLoadModel(model.key)}
                    className="relative z-10 flex flex-col items-center gap-5 group/btn"
                  >
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center border backdrop-blur-xl group-hover/btn:scale-110 transition-all duration-500 shadow-2xl ${isDark ? 'bg-cyan-500/20 border-cyan-400/30 shadow-cyan-500/20 group-hover/btn:bg-cyan-500/30 group-hover/btn:border-cyan-400/50 text-cyan-300' : 'bg-white/80 border-cyan-200 shadow-cyan-500/10 group-hover/btn:bg-white text-cyan-600'}`}>
                      <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <span className={`font-black tracking-widest text-sm uppercase px-5 py-2.5 rounded-full border backdrop-blur-md shadow-lg ${isDark ? 'bg-black/60 text-cyan-300 border-white/10' : 'bg-white/90 text-cyan-700 border-cyan-100'}`}>
                        Muat 3D Interaktif
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        Mungkin memakan waktu memuat (±10MB)
                      </span>
                    </div>
                  </button>
                </div>
              )}
              
              {/* Floating Info Panel - Glassmorphism */}
              <div className="absolute top-6 left-6 w-64 p-5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl opacity-0 translate-x-[-20px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 pointer-events-none hidden md:block">
                <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-3">
                  <span>ℹ️</span> Info Spesimen
                </h4>
                <div className="space-y-4">
                  {Object.entries(model.stats).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-0.5">{key}</span>
                      <span className="text-cyan-300 text-sm font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tooltip hint di tengah bawah */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/60 border border-white/10 text-xs font-bold text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-md pointer-events-none flex items-center gap-2 shadow-xl">
                <span>👆</span> Geser untuk memutar atau zoom
              </div>
            </div>

            <div className={`mt-4 flex items-center gap-3 text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              <span>🖱️ Klik + Tarik untuk memutar</span>
              <span className="w-px h-4 bg-white/10" />
              <span>🔍 Scroll untuk zoom</span>
              <span className="w-px h-4 bg-white/10" />
              <span>{model.credit}</span>
            </div>
          </div>
        </section>
      ))}

      {/* FOOTER */}
      <footer className={`py-16 border-t text-center px-6 ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
        <p className={`text-[10px] tracking-[0.4em] font-bold uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
          © 2026 TIM DIVEXPLORE-3D • TEKNOLOGI INFORMASI UNY
        </p>
      </footer>
    </div>
  );
}
