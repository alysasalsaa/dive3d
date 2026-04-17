// ============================================================
// lib/mockData.ts
// Data statis (mock) untuk modul pembelajaran dan progress user.
// File ini berfungsi sebagai pengganti database sampai backend siap.
// ============================================================

// --- Tipe Data ---

export interface PoiData {
  id: string;
  label: string;
  description: string;
  position: [number, number, number]; // koordinat 3D [x, y, z]
}

export interface ModuleData {
  id: string;
  title: string;
  longDescription: string;
  icon: string;
  difficulty: string;
  estimatedTime: string;
  gradientFrom: string;
  gradientTo: string;
  modelUrl: string;
  pois: PoiData[];
}

export interface UserProgress {
  moduleId: string;
  visitedPois: string[];
  completed: boolean;
}

// --- Data Modul (Mock) ---

export const MOCK_MODULES: ModuleData[] = [
  {
    id: 'terumbu-karang',
    title: 'Ekosistem Terumbu Karang',
    longDescription:
      'Pelajari struktur dan pentingnya ekosistem terumbu karang sebagai rumah bagi ribuan spesies laut di Raja Ampat.',
    icon: '🪸',
    difficulty: 'Pemula',
    estimatedTime: '15 menit',
    gradientFrom: '#06b6d4',
    gradientTo: '#3b82f6',
    modelUrl: '/models/usnm_74016-100k-2048-gltf_std/usnm_74016-100k-2048.gltf',
    pois: [
      {
        id: 'poi-1',
        label: 'Polip Karang',
        description: 'Unit dasar pembentuk terumbu karang.',
        position: [0.5, 0.2, 0],
      },
      {
        id: 'poi-2',
        label: 'Zooxanthellae',
        description: 'Alga simbiotik yang memberi warna dan nutrisi karang.',
        position: [-0.3, 0.5, 0.2],
      },
      {
        id: 'poi-3',
        label: 'Skeleton Kalsium',
        description: 'Rangka keras yang menjadi fondasi terumbu.',
        position: [0, -0.3, 0.4],
      },
    ],
  },
  {
    id: 'keanekaragaman-laut',
    title: 'Keanekaragaman Hayati Laut',
    longDescription:
      'Eksplorasi ragam spesies ikan, moluska, dan invertebrata yang menghuni perairan Raja Ampat yang kaya.',
    icon: '🐠',
    difficulty: 'Menengah',
    estimatedTime: '20 menit',
    gradientFrom: '#10b981',
    gradientTo: '#06b6d4',
    modelUrl: '/models/usnm_74016-100k-2048-gltf_std/usnm_74016-100k-2048.gltf',
    pois: [
      {
        id: 'poi-1',
        label: 'Zona Epipelagik',
        description: 'Lapisan permukaan laut tempat fotosintesis terjadi.',
        position: [0.4, 0.6, 0],
      },
      {
        id: 'poi-2',
        label: 'Rantai Makanan',
        description: 'Hubungan predator dan mangsa di ekosistem laut.',
        position: [-0.5, 0.1, 0.3],
      },
    ],
  },
  {
    id: 'ancaman-lingkungan',
    title: 'Ancaman Lingkungan Laut',
    longDescription:
      'Pahami dampak perubahan iklim, pemutihan karang, dan polusi terhadap ekosistem laut yang rapuh.',
    icon: '⚠️',
    difficulty: 'Lanjutan',
    estimatedTime: '18 menit',
    gradientFrom: '#f59e0b',
    gradientTo: '#ef4444',
    modelUrl: '/models/usnm_74016-100k-2048-gltf_std/usnm_74016-100k-2048.gltf',
    pois: [
      {
        id: 'poi-1',
        label: 'Pemutihan Karang',
        description: 'Proses karang kehilangan alga simbiotiknya akibat stres panas.',
        position: [0.2, 0.4, 0.1],
      },
      {
        id: 'poi-2',
        label: 'Pengasaman Laut',
        description: 'Peningkatan CO₂ membuat air laut lebih asam, melarutkan kalsium karang.',
        position: [-0.4, -0.2, 0.3],
      },
      {
        id: 'poi-3',
        label: 'Polusi Plastik',
        description: 'Sampah plastik menjerat dan melukai kehidupan laut.',
        position: [0.6, 0.1, -0.2],
      },
    ],
  },
  {
    id: 'konservasi-aksi',
    title: 'Aksi Konservasi Nyata',
    longDescription:
      'Temukan cara nyata untuk berkontribusi pada pelestarian laut: dari penyelaman ramah lingkungan hingga program adopsi terumbu karang.',
    icon: '💚',
    difficulty: 'Pemula',
    estimatedTime: '15 menit',
    gradientFrom: '#8b5cf6',
    gradientTo: '#ec4899',
    modelUrl: '/models/usnm_74016-100k-2048-gltf_std/usnm_74016-100k-2048.gltf',
    pois: [
      {
        id: 'poi-1',
        label: 'Reef Check',
        description: 'Program monitoring kondisi terumbu karang global.',
        position: [0.3, 0.5, 0],
      },
      {
        id: 'poi-2',
        label: 'Transplantasi Karang',
        description: 'Teknik memindahkan fragmen karang sehat ke area yang rusak.',
        position: [-0.2, 0.3, 0.4],
      },
    ],
  },
];

// --- Data Progress User (Mock) ---

const MOCK_PROGRESS: Record<string, UserProgress> = {
  'terumbu-karang': {
    moduleId: 'terumbu-karang',
    visitedPois: ['poi-1', 'poi-2'],
    completed: false,
  },
  'keanekaragaman-laut': {
    moduleId: 'keanekaragaman-laut',
    visitedPois: ['poi-1', 'poi-2'],
    completed: true,
  },
  'ancaman-lingkungan': {
    moduleId: 'ancaman-lingkungan',
    visitedPois: [],
    completed: false,
  },
  'konservasi-aksi': {
    moduleId: 'konservasi-aksi',
    visitedPois: [],
    completed: false,
  },
};

// --- Fungsi Helper ---

/**
 * Mengambil data progress untuk satu modul tertentu.
 * Jika moduleId tidak ditemukan, kembalikan progress kosong.
 */
export function getMockProgress(moduleId: string): UserProgress {
  return (
    MOCK_PROGRESS[moduleId] ?? {
      moduleId,
      visitedPois: [],
      completed: false,
    }
  );
}
