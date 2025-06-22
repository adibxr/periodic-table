
import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Element } from '../data/elements';

interface AtomicModel3DProps {
  element: Element;
}

const Nucleus: React.FC<{ element: Element; isHovered: boolean }> = ({ element, isHovered }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      if (isHovered) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const nucleusSize = Math.min(Math.log(element.atomicNumber) * 0.1 + 0.2, 0.5);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[nucleusSize, 16, 16]} />
      <meshStandardMaterial
        color={element.color}
        emissive={element.color}
        emissiveIntensity={isHovered ? 0.3 : 0.1}
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  );
};

const ElectronShell: React.FC<{ 
  radius: number; 
  electrons: number; 
  color: string;
  speed: number;
}> = ({ radius, electrons, color, speed }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  const electronPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < electrons; i++) {
      const angle = (i / electrons) * Math.PI * 2;
      positions.push({
        x: Math.cos(angle) * radius,
        y: (Math.random() - 0.5) * 0.3,
        z: Math.sin(angle) * radius,
      });
    }
    return positions;
  }, [electrons, radius]);

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 6, 32]} />
        <meshBasicMaterial color={color} opacity={0.4} transparent />
      </mesh>
      
      {electronPositions.map((pos, index) => (
        <mesh key={index} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#4ecdc4"
            emissive="#4ecdc4"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

const AtomicModelScene: React.FC<{ element: Element }> = ({ element }) => {
  const [nucleusHovered, setNucleusHovered] = useState(false);
  const { electronShells } = element;
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} />
      
      <group
        onPointerEnter={() => setNucleusHovered(true)}
        onPointerLeave={() => setNucleusHovered(false)}
      >
        <Nucleus element={element} isHovered={nucleusHovered} />
      </group>
      
      {electronShells.map((electrons, shellIndex) => (
        <ElectronShell
          key={shellIndex}
          radius={0.8 + shellIndex * 0.5}
          electrons={electrons}
          color={element.color}
          speed={0.3 - shellIndex * 0.05}
        />
      ))}
      
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {element.symbol}
      </Text>
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={1.5}
        maxDistance={6}
        autoRotate={true}
        autoRotateSpeed={1}
        dampingFactor={0.1}
        enableDamping={true}
      />
    </>
  );
};

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-white text-sm">Loading 3D Model...</div>
  </div>
);

export const AtomicModel3D: React.FC<AtomicModel3DProps> = ({ element }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl overflow-hidden relative">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 3], fov: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          performance={{ min: 0.5 }}
        >
          <AtomicModelScene element={element} />
        </Canvas>
      </Suspense>
      
      <div className="absolute bottom-2 left-2 text-xs text-gray-400 bg-black/50 px-2 py-1 rounded">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};
