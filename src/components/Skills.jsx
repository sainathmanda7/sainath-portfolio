import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiC, SiCplusplus, SiGo, SiPython,
  SiMysql, SiGit, SiDocker, SiLinux, SiKubernetes, SiReact, SiHtml5
} from 'react-icons/si';
import { RiJavaLine, RiCss3Line } from 'react-icons/ri';
// 👇 Brought in the rock-solid FontAwesome AWS icon
import { FaAws } from 'react-icons/fa'; 
import { VscVscode } from 'react-icons/vsc';
import { Cloud, Server, Layout } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Cloud & Orchestration",
      icon: <Cloud className="w-6 h-6 text-[#39ff14]" />,
      description: "Architecting and deploying scalable infrastructure.",
      glow: "hover:shadow-[0_0_30px_rgba(57,255,20,0.15)]",
      skills: [
        { name: 'AWS', icon: <FaAws /> }, // 👇 Updated to FaAws here
        { name: 'Kubernetes', icon: <SiKubernetes /> },
        { name: 'Docker', icon: <SiDocker /> },
        { name: 'CI/CD', icon: <SiGit /> },
        { name: 'Linux/Unix', icon: <SiLinux /> },
        { name: 'CDN', icon: <Cloud /> },
      ]
    },
    {
      title: "Systems & Backend",
      icon: <Server className="w-6 h-6 text-[#8b5cf6]" />,
      description: "Writing high-performance, low-latency applications.",
      glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
      skills: [
        { name: 'Golang', icon: <SiGo /> },
        { name: 'C++', icon: <SiCplusplus /> },
        { name: 'C', icon: <SiC /> },
        { name: 'Java', icon: <RiJavaLine /> },
        { name: 'Python', icon: <SiPython /> },
        { name: 'SQL', icon: <SiMysql /> },
      ]
    },
    {
      title: "Web & Tooling",
      icon: <Layout className="w-6 h-6 text-blue-400" />,
      description: "Building responsive interfaces and maintaining workflows.",
      glow: "hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]",
      skills: [
        { name: 'MERN Stack', icon: <SiReact /> },
        { name: 'HTML5', icon: <SiHtml5 /> },
        { name: 'CSS3', icon: <RiCss3Line /> },
        { name: 'Git', icon: <SiGit /> },
        { name: 'VS Code', icon: <VscVscode /> },
      ]
    }
  ];

  return (
    <section id="skills" className="relative py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <p className="text-[#39ff14] font-mono text-sm tracking-[0.2em] uppercase mb-4">
          01. Technical Arsenal
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Tools of the trade.
        </h2>
      </motion.div>

      {/* Bento Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`flex flex-col p-8 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-md transition-all duration-500 ${category.glow}`}
          >
            <div className="mb-6 bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10">
              {category.icon}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">{category.title}</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-grow">
              {category.description}
            </p>
            
            {/* Interactive Skill Pills */}
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-colors cursor-default group"
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors text-sm">
                    {skill.icon}
                  </span>
                  <span className="text-gray-300 group-hover:text-white text-xs font-mono font-medium tracking-wide transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;