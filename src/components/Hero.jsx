import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import Background3D from './Background3D';

const Hero = () => {
  // Animation variants for staggering children elements
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center pt-20 px-6 md:px-12 lg:px-24">
      <Background3D />
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl z-10"
      >
        <motion.div variants={item} className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse"></span>
          <p className="text-gray-300 text-xs font-mono tracking-[0.2em] uppercase">
            Available for new opportunities
          </p>
        </motion.div>

        <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1] tracking-tighter">
          Hi, I'm Sainath. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600">
            Creative Developer & Engineer.
          </span>
        </motion.h1>

        {/* Replace your old paragraph with this new block */}
{/* --- START OF REPLACEMENT BLOCK --- */}
<div className="mt-8 flex flex-col items-start gap-4 mb-24 lg:mb-32">
  
  {/* 1. The Linux 'whoami' Command (No box, left-aligned, typing animation) */}
  <motion.div 
    initial={{ width: 0, opacity: 0 }}
    animate={{ width: "100%", opacity: 1 }}
    transition={{ duration: 1.8, ease: "linear", delay: 5 }}
    className="flex items-center gap-3 font-mono overflow-hidden whitespace-nowrap"
  >
    <span className="text-[#39ff14] font-bold">sainath@root:~$</span>
    <span className="text-gray-300">whoami</span>
    <span className="text-[#39ff14]/50 mx-1">➜</span>
    <span className="text-white font-black tracking-widest text-sm md:text-base drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
      Curious Learner
    </span>
  </motion.div>

  {/* 2. The Tech Stack Array (Typing animation starts after line 1 finishes) */}
  <motion.div 
    initial={{ width: 0, opacity: 0 }}
    animate={{ width: "100%", opacity: 1 }}
    transition={{ duration: 2.0, ease: "linear", delay: 4 }}
    className="font-mono text-sm md:text-xl text-gray-500 flex items-center gap-2 overflow-hidden whitespace-nowrap"
  >
    <span className="text-white/30">[</span>
    <span className="text-white font-bold hover:text-[#39ff14] transition-all cursor-default">DSA</span><span className="text-[#39ff14]">,</span>
    <span className="text-white font-bold hover:text-[#39ff14] transition-all cursor-default">DEV</span><span className="text-[#39ff14]">,</span>
    <span className="text-white font-bold hover:text-[#39ff14] transition-all cursor-default">DEVOPS</span><span className="text-[#39ff14]">,</span>
    <span className="text-white font-bold hover:text-[#39ff14] transition-all cursor-default">WEB3</span>
    <span className="text-white/30">]</span>
    <span className="text-gray-400 ml-2 font-light italic">is my stack.</span>
    
    {/* Blinking Terminal Cursor */}
    <motion.span 
      animate={{ opacity: [1, 0] }} 
      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} 
      className="w-2.5 h-4 md:h-5 bg-[#39ff14] ml-2 inline-block align-middle"
    ></motion.span>
  </motion.div>

</div>

    </motion.div>
    </section>
  );
};

export default Hero;