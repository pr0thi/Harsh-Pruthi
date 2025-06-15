import React from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ 
  isDark, 
  setIsDark, 
  activeSection, 
  scrollToSection, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  const NavLinks = () => (
    <>
      {['home', 'about', 'experience', 'projects', 'contact'].map((item) => (
        <button
          key={item}
          onClick={() => scrollToSection(item)}
          className={`capitalize transition-colors hover:text-[#778da9] font-montserrat ${
            activeSection === item ? 'text-[#778da9] font-semibold' : ''
          }`}
        >
          {item === 'home' ? 'Home' : item.replace(/([A-Z])/g, ' $1')}
        </button>
      ))}
    </>
  );

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-sm border-b transition-colors ${
      isDark ? 'bg-[#0d1b2a]/80 border-[#1b263b]' : 'bg-[#e0e1dd]/80 border-[#778da9]'
    }`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <button
            onClick={() => scrollToSection('home')}
            className="focus:outline-none"
            aria-label="Scroll to home section"
          >
            <img
              src="/icon2.png"
              alt="Logo"
              className="h-12 w-auto object-contain"
            />
          </button>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <NavLinks />
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'bg-[#1b263b] hover:bg-[#415a77]' : 'bg-[#778da9] hover:bg-[#415a77]'
            }`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-60 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className={`container mx-auto px-6 py-4 flex flex-col space-y-4 ${
          isDark ? 'bg-[#0d1b2a]' : 'bg-[#e0e1dd]'
        }`}>
          <NavLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 