import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Sparkles, Grid } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import WolfModel from './WolfModel';

const Scene = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#020202']} />
        <fog attach="fog" args={['#020202', 3, 15]} />
        
        {/* Infinite Cyber-Grid Floor */}
        <Grid 
          position={[0, -2.5, 0]} 
          args={[10.5, 10.5]} 
          cellSize={0.5} 
          cellThickness={0.5} 
          cellColor="#003300" 
          sectionSize={2.5} 
          sectionThickness={1} 
          sectionColor="#39ff14" 
          fadeDistance={20} 
          fadeStrength={1.5} 
        />
        
        {/* Floating Digital Dust */}
        <Sparkles count={200} scale={12} size={1} speed={0.2} opacity={0.5} color="#39ff14" />
        
        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.2}>
            <WolfModel />
          </ScrollControls>
        </Suspense>

        {/* The Magic Sauce: Post-Processing Glow */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.1} 
            mipmapBlur 
            intensity={1.5} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Scene;