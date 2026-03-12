import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const TerminalFooter = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [step, setStep] = useState(0); 
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [typedCommand, setTypedCommand] = useState("");
  const [userData, setUserData] = useState({ ip: 'DETECTING...', location: 'CALCULATING...' });

  // 1. Fetch the user's IP and Location
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setUserData({
          ip: data.ip || 'UNKNOWN IP',
          location: data.city && data.country_name ? `${data.city}, ${data.country_name}` : 'Unknown Sector'
        });
      })
      .catch(() => {
        setUserData({ ip: '127.0.0.1', location: 'Localhost / Unknown' });
      });
  }, []);

  // 2. Trigger boot sequence when scrolled into view
  useEffect(() => {
    if (isInView && step === 0 && userData.ip !== 'DETECTING...') {
      setStep(1);
    }
  }, [isInView, step, userData]);

  // 3. The Core Sequence Logic (Fixed the infinite loop!)
  useEffect(() => {
    if (step === 1) {
      // Moved the logs inside the effect so React doesn't re-render them infinitely
      const logsToPrint = [
        "[  0.042111] Booting System Architecture Node...",
        "[  0.081231] Loading C++ embedded routines... [OK]",
        `[  0.154322] Incoming connection detected. IP: ${userData.ip}`,
        `[  0.221544] Routing trace verified. Location: ${userData.location}`,
        "[  0.284321] Mounting Docker volumes... [OK]",
        "[  0.354111] Establishing secure WebSocket connection...",
        "[  0.421543] Orchestrating Kubernetes cluster... [OK]",
        "[  0.501233] Initializing Root10x protocol...",
        "[  0.551222] System check passed. Kernel ready."
      ];

      let currentIndex = 0;
      const logInterval = setInterval(() => {
        setVisibleLogs(prev => [...prev, logsToPrint[currentIndex]]);
        currentIndex++;
        if (currentIndex >= logsToPrint.length) {
          clearInterval(logInterval);
          setTimeout(() => setStep(2), 600); // Pause before clear
        }
      }, 150);
      return () => clearInterval(logInterval);
    }

    if (step === 2) {
      setVisibleLogs([]); // Screen clears instantly
      setTimeout(() => setStep(3), 300); 
    }

    if (step === 3) {
      const command = "./execute_protocol.sh";
      let i = 0;
      const typeInterval = setInterval(() => {
        setTypedCommand(command.slice(0, i + 1));
        i++;
        if (i >= command.length) {
          clearInterval(typeInterval);
          setTimeout(() => setStep(4), 500); // Pause before execution
        }
      }, 75);
      return () => clearInterval(typeInterval);
    }
  }, [step, userData]); // Safely locked dependencies

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-[#050505] pt-24 pb-8 px-6 md:px-12 lg:px-24 flex flex-col justify-between font-mono relative z-20"
    >
      <div className="max-w-5xl mx-auto w-full flex-grow flex flex-col justify-center">
        
        {/* THE TERMINAL WINDOW 
            👇 CHANGED: Locked height to exactly 350px and added overflow-hidden so it NEVER stretches! 
        */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 md:p-10 h-[350px] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] relative flex flex-col">
          
          {/* Fake Mac/Linux Window Header */}
          <div className="flex gap-2 mb-6 absolute top-4 left-4">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>

          <div className="pt-6 flex-grow flex flex-col">
            
            {/* Phase 1: Streaming Logs */}
            {step === 1 && (
              <div className="flex flex-col gap-1 text-[#00ffcc] opacity-80 text-sm md:text-base">
                {visibleLogs.map((log, index) => (
                  <div key={index}>{log}</div>
                ))}
                <div className="w-2.5 h-4 bg-[#00ffcc] animate-pulse mt-1"></div>
              </div>
            )}

            {/* Phase 3 & 4: Centered Output */}
            {step >= 3 && (
              <div className="flex-grow flex flex-col items-center justify-center w-full">
                
                {/* The Typed Command */}
                {step === 3 && (
                  <div className="flex items-center justify-center text-[#39ff14] text-sm md:text-base mb-8">
                    <span className="mr-3 font-bold opacity-50">root@server:~#</span>
                    <span>{typedCommand}</span>
                    <span className="w-2.5 h-5 bg-[#39ff14] animate-pulse ml-1 inline-block align-middle"></span>
                  </div>
                )}

                {/* The Final Payload */}
                {step === 4 && (
                  <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
                    <h2 className="text-white font-black text-3xl md:text-5xl lg:text-6xl tracking-tighter drop-shadow-[0_0_20px_rgba(57,255,20,0.3)] text-center">
                      Powered by Root10x
                    </h2>
                    
                    {/* The Live IP & Location Tag */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 mt-2 border border-[#39ff14]/30 bg-[#39ff14]/10 px-6 py-3 rounded-lg text-[#39ff14] text-xs md:text-sm font-mono backdrop-blur-md text-center">
                       <div>IP: <span className="text-white ml-2">{userData.ip}</span></div>
                       <div className="hidden md:block w-px h-4 bg-[#39ff14]/30"></div>
                       <div>LOC: <span className="text-white ml-2 uppercase">{userData.location}</span></div>
                       <span className="w-3 h-5 bg-[#39ff14] animate-pulse ml-2 inline-block align-middle"></span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Absolute Bottom Standard Footer */}
      <div className="max-w-7xl mx-auto w-full mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
         <p>© {new Date().getFullYear()} Sainath Manda. All Rights Reserved.</p>
         
         <div className="flex gap-8">
           <a href="/privacy.html" className="hover:text-[#39ff14] transition-colors duration-300 hover:underline">
             Privacy Policy
           </a>
         </div>
      </div>
    </section>
  );
};

export default TerminalFooter;