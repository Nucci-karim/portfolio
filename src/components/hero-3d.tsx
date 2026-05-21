"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function DistortedMesh() {
  const meshRef = useRef<Mesh>(null);
  const { resolvedTheme } = useTheme();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  const color = resolvedTheme === "dark" ? "#818cf8" : "#6366f1";

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 4]} />
        <MeshDistortMaterial
          color={color}
          distort={0.42}
          speed={1.6}
          roughness={0.2}
          metalness={0.65}
          wireframe={false}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 mask-fade-bottom" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <directionalLight position={[-3, -2, -1]} intensity={0.4} color="#a78bfa" />
        <Suspense fallback={null}>
          <DistortedMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
