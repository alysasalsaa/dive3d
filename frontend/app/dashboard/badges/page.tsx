'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '../../../lib/useTheme';
import { Waves, Trophy, Fish, Recycle, Moon, Crown, Award, Lock } from '../../../components/DiveIcons';

const ALL_BADGES: { id: number; name: string; tooltip: string; icon: React.ReactNode; achieved: boolean; date: string; rarity: string }[] = [
    { id: 1, name: 'Penyelam Pemula', tooltip: 'Selesaikan modul pertama', icon: '🤿', achieved: true, date: '10 Mei 2026', rarity: 'common' },
    { id: 2, name: 'Pengamat Karang', tooltip: 'Selesaikan kuis ekosistem karang', icon: '🔍', achieved: true, date: '12 Mei 2026', rarity: 'common' },
    { id: 3, name: 'Pelindung Laut', tooltip: 'Pelajari modul ancaman laut', icon: <Waves size={20} />, achieved: true, date: '15 Mei 2026', rarity: 'rare' },
    { id: 4, name: 'Juara Kuis', tooltip: 'Dapatkan nilai sempurna di 3 kuis', icon: <Trophy size={20} />, achieved: false, date: '-', rarity: 'epic' },
    { id: 5, name: 'Ahli Spesies', tooltip: 'Selesaikan semua modul ensiklopedia', icon: <Fish size={20} />, achieved: false, date: '-', rarity: 'rare' },
    { id: 6, name: 'Konservator', tooltip: 'Bagikan 5 artikel tentang laut', icon: <Recycle size={20} />, achieved: false, date: '-', rarity: 'common' },
    { id: 7, name: 'Penyelam Malam', tooltip: 'Login dan belajar di atas jam 21:00', icon: <Moon size={18} />, achieved: true, date: '20 Mei 2026', rarity: 'epic' },
    { id: 8, name: 'Legenda Samudra', tooltip: 'Selesaikan semua modul dan kuis', icon: <Crown size={20} />, achieved: false, date: '-', rarity: 'legendary' },
];

export default function BadgesPage() {
    const { isDark } = useTheme();

    const rarityColors: Record<string, { bg: string, text: string, border: string }> = {
        common: { bg: 'from-gray-400 to-gray-500', text: 'text-gray-400', border: 'border-gray-400/30' },
        rare: { bg: 'from-blue-400 to-cyan-500', text: 'text-cyan-400', border: 'border-cyan-400/30' },
        epic: { bg: 'from-purple-500 to-fuchsia-500', text: 'text-fuchsia-400', border: 'border-fuchsia-500/30' },
        legendary: { bg: 'from-yellow-400 to-orange-500', text: 'text-yellow-400', border: 'border-yellow-400/50' },
    };

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 p-6 md:p-10 relative overflow-y-auto overflow-x-hidden ${isDark ? 'bg-[#00040a] text-white' : 'bg-sky-50 text-gray-900'}`}>
            
            {/* Ambient glow background */}
            {isDark && (
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full" />
                </div>
            )}

            <div className="relative z-10 max-w-6xl mx-auto">
                <Link 
                    href="/dashboard" 
                    className={`inline-flex items-center gap-2 mb-8 font-semibold transition-all hover:-translate-x-1 px-4 py-2 rounded-full border ${isDark ? 'text-gray-300 hover:text-white bg-white/5 border-white/10 hover:bg-white/10' : 'text-gray-600 hover:text-blue-700 bg-white border-gray-200 hover:bg-gray-50 shadow-sm'}`}
                >
                    <span className="text-lg leading-none">←</span> <span>Kembali ke Dashboard</span>
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-sm">
                            Koleksi Lencana
                        </h1>
                        <p className={`text-lg font-medium max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Kumpulkan semua lencana dengan menyelesaikan berbagai misi dan modul pembelajaran. Tunjukkan dedikasi Anda pada pelestarian laut!
                        </p>
                    </div>
                    <div className={`px-6 py-4 rounded-3xl border backdrop-blur-xl shrink-0 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                        <div className="text-sm font-bold text-gray-500 mb-1">Total Lencana Anda</div>
                        <div className="text-3xl font-black flex items-center gap-3">
                            <Award size={20} />
                            <span className={isDark ? 'text-white' : 'text-blue-900'}>
                                {ALL_BADGES.filter(b => b.achieved).length} <span className="text-gray-400 text-xl font-bold">/ {ALL_BADGES.length}</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
                    {ALL_BADGES.map((badge) => {
                        const style = rarityColors[badge.rarity];
                        
                        return (
                            <div 
                                key={badge.id}
                                className={`relative group rounded-[2rem] p-6 border backdrop-blur-xl transition-all duration-300 flex flex-col h-full
                                    ${badge.achieved 
                                        ? isDark 
                                            ? `bg-white/[0.04] border-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]` 
                                            : 'bg-white border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 hover:border-blue-200'
                                        : isDark
                                            ? 'bg-black/20 border-white/5 opacity-60'
                                            : 'bg-gray-100/50 border-gray-200 opacity-60'
                                    }`}
                            >
                                <div className="absolute top-5 right-5 text-[10px] font-black uppercase tracking-widest">
                                    <span className={badge.achieved ? style.text : 'text-gray-500'}>
                                        {badge.rarity}
                                    </span>
                                </div>
                                
                                <div className="flex flex-col items-center text-center mt-2 flex-grow">
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6
                                        ${badge.achieved 
                                            ? `bg-gradient-to-br ${style.bg} shadow-lg shadow-black/20 text-white` 
                                            : `bg-gray-800 grayscale border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'} text-gray-400`
                                        }`}
                                    >
                                        {badge.icon}
                                    </div>
                                    
                                    <h3 className={`text-xl font-black mb-2 ${badge.achieved ? (isDark ? 'text-white' : 'text-gray-900') : 'text-gray-500'}`}>
                                        {badge.name}
                                    </h3>
                                    
                                    <p className={`text-sm mb-6 flex-grow ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {badge.tooltip}
                                    </p>
                                    
                                    <div className={`w-full pt-4 mt-auto border-t ${isDark ? 'border-white/10' : 'border-gray-200'} flex justify-between items-center text-xs font-bold`}>
                                        <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>Status</span>
                                        {badge.achieved ? (
                                            <span className="text-emerald-500 flex items-center gap-1.5">
                                                <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">✓</span> 
                                                Didapatkan
                                            </span>
                                        ) : (
                                            <span className="text-gray-500 flex items-center gap-1.5">
                                                <span className="w-4 h-4 rounded-full bg-gray-500/20 flex items-center justify-center"><Lock size={24} /></span>
                                                Terkunci
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
