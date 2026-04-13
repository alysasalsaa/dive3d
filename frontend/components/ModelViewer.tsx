"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Html } from "@react-three/drei";

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
  // useGLTF otomatis membaca file .gltf dan texture-texture (.jpg, .bin) pendampingnya!
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
  return (
    <div className={`${className} bg-[#00040a]/50 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl`}>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        <Suspense fallback={<Loader />}>
          <Stage environment="city" intensity={0.5}>
            <GLTFModel url={url} />
          </Stage>
        </Suspense>
        {/* Kontrol agar user bisa memutar dan melakukan zoom model */}
        <OrbitControls autoRotate autoRotateSpeed={1.5} enablePan={false} />
      </Canvas>
    </div>
  );
}
