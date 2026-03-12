import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sphere, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShapes = () => {
  const groupRef = useRef();

  useFrame((state) => {
    // Make the entire group of shapes react slightly to mouse movement (Parallax)
    const targetX = (state.pointer.x * 2);
    const targetY = (state.pointer.y * 2);
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX * 0.2, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY * 0.2, 0.05);
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transmission: 0.9,
    opacity: 1,
    metalness: 0,
    roughness: 0.1,
    ior: 1.5,
    thickness: 0.5,
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Icosahedron args={[1, 0]} position={[-3, 1, -2]}>
          <meshBasicMaterial color="#39ff14" wireframe />
        </Icosahedron>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Torus args={[0.8, 0.2, 16, 32]} position={[3, -1, -1]}>
          <primitive object={glassMaterial} attach="material" />
        </Torus>
      </Float>

      <Float speed={3} rotationIntensity={0.5} floatIntensity={2}>
        <Sphere args={[0.5, 32, 32]} position={[0, 2, -3]}>
           <primitive object={glassMaterial} attach="material" />
        </Sphere>
      </Float>
    </group>
  );
};

export default function Background3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#39ff14" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <FloatingShapes />
        <Environment preset="city" />
      </Canvas>
      {/* Overlay gradient to blend 3D into the dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]"></div>
    </div>
  );
}