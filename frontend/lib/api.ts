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
  await delay(FAKE_DELAY_MS);
  return MOCK_MODULES;
}

/**
 * Mengambil satu modul berdasarkan id-nya.
 * Mengembalikan undefined jika modul tidak ditemukan.
 */
export async function getModuleById(id: string): Promise<ModuleData | undefined> {
  await delay(FAKE_DELAY_MS);
  return MOCK_MODULES.find((m) => m.id === id);
}
