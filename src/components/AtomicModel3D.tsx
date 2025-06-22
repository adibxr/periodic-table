
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, MeshProps } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Element } from '../data/elements';

interface AtomicModel3DProps {
  element: Element;
}

const Nucleus: React.FC<{ element: Element; isHovered: boolean }> = ({ element, isHovered }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      if (isHovered) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const nucleusSize = Math.log(element.atomicNumber) * 0.15 + 0.3;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[nucleusSize, 32, 32]} />
      <meshStandardMaterial
        color={element.color}
        emissive={element.color}
        emissiveIntensity={isHovered ? 0.5 : 0.2}
        roughness={0.3}
        metalness={0.7}
      />
      {isHovered && (
        <Html position={[0, nucleusSize + 0.5, 0]} center>
          <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            Nucleus: {element.atomicNumber} protons
          </div>
        </Html>
      )}
    </mesh>
  );
};

const ElectronShell: React.FC<{ 
  radius: number; 
  electrons: number; 
  color: string;
  speed: number;
  shellIndex: number;
  isHovered: boolean;
}> = ({ radius, electrons, color, speed, shellIndex, isHovered }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
      if (isHovered) {
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      }
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
        <meshBasicMaterial 
          color={color} 
          opacity={isHovered ? 0.6 : 0.3} 
          transparent 
        />
      </mesh>
      
      {/* Electrons */}
      {electronPositions.map((pos, index) => (
        <mesh key={index} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color="#4ecdc4"
            emissive="#4ecdc4"
            emissiveIntensity={isHovered ? 0.8 : 0.5}
          />
        </mesh>
      ))}
      
      {/* Shell label */}
      {isHovered && (
        <Html position={[radius + 0.3, 0, 0]} center>
          <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            Shell {shellIndex + 1}: {electrons} electrons
          </div>
        </Html>
      )}
    </group>
  );
};

const AtomicModelScene: React.FC<{ element: Element }> = ({ element }) => {
  const [hoveredShell, setHoveredShell] = useState<number | null>(null);
  const [nucleusHovered, setNucleusHovered] = useState(false);
  const { electronShells } = element;
  
  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <spotLight position={[0, 10, 0]} intensity={0.3} angle={0.3} penumbra={1} />
      
      {/* Interactive Nucleus */}
      <group
        onPointerEnter={() => setNucleusHovered(true)}
        onPointerLeave={() => setNucleusHovered(false)}
      >
        <Nucleus element={element} isHovered={nucleusHovered} />
      </group>
      
      {/* Interactive Electron Shells */}
      {electronShells.map((electrons, shellIndex) => (
        <group
          key={shellIndex}
          onPointerEnter={() => setHoveredShell(shellIndex)}
          onPointerLeave={() => setHoveredShell(null)}
        >
          <ElectronShell
            radius={1 + shellIndex * 0.8}
            electrons={electrons}
            color={element.color}
            speed={0.5 - shellIndex * 0.1}
            shellIndex={shellIndex}
            isHovered={hoveredShell === shellIndex}
          />
        </group>
      ))}
      
      {/* Enhanced Element Symbol */}
      <Text
        position={[0, -3.5, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {element.symbol}
      </Text>
      
      <Text
        position={[0, -4.2, 0]}
        fontSize={0.4}
        color="#888"
        anchorX="center"
        anchorY="middle"
      >
        {element.name}
      </Text>
      
      {/* Enhanced Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
        autoRotate={true}
        autoRotateSpeed={0.5}
        dampingFactor={0.05}
        enableDamping={true}
      />
    </>
  );
};

export const AtomicModel3D: React.FC<AtomicModel3DProps> = ({ element }) => {
  console.log('Rendering enhanced 3D model for element:', element.name);
  
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <AtomicModelScene element={element} />
      </Canvas>
      
      {/* Interactive controls hint */}
      <div className="absolute bottom-2 left-2 text-xs text-gray-400 bg-black/50 px-2 py-1 rounded">
        Click & drag to rotate • Scroll to zoom • Hover for details
      </div>
    </div>
  );
};
