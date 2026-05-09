'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getModules } from '../../lib/api';

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

export default function AdminDashboard() {
  const [view, setView] = useState<ViewState>('admin_dashboard');
  const [manageCategory, setManageCategory] = useState('');
  const [modules, setModules] = useState<ModuleData[]>([]);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newIcon, setNewIcon] = useState('📦');
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
    setNewIcon('📦');
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
    setNewIcon('📦');
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
    <div className="w-full flex items-center justify-center relative min-h-[80vh]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl">
        {/* VIEW: ADMIN DASHBOARD */}
        {view === 'admin_dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 tracking-tight drop-shadow-sm">Pusat Kendali Admin</h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">Kelola seluruh konten platform, moderasi karya pengguna, dan atur kuis dengan mudah.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Modul', icon: '📚', desc: 'Atur materi pembelajaran', color: 'from-blue-600 to-cyan-500' },
                { label: 'Quiz', icon: '📝', desc: 'Kelola bank soal kuis', color: 'from-purple-600 to-pink-500' },
                { label: 'User', icon: '👥', desc: 'Manajemen pengguna', color: 'from-emerald-500 to-teal-400' },
                { label: 'Galeri', icon: '🖼️', desc: 'Moderasi karya digital', color: 'from-orange-500 to-yellow-400' }
              ].map((item, idx) => (
                <div key={idx} onClick={() => openManageForm(item.label)} className="bg-[#000814] border border-white/5 rounded-[32px] p-6 hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-lg group relative overflow-hidden">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${item.color} transition-opacity duration-300`} />
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mb-6 shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: ADMIN EDIT DATA */}
        {view === 'admin_edit_data' && (
          <div className="w-full max-w-2xl p-8 rounded-[32px] bg-[#000814] border border-cyan-500/30 shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)] relative z-10 animate-in slide-in-from-bottom-8 duration-500 max-h-[85vh] overflow-y-auto custom-scrollbar">
            {isAdminProcessing ? (
              <div className="py-24 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-cyan-400 animate-pulse">Menyimpan data...</h2>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6 sticky top-0 bg-[#000814] z-20 pt-2">
                  <div>
                    <h1 className="text-3xl font-black text-white mb-2">{editingModuleSlug ? 'Edit' : 'Tambah'} {manageCategory}</h1>
                    <p className="text-gray-400">Masukkan informasi detail untuk {manageCategory.toLowerCase()}.</p>
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
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Judul</label>
                    <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Deskripsi</label>
                    <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white h-28" />
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
                          <div key={mod.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 hover:border-cyan-500/30 transition-colors">
                             <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                               {mod.icon}
                             </div>
                             <div className="flex-1">
                               <h4 className="font-bold text-white text-lg leading-tight mb-1">{mod.title}</h4>
                               <p className="text-xs text-gray-400 line-clamp-1">{mod.longDescription || mod.desc}</p>
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
                      {isAdminProcessing ? '⏳ Menyimpan...' : '+ Simpan Soal'}
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
                          <button onClick={() => handleDeleteQuizQuestion(q.id)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white">🗑️</button>
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
                <div className="text-6xl mb-4">✨</div>
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
    </div>
  );
}
