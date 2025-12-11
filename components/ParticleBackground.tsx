'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = () => {
  const count = 2000;
  const mesh = useRef<THREE.Points>(null!);

  // Fix: Use useState lazy initializer instead of useMemo to avoid "impure render" linter error
  const [particlesPosition] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z
    }
    return positions;
  });

  useFrame((state) => {
    const { clock, mouse } = state;
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.05;
      mesh.current.rotation.x = mouse.y * 0.1;
      mesh.current.rotation.z = mouse.x * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        {/* Fix: Added 'args' which is required by TypeScript for BufferAttribute constructor */}
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
          args={[particlesPosition, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#a855f7"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default function ParticleBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Particles />
      </Canvas>
    </div>
  );
}