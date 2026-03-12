import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WolfModel = () => {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/wolfman.glb'); 
  const { actions, names } = useAnimations(animations, group);
  const scroll = useScroll();

  useEffect(() => {
    // Turn the model into a Cyberpunk Hologram!
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: new THREE.Color('#39ff14'), // Neon Green
          wireframe: true,                   // Blueprint effect
          transparent: true,
          opacity: 0.15,                     // Subtle ghost-like transparency
        });
      }
    });

    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].play();
    }
  }, [scene, actions, names]);

  useFrame((state) => {
    if (!group.current) return;
    const offset = scroll.offset;
    
    // Smooth camera pull-back
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5 + offset * 8, 0.1);
    
    // Slow, floating rotation
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    // Add a slight floating up and down effect
    group.current.position.y = -2.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.2} position={[0, -2.5, 0]} />
    </group>
  );
};

useGLTF.preload('/models/wolfman.glb');

export default WolfModel;