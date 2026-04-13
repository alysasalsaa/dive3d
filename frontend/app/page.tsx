'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Komponen Loading Screen (WP 2.3.1)
const LoadingScreen = () => (
  <div className="fixed inset-0 z-[100] bg-[#00040a] flex flex-col items-center justify-center">
    <div className="relative">
      {/* Animasi Gelombang Berdenyut */}
      <div className="w-24 h-24 border-4 border-blue-500/20 rounded-full animate-ping absolute inset-0"></div>
      <div className="w-24 h-24 border-4 border-blue-500 rounded-full flex items-center justify-center bg-[#00040a] relative z-10">
        <span className="text-3xl animate-bounce">🌊</span>
      </div>
    </div>
    <div className="mt-8 text-center">
      <h2 className="text-white font-black tracking-[0.3em] uppercase text-sm mb-2">Menyiapkan Ekosistem</h2>
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
        <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>
      <p className="text-gray-500 text-[10px] mt-4 italic max-w-xs px-6">
        "Laut adalah jantung bumi. Mari kita jaga detaknya tetap kuat."
      </p>
    </div>

    <style jsx>{`
      @keyframes loading {
        0% { width: 0%; transform: translateX(-100%); }
        50% { width: 100%; transform: translateX(0%); }
        100% { width: 0%; transform: translateX(100%); }
      }
    `}</style>
  </div>
);

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi pemuatan aset 3D selama 3 detik
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#00040a] text-white font-['Outfit'] overflow-x-hidden animate-in fade-in duration-1000">
      {/* 1. ULTRA NAVBAR */}
      {/* GLOBAL NAVBAR - DARK STYLE WITH CAPSULE LOGO */}
      <nav className="fixed top-0 w-full z-50 px-6 py-5 flex justify-between items-center transition-all">

        {/* BAGIAN KIRI: Logo & Judul dengan Kapsul Gelap */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl py-2 px-5 rounded-full border border-white/10 shadow-2xl">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-base">🌊</span>
          </div>
          <span className="text-lg font-black tracking-widest text-white pr-1">DIVEXPLORE</span>
        </div>

        {/* BAGIAN KANAN: Menu Navigasi (Sesuai Desain Sebelumnya) */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-2xl p-1.5 rounded-full border border-white/10 shadow-2xl">
          <Link href="/" className="px-6 py-2 rounded-full bg-white/10 text-white font-bold text-sm">Beranda</Link>
          <Link href="/gallery" className="px-6 py-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all text-sm font-semibold">Galeri</Link>
          <Link href="/dashboard" className="px-6 py-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all text-sm font-semibold">Dashboard</Link>
          <Link href="/tutorial" className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-600/20 transition-all">
            Mulai Belajar
          </Link>
        </div>
      </nav>

      {/* 2. DYNAMIC HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-[#00040a]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/5 text-[15vw] font-black select-none uppercase tracking-tighter">RAJA AMPAT</div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="inline-block px-5 py-2 mb-6 rounded-full bg-cyan-500/20 border border-cyan-400/60 text-cyan-100 text-xs font-black tracking-[0.25em] uppercase animate-pulse shadow-[0_0_25px_rgba(34,211,238,0.6)]">
            Eksplorasi Virtual 3D
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
            Menyelami Rahasia <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 text-glow">
              Samudra Biru.
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl mb-12 leading-relaxed">
            Rasakan keajaiban ekosistem Raja Ampat dalam visualisasi 3D yang nyata. Pelajari pentingnya konservasi laut melalui interaksi langsung.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-10 py-5 bg-white text-black font-black rounded-2xl transition-colors duration-1000 hover:text-white overflow-hidden shadow-2xl">
              <span className="relative z-10 uppercase transition-colors duration-1000 delay-300">Mulai Penyelaman</span>
              {/* Efek Gelombang Air (Water Wave) - Banyak Lapisan & Diperlambat */}
              <div className="absolute left-1/2 top-[150%] h-[400px] w-[400px] -translate-x-1/2 rounded-[38%] bg-blue-800/90 group-hover:top-[-140px] transition-all duration-[2000ms] ease-in-out animate-[spin_8s_linear_infinite] z-0"></div>
              <div className="absolute left-1/2 top-[150%] h-[400px] w-[400px] -translate-x-1/2 rounded-[42%] bg-blue-600 group-hover:top-[-150px] transition-all duration-[2500ms] ease-in-out animate-[spin_10s_linear_infinite_reverse] z-0 delay-75"></div>
              <div className="absolute left-1/2 top-[150%] h-[400px] w-[400px] -translate-x-1/2 rounded-[45%] bg-cyan-500/70 group-hover:top-[-160px] transition-all duration-[3000ms] ease-in-out animate-[spin_12s_linear_infinite] z-0 delay-150"></div>
              <div className="absolute left-1/2 top-[150%] h-[400px] w-[400px] -translate-x-1/2 rounded-[40%] bg-blue-300/40 group-hover:top-[-170px] transition-all duration-[3500ms] ease-in-out animate-[spin_14s_linear_infinite_reverse] z-0 delay-300"></div>
            </button>
            <button className="flex items-center gap-3 px-6 py-2 text-white font-bold hover:text-blue-400 transition-all">
              <span className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20">▶</span>
              Lihat Trailer
            </button>
          </div>
        </div>
      </section>

      {/* 3. MODUL PEMBELAJARAN */}
      <section className="relative py-32 px-6 bg-[#00040a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Materi Konservasi.</h2>
              <p className="text-gray-500 text-lg">Pilih jalur belajarmu dan jadilah pahlawan laut masa depan.</p>
            </div>
            <Link href="/tutorial" className="text-blue-400 font-bold border-b-2 border-blue-400/20 pb-1 hover:border-blue-400 transition-all">LIHAT SEMUA MATERI →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Ekosistem Laut', icon: '🐠', desc: 'Memahami interaksi biotik dan abiotik.', color: 'from-blue-600' },
              { title: 'Biota Laut', icon: '🐢', desc: 'Mengenal keanekaragaman spesies Raja Ampat.', color: 'from-cyan-600' },
              { title: 'Terumbu Karang', icon: '🪸', desc: 'Pilar utama kehidupan bawah laut.', color: 'from-indigo-600' },
              { title: 'Sampah Laut', icon: '🧴', desc: 'Ancaman limbah terhadap kelestarian.', color: 'from-blue-800' },
            ].map((item, index) => (
              <div key={index} className="group relative p-[1px] bg-white/10 rounded-[32px] overflow-hidden transition-all hover:scale-[1.02]">
                <div className="relative p-8 bg-[#000814] rounded-[31px] h-full border border-white/5">
                  <div className="text-5xl mb-8 group-hover:rotate-12 transition-transform duration-500">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                  <div className={`w-10 h-1 bg-gradient-to-r ${item.color} to-transparent rounded-full group-hover:w-full transition-all duration-700`}></div>
                </div>
              </div>
            ))}
          </div>
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