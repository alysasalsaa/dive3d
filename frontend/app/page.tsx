'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../lib/useTheme';
import toast from 'react-hot-toast';

const LoadingScreen = () => (
  <div className="fixed inset-0 z-[100] bg-[#00040a] flex flex-col items-center justify-center">
    <div className="relative">
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
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isLoginProcessing, setIsLoginProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoginProcessing(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Email atau password salah!');
      }

      const role = data.role ?? data.user?.role ?? 'user';

      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_role', role);
      localStorage.setItem('user_name', data.user?.name ?? '');
      localStorage.setItem('user_email', data.user?.email ?? '');

      setIsLoggedIn(true);
      setUserRole(role);
      setUserName(data.user?.name ?? '');
      setShowLoginModal(false);
      toast.success('Login Berhasil!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoginProcessing(false);
    }
  };

  const handleProtectedNav = (e: React.MouseEvent, href: string) => {
    const protectedRoutes = ['/gallery', '/akademi', '/tutorial', '/dashboard'];
    if (!isLoggedIn && protectedRoutes.includes(href)) {
      e.preventDefault();
      setError(`Silakan Login atau Daftar terlebih dahulu untuk mengakses menu ${href.replace('/', '')}.`);
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    setIsLoggedIn(!!localStorage.getItem('auth_token'));
    setUserRole(localStorage.getItem('user_role'));
    setUserName(localStorage.getItem('user_name'));
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/gallery', label: 'Galeri' },
    { href: '/akademi', label: 'Akademi' },
    { href: '/tutorial', label: 'Tutorial' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden animate-in fade-in duration-1000 transition-colors ${isDark ? 'bg-[#00040a] text-white' : 'bg-sky-50 text-gray-900'}`}>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 px-6 py-5 flex justify-between items-center transition-all">

        {/* Logo */}
        <div className={`flex items-center gap-3 backdrop-blur-xl py-2 px-5 rounded-full border shadow-xl transition-colors ${isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-blue-100 shadow-sm'}`}>
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-base">🌊</span>
          </div>
          <span className={`text-lg font-black tracking-widest pr-1 ${isDark ? 'text-white' : 'text-blue-900'}`}>DIVEXPLORE</span>
        </div>

        {/* Nav links */}
        <div className={`hidden md:flex items-center gap-1 backdrop-blur-2xl p-1.5 rounded-full border shadow-2xl transition-colors ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200 shadow-sm'}`}>
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}
                onClick={(e) => handleProtectedNav(e, href)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg shadow-blue-500/20'
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

        {/* Auth + Toggle */}
        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <div className="flex items-center gap-4 px-2">
              <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-blue-900'}`}>
                Halo, {userName || 'Pengguna'}!
              </span>
              <button 
                onClick={() => {
                  localStorage.removeItem('auth_token');
                  localStorage.removeItem('user_role');
                  localStorage.removeItem('user_name');
                  localStorage.removeItem('user_email');
                  setIsLoggedIn(false);
                  setUserRole(null);
                  setUserName(null);
                  toast.success('Logout Berhasil!');
                }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${isDark ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20' : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'}`}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowLoginModal(true)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all backdrop-blur-xl ${isDark ? 'text-gray-300 hover:text-white border border-white/10 hover:border-white/30 bg-white/5' : 'text-gray-700 hover:text-blue-700 border border-gray-200 hover:border-blue-300 bg-white'}`}
              >
                Masuk
              </button>
              <Link href="/register"
                className="px-5 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
              >
                Daftar
              </Link>
            </>
          )}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Mode Gelap' : 'Mode Terang'}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all text-base ${isDark ? 'bg-white/10 hover:bg-white/20 border border-white/10' : 'bg-white hover:bg-gray-100 border border-gray-200 shadow-sm'}`}
          >
            {isDark ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">

        {/* Background Image - Full Width */}
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-bg.jpg" alt="Raja Ampat" className="w-full h-full object-cover object-center" />
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 transition-colors duration-1000 ${isDark ? 'bg-gradient-to-r from-[#00040a] via-[#00040a]/80 to-transparent' : 'bg-gradient-to-r from-[#eef8ff] via-[#eef8ff]/90 to-transparent'}`}></div>
        </div>

        {/* Konten */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-32 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* LEFT: Teks */}
          <div className="pr-0 md:pr-10">
            <p className={`text-base md:text-lg mb-1 font-bold transition-colors ${isDark ? 'text-gray-300' : 'text-[#041e42]'}`}>Selamat Datang di</p>
            <h1 className={`text-6xl md:text-[5.5rem] font-black mb-4 leading-none tracking-tight transition-colors ${isDark ? 'text-white' : 'text-[#041e42]'}`}>
              DIVEXPLORE
            </h1>
            <p className={`font-bold text-lg md:text-xl mb-6 leading-snug transition-colors ${isDark ? 'text-cyan-400' : 'text-[#0056b3]'}`}>
              Jelajahi Keindahan Raja Ampat,<br />Lestarikan Laut untuk Masa Depan.
            </p>
            <p className={`text-sm md:text-base mb-10 leading-relaxed max-w-xl transition-colors ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Platform wisata bahari dan pembelajaran interaktif yang mengajakmu mengenal, mencintai, dan menjaga ekosistem laut Raja Ampat melalui pengalaman 3D dan konten edukatif.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/panduan"
                className="flex items-center gap-3 px-6 py-3.5 bg-[#0044aa] hover:bg-[#003388] text-white text-sm font-bold rounded-full transition-all shadow-lg"
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#0044aa]">
                  <span className="text-[12px] transform -rotate-45">➤</span>
                </div>
                Mulai Jelajah
                <span className="text-lg leading-none ml-1">→</span>
              </Link>
            </div>

            <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-semibold mb-12 transition-colors ${isDark ? 'bg-blue-900/40 text-blue-300' : 'bg-[#dff1ff] text-[#0066cc]'}`}>
              <span className="text-lg">🌿</span> Bersama kita jaga laut, kehidupan, dan masa depan.
            </div>
          </div>

          {/* RIGHT: Video card */}
          <div className={`rounded-2xl overflow-hidden border w-full max-w-xl lg:ml-auto p-2 backdrop-blur-md transition-colors shadow-2xl ${isDark ? 'bg-[#000814]/60 border-cyan-900/50' : 'bg-[#003366]/10 border-white/40'}`}>
            <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-[#00102a]' : 'bg-[#002244]'}`}>
              <div className="px-4 py-3 flex items-center gap-2 border-b border-white/10">
                <span className="text-base">🎬</span>
                <p className="text-sm font-semibold text-white">Trailer DIVEXPLORE</p>
              </div>

              <div className="relative aspect-[16/10] flex items-center justify-center bg-black/40 overflow-hidden">
                <img src="/images/hero-bg.jpg" alt="Trailer" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                
                <button
                  onClick={() => setShowTrailer(true)}
                  className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 group"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white transition-colors">
                    <span className="text-[#0044aa] text-3xl ml-1">▶</span>
                  </div>
                </button>

                <div className="absolute bottom-0 left-0 right-0 z-10">
                  <div className="h-1 bg-white/20">
                    <div className="h-full w-1/3 bg-blue-500"></div>
                  </div>
                  <div className="px-4 py-3 flex items-center gap-2 bg-black/60 backdrop-blur-md">
                    <span className="text-white text-xs font-medium">00:00 / 01:10</span>
                    <div className="ml-auto flex items-center gap-4">
                      <button className="text-white hover:text-blue-300 text-lg transition-colors">🔊</button>
                      <button className="text-white hover:text-blue-300 text-lg transition-colors">⛶</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAILER MODAL */}
      {showTrailer && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowTrailer(false)}></div>
          <div className="relative z-10 w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <p className="text-white text-sm font-semibold">🎬 Trailer DIVEXPLORE</p>
              <button onClick={() => setShowTrailer(false)} className="text-gray-400 hover:text-white transition-colors">✕</button>
            </div>
            <div className="aspect-video bg-gray-900 flex items-center justify-center text-gray-500 text-sm">
              <video 
                src="/videos/trailer.mp4" 
                controls 
                autoPlay
                className="w-full h-full object-cover"
                poster="/images/hero-bg.jpg"
              >
                Browser Anda tidak mendukung tag video HTML5.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className={`py-20 border-t text-center px-6 ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
        <p className={`text-[10px] tracking-[0.4em] font-bold uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
          © 2026 TIM DIVEXPLORE-3D • TEKNOLOGI INFORMASI UNY
        </p>
      </footer>
      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}></div>
          <div className="w-full max-w-md p-8 rounded-[28px] bg-[#00040a] border border-white/10 shadow-2xl relative z-10 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            <div className="text-center mb-8 mt-2">
              <h1 className="text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Sistem Login
              </h1>
              <p className="text-sm text-gray-400">Silakan login untuk mengakses Sistem</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium text-center animate-pulse">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  placeholder="admin@lms.com / user@lms.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isLoginProcessing}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoginProcessing ? 'Memproses...' : 'Masuk ke Sistem'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
