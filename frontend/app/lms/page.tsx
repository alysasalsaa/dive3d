'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type ViewState = 
  | 'login' 
  | 'admin_dashboard' 
  | 'admin_manage'
  | 'admin_edit_data'
  | 'user_dashboard' 
  | 'user_modules' 
  | 'user_read_module' 
  | 'user_quiz' 
  | 'user_quiz_result';

type ModuleData = {
  id: string;
  title: string;
  desc: string;
  icon: string;
};

export default function LMSPage() {
  const [view, setView] = useState<ViewState | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    if (role === 'admin') {
      setView('admin_dashboard');
    } else if (role === 'user') {
      setView('user_dashboard');
    } else {
      window.location.href = '/';
    }
  }, []);

  // ==========================================
  // DATABASE SIMULATION (Bisa diakses Admin & User)
  // ==========================================
  const [modules, setModules] = useState<ModuleData[]>([
    {
      id: 'm1',
      title: 'Ekosistem Terumbu Karang',
      desc: 'Mempelajari struktur dan fungsi ekosistem terumbu karang di lautan bebas.',
      icon: '🪸'
    }
  ]);

  // ==========================================
  // STATE ADMIN
  // ==========================================
  const [manageCategory, setManageCategory] = useState<'Modul' | 'Materi' | 'Quiz' | 'User'>('Modul');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newIcon, setNewIcon] = useState('📦');
  const [isAdminProcessing, setIsAdminProcessing] = useState(false);

  // ==========================================
  // STATE USER
  // ==========================================
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [hasBadge, setHasBadge] = useState(false);
  const [hasCertificate, setHasCertificate] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset semua state sementara saat logout
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    window.location.href = '/';
  };

  // --- LOGIKA ADMIN ---
  const handleSaveAdminData = () => {
    setIsAdminProcessing(true);
    // Simulasi "Sistem update database"
    setTimeout(() => {
      // Jika yang diubah adalah Modul, kita masukkan ke state Modules agar terlihat oleh User
      if (manageCategory === 'Modul') {
        const newMod: ModuleData = {
          id: `m${Date.now()}`,
          title: newTitle || 'Modul Baru',
          desc: newDesc || 'Deskripsi modul baru.',
          icon: newIcon || '📦'
        };
        setModules([...modules, newMod]);
      }
      
      // Reset form
      setNewTitle('');
      setNewDesc('');
      setNewIcon('📦');
      
      setIsAdminProcessing(false);
      // Sesuai flowchart: kembali ke "Ingin mengelola data?" (Dashboard)
      setView('admin_dashboard');
    }, 2000);
  };

  const openManageForm = (category: 'Modul' | 'Materi' | 'Quiz' | 'User') => {
    setManageCategory(category);
    setNewTitle('');
    setNewDesc('');
    setNewIcon('📦');
    setView('admin_edit_data');
  };

  // --- LOGIKA USER ---
  const handleSimulateScroll = () => {
    if (readProgress < 100) setReadProgress((prev) => Math.min(prev + 25, 100));
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    if (quizAnswers[1] === 'B') calculatedScore += 50;
    if (quizAnswers[2] === 'C') calculatedScore += 50;
    
    setScore(calculatedScore);
    setIsProcessing(true);
    setView('user_quiz_result');

    setTimeout(() => {
      setIsProcessing(false);
      setHasBadge(calculatedScore >= 50);
      setHasCertificate(calculatedScore === 100);
    }, 2000);
  };

  if (!view) return null;

  return (
    <div className="min-h-screen bg-[#00040a] text-white font-sans flex flex-col">
      {/* NAVBAR */}
      <nav className="w-full px-8 py-5 flex justify-between items-center border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/20">
            🎓
          </div>
          <span className="text-xl font-black tracking-widest">DIVEXPLORE LMS</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/akademi" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            ← Kembali ke Akademi
          </Link>
          {view !== 'login' && (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full text-sm font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-6 relative">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />



        {/* ========================================= */}
        {/* VIEW: ADMIN DASHBOARD */}
        {/* ========================================= */}
        {view === 'admin_dashboard' && (
          <div className="w-full max-w-4xl p-8 rounded-[32px] bg-[#000814] border border-white/10 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
             <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/20">
                👨‍💼
              </div>
              <div>
                <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
                <p className="text-gray-400">Selamat datang, Administrator.</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Ingin mengelola data?</h2>
                <p className="text-purple-200/70 max-w-lg">
                  Anda dapat menambah atau mengubah Modul, Materi, Quiz, dan User di sistem ini.
                </p>
              </div>
              <div className="flex gap-4">
                <button onClick={handleLogout} className="px-6 py-4 rounded-xl font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all">
                  Tidak (Logout)
                </button>
                <button onClick={() => setView('admin_manage')} className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition-all shadow-xl shadow-purple-500/25">
                  Ya, Kelola Data →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
               <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                 <div className="text-sm text-gray-500 mb-1">Total Modul</div>
                 <div className="text-2xl font-black text-white">{modules.length}</div>
               </div>
               <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                 <div className="text-sm text-gray-500 mb-1">Total Pengguna</div>
                 <div className="text-2xl font-black text-white">124</div>
               </div>
               <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                 <div className="text-sm text-gray-500 mb-1">Sistem Status</div>
                 <div className="text-2xl font-black text-emerald-400">Online</div>
               </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW: ADMIN MANAGE */}
        {/* ========================================= */}
        {view === 'admin_manage' && (
          <div className="w-full max-w-4xl p-8 rounded-[32px] bg-[#000814] border border-white/10 shadow-2xl relative z-10 animate-in slide-in-from-right-8 duration-500">
             <div className="flex items-center justify-between mb-8">
               <div>
                 <h1 className="text-3xl font-black text-white mb-2">Pilih Menu Kelola Data</h1>
                 <p className="text-gray-400">Pilih entitas data yang ingin Anda kelola.</p>
               </div>
               <button onClick={() => setView('admin_dashboard')} className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                 ← Kembali
               </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Modul', icon: '📚', color: 'from-blue-500 to-cyan-400', desc: 'Tambah atau ubah modul pembelajaran.' },
                  { title: 'Materi', icon: '📄', color: 'from-emerald-500 to-teal-400', desc: 'Kelola isi konten teks dan media pada modul.' },
                  { title: 'Quiz', icon: '📝', color: 'from-purple-500 to-pink-500', desc: 'Atur pertanyaan dan jawaban evaluasi.' },
                  { title: 'User', icon: '👥', color: 'from-orange-500 to-amber-400', desc: 'Manajemen hak akses dan profil mahasiswa.' }
                ].map((item) => (
                  <div 
                    key={item.title}
                    onClick={() => openManageForm(item.title as 'Modul'|'Materi'|'Quiz'|'User')}
                    className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all cursor-pointer flex items-start gap-6"
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl bg-gradient-to-br ${item.color} shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Kelola {item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW: ADMIN EDIT DATA (Simpan Perubahan) */}
        {/* ========================================= */}
        {view === 'admin_edit_data' && (
          <div className="w-full max-w-2xl p-8 rounded-[32px] bg-[#000814] border border-cyan-500/30 shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)] relative z-10 animate-in slide-in-from-bottom-8 duration-500">
            {isAdminProcessing ? (
               <div className="py-24 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-6" />
                 <h2 className="text-2xl font-bold text-cyan-400 animate-pulse">Sistem update database...</h2>
                 <p className="text-gray-500 mt-2">Menyimpan perubahan {manageCategory} ke server. Mohon tunggu.</p>
               </div>
            ) : (
              <>
                <div className="mb-8 border-b border-white/10 pb-6">
                  <div className="inline-block px-3 py-1 mb-3 rounded-full border border-cyan-400/30 bg-cyan-500/15 text-cyan-300 text-[10px] font-black uppercase tracking-widest">
                    Formulir Admin ({manageCategory})
                  </div>
                  <h1 className="text-3xl font-black text-white mb-2">Tambah/Edit {manageCategory}</h1>
                  <p className="text-gray-400">Masukkan informasi detail untuk {manageCategory.toLowerCase()} yang akan dikelola.</p>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Judul / Nama {manageCategory}</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                      placeholder={`Contoh Judul ${manageCategory}...`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Deskripsi / Detail</label>
                    <textarea
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all h-28 resize-none"
                      placeholder="Tuliskan detail selengkapnya di sini..."
                    />
                  </div>
                  
                  {manageCategory === 'Modul' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pilih Ikon (Khusus Modul)</label>
                      <div className="flex gap-4">
                        {['📦', '🐟', '🌿', '🐢', '🦀', '🌊'].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => setNewIcon(emoji)}
                            className={`w-14 h-14 rounded-xl text-2xl flex items-center justify-center transition-all border ${newIcon === emoji ? 'bg-cyan-500/20 border-cyan-400' : 'bg-black/50 border-white/10 hover:border-white/30'}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* FLOW: Simpan Perubahan */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <button onClick={() => setView('admin_manage')} className="px-6 py-4 rounded-xl font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                    Batal
                  </button>
                  <button 
                    onClick={handleSaveAdminData} 
                    disabled={!newTitle || !newDesc}
                    className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition-all shadow-xl shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW: USER DASHBOARD */}
        {/* ========================================= */}
        {view === 'user_dashboard' && (
          <div className="w-full max-w-4xl p-8 rounded-[32px] bg-[#000814] border border-white/10 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20">
                👨‍🎓
              </div>
              <div>
                <h1 className="text-3xl font-black text-white">User Dashboard</h1>
                <p className="text-gray-400">Selamat datang kembali di sistem LMS.</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Lanjutkan Pembelajaran Anda</h2>
                <p className="text-blue-200/70 max-w-lg">
                  Terdapat <strong className="text-white">{modules.length} Modul</strong> yang tersedia untuk Anda pelajari saat ini.
                </p>
              </div>
              <button
                onClick={() => setView('user_modules')}
                className="shrink-0 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-all shadow-xl shadow-blue-500/25 flex items-center gap-2"
              >
                <span>Pilih Learning Modules</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW: USER MODULES */}
        {/* ========================================= */}
        {view === 'user_modules' && (
          <div className="w-full max-w-5xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-black text-white">Pilih Modul</h1>
                <p className="text-gray-400">Pilih modul yang ingin Anda pelajari hari ini.</p>
              </div>
               <button onClick={() => setView('user_dashboard')} className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                 ← Kembali
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {modules.map((mod) => (
                <div key={mod.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all group flex flex-col">
                  <div className="h-40 rounded-xl bg-gradient-to-br from-blue-900/30 to-black mb-6 flex items-center justify-center group-hover:scale-[1.02] transition-transform border border-white/5">
                    <span className="text-6xl drop-shadow-2xl">{mod.icon}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">{mod.title}</h3>
                    <p className="text-sm text-gray-400 mb-6">{mod.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedModule(mod);
                      setReadProgress(0);
                      setView('user_read_module');
                    }}
                    className="w-full py-3 rounded-xl font-bold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500 hover:text-white transition-all border border-cyan-500/30 hover:border-cyan-400"
                  >
                    Pilih Modul Ini
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW: BACA MATERI */}
        {/* ========================================= */}
        {view === 'user_read_module' && (
          <div className="w-full max-w-3xl p-8 rounded-[32px] bg-[#000814] border border-white/10 shadow-2xl relative z-10 animate-in slide-in-from-right-8 duration-500">
            <h1 className="text-3xl font-black text-white mb-4 flex items-center gap-3">
              <span className="text-4xl">{selectedModule?.icon}</span>
              Materi: {selectedModule?.title}
            </h1>
            
            <div className="mb-6">
              <div className="flex justify-between text-xs text-cyan-400 font-bold mb-2 uppercase tracking-wider">
                <span>Progres Membaca</span>
                <span>{readProgress}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${readProgress}%` }}
                />
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-gray-300 space-y-4 mb-8 min-h-[200px]">
              <p>Ini adalah konten pengantar untuk modul <strong>{selectedModule?.title}</strong>. Pelajari dengan saksama karena evaluasi quiz akan berdasarkan materi ini.</p>
              
              {readProgress >= 25 && (
                <p className="animate-in fade-in duration-500">Materi Bagian 1: {selectedModule?.desc}</p>
              )}
              {readProgress >= 50 && (
                <p className="animate-in fade-in duration-500">Materi Bagian 2: Fakta unik tentang topik ini adalah pentingnya menjaga keseimbangan ekosistem demi masa depan bumi kita.</p>
              )}
              {readProgress >= 75 && (
                <p className="animate-in fade-in duration-500">Kesimpulan: Ekosistem laut dan pesisir sangat rentan terhadap perubahan iklim dan campur tangan manusia.</p>
              )}
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              {readProgress >= 100 && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium text-center">
                  ✅ Materi Selesai Dibaca!
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setView('user_modules')}
                  className="px-6 py-4 rounded-xl font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10 flex items-center gap-2"
                >
                  <span>← Kembali ke Modul</span>
                </button>

                {readProgress < 100 ? (
                  <button
                    onClick={handleSimulateScroll}
                    className="px-6 py-4 rounded-xl font-bold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all flex items-center gap-2"
                  >
                    <span>Lanjut Membaca (Scroll ↓)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setView('user_quiz');
                    }}
                    className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition-all shadow-xl shadow-blue-500/25"
                  >
                    Mulai Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW: QUIZ & QUIZ RESULT */}
        {/* ========================================= */}
        {view === 'user_quiz' && (
          <div className="w-full max-w-3xl p-8 rounded-[32px] bg-[#000814] border border-cyan-500/30 shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)] relative z-10 animate-in slide-in-from-bottom-8 duration-500">
            <h1 className="text-3xl font-black text-white mb-2">Quiz: {selectedModule?.title}</h1>
            <p className="text-gray-400 mb-8">Pilih jawaban yang paling tepat berdasarkan materi yang telah dipelajari.</p>

            <div className="space-y-8 mb-10">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-lg font-medium text-white mb-4">1. Apa inti dari materi yang baru saja dibaca?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['A. Hal yang tidak penting', 'B. Menjaga keseimbangan ekosistem', 'C. Merusak lingkungan', 'D. Tidak ada hubungannya'].map((opt) => (
                    <label key={opt} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${quizAnswers[1] === opt[0] ? 'bg-cyan-500/20 border-cyan-400' : 'bg-black/40 border-white/5 hover:border-white/20'}`}>
                      <input 
                        type="radio" 
                        name="q1" 
                        className="hidden"
                        checked={quizAnswers[1] === opt[0]}
                        onChange={() => setQuizAnswers(prev => ({ ...prev, 1: opt[0] }))}
                      />
                      <span className={quizAnswers[1] === opt[0] ? 'text-cyan-300 font-bold' : 'text-gray-300'}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-lg font-medium text-white mb-4">2. Materi ini sangat penting untuk masa depan, setuju?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['A. Tidak Setuju', 'B. Ragu-ragu', 'C. Sangat Setuju', 'D. Biasa saja'].map((opt) => (
                    <label key={opt} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${quizAnswers[2] === opt[0] ? 'bg-cyan-500/20 border-cyan-400' : 'bg-black/40 border-white/5 hover:border-white/20'}`}>
                      <input 
                        type="radio" 
                        name="q2" 
                        className="hidden"
                        checked={quizAnswers[2] === opt[0]}
                        onChange={() => setQuizAnswers(prev => ({ ...prev, 2: opt[0] }))}
                      />
                      <span className={quizAnswers[2] === opt[0] ? 'text-cyan-300 font-bold' : 'text-gray-300'}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button
                onClick={() => setView('user_read_module')}
                className="px-6 py-4 rounded-xl font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10 flex items-center gap-2"
              >
                <span>← Kembali ke Materi</span>
              </button>
              <button
                onClick={handleSubmitQuiz}
                disabled={!quizAnswers[1] || !quizAnswers[2]}
                className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:scale-105 transition-all shadow-xl shadow-emerald-500/25 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                Submit Jawaban
              </button>
            </div>
          </div>
        )}

        {view === 'user_quiz_result' && (
           <div className="w-full max-w-2xl p-8 rounded-[32px] bg-[#000814] border border-white/10 shadow-2xl relative z-10 animate-in zoom-in-95 duration-500 text-center">
           {isProcessing ? (
             <div className="py-20 flex flex-col items-center justify-center">
               <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-6" />
               <h2 className="text-xl font-bold text-cyan-400 animate-pulse">Menyimpan Nilai & Update Progress...</h2>
             </div>
           ) : (
             <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="mb-8">
                 <div className="inline-block p-6 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-white/10 mb-6">
                   <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{score}</span>
                 </div>
                 <h1 className="text-3xl font-black text-white mb-2">Nilai Akhir Anda</h1>
                 <p className="text-gray-400 text-lg">Evaluasi selesai.</p>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className={`p-6 rounded-2xl border ${hasBadge ? 'bg-amber-500/10 border-amber-500/30' : 'bg-black/50 border-white/5 opacity-50'}`}>
                    <div className="text-4xl mb-3">{hasBadge ? '🏅' : '🔒'}</div>
                    <h3 className={`font-bold ${hasBadge ? 'text-amber-400' : 'text-gray-500'}`}>Badge</h3>
                  </div>
                  <div className={`p-6 rounded-2xl border ${hasCertificate ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-black/50 border-white/5 opacity-50'}`}>
                    <div className="text-4xl mb-3">{hasCertificate ? '📜' : '🔒'}</div>
                    <h3 className={`font-bold ${hasCertificate ? 'text-cyan-400' : 'text-gray-500'}`}>Sertifikat</h3>
                  </div>
               </div>

               <button onClick={handleLogout} className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-rose-500 hover:scale-[1.02] transition-all shadow-xl shadow-red-500/25">
                 Logout
               </button>
             </div>
           )}
         </div>
        )}
      </main>
    </div>
  );
}
