
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, MeshProps } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Element } from '../data/elements';

interface AtomicModel3DProps {
  element: Element;
}

const Nucleus: React.FC<{ element: Element }> = ({ element }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const nucleusSize = Math.log(element.atomicNumber) * 0.15 + 0.3;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[nucleusSize, 32, 32]} />
      <meshStandardMaterial
        color={element.color}
        emissive={element.color}
        emissiveIntensity={0.2}
        roughness={0.3}
        metalness={0.7}
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
        y: (Math.random() - 0.5) * 0.5,
        z: Math.sin(angle) * radius,
      });
    }
    return positions;
  }, [electrons, radius]);

  return (
    <group ref={groupRef}>
      {/* Orbital ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.01, 8, 64]} />
        <meshBasicMaterial color={color} opacity={0.3} transparent />
      </mesh>
      
      {/* Electrons */}
      {electronPositions.map((pos, index) => (
        <mesh key={index} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color="#4ecdc4"
            emissive="#4ecdc4"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

const AtomicModelScene: React.FC<{ element: Element }> = ({ element }) => {
  const { electronShells } = element;
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Nucleus */}
      <Nucleus element={element} />
      
      {/* Electron Shells */}
      {electronShells.map((electrons, shellIndex) => (
        <ElectronShell
          key={shellIndex}
          radius={1 + shellIndex * 0.8}
          electrons={electrons}
          color={element.color}
          speed={0.5 - shellIndex * 0.1}
        />
      ))}
      
      {/* Element Symbol */}
      <Text
        position={[0, -3, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {element.symbol}
      </Text>
      
      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={8}
        autoRotate={false}
      />
    </>
  );
};

export const AtomicModel3D: React.FC<AtomicModel3DProps> = ({ element }) => {
  console.log('Rendering 3D model for element:', element.name);
  
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <AtomicModelScene element={element} />
      </Canvas>
    </div>
  );
};
