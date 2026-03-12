import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { 
  SiC, SiCplusplus, SiPython, SiJavascript, SiTypescript, 
  SiDotnet, SiGo, SiRust, SiKotlin, SiSwift, SiPhp, SiRuby, 
  SiMysql, SiGit, SiDocker, SiKubernetes, SiNodedotjs, SiReact, 
  SiAngular, SiVuedotjs, SiSpringboot, SiDjango, SiFlask, 
  SiTensorflow, SiPytorch, SiGooglecloud 
} from 'react-icons/si';
import { FaAws, FaHtml5, FaCss3Alt, FaJava, FaMicrosoft } from 'react-icons/fa';

// --- 1. The Individual 3D Skill Tile ---
const SkillNode = ({ position, icon, name, color, selected, onSelect, onIconRightDragStart, onIconRightDragEnd }) => {
  const [hovered, setHovered] = useState(false);
  const nodeRef = useRef();

  const handlePointerEnter = () => {
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
  };

  const handlePointerDown = (event) => {
    if (event.button === 0) {
      event.stopPropagation();
      event.preventDefault();
      onSelect();
      return;
    }
    if (event.button === 2) {
      event.stopPropagation();
      event.preventDefault();
      onIconRightDragStart(event);
    }
  };

  const handlePointerUp = (event) => {
    if (event.button === 2) {
      event.stopPropagation();
      event.preventDefault();
      onIconRightDragEnd(event);
    }
  };

  useFrame(({ clock }) => {
    if (!nodeRef.current) return;
    const t = clock.getElapsedTime() + position[0] + position[1] + position[2];
    nodeRef.current.position.y = position[1] + Math.sin(t * 1.25) * 0.14;
    nodeRef.current.rotation.y = Math.sin(t * 0.6) * 0.12;
  });

  return (
    <group position={position} ref={nodeRef}>
      <Html center occlude zIndexRange={[100, 0]} style={{ transform: 'none', WebkitTransform: 'none', MsTransform: 'none' }}>
        <div 
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onContextMenu={(e) => e.preventDefault()}
          className={`relative flex items-center justify-center transition-all duration-300 cursor-pointer
            ${hovered ? 'scale-130' : 'scale-100'}
          `}
          style={{ transform: 'none' }}
        >
          <div className="text-3xl" style={{ color, filter: selected ? `drop-shadow(0 0 12px ${color})` : 'none', transform: 'none' }}>
            {icon}
          </div>

          {(selected || hovered) && (
            <div className="absolute top-full mt-2 px-2 py-0.5 bg-[#050505]/90 rounded-md border border-white/20 text-xs font-mono uppercase tracking-widest text-gray-100" style={{ transform: 'none' }}>
              <p style={{ direction: 'ltr', unicodeBidi: 'plaintext', margin: 0 }}>
                {name}
              </p>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

// --- 2. The Invisible Sphere Math & Physics ---
const IconSphere = ({ skills }) => {
  const groupRef = useRef();
  const isIconDragRef = useRef(false);
  const dragDeltaRef = useRef({x: 0, y: 0});
  const lastPointerRef = useRef({x: 0, y: 0});
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  // Track rotation manually so we can smoothly accelerate/decelerate
  const rotationRef = useRef({ y: 0, x: 0, z: 0 });
  const speedRef = useRef(1);
  
  // Radius increased to 4.5 to give 31 icons enough room to breathe
  const radius = 4.5;

  // Fibonacci Sphere Algorithm
  const sphericalPositions = useMemo(() => {
    const positions = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < skills.length; i++) {
      const y = 1 - (i / (skills.length - 1)) * 2; 
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      positions.push([x * radius, y * radius, z * radius]);
    }
    return positions;
  }, [skills.length]);

  // Handle auto-rotation and smooth pausing
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Stop sphere rotation when selected, or while dragging with right button
    const shouldStop = selectedIndex !== null || isIconDragRef.current;
    const targetSpeed = shouldStop ? 0 : 1;
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, 0.12);

    if (!shouldStop) {
      rotationRef.current.y += delta * 0.15;
      rotationRef.current.x += delta * 0.025;
    }

    // pointer influence only when right-drag is active, preventing jitter during simple hover
    const pointerInfluenceY = isIconDragRef.current ? state.pointer.x * 0.08 : 0;
    const pointerInfluenceX = isIconDragRef.current ? state.pointer.y * 0.06 : 0;

    // Damp drag offsets so sphere returns stable after release
    dragDeltaRef.current.y = THREE.MathUtils.damp(dragDeltaRef.current.y, 0, 0.08, delta);
    dragDeltaRef.current.x = THREE.MathUtils.damp(dragDeltaRef.current.x, 0, 0.08, delta);

    groupRef.current.rotation.y = rotationRef.current.y + dragDeltaRef.current.y + pointerInfluenceY;
    groupRef.current.rotation.x = THREE.MathUtils.clamp(rotationRef.current.x + dragDeltaRef.current.x + pointerInfluenceX, -0.22, 0.22);

    // Subtle parallax motion only while dragging, otherwise relax to center
    const targetX = isIconDragRef.current ? state.pointer.x * 0.18 : 0;
    const targetY = isIconDragRef.current ? state.pointer.y * 0.12 : 0;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.06);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.06);
  });

  const handleIconRightDragStart = (event) => {
    isIconDragRef.current = true;
    lastPointerRef.current = { x: event.clientX, y: event.clientY };
    event.stopPropagation();
    event.target?.setPointerCapture?.(event.pointerId);
  };

  const handleIconRightDragEnd = (event) => {
    isIconDragRef.current = false;
    if (event) {
      event.stopPropagation();
      event.target?.releasePointerCapture?.(event.pointerId);
    }
  };

  const handlePointerMove = (event) => {
    if (!isIconDragRef.current) return;
    const dx = (event.clientX - lastPointerRef.current.x) / window.innerWidth;
    const dy = (event.clientY - lastPointerRef.current.y) / window.innerHeight;
    lastPointerRef.current = { x: event.clientX, y: event.clientY };

    dragDeltaRef.current.y += dx * Math.PI * 1.2;
    dragDeltaRef.current.x += dy * Math.PI * 0.7;
  };

  const handlePointerUp = (event) => {
    if (!isIconDragRef.current) return;
    handleIconRightDragEnd(event);
  };

  const handleIconSelect = (index) => {
    setSelectedIndex((cur) => (cur === index ? null : index));
  };

  return (
    <group
      ref={groupRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.4, 3.8, 128]} />
        <meshBasicMaterial color="#39ff14" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>

      {skills.map((skill, i) => (
        <SkillNode 
          key={i} 
          position={sphericalPositions[i]} 
          icon={skill.icon} 
          name={skill.name} 
          color={skill.color}
          selected={selectedIndex === i}
          onSelect={() => handleIconSelect(i)}
          onIconRightDragStart={handleIconRightDragStart}
          onIconRightDragEnd={handleIconRightDragEnd}
        />
      ))}
    </group>
  );
};

const HoloCore = () => {
  const coreRef = useRef();
  useFrame(({ clock }) => {
    if (!coreRef.current) return;
    const t = clock.getElapsedTime();
    coreRef.current.rotation.y = t * 0.4;
    coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
  });

  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color="#39ff14" transparent opacity={0.42} emissive="#39ff14" emissiveIntensity={1.4} roughness={0.2} metalness={0.75} />
    </mesh>
  );
};

// --- 3. Main Component Wrapper ---
const SkillsSphere = () => {
  // All 31 technologies mapped with their precise official brand hex colors
  const mySkills = [
    { name: 'C', icon: <SiC />, color: '#A8B9CC' },
    { name: 'C++', icon: <SiCplusplus />, color: '#00599C' },
    { name: 'Java', icon: <FaJava />, color: '#007396' },
    { name: 'Python', icon: <SiPython />, color: '#3776AB' },
    { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    { name: 'C#', icon: <SiDotnet />, color: '#239120' },
    { name: 'Go', icon: <SiGo />, color: '#00ADD8' },
    { name: 'Rust', icon: <SiRust />, color: '#000000' }, // Rust is often black/white; adjust if needed
    { name: 'Kotlin', icon: <SiKotlin />, color: '#7F52FF' },
    { name: 'Swift', icon: <SiSwift />, color: '#F05138' },
    { name: 'PHP', icon: <SiPhp />, color: '#777BB4' },
    { name: 'Ruby', icon: <SiRuby />, color: '#CC342D' },
    { name: 'SQL', icon: <SiMysql />, color: '#4479A1' },
    { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
    { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
    { name: 'Git', icon: <SiGit />, color: '#F05032' },
    { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
    { name: 'Kubernetes', icon: <SiKubernetes />, color: '#326CE5' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
    { name: 'React', icon: <SiReact />, color: '#61DAFB' },
    { name: 'Angular', icon: <SiAngular />, color: '#DD0031' },
    { name: 'Vue.js', icon: <SiVuedotjs />, color: '#4FC08D' },
    { name: 'Spring Boot', icon: <SiSpringboot />, color: '#6DB33F' },
    { name: 'Django', icon: <SiDjango />, color: '#092E20' },
    { name: 'Flask', icon: <SiFlask />, color: '#ffffff' }, // Flask is usually black/white
    { name: 'TensorFlow', icon: <SiTensorflow />, color: '#FF6F00' },
    { name: 'PyTorch', icon: <SiPytorch />, color: '#EE4C2C' },
    { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
    { name: 'Azure', icon: <FaMicrosoft />, color: '#0089D6' },
    { name: 'GCP', icon: <SiGooglecloud />, color: '#4285F4' },
  ];

  return (
    <>
      <section id="skills" className="relative w-full h-screen bg-gradient-to-b from-[#050505] via-[#080813] to-[#050505] flex flex-col overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_25%_20%,rgba(57,255,20,0.12),transparent_35%),radial-gradient(circle_at_75%_80%,rgba(139,92,246,0.15),transparent_40%)]" />
        
        {/* Title block now pinned above the sphere */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 text-center pointer-events-none">
          <p className="text-gray-400 font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-2">Core Competencies</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">System Architecture</h2>
        </div>

      {/* The 3D Canvas */}
      <div className="absolute inset-0 z-0 pt-32">
        {/* Adjusted camera Z position so the medium sphere fits perfectly */}
        <Canvas camera={{ position: [0, 0, 11], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[4, 6, 8]} intensity={1.25} color="#8b5cf6" />
          <pointLight position={[-4, -5, 4]} intensity={1.0} color="#39ff14" />
          <Stars radius={100} depth={40} count={5000} factor={5} saturation={0.3} fade speed={0.2} />

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <IconSphere skills={mySkills} />
            <HoloCore />
          </Float>

          <EffectComposer>
            <Bloom luminanceThreshold={0.18} mipmapBlur intensity={1.6} />
            <Noise opacity={0.04} />
            <Vignette eskil={false} offset={0.15} darkness={1.35} />
          </EffectComposer>
        </Canvas>
      </div>
      
      {/* Subtle floor gradient */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10"></div>

    </section>

      {/* 3-classification summary below the sphere */}
      <section className="relative w-full bg-gradient-to-t from-[#04050a] via-[#080a18] to-[#0b101f] py-10">
        <div className="w-full max-w-6xl mx-auto px-4 text-white">
          <div className="mb-6 text-center">
            <p className="text-sm uppercase tracking-widest text-cyan-200 mb-1">Skill Categories</p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">What I Build & Manage</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            <div className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-500/10 to-cyan-900/20 p-5 shadow-[0_12px_40px_-20px_rgba(34,211,238,0.7)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_18px_60px_-24px_rgba(34,211,238,0.9)]">
              <div className="absolute -top-2 -right-2 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
              <h4 className="relative text-xl font-bold text-cyan-100 mb-3">Core Languages</h4>
              <ul className="relative space-y-2 text-sm text-cyan-100/85">
                <li>• C, C++, Java, Python</li>
                <li>• JavaScript, TypeScript</li>
                <li>• Go, Rust, Kotlin, Swift</li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-400/10 to-violet-900/20 p-5 shadow-[0_12px_40px_-20px_rgba(139,92,246,0.7)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_18px_60px_-24px_rgba(139,92,246,0.9)]">
              <div className="absolute -top-2 -left-2 h-24 w-24 rounded-full bg-purple-400/20 blur-2xl" />
              <h4 className="relative text-xl font-bold text-violet-100 mb-3">Web & Frameworks</h4>
              <ul className="relative space-y-2 text-sm text-violet-100/85">
                <li>• HTML5, CSS3</li>
                <li>• React, Angular, Vue.js</li>
                <li>• Node.js, Spring Boot, Django, Flask</li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-lime-300/20 bg-gradient-to-br from-lime-400/10 to-lime-900/20 p-5 shadow-[0_12px_40px_-20px_rgba(132,204,22,0.7)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_18px_60px_-24px_rgba(132,204,22,0.9)]">
              <div className="absolute -bottom-2 -right-4 h-24 w-24 rounded-full bg-lime-400/20 blur-2xl" />
              <h4 className="relative text-xl font-bold text-lime-100 mb-3">Cloud & DevOps</h4>
              <ul className="relative space-y-2 text-sm text-lime-100/85">
                <li>• AWS, Azure, GCP</li>
                <li>• Docker, Kubernetes</li>
                <li>• Git, SQL, AI/ML (TensorFlow, PyTorch)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SkillsSphere;