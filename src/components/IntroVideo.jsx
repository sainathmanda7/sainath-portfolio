import React from 'react';
import { motion } from 'framer-motion';

const IntroVideo = ({ onComplete }) => {
  return (
    // framer-motion handles the smooth fade-out when the component unmounts
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      <video
        src="/welcome.mp4"
        autoPlay={true}
        muted={true}
        playsInline={true}
        onEnded={onComplete}
        className="w-full h-full object-cover opacity-80"
      />
      
      {/* Cyberpunk Skip Button */}
      <button
        onClick={onComplete}
        className="absolute bottom-10 right-10 text-gray-500 hover:text-[#39ff14] font-mono text-sm tracking-[0.2em] transition-colors z-[101] flex items-center gap-2"
      >
        <span>[</span> SKIP INITIALIZATION <span>]</span>
      </button>
    </motion.div>
  );
};

export default IntroVideo;