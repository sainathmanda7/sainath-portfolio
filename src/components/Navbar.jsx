import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [navBackground, setNavBackground] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Change nav background on scroll for a premium feel
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackground ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tighter cursor-pointer">
          <span className="text-gradient">Sainath</span>.dev
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-sm font-semibold tracking-wide text-gray-300">
          {links.map((link) => (
            <li key={link} className="hover:text-primary transition-colors cursor-pointer">
              <Link to={link.toLowerCase()} smooth={true} duration={500} offset={-80}>
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-2xl cursor-pointer text-gray-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full flex flex-col items-center py-6 gap-6 shadow-2xl">
          {links.map((link) => (
            <Link 
              key={link} 
              to={link.toLowerCase()} 
              smooth={true} 
              duration={500} 
              offset={-80}
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold text-gray-300 hover:text-primary cursor-pointer"
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;