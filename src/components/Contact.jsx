import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
// 👇 CHANGED: Swapped FaLinkedinIn for FaLinkedin (the solid square version)
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaGlobe } from 'react-icons/fa';

const Contact = () => {
  // 👇 CHANGED: Hardcoded the exact SVG sizes and official brand colors into the icons
  const orbitLinks = [
    { 
      id: 'email', 
      icon: <Mail size={26} color="#EA4335" />, // Google Red
      label: 'Email', value: 'root10xsudo@gmail.com', href: 'mailto:root10xsudo@gmail.com', brandColor: '#EA4335' 
    },
    { 
      id: 'linkedin', 
      // This trick puts a white square behind the blue icon so the "in" cutout becomes pure white!
      icon: (
        <div className="relative flex items-center justify-center">
          <div className="absolute w-[70%] h-[70%] bg-white z-0"></div>
          <FaLinkedin size={28} color="#0A66C2" className="relative z-10" />
        </div>
      ), 
      label: 'LinkedIn', value: 'Connect', href: 'www.linkedin.com/in/sainath-manda', brandColor: '#0A66C2' },
    { 
      id: 'github', 
      icon: <FaGithub size={28} color="#ffffff" />, // GitHub White
      label: 'GitHub', value: 'sainathmanda', href: 'https://github.com/sainathmanda7', brandColor: '#ffffff' 
    },
    { 
      id: 'instagram', 
      icon: <FaInstagram size={28} color="#E1306C" />, // Instagram Pink
      label: 'Instagram', value: 'Follow', href: 'https://www.instagram.com/root.10x', brandColor: '#E1306C' 
    },
    { 
      id: 'twitter', 
      icon: <FaTwitter size={28} color="#1DA1F2" />, // Twitter Blue
      label: 'Twitter', value: 'Feed', href: '#', brandColor: '#1DA1F2' 
    },
    { 
      id: 'website', 
      icon: <FaGlobe size={28} color="#39ff14" />, // Portfolio Neon Green
      label: 'Website', value: 'Portfolio', href: '#', brandColor: '#39ff14' 
    },
  ];

  return (
    <section id="contact" className="relative pt-32 pb-24 px-6 w-full overflow-hidden flex flex-col items-center justify-center min-h-screen bg-[#0b0f14] z-10">
      
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#39ff14 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="text-center z-20">
        <h2 className="text-[#39ff14] font-mono text-sm tracking-[0.3em] uppercase mb-4 shadow-[#39ff14]">
          System Node Active
        </h2>
        <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
          Orbit My Network
        </h3>
      </div>

      <div className="relative w-[320px] h-[320px] md:w-[460px] md:h-[460px] flex items-center justify-center mt-16 md:mt-24">
        
        {/* The Central Wolf Logo */}
        <div className="absolute z-30 w-36 h-36 md:w-56 md:h-56 rounded-full flex items-center justify-center animate-[pulse_4s_ease-in-out_infinite]">
          <div className="absolute inset-0 bg-[#39ff14]/20 rounded-full blur-[40px]"></div>
          <img 
            src="/wolf-logo.png" 
            alt="Cyberpunk Wolf Core" 
            className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_20px_rgba(57,255,20,0.8)]"
          />
        </div>

        {/* Inner Orbit Ring (Decorative) 
          👇 CHANGED: Forced pure white color with 20% opacity 
        */}
        <div className="absolute w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full border border-[#ffffff]/20 border-dashed animate-[spin_30s_linear_infinite]"></div>

        {/* Main Orbit Track 
          👇 CHANGED: Forced pure white color with 50% opacity so it is extremely visible
        */}
        <motion.div 
          className="absolute w-full h-full rounded-full border border-[#ffffff]/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {orbitLinks.map((link, index) => {
            const angle = (index / orbitLinks.length) * 360;
            
            return (
              <div 
                key={link.id}
                className="absolute top-1/2 left-1/2 w-full h-0"
                style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                  <motion.div
                    animate={{ rotate: [-angle, -360 - angle] }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                  >
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = link.brandColor;
                        e.currentTarget.style.boxShadow = `0 0 20px ${link.brandColor}80`; 
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#ffffff'; // Resets back to pure white
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      /* 👇 CHANGED: border-2 border-[#ffffff] forces a thick, bright white circle! */
                      className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0b0f14] border-2 border-[#ffffff] backdrop-blur-md transition-all duration-300 hover:scale-110 z-40 cursor-pointer"
                    >
                      {/* The Icon */}
                      <span className="transition-transform duration-300 group-hover:scale-110">
                        {link.icon}
                      </span>

                      {/* Tooltip */}
                      <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-50">
                        <div className="bg-[#0b0f14]/90 border border-[#ffffff]/30 backdrop-blur-xl px-4 py-2 rounded-lg flex flex-col items-center shadow-xl">
                          <span className="text-xs text-gray-400 font-mono tracking-widest uppercase mb-1">{link.label}</span>
                          <span className="text-sm font-bold whitespace-nowrap" style={{ color: link.brandColor }}>{link.value}</span>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;