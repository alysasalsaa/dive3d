'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../lib/useTheme';
import ModelViewer from '../../components/ModelViewer';

const getModelUrl = (tab: string) => {
    switch(tab) {
        case 'ikan': return '/models/ClownFish3D/ClownFish3d.glb';
        case 'karang': return '/models/usnm_74016-100k-2048-gltf_std/usnm_74016-100k-2048.gltf';
        default: return null;
    }
};

export default function AkademiPage() {
    const pathname = usePathname();
    const { isDark, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('lms');
    const [active3DTab, setActive3DTab] = useState('ikan');
    const [currentLMSIndex, setCurrentLMSIndex] = useState(0);
    const [showQuizConfirm, setShowQuizConfirm] = useState(false);

    const nextModule = () => setCurrentLMSIndex((prev) => (prev + 1) % lmsModules.length);
    const prevModule = () => setCurrentLMSIndex((prev) => (prev - 1 + lmsModules.length) % lmsModules.length);

    const lmsModules = [
        { id: 1, slug: 'ekosistem-laut', title: 'Ekosistem Laut', img: '/images/sertifikat-konservasi-laut.jpeg' },
        { id: 2, slug: 'biota-laut', title: 'Biota Laut', img: '/images/sertifikat-konten-digital.jpeg' },
        { id: 3, slug: 'terumbu-karang', title: 'Terumbu Karang', img: '/images/sertifikat-konservasi-laut.jpeg' },
        { id: 4, slug: 'sampah-laut', title: 'Sampah Laut', img: '/images/sertifikat-konten-digital.jpeg' },
    ];

    const totalModules = lmsModules.length;
    const [completedQuizTitles, setCompletedQuizTitles] = useState<string[]>([]);

    useEffect(() => {
        const userEmail = (localStorage.getItem('user_email') || '').toLowerCase();
        const saved = localStorage.getItem(`completed_quizzes_${userEmail}_konservasi-laut`);
        const done = saved ? JSON.parse(saved) : [];
        setCompletedQuizTitles(Array.isArray(done) ? done : []);
    }, []);

    const completedModules = completedQuizTitles.length;

    const navLinks = [
        { href: '/', label: 'Beranda' },
        { href: '/gallery', label: 'Galeri' },
        { href: '/akademi', label: 'Akademik' },
        { href: '/tutorial', label: 'Tutorial' },
        { href: '/dashboard', label: 'Dashboard' },
    ];

    return (
        <div className={`min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-300 ${isDark ? 'bg-[#00040a] text-white' : 'bg-[#f4f9ff] text-gray-900'} relative`}>
            
            {/* Background elements for light theme */}
            {!isDark && (
                <div className="absolute top-0 right-0 pointer-events-none opacity-50 z-0">
                    <div className="w-[500px] h-[300px] bg-blue-100 rounded-full blur-[100px] absolute -top-20 -right-20"></div>
                </div>
            )}

            {/* NAVBAR */}
            <nav className="fixed top-0 w-full z-50 px-6 py-5 flex justify-between items-center pointer-events-none">
                <div className={`pointer-events-auto flex items-center gap-3 backdrop-blur-xl py-2 px-5 rounded-full border shadow-xl transition-colors ${isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-blue-100 shadow-sm'}`}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg bg-white/5 border border-blue-500/20 overflow-hidden">
                    <img src="/images/logo.png" alt="Dive3D Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className={`text-lg font-black tracking-widest pr-1 ${isDark ? 'text-white' : 'text-blue-900'}`}>
                    DIVEXPLORE
                  </span>
                </div>

                <div className={`pointer-events-auto hidden md:flex items-center gap-1 backdrop-blur-2xl p-1.5 rounded-full border transition-colors ${isDark ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white/80 border-gray-200 shadow-sm'}`}>
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href === '/akademi' && pathname === '/akademi');
                    return (
                      <Link key={link.href} href={link.href}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg shadow-blue-600/20'
                            : isDark
                              ? 'hover:bg-white/5 text-gray-400 hover:text-white'
                              : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>

                <button
                  onClick={toggleTheme}
                  title={isDark ? 'Mode Gelap' : 'Mode Terang'}
                  className={`pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-all text-base ${isDark ? 'bg-white/10 hover:bg-white/20 border border-white/10' : 'bg-white hover:bg-gray-100 border border-gray-200 shadow-sm'}`}
                >
                  {isDark ? '🌙' : '☀️'}
                </button>
            </nav>

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-12 px-6">
                <div className="max-w-7xl mx-auto relative z-10">
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
                            Pelajari ekosistem laut Raja Ampat melalui modul interaktif dan jelajahi spesimen dalam lingkungan 3D WebGL.
                        </p>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
                
                {/* Main Box Container */}
                <div className={`rounded-[32px] p-6 md:p-8 border min-h-[70vh] flex flex-col ${isDark ? 'bg-[#000814] border-white/10 shadow-2xl' : 'bg-white border-blue-100 shadow-[0_10px_40px_-15px_rgba(59,130,246,0.15)]'}`}>
                    
                    {/* Tabs Centered */}
                    <div className={`flex items-center rounded-2xl p-1.5 mb-8 max-w-md mx-auto w-full shadow-sm ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                        <button
                            onClick={() => setActiveTab('lms')}
                            className={`flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all ${activeTab === 'lms' ? 'bg-white text-blue-600 shadow-md border-b-2 border-blue-600' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
                        >
                            <span className="text-lg">🌿</span> LMS
                        </button>
                        <button
                            onClick={() => setActiveTab('3d')}
                            className={`flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all ${activeTab === '3d' ? 'bg-white text-blue-600 shadow-md border-b-2 border-blue-600' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
                        >
                            <span className="text-lg">📦</span> 3D Interaktif
                        </button>
                    </div>

                    {/* CONTENT VIEWS */}
                    <div className="flex-grow flex flex-col">
                        
                        {/* --- VIEW: LMS --- */}
                        {activeTab === 'lms' && (
                            <div className="flex flex-col flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#0a1e3f]'}`}>Modul Pembelajaran (LMS)</h2>
                                
                                {/* Modul Carousel - FULL WIDTH */}
                                <div className="relative mb-8 w-full group px-2 md:px-6">
                                    
                                    {/* Left Arrow */}
                                    <button onClick={prevModule} className={`absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 ${isDark ? 'bg-[#001020] text-white border border-white/10 hover:bg-blue-600' : 'bg-white text-blue-900 border border-blue-100 hover:bg-blue-50'}`}>
                                        <span className="text-xl">←</span>
                                    </button>

                                    {/* Right Arrow */}
                                    <button onClick={nextModule} className={`absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 ${isDark ? 'bg-[#001020] text-white border border-white/10 hover:bg-blue-600' : 'bg-white text-blue-900 border border-blue-100 hover:bg-blue-50'}`}>
                                        <span className="text-xl">→</span>
                                    </button>

                                    {/* Active Module Card */}
                                    <div className={`rounded-[32px] border p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all duration-500 overflow-hidden ${isDark ? 'bg-[#001020] border-white/10 shadow-2xl' : 'bg-white border-blue-100 shadow-[0_10px_40px_-15px_rgba(59,130,246,0.2)]'}`}>
                                        
                                        <div className="w-full md:w-1/2 aspect-[16/10] bg-blue-100 rounded-2xl overflow-hidden border border-gray-100 relative shadow-inner">
                                            <div className="w-full h-full flex items-center justify-center text-6xl transition-transform duration-700 hover:scale-105" style={{backgroundImage: `url(${lmsModules[currentLMSIndex].img})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                                                {!lmsModules[currentLMSIndex].img && "🌊"}
                                            </div>
                                            {/* Badge */}
                                            <div className="absolute top-4 left-4 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-black shadow-lg">
                                                {lmsModules[currentLMSIndex].id}
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/2 flex flex-col text-left">
                                            <div className={`inline-block px-4 py-1.5 mb-4 rounded-full border text-[11px] font-black tracking-[0.2em] uppercase w-max ${isDark ? 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300' : 'bg-blue-100 border-blue-200 text-blue-700'}`}>
                                                Modul {currentLMSIndex + 1} dari {lmsModules.length}
                                            </div>
                                            <h3 className={`text-3xl md:text-5xl font-black leading-tight mb-4 ${isDark ? 'text-white' : 'text-[#0a1e3f]'}`}>
                                                {lmsModules[currentLMSIndex].title}
                                            </h3>
                                            <p className={`text-base md:text-lg mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Pelajari lebih dalam mengenai {lmsModules[currentLMSIndex].title.toLowerCase()} dan bagaimana peranannya dalam menjaga kelestarian alam di perairan Raja Ampat.
                                            </p>
                                            
                                            <div className="mb-8">
                                                <div className="flex justify-between items-end mb-2">
                                                    <span className={`text-[12px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Progres Belajar</span>
                                                    <span className={`text-lg font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{completedQuizTitles.includes(`Kuis: ${lmsModules[currentLMSIndex].title}`) ? 100 : 0}%</span>
                                                </div>
                                                <div className={`h-3 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                                                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000 ease-out" style={{ width: completedQuizTitles.includes(`Kuis: ${lmsModules[currentLMSIndex].title}`) ? '100%' : '0%' }}></div>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <Link href={`/lms?track=konservasi-laut&module=${lmsModules[currentLMSIndex].slug}`} className="px-8 py-4 bg-blue-600 text-white text-[15px] font-bold rounded-full shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all hover:-translate-y-1 text-center w-full md:w-auto">
                                                    Mulai Belajar Modul Ini
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                    
                                    {/* Indicators */}
                                    <div className="flex justify-center gap-2 mt-6">
                                        {lmsModules.map((_, idx) => (
                                            <button 
                                                key={idx} 
                                                onClick={() => setCurrentLMSIndex(idx)}
                                                className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentLMSIndex ? 'w-10 bg-blue-500' : isDark ? 'w-2.5 bg-white/20 hover:bg-white/40' : 'w-2.5 bg-blue-200 hover:bg-blue-400'}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Area: Kuis & Progres - FULL WIDTH */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
                                    <div className={`p-8 rounded-3xl border flex flex-col justify-between ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#f4f9ff] border-blue-100'}`}>
                                        <div>
                                            <h3 className={`font-bold text-xl mb-3 ${isDark ? 'text-white' : 'text-[#0a1e3f]'}`}>Tahap Selanjutnya: Kuis & Evaluasi</h3>
                                            <p className={`text-sm mb-6 font-medium leading-relaxed max-w-md ${isDark ? 'text-gray-400' : 'text-[#3b5275]'}`}>Setelah mempelajari semua modul dengan saksama, kerjakan kuis evaluasi untuk menguji pemahaman Anda dan mengklaim sertifikat.</p>
                                        </div>
                                        <button onClick={() => setShowQuizConfirm(true)} className="self-start px-8 py-3.5 bg-blue-600 text-white text-sm font-bold rounded-full flex items-center gap-3 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5">
                                            Mulai Kuis Sekarang <span className="text-xl">📝</span>
                                        </button>
                                    </div>

                                    <div className={`p-8 rounded-3xl border flex items-center gap-8 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                                        <div className="w-[120px] h-[120px] shrink-0 relative flex items-center justify-center">
                                            <svg className="w-full h-full -rotate-90 drop-shadow-md" viewBox="0 0 36 36">
                                                <path className={isDark ? 'text-white/10' : 'text-gray-100'} stroke="currentColor" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                <path className="text-blue-600" strokeDasharray={`${Math.round((completedModules / totalModules) * 100)}, 100`} stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            </svg>
                                            <div className="absolute flex flex-col items-center justify-center">
                                                <span className={`font-black text-3xl ${isDark ? 'text-white' : 'text-[#0a1e3f]'}`}>{Math.round((completedModules / totalModules) * 100)}%</span>
                                                <span className={`text-[9px] font-bold uppercase tracking-widest ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Selesai</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className={`font-bold text-xl mb-3 ${isDark ? 'text-white' : 'text-[#0a1e3f]'}`}>Ringkasan Progres</h3>
                                            <div className={`p-4 rounded-xl border mb-3 ${isDark ? 'bg-[#001020] border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Modul Akademik</span>
                                                    <span className={`text-sm font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{completedModules}/{totalModules}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                                                    <span>Status Kuis Evaluasi</span>
                                                    <span>{completedModules} dari {totalModules} Lulus</span>
                                                </div>
                                                <div className={`h-2 w-full rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                                                    <div className="h-full bg-blue-600 rounded-full transition-all duration-700" style={{ width: `${(completedModules / totalModules) * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- VIEW: 3D INTERAKTIF --- */}
                        {activeTab === '3d' && (
                            <div className="flex flex-col flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[800px]">
                                <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                                    <div>
                                        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#0a1e3f]'}`}>Eksplorasi 3D Interaktif</h2>
                                        <p className={`text-[15px] font-medium ${isDark ? 'text-gray-400' : 'text-[#3b5275]'}`}>Putar, perbesar, dan jelajahi objek laut secara interaktif dalam resolusi tinggi.</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                                            ● WebGL Ready
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="relative w-full flex-grow bg-[#001020] rounded-[32px] overflow-hidden group border-2 border-[#0a1e3f] shadow-2xl min-h-[700px] md:min-h-[800px]">
                                    
                                    {/* 3D Model Viewer */}
                                    <div className="absolute inset-0 w-full h-full z-0">
                                        {getModelUrl(active3DTab) ? (
                                            <ModelViewer url={getModelUrl(active3DTab)!} className="w-full h-full" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-[#000814]">
                                                <span className="text-6xl mb-4 opacity-50">🚧</span>
                                                <p className="text-gray-400 font-bold">Model 3D belum tersedia untuk kategori ini</p>
                                            </div>
                                        )}
                                    </div>



                                </div>
                                
                                {/* Bottom Categories (Filter) */}
                                <div className={`mt-6 p-2 rounded-3xl flex items-center justify-center overflow-x-auto gap-3 max-w-full w-full mx-auto border ${isDark ? 'bg-[#001020] border-white/10 shadow-lg' : 'bg-white border-gray-200 shadow-sm'}`}>
                                    {[
                                        { id: 'ikan', label: 'Ikan', icon: '🐟' },
                                        { id: 'karang', label: 'Karang', icon: '🪸' },
                                        { id: 'penyu', label: 'Penyu', icon: '🐢' },
                                        { id: 'bintang', label: 'Bintang Laut', icon: '⭐' },
                                        { id: 'rumput', label: 'Rumput Laut', icon: '🌿' },
                                    ].map(cat => (
                                        <button 
                                            key={cat.id} 
                                            onClick={() => setActive3DTab(cat.id)}
                                            className={`shrink-0 px-6 py-3 rounded-2xl flex items-center gap-3 text-[14px] font-bold transition-all duration-300 ${
                                                active3DTab === cat.id 
                                                    ? 'bg-blue-600 text-white shadow-md scale-105' 
                                                    : isDark 
                                                        ? 'bg-transparent text-gray-400 hover:bg-white/5 hover:text-white' 
                                                        : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                        >
                                            <span className="text-xl drop-shadow-sm">{cat.icon}</span> {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>

            {/* QUIZ CONFIRMATION MODAL */}
            {showQuizConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowQuizConfirm(false)} />
                    <div className={`border rounded-[32px] p-8 max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-200 shadow-2xl ${isDark ? 'bg-[#001020] border-white/10' : 'bg-white border-blue-100'}`}>
                        <div className="w-20 h-20 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                            📝
                        </div>
                        <h3 className={`text-2xl font-black text-center mb-2 ${isDark ? 'text-white' : 'text-[#0a1e3f]'}`}>Konfirmasi Kuis</h3>
                        <p className={`text-center mb-8 text-sm font-bold leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#3b5275]'}`}>
                            Kerjakan Kuis {lmsModules[currentLMSIndex].title} Sekarang?
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowQuizConfirm(false)}
                                className={`flex-1 px-6 py-3.5 rounded-xl font-bold transition-colors border ${isDark ? 'text-gray-300 bg-white/5 hover:bg-white/10 border-white/10' : 'text-gray-600 bg-gray-50 hover:bg-gray-100 border-gray-200'}`}
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => window.location.href = `/lms?track=konservasi-laut&module=${lmsModules[currentLMSIndex].slug}&action=quiz`}
                                className="flex-1 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                Ya, Kerjakan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
