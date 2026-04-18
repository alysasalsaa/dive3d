"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Html } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// Komponen penampil Loading
function Loader() {
  return (
    <Html center>
      <div className="text-white font-bold bg-black/50 px-4 py-2 rounded-xl backdrop-blur-md whitespace-nowrap">
        Memuat Aset 3D... ⏳
      </div>
    </Html>
  );
}

// Komponen Pembaca File GLTF
function GLTFModel({ url }: { url: string }) {
  // useGLTF otomatis membaca file .gltf dan texture-texture (.jpg, .bin) pendampingnya
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// Komponen Utama (Yang dipanggil ke Halaman)
export default function ModelViewer({
  url,
  className = "w-full h-[400px]",
}: {
  url: string;
  className?: string;
}) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [showGuide, setShowGuide] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div
      className={`${className} relative bg-[#00040a]/50 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl`}
    >
      {/* Tombol kontrol */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="px-4 py-2 text-sm font-semibold bg-black/60 text-white rounded-xl border border-white/10 backdrop-blur-md hover:bg-black/80 transition"
        >
          {showGuide ? "Sembunyikan Panduan" : "Lihat Panduan"}
        </button>

        <button
          onClick={handleResetView}
          className="px-4 py-2 text-sm font-semibold bg-black/60 text-white rounded-xl border border-white/10 backdrop-blur-md hover:bg-black/80 transition"
        >
          Reset View
        </button>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="px-4 py-2 text-sm font-semibold bg-black/60 text-white rounded-xl border border-white/10 backdrop-blur-md hover:bg-black/80 transition"
        >
          {autoRotate ? "Matikan Auto-Rotate" : "Aktifkan Auto-Rotate"}
        </button>
      </div>

      {/* Panduan Navigasi */}
      {showGuide && (
        <div className="absolute bottom-4 left-4 z-20 max-w-xs bg-black/60 text-white p-4 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg">
          <h3 className="font-bold mb-2">Panduan Navigasi</h3>
          <ul className="text-sm space-y-1 leading-relaxed">
            <li>• Drag mouse untuk memutar model</li>
            <li>• Scroll untuk zoom in / zoom out</li>
            <li>• Sentuh & geser untuk navigasi di layar sentuh</li>
            <li>• Gunakan tombol Reset View untuk kembali ke tampilan awal</li>
            <li>• Gunakan tombol Auto-Rotate untuk mengaktifkan / mematikan rotasi otomatis</li>
          </ul>
        </div>
      )}

      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50, position: [0, 0, 5] }}>
        <Suspense fallback={<Loader />}>
          <Stage environment="city" intensity={0.5}>
            <GLTFModel url={url} />
          </Stage>
        </Suspense>

        {/* Kontrol agar user bisa memutar dan melakukan zoom model */}
        <OrbitControls
          ref={controlsRef}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  );
}