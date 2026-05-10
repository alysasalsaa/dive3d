"use client";

import React, { Suspense, useRef, useState, Component, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Html } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

class ModelErrorBoundary extends Component<
  { children: ReactNode; url: string },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; url: string }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidUpdate(prevProps: { url: string }) {
    if (prevProps.url !== this.props.url) {
      this.setState({ hasError: false });
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="text-white font-bold bg-red-900/70 px-4 py-3 rounded-xl backdrop-blur-md whitespace-nowrap text-center">
            <div className="text-2xl mb-1">⚠️</div>
            Gagal memuat model 3D
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

function Loader() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Html center>
      <div className="text-white font-bold bg-black/50 px-6 py-4 rounded-xl backdrop-blur-md text-center" style={{width: '280px'}}>
        <div className="mb-2">Memuat Aset 3D... {Math.round(progress)}%</div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div 
            className="bg-cyan-400 h-3 rounded-full transition-all duration-500"
            style={{width: `${progress}%`}}
          ></div>
        </div>
      </div>
    </Html>
  );
}

function GLTFModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

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
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.object.position.set(0, 0, 1.2);
      controlsRef.current.update();
    }
  };

  return (
    <div
      className={`${className} relative bg-[#00040a]/50 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl`}
    >
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

      <Canvas shadows dpr={[1, 2]} camera={{ fov: 40, position: [0, 0, 1.2] }}>
        <Suspense fallback={<Loader />}>
          <ModelErrorBoundary url={url}>
            <Stage environment="city" intensity={0.5}>
              <GLTFModel url={url} />
            </Stage>
          </ModelErrorBoundary>
        </Suspense>
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
