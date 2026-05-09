"use client";

import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Float, OrbitControls, Html, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { KTX2Loader } from "three-stdlib";

class ErrorBoundary extends React.Component<{ fallback: React.ReactNode; children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any) {
    console.error("3D Model Error:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl text-red-400 whitespace-nowrap text-center backdrop-blur-md">
            <b>Error Memuat Lencana 3D</b>
            <p className="text-xs mt-1 max-w-[250px] whitespace-normal">{String(this.state.error)}</p>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

function Model({ url }: { url: string }) {
  const { gl } = useThree();
  const { scene } = useGLTF(url, true, true, (loader: any) => {
    // KTX2 texture loader setup
    if (!loader.ktx2Loader) {
        const ktx2Loader = new KTX2Loader();
        ktx2Loader.setTranscoderPath('https://unpkg.com/three@0.183.0/examples/jsm/libs/basis/');
        ktx2Loader.detectSupport(gl);
        loader.setKTX2Loader(ktx2Loader);
    }
  });
  const groupRef = useRef<THREE.Group>(null);

  // Clone scene agar tidak konflik antar instance
  const cloned = useMemo(() => (scene ? scene.clone() : null), [scene]);

  // Rotasi otomatis smooth
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.6;
    }
  });

  if (!cloned) return null;

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
      <group ref={groupRef}>
        <primitive object={cloned} />
      </group>
    </Float>
  );
}

function FallbackLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-4 bg-black/60 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl">
        <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-400 rounded-full animate-spin mb-3"></div>
        <p className="text-amber-400 font-bold whitespace-nowrap text-sm">
          Memuat 3D... {progress.toFixed(0)}%
        </p>
        <p className="text-xs text-gray-400 mt-1">Harap tunggu, ukuran file besar</p>
      </div>
    </Html>
  );
}

export default function BadgeViewer({
  url,
  className = "w-full h-[220px]",
}: {
  url: string;
  className?: string;
}) {
  return (
    <div className={className} style={{ background: "transparent" }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 38, position: [0, 0.5, 4] }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Pencahayaan dramatis */}
        <ambientLight intensity={0.4} />
        <spotLight
          position={[4, 8, 4]}
          angle={0.35}
          penumbra={1}
          intensity={2.5}
          castShadow
          color="#93c5fd"
        />
        <pointLight position={[-4, 4, -4]} intensity={1.2} color="#a78bfa" />
        <pointLight position={[2, -3, 3]}  intensity={0.8} color="#22d3ee" />

        {/* Environment untuk refleksi logam */}
        <Environment preset="city" />

        {/* Bayangan bawah */}
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.35}
          scale={5}
          blur={2.5}
          far={3.5}
          color="#38bdf8"
        />

        <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} />

        <ErrorBoundary fallback={<FallbackLoader />}>
          <Suspense fallback={<FallbackLoader />}>
            <Model url={url} />
          </Suspense>
        </ErrorBoundary>
      </Canvas>
    </div>
  );
}
