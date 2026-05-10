'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const BadgeViewer = dynamic(() => import('../../components/BadgeViewer'), { ssr: false });

const BADGES = [
    { score: 100, url: '/models/badges/FishTrophy_-compressed.glb',  label: '🏆 Trofi Ikan',     title: 'Trofi Ikan Mas',     desc: 'Simbol pencapaian tertinggi Anda! Fun fact: Lautan menutupi lebih dari 70% permukaan bumi dan menghasilkan lebih dari separuh oksigen dunia.', gradient: 'from-yellow-300 via-amber-400 to-yellow-600', ring: 'bg-amber-400/20', shadow: 'shadow-[0_0_100px_-20px_rgba(251,191,36,0.15)]' },
    { score: 90,  url: '/models/badges/GoldMedal-fast-normal.glb',   label: '🥇 Medali Emas',    title: 'Medali Emas',        desc: 'Pencapaian luar biasa! Tahukah Anda? Terumbu karang sering disebut sebagai "hutan hujan laut" karena keanekaragaman hayatinya yang luar biasa.', gradient: 'from-yellow-200 via-yellow-400 to-amber-500', ring: 'bg-yellow-400/20', shadow: 'shadow-[0_0_100px_-20px_rgba(250,204,21,0.15)]' },
    { score: 75,  url: '/models/badges/SilverMedal-fast-normal.glb', label: '🥈 Medali Perak',   title: 'Medali Perak',       desc: 'Kerja bagus! Fun fact: Paus biru adalah hewan terbesar yang pernah diketahui hidup di Bumi, suaranya bisa terdengar hingga 1.600 km di bawah air.', gradient: 'from-slate-200 via-slate-300 to-gray-400', ring: 'bg-slate-300/20', shadow: 'shadow-[0_0_100px_-20px_rgba(203,213,225,0.15)]' },
    { score: 50,  url: '/models/badges/BronzeMedal__-compressed.glb',label: '🥉 Med. Perunggu',  title: 'Medali Perunggu',    desc: 'Langkah awal yang hebat! Tahukah Anda? Palung Mariana adalah titik terdalam di lautan, kedalamannya mencapai lebih dari 10.900 meter.', gradient: 'from-orange-300 via-orange-500 to-amber-700', ring: 'bg-orange-500/20', shadow: 'shadow-[0_0_100px_-20px_rgba(249,115,22,0.15)]' },
];

export default function TrophyPage() {
    const [earnedBadges, setEarnedBadges] = useState<typeof BADGES>([]);
    const [activeIdx, setActiveIdx] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user has completed at least one quiz with score >= 50 to earn the Fish Trophy
        const userEmail = (localStorage.getItem('user_email') || '').toLowerCase();
        
        if (userEmail === 'vinzcan11@gmail.com') {
            setEarnedBadges(BADGES);
            setLoading(false);
            return;
        }

        let maxScore = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i) || '';
            if (key.startsWith('quiz_score_')) {
                const val = parseInt(localStorage.getItem(key) || '0', 10);
                if (!isNaN(val) && val > maxScore) maxScore = val;
            }
        }
        
        // If they have any score >= 50, they unlock badges up to their top score
        if (maxScore >= 50) {
            setEarnedBadges(BADGES.filter(b => maxScore >= b.score));
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-[#00040a] flex items-center justify-center text-cyan-400 font-bold tracking-widest uppercase">Memuat Trofi...</div>;
    }

    if (earnedBadges.length === 0) {
        return (
            <div className="min-h-screen bg-[#00040a] flex flex-col items-center justify-center text-white text-center p-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center">
                    <div className="text-8xl mb-6 opacity-30 drop-shadow-2xl">🔒</div>
                    <h1 className="text-4xl font-black mb-3 text-white">Trofi Masih Terkunci</h1>
                    <p className="text-gray-400 mb-8 max-w-md text-lg">Selesaikan minimal satu kuis dengan nilai kelulusan di Akademi untuk mendapatkan Trofi Spesial Anda!</p>
                    <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-all shadow-xl shadow-blue-500/25 font-bold text-white">
                        ← Kembali ke Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const activeBadge = earnedBadges[activeIdx] || earnedBadges[0];

    return (
        <div className="min-h-screen bg-[#00040a] text-white flex flex-col relative overflow-hidden">
            {/* Background Effects Dramatis menyesuaikan lencana aktif */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br ${activeBadge.gradient} opacity-10 blur-[150px] rounded-full pointer-events-none transition-all duration-1000`} />
            
            <header className="absolute top-0 w-full p-8 flex justify-between items-center z-20">
                <Link href="/dashboard" className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md font-bold text-gray-300 hover:text-white transition-all flex items-center gap-2">
                    <span>←</span> Kembali
                </Link>
                <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-black tracking-widest uppercase text-xs backdrop-blur-md shadow-lg">
                    Koleksi Lencana ({earnedBadges.length} Terbuka)
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10 pt-24">
                
                {/* Navigasi Tabs */}
                <div className="flex gap-3 mb-8 flex-wrap justify-center animate-in fade-in slide-in-from-top-4 duration-700">
                    {earnedBadges.map((b, i) => (
                        <button key={i} onClick={() => setActiveIdx(i)}
                            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg ${
                                activeIdx === i
                                    ? `bg-gradient-to-r ${b.gradient} text-black scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]`
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}>
                            {b.label}
                        </button>
                    ))}
                </div>

                <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-2xl">
                    <h1 className={`text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br ${activeBadge.gradient} mb-4 drop-shadow-2xl transition-all duration-500`}>
                        {activeBadge.title}
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        {activeBadge.desc}
                    </p>
                </div>

                <div className={`w-full max-w-5xl h-[45vh] md:h-[55vh] rounded-[3rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm ${activeBadge.shadow} relative animate-in zoom-in-95 duration-1000 overflow-hidden group flex items-center justify-center transition-all`}>
                    
                    {/* Lingkaran cahaya di belakang 3D */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] ${activeBadge.ring} blur-[80px] rounded-full pointer-events-none transition-all duration-1000`} />

                    {/* Menggunakan key prop untuk re-mount BadgeViewer agar model 3D direfresh dengan benar saat tab diganti */}
                    <BadgeViewer key={activeBadge.url} url={activeBadge.url} className="w-full h-full cursor-grab active:cursor-grabbing relative z-10" />
                    
                    {/* Tooltip hint */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/60 border border-white/10 text-sm font-bold text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-md z-20 pointer-events-none flex items-center gap-2">
                        <span>👆</span> Geser untuk memutar atau zoom lencana
                    </div>
                </div>
            </main>
        </div>
    );
}
