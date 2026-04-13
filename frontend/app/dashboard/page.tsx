import React from 'react';

// Fetch fungsi untuk memanggil API Laravel dari Server Next.js
async function fetchDashboardData() {
    try {
        // Karena Server Components, fetch akan dijalankan di backend Next.js
        // Kita menggunakan cache 'no-store' agar selalu menerima data terbaru
        const response = await fetch('http://127.0.0.1:8000/api/dashboard', {
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error('Failed to fetch from API:', response.status);
            return null;
        }

        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error('Fetch exception:', error);
        return null;
    }
}

export default async function DashboardWireframe() {
    // 1. Panggil data dari API Laravel
    const apiData = await fetchDashboardData();

    // 2. Loading state fallback (jika server mati / belum ada data)
    if (!apiData) {
        return (
            <div className="flex flex-col h-screen items-center justify-center bg-gray-50 text-gray-800 font-['Outfit'] space-y-4">
                <span className="text-4xl">🔌</span>
                <h1 className="text-xl font-bold">Gagal Terhubung Ke Server Laravel</h1>
                <p className="text-gray-500">Pastikan Anda sudah menjalankan <b>php artisan serve</b> di port 8000.</p>
            </div>
        );
    }

    // 3. Destructure (ambil isi datanya)
    const { 
        user, 
        badges, 
        learning_progress, 
        recent_quizzes, 
        leaderboard, 
        daily_challenges 
    } = apiData;

    // Kalkulasi XP ke persentase agar bisa menggambar progress bar dinamis
    const xpPercentage = Math.min((user.current_xp / user.next_level_xp) * 100, 100);

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

            {/* Container Utama */}
            <div className="flex h-screen bg-gray-50 font-['Outfit'] text-gray-800">

                {/* NAVIGASI KONTROL: Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-6 text-2xl font-bold text-blue-900 flex items-center gap-3">
                        <span role="img" aria-label="rocket" className="bg-blue-100 p-2 rounded-lg text-xl">🚀</span>
                        SeaQuest
                    </div>
                    <ul className="flex-1 px-4 space-y-2 mt-4">
                        <li className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 font-semibold rounded-xl cursor-pointer">
                            <span role="img" aria-label="chart">📊</span> Dashboard Utama
                        </li>
                        <li className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors">
                            <span role="img" aria-label="books">📚</span> Ruang Kelas
                        </li>
                        <li className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors">
                            <span role="img" aria-label="crown">👑</span> Leaderboard
                        </li>
                        <li className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors">
                            <span role="img" aria-label="gift">🎁</span> Klaim Hadiah
                        </li>
                        <li className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors">
                            <span role="img" aria-label="settings">⚙️</span> Pengaturan
                        </li>
                    </ul>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col overflow-y-auto">

                    {/* NAVIGASI KONTROL: Header */}
                    <header className="bg-white px-8 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
                        <div className="text-xl font-semibold text-gray-800">Learning Page</div>
                        <div className="flex items-center gap-4">
                            <div className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors" title="Notifikasi">
                                <span role="img" aria-label="bell" className="text-xl">🔔</span>
                                <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-tr from-blue-400 to-cyan-400 rounded-full cursor-pointer shadow-sm border-2 border-white" title="Profile Menu"></div>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    <div className="p-8 max-w-7xl mx-auto w-full space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* 1. KOMPONEN UTAMA: Profile (DINAMIS DARI API) */}
                            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-6">
                                <div className="w-24 h-24 bg-gradient-to-tr from-blue-400 to-cyan-400 rounded-full shadow-inner flex-shrink-0"></div>
                                <div className="flex-1">
                                    <div className="text-2xl font-bold text-gray-900">{user.name}</div>
                                    <div className="text-blue-600 font-medium mt-1 flex items-center gap-1">
                                        <span role="img" aria-label="stars">✨</span> Level {user.level} : {user.rank_name}
                                    </div>
                                    <div className="mt-4 bg-gray-100 rounded-full h-3 w-full overflow-hidden">
                                        {/* CSS dinamis dari kalkulasi XP percentage */}
                                        <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${xpPercentage}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 mt-2 font-medium">
                                        <span>{user.current_xp.toLocaleString()} XP Saat Ini</span>
                                        <span>Dibutuhkan {user.next_level_xp.toLocaleString()} XP untuk Level Up</span>
                                    </div>
                                </div>
                            </div>

                            {/* 1. KOMPONEN UTAMA: Badge / Lencana (DINAMIS) */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
                                <div className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span role="img" aria-label="medal" className="text-xl">🏅</span> Koleksi Lencana
                                </div>
                                <div className="flex gap-4 justify-center">
                                    {badges.map((badge: any) => (
                                        <div 
                                            key={badge.id} 
                                            className={`w-14 h-14 rounded-full border-2 border-dashed flex items-center justify-center text-2xl transition-all cursor-pointer ${badge.achieved ? 'border-blue-400 bg-blue-50 hover:bg-blue-100' : 'border-gray-300 bg-gray-50'}`} 
                                            title={badge.tooltip}
                                        >
                                            <span role="img" aria-label={badge.name} className={badge.achieved ? 'opacity-100' : 'opacity-50 hover:opacity-100 transition-opacity'}>
                                                {badge.icon}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 2. ELEMEN MONITORING: Status Progres Belajar (DINAMIS) */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <span role="img" aria-label="chart_up" className="text-xl">📈</span> Progres Belajar
                                </div>

                                <div className="space-y-5">
                                    {/* Tailwind dinamis class harus digenerate lengkap jika di-interpolate string (seperti bg-blue-500), jika tidak NextJS bisa gagal purge css-nya. Cara aman via style jika dynamic class purgenya gagal, tapi disini kita gunakan styling sederhana map dari API */}
                                    {learning_progress.map((course: any) => {
                                        // Karena warna dari API (blue, amber, emerald), kita handle map manual agar Tailwind kompile:
                                        let textColor = "text-gray-500", bgColor = "bg-gray-500";
                                        if(course.color === 'emerald') { textColor = "text-emerald-500"; bgColor = "bg-emerald-500"; }
                                        else if(course.color === 'blue') { textColor = "text-blue-500"; bgColor = "bg-blue-500"; }
                                        else if(course.color === 'amber') { textColor = "text-amber-500"; bgColor = "bg-amber-500"; }

                                        return (
                                            <div key={course.course_id}>
                                                <div className="flex justify-between text-sm font-medium mb-2">
                                                    <span className="text-gray-700">{course.title}</span>
                                                    <span className={textColor}>{course.progress_percentage}%</span>
                                                </div>
                                                <div className="bg-gray-100 rounded-full h-2 w-full overflow-hidden">
                                                    <div className={`${bgColor} h-full rounded-full transition-all duration-1000`} style={{ width: `${course.progress_percentage}%` }}></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 2. ELEMEN MONITORING: Ringkasan Skor Kuis (DINAMIS) */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <span role="img" aria-label="memo" className="text-xl">📝</span> Ringkasan Skor Kuis
                                </div>
                                <div className="space-y-4">
                                    {recent_quizzes.map((quiz: any) => {
                                        let wrapColor = "border-gray-100 bg-gray-50/30";
                                        let scoreColor = "text-gray-600";
                                        if(quiz.color === 'emerald') { wrapColor = "border-emerald-100 bg-emerald-50/30"; scoreColor = "text-emerald-600"; }
                                        else if(quiz.color === 'blue') { wrapColor = "border-blue-100 bg-blue-50/30"; scoreColor = "text-blue-600"; }
                                        else if(quiz.color === 'amber') { wrapColor = "border-amber-100 bg-amber-50/30"; scoreColor = "text-amber-600"; }

                                        return(
                                            <div key={quiz.quiz_id} className={`flex justify-between items-center p-3 rounded-lg border ${wrapColor}`}>
                                                <span className="text-sm font-medium text-gray-700">{quiz.title}</span>
                                                <span className={`text-sm font-bold ${scoreColor}`}>{quiz.score} / 100</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* 3. FITUR GAMIFIKASI: Leaderboard, Tantangan, Reward (DINAMIS) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Gamifikasi: Leaderboard */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <span role="img" aria-label="crown" className="text-xl">👑</span> Leaderboard Top 3
                                </div>
                                <div className="space-y-4">
                                    {leaderboard.map((lb: any, idx: number) => {
                                        let bgClass = "bg-gray-50"; 
                                        let badgeColor = "bg-gray-300"; 
                                        let textXP = "text-gray-600";

                                        if (lb.rank === 1) { bgClass="bg-yellow-50/50"; badgeColor="bg-yellow-400"; textXP="text-yellow-600"; }
                                        if (lb.rank === 3) { bgClass="bg-orange-50/50 border border-orange-100"; badgeColor="bg-orange-400"; textXP="text-orange-600"; }

                                        return (
                                            <div key={idx} className={`flex items-center gap-3 p-2 rounded-lg ${bgClass}`}>
                                                <div className={`w-8 h-8 rounded-full ${badgeColor} text-white flex items-center justify-center font-bold text-sm shadow-sm`}>{lb.rank}</div>
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">{lb.avatar_emoji}</div>
                                                <div className="flex-1">
                                                    <div className={`text-sm font-bold ${lb.rank === 3 && lb.name.includes("Maulana") ? 'text-blue-700' : 'text-gray-800'}`}>{lb.name}</div>
                                                    <div className={`text-xs font-medium ${textXP}`}>{lb.xp.toLocaleString()} XP</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Gamifikasi: Tantangan Interaktif */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <span role="img" aria-label="crossed_swords" className="text-xl">⚔️</span> Tantangan Harian
                                </div>
                                <div className="space-y-4">
                                   {daily_challenges.map((challenge: any) => (
                                        <div key={challenge.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                            <div className="text-sm font-bold text-gray-800 mb-2">{challenge.title}</div>
                                            <div className="bg-gray-200 rounded-full h-1.5 w-full overflow-hidden mb-2">
                                                <div className={`h-full rounded-full ${challenge.progress_percentage === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${challenge.progress_percentage}%` }}></div>
                                            </div>
                                            <div className={`text-xs font-semibold flex items-center gap-1 ${challenge.progress_percentage === 100 ? 'text-emerald-600' : 'text-blue-600'}`}>
                                                <span role="img" aria-label="gift_small">{challenge.reward_icon}</span> {challenge.reward_text}
                                            </div>
                                        </div>
                                   ))}
                                </div>
                            </div>

                            {/* Gamifikasi: Reward System */}
                            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 shadow-md border border-blue-800 flex flex-col justify-center items-center text-center">
                                <div className="font-bold text-yellow-400 mb-4 flex items-center gap-2 text-lg">
                                    <span role="img" aria-label="gift" className="text-xl">🎁</span> Reward System
                                </div>
                                <div className="mb-6">
                                    <div className="text-sm text-blue-200 font-medium mb-1">Total Gems Yang Anda Miliki:</div>
                                    <div className="text-4xl font-extrabold text-white flex items-center justify-center gap-2">
                                        <span role="img" aria-label="gem">💎</span> {user.gems}
                                    </div>
                                </div>
                                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-orange-950 font-bold py-3 px-4 rounded-xl transition-transform transform hover:-translate-y-1 shadow-lg">
                                    Buka Toko / Tukar Reward
                                </button>
                                <div className="mt-4 text-xs text-blue-300/80 font-medium">
                                    Ada 3 item e-book eksklusif yang bisa ditukar!
                                </div>
                            </div>

                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}