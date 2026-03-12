import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import SkillsSphere from './components/SkillsSphere';
import Projects from './components/Projects';
import GithubGraph from './components/GithubGraph';
import Marquee from './components/Marquee'; 
import Contact from './components/Contact'; 
import TerminalFooter from './components/TerminalFooter'; 

// --- Custom Cursor Component ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#39ff14] pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
      animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </motion.div>
  );
};

// --- Cinematic Video Loader Component ---
// --- Cinematic Video Loader Component ---
const Loader = ({ onComplete }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      
      {/* FULL SCREEN VIDEO BACKGROUND 
          👇 CHANGED: Now takes up absolute full screen with object-cover! 
      */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          src="/wolf-video.mp4" 
          autoPlay 
          muted 
          playsInline
          loop 
          className="w-full h-full object-cover opacity-90"
        />
        {/* Dark overlay so the loading text at the bottom remains readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[#39ff14]/10 blur-[120px] animate-pulse pointer-events-none z-10"></div>

      {/* Loading progress text and scanning bar 
          👇 CHANGED: Elevated z-index so it sits cleanly on top of the massive video 
      */}
      <div className="absolute bottom-16 md:bottom-24 flex flex-col items-center gap-3 z-20">
        <span className="text-[#39ff14] font-mono text-sm tracking-[0.5em] uppercase drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] text-center">
          WELCOME
        </span>
        <div className="w-64 md:w-96 h-[2px] bg-white/20 relative overflow-hidden rounded-full backdrop-blur-md">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 3.5, ease: "easeInOut" }} 
            onAnimationComplete={onComplete} 
            className="absolute top-0 left-0 h-full w-full bg-[#39ff14] shadow-[0_0_15px_#39ff14]"
          />
        </div>
      </div>

    </motion.div>
  );
};

// --- Main App Wrapper ---
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden cursor-none">
        <CustomCursor />
        
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <main className="relative z-10">
            <Hero />
            <SkillsSphere /> 
            <Projects /> 
            <Marquee /> 
            <GithubGraph />
            <Contact /> 
            <TerminalFooter /> 
          </main>
        )}
      </div>
    </ReactLenis>
  );
}

export default App;