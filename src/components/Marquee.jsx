import React from 'react';
import { motion } from 'framer-motion';
import { SiLinux, SiGnubash, SiUbuntu, SiDebian } from 'react-icons/si';
import { Terminal } from 'lucide-react';

const Marquee = () => {
  const linuxElements = [
    { type: 'text', content: 'user@root:~$' },
    { type: 'icon', component: <SiLinux /> },
    { type: 'text', content: 'chmod +x' },
    { type: 'icon', component: <Terminal /> },
    { type: 'text', content: '| grep -i' },
    { type: 'icon', component: <SiGnubash /> },
    { type: 'text', content: 'sudo systemctl restart' },
    { type: 'icon', component: <SiUbuntu /> },
    { type: 'text', content: '> /dev/null 2>&1' },
    { type: 'icon', component: <SiDebian /> },
    { type: 'text', content: 'tar -czvf' }
  ];

  const multipliedElements = [...linuxElements, ...linuxElements, ...linuxElements, ...linuxElements];

  return (
    <section className="py-24 relative w-full overflow-hidden flex items-center justify-center z-20">
      
      {/* The slim, transparent track with white borders 
        border-y: adds top and bottom borders only
        bg-transparent: keeps the inside completely empty 
      */}
      <div className="w-[110vw] -ml-[5vw] bg-transparent py-3 md:py-4 transform -rotate-2 border-y border-white/30 backdrop-blur-sm">
        
        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
        >
          {/* First Half */}
          <div className="flex shrink-0 items-center">
            {multipliedElements.map((item, index) => (
              <div key={`first-${index}`} className="flex items-center">
                {item.type === 'text' ? (
                  // Scaled down text to text-xl for a slimmer ribbon
                  <span className="text-white font-mono font-medium text-lg md:text-xl tracking-wide mx-6 md:mx-10">
                    {item.content}
                  </span>
                ) : (
                  // Scaled down icons to match
                  <span className="text-white text-xl md:text-2xl mx-6 md:mx-10 opacity-80">
                    {item.component}
                  </span>
                )}
                {/* Subtle separator */}
                <span className="text-white/20 text-xl font-light mx-2">|</span>
              </div>
            ))}
          </div>

          {/* Second Half (The Clone) */}
          <div className="flex shrink-0 items-center">
            {multipliedElements.map((item, index) => (
              <div key={`second-${index}`} className="flex items-center">
                {item.type === 'text' ? (
                  <span className="text-white font-mono font-medium text-lg md:text-xl tracking-wide mx-6 md:mx-10">
                    {item.content}
                  </span>
                ) : (
                  <span className="text-white text-xl md:text-2xl mx-6 md:mx-10 opacity-80">
                    {item.component}
                  </span>
                )}
                <span className="text-white/20 text-xl font-light mx-2">|</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Marquee;