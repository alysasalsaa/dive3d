'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type ViewState =
  | 'login'
  | 'admin_dashboard'
  | 'admin_manage'
  | 'admin_edit_data'
  | 'admin_quiz'
  | 'user_dashboard'
  | 'user_track_select'
  | 'user_modules'
  | 'user_read_module'
  | 'user_quiz'
  | 'user_quiz_result'
  | 'user_certificate';

type TrackData = {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  modules: ModuleData[];
};

const TRACKS: TrackData[] = [
  {
    id: 'konservasi-laut',
    title: 'Konservasi Laut',
    desc: '4 modul tentang ekosistem dan pelestarian laut Raja Ampat.',
    icon: '🪸',
    color: 'from-blue-500 to-cyan-400',
    modules: [
      { id: 'm1', slug: 'terumbu-karang', title: 'Ekosistem Terumbu Karang', desc: 'Mempelajari struktur dan fungsi ekosistem terumbu karang di lautan bebas.', icon: '🪸' },
      { id: 'm2', slug: 'keanekaragaman-laut', title: 'Keanekaragaman Hayati Laut', desc: 'Eksplorasi ragam spesies ikan, moluska, dan invertebrata yang menghuni perairan Raja Ampat.', icon: '🐠' },
      { id: 'm3', slug: 'ancaman-lingkungan', title: 'Ancaman Lingkungan Laut', desc: 'Pahami dampak perubahan iklim, pemutihan karang, dan polusi terhadap ekosistem laut.', icon: '⚠️' },
      { id: 'm4', slug: 'konservasi-aksi', title: 'Aksi Konservasi Nyata', desc: 'Temukan cara nyata untuk berkontribusi pada pelestarian laut.', icon: '💚' },
    ],
  },
  {
    id: 'konten-digital',
    title: 'Konten Digital Bahari',
    desc: '5 modul tentang pembuatan dan distribusi konten digital bertema bahari.',
    icon: '🎬',
    color: 'from-purple-500 to-pink-400',
    modules: [
      { id: 'kd1', slug: 'fotografi-bawah-laut', title: 'Fotografi Bawah Laut', desc: 'Teknik mengabadikan keindahan bawah laut dengan peralatan dan komposisi yang tepat.', icon: '📸' },
      { id: 'kd2', slug: 'teknik-videografi', title: 'Teknik-Teknik Videografi', desc: 'Dasar-dasar dan teknik lanjutan produksi video bawah laut mulai dari peralatan hingga pengambilan gambar.', icon: '🎬' },
      { id: 'kd3', slug: 'storytelling-digital', title: 'Storytelling Digital', desc: 'Cara membangun narasi yang kuat dan emosional melalui konten digital bahari.', icon: '✍️' },
      { id: 'kd4', slug: 'editing-publishing', title: 'Editing dan Publishing Guide', desc: 'Panduan lengkap editing konten bahari dan strategi publishing ke berbagai platform digital.', icon: '🎞️' },
      { id: 'kd5', slug: 'etika-konten', title: 'Etika dalam Membuat Konten', desc: 'Memahami tanggung jawab etis dalam pembuatan dan penyebaran konten bertema lingkungan laut.', icon: '⚖️' },
    ],
  },
];

type QuizQuestion = {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
};

type ModuleData = {
  id: string;
  slug: string;
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
      setView('user_track_select');
    } else {
      window.location.href = '/';
    }
  }, []);

  // ==========================================
  // DATABASE SIMULATION (Bisa diakses Admin & User)
  // ==========================================
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(null);

  // ==========================================
  // STATE ADMIN
  // ==========================================
  const [manageCategory, setManageCategory] = useState<'Modul' | 'Materi' | 'Quiz' | 'User'>('Modul');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newIcon, setNewIcon] = useState('📦');
  const [isAdminProcessing, setIsAdminProcessing] = useState(false);

  // STATE ADMIN QUIZ
  const [quizModuleSlug, setQuizModuleSlug] = useState('terumbu-karang');
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOptionA, setQuizOptionA] = useState('');
  const [quizOptionB, setQuizOptionB] = useState('');
  const [quizOptionC, setQuizOptionC] = useState('');
  const [quizOptionD, setQuizOptionD] = useState('');
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [existingQuestions, setExistingQuestions] = useState<QuizQuestion[]>([]);
  const [quizAdminLoading, setQuizAdminLoading] = useState(false);

  // ==========================================
  // STATE USER
  // ==========================================
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizUserLoading, setQuizUserLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [hasBadge, setHasBadge] = useState(false);
  const [hasCertificate, setHasCertificate] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [certificateName, setCertificateName] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Simpan progress ke localStorage setiap kali berubah
  useEffect(() => {
    const userEmail = (localStorage.getItem('user_email') || '').toLowerCase();
    if (userEmail && completedQuizzes.length > 0 && selectedTrack) {
      localStorage.setItem(`completed_quizzes_${userEmail}_${selectedTrack.id}`, JSON.stringify(completedQuizzes));
    }
  }, [completedQuizzes, selectedTrack]);


  // Cek apakah semua modul sudah selesai
  useEffect(() => {
    if (modules.length > 0 && completedQuizzes.length >= modules.length) {
      setHasCertificate(true);
    }
  }, [completedQuizzes, modules]);

  // Reset semua state sementara saat logout
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    window.location.href = '/';
  };

  // --- PILIH TRACK ---
  const handleSelectTrack = (track: TrackData) => {
    const userEmail = (localStorage.getItem('user_email') || '').toLowerCase();
    setSelectedTrack(track);
    setModules(track.modules);
    setCompletedQuizzes([]);

    // TEST: vinzcan11 langsung semua selesai
    if (userEmail === 'vinzcan11@gmail.com') {
      setCompletedQuizzes(track.modules.map(m => `Kuis: ${m.title}`));
    } else {
      const savedKey = `completed_quizzes_${userEmail}_${track.id}`;
      const saved = localStorage.getItem(savedKey);
      if (saved) setCompletedQuizzes(JSON.parse(saved));
    }

    setView('user_modules');
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
          slug: `modul-${Date.now()}`,
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
    if (category === 'Quiz') {
      loadQuizQuestions('terumbu-karang');
      setView('admin_quiz');
    } else {
      setView('admin_edit_data');
    }
  };

  const loadQuizQuestions = async (slug: string) => {
    setQuizAdminLoading(true);
    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch(`http://localhost:8000/api/quiz/questions/${slug}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      });
      const data = await res.json();
      setExistingQuestions(data.data ?? []);
    } catch { setExistingQuestions([]); }
    setQuizAdminLoading(false);
  };

  const handleAddQuestion = async () => {
    if (!quizQuestion || !quizOptionA || !quizOptionB || !quizOptionC || !quizOptionD) return;
    setQuizAdminLoading(true);
    const token = localStorage.getItem('auth_token');
    try {
      await fetch('http://localhost:8000/api/quiz/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          module_slug: quizModuleSlug,
          question: quizQuestion,
          option_a: quizOptionA,
          option_b: quizOptionB,
          option_c: quizOptionC,
          option_d: quizOptionD,
          correct_answer: quizCorrectAnswer,
        }),
      });
      setQuizQuestion(''); setQuizOptionA(''); setQuizOptionB(''); setQuizOptionC(''); setQuizOptionD('');
      setQuizCorrectAnswer('A');
      await loadQuizQuestions(quizModuleSlug);
    } catch { setQuizAdminLoading(false); }
  };

  const handleDeleteQuestion = async (id: number) => {
    const token = localStorage.getItem('auth_token');
    try {
      await fetch(`http://localhost:8000/api/quiz/questions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      });
      await loadQuizQuestions(quizModuleSlug);
    } catch { }
  };

  // --- LOGIKA USER ---
  const handleDownloadPDF = async () => {
    const element = document.getElementById('certificate-preview');
    if (!element) return;
    
    setIsGeneratingPDF(true);
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('l', 'px', [800, 565]);
      pdf.addImage(imgData, 'PNG', 0, 0, 800, 565);
      pdf.save(`Sertifikat_${certificateName.replace(/\s+/g, '_') || 'Peserta'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    setIsGeneratingPDF(false);
  };

  const handleSimulateScroll = () => {
    if (readProgress < 100) setReadProgress((prev) => Math.min(prev + 25, 100));
  };

  const loadUserQuiz = async (slug: string) => {
    setQuizUserLoading(true);
    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch(`http://localhost:8000/api/quiz/questions/${slug}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      });
      const data = await res.json();
      setQuizQuestions(data.data ?? []);
    } catch { setQuizQuestions([]); }
    setQuizUserLoading(false);
  };

  const handleSubmitQuiz = async () => {
    // Hitung skor dari soal yang diambil API
    let correct = 0;
    quizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.correct_answer) correct++;
    });
    const total = quizQuestions.length || 1;
    const calculatedScore = Math.round((correct / total) * 100);

    setScore(calculatedScore);
    setIsProcessing(true);
    setView('user_quiz_result');

    if (calculatedScore === 100 && selectedModule) {
      setCompletedQuizzes(prev => [...prev, `Kuis: ${selectedModule.title}`]);
    }

    // Simpan hasil quiz & update progress ke backend
    const token = localStorage.getItem('auth_token');
    if (token && selectedModule) {
      try {
        // 1. Simpan skor quiz
        await fetch('http://localhost:8000/api/quiz/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            quiz_title: `Kuis: ${selectedModule.title}`,
            score: calculatedScore,
            max_score: 100,
          }),
        });

        // 2. Tandai modul sebagai selesai jika lulus (score >= 50)
        if (calculatedScore >= 50) {
          await fetch('http://localhost:8000/api/progress', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              moduleId: selectedModule.slug,
              visitedPois: [],
              completed: true,
            }),
          });
        }
      } catch {
        // Gagal simpan tidak crash tampilan
      }
    }

    setTimeout(() => {
      setIsProcessing(false);
      setHasBadge(calculatedScore >= 50);

      const isComplete = new Set([...completedQuizzes, ...(calculatedScore === 100 ? [`Kuis: ${selectedModule?.title}`] : [])]).size >= modules.length;
      setHasCertificate(isComplete);
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
                  onClick={() => openManageForm(item.title as 'Modul' | 'Materi' | 'Quiz' | 'User')}
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
        {/* VIEW: USER TRACK SELECT */}
        {/* ========================================= */}
        {view === 'user_track_select' && (
          <div className="w-full max-w-4xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-white mb-3">Pilih Jalur Pembelajaran</h1>
              <p className="text-gray-400">Pilih salah satu jalur untuk memulai dan mendapatkan sertifikat.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TRACKS.map((track) => (
                <div
                  key={track.id}
                  onClick={() => handleSelectTrack(track)}
                  className="group p-8 rounded-[28px] bg-[#000814] border border-white/10 hover:border-cyan-400/40 hover:bg-white/5 transition-all cursor-pointer flex flex-col gap-5"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl bg-gradient-to-br ${track.color} shadow-lg`}>
                    {track.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors">{track.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">{track.desc}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{track.modules.length} Modul</span>
                    <span className={`px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r ${track.color}`}>
                      Mulai →
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
              <div className="flex gap-4">
                {hasCertificate && (
                  <button onClick={() => setView('user_certificate')} className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:scale-105 shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2">
                    <span>📜 Cetak Sertifikat</span>
                  </button>
                )}
                <button onClick={() => setView('user_dashboard')} className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                  ← Kembali
                </button>
              </div>
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
                  {completedQuizzes.includes(`Kuis: ${mod.title}`) ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 opacity-80 cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <span>✅ Selesai</span>
                    </button>
                  ) : (
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
                  )}
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
                ) : completedQuizzes.includes(`Kuis: ${selectedModule?.title}`) ? (
                  <div className="px-6 py-4 rounded-xl font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 shadow-inner flex items-center gap-3">
                    <span className="text-2xl">📝</span>
                    <div>
                      <p className="text-sm">Kuis Selesai</p>
                      <p className="text-xs text-blue-400/80 font-medium">Anda sudah mengerjakan kuis ini sebelumnya.</p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      if (selectedModule) loadUserQuiz(selectedModule.slug);
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
        {/* VIEW: ADMIN QUIZ MANAGER */}
        {/* ========================================= */}
        {view === 'admin_quiz' && (
          <div className="w-full max-w-4xl p-8 rounded-[32px] bg-[#000814] border border-purple-500/30 shadow-2xl relative z-10 animate-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
              <div>
                <div className="inline-block px-3 py-1 mb-3 rounded-full border border-purple-400/30 bg-purple-500/15 text-purple-300 text-[10px] font-black uppercase tracking-widest">Kelola Quiz</div>
                <h1 className="text-3xl font-black text-white">Upload Soal Quiz</h1>
              </div>
              <button onClick={() => setView('admin_manage')} className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all">← Kembali</button>
            </div>

            {/* Pilih Modul */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pilih Modul</label>
              <select
                value={quizModuleSlug}
                onChange={(e) => { setQuizModuleSlug(e.target.value); loadQuizQuestions(e.target.value); }}
                className="w-full px-5 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-purple-400 transition-all"
              >
                {modules.map(m => <option key={m.slug} value={m.slug}>{m.title}</option>)}
              </select>
            </div>

            {/* Form tambah soal */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-6 space-y-4">
              <h3 className="text-white font-bold text-lg mb-2">✏️ Tambah Soal Baru</h3>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Pertanyaan</label>
                <textarea value={quizQuestion} onChange={e => setQuizQuestion(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-400 resize-none h-20 transition-all"
                  placeholder="Tulis pertanyaan di sini..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { label: 'Opsi A', val: quizOptionA, set: setQuizOptionA },
                  { label: 'Opsi B', val: quizOptionB, set: setQuizOptionB },
                  { label: 'Opsi C', val: quizOptionC, set: setQuizOptionC },
                  { label: 'Opsi D', val: quizOptionD, set: setQuizOptionD },
                ].map(({ label, val, set }) => (
                  <div key={label}>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
                    <input type="text" value={val} onChange={e => set(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-400 transition-all"
                      placeholder={`Isi ${label}...`} />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Jawaban Benar</label>
                <div className="flex gap-3">
                  {(['A', 'B', 'C', 'D'] as const).map(opt => (
                    <button key={opt} onClick={() => setQuizCorrectAnswer(opt)}
                      className={`w-12 h-12 rounded-xl font-black text-lg transition-all border ${quizCorrectAnswer === opt ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleAddQuestion} disabled={quizAdminLoading || !quizQuestion || !quizOptionA || !quizOptionB || !quizOptionC || !quizOptionD}
                className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                {quizAdminLoading ? 'Menyimpan...' : '+ Tambah Soal'}
              </button>
            </div>

            {/* Daftar soal yang sudah ada */}
            <div>
              <h3 className="text-white font-bold mb-4">📋 Daftar Soal ({existingQuestions.length} soal)</h3>
              {existingQuestions.length === 0
                ? <p className="text-gray-500 text-sm text-center py-6">Belum ada soal untuk modul ini.</p>
                : <div className="space-y-3">
                  {existingQuestions.map((q, i) => (
                    <div key={q.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium mb-2">{i + 1}. {q.question}</p>
                        <div className="grid grid-cols-2 gap-1 text-xs text-gray-400">
                          {(['a', 'b', 'c', 'd'] as const).map(k => (
                            <span key={k} className={q.correct_answer === k.toUpperCase() ? 'text-emerald-400 font-bold' : ''}>
                              {k.toUpperCase()}. {q[`option_${k}` as keyof QuizQuestion]}
                              {q.correct_answer === k.toUpperCase() && ' ✓'}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => handleDeleteQuestion(q.id)}
                        className="shrink-0 px-3 py-2 rounded-lg text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-bold transition-all">
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW: QUIZ USER (dari API) */}
        {/* ========================================= */}
        {view === 'user_quiz' && (
          <div className="w-full max-w-3xl p-8 rounded-[32px] bg-[#000814] border border-cyan-500/30 shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)] relative z-10 animate-in slide-in-from-bottom-8 duration-500">
            <h1 className="text-3xl font-black text-white mb-2">Quiz: {selectedModule?.title}</h1>
            <p className="text-gray-400 mb-8">Pilih jawaban yang paling tepat berdasarkan materi yang telah dipelajari.</p>

            {quizUserLoading ? (
              <div className="py-16 flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-4" />
                <p className="text-cyan-400 text-sm">Memuat soal...</p>
              </div>
            ) : quizQuestions.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-4xl mb-4">📭</p>
                <p className="text-gray-400">Soal quiz belum tersedia untuk modul ini.</p>
                <p className="text-gray-500 text-sm mt-1">Hubungi admin untuk menambahkan soal.</p>
              </div>
            ) : (
              <div className="space-y-8 mb-10">
                {quizQuestions.map((q, i) => (
                  <div key={q.id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-lg font-medium text-white mb-4">{i + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(['A', 'B', 'C', 'D'] as const).map(key => {
                        const optKey = `option_${key.toLowerCase()}` as keyof QuizQuestion;
                        const optText = q[optKey] as string;
                        return (
                          <label key={key} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${quizAnswers[i] === key ? 'bg-cyan-500/20 border-cyan-400' : 'bg-black/40 border-white/5 hover:border-white/20'}`}>
                            <input type="radio" name={`q${i}`} className="hidden"
                              checked={quizAnswers[i] === key}
                              onChange={() => setQuizAnswers(prev => ({ ...prev, [i]: key }))} />
                            <span className={`text-sm ${quizAnswers[i] === key ? 'text-cyan-300 font-bold' : 'text-gray-300'}`}>{key}. {optText}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button onClick={() => setView('user_read_module')}
                className="px-6 py-4 rounded-xl font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                ← Kembali ke Materi
              </button>
              <button onClick={handleSubmitQuiz}
                disabled={quizQuestions.length === 0 || quizQuestions.some((_, i) => !quizAnswers[i])}
                className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:scale-105 transition-all shadow-xl shadow-emerald-500/25 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed">
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
                  <div
                    onClick={() => hasCertificate && setView('user_certificate')}
                    className={`p-6 rounded-2xl border transition-all ${hasCertificate ? 'bg-cyan-500/10 border-cyan-500/30 cursor-pointer hover:bg-cyan-500/20 hover:scale-[1.02]' : 'bg-black/50 border-white/5 opacity-50 cursor-not-allowed'}`}
                  >
                    <div className="text-4xl mb-3">{hasCertificate ? '📜' : '🔒'}</div>
                    <h3 className={`font-bold ${hasCertificate ? 'text-cyan-400' : 'text-gray-500'}`}>Sertifikat</h3>
                    {hasCertificate && <p className="text-xs text-cyan-400/70 mt-1">Klik untuk cetak</p>}
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-8">
                  {(() => {
                    const currentIndex = modules.findIndex(m => m.id === selectedModule?.id);
                    const nextModule = modules[currentIndex + 1];
                    return nextModule && score === 100 ? (
                      <button
                        onClick={() => {
                          setSelectedModule(nextModule);
                          setReadProgress(0);
                          setQuizAnswers({});
                          setView('user_read_module');
                        }}
                        className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:scale-[1.02] transition-all shadow-lg shadow-emerald-500/25"
                      >
                        Lanjut ke Modul Berikutnya: {nextModule.icon} {nextModule.title}
                      </button>
                    ) : null;
                  })()}
                  <button onClick={() => setView('user_modules')} className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition-all shadow-lg shadow-blue-500/25">
                    Kembali ke Pemilihan Modul
                  </button>
                  <Link href="/akademi" className="w-full py-4 rounded-xl font-bold text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all block">
                    Kembali ke Akademi
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW: USER CERTIFICATE */}
        {/* ========================================= */}
        {view === 'user_certificate' && (
          <div className="w-full max-w-5xl p-8 rounded-[32px] bg-[#000814] border border-cyan-500/30 shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)] relative z-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
              <div>
                <h1 className="text-3xl font-black text-white">Sertifikat Penghargaan</h1>
                <p className="text-gray-400">Selamat! Anda telah menyelesaikan seluruh modul <span className="text-cyan-400 font-semibold">{selectedTrack?.title}</span>.</p>
              </div>
              <button onClick={() => setView('user_modules')} className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                ← Kembali
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Input */}
              <div className="lg:col-span-1 space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">Detail Sertifikat</h3>
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nama di Sertifikat</label>
                    <input
                      type="text"
                      value={certificateName}
                      onChange={(e) => setCertificateName(e.target.value)}
                      className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                      placeholder="Masukkan nama lengkap..."
                    />
                  </div>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={!certificateName || isGeneratingPDF}
                    className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition-all shadow-xl shadow-blue-500/25 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isGeneratingPDF ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Memproses...</span>
                      </>
                    ) : (
                      <>
                        <span>📥</span>
                        <span>Download PDF</span>
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                    Pastikan nama yang dimasukkan sudah benar. Sertifikat dapat diunduh berkali-kali.
                  </p>
                </div>
              </div>

              {/* Preview Sertifikat */}
              <div className="lg:col-span-2 overflow-x-auto bg-black/50 rounded-2xl p-4 flex items-center justify-center border border-white/5">
                <div className="relative w-[800px] h-[565px] shrink-0 bg-white shadow-2xl overflow-hidden" id="certificate-preview">
                  {/* Background Certificate sesuai track */}
                  <img
                    src={selectedTrack?.id === 'konten-digital' ? '/images/sertifikat-konten-digital.jpeg' : '/images/sertifikat-konservasi-laut.jpeg'}
                    alt="Background Sertifikat"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />

                  {/* Text Overlay */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center pt-[215px]">
                    <h2 className="text-4xl font-serif text-[#0b1c3d] tracking-wide italic font-bold" style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>
                      {certificateName || 'Nama Peserta'}
                    </h2>

                    {/* Posisi tanggal: top dari atas sertifikat (565px tinggi), left dari kiri (800px lebar) */}
                    <div style={{ position: 'absolute', top: '440px', left: '375px', width: '310px', textAlign: 'center' }}>
                      <p className="text-base font-serif text-[#0b1c3d] font-bold" style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>
                        {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
