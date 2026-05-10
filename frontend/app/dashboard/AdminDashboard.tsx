'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getModules } from '../../lib/api';
import { BookOpen, FileText, Image, Clock, Trash2, Sparkles, Users } from '../../components/DiveIcons';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type ViewState = 'admin_dashboard' | 'admin_edit_data' | 'admin_quiz' | 'admin_gallery';

type ModuleData = {
  id: string;
  slug: string;
  title: string;
  desc: string;
  longDescription?: string;
  icon: string;
};

export default function AdminDashboard({ isDark }: { isDark: boolean }) {
  const [view, setView] = useState<ViewState>('admin_dashboard');
  const [manageCategory, setManageCategory] = useState('');
  const [modules, setModules] = useState<ModuleData[]>([]);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newIcon, setNewIcon] = useState('package');
  const [isAdminProcessing, setIsAdminProcessing] = useState(false);
  const [editingModuleSlug, setEditingModuleSlug] = useState<string | null>(null);

  // STATE ADMIN QUIZ
  const [quizModuleSlug, setQuizModuleSlug] = useState('');
  const [selectedQuizModule, setSelectedQuizModule] = useState<ModuleData | null>(null);
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOptions, setQuizOptions] = useState({ a: '', b: '', c: '', d: '' });
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState('A');
  const [existingQuestions, setExistingQuestions] = useState<any[]>([]);

  // STATE ADMIN GALLERY
  const [pendingGallery, setPendingGallery] = useState<any[]>([]);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [galleryLoading, setGalleryLoading] = useState(false);

  useEffect(() => {
    getModules().then(data => setModules(data));
  }, []);

  const loadPendingGallery = async () => {
    const token = localStorage.getItem('auth_token');
    setGalleryLoading(true);
    setGalleryError(null);
    try {
      const res = await fetch(`${API_URL}/api/admin/pending`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (!res.ok) {
        setGalleryError(`Error ${res.status}: ${res.statusText}`);
        setPendingGallery([]);
        return;
      }
      const data = await res.json();
      setPendingGallery(Array.isArray(data) ? data : []);
    } catch (e) {
      setGalleryError('Gagal terhubung ke server. Pastikan backend berjalan.');
      console.error(e);
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    const token = localStorage.getItem('auth_token');
    setPendingGallery(prev => prev.filter(item => item.id !== id));
    try {
      await fetch(`${API_URL}/api/admin/approve/${id}`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
    } catch (e) {
      console.error(e);
      loadPendingGallery();
    }
  };

  const handleReject = async (id: number) => {
    const token = localStorage.getItem('auth_token');
    setPendingGallery(prev => prev.filter(item => item.id !== id));
    try {
      await fetch(`${API_URL}/api/admin/reject/${id}`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
    } catch (e) {
      console.error(e);
      loadPendingGallery();
    }
  };

  const handleSaveAdminData = async () => {
    setIsAdminProcessing(true);
    const token = localStorage.getItem('auth_token');
    try {
      if (manageCategory === 'Modul') {
        if (editingModuleSlug) {
          // UPDATE
          await fetch(`${API_URL}/api/admin/modules/${editingModuleSlug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ title: newTitle, desc: newDesc }),
          });
        } else {
          // CREATE
          const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          await fetch(`${API_URL}/api/admin/modules`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ slug, title: newTitle, desc: newDesc }),
          });
        }
        // Refresh modules
        const updated = await getModules();
        setModules(updated);
      }
    } catch (e) { console.error(e); }

    setNewTitle('');
    setNewDesc('');
    setNewIcon('package');
    setEditingModuleSlug(null);
    setIsAdminProcessing(false);
  };

  const handleDeleteModule = async (slug: string) => {
    if (!confirm('Yakin ingin menghapus modul ini beserta semua datanya?')) return;
    const token = localStorage.getItem('auth_token');
    try {
      await fetch(`${API_URL}/api/admin/modules/${slug}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const updated = await getModules();
      setModules(updated);
    } catch (e) { console.error(e); }
  };

  const openManageForm = (category: string) => {
    setManageCategory(category);
    setNewTitle('');
    setNewDesc('');
    setNewIcon('package');
    setEditingModuleSlug(null);
    if (category === 'Quiz') {
      setSelectedQuizModule(null);
      setExistingQuestions([]);
      setView('admin_quiz');
    } else if (category === 'Galeri') {
      loadPendingGallery();
      setView('admin_gallery');
    } else {
      setView('admin_edit_data');
    }
  };

  const loadQuizQuestions = async (slug: string) => {
    try {
      const res = await fetch(`${API_URL}/api/quiz/questions/${slug}`);
      const responseData = await res.json();
      // Handle jika backend membungkus dengan objek { data: [...] }
      setExistingQuestions(Array.isArray(responseData) ? responseData : (responseData.data || []));
    } catch (e) { console.error(e); }
  };

  const handleSaveQuizQuestion = async () => {
    if (!quizModuleSlug || !quizQuestion || !quizOptions.a || !quizOptions.b || !quizOptions.c || !quizOptions.d) {
      alert('Mohon isi modul, soal, dan semua opsi jawaban!');
      return;
    }
    const token = localStorage.getItem('auth_token');
    setIsAdminProcessing(true);
    try {
      await fetch(`${API_URL}/api/quiz/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          module_slug: quizModuleSlug,
          question: quizQuestion,
          option_a: quizOptions.a,
          option_b: quizOptions.b,
          option_c: quizOptions.c,
          option_d: quizOptions.d,
          correct_answer: quizCorrectAnswer
        })
      });
      setQuizQuestion('');
      setQuizOptions({ a: '', b: '', c: '', d: '' });
      setQuizCorrectAnswer('A');
      loadQuizQuestions(quizModuleSlug);
    } catch (e) { console.error(e); }
    setIsAdminProcessing(false);
  };

  const handleDeleteQuizQuestion = async (id: number) => {
    if (!confirm('Yakin ingin menghapus soal ini?')) return;
    const token = localStorage.getItem('auth_token');
    try {
      await fetch(`${API_URL}/api/quiz/questions/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (quizModuleSlug) loadQuizQuestions(quizModuleSlug);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="w-full flex flex-col items-center justify-start pt-20 pb-0 relative min-h-screen">
      {/* Processing Overlay */}
      {isAdminProcessing && (
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative mb-8">
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />

            {/* Spinner */}
            <div className="w-24 h-24 border-[6px] border-white/5 border-t-cyan-400 rounded-full animate-spin shadow-[0_0_30px_rgba(34,211,238,0.3)]" />

            {/* Center Icon/Percent */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl animate-bounce">⚡</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h3 className="text-xl font-black text-white tracking-widest uppercase animate-pulse">Sedang Memproses</h3>
            <p className="text-gray-400 font-medium text-sm">Mohon tunggu sebentar, perubahan sedang dikirim ke server...</p>

            {/* Mini Progress Bar for feel */}
            <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-shimmer" style={{ width: '100%', backgroundSize: '200% 100%' }} />
            </div>
          </div>
        </div>
      )}

      {/* Background Enhancements */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/10'} blur-[140px] rounded-full pointer-events-none`} />
      {!isDark && (
        <>
          <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-200/30 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-100/40 blur-[120px] rounded-full pointer-events-none" />
        </>
      )}

      <div className="relative z-10 w-full max-w-5xl">
        {/* VIEW: ADMIN DASHBOARD */}
        {view === 'admin_dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-12">
              <h1 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-sm ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300' : 'text-blue-950'}`}>
                Pusat Kendali Admin
              </h1>
              <p className={`text-lg max-w-2xl mx-auto font-medium ${isDark ? 'text-gray-400' : 'text-blue-900/60'}`}>
                Kelola seluruh konten platform, moderasi karya pengguna, dan atur kuis dengan mudah.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {([
                { label: 'Modul', icon: <BookOpen size={20} />, desc: 'Atur materi pembelajaran', color: 'from-blue-600 to-cyan-500' },
                { label: 'Quiz', icon: <FileText size={20} />, desc: 'Kelola bank soal kuis', color: 'from-purple-600 to-pink-500' },
                { label: 'User', icon: <Users size={20} />, desc: 'Manajemen pengguna', color: 'from-emerald-500 to-teal-400' },
                { label: 'Galeri', icon: <Image size={20} />, desc: 'Moderasi karya digital', color: 'from-orange-500 to-yellow-400' }
              ] as { label: string; icon: React.ReactNode; desc: string; color: string }[]).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openManageForm(item.label)}
                  className={`border rounded-[40px] p-8 hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-2xl group relative overflow-hidden flex flex-col items-center text-center
                    ${isDark ? 'bg-[#000814] border-white/5 shadow-blue-900/10' : 'bg-white border-blue-50 shadow-blue-500/10'}
                  `}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl mb-6 shadow-xl bg-gradient-to-br ${item.color} text-white transform group-hover:rotate-12 transition-transform duration-500`}>
                    {item.icon}
                  </div>

                  <h3 className={`text-2xl font-black mb-2 tracking-tight ${isDark ? 'text-white' : 'text-blue-950'}`}>{item.label}</h3>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-500' : 'text-blue-900/50'}`}>{item.desc}</p>

                  <div className="mt-6 flex items-center gap-2 text-cyan-500 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    Kelola Sekarang <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: ADMIN EDIT DATA */}
        {view === 'admin_edit_data' && (
          <div className={`w-full max-w-2xl p-8 rounded-[40px] border relative z-10 animate-in slide-in-from-bottom-8 duration-500 max-h-[85vh] overflow-y-auto custom-scrollbar shadow-2xl
            ${isDark ? 'bg-[#000814] border-cyan-500/30 shadow-blue-950/20' : 'bg-white border-blue-100 shadow-blue-500/10'}
          `}>
            {isAdminProcessing ? (
              <div className="py-24 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-cyan-400 animate-pulse">Menyimpan data...</h2>
              </div>
            ) : (
              <>
                <div className={`flex items-center justify-between mb-8 border-b pb-6 sticky top-0 z-20 pt-2 ${isDark ? 'bg-[#000814] border-white/10' : 'bg-white border-gray-100'}`}>
                  <div>
                    <h1 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-blue-950'}`}>{editingModuleSlug ? 'Edit' : 'Tambah'} {manageCategory}</h1>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Masukkan informasi detail untuk {manageCategory.toLowerCase()}.</p>
                  </div>
                  <button onClick={() => {
                    if (editingModuleSlug) {
                      setEditingModuleSlug(null);
                      setNewTitle('');
                      setNewDesc('');
                    } else {
                      setView('admin_dashboard');
                    }
                  }} className="px-6 py-3 rounded-xl font-bold text-white bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/30 transition-all flex items-center gap-2 shadow-lg">
                    ← Kembali
                  </button>
                </div>
                <div className="space-y-6 mb-8">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Judul</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:border-cyan-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Deskripsi</label>
                    <textarea
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className={`w-full px-5 py-4 rounded-xl border outline-none transition-all h-28 ${isDark ? 'bg-black/50 border-white/10 text-white focus:border-cyan-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'}`}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <button onClick={() => {
                    setEditingModuleSlug(null);
                    setNewTitle('');
                    setNewDesc('');
                  }} className="px-6 py-4 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Batal</button>
                  <button onClick={handleSaveAdminData} className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20">
                    {editingModuleSlug ? 'Simpan Perubahan' : 'Simpan Modul Baru'}
                  </button>
                </div>

                {manageCategory === 'Modul' && (
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6">Daftar Modul Saat Ini <span className="text-sm font-normal text-gray-500 ml-2">({modules.length} modul)</span></h3>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                      {modules.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">Belum ada modul.</div>
                      ) : (
                        modules.map((mod) => (
                          <div key={mod.id} className={`p-5 rounded-2xl border flex items-center gap-4 transition-all ${isDark ? 'bg-white/5 border-white/10 hover:border-cyan-500/30' : 'bg-gray-50 border-gray-200 hover:border-blue-300 shadow-sm'}`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${isDark ? 'bg-cyan-500/20' : 'bg-blue-100'}`}>
                              {mod.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-bold text-lg leading-tight mb-1 ${isDark ? 'text-white' : 'text-blue-900'}`}>{mod.title}</h4>
                              <p className={`text-xs line-clamp-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{mod.longDescription || mod.desc}</p>
                            </div>
                            <div className="ml-auto flex items-center gap-2 flex-shrink-0">
                              <button onClick={() => {
                                setEditingModuleSlug(mod.slug);
                                setNewTitle(mod.title);
                                setNewDesc(mod.longDescription || mod.desc || '');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }} className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-bold text-white hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors">Edit</button>
                              <button onClick={() => handleDeleteModule(mod.slug)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white transition-colors border border-red-500/20">Hapus</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* VIEW: ADMIN QUIZ */}
        {view === 'admin_quiz' && (
          <div className="w-full max-w-4xl p-8 rounded-[32px] bg-[#000814] border border-pink-500/30 shadow-[0_0_50px_-12px_rgba(236,72,153,0.15)] relative z-10 animate-in slide-in-from-bottom-8 duration-500 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6 sticky top-0 bg-[#000814] z-20 pt-2">
              <div>
                {selectedQuizModule && (
                  <span className="inline-block px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-bold mb-2">Modul: {selectedQuizModule.title}</span>
                )}
                <h1 className="text-3xl font-black text-white mb-2">Manajemen Soal Quiz</h1>
                <p className="text-gray-400">{selectedQuizModule ? 'Tambah atau hapus soal untuk modul ini.' : 'Pilih modul pembelajaran untuk mengelola bank soal kuisnya.'}</p>
              </div>
              <button onClick={() => {
                if (selectedQuizModule) {
                  setSelectedQuizModule(null);
                  setQuizModuleSlug('');
                } else {
                  setView('admin_dashboard');
                }
              }} className="px-6 py-3 rounded-xl font-bold text-white bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/30 transition-all flex items-center gap-2 shadow-lg">
                ← Kembali
              </button>
            </div>

            {!selectedQuizModule ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((mod) => (
                  <div key={mod.id} onClick={() => {
                    setSelectedQuizModule(mod);
                    setQuizModuleSlug(mod.id);
                    loadQuizQuestions(mod.id);
                  }} className="bg-white/5 border border-white/10 p-6 rounded-2xl cursor-pointer hover:bg-white/10 hover:border-pink-500/50 transition-all hover:-translate-y-1">
                    <div className="text-4xl mb-4">{mod.icon}</div>
                    <h3 className="font-bold text-white text-lg mb-1">{mod.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{mod.longDescription || mod.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Form Tambah Soal */}
                <div className="space-y-4 mb-10 bg-white/5 p-6 rounded-2xl border border-white/10">
                  <textarea value={quizQuestion} onChange={(e) => setQuizQuestion(e.target.value)} placeholder="Tulis pertanyaan di sini..." className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white h-24 mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" value={quizOptions.a} onChange={(e) => setQuizOptions({ ...quizOptions, a: e.target.value })} placeholder="Opsi A" className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white" />
                    <input type="text" value={quizOptions.b} onChange={(e) => setQuizOptions({ ...quizOptions, b: e.target.value })} placeholder="Opsi B" className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white" />
                    <input type="text" value={quizOptions.c} onChange={(e) => setQuizOptions({ ...quizOptions, c: e.target.value })} placeholder="Opsi C" className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white" />
                    <input type="text" value={quizOptions.d} onChange={(e) => setQuizOptions({ ...quizOptions, d: e.target.value })} placeholder="Opsi D" className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white" />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                      <label className="text-sm font-bold text-gray-400">Jawaban Benar:</label>
                      <select value={quizCorrectAnswer} onChange={(e) => setQuizCorrectAnswer(e.target.value)} className="px-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-bold">
                        <option value="A">Opsi A</option>
                        <option value="B">Opsi B</option>
                        <option value="C">Opsi C</option>
                        <option value="D">Opsi D</option>
                      </select>
                    </div>
                    <button onClick={handleSaveQuizQuestion} disabled={isAdminProcessing} className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-600 to-purple-500 hover:scale-105 transition-transform flex items-center gap-2">
                      {isAdminProcessing ? <><Clock size={18} /> Menyimpan...</> : '+ Simpan Soal'}
                    </button>
                  </div>
                </div>

                {/* List Soal */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6">Daftar Soal Saat Ini <span className="text-sm font-normal text-gray-500 ml-2">({existingQuestions.length} soal)</span></h3>
                  <div className="space-y-4">
                    {existingQuestions.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">Belum ada soal untuk modul ini.</div>
                    ) : (
                      existingQuestions.map((q: any) => (
                        <div key={q.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 relative group">
                          <button onClick={() => handleDeleteQuizQuestion(q.id)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"><Trash2 size={16} /></button>
                          <p className="font-bold text-white mb-4 pr-10">{q.question}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className={`p-3 rounded-xl border ${q.correct_answer === 'A' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-black/30 border-white/5 text-gray-400'}`}>A. {q.option_a}</div>
                            <div className={`p-3 rounded-xl border ${q.correct_answer === 'B' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-black/30 border-white/5 text-gray-400'}`}>B. {q.option_b}</div>
                            <div className={`p-3 rounded-xl border ${q.correct_answer === 'C' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-black/30 border-white/5 text-gray-400'}`}>C. {q.option_c}</div>
                            <div className={`p-3 rounded-xl border ${q.correct_answer === 'D' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-black/30 border-white/5 text-gray-400'}`}>D. {q.option_d}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* VIEW: ADMIN GALLERY */}
        {view === 'admin_gallery' && (
          <div className="w-full max-w-5xl p-8 rounded-[32px] bg-[#000814] border border-orange-500/30 shadow-[0_0_50px_-12px_rgba(249,115,22,0.15)] relative z-10 animate-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
              <div>
                <h1 className="text-3xl font-black text-white mb-2">Moderasi Galeri</h1>
                <p className="text-gray-400">Persetujuan karya digital yang diunggah oleh pengguna.</p>
              </div>
              <button onClick={() => setView('admin_dashboard')} className="px-6 py-3 rounded-xl font-bold text-white bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/30 transition-all flex items-center gap-2 shadow-lg">
                ← Kembali
              </button>
            </div>
            {galleryError && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold">
                ⚠️ {galleryError}
              </div>
            )}
            {galleryLoading ? (
              <div className="py-20 text-center text-gray-400">Memuat data...</div>
            ) : pendingGallery.length === 0 ? (
              <div className="py-20 text-center">
                <div className="mb-4"><Sparkles size={20} /></div>
                <h3 className="text-xl font-bold text-white mb-2">Semua Bersih!</h3>
                <p className="text-gray-500">Tidak ada karya yang menunggu persetujuan saat ini.</p>
                <button onClick={loadPendingGallery} className="mt-6 px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm font-bold transition-all">
                  🔄 Muat Ulang
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingGallery.map((item) => (
                  <div key={item.id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col group">
                    <div className="h-40 bg-black/50 relative">
                      {item.file_path.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                        <video src={item.file_path.startsWith('http') ? item.file_path.replace('http://localhost/', `${API_URL}/`) : `${API_URL}${item.file_path}`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" controls />
                      ) : (
                        <img src={item.file_path.startsWith('http') ? item.file_path.replace('http://localhost/', `${API_URL}/`) : `${API_URL}${item.file_path}`} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">Oleh: {item.author || 'Anonim'}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {(item.category || '').split(',').map((cat: string) => (
                          <span key={cat} className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] rounded border border-blue-500/30 uppercase font-bold tracking-wider">{cat}</span>
                        ))}
                      </div>
                      <div className="mt-auto grid grid-cols-2 gap-3">
                        <button onClick={() => handleApprove(item.id)} className="py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-sm hover:bg-emerald-500 hover:text-white transition-colors border border-emerald-500/30">Setujui</button>
                        <button onClick={() => handleReject(item.id)} className="py-2.5 rounded-xl bg-red-500/20 text-red-400 font-bold text-sm hover:bg-red-500 hover:text-white transition-colors border border-red-500/30">Tolak</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* DETAILED ADMIN FOOTER */}
      <footer className={`w-full mt-50 border-t relative z-10 transition-colors duration-500 ${isDark ? 'bg-black/20 border-white/5' : 'bg-white/50 border-blue-100 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Column 1: Branding */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg">
                  <img src="/images/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
                </div>
                <span className={`text-xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-blue-950'}`}>DIVEXPLORE</span>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-blue-900/60'}`}>
                Platform eksplorasi biota laut 3D interaktif tercanggih untuk edukasi dan konservasi ekosistem laut Indonesia.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'Youtube', 'Github'].map(social => (
                  <a key={social} href="#" className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-cyan-400' : 'bg-blue-50 text-blue-900/40 hover:bg-blue-100 hover:text-blue-600'}`}>
                    <span className="text-xs font-bold uppercase">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Sitemap */}
            <div className="space-y-6">
              <h4 className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-blue-950'}`}>Navigasi</h4>
              <ul className="space-y-4">
                {['Beranda', 'Galeri Karya', 'Akademi Biota', 'Tutorial & Panduan', 'Pusat Bantuan'].map(item => (
                  <li key={item}>
                    <a href="#" className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-500 hover:text-cyan-400' : 'text-blue-900/50 hover:text-blue-600'}`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="space-y-6">
              <h4 className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-blue-950'}`}>Hubungi Kami</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500">📍</span>
                  <span className={`text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-blue-900/60'}`}>
                    Kampus UNY Karangmalang,<br />Caturtunggal, Depok, Sleman,<br />Yogyakarta 55281
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cyan-500">📧</span>
                  <a href="mailto:admin@divexplore.id" className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-500 hover:text-cyan-400' : 'text-blue-900/60 hover:text-blue-600'}`}>
                    admin@divexplore.id
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Policies */}
            <div className="space-y-6">
              <h4 className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-blue-950'}`}>Kebijakan</h4>
              <ul className="space-y-4">
                {['Kebijakan Privasi', 'Syarat & Ketentuan', 'Lisensi Konten', 'Keamanan Data'].map(item => (
                  <li key={item}>
                    <a href="#" className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-500 hover:text-cyan-400' : 'text-blue-900/50 hover:text-blue-600'}`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-blue-50 border-blue-100'}`}>
                <p className={`text-[10px] font-bold leading-tight ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                  Admin Dashboard v2.0 - Jalankan Platform dengan Integritas dan Keamanan.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className={`mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
            <p className={`text-xs font-bold tracking-widest uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              © 2026 TIM DIVEXPLORE-3D · TEKNOLOGI INFORMASI UNY
            </p>
            <div className="flex gap-6">
              <span className={`text-[10px] font-black tracking-[0.3em] uppercase ${isDark ? 'text-gray-800' : 'text-gray-300'}`}>
                Designed for Future Oceans
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
