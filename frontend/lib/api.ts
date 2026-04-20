// ============================================================
// lib/api.ts
// Lapisan API untuk mengambil data dari server (atau mock data).
// Semua fungsi mengembalikan Promise sehingga mudah diganti
// dengan fetch() ke backend nyata di masa mendatang.
// ============================================================

import { MOCK_MODULES, ModuleData } from './mockData';

// Simulasi delay jaringan (300ms) agar loading skeleton terlihat
const FAKE_DELAY_MS = 300;

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/**
 * Mengambil semua modul pembelajaran.
 * Ganti isi fungsi ini dengan fetch('/api/modules') saat backend siap.
 */
export async function getModules(): Promise<ModuleData[]> {
  const response = await fetch('http://127.0.0.1:8000/api/modules', { cache: 'no-store' });
  const data = await response.json();
  return data.map((mod: any) => ({
    id: mod.slug,
    title: mod.title,
    longDescription: mod.long_description,
    icon: mod.icon,
    difficulty: mod.difficulty,
    estimatedTime: mod.estimated_time,
    gradientFrom: mod.gradient_from,
    gradientTo: mod.gradient_to,
    modelUrl: mod.model_url,
    pois: []
  }));
}

/**
 * Mengambil satu modul berdasarkan id-nya.
 * Mengembalikan undefined jika modul tidak ditemukan.
 */
export async function getModuleById(id: string): Promise<ModuleData | undefined> {
  const modules = await getModules();
  return modules.find((m) => m.id === id);
}

/**
 * Mengambil progress user dari Supabase.
 */
export async function getUserProgress(moduleId: string) {
  // 1. Ambil token dari brankas Chrome
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  const response = await fetch(`http://127.0.0.1:8000/api/progress/${moduleId}`, {
    headers: {
      'Authorization': `Bearer ${token}` // 2. Serahkan KTP ke Satpam Sanctum
    },
    cache: 'no-store'
  });
  return response.json();
}

export async function saveUserProgress(moduleId: string, visitedPois: string[], completed: boolean) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  const response = await fetch(`http://127.0.0.1:8000/api/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}` // Serahkan KTP ke Satpam Sanctum
    },
    body: JSON.stringify({
      moduleId,
      visitedPois,
      completed
    }),
  });
  return response.json();
}

